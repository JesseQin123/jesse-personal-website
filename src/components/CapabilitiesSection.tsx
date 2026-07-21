import { Boxes, FlaskConical, Network, Share2, ShieldCheck, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: Boxes,
    title: "AI systems architecture",
    description:
      "Turn ambiguous enterprise needs into system boundaries, data flows, interfaces, and delivery plans that can reach production.",
  },
  {
    icon: Network,
    title: "Ontology and semantic models",
    description:
      "Make domain entities, relationships, policies, and operating vocabulary explicit enough for people and machines to share.",
  },
  {
    icon: Share2,
    title: "Context graphs",
    description:
      "Connect decisions, evidence, ownership, provenance, permissions, and temporal state into usable organizational context.",
  },
  {
    icon: Workflow,
    title: "Agent workflows",
    description:
      "Orchestrate models, tools, data, and human review into bounded workflows with clear inputs, outputs, and escalation paths.",
  },
  {
    icon: ShieldCheck,
    title: "Governance and evaluation",
    description:
      "Design for permission boundaries, auditability, reliability, and evaluation rather than treating them as launch-day additions.",
  },
  {
    icon: FlaskConical,
    title: "Research-to-product delivery",
    description:
      "Move from technical thesis and architecture through prototypes, product decisions, working software, and public communication.",
  },
] as const;

const CapabilitiesSection = () => (
  <section id="capabilities" aria-labelledby="capabilities-heading" className="scroll-mt-20 bg-muted/30 py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Core capabilities</p>
        <h2 id="capabilities-heading" className="mb-5 text-3xl font-bold tracking-tight lg:text-5xl">
          From technical ambiguity to governed systems.
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          My strongest work sits where infrastructure, product engineering, knowledge
          representation, and the operating realities of enterprise AI meet.
        </p>
      </div>

      <div className="border-t border-border">
        {capabilities.map((capability, index) => (
          <article
            key={capability.title}
            className="grid gap-4 border-b border-border py-7 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-start md:gap-8 lg:py-9"
          >
            <div className="flex items-center gap-3 text-primary">
              <span className="text-xs font-bold tabular-nums">0{index + 1}</span>
              <capability.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold lg:text-2xl">{capability.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{capability.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
