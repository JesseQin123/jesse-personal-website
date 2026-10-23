import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ProfileActionLink } from "@/components/profile/ProfilePrimitives";
import { profileNavigation } from "@/components/profile/public-profile";
import profileImage from "@/assets/jesse-profile.jpg";
import { cn } from "@/lib/utils";

type NavigationLinksProps = {
  readonly activeId: string;
  readonly mobile?: boolean;
  readonly onNavigate?: (id: string) => void;
};

const NavigationLinks = ({ activeId, mobile = false, onNavigate }: NavigationLinksProps) => (
  <nav aria-label={mobile ? "Mobile navigation" : "Primary navigation"}>
    <ul className={mobile ? "grid gap-1" : "flex items-center gap-5 2xl:gap-8"}>
      {profileNavigation.map((item) => (
        <li key={item.id}>
          <a
            aria-current={activeId === item.id ? "location" : undefined}
            className={cn(
              "relative whitespace-nowrap text-[13px] font-medium text-[hsl(var(--profile-ink))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))] 2xl:text-sm",
              mobile
                ? "flex min-h-11 items-center px-3"
                : "inline-flex min-h-14 items-center after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[hsl(var(--profile-accent))] after:transition-[width]",
              !mobile && (activeId === item.id ? "after:w-full" : "after:w-0 hover:after:w-full"),
              mobile && activeId === item.id && "bg-[hsl(var(--profile-surface))] text-[hsl(var(--profile-accent))]",
            )}
            href={item.href}
            onClick={() => onNavigate?.(item.id)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export const ProfileHeader = () => {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const sections = profileNavigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const updateActiveSection = () => {
      const marker = window.innerWidth >= 1024 ? 120 : 96;
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      if (current) setActiveId(current.id);
      frame = 0;
    };

    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  const closeMenu = () => menuRef.current?.removeAttribute("open");
  const navigateFromMobile = (id: string) => {
    setActiveId(id);
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--profile-ink)/0.24)] bg-[hsl(var(--profile-surface-elevated)/0.97)] backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-[1180px] items-center justify-between gap-5 px-5 sm:px-8 lg:h-24 xl:px-12">
        <a className="flex min-w-0 items-center gap-3 lg:hidden" href="#about">
          <img alt="Jesse Qin" className="h-10 w-10 rounded-full object-cover object-[50%_18%]" src={profileImage} />
          <span>
            <span className="block font-semibold leading-none text-[hsl(var(--profile-ink))]">Jesse Qin</span>
            <span className="mt-1 block text-[11px] text-[hsl(var(--profile-ink-muted))]">AI systems engineer</span>
          </span>
        </a>

        <div className="hidden lg:block"><NavigationLinks activeId={activeId} onNavigate={setActiveId} /></div>

        <div className="flex items-center gap-3">
          <ProfileActionLink className="hidden sm:inline-flex" href="#contact">Start a conversation</ProfileActionLink>
          <details className="group relative lg:hidden" ref={menuRef}>
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-[hsl(var(--profile-ink))] bg-[hsl(var(--profile-surface-elevated))] text-[hsl(var(--profile-ink))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))] [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="h-5 w-5 group-open:hidden" />
              <X aria-hidden="true" className="hidden h-5 w-5 group-open:block" />
              <span className="sr-only group-open:hidden">Open navigation</span>
              <span className="sr-only hidden group-open:inline">Close navigation</span>
            </summary>
            <div className="absolute right-0 top-14 w-72 max-w-[calc(100vw-2.5rem)] border border-[hsl(var(--profile-ink))] bg-[hsl(var(--profile-surface-elevated))] p-2 shadow-[0_20px_50px_hsl(var(--profile-ink)/0.12)]">
              <NavigationLinks activeId={activeId} mobile onNavigate={navigateFromMobile} />
              <ProfileActionLink className="mt-2 w-full sm:hidden" href="#contact">Start a conversation</ProfileActionLink>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
};
