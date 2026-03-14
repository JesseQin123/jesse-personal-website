import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStudentBySlug } from "@/data/teaching/students";
import { fionaCourse } from "@/data/teaching/fiona-course";
import PasswordGate from "@/components/teaching/PasswordGate";
import { DesktopSidebar, MobileSidebar } from "@/components/teaching/SessionSidebar";
import type { ViewType } from "@/components/teaching/SessionSidebar";
import SessionContentView from "@/components/teaching/SessionContent";
import ToolsGrid from "@/components/teaching/ToolsGrid";
import CourseOverview from "@/components/teaching/CourseOverview";

const courseMap: Record<string, typeof fionaCourse> = {
  "ai-bootcamp-fiona": fionaCourse,
};

const StudentDashboard = () => {
  const { studentSlug } = useParams<{ studentSlug: string }>();
  const navigate = useNavigate();
  const student = studentSlug ? getStudentBySlug(studentSlug) : undefined;

  const storageKey = `teaching-auth-${studentSlug}`;
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(storageKey) === "authenticated"
  );
  const [activeView, setActiveView] = useState<ViewType>("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  if (!student) {
    navigate("/teaching");
    return null;
  }

  const course = courseMap[student.courseId];
  if (!course) {
    navigate("/teaching");
    return null;
  }

  if (!authenticated) {
    return (
      <PasswordGate
        studentName={student.name.split(" ")[0]}
        passwordHash={student.passwordHash}
        storageKey={storageKey}
        onAuthenticated={() => setAuthenticated(true)}
      />
    );
  }

  // Determine what to render in main content
  let mainContent: React.ReactNode;
  if (activeView === "overview") {
    mainContent = (
      <CourseOverview course={course} student={student} onNavigate={setActiveView} />
    );
  } else if (activeView === "tools") {
    mainContent = <ToolsGrid />;
  } else if (activeView.startsWith("session-")) {
    const sessionId = activeView.replace("session-", "");
    const session = course.sessions.find((s) => s.id === sessionId);
    if (session) {
      mainContent = <SessionContentView session={session} />;
    } else {
      mainContent = (
        <CourseOverview course={course} student={student} onNavigate={setActiveView} />
      );
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <DesktopSidebar
        course={course}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-2 border-b px-4 py-3">
          <MobileSidebar
            course={course}
            activeView={activeView}
            onViewChange={setActiveView}
          />
          <span className="font-semibold text-sm truncate">{course.titleCn}</span>
        </div>

        {/* Content area */}
        <ScrollArea className="flex-1">
          <div className="p-6 lg:p-8">{mainContent}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default StudentDashboard;
