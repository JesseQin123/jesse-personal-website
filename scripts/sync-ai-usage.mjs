#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";

const CCUSAGE_VERSION = "20.0.17";
const dryRun = process.argv.includes("--dry-run");
const allowHistoricalRewrite = process.argv.includes("--allow-historical-rewrite");

function argument(name) {
  return process.argv.find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3);
}

function readJson(path) {
  if (!path || !existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`Invalid JSON config at ${path}: ${error.message}`);
  }
}

function readDotEnv(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index);
        const value = line.slice(index + 1).replace(/^['"]|['"]$/g, "");
        return [key, value];
      }),
  );
}

function loadOrCreateSourceInstanceId(machineId, configuredId) {
  if (configuredId) return configuredId;
  const path = argument("source-id-file") || resolve(homedir(), ".config", "jesse-ai-usage", `${machineId}.source-id`);
  if (existsSync(path)) return readFileSync(path, "utf8").trim();
  const sourceInstanceId = randomUUID();
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  writeFileSync(path, `${sourceInstanceId}\n`, { mode: 0o600 });
  console.log(`[ai-usage] Created a persistent source identity for ${machineId}.`);
  return sourceInstanceId;
}

function fail(message) {
  console.error(`[ai-usage] ${message}`);
  process.exit(1);
}

function dateInTimezone(timezone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function shiftDate(date, amount) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}

function dateRange(start, end) {
  const dates = [];
  for (let cursor = start; cursor <= end; cursor = shiftDate(cursor, 1)) dates.push(cursor);
  return dates;
}

function findBunx() {
  const candidates = [
    process.env.BUNX_PATH,
    resolve(homedir(), ".bun", "bin", "bunx"),
    "/opt/homebrew/bin/bunx",
    "/usr/local/bin/bunx",
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) || "bunx";
}

function number(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function normalizeAgent(agent) {
  return {
    agent: String(agent.agent || "unknown").toLowerCase(),
    inputTokens: number(agent.inputTokens),
    outputTokens: number(agent.outputTokens),
    cacheCreationTokens: number(agent.cacheCreationTokens),
    cacheReadTokens: number(agent.cacheReadTokens),
    totalTokens: number(agent.totalTokens),
    totalCost: number(agent.totalCost),
    modelsUsed: Array.isArray(agent.modelsUsed) ? agent.modelsUsed.map(String) : [],
  };
}

function normalizeTotals(day) {
  return {
    inputTokens: number(day?.inputTokens),
    outputTokens: number(day?.outputTokens),
    cacheCreationTokens: number(day?.cacheCreationTokens),
    cacheReadTokens: number(day?.cacheReadTokens),
    totalTokens: number(day?.totalTokens),
    totalCost: number(day?.totalCost),
  };
}

async function uploadWithRetry(endpoint, secret, payload) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.text();
      if (!response.ok) throw new Error(`${response.status} ${body}`);
      return body ? JSON.parse(body) : {};
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolvePromise) => setTimeout(resolvePromise, attempt * 1000));
    }
  }
  throw lastError;
}

async function loadRemoteSnapshot(endpoint, machineId) {
  const readEndpoint = argument("read-endpoint") || endpoint.replace(/\/api\/ai-usage-sync\/?$/, "/api/ai-usage");
  try {
    const response = await fetch(`${readEndpoint}?machine=${encodeURIComponent(machineId)}&sync=${Date.now()}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    const body = await response.json();
    return Array.isArray(body.machines) ? body.machines.find((machine) => machine.machineId === machineId) : undefined;
  } catch (error) {
    console.warn(`[ai-usage] Could not compare with the remote snapshot; uploading all locally observed dates (${error.message}).`);
    return undefined;
  }
}

function sameDay(left, right) {
  return Boolean(left && right && JSON.stringify(left) === JSON.stringify(right));
}

const configPath = argument("config") || resolve(homedir(), ".config", "jesse-ai-usage.json");
const fileConfig = readJson(configPath);
const localEnv = readDotEnv(resolve(process.cwd(), ".env.local"));
const timezone = argument("timezone") || process.env.AI_USAGE_TIMEZONE || fileConfig.timezone || "America/New_York";
const today = dateInTimezone(timezone);
const settings = {
  endpoint: argument("endpoint") || process.env.AI_USAGE_ENDPOINT || fileConfig.endpoint,
  machineId: argument("machine-id") || process.env.AI_USAGE_MACHINE_ID || fileConfig.machineId,
  machineLabel: argument("machine-label") || process.env.AI_USAGE_MACHINE_LABEL || fileConfig.machineLabel,
  startDate: argument("start-date") || process.env.AI_USAGE_START_DATE || fileConfig.startDate || "2026-01-01",
  confirmZeroFrom: argument("confirm-zero-from") || process.env.AI_USAGE_CONFIRM_ZERO_FROM || fileConfig.confirmZeroFrom || today,
  sourceInstanceId: argument("source-id") || process.env.AI_USAGE_SOURCE_INSTANCE_ID || fileConfig.sourceInstanceId,
  syncSecret: process.env.AI_USAGE_SYNC_SECRET || localEnv.AI_USAGE_SYNC_SECRET || fileConfig.syncSecret,
  timezone,
};

for (const key of ["endpoint", "machineId", "machineLabel", "syncSecret"]) {
  if (!settings[key]) fail(`Missing ${key}. Provide it by CLI argument, environment variable, or ${configPath}.`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(settings.startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(settings.confirmZeroFrom)) {
  fail("startDate and confirmZeroFrom must use YYYY-MM-DD.");
}
if (!/^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(settings.machineId)) fail("Invalid machineId.");
settings.sourceInstanceId = loadOrCreateSourceInstanceId(settings.machineId, settings.sourceInstanceId);
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(settings.sourceInstanceId)) {
  fail("sourceInstanceId must be a UUID. Remove the source-id file to regenerate it.");
}

console.log(`[ai-usage] Scanning ${settings.machineLabel} from ${settings.startDate} through ${today}…`);
let report;
try {
  const raw = execFileSync(findBunx(), [
    `ccusage@${CCUSAGE_VERSION}`,
    "daily", "--json", "--by-agent",
    "--since", settings.startDate,
    "--until", today,
    "--timezone", settings.timezone,
  ], { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
  report = JSON.parse(raw);
} catch (error) {
  fail(`ccusage failed: ${error.stderr?.toString() || error.message}`);
}

const rowsByDate = new Map((report.daily || []).map((day) => [day.period || day.date, day]));
const days = dateRange(settings.startDate, today).flatMap((date) => {
  const source = rowsByDate.get(date);
  const shouldConfirm = date >= settings.confirmZeroFrom;
  if (!source && !shouldConfirm) return [];
  const totals = normalizeTotals(source);
  return [{
    date,
    status: date === today ? "provisional" : source ? "finalized" : "reported_zero",
    totals,
    agents: Array.isArray(source?.agents) ? source.agents.map(normalizeAgent) : [],
  }];
});

const remoteSnapshot = await loadRemoteSnapshot(settings.endpoint, settings.machineId);
if (remoteSnapshot?.sourceInstanceId && remoteSnapshot.sourceInstanceId !== settings.sourceInstanceId) {
  fail(`machineId ${settings.machineId} belongs to a different computer. Choose a unique machineId for this source.`);
}
const remoteDays = new Map((remoteSnapshot?.days || []).map((day) => [day.date, day]));
const alwaysRefreshFrom = shiftDate(today, -1);
const changedDays = allowHistoricalRewrite
  ? days
  : days.filter((day) => day.date >= alwaysRefreshFrom || !sameDay(remoteDays.get(day.date), day));

const payload = {
  schemaVersion: 2,
  sourceInstanceId: settings.sourceInstanceId,
  machineId: settings.machineId,
  machineLabel: settings.machineLabel,
  timezone: settings.timezone,
  trackingStartedOn: settings.startDate,
  confirmZeroFrom: settings.confirmZeroFrom,
  reportedThrough: shiftDate(today, -1),
  lastSyncedAt: new Date().toISOString(),
  ccusageVersion: CCUSAGE_VERSION,
  allowHistoricalRewrite,
  days: changedDays,
};

const placeholders = dateRange(settings.startDate, shiftDate(today, -1)).length - days.filter((day) => day.date < today).length;
const backfilledDates = changedDays.filter((day) => day.date < alwaysRefreshFrom && !remoteDays.has(day.date)).length;
console.log(`[ai-usage] Found ${days.length} local reported days; ${changedDays.length} need upsert (${backfilledDates} missing historical dates).`);
console.log(`[ai-usage] ${Math.max(0, placeholders)} historical dates remain placeholders on this source.`);
const outputPath = argument("output");
if (outputPath) {
  writeFileSync(resolve(outputPath), `${JSON.stringify(payload, null, 2)}\n`, { mode: 0o600 });
  console.log(`[ai-usage] Wrote payload to ${resolve(outputPath)}.`);
}
if (dryRun) {
  console.log(`[ai-usage] Dry run complete. ${changedDays.length} dates would be uploaded; latest total: ${days.at(-1)?.totals.totalTokens.toLocaleString() || 0} tokens.`);
  process.exit(0);
}

try {
  const result = await uploadWithRetry(settings.endpoint, settings.syncSecret, payload);
  console.log(`[ai-usage] Upserted ${result.daysUpdated ?? changedDays.length} dates; ${result.daysStored ?? days.length} dates stored through ${result.reportedThrough}.`);
} catch (error) {
  fail(`Upload failed after 3 attempts: ${error.message}`);
}
