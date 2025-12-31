import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Calendar } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Get in Touch
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to accelerate your AI journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether you have a specific challenge or want to explore possibilities, 
            let's start a conversation about how I can help.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:jesse@daydayup.co">
                <Mail className="w-4 h-4" />
                Send an Email
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/book-call">
                <Calendar className="w-4 h-4" />
                Schedule a Call
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="https://www.linkedin.com/in/jesseqin-phd/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>

          {/* Process Overview */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Discovery Call</h3>
              <p className="text-sm text-muted-foreground">
                15-minute intro call to understand your challenges and determine if we're a good fit.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Scope & Proposal</h3>
              <p className="text-sm text-muted-foreground">
                I'll outline a clear engagement plan with deliverables, timeline, and investment.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Engage & Deliver</h3>
              <p className="text-sm text-muted-foreground">
                We begin working together with clear milestones and regular check-ins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
