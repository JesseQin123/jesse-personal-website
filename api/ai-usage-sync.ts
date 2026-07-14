import { timingSafeEqual } from "node:crypto";
import { put } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";
import { machineUsageSnapshotSchema } from "./ai-usage-schema.js";

function secureEqual(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
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

  const result = machineUsageSnapshotSchema.safeParse(payload);
  if (!result.success) return response.status(400).json({ error: "Invalid usage payload" });
  const snapshot = result.data;

  const allowedMachines = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean);
  if (allowedMachines?.length && !allowedMachines.includes(snapshot.machineId)) {
    return response.status(403).json({ error: "Machine is not allowed" });
  }

  await put(`ai-usage/machines/${snapshot.machineId}.json`, JSON.stringify(snapshot), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });

  return response.status(200).json({
    ok: true,
    machineId: snapshot.machineId,
    reportedThrough: snapshot.reportedThrough,
    daysStored: snapshot.days.length,
  });
}
