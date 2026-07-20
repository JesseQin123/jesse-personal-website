import { beforeEach, describe, expect, it, vi } from "vitest";

const blobMocks = vi.hoisted(() => ({
  get: vi.fn(),
  list: vi.fn(),
}));

vi.mock("@vercel/blob", () => ({
  get: blobMocks.get,
  list: blobMocks.list,
}));

import handler from "./ai-usage.js";

const totals = (totalTokens: number) => ({
  inputTokens: totalTokens,
  outputTokens: 0,
  cacheCreationTokens: 0,
  cacheReadTokens: 0,
  totalTokens,
  totalCost: totalTokens / 1_000_000,
});

const day = (date: string, totalTokens: number, coverage?: number) => ({
  date,
  ...(coverage === undefined ? {} : { coverage }),
  status: "finalized",
  totals: totals(totalTokens),
  agents: [{ agent: "codex", modelsUsed: [], ...totals(totalTokens) }],
});

const snapshot = (machineId: string, days: ReturnType<typeof day>[]) => ({
  schemaVersion: 1,
  machineId,
  machineLabel: machineId,
  timezone: "America/New_York",
  trackingStartedOn: "2026-01-01",
  confirmZeroFrom: "2026-07-12",
  reportedThrough: days.at(-1)?.date || "2026-01-01",
  lastSyncedAt: "2026-07-15T12:00:00.000Z",
  ccusageVersion: "aggregated",
  days,
});

function blobResult(value: unknown) {
  return { statusCode: 200, stream: new Response(JSON.stringify(value)).body };
}

function responseRecorder() {
  const result = { statusCode: 200, body: undefined as unknown };
  return {
    result,
    response: {
      setHeader: vi.fn(),
      status(code: number) {
        result.statusCode = code;
        return this;
      },
      json(body: unknown) {
        result.body = body;
        return this;
      },
    },
  };
}

describe("public AI usage aggregate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.AI_USAGE_MACHINE_IDS = "jesse-mbp,jesse-desktop";
    process.env.AI_USAGE_BASELINE_MACHINE_ID = "jesse-desktop";
    blobMocks.list.mockResolvedValue({
      blobs: [
        { pathname: "ai-usage/v2/machines/jesse-mbp.json" },
        { pathname: "ai-usage/v2/machines/jesse-desktop.json" },
      ],
    });
    blobMocks.get.mockImplementation(async (pathname: string) => {
      if (pathname === "ai-usage/v2/baseline/aggregate.json") {
        return blobResult({ ...snapshot("aggregate", [
          day("2026-01-01", 50, 1),
          day("2026-07-04", 0, 1),
          day("2026-07-12", 500, 1),
          day("2026-07-13", 1_000, 1),
        ]), reportedThrough: "2026-07-12" });
      }
      if (pathname.endsWith("jesse-desktop.json")) {
        return blobResult(snapshot("jesse-desktop", [
          day("2026-07-12", 500),
          day("2026-07-13", 1_000),
          day("2026-07-14", 200),
        ]));
      }
      return blobResult({ ...snapshot("jesse-mbp", [
        day("2026-07-04", 30),
        day("2026-07-12", 75),
        day("2026-07-13", 100),
        day("2026-07-14", 300),
      ]), trackingStartedOn: "2026-01-01" });
    });
  });

  it("treats the legacy baseline as one source and uses date-aware expected coverage", async () => {
    const { result, response } = responseRecorder();
    await handler({ method: "GET", headers: {} }, response);

    expect(result.statusCode).toBe(200);
    const aggregate = (result.body as { machines: Array<{ days: Array<{ date: string; coverage: number; expectedCoverage: number; totals: { totalTokens: number } }> }> }).machines[0];
    expect(aggregate.days.map((entry) => [entry.date, entry.coverage, entry.expectedCoverage, entry.totals.totalTokens])).toEqual([
      ["2026-01-01", 1, 1, 50],
      ["2026-07-04", 2, 2, 30],
      ["2026-07-12", 2, 2, 575],
      ["2026-07-13", 2, 2, 1_100],
      ["2026-07-14", 2, 2, 500],
    ]);
    expect((result.body as { expectedSourceCount: number }).expectedSourceCount).toBe(2);
  });

  it("fails closed instead of publishing live-only history when the baseline is unavailable", async () => {
    blobMocks.get.mockImplementation(async (pathname: string) => {
      if (pathname === "ai-usage/v2/baseline/aggregate.json") return null;
      return blobResult(snapshot("jesse-mbp", [day("2026-07-14", 200)]));
    });
    const { result, response } = responseRecorder();
    await handler({ method: "GET", headers: {} }, response);

    expect(result.statusCode).toBe(503);
    expect(result.body).toEqual({ error: "Aggregate baseline unavailable" });
  });
});
