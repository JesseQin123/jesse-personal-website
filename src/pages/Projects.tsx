import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Boxes, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eatWellPoster from "@/assets/projects/eat-well-app-poster.png";
import contentRewriterPoster from "@/assets/projects/content_rewriter_poster.png";
import jtimerPoster from "@/assets/projects/jtimer_poster.png";
import contextGraphPoster from "@/assets/projects/contextgraph_poster.png";
import churchAppPoster from "@/assets/projects/church_app_poster.png";
import lifeInAgiPoster from "@/assets/projects/life_in_agi_poster.png";
import soloUnicornPoster from "@/assets/projects/solounicorn_club_poster.png";

type ProjectStatus = "live" | "active" | "open-source";

interface Project {
  id: string;
  title: string;
  titleCn?: string;
  description: string;
  myRole: string;
  demonstrates: string;
  tags: string[];
  liveUrl: string;
  linkLabel: string;
  imageUrl?: string;
  status: ProjectStatus;
}

const selectedProjects: Project[] = [
  {
    id: "kamiwaza-ai",
    title: "Kamiwaza AI",
    description:
      "Enterprise AI infrastructure for deploying, governing, and scaling AI systems where organizational data and workflows actually live.",
    myRole: "Enterprise AI product engineering and agent-ready systems work within publicly shareable boundaries.",
    demonstrates: "Shipping inside real enterprise constraints across infrastructure, governance, data, and product experience.",
    tags: ["Enterprise AI", "Infrastructure", "Agent Systems", "Product Engineering"],
    liveUrl: "https://www.kamiwaza.ai/",
    linkLabel: "Visit Kamiwaza",
    status: "active",
  },
  {
    id: "context-graph",
    title: "Context Graph",
    titleCn: "上下文图谱",
    description:
      "A public technical thesis and reference model for giving AI agents access to decisions, evidence, ownership, relationships, and permissions—not only retrieved documents.",
    myRole: "System thesis, ontology model, reference architecture, and public product direction.",
    demonstrates: "Enterprise knowledge modeling, governance thinking, and agent-ready system design.",
    tags: ["Ontology", "Knowledge Graph", "Enterprise AI", "Agents"],
    liveUrl: "https://contextgraph.tech/",
    linkLabel: "Read the thesis",
    imageUrl: contextGraphPoster,
    status: "active",
  },
  {
    id: "solo-unicorn-toolbox",
    title: "Solo Unicorn Toolbox",
    titleCn: "一人独角兽工具箱",
    description:
      "A bilingual, continuously updated technical radar covering agent systems, skills, context tooling, infrastructure, and AI-native workflows.",
    myRole: "Taxonomy design, enrichment automation, repository analysis, and weekly synchronization workflow.",
    demonstrates: "Knowledge organization, automation, open-source operations, and technical curation at scale.",
    tags: ["Python", "Taxonomy", "GitHub Actions", "Bilingual"],
    liveUrl: "https://github.com/JesseQin123/solo_unicorn_toolbox",
    linkLabel: "Inspect the repository",
    status: "open-source",
  },
  {
    id: "solo-unicorn-club",
    title: "Solo Unicorn Club",
    titleCn: "一人独角兽俱乐部",
    description:
      "A New York community for founders using AI to build one-person companies, reusable workflows, and small high-leverage organizations.",
    myRole: "Founder, community model, events, public identity, learning programs, and project-oriented operations.",
    demonstrates: "Founder leadership, community systems, field research, and AI-native organizational practice.",
    tags: ["Community", "Founder", "AI-native work"],
    liveUrl: "https://www.solounicorn.club/",
    linkLabel: "Visit the club",
    imageUrl: soloUnicornPoster,
    status: "live",
  },
  {
    id: "life-in-agi",
    title: "Life in AGI",
    titleCn: "AGI 时代的生活",
    description:
      "An editorial project exploring how AI changes work, learning, creativity, human agency, and the design of an individual life.",
    myRole: "Research direction, writing, publishing system, and long-form public exploration.",
    demonstrates: "Technical ideas translated into human questions, essays, and a coherent public research practice.",
    tags: ["Writing", "Future of Work", "Human–AI Collaboration"],
    liveUrl: "https://www.lifeinagi.com/",
    linkLabel: "Read the field notes",
    imageUrl: lifeInAgiPoster,
    status: "live",
  },
];

const experiments: Project[] = [
  {
    id: "content-rewriter",
    title: "Content Rewriter",
    titleCn: "内容改写器",
    description: "An experiment in turning one source draft into platform-specific publishing formats with AI-assisted rewriting.",
    myRole: "Product concept and end-to-end implementation.",
    demonstrates: "Fast product prototyping and practical LLM workflow design.",
    tags: ["React", "TypeScript", "LLM"],
    liveUrl: "https://rewriter.jesseqin.me",
    linkLabel: "Visit experiment",
    imageUrl: contentRewriterPoster,
    status: "live",
  },
  {
    id: "eat-well",
    title: "Eat Well",
    titleCn: "吃好饭",
    description: "A recipe-generation experiment that turns available ingredients and preferences into practical cooking plans.",
    myRole: "Product concept and end-to-end implementation.",
    demonstrates: "Consumer AI interaction design and rapid shipping.",
    tags: ["React", "TypeScript", "LLM"],
    liveUrl: "https://eat-well.jesseqin.me",
    linkLabel: "Visit experiment",
    imageUrl: eatWellPoster,
    status: "live",
  },
  {
    id: "workout-timer",
    title: "Workout Timer",
    titleCn: "运动计时器",
    description: "A lightweight habit and workout timer designed around cumulative progress rather than isolated sessions.",
    myRole: "Product concept and implementation.",
    demonstrates: "Focused product design, visualization, and simple behavioral feedback loops.",
    tags: ["React", "TypeScript", "Data Visualization"],
    liveUrl: "https://timer.jesseqin.me",
    linkLabel: "Visit experiment",
    imageUrl: jtimerPoster,
    status: "live",
  },
  {
    id: "church-app",
    title: "Church in Piscataway",
    titleCn: "教会网站",
    description: "A volunteer-built PWA that makes Bible search, audio, and community resources easier to access on mobile.",
    myRole: "Product design, implementation, and deployment.",
    demonstrates: "Community-centered product delivery and accessible mobile workflows.",
    tags: ["React", "PWA", "Community"],
    liveUrl: "https://church.jesseqin.me",
    linkLabel: "Visit project",
    imageUrl: churchAppPoster,
    status: "live",
  },
];

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "border-green-500/20 bg-green-500/10 text-green-700" },
  active: { label: "Active research", className: "border-primary/20 bg-primary/10 text-primary" },
  "open-source": { label: "Open source", className: "border-blue-500/20 bg-blue-500/10 text-blue-700" },
};

const ProjectCard = ({ project, compact = false }: { project: Project; compact?: boolean }) => {
  const status = statusConfig[project.status];

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className={`relative block overflow-hidden ${compact ? "aspect-[16/8]" : "aspect-video"}`}
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} project cover`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid-pattern flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-background/80 shadow-sm">
              <Boxes className="h-10 w-10 text-primary" />
            </div>
          </div>
        )}
      </a>

      <div className={compact ? "p-5" : "p-6 lg:p-8"}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className={`${compact ? "text-xl" : "text-2xl"} font-bold transition-colors group-hover:text-primary`}>
            {project.title}
            {project.titleCn && <span className="ml-2 text-base font-normal text-muted-foreground">{project.titleCn}</span>}
          </h2>
          <Badge variant="outline" className={status.className}>{status.label}</Badge>
        </div>

        <p className="mb-5 leading-relaxed text-muted-foreground">{project.description}</p>

        {!compact && (
          <dl className="mb-6 space-y-4 border-l-2 border-primary/30 pl-4 text-sm">
            <div>
              <dt className="font-semibold text-foreground">My role</dt>
              <dd className="mt-1 text-muted-foreground">{project.myRole}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">What it demonstrates</dt>
              <dd className="mt-1 text-muted-foreground">{project.demonstrates}</dd>
            </div>
          </dl>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          {project.linkLabel} <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
};

const Projects = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />

    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <Button variant="ghost" className="mb-8 -ml-4" asChild>
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        </Button>
        <div className="max-w-4xl">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Public evidence</Badge>
          <h1 className="mb-5 text-4xl font-bold lg:text-6xl">Selected work</h1>
          <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Systems, products, communities, and public research that show how I frame a problem,
            make its hidden structure explicit, and carry an idea through to something usable.
          </p>
        </div>
      </div>
    </section>

    <main className="flex-1 pb-20 lg:pb-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {selectedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>

        <section className="mt-20 border-t border-border pt-14">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">Build archive</p>
            <h2 className="text-3xl font-bold lg:text-4xl">Smaller experiments, shipped in public.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              These projects are intentionally smaller. They show range, speed, and a willingness to test ideas through working software.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {experiments.map((project) => <ProjectCard key={project.id} project={project} compact />)}
          </div>
        </section>

        <div className="mt-16 text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:jesseqin.office@gmail.com">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Projects;
