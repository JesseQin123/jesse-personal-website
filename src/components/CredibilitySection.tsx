import { useCountUp, useStaggerReveal, useScrollReveal } from "@/animations";

// Component for animated stat numbers
const StatNumber = ({ endValue, suffix, label }: { endValue: number; suffix: string; label: string }) => {
  const ref = useCountUp<HTMLParagraphElement>({
    endValue,
    suffix,
    duration: 2000,
    threshold: 0.3,
  });

  return (
    <div className="text-center">
      <p ref={ref} className="text-3xl md:text-4xl lg:text-6xl font-bold mb-1 md:mb-2">0</p>
      <p className="text-background/70 text-sm md:text-base">{label}</p>
    </div>
  );
};

const CredibilitySection = () => {
  const stats = [
    { endValue: 12, suffix: "+", label: "Years in AI" },
    { endValue: 3, suffix: "", label: "Startups Experiences" },
    { endValue: 1000, suffix: "+", label: "AI Companies Analyzed" },
    { endValue: 50, suffix: "+", label: "Enterprise Engagements" },
  ];

  const credentials = [{
    type: "Education",
    items: ["PhD in Computer Science (AI/ML focus)", "MSBAi, NYU Stern School of Business"]
  }, {
    type: "Experience",
    items: ["3x startup founder in AI space", "Former ML researcher at Rutgers University", "Advised Fortune 500 companies on AI strategy"]
  }, {
    type: "Focus Areas",
    items: ["Large Language Models & AI Agents", "Knowledge Graphs & RAG Systems", "AI Product Strategy & GTM", "Technical Due Diligence"]
  }];

  const credentialsRef = useStaggerReveal<HTMLDivElement>({
    itemSelector: '.credential-card',
    staggerDelay: 100,
    duration: 500,
    translateY: 30,
  });

  const valuePropsRef = useScrollReveal<HTMLDivElement>({
    translateY: 30,
    duration: 600,
  });

  return (
    <section className="py-12 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-20">
          {stats.map((stat, index) => (
            <StatNumber key={index} endValue={stat.endValue} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        {/* Credentials Grid */}
        <div ref={credentialsRef} className="grid md:grid-cols-3 gap-8">
          {credentials.map((cred, index) => (
            <div key={index} className="credential-card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50 mb-4">
                {cred.type}
              </h3>
              <ul className="space-y-3">
                {cred.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-background/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Unique Value Prop - hidden on mobile for density */}
        <div ref={valuePropsRef} className="mt-10 md:mt-20 hidden md:block">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            Why work with me?
          </h3>
          <p className="text-lg text-background/80 leading-relaxed mb-4">
            I sit at the intersection of deep technical expertise and business acumen.
            Most AI consultants are either too academic (great research, can't ship)
            or too superficial (buzzwords, no substance).
          </p>
          <p className="text-lg text-background/80 leading-relaxed">
            I've built production AI systems and analyzed nearly a thousand AI companies. I know what actually works—and I'll tell you the truth, even when it's not what you want to hear.
          </p>
        </div>
      </div>
    </section>
  );
};
export default CredibilitySection;