import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin } from "lucide-react";
import profileImage from "@/assets/jesse-profile.jpg";
import { useHeroAnimation } from "@/animations";
import { NeuralNetwork, AnimatedCircuitLines } from "@/components/animations";

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
    <section id="about" className="relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated Circuit Lines - Top Left (Desktop only) */}
      <AnimatedCircuitLines className="top-0 left-0 w-80 h-60 opacity-40 hidden lg:block" />

      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">New York City</span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            >
              Your AI initiatives <br />
              <span className="hero-gradient bg-clip-text text-transparent">stuck or stalled?</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg lg:text-xl text-muted-foreground mb-6 max-w-xl leading-relaxed"
            >
              I help enterprises cut through AI hype, build systems that actually work,
              and turn ambitious AI roadmaps into shipped products.
            </p>

            <p
              ref={descriptionRef}
              className="text-base text-foreground/80 mb-8 max-w-xl leading-relaxed border-l-2 border-primary pl-4"
            >
              <strong>Rutgers</strong> <strong>CS PhD</strong> backed by <strong>NYU Stern MSBAi</strong>. Bridging AI research with real-world execution at 3 startups.
              Analyzed 1,000+ AI companies. I've seen what works—and what doesn't.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/book-call">
                  Book a Call <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#pricing">
                  View Pricing <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Neural Network Animation - Behind the image (Desktop only) */}
            <NeuralNetwork className="absolute -left-20 -top-10 w-[500px] h-[350px] opacity-30 hidden lg:block" />

            <div className="relative w-full lg:w-auto">
              {/* Decorative elements - hidden on mobile */}
              <div className="absolute -inset-4 hero-gradient rounded-3xl opacity-20 blur-2xl hidden lg:block" />
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/20 rounded-2xl hidden lg:block" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-2xl hidden lg:block" />

              {/* Profile Image - full width square on mobile, fixed square on desktop */}
              <div
                ref={imageRef}
                className="relative w-full aspect-square lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-border"
              >
                <img src={profileImage} alt="Dr. Jesse Qin - AI Strategy Advisor" className="w-full h-full object-cover" />
              </div>

              {/* Floating credential badge - hidden on mobile */}
              <div
                ref={badgeRef}
                className="absolute -bottom-4 -right-4 bg-background border border-border rounded-xl p-4 shadow-lg hidden lg:block"
              >
                <p className="text-xs text-muted-foreground mb-1">Dr. Jesse Qin</p>
                <p className="font-semibold text-sm">PhD, Computer Science</p>
                <p className="text-sm text-muted-foreground">NYU Stern MSBAi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;