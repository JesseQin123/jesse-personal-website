import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Menu,
  BookOpen,
  Wrench,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseData } from "@/data/teaching/fiona-course";

type ViewType = "overview" | "tools" | `session-${string}`;

interface SessionSidebarProps {
  course: CourseData;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

// ── Week group with collapsible sessions ──
function WeekGroup({
  week,
  sessions,
  activeView,
  onViewChange,
  collapsed,
}: {
  week: CourseData["weeks"][number];
  sessions: CourseData["sessions"];
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  collapsed?: boolean;
}) {
  const hasActive = sessions.some((s) => activeView === `session-${s.id}`);
  const [open, setOpen] = useState(hasActive || week.weekNumber === 1);

  return (
    <div className="mb-1">
      <button
        className="flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 transition-transform duration-200",
            !open && "-rotate-90"
          )}
        />
        {collapsed ? (
          <span>W{week.weekNumber}</span>
        ) : (
          <span className="truncate">
            第{week.weekNumber}周 · {week.themeCn}
          </span>
        )}
      </button>

      {open && (
        <div className="ml-1 space-y-0.5 pb-1">
          {sessions.map((session) => (
            <Button
              key={session.id}
              variant={activeView === `session-${session.id}` ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 text-left h-auto py-2 px-3 min-h-0",
                activeView === `session-${session.id}` && "bg-secondary font-medium"
              )}
              onClick={() => onViewChange(`session-${session.id}`)}
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              {collapsed ? (
                <span className="text-xs">{session.sessionNumber}</span>
              ) : (
                <span className="text-[13px] leading-relaxed break-words whitespace-normal text-left">
                  第{session.sessionNumber}课 · {session.titleCn}
                </span>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Full sidebar content ──
function SidebarContent({
  course,
  activeView,
  onViewChange,
  collapsed = false,
}: SessionSidebarProps & { collapsed?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      {!collapsed && (
        <div className="p-4 pb-2">
          <h2 className="font-semibold text-base leading-snug">{course.titleCn}</h2>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {course.descriptionCn}
          </p>
        </div>
      )}
      {collapsed && <div className="h-3" />}

      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {/* Overview */}
          <Button
            variant={activeView === "overview" ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 mb-0.5",
              collapsed && "justify-center px-0"
            )}
            onClick={() => onViewChange("overview")}
            title="课程总览"
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-[13px]">课程总览</span>}
          </Button>

          {/* AI Tools */}
          <Button
            variant={activeView === "tools" ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 mb-0.5",
              collapsed && "justify-center px-0"
            )}
            onClick={() => onViewChange("tools")}
            title="AI 工具箱"
          >
            <Wrench className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-[13px]">AI 工具箱</span>}
          </Button>

          <Separator className="my-2" />

          {/* Sessions grouped by week */}
          {course.weeks.map((week) => {
            const weekSessions = course.sessions.filter(
              (s) => s.week === week.weekNumber
            );
            return (
              <WeekGroup
                key={week.weekNumber}
                week={week}
                sessions={weekSessions}
                activeView={activeView}
                onViewChange={onViewChange}
                collapsed={collapsed}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ── Desktop: collapsible sidebar ──
export function DesktopSidebar(props: SessionSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col shrink-0 border-r border-border bg-muted/30 relative transition-all duration-300",
        collapsed ? "w-16" : "w-80"
      )}
    >
      <SidebarContent {...props} collapsed={collapsed} />

      {/* Collapse toggle */}
      <button
        className="absolute -right-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted transition-colors"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "展开侧栏" : "收起侧栏"}
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}

// ── Mobile: sheet drawer ──
export function MobileSidebar(props: SessionSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleViewChange = (view: ViewType) => {
    props.onViewChange(view);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-80 p-0">
        <SheetTitle className="sr-only">{props.course.titleCn}</SheetTitle>
        <SidebarContent {...props} onViewChange={handleViewChange} />
      </SheetContent>
    </Sheet>
  );
}

export type { ViewType };
