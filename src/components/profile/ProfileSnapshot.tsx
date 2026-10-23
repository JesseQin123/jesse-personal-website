import { backgroundItems } from "@/components/profile/public-profile";

export const ProfileSnapshot = () => (
  <section id="experience" className="border-t border-[hsl(var(--profile-border))] bg-[hsl(var(--profile-surface))]">
    <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 lg:py-20 xl:pl-24 xl:pr-16">
      <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--profile-teal))]">Career scope</p>
          <h2 className="profile-serif mt-4 max-w-[12ch] text-4xl leading-[1.05] tracking-[-0.025em] text-[hsl(var(--profile-ink))] sm:text-5xl">
            Research depth, startup range, hands-on delivery.
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-7 text-[hsl(var(--profile-ink-muted))]">
            This public profile captures the work I can share openly: research, startup environments, hands-on product building, and founder-operator experience—without exposing employer or client work.
          </p>
        </div>
        <div className="border-t border-[hsl(var(--profile-border))]">
          {backgroundItems.map((item, index) => (
            <article className="grid gap-2 border-b border-[hsl(var(--profile-border))] py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6" key={item.label}>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[hsl(var(--profile-teal))]">{item.label}</p>
                <p className="profile-serif mt-2 text-2xl text-[hsl(var(--profile-border-control))]">0{index + 1}</p>
              </div>
              <div>
                <h3 className="profile-serif text-2xl tracking-[-0.02em] text-[hsl(var(--profile-ink))]">{item.title}</h3>
                <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[hsl(var(--profile-ink-muted))]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
