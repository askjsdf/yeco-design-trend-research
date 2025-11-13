# YECO

> 世界文化交融的香水包装设计专家

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

---

## 项目简介

YECO 是一家面向世界的香水包装设计生产公司。我们不仅设计香水包装，更创造文化的对话空间。本项目是 YECO 的官方网站，展示我们的品牌理念、趋势研究和服务内容。

### 核心特点

- **多语言支持**：中文、English、العربية（阿拉伯语）
- **RTL布局**：完整的从右到左布局支持
- **高端设计**：黑金配色 + 伊斯兰纹样装饰
- **响应式**：完美适配桌面、平板、手机
- **性能优化**：全球CDN加速，< 3秒加载

---

## 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **部署**: Vercel
- **版本控制**: Git

### 无框架依赖

本项目采用原生技术栈，不依赖任何前端框架（React/Vue/Angular），具有以下优势：

- 轻量级，加载速度快
- 易于维护，学习成本低
- 完全控制，无版本依赖
- SEO友好，搜索引擎优化

---

## 项目结构

```
yeco/
├── README.md                   # 项目说明（本文件）
├── index.html                  # 网站入口
├── vercel.json                 # Vercel配置
│
├── docs/                       # 📚 完整开发文档
│   ├── README.md              # 文档导航
│   ├── DESIGN-SYSTEM.md       # 设计系统文档
│   ├── I18N-GUIDE.md          # 多语言开发指南
│   ├── REPORT-TEMPLATE.md     # 报告开发规范
│   └── DEPLOYMENT.md          # 部署指南
│
├── assets/                     # 全局资源
│   ├── styles/                # 全局样式
│   │   ├── variables.css      # CSS变量
│   │   ├── typography.css     # 字体样式
│   │   └── rtl.css           # RTL样式
│   ├── fonts/                 # 字体文件
│   └── images/                # 全局图片
│
├── shared/                     # 共享组件
│   ├── components/            # 可复用组件
│   │   └── LanguageSwitcher/
│   └── i18n/                  # i18n系统
│       ├── i18n-core.js       # 核心系统
│       └── rtl-handler.js     # RTL处理器
│
└── pages/                      # 页面
    ├── home/                  # 首页
    ├── trends/                # 趋势研究
    └── reports/               # 趋势报告
        └── 2025-10-middleeast/
```

---

## 快速开始

### 本地开发

```bash
# 1. 克隆项目
git clone <repo-url>
cd yeco

# 2. 启动本地服务器
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 3. 访问网站
# 打开浏览器访问 http://localhost:8000
```

### 部署到Vercel

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

---

## 开发文档

完整的开发文档位于 `/docs` 目录，包含：

| 文档 | 用途 | 适用人群 |
|------|------|---------|
| [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | 设计系统规范 | UI设计师、前端开发 |
| [I18N-GUIDE.md](./docs/I18N-GUIDE.md) | 多语言开发指南 | 前端开发、内容编辑 |
| [REPORT-TEMPLATE.md](./docs/REPORT-TEMPLATE.md) | 报告开发规范 | 内容开发、前端开发 |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | 部署指南 | DevOps、技术主管 |

**推荐阅读顺序**：
1. 先阅读 [docs/README.md](./docs/README.md) 了解文档体系
2. 根据角色选择相关文档深入学习

---

## 核心功能

### 1. 多语言系统

- **支持语言**：中文（zh-CN）、English（en-US）、العربية（ar-SA）
- **自动检测**：浏览器语言、URL参数、本地存储
- **RTL支持**：阿拉伯语完整的从右到左布局
- **动态切换**：无刷新切换语言

详见：[I18N-GUIDE.md](./docs/I18N-GUIDE.md)

### 2. 设计系统

- **配色**：黑金高端配色系统
- **字体**：多语言专属字体（思源宋体、Playfair Display、Noto Naskh Arabic）
- **组件**：统一的UI组件库（按钮、卡片、导航等）
- **装饰**：伊斯兰纹样背景

详见：[DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md)

### 3. 趋势报告

- **深度研究**：基于社交媒体的消费者洞察
- **精美排版**：杂志级的视觉呈现
- **数据可视化**：直观的图表和统计
- **多语言发布**：三语同步发布

详见：[REPORT-TEMPLATE.md](./docs/REPORT-TEMPLATE.md)

---

## 开发规范

### 代码风格

```css
/* CSS: 使用CSS变量 */
.button {
    background: var(--accent-gold);
    padding: var(--spacing-sm);
}

/* JavaScript: ES6+语法 */
const init = async () => {
    await i18n.init();
    console.log('Initialized');
};
```

### 命名规范

- **文件**: `kebab-case` (my-file.js)
- **CSS类**: `kebab-case` (.my-class)
- **JavaScript变量**: `camelCase` (myVariable)
- **常量**: `UPPER_SNAKE_CASE` (MY_CONSTANT)

### Git提交规范

```bash
# 格式
<type>: <subject>

# 示例
feat: 添加欧洲市场趋势报告
fix: 修复Safari下的语言切换问题
docs: 更新部署指南
style: 优化移动端布局
```

---

## 性能指标

### Lighthouse分数目标

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

### 核心Web指标

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

---

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 最近2个版本 |
| Firefox | 最近2个版本 |
| Safari | 最近2个版本 |
| Edge | 最近2个版本 |
| 移动端Safari | iOS 12+ |
| 移动端Chrome | Android 8+ |

---

## 贡献指南

我们欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 贡献类型

- 🐛 修复bug
- ✨ 添加新功能
- 📝 改进文档
- 🎨 优化UI/UX
- ⚡️ 性能优化
- ♿️ 无障碍改进

---

## 测试

### 功能测试清单

- [ ] 语言切换正常
- [ ] 所有链接可点击
- [ ] 图片正常加载
- [ ] 表单提交正常
- [ ] 无JavaScript错误

### 跨浏览器测试

```bash
# 使用 BrowserStack 或 LambdaTest
# 测试主流浏览器和设备
```

### 性能测试

```bash
# Lighthouse CI
lighthouse https://yeco.com --view

# WebPageTest
# 访问 https://www.webpagetest.org
```

---

## 部署

### 自动部署

推送到 `main` 分支会自动触发 Vercel 部署：

```bash
git push origin main
```

### 手动部署

```bash
vercel --prod
```

详见：[DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

## 常见问题

### Q: 如何添加新的趋势报告？

A: 参考 [REPORT-TEMPLATE.md](./docs/REPORT-TEMPLATE.md) 中的完整指南。

### Q: 如何修改配色？

A: 编辑 `/assets/styles/variables.css` 中的CSS变量。

### Q: 如何添加新语言？

A: 参考 [I18N-GUIDE.md](./docs/I18N-GUIDE.md) 中的"如何添加新语言"章节。

### Q: 部署后网站无法访问？

A: 参考 [DEPLOYMENT.md](./docs/DEPLOYMENT.md) 中的"常见问题"章节。

---

## 路线图

### 已完成 ✅

- [x] 多语言系统（中/英/阿）
- [x] RTL布局支持
- [x] 首页设计
- [x] 趋势研究页
- [x] 中东市场报告
- [x] Vercel部署
- [x] 完整文档体系

### 开发中 🚧

- [ ] 欧洲市场报告
- [ ] 亚洲市场报告
- [ ] 案例展示页
- [ ] 联系表单后端

### 计划中 📋

- [ ] 博客系统
- [ ] 用户评论
- [ ] 搜索功能
- [ ] 新闻订阅
- [ ] 更多语言支持（法语、德语、日语）

---

## 许可证

© 2025 YECO. 保留所有权利。

本项目为专有软件，未经授权不得复制、分发或修改。

---

## 联系我们

- **官网**: https://yeco.design
- **邮箱**: contact@yeco.design
- **技术支持**: tech@yeco.design

---

## 致谢

感谢所有为本项目做出贡献的开发者和设计师！

特别感谢：
- 设计团队：精美的视觉设计
- 开发团队：卓越的技术实现
- 内容团队：深度的市场洞察

---

**Built with ❤️ by YECO Team**
