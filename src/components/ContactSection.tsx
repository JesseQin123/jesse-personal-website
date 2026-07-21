import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const conversationPaths = [
  {
    title: "Senior / Staff roles",
    description: "AI infrastructure, product engineering, knowledge systems, and technical leadership roles with meaningful ownership.",
  },
  {
    title: "Enterprise AI systems",
    description: "Architecture and product conversations around governed context, data, ontology, RAG, and agent workflows.",
  },
  {
    title: "Speaking",
    description: "Knowledge graphs, enterprise AI, context engineering, and the design of AI-native work.",
  },
  {
    title: "Research",
    description: "Ontology, organizational knowledge, agent systems, and future-of-work collaborations.",
  },
];

const ContactSection = () => (
  <section id="contact" className="scroll-mt-20 bg-background py-16 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="rounded-3xl border border-border bg-foreground p-6 text-background lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Contact</p>
            <h2 className="mb-6 text-3xl font-bold lg:text-5xl">Let&apos;s build AI systems that can operate inside real organizations.</h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-background/70">
              If your work involves fragmented knowledge, organizational context, governed
              agent workflows, or new ways for people and AI to make decisions together,
              I would like to hear about it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="mailto:jesseqin.office@gmail.com">
                  <Mail className="h-4 w-4" /> Email Jesse
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-background/25 bg-transparent text-background hover:bg-background hover:text-foreground" asChild>
                <a href="https://www.linkedin.com/in/jesseqin-phd/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/70 bg-primary/10 text-background hover:bg-primary hover:text-primary-foreground" asChild>
                <a href="https://github.com/JesseQin123" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> View GitHub Projects <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {conversationPaths.map((path) => (
              <article key={path.title} className="rounded-xl border border-background/15 bg-background/5 p-5">
                <h3 className="font-bold text-background">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/60">{path.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
