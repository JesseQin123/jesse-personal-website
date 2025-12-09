import { Brain, Database, Rocket, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy Consulting",
      description: "Navigate the AI landscape with confidence. I help enterprises identify high-impact AI opportunities, evaluate vendors, and build actionable roadmaps aligned with business goals.",
      highlights: ["Technology Assessment", "Vendor Evaluation", "Implementation Roadmap"],
    },
    {
      icon: Database,
      title: "Knowledge Graph & RAG Systems",
      description: "Build enterprise knowledge bases that actually work. From knowledge graph architecture to RAG implementation, I design systems that make your data searchable and actionable.",
      highlights: ["Knowledge Architecture", "RAG Implementation", "Search Optimization"],
    },
    {
      icon: Rocket,
      title: "AI MVP Development",
      description: "Transform your AI ideas into working products. I deliver end-to-end MVP development with a focus on AI agents, automation workflows, and intelligent applications.",
      highlights: ["AI Agent Development", "Proof of Concept", "Technical Validation"],
    },
    {
      icon: Users,
      title: "Fractional CTO",
      description: "Get senior technical leadership without the full-time commitment. I provide strategic guidance, team mentorship, and hands-on technical direction for AI initiatives.",
      highlights: ["Technical Leadership", "Team Building", "Architecture Review"],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Services
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Expert guidance for your AI journey
          </h2>
          <p className="text-lg text-muted-foreground">
            From strategy to execution, I help organizations navigate the complexities of AI adoption and build systems that deliver real value.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-background rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
