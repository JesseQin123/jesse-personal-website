import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

const InsightsSection = () => {
  const articles = [
    {
      category: "Strategy",
      title: "Why 80% of Enterprise AI Projects Fail—And How to Be in the 20%",
      excerpt: "After analyzing hundreds of AI initiatives, I've identified the three critical factors that separate successful deployments from expensive failures.",
      readTime: "8 min read",
      date: "Dec 2024",
      featured: true,
    },
    {
      category: "Technical",
      title: "RAG is Not Enough: Building Knowledge Systems That Actually Work",
      excerpt: "Retrieval-Augmented Generation is powerful, but most implementations miss crucial architectural decisions that determine success.",
      readTime: "12 min read",
      date: "Nov 2024",
      featured: false,
    },
    {
      category: "Industry",
      title: "The Real Cost of Building vs. Buying AI: A Framework",
      excerpt: "A practical decision framework for CTOs evaluating whether to build custom AI solutions or leverage existing platforms.",
      readTime: "6 min read",
      date: "Nov 2024",
      featured: false,
    },
    {
      category: "Opinion",
      title: "AI Agents in 2025: Separating Hype from Reality",
      excerpt: "Everyone is talking about AI agents. Here's what's actually working in production today, and what's still science fiction.",
      readTime: "10 min read",
      date: "Oct 2024",
      featured: false,
    },
  ];

  const speakingEvents = [
    {
      event: "AI Summit NYC",
      topic: "Enterprise AI Adoption: Lessons from the Trenches",
      date: "March 2025",
    },
    {
      event: "TechCrunch Disrupt",
      topic: "Panel: The Future of AI in Vertical Industries",
      date: "October 2024",
    },
    {
      event: "NYU Stern AI Conference",
      topic: "From Research to Revenue: Commercializing AI",
      date: "September 2024",
    },
  ];

  return (
    <section id="insights" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Insights & Speaking
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Thoughts on AI strategy, technology, and implementation
          </h2>
          <p className="text-lg text-muted-foreground">
            I write about the lessons learned from working with dozens of organizations on their AI journeys. 
            No hype—just practical insights from the field.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles Column */}
          <div className="lg:col-span-2 space-y-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className={`group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors cursor-pointer ${
                  article.featured ? "lg:p-8" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>

                <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors ${
                  article.featured ? "text-2xl" : "text-xl"
                }`}>
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4">{article.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </article>
            ))}

            <Button variant="outline" size="lg" className="w-full">
              View All Articles <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Speaking Column */}
          <div>
            <div className="sticky top-8 p-6 rounded-2xl border border-border bg-muted/30">
              <h3 className="font-bold text-lg mb-6">Upcoming & Recent Speaking</h3>
              
              <div className="space-y-6">
                {speakingEvents.map((event, index) => (
                  <div key={index} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <span className="text-xs text-primary font-medium">{event.date}</span>
                    <h4 className="font-semibold mt-1">{event.event}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.topic}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-sm mb-2">Available for Speaking</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  I speak at conferences, corporate events, and podcasts on AI strategy and implementation.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#contact">Inquire About Speaking</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
