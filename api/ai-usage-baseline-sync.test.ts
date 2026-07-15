import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

const blobMocks = vi.hoisted(() => ({ put: vi.fn() }));

vi.mock("@vercel/blob", () => ({ put: blobMocks.put }));

import handler from "./ai-usage-baseline-sync.js";

const totals = {
  inputTokens: 10,
  outputTokens: 0,
  cacheCreationTokens: 0,
  cacheReadTokens: 0,
  totalTokens: 10,
  totalCost: 0.01,
};

const baselineDays = Array.from({ length: 194 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
  return {
    date,
    coverage: 2,
    status: "finalized",
    totals,
    agents: [{ agent: "codex", modelsUsed: [], ...totals }],
  };
});

const baseline = {
  schemaVersion: 1,
  machineId: "aggregate",
  machineLabel: "Aggregated sources",
  timezone: "America/New_York",
  trackingStartedOn: "2026-01-01",
  confirmZeroFrom: "2026-07-12",
  reportedThrough: "2026-07-12",
  lastSyncedAt: "2026-07-14T03:57:16.007Z",
  ccusageVersion: "aggregated",
  days: baselineDays,
};

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)).map(([key, child]) => [key, canonicalize(child)]));
}

const baselineHash = createHash("sha256").update(JSON.stringify(canonicalize(baseline))).digest("hex");

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

describe("AI usage baseline import", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.AI_USAGE_SYNC_SECRET = "test-secret";
    process.env.AI_USAGE_BASELINE_SHA256 = baselineHash;
    blobMocks.put.mockResolvedValue({});
  });

  it("stores an authenticated aggregate baseline without exposing its contents", async () => {
    const { result, response } = responseRecorder();
    await handler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: baseline,
    }, response);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({ ok: true, reportedThrough: "2026-07-12", daysStored: 194 });
    expect(blobMocks.put).toHaveBeenCalledWith(
      "ai-usage/v2/baseline/aggregate.json",
      expect.any(String),
      expect.objectContaining({ access: "private", allowOverwrite: false }),
    );
  });

  it("rejects a machine snapshot as a baseline", async () => {
    const { result, response } = responseRecorder();
    await handler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: { ...baseline, machineId: "jesse-mbp" },
    }, response);

    expect(result.statusCode).toBe(400);
    expect(blobMocks.put).not.toHaveBeenCalled();
  });

  it("rejects an incomplete aggregate before the one-time write", async () => {
    const { result, response } = responseRecorder();
    await handler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: { ...baseline, days: baseline.days.slice(1) },
    }, response);

    expect(result.statusCode).toBe(400);
    expect(blobMocks.put).not.toHaveBeenCalled();
  });
});
