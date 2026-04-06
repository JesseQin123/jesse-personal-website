export type ContentBlock =
  | { type: "heading"; text: string; textCn?: string; level?: 2 | 3 }
  | { type: "paragraph"; text: string; textCn?: string }
  | { type: "prompt"; label: string; text: string }
  | { type: "tip"; text: string; textCn?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "steps"; items: { title: string; description: string }[] }
  | { type: "collapsible"; title: string; titleCn?: string; defaultOpen?: boolean; content: ContentBlock[] }
  | { type: "divider" };

export interface SessionHomework {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  type: "practice" | "project" | "reflection";
}

export interface SessionContent {
  id: string;
  sessionNumber: number;
  week: number;
  title: string;
  titleCn: string;
  subtitle: string;
  subtitleCn: string;
  objectives: string[];
  objectivesCn: string[];
  toolIds: string[];
  content: ContentBlock[];
  homework: SessionHomework[];
  duration: string;
}

export interface WeekOverview {
  weekNumber: number;
  theme: string;
  themeCn: string;
  description: string;
  descriptionCn: string;
}

export interface CourseData {
  id: string;
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  totalWeeks: number;
  sessionsPerWeek: number;
  sessions: SessionContent[];
  weeks: WeekOverview[];
}

export const fionaCourse: CourseData = {
  id: "ai-bootcamp-fiona",
  title: "AI Practical Training Camp",
  titleCn: "AI 实战训练营",
  description: "A personalized 4-week AI mastery program",
  descriptionCn: "第一期 · 个性化1对1 AI 赋能课程",
  totalWeeks: 4,
  sessionsPerWeek: 2,
  weeks: [
    {
      weekNumber: 1,
      theme: "AI Discovery + Personal Brand",
      themeCn: "AI探索 + 个人品牌",
      description: "Discover AI tools and build your personal website",
      descriptionCn: "发现AI工具的无限可能，构建个人品牌网站",
    },
    {
      weekNumber: 2,
      theme: "PM Toolchain + Automation",
      themeCn: "PM工具链 + 自动化",
      description: "Master prompt engineering and build automation workflows",
      descriptionCn: "深入Prompt工程，掌握PM工具链与自动化",
    },
    {
      weekNumber: 3,
      theme: "AI Product Design",
      themeCn: "AI产品设计",
      description: "Design product prototypes and write PRDs with AI",
      descriptionCn: "用AI设计产品原型、撰写PRD、进行竞品分析",
    },
    {
      weekNumber: 4,
      theme: "AI Agent + Data Insights",
      themeCn: "AI Agent + 数据洞察",
      description: "Build AI agents and master AI-powered data analysis",
      descriptionCn: "构建AI Agent工作流，掌握AI驱动的数据分析与汇报",
    },
  ],
  sessions: [
    // ─── Session 1 ───
    {
      id: "s1",
      sessionNumber: 1,
      week: 1,
      title: "The Infinite Possibilities of AI",
      titleCn: "AI的无限可能",
      subtitle: "Live demos across creativity, knowledge, and website building",
      subtitleCn: "AI创意 · AI知识 · AI建站 — 三大主题现场演示",
      duration: "60分钟",
      objectives: [
        "Experience AI capabilities across creative, analytical, and building domains",
        "Understand the Google AI ecosystem (Gemini, NotebookLM, Labs)",
        "See a personal website generated and deployed live",
        "Walk away knowing: AI can do anything you can describe",
      ],
      objectivesCn: [
        "体验AI在创意、分析、建站三大领域的能力",
        "了解Google AI生态系统（Gemini、NotebookLM、Labs）",
        "亲眼见证个人网站从一段话到上线的全过程",
        "建立核心认知：你能描述的，AI就能做到",
      ],
      toolIds: ["gemini", "suno", "notebooklm", "claude", "v0", "vercel"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening", textCn: "开场 · 破冰", level: 2 },
        {
          type: "paragraph",
          textCn: "自我介绍，了解 Fiona 的背景和期望。快速摸底她目前使用了哪些AI工具。",
        },
        {
          type: "collapsible",
          title: "Ice Breaker Questions",
          titleCn: "破冰问题清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "日常工具", description: "你平时工作中用哪些工具？（Jira? Notion? Excel?）" },
                { title: "AI经验", description: "你用过ChatGPT/Claude/Gemini吗？用来做什么？" },
                { title: "最大痛点", description: "工作中最耗时、最重复的任务是什么？" },
                { title: "课程期望", description: "学完这个课程，你最希望获得什么能力？" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "这5分钟的摸底决定了后续7节课的定制方向。认真记录 Fiona 的回答。",
        },
        {
          type: "paragraph",
          textCn: "今天的课程分三个主题板块：For Fun（AI创意）→ For Work（AI知识）→ For Brand（AI建站）。每个板块都会现场演示，最后我们一起把你的个人网站部署上线。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: For Fun
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: AI Creative Studio — For Fun", textCn: "Part 1: AI 创意工坊 — For Fun", level: 2 },
        {
          type: "paragraph",
          textCn: "先从好玩的开始！展示AI在创意领域的能力：生成图片、创作音乐、探索Google Labs实验工具。目标是让 Fiona 感受到AI的「魔法感」。",
        },

        // ── Demo 1: Gemini ──
        { type: "heading", text: "Demo 1: Gemini — Google's Multimodal AI", textCn: "Demo 1: Gemini — Google 多模态 AI" },
        {
          type: "paragraph",
          textCn: "Gemini 是 Google 的旗舰AI，能理解文字、图片，还能生成图片。我们用三个小演示展示它的能力。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 Gemini", description: "浏览器访问 gemini.google.com，用 Google 账号登录" },
                { title: "展示1: 对话能力", description: "随便问一个问题，展示 Gemini 的对话能力" },
                { title: "展示2: 图片生成", description: "输入下方 prompt，让 Gemini 生成一张图片" },
                { title: "展示3: 图片分析", description: "上传一张照片（比如一张工作场景照），让 Gemini 描述和分析" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "Gemini 图片生成 Prompt",
          text: "Generate a modern, clean illustration: a young professional woman working at a sleek desk with multiple holographic screens floating around her, showing data dashboards and AI interfaces. Style: flat design, warm color palette with coral and navy blue accents. 16:9 ratio.",
        },
        {
          type: "image",
          src: "/screenshots/s1-gemini-image.png",
          alt: "Gemini 图片生成结果",
          caption: "截图：Gemini 生成的AI插画（课前截图替换）",
        },
        {
          type: "tip",
          textCn: "让 Fiona 也输入一个自己的描述试试。关键是让她感受到「我说什么，AI就画什么」。",
        },

        // ── Demo 2: Suno ──
        { type: "heading", text: "Demo 2: Suno — AI Music Creation", textCn: "Demo 2: Suno — AI 音乐创作" },
        {
          type: "paragraph",
          textCn: "Suno 可以从一段文字描述生成完整的原创歌曲，包含人声、乐器编排。这是最容易产生「WOW」效果的演示。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 Suno", description: "浏览器访问 suno.com，登录账号" },
                { title: "点击 Create", description: "点击首页的 Create 按钮" },
                { title: "输入描述", description: "在 Song Description 中粘贴下方 prompt" },
                { title: "等待生成", description: "Suno 会在30-60秒内生成两个版本" },
                { title: "播放欣赏", description: "一起听生成的音乐，讨论AI创意的可能性" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "Suno 音乐生成 Prompt",
          text: "An upbeat, inspiring electronic pop song about starting a new chapter, embracing technology and innovation. Warm synths, positive energy, catchy melody. Style: modern pop meets lo-fi chill. Female vocals, English lyrics.",
        },
        {
          type: "image",
          src: "/screenshots/s1-suno-music.png",
          alt: "Suno 音乐生成界面",
          caption: "截图：Suno 生成的音乐页面（课前截图替换）",
        },

        // ── Demo 3: Google Labs ──
        { type: "heading", text: "Demo 3: Google Labs — Experimental AI Tools", textCn: "Demo 3: Google Labs — AI 实验室" },
        {
          type: "paragraph",
          textCn: "Google Labs 是 Google 的AI实验平台，有很多有趣的实验工具。快速浏览几个亮点：",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "MusicFX", description: "访问 aitestkitchen.withgoogle.com/tools/music-fx — 用文字生成背景音乐片段" },
                { title: "ImageFX", description: "Google 的另一个图片生成工具，可以和 Gemini 对比效果" },
                { title: "浏览 Labs 首页", description: "访问 labs.google — 展示 Google 正在实验的AI项目" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "Google Labs 的工具变化很快，课前确认哪些还在线。重点是让 Fiona 看到：大公司在AI上的投入有多大。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: For Work
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: AI Knowledge Assistant — For Work", textCn: "Part 2: AI 知识助手 — For Work", level: 2 },
        {
          type: "paragraph",
          textCn: "从好玩到实用。展示AI如何帮助处理日常工作中的信息：总结视频、生成播客、分析文档、撰写邮件。",
        },

        // ── Demo 4: NotebookLM ──
        { type: "heading", text: "Demo 4: NotebookLM — AI Research Assistant", textCn: "Demo 4: NotebookLM — AI 研究助手" },
        {
          type: "paragraph",
          textCn: "NotebookLM 是 Google 的AI笔记本工具。你可以把文档、YouTube视频、网页等作为「来源」，然后向AI提问、生成总结、甚至生成播客。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 NotebookLM", description: "浏览器访问 notebooklm.google.com，用 Google 账号登录" },
                { title: "创建新笔记本", description: "点击 + New Notebook" },
                { title: "添加 YouTube 来源", description: "点击 Add Source → YouTube → 粘贴一个AI相关视频链接" },
                { title: "查看AI摘要", description: "NotebookLM 会自动生成视频的结构化摘要" },
                { title: "提问互动", description: "在聊天框中提问，如「这个视频的核心观点是什么？」" },
                { title: "生成 Audio Overview", description: "点击 Notebook Guide → Audio Overview → Generate，等待AI生成两人对话播客" },
                { title: "播放播客", description: "播放生成的播客片段，展示AI如何将文档变成生动的对话" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "推荐添加的 YouTube 视频",
          text: "建议选择一个5-10分钟的AI入门/趋势视频，例如：\n- Google I/O AI 发布会精华\n- 任何关于 AI in Project Management 的视频\n- TED Talk: How AI is changing work\n\n选一个 Fiona 会感兴趣的主题（PM/科技/职场相关）",
        },
        {
          type: "image",
          src: "/screenshots/s1-notebooklm-summary.png",
          alt: "NotebookLM 视频摘要界面",
          caption: "截图：NotebookLM 自动生成的视频摘要（课前截图替换）",
        },
        {
          type: "image",
          src: "/screenshots/s1-notebooklm-podcast.png",
          alt: "NotebookLM Audio Overview",
          caption: "截图：AI生成的播客对话（课前截图替换）",
        },
        {
          type: "tip",
          textCn: "Audio Overview 是 NotebookLM 最「杀手级」的功能。播放时注意观察 Fiona 的反应——这通常是课程中第二个WOW时刻。",
        },

        // ── Demo 5: Claude ──
        { type: "heading", text: "Demo 5: Claude — Professional AI Assistant", textCn: "Demo 5: Claude — 专业 AI 助手" },
        {
          type: "paragraph",
          textCn: "Claude 是我们课程的主力工具。展示它在专业写作和分析方面的能力。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 Claude", description: "浏览器访问 claude.ai，登录账号" },
                { title: "展示1: 会议纪要", description: "用下方 prompt 让 Claude 生成结构化会议纪要" },
                { title: "展示2: 专业邮件", description: "让 Claude 起草一封请求延长 deadline 的邮件" },
                { title: "Fiona 动手", description: "让 Fiona 选一个自己的工作场景，亲手写 prompt 试试" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "Prompt: 会议纪要生成",
          text: "请帮我把以下会议录音转写内容整理成结构化的会议纪要，包含：\n1. 会议要点（3-5个bullet points）\n2. 行动项（who / what / when）\n3. 待决事项\n4. 下次会议建议议题\n\n录音内容：\n[粘贴内容，或使用示例：\"今天主要讨论了Q2的产品路线图。Tom提到我们需要优先完成支付模块的重构，预计需要3周。Sarah建议先做用户调研再决定新功能的优先级。我们同意在下周三之前完成竞品分析报告。还有一个未决问题是API迁移的时间节点，需要和后端团队确认。\"]",
        },
        {
          type: "prompt",
          label: "Prompt: 专业邮件起草",
          text: "帮我写一封专业的英文邮件，场景如下：\n- 收件人：项目经理\n- 目的：请求延长 deadline 2天\n- 语气：专业但友好\n- 原因：等待第三方数据供应商的最终确认\n- 背景：项目整体进度正常，只有这个依赖项延迟了\n\n请提供2个版本：\n1. 简洁版（3-4句话）\n2. 详细版（包含上下文和替代方案）",
        },
        {
          type: "tip",
          textCn: "让 Fiona 亲手操作是关键。哪怕只是改一下 prompt 里的场景描述，也能让她感受到「我在控制AI」。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: For Brand
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: AI Website Builder — For Brand", textCn: "Part 3: AI 建站魔法 — For Brand", level: 2 },
        {
          type: "paragraph",
          textCn: "这是今天的重头戏。我们将用 v0.dev 从一段描述生成 Fiona 的个人网站，然后部署到她自己的域名上。这是全课程中最大的「WOW moment」。",
        },
        {
          type: "tip",
          textCn: "Jesse 课前准备：已经用 v0 生成好网站初稿并测试过部署流程。课上演示的是「从 prompt 到上线」的完整过程。",
        },

        // ── Step 1: v0 生成 ──
        { type: "heading", text: "Step 1: Generate Website with v0.dev", textCn: "Step 1: 用 v0.dev 生成网站" },
        {
          type: "paragraph",
          textCn: "Jesse 屏幕共享 v0.dev，复制粘贴准备好的 prompt，让 Fiona 亲眼看到AI如何从文字生成完整网站。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 v0.dev", description: "浏览器访问 v0.dev，确认已登录付费账号" },
                { title: "开始新对话", description: "点击 New Chat，准备输入建站 prompt" },
                { title: "粘贴 Prompt", description: "复制下方准备好的 prompt，粘贴到 v0 的输入框" },
                { title: "等待生成", description: "v0 会在 30-60 秒内生成完整的网站预览" },
                { title: "预览和讨论", description: "和 Fiona 一起看生成的结果，讨论哪些地方需要调整" },
                { title: "迭代优化", description: "根据 Fiona 的反馈，用追加 prompt 调整细节（颜色、文案、布局）" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "v0.dev 建站 Prompt（课前已准备）",
          text: "Build a modern, minimal personal portfolio website for Fiona Zheng.\n\nAbout Fiona:\n- Tech Product Manager at a Big 4 consulting firm in Canada\n- Passionate about leveraging AI to transform enterprise workflows\n- Background in data analytics and agile project management\n\nDesign Requirements:\n- Clean, light theme with subtle warmth\n- Hero section: name, title \"Tech Product Manager\", tagline \"Building better products with data, design, and AI\"\n- About section: professional bio highlighting her PM expertise and AI journey\n- Skills section: Product Management, Stakeholder Management, Agile/Scrum, Data Analytics, AI Tools\n- A \"What I'm Learning\" section with cards about her AI training journey\n- Contact section with LinkedIn link placeholder\n- Fully responsive, mobile-first design\n- Use Inter font, clean sans-serif\n- Subtle scroll animations\n\nColor palette: off-white background (#fafafa), dark navy text (#1a1a2e), coral/salmon accent (#ff6b6b), soft gray for secondary elements.",
        },
        {
          type: "prompt",
          label: "v0 追加调整 Prompt（根据反馈使用）",
          text: "请根据以下反馈调整网站：\n1. [在此填写 Fiona 的具体反馈]\n2. 调整 Hero 的 tagline 为：[新 tagline]\n3. 把「What I'm Learning」部分的标题改为：[新标题]\n\n保持其他设计不变。",
        },
        {
          type: "image",
          src: "/screenshots/s1-v0-website.png",
          alt: "v0 生成的 Fiona 个人网站预览",
          caption: "截图：v0 生成的网站预览（课前截图替换）",
        },

        // ── Step 2: 账户准备 ──
        { type: "heading", text: "Step 2: Account Setup", textCn: "Step 2: 账户准备" },
        {
          type: "paragraph",
          textCn: "部署网站需要 GitHub 和 Vercel 账户。如果 Fiona 还没有，现在一起注册。",
        },
        {
          type: "collapsible",
          title: "GitHub Account Setup",
          titleCn: "GitHub 账户注册步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "访问 github.com", description: "点击 Sign Up" },
                { title: "填写信息", description: "输入邮箱、密码、用户名（建议用自己名字的拼音或英文名）" },
                { title: "验证邮箱", description: "查看邮箱，点击验证链接" },
                { title: "完成注册", description: "跳过个性化设置，直接进入首页" },
              ],
            },
          ],
        },
        {
          type: "collapsible",
          title: "Vercel Account Setup",
          titleCn: "Vercel 账户注册步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "访问 vercel.com", description: "点击 Sign Up" },
                { title: "用 GitHub 登录", description: "选择 Continue with GitHub — 最简单的方式" },
                { title: "授权访问", description: "同意 Vercel 访问 GitHub 仓库" },
                { title: "完成", description: "Vercel 账户创建完成，可以开始部署" },
              ],
            },
          ],
        },

        // ── Step 3: 部署上线 ──
        { type: "heading", text: "Step 3: Deploy to the Web", textCn: "Step 3: 部署上线" },
        {
          type: "paragraph",
          textCn: "最激动人心的时刻！把 v0 生成的网站部署到互联网上，让全世界都能访问。",
        },
        {
          type: "collapsible",
          title: "Detailed Deployment Steps",
          titleCn: "详细部署步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "v0 导出代码", description: "在 v0.dev 中点击 Deploy 或 Open in GitHub — 将代码导出到 GitHub 仓库" },
                { title: "Vercel 导入项目", description: "打开 vercel.com → New Project → Import from GitHub → 选择刚创建的仓库" },
                { title: "配置部署", description: "Framework 选择 Next.js（v0 默认），其他保持默认" },
                { title: "点击 Deploy", description: "Vercel 自动构建和部署，等待约 1 分钟" },
                { title: "查看上线结果", description: "部署完成后，Vercel 会生成一个 .vercel.app 的链接" },
                { title: "绑定域名（如已购买）", description: "在 Vercel 项目设置 → Domains → 添加你购买的域名" },
              ],
            },
          ],
        },
        {
          type: "image",
          src: "/screenshots/s1-vercel-deploy.png",
          alt: "Vercel 部署成功",
          caption: "截图：Vercel 部署成功页面（课前截图替换）",
        },
        {
          type: "image",
          src: "/screenshots/s1-website-live.png",
          alt: "Fiona 的个人网站上线",
          caption: "截图：个人网站上线效果（课前截图替换）",
        },
        {
          type: "tip",
          textCn: "WOW 时刻！让 Fiona 在自己的手机上打开网站链接，看到自己的名字出现在浏览器地址栏。这个瞬间值得庆祝。",
        },
        { type: "divider" },

        // ── 总结 ──
        { type: "heading", text: "Wrap Up", textCn: "总结 · 回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天体验的所有AI工具和能力：",
        },
        {
          type: "steps",
          items: [
            { title: "Gemini", description: "文字→图片、图片→分析 — AI的多模态能力" },
            { title: "Suno", description: "文字→音乐 — AI的创意能力" },
            { title: "Google Labs", description: "MusicFX, ImageFX — 大公司的AI实验" },
            { title: "NotebookLM", description: "视频→摘要→播客 — AI的知识处理能力" },
            { title: "Claude", description: "场景→专业文档 — AI的工作助手能力" },
            { title: "v0.dev + Vercel", description: "描述→网站→上线 — AI的建站能力" },
          ],
        },
        {
          type: "paragraph",
          textCn: "核心认知：AI已经不是未来的事情——它今天就能做到这些。接下来的7堂课，我们将深入学习如何把这些能力用到你的日常工作中。",
        },
        {
          type: "paragraph",
          textCn: "下节课预告：我们将学习 Prompt 工程的核心技巧，并用 Claude Code/Cursor 进一步升级你的个人网站。",
        },
      ],
      homework: [
        {
          id: "s1-hw1",
          title: "Explore 3 AI Tools",
          titleCn: "探索3个AI工具",
          description: "Spend 15 minutes each with Gemini, NotebookLM, and Claude",
          descriptionCn: "分别花15分钟体验 Gemini、NotebookLM 和 Claude，记录你的感受",
          type: "practice",
        },
        {
          id: "s1-hw2",
          title: "NotebookLM Deep Dive",
          titleCn: "NotebookLM 深度体验",
          description: "Add a work-related document or YouTube video to NotebookLM and generate an Audio Overview",
          descriptionCn: "在 NotebookLM 中添加一个工作相关的文档或 YouTube 视频，生成 Audio Overview 播客",
          type: "practice",
        },
        {
          id: "s1-hw3",
          title: "Professional Photo",
          titleCn: "准备职业照",
          description: "Take or select a professional headshot for your website",
          descriptionCn: "拍一张或选择一张职业大头照，用于网站更新",
          type: "project",
        },
        {
          id: "s1-hw4",
          title: "Website Bio Draft",
          titleCn: "撰写网站简介",
          description: "Draft your About Me section (3-5 sentences) — we'll use AI to polish it next session",
          descriptionCn: "写一段「关于我」的草稿（3-5句话）——下节课我们用AI来润色",
          type: "project",
        },
        {
          id: "s1-hw5",
          title: "Reflection",
          titleCn: "课后反思",
          description: "List 3 work tasks where AI could save you time, ranked by potential impact",
          descriptionCn: "列出3个AI可能帮你节省时间的工作任务，按潜在影响排序",
          type: "reflection",
        },
      ],
    },
    // ─── Session 2 ───
    {
      id: "s2",
      sessionNumber: 2,
      week: 1,
      title: "Introduction to AI Agents",
      titleCn: "AI Agent 入门",
      subtitle: "Build your first AI agent workflows with Google Opal",
      subtitleCn: "用 Google Opal 构建你的第一批 AI Agent 工作流",
      duration: "60分钟",
      objectives: [
        "Understand what AI Agents are and how they differ from chatbots",
        "Learn the core loop: Perceive → Decide → Act",
        "Build 5 agent workflows in Google Opal (creative, PM analysis, user research chain, learning)",
        "Experience agent chaining: multiple agents working together as a pipeline",
      ],
      objectivesCn: [
        "理解什么是 AI Agent，它和普通聊天机器人的区别",
        "掌握 Agent 核心循环：感知 → 决策 → 行动",
        "在 Google Opal 中构建 5 个 Agent 工作流（创意、PM分析、用研链、学习加速）",
        "体验 Agent 链：多个 Agent 串联协作，形成工作流水线",
      ],
      toolIds: ["opal", "gemini"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾上周的探索体验，检查个人网站的访问数据，分享 Fiona 课后使用AI工具的感受。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "AI工具探索", description: "Fiona 分别体验了 Gemini、NotebookLM、Claude 吗？哪个印象最深？" },
                { title: "NotebookLM 播客", description: "是否成功生成了 Audio Overview？用了什么内容？" },
                { title: "职业照", description: "是否准备好了大头照？分辨率够吗？" },
                { title: "网站简介草稿", description: "「关于我」的草稿写好了吗？" },
                { title: "AI加速清单", description: "列出了哪3个可用AI加速的工作任务？" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          textCn: "今天的课程主题是 AI Agent——你将学会什么是「能自己干活的AI」，并亲手用 Google Opal 构建 4 个 Agent 工作流，从调研到创意，全面体验 Agent 的能力。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: AI Agent 概念建立（10min）
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: What is an AI Agent?", textCn: "Part 1: 什么是 AI Agent？", level: 2 },
        {
          type: "paragraph",
          textCn: "上节课我们用 ChatGPT、Claude、Gemini 对话——你提问，它回答。但今天的 AI Agent 完全不一样：它不只回答问题，而是能自己规划步骤、调用工具、完成一整个任务。",
        },

        { type: "heading", text: "Chatbot vs Agent", textCn: "聊天机器人 vs Agent" },
        {
          type: "paragraph",
          textCn: "想象你在酒店——\n\n聊天机器人 = 大堂信息牌：你看问题，它显示答案，不会主动做任何事。\n\nAI Agent = 酒店管家：你说「帮我安排周末行程」，他自己查天气、搜餐厅、订门票、安排车辆——你只给目标，他搞定一切。\n\n一句话总结：聊天机器人是「你推一步，它走一步」；Agent 是「你给方向，它自己走完全程」。",
        },
        {
          type: "tip",
          textCn: "关键让 Fiona 体会：Agent 是「目标驱动」而不是「问题驱动」。你给目标，它自己想办法完成。",
        },

        { type: "heading", text: "The Agent Core Loop", textCn: "Agent 核心循环" },
        {
          type: "steps",
          items: [
            { title: "感知 (Perceive)", description: "接收信息——用户输入、网页内容、文件数据等。Agent 的「眼睛和耳朵」。" },
            { title: "决策 (Decide)", description: "分析信息，规划下一步。AI大模型（如 Gemini）在这里「思考」该做什么。" },
            { title: "行动 (Act)", description: "执行操作——搜索网页、生成文本、创建图片、调用工具。Agent 的「手」。" },
          ],
        },
        {
          type: "paragraph",
          textCn: "这个循环不断重复：行动结果变成新的「感知」，Agent 再决策、再行动……直到任务完成。这就是 Agent 能处理复杂任务的原因——它会自己「迭代」。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: Google Opal 平台介绍（5min）
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: Meet Google Opal", textCn: "Part 2: 认识 Google Opal", level: 2 },
        {
          type: "paragraph",
          textCn: "Google Opal 是 Google Labs 推出的无代码 AI 应用构建器。你用自然语言描述需求，Opal 就生成一个可运行的「AI 小程序」。2026年2月它新增了 Agent 功能，支持搜索网页、生成图片和视频、输出到 Google Docs/Slides——而且完全免费，只需 Google 账号。",
        },

        {
          type: "collapsible",
          title: "Setup Steps",
          titleCn: "登录步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 Opal", description: "浏览器访问 opal.google → 点击「Get started」" },
                { title: "登录 Google 账号", description: "用 Fiona 的 Google 账号登录（和 Gemini 同一个账号）" },
                { title: "浏览模板", description: "首页有一些模板和示例，先花1分钟浏览感受一下" },
                { title: "创建新应用", description: "点击「Create」开始创建你的第一个 AI 小程序" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "让 Fiona 先自己登录和浏览1分钟。感受界面很重要——降低后续操作的心理门槛。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 练习一 — Visual Storyteller（热身，5min）
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Exercise 1 — Visual Storyteller", textCn: "Part 3: 练习一 — AI 视觉故事创作", level: 2 },
        {
          type: "paragraph",
          textCn: "先从一个超好玩的练习热身！Visual Storyteller 是 Google Opal 社区最受欢迎的应用之一——你输入一个故事设定，Agent 自动编写故事、为每个场景生成 AI 配图，创造出一个图文并茂的交互式故事。",
        },
        {
          type: "prompt",
          label: "Opal: Visual Storyteller",
          text: "Build an interactive visual story generator.\n\nInput: The user describes a story setting in 1-2 sentences (characters, world, genre). For example: \"A curious cat detective solving mysteries in a futuristic Tokyo\" or \"A product manager who discovers their office is secretly run by AI agents.\"\n\nThe agent should:\n1. Create a 4-part short story based on the setting\n2. Generate a unique AI illustration for each part of the story\n3. Add a plot twist in part 3\n4. End with an interactive choice: give the reader 2 options for how the story ends, then generate the chosen ending\n\nOutput: A beautiful storybook-style page with:\n- A title and genre badge\n- 4 story chapters, each with a generated illustration above the text\n- Vivid, descriptive prose (3-4 sentences per chapter)\n- The interactive ending choice at the bottom\n\nMake it look like a modern digital picture book with a clean, immersive layout.",
        },
        {
          type: "tip",
          textCn: "让 Fiona 自由发挥故事设定——越有趣越好！这个练习的目的是让她亲眼看到 Agent 的多模态能力：同时生成文字+图片，还有交互式选择。这比普通聊天机器人强太多了。鼓励她试试和 PM 工作相关的幽默设定，比如「一个PM发现自己的团队全是AI」。",
        },
        {
          type: "image",
          src: "/screenshots/s2-opal-storyteller.png",
          alt: "Opal视觉故事创作",
          caption: "截图：Visual Storyteller 效果（课堂截图替换）",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 4: 练习二 — Feature Comparison Matrix（10min）
        // ══════════════════════════════════════
        { type: "heading", text: "Part 4: Exercise 2 — Feature Comparison Matrix", textCn: "Part 4: 练习二 — 功能对比矩阵", level: 2 },
        {
          type: "paragraph",
          textCn: "现在来一个 PM 超实用工具。Feature Comparison Matrix 是产品评审会的必备素材——输入你的产品和几个竞品名称，Agent 自动搜索信息，生成一张专业的 ✓/◐/✗ 对比矩阵。这个灵感来自 Optimizely 的 Opal Agent 示例库。",
        },

        {
          type: "collapsible",
          title: "Step-by-Step Guide",
          titleCn: "操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "创建新应用", description: "在 Opal 首页点击「Create」" },
                { title: "输入描述", description: "粘贴下方 Prompt" },
                { title: "测试运行", description: "输入你的产品名和 2-3 个竞品（如 Jira vs Asana vs Monday.com vs Linear）" },
                { title: "查看矩阵", description: "看看 ✓/◐/✗ 对比表格，体会 Agent 多次搜索+结构化输出的能力" },
                { title: "定制维度", description: "试试修改描述来调整对比维度，比如「add AI capabilities and API quality as categories」" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "Opal: Feature Comparison Matrix Builder",
          text: "Build a feature comparison matrix generator for product analysis.\n\nInput: The user enters a product name and a comma-separated list of competitors (e.g., \"Our product: Jira. Competitors: Asana, Monday.com, Linear\").\n\nThe agent should:\n1. Search the web for the latest feature information on each product\n2. Identify the most important feature categories for this product space\n3. Build an objective, data-driven comparison matrix\n\nOutput: A professional comparison matrix with:\n- A clean table where rows = feature categories, columns = products\n- Use symbols for support level: ✓ (full support), ◐ (partial support), ✗ (not available)\n- Feature categories should include: Core Features, AI Capabilities, Integrations, Mobile App, Pricing (per user/month), Free Tier, API Quality, Customer Support\n- Below the matrix: a \"Best For\" section recommending which product fits which use case\n- A \"Key Takeaway\" summary (3 bullet points)\n\nKeep the tone neutral and factual — let the data speak. Format as a clean web page that could be screenshot and dropped into a product review deck.",
        },
        {
          type: "tip",
          textCn: "让 Fiona 输入她工作中实际评估过的工具。和 Visual Storyteller 对比——同样的 Agent 能力（搜索→分析→输出），用在完全不同场景。Agent 核心不变，变的只是目标。如果她对比结果有异议，鼓励她修改 prompt 来优化——这就是「迭代」的力量。",
        },
        {
          type: "image",
          src: "/screenshots/s2-opal-matrix.png",
          alt: "Opal功能对比矩阵",
          caption: "截图：功能对比矩阵效果（课堂截图替换）",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 5: 练习三 — User Research 双连击（15min）
        // ══════════════════════════════════════
        { type: "heading", text: "Part 5: Exercise 3 — User Research Combo", textCn: "Part 5: 练习三 — 用研双连击", level: 2 },
        {
          type: "paragraph",
          textCn: "这个练习展示 Agent 的「工作链」概念：先用一个 Agent 生成访谈提纲（采访前），再用另一个 Agent 把访谈笔记转成 PRD（采访后）。两个 Agent 串联起来，覆盖了 PM 用户研究的完整流程。",
        },

        { type: "heading", text: "Step A: Interview Guide Builder", textCn: "Step A: 访谈提纲生成器" },
        {
          type: "paragraph",
          textCn: "灵感来自 Optimizely 的 User Research Interview Guide Builder。核心原则：问过去真实行为，不问假设性问题；多问「为什么」，挖掘表面答案下的真实需求。",
        },
        {
          type: "prompt",
          label: "Opal: Interview Guide Builder",
          text: "Build a user research interview guide generator.\n\nInput: The user provides:\n1. Research goal (e.g., \"Understand how PMs track project progress\")\n2. User segment (e.g., \"Product managers at mid-size SaaS companies\")\n3. Product context (e.g., \"We're building a project tracking dashboard\")\n\nThe agent should:\n1. Generate a structured 30-minute interview guide\n2. Follow best practices: ask about past behavior (not hypothetical), use \"tell me about the last time...\" framing, include follow-up \"why\" prompts\n\nOutput: A ready-to-use interview guide with:\n- Introduction script (how to start the conversation, build rapport, explain recording)\n- Warm-up questions (2-3 easy questions to get the person talking)\n- Core research questions (5-7 questions, each with 2-3 follow-up probes)\n- Wrap-up questions (\"anything else?\", next steps)\n- A sidebar of DO's and DON'Ts for the interviewer\n\nFormat as a clean, printable document. Mark each question with estimated time.",
        },
        {
          type: "tip",
          textCn: "让 Fiona 用她真实工作中的一个研究目标来测试。关键体会：Agent 不只是帮你写问题——它还内置了用研方法论（问过去行为、5-Why 追问），这相当于一个「AI用研顾问」。",
        },

        { type: "heading", text: "Step B: Notes → PRD Generator", textCn: "Step B: 笔记 → PRD 生成器" },
        {
          type: "paragraph",
          textCn: "现在假设访谈做完了，你手里有一堆笔记。这个 Agent 帮你把混乱的笔记变成结构化的 PRD 片段——直接可以粘贴到真实文档中。",
        },
        {
          type: "prompt",
          label: "Opal: User Research → PRD Agent",
          text: "Build a tool that converts user research notes into PRD fragments.\n\nInput: The user pastes their raw interview notes or user research findings (can be messy, unstructured text).\n\nThe agent should:\n1. Analyze the notes and extract key user pain points\n2. Identify patterns and recurring themes\n3. Prioritize findings by frequency and severity\n4. Generate structured PRD fragments\n\nOutput should include:\n- Problem Statement (2-3 sentences summarizing the core user need)\n- User Stories (3-5 user stories in \"As a [role], I want [goal], so that [benefit]\" format)\n- Acceptance Criteria (for each user story, in bullet points)\n- Priority Recommendation (High / Medium / Low with reasoning)\n- Out of Scope (things mentioned but not critical)\n\nFormat as a clean document that could be copied into a real PRD.",
        },
        {
          type: "collapsible",
          title: "Sample Interview Notes",
          titleCn: "示例访谈笔记（用于测试）",
          content: [
            {
              type: "prompt",
              label: "Sample Input: User Interview Notes",
              text: "Interview with Sarah, Marketing Manager at TechCorp (March 2026)\n\n- Spends 2+ hours daily on reporting, pulling data from 5 different tools\n- \"I wish I could just ask a question and get the answer instead of building dashboards\"\n- Tried using ChatGPT but it doesn't connect to their internal data\n- Team of 8 people, everyone does their own reporting differently\n- Biggest pain: weekly stakeholder report takes half a day every Friday\n- Wants consistent formatting across team reports\n- Mentioned competitor product Databox but said it's too expensive\n- Would pay $30-50/user/month for something that \"just works\"\n- Security concern: data can't leave their cloud environment\n- \"If it could also track our KPIs automatically and alert me when something drops, that would be amazing\"",
            },
          ],
        },
        {
          type: "tip",
          textCn: "这两个 Agent 串联起来就是一个完整的用研工作流：Guide Builder（采访前）→ 执行访谈 → PRD Generator（采访后）。让 Fiona 体会「Agent 链」的概念——多个 Agent 各司其职，串联成流水线。",
        },
        {
          type: "image",
          src: "/screenshots/s2-opal-research.png",
          alt: "Opal用研双连击",
          caption: "截图：访谈提纲 + PRD 生成器效果（课堂截图替换）",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 6: 练习四 — Learning with YouTube（10min）
        // ══════════════════════════════════════
        { type: "heading", text: "Part 6: Exercise 4 — Learning with YouTube", textCn: "Part 6: 练习四 — YouTube 学习加速器", level: 2 },
        {
          type: "paragraph",
          textCn: "压轴练习！这是 Google Opal 社区另一个明星应用——把任意 YouTube 视频变成结构化学习材料：摘要、知识点、测验题、学习报告。对 PM 来说，再也不用花 40 分钟看完一个行业视频了——5 分钟搞定核心内容。",
        },

        {
          type: "prompt",
          label: "Opal: YouTube Learning Accelerator",
          text: "Build a YouTube video learning tool.\n\nInput: The user pastes a YouTube video URL.\n\nThe agent should:\n1. Extract and analyze the video content (transcript/description)\n2. Create comprehensive learning materials from the video\n\nOutput: A complete learning package with:\n- Video Summary (3-5 bullet points, the key takeaways)\n- Detailed Notes (structured outline of the video content, with timestamps if available)\n- Key Concepts (list of important terms/ideas explained in simple language)\n- Quiz (5 multiple-choice questions to test understanding, with answers hidden in a collapsible section)\n- Action Items (3 practical things the viewer can do based on what they learned)\n- Related Topics (suggestions for what to learn next)\n\nFormat as a clean study guide page. Make it look like something you'd find in an online course platform.",
        },
        {
          type: "collapsible",
          title: "Suggested Test Videos",
          titleCn: "推荐测试视频",
          content: [
            {
              type: "steps",
              items: [
                { title: "AI Agents 入门", description: "搜索「What are AI Agents explained」找一个 5-10 分钟的视频" },
                { title: "PM 技能", description: "搜索「Product Manager skills 2026」或「How to write a PRD」" },
                { title: "Fiona 感兴趣的话题", description: "让她选一个她最近想学但没时间看的视频" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "这个练习的「wow factor」：Fiona 平时花 30-40 分钟看一个视频，现在 Agent 帮她 1 分钟提取核心内容+生成测验。让她算一下：如果每周看 5 个行业视频，能省多少时间？这就是 Agent 的实际价值。同时这个应用也能帮她为团队制作培训材料。",
        },
        {
          type: "image",
          src: "/screenshots/s2-opal-youtube.png",
          alt: "Opal YouTube学习加速器",
          caption: "截图：YouTube 学习加速器效果（课堂截图替换）",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // 认知连接 + 总结（5min）
        // ══════════════════════════════════════
        { type: "heading", text: "Wrap Up: Your AI Map", textCn: "总结 · 你的 AI 工具地图", level: 2 },
        {
          type: "paragraph",
          textCn: "经过两节课，你已经从「AI 能聊天」升级到「AI 能干活」。快速回顾你的 AI 工具地图：",
        },
        {
          type: "steps",
          items: [
            { title: "聊天助手（问答型）", description: "ChatGPT、Claude、Gemini — 你提问，它回答。适合写作、翻译、头脑风暴。" },
            { title: "专项工具（创作型）", description: "NotebookLM（文档+播客）、Suno（音乐）、v0（网站）— 专精一个领域。" },
            { title: "Agent 平台（自动化型）", description: "Google Opal — 你给目标，它自己搜索、生成图片、写文案、做对比。一个指令，全套搞定。" },
          ],
        },
        {
          type: "paragraph",
          textCn: "今天的核心收获：",
        },
        {
          type: "steps",
          items: [
            { title: "Agent ≠ 聊天机器人", description: "Agent 是目标驱动的——你给目标，它自己规划、调用工具、完成任务。" },
            { title: "核心循环", description: "感知→决策→行动，不断迭代直到任务完成。" },
            { title: "4 个实战工作流", description: "视觉故事（创意多模态）→ 功能对比矩阵（PM调研）→ 用研双连击（Agent链）→ YouTube加速器（学习效率）。" },
            { title: "Agent 链", description: "多个 Agent 可以串联——访谈提纲→执行访谈→PRD生成，形成完整工作流水线。" },
          ],
        },
        {
          type: "paragraph",
          textCn: "下节课我们将深入学习高级 Prompt 技巧和 PM 工具链，用AI帮你拆解真实的需求文档。",
        },
      ],
      homework: [
        {
          id: "s2-hw1",
          title: "Competitive Insights Agent",
          titleCn: "竞争情报 Agent",
          description: "Build a competitive intelligence agent in Opal",
          descriptionCn: "在 Opal 中构建一个「竞争情报 Agent」：输入一个竞品名称，Agent 自动搜索过去30天的动态（产品更新、融资新闻、用户评价），生成一份情报简报 + 建议应对策略。用你工作中实际关注的竞品来测试",
          type: "practice",
        },
        {
          id: "s2-hw2",
          title: "PM Workflow Agent",
          titleCn: "PM 工作流 Agent",
          description: "Build an Opal agent for a PM task at work",
          descriptionCn: "用 Opal 做一个和你 PM 工作直接相关的自动化工具（如 Sprint 总结、Stakeholder 更新邮件、会议议程生成器），截图记录结果",
          type: "project",
        },
        {
          id: "s2-hw3",
          title: "Agent Thinking",
          titleCn: "Agent 思维练习",
          description: "Reflect on how AI agents could transform PM workflows",
          descriptionCn: "列出你工作中 3 个可以用 Agent 自动化的任务，并写出：目标是什么、Agent 需要哪些「感知」（输入信息）、期望的「行动」（输出结果）",
          type: "reflection",
        },
        {
          id: "s2-hw4",
          title: "Explore Opal Gallery",
          titleCn: "探索 Opal 模板库",
          description: "Browse and try Opal community templates",
          descriptionCn: "在 Opal 首页浏览社区模板，重点看 Video Hooks Brainstormer（视频创意）和 Personal Podcaster（播客生成）这两个应用，试用并记录哪个最实用",
          type: "practice",
        },
      ],
    },
    // ─── Session 3 ───
    {
      id: "s3",
      sessionNumber: 3,
      week: 2,
      title: "AI × PM Toolchain",
      titleCn: "AI × PM工具链",
      subtitle: "Advanced prompt engineering, PRD breakdown, and project management",
      subtitleCn: "深入Prompt工程 · PRD拆解 · 项目管理工具",
      duration: "60分钟",
      objectives: [
        "Master advanced prompt engineering",
        "Break down PRD into actionable issues",
        "Import tasks to Linear/Asana",
        "Build a prompt library page",
      ],
      objectivesCn: [
        "深入学习Prompt工程",
        "将PRD拆解为可执行Issues",
        "导入Linear/Asana",
        "建立Prompt库页面",
      ],
      toolIds: ["claude", "linear"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "检查 Fiona 上周的作业完成情况，分享她在工作中实际使用AI的经历。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "网站文案改进", description: "Fiona 改进了哪段文案？Before/After 对比效果如何？" },
                { title: "LinkedIn 分享", description: "是否分享了个人网站？有什么反馈？" },
                { title: "3个Prompt", description: "用5要素框架写的3个 Prompt 质量如何？一起评审。" },
                { title: "AI实战", description: "在工作中实际用AI完成了什么任务？节省了多少时间？" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "重点听 Fiona 在工作中使用AI的体验——这决定了今天课程的侧重点。如果她在PRD/需求方面有痛点，Part 2 可以多花时间。",
        },
        {
          type: "paragraph",
          textCn: "今天的课程分四个部分：高级Prompt技巧 → PRD拆解实战 → Linear项目管理 → 建立Prompt库。这节课会明显感受到AI对PM日常工作的加速作用。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: 高级Prompt工程
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: Advanced Prompt Engineering", textCn: "Part 1: 高级 Prompt 工程", level: 2 },
        {
          type: "paragraph",
          textCn: "上节课学了5要素基础框架。今天我们学习三个进阶技巧，它们可以让AI的输出从「还不错」变成「专家级」。",
        },

        { type: "heading", text: "Technique 1: Chain-of-Thought (CoT)", textCn: "技巧1: Chain-of-Thought 思维链" },
        {
          type: "paragraph",
          textCn: "让AI「一步一步想」，而不是直接给答案。适合复杂分析、决策推理、风险评估等场景。关键词：「请一步步分析」「请展示你的推理过程」。",
        },
        {
          type: "prompt",
          label: "Chain-of-Thought 示例：需求优先级评估",
          text: "你是一名资深产品经理。请一步步分析以下3个需求的优先级：\n\n需求A：添加深色模式\n需求B：修复移动端登录闪退\n需求C：新增数据导出功能\n\n请按以下步骤逐步推理：\n1. 首先评估每个需求的用户影响面（影响多少用户）\n2. 然后评估紧急程度（是否阻塞核心流程）\n3. 再评估开发成本（预估工时）\n4. 最后综合以上三个维度，给出优先级排序和理由\n\n请展示完整的推理过程。",
        },
        {
          type: "tip",
          textCn: "让 Fiona 先不用 CoT 问一遍「帮我排需求优先级」，再用 CoT 问一遍，对比两次输出的深度差异。",
        },
        { type: "divider" },

        { type: "heading", text: "Technique 2: Few-Shot Learning", textCn: "技巧2: Few-Shot 少样本学习" },
        {
          type: "paragraph",
          textCn: "给AI 2-3 个「示例」，让它学习你的风格和格式。适合：写周报、写邮件、写JIRA ticket——任何有固定格式的输出。",
        },
        {
          type: "prompt",
          label: "Few-Shot 示例：JIRA Ticket 生成",
          text: "请按照以下示例的格式，帮我写新的 JIRA ticket。\n\n=== 示例1 ===\n标题：[FE] 优化首页加载速度\n类型：Story\n优先级：P1\n描述：首页首屏加载时间从 3.2s 降到 1.5s 以内。主要优化图片懒加载和 JS bundle 拆分。\nAC：\n- [ ] 首屏 LCP < 1.5s\n- [ ] 图片全部使用 WebP + lazy load\n- [ ] Lighthouse 性能分数 > 90\n估时：3d\n\n=== 示例2 ===\n标题：[BE] 新增用户数据导出 API\n类型：Story\n优先级：P2\n描述：支持管理员导出用户列表为 CSV，包含注册时间、活跃度、套餐信息。\nAC：\n- [ ] GET /api/admin/users/export 返回 CSV 文件\n- [ ] 支持按时间范围筛选\n- [ ] 单次导出上限 10000 条\n估时：2d\n\n=== 请按相同格式生成 ===\n需求：用户可以在个人设置中更改头像，支持裁剪和预览",
        },
        {
          type: "tip",
          textCn: "Few-Shot 的威力在于「教AI你的风格」。让 Fiona 用自己公司的 ticket 格式作为示例——这样AI生成的内容就能直接使用。",
        },
        { type: "divider" },

        { type: "heading", text: "Technique 3: Role Stacking", textCn: "技巧3: 角色叠加" },
        {
          type: "paragraph",
          textCn: "给AI多个角色视角，让它从不同角度分析同一个问题。适合：做决策前想听不同意见、评审方案、风险分析。",
        },
        {
          type: "prompt",
          label: "角色叠加示例：方案评审",
          text: "请分别从以下三个角色的视角，评审这个技术方案：\n\n方案：将用户认证系统从 Session-based 迁移到 JWT\n\n角色1 - 后端架构师：评估技术复杂度、迁移风险、性能影响\n角色2 - 安全工程师：评估安全隐患、Token 泄露风险、合规要求\n角色3 - 产品经理：评估用户影响、上线节奏、回滚方案\n\n每个角色给出：\n- 支持/反对/有条件支持\n- 主要理由（3点）\n- 最大风险\n- 建议",
        },
        {
          type: "tip",
          textCn: "这个技巧在 Fiona 的日常工作中特别实用——做方案评审前，先让AI从多个角色预演一遍，可以提前发现盲点。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: PRD拆解实战
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: PRD Breakdown Workshop", textCn: "Part 2: PRD 拆解实战", level: 2 },
        {
          type: "paragraph",
          textCn: "用一份真实的PRD文档（匿名化处理），演示如何让AI帮你把需求拆解成可执行的开发任务。这是PM日常工作中最耗时的环节之一。",
        },

        { type: "heading", text: "Step 1: Feed the PRD", textCn: "Step 1: 输入PRD" },
        {
          type: "paragraph",
          textCn: "选择一份 Fiona 工作中的真实PRD（脱敏后），或使用下方的示例PRD。",
        },
        {
          type: "collapsible",
          title: "Sample PRD",
          titleCn: "示例PRD（如没有真实PRD可用）",
          content: [
            {
              type: "paragraph",
              textCn: "产品：企业内部知识库搜索系统\n目标用户：500+员工的科技公司内部\n核心问题：员工找不到已有的内部文档，重复造轮子\n主要功能：\n1. 全文搜索（支持 PDF/Docs/Confluence）\n2. AI 智能摘要（搜索结果自动生成摘要）\n3. 权限管理（按部门/角色控制访问）\n4. 使用统计（最热门文档、搜索趋势）\n非功能需求：响应时间<500ms，支持 1000 并发",
            },
          ],
        },
        { type: "divider" },

        { type: "heading", text: "Step 2: AI Breakdown", textCn: "Step 2: AI 拆解" },
        {
          type: "paragraph",
          textCn: "用 Chain-of-Thought + 角色扮演的组合 Prompt，让AI把PRD拆成结构化任务。",
        },
        {
          type: "prompt",
          label: "PRD 拆解 Prompt（进阶版）",
          text: "你是一名资深技术项目经理，有8年敏捷开发经验。\n\n请将以下PRD拆解为可执行的开发任务。请一步步分析：\n\n[粘贴 PRD 内容]\n\n拆解要求：\n1. 先识别核心模块和技术组件\n2. 每个任务包含：标题、描述、优先级（P0-紧急/P1-重要/P2-一般）、预估工时、所属阶段\n3. 按开发阶段分组：\n   - 阶段1: 技术设计 & 架构\n   - 阶段2: 后端开发\n   - 阶段3: 前端开发\n   - 阶段4: 测试 & 上线\n4. 标注任务之间的依赖关系（哪些必须先完成）\n5. 最后给出建议的Sprint规划（按2周一个Sprint）\n\n输出为 Markdown 表格 + Sprint 甘特图概览。",
        },
        {
          type: "image",
          src: "/screenshots/s3-prd-breakdown.png",
          alt: "AI生成的PRD拆解结果",
          caption: "截图：Claude 生成的任务拆解表格（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "让 Fiona 评价AI拆解的质量：「这些任务你觉得合理吗？有遗漏吗？优先级对吗？」——这是培养她用AI辅助决策（而非替代决策）的关键环节。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 导入Linear
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Import to Linear", textCn: "Part 3: 导入 Linear 项目管理", level: 2 },
        {
          type: "paragraph",
          textCn: "Linear 是一款现代的项目管理工具，比 JIRA 更简洁高效。我们把AI拆解的任务导入 Linear，体验「AI分析 → 工具落地」的完整流程。",
        },

        { type: "heading", text: "Linear Setup", textCn: "Linear 账户设置" },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "注册 Linear", description: "访问 linear.app → Sign Up → 用 Google 账号登录" },
                { title: "创建 Workspace", description: "Workspace 名称填 Fiona's AI Lab 或类似" },
                { title: "创建 Project", description: "点击 Projects → New Project → 名称「知识库搜索系统」" },
                { title: "了解界面", description: "简单介绍 Linear 的 Issue / Project / Cycle 概念" },
              ],
            },
          ],
        },

        { type: "heading", text: "Import Issues", textCn: "导入任务到 Linear" },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细导入步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "创建 Issue", description: "点击 + New Issue → 粘贴AI生成的第一个任务标题和描述" },
                { title: "设置优先级", description: "选择 Urgent/High/Medium/Low 对应 P0/P1/P2" },
                { title: "添加标签", description: "创建标签：Frontend / Backend / Design / Testing" },
                { title: "批量创建", description: "重复以上步骤，导入 5-8 个核心任务" },
                { title: "设置依赖", description: "在 Issue 详情中关联「Blocked by」依赖关系" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "让AI帮你批量格式化 Issues",
          text: "请把以下任务列表格式化为可以快速复制到 Linear 的格式。每个 Issue 单独一段：\n\n[粘贴AI拆解的任务列表]\n\n每个 Issue 格式：\n标题: [简洁的任务标题]\n描述: [2-3句话描述]\n优先级: [P0/P1/P2]\n标签: [Frontend/Backend/Design/Testing]\n估时: [Xd]",
        },
        {
          type: "image",
          src: "/screenshots/s3-linear-board.png",
          alt: "Linear 项目看板",
          caption: "截图：导入完成后的 Linear 看板（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "告诉 Fiona：「在真实工作中，这个流程可以帮你把2小时的需求拆解 + 录入工作缩短到20分钟。」",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 4: Prompt库
        // ══════════════════════════════════════
        { type: "heading", text: "Part 4: Build Your Prompt Library", textCn: "Part 4: 建立 Prompt 库", level: 2 },
        {
          type: "paragraph",
          textCn: "Prompt 库是你的「AI兵器库」——把常用的好 Prompt 收集起来，随时可以复用。我们在个人网站上添加一个 Prompt 库页面。",
        },
        {
          type: "prompt",
          label: "Claude Code: 创建 Prompt 库页面",
          text: "请在网站上创建一个 /prompts 页面，作为个人 Prompt 库。\n\n功能：\n- 按分类展示 Prompt 模板：Writing / Analysis / PM / Code\n- 每个 Prompt 卡片包含：标题、分类标签、Prompt 内容、「复制」按钮\n- 搜索/筛选功能\n- 支持折叠/展开长 Prompt\n\n预置 Prompt（从课程中学到的）：\n1. 会议纪要生成（S1）\n2. 专业邮件起草（S1）\n3. 需求优先级评估-CoT（S3）\n4. JIRA Ticket 生成-FewShot（S3）\n5. PRD 拆解（S3）\n\n设计：和网站其他页面保持一致风格，添加到 Navbar 导航中。",
        },
        {
          type: "collapsible",
          title: "What to put in the Prompt Library",
          titleCn: "Prompt 库分类建议",
          content: [
            {
              type: "steps",
              items: [
                { title: "Writing 写作类", description: "会议纪要、邮件起草、周报生成、文档润色" },
                { title: "Analysis 分析类", description: "需求分析、竞品分析、数据解读、风险评估" },
                { title: "PM 项目管理类", description: "PRD拆解、Sprint规划、Stand-up总结、Retrospective" },
                { title: "Code 代码类", description: "网站改进、组件生成、Bug修复、代码审查" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "Prompt 库会随着课程推进不断丰富。告诉 Fiona：「每次用到好用的 Prompt，就往这里添加。毕业时你会有20-30个经过验证的 Prompt 模板。」",
        },
        { type: "divider" },

        // ── 总结 ──
        { type: "heading", text: "Wrap Up", textCn: "总结 · 回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天学到的核心内容：",
        },
        {
          type: "steps",
          items: [
            { title: "Chain-of-Thought", description: "让AI逐步推理，输出更深入、更有逻辑的分析" },
            { title: "Few-Shot Learning", description: "给AI示例，让它学习你的格式和风格" },
            { title: "角色叠加", description: "从多个视角分析同一个问题，发现盲点" },
            { title: "PRD → Issues", description: "AI拆解需求 + 导入Linear = 2小时变20分钟" },
            { title: "Prompt 库", description: "积累好 Prompt，复用就是生产力" },
          ],
        },
        {
          type: "paragraph",
          textCn: "下节课预告：我们将进入自动化领域——用 Zapier/Make 构建无代码工作流，让AI自动帮你处理重复性工作。",
        },
      ],
      homework: [
        {
          id: "s3-hw1",
          title: "Break Down Real Requirements",
          titleCn: "拆解真实需求",
          description: "Use prompt templates to break down a real work requirement",
          descriptionCn: "选择工作中一份真实的需求文档（脱敏），用今天学的 PRD 拆解 Prompt 生成任务列表，并评估AI拆解的质量",
          type: "practice",
        },
        {
          id: "s3-hw2",
          title: "Create Linear Project",
          titleCn: "创建Linear项目",
          description: "Import 5 issues into a personal Linear project",
          descriptionCn: "在 Linear 中创建一个新项目，导入至少5个 Issues，设置优先级和标签",
          type: "project",
        },
        {
          id: "s3-hw3",
          title: "Optimize Prompt",
          titleCn: "优化Prompt模板",
          description: "Iterate and optimize one prompt template",
          descriptionCn: "选择一个今天学的 Prompt 技巧（CoT/Few-Shot/角色叠加），应用到工作中的一个真实场景，把优化后的 Prompt 添加到你的 Prompt 库",
          type: "practice",
        },
      ],
    },
    // ─── Session 4 ───
    {
      id: "s4",
      sessionNumber: 4,
      week: 2,
      title: "Automation Magic - Zapier/Make Workshop",
      titleCn: "自动化魔法 - Zapier/Make实战",
      subtitle: "Build no-code automation workflows for real work scenarios",
      subtitleCn: "构建无代码自动化工作流 · 真实工作场景",
      duration: "60分钟",
      objectives: [
        "Learn no-code automation platforms",
        "Build 3-4 high-value workflows",
        "Deploy automation showcase page to website",
      ],
      objectivesCn: [
        "学习无代码自动化平台",
        "建立3-4个高价值工作流",
        "部署自动化展示页到网站",
      ],
      toolIds: ["zapier", "claude", "linear"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾上周的作业，特别是 PRD 拆解和 Linear 项目的使用体验。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "PRD 拆解", description: "Fiona 用真实需求做了拆解吗？AI 的输出质量她怎么评价？" },
                { title: "Linear 项目", description: "是否创建了项目并导入了 Issues？用起来感觉如何？" },
                { title: "Prompt 优化", description: "是否尝试了 CoT/Few-Shot？效果提升明显吗？" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          textCn: "今天的课程将进入一个全新领域——无代码自动化。我们分三个部分：自动化基础概念 → 实战构建3个工作流 → 部署展示页到网站。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: 自动化基础
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: Automation Fundamentals", textCn: "Part 1: 自动化基础", level: 2 },
        {
          type: "paragraph",
          textCn: "自动化的核心概念非常简单：当某件事发生（触发器）→ 自动执行一系列操作（动作）→ 产生结果。你不需要写代码，只需要「连接」不同的工具。",
        },

        { type: "heading", text: "Core Concept: Trigger → Action → Result", textCn: "核心概念：触发器 → 动作 → 结果" },
        {
          type: "steps",
          items: [
            { title: "触发器 (Trigger)", description: "什么事情发生时启动？如：收到邮件、Slack新消息、日历事件、定时触发（每天早上9点）" },
            { title: "动作 (Action)", description: "触发后做什么？如：AI分析内容、发送通知、创建任务、更新表格" },
            { title: "结果 (Result)", description: "最终输出是什么？如：Issue被创建、邮件被发送、报告被生成" },
          ],
        },
        {
          type: "paragraph",
          textCn: "类比：自动化就像设置闹钟。闹钟的触发器是时间，动作是响铃。我们今天做的是「高级闹钟」——触发条件更智能，动作更复杂。",
        },
        { type: "divider" },

        { type: "heading", text: "Zapier vs Make", textCn: "Zapier vs Make 平台对比" },
        {
          type: "collapsible",
          title: "Platform Comparison",
          titleCn: "平台对比详情",
          content: [
            {
              type: "steps",
              items: [
                { title: "Zapier", description: "更简单直观，拖拽式界面，适合入门。免费版每月100次触发。今天主要用这个。" },
                { title: "Make (原Integromat)", description: "更灵活，支持复杂分支逻辑和数据转换。免费版每月1000次操作。适合进阶使用。" },
                { title: "选择建议", description: "简单工作流用 Zapier，复杂/高频工作流用 Make。两个都注册，按需切换。" },
              ],
            },
          ],
        },

        { type: "heading", text: "Zapier Account Setup", textCn: "Zapier 账号设置" },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细注册步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "访问 zapier.com", description: "点击 Sign Up → 用 Google 账号登录" },
                { title: "选择免费计划", description: "Free Plan 足够今天的练习使用" },
                { title: "熟悉界面", description: "首页 → My Zaps → 这是你所有自动化的管理面板" },
                { title: "测试连接", description: "点击 + Create → 试试搜索 Gmail、Slack、Google Sheets 等应用" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "确保 Fiona 用工作邮箱注册 Zapier——这样后续连接 Slack、Gmail 等工作工具更方便。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: 实战构建工作流
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: Build Real Workflows", textCn: "Part 2: 实战构建工作流", level: 2 },
        {
          type: "paragraph",
          textCn: "接下来一起构建3个真实的自动化工作流。每个工作流都解决一个具体的工作痛点。",
        },

        { type: "heading", text: "Workflow 1: Email → AI Summary → Notification", textCn: "工作流1: 邮件 → AI摘要 → 通知" },
        {
          type: "paragraph",
          textCn: "场景：每天收到大量工作邮件，没时间逐一细读。设置自动化：AI帮你读邮件、生成摘要、推送到 Slack/手机。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细构建步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "创建 Zap", description: "Zapier → + Create → New Zap" },
                { title: "设置触发器", description: "Trigger App: Gmail → Event: New Email → 连接 Gmail 账号 → 设置筛选条件（如：来自特定发件人/标签）" },
                { title: "添加 AI 步骤", description: "Action: ChatGPT (Zapier内置) → Prompt: 「请用3个bullet points总结以下邮件内容，并标注需要我回复还是仅需知晓：[邮件正文]」" },
                { title: "发送通知", description: "Action: Slack → Channel: #email-digest → Message: 包含发件人、主题、AI摘要" },
                { title: "测试运行", description: "点击 Test → 检查每一步的输出是否正确" },
                { title: "开启 Zap", description: "确认无误后打开自动化" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "邮件摘要 AI Prompt（在 Zapier 中使用）",
          text: "请用中文总结以下工作邮件，格式如下：\n\n📧 摘要：[一句话概述]\n📋 要点：\n• [要点1]\n• [要点2]\n• [要点3]\n⚡ 行动：[需要回复/仅需知晓/需要转发给某人]\n⏰ 紧急度：[高/中/低]\n\n邮件内容：\n{{body_plain}}",
        },
        {
          type: "image",
          src: "/screenshots/s4-zapier-email.png",
          alt: "Zapier 邮件摘要工作流",
          caption: "截图：邮件摘要自动化工作流（课堂截图替换）",
        },
        { type: "divider" },

        { type: "heading", text: "Workflow 2: Slack → AI Classification → Linear Issue", textCn: "工作流2: Slack消息 → AI分类 → 自动创建Issue" },
        {
          type: "paragraph",
          textCn: "场景：团队在 Slack 中反馈 Bug 和需求，但经常遗漏。设置自动化：AI自动判断消息类型，在 Linear 中创建对应的 Issue。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细构建步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "触发器: Slack", description: "Trigger: Slack → New Message in Channel → 选择 #product-feedback 或类似频道" },
                { title: "AI分类", description: "Action: ChatGPT → Prompt 如下方 → 输出分类结果" },
                { title: "条件分支", description: "Filter: 根据AI分类结果（bug/feature/question）进入不同分支" },
                { title: "创建Issue", description: "Action: Linear → Create Issue → Title 和 Description 从 AI 输出中提取 → Label 根据分类设置" },
                { title: "Slack回复", description: "Action: Slack → Reply in Thread → 回复确认消息：「✅ 已创建 Issue: [标题]」" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "Slack消息分类 AI Prompt",
          text: "请分析以下 Slack 消息，判断类型并提取关键信息：\n\n消息内容：{{message_text}}\n\n请输出 JSON 格式：\n{\n  \"type\": \"bug\" | \"feature\" | \"question\",\n  \"title\": \"简洁的标题（10字以内）\",\n  \"description\": \"详细描述\",\n  \"priority\": \"P0\" | \"P1\" | \"P2\",\n  \"suggested_label\": \"Frontend\" | \"Backend\" | \"Design\" | \"Other\"\n}",
        },
        {
          type: "tip",
          textCn: "这个工作流在实际PM工作中价值极高——再也不会有「Slack里说的那个Bug在哪？」的问题了。每条反馈自动变成可追踪的 Issue。",
        },
        { type: "divider" },

        { type: "heading", text: "Workflow 3: Weekly AI Report", textCn: "工作流3: AI 自动周报" },
        {
          type: "paragraph",
          textCn: "场景：每周五写周报是最让PM头疼的事情。设置自动化：AI汇总本周完成的任务，自动生成结构化周报。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细构建步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "触发器: 定时", description: "Trigger: Schedule → Every Week → Friday 4:00 PM" },
                { title: "获取任务列表", description: "Action: Linear → Find Issues → Filter: status=Done, updated this week" },
                { title: "AI生成周报", description: "Action: ChatGPT → 用下方 prompt 生成结构化周报" },
                { title: "发送周报", description: "Action: Gmail → Send Email → 发送给自己（或团队）" },
                { title: "Slack通知", description: "Action: Slack → Post → 在 #team 频道发布周报摘要" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "AI 周报生成 Prompt",
          text: "请根据以下本周完成的任务列表，生成一份专业的周报：\n\n完成的任务：\n{{tasks_list}}\n\n周报格式：\n# Weekly Report - [日期]\n\n## 本周完成\n[按项目/模块分组，用 bullet points 列出]\n\n## 关键成果\n[2-3个最重要的成果，量化描述]\n\n## 遇到的问题\n[如有]\n\n## 下周计划\n[根据当前进度推测]\n\n## 需要协助\n[如有]\n\n语气：专业简洁，避免流水账。突出影响和价值。",
        },
        {
          type: "tip",
          textCn: "让 Fiona 想想：如果每周五下午4点自动收到一份AI写好的周报草稿，她只需要花5分钟微调就能发出去——这就是自动化的魅力。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 部署展示页
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Deploy Automation Showcase", textCn: "Part 3: 部署自动化展示页", level: 2 },
        {
          type: "paragraph",
          textCn: "把今天构建的自动化工作流添加到个人网站的项目展示中，让别人看到你的自动化能力。",
        },
        {
          type: "prompt",
          label: "Claude Code: 添加自动化展示",
          text: "请在网站的 /projects 页面添加以下自动化项目卡片：\n\n1. 智能邮件摘要\n   - 描述：AI自动摘要工作邮件，推送到Slack\n   - 标签：Zapier, AI, Gmail, Slack\n   - 图标：Mail icon\n\n2. Slack反馈追踪\n   - 描述：AI分类Slack消息，自动创建Linear Issue\n   - 标签：Zapier, AI, Slack, Linear\n   - 图标：MessageSquare icon\n\n3. AI自动周报\n   - 描述：每周五自动汇总任务，生成结构化周报\n   - 标签：Zapier, AI, Linear, Gmail\n   - 图标：FileText icon\n\n在卡片上添加「Automation」标签，和其他项目区分。",
        },
        {
          type: "image",
          src: "/screenshots/s4-showcase-page.png",
          alt: "自动化展示页面",
          caption: "截图：添加自动化项目后的网站（课堂截图替换）",
        },
        { type: "divider" },

        // ── 总结 ──
        { type: "heading", text: "Wrap Up", textCn: "总结 · 回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天学到的核心内容：",
        },
        {
          type: "steps",
          items: [
            { title: "自动化思维", description: "触发器 → 动作 → 结果 — 任何重复性工作都可以自动化" },
            { title: "邮件摘要工作流", description: "AI读邮件、生成摘要、推送通知 — 每天节省30分钟" },
            { title: "Slack → Issue工作流", description: "反馈自动变任务 — 再也不遗漏" },
            { title: "AI周报工作流", description: "自动汇总 + AI润色 — 周五不再痛苦" },
          ],
        },
        {
          type: "paragraph",
          textCn: "核心认知：自动化的价值在于「设置一次，运行永远」。三个工作流每周合计可以节省 3-5 小时。",
        },
        {
          type: "paragraph",
          textCn: "下节课预告：我们将进入AI产品设计领域——用 v0.dev 和 Figma 快速生成产品原型，体验「从想法到高保真设计」只需30分钟。",
        },
      ],
      homework: [
        {
          id: "s4-hw1",
          title: "Run Workflows for 1 Week",
          titleCn: "运行工作流1周",
          description: "Let your automation workflows run and record actual results",
          descriptionCn: "让3个自动化工作流运行一整周，记录实际触发次数、成功率、节省时间",
          type: "practice",
        },
        {
          id: "s4-hw2",
          title: "Create New Automation",
          titleCn: "创建新自动化",
          description: "Design and build one new automation workflow on your own",
          descriptionCn: "针对自己工作中的一个重复性痛点，独立设计并构建一个新的自动化工作流",
          type: "project",
        },
        {
          id: "s4-hw3",
          title: "Share with Colleagues",
          titleCn: "邀请同事试用",
          description: "Invite colleagues to try your automation showcase page",
          descriptionCn: "把自动化展示页发给2-3个同事看，收集他们对「用AI自动化工作」的反馈",
          type: "project",
        },
      ],
    },
    // ─── Session 5 ───
    {
      id: "s5",
      sessionNumber: 5,
      week: 3,
      title: "AI Product Design (Part 1) - From Idea to Prototype",
      titleCn: "AI产品设计(上) - 从想法到原型",
      subtitle: "Generate high-fidelity UI prototypes with AI",
      subtitleCn: "用AI生成高保真UI原型 · 学习设计Prompt技巧",
      duration: "60分钟",
      objectives: [
        "Generate product UI prototypes with AI",
        "Learn design-specific prompt techniques",
        "Create 3-5 high-fidelity prototypes",
        "Deploy a prototype showcase page",
      ],
      objectivesCn: [
        "用AI生成产品UI原型",
        "学习设计Prompt技巧",
        "生成3-5个高保真原型",
        "部署展示页",
      ],
      toolIds: ["v0", "figma", "claude"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "检查自动化工作流运行一周的效果，分享 Fiona 独立创建的新自动化。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "自动化运行数据", description: "三个工作流运行了多少次？成功率如何？有没有出错的？" },
                { title: "节省时间估算", description: "Fiona 觉得一周下来大概节省了多少时间？" },
                { title: "独立创建的自动化", description: "她自己做了什么新自动化？遇到什么困难？" },
                { title: "同事反馈", description: "同事看了展示页后有什么反应？" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "今天开始进入第三周主题「AI产品设计」。课程节奏会从工具学习转向「创造力」——让 Fiona 感受到 AI 不仅能提效，还能帮你「想」和「设计」。",
        },
        {
          type: "paragraph",
          textCn: "今天的课程分三个部分：设计Prompt技巧 → 快速原型实战（3个产品）→ 部署展示页。30分钟后你会有3个AI生成的产品原型。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: 设计Prompt技巧
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: Design Prompt Techniques", textCn: "Part 1: 设计 Prompt 技巧", level: 2 },
        {
          type: "paragraph",
          textCn: "设计类 Prompt 和文字类 Prompt 不同——你需要「说出设计师的语言」。一个好的设计 Prompt 应该包含：风格参考、配色方案、内容结构、交互模式、响应式要求。",
        },

        { type: "heading", text: "Design Prompt Framework", textCn: "设计 Prompt 框架" },
        {
          type: "steps",
          items: [
            { title: "风格参考 (Style)", description: "像哪个产品？Linear/Notion/Stripe 的设计语言？现代简约还是丰富多彩？" },
            { title: "配色方案 (Colors)", description: "主色调、背景色、文字色、强调色。可以给具体色号或参考品牌。" },
            { title: "内容结构 (Layout)", description: "页面分几个区域？每个区域放什么内容？用「顶部-中间-底部」或「左侧栏-主内容」描述。" },
            { title: "组件细节 (Components)", description: "需要卡片？表格？图表？时间线？列表？具体说明每个组件的内容。" },
            { title: "交互要求 (Interaction)", description: "有动画吗？hover效果？点击行为？移动端怎么适配？" },
          ],
        },
        { type: "divider" },

        { type: "heading", text: "Good vs Bad Design Prompt", textCn: "好设计Prompt vs 差设计Prompt" },
        {
          type: "prompt",
          label: "差设计 Prompt",
          text: "帮我设计一个仪表板",
        },
        {
          type: "tip",
          textCn: "先让 Fiona 把这个差 Prompt 发给 v0.dev，看看输出结果——很可能是一个平庸的、没有个性的通用仪表板。",
        },
        {
          type: "prompt",
          label: "好设计 Prompt（5要素齐全）",
          text: "请为一个B2B SaaS产品设计一个数据概览仪表板页面：\n\n风格：现代简约，参考 Linear 和 Vercel 的设计语言。干净、专业、有呼吸感。\n配色：深色模式。背景 #0a0a0a，卡片 #1a1a1a，主色调 #8b5cf6（紫色），文字 #e5e5e5，次要文字 #737373。\n\n内容布局：\n- 顶部导航栏：Logo + 页面标题「Dashboard」+ 用户头像\n- 4个 KPI 卡片（一行排列）：\n  · 月收入 $48,200（+12.5% 绿色箭头）\n  · 活跃用户 2,847（+8.3%）\n  · 转化率 3.2%（-0.5% 红色箭头）\n  · NPS 72（+4）\n- 中间区域（两列）：\n  · 左侧：折线图「月度收入趋势」（过去6个月）\n  · 右侧：环形图「用户分布」（按套餐: Free/Pro/Enterprise）\n- 底部：「最近活动」列表（5条，含头像+操作描述+时间戳）\n\n交互：卡片 hover 有微妙的边框发光效果。\n响应式：桌面端优先，移动端 KPI 改为2x2网格，图表改为纵向排列。",
        },
        {
          type: "tip",
          textCn: "让 Fiona 对比两次输出的差异。好的设计 Prompt 生成的结果几乎可以直接用作产品原型——这就是「提示工程」在设计领域的威力。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: 快速原型实战
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: Rapid Prototyping Workshop", textCn: "Part 2: 快速原型实战", level: 2 },
        {
          type: "paragraph",
          textCn: "接下来用 v0.dev 连续生成3个产品原型。每个原型从 Prompt 到生成只需 5-8 分钟。Fiona 全程参与 Prompt 编写和迭代。",
        },

        { type: "heading", text: "Prototype 1: Analytics Dashboard", textCn: "原型1: 数据分析仪表板" },
        {
          type: "paragraph",
          textCn: "第一个原型就用刚才的好 Prompt 来生成。让 Fiona 在 v0.dev 上操作，体验从 Prompt 到原型的完整流程。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 v0.dev", description: "浏览器访问 v0.dev → 开始新对话" },
                { title: "粘贴 Prompt", description: "将上面的好设计 Prompt 粘贴到输入框" },
                { title: "等待生成", description: "v0 会在 30-60 秒内生成完整的仪表板预览" },
                { title: "预览评估", description: "和 Fiona 一起评估：配色对不对？布局合理吗？数据展示清晰吗？" },
                { title: "迭代调整", description: "用追加 Prompt 修改细节，如「把折线图改为面积图」「卡片增加sparkline小图」" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "v0 迭代调整示例",
          text: "请做以下调整：\n1. KPI 卡片添加 sparkline 迷你折线图\n2. 把「最近活动」列表的时间改为相对时间（如「5分钟前」）\n3. 在顶部导航栏右侧添加一个通知铃铛图标\n4. 折线图改为面积图，增加渐变填充效果",
        },
        {
          type: "image",
          src: "/screenshots/s5-dashboard-prototype.png",
          alt: "仪表板原型",
          caption: "截图：v0 生成的仪表板原型（课堂截图替换）",
        },
        { type: "divider" },

        { type: "heading", text: "Prototype 2: Mobile App Screen", textCn: "原型2: 移动端App界面" },
        {
          type: "paragraph",
          textCn: "第二个原型：为一个移动端产品概念设计主界面。让 Fiona 选择一个她感兴趣的App方向。",
        },
        {
          type: "collapsible",
          title: "App Concept Options",
          titleCn: "App 方向选择",
          content: [
            {
              type: "steps",
              items: [
                { title: "选项A: 健康追踪 App", description: "追踪饮水、运动、睡眠，带有每日报告和趋势图" },
                { title: "选项B: 阅读清单 App", description: "管理想读的书、正在读的书、读书笔记，带AI推荐" },
                { title: "选项C: 团队心情日历", description: "团队成员每日填写心情emoji，管理者看到团队情绪趋势" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "移动端 App 设计 Prompt（以健康追踪为例）",
          text: "请设计一个健康追踪 App 的主界面（移动端），iPhone 15 尺寸：\n\n风格：圆润、友好、色彩鲜明。参考 Apple Health 和 Calm App 的设计感。\n配色：浅色背景 #f8f9fa，主色 #10b981（绿色），强调色 #6366f1（紫色），温暖渐变。\n\n布局（从上到下）：\n- 顶部：「Good morning, Fiona」问候语 + 日期 + 头像\n- 今日概览环形进度：饮水（6/8杯）、运动（35/60分钟）、睡眠（7.5h）\n- 快捷操作按钮行：记饮水 / 开始运动 / 记饮食\n- 本周趋势：小型柱状图显示7天的运动分钟数\n- 底部导航：Home / Stats / Social / Profile\n\n圆角卡片设计，带有微妙的阴影。",
        },
        {
          type: "image",
          src: "/screenshots/s5-mobile-prototype.png",
          alt: "移动端App原型",
          caption: "截图：v0 生成的移动端 App 设计（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "让 Fiona 主导迭代：「你觉得哪里要改？」她说出来，你帮她组织成追加 Prompt。培养她的「设计语言」表达能力。",
        },
        { type: "divider" },

        { type: "heading", text: "Prototype 3: Landing Page", textCn: "原型3: 产品落地页" },
        {
          type: "paragraph",
          textCn: "第三个原型：为一个虚拟产品设计 Landing Page。这也是PM日常工作中最常需要的设计——新功能/新产品的宣传页。",
        },
        {
          type: "prompt",
          label: "Landing Page 设计 Prompt",
          text: "请设计一个AI写作助手产品的 Landing Page：\n\n产品名称：WriteFlow AI\n定位：帮助专业人士用AI写出更好的工作文档\n\n风格：参考 Notion AI 和 Jasper 的 Landing Page。干净、专业、有科技感。\n配色：纯白背景，深灰文字，渐变蓝紫色主色调（#2563eb → #7c3aed）。\n\n页面结构：\n1. Hero：大标题「Write Better. Ship Faster.」+ 副标题 + CTA按钮「Start Free Trial」+ 产品截图\n2. Logo Wall：「Trusted by teams at」+ 6个公司 Logo 占位\n3. 三大卖点（三列卡片）：\n   · AI起草：从大纲到完整文档，30秒完成\n   · 智能润色：一键改善语气、清晰度、专业度\n   · 团队协作：实时共享、评论、版本管理\n4. 功能演示：左文右图交替布局，展示3个核心功能\n5. 定价：三档（Free/Pro $19/Team $49）\n6. CTA：「Ready to write better?」+ 注册表单\n7. Footer\n\n加入微妙的滚动动画提示。",
        },
        {
          type: "image",
          src: "/screenshots/s5-landing-prototype.png",
          alt: "Landing Page原型",
          caption: "截图：v0 生成的Landing Page设计（课堂截图替换）",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 部署展示页
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Deploy Prototype Showcase", textCn: "Part 3: 部署原型展示", level: 2 },
        {
          type: "paragraph",
          textCn: "把今天生成的3个原型添加到个人网站的项目展示中。",
        },
        {
          type: "prompt",
          label: "Claude Code: 添加原型展示",
          text: "请在网站的 /projects 页面添加以下设计原型项目卡片：\n\n1. Analytics Dashboard\n   - 描述：用AI生成的B2B SaaS数据仪表板设计\n   - 标签：v0.dev, UI Design, Dark Mode\n   - 加截图（使用v0生成的截图路径）\n\n2. Health Tracker App\n   - 描述：移动端健康追踪App界面设计\n   - 标签：v0.dev, Mobile, App Design\n\n3. WriteFlow Landing Page\n   - 描述：AI写作助手产品的完整Landing Page\n   - 标签：v0.dev, Landing Page, Marketing\n\n每个卡片添加「AI Design」标签。如果有v0的预览链接，加上「Live Preview」按钮。",
        },
        {
          type: "tip",
          textCn: "提醒 Fiona：「今天30分钟内你做了3个产品原型。传统方式可能需要设计师3天。这就是AI设计的效率提升。」",
        },
        { type: "divider" },

        // ── 总结 ──
        { type: "heading", text: "Wrap Up", textCn: "总结 · 回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天学到的核心内容：",
        },
        {
          type: "steps",
          items: [
            { title: "设计 Prompt 框架", description: "风格 + 配色 + 布局 + 组件 + 交互 = 专业级设计输出" },
            { title: "快速原型", description: "30分钟内完成3个产品原型 — 从想法到可视化" },
            { title: "迭代思维", description: "第一版不完美没关系，追加 Prompt 快速迭代才是关键" },
            { title: "作品积累", description: "每个原型都是你作品集的一部分——展示你的产品设计能力" },
          ],
        },
        {
          type: "paragraph",
          textCn: "下节课预告：我们将在今天原型的基础上，用AI迭代撰写完整的PRD文档，用 NotebookLM 做竞品分析，最后录制一段5分钟的产品路演视频。",
        },
      ],
      homework: [
        {
          id: "s5-hw1",
          title: "Create New Design Prompt",
          titleCn: "创建设计Prompt",
          description: "Write a new product design prompt and generate prototypes",
          descriptionCn: "选择一个你感兴趣的产品方向（社交/效率/教育/电商），用设计 Prompt 框架在 v0.dev 生成原型，至少迭代2次",
          type: "practice",
        },
        {
          id: "s5-hw2",
          title: "Collect Feedback",
          titleCn: "收集反馈",
          description: "Gather 3-5 pieces of feedback from friends on your prototypes",
          descriptionCn: "把今天做的3个原型截图发给 3-5 个朋友/同事，收集他们的设计反馈（哪里好？哪里可以改进？）",
          type: "project",
        },
        {
          id: "s5-hw3",
          title: "Iterate Based on Feedback",
          titleCn: "根据反馈迭代",
          description: "Iterate at least 2 improvements based on collected feedback",
          descriptionCn: "根据反馈在 v0.dev 中迭代至少2处改进，截图记录Before/After对比",
          type: "practice",
        },
      ],
    },
    // ─── Session 6 ───
    {
      id: "s6",
      sessionNumber: 6,
      week: 3,
      title: "AI Product Design (Part 2) - PRD to Competitive Analysis",
      titleCn: "AI产品设计(下) - PRD到竞品分析",
      subtitle: "Write PRDs iteratively, analyze competitors, and record a pitch",
      subtitleCn: "迭代式PRD撰写 · 竞品分析 · 录制路演",
      duration: "60分钟",
      objectives: [
        "Write PRDs iteratively with AI",
        "Conduct competitive analysis with NotebookLM",
        "Generate Audio Overview podcasts",
        "Record a 5-minute pitch video",
      ],
      objectivesCn: [
        "迭代式PRD撰写",
        "用NotebookLM进行竞品分析",
        "生成Audio Overview播客",
        "录制5分钟路演",
      ],
      toolIds: ["claude", "notebooklm", "figma"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾上节课的设计原型作业，分享 Fiona 收集到的反馈和迭代成果。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "新原型设计", description: "Fiona 独立创建了什么产品原型？用了什么设计 Prompt 技巧？" },
                { title: "反馈收集", description: "朋友/同事给了什么反馈？最正面和最有建设性的意见是什么？" },
                { title: "迭代对比", description: "Based on feedback 做了哪些改进？Before/After 截图对比。" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          textCn: "今天是产品设计的下半场。上节课我们做了「外观」（原型），今天我们做「内核」（PRD + 竞品分析 + 路演）。课程分三个部分：AI写PRD → NotebookLM竞品分析 → 录制路演视频。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: 迭代式PRD撰写
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: Iterative PRD Writing with AI", textCn: "Part 1: 用AI迭代式撰写PRD", level: 2 },
        {
          type: "paragraph",
          textCn: "写PRD不是一蹴而就的——优秀的PM都是通过迭代打磨PRD。AI让迭代速度快了10倍。我们的方法：先出草稿 → 逐章审查 → 多轮优化 → 最终版本。",
        },

        { type: "heading", text: "Step 1: Generate Draft PRD", textCn: "Step 1: 生成PRD草稿" },
        {
          type: "paragraph",
          textCn: "选择上节课设计的其中一个产品（仪表板/App/Landing Page），为它撰写完整PRD。",
        },
        {
          type: "prompt",
          label: "PRD 草稿生成 Prompt",
          text: "你是一名有8年经验的资深产品经理，服务过 B2B SaaS 产品。\n\n请帮我撰写一份完整的PRD，产品如下：\n\n产品名称：WriteFlow AI\n目标用户：科技公司的PM、运营、市场团队（日常需要写大量文档）\n核心问题：写文档耗时长、质量不稳定、格式不统一\n竞品参考：Notion AI、Jasper、Grammarly Business\n\n请包含以下章节：\n1. 产品概述（愿景、目标、核心价值主张）\n2. 目标用户画像（2-3个 Persona）\n3. 用户故事（5个核心 User Story，用 As a... I want to... So that... 格式）\n4. 功能需求（分 P0/P1/P2 三个优先级）\n5. 非功能需求（性能、安全、可扩展性）\n6. 成功指标（KPIs + 目标值）\n7. 时间线建议（3个月 MVP 路线图）\n8. 风险与缓解措施\n\n用中文撰写，格式清晰专业。",
        },
        {
          type: "tip",
          textCn: "让 Fiona 用自己熟悉的产品替换 WriteFlow AI——如果她工作中正在做某个功能，用那个做素材效果更好。",
        },
        { type: "divider" },

        { type: "heading", text: "Step 2: Review & Iterate", textCn: "Step 2: 逐章审查 + 迭代" },
        {
          type: "paragraph",
          textCn: "拿到草稿后，和 Fiona 一起逐章审查。用追加 Prompt 让AI优化每个章节。",
        },
        {
          type: "collapsible",
          title: "Review Checklist",
          titleCn: "PRD 审查清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "产品概述", description: "愿景是否清晰？价值主张是否有说服力？一句话能说清这个产品是什么吗？" },
                { title: "用户画像", description: "Persona 是否具体真实？痛点是否来自真实场景？" },
                { title: "用户故事", description: "User Story 是否覆盖了核心流程？是否缺少边缘场景？" },
                { title: "功能需求", description: "P0功能是否足够组成MVP？P2功能是否真的可以延后？" },
                { title: "成功指标", description: "KPI目标值是否可衡量？是否有基线数据？" },
                { title: "风险评估", description: "是否遗漏了技术风险或市场风险？" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "PRD 迭代 Prompt（针对单个章节）",
          text: "请优化 PRD 中「用户故事」章节：\n\n当前版本：\n[粘贴当前的用户故事]\n\n优化要求：\n1. 每个 User Story 添加 Acceptance Criteria（验收标准）\n2. 补充 2 个边缘场景的 User Story（如：离线使用、批量操作）\n3. 按使用频率排序（最常用的排前面）\n4. 每个 Story 估算 Story Points（1/2/3/5/8）",
        },
        {
          type: "prompt",
          label: "PRD 整体打磨 Prompt",
          text: "请以技术总监的视角审查这份 PRD，指出：\n\n[粘贴完整 PRD]\n\n1. 哪些地方描述不够清晰，开发团队可能会有疑问？\n2. 有没有遗漏的功能依赖或技术约束？\n3. 时间线是否合理？有哪些风险点？\n4. 建议补充的章节或细节？\n\n请按「问题 → 建议 → 修改后的文字」格式输出。",
        },
        {
          type: "tip",
          textCn: "关键：让 Fiona 体会到 AI 不是一次生成完美的 PRD，而是帮你「快速迭代」。好的 PM 知道什么时候接受AI的建议，什么时候用自己的判断覆盖。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: NotebookLM 竞品分析
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: Competitive Analysis with NotebookLM", textCn: "Part 2: 用 NotebookLM 做竞品分析", level: 2 },
        {
          type: "paragraph",
          textCn: "NotebookLM 的超能力：你把竞品的文档/网页/视频丢进去，它帮你做深度分析。我们要做一份「WriteFlow AI vs 竞品」的分析报告。",
        },

        { type: "heading", text: "Step 1: Collect Competitor Sources", textCn: "Step 1: 收集竞品资料" },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "打开 NotebookLM", description: "访问 notebooklm.google.com → 创建新 Notebook → 命名「WriteFlow 竞品分析」" },
                { title: "添加 Notion AI 资料", description: "Add Source → Website → 粘贴 Notion AI 的产品页面 URL" },
                { title: "添加 Jasper 资料", description: "Add Source → Website → 粘贴 Jasper 的功能介绍页面 URL" },
                { title: "添加 Grammarly 资料", description: "Add Source → Website → 粘贴 Grammarly Business 页面 URL" },
                { title: "添加行业报告", description: "（可选）上传 PDF 格式的 AI 写作工具市场报告" },
              ],
            },
          ],
        },

        { type: "heading", text: "Step 2: AI Deep Analysis", textCn: "Step 2: AI 深度分析" },
        {
          type: "paragraph",
          textCn: "所有资料上传后，在 NotebookLM 的聊天框中提问，获取深度分析。",
        },
        {
          type: "prompt",
          label: "NotebookLM 竞品分析 Prompt 1",
          text: "请对比分析这几个竞品的定价策略、核心功能差异和目标用户差异。用表格形式呈现。",
        },
        {
          type: "prompt",
          label: "NotebookLM 竞品分析 Prompt 2",
          text: "基于这些竞品的分析，识别市场中的空白机会（unmet needs）。如果我要做一个新的 AI 写作工具，应该在哪些方面做差异化？",
        },
        {
          type: "prompt",
          label: "NotebookLM 竞品分析 Prompt 3",
          text: "总结这些竞品各自的核心优势和最大弱点。一个新进入者可以利用哪些弱点？",
        },
        { type: "divider" },

        { type: "heading", text: "Step 3: Generate Audio Overview", textCn: "Step 3: 生成 Audio Overview 播客" },
        {
          type: "paragraph",
          textCn: "用 NotebookLM 的 Audio Overview 功能，把竞品分析变成一段生动的两人对话播客。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          content: [
            {
              type: "steps",
              items: [
                { title: "点击 Notebook Guide", description: "在 NotebookLM 右上角找到 Notebook Guide" },
                { title: "选择 Audio Overview", description: "点击 Audio Overview → Generate" },
                { title: "等待生成", description: "AI 需要 2-5 分钟生成播客音频" },
                { title: "一起收听", description: "和 Fiona 一起播放，听 AI 如何讨论竞品格局" },
              ],
            },
          ],
        },
        {
          type: "image",
          src: "/screenshots/s6-notebooklm-analysis.png",
          alt: "NotebookLM 竞品分析",
          caption: "截图：NotebookLM 竞品分析结果（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "Audio Overview 可以分享给团队——想象一下，你把一份枯燥的竞品报告变成了一段「两个分析师聊天」的播客，团队成员在通勤路上就能听完。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 录制路演
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Record Your Product Pitch", textCn: "Part 3: 录制产品路演", level: 2 },
        {
          type: "paragraph",
          textCn: "把前两节课的成果（原型 + PRD + 竞品分析）整合成一个5分钟的产品路演视频。这是PM的核心能力之一。",
        },

        { type: "heading", text: "Pitch Script Preparation", textCn: "路演脚本准备" },
        {
          type: "prompt",
          label: "AI 路演脚本生成",
          text: "请根据以下产品资料，帮我写一个5分钟的产品路演脚本：\n\n产品名称：WriteFlow AI\nPRD摘要：[粘贴 PRD 的产品概述部分]\n竞品分析结论：[粘贴 NotebookLM 的关键发现]\n\n脚本结构：\n1. 开场 Hook（30秒）：用一个痛点故事开场\n2. 问题定义（60秒）：目标用户面临什么问题？市场有多大？\n3. 解决方案（90秒）：WriteFlow AI 如何解决？展示原型截图\n4. 差异化（60秒）：vs 竞品，我们的独特优势是什么？\n5. 商业模式（30秒）：如何赚钱？定价策略\n6. 收尾 CTA（30秒）：下一步行动\n\n语气：自信、清晰、有感染力。用中文撰写。\n标注每段的时间和需要展示的屏幕截图。",
        },
        {
          type: "collapsible",
          title: "Recording Tips",
          titleCn: "录制小贴士",
          content: [
            {
              type: "steps",
              items: [
                { title: "环境准备", description: "安静的环境、良好的光线、整洁的背景。使用耳机避免回声。" },
                { title: "录制工具", description: "用 Zoom 录制（共享屏幕 + 摄像头）或 Loom（更简单）" },
                { title: "不求完美", description: "第一次录制不会完美——重要的是内容和逻辑。可以录2-3次选最好的。" },
                { title: "展示原型", description: "在讲解决方案时，切换到 v0.dev 的原型预览画面" },
                { title: "时间控制", description: "严格控制在5分钟内。设个计时器在旁边。" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "录制前先让 Fiona 读一遍脚本，口头过一遍。不需要背——看着提词器读也完全可以。关键是练习「用嘴说出产品的故事」。",
        },
        { type: "divider" },

        // ── 总结 ──
        { type: "heading", text: "Wrap Up", textCn: "总结 · 回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天学到的核心内容：",
        },
        {
          type: "steps",
          items: [
            { title: "迭代式PRD", description: "AI帮你快速出草稿 → 逐章审查 → 多轮迭代 → 比手写快5-10倍" },
            { title: "NotebookLM竞品分析", description: "上传竞品资料 → AI深度分析 → 生成播客 — 把2天的调研压缩到30分钟" },
            { title: "产品路演", description: "AI写脚本 → 准备素材 → 5分钟视频 — 展示你的产品思维" },
          ],
        },
        {
          type: "paragraph",
          textCn: "第三周总结：我们完成了一个从「想法 → 原型 → PRD → 竞品分析 → 路演」的完整产品设计流程，全程用AI加速。这就是AI时代PM的工作方式。",
        },
        {
          type: "paragraph",
          textCn: "下节课预告：我们进入第四周——AI Agent。你将学习如何设计让AI自主完成多步骤任务的「Agent 工作流」，这是AI最前沿的应用方式。",
        },
      ],
      homework: [
        {
          id: "s6-hw1",
          title: "Iterate PRD",
          titleCn: "迭代PRD",
          description: "Complete one more iteration of your PRD",
          descriptionCn: "用「技术总监审查」Prompt 再做一轮 PRD 迭代，修复所有AI指出的问题，生成最终版本",
          type: "practice",
        },
        {
          id: "s6-hw2",
          title: "Analyze Competitor",
          titleCn: "分析竞品",
          description: "Use NotebookLM to analyze one new competitor",
          descriptionCn: "在 NotebookLM 中添加 1-2 个新竞品资料，更新分析报告。生成一段新的 Audio Overview 播客",
          type: "practice",
        },
        {
          id: "s6-hw3",
          title: "Share Pitch Video",
          titleCn: "分享路演视频",
          description: "Share your pitch video with 3-5 colleagues and collect feedback",
          descriptionCn: "把路演视频发给 3-5 个同事/朋友，收集反馈。记录他们觉得最有说服力和最需要改进的部分",
          type: "project",
        },
      ],
    },
    // ─── Session 7 ───
    {
      id: "s7",
      sessionNumber: 7,
      week: 4,
      title: "AI Agent - Let AI Work for You",
      titleCn: "AI Agent - 让AI替你工作",
      subtitle: "Design multi-step AI agents and build complete workflows",
      subtitleCn: "多步骤AI Agent设计 · 完整工作流构建",
      duration: "60分钟",
      objectives: [
        "Learn multi-step AI Agent design",
        "Build complete Agent workflows with n8n/Zapier",
        "Explore industry-specific applications",
        "Deploy agent demo page",
      ],
      objectivesCn: [
        "学习多步骤AI Agent设计",
        "用n8n/Zapier构建完整Agent工作流",
        "探讨FSO/审计行业应用",
        "部署演示页",
      ],
      toolIds: ["n8n", "zapier", "claude"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾第三周的成果——路演视频和竞品分析。进入第四周的最终冲刺阶段。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "PRD 最终版", description: "经过「技术总监审查」迭代后，PRD 质量提升了多少？" },
                { title: "竞品分析更新", description: "新增了哪些竞品资料？Audio Overview 生成效果如何？" },
                { title: "路演视频反馈", description: "同事/朋友看后的反馈是什么？最有价值的建议？" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          textCn: "今天我们进入AI最前沿的领域——AI Agent。这不再是「你给AI一个指令，AI回一个答案」，而是「你给AI一个目标，AI自己规划步骤、调用工具、完成任务」。课程分三个部分：理解Agent → 构建Agent → 行业应用。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: 理解AI Agent
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: Understanding AI Agents", textCn: "Part 1: 理解 AI Agent", level: 2 },
        {
          type: "paragraph",
          textCn: "AI Agent 不只是聊天机器人——它可以规划、使用工具、做决策、自主执行多步骤任务。把它想象成一个「虚拟实习生」：你告诉它目标，它自己想办法完成。",
        },

        { type: "heading", text: "Chatbot vs Agent", textCn: "聊天机器人 vs Agent" },
        {
          type: "collapsible",
          title: "Comparison",
          titleCn: "对比详解",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "聊天机器人 (Chatbot)", description: "你问一句 → AI答一句。没有记忆，不会主动行动，不能调用外部工具。像一个「百科全书」。" },
                { title: "AI Agent", description: "你给一个目标 → AI自己拆分步骤 → 调用搜索/数据库/API等工具 → 根据中间结果做决策 → 自主完成整个任务。像一个「实习生」。" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          textCn: "Agent 的四大能力：",
        },
        {
          type: "steps",
          items: [
            { title: "规划 (Planning)", description: "把大目标拆成小步骤，决定执行顺序" },
            { title: "工具使用 (Tool Use)", description: "调用搜索引擎、数据库、API、发邮件等外部工具" },
            { title: "决策 (Decision Making)", description: "根据中间结果决定下一步行动。如：「如果搜索结果不够，换一个关键词再搜」" },
            { title: "记忆 (Memory)", description: "记住之前的结果，在后续步骤中使用" },
          ],
        },
        {
          type: "tip",
          textCn: "用一个生活类比帮 Fiona 理解：ChatGPT像问路人「去图书馆怎么走？」——他告诉你路线。Agent像让实习生「去图书馆帮我借三本关于AI的书」——他自己去找路、找书、借书、带回来。",
        },
        { type: "divider" },

        { type: "heading", text: "Real-World Agent Examples", textCn: "现实中的 Agent 案例" },
        {
          type: "paragraph",
          textCn: "这些不是科幻——是今天已经在用的 Agent 场景：",
        },
        {
          type: "steps",
          items: [
            { title: "客服 Agent", description: "收到客户邮件 → AI判断问题类型 → 查询订单系统 → 如果是退货请求自动生成退货单 → 如果是技术问题转给工程师 → 发送确认邮件" },
            { title: "数据分析 Agent", description: "PM提出问题「上周用户留存率为什么下降」→ Agent 查数据库 → 做分析 → 生成图表 → 给出3个可能原因 → 建议3个行动方案" },
            { title: "内容生成 Agent", description: "输入一个话题 → Agent 搜索最新资讯 → 整理素材 → 写初稿 → 检查语法 → 生成多平台版本（LinkedIn/Twitter/公众号）" },
          ],
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: 构建 Agent
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: Build Your First Agent", textCn: "Part 2: 构建你的第一个 Agent", level: 2 },
        {
          type: "paragraph",
          textCn: "我们用 n8n（开源自动化平台）构建一个真实的 AI Agent 工作流。n8n 的可视化界面让你像画流程图一样设计 Agent，无需写代码。",
        },

        { type: "heading", text: "n8n Setup", textCn: "n8n 环境准备" },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细设置步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "注册 n8n Cloud", description: "访问 n8n.io → Start for Free → 用邮箱注册" },
                { title: "创建工作流", description: "进入 Dashboard → + New Workflow → 命名「智能客户反馈 Agent」" },
                { title: "熟悉界面", description: "左侧是节点面板（搜索可用的 App 和工具），中间是画布（拖拽连线），右侧是节点配置" },
              ],
            },
          ],
        },
        { type: "divider" },

        { type: "heading", text: "Agent Project: Smart Feedback Processor", textCn: "Agent 项目：智能反馈处理器" },
        {
          type: "paragraph",
          textCn: "我们要构建的 Agent：当 Google Form 收到客户反馈时 → AI分析情绪和问题类型 → 根据类型做不同处理 → 自动回复确认邮件。",
        },
        {
          type: "collapsible",
          title: "Build Steps",
          titleCn: "逐步构建过程",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "添加触发节点", description: "搜索 Google Forms → 选择「New Form Response」→ 连接你的 Google 账号" },
                { title: "添加 AI 分析节点", description: "搜索 OpenAI / Claude → 选择 Chat Message → 设置 Prompt（见下方）" },
                { title: "添加条件分支", description: "搜索 IF → 根据AI分析结果（sentiment 和 type）分成3个分支" },
                { title: "分支1: 紧急Bug", description: "如果 type=bug 且 sentiment=negative → 创建 Linear Issue（P0）→ Slack 通知工程团队" },
                { title: "分支2: 功能建议", description: "如果 type=feature → 创建 Linear Issue（P2）→ 添加到「Feature Requests」项目" },
                { title: "分支3: 表扬/一般反馈", description: "如果 type=praise 或 type=general → 记录到 Google Sheet" },
                { title: "添加回复节点", description: "所有分支最后都发一封自动确认邮件给客户" },
                { title: "测试运行", description: "在 Google Form 中提交测试反馈，检查整个流程是否正确" },
              ],
            },
          ],
        },
        {
          type: "prompt",
          label: "Agent AI 分析节点 Prompt",
          text: "你是一名客户体验分析师。请分析以下客户反馈：\n\n客户反馈：{{feedback_text}}\n客户邮箱：{{email}}\n提交时间：{{timestamp}}\n\n请输出 JSON 格式：\n{\n  \"sentiment\": \"positive\" | \"neutral\" | \"negative\",\n  \"type\": \"bug\" | \"feature\" | \"praise\" | \"general\",\n  \"urgency\": \"high\" | \"medium\" | \"low\",\n  \"summary\": \"一句话总结\",\n  \"suggested_response\": \"建议的回复内容（礼貌、专业、有同理心）\",\n  \"category\": \"UI\" | \"Performance\" | \"Billing\" | \"Other\"\n}",
        },
        {
          type: "image",
          src: "/screenshots/s7-n8n-workflow.png",
          alt: "n8n Agent 工作流",
          caption: "截图：n8n 中的 Agent 工作流画布（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "构建过程中让 Fiona 参与决策：「负面情绪+Bug应该通知谁？」「功能建议要不要自动创建Issue还是只记录？」——培养她的 Agent 设计思维。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 行业应用
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Industry Applications", textCn: "Part 3: 行业应用探讨", level: 2 },
        {
          type: "paragraph",
          textCn: "根据 Fiona 在 Big 4 / FSO（金融服务）的背景，探讨 AI Agent 在她的行业中的应用场景。",
        },

        { type: "heading", text: "FSO / Consulting Scenarios", textCn: "金融服务 / 咨询行业场景" },
        {
          type: "steps",
          items: [
            { title: "审计报告 Agent", description: "输入原始数据 → AI 识别异常交易 → 生成审计发现清单 → 自动起草初步报告 → 标注需要人工审核的项目" },
            { title: "合规检查 Agent", description: "新政策发布 → Agent 读取政策文本 → 与公司现有流程对比 → 识别不合规项 → 生成整改建议清单" },
            { title: "客户提案 Agent", description: "输入客户背景和需求 → 搜索相似案例 → 生成提案大纲 → 填充数据和图表 → 输出可编辑的 PPT 初稿" },
            { title: "知识管理 Agent", description: "项目结束时自动提取 Lessons Learned → 打标签 → 存入知识库 → 当新项目启动时自动推荐相关经验" },
          ],
        },
        {
          type: "prompt",
          label: "行业应用头脑风暴 Prompt",
          text: "你是一名资深管理咨询师，专注于金融服务行业的数字化转型。\n\n请根据以下角色，设计3个具体的 AI Agent 应用场景：\n\n角色：Big 4 咨询公司的 Tech PM，主要服务银行和保险客户\n\n每个场景请描述：\n1. 触发条件（什么情况下启动 Agent）\n2. Agent 的具体步骤（5-7步）\n3. 需要连接的工具/系统\n4. 预估节省的时间（对比人工）\n5. 实施难度（低/中/高）\n6. 数据安全注意事项",
        },
        {
          type: "tip",
          textCn: "这个环节让 Fiona 结合自己的真实工作思考——她工作中哪些流程可以用 Agent 替代？哪些步骤AI可以自主完成？",
        },
        { type: "divider" },

        { type: "heading", text: "Deploy Agent Demo Page", textCn: "部署 Agent 演示页面" },
        {
          type: "prompt",
          label: "Claude Code: 添加 Agent 项目卡片",
          text: "请在网站 /projects 页面添加以下 Agent 项目：\n\n1. 智能反馈处理 Agent\n   - 描述：自动分析客户反馈情绪和类型，智能分流处理并自动回复\n   - 标签：n8n, AI Agent, Automation\n   - 流程图：Feedback → AI Analysis → Smart Routing → Auto Reply\n\n2. 行业应用概念（标记为 Concept）\n   - 列出3个 FSO 行业 Agent 概念\n   - 标签：AI Agent, FSO, Consulting\n\n在卡片上添加「AI Agent」标签。",
        },
        { type: "divider" },

        // ── 总结 ──
        { type: "heading", text: "Wrap Up", textCn: "总结 · 回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天学到的核心内容：",
        },
        {
          type: "steps",
          items: [
            { title: "Agent vs Chatbot", description: "Agent 能规划、使用工具、做决策、自主完成多步骤任务" },
            { title: "Agent 四大能力", description: "规划 + 工具使用 + 决策 + 记忆" },
            { title: "n8n 构建", description: "用可视化工具构建了一个真实的客户反馈处理 Agent" },
            { title: "行业应用", description: "识别了 FSO/咨询行业中至少3个 Agent 应用场景" },
          ],
        },
        {
          type: "paragraph",
          textCn: "核心认知：Agent 是AI的未来方向。今天我们掌握了思维方式和基础工具——随着AI模型越来越强，Agent 能做的事情会越来越多。",
        },
        {
          type: "paragraph",
          textCn: "下节课预告：毕业典礼！我们将回顾4周的学习旅程，展示你的完整作品集网站，生成你的个人 AI Playbook，并领取毕业证书。",
        },
      ],
      homework: [
        {
          id: "s7-hw1",
          title: "Optimize Agent",
          titleCn: "优化Agent",
          description: "Add new tools or decision logic to today's agent",
          descriptionCn: "给今天构建的 Agent 添加新功能：加入一个新的分支逻辑（如：识别到重复反馈自动合并），或连接一个新工具",
          type: "practice",
        },
        {
          id: "s7-hw2",
          title: "Collect Feedback",
          titleCn: "收集反馈",
          description: "Get 2-3 colleague feedback on your agent demo",
          descriptionCn: "让 2-3 个同事实际使用你的 Agent（提交测试反馈），收集他们对 Agent 处理结果的评价",
          type: "project",
        },
        {
          id: "s7-hw3",
          title: "Evaluate ROI",
          titleCn: "评估ROI",
          description: "Estimate hours saved if the agent were deployed in production",
          descriptionCn: "写一份简短的 ROI 分析：如果这个 Agent 在你的团队正式使用，每周能节省多少人工小时？一年下来的价值是多少？",
          type: "reflection",
        },
      ],
    },
    // ─── Session 8 ───
    {
      id: "s8",
      sessionNumber: 8,
      week: 4,
      title: "AI Data Insights & Executive Reporting",
      titleCn: "AI数据洞察与高管汇报",
      subtitle: "Use AI to analyze data, generate visualizations, and craft executive-level reports",
      subtitleCn: "用AI分析数据 · 生成可视化 · 撰写高管级报告",
      duration: "60分钟",
      objectives: [
        "Use AI to analyze spreadsheet and business data",
        "Generate professional charts and data visualizations",
        "Craft executive summaries and board-level reports with AI",
        "Build a reusable data analysis workflow",
      ],
      objectivesCn: [
        "用AI分析表格和业务数据",
        "生成专业图表和数据可视化",
        "用AI撰写高管摘要和Board级别报告",
        "建立可复用的数据分析工作流",
      ],
      toolIds: ["claude", "chatgpt", "notebooklm"],
      content: [
        // ── 开场 ──
        { type: "heading", text: "Opening + Homework Review", textCn: "开场 · 作业回顾", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾上节课 Agent 的作业成果，然后进入今天的全新主题。",
        },
        {
          type: "collapsible",
          title: "Homework Review Checklist",
          titleCn: "作业回顾清单",
          content: [
            {
              type: "steps",
              items: [
                { title: "Agent 优化", description: "Fiona 给 Agent 添加了什么新功能？效果如何？" },
                { title: "同事使用体验", description: "同事们实际使用 Agent 后的反馈——惊喜？建议？" },
                { title: "ROI 分析", description: "估算出来的每周/每年节省时间和价值是多少？" },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          textCn: "今天我们学一个PM每周都会用到的核心技能——用AI做数据分析和高管汇报。课程分四个部分：AI读数据 → AI做图表 → AI写报告 → 搭建你的分析工作流。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 1: AI 数据分析
        // ══════════════════════════════════════
        { type: "heading", text: "Part 1: AI-Powered Data Analysis", textCn: "Part 1: AI 数据分析", level: 2 },
        {
          type: "paragraph",
          textCn: "PM 不一定要精通 SQL 或 Excel 公式——你只需要会「提问」。AI 可以直接阅读表格数据，帮你做分析、找趋势、发现异常。",
        },

        { type: "heading", text: "Demo 1: Upload Data to Claude", textCn: "Demo 1: 让 Claude 读懂你的数据" },
        {
          type: "paragraph",
          textCn: "Claude 可以直接读取 CSV/Excel 文件。我们上传一份示例业务数据，让 AI 帮我们做深度分析。",
        },
        {
          type: "collapsible",
          title: "Detailed Steps",
          titleCn: "详细操作步骤",
          defaultOpen: true,
          content: [
            {
              type: "steps",
              items: [
                { title: "准备数据", description: "使用 Fiona 工作中的一份脱敏数据（Excel/CSV），或使用下方的示例数据集" },
                { title: "上传到 Claude", description: "打开 claude.ai → 点击附件图标 → 上传 CSV 文件" },
                { title: "初步探索", description: "先让 Claude 概览数据：「请总结这个数据集的基本信息：有哪些列、多少行、数据时间范围、有无缺失值」" },
                { title: "深度分析", description: "用下方的分析 Prompt 让 Claude 做深度分析" },
                { title: "追问", description: "根据初步发现，追问具体问题：「为什么3月份数据下降了？」「哪个区域增长最快？」" },
              ],
            },
          ],
        },
        {
          type: "collapsible",
          title: "Sample Dataset",
          titleCn: "示例数据集（如没有真实数据可用）",
          content: [
            {
              type: "paragraph",
              textCn: "用 Claude 生成一份示例数据：「请生成一个 SaaS 公司过去12个月的业务数据 CSV，包含月份、MRR（月经常性收入）、新增客户数、流失客户数、NPS分数、客服工单数、平均响应时间。数据要有真实感：有季节性波动，Q3有一次明显的流失率上升。」",
            },
          ],
        },
        {
          type: "prompt",
          label: "数据深度分析 Prompt",
          text: "你是一名资深数据分析师。请对上传的数据做全面分析：\n\n1. 关键指标概览\n   - 各核心指标的当前值、趋势方向、同比/环比变化\n   - 用表格展示\n\n2. 趋势分析\n   - 哪些指标在上升/下降？\n   - 有没有明显的转折点？发生在什么时候？\n   - 季节性规律是什么？\n\n3. 异常发现\n   - 有没有异常数据点？\n   - 可能的原因是什么？（给出2-3个假设）\n\n4. 相关性分析\n   - 哪些指标之间存在关联？\n   - 例如：流失率和NPS之间有什么关系？\n\n5. 可执行建议\n   - 基于数据，给出3个具体的行动建议\n   - 每个建议标注优先级和预期影响\n\n请用中文回答，数据保留原始格式。",
        },
        {
          type: "image",
          src: "/screenshots/s8-claude-data-analysis.png",
          alt: "Claude数据分析结果",
          caption: "截图：Claude 对业务数据的深度分析（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "让 Fiona 带入自己的工作场景：「如果这是你们团队的季度数据，你最想知道什么？」引导她学会「向数据提问」。",
        },
        { type: "divider" },

        { type: "heading", text: "Demo 2: Comparative Analysis", textCn: "Demo 2: 对比分析" },
        {
          type: "paragraph",
          textCn: "PM 经常需要做对比分析：A/B测试结果对比、不同区域对比、本季度 vs 上季度。AI 可以帮你快速完成这些。",
        },
        {
          type: "prompt",
          label: "对比分析 Prompt",
          text: "请对比分析以下两组数据：\n\n[数据组A: 本季度 / 方案A / 区域A]\n[数据组B: 上季度 / 方案B / 区域B]\n\n分析维度：\n1. 核心指标对比（用表格，标注增减百分比和颜色箭头）\n2. 统计显著性判断（差异是否有意义，还是正常波动）\n3. 根因分析（差异最大的指标，可能原因是什么）\n4. 决策建议（基于对比结果，应该怎么做）\n\n用表格+文字结合的格式，方便直接放到汇报材料中。",
        },
        {
          type: "tip",
          textCn: "对比分析是 PM 日常最高频的分析类型。让 Fiona 试试用这个 Prompt 分析自己工作中的一次 A/B 测试或季度对比。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 2: AI 数据可视化
        // ══════════════════════════════════════
        { type: "heading", text: "Part 2: AI Data Visualization", textCn: "Part 2: AI 数据可视化", level: 2 },
        {
          type: "paragraph",
          textCn: "好的图表比一千行数据更有说服力。AI 可以帮你选择最合适的图表类型、生成图表代码、甚至直接输出可用的可视化。",
        },

        { type: "heading", text: "Chart Generation with Claude", textCn: "用 Claude 生成图表" },
        {
          type: "paragraph",
          textCn: "Claude 可以生成 Artifacts（可交互的图表）。我们用刚才分析的数据来生成专业图表。",
        },
        {
          type: "prompt",
          label: "数据可视化 Prompt",
          text: "基于刚才分析的业务数据，请生成以下可视化图表（用 Artifact 输出可交互的图表）：\n\n1. 折线图：过去12个月 MRR 趋势\n   - 添加同比虚线参考\n   - 标注关键转折点\n   - 颜色：主线蓝色，参考线灰色\n\n2. 组合图：新增客户（柱状图）vs 流失客户（折线图）\n   - 双Y轴\n   - 标注净增长\n\n3. 仪表板概览：4个KPI卡片\n   - MRR / 活跃客户数 / NPS / 客户流失率\n   - 每个带趋势箭头和环比变化\n\n风格：商务简洁，深色文字，白色背景，适合放到PPT中。",
        },
        {
          type: "image",
          src: "/screenshots/s8-chart-artifacts.png",
          alt: "Claude 生成的数据图表",
          caption: "截图：Claude Artifact 生成的可交互图表（课堂截图替换）",
        },
        {
          type: "collapsible",
          title: "Alternative Tools",
          titleCn: "备选方案：ChatGPT 高级数据分析",
          content: [
            {
              type: "steps",
              items: [
                { title: "ChatGPT + Code Interpreter", description: "ChatGPT 的 Code Interpreter 可以运行 Python 代码，生成更精细的 matplotlib/seaborn 图表" },
                { title: "操作方法", description: "上传 CSV → 要求生成图表 → ChatGPT 会写 Python 代码并运行 → 输出高清图片" },
                { title: "适用场景", description: "需要更精细的图表定制时，用 ChatGPT；需要可交互图表时，用 Claude Artifacts" },
              ],
            },
          ],
        },
        {
          type: "tip",
          textCn: "让 Fiona 把生成的图表截图保存——后面 Part 3 写高管报告时会用到这些图。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 3: 高管级汇报
        // ══════════════════════════════════════
        { type: "heading", text: "Part 3: Executive-Level Reporting", textCn: "Part 3: 高管级汇报撰写", level: 2 },
        {
          type: "paragraph",
          textCn: "分析和图表做好了，最后一步是写出让 VP/Director/C-level 看了就能做决策的报告。高管汇报的核心原则：先说结论，再讲数据，最后给建议。",
        },

        { type: "heading", text: "Executive Summary Format", textCn: "高管摘要格式" },
        {
          type: "paragraph",
          textCn: "高管没时间看长报告。他们需要的是：30秒看懂结论，3分钟看懂详情，5分钟做决策。",
        },
        {
          type: "steps",
          items: [
            { title: "一句话结论 (BLUF)", description: "Bottom Line Up Front — 报告的核心发现用一句话说清楚。如：「Q3客户流失率上升40%，主因是新定价策略导致中小客户不续费」" },
            { title: "3个关键数据", description: "用数字说话：「MRR 下降 12%」「净流失 47 个客户」「NPS 从 72 降至 58」" },
            { title: "根因分析", description: "为什么？用 2-3 个 bullet points 解释" },
            { title: "行动建议", description: "建议做什么？每个建议标注 Owner、Timeline、Expected Impact" },
          ],
        },
        { type: "divider" },

        { type: "heading", text: "Generate Executive Report", textCn: "AI 生成高管报告" },
        {
          type: "prompt",
          label: "高管报告生成 Prompt",
          text: "你是一名资深管理咨询师，擅长为C-level高管撰写简洁有力的业务报告。\n\n基于以下分析结果，请生成一份高管汇报文档：\n\n[粘贴前面 Part 1 的数据分析结论]\n\n报告格式：\n\n# Executive Summary\n[一段话总结核心发现和建议行动，不超过100字]\n\n# Key Metrics Dashboard\n[用表格展示4-6个核心KPI：指标名 | 当前值 | 环比变化 | 趋势]\n\n# Deep Dive: Top 3 Findings\n## Finding 1: [标题]\n- 数据：[具体数据]\n- 影响：[业务影响]\n- 根因：[原因分析]\n\n## Finding 2: ...\n## Finding 3: ...\n\n# Recommended Actions\n| 优先级 | 行动项 | 负责人 | 时间线 | 预期效果 |\n| --- | --- | --- | --- | --- |\n| P0 | ... | ... | ... | ... |\n\n# Risks & Mitigations\n[如果不行动，最坏情况是什么？]\n\n# Appendix\n[详细数据表格、图表引用]\n\n要求：\n- 语言简洁有力，避免废话\n- 每个发现都有数据支撑\n- 建议都是可执行的（有 Owner 和 Timeline）\n- 用中英文混合（术语用英文，描述用中文）",
        },
        {
          type: "image",
          src: "/screenshots/s8-executive-report.png",
          alt: "AI 生成的高管报告",
          caption: "截图：Claude 生成的高管汇报文档（课堂截图替换）",
        },
        {
          type: "tip",
          textCn: "让 Fiona 想象这份报告要发给她的 Director 或 Partner——措辞、格式、详略程度是否合适？如果不够好，让 AI 迭代。",
        },
        { type: "divider" },

        { type: "heading", text: "Presentation Slide Outline", textCn: "汇报 PPT 大纲" },
        {
          type: "paragraph",
          textCn: "高管汇报通常需要 PPT。AI 可以帮你快速生成 slide 大纲和每页的内容。",
        },
        {
          type: "prompt",
          label: "PPT 大纲生成 Prompt",
          text: "基于刚才的高管报告，请生成一份8页 PPT 大纲：\n\n每页包含：\n- 页面标题\n- 核心信息（一句话）\n- 内容要点（3-4个 bullet points）\n- 建议的图表/可视化类型\n- 演讲者备注（讲这页时要说什么，30秒以内）\n\nPPT 结构：\n1. 封面\n2. Executive Summary（一句话结论 + 3个关键数字）\n3. KPI Dashboard（图表页）\n4. Finding 1（数据 + 根因）\n5. Finding 2\n6. Finding 3\n7. Recommended Actions（行动表格）\n8. Next Steps & Discussion\n\n风格：McKinsey/BCG 咨询风格——每页一个核心观点，数据驱动。",
        },
        {
          type: "tip",
          textCn: "PPT 大纲生成后，可以直接粘贴到 Google Slides / PowerPoint 中。如果时间够，用 Gamma.app 或 v0.dev 生成可交互的演示。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // Part 4: 可复用分析工作流
        // ══════════════════════════════════════
        { type: "heading", text: "Part 4: Build Your Analysis Workflow", textCn: "Part 4: 搭建你的分析工作流", level: 2 },
        {
          type: "paragraph",
          textCn: "我们把今天学的内容固化成一套可复用的工作流，以后每次做数据汇报都可以按这个流程走。",
        },
        {
          type: "steps",
          items: [
            { title: "Step 1: 数据准备", description: "导出 CSV/Excel → 快速检查数据质量（缺失值、异常值）" },
            { title: "Step 2: AI 深度分析", description: "上传到 Claude → 用「数据深度分析」Prompt → 获取趋势、异常、相关性" },
            { title: "Step 3: 可视化", description: "用 Claude Artifact 或 ChatGPT Code Interpreter 生成图表" },
            { title: "Step 4: 高管报告", description: "用「高管报告生成」Prompt → 自动生成结构化报告" },
            { title: "Step 5: PPT 大纲", description: "用「PPT大纲」Prompt → 生成演讲材料" },
            { title: "Step 6: 迭代润色", description: "让 AI 以目标受众（VP/Director/Partner）的视角审查，调整措辞和详略" },
          ],
        },
        {
          type: "prompt",
          label: "添加到 Prompt 库：数据分析模板集",
          text: "请帮我整理一个「数据分析 Prompt 模板集」，包含以下5个模板：\n\n1. 数据概览 — 快速了解数据集的基本特征\n2. 深度分析 — 趋势、异常、相关性\n3. 对比分析 — A vs B 多维度对比\n4. 高管报告 — BLUF格式的汇报文档\n5. PPT大纲 — 咨询风格的演示大纲\n\n每个模板格式：名称 | 适用场景 | 完整Prompt文本\n输出为 Markdown 格式，方便粘贴到 Prompt 库页面。",
        },
        {
          type: "tip",
          textCn: "把这5个 Prompt 添加到 Fiona 网站上的 Prompt 库中——Analysis 分类下现在会有一套完整的数据分析武器库。",
        },
        { type: "divider" },

        // ══════════════════════════════════════
        // 总结 + 进阶课程
        // ══════════════════════════════════════
        { type: "heading", text: "Wrap Up + What's Next", textCn: "总结 · 进阶方向", level: 2 },
        {
          type: "paragraph",
          textCn: "回顾今天学到的核心内容：",
        },
        {
          type: "steps",
          items: [
            { title: "AI 读数据", description: "上传 CSV → AI 自动分析趋势、异常、相关性 — 取代手动Excel分析" },
            { title: "AI 做图表", description: "Claude Artifacts + ChatGPT Code Interpreter — 30秒生成专业图表" },
            { title: "AI 写报告", description: "BLUF 格式高管报告 + PPT大纲 — 2小时的汇报准备缩短到20分钟" },
            { title: "可复用工作流", description: "6步标准流程 + 5个 Prompt 模板 — 以后每次都能用" },
          ],
        },
        { type: "divider" },

        { type: "heading", text: "Course Recap: 4 Weeks, 8 Sessions", textCn: "课程总结：4周8课" },
        {
          type: "paragraph",
          textCn: "回顾一下你在这个课程中取得的成果——从 AI 零基础到全方位 AI 实践者：",
        },
        {
          type: "steps",
          items: [
            { title: "第1周", description: "AI探索 + 个人品牌：体验6个AI工具，部署了个人网站" },
            { title: "第2周", description: "PM工具链 + 自动化：Prompt工程、PRD拆解、Linear管理、3个自动化工作流" },
            { title: "第3周", description: "AI产品设计：3个产品原型、完整PRD、竞品分析、路演视频" },
            { title: "第4周", description: "AI Agent + 数据洞察：智能反馈Agent、数据分析、高管汇报" },
          ],
        },
        {
          type: "paragraph",
          textCn: "你现在掌握了12个AI工具、30+个Prompt模板、多个自动化工作流、一套完整的AI工作方法论——这已经超过了绝大多数人。",
        },
        { type: "divider" },

        { type: "heading", text: "Level Up: Advanced Programs", textCn: "进阶：更多课程方向", level: 2 },
        {
          type: "paragraph",
          textCn: "这8节课只是冰山一角。AI 的世界远比我们探索的更深更广。如果你想继续提升，Jesse 提供以下进阶课程：",
        },
        {
          type: "steps",
          items: [
            { title: "AI 深度应用 · 进阶班", description: "深入学习 Claude/ChatGPT 的高级功能：长文档分析、多轮对话策略、System Prompt 设计、API 集成。适合想把 AI 用到极致的人。" },
            { title: "AI 全栈开发 · 实战班", description: "从 Vibe Coding 进阶到独立开发完整产品：React 全栈、数据库、用户认证、支付集成——全程AI辅助。适合想亲手做产品的人。" },
            { title: "AI 自动化架构师", description: "构建企业级自动化系统：多 Agent 协作、复杂条件分支、API Orchestration、监控告警。适合想在团队中推动 AI 落地的人。" },
            { title: "AI × 行业定制", description: "针对你的行业（金融/咨询/医疗/教育）定制 AI 应用方案。深入行业场景，解决真实业务问题。" },
          ],
        },
        {
          type: "tip",
          textCn: "这不是硬性推销——只在 Fiona 表现出兴趣时展开介绍。重点是让她知道：如果想继续学，有明确的路径可以走。可以提供首期学员优惠价。",
        },
        {
          type: "paragraph",
          textCn: "如果你感兴趣，随时可以微信联系 Jesse 了解详情。我们会根据你的具体需求和时间安排，推荐最适合的进阶方向。",
        },
        { type: "divider" },

        { type: "heading", text: "Closing", textCn: "结语", level: 2 },
        {
          type: "paragraph",
          textCn: "Fiona，这8节课下来，你已经从 AI 零基础变成了一个能熟练使用12种 AI 工具的实践者。但更重要的是你建立了一种思维方式——遇到任何问题，先想想「AI 能不能帮我？」",
        },
        {
          type: "paragraph",
          textCn: "AI 不会取代你，但擅长使用 AI 的人会超越不用 AI 的人。你现在就是那个人了。保持学习，保持实践，保持好奇心。",
        },
      ],
      homework: [
        {
          id: "s8-hw1",
          title: "Real Data Analysis",
          titleCn: "真实数据分析",
          description: "Use the data analysis workflow on real work data",
          descriptionCn: "选择工作中一份真实的数据报表（脱敏），用今天学的6步工作流做一次完整分析，生成高管报告和PPT大纲",
          type: "practice",
        },
        {
          id: "s8-hw2",
          title: "Update Prompt Library",
          titleCn: "更新Prompt库",
          description: "Add the 5 data analysis prompt templates to your library",
          descriptionCn: "把今天的5个数据分析 Prompt 模板添加到个人网站的 Prompt 库中，并根据实际使用体验优化措辞",
          type: "project",
        },
        {
          id: "s8-hw3",
          title: "Share with Your Team",
          titleCn: "团队分享",
          description: "Do a 15-minute AI demo for your team using today's skills",
          descriptionCn: "在团队中做一次15分钟的分享：用AI分析一份真实数据并现场演示——让同事亲眼看到AI的数据分析能力",
          type: "project",
        },
      ],
    },
  ],
};
