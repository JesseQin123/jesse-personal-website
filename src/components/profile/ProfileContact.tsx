import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { publicLinks } from "@/components/profile/public-profile";

const contactLinks = [
  { icon: Mail, label: "Email Jesse", href: publicLinks.email, external: false },
  { icon: Linkedin, label: "LinkedIn", href: publicLinks.linkedIn, external: true },
  { icon: Github, label: "GitHub", href: publicLinks.github, external: true },
] as const;

export const ProfileContact = () => (
  <section id="contact" className="border-t border-[hsl(var(--profile-accent))] bg-[hsl(var(--profile-surface-technical))] text-[hsl(var(--profile-ink-inverse))]">
    <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20 xl:pl-24 xl:pr-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-accent))]">Systems · ideas · collaboration</p>
        <h2 className="profile-serif mt-4 max-w-[18ch] text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
          Building AI systems around knowledge, decisions, and context?
        </h2>
        <p className="mt-5 max-w-[62ch] text-base leading-7 text-[hsl(var(--profile-ink-inverse)/0.72)]">
          If your challenge involves fragmented knowledge, missing decision context, agent workflows, or becoming a more capable AI-native operator, tell me what is stuck and what a useful outcome would change.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 lg:grid">
        {contactLinks.map((item) => (
          <a className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[hsl(var(--profile-ink-inverse))] transition-colors hover:text-[hsl(var(--profile-accent))]" href={item.href} key={item.label} rel={item.external ? "noopener noreferrer" : undefined} target={item.external ? "_blank" : undefined}>
            <item.icon aria-hidden="true" className="h-4 w-4" />
            {item.label}
            {item.external && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export const ProfileFooter = () => (
  <footer className="border-t border-[hsl(var(--profile-accent)/0.45)] bg-[hsl(var(--profile-surface-technical))] text-[hsl(var(--profile-ink-inverse)/0.58)]">
    <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-5 py-7 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 xl:pl-24 xl:pr-16">
      <p>© {new Date().getFullYear()} Jesse Qin · New York City</p>
      <p>AI systems engineering · ontology · context graphs</p>
    </div>
  </footer>
);
