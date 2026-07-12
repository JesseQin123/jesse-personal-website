import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AiUsageResponse, UsageTotals } from "@/features/ai-usage/types";
import { buildUsageModel, compact, datesBetween, shiftDate, shortDate, totalsForDays, type DailyUsage } from "@/features/ai-usage/data";

const EMPTY_RESPONSE: AiUsageResponse = {
  generatedAt: new Date(0).toISOString(),
  expectedMachineIds: ["jesse-mbp", "jesse-desktop"],
  machines: [],
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

function cacheRate(totals: UsageTotals) {
  return totals.totalTokens ? (totals.cacheReadTokens / totals.totalTokens) * 100 : 0;
}

function StatCard({ icon: Icon, label, value, detail }: { icon: typeof Activity; label: string; value: string; detail: string }) {
  return (
    <Card className="relative overflow-hidden border-border/80 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 hero-gradient" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between"><p className="text-sm font-medium text-muted-foreground">{label}</p><Icon className="h-4 w-4 text-primary" /></div>
        <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
        <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function ActivityCalendar({ days, sourceCount, today }: { days: DailyUsage[]; sourceCount: number; today: string }) {
  const [metric, setMetric] = useState<"tokens" | "cost">("tokens");
  const observedDays = days.filter((day) => day.coverage > 0);
  const [selectedDate, setSelectedDate] = useState(observedDays.at(-1)?.date || today);
  const selected = days.find((day) => day.date === selectedDate);
  const gridStart = shiftDate("2026-01-01", -new Date("2026-01-01T12:00:00Z").getUTCDay());
  const gridEndBase = "2026-12-31";
  const gridEnd = shiftDate(gridEndBase, 6 - new Date(`${gridEndBase}T12:00:00Z`).getUTCDay());
  const calendarDates = datesBetween(gridStart, gridEnd);
  const weekCount = Math.ceil(calendarDates.length / 7);
  const byDate = new Map(days.map((day) => [day.date, day]));
  const values = observedDays.map((day) => metric === "tokens" ? day.totalTokens : day.totalCost).filter((value) => value > 0).sort((a, b) => a - b);
  const threshold = (percentile: number) => values[Math.min(values.length - 1, Math.floor(values.length * percentile))] || 0;
  const thresholds = [threshold(0.2), threshold(0.45), threshold(0.7), threshold(0.9)];
  const palettes = metric === "tokens"
    ? ["#FFF1E8", "#FFD2B5", "#FF9B5B", "#F26A21", "#B63E00"]
    : ["#E8F6F4", "#AEE1DB", "#57BFB5", "#078A8B", "#045B60"];
  const valueFor = (day?: DailyUsage) => day ? (metric === "tokens" ? day.totalTokens : day.totalCost) : 0;
  const colorFor = (date: string, day?: DailyUsage) => {
    if (date > today || !date.startsWith("2026")) return "transparent";
    if (!day || day.coverage === 0) return "#EBEDF0";
    const value = valueFor(day);
    const level = value <= thresholds[0] ? 0 : value <= thresholds[1] ? 1 : value <= thresholds[2] ? 2 : value <= thresholds[3] ? 3 : 4;
    return palettes[level];
  };
  const monthLabels = Array.from({ length: 12 }, (_, index) => {
    const date = `2026-${String(index + 1).padStart(2, "0")}-01`;
    const daysFromStart = Math.round((new Date(`${date}T12:00:00Z`).getTime() - new Date(`${gridStart}T12:00:00Z`).getTime()) / 86_400_000);
    return { label: new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`)), column: Math.floor(daysFromStart / 7) + 2 };
  });
  const statusFor = (day?: DailyUsage) => !day || day.coverage === 0 ? "Pending" : day.coverage >= sourceCount ? "Complete" : "Partial";
  const fresh = selected ? selected.inputTokens + selected.outputTokens : 0;

  return (
    <Card className="mt-8 border-border/80 shadow-sm">
      <CardHeader className="gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div><CardTitle className="text-xl">2026 daily activity</CardTitle><p className="mt-2 text-sm text-muted-foreground">Select any day to inspect Jesse's aggregated usage.</p></div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-border bg-secondary/40 p-1" aria-label="Calendar metric">
            {(["tokens", "cost"] as const).map((item) => <button aria-pressed={metric === item} className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${metric === item ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`} key={item} onClick={() => setMetric(item)} type="button">{item}</button>)}
          </div>
          <span className="rounded-lg bg-[#071827] px-4 py-2 text-sm font-bold text-white">2026</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-3">
          <div className="min-w-[1040px]" style={{ display: "grid", gridTemplateColumns: `44px repeat(${weekCount}, 14px)`, gridTemplateRows: "22px repeat(7, 14px)", gap: "4px" }}>
            {monthLabels.map((month) => <span className="text-xs font-medium text-muted-foreground" key={month.label} style={{ gridColumn: month.column, gridRow: 1 }}>{month.label}</span>)}
            {[{ label: "Mon", row: 3 }, { label: "Wed", row: 5 }, { label: "Fri", row: 7 }].map((weekday) => <span className="self-center text-xs text-muted-foreground" key={weekday.label} style={{ gridColumn: 1, gridRow: weekday.row }}>{weekday.label}</span>)}
            {calendarDates.map((date, index) => {
              const day = byDate.get(date);
              const outside = !date.startsWith("2026") || date > today;
              const label = day ? `${date}: ${compact(day.totalTokens)} tokens, ${money(day.totalCost)}, ${statusFor(day)} coverage` : `${date}: no reported data`;
              return <button aria-label={label} aria-pressed={selectedDate === date} className={`rounded-[3px] border transition-transform focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${outside ? "cursor-default border-transparent" : "hover:scale-125 hover:border-foreground/30"} ${selectedDate === date ? "z-10 scale-125 border-foreground ring-1 ring-background" : "border-black/5"}`} disabled={outside} key={date} onClick={() => setSelectedDate(date)} style={{ backgroundColor: colorFor(date, day), gridColumn: Math.floor(index / 7) + 2, gridRow: (index % 7) + 2 }} title={label} type="button" />;
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Selected day</p><p className="mt-1 font-bold">{selectedDate}</p></div>
            <div><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tokens</p><p className="mt-1 font-bold">{selected ? compact(selected.totalTokens) : "—"}</p></div>
            <div><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estimated cost</p><p className="mt-1 font-bold text-primary">{selected ? money(selected.totalCost) : "—"}</p></div>
            <div><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Fresh I/O</p><p className="mt-1 font-bold">{selected ? compact(fresh) : "—"}</p></div>
            <div><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Coverage</p><p className="mt-1 font-bold">{statusFor(selected)}</p></div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span>Less</span>{palettes.map((color) => <i className="h-3 w-3 rounded-[3px] border border-black/5" key={color} style={{ backgroundColor: color }} />)}<span>More</span></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AiUsageDashboard() {
  const [showAllDays, setShowAllDays] = useState(false);
  const query = useQuery<AiUsageResponse>({
    queryKey: ["public-ai-usage"],
    retry: 2,
    refetchInterval: 15 * 60 * 1000,
    queryFn: async () => {
      const response = await fetch("/api/ai-usage");
      if (!response.ok) throw new Error("Unable to load usage data");
      return response.json();
    },
  });
  const model = buildUsageModel(query.data || EMPTY_RESPONSE);
  const latestFresh = model.latest.inputTokens + model.latest.outputTokens;
  const monthDays = model.daily.filter((day) => day.date.startsWith(model.today.slice(0, 7)));
  const monthTotals = totalsForDays(monthDays);
  const recent = model.daily.slice(-30);
  const observedRows = [...model.daily].reverse().filter((day) => day.coverage > 0);
  const displayedRows = showAllDays ? observedRows : observedRows.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative mx-auto px-4 py-14 lg:px-8 lg:py-20">
            <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"><Sparkles className="h-3.5 w-3.5" />PUBLIC AI ACTIVITY</div>
                <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-6xl">How much AI does Jesse use?</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">A transparent daily record of Jesse's Claude, Codex, and Hermes workflows—measured in tokens processed, fresh input/output, cache reuse, and estimated cost.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/90 p-6 shadow-xl backdrop-blur-sm lg:p-8">
                <div className="flex items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Latest observed day</span><span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" />LIVE</span></div>
                <p className="mt-5 text-5xl font-extrabold tracking-tight lg:text-6xl">{model.latest.totalTokens ? compact(model.latest.totalTokens) : "—"}</p>
                <p className="mt-2 text-sm text-muted-foreground">tokens processed on {shortDate(model.latest.date)} · unified Jesse total</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 lg:px-8 lg:py-14">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Activity} label="Latest processed" value={model.latest.totalTokens ? compact(model.latest.totalTokens) : "—"} detail={`${compact(latestFresh)} fresh I/O · ${cacheRate(model.latest).toFixed(1)}% cache`} />
            <StatCard icon={CircleDollarSign} label="Latest estimated cost" value={model.latest.totalCost ? money(model.latest.totalCost) : "—"} detail={`Observed on ${shortDate(model.latest.date)}`} />
            <StatCard icon={Zap} label="This month processed" value={monthTotals.totalTokens ? compact(monthTotals.totalTokens) : "—"} detail="Across all connected sources" />
            <StatCard icon={CircleDollarSign} label="This month estimated cost" value={monthTotals.totalCost ? money(monthTotals.totalCost) : "—"} detail="Based on ccusage model pricing" />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
            <Card className="border-border/80 shadow-sm">
              <CardHeader><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Last 30 days</p><CardTitle className="mt-2 text-2xl">Daily token throughput</CardTitle></div><div className="flex gap-4 text-xs text-muted-foreground"><span><i className="mr-1.5 inline-block h-2 w-2 bg-[#111827]" />Codex</span><span><i className="mr-1.5 inline-block h-2 w-2 bg-[#f97316]" />Claude</span><span><i className="mr-1.5 inline-block h-2 w-2 bg-[#0d9488]" />Hermes</span></div></div></CardHeader>
              <CardContent><div className="h-[360px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={recent} barCategoryGap="20%"><CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 4" vertical={false} /><XAxis axisLine={false} dataKey="date" fontSize={11} tickFormatter={shortDate} tickLine={false} /><YAxis axisLine={false} fontSize={11} tickFormatter={compact} tickLine={false} width={48} /><Tooltip formatter={(value: number) => compact(value)} labelFormatter={(label) => shortDate(String(label))} /><Bar dataKey="codex" fill="#111827" isAnimationActive={false} stackId="tokens" /><Bar dataKey="claude" fill="#f97316" isAnimationActive={false} stackId="tokens" /><Bar dataKey="hermes" fill="#0d9488" isAnimationActive={false} stackId="tokens" /></BarChart></ResponsiveContainer></div></CardContent>
            </Card>

            <Card className="border-border/80 bg-foreground text-background shadow-sm">
              <CardHeader><p className="text-xs font-semibold uppercase tracking-wider text-primary">Year to date</p><CardTitle className="text-2xl text-background">2026 activity</CardTitle></CardHeader>
              <CardContent className="space-y-7">
                <div><p className="text-sm text-background/60">Total tokens processed</p><p className="mt-2 text-4xl font-bold">{model.yearTotals.totalTokens ? compact(model.yearTotals.totalTokens) : "—"}</p></div>
                <div className="border-t border-background/15 pt-6"><p className="text-sm text-background/60">Total estimated cost</p><p className="mt-2 break-words text-3xl font-bold tabular-nums text-primary 2xl:text-4xl">{model.yearTotals.totalCost ? money(model.yearTotals.totalCost) : "—"}</p></div>
                <div className="grid grid-cols-2 gap-5 border-t border-background/15 pt-6"><div><p className="text-xs text-background/50">Fresh input</p><p className="mt-1 text-xl font-semibold">{compact(model.yearTotals.inputTokens)}</p></div><div><p className="text-xs text-background/50">Generated output</p><p className="mt-1 text-xl font-semibold">{compact(model.yearTotals.outputTokens)}</p></div></div>
                <div className="rounded-xl bg-background/10 p-4 text-sm leading-6 text-background/70"><CheckCircle2 className="mb-2 h-4 w-4 text-primary" />Prompt contents, project names, and source code are never uploaded—only aggregate token counts.</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Activity calendar</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Jesse's AI activity, day by day</h2><p className="mt-3 max-w-2xl text-muted-foreground">A GitHub-style view of daily token throughput and estimated cost. Source names stay private and all values are aggregated.</p></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><RefreshCw className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`} />Refreshes every 15 minutes</div></div>
            <ActivityCalendar days={model.daily} sourceCount={model.machines.length || 2} today={model.today} />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Daily ledger</p><h2 className="mt-2 text-3xl font-bold tracking-tight">{showAllDays ? "All observed days" : "Recent observed days"}</h2></div><button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary" onClick={() => setShowAllDays((value) => !value)} type="button"><CalendarDays className="h-4 w-4" />{showAllDays ? "Recent only" : "All days"}</button></div>
          <div className="mt-7 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[780px] text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Date</th><th className="p-4">Coverage</th><th className="p-4 text-right">Input</th><th className="p-4 text-right">Output</th><th className="p-4 text-right">Cache read</th><th className="p-4 text-right">Total</th><th className="p-4 text-right">Cost</th></tr></thead><tbody>{displayedRows.map((day) => <tr className="border-t border-border" key={day.date}><td className="p-4 font-medium">{day.date}</td><td className="p-4"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs">{day.coverage}/{model.machines.length || 2}</span></td><td className="p-4 text-right text-muted-foreground">{compact(day.inputTokens)}</td><td className="p-4 text-right text-muted-foreground">{compact(day.outputTokens)}</td><td className="p-4 text-right text-muted-foreground">{compact(day.cacheReadTokens)}</td><td className="p-4 text-right font-semibold">{compact(day.totalTokens)}</td><td className="p-4 text-right">{money(day.totalCost)}</td></tr>)}</tbody></table>
            {!displayedRows.length && <div className="flex items-center justify-center gap-2 p-12 text-sm text-muted-foreground"><Clock3 className="h-4 w-4" />Waiting for the first sync.</div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
