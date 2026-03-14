import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, Clock, User } from "lucide-react";
import type { CourseData } from "@/data/teaching/fiona-course";
import type { StudentConfig } from "@/data/teaching/students";
import type { ViewType } from "./SessionSidebar";

interface CourseOverviewProps {
  course: CourseData;
  student: StudentConfig;
  onNavigate: (view: ViewType) => void;
}

const CourseOverview = ({ course, student, onNavigate }: CourseOverviewProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {student.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground text-lg">
          {course.titleCn} · {course.descriptionCn}
        </p>
      </div>

      {/* Course stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{course.totalWeeks}</div>
              <div className="text-xs text-muted-foreground">周</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{course.sessions.length}</div>
              <div className="text-xs text-muted-foreground">堂课</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">60</div>
              <div className="text-xs text-muted-foreground">分钟/课</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">1:1</div>
              <div className="text-xs text-muted-foreground">教学</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      {/* Weekly timeline */}
      <h2 className="text-xl font-semibold mb-4">课程时间线</h2>
      <div className="space-y-4 mb-8">
        {course.weeks.map((week) => {
          const weekSessions = course.sessions.filter((s) => s.week === week.weekNumber);
          return (
            <Card key={week.weekNumber}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Badge>第{week.weekNumber}周</Badge>
                  <CardTitle className="text-lg">{week.themeCn}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{week.descriptionCn}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weekSessions.map((session) => (
                    <button
                      key={session.id}
                      className="w-full flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-muted/50 transition-colors"
                      onClick={() => onNavigate(`session-${session.id}`)}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {session.sessionNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{session.titleCn}</div>
                        <div className="text-xs text-muted-foreground truncate">{session.subtitleCn}</div>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {session.duration}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pre-course checklist */}
      <h2 className="text-xl font-semibold mb-4">课前准备</h2>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {[
              { title: "账号注册", desc: "申请 Claude.ai、ChatGPT、Gemini 账号（可用免费版）" },
              { title: "GitHub 账号", desc: "用于后续部署网站（可用现有账号）" },
              { title: "准备素材", desc: "一张专业大头照、简短自我介绍（英文）、过往经历亮点3-5条" },
              { title: "网络环境", desc: "确保网络稳定，下载 Zoom 或 Google Meet（视频通话用）" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                  {i + 1}
                </div>
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseOverview;
