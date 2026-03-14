import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  ImageIcon,
  Lightbulb,
  List,
  Target,
} from "lucide-react";
import type {
  SessionContent as SessionContentType,
  ContentBlock,
} from "@/data/teaching/fiona-course";
import { aiTools } from "@/data/teaching/ai-tools";

interface SessionContentProps {
  session: SessionContentType;
}

// ── Copyable Prompt ──
function CopyablePrompt({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1 text-xs"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? "已复制" : "复制"}
        </Button>
      </div>
      <pre className="p-4 text-sm whitespace-pre-wrap font-mono leading-relaxed">
        {text}
      </pre>
    </div>
  );
}

// ── Collapsible Block ──
function CollapsibleBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: "collapsible" }>;
}) {
  const [open, setOpen] = useState(block.defaultOpen ?? false);

  return (
    <div className="my-4 rounded-lg border">
      <button
        className="flex w-full items-center gap-2 p-4 text-left hover:bg-muted/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className="font-medium text-sm">
          {block.titleCn || block.title}
        </span>
      </button>
      {open && (
        <div className="border-t px-5 pb-4 pt-2">
          {block.content.map((b, i) => (
            <ContentBlockRenderer key={i} block={b} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Image with Placeholder Fallback ──
function ImageBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: "image" }>;
}) {
  const [error, setError] = useState(false);

  if (error || !block.src) {
    return (
      <figure className="my-6">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 py-12 px-6">
          <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
          <span className="text-sm text-muted-foreground/60 text-center">
            {block.caption || block.alt}
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-6">
      <img
        src={block.src}
        alt={block.alt}
        className="rounded-lg border"
        onError={() => setError(true)}
      />
      {block.caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Heading with anchor ID ──
function HeadingBlock({
  block,
  index,
}: {
  block: Extract<ContentBlock, { type: "heading" }>;
  index: number;
}) {
  const text = block.textCn || block.text;
  const id = `section-${index}`;
  const isLevel2 = block.level === 2;

  if (isLevel2) {
    return (
      <h2
        id={id}
        className="text-2xl font-bold mt-12 mb-4 pb-2 border-b scroll-mt-20"
      >
        {text}
      </h2>
    );
  }

  return (
    <h3 id={id} className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
      {text}
    </h3>
  );
}

// ── Main Block Renderer ──
function ContentBlockRenderer({
  block,
  index = 0,
}: {
  block: ContentBlock;
  index?: number;
}) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock block={block} index={index} />;
    case "paragraph":
      return (
        <p className="text-muted-foreground leading-relaxed mb-4">
          {block.textCn || block.text}
        </p>
      );
    case "prompt":
      return <CopyablePrompt label={block.label} text={block.text} />;
    case "tip":
      return (
        <div className="my-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {block.textCn || block.text}
          </p>
        </div>
      );
    case "steps":
      return (
        <div className="my-4 space-y-3">
          {block.items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {i + 1}
              </div>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "collapsible":
      return <CollapsibleBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "divider":
      return <Separator className="my-6" />;
    default:
      return null;
  }
}

// ── Table of Contents ──
function TableOfContents({ content }: { content: ContentBlock[] }) {
  const sections = content
    .map((block, index) => ({ block, index }))
    .filter(
      (item) => item.block.type === "heading" && (item.block as Extract<ContentBlock, { type: "heading" }>).level === 2
    )
    .map((item) => {
      const heading = item.block as Extract<ContentBlock, { type: "heading" }>;
      return {
        text: heading.textCn || heading.text,
        id: `section-${item.index}`,
      };
    });

  if (sections.length < 2) return null;

  return (
    <div className="mb-8 rounded-lg border bg-muted/30 p-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
        <List className="h-4 w-4" />
        本课导航
      </h3>
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-primary"
          >
            {section.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

// ── Homework Section ──
function HomeworkSection({
  homework,
}: {
  homework: SessionContentType["homework"];
}) {
  const [expanded, setExpanded] = useState(true);

  if (homework.length === 0) return null;

  const typeLabels = {
    practice: "练习",
    project: "项目",
    reflection: "思考",
  };

  const typeColors = {
    practice:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    project:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    reflection:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  };

  return (
    <div className="mt-8 rounded-lg border">
      <button
        className="flex w-full items-center justify-between p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-semibold">课后作业</h3>
        {expanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {expanded && (
        <div className="border-t px-4 pb-4">
          <div className="space-y-3 pt-3">
            {homework.map((hw) => (
              <div
                key={hw.id}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <div
                  className={`rounded px-2 py-0.5 text-xs font-medium ${typeColors[hw.type]}`}
                >
                  {typeLabels[hw.type]}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{hw.titleCn}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {hw.descriptionCn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ──
const SessionContentView = ({ session }: SessionContentProps) => {
  const sessionTools = aiTools.filter((t) => session.toolIds.includes(t.id));

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">第{session.week}周</Badge>
          <Badge variant="secondary">第{session.sessionNumber}课</Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">{session.titleCn}</h1>
        <p className="text-muted-foreground">{session.subtitleCn}</p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {session.duration}
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {session.objectivesCn.length} 个学习目标
          </div>
        </div>

        {/* Tools used */}
        {sessionTools.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {sessionTools.map((tool) => (
              <Badge key={tool.id} variant="outline" className="text-xs">
                {tool.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Objectives */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Target className="h-4 w-4" />
          本课目标
        </h3>
        <ul className="space-y-2">
          {session.objectivesCn.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-primary font-bold">•</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Table of Contents */}
      <TableOfContents content={session.content} />

      {/* Content blocks */}
      <div>
        {session.content.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} index={i} />
        ))}
      </div>

      {/* Homework */}
      <HomeworkSection homework={session.homework} />
    </div>
  );
};

export default SessionContentView;
