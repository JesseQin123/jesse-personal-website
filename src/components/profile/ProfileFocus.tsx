import { ArrowRight, ArrowUpRight } from "lucide-react";
import { focusAreas, publicLinks, writingLinks } from "@/components/profile/public-profile";

export const ProfileFocus = () => (
  <>
    <section id="writing" className="border-t border-[hsl(var(--profile-ink)/0.22)] bg-[hsl(var(--profile-surface-elevated))]">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-20 xl:pl-24 xl:pr-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-teal))]">Writing</p>
          <h2 className="profile-serif mt-4 max-w-[11ch] text-4xl leading-[1.05] tracking-[-0.025em] text-[hsl(var(--profile-ink))] sm:text-5xl">How I think in public.</h2>
          <p className="mt-5 max-w-[46ch] text-base leading-7 text-[hsl(var(--profile-ink-muted))]">
            Writing is how I test a thesis, make technical ideas legible, and connect engineering decisions to the way people actually work.
          </p>
        </div>
        <div className="border-t border-[hsl(var(--profile-border))]">
          {writingLinks.map((item) => (
            <a
              className="group grid min-h-24 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-[hsl(var(--profile-border))] py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]"
              href={item.href}
              key={item.label}
              rel={item.external ? "noopener noreferrer" : undefined}
              target={item.external ? "_blank" : undefined}
            >
              <item.icon aria-hidden="true" className="h-6 w-6 text-[hsl(var(--profile-teal))]" />
              <span>
                <span className="profile-serif block text-2xl tracking-[-0.015em] text-[hsl(var(--profile-ink))] transition-colors group-hover:text-[hsl(var(--profile-accent))]">{item.label}</span>
                <span className="mt-1 block text-sm leading-6 text-[hsl(var(--profile-ink-muted))]">{item.description}</span>
              </span>
              {item.external ? <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[hsl(var(--profile-accent))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> : <ArrowRight aria-hidden="true" className="h-4 w-4 text-[hsl(var(--profile-accent))] transition-transform group-hover:translate-x-1" />}
            </a>
          ))}
        </div>
      </div>
    </section>

    <section id="explorations" className="border-t border-[hsl(var(--profile-border))] bg-[hsl(var(--profile-surface))]">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 lg:py-20 xl:pl-24 xl:pr-16">
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-teal))]">Explorations</p>
            <h2 className="profile-serif mt-4 max-w-[11ch] text-4xl leading-[1.05] tracking-[-0.025em] text-[hsl(var(--profile-ink))] sm:text-5xl">Where I&apos;m going deeper.</h2>
            <p className="mt-5 max-w-[48ch] text-base leading-7 text-[hsl(var(--profile-ink-muted))]">
              I use this public research corpus to compare architectures, track emerging patterns, and turn scattered techniques into reusable workflows.
            </p>
            <a className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[hsl(var(--profile-accent))]" href={publicLinks.toolbox} rel="noopener noreferrer" target="_blank">
              Explore 500+ curated tools <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="grid border-t border-[hsl(var(--profile-border))] sm:grid-cols-2">
            {focusAreas.map((area, index) => (
              <article className="border-b border-[hsl(var(--profile-border))] py-7 sm:px-6 sm:odd:border-r sm:odd:pl-0" key={area.title}>
                <div className="flex items-center justify-between">
                  <area.icon aria-hidden="true" className="h-7 w-7 text-[hsl(var(--profile-teal))]" />
                  <span className="profile-serif text-xl text-[hsl(var(--profile-border-control))]">0{index + 1}</span>
                </div>
                <h3 className="profile-serif mt-5 text-2xl leading-tight tracking-[-0.015em] text-[hsl(var(--profile-ink))]">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--profile-ink-muted))]">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);
