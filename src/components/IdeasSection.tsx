import { ArrowUpRight, Building2, Layers3, UserRound } from "lucide-react";

const ideas = [
  {
    number: "01",
    icon: Layers3,
    title: "Context is infrastructure",
    description:
      "Models do not become useful inside organizations through prompts alone. They need relationships, history, provenance, permissions, and the decisions that documents leave behind.",
    href: "https://contextgraph.tech/",
    cta: "Explore Context Graph",
  },
  {
    number: "02",
    icon: Building2,
    title: "AI-native organizations",
    description:
      "The interesting shift is not that companies use more AI. It is that work, knowledge, coordination, and accountability are redesigned around collaboration between people and agents.",
    href: "https://www.lifeinagi.com/",
    cta: "Read Life in AGI",
  },
  {
    number: "03",
    icon: UserRound,
    title: "The one-person company is a systems problem",
    description:
      "A solo founder does not need a larger pile of tools. They need an operating system that decides what work exists, what context agents receive, and where human judgment stays in control.",
    href: "https://www.solounicorn.club/blog/e-31",
    cta: "Read the field note",
  },
];

const IdeasSection = () => (
  <section id="ideas" className="scroll-mt-20 bg-muted/30 py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 max-w-3xl lg:mb-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Core ideas</p>
        <h2 className="mb-5 text-3xl font-bold lg:text-5xl">The questions I keep returning to.</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          These ideas connect my enterprise work, public research, writing, and founder experiments.
          They are not separate interests; they are different views of the same system.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {ideas.map((idea) => (
          <article key={idea.title} className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/40 hover:shadow-lg lg:p-8">
            <div className="mb-8 flex items-center justify-between">
              <idea.icon className="h-7 w-7 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground">{idea.number}</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">{idea.title}</h3>
            <p className="mb-8 flex-1 leading-relaxed text-muted-foreground">{idea.description}</p>
            <a
              href={idea.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {idea.cta} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default IdeasSection;
