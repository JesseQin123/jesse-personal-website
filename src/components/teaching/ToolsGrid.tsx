import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aiTools, toolCategories } from "@/data/teaching/ai-tools";
import ToolCard from "./ToolCard";

const ToolsGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTools =
    activeCategory === "all"
      ? aiTools
      : aiTools.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">AI 工具箱</h1>
        <p className="text-muted-foreground">
          课程中使用的{aiTools.length}个AI工具，点击注册开始使用。
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 flex-wrap h-auto gap-1 w-full justify-start">
          {toolCategories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
