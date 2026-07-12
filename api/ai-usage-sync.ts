import { timingSafeEqual } from "node:crypto";
import { put } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";

type UsagePayload = {
  schemaVersion: 1;
  machineId: string;
  machineLabel: string;
  timezone: string;
  trackingStartedOn: string;
  confirmZeroFrom: string;
  reportedThrough: string;
  lastSyncedAt: string;
  ccusageVersion: string;
  days: Array<{ date: string; status: string }>;
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MACHINE_PATTERN = /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/;

function secureEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function validPayload(value: unknown): value is UsagePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<UsagePayload>;
  return Boolean(
    payload.schemaVersion === 1 &&
      typeof payload.machineId === "string" && MACHINE_PATTERN.test(payload.machineId) &&
      typeof payload.machineLabel === "string" && payload.machineLabel.length <= 100 &&
      typeof payload.timezone === "string" &&
      typeof payload.trackingStartedOn === "string" && DATE_PATTERN.test(payload.trackingStartedOn) &&
      typeof payload.confirmZeroFrom === "string" && DATE_PATTERN.test(payload.confirmZeroFrom) &&
      typeof payload.reportedThrough === "string" && DATE_PATTERN.test(payload.reportedThrough) &&
      typeof payload.lastSyncedAt === "string" &&
      typeof payload.ccusageVersion === "string" &&
      Array.isArray(payload.days) && payload.days.length <= 5000 &&
      payload.days.every((day) => day && DATE_PATTERN.test(day.date)),
  );
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
  if (!validPayload(payload)) return response.status(400).json({ error: "Invalid usage payload" });

  const allowedMachines = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean);
  if (allowedMachines?.length && !allowedMachines.includes(payload.machineId)) {
    return response.status(403).json({ error: "Machine is not allowed" });
  }

  await put(`ai-usage/machines/${payload.machineId}.json`, JSON.stringify(payload), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });

  return response.status(200).json({
    ok: true,
    machineId: payload.machineId,
    reportedThrough: payload.reportedThrough,
    daysStored: payload.days.length,
  });
}
