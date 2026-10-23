import { ArrowRight, ExternalLink, Github, GraduationCap, Landmark, MapPin } from "lucide-react";
import profileImage from "@/assets/jesse-profile.jpg";
import { atAGlance, publicLinks } from "@/components/profile/public-profile";

const mobileSignals = [
  { icon: MapPin, value: "New York, USA" },
  { icon: GraduationCap, value: "PhD in Computer Engineering · Rutgers" },
  { icon: Landmark, value: "MSBAi · NYU Stern" },
] as const;

const glanceColumns = [atAGlance.slice(0, 4), atAGlance.slice(4)] as const;

export const ProfileHero = () => (
  <section id="about" className="bg-[hsl(var(--profile-surface-elevated))]">
    <div className="mx-auto max-w-[1180px] px-5 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 xl:pb-0 xl:pl-12 xl:pr-12 xl:pt-8">
      <div className="mb-9 flex items-center gap-5 border-b border-[hsl(var(--profile-border))] pb-7 lg:hidden">
        <img alt="Jesse Qin" className="h-24 w-24 rounded-full object-cover object-[50%_18%]" src={profileImage} />
        <div>
          <p className="profile-serif text-4xl leading-none tracking-[-0.035em] text-[hsl(var(--profile-ink))]">Jesse Qin</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-[hsl(var(--profile-ink-muted))]">AI systems engineer<br />ontology · context graphs</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(440px,1.03fr)_minmax(420px,0.97fr)] xl:items-start xl:gap-6">
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[hsl(var(--profile-accent-hover))] sm:text-[11px]">AI systems engineering · ontology · context graphs</p>
          <h1 className="profile-serif text-balance text-[clamp(2.5rem,13vw,3.25rem)] leading-[0.98] tracking-[-0.035em] text-[hsl(var(--profile-ink))] sm:text-[3.7rem] xl:text-[2.55rem] min-[1400px]:text-[3.25rem]">
            <span className="xl:hidden">I turn AI tools and <span className="text-[hsl(var(--profile-accent))]">hidden knowledge</span> into systems people can use.</span>
            <span className="hidden xl:inline min-[1400px]:hidden">
              <span className="block">I turn AI tools</span>
              <span className="block">and <span className="text-[hsl(var(--profile-accent))]">hidden knowledge</span></span>
              <span className="block">into systems</span>
              <span className="block">people can use.</span>
            </span>
            <span className="hidden min-[1400px]:inline">
              <span className="block">I turn AI tools and</span>
              <span className="block text-[hsl(var(--profile-accent))]">hidden knowledge</span>
              <span className="block">into systems</span>
              <span className="block">people can use.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-[62ch] text-base leading-7 text-[hsl(var(--profile-ink-muted))] sm:text-[17px] sm:leading-8">
            I design and build AI systems that turn fragmented knowledge into usable, governed context. My focus is ontology, context graphs, and agent workflows—connecting models, tools, data, decisions, and permissions from problem discovery through product delivery.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
            <a
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[hsl(var(--profile-accent-hover))] transition-colors hover:text-[hsl(var(--profile-ink))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]"
              href="#projects"
            >
              Review public evidence
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[hsl(var(--profile-ink))] transition-colors hover:text-[hsl(var(--profile-accent-hover))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]"
              href={publicLinks.contextGraph}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read technical thesis
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <figure className="bg-[hsl(var(--profile-surface-elevated))] xl:mt-4">
          <img
            alt="Ontology and context graph showing people, documents, evidence, decisions, models, data, actions, provenance, and a permission boundary"
            className="aspect-[16/9] h-auto w-full object-cover"
            decoding="async"
            height="941"
            src="/portfolio/ontology-context-graph-orange.png"
            width="1672"
          />
          <figcaption className="sr-only">A simplified context graph connecting people, evidence, decisions, models, data, and action.</figcaption>
        </figure>
      </div>

      <div className="mt-7 lg:hidden">
        <ul className="grid gap-2 text-sm text-[hsl(var(--profile-ink-muted))] sm:grid-cols-3">
          {mobileSignals.map((signal) => (
            <li className="flex items-center gap-2" key={signal.value}>
              <signal.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[hsl(var(--profile-accent-hover))]" />
              {signal.value}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
          <a className="inline-flex items-center gap-2 text-[hsl(var(--profile-accent-hover))]" href={publicLinks.github} rel="noopener noreferrer" target="_blank">
            <Github aria-hidden="true" className="h-4 w-4" />GitHub<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
          <a className="text-[hsl(var(--profile-accent-hover))]" href={publicLinks.email}>Email Jesse</a>
        </div>
      </div>

      <div className="mt-8 border-t border-[hsl(var(--profile-ink)/0.22)] pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-accent-hover))]">At a glance</p>
        <div className="mt-3 grid gap-x-8 lg:grid-cols-2">
          {glanceColumns.map((column, columnIndex) => (
            <dl className="border-t border-[hsl(var(--profile-border))]" key={columnIndex}>
              {column.map((item) => (
                <div className="grid border-b border-[hsl(var(--profile-border))] py-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4 sm:py-1.5" key={item.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.06em] text-[hsl(var(--profile-ink-muted))]">{item.label}</dt>
                  <dd className="mt-1 text-[13px] leading-5 text-[hsl(var(--profile-ink))] sm:mt-0">{item.value}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      </div>
    </div>
  </section>
);
