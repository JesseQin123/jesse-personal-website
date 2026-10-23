import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import profileImage from "@/assets/jesse-profile.jpg";
import { aboutExperience } from "./badgeContent";

const BadgeScene = lazy(() => import("./BadgeScene"));

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

const linkClass =
  "underline decoration-[#8A8792]/50 underline-offset-[3px] transition-colors hover:text-[#080808] hover:decoration-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function AboutDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/[0.13] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <SheetPrimitive.Content
          className="fixed inset-y-0 left-0 z-[61] w-full overflow-y-auto bg-white px-6 pb-16 pt-8 font-hero text-[#080808] shadow-[0_0_60px_rgba(0,0,0,0.08)] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:w-[min(520px,100%)] sm:px-14 sm:pt-12"
        >
          <div className="flex items-start justify-between">
            <SheetPrimitive.Title className="text-[48px] font-medium leading-none tracking-[-0.02em] sm:text-[64px]">
              About
            </SheetPrimitive.Title>
            <SheetPrimitive.Close
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close about panel"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </SheetPrimitive.Close>
          </div>

          <SheetPrimitive.Description asChild>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.6] text-[#5B5864]">
              <p>
                I build at the intersection of enterprise AI, machine-readable knowledge, and the way people
                and agents make decisions together.
              </p>
              <p>
                My path runs from distributed systems and knowledge discovery through ontology, enterprise AI
                infrastructure, context graphs, and agent workflows. The through-line is shipping useful
                systems under real constraints.
              </p>
            </div>
          </SheetPrimitive.Description>

          <img
            src={profileImage}
            alt="Jesse Qin in New York City"
            className="mt-10 aspect-[3/2] w-full rounded-[3px] object-cover"
          />

          <h3 className="mt-12 text-[18px] font-medium">Experience</h3>
          <dl className="mt-3">
            {aboutExperience.map((item) => (
              <div
                key={item.organization}
                className="grid grid-cols-[6.5rem_1fr_auto] gap-3 border-b border-[#ECEAF0] py-4 text-[16px]"
              >
                <dt className="text-[#77747F]">{item.period}</dt>
                <dd>{item.organization}</dd>
                <dd className="text-right text-[#77747F]">{item.role}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[16px] leading-[1.6] text-[#5B5864]">
            Find me on{" "}
            <a className={linkClass} href="https://www.linkedin.com/in/jesseqin-phd/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
,{" "}
            <a className={linkClass} href="https://github.com/JesseQin123" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            or{" "}
            <a className={linkClass} href="https://x.com/jesseqin_" target="_blank" rel="noopener noreferrer">
              X
            </a>
            , or write to{" "}
            <a className={linkClass} href="mailto:jesse@solounicorn.club">
              jesse@solounicorn.club
            </a>
            .
          </p>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
}

const LanyardHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [inView, setInView] = useState(true);
  const [canRender3D, setCanRender3D] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setCanRender3D(supportsWebGL());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-jesse-hero
      aria-labelledby="hero-heading"
      className="relative h-[100svh] min-h-[560px] select-none overflow-hidden bg-white font-hero text-[#080808]"
    >
      <h1
        id="hero-heading"
        className="hero-wordmark pointer-events-none absolute -bottom-[1.4vw] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap text-[27.6vw] font-medium leading-none tracking-[-0.02em]"
      >
        Jesse Qin
      </h1>

      {canRender3D && (
        <div className="absolute inset-0 z-10">
          <SceneBoundary>
            <Suspense fallback={null}>
              <BadgeScene active={inView && !aboutOpen} reducedMotion={reducedMotion} />
            </Suspense>
          </SceneBoundary>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-5 top-[clamp(72px,11vh,100px)] z-20 flex justify-between gap-6 text-[14px] font-medium leading-[18px] sm:inset-x-[8vw] sm:text-[16px] sm:leading-5">
        <div className="pointer-events-auto max-w-[8.5rem] sm:max-w-[13.5rem]">
          <p>I build context systems for people and AI agents.</p>
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="group mt-3 inline-flex items-center gap-2 rounded-full py-1 pr-2 text-[#B43A00] transition-colors hover:text-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-haspopup="dialog"
          >
            <span className="relative h-7 w-7 shrink-0">
              {!reducedMotion && (
                <span className="about-ping absolute inset-0 rounded-full ring-2 ring-[#FF6815]" aria-hidden="true" />
              )}
              <img
                src={profileImage}
                alt=""
                className="relative h-7 w-7 rounded-full object-cover ring-1 ring-black/10 transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </span>
            <span className="underline decoration-[#B43A00]/40 underline-offset-[3px] group-hover:decoration-[#080808]">
              About me
            </span>
          </button>
        </div>
        <p className="pointer-events-auto max-w-[8.5rem] text-right sm:max-w-[15rem]">
          Founder of Solo Unicorn Lab, New York
        </p>
      </div>

      <AboutDrawer open={aboutOpen} onOpenChange={setAboutOpen} />
    </section>
  );
};

export default LanyardHero;
