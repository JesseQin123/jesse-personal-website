import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tutorials, type TutorialChapter } from "@/data/tutorials";

const TutorialReader = () => {
  const { tutorialId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tutorial = tutorials.find((t) => t.id === tutorialId);
  const chapterId = searchParams.get("chapter");

  // Flatten all chapters for prev/next navigation
  const allChapters = useMemo(() => {
    if (!tutorial) return [];
    return tutorial.sections.flatMap((s) => s.chapters);
  }, [tutorial]);

  const currentChapter = allChapters.find((c) => c.id === chapterId);
  const currentIndex = allChapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < allChapters.length - 1
      ? allChapters[currentIndex + 1]
      : null;

  // Load markdown content
  useEffect(() => {
    if (!tutorial || !currentChapter) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/tutorials/${tutorial.id}/${currentChapter.path}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setMarkdown("# Content not found\n\nThis chapter is not available yet.");
        setLoading(false);
      });
  }, [tutorial, currentChapter]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [chapterId]);

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Tutorial not found</h1>
          <Button asChild>
            <Link to="/tutorials">Back to Tutorials</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Landing page when no chapter is selected
  if (!chapterId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tutorials">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Tutorials
              </Link>
            </Button>
          </div>

          {/* Tutorial Header */}
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{tutorial.icon}</span>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                  {tutorial.titleCn}
                </h1>
                <p className="text-muted-foreground">{tutorial.title}</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mt-4">
              {tutorial.descriptionCn}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {tutorial.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <a
                href={tutorial.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Source <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="grid gap-8">
            {tutorial.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {section.titleCn}
                  <span className="text-sm font-normal text-muted-foreground">
                    {section.title}
                  </span>
                </h2>
                <div className="grid gap-2">
                  {section.chapters.map((chapter, idx) => (
                    <button
                      key={chapter.id}
                      onClick={() =>
                        setSearchParams({ chapter: chapter.id })
                      }
                      className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-sm"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {chapter.titleCn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {chapter.title}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Chapter reader view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-50 lg:z-0 h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-border bg-background transition-transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <Link
              to={`/tutorials/${tutorial.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {tutorial.titleCn}
            </Link>

            <nav className="space-y-6">
              {tutorial.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {section.titleCn}
                  </h3>
                  <ul className="space-y-1">
                    {section.chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <button
                          onClick={() => {
                            setSearchParams({ chapter: chapter.id });
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            chapter.id === chapterId
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {chapter.titleCn}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile sidebar toggle */}
          <div className="sticky top-16 z-30 lg:hidden border-b border-border bg-background/95 backdrop-blur-sm px-4 py-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {sidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              {currentChapter?.titleCn || "Menu"}
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            ) : (
              <article className="tutorial-content prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ href, children, ...props }) => {
                      if (href?.startsWith("http")) {
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      }
                      return (
                        <a href={href} {...props}>
                          {children}
                        </a>
                      );
                    },
                    table: ({ children, ...props }) => (
                      <div className="overflow-x-auto my-4">
                        <table {...props}>{children}</table>
                      </div>
                    ),
                    img: ({ src, alt, ...props }) => (
                      <img
                        src={src}
                        alt={alt || ""}
                        loading="lazy"
                        className="rounded-lg"
                        {...props}
                      />
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </article>
            )}

            {/* Prev / Next Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              {prevChapter ? (
                <button
                  onClick={() =>
                    setSearchParams({ chapter: prevChapter.id })
                  }
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="font-medium">{prevChapter.titleCn}</div>
                  </div>
                </button>
              ) : (
                <div />
              )}
              {nextChapter ? (
                <button
                  onClick={() =>
                    setSearchParams({ chapter: nextChapter.id })
                  }
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="font-medium">{nextChapter.titleCn}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TutorialReader;
