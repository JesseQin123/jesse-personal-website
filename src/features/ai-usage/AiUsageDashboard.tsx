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
import { buildUsageModel, compact, shortDate, totalsForDays } from "@/features/ai-usage/data";

const EMPTY_RESPONSE: AiUsageResponse = {
  generatedAt: new Date(0).toISOString(),
  expectedMachineIds: ["jesse-mbp", "jesse-desktop"],
  machines: [],
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
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

export default function AiUsageDashboard() {
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
  const monthAgentCosts = {
    codex: monthDays.reduce((sum, day) => sum + day.codexCost, 0),
    claude: monthDays.reduce((sum, day) => sum + day.claudeCost, 0),
    hermes: monthDays.reduce((sum, day) => sum + day.hermesCost, 0),
  };
  const recent = model.daily.slice(-30);
  const recentRows = [...model.daily].reverse().filter((day) => day.coverage > 0).slice(0, 10);
  const coverageDays = model.daily.slice(-84);
  const coverageCounts = coverageDays.reduce((counts, day) => {
    if (day.coverage === 0) counts.pending += 1;
    else if (day.coverage >= model.machines.length) counts.complete += 1;
    else counts.partial += 1;
    return counts;
  }, { complete: 0, partial: 0, pending: 0 });
  const connectedSources = model.machines.filter((machine) => machine.snapshot).length;

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
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">A transparent daily record of Claude, Codex, and Hermes usage across Jesse's computers—measured in tokens processed, fresh input/output, cache reuse, and estimated cost.</p>
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
            <StatCard icon={Zap} label="This month processed" value={monthTotals.totalTokens ? compact(monthTotals.totalTokens) : "—"} detail="Across all reporting machines" />
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
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"><div><p className="text-sm text-background/60">Total tokens processed</p><p className="mt-2 text-4xl font-bold">{model.yearTotals.totalTokens ? compact(model.yearTotals.totalTokens) : "—"}</p></div><div><p className="text-sm text-background/60">Total estimated cost</p><p className="mt-2 text-4xl font-bold text-primary">{model.yearTotals.totalCost ? money(model.yearTotals.totalCost) : "—"}</p></div></div>
                <div className="grid grid-cols-2 gap-5 border-t border-background/15 pt-6"><div><p className="text-xs text-background/50">Fresh input</p><p className="mt-1 text-xl font-semibold">{compact(model.yearTotals.inputTokens)}</p></div><div><p className="text-xs text-background/50">Generated output</p><p className="mt-1 text-xl font-semibold">{compact(model.yearTotals.outputTokens)}</p></div></div>
                <div className="border-t border-background/15 pt-6"><p className="text-xs uppercase tracking-wider text-background/50">This month by agent</p><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>Codex</span><strong>{money(monthAgentCosts.codex)}</strong></div><div className="flex justify-between"><span>Claude</span><strong>{money(monthAgentCosts.claude)}</strong></div><div className="flex justify-between"><span>Hermes</span><strong>{money(monthAgentCosts.hermes)}</strong></div><div className="flex justify-between border-t border-background/15 pt-3 text-primary"><span>Total</span><strong>{money(monthTotals.totalCost)}</strong></div></div></div>
                <div className="rounded-xl bg-background/10 p-4 text-sm leading-6 text-background/70"><CheckCircle2 className="mb-2 h-4 w-4 text-primary" />Prompt contents, project names, and source code are never uploaded—only aggregate token counts.</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Data completeness</p><h2 className="mt-2 text-3xl font-bold tracking-tight">One unified Jesse AI ledger</h2><p className="mt-3 max-w-2xl text-muted-foreground">Usage from every configured source is merged into one daily total. Source names stay private; incomplete history remains visible instead of being treated as zero.</p></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><RefreshCw className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`} />Refreshes every 15 minutes</div></div>
            <Card className="mt-8 border-border/80 shadow-sm">
              <CardContent className="p-6 lg:p-8">
                <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
                  <div><p className="text-sm text-muted-foreground">Reporting coverage</p><p className="mt-2 text-4xl font-bold">{connectedSources}/{model.machines.length || 2}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">sources currently contributing to Jesse's unified totals</p></div>
                  <div><div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5">{coverageDays.map((day) => { const status = day.coverage === 0 ? "pending" : day.coverage >= model.machines.length ? "complete" : "partial"; const color = status === "complete" ? "bg-emerald-500" : status === "partial" ? "bg-primary" : "bg-muted"; return <div className={`aspect-square rounded-[3px] ${color}`} key={day.date} title={`${day.date}: ${status}`} />; })}</div><div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-emerald-500" />Complete {coverageCounts.complete}</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-primary" />Partial {coverageCounts.partial}</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-muted" />Pending {coverageCounts.pending}</span></div></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Daily ledger</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Recent observed days</h2></div><CalendarDays className="h-7 w-7 text-primary" /></div>
          <div className="mt-7 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[780px] text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Date</th><th className="p-4">Coverage</th><th className="p-4 text-right">Input</th><th className="p-4 text-right">Output</th><th className="p-4 text-right">Cache read</th><th className="p-4 text-right">Total</th><th className="p-4 text-right">Cost</th></tr></thead><tbody>{recentRows.map((day) => <tr className="border-t border-border" key={day.date}><td className="p-4 font-medium">{day.date}</td><td className="p-4"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs">{day.coverage}/{model.machines.length || 2}</span></td><td className="p-4 text-right text-muted-foreground">{compact(day.inputTokens)}</td><td className="p-4 text-right text-muted-foreground">{compact(day.outputTokens)}</td><td className="p-4 text-right text-muted-foreground">{compact(day.cacheReadTokens)}</td><td className="p-4 text-right font-semibold">{compact(day.totalTokens)}</td><td className="p-4 text-right">{money(day.totalCost)}</td></tr>)}</tbody></table>
            {!recentRows.length && <div className="flex items-center justify-center gap-2 p-12 text-sm text-muted-foreground"><Clock3 className="h-4 w-4" />Waiting for the first machine sync.</div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
