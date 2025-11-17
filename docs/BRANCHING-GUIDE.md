# Git 分支使用指南

## 📋 分支说明

本项目使用双分支策略来隔离生产环境和开发环境：

```
main       → 生产环境（正式网站）
develop    → 开发环境（测试新功能）
```

---

## 🎯 分支用途

### `main` 分支（生产环境）
- **用途**：正式上线的代码
- **部署**：自动部署到 Vercel 生产环境
- **网址**：你的正式域名
- **原则**：只包含已测试、稳定的代码

### `develop` 分支（开发环境）
- **用途**：日常开发、测试新功能
- **部署**：自动部署到 Vercel 预览环境
- **网址**：Vercel 自动生成的预览链接
- **原则**：可以自由实验，不影响生产环境

---

## 🚀 日常工作流程

### 1. 开始开发新功能

```bash
# 确保在 develop 分支
git checkout develop

# 拉取最新代码
git pull origin develop
```

### 2. 开发并提交

```bash
# 修改代码...

# 提交更改
git add .
git commit -m "feat: 添加新功能"

# 推送到 develop 分支
git push origin develop
```

**结果**：Vercel 会自动为这次提交生成一个预览链接，你可以在预览环境中测试。

### 3. 测试通过后发布到生产环境

```bash
# 切换到 main 分支
git checkout main

# 拉取最新代码
git pull origin main

# 合并 develop 分支
git merge develop

# 推送到 main 分支
git push origin main
```

**结果**：代码自动部署到生产环境，正式网站更新。

---

## 🔄 切换分支

```bash
# 切换到开发环境
git checkout develop

# 切换到生产环境
git checkout main

# 查看当前在哪个分支
git branch
```

---

## 🛡️ 安全原则

### ✅ 应该做的
- 日常开发在 `develop` 分支上进行
- 在 Vercel 预览链接中测试新功能
- 测试通过后再合并到 `main`
- 遇到问题可以随时回退

### ❌ 不应该做的
- 不要直接在 `main` 分支上开发
- 不要跳过测试直接合并到 `main`
- 不要在 `main` 分支上做实验性修改

---

## 📝 实用命令速查

```bash
# 查看当前分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 查看当前状态
git status

# 查看提交历史
git log --oneline -10

# 撤销未提交的修改
git checkout -- <文件名>

# 查看两个分支的差异
git diff main develop
```

---

## 🆘 常见问题

### Q1: 我现在在哪个分支？
```bash
git branch
# 带 * 号的就是当前分支
```

### Q2: 我在 develop 分支提交了代码，为什么生产环境没变？
这是正常的！`develop` 分支的代码不会自动到生产环境。
你需要测试通过后，手动合并到 `main` 分支。

### Q3: 我想看 Vercel 的预览链接在哪里？
1. 推送代码到 `develop` 分支后
2. 访问 Vercel Dashboard
3. 在 Deployments 页面找到最新的部署
4. 点击预览链接

### Q4: 我改错了代码怎么办？
如果还没提交：
```bash
git checkout -- <文件名>  # 撤销单个文件
git reset --hard          # 撤销所有未提交的修改
```

如果已经提交到 `develop`：
```bash
git reset --hard HEAD~1   # 回退到上一个提交
git push origin develop --force  # 强制推送（仅限 develop 分支）
```

### Q5: 如何查看 develop 和 main 的区别？
```bash
git diff main develop
```

---

## 🎓 小贴士

1. **频繁提交**：在 `develop` 分支上可以频繁提交，不用担心
2. **清晰的提交信息**：使用有意义的提交信息，方便以后查找
3. **测试后再发布**：始终在预览环境测试通过后再合并到 `main`
4. **保持同步**：开发前先 `git pull` 拉取最新代码

---

## 📞 需要帮助？

如果遇到 Git 相关问题，可以：
1. 查阅本文档
2. 运行 `git status` 查看当前状态
3. 寻求团队成员帮助

---

**最后更新**：2025-11-17
**维护者**：YECO Team
