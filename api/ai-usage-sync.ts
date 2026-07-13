import { timingSafeEqual } from "node:crypto";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";

type UsageTotals = {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  totalCost: number;
};

type UsageDay = {
  date: string;
  status: "finalized" | "reported_zero" | "provisional";
  totals: UsageTotals;
  agents: Array<UsageTotals & { agent: string; modelsUsed: string[] }>;
};

type StoredSnapshot = {
  schemaVersion: 1;
  sourceInstanceId?: string;
  machineId: string;
  machineLabel: string;
  timezone: string;
  trackingStartedOn: string;
  confirmZeroFrom: string;
  reportedThrough: string;
  lastSyncedAt: string;
  ccusageVersion: string;
  days: UsageDay[];
};

type UsagePayload = Omit<StoredSnapshot, "schemaVersion" | "days"> & {
  schemaVersion: 2;
  sourceInstanceId: string;
  allowHistoricalRewrite?: boolean;
  days: UsageDay[];
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MACHINE_PATTERN = /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/;
const SOURCE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TOTAL_KEYS: Array<keyof UsageTotals> = ["inputTokens", "outputTokens", "cacheCreationTokens", "cacheReadTokens", "totalTokens", "totalCost"];

function secureEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function validTotals(value: unknown): value is UsageTotals {
  if (!value || typeof value !== "object") return false;
  const totals = value as Partial<UsageTotals>;
  return TOTAL_KEYS.every((key) => typeof totals[key] === "number" && Number.isFinite(totals[key]) && totals[key]! >= 0);
}

function validDay(value: unknown): value is UsageDay {
  if (!value || typeof value !== "object") return false;
  const day = value as Partial<UsageDay>;
  return Boolean(
    typeof day.date === "string" && DATE_PATTERN.test(day.date) &&
      ["finalized", "reported_zero", "provisional"].includes(day.status || "") &&
      validTotals(day.totals) &&
      Array.isArray(day.agents) && day.agents.every((agent) =>
        agent && typeof agent.agent === "string" && Array.isArray(agent.modelsUsed) && agent.modelsUsed.every((model) => typeof model === "string") && validTotals(agent),
      )
  );
}

function validPayload(value: unknown): value is UsagePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<UsagePayload>;
  const structurallyValid = Boolean(
    payload.schemaVersion === 2 &&
      typeof payload.sourceInstanceId === "string" && SOURCE_PATTERN.test(payload.sourceInstanceId) &&
      typeof payload.machineId === "string" && MACHINE_PATTERN.test(payload.machineId) &&
      typeof payload.machineLabel === "string" && payload.machineLabel.length > 0 && payload.machineLabel.length <= 100 &&
      typeof payload.timezone === "string" &&
      typeof payload.trackingStartedOn === "string" && DATE_PATTERN.test(payload.trackingStartedOn) &&
      typeof payload.confirmZeroFrom === "string" && DATE_PATTERN.test(payload.confirmZeroFrom) &&
      typeof payload.reportedThrough === "string" && DATE_PATTERN.test(payload.reportedThrough) &&
      typeof payload.lastSyncedAt === "string" && !Number.isNaN(Date.parse(payload.lastSyncedAt)) &&
      typeof payload.ccusageVersion === "string" &&
      Array.isArray(payload.days) && payload.days.length <= 5000 && payload.days.every(validDay)
  );
  if (!structurallyValid || !payload.days) return false;
  return new Set(payload.days.map((day) => day.date)).size === payload.days.length;
}

async function loadSnapshot(pathname: string): Promise<{ snapshot?: StoredSnapshot; etag?: string }> {
  const result = await get(pathname, { access: "public", useCache: false });
  if (!result) return {};
  if (result.statusCode !== 200) throw new Error(`Unable to read existing snapshot (${result.statusCode})`);
  const snapshot = await new Response(result.stream).json() as StoredSnapshot;
  return { snapshot, etag: result.blob.etag };
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
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  let payload: unknown;
  try {
    payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    return response.status(400).json({ error: "Request body must be valid JSON" });
  }
  const claimedMachineId = payload && typeof payload === "object" && "machineId" in payload ? String(payload.machineId) : "";
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

  if (!validPayload(payload)) return response.status(400).json({ error: "Invalid incremental usage payload" });

  const allowedMachines = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean);
  if (allowedMachines?.length && !allowedMachines.includes(payload.machineId)) {
    return response.status(403).json({ error: "Machine is not allowed" });
  }
  const canonicalTimezone = process.env.AI_USAGE_TIMEZONE || "America/New_York";
  if (payload.timezone !== canonicalTimezone) {
    return response.status(400).json({ error: `All sources must use ${canonicalTimezone}` });
  }

  const pathname = `ai-usage/machines/${payload.machineId}.json`;
  let storedSnapshot: StoredSnapshot | undefined;
  let acceptedDays = 0;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const { snapshot: existing, etag } = await loadSnapshot(pathname);
    if (existing?.sourceInstanceId && existing.sourceInstanceId !== payload.sourceInstanceId) {
      return response.status(409).json({
        error: "Machine ID is already claimed by another source",
        machineId: payload.machineId,
        action: "Choose a unique machineId for this computer.",
      });
    }

    const existingDays = new Map(
      (payload.allowHistoricalRewrite ? [] : existing?.days || []).map((day) => [day.date, day]),
    );
    const suspiciousDates = payload.days
      .filter((day) => {
        const previous = existingDays.get(day.date);
        return previous && isSuspiciousHistoricalRewrite(previous, day, payload.reportedThrough);
      })
      .map((day) => day.date);
    if (suspiciousDates.length && !payload.allowHistoricalRewrite) {
      return response.status(409).json({
        error: "Suspicious historical rewrite blocked",
        dates: suspiciousDates,
        action: "Inspect the local ccusage data, then rerun with --allow-historical-rewrite if the correction is intentional.",
      });
    }

    const stalePayload = Boolean(existing?.lastSyncedAt && payload.lastSyncedAt < existing.lastSyncedAt);
    acceptedDays = 0;
    for (const day of payload.days) {
      if (stalePayload && existingDays.has(day.date)) continue;
      existingDays.set(day.date, day);
      acceptedDays += 1;
    }
    const snapshot: StoredSnapshot = {
      schemaVersion: 1,
      sourceInstanceId: payload.sourceInstanceId,
      machineId: payload.machineId,
      machineLabel: stalePayload ? existing!.machineLabel : payload.machineLabel,
      timezone: stalePayload ? existing!.timezone : payload.timezone,
      trackingStartedOn: stalePayload ? existing!.trackingStartedOn : payload.trackingStartedOn,
      confirmZeroFrom: stalePayload ? existing!.confirmZeroFrom : payload.confirmZeroFrom,
      reportedThrough: stalePayload ? existing!.reportedThrough : payload.reportedThrough,
      lastSyncedAt: stalePayload ? existing!.lastSyncedAt : payload.lastSyncedAt,
      ccusageVersion: stalePayload ? existing!.ccusageVersion : payload.ccusageVersion,
      days: [...existingDays.values()].sort((left, right) => left.date.localeCompare(right.date)),
    };

    try {
      await put(pathname, JSON.stringify(snapshot), {
        access: "public",
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
    machineId: payload.machineId,
    reportedThrough: payload.reportedThrough,
    daysUpdated: acceptedDays,
    daysStored: storedSnapshot.days.length,
  });
}
