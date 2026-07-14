import { ArrowUpRight, BookOpen, Github, Mic2, Newspaper } from "lucide-react";

const publishing = [
  {
    icon: Newspaper,
    title: "Medium essays",
    description: "Writing on AI agents, startup leadership, and building useful products.",
    href: "https://jesse-qin.medium.com/",
  },
  {
    icon: BookOpen,
    title: "Life in AGI",
    description: "Field notes on work, creativity, human agency, and life in an AI-shaped world.",
    href: "https://www.lifeinagi.com/",
  },
  {
    icon: Github,
    title: "Technical tutorials",
    description: "Practical guides to agent tools, automation, and modern AI workflows.",
    href: "/tutorials",
  },
];

const TalksSection = () => (
  <section id="talks" className="scroll-mt-20 bg-muted/30 py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Talks & writing</p>
          <h2 className="mb-5 text-3xl font-bold lg:text-5xl">Thinking in public.</h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Speaking and writing are how I pressure-test ideas, make complex systems legible,
            and connect engineering decisions to the way organizations actually work.
          </p>

          <article className="rounded-2xl border border-foreground bg-foreground p-6 text-background lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Mic2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-background/50">Featured speaking</span>
            </div>
            <p className="text-sm font-semibold text-primary">May 2026 · Cornell Tech, New York</p>
            <h3 className="mt-3 text-2xl font-bold">Knowledge Graph Conference 2026</h3>
            <p className="mt-4 leading-relaxed text-background/70">
              Sharing practical ideas on knowledge graphs, enterprise context, and the systems required for more useful AI agents.
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
        </div>

        <div className="border-t border-border">
          {publishing.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <a
                key={item.title}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default TalksSection;
