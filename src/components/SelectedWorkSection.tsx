import { ArrowUpRight, Boxes, Building2, Network, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const work = [
  {
    featured: true,
    icon: Building2,
    eyebrow: "Current work · Enterprise AI",
    title: "Kamiwaza AI",
    question: "How can organizations deploy, govern, and scale AI where their data and workflows actually live?",
    contribution: "Enterprise AI infrastructure, product engineering, and agent-ready systems designed around real organizational constraints.",
    proof: ["Enterprise infrastructure", "Governed AI", "Shipped systems"],
    href: "https://www.kamiwaza.ai/",
    cta: "Visit Kamiwaza",
  },
  {
    icon: Network,
    eyebrow: "Public technical thesis",
    title: "Context Graph",
    question: "How do agents retrieve decisions, evidence, ownership, and permissions—not just documents?",
    contribution: "A reference model for turning operational knowledge into governed, auditable context for people and agents.",
    proof: ["Ontology", "Provenance", "Agent context"],
    href: "https://contextgraph.tech/",
    cta: "Read the thesis",
  },
  {
    icon: Boxes,
    eyebrow: "Open-source knowledge system",
    title: "Solo Unicorn Toolbox",
    question: "How can a fast-moving AI ecosystem become a useful technical map instead of another static tool list?",
    contribution: "A bilingual, continuously updated taxonomy of agent systems, context tools, infrastructure, and reusable workflows.",
    proof: ["500+ repositories", "Bilingual", "Automated sync"],
    href: "https://github.com/JesseQin123/solo_unicorn_toolbox",
    cta: "Inspect the repository",
  },
  {
    icon: Users,
    eyebrow: "Founder · Community experiment",
    title: "Solo Unicorn Club",
    question: "Can one person design and operate an AI-native organization without building a traditional team first?",
    contribution: "A New York community where founders test workflows, critique real work, and turn repeated needs into reusable systems.",
    proof: ["AI-native work", "Founder community", "Public field notes"],
    href: "https://www.solounicorn.club/",
    cta: "Visit the club",
  },
];

const SelectedWorkSection = () => (
  <section id="work" className="scroll-mt-20 bg-background py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Selected work</p>
          <h2 className="mb-5 text-3xl font-bold lg:text-5xl">Ideas become systems, products, and communities.</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I work in public where I can. Each project below is evidence of the same practice:
            make hidden structure explicit, connect it to a real workflow, and ship something people can use.
          </p>
        </div>
        <Button variant="outline" size="lg" asChild>
          <Link to="/projects">View the full work archive <ArrowUpRight className="h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {work.map((item) => {
          const featured = "featured" in item && item.featured;

          return (
            <article
              key={item.title}
              className={`group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8 ${
                featured ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${featured ? "bg-primary" : "bg-primary/10"}`}>
                  <item.icon className={`h-6 w-6 ${featured ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <span className={`text-right text-xs font-semibold uppercase tracking-wider ${featured ? "text-background/50" : "text-muted-foreground"}`}>
                  {item.eyebrow}
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
              <p className={`mb-4 text-lg font-medium leading-relaxed ${featured ? "text-background/90" : "text-foreground"}`}>
                {item.question}
              </p>
              <p className={`mb-6 leading-relaxed ${featured ? "text-background/65" : "text-muted-foreground"}`}>
                {item.contribution}
              </p>

              <div className="mb-7 flex flex-wrap gap-2">
                {item.proof.map((proof) => (
                  <span
                    key={proof}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      featured ? "border-background/20 bg-background/5 text-background/80" : "border-border bg-muted/50 text-foreground/75"
                    }`}
                  >
                    {proof}
                  </span>
                ))}
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold ${featured ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                {item.cta} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default SelectedWorkSection;
