import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import IsometricGraphic from "./IsometricGraphic";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 animate-slide-up">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Introducing
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              {/* Icon */}
              <svg className="w-16 h-16 lg:w-20 lg:h-20" viewBox="0 0 80 80" fill="none">
                <path d="M20 35L40 25L60 35V55L40 65L20 55V35Z" fill="currentColor"/>
                <path d="M30 30L40 25L50 30" stroke="currentColor" strokeWidth="2"/>
                <circle cx="40" cy="45" r="8" fill="currentColor" fillOpacity="0.3"/>
              </svg>
              
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
                Nova
              </h1>
              
              <span className="px-4 py-2 border-2 border-foreground rounded-lg text-2xl lg:text-3xl font-bold">
                3.0
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                LEARN ABOUT N3 <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button variant="heroOutline" size="lg">
                TRY ON PLAYGROUND <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <IsometricGraphic />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
