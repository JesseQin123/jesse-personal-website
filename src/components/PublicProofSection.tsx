import { ArrowUpRight, BookOpen, Code2, Github, GitPullRequest, Mic2, Newspaper } from "lucide-react";
import HomeAiUsageWidget from "@/components/HomeAiUsageWidget";

const publishing = [
  {
    icon: Newspaper,
    title: "Medium essays",
    description: "AI agents, startup leadership, and building useful products.",
    href: "https://jesse-qin.medium.com/",
  },
  {
    icon: BookOpen,
    title: "Life in AGI",
    description: "Field notes on work, creativity, human agency, and an AI-shaped world.",
    href: "https://www.lifeinagi.com/",
  },
  {
    icon: Github,
    title: "Technical tutorials",
    description: "Practical guides to agent tools, automation, and modern AI workflows.",
    href: "/tutorials",
  },
] as const;

const projectSignals = ["Open source", "Public research", "Working prototypes"];

const PublicProofSection = () => (
  <section id="proof" aria-labelledby="proof-heading" className="scroll-mt-20 border-y border-border bg-secondary/30 py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Public proof</p>
        <h2 id="proof-heading" className="mb-5 text-3xl font-bold tracking-tight lg:text-5xl">
          Work that can be inspected.
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Open-source work, public communication, and transparent AI usage make the practice
          visible. They support the case studies without being presented as business outcomes.
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
              <Github className="h-4 w-4" /> GitHub
            </span>
            <Code2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-10 max-w-lg text-3xl font-bold leading-tight lg:text-4xl">
            The implementation trail behind the portfolio.
          </h3>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            Repositories, evolving architectures, experiments, and tools that show how ideas
            move toward working systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {projectSignals.map((signal) => (
              <span key={signal} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/75">
                {signal}
              </span>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-foreground">
            Review public repositories <ArrowUpRight className="h-4 w-4" />
          </span>
          <GitPullRequest className="absolute -bottom-8 -right-6 h-36 w-36 rotate-12 text-primary/[0.06]" />
        </a>

        <HomeAiUsageWidget />
      </div>

      <div className="mt-16 border-t border-border pt-12 lg:mt-20 lg:pt-16">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">Talks & writing</p>
          <h3 className="text-2xl font-bold tracking-tight lg:text-4xl">Making complex systems legible.</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Speaking and writing are how I pressure-test technical ideas and connect architecture
            decisions to the way organizations actually work.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <article className="rounded-2xl border border-foreground bg-foreground p-6 text-background lg:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Mic2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="mt-8 text-sm font-semibold text-primary">May 4, 2026 · Cornell Tech, New York</p>
            <h4 className="mt-3 text-2xl font-bold">Knowledge Graph Conference 2026</h4>
            <p className="mt-4 leading-relaxed text-background/70">
              A public talk connecting knowledge graphs, enterprise context, and the systems
              required for more useful AI agents.
            </p>
            <a
              href="https://www.knowledgegraph.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View the conference <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>

          <div className="border-t border-border">
            {publishing.map((item) => {
              const external = item.href.startsWith("http");
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold transition-colors group-hover:text-primary">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PublicProofSection;
