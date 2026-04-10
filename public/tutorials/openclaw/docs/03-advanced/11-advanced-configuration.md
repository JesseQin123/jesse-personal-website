
# 第11章节 高级配置（多模型切换/成本优化/性能调优）

> 💡 **本章节目标**：掌握OpenClaw的高级配置技巧，包括Antigravity Manager配置、多模型切换、成本优化和性能调优。


## ⚙️ 本章节内内容

- 11.1 Antigravity Manager完全配置指南
- 11.2 多模型切换策略
- 11.3 记忆搜索配置（Memory Search）
- 11.4 成本优化方案
- 11.5 性能调优技巧
- 11.6 模型提供商配置详解
- 11.7 工具系统详解
- 11.8 CLI 命令完整参考


## 11.2 多模型切换策略

### 11.2.1 模型特点对比

| 模型 | 优势 | 劣势 | 适用场景 |
|------|------|------|----------|
| Claude Sonnet | 平衡性好 | 价格中等 | 日常对话 |
| Claude Opus | 能力最强 | 价格最贵 | 复杂任务 |
| GPT-5.2 | 功能丰富 | 响应较慢 | 创意工作 |
| Gemini 3 Pro | 免费额度大 | 能力一般 | 简单任务 |
| DeepSeek-V3 | 性价比高 | 中文优化 | 编程任务 |

### 11.2.2 场景化选择策略

**日常对话**：
```text
推荐：Claude Sonnet 4.5
理由：
- 响应速度快
- 质量稳定
- 价格适中
```text
**复杂推理**：
```text
推荐：Claude Opus 4.6
理由：
- 推理能力最强
- 准确率最高
- 适合难题
```text
**图片识别**：
```text
推荐：Gemini 3 Pro
理由：
- 多模态能力强
- 免费额度大
- 识别准确
```text
**编程任务**：
```text
推荐：DeepSeek-V3
理由：
- 代码能力强
- 价格便宜
- 中文友好
```text
### 11.2.3 模型内容灾机制（Fallback）

> 🛡️ **高可用保障**：通过配置主模型和备用模型，确保服务不中断。

#### 什么是模型内容灾？

当主模型（primary）出现以下情况时，系统会自动切换到备用模型（fallbacks）：
- API 调用失败
- 请求超时
- 速率限制（Rate Limit）
- 服务不可用

![服务内容灾配置示例](https://upload.maynor1024.live/file/1771085328347_service-disaster-recovery.png)

#### 基础内容灾配置

**配置文件路径**：`~/.openclaw/openclaw.json`

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-6",
        "fallbacks": [
          "openai-codex/gpt-5.3-codex",
          "google-antigravity/claude-opus-4-6-thinking"
        ]
      }
    },
    "list": [
      {
        "id": "main",
        "default": true,
        "model": {
          "primary": "anthropic/claude-opus-4-6",
          "fallbacks": [
            "openai-codex/gpt-5.3-codex",
            "google-antigravity/claude-opus-4-6-thinking"
          ]
        }
      }
    ]
  }
}
```text
**工作流程**：
```text
1. 尝试使用主模型：anthropic/claude-opus-4-6
   ↓ 失败
2. 切换到备用模型1：openai-codex/gpt-5.3-codex
   ↓ 失败
3. 切换到备用模型2：google-antigravity/claude-opus-4-6-thinking
   ↓ 失败
4. 返回错误信息
```text
#### 实战案例1：成本优化型内容灾

**场景**：优先使用便宜模型，失败后使用高质量模型

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallbacks": [
          "anthropic/claude-sonnet-4-5",
          "anthropic/claude-opus-4-6"
        ]
      }
    }
  }
}
```text
**优势**：
- ✅ 日常使用 DeepSeek（极低成本）
- ✅ DeepSeek 限流时自动切换到 Claude Sonnet
- ✅ 重要任务失败时使用 Claude Opus 兜底
- ✅ 成本节省 80%+

#### 实战案例2：性能优先型内容灾

**场景**：优先使用最强模型，失败后降级

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-6",
        "fallbacks": [
          "anthropic/claude-sonnet-4-5",
          "deepseek/deepseek-chat"
        ]
      }
    }
  }
}
```text
**优势**：
- ✅ 保证最佳质量
- ✅ 高峰期自动降级
- ✅ 确保服务不中断

#### 实战案例3：多提供商内容灾

**场景**：跨提供商内容灾，避免单点故障

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-5",
        "fallbacks": [
          "openai/gpt-4o",
          "google/gemini-2.0-flash-exp",
          "deepseek/deepseek-chat"
        ]
      }
    }
  }
}
```text
**优势**：
- ✅ Anthropic 故障时切换到 OpenAI
- ✅ OpenAI 故障时切换到 Google
- ✅ 最后使用 DeepSeek 兜底
- ✅ 最大化服务可用性

#### 配置命令行方式

```bash
# 设置主模型
openclaw config set agents.defaults.model.primary "anthropic/claude-opus-4-6"

# 设置备用模型（需要手动编辑 JSON）
# 或使用 jq 命令
cat ~/.openclaw/openclaw.json | jq '.agents.defaults.model.fallbacks = [
  "openai-codex/gpt-5.3-codex",
  "google-antigravity/claude-opus-4-6-thinking"
]' > /tmp/openclaw-temp.json && mv /tmp/openclaw-temp.json ~/.openclaw/openclaw.json

# 重启 Gateway 使配置生效
openclaw gateway restart
```text
#### 验证内容灾配置

```bash
# 查看当前配置
openclaw config get agents.defaults.model

# 输出示例：
{
  "primary": "anthropic/claude-opus-4-6",
  "fallbacks": [
    "openai-codex/gpt-5.3-codex",
    "google-antigravity/claude-opus-4-6-thinking"
  ]
}
```text
#### 内容灾最佳实践

**1. 选择不同提供商**：
✅ 推荐：Anthropic → OpenAI → Google
❌ 不推荐：Claude Opus → Claude Sonnet（同提供商）
```text
**2. 按能力梯度配置**：
```text
✅ 推荐：高能力 → 中能力 → 低能力
❌ 不推荐：低能力 → 高能力（浪费资源）
```text
**3. 考虑成本因素**：
```text
✅ 推荐：便宜 → 中等 → 昂贵（成本优化）
✅ 推荐：昂贵 → 中等 → 便宜（质量优先）
```text
**4. 限制备用数量**：
```text
✅ 推荐：2-3 个备用模型
❌ 不推荐：5+ 个备用模型（过度复杂）
```text
### 11.2.4 多认证 Profile + Token 轮换

> 🔐 **账号管理**：配置多个认证配置，实现账号轮换和负载均衡。

#### 什么是认证 Profile？

认证 Profile 允许你为同一个提供商配置多个账号，系统会按照指定顺序轮换使用，避免单账号限流。

#### 基础配置

**配置文件路径**：`~/.openclaw/openclaw.json`

```json
{
  "auth": {
    "profiles": {
      "openai-codex:default": {
        "provider": "openai-codex",
        "mode": "oauth"
      },
      "anthropic:default": {
        "provider": "anthropic",
        "mode": "token"
      },
      "anthropic:manual": {
        "provider": "anthropic",
        "mode": "token"
      },
      "google-antigravity:mail1@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth",
        "email": "mail1@gmail.com"
      },
      "google-antigravity:mail2@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth"
      }
    },
    "order": {
      "anthropic": [
        "anthropic:default",
        "anthropic:manual"
      ],
      "google-antigravity": [
        "google-antigravity:mail1@gmail.com",
        "google-antigravity:mail2@gmail.com"
      ]
    }
  }
}
```text
#### 配置说明

**profiles 字段**：
- 定义所有可用的认证配置
- 格式：`"提供商:标识符"`
- `mode`：认证方式（`oauth` 或 `token`）
- `email`：OAuth 账号邮箱（可选）

**order 字段**：
- 定义每个提供商的账号使用顺序
- 系统会按顺序轮换使用
- 当前账号限流时自动切换到下一个

#### 实战案例1：Anthropic 双账号轮换

**场景**：配置 2 个 Claude API Key，避免限流

```json
{
  "auth": {
    "profiles": {
      "anthropic:account1": {
        "provider": "anthropic",
        "mode": "token"
      },
      "anthropic:account2": {
        "provider": "anthropic",
        "mode": "token"
      }
    },
    "order": {
      "anthropic": [
        "anthropic:account1",
        "anthropic:account2"
      ]
    }
  }
}
```text
**配置 API Key**：
```bash
# 在 Antigravity Manager 中分别配置两个 API Key
# 或在 OpenClaw 配置中添加：
{
  "models": {
    "providers": {
      "anthropic": {
        "apiKey": "sk-ant-api-key-1",
        ...
      },
      "anthropic-2": {
        "apiKey": "sk-ant-api-key-2",
        ...
      }
    }
  }
}
```text
**工作流程**：
```text
1. 使用 account1 发布送请求
2. account1 达到限流 → 自动切换到 account2
3. account2 达到限流 → 等待 account1 恢复
4. 循环往复
```text
#### 实战案例2：Google 多邮箱轮换

**场景**：使用多个 Google 账号访问 Gemini

```json
{
  "auth": {
    "profiles": {
      "google-antigravity:work@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth",
        "email": "work@gmail.com"
      },
      "google-antigravity:personal@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth",
        "email": "personal@gmail.com"
      },
      "google-antigravity:backup@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth",
        "email": "backup@gmail.com"
      }
    },
    "order": {
      "google-antigravity": [
        "google-antigravity:work@gmail.com",
        "google-antigravity:personal@gmail.com",
        "google-antigravity:backup@gmail.com"
      ]
    }
  }
}
```text
**优势**：
- ✅ 3 个账号轮换，限流概率降低 66%
- ✅ 免费额度叠加（3 倍免费额度）
- ✅ 高峰期自动负载均衡

#### 实战案例3：混合认证模式

**场景**：同时使用 OAuth 和 API Token

```json
{
  "auth": {
    "profiles": {
      "anthropic:oauth-account": {
        "provider": "anthropic",
        "mode": "oauth"
      },
      "anthropic:token-account": {
        "provider": "anthropic",
        "mode": "token"
      }
    },
    "order": {
      "anthropic": [
        "anthropic:oauth-account",
        "anthropic:token-account"
      ]
    }
  }
}
```text
**使用场景**：
- OAuth 账号：日常使用（更安全）
- Token 账号：备用（更稳定）

#### 配置最佳实践

**1. 账号数量建议**：
```text
✅ 推荐：2-3 个账号
❌ 不推荐：5+ 个账号（管理复杂）
```text
**2. 认证方式选择**：
```text
OAuth：更安全，适合个人账号
Token：更稳定，适合 API 密钥
```text
**3. 轮换策略**：
```text
✅ 按使用频率排序（高频 → 低频）
✅ 按账号等级排序（付费 → 免费）
```text
**4. 监控和维护**：
```bash
# 查看当前使用的认证配置
openclaw config get auth.profiles

# 测试认证是否有效
openclaw test api
```text
### 11.2.5 自动切换配置

**基于任务类型切换**：
```json
{
  "rules": [
    {
      "condition": "task.type === 'code'",
      "model": "deepseek-v3"
    },
    {
      "condition": "task.type === 'image'",
      "model": "gemini-3-pro"
    },
    {
      "condition": "task.complexity === 'high'",
      "model": "claude-opus-4.6"
    },
    {
      "condition": "default",
      "model": "claude-sonnet-4.5"
    }
  ]
}
```text
**基于成本切换**：
```json
{
  "rules": [
    {
      "condition": "cost.daily < 10",
      "model": "claude-opus-4.6"
    },
    {
      "condition": "cost.daily >= 10",
      "model": "claude-sonnet-4.5"
    }
  ]
}
```text

## 11.4 成本优化方案

### 11.4.1 Token消耗分析

**查看消耗统计**：
```bash
# 查看今日消耗
openclaw stats today

# 输出示例：
今日Token消耗：
- Claude Sonnet：150K tokens ($0.75)
- Gemini Pro：50K tokens ($0.00)
- 总计：200K tokens ($0.75)

任务分布：
- 文件搜索：30%
- 日程管理：20%
- 知识管理：25%
- 其他：25%
```text
**消耗优化建议**：

⚠️ 高消耗任务：
- 文件搜索：每次10K tokens
- 建议：优化搜索范围

✅ 优化方案：
- 使用缓存
- 减少上下文
- 优化提示词
```text
### 11.4.2 缓存策略

**启用缓存**：
```bash
# 启用响应缓存
openclaw config set cache.enabled true

# 设置缓存时间（小时）
openclaw config set cache.ttl 24

# 设置缓存大小（MB）
openclaw config set cache.maxSize 1000
```text
**缓存效果**：
```
未启用缓存：
- 相同访问题每次都调用API
- Token消耗：10K/次
- 成本：$0.05/次

启用缓存后：
- 相同访问题直接返回缓存
- Token消耗：0
- 成本：$0
- 节省：100%
```text
### 11.4.3 模型降级方案

**降级策略**：
```
1. 简单任务用便宜模型
2. 复杂任务用贵模型
3. 失败后降级重试
```text
**配置示例**：
```javascript
{
  "fallback": [
    "claude-opus-4.6",    // 首选
    "claude-sonnet-4.5",  // 降级1
    "gemini-3-pro"        // 降级2
  ]
}
```text
### 11.4.4 成本控制实战

**案例1：降低50%成本**
```
原方案：
- 全部使用Claude Opus
- 日均消耗：$20

优化方案：
- 简单任务用Sonnet
- 复杂任务用Opus
- 启用缓存

优化后：
- 日均消耗：$10
- 节省：50%
```text
**案例2：免费额度最大化**
```
策略：
1. 优先使用Gemini（免费额度大）
2. 超额后切换到DeepSeek（便宜）
3. 重要任务用Claude

效果：
- 月成本：$5
- 节省：90%
```text

## 📝 本章节小结

学习了OpenClaw的高级配置：
1. Antigravity Manager配置
2. 多模型切换策略
3. 成本优化方案
4. 性能调优技巧

掌握这些技巧可以：
- 降低50%以上成本
- 提升60%响应速度
- 提高系统稳定性


### 11.6.1 支持的模型提供商

#### 国际模型

| 提供商 | 模型 | 特点 | 价格 |
|--------|------|------|------|
| **OpenAI** | GPT-4o, GPT-4o-mini | 功能全面、生态完善 | 高 |
| **Anthropic** | Claude 3.5 Sonnet, Claude 3 Opus | 推理能力强、安全性高 | 中高 |
| **Google** | Gemini 2.0 Flash, Gemini 1.5 Pro | 多模态能力强、免费额度大 | 中 |
| **xAI** | Grok 2 | 实时信息、幽默风格 | 中 |
| **Mistral** | Mistral Large, Mistral Small | 开源友好、性价比高 | 中 |
| **Cohere** | Command R+, Command R | 企业级、RAG 优化 | 中 |

#### 国产模型

| 提供商 | 模型 | 特点 | 价格 |
|--------|------|------|------|
| **DeepSeek** | DeepSeek-V3, DeepSeek-Chat | 性价比之王、编程能力强 | 极低 |
| **月之暗面** | Kimi k2.5 | 超长上下文（200万字） | 低 |
| **智谱AI** | GLM-4, GLM-4V | 多模态、中文优化 | 中 |
| **百川智能** | Baichuan-4 | 中文理解好 | 中 |
| **MiniMax** | abab6.5 | 语音合成、角色扮演 | 中 |
| **阿里云** | Qwen-Max, Qwen-Plus | 阿里生态、企业级 | 中 |
| **百度** | ERNIE 4.0 | 百度生态、知识增强 | 中 |

#### 本地模型

| 提供商 | 模型 | 特点 | 价格 |
|--------|------|------|------|
| **Ollama** | Llama 3.1, Qwen2.5 | 完全本地、隐私保护 | 免费 |
| **LM Studio** | 各种开源模型 | 图形界面、易用 | 免费 |

### 11.6.2 配置 OpenAI

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "openai": {
        "baseUrl": "https://api.openai.com/v1",
        "apiKey": "sk-your-api-key",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "gpt-4o",
            "name": "GPT-4o",
            "contextWindow": 128000,
            "maxTokens": 16384
          },
          {
            "id": "gpt-4o-mini",
            "name": "GPT-4o Mini",
            "contextWindow": 128000,
            "maxTokens": 16384
          }
        ]
      }
    }
  }
}
```text
### 11.6.3 配置 Anthropic (Claude)

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "anthropic": {
        "baseUrl": "https://api.anthropic.com",
        "apiKey": "sk-ant-your-api-key",
        "auth": "api-key",
        "api": "anthropic",
        "models": [
          {
            "id": "claude-3-5-sonnet-20241022",
            "name": "Claude 3.5 Sonnet",
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "claude-3-opus-20240229",
            "name": "Claude 3 Opus",
            "contextWindow": 200000,
            "maxTokens": 4096
          }
        ]
      }
    }
  }
}
```text
### 11.6.4 配置 Google Gemini

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "google": {
        "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
        "apiKey": "your-google-api-key",
        "auth": "api-key",
        "api": "google-ai",
        "models": [
          {
            "id": "gemini-2.0-flash-exp",
            "name": "Gemini 2.0 Flash",
            "contextWindow": 1000000,
            "maxTokens": 8192
          },
          {
            "id": "gemini-1.5-pro",
            "name": "Gemini 1.5 Pro",
            "contextWindow": 2000000,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```text
### 11.6.5 配置 DeepSeek（推荐）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "apiKey": "sk-your-api-key",
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
  }
}
```text
### 11.6.6 配置 Kimi（月之暗面）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "moonshot": {
        "baseUrl": "https://api.moonshot.cn/v1",
        "apiKey": "sk-your-api-key",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "moonshot-v1-8k",
            "name": "Kimi k2.5 8K",
            "contextWindow": 8000,
            "maxTokens": 4096
          },
          {
            "id": "moonshot-v1-32k",
            "name": "Kimi k2.5 32K",
            "contextWindow": 32000,
            "maxTokens": 4096
          },
          {
            "id": "moonshot-v1-128k",
            "name": "Kimi k2.5 128K",
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  }
}
```text
### 11.6.7 配置 Ollama（本地模型）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "ollama": {
        "baseUrl": "http://localhost:11434",
        "auth": "none",
        "api": "ollama",
        "models": [
          {
            "id": "llama3.1:8b",
            "name": "Llama 3.1 8B",
            "contextWindow": 128000,
            "maxTokens": 4096
          },
          {
            "id": "qwen2.5:7b",
            "name": "Qwen 2.5 7B",
            "contextWindow": 32000,
            "maxTokens": 4096
          }
        ]
      }
    }
  }
}
```text
### 11.6.8 多提供商配置示例

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "apiKey": "sk-deepseek-key",
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
      "anthropic": {
        "baseUrl": "https://api.anthropic.com",
        "apiKey": "sk-ant-key",
        "auth": "api-key",
        "api": "anthropic",
        "models": [
          {
            "id": "claude-3-5-sonnet-20241022",
            "name": "Claude 3.5 Sonnet",
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      },
      "ollama": {
        "baseUrl": "http://localhost:11434",
        "auth": "none",
        "api": "ollama",
        "models": [
          {
            "id": "llama3.1:8b",
            "name": "Llama 3.1 8B",
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
        "fallback": [
          "anthropic/claude-3-5-sonnet-20241022",
          "ollama/llama3.1:8b"
        ]
      }
    }
  }
}
```text
### 11.6.9 模型选择策略

**按任务类型选择**：

```javascript
// 编程任务
"deepseek/deepseek-coder"

// 长文档处理
"moonshot/moonshot-v1-128k"

// 复杂推理
"anthropic/claude-3-opus-20240229"

// 日常对话
"deepseek/deepseek-chat"

// 多模态（图片）
"google/gemini-2.0-flash-exp"

// 本地隐私
"ollama/llama3.1:8b"
```text
**按成本选择**：

```
极低成本：DeepSeek ($0.001/千tokens)
低成本：Kimi, GLM-4 ($0.01/千tokens)
中等成本：Gemini, Mistral ($0.05/千tokens)
高成本：Claude, GPT-4 ($0.15/千tokens)
免费：Ollama（本地）
```text

## 11.8 CLI 命令完整参考

> 📟 **命令行工具**：OpenClaw 提供强大的 CLI 工具，方便管理和操作。

### 11.8.1 核心命令

#### 版本和帮助

```bash
# 查看版本
openclaw --version
openclaw -v

# 查看帮助
openclaw --help
openclaw -h

# 查看子命令帮助
openclaw gateway --help
```text
#### 初始化和配置

```bash
# 运行配置向导
openclaw onboard

# 快速开始向导
openclaw setup

# 查看配置
openclaw config list

# 获取配置项
openclaw config get models.providers

# 设置配置项
openclaw config set gateway.port 18790

# 删除配置项
openclaw config delete models.providers.test
```text
### 11.8.2 Gateway 管理

```bash
# 安装/启动 Gateway
openclaw gateway install

# 查看状态
openclaw gateway status

# 停止 Gateway
openclaw gateway stop

# 重启 Gateway
openclaw gateway restart

# 查看日志
openclaw logs
openclaw logs --follow
openclaw logs --limit 100

# 清理日志
openclaw logs clear
```text
### 11.8.3 渠道管理

```bash
# 列出所有渠道
openclaw channels list

# 查看渠道状态
openclaw channels status

# 添加渠道
openclaw channels add

# 删除渠道
openclaw channels remove feishu

# 测试渠道连通性
openclaw channels status --probe
```text
### 11.8.4 配对管理

```bash
# 列出配对请求
openclaw pairing list
openclaw pairing list feishu

# 批准配对
openclaw pairing approve feishu <CODE>

# 拒绝配对
openclaw pairing reject feishu <CODE>

# 清理过期配对
openclaw pairing cleanup
```text
### 11.8.5 插件管理

```bash
# 列出已安装插件
openclaw plugins list

# 搜索插件
openclaw plugins search feishu

# 安装插件
openclaw plugins install @openclaw/feishu

# 卸载插件
openclaw plugins uninstall @openclaw/feishu

# 更新插件
openclaw plugins update @openclaw/feishu

# 更新所有插件
openclaw plugins update --all
```text
### 11.8.6 工具管理

```bash
# 列出所有工具
openclaw tools list

# 启用工具
openclaw tools enable read_file write_file

# 禁用工具
openclaw tools disable execute_command

# 注册自定义工具
openclaw tools register ~/my-tool.js

# 测试工具
openclaw tools test read_file
```text
### 11.8.7 Agent 管理

```bash
# 列出 Agents
openclaw agents list

# 创建 Agent
openclaw agents create my-agent

# 删除 Agent
openclaw agents delete my-agent

# 切换 Agent
openclaw agents switch my-agent

# 查看 Agent 配置
openclaw agents config my-agent
```text
### 11.8.8 会话管理

```bash
# 列出会话
openclaw sessions list

# 查看会话详情
openclaw sessions show <session-id>

# 删除会话
openclaw sessions delete <session-id>

# 清理所有会话
openclaw sessions clear

# 导出会话
openclaw sessions export <session-id> --output session.json

# 导入会话
openclaw sessions import session.json
```text
### 11.8.9 统计和监控

```bash
# 查看统计信息
openclaw stats

# 查看今日统计
openclaw stats today

# 查看本周统计
openclaw stats week

# 查看 API 消耗
openclaw stats api

# 查看内存使用
openclaw stats memory

# 查看性能指标
openclaw stats performance
```text
### 11.8.10 测试和诊断

```bash
# 测试 API 连接
openclaw test api

# 测试渠道
openclaw test channel feishu

# 测试工具
openclaw test tool read_file

# 运行诊断
openclaw diagnose

# 检查配置
openclaw validate config

# 检查健康状态
openclaw health check
```text
### 11.8.11 数据管理

```bash
# 备份数据
openclaw backup create

# 列出备份
openclaw backup list

# 恢复备份
openclaw backup restore <backup-id>

# 清理缓存
openclaw cache clear

# 清理临时文件
openclaw cleanup temp

# 导出数据
openclaw export --output data.json

# 导入数据
openclaw import data.json
```text
### 11.8.12 更新和维护

```bash
# 检查更新
openclaw update check

# 更新到最新版本
openclaw update

# 更新到指定版本
openclaw update --version 2026.3.2

# 回滚版本
openclaw rollback

# 卸载
openclaw uninstall
```text
### 11.8.13 开发布和调试

```bash
# 开发布模式启动
openclaw dev

# 调试模式
openclaw --debug

# 详细日志
openclaw --verbose

# 运行测试
openclaw test

# 构建项目
openclaw build

# 清理构建
openclaw clean
```text
### 11.8.14 常用命令组合

**快速重启**：
```bash
openclaw gateway stop && openclaw gateway install
```text
**查看实时日志**：
```bash
openclaw logs --follow | grep ERROR
```text
**备份并更新**：
```bash
openclaw backup create && openclaw update
```text
**清理并重启**：
```bash
openclaw cache clear && openclaw gateway restart
```text
**完整诊断**：
```bash
openclaw diagnose && openclaw health check && openclaw test api
```text
### 11.8.15 环境变量

```bash
# 设置日志级别
export OPENCLAW_LOG_LEVEL=debug

# 设置配置目附录
export OPENCLAW_HOME=~/.openclaw

# 设置 Gateway 端口
export OPENCLAW_PORT=18789

# 设置 API Key
export DEEPSEEK_API_KEY=sk-xxx
export MOONSHOT_API_KEY=sk-xxx
```text
### 11.8.16 配置文件位置

```bash
# 主配置文件
~/.openclaw/openclaw.json

# 日志文件件
~/.openclaw/logs/gateway.log

# 缓存目附录
~/.openclaw/cache/

# 数据目附录
~/.openclaw/data/

# 插件目附录
~/.openclaw/plugins/

# 工具目附录
~/.openclaw/tools/
```


##11.10 Brave Web Search：LLM Context 模式（2026.3.8+，可选）

2026.3.8 新增可选配置 `tools.web.search.brave.mode: "llm-context"`，用于让 `web_search` 调用 Brave 的 *LLM Context*端点返回更适合大模型使用的 grounding snippets（带来源元数据）。

```yaml
tools:
 web:
 search:
 brave:
 mode: "llm-context"
```

>说明：该模式为 **opt-in**，不配置则保支持原行为。


