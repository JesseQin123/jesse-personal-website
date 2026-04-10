
# 第2章节：环境搭建

> 本章节将手把手教你安装 OpenClaw。

![OpenClaw 安装界面](https://upload.maynor1024.live/file/1771085321300_installation-interface.png)



## 📋 前提条件与推荐配置

### 推荐配置

为了获得最佳体验，我们推荐：

**操作系统**：
- 🍎 **Mac（强烈推荐）**：原生支持最完善，可操作日历、备忘附录、截图等系统功能
- 🪟 Windows：完全可用，但部分系统集成功能受限
- 🐧 Linux：适合开发布者，配置灵活

**IM工具选择**：
- 🌍 **国外用户**：推荐 **Telegram**（适配度最好，功能最完整）
- 🇨🇳 **国内用户**：推荐 **飞书**（现代化、开发布友好、功能丰富）
- 备选：企业微信、钉钉、QQ

**部署方式**：
- 💻 **有Mac电脑**：推荐本地部署（体验最好，功能最全）
- ☁️ **无Mac或想24小时运行**：推荐云端部署（成本低，稳定可靠）

### 为什么推荐Mac？

OpenClaw在Mac上体验最好，因为：
- ✅ 原生支持最完善，系统集成度高
- ✅ 可以操作Mac日历、备忘附录、提醒事项
- ✅ 截图功能完美支持
- ✅ 与iPhone、iPad无缝同步
- ✅ 文件管理更智能
- ✅ 开发布环境配置简单

### 为什么推荐飞书（国内）？

- ✅ 现代化设计，用户体验好
- ✅ 开发布者友好，API完善
- ✅ 支持富文本、文档、表格
- ✅ 消息推送稳定
- ✅ 免费版功能丰富

### 为什么推荐Telegram（国外）？

- ✅ 全球用户基础大
- ✅ API最完善，功能最强
- ✅ 支持Bot功能丰富
- ✅ 消息推送实时
- ✅ 隐私保护好

## 快速导航

**推荐路径**：
- 🍎 **有Mac** → [Mac本地部署](#mac本地部署推荐) + [飞书配置](../03-advanced/09-multi-platform-integration.md#91-飞书bot配置)
- ☁️ **无Mac/想24小时运行** → [云端一键部署](#云端一键部署) + [飞书配置](../03-advanced/09-multi-platform-integration.md#91-飞书bot配置)

**所有部署方式**：
- 🍎 [Mac本地部署（推荐）](#mac本地部署推荐)
- 🪟 [Windows本地部署](#windows本地部署)
- 🐧 [Linux本地部署](#linux本地部署)
- 🚀 [云端一键部署](#云端一键部署)
- 🇨🇳 [国内一键安装](#国内一键安装推荐)
- ☁️ [Cloudflare Workers 部署（进阶）](#cloudflare-workers-部署进阶)
- 🐳 [Docker 部署（可选）](#docker-部署可选)

**配置指南**：
- 🔑 [API配置指南](#api配置指南)
- 🔄 [版本升级指南](#2x-版本升级指南)
- ❓ [常见访问题解决](#常见访问题解决)


## Windows本地部署

> 🪟 **Windows用户**：完全可用，但部分系统集成功能受限。

![Windows系统部署架构 - WSL2+Ubuntu方案](https://upload.maynor1024.live/file/1770963301031_attachment_531c0e90-e8a2-469c-b6ec-b9811a55edfa_image.png)

### 系统要求

**硬件要求**：
- CPU：2核以上
- 内存：4GB以上（推荐8GB）
- 硬盘：10GB以上空闲空间

**操作系统**：
- Windows 10 或 Windows 11

**前置软件**：
- Node.js 22.0.0+

### 部署方式选择

Windows有两种部署方式：

1. **WSL2 + Ubuntu（强烈推荐）**：官方推荐方式，提供完整Linux环境支持
2. **PowerShell原生部署**：纯Windows环境，适合不想使用WSL2的用户


### 方式二：PowerShell原生部署

适合不想使用WSL2的纯Windows用户。

#### 第一步：安装Node.js 22+

**方法一：官网下载安装**

1. 访问 https://nodejs.org/zh-cn
2. 下载Windows安装包（LTS版本22.x）
3. 运行安装程序，勾选「自动安装必要的工具」

#### 第二步：验证Node.js安装

```powershell
# 打开PowerShell
node -v
npm -v
```

#### 第三步：以管理员身份安装 OpenClaw

**重要**：必须以**管理员身份**运行PowerShell。

```powershell
# 安装最新稳定版
npm install -g openclaw@latest

# 或安装汉化版
npm install -g @qingchencloud/openclaw-zh@latest
```

#### 第四步：解决安装权限访问题

如果遇到权限错误：

```powershell
# 方法A：启用PowerShell脚本执行
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 方法B：修改npm安装目附录
npm config set prefix "C:\npm"
npm config set cache "C:\npm-cache"

# 将目附录添加到PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\npm", "User")
```

#### 第五步：验证安装

```powershell
openclaw --version
openclaw --help
```

#### 第六步：解决常见访问题

**访问题：sharp模块加载失败**

```powershell
# 清理npm缓存
npm cache clean --force

# 重新安装
npm install -g openclaw@latest --force
```

**访问题：Windows Defender阻止**

将OpenClaw安装目附录添加到Windows Defender排除项：

```
C:\Users\你的用户名\AppData\Roaming\npm
C:\Users\你的用户名\.openclaw
```

## Linux本地部署

> 🐧 **Linux用户**：适合开发布者，配置灵活。

### 系统要求

**推荐发布行版**：
- Ubuntu 20.04+
- Debian 11+
- CentOS 8+

### 安装步骤

#### 第一步：安装Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
```

#### 第二步：安装 OpenClaw

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

#### 第三步：验证安装

```bash
openclaw --version
```

#### 第四步：初始化配置

```bash
openclaw onboard
```

## Cloudflare Workers 部署（进阶）

> ☁️ **全球 CDN 加速**：使用 Cloudflare Workers 部署 OpenClaw，分享受全球边缘网络加速。

### 为什么选择 Cloudflare Workers？

Cloudflare Workers 提供全球边缘网络部署能力，如表 2-4 所示。

**表 2-4 Cloudflare Workers 优势**

| 优势 | 说明 |
|------|------|
| 🌍 **全球加速** | 部署在 Cloudflare 全球边缘网络 |
| 💰 **成本可控** | 5美元/月起步，24小时在线 |
| 🔒 **安全可靠** | 内置 Zero Trust 安全认证 |
| ⚡ **快速部署** | 一键部署，10分钟完成 |
| 📦 **无需服务器** | Serverless 架构，无需维护 |

### 前置要求

**必需条件**：
- Cloudflare 账号
- Workers Paid 计划（5美元/月）
- 信用卡（用于订阅付费计划）

**成本说明**：
- 基础费用：5美元/月（起步价）
- 高频使用可能产生额外费用
- 作为 24 小时在线的 AI 服务，月成本在可接受范围内

> 💡 **成本参考**：详见 [GitHub 讨论：What's the cost running it 24/7 for a month](https://github.com/cloudflare/moltworker/issues/76)

### 部署流程

#### 第一步：一键部署 Moltworker

1. **点击部署按钮**：
   ```
   https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/moltworker
   ```

2. **配置 Gateway Token**：
   - 务必修改并妥善保存 `MOLTBOT_GATEWAY_TOKEN`
   - 这是后续进入管理后台的唯一凭证
   - 建议使用强密码生成器

![Cloudflare Workers 部署](https://upload.maynor1024.live/file/1770956993044_webp)

#### 第二步：等待构建

- 部署过程约需 10 分钟
- 可点击「继续处理项目」跳过等待页面
- 构建完成后会自动跳转到项目页面

![构建过程](https://upload.maynor1024.live/file/1770956995188_webp-20260213122951843)

#### 第三步：配置 Access（Zero Trust）

访问网页界面需要配置 `CF_ACCESS_AUD` 和 `CF_ACCESS_TEAM_DOMAIN` 两个变量。

**1. 创建应用**：
- 进入 Zero Trust → Access → Applications
- 添加一个 Self-hosted 应用

![创建应用](https://upload.maynor1024.live/file/1770957006656_1770956995941_webp-20260213122946760)

**2. 设置域名**：
- 子域默认为 `moltbot-sandbox`
- 域名可使用 Cloudflare 分配的 Worker 域名或自定义域名
- Session Duration（会话时间）建议设置长一些，避免频繁登录

**3. 配置策略**：
- 系统会自动创建 `moltbot-sandbox - Production` 策略
- 默认通过邮箱验证码登录

**4. 获取配置变量**：

**CF_ACCESS_AUD**：
- 保存应用后，点击右侧「⋮」编辑
- 在应用程序受众（AUD）标签页找到 Application Audience (AUD)

**CF_ACCESS_TEAM_DOMAIN**：
- 进入 Zero Trust → Settings
- 团队域名格式：`xxxxxx.cloudflareaccess.com`

#### 第四步：配置 R2 对象存储

OpenClaw 需要 R2 来存储状态，需配置以下三个变量：
- `CF_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`

**操作步骤**：

**1. 获取 Account ID**：
- 在 Cloudflare 侧边栏进入 R2 → Overview
- 右侧 Account Details 中的 Account ID 即为 `CF_ACCOUNT_ID`

![获取 Account ID](https://upload.maynor1024.live/file/1770957013012_webp-20260213123002670)

**2. 创建 API 令牌**：
- 点击 Manage R2 API Tokens
- 选择 Create API Token

**3. 设置权限**：
- 权限选择 Object Read & Write
- 建议范围通过 Specific Bucket 限制在 `moltbot-data`

![设置权限](https://upload.maynor1024.live/file/1770957013719_webp-20260213123006410)

**4. 保存密钥**：
- 创建成功后，记附录 Access Key ID 和 Secret Access Key

![保存密钥](https://upload.maynor1024.live/file/1770957016450_webp-20260213123010373)

> ⚠️ **重要提示**：修改 Token 时请务必核对变量名称。如果不慎修改了 Build Token，会导致 Worker 构建失败。

#### 第五步：注入变量并重启

1. **进入设置**：
   - Workers → Settings → Variables and Secrets

2. **填入变量**：
   - `MOLTBOT_GATEWAY_TOKEN`（第一步设置的）
   - `CF_ACCESS_AUD`（第三步获取的）
   - `CF_ACCESS_TEAM_DOMAIN`（第三步获取的）
   - `CF_ACCOUNT_ID`（第四步获取的）
   - `R2_ACCESS_KEY_ID`（第四步获取的）
   - `R2_SECRET_ACCESS_KEY`（第四步获取的）

3. **重新部署**：
   - 点击 Deploy 重新部署
   - 等待部署完成

![注入变量](https://upload.maynor1024.live/file/1770957030499_webp-20260213123020335)

### 访问与管理

部署完成后，可通过以下地址访问：

**访问 Worker**（需要 token）：
```
https://moltbot-sandbox.xxxxxxxx.workers.dev?token=MOLTBOT_GATEWAY_TOKEN
```

**管理后台**（需要邮箱验证）：

```
https://moltbot-sandbox.xxxxxxxx.workers.dev/_admin/
```
通过 Cloudflare Access 的邮箱验证码验证后，即可进入管理后台并接受 Pairing Requests。

![管理后台](https://upload.maynor1024.live/file/1770957055794_webp-20260213123047239)

### 基础使用

#### 查看或切换模型

```bash
# 查看当前模型
/model

# 切换模型
/model minimax/MiniMax-M2.1
```

#### 设置开机自启命令

为了避免 Worker 重启后模型被重置，建议设置开机自启命令：

```bash
set model minimax/MiniMax-M2.1
```

#### 远程终端连接

```bash
# 登录到 Gateway
openclaw gateway login --url https://moltbot-sandbox.xxxxxxxx.workers.dev

# 配置 Skills
openclaw configure --section skills
```

### 避坑指南

**访问题 1：模型配置报错**

**症状**：通过配置文件修改默认模型后报错

**原因**：国内 AI 服务商通常区分国内与海外端点，Cloudflare Workers 环境下配置文件修改内容易出错

**解决方案**：
- 直接通过开机命令强制指定模型
- 不要依赖配置文件或后台 UI
- 使用 `set model` 命令设置开机自启

**访问题 2：Worker 构建失败**

**症状**：部署后 Worker 无法启动

**原因**：不慎修改了 Build Token

**解决方案**：
- 检查所有变量名称是否正确
- 确保没有修改 Build Token
- 重新部署

**访问题 3：无法访问管理后台**

**症状**：访问 `/_admin/` 时无法登录

**原因**：Zero Trust 配置不正确

**解决方案**：
- 检查 `CF_ACCESS_AUD` 和 `CF_ACCESS_TEAM_DOMAIN` 是否正确
- 确认邮箱验证码是否正确
- 检查 Session Duration 设置

### 成本估算

| 项目 | 费用 | 说明 |
|------|------|------|
| Workers Paid 计划 | 5美元/月 | 基础费用 |
| 额外请求费用 | 按量计费 | 高频使用时产生 |
| R2 存储 | 免费额度内 | 通常不会超出 |
| 总计 | 5-10美元/月 | 取决于使用频率 |

### 适用场景

**推荐使用**：
- ✅ 想低成本尝试 OpenClaw
- ✅ 已有 Cloudflare 付费订阅
- ✅ 需要全球 CDN 加速
- ✅ 不想维护服务器

**不推荐使用**：
- ❌ 期望开箱即用
- ❌ 没有技术背景
- ❌ 需要复杂的自动化流程
- ❌ 预算非常有限

### 总结

Cloudflare Workers + OpenClaw 是一个低成本的尝鲜方案，适合：
- 未体验过 Agent 自动化，想低成本试手
- 已有 Cloudflare 付费订阅，资源闲置
- 需要全球 CDN 加速的场景

但需要注意：
- OpenClaw 目前还不是一个能「即刻提升效率」的工具
- 更像是一个为 AI 自动化搭建的系统底座
- 如果没有明确的、可标准化的长流程需求，可能只会带来维护成本

**下一步**：
- 配置 AI 模型（见下文"API配置指南"）
- 配置通讯渠道（见[第9章节：多平台集成](../03-advanced/09-multi-platform-integration.md)）
- 安装 Skills（见[第8章节：Skills扩展](../03-advanced/08-skills-extension.md)）


## 更新和维护

> 🔄 **保支持最新**：定期更新 OpenClaw 以获得新功能和安全修复。

### 检查更新

```bash
# 检查当前版本
openclaw --version

# 检查最新版本
curl -s https://api.github.com/repos/openclaw/openclaw/releases/latest | grep tag_name
```

### 本地安装更新

```bash
# 方式一：使用安装脚本
curl -fsSL https://openclaw.ai/install.sh | bash

# 方式二：手动更新
cd ~/openclaw
git pull origin main
pnpm install
pnpm build
```

### Docker 更新

```bash
# 拉取最新镜像
docker pull openclaw/openclaw:latest

# 停止并删除旧内容器
docker stop openclaw
docker rm openclaw

# 启动新内容器
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -v ~/.openclaw:/root/.openclaw \
  --restart unless-stopped \
  openclaw/openclaw:latest
```

### 备份数据

**本地安装备份**：
```bash
# 备份配置和数据
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz ~/.openclaw

# 恢复数据
tar -xzf openclaw-backup-20260210.tar.gz -C ~/
```

**Docker 备份**：
```bash
# 备份数据卷
docker run --rm \
  -v ~/.openclaw:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/openclaw-backup-$(date +%Y%m%d).tar.gz /data

# 恢复数据
docker run --rm \
  -v ~/.openclaw:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/openclaw-backup-20260210.tar.gz -C /
```

### 监控和日志

**查看日志**：
```bash
# 本地安装
tail -f ~/.openclaw/logs/gateway.log

# Docker
docker logs -f openclaw
```

**监控指标**：
```bash
# 查看系统状态
openclaw gateway status

# 查看资源使用
openclaw stats

# 查看 API 消耗
openclaw stats api
```

### 故障排查

**常见访问题**：

1. **Gateway 无法启动**
   ```bash
   # 查看日志
   openclaw logs
   
   # 检查端口占用
   lsof -i :18789
   
   # 重启 Gateway
   openclaw gateway restart
   ```

2. **API 连接失败**
   ```bash
   # 测试 API 连接
   openclaw test api
   
   # 检查 API Key
   openclaw config get models.providers
   ```

3. **性能访问题**
   ```bash
   # 清理缓存
   openclaw cache clear
   
   # 重启服务
   openclaw gateway restart
   ```

### 卸载

**本地安装卸载**：
```bash
# 停止服务
openclaw gateway stop

# 删除文件
rm -rf ~/.openclaw
rm -rf ~/openclaw

# 删除命令
npm uninstall -g openclaw
```

**Docker 卸载**：
```bash
# 停止并删除内容器
docker stop openclaw
docker rm openclaw

# 删除镜像
docker rmi openclaw/openclaw

# 删除数据
rm -rf ~/.openclaw
```

### 自定义API配置（进阶用户）

> ⚠️ **适合人群**：进阶用户、需要使用非主流模型、企业定制化需求

#### 什么时候需要自定义API？

如果你遇到以下情况，需要使用自定义API配置：

1. **使用非内置模型**：
   - OpenClaw未内置的小众模型
   - 新发布布的模型（OpenClaw还未更新）
   - 区域限定的模型

2. **使用第三方代理**：
   - API代理服务（如 OpenRouter、API2D）
   - 企业内部的API网关
   - 自建的模型服务

3. **精细控制参数**：
   - 自定义模型参数
   - 调整上下文窗口大小
   - 修改默认配置

#### 配置文件位置

> 📖 **详细说明**: 完整的配置文件结构和使用指南请参考 [配置文件结构完整指南](../config-file-structure.md)

```bash
# 配置文件路径
~/.openclaw/openclaw.json

# 编辑配置文件
nano ~/.openclaw/openclaw.json
```

#### 配置文件结构

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "你的供应商名称": {
        "baseUrl": "API服务地址",
        "apiKey": "你的API 密钥",
        "auth": "认证方式",
        "api": "API协议类型",
        "models": [
          {
            "id": "模型ID",
            "name": "模型显示名称",
            "contextWindow": 上下文窗口大小,
            "maxTokens": 最大输出tokens
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "供应商名称/模型ID"
      }
    }
  }
}
```

#### 示例1：配置DeepSeek（自定义方式）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "apiKey": "sk-你的API 密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "contextWindow": 64000,
            "maxTokens": 4096
          },
          {
            "id": "deepseek-coder",
            "name": "DeepSeek Coder",
            "contextWindow": 64000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat"
      }
    }
  }
}
```

#### 示例2：配置第三方API代理

如果你使用API代理服务（如OpenRouter），配置如下：

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "openrouter": {
        "baseUrl": "https://openrouter.ai/api/v1",
        "apiKey": "sk-or-v1-你的密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "anthropic/claude-3.5-sonnet",
            "name": "Claude 3.5 Sonnet",
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "openai/gpt-4",
            "name": "GPT-4",
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/anthropic/claude-3.5-sonnet"
      }
    }
  }
}
```

#### 示例3：配置多个模型供应商

你可以同时配置多个供应商，根据需要切换：

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "apiKey": "sk-你的DeepSeek密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "contextWindow": 64000,
            "maxTokens": 4096
          }
        ]
      },
      "moonshot": {
        "baseUrl": "https://api.moonshot.cn/v1",
        "apiKey": "sk-你的Kimi密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "moonshot-v1-128k",
            "name": "Kimi 128K",
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallback": "moonshot/moonshot-v1-128k"
      }
    }
  }
}
```

#### 配置参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `baseUrl` | API服务地址 | `https://api.deepseek.com` |
| `apiKey` | API 密钥 | `sk-xxx` |
| `auth` | 认证方式 | `api-key` 或 `bearer` |
| `api` | API协议 | `openai-chat`、`anthropic-messages` |
| `id` | 模型ID | `deepseek-chat` |
| `name` | 显示名称 | `DeepSeek Chat` |
| `contextWindow` | 上下文窗口 | `64000` |
| `maxTokens` | 最大输出 | `4096` |

#### 常见API协议类型

- `openai-chat`：OpenAI兼内容接口（最常用）
- `anthropic-messages`：Anthropic Claude接口
- `google-generative-ai`：Google Gemini接口
- `azure-openai`：Azure OpenAI接口

#### 配置后重启服务

```bash
# 方式1：重启Gateway
openclaw gateway restart

# 方式2：停止后重新启动
systemctl --user stop openclaw-gateway.service
systemctl --user start openclaw-gateway.service

# 方式3：完全重启
systemctl --user restart openclaw-gateway.service
```

#### 验证配置

```bash
# 查看当前配置的模型
openclaw models list

# 测试模型连接
openclaw models test deepseek/deepseek-chat
```

#### 常见访问题

**Q1：配置后无法连接？**
```
检查项：
✅ baseUrl是否正确
✅ apiKey是否有效
✅ 网络是否能访问API地址
✅ 配置文件JSON格式是否正确
```

**Q2：如何切换模型？**
```bash
# 临时切换
openclaw agent --message --model deepseek/deepseek-chat

# 永久切换：修改配置文件中的 primary 字段
```

**Q3：如何添加多个模型？**
```
在 models 数组中添加多个模型对象即可
每个模型需要有唯一的 id
```

#### 2. DeepSeek 配置（性价比之王）

**特点**：
- 💰 **最便宜**：输入0.001元/千tokens
- 🧠 **推理能力强**：适合复杂任务
- 💻 **编程能力出色**：代码生成质量高

**配置步骤**：

**第一步：注册并充值**

访问：https://platform.deepseek.com/

> ⚠️ **注意**：DeepSeek采用按量付费，账户余额必须大于0才能调用API。

![DeepSeek平台](https://upload.maynor1024.live/file/1770957195044__null_)

**第二步：充值账户**

建议先充值10元试用：

![充值账户](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=OWU5ZGEzMDE0Y2YyNDhhOTYwZjliNWY0OTM1YjgzMmVfa0dlYzNvMzFvUDVuY0J3cWZ6b3VDUkNLRHpKbmhHSURfVG9rZW46UmZuamJDV29vb0Q2bXl4VHUwcWNxYWFRbnZ1XzE3NzA5NTcxNjg6MTc3MDk2MDc2OF9WNA)

**第三步：创建API Key**

1. 保证账号有余额
2. 点击"API keys"
3. 点击"创建API key"

![创建API Key](https://upload.maynor1024.live/file/1770957195220__null_-20260213123309627._null_)

**第四步：保存API Key**

⚠️ **重要**：API Key只显示一次，务必复制保存！

名称随便取，复制API Key后妥善保存。

![保存API Key](https://upload.maynor1024.live/file/1770957204667__null_-20260213123316852._null_)

**第五步：配置到OpenClaw**

```bash
# 运行配置向导
openclaw onboard

# 配置流程：
# 1. 选择 QuickStart
# 2. 选择模型供应商：DeepSeek
# 3. 粘贴API Key
# 4. 选择默认模型：deepseek-chat
# 5. 完成其他配置
```

**成本估算**：
- 日常使用：5-10元/月
- 中度使用：10-30元/月
- 重度使用：30-50元/月


### 升级时间建议

**推荐升级时机**：
- 🌙 晚上或周末（使用量低）
- 📅 每月检查一次更新
- 🐛 发布现Bug时及时升级
- 🔒 安全更新立即升级

**不推荐升级时机**：
- ❌ 工作日高峰期
- ❌ 重要任务进行中
- ❌ 网络不稳定时
- ❌ 没有备份时

### 自动更新（可选）

如果想自动检查更新，可以设置定时任务。

**macOS/Linux**：
```bash
# 编辑crontab
crontab -e

# 添加每周检查更新（周日凌晨2点）
0 2 * * 0 /usr/local/bin/openclaw doctor --check-updates
```

**Windows**：
使用任务计划程序创建定时任务。

### 版本发布布说明

查看每个版本的更新内内容：

```bash
# 访问GitHub发布布页面
https://github.com/openclaw/openclaw/releases

# 或使用命令行
curl -s https://api.github.com/repos/openclaw/openclaw/releases/latest
```

### 升级成本估算

| 升级方式 | 时间成本 | 风险等级 | 推荐度 |
|---------|---------|---------|--------|
| npm直接升级 | 5-10分钟 | 低 | ⭐⭐⭐⭐⭐ |
| 官方脚本 | 3-5分钟 | 中 | ⭐⭐⭐⭐ |
| Docker | 2-3分钟 | 低 | ⭐⭐⭐⭐⭐ |
| 云端重置 | 5-10分钟 | 中 | ⭐⭐⭐ |

### 升级检查清单

升级前：
- [ ] 备份配置目附录
- [ ] 记附录当前版本
- [ ] 检查磁盘空间
- [ ] 选择合适的升级时间

升级中：
- [ ] 停止Gateway服务
- [ ] 卸载旧版本
- [ ] 安装新版本（使用--force）
- [ ] 运行doctor修复
- [ ] 重启Gateway

升级后：
- [ ] 验证版本号
- [ ] 测试Gateway连接
- [ ] 验证插件功能
- [ ] 测试频道连接
- [ ] 检查日志无错误

### 升级支持

如果升级遇到访问题：

1. **查看日志**：
   ```bash
   tail -f ~/.openclaw/logs/gateway.log
   ```

2. **运行诊断**：
   ```bash
   openclaw doctor
   ```

3. **查看官方文档**：
   ```
   https://docs.openclaw.ai/
   ```

4. **加入社区**：
   - GitHub Issues
   - Discord社区
   - 飞书群组

### 升级案例：2026.2.1-zh.3 → 2026.3.2

以下是一次真实的升级案例，供参考。

**升级背景**：
- 原版本：2026.2.1-zh.3（中文版）
- 目标版本：2026.3.2（推荐稳定版）
- 升级原因：获取新功能和性能优化

**升级过程**：

1. **备份配置**：
   ```bash
   cp -r ~/.openclaw ~/.openclaw.backup-20260213
   ```

2. **停止Gateway**：
   ```bash
   openclaw gateway stop
   ```

3. **卸载旧版本**：
   ```bash
   npm uninstall -g openclaw
   ```

4. **安装新版本**：
   ```bash
   npm install -g openclaw@2026.3.2 --force
   ```

5. **修复配置**：
   ```bash
   openclaw doctor --fix
   ```

6. **重启Gateway**：
   ```bash
   openclaw gateway restart
   ```

7. **验证升级**：
   ```bash
   openclaw --version  # 显示：2026.3.2
   openclaw gateway status  # 显示：running
   ```

**升级结果**：
- ✅ 升级成功
- ✅ 配置自动迁移
- ✅ Gateway运行正常
- ✅ 所有功能正常

**遇到的访问题**：
- npm install报错EEXIST → 使用--force解决

**总耗时**：约5分钟
