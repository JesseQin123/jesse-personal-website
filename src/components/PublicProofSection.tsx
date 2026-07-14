import { ArrowUpRight, Code2, Github, GitPullRequest } from "lucide-react";
import HomeAiUsageWidget from "@/components/HomeAiUsageWidget";

const projectSignals = ["AI systems", "Knowledge tools", "Open experiments"];

const PublicProofSection = () => (
  <section id="proof" className="scroll-mt-20 border-y border-border bg-secondary/30 py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 max-w-3xl lg:mb-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Building in public</p>
        <h2 className="mb-5 text-3xl font-bold lg:text-5xl">The work leaves evidence.</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Ideas are useful, but shipped systems and a visible building practice say more.
          GitHub shows what I make; AI usage shows how deeply AI is embedded in the way I work.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <a
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl lg:p-9"
          href="https://github.com/JesseQin123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Github className="h-4 w-4" /> GitHub projects
            </span>
            <Code2 className="h-5 w-5 text-muted-foreground" />
          </div>

          <h3 className="mt-10 max-w-lg text-3xl font-bold leading-tight lg:text-4xl">
            Projects, prototypes, and systems in progress.
          </h3>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            GitHub is the implementation trail behind the portfolio: working software,
            evolving architectures, experiments, and tools built to solve real problems.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {projectSignals.map((signal) => (
              <span key={signal} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/75">
                {signal}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-foreground">
            Explore the project archive
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <GitPullRequest className="absolute -bottom-8 -right-6 h-36 w-36 rotate-12 text-primary/[0.06]" />
        </a>

        <HomeAiUsageWidget />
      </div>
    </div>
  </section>
);

export default PublicProofSection;
