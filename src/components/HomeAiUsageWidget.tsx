import { ArrowUpRight, CircleAlert, Cpu, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { buildUsageModel, compact, shiftDate, shortDate, totalsForDays } from "@/features/ai-usage/data";
import { EMPTY_AI_USAGE_RESPONSE, useAiUsage } from "@/features/ai-usage/useAiUsage";
import { cn } from "@/lib/utils";

function compactMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const HomeAiUsageWidget = ({
  variant = "card",
  className,
}: {
  variant?: "card" | "compact";
  className?: string;
}) => {
  const query = useAiUsage();
  const model = buildUsageModel(query.data || EMPTY_AI_USAGE_RESPONSE);
  const month = model.today.slice(0, 7);
  const monthDays = model.daily.filter((day) => day.date.startsWith(month));
  const totals = totalsForDays(monthDays);
  const hasReportedData = model.daily.some((day) => day.coverage > 0);
  const monthHasReportedData = monthDays.some((day) => day.coverage > 0);
  const isFresh = hasReportedData && model.latest.date >= shiftDate(model.today, -2);
  const status = query.isError ? "Unavailable" : query.isPending ? "Loading" : !hasReportedData ? "Waiting" : isFresh ? "Live" : "Stale";
  const StatusIcon = query.isError ? CircleAlert : Radio;
  const statusIsHealthy = status === "Live";
  const tokenValue = monthHasReportedData
    ? compact(totals.totalTokens)
    : query.isError
      ? "Unavailable"
      : query.isPending
        ? "Loading…"
        : "Waiting";

  if (variant === "compact") {
    return (
      <Link
        className={cn(
          "group mt-6 flex w-full max-w-xl items-center gap-3 rounded-xl border border-border bg-background/90 p-3.5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
          className,
        )}
        to="/ai-usage"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Cpu className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Live AI usage
            <span className={`inline-flex items-center gap-1 normal-case tracking-normal ${statusIsHealthy ? "text-emerald-700" : "text-amber-700"}`}>
              <StatusIcon className={`h-3 w-3 ${query.isFetching ? "animate-pulse" : ""}`} /> {status}
            </span>
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-foreground sm:text-base">
            {tokenValue} tokens this month
          </span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    );
  }

  return (
    <Link
      className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-foreground bg-foreground p-7 text-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl lg:p-9"
      to="/ai-usage"
    >
      <div className="hero-gradient absolute inset-x-0 top-0 h-1" />
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Cpu className="h-4 w-4" /> AI usage telemetry
        </span>
        <span className={`inline-flex items-center gap-2 text-xs font-semibold ${statusIsHealthy ? "text-emerald-400" : "text-amber-300"}`}>
          <StatusIcon className={`h-3.5 w-3.5 ${query.isFetching ? "animate-pulse" : ""}`} /> {status}
        </span>
      </div>

      <div className="mt-10">
        <p className="text-sm text-background/55">Tokens processed this month</p>
        <p className="mt-3 text-5xl font-bold tracking-tight text-background lg:text-6xl">
          {tokenValue}
        </p>
        <p className="mt-3 text-sm text-background/55">
          {monthHasReportedData
            ? `${compactMoney(totals.totalCost)} estimated model cost · latest ${shortDate(model.latest.date)}`
            : query.isError ? "The last request failed; try the activity ledger again shortly" : "Connecting to the public activity ledger"}
        </p>
      </div>

      <p className="mt-8 max-w-xl text-base leading-7 text-background/70">
        A transparent indicator of the AI-assisted work behind the projects—across Codex,
        Claude, Hermes, and the systems that connect them.
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-background">
        Explore the activity ledger
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default HomeAiUsageWidget;
