# YECO 项目文档

欢迎使用 YECO 项目开发文档！本文档库包含完整的开发规范、部署指南和最佳实践。

## 文档列表

### 1. [设计系统文档 (DESIGN-SYSTEM.md)](./DESIGN-SYSTEM.md)

**用途**：定义 YECO 品牌的视觉设计规范

**包含内容**：
- 配色规范（黑金配色系统）
- 字体规范（中英阿三语字体）
- 间距规范（基于8px的间距系统）
- 组件规范（按钮、卡片、导航等）
- 统一元素要求（语言切换器、伊斯兰纹样背景等）
- 响应式设计指南
- 动画与过渡效果

**适用人群**：UI设计师、前端开发者

**何时使用**：
- 设计新页面或组件时
- 需要确认颜色、字体、间距时
- 实现响应式布局时
- 创建动画效果时

---

### 2. [多语言开发指南 (I18N-GUIDE.md)](./I18N-GUIDE.md)

**用途**：指导如何实现多语言功能（中文、英文、阿拉伯语）

**包含内容**：
- i18n系统架构和初始化
- 语言包结构和命名规范
- HTML标记方法（data-i18n, data-i18n-html等）
- RTL（从右到左）布局支持
- JavaScript API使用方法
- 最佳实践和常见问题

**适用人群**：前端开发者、内容编辑

**何时使用**：
- 创建新页面需要多语言支持时
- 添加新的翻译内容时
- 调试语言切换问题时
- 实现RTL布局时

---

### 3. [报告开发规范 (REPORT-TEMPLATE.md)](./REPORT-TEMPLATE.md)

**用途**：标准化趋势报告页面的开发流程

**包含内容**：
- 报告命名规范（目录、文件、图片）
- 标准文件结构
- HTML结构模板（封面、目录、章节等）
- CSS代码组织规范
- JavaScript开发规范
- 多语言实现方法
- 图片规范和优化
- 完整的测试清单

**适用人群**：内容开发者、前端开发者

**何时使用**：
- 创建新的趋势报告时
- 需要了解报告结构时
- 优化现有报告时
- 测试报告功能时

---

### 4. [部署指南 (DEPLOYMENT.md)](./DEPLOYMENT.md)

**用途**：指导如何将网站部署到生产环境

**包含内容**：
- Vercel部署步骤（Web界面和CLI）
- 域名配置（自定义域名、DNS设置）
- 环境配置
- 性能优化策略
- 监控与分析设置
- 常见问题解决
- 日常维护指南

**适用人群**：DevOps工程师、技术主管

**何时使用**：
- 首次部署网站时
- 配置自定义域名时
- 遇到部署问题时
- 优化网站性能时
- 设置监控告警时

---

## 快速开始

### 新开发者入职

按以下顺序阅读文档：

1. **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - 了解设计规范
2. **[I18N-GUIDE.md](./I18N-GUIDE.md)** - 学习多语言系统
3. **[REPORT-TEMPLATE.md](./REPORT-TEMPLATE.md)** - 熟悉报告开发流程
4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 掌握部署方法

### 常见任务

#### 创建新报告

1. 阅读 [REPORT-TEMPLATE.md](./REPORT-TEMPLATE.md)
2. 使用标准文件结构创建目录
3. 按照HTML模板编写页面
4. 创建三个语言包文件
5. 添加图片资源
6. 执行测试清单

#### 修改样式

1. 查阅 [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) 确认设计规范
2. 使用全局CSS变量
3. 确保响应式适配
4. 测试RTL布局

#### 添加翻译

1. 参考 [I18N-GUIDE.md](./I18N-GUIDE.md)
2. 在语言包中添加翻译键值
3. 在HTML中添加 `data-i18n` 属性
4. 测试三种语言的显示效果

#### 部署更新

1. 参考 [DEPLOYMENT.md](./DEPLOYMENT.md)
2. 提交代码到Git仓库
3. Vercel自动部署
4. 检查部署日志和性能指标

---

## 项目结构

```
/Volumes/SD2/yeco/
├── index.html                  # 网站入口（重定向到首页）
├── vercel.json                 # Vercel配置文件
├── docs/                       # 文档目录
│   ├── README.md              # 本文档
│   ├── DESIGN-SYSTEM.md       # 设计系统文档
│   ├── I18N-GUIDE.md          # 多语言开发指南
│   ├── REPORT-TEMPLATE.md     # 报告开发规范
│   └── DEPLOYMENT.md          # 部署指南
├── assets/                     # 全局资源
│   ├── styles/                # 全局样式
│   │   ├── variables.css      # CSS变量
│   │   ├── typography.css     # 字体样式
│   │   └── rtl.css           # RTL样式
│   ├── fonts/                 # 字体文件
│   └── images/                # 全局图片
├── shared/                     # 共享组件和脚本
│   ├── components/            # 可复用组件
│   │   └── LanguageSwitcher/  # 语言切换器
│   └── i18n/                  # i18n系统
│       ├── i18n-core.js       # 核心系统
│       └── rtl-handler.js     # RTL处理器
└── pages/                      # 页面目录
    ├── home/                  # 首页
    │   ├── index.html
    │   ├── style.css
    │   ├── script.js
    │   └── i18n/
    ├── trends/                # 趋势研究页
    └── reports/               # 报告目录
        └── 2024-10-middleeast/  # 中东报告
            ├── index.html
            ├── style.css
            ├── script.js
            ├── i18n/
            └── images/
```

---

## 核心技术

### 前端技术栈

- **HTML5** - 语义化标签
- **CSS3** - 变量、Grid、Flexbox
- **JavaScript (ES6+)** - 原生JS，无框架依赖

### 多语言系统

- **i18n-core.js** - 自研的轻量级i18n系统
- **rtl-handler.js** - RTL布局自动处理

### 部署平台

- **Vercel** - 全球CDN、自动HTTPS、零配置部署

---

## 开发规范

### 代码风格

- **HTML**: 使用2空格缩进，语义化标签
- **CSS**: 使用CSS变量，BEM命名法，移动优先
- **JavaScript**: ES6+语法，模块化，清晰注释

### 提交规范

```bash
# 格式
<type>: <subject>

# 类型
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试相关

# 示例
feat: 添加欧洲市场趋势报告
fix: 修复Safari下语言切换问题
docs: 更新部署指南
```

### 分支策略

```
main/master - 生产环境，自动部署
develop - 开发分支
feature/* - 功能分支
bugfix/* - 修复分支
```

---

## 测试清单

### 开发测试

- [ ] 功能正常（语言切换、链接跳转等）
- [ ] 多语言显示正确
- [ ] RTL布局无错乱
- [ ] 响应式适配（手机、平板、桌面）
- [ ] 无JavaScript错误
- [ ] 图片正常加载

### 浏览器兼容性

- [ ] Chrome（最新版）
- [ ] Firefox（最新版）
- [ ] Safari（最新版）
- [ ] Edge（最新版）
- [ ] 移动端Safari
- [ ] 移动端Chrome

### 性能测试

- [ ] Lighthouse分数 > 90
- [ ] 首屏加载时间 < 1.5秒
- [ ] 页面加载时间 < 3秒
- [ ] 图片已优化
- [ ] 无卡顿和闪烁

---

## 资源链接

### 设计资源

- **Figma设计稿**: [链接]
- **品牌指南**: [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
- **图标库**: [链接]

### 开发资源

- **GitHub仓库**: [链接]
- **Vercel Dashboard**: https://vercel.com/dashboard
- **开发文档**: 当前文档库

### 外部文档

- **Vercel文档**: https://vercel.com/docs
- **MDN Web Docs**: https://developer.mozilla.org
- **CSS Tricks**: https://css-tricks.com

---

## 联系方式

### 技术支持

- **邮箱**: tech@yeco.design
- **技术文档**: 本文档库

### 设计咨询

- **邮箱**: design@yeco.design

### 业务咨询

- **邮箱**: contact@yeco.design
- **网站**: https://yeco.design

---

## 更新日志

### 2024-11-12

- 创建完整的文档体系
- 添加设计系统文档
- 添加多语言开发指南
- 添加报告开发规范
- 添加部署指南
- 创建网站入口文件
- 配置Vercel部署

---

## 贡献指南

欢迎为文档做出贡献！

### 如何贡献

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/improve-docs`)
3. 提交更改 (`git commit -m 'docs: 改进多语言指南'`)
4. 推送到分支 (`git push origin feature/improve-docs`)
5. 创建 Pull Request

### 文档编写规范

- 使用 Markdown 格式
- 添加目录链接
- 包含代码示例
- 提供截图（如适用）
- 更新更新日志

---

## 许可证

© 2024 YECO. 保留所有权利。

---

**感谢您的阅读！如有任何问题，请查阅相关文档或联系技术团队。**
