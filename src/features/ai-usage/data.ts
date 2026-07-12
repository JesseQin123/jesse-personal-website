import type { AiUsageResponse, MachineUsageDay, MachineUsageSnapshot, UsageTotals } from "@/features/ai-usage/types";

export type DailyUsage = UsageTotals & {
  date: string;
  coverage: number;
  claude: number;
  claudeCost: number;
  codex: number;
  codexCost: number;
  hermes: number;
  hermesCost: number;
};

export type MachineView = {
  machineId: string;
  machineLabel: string;
  snapshot?: MachineUsageSnapshot;
};

const EMPTY: UsageTotals = {
  inputTokens: 0,
  outputTokens: 0,
  cacheCreationTokens: 0,
  cacheReadTokens: 0,
  totalTokens: 0,
  totalCost: 0,
};

const LABELS: Record<string, string> = {
  "jesse-mbp": "Jesse's MacBook Pro",
  "jesse-desktop": "Jesse's Desktop",
};

export function shiftDate(date: string, amount: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}

export function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function datesBetween(start: string, end: string) {
  const dates: string[] = [];
  for (let cursor = start; cursor <= end; cursor = shiftDate(cursor, 1)) dates.push(cursor);
  return dates;
}

function add(target: UsageTotals, source: UsageTotals) {
  target.inputTokens += source.inputTokens;
  target.outputTokens += source.outputTokens;
  target.cacheCreationTokens += source.cacheCreationTokens;
  target.cacheReadTokens += source.cacheReadTokens;
  target.totalTokens += source.totalTokens;
  target.totalCost += source.totalCost;
}

export function buildUsageModel(response: AiUsageResponse) {
  const machineIds = [...new Set([...response.expectedMachineIds, ...response.machines.map((machine) => machine.machineId)])];
  const machines: MachineView[] = machineIds.map((machineId) => {
    const snapshot = response.machines.find((machine) => machine.machineId === machineId);
    return { machineId, machineLabel: snapshot?.machineLabel || LABELS[machineId] || machineId, snapshot };
  });
  const today = localDate();
  const start = "2026-01-01";
  const daily = datesBetween(start, today).map<DailyUsage>((date) => {
    const item: DailyUsage = { date, coverage: 0, claude: 0, claudeCost: 0, codex: 0, codexCost: 0, hermes: 0, hermesCost: 0, ...EMPTY };
    for (const machine of response.machines) {
      const day = machine.days.find((candidate) => candidate.date === date);
      if (!day) continue;
      item.coverage += 1;
      add(item, day.totals);
      for (const agent of day.agents) {
        if (agent.agent === "claude") { item.claude += agent.totalTokens; item.claudeCost += agent.totalCost; }
        if (agent.agent === "codex") { item.codex += agent.totalTokens; item.codexCost += agent.totalCost; }
        if (agent.agent === "hermes") { item.hermes += agent.totalTokens; item.hermesCost += agent.totalCost; }
      }
    }
    return item;
  });
  const observed = daily.filter((day) => day.coverage > 0);
  const latest = observed.at(-1) || daily.at(-1)!;
  const yearTotals = observed.reduce<UsageTotals>((totals, day) => {
    add(totals, day);
    return totals;
  }, { ...EMPTY });
  return { daily, latest, machines, today, yearTotals };
}

export function compact(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 100_000_000 ? 1 : 2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

export function totalsForDays(days: DailyUsage[]) {
  return days.reduce<UsageTotals>((totals, day) => {
    add(totals, day);
    return totals;
  }, { ...EMPTY });
}

export function shortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export function dayStatus(day?: MachineUsageDay) {
  if (!day) return "missing" as const;
  if (day.status === "reported_zero") return "zero" as const;
  if (day.status === "provisional") return "provisional" as const;
  return "reported" as const;
}
