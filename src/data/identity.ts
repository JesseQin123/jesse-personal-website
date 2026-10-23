// Canonical facts about Jesse for crawlers and AI agents. The build reads this file to write the
// static homepage HTML, the Person structured data, llms.txt, llms-full.txt and sitemap.xml, so keep
// it free of imports and say each fact the same way everywhere it is published.
export const SITE_URL = "https://www.jesseqin.me";

export const identity = {
  name: "Jesse Qin",
  givenName: "Jesse",
  familyName: "Qin",
  alternateNames: ["Yubo Qin", "Jesse Yubo Qin"],
  headline: "Founder of Solo Unicorn Lab, New York",
  oneLiner:
    "Jesse Qin (Yubo Qin) is the founder of Solo Unicorn Lab in New York, building context systems for people and AI agents.",
  disambiguation:
    "Not to be confused with other people named Jesse Qin. This Jesse Qin, also known as Yubo Qin, founded Solo Unicorn Lab and earned a PhD in Computer Engineering at Rutgers University.",
  email: "jesse@solounicorn.club",
  location: { locality: "New York", region: "NY", country: "US" },
  image: `${SITE_URL}/og/jesse-qin.jpg`,
  knowsAbout: [
    "AI agents",
    "One-person companies",
    "Context graphs",
    "Ontology",
    "Knowledge graphs",
    "Enterprise AI infrastructure",
    "Agent workflows",
  ],
} as const;

export const organizations = {
  lab: { name: "Solo Unicorn Lab", url: "https://www.solounicorn.club/", role: "Founder" },
  club: { name: "Solo Unicorn Club", url: "https://www.solounicorn.club/", role: "Founder" },
  previous: { name: "Kamiwaza", url: "https://www.kamiwaza.ai/", role: "Senior Member of Technical Staff", period: "2025–2026" },
} as const;

export const education = [
  { name: "Rutgers University", credential: "PhD in Computer Engineering", period: "2016–2021" },
  { name: "NYU Stern School of Business", credential: "MSBAi (Business Analytics and AI)", period: "2024–2025" },
] as const;

export const profiles = {
  linkedin: "https://www.linkedin.com/in/jesseqin-phd/",
  github: "https://github.com/JesseQin123",
  x: "https://x.com/jesseqin_",
  medium: "https://jesse-qin.medium.com/",
} as const;

export const projects = [
  {
    name: "Solo Unicorn Lab & Solo Unicorn Club",
    url: "https://www.solounicorn.club/",
    summary: "The company Jesse founded to build one-person companies run with teams of AI agents, and its founder community in New York.",
  },
  {
    name: "AI Usage",
    url: `${SITE_URL}/ai-usage`,
    summary: "A public, daily-updated dashboard of the AI tokens Jesse uses across his machines.",
  },
  {
    name: "Life in AGI",
    url: "https://www.lifeinagi.com/",
    summary: "Writing and research on work, learning, creativity and human agency as AI gets better.",
  },
  {
    name: "Context Graph",
    url: "https://contextgraph.tech/",
    summary: "A public thesis and reference model for context that AI agents can act on inside an organization.",
  },
  {
    name: "Solo Unicorn Toolbox",
    url: "https://github.com/JesseQin123/solo_unicorn_toolbox",
    summary: "A bilingual, weekly-synced catalog of open-source AI projects for one-person companies.",
  },
] as const;

export const milestones = [
  "Presented at Knowledge Graph Conference 2026, Cornell Tech, New York (May 4, 2026).",
  "Curated hundreds of open-source AI projects into the bilingual Solo Unicorn Toolbox.",
  "Published Context Graph, a public thesis on context AI agents can act on.",
] as const;

export const story = [
  {
    title: "Life in AGI",
    text: "Before building anything, Jesse started writing Life in AGI: what happens to work, learning, creativity and agency once AI is good enough to do most of what we do.",
  },
  {
    title: "Living with AI, measured",
    text: "AI is in how Jesse works and lives every day. His AI token usage is published live, straight from his own machines, at jesseqin.me/ai-usage.",
  },
  {
    title: "Solo Unicorn Lab & Club",
    text: "Jesse believes the one-person company is real. Solo Unicorn Lab is where he builds toward it, and Solo Unicorn Club is where founders in New York try it together.",
  },
] as const;

export const faqs = [
  { q: "Who is Jesse Qin?", a: identity.oneLiner },
  { q: "Is Jesse Qin the same person as Yubo Qin?", a: "Yes. Jesse Qin is also known as Yubo Qin; his full name is Jesse Yubo Qin." },
  { q: "What is Jesse Qin working on now?", a: "Solo Unicorn Lab, a company built around one person running a company with a team of AI agents, and Solo Unicorn Club, its founder community in New York." },
  { q: "What did Jesse Qin do before Solo Unicorn Lab?", a: "He was a Senior Member of Technical Staff at Kamiwaza (2025–2026), working on enterprise AI infrastructure, ontology, context graphs and agent workflows." },
  { q: "How can I contact Jesse Qin?", a: `Email ${identity.email}, or find him on LinkedIn, GitHub and X (@jesseqin_).` },
] as const;
