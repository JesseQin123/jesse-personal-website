import assert from "node:assert/strict";
import test from "node:test";
import {
  AI_USAGE_SNAPSHOT_PREFIX,
  LEGACY_AI_USAGE_SNAPSHOT_PREFIX,
  latestSnapshotsByMachine,
  mergeUsageDays,
  usageSnapshotPath,
} from "./_ai-usage-storage.ts";

test("new snapshots are isolated from legacy direct Blob writers", () => {
  assert.notEqual(AI_USAGE_SNAPSHOT_PREFIX, LEGACY_AI_USAGE_SNAPSHOT_PREFIX);
  assert.notEqual(
    usageSnapshotPath("jesse-mbp"),
    `${LEGACY_AI_USAGE_SNAPSHOT_PREFIX}jesse-mbp.json`,
  );
  assert.notEqual(usageSnapshotPath("jesse-mbp"), usageSnapshotPath("jesse-desktop"));
});

test("each machine is returned once while distinct machines are retained", () => {
  const snapshots = latestSnapshotsByMachine([
    { machineId: "jesse-mbp", lastSyncedAt: "2026-07-13T03:00:00Z", tokens: 10 },
    { machineId: "jesse-desktop", lastSyncedAt: "2026-07-13T03:01:00Z", tokens: 20 },
    { machineId: "jesse-mbp", lastSyncedAt: "2026-07-13T03:02:00Z", tokens: 11 },
  ]);

  assert.deepEqual(snapshots, [
    { machineId: "jesse-mbp", lastSyncedAt: "2026-07-13T03:02:00Z", tokens: 11 },
    { machineId: "jesse-desktop", lastSyncedAt: "2026-07-13T03:01:00Z", tokens: 20 },
  ]);
});

test("daily upserts backfill missing dates and replace a machine-day only once", () => {
  const existing = [
    { date: "2026-07-11", tokens: 10 },
    { date: "2026-07-13", tokens: 30 },
  ];
  const incoming = [
    { date: "2026-07-12", tokens: 20 },
    { date: "2026-07-13", tokens: 31 },
  ];
  const result = mergeUsageDays(existing, incoming);

  assert.deepEqual(result.days, [
    { date: "2026-07-11", tokens: 10 },
    { date: "2026-07-12", tokens: 20 },
    { date: "2026-07-13", tokens: 31 },
  ]);
  assert.equal(result.acceptedDays, 2);
});

test("a stale upload may backfill but cannot overwrite an existing machine-day", () => {
  const result = mergeUsageDays(
    [{ date: "2026-07-13", tokens: 30 }],
    [
      { date: "2026-07-12", tokens: 20 },
      { date: "2026-07-13", tokens: 29 },
    ],
    { preserveExisting: true },
  );

  assert.deepEqual(result.days, [
    { date: "2026-07-12", tokens: 20 },
    { date: "2026-07-13", tokens: 30 },
  ]);
  assert.equal(result.acceptedDays, 1);
});
