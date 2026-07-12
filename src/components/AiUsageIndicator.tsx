import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, CircleDollarSign, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import type { AiUsageResponse } from "@/features/ai-usage/types";
import { buildUsageModel, compact, totalsForDays } from "@/features/ai-usage/data";

const EMPTY_RESPONSE: AiUsageResponse = {
  generatedAt: new Date(0).toISOString(),
  expectedMachineIds: ["jesse-mbp", "jesse-desktop"],
  machines: [],
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

const AiUsageIndicator = () => {
  const query = useQuery<AiUsageResponse>({
    queryKey: ["public-ai-usage"],
    retry: 1,
    queryFn: async () => {
      const response = await fetch("/api/ai-usage");
      if (!response.ok) throw new Error("Unable to load usage data");
      return response.json();
    },
  });
  const model = buildUsageModel(query.data || EMPTY_RESPONSE);
  const monthTotals = totalsForDays(model.daily.filter((day) => day.date.startsWith(model.today.slice(0, 7))));

  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-5 lg:px-8">
        <Link className="group flex flex-col gap-5 rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between" to="/ai-usage">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Cpu className="h-5 w-5" /></div>
            <div><p className="flex items-center gap-2 text-sm font-semibold">Jesse's AI usage <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Live</span></p><p className="mt-1 text-xs text-muted-foreground">Claude · Codex · Hermes · updated daily</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:justify-end lg:gap-10">
            <div><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">This month</p><p className="mt-1 text-xl font-bold">{monthTotals.totalTokens ? compact(monthTotals.totalTokens) : "—"} <span className="text-xs font-normal text-muted-foreground">tokens</span></p></div>
            <div><p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><CircleDollarSign className="h-3 w-3" />Estimated cost</p><p className="mt-1 text-xl font-bold text-primary">{monthTotals.totalCost ? money(monthTotals.totalCost) : "—"}</p></div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AiUsageIndicator;
