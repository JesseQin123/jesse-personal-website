export type UsageTotals = {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  totalTokens: number;
  totalCost: number;
};

export type AgentUsage = UsageTotals & {
  agent: string;
  modelsUsed: string[];
};

export type MachineUsageDay = {
  date: string;
  status: "finalized" | "reported_zero" | "provisional";
  coverage?: number;
  totals: UsageTotals;
  agents: AgentUsage[];
};

export type MachineUsageSnapshot = {
  schemaVersion: 1;
  sourceInstanceId?: string;
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

export type AiUsageResponse = {
  generatedAt: string;
  expectedMachineIds?: string[];
  expectedSourceCount?: number;
  machines: MachineUsageSnapshot[];
};
