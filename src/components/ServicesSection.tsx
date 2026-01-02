import { Brain, Database, Rocket, Users, AlertCircle } from "lucide-react";
import { useStaggerReveal, useScrollReveal } from "@/animations";

const ServicesSection = () => {
  const headerRef = useScrollReveal<HTMLDivElement>({
    translateY: 30,
    duration: 600,
  });

  const cardsRef = useStaggerReveal<HTMLDivElement>({
    itemSelector: '.service-card',
    staggerDelay: 100,
    duration: 500,
    translateY: 40,
    from: 'first',
  });

  const services = [
    {
      icon: Brain,
      title: "AI Strategy Consulting",
      painPoint: "Confused about which AI tools to adopt? Worried about making expensive wrong bets?",
      description: "I help you cut through the hype, identify high-impact AI opportunities specific to your business, evaluate vendors objectively, and build a roadmap that actually gets executed.",
      deliverables: ["AI Opportunity Assessment", "Vendor Evaluation", "90-Day Implementation Roadmap"],
    },
    {
      icon: Database,
      title: "Knowledge Graph & RAG Systems",
      painPoint: "Your team can't find information? Your chatbot gives wrong answers?",
      description: "I design and build enterprise knowledge systems that actually work—from knowledge graph architecture to production RAG implementation with proper evaluation and guardrails.",
      deliverables: ["Knowledge Architecture Design", "RAG System Implementation", "Search Quality Optimization"],
    },
    {
      icon: Rocket,
      title: "AI MVP Development",
      painPoint: "Have an AI product idea but don't know if it's technically feasible?",
      description: "I take your AI product concept from idea to working prototype in weeks, not months. Get technical validation before you commit major resources.",
      deliverables: ["Feasibility Analysis", "Working MVP", "Technical Documentation"],
    },
    {
      icon: Users,
      title: "Fractional CTO",
      painPoint: "Need senior AI leadership but can't justify a full-time hire?",
      description: "Get experienced technical leadership on a part-time basis. I integrate with your team, guide architecture decisions, mentor engineers, and keep your AI initiatives on track.",
      deliverables: ["Weekly Strategy Sessions", "Architecture Reviews", "Team Mentorship"],
    },
  ];

  return (
    <section id="services" className="py-12 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-8 md:mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 md:mb-4">
            Services
          </p>
          <h2 className="text-2xl lg:text-5xl font-bold mb-4 md:mb-6">
            How I can help
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Every engagement is focused on one thing: delivering measurable business value, not just "doing AI."
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-8 bg-background rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>

              {/* Pain Point - hidden on mobile for density */}
              <div className="hidden md:flex items-start gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground italic">
                  {service.painPoint}
                </p>
              </div>

              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
              
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  What you get
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((deliverable, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
