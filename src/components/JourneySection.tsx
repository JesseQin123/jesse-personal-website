import { ArrowRight } from "lucide-react";

const stages = [
  {
    label: "Systems",
    title: "Distributed computing",
    description: "Learning how information and computation move across complex systems.",
  },
  {
    label: "Discovery",
    title: "Recommendation and knowledge discovery",
    description: "Finding useful patterns inside large, noisy collections of data.",
  },
  {
    label: "Meaning",
    title: "Knowledge graphs and ontology",
    description: "Making relationships and domain meaning explicit enough for machines to use.",
  },
  {
    label: "Delivery",
    title: "Enterprise AI systems",
    description: "Connecting models to governed data, workflows, products, and real users.",
  },
  {
    label: "Next",
    title: "AI-native organizations",
    description: "Designing how people and agents share context, decisions, and responsibility.",
  },
];

const JourneySection = () => (
  <section id="journey" className="scroll-mt-20 bg-background py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">About the journey</p>
          <h2 className="mb-6 text-3xl font-bold lg:text-5xl">From hidden information to intelligent organizations.</h2>
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p className="text-lg">
              Every stage of my work has been driven by one question: how can computers use what people and organizations already know?
            </p>
            <p>
              I started with distributed systems and knowledge discovery. Over time, the harder problem became clear: organizations rarely lack information; they lack shared context—the relationships, history, intent, and tacit decisions that make information usable.
            </p>
            <p>
              That path led me to knowledge graphs, ontology, enterprise AI infrastructure, and agent systems. Today I build at that intersection while exploring what happens when AI becomes part of how an organization thinks and works.
            </p>
          </div>
          <div className="mt-8 grid gap-3 rounded-xl border border-border bg-muted/30 p-5 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold">Rutgers University</p>
              <p className="mt-1 text-muted-foreground">PhD, Computer Engineering</p>
            </div>
            <div>
              <p className="font-semibold">NYU Stern</p>
              <p className="mt-1 text-muted-foreground">MSBAi</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-6 left-6 top-6 hidden w-px bg-border sm:block" />
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <article key={stage.title} className="relative rounded-xl border border-border bg-card p-5 sm:pl-16">
                <div className="mb-3 flex items-center gap-3 sm:absolute sm:left-3 sm:top-5 sm:mb-0">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  {index < stages.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground sm:hidden" />}
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{stage.label}</p>
                <h3 className="font-bold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
