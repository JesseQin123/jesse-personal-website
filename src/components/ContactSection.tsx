import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => (
  <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 bg-background pb-20 pt-8 lg:pb-28 lg:pt-12">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="rounded-3xl border border-border bg-brand-light p-6 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">Open to the right team</p>
            <h2 id="contact-heading" className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              I&apos;m interested in senior and staff-level roles building governed AI systems,
              context infrastructure, and agent workflows.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Based in New York City. The most useful first message includes the problem space,
              team mandate, role level, and what the organization needs this person to own.
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <Button variant="hero" size="lg" className="w-full" asChild>
                <a href="mailto:jesseqin.office@gmail.com">
                  <Mail className="h-4 w-4" /> Email Jesse
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="w-full" asChild>
                <a href="/resume/Jesse_Yubo_Qin_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" /> View résumé <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="w-full" asChild>
                <a href="https://www.linkedin.com/in/jesseqin-phd/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="lg" className="w-full text-foreground/75" asChild>
                <a href="https://github.com/JesseQin123" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Public résumé omits phone number; email is the preferred first contact.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
