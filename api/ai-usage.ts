import { get, list } from "@vercel/blob";
import type { ApiRequest, ApiResponse } from "./_types.js";

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { blobs } = await list({ prefix: "ai-usage/machines/", limit: 100 });
  const loadedSnapshots = (
    await Promise.all(
      blobs.map(async (blob) => {
        try {
          const result = await get(blob.pathname, { access: "public", useCache: false });
          if (!result || result.statusCode !== 200) return null;
          return await new Response(result.stream).json();
        } catch {
          return null;
        }
      }),
    )
  ).filter(Boolean);

  const snapshotsByMachine = new Map<string, { machineId?: string; lastSyncedAt?: string }>();
  for (const snapshot of loadedSnapshots) {
    if (!snapshot || typeof snapshot !== "object") continue;
    const candidate = snapshot as { machineId?: string; lastSyncedAt?: string };
    if (!candidate.machineId) continue;
    const current = snapshotsByMachine.get(candidate.machineId);
    if (!current || (candidate.lastSyncedAt || "") > (current.lastSyncedAt || "")) {
      snapshotsByMachine.set(candidate.machineId, candidate);
    }
  }
  const snapshots = [...snapshotsByMachine.values()];

  const expectedMachineIds = process.env.AI_USAGE_MACHINE_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || ["jesse-mbp", "jesse-desktop"];
  response.setHeader("Cache-Control", "public, max-age=60");
  response.setHeader("CDN-Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
  return response.status(200).json({ generatedAt: new Date().toISOString(), expectedMachineIds, machines: snapshots });
}
