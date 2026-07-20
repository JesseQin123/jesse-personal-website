import { describe, expect, it } from "vitest";
import { buildUsageModel, localDate } from "@/features/ai-usage/data";
import type { AiUsageResponse } from "@/features/ai-usage/types";

const totals = {
  inputTokens: 10,
  outputTokens: 0,
  cacheCreationTokens: 0,
  cacheReadTokens: 0,
  totalTokens: 10,
  totalCost: 0.01,
};

describe("AI usage view model", () => {
  it("preserves each day's expected coverage for dashboard status and ledger output", () => {
    const year = localDate().slice(0, 4);
    const response = {
      generatedAt: `${year}-01-02T12:00:00.000Z`,
      expectedSourceCount: 2,
      machines: [{
        schemaVersion: 1,
        machineId: "aggregate",
        machineLabel: "Aggregated sources",
        timezone: "America/New_York",
        trackingStartedOn: `${year}-01-01`,
        confirmZeroFrom: `${year}-01-01`,
        reportedThrough: `${year}-01-02`,
        lastSyncedAt: `${year}-01-02T12:00:00.000Z`,
        ccusageVersion: "aggregated",
        days: [
          { date: `${year}-01-01`, status: "finalized", coverage: 1, expectedCoverage: 1, totals, agents: [] },
          { date: `${year}-01-02`, status: "finalized", coverage: 1, expectedCoverage: 2, totals, agents: [] },
        ],
      }],
    } as AiUsageResponse;

    expect(buildUsageModel(response).daily.slice(0, 2).map((day) => [
      day.date,
      day.coverage,
      day.expectedCoverage,
    ])).toEqual([
      [`${year}-01-01`, 1, 1],
      [`${year}-01-02`, 1, 2],
    ]);
  });
});
