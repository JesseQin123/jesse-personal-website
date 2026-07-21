import { ArrowUpRight, Boxes, Building2, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    icon: Building2,
    category: "Enterprise AI infrastructure",
    title: "Kamiwaza AI",
    status: "Current role · Jul 2025–Present",
    problem:
      "Organizations need to deploy and govern AI around distributed data and real workflows without losing control of security, context, or usability.",
    role:
      "Senior Member of Technical Staff working across enterprise AI infrastructure, product engineering, ontology, context graphs, RAG, and agent workflows.",
    shipped:
      "Publicly shareable scope includes platform and product work around deployment, governance, distributed data, and agent-ready systems.",
    evidence:
      "Kamiwaza's public product and 1.0 milestone can be inspected. Customer, revenue, performance, and feature-level ownership remain confidential.",
    href: "https://www.kamiwaza.ai/",
    proofLabel: "Company and product",
  },
  {
    icon: Network,
    category: "Independent research prototype",
    title: "Context Graph",
    status: "Public thesis · research prototype live",
    problem:
      "Enterprise agents can retrieve documents yet still miss decisions, evidence, exceptions, ownership, provenance, and permission boundaries.",
    role:
      "Research synthesis, ontology design, product framing, and a reference architecture for governed context shared by people and agents.",
    shipped:
      "A public thesis, reference architecture, ontology concepts, learning pages, and an explorable prototype.",
    evidence:
      "The thesis and prototype are public. This work is presented as research—not as marketplace adoption, customer traction, or a production deployment.",
    href: "https://contextgraph.tech/",
    proofLabel: "Read the public thesis",
  },
  {
    icon: Boxes,
    category: "Open-source knowledge system",
    title: "Solo Unicorn Toolbox",
    status: "Actively maintained · checked Jul 20, 2026",
    problem:
      "Fast-moving AI infrastructure and agent projects are difficult to evaluate when they are scattered across bookmarks, feeds, and static lists.",
    role:
      "Designed the bilingual taxonomy, enrichment scripts, repository workflow, and automated synchronization process.",
    shipped:
      "A public catalog of 604 repositories across 12 categories, with bilingual documentation and weekly GitHub Actions synchronization.",
    evidence:
      "The repository and update workflow are public. The numbers describe catalog scope and maintenance—not user adoption or commercial traction.",
    href: "https://github.com/JesseQin123/solo_unicorn_toolbox",
    proofLabel: "Inspect the repository",
  },
] as const;

const details = [
  ["Problem", "problem"],
  ["My role", "role"],
  ["What I shipped", "shipped"],
  ["Public evidence", "evidence"],
] as const;

const SelectedWorkSection = () => (
  <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 bg-background py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Selected case studies</p>
          <h2 id="work-heading" className="mb-5 text-3xl font-bold tracking-tight lg:text-5xl">
            Three systems. Clear role. Public evidence.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            These cases are the work most relevant to senior AI systems roles. Each separates
            the problem, my contribution, what shipped, and what can be inspected publicly.
          </p>
        </div>
        <Button variant="outline" size="lg" asChild>
          <Link to="/projects">View the project archive <ArrowUpRight className="h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="space-y-6">
        {caseStudies.map((study, index) => {
          const featured = index === 0;
          return (
            <article
              key={study.title}
              className={`overflow-hidden rounded-2xl border ${
                featured ? "border-foreground bg-foreground text-background" : "border-border bg-card"
              }`}
            >
              <div className="grid gap-8 p-6 lg:grid-cols-[0.7fr_1.3fr] lg:p-9">
                <div>
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${featured ? "bg-primary" : "bg-primary/10"}`}>
                    <study.icon className={`h-6 w-6 ${featured ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${featured ? "text-orange-300" : "text-primary"}`}>
                    {study.category}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight">{study.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${featured ? "text-background/55" : "text-muted-foreground"}`}>
                    {study.status}
                  </p>
                  <a
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-current/30 underline-offset-4 ${featured ? "text-orange-300" : "text-foreground hover:text-primary"}`}
                  >
                    {study.proofLabel} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <dl className={`grid border-t lg:grid-cols-2 ${featured ? "border-background/15" : "border-border"}`}>
                  {details.map(([label, key], detailIndex) => (
                    <div
                      key={label}
                      className={`border-b py-5 lg:px-6 ${featured ? "border-background/15" : "border-border"} ${
                        detailIndex % 2 === 0 ? "lg:border-r" : ""
                      }`}
                    >
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${featured ? "text-background/45" : "text-muted-foreground"}`}>
                        {label}
                      </dt>
                      <dd className={`mt-2 text-sm leading-6 ${featured ? "text-background/80" : "text-foreground/80"}`}>
                        {study[key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default SelectedWorkSection;
