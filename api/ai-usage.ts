import { get, list } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";
import {
  aggregateSnapshots,
  aggregateUsageSnapshotSchema,
  machineUsageSnapshotSchema,
  restoreBaselineOwnerSnapshot,
  type AggregateUsageSnapshot,
  type StoredMachineUsageSnapshot,
} from "./ai-usage-schema.js";
import { AI_USAGE_BASELINE_PATH, AI_USAGE_SNAPSHOT_PREFIX, latestSnapshotsByMachine } from "./_ai-usage-storage.js";

type ListedBlob = Awaited<ReturnType<typeof list>>["blobs"][number];

async function readSnapshot(blob: ListedBlob) {
  let value: unknown;

  try {
    const result = await get(blob.pathname, { access: "private", useCache: false });
    if (result?.stream) value = JSON.parse(await new Response(result.stream).text());
  } catch {
    value = undefined;
  }

  if (value === undefined) {
    // Supports existing public snapshots during the private-storage migration.
    try {
      const legacyResponse = await fetch(blob.downloadUrl || blob.url, { cache: "no-store" });
      if (legacyResponse.ok) value = await legacyResponse.json();
    } catch {
      return null;
    }
  }

  const parsed = machineUsageSnapshotSchema.safeParse(value);
  return parsed.success ? parsed.data as StoredMachineUsageSnapshot : null;
}

async function readBaseline() {
  try {
    const result = await get(AI_USAGE_BASELINE_PATH, { access: "private", useCache: false });
    if (!result?.stream) return null;
    const parsed = aggregateUsageSnapshotSchema.safeParse(JSON.parse(await new Response(result.stream).text()));
    return parsed.success ? parsed.data as AggregateUsageSnapshot : null;
  } catch {
    return null;
  }
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { blobs } = await list({ prefix: AI_USAGE_SNAPSHOT_PREFIX, limit: 100 });
  const allowedMachineIds = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean);
  const snapshots = latestSnapshotsByMachine(
    (await Promise.all(blobs.map(readSnapshot)))
      .filter((snapshot) => snapshot !== null)
      .filter((snapshot) => !allowedMachineIds?.length || allowedMachineIds.includes(snapshot.machineId)),
  );
  const baseline = await readBaseline();
  if (!baseline) {
    response.setHeader("Cache-Control", "no-store");
    return response.status(503).json({ error: "Aggregate baseline unavailable" });
  }
  const baselineMachineId = process.env.AI_USAGE_BASELINE_MACHINE_ID || "jesse-desktop";
  const aggregate = aggregateSnapshots(restoreBaselineOwnerSnapshot(snapshots, baseline, baselineMachineId));
  const expectedSourceCount = Math.max(1, ...(aggregate?.days.map((day) => day.expectedCoverage || day.coverage) || []));

  response.setHeader("Cache-Control", "public, max-age=60");
  response.setHeader("CDN-Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
  return response.status(200).json({
    generatedAt: new Date().toISOString(),
    expectedMachineIds: ["aggregate"],
    expectedSourceCount,
    machines: aggregate ? [aggregate] : [],
  });
}
