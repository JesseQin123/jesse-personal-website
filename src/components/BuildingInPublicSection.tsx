import { ArrowUpRight, Bot, Github, RadioTower } from "lucide-react";

const cards = [
  {
    icon: Github,
    eyebrow: "Source and experiments",
    title: "GitHub",
    description: "Open-source taxonomies, workflow experiments, prototypes, and the code behind Jesse's public systems.",
    href: "https://github.com/JesseQin123",
    cta: "Review public repositories",
    external: true,
  },
  {
    icon: RadioTower,
    eyebrow: "Transparent usage telemetry",
    title: "AI Token Usage",
    description: "A transparent, caveated view of token volume across Claude, Codex, and Hermes, plus reporting coverage, cache traffic, and estimated model-list cost.",
    href: "/ai-usage",
    cta: "View token usage",
    external: false,
  },
] as const;

const BuildingInPublicSection = () => {
  const openJesseAI = (opener: HTMLButtonElement) => window.dispatchEvent(
    new CustomEvent("open-jesse-ai", { detail: { opener } }),
  );

  return (
    <section aria-labelledby="building-heading" className="bg-foreground py-16 text-background lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-300">Building in public</p>
          <h2 id="building-heading" className="text-3xl font-bold tracking-tight lg:text-5xl">
            The practice is visible, but it is not the résumé.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-background/65">
            These are supporting signals of how Jesse researches, builds, documents, and experiments.
            They complement—not replace—system ownership, product delivery, and public outcomes.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="flex min-h-[24rem] flex-col rounded-2xl border border-background/15 bg-background/5 p-6 lg:row-span-2 lg:p-9">
            <Github className="h-7 w-7 text-orange-300" />
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.13em] text-background/45">{cards[0].eyebrow}</p>
            <h3 className="mt-3 text-3xl font-bold lg:text-4xl">{cards[0].title}</h3>
            <p className="mt-4 max-w-xl flex-1 text-lg leading-relaxed text-background/60">{cards[0].description}</p>
            <a
              href={cards[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {cards[0].cta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>

          {cards.slice(1).map((card) => (
            <article key={card.title} className="flex flex-col rounded-2xl border border-background/15 bg-background/5 p-6 lg:p-7">
              <card.icon className="h-6 w-6 text-orange-300" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-background/45">{card.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-bold">{card.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-background/60">{card.description}</p>
              <a
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              >
                {card.cta} <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}

          <article className="flex flex-col rounded-2xl border border-background/15 bg-background/5 p-6 lg:p-7">
            <Bot className="h-6 w-6 text-orange-300" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-background/45">Interactive public profile</p>
            <h3 className="mt-2 text-2xl font-bold">Jesse AI</h3>
            <p className="mt-3 flex-1 leading-relaxed text-background/60">
              Ask a grounded AI guide about Jesse&apos;s reviewed public work, background, projects, and ideas in English or Chinese.
            </p>
            <button
              type="button"
              onClick={(event) => openJesseAI(event.currentTarget)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              Talk to Jesse AI <ArrowUpRight className="h-4 w-4" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BuildingInPublicSection;
