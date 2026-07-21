import { useRef } from "react";
import { ArrowUpRight, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/jesse-profile.jpg";
import { useHeroAnimation } from "@/animations";
import { AnimatedCircuitLines, NeuralNetwork } from "@/components/animations";
import HomeAiUsageWidget from "@/components/HomeAiUsageWidget";

const proofSignals = [
  "Senior Member of Technical Staff · Kamiwaza",
  "PhD in Computer Engineering",
  "NYU Stern MSBAi",
  "New York City",
];

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    titleRef,
    subtitleRef,
    descriptionRef,
    ctaRef,
    imageRef,
    badgeRef,
    autoPlay: true,
  });

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <AnimatedCircuitLines className="left-0 top-0 hidden h-60 w-80 opacity-40 lg:block" />

      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-24">
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div className="z-10">
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Senior / Staff AI Systems Engineer · New York City</span>
            </div>

            <h1
              id="hero-heading"
              ref={titleRef}
              className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight lg:text-6xl"
            >
              I turn fragmented enterprise knowledge into governed context
              <span className="text-gradient"> for people and AI agents.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
            >
              I design and ship AI infrastructure, ontology, context graphs, RAG, and agent
              workflows—from architecture and research to production.
            </p>

            <p
              ref={descriptionRef}
              className="mb-8 max-w-2xl border-l-2 border-primary pl-4 leading-relaxed text-foreground/80"
            >
              I work where infrastructure, machine-readable knowledge, governance, and
              product delivery meet.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#work">
                  View selected work <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="/resume/Jesse_Yubo_Qin_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" /> View résumé
                </a>
              </Button>
            </div>

            <HomeAiUsageWidget
              variant="compact"
              className="lg:absolute lg:right-0 lg:top-0 lg:z-20 lg:mt-0 lg:w-80 xl:w-96"
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {proofSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur-sm"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <NeuralNetwork className="absolute -left-20 -top-10 hidden h-[350px] w-[500px] opacity-30 lg:block" />

            <div className="relative w-full lg:w-auto">
              <div className="hero-gradient absolute -inset-4 hidden rounded-3xl opacity-20 blur-2xl lg:block" />
              <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl border-2 border-primary/20 lg:block" />
              <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-2xl border-2 border-primary/20 lg:block" />

              <div
                ref={imageRef}
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border shadow-2xl lg:h-96 lg:w-96"
              >
                <img
                  src={profileImage}
                  alt="Jesse Qin in New York City"
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                ref={badgeRef}
                className="absolute -bottom-4 -right-4 hidden rounded-xl border border-border bg-background p-4 shadow-lg lg:block"
              >
                <p className="mb-1 text-xs text-muted-foreground">Jesse Qin</p>
                <p className="text-sm font-semibold">Staff-level AI systems builder</p>
                <p className="text-sm text-muted-foreground">Infrastructure · Ontology · Agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
