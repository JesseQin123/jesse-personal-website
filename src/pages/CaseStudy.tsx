import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { recruiterCaseStudies } from "@/data/recruiter-profile";

const CaseStudy = () => {
  const { slug } = useParams();
  const study = recruiterCaseStudies.find((candidate) => candidate.slug === slug);

  if (!study) return <Navigate to="/projects" replace />;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#case-study-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-foreground px-4 py-3 text-background focus:not-sr-only"
      >
        Skip to case study
      </a>
      <Navbar />
      <main id="case-study-content" className="flex-1">
        <header className="border-b border-border bg-foreground py-14 text-background lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <Button variant="ghost" className="mb-8 -ml-4 text-background hover:bg-background/10 hover:text-background" asChild>
              <Link to="/#work"><ArrowLeft className="h-4 w-4" /> Back to selected work</Link>
            </Button>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">{study.category}</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">{study.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-background/70 lg:text-xl">{study.problem}</p>
              <p className="mt-5 text-sm leading-relaxed text-background/50">{study.status}</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-14 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <aside>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">Evidence boundary</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{study.evidenceNote}</p>
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-dark underline decoration-current/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {study.proofLabel} <ArrowUpRight className="h-4 w-4" />
              </a>
            </aside>

            <div className="space-y-12">
              {[
                ["Context", study.context],
                ["My ownership", study.role],
                ["Constraints", study.constraints],
                ["What I built", study.shipped],
                ["Outcome", study.result],
              ].map(([label, value]) => (
                <section key={label} className="border-t border-border pt-6">
                  <h2 className="text-2xl font-bold tracking-tight">{label}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{value}</p>
                </section>
              ))}

              <section className="border-t border-border pt-6">
                <h2 className="text-2xl font-bold tracking-tight">{study.decisionsLabel}</h2>
                <ul className="mt-5 space-y-4">
                  {study.decisions.map((decision) => (
                    <li key={decision} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-brand-light p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">Reflection</p>
                <p className="mt-4 text-xl font-semibold leading-relaxed text-foreground">{study.reflection}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
