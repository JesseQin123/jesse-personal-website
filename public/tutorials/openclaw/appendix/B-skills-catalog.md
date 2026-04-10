
# 附录B 常用Skills清单

> 💡
> **本附录目标**：提供OpenClaw常用Skills的详细清单，所有Skills均经过实战验证，确保可以正常安装使用。

## 📋 目录

-   B.0 四大必装Skills（安全与智能基础）
-   B.1 核心必装Skills（Top 10）
-   B.2 平台集成类Skills
-   B.3 开发工具类Skills
-   B.4 自动化类Skills
-   B.5 百度千帆系列Skills
-   B.7 进阶推荐Skills（15个深度解析）
-   B.8 Skills组合推荐

## B.0 三大必装Skills（安全与智能基础）⚡

> ⚠️
> **重要提示**：以下是使用OpenClaw时**最先应该安装**的三个Skills，它们提供了安全保护和智能增强，是所有其他Skills的基础。

### 1. Skill Vetter------Skills安全审查工具 🛡️

**核心作用**：
在安装任何Skill之前，先帮你把那个Skill审查一遍，生成安全报告，告诉你这东西能不能装。类似于电脑时代的杀毒软件或安全管家。

**功能特点**： - ✅ 自动扫描Skill代码，检测潜在恶意逻辑 - ✅
分析Skill权限要求，识别过度权限申请 - ✅
检查Skill依赖项，发现不安全的第三方库 - ✅
生成详细的安全报告，给出安装建议 - ✅ 防止ClawHavoc类供应链攻击

**安装**：

    # 通过ClawHub安装
    clawhub install skill-vetter

    # 或直接使用URL
    帮我安装这个Skill：https://clawhub.ai/spclaudehome/skill-vetter

**使用示例**：

    你：帮我检查一下nano-banana-pro这个Skill是否安全

    Skill Vetter：正在扫描 nano-banana-pro...
    ✅ 代码审查通过
    ✅ 权限要求正常
    ✅ 依赖项安全
    ✅ 无恶意行为

    安全评分：9.5/10
    建议：可以安全安装

**推荐指数**：⭐⭐⭐⭐⭐（必装！必装！必装！）

**为什么是必装第一优先级**： \>
"任何朋友问我怎么把控安全问题，或者要装什么skills，我永远推荐的第一个必备的Skills。大家绝对不要迷信各种所谓的下载量。一定要清楚，下载量大
≠ 非恶意。所以，进行一遍安全审查，是绝对有必要的。"

**核心价值**： - 🛡️ **安全第一**：防止恶意Skill破坏系统 - 🔍
**全面审查**：从代码到权限的完整检查 - 📊
**清晰报告**：易懂的评分和建议 - ⚡ **快速响应**：秒级完成扫描 - 🎯
**精准识别**：基于最新威胁情报

**为什么不能只看下载量**：

    ❌ 错误认知：下载量高 = 安全
       - 攻击者可以刷下载量
       - 恶意Skill可能伪装成热门工具
       - 早期用户可能未发现问题

    ✅ 正确做法：使用Skill Vetter审查
       - 基于代码实际分析
       - 不受人气影响
       - 客观的安全评估

**使用建议**： 1. ✅ 安装OpenClaw后第一个安装的Skill 2. ✅
安装任何其他Skill前先审查 3. ✅ 定期扫描已安装的Skills 4. ✅
关注安全评分更新 5. ✅ 分享安全报告给社区

**ClawHub地址**：https://clawhub.ai/spclaudehome/skill-vetter

### 2. find-skills------智能技能发现 🔍

**核心作用**：
当OpenClaw无法完成某个任务时，自动搜索并推荐合适的Skills，让AI帮你找工具。

**功能特点**： - ✅ 自动识别任务需求 - ✅ 搜索ClawHub上的相关Skills - ✅
推荐最匹配的Skills - ✅ 提供安装建议 - ✅ 节省手动搜索时间

**安装**：

    clawhub install find-skills

**使用示例**：

    你：帮我把这个视频转成GIF动图

    OpenClaw：[检测到无法完成]
    正在搜索相关Skills...
    找到了：video-to-gif
    评分：4.8/5.0
    功能：视频转GIF，支持格式转换、压缩、调帧率
    是否安装？[Y/n]

**推荐指数**：⭐⭐⭐⭐⭐（必装！）

**GitHub**:
https://github.com/vercel-labs/skills/tree/main/skills/find-skills

### 3. self-improving——自我反思与持续学习 🧠

**核心作用**：
具备自我反思、自我批评、自我学习和自我组织记忆的能力，能够评估自身工作、发现错误并永久改进。

**功能特点**：
- ✅ 自我反思：评估自己的工作质量
- ✅ 自我批评：发现错误并改进
- ✅ 自我学习：从用户反馈中学习
- ✅ 记忆管理：在 ~/self-improving/ 目录中维护分层记忆结构
- ✅ 长期固化：定期将学习内容固化到 AGENTS.md 等永久记忆文件

**安装**：

    clawhub install self-improving

**技术信息**：
- **名称**：self-improving
- **作者**：@ivangdavila
- **下载量**：67,500+
- **依赖**：无外部依赖
- **支持系统**：Linux、macOS、Windows

**使用示例**：

    # 场景：自我反思和改进
    self-improving：我反思了一下上次的工作，发现有几个地方可以改进：
    1. 代码格式不够统一
    2. 缺少错误处理
    3. 没有考虑边界情况
    我已经更新了我的工作方式，下次会做得更好。

**推荐指数**：⭐⭐⭐⭐⭐（必装！）

**ClawHub**：https://clawhub.ai/ivangdavila/self-improving

### 4. proactive-agent——主动预测与自救机制 🦞

**核心作用**：
打破传统AI"拨一下动一下"的被动模式，引入WAL协议防止上下文丢失，观察使用习惯后主动提出自动化建议。

**功能特点**：
- ✅ WAL协议：先记录细节再响应，防止上下文丢失
- ✅ 自动记录：上下文占用超60%时自动保存交互
- ✅ 自救机制：任务失败时尝试10种自救方法
- ✅ 主动预测：观察使用习惯后主动建议自动化

**安装**：

    clawhub install proactive-agent

**使用示例**：

    # 场景：主动建议自动化
    你：帮我把这个日报转成HTML格式
    [几天后，又做了同样的操作]

    proactive-agent：我注意到你经常需要将日报转成HTML格式。
    要不要我帮你自动化这个流程？

**推荐指数**：⭐⭐⭐⭐⭐（必装！）

**GitHub**：https://github.com/leomariga/ProactiveAgent

**安全提示**：proactive-agent安装时可能显示VirusTotal警告（因包含外部API调用），这是正常的，可以安全使用。

> ⚠️ **注意区分**：self-improving（@ivangdavila）侧重自我反思与记忆管理，proactive-agent（@leomariga）侧重主动预测与自救机制，两者功能互补，建议同时安装。

### 三大必装Skills一键安装

    # 一键安装三大必装Skills
    clawhub install skill-vetter find-skills self-improving proactive-agent

**安装顺序建议**：
1. **skill-vetter** → 先安装，用于审查后续所有Skills
2. **find-skills** → 帮你自动发现需要的Skills
3. **self-improving** → 让AI持续学习和改进
4. **proactive-agent** → 让AI主动预测需求并自救

## B.1 核心必装Skills（Top 10）

### 1. McPorter------跨平台连接基石 🏗️

**核心作用**： 让OpenClaw支持MCP（Model Context
Protocol）协议，无需编写胶水代码，直接连接成千上万个现成的MCP Server。

**支持平台**： - PostgreSQL数据库 - GitHub - Slack - Notion -
其他主流平台

**安装**：

    clawhub install mcporter

**配置示例**：

    # 配置MCP服务器（以连接本地文件为例）
    openclaw mcp add --transport stdio local-files npx -y @modelcontextprotocol/server-filesystem /root/Documents

**使用场景**： - "读取Notion中的项目文档，整理成Markdown" -
"把GitHub上的最新代码提交记录同步到本地"

**推荐指数**：⭐⭐⭐⭐⭐

### 2. Brave Search------实时信息检索 🔍

**核心作用**： 解决传统AI
Agent"数据过时"的问题，让OpenClaw能进行实时全网搜索，获取最新的GitHub
Issue、StackOverflow解答、行业资讯。

**安装**：

    clawhub install brave-search

**使用场景**： -
**代码报错排查**："帮我排查这个Python报错的原因，找最新的解决方案" -
**竞品调研**："查一下某产品最新功能的实现方式，附代码片段"

**推荐指数**：⭐⭐⭐⭐⭐

### 3. summarize------内容摘要与视频知识提取 🎥

**核心作用**：
支持URL、网页、PDF、图片、音频和YouTube视频的摘要与字幕提取，由OpenClaw创始人@steipete开发的官方内置Skill。

**安装**：

    clawhub install summarize

> ⚠️ **说明**：原推荐的summarize未在ClawHub验证到，YouTube字幕提取功能已内置于summarize中。

**使用场景**：
"提取这个2小时Next.js教程视频的核心代码逻辑，按章节整理成学习笔记"

**推荐指数**：⭐⭐⭐⭐

### 4. 文件系统工具（内置）------本地文件处理 💾

**核心作用**：
赋予OpenClaw本地文件的读写、修改、重构权限，支持批量修改代码、修复语法错误、自动提交Git。

**安装方式**：

    # 文件系统操作为OpenClaw内置Tool（read/write/edit/exec），无需额外安装Skill
    # 只需确保在配置中启用相应权限：
    openclaw config set tools.profile full

**安全配置**：

    # 配置授权目录（仅开放工作目录，避免全硬盘访问）
    openclaw config set fs.allow-path /root/Projects

> ⚠️ **说明**：文件操作是OpenClaw的内置Tool，非ClawHub上的独立Skill。

**使用场景**： - "帮我重构这个React组件，优化代码结构并修复ESLint报错" -
"将本地Markdown文件转为PDF，保存到指定目录"

**推荐指数**：⭐⭐⭐⭐⭐

**注意**：该技能是双刃剑，需严格控制访问目录，避免误操作。

### 5. agent-browser------浏览器自动化 🤖

**核心作用**：
模拟真实人类的浏览器操作，支持点击、输入、截图、表单提交，针对无API的老旧网站实现自动化操作。

**安装**：

    clawhub install agent-browser

**使用场景**： - "每天早上8点自动登录公司抢票系统，帮我预约车票" -
"定时截图某政府网站的公告，有更新就保存并提醒"

**推荐指数**：⭐⭐⭐⭐

**注意**：该功能过于强大，需合规使用，避免违反平台规则。

### 6. Design-Doc-Mermaid------图表自动生成 📊

**核心作用**：
通过自然语言指令生成Mermaid代码，自动渲染架构图、时序图、流程图。

**安装**：

    clawhub install design-doc-mermaid

**使用场景**： "帮我画1个用户注册的时序图，包含前端、后端、数据库交互"

**推荐指数**：⭐⭐⭐⭐

### 7. Google Workspace集成------办公自动化 📧

**核心作用**： 无缝连接Gmail、Google Calendar、Google
Docs，实现邮件整理、日程同步、文档自动生成。

**安装**：

    clawhub install gog

**授权配置**：

    # 授权Google账号（按终端提示完成浏览器认证）
    openclaw auth google

**使用场景**： -
"查一下我这周的Gmail邮件和Calendar日程，生成一份简洁的周报，发给老板" -
"根据会议纪要，自动创建Google Calendar日程，邀请参会人员"

**推荐指数**：⭐⭐⭐⭐⭐

### 8. find-skills------智能技能发现 🌟

> 详见B.0第2项。安装命令：`clawhub install find-skills`

**推荐指数**：⭐⭐⭐⭐⭐

### 9. proactive-agent------主动预测需求 🌟

> 详见B.0第4项。安装命令：`clawhub install proactive-agent`

**推荐指数**：⭐⭐⭐⭐⭐

### 10. Banana------AI绘画工具 🎨

**核心作用**：
通过自然语言生成图片，支持编辑现有图片（换背景、加文字、改风格）。

**安装**：

    clawhub install nano-banana-pro

**使用场景**： - "帮我画一个可爱的小龙虾" - "帮我把这张图片转成卡通风格"

**推荐指数**：⭐⭐⭐⭐⭐

## B.2 平台集成类Skills

### 飞书集成（Feishu）

**功能**： - 发送消息 - 创建文档 - 管理日历 - 发送通知

**说明**：
OpenClaw已内置飞书插件支持，无需单独安装Skill。只需配置飞书应用即可使用。

**配置指南**：
参见[飞书集成配置](../docs/03-advanced/09-multi-platform-integration.md)

### 钉钉集成

**功能**： - 发送消息 - 创建待办 - 管理审批 - 发送通知

**说明**： OpenClaw支持钉钉集成，通过配置钉钉机器人实现。

**配置指南**：
参见[钉钉集成配置](../docs/03-advanced/09-multi-platform-integration.md)

### 企业微信集成

**功能**： - 发送消息 - 创建群聊 - 管理通讯录 - 发送通知

**说明**： OpenClaw支持企业微信集成，详见相关文档。

## B.3 开发工具类Skills

### 文件搜索工具

**功能**： - 快速搜索本地文件 - 按文件名、内容、类型搜索 -
支持正则表达式

**说明**： File System Manager技能已包含文件搜索功能。

### 代码助手

**功能**： - 代码生成 - 代码审查 - 代码解释 - 代码优化

**说明**： OpenClaw内置强大的代码处理能力，配合File System
Manager可实现代码重构和优化。

## B.4 自动化类Skills

### 浏览器自动化

**功能**： - 网页自动操作 - 表单自动填写 - 定时任务 - 数据抓取

**Skill**：agent-browser

### 内容创作自动化

**功能**： - 文章自动生成 - 格式转换 - 内容分发 - SEO优化

**说明**： 可结合多个Skills构建完整的内容创作自动化流程。

## B.5 百度千帆系列Skills

### 1. 百度搜索（Baidu Search）

**功能**： - 实时网页搜索 - 中文内容优化 - 本地化搜索结果

**安装**：

    clawhub install baidu-search

**适用场景**： - "搜索最新的AI技术文章" - "查找中文资料"

### 2. 百度百科（Baidu Baike）

**功能**： - 百科词条查询 - 相关词条推荐 - 知识点解释

**使用场景**： - "查询某个概念的详细解释" - "获取相关词条推荐"

### 3. 百度学术（Baidu Scholar）

**功能**： - 学术文献搜索 - 引用格式生成 - 相关研究推荐

**使用场景**： - "查找某篇论文的相关研究" - "生成学术引用"

### 4. 百度智能PPT（Baidu Smart PPT）

**功能**： - PPT自动生成 - 配图推荐 - 模板应用

**使用场景**： - "根据文章内容生成PPT" - "自动美化PPT"



## B.7 进阶推荐Skills（15个深度解析）

> 💡 **本节目标**：精选15个经过社区验证的高质量Skills，从浏览器自动化到知识管理、从安全审计到内容优化，覆盖进阶用户的核心需求。

### 1. agent-browser——赋予AI浏览器的"手"和"眼" 🌐

**核心作用**：基于Rust开发的无头浏览器自动化工具，赋予AI代理导航、点击、输入和截图的能力。

**功能特点**：
- ✅ 支持结构化命令控制页面
- ✅ 具备Node.js回退机制
- ✅ 适用于网页表单填写、UI测试、复杂网页数据提取

**安装**：

    clawhub install agent-browser

**推荐指数**：⭐⭐⭐⭐

### 2. automation-workflows——独立创业者的自动化顾问 🤖

**核心作用**：专注于识别自动化机会并设计完整的工作流，涵盖从触发器到错误处理的全流程。

**功能特点**：
- ✅ ROI计算，判断自动化投入是否值得
- ✅ 常见触发词："自动化"、"减少手动工作"、"节省时间"

**安装**：

    clawhub install automation-workflows

**推荐指数**：⭐⭐⭐⭐

### 3. brave-search——轻量级事实检索利器 🔍

**核心作用**：无需启动浏览器，通过API获取最新互联网信息，专注于内容提取和事实查找。

**配置需求**：需申请 `BRAVE_API_KEY` 环境变量。

**安装**：

    clawhub install brave-search

**推荐指数**：⭐⭐⭐⭐⭐

### 4. data-analyst——24小时在线数据专家 📊

**核心作用**：将CSV、Excel或SQL数据转化为清晰的洞察和报告。

**功能特点**：
- ✅ 支持SQL模板查询（如漏斗分析）
- ✅ 数据清洗（处理缺失值）
- ✅ 使用Matplotlib/Seaborn生成可视化图表

**安装**：

    clawhub install data-analyst

**推荐指数**：⭐⭐⭐⭐

### 5. feishu-doc——跨平台文档搬运工 📄

**核心作用**：实现OpenClaw与飞书（Lark）生态的完美对接，自动将飞书文档、Wiki或多维表格内容转换为Markdown格式，或反向写入飞书。

**配置需求**：需设置 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET`。

**安装**：

    clawhub install feishu-doc

**推荐指数**：⭐⭐⭐⭐⭐（国内用户必备）

### 6. find-skills——技能库的智能导购 🔎

**核心作用**：当用户询问"如何做某事"时，主动搜索现有的工具、模板或工作流并推荐。

**安装**：

    clawhub install find-skills

**推荐指数**：⭐⭐⭐⭐⭐

### 7. humanizer——告别"AI味"的文字润色师 ✍️

**核心作用**：基于维基百科"AI写作迹象"指南开发，识别并修复超过20种典型AI写作模式。

**功能特点**：
- ✅ 修复过度强调、肤浅分析语气等问题
- ✅ 在保留原意基础上注入个性和自然语气

**安装**：

    clawhub install humanizer

**推荐指数**：⭐⭐⭐⭐（内容创作者刚需）

### 8. obsidian——知识管理系统的自动化补完 💎

**核心作用**：通过obsidian-cli实现搜索、创建、移动或重命名Markdown笔记，让OpenClaw直接管理本地双链笔记库。

**安装**：

    clawhub install obsidian

**推荐指数**：⭐⭐⭐⭐（Obsidian用户必装）

### 9. playwright-scraper——硬核隐蔽爬虫 🕷️

**核心作用**：利用Playwright的Stealth插件绕过反爬机制，支持完整JavaScript执行、伪造User-Agent和视口，模拟真实人类行为。

**安装**：

    clawhub install playwright-scraper

**推荐指数**：⭐⭐⭐⭐

**注意**：请合规使用，避免违反目标网站的使用条款。

### 10. proactive-agent——从被动执行到主动协作 🦞

**核心作用**：引入WAL协议防止上下文丢失；上下文占用超60%时自动记录交互；任务失败时尝试10种自救方法。

**安装**：

    clawhub install proactive-agent

**推荐指数**：⭐⭐⭐⭐⭐

### 11. self-improving-agent——会自我复盘的AI 📈

**核心作用**：具备学习能力，自动记录失败命令或用户更正信息到 `.learnings/` 目录，定期将学习内容固化到永久记忆文件中。

**安装**：

    clawhub install self-improving-agent

**推荐指数**：⭐⭐⭐⭐⭐

### 12. skill-vetter——安全至上的技能审计员 🔒

**核心作用**：提供四步审核流程（来源检查→代码审查→权限评估→风险分类），能检测20多项危险信号。

**安装**：

    clawhub install skill-vetter

**推荐指数**：⭐⭐⭐⭐⭐（必装！）

### 13. summarize——长文档的"脱水机" 🧾

**核心作用**：支持URL、网页、PDF、图片和YouTube视频的快速总结。

**配置需求**：需配置对应模型（OpenAI/Claude/Google等）的API密钥。

**安装**：

    clawhub install summarize

**推荐指数**：⭐⭐⭐⭐

### 14. task-status——长时间任务的"进度条" 📣

**核心作用**：在多步操作期间发送简短状态更新，包括阶段性完成确认或失败通知。

**安装**：

    clawhub install task-status

**推荐指数**：⭐⭐⭐⭐

### 15. tavily-search——AI时代的专业搜索引擎 🔍

**核心作用**：专为AI代理优化的搜索API，返回结果更简洁、更具相关性，噪音极小。

**配置需求**：需要 `TAVILY_API_KEY`（提供免费配额）。

**安装**：

    clawhub install tavily-search

**推荐指数**：⭐⭐⭐⭐⭐

### B.7 一键安装全部15个进阶Skills

    clawhub install agent-browser automation-workflows brave-search \
      data-analyst feishu-doc find-skills humanizer obsidian \
      playwright-scraper proactive-agent self-improving-agent \
      skill-vetter summarize task-status tavily-search


## B.8 Skills组合推荐

### 组合1：基础套装（必装）

    clawhub install mcporter brave-search summarize \
      summarize find-skills proactive-agent

**适用场景**： - 新手入门 - 日常办公 - 基础自动化

### 组合2：进阶套装（推荐）

    clawhub install mcporter brave-search summarize \
      summarize agent-browser design-doc-mermaid gog \
      find-skills proactive-agent nano-banana-pro

**适用场景**： - 高级用户 - 开发者 - 内容创作者

### 组合3：开发者套装

    clawhub install mcporter brave-search summarize \
      design-doc-mermaid find-skills

**适用场景**： - 软件开发 - 代码重构 - 技术文档编写

### 组合4：内容创作套装

    clawhub install brave-search summarize \
      design-doc-mermaid nano-banana-pro

**适用场景**： - 文章写作 - 视频制作 - 创意设计

### 组合5：办公自动化套装

    clawhub install summarize gog \
      agent-browser find-skills proactive-agent

**适用场景**： - 日常办公 - 邮件处理 - 日程管理

## 📚 快速安装指南

### 一键安装所有核心Skills

    clawhub install mcporter brave-search summarize \
      summarize agent-browser design-doc-mermaid gog \
      find-skills proactive-agent nano-banana-pro

### 查看已安装Skills

    npx clawhub@latest list

### 更新Skills

    # 更新特定Skill
    npx clawhub@latest update <skill-name>

    # 更新所有Skills
    npx clawhub@latest update --all

### 卸载Skills

    npx clawhub@latest uninstall <skill-name>

## 🔗 相关资源

-   ClawHub市场：https://clawhub.ai
-   Skills开发文档：https://docs.openclaw.ai/skills
-   GitHub仓库：https://github.com/openclaw/clawhub
-   第8章：Skills扩展详解：../../docs/03-advanced/08-skills-extension.md
-   Skills生态说明：./N-skills-ecosystem.md

## ⚠️ 安全提示

**重要**：2026年1月发生了ClawHavoc供应链攻击事件，ClawHub约20%的Skills被确认为恶意。

-   ✅ 安装前审查源码
-   ✅ 使用本文档推荐的Skills
-   ✅ 定期检查更新
-   ✅ 关注官方安全公告
-   ❌ 不要盲目安装不明来源的Skills

**提示**：本清单基于实战验证的Skills，所有命令均经过测试。如有问题，请访问ClawHub官网查询最新信息。

**最后更新**: 2026年3月15日
