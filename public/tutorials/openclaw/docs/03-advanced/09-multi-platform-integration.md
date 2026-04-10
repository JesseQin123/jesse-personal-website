
# 第9章节 多平台集成

> 💡 **本章节目标**：学会将OpenClaw接入飞书、企业微信、钉钉、QQ等国内主流平台，实现随时随地使用AI助手。飞书作为最现代化、开发布友好的平台，将优先介绍。

## 📱 本章节内内容

- 9.1 飞书Bot配置
  - 9.1.1 飞书机器人介绍
  - 9.1.2 快速开始
  - 9.1.3 创建飞书应用
  - 9.1.4 配置 OpenClaw
  - 9.1.5 启动并测试
  - 9.1.6 访问控制
  - 9.1.7 群组配置
  - 9.1.8 获取群组/用户 ID
  - 9.1.9 高级配置
  - 9.1.10 多账号配置
  - 9.1.11 多 Agent 配置
    - 9.1.11.1 配合飞书使用
    - 9.1.11.2 实战案例：4个专业助手
    - 9.1.11.3 配置注意事项
    - 9.1.11.4 故障排查
    - 9.1.11.5 配置对比
    - 9.1.11.6 使用建议
    - 9.1.11.7 本地多 Agent 管理（无需绑定 IM 平台）⭐新增
- 9.2 企业微信Bot配置
- 9.3 钉钉Bot配置
- 9.4 QQ Bot配置
- 9.5 微信接入（ClawBot 官方方案）⭐新增
  - 9.5.1 ClawBot 是什么
  - 9.5.2 安装步骤
  - 9.5.3 工作原理
  - 9.5.4 与第三方方案对比
  - 9.5.5 配置与使用
  - 9.5.6 注意事项
- 9.6 浏览器渠道（Dashboard v2）⭐新增
  - 9.6.1 什么是浏览器渠道
  - 9.6.2 适用场景
  - 9.6.3 访问方式与功能


### 9.1.15 实战案例：配置双机器人

> 💡 **真实案例**：本节展示一个实际的双机器人配置案例，适用于需要分离不同功能或团队的场景。

#### 场景说明

某团队需要两个飞书机器人：
- **机器人1**：用于日常怎么办公和通用任务
- **机器人2**：用于特定项目或测试环境

#### 完整配置步骤

**1. 在飞书开放平台创建两个应用**

分别创建两个企业自建应用，获取：
- 机器人1：App ID `cli_xxxxxxxxxxxxxxxx`，App Secret
- 机器人2：App ID `cli_yyyyyyyyyyyyyyyy`，App Secret

**2. 配置 OpenClaw**

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "meta": {
    "lastTouchedVersion": "2026.2.6-3",
    "lastTouchedAt": "2026-02-08T09:49:58.322Z"
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "dmPolicy": "pairing",
      "accounts": {
        "bot1": {
          "appId": "cli_xxxxxxxxxxxxxxxx",
          "appSecret": "your-app-secret-1",
          "botName": "OpenClaw助手1",
          "enabled": true
        },
        "bot2": {
          "appId": "cli_yyyyyyyyyyyyyyyy",
          "appSecret": "your-app-secret-2",
          "botName": "OpenClaw助手2",
          "enabled": true
        }
      },
      "domain": "feishu",
      "groupPolicy": "open",
      "connectionMode": "websocket",
      "requireMention": true,
      "renderMode": "auto",
      "streaming": true,
      "blockStreaming": true,
      "replyToMode": "all"
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "lan",
    "auth": {
      "mode": "token",
      "token": "your-secure-random-token-here"
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "your-model-provider/your-model"
      },
      "workspace": "/path/to/your/workspace",
      "compaction": {
        "mode": "safeguard"
      },
      "maxConcurrent": 4
    }
  },
  "plugins": {
    "entries": {
      "feishu": {
        "enabled": true
      }
    }
  }
}
```
**3. 配置飞书应用权限**

为两个应用分别配置权限（批量导入 JSON，参见 9.1.3 节）。

**4. 配置事件订阅**

为两个应用分别配置：
- 选择 **使用长连接接收事件**
- 添加事件：`im.message.receive_v1`

**5. 启动网关**

```bash
# 启动网关
openclaw gateway install

# 检查状态
openclaw gateway status

# 应该看到：
# ✅ Gateway: running (pid 57344, state active)
# ✅ Gateway target: ws://127.0.0.1:18789
```
**6. 测试机器人**

在飞书中分别给两个机器人发布送消息：

你：hi
机器人：[配对码] 请管理员批准配对
**7. 批准配对**

```bash
# 查看配对请求
openclaw pairing list feishu

# 批准机器人1
openclaw pairing approve feishu <配对码1>

# 批准机器人2
openclaw pairing approve feishu <配对码2>
```
**8. 验证运行**

查看日志确认两个机器人都在正常运行：

```bash
openclaw logs --follow

# 应该看到：
# HEARTBEAT_OK
# hi
# connected | running
# agent main | session main (heartbeat)
```
#### 常见访问题处理

**访问题1：配置文件 JSON 语法错误**

```bash
# 错误：JSON5 parse error at line 443
# 原因：使用了 Python 语法（True/False）而非 JSON 语法（true/false）

# 检查语法
cat ~/.openclaw/openclaw.json | python -m json.tool

# 修正：
# ❌ "enabled": True
# ✅ "enabled": true
```
**访问题2：网关启动失败**

```bash
# 错误：Gateway start blocked: set gateway.mode=local
# 解决：确保配置了 gateway.mode

{
  "gateway": {
    "mode": "local"
  }
}
```
**访问题3：工作空间路径错误**

```bash
# 错误：ENOENT: no such file or directory, mkdir '/root'
# 原因：配置文件中使用了 Linux 路径，但实际是 macOS

# 修正（macOS）：
{
  "agents": {
    "defaults": {
      "workspace": "/Users/yourusername/clawd"
    }
  }
}
```
**访问题4：插件未找到**

```bash
# 错误：plugin not found: qqbot
# 原因：配置文件中引用了未安装的插件

# 解决：只保留已安装的插件
{
  "plugins": {
    "entries": {
      "feishu": {
        "enabled": true
      }
      // 移除 qqbot, ddingtalk, wecom 等
    }
  }
}
```
#### 配置检查清单

- [ ] 两个飞书应用已创建
- [ ] App ID 和 App Secret 已获取
- [ ] 配置文件 JSON 语法正确
- [ ] gateway.mode 已设置为 "local"
- [ ] gateway.auth.token 已配置
- [ ] workspace 路径正确（macOS/Linux）
- [ ] 只配置了已安装的插件
- [ ] 两个应用的权限已配置
- [ ] 两个应用的事件订阅已配置（长连接）
- [ ] 两个应用已发布布
- [ ] 网关已启动并运行正常
- [ ] 两个机器人都已配对批准
- [ ] 日志显示正常运行

#### 成功标志

配置成功后，你应该看到：

```bash
# 网关状态
$ openclaw gateway status
✅ Gateway: running (pid xxxxx, state active)
✅ Gateway target: ws://127.0.0.1:18789

# 日志输出
$ openclaw logs --follow
HEARTBEAT_OK
hi
connected | running
agent main | session main (heartbeat) | your-model-provider/your-model
tokens 25k/200k (13%)
```
两个机器人都可以正常接收和回复消息！🎉


## 9.6 Discord Bot配置（参考）

> ⚠️ **过时提示**：本节内内容编写于2026年1月，当时OpenClaw还叫Clawbot/Moltbot。虽然部分命令已过时，但配置流程仍可作为参考。

### 9.5.1 Discord机器人介绍

**Discord的优势**：

1. **国际化平台**
   - 全球用户基础
   - 多语言支持
   - 社区活跃

2. **开发布友好**
   - API完善
   - 文档详细
   - 权限灵活

3. **功能丰富**
   - 支持语音频道
   - 支持富文本
   - 支持自定义表情

**适用场景**：
- ✅ 国际团队协作
- ✅ 游戏社区
- ✅ 开源项目
- ✅ 技术交流

### 9.5.2 创建Discord机器人

**步骤1：访问开发布者门户**

https://discord.com/developers/applications
**步骤2：创建应用**

1. 点击"New Application"
2. 输入应用名称（如：My OpenClaw Bot）
3. 点击"Create"

**步骤3：创建Bot**

1. 在左侧菜单选择"Bot"
2. 点击"Add Bot"
3. 点击"Reset Token" → "Copy"
4. ⚠️ **保存Token**，后续无法再查看

**步骤4：配置Bot权限**

1. 在Bot页面下滑
2. 开启"Message Content Intent"
3. 点击"Save Changes"

**步骤5：生成邀请链接**

1. 在左侧菜单选择"OAuth2" → "URL Generator"
2. 在"Scopes"中勾选：`bot`
3. 在"Bot Permissions"中勾选：
   - Send Messages
   - Read Message History
4. 复制生成的URL

**步骤6：邀请Bot到服务器**

1. 在浏览器中打开刚才复制的URL
2. 选择你的Discord服务器
3. 点击"授权"
4. 完成验证

### 9.5.3 配置 OpenClaw（旧版命令参考）

> ⚠️ **注意**：以下命令使用的是旧版本的`clawdbot`命令，新版本应使用`openclaw`。

**配置步骤**（需要更新为新命令）：

```bash
# 旧版命令（仅供参考）
clawdbot onboard

# 新版命令（推荐）
openclaw onboard

# 配置流程：
# 1. 选择 Yes 接受风险
# 2. 选择 QuickStart
# 3. 配置模型（如 GLM 4.7）
# 4. 选择通道：Discord
# 5. 输入 Bot Token
# 6. 配置 Skills 和 Hooks
```
**启动服务**：

```bash
# 旧版命令
clawdbot gateway --port 18789 --verbose

# 新版命令
openclaw gateway --port 18789 --verbose

# 后台运行
nohup openclaw gateway --port 18789 --verbose > /dev/null 2>&1 &
```
**配对连接**：

```bash
# 1. 在Discord中私聊Bot，获取配对码
# 2. 停止Gateway服务（Ctrl+C）
# 3. 运行配对命令（旧版）
clawdbot pairing approve discord <Pairing code>

# 新版命令（需要确认）
openclaw pairing approve discord <Pairing code>

# 4. 重新启动Gateway
openclaw gateway --port 18789 --verbose
```
### 9.5.4 使用Discord Bot

**私聊模式**：
1. 在Discord中找到你的Bot
2. 点击Bot头像
3. 点击"发布送消息"
4. 直接发布送消息即可
**群聊模式**：
1. 在频道中@Bot
2. 输入你的访问题
3. Bot会回复你

示例：
@MyBot 今天天气怎么样？
### 9.5.5 注意事项

**命令更新**：
- 本节使用的`clawdbot`命令已过时
- 新版本统一使用`openclaw`命令
- 配置流程基本相同，但命令需要更新

**配置参考**：
- Discord的配置流程仍然有效
- Bot创建步骤没有变化
- 主要是OpenClaw 命令需要更新

**推荐做法**：
- 优先使用国内平台（飞书、QQ、企微）
- Discord适合国际团队
- 如需使用Discord，请参考最新官方文档


## 9.6 浏览器渠道（Dashboard v2）

> 💡 **状态**：稳定可用，随橙皮书 v1.3 发布 Dashboard v2 全新管理后台。

### 9.6.1 什么是浏览器渠道

浏览器渠道是 OpenClaw 提供的最简单的使用方式——**直接在浏览器中使用 OpenClaw，无需安装任何客户端或 IM 平台**。

只需在浏览器中打开 Dashboard 地址，就可以：
- 与 AI 智能体对话
- 管理理 Skills 和配置
- 查看运行日志和状态
- 上传文件和知识库

### 9.6.2 适用场景

| 场景 | 说明 |
|------|------|
| **临时使用** | 在别人电脑或公共电脑上临时使用，不想安装软件 |
| **公司电脑受限** | 公司电脑无法安装新软件，但浏览器可以上网 |
| **多设备切换** | 在不同电脑上通过浏览器统一访问 |
| **团队演示** | 通过浏览器向同事演示 OpenClaw 的功能 |
| **快速体验** | 想快速体验 OpenClaw，不想折腾客户端安装 |

### 9.6.3 访问方式与功能

**访问地址**：

```
http://127.0.0.1:18789/
```

如果是远程服务器部署，将 `127.0.0.1` 替换为服务器 IP：

```
http://你的服务器IP:18789/?token=你的访问令牌
```

**Dashboard v2 新功能**（橙皮书 v1.3 发布）：

- **全新 UI 设计**：更直观的数据展示和配置界面
- **实时对话**：支持流式输出，体验更流畅
- **Skills 管理**：直接在浏览器中安装、启用、禁用 Skills
- **模型切换**：可视化切换不同 AI 模型
- **知识库管理**：上传和管理知识库文件
- **日志查看**：实时查看 Gateway 运行日志
- **多用户支持**：支持多用户同时在线使用

**安全建议**：

- 本地使用无需特别配置
- 远程访问务必设置 token 认证
- 生产环境建议配置 HTTPS
- 使用防火墙限制访问来源 IP


## 📝 本章节小结

本章节学习了OpenClaw的多平台集成功能：

### 核心内内容

1. **飞书Bot配置**
   - 创建飞书应用
   - 配置 OpenClaw
   - 实战案例（个人助手、项目管理）
   - 与飞书生态集成
   - 高级功能（流式输出、多Agent路由）

2. **企业微信Bot配置**
   - 注册和创建应用
   - 配置 OpenClaw
   - 实战案例（个人助手、团队协作、客户服务）
   - 手机端使用技巧

3. **钉钉Bot配置**
   - 创建钉钉应用
   - 配置 OpenClaw
   - 实战案例（工作助手、审批流程）

4. **QQ Bot配置**
   - 创建QQ机器人
   - 配置 OpenClaw
   - 实战案例（个人助手、群管理、娱乐互动）
   - 限制和注意事项

5. **微信接入（ClawBot 官方方案）**
   - 官方插件安装与配置
   - 基于 WeChatFerry 的工作原理
   - 与第三方方案对比
   - 风险提示与注意事项

6. **浏览器渠道（Dashboard v2）**
   - 零安装使用 OpenClaw
   - Dashboard v2 全新功能
   - 适用场景与安全建议

### 平台选择

- **飞书**：现代化怎么办公、文档协作、技术团队（推荐优先）
- **企业微信**：企业怎么办公、客户服务
- **钉钉**：考勤管理、审批流程
- **QQ**：个人使用、社交互动
- **微信**：微信重度用户、群自动化（注意封号风险）
- **浏览器**：临时使用、受限环境、快速体验

### 实战技巧

- ✅ 选择合适的平台
- ✅ 合理配置权限
- ✅ 优化使用体验
- ✅ 多平台组合使用
- ✅ 遵守平台规则

### 下一步

- 学习第10章节：API服务封装
- 掌握Banana绘图、Notion同步等
- 构建多功能AI工具箱


## 💡 常见访问题

**Q1：哪个平台最好用？**
A：看使用场景。技术团队推荐飞书（开发布友好、功能强大），企业用飞书/钉钉，个人用QQ，客户服务用企业微信。

**Q2：可以同时接入多个平台吗？**
A：可以，OpenClaw支持同时接入多个平台。

**Q3：配置复杂吗？**
A：云端部署很简单，参考官方教程即可。飞书配置最简单，支持WebSocket长连接。

**Q4：免费吗？**
A：平台基础功能都免费，OpenClaw也免费。

**Q5：手机上能用吗？**
A：可以，所有平台都支持手机端。飞书的移动端体验最好。


## 9.1.16 多机器人多 Agent 模式：打造你的 AI 助手团队

> 💡 **完整教程**：本节详细介绍如何使用多 Gateway + 多飞书机器人架构，打造专业的 AI 助手团队。

### 9.1.16.1 为什么需要多 Agent？

作为超级个体创业者，你可能需要不同类型的 AI 助手来处理不同的工作：

- **主助理**：使用最强大的模型（Claude Opus）处理复杂任务
- **内内容创作助手**：专注于文章节写作、文案创作
- **技术开发布助手**：处理代码开发布、技术访问题
- **AI 资讯助手**：快速获取和整理 AI 行业动态

传统的单 Agent 模式需要频繁切换模型和上下文，效率低下。多 Agent 模式让你可以同时拥有多个专业助手，各司其职。

![多Agent架构](https://i-blog.csdnimg.cn/img_convert/d9d0d47052a8dbef500c9ceab133ee7e.png)

### 9.1.16.2 实现方案对比

#### 方案一：单 Gateway + Bindings（不推荐）

```json
{
  "bindings": [
    {
      "agentId": "main-agent",
      "match": {
        "channel": "feishu",
        "peer": {
          "kind": "group",
          "id": "oc_xxx"
        }
      }
    }
  ]
}
```
**访问题**：
- ❌ OpenClaw 2026.3.2 的 bindings 功能不稳定
- ❌ peer.id 匹配经常失败
- ❌ 所有群组都路由到同一个 agent
- ❌ 需要 `/reset` + `/agent` 命令手动切换

#### 方案二：多 Gateway + 多飞书机器人（推荐）✅

**核心思路**：
- 创建 4 个飞书机器人应用
- 启动 4 个独立的 OpenClaw Gateway
- 每个 Gateway 连接一个飞书机器人
- 每个 Gateway 使用不同的 Agent 和模型

**优势**：
- ✅ 完全独立，互不干扰
- ✅ 直接私聊不同机器人即可切换 agent
- ✅ 不需要群组配置
- ✅ 不需要手动切换命令
- ✅ 配置清晰，易于管理
- ✅ 可以独立重启某个 Gateway

### 9.1.16.3 架构设计

#### 整体架构

┌─────────────────────────────────────────────────────────┐
│                      飞书 (Feishu)                       │
├─────────────────────────────────────────────────────────┤
│  机器人1: 主助理          机器人2: 内内容创作助手          │
│  机器人3: 技术开发布助手    机器人4: AI资讯助手            │
└─────────────────────────────────────────────────────────┘
                          ↓ WebSocket
┌─────────────────────────────────────────────────────────┐
│                   OpenClaw Gateway 层                    │
├──────────────┬──────────────┬──────────────┬────────────┤
│ Gateway 1    │ Gateway 2    │ Gateway 3    │ Gateway 4  │
│ 端口: 18789  │ 端口: 18790  │ 端口: 18791  │ 端口: 18792│
│ Profile:     │ Profile:     │ Profile:     │ Profile:   │
│ main-        │ content-     │ tech-dev     │ ai-news    │
│ assistant    │ creator      │              │            │
└──────────────┴──────────────┴──────────────┴────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      Agent 层                            │
├──────────────┬──────────────┬──────────────┬────────────┤
│ main-agent   │ content-agent│ tech-agent   │ainews-agent│
│ Claude Opus  │ Claude Sonnet│ Claude Sonnet│ Gemini 2.5 │
│ 4.6 Thinking │ 4.5          │ 4.5 Thinking │ Flash      │
└──────────────┴──────────────┴──────────────┴────────────┘
#### Profile 隔离机制

使用 `--profile <name>` 参数，OpenClaw 会：
- 配置文件：`~/.openclaw-<name>/openclaw.json`
- 状态数据：`~/.openclaw-<name>/`
- 独立端口：18789, 18790, 18791, 18792
- 独立会话：完全隔离的上下文

### 9.1.16.4 配置步骤

#### 第一步：创建飞书机器人应用

在飞书开放平台创建 4 个机器人应用：

1. **主助理**
   - 应用名称：主助理
   - 描述：处理复杂任务的主力助手
   - 获取 App ID 和 App Secret

2. **内内容创作助手**
   - 应用名称：内内容创作助手
   - 描述：专注内内容创作和文案写作
   - 获取 App ID 和 App Secret

3. **技术开发布助手**
   - 应用名称：技术开发布助手
   - 描述：处理代码开发布和技术访问题
   - 获取 App ID 和 App Secret

4. **AI资讯助手**
   - 应用名称：AI资讯助手
   - 描述：快速获取 AI 行业资讯
   - 获取 App ID 和 App Secret

**重要配置**：
- 启用机器人能力
- 配置事件订阅：选择"长连接"模式
- 添加权限：消息接收、消息发布送

#### 第二步：配置 Agent

创建 4 个 Agent 配置目附录：

```bash
mkdir -p agent-configs/{main-agent,content-agent,tech-agent,ainews-agent}
```
为每个 Agent 创建配置文件：

**agent-configs/main-agent/USER.md**：

```markdown
# 用户信息

- 姓名：Maynor
- 职业：超级个体创业者
- 工作领域：AI 技术、内内容创作、技术开发布
```
**agent-configs/main-agent/SOUL.md**：

```markdown
# Agent 身份

你是 Maynor 的主助理，负责处理各类复杂任务。使用 Claude Opus 4.6 Thinking 模型，提供最高质量的服务。
```
类似地为其他 3 个 Agent 创建配置文件。

#### 第三步：运行配置脚本

使用自动化脚本创建多 Gateway 配置：

```bash
# 下载配置脚本
curl -O https://example.com/setup-multi-gateway.sh
chmod +x setup-multi-gateway.sh

# 运行配置脚本
./setup-multi-gateway.sh
```
脚本会自动：
1. 停止当前 Gateway
2. 备份现有配置
3. 创建 4 个独立的 Profile 配置
4. 生成管理脚本

#### 第四步：启动所有 Gateway

```bash
# 启动所有 Gateway
./start-all-gateways.sh

# 检查状态
./check-gateways.sh

# 验证配置
./verify-setup.sh
```
### 9.1.16.5 使用方法

#### 直接私聊机器人

这是最简单的使用方式：

1. **处理复杂任务**
   - 在飞书中搜索"主助理"机器人
   - 直接发布送消息
   - 自动使用 Claude Opus 4.6 Thinking

2. **创作内内容**
   - 搜索"内内容创作助手"机器人
   - 发布送写作需求
   - 自动使用 Claude Sonnet 4.5

3. **开发布代码**
   - 搜索"技术开发布助手"机器人
   - 发布送技术访问题
   - 自动使用 Claude Sonnet 4.5 Thinking

4. **获取资讯**
   - 搜索"AI资讯助手"机器人
   - 请求最新动态
   - 自动使用 Gemini 2.5 Flash（快速响应）

#### 在群组中使用（可选）

如果需要在群组中使用：

1. 将对应的机器人添加到群组
2. @ 机器人发布送消息
3. 每个群组可以添加多个机器人，灵活切换

**建议**：
- 工作群：添加主助理 + 技术开发布助手
- 内内容创作群：添加内内容创作助手
- 资讯群：添加 AI资讯助手

### 9.1.16.6 管理和维护

#### 日常管理

```bash
# 查看所有 Gateway 状态
./check-gateways.sh

# 查看实时日志
tail -f logs-main-assistant.log
tail -f logs-content-creator.log
tail -f logs-tech-dev.log
tail -f logs-ai-news.log

# 查看所有日志
tail -f logs-*.log
```
#### 重启 Gateway

```bash
# 重启所有
./stop-all-gateways.sh
sleep 2
./start-all-gateways.sh

# 重启单个
ps aux | grep "openclaw.*--profile main-assistant"
kill <PID>
./start-main-assistant.sh
```
#### 修改配置

```bash
# 编辑配置
vim ~/.openclaw-main-assistant/openclaw.json

# 验证配置
jq . ~/.openclaw-main-assistant/openclaw.json

# 重启生效
# (停止并重启对应的 Gateway)
```
#### 监控资源

```bash
# 查看内存占用
ps aux | grep openclaw-gateway | awk '{print $4, $11}'

# 查看 CPU 占用
ps aux | grep openclaw-gateway | awk '{print $3, $11}'

# 查看端口占用
lsof -i :18789
lsof -i :18790
lsof -i :18791
lsof -i :18792
```
### 9.1.16.7 实战案例

#### 案例一：内内容创作工作流

**场景**：写一篇技术文章节

1. **构思阶段**
   - 私聊"主助理"：讨论文章节主题和大纲
   - 使用 Claude Opus 进行深度思考

2. **写作阶段**
   - 私聊"内内容创作助手"：撰写文章节内内容
   - 使用 Claude Sonnet 快速生成

3. **代码示例**
   - 私聊"技术开发布助手"：编写代码示例
   - 使用 Claude Sonnet Thinking 确保代码质量

4. **资讯补充**
   - 私聊"AI资讯助手"：获取最新技术动态
   - 使用 Gemini Flash 快速检索

#### 案例二：技术开发布工作流

**场景**：开发布一个新功能

1. **需求分析**
   - 主助理：分析需求，设计架构

2. **代码实现**
   - 技术开发布助手：编写代码，调试访问题

3. **文档编写**
   - 内内容创作助手：编写技术文档

4. **技术调研**
   - AI资讯助手：查找相关技术资料

#### 案例三：日常工作场景

**上午 9:00 - 规划工作**
- 主助理：制定今天的工作计划

**上午 10:00 - 写作**
- 内内容创作助手：撰写文章节

**下午 2:00 - 开发布**
- 技术开发布助手：编写代码

**下午 4:00 - 学习**
- AI资讯助手：了解行业动态

**晚上 8:00 - 总结**
- 主助理：总结今天的工作

### 9.1.16.8 性能和成本

#### 资源占用

- **内存**：每个 Gateway 约 400MB
- **总内存**：4 个 Gateway 约 1.6GB
- **CPU**：空闲时几乎为 0，处理时根据任务而定
- **磁盘**：配置文件和日志约 100MB

#### 成本分析

假设使用自建 API 代理：

| Agent | 模型 | 用途 | 月使用量 | 月成本 |
|-------|------|------|----------|--------|
| main-agent | Claude Opus 4.6 | 复杂任务 | 100万 tokens | $15 |
| content-agent | Claude Sonnet 4.5 | 内内容创作 | 200万 tokens | $6 |
| tech-agent | Claude Sonnet 4.5 | 技术开发布 | 150万 tokens | $4.5 |
| ainews-agent | Gemini 2.5 Flash | 资讯获取 | 300万 tokens | $0 |
| **总计** | - | - | 750万 tokens | **$25.5** |

**成本优化建议**：
- 简单任务使用 Gemini Flash（免费）
- 复杂任务才使用 Claude Opus
- 内内容创作使用 Claude Sonnet（性价比高）

### 9.1.16.9 故障排查

#### Gateway 启动失败

**症状**：运行 `./start-all-gateways.sh` 后，`./check-gateways.sh` 显示进程未运行

**排查步骤**：

```bash
# 1. 查看日志
tail -50 logs-main-assistant.log

# 2. 检查配置
jq . ~/.openclaw-main-assistant/openclaw.json

# 3. 检查端口占用
lsof -i :18789

# 4. 运行 doctor
openclaw --profile main-assistant doctor
```
**常见访问题**：
- 配置文件格式错误：运行 `jq` 验证
- 端口被占用：更换端口或停止占用进程
- 飞书配置错误：检查 App ID 和 App Secret

#### 机器人无响应

**症状**：在飞书中 @ 机器人，没有回复

**排查步骤**：

```bash
# 1. 检查 Gateway 是否运行
./check-gateways.sh

# 2. 查看实时日志
tail -f logs-main-assistant.log

# 3. 检查飞书连接
grep "WebSocket client started" logs-main-assistant.log
```
**常见原因**：
- Gateway 未启动：运行 `./start-all-gateways.sh`
- 飞书连接断开：检查网络，重启 Gateway
- 配置错误：验证飞书 App ID 和 Secret

#### 使用了错误的 Agent

**症状**：私聊"内内容创作助手"，但使用的是 Claude Opus 模型

**原因**：配置文件中 Agent 设置错误

**解决**：

```bash
# 检查配置
jq '.agents.list[0].id, .agents.list[0].model.primary' \
  ~/.openclaw-content-creator/openclaw.json

# 应该输出：
# "content-agent"
# "local-antigravity/claude-sonnet-4-5"
```
### 9.1.16.10 高级技巧

#### 技巧一：使用 tmux 管理

```bash
# 创建 tmux 会话
tmux new -s openclaw

# 分割窗口
Ctrl+b %  # 垂直分割
Ctrl+b "  # 水平分割

# 在不同窗口中运行不同的 Gateway
./start-main-assistant.sh
./start-content-creator.sh
./start-tech-dev.sh
./start-ai-news.sh

# 查看所有日志
tail -f logs-*.log
```
#### 技巧二：配置开机自启动

使用 launchd（macOS）：

```bash
# 创建 plist 文件
cat > ~/Library/LaunchAgents/com.openclaw.main-assistant.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.openclaw.main-assistant</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/openclaw</string>
    <string>--profile</string>
    <string>main-assistant</string>
    <string>gateway</string>
    <string>run</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
EOF

# 加载服务
launchctl load ~/Library/LaunchAgents/com.openclaw.main-assistant.plist
```
#### 技巧三：日志轮转

```bash
# 创建日志轮转脚本
cat > rotate-logs.sh << 'EOF'
#!/bin/zsh
for log in logs-*.log; do
  if [ -f "$log" ] && [ $(stat -f%z "$log") -gt 10485760 ]; then
    mv "$log" "$log.$(date +%Y%m%d_%H%M%S)"
    touch "$log"
  fi
done
EOF

chmod +x rotate-logs.sh

# 添加到 crontab（每小时执行）
crontab -e
# 添加：0 * * * * /path/to/rotate-logs.sh
```
### 9.1.16.11 总结

多 Gateway + 多飞书机器人的方案是目前最稳定、最简单的多 Agent 实现方式：

**核心优势**：
- ✅ 直接私聊不同机器人，自动使用对应 agent
- ✅ 完全独立，互不干扰
- ✅ 不需要复杂的 bindings 配置
- ✅ 不需要手动切换命令
- ✅ 配置清晰，易于管理

**适用场景**：
- 超级个体创业者
- 需要多个专业助手
- 不同任务使用不同模型
- 追求稳定性和可靠性

**下一步**：
1. 创建飞书机器人应用
2. 运行配置脚本
3. 启动所有 Gateway
4. 开始使用你的 AI 助手团队！


## 9.1.18 本地多 Agent 管理（无需绑定 IM 平台）

> 💡 **重要提示**：多 Agent 管理不仅可以用于飞书等 IM 平台，也完全支持本地使用。如果你不需要绑定飞书机器人，可以通过 Web UI、命令行或 TUI 界面直接使用多个 Agent。

![本地多Agent管理界面 - Web UI/命令行/TUI三种方式](https://upload.maynor1024.live/file/1770944487857_image-20260213090121654.png)

### 本地使用方式

OpenClaw 提供了多种本地使用方式，无需配置任何 IM 平台：

#### 方式一：Web UI（推荐）

```bash
# 打开 Web 界面
openclaw dashboard

# 或直接访问
http://127.0.0.1:18789/?token=你的token
```
**优势**：
- ✅ 图形化界面，操作直观
- ✅ 支持文件上传和下载
- ✅ 实时显示 Token 消耗
- ✅ 支持多轮对话历史

#### 方式二：命令行对话

```bash
# 直接发布送消息
openclaw agent --message "你好，帮我分析一下这个项目"

# 使用管道输入
echo "帮我总结这个文件的内内容" | openclaw agent --message

# 指定输出文件（使用重定向）
openclaw agent --message "生成项目文档" > docs.md
```
**优势**：
- ✅ 快速执行单次任务
- ✅ 适合脚本自动化
- ✅ 可以集成到工作流中

#### 方式三：TUI 终端界面

```bash
# 启动终端交互界面
openclaw tui
```
**优势**：
- ✅ 终端内交互式对话
- ✅ 支持多轮对话
- ✅ 适合服务器环境使用

### 本地多 Agent 配置

配置文件位置：`~/.openclaw/openclaw.json`

**配置示例**：

```json
{
  "agents": {
    "list": [
      {
        "id": "main-agent",
        "workspace": "/Users/username/work",
        "model": { "primary": "anthropic/claude-sonnet-4" }
      },
      {
        "id": "content-agent",
        "workspace": "/Users/username/content",
        "model": { "primary": "anthropic/claude-sonnet-4" }
      },
      {
        "id": "code-agent",
        "workspace": "/Users/username/code",
        "model": { "primary": "deepseek/deepseek-chat" }
      },
      {
        "id": "research-agent",
        "workspace": "/Users/username/research",
        "model": { "primary": "google/gemini-2-flash" }
      }
    ],
    "defaults": {
      "compaction": { "mode": "safeguard" },
      "maxConcurrent": 4,
      "subagents": { "maxConcurrent": 8 }
    }
  }
}
```
**配置说明**：

1. **agents.list**：定义所有可用的 Agent
   - `id`：Agent 标识符（必填）
   - `workspace`：工作空间路径（必填）
   - `model.primary`：使用的模型（可选）

2. **agents.defaults**：所有 Agent 共分享的配置
   - `compaction`：上下文压缩策略
   - `maxConcurrent`：最大并发布数
   - `subagents`：子 Agent 配置

### Agent 管理命令

#### 列出所有 Agent

```bash
openclaw agents list

# 输出示例：
# Available agents:
# - main-agent (default)
#   Workspace: /Users/username/work
#   Model: anthropic/claude-sonnet-4
# - content-agent
#   Workspace: /Users/username/content
#   Model: anthropic/claude-sonnet-4
# - code-agent
#   Workspace: /Users/username/code
#   Model: deepseek/deepseek-chat
# - research-agent
#   Workspace: /Users/username/research
#   Model: google/gemini-2-flash
```
#### 切换 Agent

```bash
# 切换到指定 Agent
openclaw agents switch content-agent

# 输出：
# Switched to agent: content-agent
# Workspace: /Users/username/content
# Model: anthropic/claude-sonnet-4
```
#### 查看当前 Agent

```bash
# 查看当前使用的 Agent
openclaw agents current

# 输出：
# Current agent: content-agent
# Workspace: /Users/username/content
# Model: anthropic/claude-sonnet-4
```
#### 查看 Agent 配置

```bash
# 查看指定 Agent 的配置
openclaw agents config content-agent

# 查看当前 Agent 的配置
openclaw agents config
```
#### 查看 Agent 状态

```bash
# 查看所有 Agent 的状态
openclaw doctor

# 输出示例：
# ✅ Config valid
# ✅ 4 agents configured
# ✅ Gateway running
# ✅ Session store: 12 entries
```
### 实战案例：4个专业助手

**场景**：个人开发布者，需要不同的专业助手处理不同任务。

**配置步骤**：

**步骤1：创建工作空间目附录**

```bash
mkdir -p ~/work/main
mkdir -p ~/work/content
mkdir -p ~/work/code
mkdir -p ~/work/research
```
**步骤2：编辑配置文件**

```bash
# 备份现有配置
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup

# 编辑配置
nano ~/.openclaw/openclaw.json
```
将上面的配置示例粘贴进去，修改路径为你的实际路径。

**步骤3：验证配置**

```bash
# 验证配置是否正确
openclaw doctor

# 应该看到：
# ✅ Config valid
# ✅ 4 agents configured
```
**步骤4：重启网关**

```bash
# 重启网关使配置生效
openclaw gateway restart

# 查看状态
openclaw gateway status
```
**步骤5：使用不同的 Agent**

```bash
# 使用主助手处理通用任务
openclaw agents switch main-agent
openclaw agent --message "帮我整理今天的待怎么办事项"

# 使用内内容助手创作文章节
openclaw agents switch content-agent
openclaw agent --message "帮我写一篇关于 AI 的文章节"

# 使用代码助手开发布项目
openclaw agents switch code-agent
openclaw agent --message "帮我优化这段 Python 代码"

# 使用研究助手搜集资料
openclaw agents switch research-agent
openclaw agent --message "帮我搜集关于量子计算的最新研究"
```
### 使用场景对比

| 场景 | 推荐方式 | Agent 配置 | 优势 |
|------|---------|-----------|------|
| 个人本地使用 | Web UI + 多 Agent | 不同任务用不同 Agent | 工作空间隔离，模型灵活 |
| 团队协作 | 飞书 + 多 Agent | 不同机器人绑定不同 Agent | 团队成员各用各的助手 |
| 快速测试 | 命令行 + 单 Agent | 使用默认 Agent | 配置简单，快速上手 |
| 服务器环境 | TUI + 多 Agent | 不同项目用不同 Agent | 终端内交互，资源隔离 |

### 典型工作流

**场景：一人公司的日常工作流**

```bash
# 早上：使用主助手查看日程
openclaw agents switch main-agent
openclaw agent --message "显示今天的日程安排"

# 上午：使用代码助手开发布项目
openclaw agents switch code-agent
openclaw agent --message "帮我实现用户登录功能"

# 中午：使用研究助手学习新技术
openclaw agents switch research-agent
openclaw agent --message "搜集 Rust 语言的学习资料"

# 下午：使用内内容助手写文章节
openclaw agents switch content-agent
openclaw agent --message "写一篇关于今天开发布经验的博客"

# 晚上：使用主助手总结一天
openclaw agents switch main-agent
openclaw agent --message "生成今日工作总结"
```
### 配置技巧

**技巧1：为不同任务使用不同模型**

```json
{
  "agents": {
    "list": [
      {
        "id": "chat-agent",
        "workspace": "/Users/username/chat",
        "model": { "primary": "anthropic/claude-sonnet-4" }
      },
      {
        "id": "code-agent",
        "workspace": "/Users/username/code",
        "model": { "primary": "deepseek/deepseek-chat" }
      },
      {
        "id": "fast-agent",
        "workspace": "/Users/username/fast",
        "model": { "primary": "google/gemini-2-flash" }
      }
    ]
  }
}
```
**说明**：
- Claude Sonnet 4：通用对话和复杂任务
- DeepSeek：代码生成和技术访问题
- Gemini Flash：快速响应和简单任务

**技巧2：使用别名简化切换**

```bash
# 在 ~/.zshrc 或 ~/.bashrc 中添加别名
alias oc-main='openclaw agents switch main-agent'
alias oc-code='openclaw agents switch code-agent'
alias oc-content='openclaw agents switch content-agent'
alias oc-research='openclaw agents switch research-agent'

# 使用别名快速切换
oc-code
openclaw agent --message "帮我写一个排序算法"
```
**技巧3：为每个 Agent 配置独立的 Skills**

```bash
# 为代码助手安装开发布相关的 Skills
openclaw agents switch code-agent
clawhub install github-integration
clawhub install code-review

# 为内内容助手安装写作相关的 Skills
openclaw agents switch content-agent
clawhub install grammar-check
clawhub install seo-optimizer
```
### 常见访问题

**访问题1：切换 Agent 后工作空间没变**

```bash
# 检查当前 Agent
openclaw agents current

# 检查配置
openclaw agents config

# 重启网关
openclaw gateway restart
```
**访问题2：找不到 Agent**

```bash
# 列出所有 Agent
openclaw agents list

# 检查配置文件
cat ~/.openclaw/openclaw.json | grep -A 5 "agents"
```
**访问题3：Agent 配置验证失败**

```bash
# 运行诊断
openclaw doctor

# 自动修复
openclaw doctor --fix
```
### 最佳实践

1. **工作空间隔离**
   - 为每个 Agent 创建独立的工作空间
   - 避免不同任务的文件混在一起

2. **模型选择**
   - 根据任务类型选择合适的模型
   - 代码任务用 DeepSeek，通用任务用 Claude

3. **定期备份**
   - 定期备份配置文件
   - 使用版本控制管理配置

4. **命名规范**
   - Agent ID 使用有意义的名称
   - 工作空间路径清晰明确

5. **资源管理**
   - 合理设置 maxConcurrent
   - 定期清理不用的会话


## 9.13 更多 OpenClaw 可视化管理工具

除了 OpenClaw Manager，社区还有以下两款优秀的可视化工具可选：


### 9.13.2 ClawPanel —— OpenClaw 可视化管理面板

> 项目地址：https://claw.qt.cool/ | GitHub：https://github.com/qingchencloud/clawpanel

**ClawPanel** 是基于 Tauri v2 构建的跨平台桌面管理面板（当前版本 v0.7.0），专为 OpenClaw Gateway 和多 Agent 日常管理而设计。

**核心功能**：

| 功能 | 说明 |
|------|------|
| Dashboard 监控 | 实时查看 Gateway 状态、服务状态、Agent 数量、模型池 |
| AI 对话界面 | 多模型流式对话，WebSocket 连接 Gateway |
| 模型配置 | 统一管理 OpenAI、DeepSeek、Kimi 等多个 AI 服务商 |
| 记忆管理 | 可视化编辑 Agent 工作记忆、归档、核心配置文件 |
| 多 Agent 管理 | 创建和管理多个 Agent，工作空间隔离 |
| 工具权限控制 | 细粒度工具权限管理，Token/密码认证 |
| 内置 AI 助手 | 一键安装 OpenClaw、配置诊断、自动化故障排查 |

**平台支持**：
- macOS（Apple Silicon + Intel）
- Windows（.exe / .msi）
- Linux（AppImage / .deb）

**获取方式**：访问 [GitHub Releases](https://github.com/qingchencloud/clawpanel/releases/latest) 下载，MIT 开源免费。


## 📝 本章节小结

通过本章节学习，你已经掌握：

1. **飞书Bot配置**：完整的飞书机器人创建和配置流程
2. **企业微信Bot**：企业微信机器人的配置方法
3. **钉钉Bot配置**：钉钉机器人的接入步骤
4. **QQ Bot配置**：QQ机器人的详细配置
5. **Discord Bot**：Discord机器人的参考配置
6. **平台对比**：各平台的功能对比和选择建议
7. **多Agent配置**：高级的多Agent管理和配置
8. **本地多Agent**：无需绑定IM平台的本地使用
9. **OpenClaw Manager**：可视化管理工具的使用
10. **ClawX / ClawPanel**：更多开源可视化管理工具选择

## 🎯 实战练习

1. 配置一个飞书机器人并测试基本功能
2. 尝试配置多个Agent，为不同场景使用不同模型
3. 使用 OpenClaw Manager创建和管理多个Gateway
4. 为每个Agent定制专属的人格设定
5. 配置launchd保活服务，实现开机自启
6. 试用 ClawPanel 或 ClawX，找到最适合自己的管理方式

## 💡 进阶建议

1. 探索更多IM平台的集成方式
2. 优化Agent的人格设定，提升使用体验
3. 使用 OpenClaw Manager / ClawPanel 简化日常管理
4. 为团队成员创建专属的AI助手
5. 定期备份配置，避免数据丢失
