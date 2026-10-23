import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contextGraphProof, publicProjects } from "@/components/profile/public-profile";

const [featuredProject, ...supportingProjects] = publicProjects;

export const ProfileWork = () => (
  <section id="projects" className="border-t border-[hsl(var(--profile-ink)/0.22)] bg-[hsl(var(--profile-surface-elevated))]">
    <div className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16 xl:pb-16 xl:pl-24 xl:pr-16 xl:pt-0">
      <div className="flex items-center gap-4">
        <p className="shrink-0 text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-teal))]">Public evidence</p>
        <span aria-hidden="true" className="h-px flex-1 bg-[hsl(var(--profile-border))]" />
        <a className="group hidden min-h-11 items-center gap-2 text-sm font-medium text-[hsl(var(--profile-ink))] hover:text-[hsl(var(--profile-accent))] sm:inline-flex" href={featuredProject.links[0].href} rel="noopener noreferrer" target="_blank">
          Inspect the source <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <article className="mt-5 border-b border-[hsl(var(--profile-border))] pb-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <a className="block overflow-hidden bg-[hsl(var(--profile-surface-technical))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]" href={featuredProject.links[0].href} rel="noopener noreferrer" target="_blank">
            <img
              alt="Solo Unicorn Toolbox — a curated technical radar for AI-native builders"
              className="aspect-[2.86/1] h-full w-full object-cover"
              decoding="async"
              height="742"
              src="/portfolio/solo-unicorn-toolbox-banner.png"
              width="2120"
            />
          </a>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[hsl(var(--profile-teal))]">{featuredProject.status}</p>
            <h2 className="profile-serif mt-2 text-3xl leading-tight tracking-[-0.02em] text-[hsl(var(--profile-ink))]">{featuredProject.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[hsl(var(--profile-ink-muted))]">{featuredProject.summary}</p>
            <a className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[hsl(var(--profile-accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]" href={featuredProject.links[0].href} rel="noopener noreferrer" target="_blank">
              Inspect the repository <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <dl className="mt-5 grid border-t border-[hsl(var(--profile-border))] text-sm md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Problem", featuredProject.problem],
            ["My role", featuredProject.contribution],
            ["Proof", featuredProject.proof],
            ["Shows", featuredProject.demonstrates],
          ].map(([label, value], index) => (
            <div className="border-b border-[hsl(var(--profile-border))] py-4 md:px-5 md:odd:border-r md:odd:pl-0 xl:border-r xl:px-5 xl:last:border-r-0 xl:last:pr-0 xl:odd:pl-5 xl:first:pl-0" key={label}>
              <dt className="text-[10px] font-bold uppercase tracking-[0.08em] text-[hsl(var(--profile-ink-muted))]">{label}</dt>
              <dd className={index === 2 ? "mt-2 font-semibold leading-5 text-[hsl(var(--profile-accent-hover))]" : "mt-2 leading-5 text-[hsl(var(--profile-ink))]"}>{value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <article className="grid gap-6 border-b border-[hsl(var(--profile-border))] py-7 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[hsl(var(--profile-accent-hover))]">{contextGraphProof.status}</p>
          <h2 className="profile-serif mt-3 text-3xl tracking-[-0.02em] text-[hsl(var(--profile-ink))]">{contextGraphProof.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[hsl(var(--profile-ink-muted))]">{contextGraphProof.problem}</p>
          <a className="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[hsl(var(--profile-accent-hover))]" href={contextGraphProof.href} rel="noopener noreferrer" target="_blank">
            Read the reference architecture <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <div className="border-t border-[hsl(var(--profile-border))]">
          <div className="border-b border-[hsl(var(--profile-border))] py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[hsl(var(--profile-ink-muted))]">Approach</p>
            <p className="mt-2 text-sm leading-6 text-[hsl(var(--profile-ink))]">{contextGraphProof.approach}</p>
          </div>
          {contextGraphProof.evidence.map((item, index) => (
            <div className="grid grid-cols-[2rem_1fr] gap-3 border-b border-[hsl(var(--profile-border))] py-3" key={item}>
              <span className="profile-serif text-lg text-[hsl(var(--profile-accent-hover))]">0{index + 1}</span>
              <p className="text-sm leading-6 text-[hsl(var(--profile-ink))]">{item}</p>
            </div>
          ))}
        </div>
      </article>

      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[hsl(var(--profile-ink-muted))]">Additional public systems</p>
      <div className="mt-2 grid divide-y divide-[hsl(var(--profile-border))] border-t border-[hsl(var(--profile-border))] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {supportingProjects.map((project) => (
          <article className="py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0" key={project.title}>
            <div className="flex items-start gap-3">
              <project.icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[hsl(var(--profile-teal))]" />
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[hsl(var(--profile-ink))]">{project.title}</h3>
                <p className="mt-1 text-xs leading-5 text-[hsl(var(--profile-ink-muted))]">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {project.links.map((link) => (
                    <a className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--profile-accent))] hover:text-[hsl(var(--profile-accent-hover))]" href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                      {link.label}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
