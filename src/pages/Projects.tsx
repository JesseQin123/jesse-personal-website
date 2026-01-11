import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
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

interface Project {
  id: string;
  title: string;
  titleCn?: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  imageUrl?: string;
  status: "live" | "beta" | "coming-soon";
}

const projects: Project[] = [
  {
    id: "eat-well",
    title: "Eat Well",
    titleCn: "吃好饭",
    description:
      "An AI-powered recipe generation app that helps you cook delicious meals based on what's in your fridge. Simply tell it what ingredients you have and what cuisine you're craving, and it will generate personalized recipes for you.",
    features: [
      "Smart ingredient recognition",
      "Personalized recipe generation",
      "Cuisine preference matching",
      "Step-by-step cooking instructions",
    ],
    techStack: ["React", "TypeScript", "AI/LLM", "Tailwind CSS"],
    liveUrl: "https://eat-well.jesseqin.me",
    imageUrl: eatWellPoster,
    status: "live",
  },
  {
    id: "workout-timer",
    title: "Workout Timer",
    titleCn: "运动计时器",
    description:
      "A motivational workout timer designed to help you build consistent exercise habits. Track your planks, HIIT sessions, and more while watching your progress grow over weeks and months. Visualize your cumulative workout minutes with growth charts and stay motivated as you see your dedication add up.",
    features: [
      "Plank & HIIT timer modes",
      "Weekly and monthly progress tracking",
      "Growth visualization charts",
      "Personal motivation insights",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://timer.jesseqin.me",
    imageUrl: jtimerPoster,
    status: "live",
  },
  {
    id: "content-rewriter",
    title: "Content Rewriter",
    titleCn: "内容改写器",
    description:
      "A powerful AI tool that transforms your content into platform-optimized posts ready to go viral. Input any text and instantly generate engaging versions tailored for different social media platforms — the ultimate productivity tool for content creators and social media managers.",
    features: [
      "One-click content transformation",
      "Multi-platform optimization",
      "AI-powered viral copywriting",
      "Boost content creator efficiency",
    ],
    techStack: ["React", "TypeScript", "AI/LLM", "Tailwind CSS"],
    liveUrl: "https://rewriter.jesseqin.me",
    imageUrl: contentRewriterPoster,
    status: "live",
  },
  {
    id: "context-graph",
    title: "Context Graph",
    titleCn: "上下文图谱",
    description:
      "The marketplace for enterprise-grade context graphs. Turn tribal knowledge into searchable precedent. Download industry-specific context graphs or contribute your own to help enterprises improve LLM implementation accuracy and production efficiency.",
    features: [
      "Enterprise context graph marketplace",
      "Industry-specific knowledge sharing",
      "Improve LLM implementation accuracy",
      "Community-driven contributions",
    ],
    techStack: ["React", "TypeScript", "AI/LLM", "Knowledge Graph"],
    liveUrl: "https://contextgraph.tech",
    imageUrl: contextGraphPoster,
    status: "coming-soon",
  },
  {
    id: "church-app",
    title: "Church in Piscataway",
    titleCn: "教会网站",
    description:
      "A modern church website built as a PWA for app-like mobile experience. Features convenient Bible search, audio playback, and organized resources for the congregation. A volunteer project to help the local church community stay connected with spiritual content anytime, anywhere.",
    features: [
      "Easy Bible lookup & search",
      "Audio sermon playback",
      "Organized church resources",
      "PWA for mobile app experience",
    ],
    techStack: ["React", "TypeScript", "PWA", "Tailwind CSS"],
    liveUrl: "https://church.jesseqin.me",
    imageUrl: churchAppPoster,
    status: "live",
  },
  {
    id: "life-in-agi",
    title: "Life in AGI",
    titleCn: "AGI时代的生活",
    description:
      "An optimistic exploration of life in the AGI era. Jesse shares his vision and thoughts on how AGI will transform society, personal life, career development, and human collaboration. A forward-looking perspective on embracing the future with hope and purpose.",
    features: [
      "Vision for AGI-era society",
      "Personal life transformation insights",
      "Career development in the AI age",
      "Human collaboration perspectives",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://lifeinagi.com",
    imageUrl: lifeInAgiPoster,
    status: "live",
  },
  {
    id: "solo-unicorn-club",
    title: "Solo Unicorn Club",
    titleCn: "「一人独角兽」俱乐部",
    description:
      "NYC's premier community for ambitious individuals leveraging AI to become one-person companies. Founded by Jesse to bring together like-minded people in New York who are passionate about using AI to unlock unlimited potential. Features regular offline mixups and an online community for collaboration, knowledge sharing, and mutual support.",
    features: [
      "NYC offline mixup events",
      "Online community & knowledge sharing",
      "AI-powered solopreneur support",
      "Dream chasing & wellness focus",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://solounicorn.club",
    imageUrl: soloUnicornPoster,
    status: "live",
  },
];

const statusConfig = {
  live: { label: "Live", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  beta: { label: "Beta", className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  "coming-soon": { label: "Coming Soon", className: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const status = statusConfig[project.status];

  return (
    <article className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Project Image */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video relative overflow-hidden cursor-pointer"
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="relative z-10 text-center">
              <span className="text-5xl font-bold text-primary/20">{project.title.charAt(0)}</span>
              {project.titleCn && (
                <p className="text-2xl font-medium text-primary/40 mt-2">{project.titleCn}</p>
              )}
            </div>
          </div>
        )}
      </a>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
              {project.titleCn && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  ({project.titleCn})
                </span>
              )}
            </h2>
          </div>
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Key Features
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button variant="hero" size="default" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit Project <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Vibe Coding
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Projects
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              A collection of projects built through Vibe Coding — where AI meets creativity.
              Each project is crafted with curiosity, powered by modern AI tools, and designed
              to solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="flex-1 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* More Coming Soon */}
          {projects.length < 4 && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                More projects coming soon...
              </p>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
