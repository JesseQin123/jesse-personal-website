export type JesseAnswer = {
  answer: string;
  kind: "grounded" | "fallback" | "boundary";
  followUps: string[];
  topic?: string;
};

type KnowledgeEntry = {
  id: string;
  keywords: string[];
  topic: { en: string; zh: string };
  answer: { en: string; zh: string };
  followUps: { en: string[]; zh: string[] };
};

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "background",
    keywords: [
      "background",
      "education",
      "phd",
      "rutgers",
      "degree",
      "背景",
      "教育",
      "学历",
      "博士",
      "罗格斯",
    ],
    topic: { en: "Background", zh: "个人背景" },
    answer: {
      en: "Jesse Qin works at the intersection of enterprise AI, product building, and founder practice. He holds a PhD in Computer Engineering from Rutgers University and focuses on knowledge graphs, context systems, RAG, and AI-agent workflows.",
      zh: "Jesse Qin 长期工作在企业人工智能、产品构建与创业实践的交汇处。他拥有罗格斯大学计算机工程博士学位，重点关注知识图谱、上下文系统、RAG 和 AI Agent 工作流。",
    },
    followUps: {
      en: ["What is Jesse building?", "How can Jesse help an AI team?"],
      zh: ["Jesse 正在做什么？", "Jesse 可以怎样帮助 AI 团队？"],
    },
  },
  {
    id: "current-work",
    keywords: [
      "current work",
      "working on",
      "kamiwaza",
      "enterprise ai",
      "what does jesse do",
      "现在做什么",
      "目前工作",
      "企业 ai",
      "企业人工智能",
    ],
    topic: { en: "Current work", zh: "当前工作" },
    answer: {
      en: "Jesse's current work centers on enterprise AI infrastructure and products at Kamiwaza, with a technical focus on ontology, context graphs, and agent workflows. The recurring question behind the work is how organizations change when people and AI agents share context, make decisions, and act together.",
      zh: "Jesse 目前的工作集中在 Kamiwaza 的企业 AI 基础设施与产品，技术重点包括本体、上下文图谱和 Agent 工作流。他持续探索的问题是：当人和 AI Agent 共享上下文、共同决策并采取行动时，组织会变成什么样。",
    },
    followUps: {
      en: ["Why do context graphs matter?", "Tell me about Jesse's founder practice"],
      zh: ["为什么上下文图谱重要？", "介绍一下 Jesse 的创业实践"],
    },
  },
  {
    id: "services",
    keywords: [
      "service",
      "help",
      "consulting",
      "fractional cto",
      "rag system",
      "mvp",
      "合作",
      "服务",
      "咨询",
      "怎么帮助",
      "能帮什么",
    ],
    topic: { en: "Ways to work together", zh: "合作方式" },
    answer: {
      en: "Jesse works with teams through AI strategy consulting, knowledge-graph and RAG system design, AI MVP development, and fractional CTO support. The emphasis is on measurable business value: choosing the right opportunities, shipping working systems, and building evaluation and guardrails around them.",
      zh: "Jesse 主要通过 AI 战略咨询、知识图谱与 RAG 系统设计、AI MVP 开发，以及 Fractional CTO 的方式与团队合作。重点不是追逐热点，而是选择高价值机会、交付可运行的系统，并建立评测与安全护栏。",
    },
    followUps: {
      en: ["What does an AI roadmap session include?", "How do I book a call?"],
      zh: ["AI Roadmap Session 包括什么？", "怎样预约沟通？"],
    },
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "rate", "多少钱", "价格", "收费", "费用"],
    topic: { en: "Engagement options", zh: "合作价格" },
    answer: {
      en: "The website currently lists an AI Roadmap Session at $500 per hour and a 10-hour retainer at $4,500. Longer-term advisory or fractional-CTO partnerships are scoped individually. Please use the booking page to confirm current availability and fit.",
      zh: "网站目前列出的 AI Roadmap Session 是每小时 500 美元，10 小时顾问套餐是 4,500 美元。长期顾问或 Fractional CTO 合作会根据具体情况确定范围；实际可用时间和合作匹配度请通过预约页面确认。",
    },
    followUps: {
      en: ["What services does Jesse offer?", "How do I book a call?"],
      zh: ["Jesse 提供哪些服务？", "怎样预约沟通？"],
    },
  },
  {
    id: "projects",
    keywords: [
      "project",
      "built",
      "portfolio",
      "context graph",
      "solo unicorn",
      "eat well",
      "life in agi",
      "项目",
      "作品",
      "做过什么",
      "上下文图谱",
      "一人独角兽",
    ],
    topic: { en: "Projects", zh: "项目" },
    answer: {
      en: "Jesse's selected work includes enterprise AI product engineering at Kamiwaza; Context Graph, a public technical thesis and reference model for agent-ready organizational context; Solo Unicorn Toolbox, a bilingual open-source technical radar; Solo Unicorn Club, a New York founder community; and Life in AGI, an editorial research project about work, learning, creativity, and human agency.",
      zh: "Jesse 的代表性工作包括 Kamiwaza 的企业 AI 产品工程；面向 Agent 组织上下文的公开技术论述与参考模型 Context Graph；双语开源技术雷达「一人独角兽工具箱」；纽约创业者社区「一人独角兽俱乐部」；以及研究工作、学习、创造力与人类自主性的 Life in AGI。",
    },
    followUps: {
      en: ["What is Context Graph?", "What is Solo Unicorn Club?"],
      zh: ["Context Graph 是什么？", "「一人独角兽」是什么？"],
    },
  },
  {
    id: "ideas",
    keywords: [
      "belief",
      "philosophy",
      "agi",
      "future of ai",
      "human ai",
      "观点",
      "想法",
      "理念",
      "未来",
      "人和 ai",
    ],
    topic: { en: "Ideas", zh: "观点" },
    answer: {
      en: "A through-line in Jesse's work is that AI becomes useful when it can act with the right organizational context, not merely generate fluent text. He is especially interested in context graphs, human-agent collaboration, AI-native organizations, and an optimistic but practical view of life in the AGI era.",
      zh: "Jesse 的核心判断之一是：AI 真正产生价值，不只是因为它能生成流畅文字，而是因为它能获得正确的组织上下文并据此行动。他尤其关注上下文图谱、人机协作、AI-native 组织，以及对 AGI 时代既乐观又务实的理解。",
    },
    followUps: {
      en: ["Why do context graphs matter?", "What is Life in AGI?"],
      zh: ["为什么上下文图谱重要？", "Life in AGI 是什么？"],
    },
  },
  {
    id: "location-contact",
    keywords: [
      "location",
      "based",
      "new york",
      "contact",
      "book",
      "meet",
      "where",
      "纽约",
      "哪里",
      "联系",
      "预约",
      "见面",
    ],
    topic: { en: "Contact", zh: "联系" },
    answer: {
      en: "Jesse is based in New York City. The best next step is to book a call through the website; you can also connect with him on LinkedIn. This AI guide cannot make commitments or confirm calendar availability on Jesse's behalf.",
      zh: "Jesse 常驻纽约市。最直接的下一步是在网站上预约沟通，也可以通过 LinkedIn 联系他。这个 AI 向导不能代表 Jesse 作出承诺，也不能确认他的日程。",
    },
    followUps: {
      en: ["What services does Jesse offer?", "What is Jesse working on?"],
      zh: ["Jesse 提供哪些服务？", "Jesse 目前在做什么？"],
    },
  },
];

const PRIVATE_TERMS = [
  "private",
  "phone number",
  "home address",
  "personal email",
  "私人",
  "电话号码",
  "家庭住址",
  "私人邮箱",
];

const isChineseText = (text: string) => /[\u3400-\u9fff]/.test(text);

function scoreEntry(question: string, entry: KnowledgeEntry) {
  return entry.keywords.reduce((score, keyword) => {
    if (!question.includes(keyword)) return score;
    return score + Math.max(1, keyword.split(/\s+/).length);
  }, 0);
}

export function answerJesseQuestion(question: string): JesseAnswer {
  const normalized = question.trim().toLowerCase();
  const language = isChineseText(question) ? "zh" : "en";

  if (PRIVATE_TERMS.some((term) => normalized.includes(term))) {
    return {
      kind: "boundary",
      topic: language === "zh" ? "隐私" : "Privacy",
      answer:
        language === "zh"
          ? "我不能分享 Jesse 的私人联系方式。请通过这个网站预约沟通，或者在 LinkedIn 上联系他。"
          : "I can't share Jesse's private contact details. The best way to reach him is to book a call through this website or connect on LinkedIn.",
      followUps:
        language === "zh"
          ? ["Jesse 提供哪些服务？", "怎样预约沟通？"]
          : ["How can I work with Jesse?", "What services does Jesse offer?"],
    };
  }

  const match = KNOWLEDGE.map((entry) => ({ entry, score: scoreEntry(normalized, entry) })).sort(
    (a, b) => b.score - a.score,
  )[0];

  if (match && match.score > 0) {
    return {
      kind: "grounded",
      topic: match.entry.topic[language],
      answer: match.entry.answer[language],
      followUps: match.entry.followUps[language],
    };
  }

  return {
    kind: "fallback",
    answer:
      language === "zh"
        ? "这个问题还没有经过 Jesse 审核的公开答案，所以我不想猜。你可以问他的背景、项目、AI 观点、服务或怎样联系他。"
        : "I don't have a Jesse-reviewed public answer for that yet, so I won't guess. You can ask about his background, projects, AI ideas, services, or how to get in touch.",
    followUps:
      language === "zh"
        ? ["介绍一下 Jesse 的背景", "Jesse 做过哪些项目？"]
        : ["Tell me about Jesse's background", "What has Jesse built?"],
  };
}

export const STARTER_QUESTIONS = [
  "What is Jesse working on?",
  "What has Jesse built?",
  "How can Jesse help my team?",
  "What does Jesse believe about AI?",
];
