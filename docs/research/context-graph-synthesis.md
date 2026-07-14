# Jesse AI 研究稿：Ontology、Context Graph 与 AI-native SoloUnicorn

> 研究范围：`/Users/jesseqin/dev/context_graph_site`
>
> 用途：作为 Jesse AI 知识库的候选理论材料；本稿区分“仓库明确表达的主张”与“面向 SoloUnicorn 的合理综合/推论”。
>
> 研究日期：2026-07-14

## 0. 来源与归属边界

Jesse 在本次请求中明确说明，这个仓库代表他对 ontology 与 context graph 的理解。因此，仓库的实质性 editorial position 可以作为 Jesse **当前认同的观点**进入知识库；但这不等于其中每一句都是 Jesse 个人原创：

- 核心学习页的公开署名是 **Context Graph Marketplace**，而非 Jesse Qin 个人。例如旗舰定义页的作者字段见 `/Users/jesseqin/dev/context_graph_site/app/learn/what-is-context-graph/page.tsx` 第 24 行、53–56 行。
- 多个页面明确说明其观点来自外部作者。例如 ontology 页引用 Kirk Marple 与 Daniel Davis（`/Users/jesseqin/dev/context_graph_site/app/learn/ontologies/page.tsx` 第 452–485 行）；how-to-build 页引用 Animesh Koratana（`/Users/jesseqin/dev/context_graph_site/app/learn/how-to-build-context-graph/page.tsx` 第 480–497 行）；institutional intelligence 页引用 `@kayacancode`（`/Users/jesseqin/dev/context_graph_site/app/learn/institutional-intelligence/page.tsx` 第 383–404 行）。
- `data/articles` 主要是第三方文章/帖子的原文档案，并保留 X 链接。例如 `/Users/jesseqin/dev/context_graph_site/data/articles/article3.md` 第 1–2 行、`/Users/jesseqin/dev/context_graph_site/data/articles/article7.md` 第 1–2 行、`/Users/jesseqin/dev/context_graph_site/data/articles/article8.md` 第 1–2 行。
- Git 历史显示核心学习中心与首页由 Claude Code 生成或共同编写；后续研究稿也有 Claude 作者提交。因此以下“Jesse 的观点”更严谨的表述应是：**Jesse 当前认同，并通过其项目采纳、策展和公开传播的理论立场**。

知识库回答建议：可以第一人称表达“我认为……”或说“Jesse 的 Context Graph 项目主张……”，因为用户已明确确认这些材料代表其理解；但不要声称“Jesse 首创了 context graph / decision trace / learned ontology”等概念。

## 1. 一句话总论

### 仓库明确表达

Context graph 是“跨实体与时间连接起来的、持续生长的决策轨迹记录”，让组织先例可以被搜索，使 AI agent 能从制度记忆中学习并自主决策。它不只存储发生了什么，更要保存为什么允许它发生，包括例外、override、先例、证据、审批者、来源和当时有效的状态。旗舰定义见 `/Users/jesseqin/dev/context_graph_site/app/learn/what-is-context-graph/page.tsx` 的 **What is a Context Graph?**（第 203–240 行）以及首页定义 `/Users/jesseqin/dev/context_graph_site/components/sections/WhatIsContextGraph.tsx` 第 63–70 行。

### 面向 SoloUnicorn 的综合/推论

对一人公司而言，context graph 可以被理解为公司的“外置组织大脑”：创始人负责目标、价值判断、最终责任和例外升级；agent 负责执行、检索先例、协调工具与持续记录；context graph 则让每次执行沉淀为下一次可复用的组织能力。这样，组织规模不再只由员工人数定义，而由“一个人能编排多少可靠 agent，以及这些 agent 能否共享并积累决策上下文”定义。

这段 SoloUnicorn 连接是本研究基于仓库理论作出的推论；原仓库没有出现 `SoloUnicorn` 或 `one-person company` 的正式定义。

## 2. 核心概念

### 2.1 Ontology：组织可操作世界的机器可读模型

#### 仓库明确表达

仓库区分四个层次：

- Vocabulary：人可读的词义定义。
- Taxonomy：领域术语的人可读层级与定义。
- Schema：为存储与检索设计的机器可读数据表示。
- Ontology：术语、术语层级及其关系的机器可读定义。

来源：`/Users/jesseqin/dev/context_graph_site/app/learn/ontologies/page.tsx` 的 **What is an Ontology?**（第 125–166 行）。

Ontology 的价值不是“图数据库”本身，而是明确组织里有哪些实体、它们能做什么、彼此怎样关联。Context graph 则在这套结构之上加入时间、决策、来源、例外与结果，使 ontology 从静态世界说明书变成 AI agent 可以行动和学习的操作模型。

#### Jesse 项目采纳的关键立场

项目拒绝“全部预先规定”与“全部从 agent 轨迹自动学习”之间的二选一。其第三条道路是：**采用已有基础标准，在需要处扩展，把学习资源投入真正新颖的组织层。** 原文口号为 “Adopt what exists. Extend where needed. Focus learning on what’s genuinely novel.” 来源：`/Users/jesseqin/dev/context_graph_site/app/learn/ontologies/page.tsx` 的 **The Prescribed vs Learned Debate**（第 243–288 行）。

这意味着：

- Person、Organization、Account、Contact、Event 等稳定实体不必从零学习；Schema.org、Microsoft CDM 和行业标准可作为起点（同文件 **Existing Ontology Standards**，第 174–239 行）。
- 真正需要学习的是组织特有的现实：谁实际上是决策人、哪些例外会获批、哪个先例真正支配决策、正式组织图与真实协作网络有何不同（同文件 **The Practical Approach**，第 291–360 行）。
- 项目把尚未解决的重点归纳为 temporal validity、decision traces、fact resolution 和 organizational learning（同文件 **What’s Actually Unsolved**，第 363–427 行）。

### 2.2 Context Graph：从“事实”走向“决策中的事实”

#### 仓库明确表达

Context graph 的四个核心组成是：

1. **Decision traces**：结果、当时上下文、推理、例外和审批。
2. **Entity relationships**：客户、人员、产品、政策、工单等组织实体之间的结构。
3. **Temporal context**：信息在什么时候有效、如何演变。
4. **Provenance metadata**：谁作出决定、哪个系统记录、依据是什么。

来源：`/Users/jesseqin/dev/context_graph_site/app/learn/what-is-context-graph/page.tsx` 的 **Key Components of a Context Graph**（第 362–422 行）。

它的运行闭环是：捕获决策事件 → 连接相关实体 → 为新情境检索类似先例 → 把新决策再写回图中，形成 compound intelligence。来源：同文件 **How Context Graphs Work**（第 425–486 行）。

### 2.3 Knowledge Graph 与 Context Graph 的关系

#### 仓库明确表达

项目的简化区分是：knowledge graph 主要回答“什么存在、什么与什么相关”；context graph 主要回答“为什么这样决定、当时处在什么条件下”。Context graph 额外强调动态决策轨迹、时间演化、来源和 precedent search。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/context-graph-vs-knowledge-graph/page.tsx` 的 **Quick Answer** 与两个定义段（第 115–193 行）。

但两者不是互斥技术。项目明确主张最强的企业 AI 系统会同时使用：knowledge graph 提供实体与基础关系，context graph 增加真实业务流程中的决策层。来源：同文件 **Can They Work Together?**（第 313–331 行）。因此更准确的表达是：**context graph 是对知识图谱能力的时间化、过程化、决策化扩展，而不是简单替代。**

### 2.4 Decision Trace：组织判断的最小可复用单元

#### 仓库明确表达

一条 decision trace 至少包含：决定本身、当时上下文、为什么选择该方案、决策/审批者、时间戳、支持证据与引用先例。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/decision-traces/page.tsx` 的 **Understanding Decision Traces**（第 114–141 行）。

它和普通 log 的区别是：log 记录“15% 折扣被应用”；decision trace 记录“为什么在默认上限 10% 的情况下批准 15%，谁批准，基于哪些政策与先例”。来源：同文件 **Decision Trace Example** 与 FAQ（第 148–192 行、第 265–282 行）。

Decision trace 的组织价值有四类：让 agent 处理例外、提供审计线索、保存离职员工的 tacit knowledge、用结果分析持续改进。来源：同文件 **Why Decision Traces Matter**（第 198–222 行）。

### 2.5 Temporal Context：状态时钟与事件时钟

#### 仓库明确表达

项目用“两只时钟”解释传统系统的缺陷：

- **State clock**：现在什么是真的；传统数据库擅长保存当前余额、配置、人员、deal status。
- **Event clock**：发生了什么、顺序如何、为什么发生；它保存状态怎样形成与改变。

来源：`/Users/jesseqin/dev/context_graph_site/app/learn/temporal-context/page.tsx` 的 **The Two Clocks Problem**（第 154–188 行）。

Temporal validity 要给事实加入有效时间、来源和置信度，使系统可以回答 point-in-time query、change tracking、precedent search 和 decision replay。来源：同文件 **Temporal Validity**（第 217–271 行）。

时间意识还带来 fact resolution：从互相矛盾的 assertions 中判断哪个仍有效、哪个已被取代、哪个来源更权威、多个来源是否相互印证。来源：同文件 **Fact Resolution**（第 279–331 行）。技术实现候选包括 bitemporal modeling、append-only event stores、temporal indexes 和 versioned facts（第 338–374 行）。

### 2.6 Institutional Intelligence：让组织从每个决定中学习

#### 仓库明确表达

Institutional intelligence 被定义为：把组织完整的决策上下文系统性地捕获、连接并复利成一个 durable、auditable、executable 的知识系统；组织像个人从经验中学习一样，从每一个决策中学习。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/institutional-intelligence/page.tsx` 的页首定义与 **What is Institutional Intelligence?**（第 87–97 行、第 127–150 行）。

它提供四项能力：

- Auditability：立即还原类似例外及其理由。
- Consistency：使用先例但不消灭判断与合理例外。
- Reusability：把重复决策模式蒸馏成 skills 和 playbooks。
- Evolution：用结果与反馈持续更新集体判断。

来源：同文件 **Core Capabilities**（第 190–250 行）。

这里最有辨识度的操作原则是：最有价值的上下文必须在工作发生处被捕获，最好成为工作的自然副产品；事后要求人手写总结、静态 wiki 和事后观察都不够可靠。来源：同文件 **Building Institutional Intelligence**（第 322–357 行）。

## 3. 参考架构

### 3.1 仓库明确表达的层次

可以把项目中的技术主张整理为以下七层：

1. **Source / Execution layer**：邮件、Slack、CRM、代码、会议、工单、agent tool calls，以及人和 agent 真正作决定的工作界面。
2. **Capture layer**：在决策点自动发射 decision traces；记录输入、参与者、候选方案、政策、例外、审批与结果。
3. **Ontology / Identity layer**：使用标准实体模型打底，完成实体解析、身份合并和组织特有扩展。
4. **Temporal / Provenance layer**：有效时间、交易时间、版本、来源、置信度、append-only history。
5. **Graph + Retrieval layer**：把实体、关系、事件、先例连成可遍历结构，并结合向量检索；图负责结构与多跳关系，向量负责语义近似。
6. **Context compilation layer**：根据当前任务写入、选择、压缩、隔离上下文，为每一次模型推理编译正确的 evidence bundle。
7. **Agent / Governance layer**：agent 执行、引用先例、请求升级、记录结果；人保留策略、责任边界和高风险审批。

其中第 1–4 层来自 context graph 的组成与 temporal/decision-trace 论述；第 5–6 层与 context engineering 的定义相符。Context engineering 被定义为动态组装模型推理时所需的完整信息环境，而不只是写提示词；四种模式是 writing、selecting、compressing、isolating。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/context-engineering/page.tsx` 的 **What is Context Engineering?**（第 204–233 行）和 **Key Patterns**（第 368–456 行）。

项目还明确认为图不是单独替代向量：生产系统更可能采用 vector + graph 混合架构，让语义检索负责广度、图遍历负责关系精度。来源：同文件 **The Role of Graphs in Context Engineering**（第 465–579 行）。

### 3.2 两种 ontology 路径应当统一，而不是互相否定

仓库同时保存了两个看似冲突的论点：

- Ontology 页强调稳定实体层应采用既有标准，再学习组织特有结构（`/Users/jesseqin/dev/context_graph_site/app/learn/ontologies/page.tsx` 第 291–360 行）。
- How-to-build 页转述 learned ontology 观点，认为 agent 作为 informed walkers，可以从问题导向轨迹中发现组织结构，schema 是输出（`/Users/jesseqin/dev/context_graph_site/app/learn/how-to-build-context-graph/page.tsx` 第 249–292 行、第 343–387 行）。

最合理的综合不是二选一，而是分层：

- **基础 ontology**：Person、Organization、Project、Customer、Artifact、Policy、Decision、Agent 等稳定概念先定义。
- **运行 ontology**：真实影响关系、升级路径、例外模式、隐性角色与 decision dynamics 从 agent/human traces 中持续学习。

这是对仓库两个来源的综合解释，应标注为综合，而不是仓库某一页的逐字结论。

### 3.3 Context graph 的终点不是搜索，而是 world model

#### 仓库明确表达（来源归属：Animesh Koratana 观点的项目转述）

当 context graph 积累足够多的状态、事件与轨迹，它会成为组织的 world model：不仅描述实体和关系，还描述“采取某个行动后会发生什么”的 decision dynamics。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/how-to-build-context-graph/page.tsx` 的 **Context Graphs as Organizational World Models**（第 298–337 行）。

仓库采用一个鲜明判准：**如果它不能回答有用的 “what if”，它仍只是 search index。** 同文件第 328–337 行。实践路径因此是：捕获决策事件 → 建 event clock → 部署 agent 并捕获轨迹 → 用反事实问题测试模拟能力（同文件 **Practical Steps**，第 395–449 行）。

## 4. 为什么 Context Graph 对 AI-native Organization 重要

### 仓库明确表达

1. **通用模型不是公司的差异化来源。** 当所有公司能调用类似模型时，差异来自产品判断、客户关系、市场理解、流程、IP、历史选择和 tribal knowledge。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/era-of-context/page.tsx` 的 **The AI Context Problem** 与 **Context as Differentiation**（第 152–215 行）。
2. **企业从 systems of record 走向 systems of agents。** 前者存数据、由人驱动流程；后者在数据之上行动、进行 context-aware reasoning。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/enterprise-ai-agents/page.tsx` 的 **From Systems of Record to Systems of Agents**（第 118–146 行）。
3. **规则无法覆盖真实业务。** 企业流程由例外、edge cases 和未成文规则组成；没有上下文的 agent 会盲目执行规则或把所有例外升级给人。来源：同文件 **Why Enterprise Agents Need Context Graphs**（第 212–264 行）。
4. **context 必须成为可管理的系统，而不是偶然堆进 prompt。** Context engineering 要控制 agent 每一步看到的证据、历史、工具输出和关系结构。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/context-engineering/page.tsx` 第 204–233 行。
5. **组织学习可以脱离模型权重更新。** 项目转述的 world-model 观点认为，固定模型也可以通过不断扩大的证据库、事件历史和推理时计算表现得像在学习。来源：`/Users/jesseqin/dev/context_graph_site/data/articles/article7.md` 第 45–66 行，以及项目学习页 `/Users/jesseqin/dev/context_graph_site/app/learn/temporal-context/page.tsx` 第 409–412 行。

### 面向 AI-native Organization 的综合/推论

AI-native organization 不是“传统公司给每个员工配一个聊天机器人”，而是从组织设计之初就把工作拆成：目标与政策、可执行任务、决策点、证据需求、升级条件、记忆写回和结果反馈。Agent 是执行主体；context graph 是共享状态、历史和制度记忆；人负责意图、边界、价值判断和问责。

因此 context graph 在 AI-native organization 中相当于：

- **组织记忆**：跨 session、跨 agent 保存事实、事件和先例。
- **组织协调协议**：让多个 agent 对同一组实体、政策、时间和任务状态达成共同理解。
- **组织训练数据**：从真实执行中积累结构化轨迹，而非只依赖员工事后写 SOP。
- **组织治理系统**：任何重要动作都能追溯输入、规则、审批与结果。
- **组织复利引擎**：每次决策都提高下一次决策的上下文质量。

这五点是对仓库架构的组织设计推论，不是原仓库逐字列表。

## 5. 为什么它特别适合 SoloUnicorn / 一人公司

### 合理综合/推论（原仓库未直接提出 SoloUnicorn）

传统公司的规模化依靠增加员工、管理层级与会议来传递上下文。一人公司无法依赖“问老员工”“开对齐会”或口头文化，因此必须把组织的隐性知识外置。Context graph 正好提供这层基础设施。

### 5.1 Founder 从执行者升级为 agent organization designer

仓库转述的趋势是：今天的 individual contributor 将成为未来的 agent manager，主要责任是提供监督、升级路径和跨 agent 协调。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/era-of-context/page.tsx` 的 **The New Role of the Individual Contributor**（第 323–330 行）。

在 SoloUnicorn 中，这可以进一步定义为：创始人不是亲自完成所有任务，而是设计 goals、ontology、policies、decision rights、feedback loops 和 escalation thresholds，并只处理高杠杆判断。

### 5.2 把创始人的判断变成可复用资本

一人公司的最大瓶颈不是缺少原始 intelligence，而是创始人的注意力和上下文切换。每当创始人批准一个报价例外、选择一个市场、拒绝一个功能或处理一次客户升级，都应产生 decision trace。随后 agent 可以检索相似案例、按照先例执行、在越界时才升级。

这个闭环直接来自仓库的“capture → connect → precedent search → compound”机制（`/Users/jesseqin/dev/context_graph_site/app/learn/what-is-context-graph/page.tsx` 第 425–486 行），但将其应用于创始人注意力是本研究的推论。

### 5.3 用可审计自主权取代微管理

SoloUnicorn 必须给 agent 较大自主权，但自主权必须可观察、可撤销、可学习。Decision trace 与 provenance 允许创始人检查 agent 为什么行动、引用了什么政策、是否越过权限；human-in-the-loop 可以从默认审批逐步收缩到只审批高风险例外。仓库建议企业 agent 从 AI-assisted decision 开始，随信心上升再走向自主，并从第一天建立 audit trail。来源：`/Users/jesseqin/dev/context_graph_site/app/learn/enterprise-ai-agents/page.tsx` 的 **Building Enterprise AI Agents**（第 270–301 行）。

### 5.4 形成“一人 + agent swarm + shared memory”的最小组织单元

一个可操作的 SoloUnicorn 组织模型可以写成：

```text
Founder
  ├─ 定义使命、目标、价值观、风险边界
  ├─ 批准高风险例外与不可逆决定
  └─ 复盘结果并更新 policy / ontology

Specialized Agents
  ├─ Research / Product / Engineering / Growth / Sales / Support / Finance
  ├─ 从共享 context graph 编译任务上下文
  ├─ 执行并相互交接结构化 artifacts
  └─ 自动写回 traces、结果、置信度与异常

Context Graph
  ├─ Entities & Ontology
  ├─ Policies & Decision Rights
  ├─ Temporal State & Provenance
  ├─ Decision Traces & Precedents
  └─ Outcomes & Feedback
```

这是一种新的组织尺度观：员工人数可以是 1，但组织知识、执行并行度、流程覆盖面和决策复用率可以像更大的公司。这是本研究基于仓库的 AI-native 组织推论。

## 6. Jesse 项目最有辨识度、适合进入知识库的立场

以下句子可以作为 Jesse AI 的回答骨架，但回答时宜用“Jesse 的项目主张/他认同的框架”表述：

1. **AI 的竞争优势会从模型能力转向专有 context。** 大家可以买到相似 intelligence，真正不可复制的是组织长期积累的判断、客户理解、过程和先例。依据：`/Users/jesseqin/dev/context_graph_site/app/learn/era-of-context/page.tsx` 第 152–215 行、第 337–347 行。
2. **Context graph 不是静态知识库，而是组织如何作决定的活记录。** 依据：`/Users/jesseqin/dev/context_graph_site/app/learn/what-is-context-graph/page.tsx` 第 203–240 行。
3. **Ontology 不应从零重造，也不应幻想完全自动涌现。** 稳定实体采用标准，组织特有的决策结构通过实际轨迹学习。依据：`/Users/jesseqin/dev/context_graph_site/app/learn/ontologies/page.tsx` 第 243–360 行；“分层统一”部分是本研究综合。
4. **组织真正稀缺的资产不是结果数据，而是结果形成的 event clock。** 依据：`/Users/jesseqin/dev/context_graph_site/app/learn/temporal-context/page.tsx` 第 154–188 行。
5. **每个 agent run 都应该同时创造业务价值和组织记忆。** Agent 完成付费工作，轨迹作为副产品沉淀；更好的 context 提升 agent，更多 agent 使用又生成更多 context。原始行业材料：`/Users/jesseqin/dev/context_graph_site/data/articles/article7.md` 第 37–44 行；项目的 compound intelligence 表达：`/Users/jesseqin/dev/context_graph_site/app/learn/what-is-context-graph/page.tsx` 第 473–483 行。
6. **Context capture 是 workflow design 问题，不只是 data infrastructure 问题。** 最好的系统应存在于决策发生处，使 trace 作为工作副产品产生。来源归属为 Eyal Toledano 的外部文章档案：`/Users/jesseqin/dev/context_graph_site/data/articles/article4.md` 第 35–58 行；项目采纳见 `/Users/jesseqin/dev/context_graph_site/app/learn/institutional-intelligence/page.tsx` 第 322–350 行。
7. **检索不是终点；能模拟才表示真正理解组织。** 依据（来源归属为 Animesh Koratana）：`/Users/jesseqin/dev/context_graph_site/app/learn/how-to-build-context-graph/page.tsx` 第 298–337 行。
8. **SoloUnicorn 的护城河是 founder judgment 被结构化、可委托、可审计并持续复利。** 这是本研究将上述主张连接到一人公司的综合结论，原仓库没有直接提出。

## 7. 可用于 Jesse AI 的问答素材

### Q：Jesse 怎么理解 ontology？

建议答：

> Jesse 把 ontology 看作组织可操作世界的机器可读模型：定义有哪些实体、层级和关系。对 AI-native company 来说，ontology 不该全部手工定死，也不该等待 agent 从零发现。稳定的实体层可以复用 Schema.org、CDM 或行业标准；真正应该从运行轨迹学习的，是这家公司独特的决策网络、例外模式和隐性角色。简单说：adopt the foundation, learn the organization。

### Q：Context graph 和 knowledge graph 有什么不同？

建议答：

> Knowledge graph 主要告诉 agent“什么是什么、彼此怎么相关”；context graph 继续记录“为什么在这个时间、这些证据和政策下作出这个决定”。它把 decision traces、temporal validity 和 provenance 加进来，所以 agent 不只会查事实，也能检索先例、处理例外和解释行动。两者最好组合使用，而不是互相替代。

### Q：为什么一人公司需要 context graph？

建议答：

> 因为一人公司不能靠管理层、会议和老员工的记忆来传递上下文。Founder 的每次高价值判断都应该变成 decision trace，进入共享的 context graph。之后多个 agent 可以复用这些先例，自主完成大部分工作，只把真正新的或高风险的例外升级给 founder。这样一个人的 judgment 会变成可复用的组织资本，而不是每天从头消耗一次。

### Q：Jesse 认为 AI-native organization 是什么？

建议答：

> 它不是在传统组织上加一层 AI，而是把组织设计成 goals、agents、tools、context、decision rights 和 feedback loops 的系统。人负责使命、价值判断和最终责任；agent 负责大部分执行；context graph 负责共享状态、制度记忆、先例和审计。组织通过每次行动留下的轨迹持续变聪明。

### Q：如何开始构建？

建议答：

> 从 decision-dense、exception-heavy 的流程开始，而不是先建一个巨大的通用图。先定义基础实体和权限，再在真实决策点捕获 trace；加入时间、来源和结果；让 agent 检索先例并逐步获得自主权；最后用“what if”问题测试系统是否形成了可用的 organizational world model。

## 8. 需要 Jesse 本人确认的歧义

1. **原创归属**：用户已经确认仓库代表其当前理解，但哪些论点是 Jesse 独立提出、哪些是他明确采纳的外部观点，当前仓库仍无法完全区分。知识库可以把它们当作其当前立场，但不能据此主张首创权。
2. **Ontology 的最终立场**：Jesse 更偏向“既有标准打底 + 学习组织层”，还是更激进的“schema as output”？本稿把两者综合为分层架构，但需要 Jesse 确认。
3. **Context graph 的边界**：Jesse 是否把它限定为 decision traces，还是更广义地包括所有带时间、来源和关系的 agent memory？不同页面定义宽窄略有差异。
4. **Capture 路径**：Jesse 是否认同“必须在工作发生处 host/capture decision”，还是也认为跨系统 observability 与后处理足够？仓库同时保留这两派观点。
5. **SoloUnicorn 连接**：本仓库没有直接说明一人独角兽。将 context graph 定位为 SoloUnicorn 的组织操作系统，是这次研究提出的理论延伸，需要 Jesse 确认后才能作为第一人称观点发布。
6. **Marketplace 方向**：仓库首页提出 context graph marketplace（例如 `/Users/jesseqin/dev/context_graph_site/components/sections/HeroSection.tsx` 第 77–95 行、`/Users/jesseqin/dev/context_graph_site/components/sections/MarketplacePreview.tsx` 第 39–53 行），但当前是否仍是 Jesse 的实际产品方向，需要更新确认。

## 9. 建议的知识库事实等级

- **PUBLIC / 高置信**：Jesse 正在研究并传播 context graph、ontology、decision traces、temporal context、institutional intelligence 与 AI-native organization 的关系。
- **PUBLIC / 项目立场**：采用既有 ontology 基础、学习组织特有结构；把 context graph 视为 AI agent 的长期制度记忆与决策层。
- **REVIEW / 理论综合**：SoloUnicorn = founder + specialized agents + shared context graph；founder judgment 是可复利的组织资本。
- **REVIEW / 强主张**：simulation 是 context graph 成熟度的最终测试；context capture 必须发生在 workflow write path。
- **不要表述为个人原创**：context graph、decision traces、two clocks、learned ontology、organizational world model、institutional intelligence 等术语与原始论证均有明确外部来源。
