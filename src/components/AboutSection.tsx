import { GraduationCap, Briefcase, Lightbulb, MapPin } from "lucide-react";

const AboutSection = () => {
  const milestones = [
    {
      year: "2012",
      title: "PhD Research Begins",
      description: "Started doctoral research in machine learning and natural language processing at a top CS program.",
      icon: GraduationCap,
    },
    {
      year: "2015",
      title: "First AI Startup",
      description: "Co-founded an NLP startup focused on enterprise search, raised seed funding and built the core ML infrastructure.",
      icon: Lightbulb,
    },
    {
      year: "2018",
      title: "NYU Stern MBA",
      description: "Pursued business education to bridge the gap between technical innovation and commercial strategy.",
      icon: GraduationCap,
    },
    {
      year: "2020",
      title: "AI Advisory Practice",
      description: "Launched independent consulting practice, helping enterprises navigate the rapidly evolving AI landscape.",
      icon: Briefcase,
    },
  ];

  return (
    <section id="about" className="py-12 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2 md:mb-4">
              About Me
            </p>
            <h2 className="text-2xl lg:text-5xl font-bold mb-4 md:mb-8">
              From researcher to practitioner—12 years in the AI trenches
            </h2>

            <div className="space-y-4 md:space-y-6 text-muted-foreground">
              <p className="text-base md:text-lg">
                I've spent my career at the intersection of cutting-edge AI research and real-world business problems.
                My journey started in academia, where I published papers on knowledge graphs and semantic search.
                But I quickly realized that the most exciting challenges were in bringing these technologies to market.
              </p>

              {/* Hidden on mobile for density */}
              <p className="hidden md:block">
                After completing my PhD, I co-founded two AI startups—one acquired, one failed spectacularly.
                Those experiences taught me more about building AI products than any textbook ever could.
                I learned what works, what doesn't, and most importantly, how to tell the difference before
                spending millions finding out.
              </p>

              <p className="hidden md:block">
                Today, I help organizations navigate the AI landscape with the perspective of someone who has
                been a researcher, a founder, an operator, and an advisor. I've analyzed nearly 1,000 AI companies
                and built systems that serve millions of users. That experience informs everything I do.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6 md:mt-8 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Based in New York City</span>
            </div>
          </div>

          {/* Right Column - Timeline (hidden on mobile for density) */}
          <div className="relative hidden lg:block">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <milestone.icon className="w-6 h-6 text-primary" />
                  </div>

                  <div className="pt-2">
                    <span className="text-sm font-medium text-primary">{milestone.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
