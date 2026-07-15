import { createHash, timingSafeEqual } from "node:crypto";
import { put } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";
import { AI_USAGE_BASELINE_PATH } from "./_ai-usage-storage.js";
import { aggregateUsageSnapshotSchema, type AggregateUsageSnapshot } from "./ai-usage-schema.js";

function secureEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)).map(([key, child]) => [key, canonicalize(child)]));
}

function expectedDate(index: number) {
  return new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
}

function isCompleteMigrationBaseline(baseline: AggregateUsageSnapshot) {
  return baseline.trackingStartedOn === "2026-01-01" &&
    baseline.reportedThrough === "2026-07-12" &&
    baseline.days.length === 194 &&
    baseline.days.every((day, index) => day.date === expectedDate(index));
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const expectedSecret = process.env.AI_USAGE_SYNC_SECRET;
  const authorization = request.headers.authorization;
  const receivedSecret = (Array.isArray(authorization) ? authorization[0] : authorization)?.replace(/^Bearer\s+/i, "") || "";
  if (!expectedSecret || !secureEqual(receivedSecret, expectedSecret)) {
    return response.status(401).json({ error: "Invalid sync secret" });
  }

  let payload: unknown;
  try {
    payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    return response.status(400).json({ error: "Request body must be valid JSON" });
  }
  const parsed = aggregateUsageSnapshotSchema.safeParse(payload);
  if (!parsed.success) return response.status(400).json({ error: "Invalid aggregate baseline" });
  const baseline = parsed.data as AggregateUsageSnapshot;
  if (!isCompleteMigrationBaseline(baseline)) {
    return response.status(400).json({ error: "Incomplete aggregate baseline" });
  }
  const expectedHash = process.env.AI_USAGE_BASELINE_SHA256 || "";
  if (!/^[0-9a-f]{64}$/i.test(expectedHash)) {
    return response.status(500).json({ error: "Baseline fingerprint is not configured" });
  }
  const receivedHash = createHash("sha256").update(JSON.stringify(canonicalize(baseline))).digest("hex");
  if (!secureEqual(receivedHash, expectedHash)) {
    return response.status(400).json({ error: "Aggregate baseline fingerprint mismatch" });
  }

  await put(AI_USAGE_BASELINE_PATH, JSON.stringify(baseline), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: "application/json",
  });

  return response.status(200).json({
    ok: true,
    reportedThrough: baseline.reportedThrough,
    daysStored: baseline.days.length,
  });
}
