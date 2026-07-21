import { Building2, GraduationCap, Network, School } from "lucide-react";

const signals = [
  {
    icon: Building2,
    label: "Current role",
    value: "Senior Member of Technical Staff · Kamiwaza",
  },
  {
    icon: Network,
    label: "Systems focus",
    value: "Enterprise infrastructure, ontology, context graphs, and agents",
  },
  {
    icon: GraduationCap,
    label: "Research depth",
    value: "PhD in Computer Engineering, Rutgers University",
  },
  {
    icon: School,
    label: "Business + AI",
    value: "MSBAi, NYU Stern · 2024–2025",
  },
];

const CredibilitySection = () => (
  <section className="bg-foreground py-12 text-background lg:py-16" aria-label="Career highlights">
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
    </div>
  </section>
);

export default CredibilitySection;
