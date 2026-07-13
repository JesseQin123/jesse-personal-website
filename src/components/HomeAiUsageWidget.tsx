import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { buildUsageModel, compact, totalsForDays } from "@/features/ai-usage/data";
import type { AiUsageResponse } from "@/features/ai-usage/types";

const EMPTY_RESPONSE: AiUsageResponse = {
  generatedAt: new Date(0).toISOString(),
  expectedMachineIds: ["jesse-mbp", "jesse-desktop"],
  machines: [],
};

function compactMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const HomeAiUsageWidget = () => {
  const query = useQuery<AiUsageResponse>({
    queryKey: ["public-ai-usage"],
    retry: 1,
    staleTime: 15 * 60 * 1000,
    queryFn: async () => {
      const response = await fetch("/api/ai-usage");
      if (!response.ok) throw new Error("Unable to load usage data");
      return response.json();
    },
  });

  const model = buildUsageModel(query.data || EMPTY_RESPONSE);
  const month = model.today.slice(0, 7);
  const totals = totalsForDays(model.daily.filter((day) => day.date.startsWith(month)));
  const hasData = totals.totalTokens > 0;

  return (
    <Link
      aria-label="View Jesse's live AI token usage"
      className="group mt-5 flex w-full max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-border bg-background/95 px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:max-w-xl"
      to="/ai-usage"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Cpu className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          AI usage this month
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-foreground sm:text-base">
          {hasData ? `${compact(totals.totalTokens)} tokens · ${compactMoney(totals.totalCost)} est.` : "View live token activity"}
        </span>
      </span>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
};

export default HomeAiUsageWidget;
