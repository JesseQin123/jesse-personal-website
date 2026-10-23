import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, CircleUserRound } from "lucide-react";
import { publicLinks } from "@/components/profile/public-profile";

const advisoryHref = import.meta.env.VITE_STRIPE_ROADMAP_SESSION_URL || "/book-call";

const offers = [
  {
    audience: "For organizations",
    icon: BriefcaseBusiness,
    title: "AI Systems Advisory",
    price: "$500 / 60 minutes",
    description:
      "A focused working session for founders and teams navigating ontology, context graphs, knowledge architecture, agent workflows, or AI product direction. Bring a consequential decision or a system that is stuck; leave with a clearer model and concrete next steps.",
    details: ["Pre-session context", "Live working session", "Written next steps"],
    cta: "Book an advisory session",
    href: advisoryHref,
  },
  {
    audience: "For individuals",
    icon: CircleUserRound,
    title: "Private AI Operator Coaching",
    price: "Tailored engagement",
    description:
      "Hands-on coaching for founders and ambitious professionals who want to become higher-leverage AI-native operators. We design your tool stack, agent workflows, decision system, and shipping cadence around the real work you need to do.",
    details: ["Weekly coaching", "Workflow design", "Accountability and execution"],
    cta: "Explore private coaching",
    href: "/teaching",
  },
] as const;

export const ProfileServices = () => (
  <section id="services" className="border-t border-[hsl(var(--profile-ink)/0.22)] bg-[hsl(var(--profile-surface-elevated))]">
    <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 lg:py-20 xl:pl-24 xl:pr-16">
      <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-teal))]">Work with me</p>
          <h2 className="profile-serif mt-4 max-w-[12ch] text-4xl leading-[1.05] tracking-[-0.025em] text-[hsl(var(--profile-ink))] sm:text-5xl">
            Focused engagements for systems and operators.
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-7 text-[hsl(var(--profile-ink-muted))]">
            I work with organizations on knowledge-intensive AI systems and with individuals building higher-leverage ways of working. Every engagement begins with a real decision, bottleneck, or workflow—not a generic AI transformation.
          </p>
        </div>

        <div className="grid border-t border-[hsl(var(--profile-border))] md:grid-cols-2">
          {offers.map((offer) => (
            <article className="border-b border-[hsl(var(--profile-border))] py-7 md:px-7 md:first:border-r md:first:pl-0 md:last:pr-0" key={offer.title}>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[hsl(var(--profile-teal))]">{offer.audience}</p>
                <offer.icon aria-hidden="true" className="h-6 w-6 text-[hsl(var(--profile-teal))]" />
              </div>
              <h3 className="profile-serif mt-5 text-3xl leading-tight tracking-[-0.02em] text-[hsl(var(--profile-ink))]">{offer.title}</h3>
              <p className="mt-3 text-sm font-bold text-[hsl(var(--profile-accent))]">{offer.price}</p>
              <p className="mt-4 text-sm leading-6 text-[hsl(var(--profile-ink-muted))]">{offer.description}</p>
              <ul className="mt-5 space-y-2">
                {offer.details.map((detail) => (
                  <li className="flex items-start gap-2 text-xs leading-5 text-[hsl(var(--profile-ink-muted))]" key={detail}>
                    <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--profile-teal))]" />
                    {detail}
                  </li>
                ))}
              </ul>
              <a
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[hsl(var(--profile-accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]"
                href={offer.href}
                rel={offer.href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={offer.href.startsWith("http") ? "_blank" : undefined}
              >
                {offer.cta}
                {offer.href.startsWith("http") ? <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> : <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-[hsl(var(--profile-border))] pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[72ch] leading-6 text-[hsl(var(--profile-ink-muted))]">
          Need implementation rather than a single session? I take on a small number of context and knowledge-system builds and fractional AI leadership engagements.
        </p>
        <a className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-[hsl(var(--profile-teal))] hover:text-[hsl(var(--profile-accent))]" href={publicLinks.email}>
          Discuss a build partnership <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
);
