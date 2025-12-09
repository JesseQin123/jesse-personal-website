import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin } from "lucide-react";
import profileImage from "@/assets/profile-placeholder.jpg";

const HeroSection = () => {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">New York City</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Your AI initiatives <br />
              <span className="hero-gradient bg-clip-text text-transparent">stuck or stalled?</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-6 max-w-xl leading-relaxed">
              I help enterprises cut through AI hype, build systems that actually work, 
              and turn ambitious AI roadmaps into shipped products.
            </p>

            <p className="text-base text-foreground/80 mb-8 max-w-xl leading-relaxed border-l-2 border-primary pl-4">
              <strong>12+ years</strong> in AI research & industry. <strong>CS PhD</strong> + <strong>NYU Stern MBA</strong>. 
              Founded 3 startups. Analyzed 1,000+ AI companies. I've seen what works—and what doesn't.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                2 spots available Q1 2025
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">
                  Book a Free Discovery Call <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#case-studies">
                  See My Work <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 hero-gradient rounded-3xl opacity-20 blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/20 rounded-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-2xl" />
              
              {/* Profile Image */}
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img 
                  src={profileImage} 
                  alt="Dr. Jesse Qin - AI Strategy Advisor" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating credential badge */}
              <div className="absolute -bottom-4 -right-4 bg-background border border-border rounded-xl p-4 shadow-lg">
                <p className="text-xs text-muted-foreground mb-1">Dr. Jesse Qin</p>
                <p className="font-semibold text-sm">PhD, Computer Science</p>
                <p className="text-sm text-muted-foreground">NYU Stern MBA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
