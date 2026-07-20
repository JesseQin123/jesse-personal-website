export const recruiterFacts = {
  currentRole: {
    title: "Senior Member of Technical Staff",
    organization: "Kamiwaza",
    period: "Jul 2025–Present",
    summary: "Enterprise AI infrastructure and product engineering",
  },
  toolbox: {
    repositoryCount: 604,
    categoryCount: 12,
    verificationDate: "July 20, 2026",
    summary: "Weekly automated synchronization",
  },
  education: {
    phd: {
      title: "PhD in Computer Engineering",
      organization: "Rutgers University",
      period: "2016–2021",
    },
    masters: {
      title: "MSBAi",
      organization: "NYU Stern",
      period: "2024–2025",
    },
  },
  conference: {
    title: "Knowledge Graph Conference 2026",
    date: "May 4, 2026",
    location: "Cornell Tech, New York",
  },
} as const;

export type RecruiterCaseStudy = {
  slug: string;
  category: string;
  title: string;
  status: string;
  problem: string;
  role: string;
  shipped: string;
  result: string;
  context: string;
  constraints: string;
  decisionsLabel: string;
  decisions: string[];
  evidenceNote: string;
  reflection: string;
  href: string;
  proofLabel: string;
};

export const recruiterCaseStudies: RecruiterCaseStudy[] = [
  {
    slug: "kamiwaza-ai",
    category: "Enterprise AI infrastructure",
    title: "Kamiwaza AI",
    status: `Current role · ${recruiterFacts.currentRole.period}`,
    problem:
      "Organizations need to deploy and govern AI around distributed data and real workflows without losing control of security, context, or product usability.",
    role:
      `${recruiterFacts.currentRole.title} working across enterprise AI infrastructure, product engineering, ontology, context graphs, RAG, and agent workflows.`,
    shipped:
      "Publicly shareable scope includes platform and product work around deployment, governance, distributed data, and agent-ready systems. Detailed feature ownership is limited by employer confidentiality.",
    result:
      "Kamiwaza 1.0 reached general availability in 2026. Customer, revenue, and performance details remain confidential.",
    context:
      "Enterprise AI systems have to operate inside existing security, data, infrastructure, and product constraints. The work is less about a standalone model demo and more about making AI deployable and governable where organizations already operate.",
    constraints:
      "Employer confidentiality limits feature-level detail, internal architecture, customer names, performance data, and individual attribution. This case study therefore separates public company milestones from Jesse's shareable role scope.",
    decisionsLabel: "Architectural principles",
    decisions: [
      "Treat deployment, governance, and permission boundaries as system requirements rather than launch-day additions.",
      "Model organizational context explicitly so agent workflows can operate with clearer boundaries and provenance.",
      "Connect infrastructure choices to product usability and the workflows people already depend on.",
    ],
    evidenceNote:
      "Public evidence supports Jesse's role, technical focus, and the Kamiwaza 1.0 milestone. Employment chronology is supplied by Jesse; granular feature ownership remains limited by employer confidentiality.",
    reflection:
      "The strongest enterprise AI work joins infrastructure, context, governance, and product experience into one operating system rather than optimizing each in isolation.",
    href: "https://www.kamiwaza.ai/",
    proofLabel: "Company and product",
  },
  {
    slug: "context-graph",
    category: "Independent research prototype",
    title: "Context Graph",
    status: "Public research concept · marketplace not launched",
    problem:
      "Enterprise agents can retrieve documents yet still miss decisions, evidence, exceptions, ownership, provenance, and permission boundaries.",
    role:
      "Research synthesis, ontology design, product framing, and a reference architecture for governed context shared by people and agents.",
    shipped:
      "A public thesis, reference architecture, ontology concepts, learning pages, and an explorable prototype.",
    result:
      "The public thesis and research prototype are live. The marketplace has not launched, so this work is presented as research rather than adoption or traction.",
    context:
      "Retrieval systems are good at finding relevant text, but enterprise decisions also depend on why something happened, who approved it, what exception applied, which evidence was trusted, and what permissions were active at that moment.",
    constraints:
      "This is independent public research, not a launched marketplace or production deployment. The design has to distinguish original synthesis from ideas drawn from the wider knowledge-graph and enterprise-agent community.",
    decisionsLabel: "Key design decisions",
    decisions: [
      "Represent decision traces, evidence, provenance, ownership, permissions, and temporal state as first-class context.",
      "Frame the graph as shared organizational memory for people and agents, not merely a document-retrieval layer.",
      "Publish the thesis and prototype with explicit status labels so research artifacts are not mistaken for market traction.",
    ],
    evidenceNote:
      "The public site is evidence of the thesis, reference architecture, and prototype only. Creation and latest-update dates are not asserted here until a source-of-truth project history is verified.",
    reflection:
      "Useful agent context is not just more content. It is the governed record of decisions, evidence, exceptions, and authority that makes action legible.",
    href: "https://contextgraph.tech/",
    proofLabel: "Read the public thesis",
  },
  {
    slug: "solo-unicorn-toolbox",
    category: "Open-source knowledge system",
    title: "Solo Unicorn Toolbox",
    status: `Actively maintained · last checked ${recruiterFacts.toolbox.verificationDate}`,
    problem:
      "Fast-moving agent and AI infrastructure projects are difficult to evaluate when they are scattered across bookmarks, social feeds, and static lists.",
    role:
      "Designed the bilingual taxonomy, enrichment scripts, repository workflow, and automated synchronization process.",
    shipped:
      `A public catalog of ${recruiterFacts.toolbox.repositoryCount} curated repositories across ${recruiterFacts.toolbox.categoryCount} categories, with bilingual documentation and weekly GitHub Actions sync.`,
    result:
      `The public repository catalogs ${recruiterFacts.toolbox.repositoryCount} projects across ${recruiterFacts.toolbox.categoryCount} categories with a weekly synchronization workflow. This measures catalog scope, not user adoption.`,
    context:
      "The AI tooling landscape changes too quickly for a hand-maintained bookmark list. The useful artifact is a repeatable knowledge workflow that can classify, enrich, review, and refresh the landscape over time.",
    constraints:
      "Repository metadata is noisy, categories evolve, and automated enrichment can introduce errors. The workflow needs visible provenance, reviewable outputs, and a cadence that does not imply endorsement or adoption.",
    decisionsLabel: "Key design decisions",
    decisions: [
      "Use a bilingual taxonomy so the same technical landscape is legible across English- and Chinese-speaking audiences.",
      "Automate synchronization while keeping the generated catalog inspectable in a public Git repository.",
      "Report catalog scope with a verification date and explicitly separate it from user or commercial metrics.",
    ],
    evidenceNote:
      `The public repository showed ${recruiterFacts.toolbox.repositoryCount} repositories across ${recruiterFacts.toolbox.categoryCount} categories when last checked on ${recruiterFacts.toolbox.verificationDate}.`,
    reflection:
      "Curation becomes a systems problem at scale: taxonomy, automation, provenance, and maintenance matter as much as the list itself.",
    href: "https://github.com/JesseQin123/solo_unicorn_toolbox",
    proofLabel: "Inspect the repository",
  },
];
