export const LEGACY_AI_USAGE_SNAPSHOT_PREFIX = "ai-usage/machines/";
export const AI_USAGE_SNAPSHOT_PREFIX = "ai-usage/v2/machines/";

export function usageSnapshotPath(machineId: string) {
  return `${AI_USAGE_SNAPSHOT_PREFIX}${machineId}.json`;
}

export function latestSnapshotsByMachine<
  T extends { machineId?: string; lastSyncedAt?: string },
>(snapshots: T[]) {
  const snapshotsByMachine = new Map<string, T>();
  for (const snapshot of snapshots) {
    if (!snapshot?.machineId) continue;
    const current = snapshotsByMachine.get(snapshot.machineId);
    if (!current || (snapshot.lastSyncedAt || "") > (current.lastSyncedAt || "")) {
      snapshotsByMachine.set(snapshot.machineId, snapshot);
    }
  }
  return [...snapshotsByMachine.values()];
}

export function mergeUsageDays<T extends { date: string }>(
  existingDays: T[],
  incomingDays: T[],
  options: { replaceAll?: boolean; preserveExisting?: boolean } = {},
) {
  const daysByDate = new Map(
    (options.replaceAll ? [] : existingDays).map((day) => [day.date, day]),
  );
  let acceptedDays = 0;
  for (const day of incomingDays) {
    if (options.preserveExisting && daysByDate.has(day.date)) continue;
    daysByDate.set(day.date, day);
    acceptedDays += 1;
  }
  return {
    acceptedDays,
    days: [...daysByDate.values()].sort((left, right) => left.date.localeCompare(right.date)),
  };
}
