import { useRef } from "react";
import { ArrowUpRight, FileText, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/jesse-profile.jpg";
import { useHeroAnimation } from "@/animations";
import { AnimatedCircuitLines, NeuralNetwork } from "@/components/animations";

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
    <section data-jesse-hero className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <AnimatedCircuitLines className="left-0 top-0 hidden h-60 w-80 opacity-40 lg:block" />

      <div className="container mx-auto px-4 pb-12 pt-8 sm:pt-14 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-dark sm:text-sm">
              <MapPin className="h-4 w-4" />
              <span>Senior / Staff AI Systems Engineer · New York City</span>
            </div>

            <h1
              id="hero-heading"
              ref={titleRef}
              className="mb-5 text-[2rem] font-bold leading-[1.06] tracking-[-0.035em] min-[375px]:text-[2.25rem] sm:text-5xl lg:mb-6 lg:text-6xl"
            >
              I turn fragmented enterprise knowledge into governed context
              <span className="text-brand"> for people and AI agents.</span>
            </h1>

            <p
              ref={subtitleRef}
              className="mb-5 max-w-2xl text-base leading-[1.6] text-muted-foreground sm:mb-7 sm:text-lg lg:text-xl"
            >
              I design and ship AI infrastructure, ontology, context graphs, and agent
              workflows—from architecture and research to production products.
            </p>

            <div ref={ctaRef} className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
              <Button variant="hero" size="lg" asChild>
                <a href="#work">
                  See case studies <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="mailto:jesseqin.office@gmail.com">
                  Email Jesse <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p ref={descriptionRef} className="mt-5 border-l-2 border-brand-dark pl-4 text-sm font-semibold leading-relaxed text-foreground/75 sm:text-base">
              Open to senior and staff-level roles in AI infrastructure, ontology, context systems,
              knowledge graphs, and agent workflows.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              <a
                href="/resume/Jesse_Yubo_Qin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/75 underline decoration-border underline-offset-4 transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <FileText className="h-4 w-4" /> View résumé
              </a>
              <a
                href="https://www.linkedin.com/in/jesseqin-phd/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/75 underline decoration-border underline-offset-4 transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn experience
              </a>
            </div>
          </div>

          <div className="relative flex justify-center pt-2 lg:justify-end lg:pt-0">
            <NeuralNetwork className="absolute -left-20 -top-10 hidden h-[350px] w-[500px] opacity-30 lg:block" />

            <div className="relative w-full lg:w-auto">
              <div className="hero-gradient absolute -inset-4 hidden rounded-3xl opacity-20 blur-2xl lg:block" />
              <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl border-2 border-primary/20 lg:block" />
              <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-2xl border-2 border-primary/20 lg:block" />

              <div
                ref={imageRef}
                className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-border shadow-2xl sm:aspect-square lg:h-96 lg:w-96"
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
