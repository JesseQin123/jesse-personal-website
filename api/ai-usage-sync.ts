import { timingSafeEqual } from "node:crypto";
import { BlobNotFoundError, BlobPreconditionFailedError, get, head, put } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";
import { mergeUsageDays, usageSnapshotPath } from "./_ai-usage-storage.js";
import {
  incrementalUsagePayloadSchema,
  machineUsageSnapshotSchema,
  type IncrementalUsagePayload,
  type StoredMachineUsageSnapshot,
} from "./ai-usage-schema.js";

type StoredSnapshot = StoredMachineUsageSnapshot & { sourceInstanceId?: string };
type UsageDay = StoredMachineUsageSnapshot["days"][number];

function secureEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

async function loadSnapshot(pathname: string): Promise<{ snapshot?: StoredSnapshot; etag?: string }> {
  let metadata;
  try {
    metadata = await head(pathname);
  } catch (error) {
    if (error instanceof BlobNotFoundError) return {};
    throw error;
  }
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result) throw new Error("Blob disappeared after metadata lookup");
  if (result.statusCode !== 200) throw new Error(`Unable to read existing snapshot (${result.statusCode})`);
  const snapshot = await new Response(result.stream).json() as StoredSnapshot;
  return { snapshot, etag: metadata.etag };
}

function isSuspiciousHistoricalRewrite(previous: UsageDay, next: UsageDay, reportedThrough: string) {
  if (next.date >= reportedThrough) return false;
  const oldTokens = previous.totals.totalTokens;
  const newTokens = next.totals.totalTokens;
  if (oldTokens === newTokens || Math.max(oldTokens, newTokens) < 1_000_000) return false;
  if (oldTokens === 0 || newTokens === 0) return true;
  const ratio = newTokens / oldTokens;
  return ratio > 3 || ratio < 1 / 3;
}
export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "GET" && request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  let payload: unknown;
  if (request.method === "POST") {
    try {
      payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
    } catch {
      return response.status(400).json({ error: "Request body must be valid JSON" });
    }
  }
  const queryMachineId = Array.isArray(request.query?.machine) ? request.query.machine[0] : request.query?.machine;
  const claimedMachineId = request.method === "GET"
    ? queryMachineId || ""
    : payload && typeof payload === "object" && "machineId" in payload ? String(payload.machineId) : "";
  let sourceSecrets: Record<string, string> = {};
  try {
    sourceSecrets = process.env.AI_USAGE_SOURCE_SECRETS ? JSON.parse(process.env.AI_USAGE_SOURCE_SECRETS) : {};
  } catch {
    return response.status(500).json({ error: "AI_USAGE_SOURCE_SECRETS is not valid JSON" });
  }
  const expectedSecret = sourceSecrets[claimedMachineId] || process.env.AI_USAGE_SYNC_SECRET;
  const authorization = request.headers.authorization;
  const receivedSecret = (Array.isArray(authorization) ? authorization[0] : authorization)?.replace(/^Bearer\s+/i, "") || "";
  if (!expectedSecret || !secureEqual(receivedSecret, expectedSecret)) {
    return response.status(401).json({ error: "Invalid sync secret" });
  }

  const allowedMachines = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean);
  if (allowedMachines?.length && !allowedMachines.includes(claimedMachineId)) {
    return response.status(403).json({ error: "Machine is not allowed" });
  }

  if (request.method === "GET") {
    if (!machineUsageSnapshotSchema.shape.machineId.safeParse(claimedMachineId).success) {
      return response.status(400).json({ error: "Invalid machine ID" });
    }
    const { snapshot } = await loadSnapshot(usageSnapshotPath(claimedMachineId));
    if (!snapshot) return response.status(404).json({ error: "Machine snapshot not found" });
    return response.status(200).json(snapshot);
  }

  const parsedPayload = incrementalUsagePayloadSchema.safeParse(payload);
  if (!parsedPayload.success) return response.status(400).json({ error: "Invalid incremental usage payload" });
  const usagePayload = parsedPayload.data as IncrementalUsagePayload;

  const canonicalTimezone = process.env.AI_USAGE_TIMEZONE || "America/New_York";
  if (usagePayload.timezone !== canonicalTimezone) {
    return response.status(400).json({ error: `All sources must use ${canonicalTimezone}` });
  }

  const pathname = usageSnapshotPath(usagePayload.machineId);
  let storedSnapshot: StoredSnapshot | undefined;
  let acceptedDays = 0;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const { snapshot: existing, etag } = await loadSnapshot(pathname);
    if (existing?.sourceInstanceId && existing.sourceInstanceId !== usagePayload.sourceInstanceId) {
      return response.status(409).json({
        error: "Machine ID is already claimed by another source",
        machineId: usagePayload.machineId,
        action: "Choose a unique machineId for this computer.",
      });
    }

    const existingDays = new Map((existing?.days || []).map((day) => [day.date, day]));
    const suspiciousDates = usagePayload.days
      .filter((day) => {
        const previous = existingDays.get(day.date);
        return previous && isSuspiciousHistoricalRewrite(previous, day, usagePayload.reportedThrough);
      })
      .map((day) => day.date);
    if (suspiciousDates.length && usagePayload.allowHistoricalRewrite !== true) {
      return response.status(409).json({
        error: "Suspicious historical rewrite blocked",
        dates: suspiciousDates,
        action: "Inspect the local ccusage data, then rerun with --allow-historical-rewrite if the correction is intentional.",
      });
    }

    const stalePayload = Boolean(existing?.lastSyncedAt && Date.parse(usagePayload.lastSyncedAt) < Date.parse(existing.lastSyncedAt));
    if (stalePayload && usagePayload.allowHistoricalRewrite === true) {
      return response.status(409).json({
        error: "Stale historical repair blocked",
        machineId: usagePayload.machineId,
        action: "Rerun the repair from the current source state.",
      });
    }
    const mergedDays = mergeUsageDays(existing?.days || [], usagePayload.days, {
      replaceAll: usagePayload.allowHistoricalRewrite === true,
      preserveExisting: stalePayload,
    });
    acceptedDays = mergedDays.acceptedDays;
    const snapshot: StoredSnapshot = {
      schemaVersion: 1,
      sourceInstanceId: usagePayload.sourceInstanceId,
      machineId: usagePayload.machineId,
      machineLabel: stalePayload ? existing!.machineLabel : usagePayload.machineLabel,
      timezone: stalePayload ? existing!.timezone : usagePayload.timezone,
      trackingStartedOn: stalePayload ? existing!.trackingStartedOn : usagePayload.trackingStartedOn,
      confirmZeroFrom: stalePayload ? existing!.confirmZeroFrom : usagePayload.confirmZeroFrom,
      reportedThrough: stalePayload ? existing!.reportedThrough : usagePayload.reportedThrough,
      lastSyncedAt: stalePayload ? existing!.lastSyncedAt : usagePayload.lastSyncedAt,
      ccusageVersion: stalePayload ? existing!.ccusageVersion : usagePayload.ccusageVersion,
      days: mergedDays.days,
    };

    try {
      await put(pathname, JSON.stringify(snapshot), {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: Boolean(etag),
        cacheControlMaxAge: 60,
        contentType: "application/json",
        ...(etag ? { ifMatch: etag } : {}),
      });
      storedSnapshot = snapshot;
      break;
    } catch (error) {
      const retryableConflict = error instanceof BlobPreconditionFailedError || !etag;
      if (attempt === 3 || !retryableConflict) throw error;
    }
  }

  if (!storedSnapshot) throw new Error("Unable to store usage after concurrent updates");

  return response.status(200).json({
    ok: true,
    machineId: usagePayload.machineId,
    reportedThrough: usagePayload.reportedThrough,
    daysUpdated: acceptedDays,
    daysStored: storedSnapshot.days.length,
  });
}
