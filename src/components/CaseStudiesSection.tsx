import { TrendingUp, Clock, DollarSign, Zap } from "lucide-react";

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      category: "Enterprise Knowledge System",
      title: "Built an AI-powered knowledge base for a Fortune 500 financial services firm",
      challenge: "1.2M+ internal documents scattered across 15 legacy systems. Employees spent 4+ hours/day searching for information.",
      solution: "Designed and implemented a knowledge graph + RAG system with semantic search, integrating all document sources into a unified AI assistant.",
      results: [
        { icon: Clock, metric: "65%", label: "reduction in search time" },
        { icon: DollarSign, metric: "$2.1M", label: "annual productivity savings" },
        { icon: TrendingUp, metric: "89%", label: "user adoption in 3 months" },
      ],
      tags: ["Knowledge Graph", "RAG", "Enterprise Search"],
    },
    {
      category: "AI Agent Development",
      title: "Automated due diligence workflow for a VC firm analyzing 200+ startups/month",
      challenge: "Manual due diligence taking 8-10 hours per company. Partners overwhelmed with deal flow.",
      solution: "Built an AI agent system that automatically researches companies, analyzes financials, identifies red flags, and generates structured reports.",
      results: [
        { icon: Clock, metric: "85%", label: "time saved per analysis" },
        { icon: Zap, metric: "3x", label: "more deals evaluated" },
        { icon: TrendingUp, metric: "40%", label: "better hit rate on investments" },
      ],
      tags: ["AI Agents", "Automation", "Due Diligence"],
    },
    {
      category: "AI Strategy & Roadmap",
      title: "Guided a healthcare SaaS from 'AI-curious' to production ML in 6 months",
      challenge: "Leadership wanted AI features but had no ML team, unclear use cases, and fear of making wrong technology bets.",
      solution: "Led AI strategy workshops, identified 3 high-impact use cases, built the MVP for their top priority (clinical note summarization), and hired their first ML engineer.",
      results: [
        { icon: DollarSign, metric: "New Revenue", label: "AI features became paid tier" },
        { icon: Clock, metric: "6 months", label: "from zero to production" },
        { icon: TrendingUp, metric: "23%", label: "increase in enterprise deals" },
      ],
      tags: ["AI Strategy", "MVP Development", "Team Building"],
    },
  ];

  return (
    <section id="case-studies" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Case Studies
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Real problems. Measurable results.
          </h2>
          <p className="text-lg text-muted-foreground">
            Here's how I've helped organizations move from AI ambition to AI impact. 
            Names anonymized to protect client confidentiality.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group p-8 lg:p-12 bg-muted/30 rounded-2xl border border-border hover:border-primary/30 transition-all"
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left - Problem & Solution */}
                <div>
                  <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
                    {study.category}
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold mb-6 leading-snug">
                    {study.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">The Challenge</p>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">What I Did</p>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-background border border-border rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right - Results */}
                <div className="bg-background rounded-xl p-6 lg:p-8 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-6">Results & Impact</p>
                  <div className="space-y-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                          <result.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-2xl lg:text-3xl font-bold">{result.metric}</p>
                          <p className="text-sm text-muted-foreground">{result.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want to discuss how I can help with your specific challenge?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Let's talk <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
