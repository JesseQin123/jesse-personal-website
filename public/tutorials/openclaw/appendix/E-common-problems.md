
# 附录E：常见访问题速查

> 💡 **快速定位访问题**：本附录汇总了OpenClaw使用过程中最常见的各类访问题及解决方案，帮助你快速排查和解决访问题。

## 📋 目附录

- [安装配置访问题](#安装配置访问题)
- [API连接访问题](#api连接访问题)
- [Gateway访问题](#gateway访问题)
- [Skills访问题](#skills访问题)
- [平台集成访问题](#平台集成访问题)
- [性能访问题](#性能访问题)


## API连接访问题

### Q4: API连接失败怎么怎么办？

**症状**：提示API连接错误或超时

**解决方案**：

1. **检查API Key是否正确**
```bash
openclaw config get env | grep API_KEY
```

2. **测试API连接**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.anthropic.com/v1/messages
```

3. **检查网络**
```bash
ping api.anthropic.com
```

4. **使用中转API（国内推荐）**
- 参考附录C：API服务商对比

### Q5: API费用太高怎么怎么办？

**症状**：API使用成本超出预算

**解决方案**：

1. **使用国产模型**
- DeepSeek：成本降低95%
- Kimi：长文档处理优惠
- GLM-4：中文友好

2. **多模型组合**
```json
{
  "env": {
    "ANTHROPIC_API_KEY": "sk-ant-xxx",
    "DEEPSEEK_API_KEY": "sk-xxx"
  },
  "agents": [
    {
      "name": "assistant",
      "model": "claude-3-5-sonnet-20241022"
    },
    {
      "name": "coder",
      "model": "deepseek-chat"
    }
  ]
}
```

3. **设置工具权限**
```bash
openclaw config set tools.profile "coding"  # 限制工具使用
```


## Skills访问题

### Q9: Skills安装失败怎么怎么办？

**症状**：`clawhub install`命令执行失败

**解决方案**：

1. **检查网络连接**
```bash
ping clawhub.ai
```

2. **使用ClawHub镜像（如有）**
```bash
clawhub install skill-name --registry https://mirror.clawhub.ai
```

3. **手动安装**
```bash
# 下载Skill源码
git clone https://github.com/user/skill-repo.git

# 安装依赖
cd skill-repo
npm install

# 复制到Skills目附录
cp -r . ~/.openclaw/skills/skill-name
```

### Q10: Skills不生效怎么怎么办？

**症状**：安装Skill后功能无法使用

**解决方案**：

1. **检查Skill配置**
```bash
cat ~/.openclaw/skills/skill-name/SKILL.md
```

2. **重启Gateway**
```bash
openclaw daemon restart
```

3. **检查Skill权限**
```bash
openclaw config get skills.allowlist
```

4. **查看错误日志**
```bash
tail -f ~/.openclaw/logs/skills.log
```

### Q11: 如何卸载Skills？

**解决方案**：

```bash
# 使用clawhub卸载
clawhub uninstall skill-name

# 手动删除
rm -rf ~/.openclaw/skills/skill-name

# 重启Gateway
openclaw daemon restart
```

### Q12: Skills冲突怎么怎么办？

**症状**：多个Skills功能冲突

**解决方案**：

1. **检查Skills列表**
```bash
clawhub list
```

2. **禁用冲突Skills**
```json
{
  "skills": {
    "denylist": ["skill-a", "skill-b"]
  }
}
```

3. **使用版本管理**
```bash
clawhub install skill-name@version
```


## 性能访问题

### Q17: 响应速度慢怎么怎么办？

**解决方案**：

1. **使用更快的模型**
- DeepSeek：国内访问快
- Claude 3.5 Sonnet：平衡速度和质量

2. **减少上下文**
```bash
# 定期清理会话历史
openclaw chat clear
```

3. **优化配置**
```json
{
  "agents": [{
    "maxTokens": 4096,  # 减少输出长度
    "temperature": 0.7
  }]
}
```

### Q18: 内存占用过高？

**解决方案**：

1. **限制会话数量**
```bash
openclaw config set sessions.max 10
```

2. **定期重启Gateway**
```bash
openclaw daemon restart
```

3. **使用Docker部署**
```bash
docker run -d --memory="2g" openclaw/openclaw
```

### Q19: 磁盘空间不足？

**解决方案**：

1. **清理日志文件**
```bash
rm -rf ~/.openclaw/logs/*.log
```

2. **清理缓存**
```bash
rm -rf ~/.openclaw/cache/*
```

3. **清理旧会话**
```bash
openclaw session prune --days 30
```


**最后更新**：2026年3月27日
**适用版本**：OpenClaw v2026.3.7+（Q4 适用 v2026.3.22+）
