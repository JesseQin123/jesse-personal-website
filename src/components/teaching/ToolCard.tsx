import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import type { AITool } from "@/data/teaching/ai-tools";

const categoryLabels: Record<AITool["category"], string> = {
  chat: "AI对话",
  code: "编程",
  design: "设计",
  automation: "自动化",
  research: "研究",
  deployment: "部署",
};

const categoryColors: Record<AITool["category"], string> = {
  chat: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  code: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  design: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  automation: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  research: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  deployment: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
};

interface ToolCardProps {
  tool: AITool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg">{tool.name}</CardTitle>
          <Badge className={`text-xs shrink-0 ${categoryColors[tool.category]}`} variant="outline">
            {categoryLabels[tool.category]}
          </Badge>
        </div>
        <CardDescription>{tool.descriptionCn}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground">{tool.useCaseCn}</p>
        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
          <a href={tool.signUpUrl} target="_blank" rel="noopener noreferrer">
            注册使用 <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
