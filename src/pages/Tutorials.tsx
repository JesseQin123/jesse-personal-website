import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tutorials } from "@/data/tutorials";

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4 lg:px-8 pt-12 pb-16">
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Tutorials</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Curated tutorials and guides on AI tools, automation, and building as
              a solo entrepreneur. New content added regularly.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Tutorial Cards */}
        <div className="grid gap-6 mb-16">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.id}
              to={`/tutorials/${tutorial.id}`}
              className="group block"
            >
              <div className="rounded-xl border border-border bg-card p-6 lg:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 text-5xl shrink-0">
                    {tutorial.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {tutorial.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {tutorial.titleCn}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-3">
                      {tutorial.title}
                    </p>
                    <p className="text-muted-foreground line-clamp-2">
                      {tutorial.descriptionCn}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span>
                        {tutorial.sections.reduce(
                          (sum, s) => sum + s.chapters.length,
                          0
                        )}{" "}
                        chapters
                      </span>
                      <span>
                        {tutorial.sections.length} sections
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-10 lg:p-16 text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
              <Rocket className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">More Tutorials Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            I'm working on more tutorials covering AI agents, prompt engineering,
            and building products as a solo founder. Stay tuned!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["AI Agents", "Prompt Engineering", "Claude API", "Solo Building"].map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3 mr-1" />
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tutorials;
