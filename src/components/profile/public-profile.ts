import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Boxes,
  Braces,
  Github,
  GraduationCap,
  Landmark,
  Network,
  Newspaper,
  Orbit,
  Users,
  Workflow,
} from "lucide-react";

export const publicLinks = {
  email: "mailto:jesse@solounicorn.club",
  github: "https://github.com/JesseQin123",
  linkedIn: "https://www.linkedin.com/in/jesseqin-phd/",
  medium: "https://jesse-qin.medium.com/",
  toolbox: "https://github.com/JesseQin123/solo_unicorn_toolbox",
  clipmarts: "https://clipmarts.vercel.app/",
  clipmartsGithub: "https://github.com/JesseQin123/clipmarts",
  contentPipeline: "https://github.com/JesseQin123/content-pipeline",
  soloUnicorn: "https://www.solounicorn.club/",
  lifeInAgi: "https://www.lifeinagi.com/",
  contextGraph: "https://contextgraph.tech/",
} as const;

export const profileNavigation = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Background", href: "#experience", id: "experience" },
  { label: "Work with me", href: "#services", id: "services" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Explorations", href: "#explorations", id: "explorations" },
] as const;

export const atAGlance = [
  { label: "Systems scope", value: "AI systems architecture · Product engineering" },
  { label: "Specialty", value: "Ontology · Context graphs · Agent systems" },
  { label: "Problems", value: "Tacit knowledge · Fragmented decision context · Knowledge continuity" },
  { label: "Builds", value: "Governed context layers · Agent workflows · AI-native products" },
  { label: "Approach", value: "Discover → model → connect → build → ship → learn" },
  { label: "Public proof", value: "Toolbox · Context Graph thesis · Open-source workflows" },
  { label: "Education", value: "PhD in Computer Engineering, Rutgers · MSBAi, NYU Stern" },
  { label: "Location", value: "New York, USA" },
] as const;

type SnapshotItem = {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
};

export const snapshotItems: readonly SnapshotItem[] = [
  { icon: BookOpen, value: "12+ years in applied AI", label: "From research to products and agent systems" },
  { icon: GraduationCap, value: "PhD in Computer Engineering", label: "Rutgers University" },
  { icon: Landmark, value: "MSBAi", label: "NYU Stern" },
];

export const publicProjects = [
  {
    featured: true,
    icon: Boxes,
    status: "Open source · actively maintained",
    title: "Solo Unicorn Toolbox",
    summary:
      "A bilingual, weekly-synced catalog of 500+ public repositories across agent systems, skills, context, infrastructure, and AI-native workflows.",
    contribution:
      "I built the taxonomy, enrichment scripts, and sync workflow so scattered tools become a navigable technical radar for high-leverage builders.",
    problem:
      "AI tooling changes faster than static lists can remain useful, and repository metadata alone does not reveal where a tool fits in a working system.",
    proof: "500+ public repositories · bilingual catalog · weekly automated sync",
    demonstrates: "Taxonomy design · enrichment automation · operating a living knowledge product",
    tags: ["Python", "GitHub Actions", "Taxonomy", "Bilingual"],
    links: [{ label: "View project", href: publicLinks.toolbox }],
  },
  {
    featured: false,
    icon: Boxes,
    status: "Public product experiment",
    title: "ClipMarts",
    summary: "A marketplace prototype for agent skills, MCP bundles, and reusable workflow recipes.",
    contribution: "Product model, catalog structure, full-stack experience, and checkout integration.",
    problem: "Reusable agent capabilities are difficult to evaluate, package, and discover across fragmented sources.",
    proof: "Public prototype · source repository",
    demonstrates: "Product modeling · full-stack delivery · marketplace workflow design",
    tags: ["Next.js", "TypeScript", "Stripe"],
    links: [
      { label: "Live prototype", href: publicLinks.clipmarts },
      { label: "GitHub", href: publicLinks.clipmartsGithub },
    ],
  },
  {
    featured: false,
    icon: Workflow,
    status: "Open-source workflow",
    title: "Content Pipeline",
    summary: "A Python workflow from topic discovery and research to drafting and multi-format publishing.",
    contribution: "Workflow design, staged automation, templates, and tooling for a repeatable creative process.",
    problem: "Research and publishing workflows lose context across disconnected manual steps.",
    proof: "Public Python workflow",
    demonstrates: "Workflow decomposition · staged automation · reusable operating systems",
    tags: ["Python", "Research", "Automation"],
    links: [{ label: "View project", href: publicLinks.contentPipeline }],
  },
  {
    featured: false,
    icon: Users,
    status: "Founder · community",
    title: "Solo Unicorn Club",
    summary: "A New York community for ambitious one-person companies and small, high-leverage teams.",
    contribution: "Community model, public identity, events, learning programs, and project-oriented operations.",
    problem: "Solo AI builders need trusted peers, useful critique, and a path from conversations to shipped projects.",
    proof: "Public community · events · field notes",
    demonstrates: "Founder leadership · community systems · project-oriented operations",
    tags: ["Community", "Founder", "AI-native work"],
    links: [{ label: "Visit the club", href: publicLinks.soloUnicorn }],
  },
] as const;

export const contextGraphProof = {
  status: "Public technical thesis · reference architecture",
  title: "Context Graph",
  problem:
    "Enterprise agents often retrieve documents but miss the decisions, evidence, exceptions, ownership, and permission boundaries that make knowledge usable.",
  approach:
    "Model operational context as governed entities and relationships, then make provenance, permissions, retrieval, and evaluation part of the system contract.",
  evidence: [
    "Ontology: people, systems, decisions, evidence, and relationships",
    "Governance: provenance, permission boundaries, and human oversight",
    "System layer: agent-facing retrieval, evaluation, and auditable context",
  ],
  href: publicLinks.contextGraph,
} as const;

export const focusAreas = [
  {
    icon: Braces,
    title: "Ontology and semantic models",
    description:
      "Making the meaning, relationships, and operating vocabulary of a domain explicit enough for people and AI systems to share through a governed semantic model.",
  },
  {
    icon: Network,
    title: "Context graphs",
    description:
      "Representing decisions, evidence, entities, relationships, and exceptions with provenance and permissions—the context documents alone leave behind.",
  },
  {
    icon: Orbit,
    title: "Agent and tool orchestration",
    description:
      "Connecting models, tools, data, and workflows into systems that solve a real problem rather than showcase isolated capability.",
  },
  {
    icon: Workflow,
    title: "High-leverage solo systems",
    description:
      "Building reusable operating systems that let one person research, create, ship, and learn with the leverage of a much larger team.",
  },
] as const;

export const backgroundItems = [
  {
    label: "Applied AI",
    title: "12+ years from research to products",
    description:
      "More than twelve years across AI research, startups, and hands-on product building—from early ideas to working software.",
  },
  {
    label: "Startup environments",
    title: "Experience across three AI startups",
    description:
      "Work shaped by ambiguous problems, constrained teams, fast feedback, and the need to connect technical choices to a usable product.",
  },
  {
    label: "Education",
    title: "Computer engineering + business analytics",
    description: "PhD in Computer Engineering from Rutgers and MSBAi from NYU Stern.",
  },
  {
    label: "Founder-operator",
    title: "Solo Unicorn Club, New York",
    description:
      "Founded a public community for AI-native builders, with events, field notes, and project-oriented operating systems.",
  },
] as const;

export const writingLinks = [
  {
    icon: Network,
    label: "Context Graph",
    description: "A public thesis on context graphs and more useful AI systems.",
    href: publicLinks.contextGraph,
    external: true,
  },
  {
    icon: Newspaper,
    label: "Medium",
    description: "Essays on AI agents, startup leadership, and building useful products.",
    href: publicLinks.medium,
    external: true,
  },
  {
    icon: BookOpen,
    label: "Life in AGI",
    description: "Notes on work, creativity, and human agency in the AI era.",
    href: publicLinks.lifeInAgi,
    external: true,
  },
  {
    icon: Github,
    label: "Technical tutorials",
    description: "Practical guides to AI tools, agents, and modern workflows.",
    href: "/tutorials",
    external: false,
  },
] as const;
