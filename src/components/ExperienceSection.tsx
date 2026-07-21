const items = [
  {
    period: "Jul 2025–Present",
    title: "Senior Member of Technical Staff",
    organization: "Kamiwaza",
    description:
      "Enterprise AI infrastructure and product engineering across ontology, context graphs, RAG, governance, and agent workflows.",
  },
  {
    period: "2016–2021",
    title: "PhD in Computer Engineering",
    organization: "Rutgers University",
    description:
      "Research spanning distributed computing, recommendation and knowledge discovery, and machine-readable knowledge systems.",
  },
  {
    period: "2024–2025",
    title: "MSBAi",
    organization: "NYU Stern",
    description:
      "Business analytics and AI education connecting technical systems to product, organizational, and commercial decisions.",
  },
] as const;

const ExperienceSection = () => (
  <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Experience & education</p>
          <h2 id="experience-heading" className="text-3xl font-bold tracking-tight lg:text-5xl">
            Enterprise delivery grounded in research.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A concise chronology of current enterprise AI work and completed graduate
            education—focused on what matters for senior AI systems roles.
          </p>
        </div>

        <div className="border-t border-border">
          {items.map((item) => (
            <article key={item.title} className="grid gap-4 border-b border-border py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {item.period}
              </span>
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
