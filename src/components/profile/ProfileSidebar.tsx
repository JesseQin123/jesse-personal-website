import { ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react";
import profileImage from "@/assets/jesse-profile.jpg";
import { publicLinks, snapshotItems } from "@/components/profile/public-profile";

const socialLinks = [
  { icon: Github, label: "github.com/JesseQin123", href: publicLinks.github },
  { icon: Linkedin, label: "linkedin.com/in/jesseqin-phd", href: publicLinks.linkedIn },
  { icon: Mail, label: "jesse@solounicorn.club", href: publicLinks.email },
] as const;

export const ProfileSidebar = () => (
  <aside className="hidden border-r border-[hsl(var(--profile-ink)/0.28)] bg-[hsl(var(--profile-sidebar))] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto">
    <div className="mx-auto flex w-full max-w-[300px] flex-1 flex-col px-9 py-11 xl:max-w-[340px] xl:px-10 xl:pb-10 xl:pt-16 min-[1400px]:px-12 min-[1400px]:pt-20">
      <a className="mx-auto rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))] focus-visible:ring-offset-4" href="#about">
        <img
          alt="Jesse Qin in New York City"
          className="h-40 w-40 rounded-full object-cover object-[50%_18%] min-[1400px]:h-48 min-[1400px]:w-48"
          decoding="async"
          height="1286"
          src={profileImage}
          width="1024"
        />
      </a>

      <div className="mt-7 text-center">
        <p className="profile-serif text-[2.6rem] leading-none tracking-[-0.035em] text-[hsl(var(--profile-ink))] min-[1400px]:text-[3.1rem]">Jesse Qin</p>
        <p className="mt-5 text-sm font-semibold leading-6 text-[hsl(var(--profile-ink))] min-[1400px]:text-[15px]">
          AI systems engineer<br /><span className="whitespace-nowrap">ontology · context graphs</span>
        </p>
      </div>

      <div className="mt-7 border-y border-[hsl(var(--profile-border-control)/0.55)] py-5">
        <p className="flex items-center gap-3 text-sm text-[hsl(var(--profile-ink-muted))]">
          <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[hsl(var(--profile-ink))]" />
          New York, USA
        </p>
      </div>

      <ul className="border-b border-[hsl(var(--profile-border-control)/0.55)] py-4">
        {socialLinks.map((item) => (
          <li key={item.label}>
            <a
              className="group flex min-h-9 items-center gap-3 text-[13px] text-[hsl(var(--profile-teal))] transition-colors hover:text-[hsl(var(--profile-accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))]"
              href={item.href}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              target={item.href.startsWith("http") ? "_blank" : undefined}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[hsl(var(--profile-ink))]" />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.href.startsWith("http") && <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
            </a>
          </li>
        ))}
      </ul>

      <ul className="mt-5 space-y-5">
        {snapshotItems.map((item) => (
          <li className="flex gap-3" key={item.value}>
            <item.icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[hsl(var(--profile-teal))]" />
            <span>
              <span className="block text-[13px] font-bold leading-5 text-[hsl(var(--profile-ink))]">{item.value}</span>
              <span className="mt-0.5 block text-xs leading-5 text-[hsl(var(--profile-ink-muted))]">{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);
