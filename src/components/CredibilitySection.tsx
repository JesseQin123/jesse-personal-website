const CredibilitySection = () => {
  const stats = [{
    number: "12+",
    label: "Years in AI"
  }, {
    number: "3",
    label: "Startups Experiences"
  }, {
    number: "1000+",
    label: "AI Companies Analyzed"
  }, {
    number: "50+",
    label: "Enterprise Engagements"
  }];
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
  return <section className="py-12 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-20">
          {stats.map((stat, index) => <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl lg:text-6xl font-bold mb-1 md:mb-2">{stat.number}</p>
              <p className="text-background/70 text-sm md:text-base">{stat.label}</p>
            </div>)}
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {credentials.map((cred, index) => <div key={index}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50 mb-4">
                {cred.type}
              </h3>
              <ul className="space-y-3">
                {cred.items.map((item, idx) => <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-background/90">{item}</span>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Unique Value Prop - hidden on mobile for density */}
        <div className="mt-10 md:mt-20 hidden md:block">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            Why work with me?
          </h3>
          <p className="text-lg text-background/80 leading-relaxed mb-4">
            I sit at the intersection of deep technical expertise and business acumen.
            Most AI consultants are either too academic (great research, can't ship)
            or too superficial (buzzwords, no substance).
          </p>
          <p className="text-lg text-background/80 leading-relaxed">I've built production AI systems and analyzed nearly a thousand AI companies. I know what actually works—and I'll tell you the truth, even when it's not what you want to hear.</p>
        </div>
      </div>
    </section>;
};
export default CredibilitySection;