const TrustedBy = () => {
  const logos = [
    "Acme Corp",
    "TechFlow",
    "DataSync",
    "CloudBase",
    "AIFirst",
    "MediaHub",
  ];

  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center mb-8">
          Trusted By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="text-xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
