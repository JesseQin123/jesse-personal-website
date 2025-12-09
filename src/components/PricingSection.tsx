import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";

const PricingSection = () => {
  const packages = [
    {
      name: "Single Session",
      price: "$499",
      period: "per hour",
      description: "Perfect for focused problem-solving, strategic advice, or technical deep-dives on specific challenges.",
      features: [
        "1-on-1 video consultation",
        "Pre-session briefing document",
        "Actionable recommendations",
        "Follow-up summary email",
        "Flexible scheduling",
      ],
      highlight: false,
      cta: "Book a Session",
    },
    {
      name: "Retainer Package",
      price: "$4,599",
      period: "10 hours",
      description: "Ongoing advisory relationship for complex initiatives. Ideal for enterprises with evolving AI needs.",
      features: [
        "Everything in Single Session",
        "Priority scheduling",
        "Async support via email",
        "Weekly or bi-weekly cadence",
        "Project deliverables included",
        "Rollover unused hours (30 days)",
      ],
      highlight: true,
      cta: "Get Started",
      savings: "Save $391",
    },
  ];

  const engagementTypes = [
    {
      title: "Advisory & Consulting",
      description: "Strategic guidance on AI adoption, technology selection, and implementation planning.",
    },
    {
      title: "Project Delivery",
      description: "End-to-end MVP development, proof-of-concept builds, and technical architecture.",
    },
    {
      title: "Fractional CTO",
      description: "Part-time technical leadership with regular weekly commitment and team integration.",
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Transparent, value-driven pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you need a one-time consultation or ongoing partnership, I offer flexible engagement models focused on delivering measurable results.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-20">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                pkg.highlight
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background border-border"
              }`}
            >
              {pkg.savings && (
                <div className="absolute -top-3 right-8 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {pkg.savings}
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl lg:text-5xl font-bold">{pkg.price}</span>
                <span className={pkg.highlight ? "text-background/70" : "text-muted-foreground"}>
                  {pkg.period}
                </span>
              </div>
              <p className={`mb-8 ${pkg.highlight ? "text-background/80" : "text-muted-foreground"}`}>
                {pkg.description}
              </p>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 ${pkg.highlight ? "text-background" : "text-primary"}`} />
                    <span className={pkg.highlight ? "text-background/90" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.highlight ? "secondary" : "hero"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#contact">
                  {pkg.cta} <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Engagement Types */}
        <div>
          <h3 className="text-xl font-bold mb-8">Engagement Models</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {engagementTypes.map((type, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <h4 className="font-semibold mb-2">{type.title}</h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
