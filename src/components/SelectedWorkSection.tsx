import { ArrowUpRight, Boxes, Building2, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { recruiterCaseStudies } from "@/data/recruiter-profile";

const caseStudyIcons = {
  "kamiwaza-ai": Building2,
  "context-graph": Network,
  "solo-unicorn-toolbox": Boxes,
} as const;

const details = [
  ["Problem", "problem"],
  ["My role", "role"],
  ["What I shipped", "shipped"],
  ["Public outcome", "result"],
] as const;

const SelectedWorkSection = () => (
  <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 bg-background py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">Selected case studies</p>
          <h2 id="work-heading" className="mb-5 text-3xl font-bold tracking-tight lg:text-5xl">
            Three systems. Clear ownership. Public evidence.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The homepage stays focused on the work most relevant to senior AI systems roles.
            Confidential scope is labeled, and changing public numbers include a last-checked date.
          </p>
        </div>
        <Button variant="outline" size="lg" asChild>
          <Link to="/projects">View the project archive <ArrowUpRight className="h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="space-y-6">
        {recruiterCaseStudies.map((study, index) => {
          const Icon = caseStudyIcons[study.slug as keyof typeof caseStudyIcons];
          return (
          <article
            key={study.title}
            className={`overflow-hidden rounded-2xl border ${index === 0 ? "border-foreground bg-foreground text-background" : "border-border bg-card"}`}
          >
            <div className="grid gap-8 p-6 lg:grid-cols-[0.7fr_1.3fr] lg:p-9">
              <div>
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${index === 0 ? "bg-brand" : "bg-brand-light"}`}>
                  <Icon className={`h-6 w-6 ${index === 0 ? "text-foreground" : "text-brand-dark"}`} />
                </div>
                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${index === 0 ? "text-orange-300" : "text-brand-dark"}`}>
                  {study.category}
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight">{study.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${index === 0 ? "text-background/55" : "text-muted-foreground"}`}>
                  {study.status}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-current/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === 0 ? "text-orange-300" : "text-brand-dark"}`}
                  >
                    Read case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === 0 ? "text-background/65" : "text-muted-foreground"}`}
                  >
                    {study.proofLabel}
                  </a>
                </div>
              </div>

              <dl className={`grid border-t lg:grid-cols-2 ${index === 0 ? "border-background/15" : "border-border"}`}>
                {details.map(([label, key], detailIndex) => (
                  <div
                    key={label}
                    className={`border-b py-5 lg:px-6 ${index === 0 ? "border-background/15" : "border-border"} ${detailIndex % 2 === 0 ? "lg:border-r" : ""}`}
                  >
                    <dt className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${index === 0 ? "text-background/45" : "text-muted-foreground"}`}>
                      {label}
                    </dt>
                    <dd className={`mt-2 text-sm leading-6 ${index === 0 ? "text-background/80" : "text-foreground/80"}`}>
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
