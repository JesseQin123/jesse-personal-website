const FeaturedInSection = () => {
  // Placeholder logos - will be replaced with actual media logos
  const mediaLogos = [
    { name: "TechCrunch", placeholder: "TC" },
    { name: "Forbes", placeholder: "Forbes" },
    { name: "VentureBeat", placeholder: "VB" },
    { name: "MIT Tech Review", placeholder: "MIT" },
    { name: "Wired", placeholder: "WIRED" },
    { name: "The Information", placeholder: "TI" },
  ];

  const clientIndustries = [
    { name: "Fortune 500 Retail", placeholder: "Retail Co." },
    { name: "Series B Fintech", placeholder: "Fintech" },
    { name: "Healthcare Enterprise", placeholder: "Healthcare" },
    { name: "Legal Tech Startup", placeholder: "LegalTech" },
    { name: "Manufacturing Corp", placeholder: "Mfg Corp" },
    { name: "Media Company", placeholder: "Media Co." },
  ];

  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Media Features */}
        <div className="mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center mb-8">
            Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {mediaLogos.map((logo, index) => (
              <div
                key={index}
                className="px-6 py-3 text-xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-default"
                title={logo.name}
              >
                {logo.placeholder}
              </div>
            ))}
          </div>
        </div>

        {/* Client Industries */}
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center mb-8">
            Trusted by Teams At
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {clientIndustries.map((client, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-lg border border-border bg-background text-sm text-muted-foreground"
              >
                {client.placeholder}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInSection;
