import { Building2, GraduationCap, Network, Users } from "lucide-react";

const signals = [
  {
    icon: Building2,
    label: "Enterprise AI",
    value: "Infrastructure and product work at Kamiwaza",
  },
  {
    icon: Network,
    label: "Technical focus",
    value: "Ontology, context graphs, and agent workflows",
  },
  {
    icon: GraduationCap,
    label: "Research depth",
    value: "PhD in Computer Engineering, Rutgers University",
  },
  {
    icon: Users,
    label: "Founder practice",
    value: "Solo Unicorn Club and public AI-native systems",
  },
];

const CredibilitySection = () => (
  <section className="bg-foreground py-12 text-background lg:py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal) => (
          <article key={signal.label} className="border-l border-background/15 pl-5">
            <signal.icon className="mb-5 h-6 w-6 text-primary" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-background/50">
              {signal.label}
            </p>
            <p className="leading-relaxed text-background/90">{signal.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 max-w-5xl border-t border-background/15 pt-10 lg:mt-16 lg:pt-12">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">The question behind the work</p>
        <h2 className="mt-4 text-2xl font-bold leading-tight lg:text-4xl">
          What does an organization become when people and AI agents share context,
          make decisions, and act together?
        </h2>
      </div>
    </div>
  </section>
);

export default CredibilitySection;
