import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  BrainCircuit,
  Check,
  CircleUserRound,
  Compass,
  GraduationCap,
  Layers3,
  Menu,
  PenLine,
  Rocket,
  UsersRound,
  Zap,
} from "lucide-react";
import profileImage from "@/assets/jesse-profile.jpg";
import contextGraphPoster from "@/assets/projects/contextgraph_poster.png";
import soloUnicornPoster from "@/assets/projects/solounicorn_club_poster.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Advisory", href: "#advisory" },
  { label: "Coaching", href: "#coaching" },
  { label: "Build Systems", href: "#systems" },
  { label: "Projects", href: "#evidence" },
  { label: "Resources", href: "/tutorials" },
  { label: "About", href: "#proof" },
];

const proofChips = [
  { icon: GraduationCap, title: "Rutgers CS PhD", detail: "Computer Science" },
  { icon: Boxes, title: "NYU Stern MSBAi", detail: "Business Analytics + AI" },
  { icon: Rocket, title: "3 AI startups", detail: "0 -> 1 and beyond" },
  { icon: BarChart3, title: "1,000+ AI companies", detail: "Deep diligence" },
  { icon: UsersRound, title: "Solo Unicorn Club", detail: "Operator community" },
  { icon: Compass, title: "Life in AGI", detail: "Research + essays" },
];

const operatingTracks = [
  {
    id: "advisory",
    number: "01",
    title: "Advisory",
    icon: Compass,
    color: "from-[#082D37] to-[#0A4B54]",
    description: "High-leverage strategy and product advice for AI-native organizations.",
    tags: ["Positioning", "Roadmaps", "GTM"],
  },
  {
    id: "coaching",
    number: "02",
    title: "Coaching",
    icon: CircleUserRound,
    color: "from-[#F26A21] to-[#FF3D00]",
    description: "Operator coaching to strengthen decision-making and execution habits.",
    tags: ["Mindset", "Systems", "Accountability"],
  },
  {
    id: "systems",
    number: "03",
    title: "Build Systems",
    icon: Layers3,
    color: "from-[#058B90] to-[#0FA7A0]",
    description: "AI systems and automations that replace manual work and scale capacity.",
    tags: ["Agents", "Automations", "Tooling"],
  },
];

const projectCards = [
  {
    title: "Solo Unicorn Club",
    description: "Operator community for people building AI-native solo companies.",
    image: soloUnicornPoster,
    icon: UsersRound,
    href: "https://solounicorn.club",
  },
  {
    title: "Life in AGI",
    description: "Essays and notes on AGI-era work, life, and human agency.",
    image: "/brand/life-in-agi-field-notes.png",
    icon: PenLine,
    href: "https://lifeinagi.com",
  },
  {
    title: "Context Graph",
    description: "Building and using context graphs for AI systems and products.",
    image: contextGraphPoster,
    icon: BrainCircuit,
    href: "https://contextgraph.tech",
  },
  {
    title: "Tutorials",
    description: "Practical guides on AI systems, tools, and workflows.",
    image: "/brand/frontier-ai-atelier.png",
    icon: BookOpen,
    href: "/tutorials",
  },
  {
    title: "AI Tools I Use",
    description: "The essential tools in my daily operator stack.",
    image: "/brand/solo-unicorn-command-center.png",
    icon: Zap,
    href: "/projects",
  },
];

const offers = [
  {
    title: "AI Strategy & Advisory",
    price: "$500/hr",
    description: "For founders and teams who need senior AI judgment, roadmap clarity, and product direction.",
    features: ["Roadmap sessions", "Vendor and architecture review", "Executive decision support"],
    href: import.meta.env.VITE_STRIPE_ROADMAP_SESSION_URL || "/book-call",
  },
  {
    title: "Solo Unicorn Coaching",
    price: "Private",
    description: "For ambitious operators who want an AI-native operating system for their life and work.",
    features: ["Weekly coaching", "Workflow design", "Accountability and decision systems"],
    href: "/book-call",
  },
  {
    title: "Build Systems Sprint",
    price: "Custom",
    description: "For people who want agents, workflows, automations, or internal tools shipped quickly.",
    features: ["AI MVP build", "Context and knowledge systems", "Automation implementation"],
    href: "#contact",
  },
];

const Chip = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-md border border-[#DDE7E6] bg-white/85 px-3 py-2 text-xs font-medium text-[#12343B] shadow-sm",
      className,
    )}
  >
    {children}
  </span>
);

const FloatingWorkflowCard = () => (
  <div className="absolute left-[2%] top-[19%] hidden w-44 rounded-lg border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur md:block xl:left-[8%]">
    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#678083]">Agent workflow</p>
    <div className="grid grid-cols-4 gap-2">
      {["", "", "", ""].map((_, index) => (
        <div key={index} className="flex h-8 items-center justify-center rounded-md border border-[#D7E5E4] bg-white">
          <span className={cn("h-2 w-2 rounded-full", index === 2 ? "bg-[#F26A21]" : "bg-[#099A9A]")} />
        </div>
      ))}
    </div>
    <div className="mt-3 flex justify-center gap-1 text-[#0B8F91]">
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current opacity-60" />
      <span className="h-1 w-1 rounded-full bg-current opacity-30" />
    </div>
  </div>
);

const ContextGraphCard = () => (
  <div className="absolute bottom-[19%] left-0 hidden w-64 rounded-lg bg-[#082D37] p-5 text-white shadow-2xl md:block xl:left-[-4%]">
    <p className="mb-5 text-[10px] font-bold uppercase tracking-wider text-white/55">Context graph</p>
    <div className="relative h-24">
      <div className="absolute left-2 top-8 h-px w-48 rotate-6 bg-white/30" />
      <div className="absolute left-8 top-3 h-px w-36 -rotate-12 bg-white/25" />
      <div className="absolute left-16 top-16 h-px w-28 rotate-[-22deg] bg-white/20" />
      {[
        ["left-3 top-8", "bg-white"],
        ["left-12 top-2", "bg-[#13B5AF]"],
        ["left-20 top-14", "bg-[#F26A21]"],
        ["left-32 top-7", "bg-white"],
        ["left-44 top-1", "bg-[#13B5AF]"],
        ["left-52 top-18", "bg-[#F26A21]"],
      ].map(([position, color]) => (
        <span key={position} className={cn("absolute h-3 w-3 rounded-full ring-4 ring-white/10", position, color)} />
      ))}
    </div>
  </div>
);

const SystemsViewCard = () => (
  <div className="absolute right-[3%] top-[18%] hidden w-64 rounded-lg border border-white/50 bg-white/75 p-4 shadow-xl backdrop-blur lg:block">
    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#57777A]">Systems view</p>
    <div className="grid grid-cols-[1fr_auto] gap-4">
      <div className="space-y-2">
        {["Strategy", "Systems", "Automation", "Leverage"].map((item) => (
          <div key={item} className="rounded-md bg-white px-3 py-2 text-xs font-medium text-[#33565A] shadow-sm">
            {item}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#9DCBC9] bg-white text-[#0A7E82] shadow-sm">
          <BarChart3 className="h-6 w-6" />
        </div>
      </div>
    </div>
  </div>
);

const SoloUnicornHomepage = () => {
  return (
    <div id="top" className="min-h-screen bg-[#FCFBF8] text-[#061826]">
      <header className="relative z-50 border-b border-[#061826]/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F26A21] text-lg font-bold text-white shadow-[0_12px_24px_rgba(242,106,33,0.22)]">
              JQ
            </div>
            <div>
              <p className="text-lg font-bold leading-none tracking-normal sm:text-2xl">Dr. Jesse Qin</p>
              <p className="mt-1 text-[11px] font-medium text-[#5F7478] sm:text-xs">AI-native advisor, coach, builder</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#12343B] lg:flex">
            {navItems.map((item, index) => (
              <a key={item.label} href={item.href} className="group relative py-3 transition hover:text-[#F26A21]">
                {item.label}
                {index === 0 && <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[#F26A21]" />}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden h-12 rounded-lg bg-[#F26A21] px-6 text-white shadow-[0_14px_28px_rgba(242,106,33,0.22)] hover:bg-[#E75A12] md:inline-flex">
              <Link to="/book-call">
                Work with Jesse
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DDE7E6] bg-white lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#DDE7E6] bg-white">
          <div className="absolute right-0 top-0 hidden h-full w-[52%] bg-[linear-gradient(120deg,transparent_0%,transparent_21%,#FF6A1A_21%,#FF6A1A_42%,#078A8B_42%,#078A8B_100%)] opacity-95 lg:block" />
          <div className="absolute right-[21%] top-[18%] hidden h-40 w-40 rounded-full bg-[#F26A21]/20 blur-3xl lg:block" />
          <div className="mx-auto grid min-h-[660px] max-w-[1500px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-16">
            <div className="relative z-10 flex flex-col justify-center">
              <div className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#F26A21]">
                <span className="h-3 w-3 rounded-full bg-[#F26A21]" />
                Solo Unicorn Command Center
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-[#071827] sm:text-6xl lg:text-7xl xl:text-[86px]">
                Build like a team.
                <br />
                Move like <span className="text-[#F26A21]">one person.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#39525A] sm:text-xl">
                I help ambitious founders and operators turn AI ambition into shipped systems that compound. Strategy.
                Coaching. Systems. Execution, integrated.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-lg bg-[#F26A21] px-7 text-white shadow-[0_14px_28px_rgba(242,106,33,0.2)] hover:bg-[#E75A12]">
                  <Link to="/book-call">
                    Work with Jesse
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-lg border-[#CCDAD9] bg-white px-7 text-[#071827] hover:bg-[#F6FAFA]">
                  <a href="#evidence">
                    See Projects
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex max-w-3xl flex-wrap gap-3">
                {proofChips.map((chip) => (
                  <Chip key={chip.title}>
                    <chip.icon className="h-4 w-4 text-[#078A8B]" />
                    {chip.title}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="relative z-10 min-h-[470px] lg:min-h-[610px]">
              <div className="absolute inset-x-0 bottom-0 mx-auto h-[460px] max-w-[500px] overflow-hidden rounded-t-[48px] bg-gradient-to-br from-white/75 to-[#D9F0EF]/55 shadow-[0_34px_80px_rgba(7,24,39,0.22)] lg:right-[18%] lg:h-[590px] lg:max-w-[530px]">
                <img
                  src={profileImage}
                  alt="Dr. Jesse Qin"
                  className="h-full w-full object-cover object-[50%_18%] mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/20" />
              </div>

              <FloatingWorkflowCard />
              <ContextGraphCard />
              <SystemsViewCard />

              <div className="absolute bottom-[9%] right-[6%] hidden rounded-lg border border-white/35 bg-[#0A777C]/65 p-4 text-white shadow-xl backdrop-blur-md lg:block">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/60">Outcomes</p>
                <div className="space-y-2 text-xs">
                  {["Clarity", "Velocity", "Scale", "Compounding"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="border-b border-[#DDE7E6] bg-[#FCFBF8]">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-px px-5 py-6 sm:px-8 md:grid-cols-3 lg:grid-cols-6 lg:px-12">
            {proofChips.map((item) => (
              <div key={item.title} className="flex items-center gap-3 border-[#DDE7E6] px-2 py-4 lg:border-r lg:last:border-r-0">
                <item.icon className="h-7 w-7 shrink-0 text-[#078A8B]" />
                <div>
                  <p className="text-sm font-bold text-[#071827]">{item.title}</p>
                  <p className="mt-1 text-xs text-[#6A7B80]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#DDE7E6] bg-white py-12 lg:py-16">
          <div className="mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.65fr] lg:px-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#078A8B]">How I operate</p>
              <h2 className="mt-4 max-w-sm text-4xl font-black leading-tight tracking-normal text-[#071827] lg:text-5xl">
                An AI-native operating system
              </h2>
              <p className="mt-4 max-w-sm leading-7 text-[#5A7075]">
                A repeatable system to turn ambiguity into clarity, strategy into leverage, and AI tools into working
                infrastructure.
              </p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#078A8B]">
                Explore the approach
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {operatingTracks.map((track) => (
                <article
                  id={track.id}
                  key={track.title}
                  className="group rounded-xl border border-[#DDE7E6] bg-white p-6 shadow-[0_20px_50px_rgba(7,24,39,0.04)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(7,24,39,0.09)]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className={cn("flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg", track.color)}>
                      <track.icon className="h-8 w-8" />
                    </div>
                    <span className="text-sm font-medium text-[#738489]">{track.number}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[#071827]">{track.title}</h3>
                  <p className="mt-3 min-h-[84px] text-sm leading-6 text-[#5A7075]">{track.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#5A7075]">
                    {track.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="evidence" className="border-b border-[#DDE7E6] bg-[#FCFBF8] py-12 lg:py-16">
          <div className="mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.55fr_1.75fr] lg:px-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#078A8B]">Evidence</p>
              <h2 className="mt-4 max-w-xs text-4xl font-black leading-tight tracking-normal text-[#071827] lg:text-5xl">
                Projects as evidence
              </h2>
              <p className="mt-4 max-w-xs leading-7 text-[#5A7075]">
                Real work across communities, research, systems, and practical content.
              </p>
              <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#078A8B]">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {projectCards.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  className="group overflow-hidden rounded-xl border border-[#DDE7E6] bg-white shadow-[0_18px_45px_rgba(7,24,39,0.04)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(7,24,39,0.09)]"
                >
                  <div className="relative aspect-[1.55] overflow-hidden">
                    <img src={project.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute -bottom-5 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#DDE7E6] bg-white text-[#078A8B] shadow-lg">
                      <project.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 pt-8">
                    <h3 className="font-black text-[#071827]">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5A7075]">{project.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 lg:py-20">
          <div className="mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.55fr] lg:px-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F26A21]">Work with me</p>
              <h2 className="mt-4 max-w-sm text-4xl font-black leading-tight tracking-normal text-[#071827] lg:text-5xl">
                Strategy, coaching, and systems that ship.
              </h2>
              <p className="mt-4 max-w-sm leading-7 text-[#5A7075]">
                Choose the lane that matches your current bottleneck. The goal is always the same: better leverage,
                faster execution, and durable capacity.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {offers.map((offer, index) => (
                <article
                  key={offer.title}
                  className={cn(
                    "rounded-xl border p-6",
                    index === 1
                      ? "border-[#071827] bg-[#071827] text-white shadow-[0_24px_70px_rgba(7,24,39,0.22)]"
                      : "border-[#DDE7E6] bg-[#FCFBF8]",
                  )}
                >
                  <p className={cn("text-sm font-bold", index === 1 ? "text-[#13B5AF]" : "text-[#078A8B]")}>{offer.price}</p>
                  <h3 className="mt-3 text-xl font-black">{offer.title}</h3>
                  <p className={cn("mt-3 min-h-[96px] text-sm leading-6", index === 1 ? "text-white/72" : "text-[#5A7075]")}>
                    {offer.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {offer.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className={cn("mt-0.5 h-4 w-4 shrink-0", index === 1 ? "text-[#13B5AF]" : "text-[#F26A21]")} />
                        <span className={index === 1 ? "text-white/82" : "text-[#30494F]"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={cn(
                      "mt-7 h-11 w-full rounded-lg",
                      index === 1 ? "bg-[#F26A21] text-white hover:bg-[#E75A12]" : "bg-white text-[#071827] hover:bg-[#F6FAFA]",
                    )}
                  >
                    <a href={offer.href}>
                      Start here
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#F26A21] px-5 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 rounded-xl bg-[#F26A21] text-white lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Build what compounds</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-normal lg:text-6xl">
                Let's design your AI-native operating system.
              </h2>
            </div>
            <Button asChild className="h-12 rounded-lg bg-white px-7 text-[#071827] hover:bg-white/90">
              <Link to="/book-call">
                Work with Jesse
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SoloUnicornHomepage;
