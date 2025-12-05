import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const MainHero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Search and Understand Your Videos - with AI
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl">
              Find anything, discover deep insights, analyze, remix and automate workflows with AI that can see, hear, and reason across your entire video content.
            </p>
            <Button variant="hero" size="lg">
              Try the Playground <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border">
              <div className="absolute inset-0 hero-gradient opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full hero-gradient flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">AI-Powered Video Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
