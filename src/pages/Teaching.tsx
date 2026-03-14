import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  LogIn,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const Teaching = () => {
  const outcomes = [
    {
      icon: Brain,
      title: "Prompt Engineering",
      description:
        "Master the art of communicating with AI. Write prompts that produce 10x better outputs — for writing, analysis, coding, and decision-making.",
    },
    {
      icon: Rocket,
      title: "Vibe Coding",
      description:
        "Build and ship real products with AI-assisted coding. No prior programming experience needed — deploy a live website in your first session.",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description:
        "Eliminate hours of repetitive work. Design no-code automation pipelines that run 24/7 using tools like Zapier and n8n.",
    },
    {
      icon: Cpu,
      title: "AI Product Design",
      description:
        "Go from idea to high-fidelity prototype in minutes. Write PRDs, run competitive analysis, and generate UI designs — all with AI.",
    },
    {
      icon: Bot,
      title: "AI Agents",
      description:
        "Build autonomous AI workflows that plan, reason, and execute multi-step tasks. The frontier of what's possible with AI today.",
    },
    {
      icon: Sparkles,
      title: "Your Personal AI Playbook",
      description:
        "Walk away with a complete toolkit: curated prompts, deployed automations, a portfolio website, and a roadmap for continuous growth.",
    },
  ];

  const differentiators = [
    "Curriculum tailored to your role, industry, and goals",
    "Every session produces something you can deploy and use immediately",
    "Taught by a practitioner who builds AI products daily, not a theorist",
    "Hands-on the entire time — no slides, no lectures, just building",
    "Covers 12+ AI tools across writing, coding, design, and automation",
    "You leave with a live portfolio showcasing everything you built",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Badge className="mb-4" variant="secondary">
            Private 1-on-1 AI Coaching
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Become Dangerous with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A private, hands-on coaching program that turns ambitious professionals
            into AI-powered operators. No fluff. You build real things from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/book-call">
                Book a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* What you'll gain */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Be Able to Do</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              By the end of the program, AI won't be something you read about — it'll be
              something you use to ship faster, think sharper, and automate the boring stuff.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {outcomes.map((item) => (
              <Card key={item.title} className="text-left">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Why this is different */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Not Another AI Course</h2>
              <p className="text-muted-foreground">
                This isn't a pre-recorded course or a generic workshop.
                It's a private coaching engagement designed around you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Who is this for */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Who Is This For?</h2>
            <div className="text-left space-y-3 text-muted-foreground">
              <p>
                <strong>Product managers and project managers</strong> who want AI to
                accelerate how they write specs, manage projects, and ship features.
              </p>
              <p>
                <strong>Professionals in transition</strong> who want to build a personal
                brand, a portfolio, and real AI skills that set them apart.
              </p>
              <p>
                <strong>Team leads and executives</strong> who need to understand AI
                deeply enough to drive adoption across their organization.
              </p>
              <p>
                <strong>Anyone ambitious and curious</strong> who knows AI matters but
                hasn't found the right way in yet.
              </p>
            </div>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link to="/book-call">
                  Book a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Student Login */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Current Students</h2>
            <p className="text-muted-foreground mb-6">
              Already enrolled? Access your course materials and assignments here.
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link to="/teaching/fiona">
                Enter Course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Teaching;
