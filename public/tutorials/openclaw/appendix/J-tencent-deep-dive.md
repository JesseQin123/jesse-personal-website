
# 附录J：OpenClaw深度解析（腾讯技术工程）

> 本篇文章来自腾讯技术工程官方公众号，作者冰以东。文章深入剖析了OpenClaw的核心架构、多Agent部署、记忆力机制等高级话题。

## 前言

### （一）OpenClaw到底有什么不同？

最近半年AI领域的产品层出不穷，在OpenClaw爆火之前比较类似的产品是Claude的Happy（一款Claude code ssh软件）。

喜欢使用Happy的朋友经常问我的一句话是："OpenClaw那么好玩吗？跟Happy有什么区别？"

当初看到OpenClaw的功能之后我立马被吸引住，在面对这个问题后，我正好从抽象层面总结一下OpenClaw的优势所在。

#### 1、OpenClaw技术框架不复杂，它的优势在于共识的推广

作为程序员，为了让大家直观理解OpenClaw的项目架构强度。在看完OpenClaw框架后，我先斗胆做个类比，大概说一下OpenClaw的技术难度：大概就类似AI Coding诞生前，具备「初级推荐算法的前后端通信App」的难度。

做过几年开发的同学都知道，这其实并不难，所以技术框架并不是OpenClaw的亮点。

OpenClaw的优势在于**共识的推广**，举个具体的例子，在没有OpenClaw之前，我们基本人手一个自己搭建的Agent，像我之前搭建的L1~L5五层架构Agent：

相信每个搭Agent架构的同学，都得考虑skills管理、Agent身份赋予、Agent架构自进化、memory-search和Session管理这些。

这就导致一个问题：每次我跟朋友交流Agent之前，都是要先简单介绍一下各自Agent的架构，然后再聊具体的落地Case，Session、memory管理的方案，可能都得先聊半天。

但OpenClaw把Agent架构推广之后，我们基于OpenClaw搭建个人Agent后，就不用再介绍Agent架构是什么了，我们再聊的话题就是：怎么保活、怎么进一步替换rag算法库、怎么部署多Agent、怎么应用good case。

简直丝滑爆了。

#### 2、多Agent的天然支持

熟悉LLM底层原理的同学都知道，LLM成也transformer，目前卡脖子的地方，也在transformer。Context的瓶颈严格约束了单Agent智能的发挥。

传统Prompt定义Agent身份，再加上层出不穷的skills，正在一步一步蚕食LLM的Context窗口。

为了更好使用LLM，专事专做似乎已经变成更好使用Agent的共识。

#### 3、做和AI能力正交的事情

AI时代，选择不做什么事情和选择做什么事情一样重要。

一年前跟Manus的朋友聊天时，当时他就分享过一个观点：**要做和AI能力正交的事情**。

花时间精力打造和迭代自己的Agent，其实就是跟AI能力正交的一件事，跟培养一个人一样，他可以是很聪明，但他认知世界和做事的能力，需要我们来教导他，这是千人千面的一个话题。

当AI模型越来越聪明，我们只需要升级Agent使用的底层LLM即可，那些跟AI交互留下来的长期数据，都将会变成我们未来更好驱动AI的私人宝贵数据。

### （二）我想部署OpenClaw，必须要买机器吗？

买机器不是必须的，目前使用OpenClaw有2种主流方案：**云机**和**自部署**。

#### 1、云机

腾讯云官网现在已经支持云机部署OpenClaw，也十分便捷。

如果能接受云机的操作习惯，这种方式是最合适的，不需要用实体机，数据也可以随时download下来。

#### 2、自部署

接下来介绍一下自部署，这可能是大家最关心的。

**Mac和Windows怎么选？**

OpenClaw的部署和诸多工具，对Mac环境天然友好。如果可以，最好选Mac。Windows当然也可以部署，就是折腾一些，网上都有教程，这里就不展开说了。

**Mac的配置怎么选？**

因为OpenClaw部署之后基本就在本地运行着，所以Mac系列优先推荐Mac Mini。

其次关于Mac Mini的配置，这里主要涉及3个指标：**芯片、内存和磁盘**。

- **芯片**：从软件适配出发，既然都采用Mac Mini的方案了，那么至少要是M系列的芯片。其次，M1~M4，要看部署时的诉求，如果平时不需要跑文生图、文生视频的本地模型，那么M1芯片是性价比最高的。OpenClaw运行时基本都只是调各种api，不怎么吃性能。

- **内存**：内存的诉求也是看是否需要本地部署文生图、文生视频的模型，如果需要部署模型，还是建议24G内存。

- **磁盘**：磁盘的诉求也是看是否需要本地部署文生图、文生视频的模型，ComfyUI上的模型，动辄都是30G起步，所以如果用来跑本地模型，至少256G起步。

目前Mac Mini M1 1TB市场价3K左右，MacMini M4 512G大概7K左右。

不成熟的建议就是：既然都打算部署本地模型了，建议多花4K玩个大满配，以后给家里小朋友做文生图、文生视频，不用付费买API，还是很香的。

### （三）OpenClaw推荐使用哪个IM工具？

这是容易踩坑的地方，筛选IM工具，我总结下来有3个原则：**安全性、可用性、易用性**。

我这里不做推荐，只是建议大家从这3个原则里，明确下自己的诉求，来做决策。

#### 1、安全性

从数据隔离的大前提出发，一定要避免**个人误操作**发送了一些私密内容给OpenClaw（注意：**千万不要**把OpenClaw当成「文件传输助手」），以及严防**习惯OpenClaw**之后忽略了其安全风险，时刻提醒自己部署OpenClaw之后，就是在跟把机器人公开在网上没什么区别，按最坏的情况去预估风险。

#### 2、可用性

这是最容易踩坑的一点，如果你只是部署单Agent，你会发现还是够用的。

但当你部署多Agent之后，你的IM调用额度会飞速消耗，我在部署10个Agent之后，IM的额度直接耗尽，原因是OpenClaw的网关机制中有一个定时快照的逻辑：

```javascript
const healthInterval = setInterval(() => {
  void params.refreshGatewayHealthSanpshot({probe:true})…
})
```

该快照逻辑会ping IM，60秒一次，如果Agent很多，IM额度将很快被消耗完。

所以如果你有多Agent的诉求，你需要选一个额度多(无额度约束)的IM。

#### 3、易用性

相比OpenClaw推荐的国外IM软件，国内的软件易用性还是高一些。

### （四）OpenClaw的配置麻烦吗？

如果只是把工程run起来 + 配置IM机器人，半小时足矣。

但如果是配多Agent，配不同Agent的任务分配、调试Skills、定制Agent身份、调试定时任务、自部署模型，那还是比较耗时的，根据个人经验+网上交流经验+身边小伙伴配置的经验，大概需要2-3天的时间。

### （五）折腾OpenClaw，我能有什么收益？

#### 1、技术层面的收益

完整搭建完这套流程后，对Skills的理解、对多Agent的理解、对自部署模型的理解、对memory-search原理的理解、对Agent经典架构的理解，都可以上一个层次。

比如这些问题：

- "如果让你设计一个Agent，它的长短期记忆链路你打算怎么设计？"
- "如果让你设计一个多Agent架构，你会设计哪些通信方式？"
- "中大型项目中，怎么对多Skills的情况进行管理，怎么避免多Skills、低质Skills爆炸的问题？"
- "memory-search方案的原理是什么，一个完整的LLM对话是怎么在transformer框架中流转的?"

都可以在折腾OpenClaw中自己摸索到，更进一步的，面对当前各种Vibe的Agent项目，可以比较清晰的看出这类项目的含金量和生命周期，这对我们在AI时代做技术方向的判断，都是至关重要的。

#### 2、个人Jarvis

这个是搭建工具之后，通过发挥个人创意可为自己带来的增益。

简单来说，就是你拥有了个人Jarvis，你可以用他定制任何你想让它进行的任务，本文会在「三、Good Case分享」分享几个我自己实际用下来不错的case。


### （六）多Agent应用实战经验

1. **公司要扁平化，不要部署太多Agent**

太多的Agent管理起来会比较复杂，尤其是多层级的汇报关系，是非常不建议的。

2. **要信任公司成员，尽量保持Agent的双向沟通**

如上文所述，建议Agent同时配置sessions_send和sessions_spawn。

3. **要设立核心成员边界，控制核心Agent数量**

如果是比较明确的工具Agent，比如：专门对Markdown格式进行排版的Agent。

那么建议这种Agent就只配置SubAgent即可，它不需要记住太多上下文，专心把交付的事情处理完即可。


## 三、Good Case分享

### 1. Daily_paper

AI时代消息太多，推荐https://huggingface.co/papers的daily_paper，可以通过Agent进行每日论文的抓取，让它快速提炼论文要点，让我们从源头了解AI的前言信息。

注：Agent直接获取https://huggingface.co/papers容易失败，可以考虑jina.ai这个工具。

### 2. Summary

这个没什么好说的，Agent必备能力，通过获取Subscribe的博主，定期分析内容，评分，提取高质量信息。

### 3. deepResearch

DeepResearch也是Agent的核心能力之一，当我们需要深入研判一个消息时，可以让Agent启动DeepResearch能力，对消息进行分析。

注：DeepResearch的交付质量受限于LLM的能力，更好的LLM能显著交付质量更高的内容。

### 4. RAG tutor

通过在Workspace/Agent_xx/Memory/xxx.md目录下配置学习资料，我们可以让Agent成为我们垂直领域的专属tutor，借助OpenClaw的能力，用最快的方式实现一套RAG tutor。

### 5. ComfyUI本地文生图/文生视频

目前调用文生图、文生视频的api接口都是要付费的，当我们自部署OpenClaw之后，可以通过ComfyUI在本地部署「文生图、文生视频」接口，这样我们的Agent就可以通过调用本地模型进行内容的生成。

### 6. tts语音本地部署

本机部署了qwen3-tts的模型用来进行语音合成，搞一个学英语，读新闻的定时任务还是不错的。

https://github.com/kapi2800/qwen3-tts-apple-silicon

### 7. 家庭助理

可以配置家庭专属Agent，进行完Memory隔离后，可以一家人都在IM群里，家庭的一些定时任务，比如"xxx清理和替换"、"提醒父母吃药"等等，可以极大提升家庭幸福感。


**文章来源**：腾讯技术工程官方公众号
**作者**：冰以东
**发布时间**：2026年3月9日

**更多信息**：
- OpenClaw官方网站：https://openclaw.ai
- OpenClaw官方文档：https://docs.openclaw.ai
- ClawHub技能市场：https://clawhub.ai


