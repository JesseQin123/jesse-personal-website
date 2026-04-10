
# 附录G：文档链接验证

> 📋 **链接检查**：本附录列出教程中所有外部链接和内部链接的验证状态


## 🔗 外部链接清单

### 官方资源

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://openclaw.ai | OpenClaw官网 | ✅ 正常 | - |
| https://docs.openclaw.ai | 官方文档 | ✅ 正常 | - |
| https://github.com/openclaw/openclaw | GitHub仓库 | ✅ 正常 | - |
| https://clawhub.ai | ClawHub技能市场 | ✅ 正常 | - |
| https://www.moltbook.com | Moltbook社区 | ✅ 正常 | - |

### 安装脚本

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://openclaw.ai/install.sh | 一键安装脚本 | ✅ 正常 | macOS/Linux |
| https://openclaw.ai/install.ps1 | Windows安装脚本 | ✅ 正常 | PowerShell |
| https://openclaw.ai/install-cli.sh | CLI安装脚本 | ✅ 正常 | 命令行版本 |

### API服务商

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://platform.openai.com | OpenAI平台 | ✅ 正常 | 需要科学上网 |
| https://api.deepseek.com | DeepSeek API | ✅ 正常 | 国内可访问 |
| https://platform.moonshot.cn | Kimi API | ✅ 正常 | 国内可访问 |
| https://open.bigmodel.cn | 智谱AI | ✅ 正常 | 国内可访问 |
| https://cloud.baidu.com/product/wenxinworkshop | 百度千帆 | ✅ 正常 | 国内可访问 |

### 中转API服务

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://s.apifox.cn/1dd2f97d-5021-4d82-8e03-a232cc3f63eb/doc-8138201 | 中转API文档 | ✅ 正常 | 推荐使用 |

### 云服务商

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://cloud.tencent.com | 腾讯云 | ✅ 正常 | 推荐新手 |
| https://www.aliyun.com | 阿里云 | ✅ 正常 | 备选方案 |
| https://www.volcengine.com | 火山引擎 | ✅ 正常 | 飞书用户 |
| https://www.cloudflare.com | Cloudflare | ✅ 正常 | 进阶用户 |

### 视频教程

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://cloud.tencent.com/developer/video/85003 | 企微和QQ接入 | ✅ 正常 | 腾讯云官方 |
| https://cloud.tencent.com/developer/video/85055 | 飞书和钉钉接入 | ✅ 正常 | 腾讯云官方 |
| https://cloud.tencent.com/developer/video/85061 | Skills安装使用 | ✅ 正常 | 腾讯云官方 |

### 社区资源

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://github.com/VoltAgent/awesome-openclaw-skills | Awesome Skills | ✅ 正常 | Skills合集 |
| https://github.com/xianyu110/clawbot | Clawbot项目 | ✅ 正常 | 历史参考 |

### 开放平台

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://open.feishu.cn | 飞书开放平台 | ✅ 正常 | 飞书Bot配置 |
| https://work.weixin.qq.com | 企业微信 | ✅ 正常 | 企微Bot配置 |
| https://open.dingtalk.com | 钉钉开放平台 | ✅ 正常 | 钉钉Bot配置 |
| https://bot.q.qq.com | QQ开放平台 | ✅ 正常 | QQ Bot配置 |

### 工具和依赖

| 链接 | 描述 | 状态 | 备注 |
|------|------|------|------|
| https://nodejs.org | Node.js官网 | ✅ 正常 | 必需依赖 |
| https://www.docker.com | Docker官网 | ✅ 正常 | 可选部署 |
| https://brew.sh | Homebrew | ✅ 正常 | macOS包管理 |


## 🖼️ 图片链接清单

### 配置截图

| 图片 | 描述 | 状态 | 位置 |
|------|------|------|------|
| 交流群二维码 | OpenClaw交流群 | ✅ 正常 | README.md |
| 飞书配置截图 | 飞书Bot配置 | 📝 待补充 | 第9章 |
| 企微配置截图 | 企微Bot配置 | 📝 待补充 | 第9章 |
| Gateway界面 | 管理界面 | 📝 待补充 | 第2章 |
| Skills市场 | ClawHub界面 | 📝 待补充 | 第8章 |

### 架构图

| 图片 | 描述 | 状态 | 位置 |
|------|------|------|------|
| 系统架构图 | OpenClaw架构 | 📝 待补充 | 第1章 |
| Skills工作流 | Skills执行流程 | 📝 待补充 | 第8章 |
| 多Agent架构 | 多Agent配置 | 📝 待补充 | 第9章 |


## 📝 链接维护规范

### 1. 外部链接

**规范**：
- ✅ 使用HTTPS协议
- ✅ 使用官方域名
- ✅ 避免使用短链接
- ✅ 定期检查有效性

**示例**：
```markdown
<!-- ✅ 正确 -->
[OpenClaw官网](https://openclaw.ai)

<!-- ❌ 错误 -->
[OpenClaw官网](http://openclaw.ai)  <!-- 使用HTTP -->
[OpenClaw官网](https://bit.ly/xxx)  <!-- 使用短链接 -->
```

### 2. 内部链接

**规范**：
- ✅ 使用相对路径
- ✅ 包含文件扩展名
- ✅ 使用小写和连字符
- ✅ 锚点使用中文或英文

**示例**：
```markdown
<!-- ✅ 正确 -->
[第1章](../docs/01-basics/01-introduction.md)
[安装配置](#安装配置问题)

<!-- ❌ 错误 -->
[第1章](/docs/01-basics/01-introduction)  <!-- 缺少.md -->
[第1章](../docs/01-basics/01-introduction.md)  <!-- 路径错误 -->
```

### 3. 图片链接

**规范**：
- ✅ 使用相对路径或CDN
- ✅ 提供alt文本
- ✅ 指定宽度（可选）
- ✅ 使用WebP格式（推荐）

**示例**：
```markdown
<!-- ✅ 正确 -->
![OpenClaw架构图](images/architecture.png)
<img src="images/screenshot.png" alt="配置截图" width="600">

<!-- ❌ 错误 -->
![](images/screenshot.png)  <!-- 缺少alt文本 -->
```


## 📞 报告问题

如果发现链接失效，请：

1. **提交Issue**
2. **标题格式**：`[链接失效] 章节名称 - 链接描述`
3. **提供信息**：
   - 失效链接的完整URL
   - 所在文档和行号
   - 错误信息（如404、超时等）
   - 建议的替代链接（如有）
