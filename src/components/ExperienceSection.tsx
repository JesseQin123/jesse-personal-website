import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { recruiterFacts } from "@/data/recruiter-profile";

const items = [
  {
    icon: BriefcaseBusiness,
    status: recruiterFacts.currentRole.period,
    title: recruiterFacts.currentRole.title,
    organization: recruiterFacts.currentRole.organization,
    description: "Enterprise AI infrastructure, product engineering, ontology, context graphs, RAG, and agent workflows.",
  },
  {
    icon: GraduationCap,
    status: recruiterFacts.education.phd.period,
    title: recruiterFacts.education.phd.title,
    organization: recruiterFacts.education.phd.organization,
    description: "Research depth spanning distributed computing, recommendation and knowledge discovery, and machine-readable knowledge systems.",
  },
  {
    icon: GraduationCap,
    status: recruiterFacts.education.masters.period,
    title: recruiterFacts.education.masters.title,
    organization: recruiterFacts.education.masters.organization,
    description: "Business analytics and AI education connecting technical systems to product, organizational, and commercial decisions.",
  },
] as const;

const ExperienceSection = () => (
  <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">Experience & education</p>
          <h2 id="experience-heading" className="text-3xl font-bold tracking-tight lg:text-5xl">
            Enterprise delivery grounded in research.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A concise chronology of current enterprise AI work and completed graduate education,
            focused on the experience most relevant to senior AI systems roles.
          </p>
        </div>

        <div className="border-t border-border">
          {items.map((item) => (
            <article key={item.title} className="grid gap-4 border-b border-border py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-dark">
                  <item.icon className="h-4 w-4" /> {item.status}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-1 font-semibold text-foreground/70">{item.organization}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
