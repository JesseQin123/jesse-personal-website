import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import BookCall from "./pages/BookCall";
import Projects from "./pages/Projects";
import Teaching from "./pages/Teaching";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Tutorials from "./pages/Tutorials";
import TutorialReader from "./pages/TutorialReader";
import CaseStudy from "./pages/CaseStudy";
import JesseAIExperience from "./features/jesse-ai/JesseAIExperience";

const queryClient = new QueryClient();
const AiUsageDashboard = lazy(() => import("./pages/AiUsageDashboard"));

const AiUsageRoute = () => (
  <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">Loading live AI usage…</div>}>
    <AiUsageDashboard />
  </Suspense>
);

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const targetId = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;
    const scroll = () => {
      const target = document.getElementById(targetId);
      if (target) {
        const offset = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
        return;
      }
      attempts += 1;
      if (attempts < 8) frame = window.requestAnimationFrame(scroll);
    };
    frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/teaching/:studentSlug" element={<StudentDashboard />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/:tutorialId" element={<TutorialReader />} />
          <Route path="/ai-usage" element={<AiUsageRoute />} />
          <Route path="/work" element={<Navigate to="/#work" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <JesseAIExperience />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
