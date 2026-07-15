import assert from "node:assert/strict";
import test from "node:test";
import { sameUsageDay } from "./ai-usage-sync-helpers.mjs";

test("day comparison ignores JSON object key order", () => {
  const local = {
    date: "2026-07-14",
    status: "finalized",
    totals: { inputTokens: 1, outputTokens: 2, totalTokens: 3 },
    agents: [{ agent: "codex", inputTokens: 1, outputTokens: 2, totalTokens: 3 }],
  };
  const stored = {
    status: "finalized",
    date: "2026-07-14",
    totals: { totalTokens: 3, outputTokens: 2, inputTokens: 1 },
    agents: [{ totalTokens: 3, outputTokens: 2, inputTokens: 1, agent: "codex" }],
  };

  assert.equal(sameUsageDay(local, stored), true);
});

test("day comparison still detects a changed token total", () => {
  const left = { date: "2026-07-14", totals: { totalTokens: 3 } };
  const right = { date: "2026-07-14", totals: { totalTokens: 4 } };

  assert.equal(sameUsageDay(left, right), false);
});
