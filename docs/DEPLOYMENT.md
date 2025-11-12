# YECO 部署指南

## 目录
- [1. 概述](#1-概述)
- [2. Vercel部署](#2-vercel部署)
- [3. 域名配置](#3-域名配置)
- [4. 环境配置](#4-环境配置)
- [5. 性能优化](#5-性能优化)
- [6. 监控与分析](#6-监控与分析)
- [7. 常见问题](#7-常见问题)
- [8. 维护指南](#8-维护指南)

---

## 1. 概述

YECO 网站使用 Vercel 作为托管平台，提供以下优势：

- **全球CDN加速**：边缘节点分发，快速访问
- **自动HTTPS**：免费SSL证书
- **零配置部署**：与Git仓库集成
- **实时预览**：每个PR自动生成预览链接
- **性能优化**：自动压缩和缓存

### 技术栈

- **前端框架**：原生 HTML/CSS/JavaScript
- **托管平台**：Vercel
- **版本控制**：Git
- **域名管理**：Vercel Domains / 第三方DNS

---

## 2. Vercel部署

### 2.1 前置准备

1. **创建Vercel账号**
   - 访问 https://vercel.com
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **安装Vercel CLI（可选）**
   ```bash
   npm install -g vercel
   # 或
   yarn global add vercel
   ```

3. **准备Git仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### 2.2 通过Web界面部署

#### 步骤 1：导入项目

1. 登录 Vercel Dashboard
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 授权 Vercel 访问你的 GitHub/GitLab
5. 选择 YECO 项目仓库

#### 步骤 2：配置项目

```yaml
# 项目配置
Framework Preset: Other
Root Directory: ./
Build Command: (留空 - 静态站点无需构建)
Output Directory: ./
Install Command: (留空)
```

#### 步骤 3：环境变量（如有需要）

```
# 暂无需要配置的环境变量
# 如果将来需要API密钥等，在此配置
```

#### 步骤 4：部署

1. 点击 "Deploy" 按钮
2. 等待部署完成（通常 < 1分钟）
3. 获得部署URL：`https://yeco.vercel.app` 或 `https://yeco-xxxx.vercel.app`

### 2.3 通过CLI部署

```bash
# 进入项目目录
cd /path/to/yeco

# 登录Vercel
vercel login

# 首次部署（会询问配置）
vercel

# 生产环境部署
vercel --prod

# 查看部署信息
vercel inspect <deployment-url>
```

### 2.4 自动部署配置

Vercel 会自动监听 Git 仓库变化：

```
main/master 分支 → 自动部署到生产环境
其他分支 → 自动部署到预览环境
Pull Request → 自动生成预览URL
```

#### 配置 vercel.json

在项目根目录创建 `vercel.json`：

```json
{
  "version": 2,
  "name": "yeco",
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/pages/home/index.html"
    },
    {
      "src": "/trends",
      "dest": "/pages/trends/index.html"
    },
    {
      "src": "/reports/(.*)",
      "dest": "/pages/reports/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 3. 域名配置

### 3.1 使用Vercel提供的域名

默认域名格式：`https://<project-name>.vercel.app`

**优点**：
- 免费
- 自动SSL
- 无需配置

**缺点**：
- 不够专业
- 无法自定义

### 3.2 配置自定义域名

#### 方法1：在Vercel购买域名

1. 进入项目 Settings → Domains
2. 点击 "Buy a domain"
3. 搜索可用域名（如 `yeco.design`）
4. 购买域名
5. Vercel 自动配置 DNS 和 SSL

#### 方法2：使用已有域名

假设你有域名 `yeco.com`：

1. **在Vercel添加域名**
   - 进入项目 Settings → Domains
   - 输入 `yeco.com`
   - 点击 "Add"

2. **配置DNS记录**

   在你的DNS服务商（如 Cloudflare, GoDaddy）添加：

   ```
   类型: A
   名称: @
   值: 76.76.21.21
   TTL: 自动

   类型: CNAME
   名称: www
   值: cname.vercel-dns.com
   TTL: 自动
   ```

3. **等待DNS生效**
   - 通常需要 5分钟 - 48小时
   - 使用 `dig yeco.com` 检查

4. **验证SSL证书**
   - Vercel 自动申请 Let's Encrypt 证书
   - 通常在 DNS 生效后 5-10分钟内完成

### 3.3 多域名配置

```json
// vercel.json
{
  "alias": [
    "yeco.com",
    "www.yeco.com",
    "yeco.design",
    "www.yeco.design"
  ]
}
```

### 3.4 重定向配置

```json
// 将 www 重定向到主域名
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.yeco.com"
        }
      ],
      "destination": "https://yeco.com/:path*",
      "permanent": true
    }
  ]
}
```

---

## 4. 环境配置

### 4.1 环境变量

虽然当前项目是纯静态站点，但为未来扩展预留环境变量配置：

```bash
# 在 Vercel Dashboard 中配置
# Settings → Environment Variables

# 生产环境
NODE_ENV=production
SITE_URL=https://yeco.com

# 开发环境
NODE_ENV=development
SITE_URL=http://localhost:3000
```

### 4.2 Git忽略文件

确保 `.gitignore` 正确配置：

```gitignore
# 系统文件
.DS_Store
Thumbs.db

# 编辑器
.vscode/
.idea/
*.sublime-*

# 临时文件
*.log
*.tmp
.cache/

# 环境变量（如果使用）
.env
.env.local
.env.*.local

# Vercel
.vercel
```

---

## 5. 性能优化

### 5.1 图片优化

#### 使用 Vercel Image Optimization（可选）

```html
<!-- 原始 -->
<img src="/images/hero.jpg" alt="Hero">

<!-- 使用 Vercel Image -->
<img src="/_vercel/image?url=/images/hero.jpg&w=1200&q=80" alt="Hero">
```

#### 响应式图片

```html
<img
  src="/images/hero-800.jpg"
  srcset="
    /images/hero-400.jpg 400w,
    /images/hero-800.jpg 800w,
    /images/hero-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 80vw"
  alt="Hero"
  loading="lazy"
>
```

#### WebP格式

```html
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <source srcset="/images/hero.jpg" type="image/jpeg">
  <img src="/images/hero.jpg" alt="Hero">
</picture>
```

### 5.2 CSS优化

#### 关键CSS内联

```html
<!-- 首屏关键CSS内联 -->
<style>
  /* Critical CSS */
  body { background: #000; color: #fff; }
  .hero { min-height: 100vh; }
</style>

<!-- 非关键CSS异步加载 -->
<link rel="preload" href="/assets/styles/main.css" as="style" onload="this.rel='stylesheet'">
```

#### CSS压缩

```bash
# 使用 cssnano 压缩CSS
npx cssnano input.css output.css
```

### 5.3 JavaScript优化

#### 延迟加载

```html
<!-- 非关键JS延迟加载 -->
<script src="/script.js" defer></script>

<!-- 独立模块 -->
<script src="/analytics.js" async></script>
```

#### 代码分割

```javascript
// 动态导入
async function loadModule() {
  const module = await import('./heavy-module.js');
  module.init();
}

// 按需加载语言包
async function loadLanguage(lang) {
  const translations = await import(`./i18n/${lang}.js`);
  return translations.default;
}
```

### 5.4 缓存策略

```json
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/pages/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### 5.5 字体优化

```css
/* 字体预加载 */
@font-face {
  font-family: 'Playfair Display';
  src: url('/assets/fonts/playfair.woff2') format('woff2');
  font-display: swap; /* 避免FOIT */
}
```

```html
<!-- 预加载关键字体 -->
<link rel="preload" href="/assets/fonts/playfair.woff2" as="font" type="font/woff2" crossorigin>
```

### 5.6 预连接

```html
<!-- 预连接到外部资源 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://analytics.google.com">
```

---

## 6. 监控与分析

### 6.1 Vercel Analytics

启用 Vercel 内置分析：

1. 进入项目 Settings → Analytics
2. 启用 "Web Analytics"
3. 在页面中添加脚本：

```html
<script defer src="/_vercel/insights/script.js"></script>
```

### 6.2 Google Analytics

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 6.3 性能监控

#### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://yeco.vercel.app
            https://yeco.vercel.app/trends
          uploadArtifacts: true
```

#### 性能指标目标

```
First Contentful Paint (FCP): < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Cumulative Layout Shift (CLS): < 0.1
First Input Delay (FID): < 100ms
Time to Interactive (TTI): < 3.8s
```

### 6.4 错误追踪

使用 Sentry 追踪错误：

```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({
    dsn: 'https://xxx@sentry.io/xxx',
    environment: 'production',
    tracesSampleRate: 0.1
  });
</script>
```

### 6.5 日志查看

```bash
# 查看部署日志
vercel logs <deployment-url>

# 实时日志
vercel logs --follow

# 按时间筛选
vercel logs --since 1h
```

---

## 7. 常见问题

### Q1: 部署后页面404

**原因**：路由配置不正确

**解决方法**：检查 `vercel.json` 路由配置

```json
{
  "routes": [
    {
      "src": "/",
      "dest": "/pages/home/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### Q2: 自定义域名无法访问

**原因**：DNS未正确配置或未生效

**检查方法**：

```bash
# 检查DNS记录
dig yeco.com

# 检查CNAME
dig www.yeco.com CNAME

# 检查SSL证书
curl -vI https://yeco.com
```

**解决方法**：
1. 确认DNS记录正确
2. 等待DNS传播（最多48小时）
3. 清除DNS缓存：`sudo dscacheutil -flushcache`

### Q3: 图片加载慢

**原因**：图片未优化

**解决方法**：
1. 压缩图片（PNG使用pngquant，JPG使用ImageOptim）
2. 使用 WebP 格式
3. 启用懒加载
4. 使用 CDN

### Q4: 语言切换后页面不更新

**原因**：
1. 语言包未正确加载
2. i18n 系统未初始化
3. 缓存问题

**解决方法**：
1. 检查控制台错误
2. 确认语言包已注册
3. 清除浏览器缓存
4. 使用 `vercel.json` 配置正确的缓存策略

### Q5: Vercel部署失败

**常见原因**：
1. Git仓库未正确推送
2. 文件权限问题
3. 路径错误

**检查步骤**：

```bash
# 1. 确认Git状态
git status
git log

# 2. 检查Vercel日志
vercel logs

# 3. 本地测试
npx serve .
```

### Q6: 性能分数低

**优化建议**：

1. **图片优化**
   - 压缩图片
   - 使用 WebP
   - 启用懒加载

2. **CSS优化**
   - 移除未使用的CSS
   - 内联关键CSS
   - 压缩CSS

3. **JavaScript优化**
   - 延迟加载
   - 代码分割
   - 压缩JS

4. **字体优化**
   - 使用 `font-display: swap`
   - 预加载关键字体
   - 使用系统字体栈

---

## 8. 维护指南

### 8.1 日常维护

#### 每日检查

- [ ] 网站可访问性
- [ ] 所有页面正常加载
- [ ] 语言切换功能正常
- [ ] 无JavaScript错误

#### 每周检查

- [ ] 性能指标（Lighthouse分数）
- [ ] 错误日志
- [ ] 访问统计
- [ ] SSL证书有效期

#### 每月检查

- [ ] 依赖更新（如有）
- [ ] 安全漏洞扫描
- [ ] 备份数据
- [ ] 域名续费提醒

### 8.2 更新流程

```bash
# 1. 创建新分支
git checkout -b feature/new-report

# 2. 进行修改
# ... 编辑文件 ...

# 3. 提交更改
git add .
git commit -m "Add new report: 2024-11-europe"

# 4. 推送到远程
git push origin feature/new-report

# 5. 创建Pull Request
# 在GitHub/GitLab上创建PR

# 6. 预览部署
# Vercel自动生成预览URL

# 7. 合并到主分支
git checkout main
git merge feature/new-report
git push origin main

# 8. 自动部署到生产环境
```

### 8.3 回滚操作

如果部署出现问题，可以快速回滚：

#### 方法1：通过Vercel Dashboard

1. 进入项目 → Deployments
2. 找到之前的稳定版本
3. 点击 "Promote to Production"

#### 方法2：通过CLI

```bash
# 查看部署历史
vercel ls

# 回滚到指定版本
vercel rollback <deployment-url>
```

#### 方法3：通过Git

```bash
# 回退到上一个commit
git revert HEAD
git push origin main

# 回退到指定commit
git revert <commit-hash>
git push origin main
```

### 8.4 备份策略

#### 代码备份

- 主仓库：GitHub/GitLab
- 镜像仓库：Gitee（国内访问）
- 本地备份：定期克隆

```bash
# 克隆完整历史
git clone --mirror <repo-url>

# 备份到其他平台
git remote add backup <backup-url>
git push backup --all
git push backup --tags
```

#### 资源备份

```bash
# 备份图片和静态资源
tar -czf yeco-assets-$(date +%Y%m%d).tar.gz assets/ pages/*/images/

# 上传到云存储（如腾讯云COS）
# 使用COSCMD或S3工具
```

### 8.5 监控告警

设置监控告警，及时发现问题：

```javascript
// 使用Uptime Robot或类似服务
// 监控URL: https://yeco.com
// 检查间隔: 5分钟
// 告警方式: 邮件/短信/Webhook

// 性能阈值告警
if (LCP > 2.5) {
  sendAlert('LCP超过2.5秒');
}

if (CLS > 0.1) {
  sendAlert('CLS超过0.1');
}
```

### 8.6 文档更新

维护以下文档：

- `README.md` - 项目说明
- `CHANGELOG.md` - 更新日志
- `DEPLOYMENT.md` - 本文档
- 各报告的 `README.md` - 报告说明

```markdown
## CHANGELOG.md 示例

# 更新日志

## [1.2.0] - 2024-11-12
### 新增
- 添加欧洲市场趋势报告
- 新增法语支持

### 优化
- 优化图片加载速度
- 改进RTL布局

### 修复
- 修复Safari下的语言切换问题
- 修复移动端导航菜单错位

## [1.1.0] - 2024-10-15
### 新增
- 添加中东市场趋势报告
- 完善阿拉伯语支持

...
```

---

## 附录：快速命令参考

```bash
# Vercel CLI
vercel login                    # 登录
vercel                          # 部署到预览环境
vercel --prod                   # 部署到生产环境
vercel ls                       # 查看部署列表
vercel logs                     # 查看日志
vercel domains                  # 管理域名
vercel inspect <url>            # 查看部署详情
vercel rollback <url>           # 回滚部署

# Git
git status                      # 查看状态
git add .                       # 添加所有文件
git commit -m "message"         # 提交
git push                        # 推送
git pull                        # 拉取
git log                         # 查看历史

# DNS检查
dig yeco.com                    # 查询A记录
dig www.yeco.com CNAME          # 查询CNAME
nslookup yeco.com               # Windows DNS查询

# 性能测试
lighthouse <url>                # Lighthouse测试
curl -o /dev/null -s -w "%{time_total}\n" <url>  # 测试加载时间
```

---

## 更新日志

- **2024-11-12**: 初始版本创建
