import { z } from "zod";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MACHINE_PATTERN = /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/;
const SOURCE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type UsageTotals = {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  totalCost: number;
};

export type MachineUsageDay = {
  date: string;
  status: "finalized" | "reported_zero" | "provisional";
  totals: UsageTotals;
  agents: Array<UsageTotals & { agent: string; modelsUsed: string[] }>;
};

export type StoredMachineUsageSnapshot = {
  schemaVersion: 1;
  machineId: string;
  machineLabel: string;
  timezone: string;
  trackingStartedOn: string;
  confirmZeroFrom: string;
  reportedThrough: string;
  lastSyncedAt: string;
  ccusageVersion: string;
  days: MachineUsageDay[];
};

export type IncrementalUsagePayload = Omit<StoredMachineUsageSnapshot, "schemaVersion"> & {
  schemaVersion: 2;
  sourceInstanceId: string;
  allowHistoricalRewrite?: boolean;
};

export type AggregateUsageDay = MachineUsageDay & { coverage: number };

export type AggregateUsageSnapshot = Omit<StoredMachineUsageSnapshot, "machineId" | "days"> & {
  machineId: "aggregate";
  days: AggregateUsageDay[];
};

export const usageTotalsSchema = z.object({
  inputTokens: z.number().finite().nonnegative(),
  outputTokens: z.number().finite().nonnegative(),
  cacheCreationTokens: z.number().finite().nonnegative(),
  cacheReadTokens: z.number().finite().nonnegative(),
  totalTokens: z.number().finite().nonnegative(),
  totalCost: z.number().finite().nonnegative(),
});

const agentUsageSchema = usageTotalsSchema.extend({
  agent: z.string().trim().min(1).max(80),
  modelsUsed: z.array(z.string().max(160)).max(50),
});

const machineUsageDaySchema = z.object({
  date: z.string().regex(DATE_PATTERN),
  status: z.enum(["finalized", "reported_zero", "provisional"]),
  totals: usageTotalsSchema,
  agents: z.array(agentUsageSchema).max(100),
});

const aggregateUsageDaySchema = machineUsageDaySchema.extend({
  coverage: z.number().int().nonnegative(),
});

export const machineUsageSnapshotSchema = z.object({
  schemaVersion: z.literal(1),
  machineId: z.string().regex(MACHINE_PATTERN),
  machineLabel: z.string().trim().min(1).max(100),
  timezone: z.string().trim().min(1).max(100),
  trackingStartedOn: z.string().regex(DATE_PATTERN),
  confirmZeroFrom: z.string().regex(DATE_PATTERN),
  reportedThrough: z.string().regex(DATE_PATTERN),
  lastSyncedAt: z.string().datetime(),
  ccusageVersion: z.string().trim().min(1).max(40),
  days: z.array(machineUsageDaySchema).max(5000).superRefine((days, context) => {
    const dates = new Set<string>();
    days.forEach((day, index) => {
      if (dates.has(day.date)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: "Duplicate usage date", path: [index, "date"] });
      }
      dates.add(day.date);
    });
  }),
});

export const incrementalUsagePayloadSchema = machineUsageSnapshotSchema.omit({ schemaVersion: true }).extend({
  schemaVersion: z.literal(2),
  sourceInstanceId: z.string().regex(SOURCE_PATTERN),
  allowHistoricalRewrite: z.boolean().optional(),
});

export const aggregateUsageSnapshotSchema = machineUsageSnapshotSchema.omit({ machineId: true, days: true }).extend({
  machineId: z.literal("aggregate"),
  days: z.array(aggregateUsageDaySchema).max(5000).superRefine((days, context) => {
    const dates = new Set<string>();
    days.forEach((day, index) => {
      if (dates.has(day.date)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: "Duplicate usage date", path: [index, "date"] });
      }
      dates.add(day.date);
    });
  }),
});

const emptyTotals = () => ({
  inputTokens: 0,
  outputTokens: 0,
  cacheCreationTokens: 0,
  cacheReadTokens: 0,
  totalTokens: 0,
  totalCost: 0,
});

function addTotals(target: ReturnType<typeof emptyTotals>, source: ReturnType<typeof emptyTotals>) {
  target.inputTokens += source.inputTokens;
  target.outputTokens += source.outputTokens;
  target.cacheCreationTokens += source.cacheCreationTokens;
  target.cacheReadTokens += source.cacheReadTokens;
  target.totalTokens += source.totalTokens;
  target.totalCost += source.totalCost;
}

export function aggregateSnapshots(snapshots: StoredMachineUsageSnapshot[]): AggregateUsageSnapshot | null {
  if (!snapshots.length) return null;

  const days = new Map<string, {
    coverage: number;
    status: "finalized" | "reported_zero" | "provisional";
    totals: ReturnType<typeof emptyTotals>;
    agents: Map<string, ReturnType<typeof emptyTotals>>;
  }>();

  for (const snapshot of snapshots) {
    for (const day of snapshot.days) {
      const aggregate = days.get(day.date) || {
        coverage: 0,
        status: "reported_zero" as const,
        totals: emptyTotals(),
        agents: new Map<string, ReturnType<typeof emptyTotals>>(),
      };
      aggregate.coverage += 1;
      addTotals(aggregate.totals, day.totals);
      if (day.status === "provisional") aggregate.status = "provisional";
      else if (day.status === "finalized" && aggregate.status !== "provisional") aggregate.status = "finalized";

      for (const agent of day.agents) {
        const totals = aggregate.agents.get(agent.agent) || emptyTotals();
        addTotals(totals, agent);
        aggregate.agents.set(agent.agent, totals);
      }
      days.set(day.date, aggregate);
    }
  }

  const trackingStartedOn = snapshots.map((snapshot) => snapshot.trackingStartedOn).sort()[0];
  const confirmZeroFrom = snapshots.map((snapshot) => snapshot.confirmZeroFrom).sort().at(-1)!;
  const reportedThrough = snapshots.map((snapshot) => snapshot.reportedThrough).sort().at(-1)!;
  const lastSyncedAt = snapshots.map((snapshot) => snapshot.lastSyncedAt).sort().at(-1)!;

  return {
    schemaVersion: 1 as const,
    machineId: "aggregate",
    machineLabel: "Aggregated sources",
    timezone: "America/New_York",
    trackingStartedOn,
    confirmZeroFrom,
    reportedThrough,
    lastSyncedAt,
    ccusageVersion: "aggregated",
    days: [...days.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([date, day]) => ({
      date,
      coverage: day.coverage,
      status: day.status,
      totals: day.totals,
      agents: [...day.agents.entries()].map(([agent, totals]) => ({ agent, modelsUsed: [], ...totals })),
    })),
  };
}

export function overlayAggregateBaseline(
  live: AggregateUsageSnapshot | null,
  baseline: AggregateUsageSnapshot | null,
): AggregateUsageSnapshot | null {
  if (!baseline) return live;
  if (!live) return baseline;

  const baselineCutoff = baseline.days.at(-1)?.date || baseline.reportedThrough;
  const days = new Map(
    baseline.days
      .filter((day) => day.date <= baselineCutoff)
      .map((day) => [day.date, day]),
  );
  for (const day of live.days) {
    if (day.date > baselineCutoff) days.set(day.date, day);
  }

  return {
    schemaVersion: 1,
    machineId: "aggregate",
    machineLabel: "Aggregated sources",
    timezone: live.timezone,
    trackingStartedOn: [baseline.trackingStartedOn, live.trackingStartedOn].sort()[0],
    confirmZeroFrom: [baseline.confirmZeroFrom, live.confirmZeroFrom].sort().at(-1)!,
    reportedThrough: [baseline.reportedThrough, live.reportedThrough].sort().at(-1)!,
    lastSyncedAt: [baseline.lastSyncedAt, live.lastSyncedAt].sort().at(-1)!,
    ccusageVersion: "aggregated",
    days: [...days.values()].sort((left, right) => left.date.localeCompare(right.date)),
  };
}
