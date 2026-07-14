import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookCall from "./pages/BookCall";
import Projects from "./pages/Projects";
import Teaching from "./pages/Teaching";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Tutorials from "./pages/Tutorials";
import TutorialReader from "./pages/TutorialReader";
import JesseAIExperience from "./features/jesse-ai/JesseAIExperience";

const AiUsageDashboard = lazy(() => import("./pages/AiUsageDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/teaching/:studentSlug" element={<StudentDashboard />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/tutorials/:tutorialId" element={<TutorialReader />} />
          <Route
            path="/ai-usage"
            element={
              <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">Loading AI activity…</div>}>
                <AiUsageDashboard />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <JesseAIExperience />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
