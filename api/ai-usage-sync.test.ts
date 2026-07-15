import { beforeEach, describe, expect, it, vi } from "vitest";

const blobMocks = vi.hoisted(() => ({
  get: vi.fn(),
  head: vi.fn(),
  put: vi.fn(),
}));

vi.mock("@vercel/blob", () => ({
  BlobNotFoundError: class BlobNotFoundError extends Error {},
  BlobPreconditionFailedError: class BlobPreconditionFailedError extends Error {},
  get: blobMocks.get,
  head: blobMocks.head,
  put: blobMocks.put,
}));

import handler from "./ai-usage-sync.js";

const totals = (totalTokens = 10_000_000) => ({
  inputTokens: totalTokens,
  outputTokens: 0,
  cacheCreationTokens: 0,
  cacheReadTokens: 0,
  totalTokens,
  totalCost: 1,
});

const day = (totalTokens = 10_000_000) => ({
  date: "2026-07-12",
  status: "finalized",
  totals: totals(totalTokens),
  agents: [{ agent: "codex", modelsUsed: ["gpt-5"], ...totals(totalTokens) }],
});

const snapshot = {
  schemaVersion: 1,
  sourceInstanceId: "123e4567-e89b-42d3-a456-426614174000",
  machineId: "jesse-mbp",
  machineLabel: "Jesse's MacBook Pro",
  timezone: "America/New_York",
  trackingStartedOn: "2026-01-01",
  confirmZeroFrom: "2026-07-12",
  reportedThrough: "2026-07-14",
  lastSyncedAt: "2026-07-15T03:00:00.000Z",
  ccusageVersion: "20.0.17",
  days: [day()],
};

const payload = (overrides: Record<string, unknown> = {}) => ({
  ...snapshot,
  schemaVersion: 2,
  lastSyncedAt: "2026-07-15T04:00:00.000Z",
  allowHistoricalRewrite: false,
  days: [day()],
  ...overrides,
});

function storedResult(value = snapshot) {
  return {
    statusCode: 200,
    stream: new Response(JSON.stringify(value)).body,
  };
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

async function callHandler(request: Record<string, unknown>) {
  const { result, response } = responseRecorder();
  await handler(request as never, response);
  return result;
}

describe("AI usage sync contract", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.AI_USAGE_SYNC_SECRET = "test-secret";
    process.env.AI_USAGE_MACHINE_IDS = "jesse-mbp";
    process.env.AI_USAGE_TIMEZONE = "America/New_York";
    delete process.env.AI_USAGE_SOURCE_SECRETS;
    blobMocks.head.mockResolvedValue({ etag: "etag-1" });
    blobMocks.get.mockResolvedValue(storedResult());
    blobMocks.put.mockResolvedValue({});
  });

  it("accepts the collector's schema-v2 payload", async () => {
    const result = await callHandler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: payload(),
    });

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({ ok: true, machineId: "jesse-mbp" });
  });

  it("rejects a non-boolean historical rewrite flag", async () => {
    const result = await callHandler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: payload({ allowHistoricalRewrite: "false", days: [day(1)] }),
    });

    expect(result.statusCode).toBe(400);
    expect(blobMocks.put).not.toHaveBeenCalled();
  });

  it("rejects non-canonical timestamps before stale-write comparison", async () => {
    const result = await callHandler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: payload({ lastSyncedAt: "2026-07-15T00:00:00-04:00" }),
    });

    expect(result.statusCode).toBe(400);
    expect(blobMocks.put).not.toHaveBeenCalled();
  });

  it("rejects a stale full-history repair before it can erase newer dates", async () => {
    const result = await callHandler({
      method: "POST",
      headers: { authorization: "Bearer test-secret" },
      body: payload({
        allowHistoricalRewrite: true,
        lastSyncedAt: "2026-07-15T02:00:00.000Z",
        days: [day(1)],
      }),
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toMatchObject({ error: "Stale historical repair blocked" });
    expect(blobMocks.put).not.toHaveBeenCalled();
  });

  it("returns a private machine snapshot only from the authenticated sync endpoint", async () => {
    const result = await callHandler({
      method: "GET",
      headers: { authorization: "Bearer test-secret" },
      query: { machine: "jesse-mbp" },
    });

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({ machineId: "jesse-mbp", schemaVersion: 1 });
  });
});
