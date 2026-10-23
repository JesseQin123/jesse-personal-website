import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const directions = [
  {
    id: "frontier-ai-atelier",
    label: "Direction A",
    name: "Frontier AI Atelier",
    tagline: "High-ticket AI advisory with researcher-builder authority.",
    image: "/brand/frontier-ai-atelier.png",
    accent: "#F26A21",
    deep: "#171412",
    surface: "#F7F3EC",
    fit: "Best if the homepage should raise your consulting rate and help with senior AI / founder / strategy roles.",
    heroEyebrow: "AI systems advisor · researcher · builder",
    heroTitle: "Turn frontier AI into shipped systems.",
    heroBody:
      "I help founders, teams, and executives move from AI ambition to working products, sharper decisions, and compounding internal capability.",
    primaryCta: "Book an advisory call",
    secondaryCta: "See proof of work",
    proof: ["Rutgers CE PhD", "NYU Stern MSBAi", "3 AI startups", "1,000+ AI companies analyzed"],
    sections: [
      "Hero with one precise positioning statement",
      "Proof bar with credentials and shipped systems",
      "Offer stack: advisory, MVP build, fractional AI leadership",
      "Selected projects as evidence, not a portfolio dump",
      "Pricing anchored around premium advisory packages",
    ],
    assetUse:
      "Use this as the main homepage hero background, cropped right. Pair it with your real portrait lower on the page for trust.",
  },
  {
    id: "solo-unicorn-command-center",
    label: "Direction B",
    name: "Solo Unicorn Command Center",
    tagline: "AI-native operator energy for one-person company, coaching, and productized knowledge.",
    image: "/brand/solo-unicorn-command-center.png",
    accent: "#12B3A8",
    deep: "#12343B",
    surface: "#FFFDF8",
    fit: "Best if you want the site to make people feel you are already living the AI-native solo-company future.",
    heroEyebrow: "Solo Unicorn Club · AI workflows · personal leverage",
    heroTitle: "Build like a team, move like one person.",
    heroBody:
      "I teach and build the AI-native operating systems that let ambitious people prototype faster, learn faster, and compound their work.",
    primaryCta: "Join the next cohort",
    secondaryCta: "Explore projects",
    proof: ["Solo Unicorn Club", "Life in AGI", "Agent workflows", "NYC community"],
    sections: [
      "Hero framed around the one-person company thesis",
      "Operating system: tools, workflows, agents, habits",
      "Coaching offers for builders and professionals",
      "Project gallery as living experiments",
      "Tutorials and community as the trust engine",
    ],
    assetUse:
      "Use this for coaching, teaching, or Solo Unicorn sections. It has the strongest 'AI-native super individual' signal.",
  },
  {
    id: "life-in-agi-field-notes",
    label: "Direction C",
    name: "Life in AGI Field Notes",
    tagline: "Thought-leadership brand for AGI-era work, life, and human agency.",
    image: "/brand/life-in-agi-field-notes.png",
    accent: "#4E8F7B",
    deep: "#1A2A2A",
    surface: "#F8F1E6",
    fit: "Best if the site should feel like a serious public intellectual platform, not just a services page.",
    heroEyebrow: "Life in AGI · field notes from the frontier",
    heroTitle: "A practical philosophy for the AGI era.",
    heroBody:
      "I explore how AI changes work, learning, faith, community, ambition, and the shape of an individual life.",
    primaryCta: "Read Life in AGI",
    secondaryCta: "Work with me",
    proof: ["Research depth", "Builder practice", "Human-centered AI", "Long-form thinking"],
    sections: [
      "Hero with thesis-led editorial framing",
      "Featured essays and field notes",
      "Coaching as guided adaptation to the AI era",
      "Projects as experiments in future living",
      "Consulting presented as strategic sensemaking",
    ],
    assetUse:
      "Use this for Life in AGI, writing, talks, newsletters, and the softer trust-building parts of the site.",
  },
];

const homepageArchitecture = [
  {
    icon: Compass,
    title: "Positioning",
    copy: "Lead with a one-sentence thesis: Jesse turns frontier AI into personal and organizational leverage.",
  },
  {
    icon: GraduationCap,
    title: "Authority",
    copy: "Compress credentials into proof chips, then show how those credentials became shipped products and communities.",
  },
  {
    icon: BrainCircuit,
    title: "Offers",
    copy: "Separate high-ticket advisory from builder coaching so enterprise buyers and ambitious individuals both self-select.",
  },
  {
    icon: Layers,
    title: "Proof",
    copy: "Use projects as living evidence: Life in AGI, Solo Unicorn Club, Context Graph, tutorials, and applied tools.",
  },
];

const recommendedCopy = [
  "AI-native advisor for people and teams building at the frontier.",
  "I help executives, founders, and ambitious builders turn AI from scattered tools into systems that compound.",
  "Part researcher, part operator, part coach: Rutgers CE PhD, NYU Stern MSBAi, 3 AI startups, and 1,000+ AI companies analyzed.",
];

const BrandDirections = () => {
  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#171412]">
      <Navbar />
      <main>
        <section className="border-b border-[#171412]/10 bg-[#fffdf8]">
          <div className="container mx-auto px-4 py-10 lg:px-8 lg:py-16">
            <Button variant="heroOutline" size="sm" className="mb-8 rounded-lg border-[#171412]/15 bg-transparent" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to current site
              </Link>
            </Button>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#F26A21]">
                  Personal brand direction board
                </p>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                  Package Jesse Qin as an AI-native super individual.
                </h1>
              </div>
              <div className="space-y-4 text-base leading-7 text-[#171412]/72">
                {recommendedCopy.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 lg:px-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {directions.map((direction) => (
              <a
                key={direction.id}
                href={`#${direction.id}`}
                className="group overflow-hidden rounded-lg border border-[#171412]/12 bg-[#fffdf8] transition hover:-translate-y-1 hover:border-[#171412]/25"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={direction.image}
                    alt={`${direction.name} sample`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#171412]/55">
                    {direction.label}
                  </p>
                  <h2 className="text-xl font-bold">{direction.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#171412]/68">{direction.tagline}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {directions.map((direction) => (
          <section key={direction.id} id={direction.id} className="border-t border-[#171412]/10 bg-[#fffdf8]">
            <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: direction.accent }}>
                    {direction.label}
                  </p>
                  <h2 className="text-3xl font-bold tracking-normal md:text-5xl">{direction.name}</h2>
                  <p className="mt-5 text-lg leading-8 text-[#171412]/72">{direction.fit}</p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {direction.proof.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-3 py-1 text-sm"
                        style={{
                          borderColor: `${direction.deep}24`,
                          backgroundColor: `${direction.deep}0D`,
                          color: direction.deep,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-3">
                    {direction.sections.map((section) => (
                      <div key={section} className="flex gap-3 text-sm leading-6 text-[#171412]/74">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: direction.accent }} />
                        <span>{section}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 border-l-2 pl-4 text-sm leading-6 text-[#171412]/65" style={{ borderColor: direction.accent }}>
                    {direction.assetUse}
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-[#171412]/12 bg-[#101417]">
                  <div className="relative aspect-[4/5] md:aspect-[16/9]">
                    <img src={direction.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101417]/95 via-[#101417]/62 to-transparent md:bg-gradient-to-r md:from-[#101417]/92 md:via-[#101417]/48 md:to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex w-full flex-col justify-end p-5 text-[#fffdf8] md:inset-y-0 md:left-0 md:right-auto md:w-[58%] md:justify-center md:p-8">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#fffdf8]/68">
                        {direction.heroEyebrow}
                      </p>
                      <h3 className="text-2xl font-bold leading-tight tracking-normal md:text-4xl">
                        {direction.heroTitle}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-6 text-[#fffdf8]/76 md:text-base">
                        {direction.heroBody}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold" style={{ backgroundColor: direction.accent }}>
                          {direction.primaryCta}
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                        <span className="inline-flex items-center rounded-lg border border-[#fffdf8]/28 px-4 py-2 text-sm font-semibold text-[#fffdf8]">
                          {direction.secondaryCta}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-t border-white/10">
                    {[direction.deep, direction.accent, direction.surface].map((color) => (
                      <div key={color} className="flex items-center gap-3 px-4 py-3 text-xs text-white/70">
                        <span className="h-4 w-4 rounded-sm border border-white/20" style={{ backgroundColor: color }} />
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-[#171412]/10 bg-[#f7f3ec]">
          <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#F26A21]">
                Recommended synthesis
              </p>
              <h2 className="text-3xl font-bold tracking-normal md:text-5xl">
                Use A as the homepage spine, B as the energy, C as the soul.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#171412]/72">
                The strongest version is not one single mood. Lead with Frontier AI Atelier to raise perceived value,
                use Solo Unicorn Command Center to make the AI-native claim feel lived, and let Life in AGI create trust,
                warmth, and a bigger intellectual surface area.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {homepageArchitecture.map((item) => (
                <div key={item.title} className="rounded-lg border border-[#171412]/12 bg-[#fffdf8] p-5">
                  <item.icon className="mb-5 h-6 w-6 text-[#F26A21]" />
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#171412]/68">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-[#171412]/12 bg-[#fffdf8] p-6">
                <Sparkles className="mb-5 h-6 w-6 text-[#F26A21]" />
                <h3 className="text-lg font-bold">Signature phrase</h3>
                <p className="mt-3 text-sm leading-6 text-[#171412]/70">
                  AI-native leverage for people and teams building at the frontier.
                </p>
              </div>
              <div className="rounded-lg border border-[#171412]/12 bg-[#fffdf8] p-6">
                <Rocket className="mb-5 h-6 w-6 text-[#12B3A8]" />
                <h3 className="text-lg font-bold">Offer hierarchy</h3>
                <p className="mt-3 text-sm leading-6 text-[#171412]/70">
                  Premium advisory first, AI MVP and fractional leadership second, coaching and tutorials as scalable trust.
                </p>
              </div>
              <div className="rounded-lg border border-[#171412]/12 bg-[#fffdf8] p-6">
                <BookOpen className="mb-5 h-6 w-6 text-[#4E8F7B]" />
                <h3 className="text-lg font-bold">Content engine</h3>
                <p className="mt-3 text-sm leading-6 text-[#171412]/70">
                  Life in AGI and Solo Unicorn become proof that you are not just selling AI; you are practicing the future in public.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BrandDirections;
