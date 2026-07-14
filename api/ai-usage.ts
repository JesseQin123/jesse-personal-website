import { get, list } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";
import { aggregateSnapshots, machineUsageSnapshotSchema } from "./ai-usage-schema.js";

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
  return parsed.success ? parsed.data : null;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { blobs } = await list({ prefix: "ai-usage/machines/", limit: 100 });
  const allowedMachineIds = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean);
  const snapshots = (await Promise.all(blobs.map(readSnapshot)))
    .filter((snapshot) => snapshot !== null)
    .filter((snapshot) => !allowedMachineIds?.length || allowedMachineIds.includes(snapshot.machineId));
  const aggregate = aggregateSnapshots(snapshots);
  const expectedSourceCount = allowedMachineIds?.length || snapshots.length || 1;

  response.setHeader("Cache-Control", "public, max-age=60");
  response.setHeader("CDN-Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");
  return response.status(200).json({
    generatedAt: new Date().toISOString(),
    expectedMachineIds: ["aggregate"],
    expectedSourceCount,
    machines: aggregate ? [aggregate] : [],
  });
}
