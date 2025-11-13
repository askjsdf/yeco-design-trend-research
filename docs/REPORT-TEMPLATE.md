# YECO 报告开发规范

## 目录
- [1. 概述](#1-概述)
- [2. 命名规范](#2-命名规范)
- [3. 文件结构](#3-文件结构)
- [4. HTML结构规范](#4-html结构规范)
- [5. CSS规范](#5-css规范)
- [6. JavaScript规范](#6-javascript规范)
- [7. 多语言开发](#7-多语言开发)
- [8. 图片规范](#8-图片规范)
- [9. 测试清单](#9-测试清单)
- [10. 完整示例](#10-完整示例)

---

## 1. 概述

本文档定义了 YECO 趋势报告的开发规范，确保所有报告页面保持一致的质量和风格。

### 报告特点
- **长页面滚动式**：单页面包含所有内容
- **章节分明**：使用 section 清晰划分章节
- **视觉丰富**：大量图片和数据可视化
- **多语言支持**：中文、英文、阿拉伯语
- **高端设计**：黑金配色 + 伊斯兰纹样

---

## 2. 命名规范

### 2.1 报告目录命名

格式：`YYYY-MM-{region}`

```
/pages/reports/
├── 2025-10-middleeast/     # 2025年10月中东版
├── 2025-11-europe/          # 2025年11月欧洲版
├── 2025-01-asia/            # 2025年1月亚洲版
└── 2025-03-global/          # 2025年3月全球版
```

**命名规则**：
- 日期使用 `YYYY-MM` 格式
- 地区使用小写英文单词，多个单词用连字符
- 示例：`2025-10-middleeast`、`2025-11-northamerica`

### 2.2 图片命名

格式：`{序号}{描述}.{扩展名}`

```
images/
├── 01主视觉.png
├── 02核心洞察配图1网图.png
├── 03设计美学.png
├── 04.png
├── 05.png
└── ...
```

**命名规则**：
- 使用两位数字前缀（01-99）
- 中文描述，简洁明了
- 使用PNG格式（保证透明度和质量）
- 避免特殊字符和空格

### 2.3 CSS类命名

使用 BEM（Block Element Modifier）命名法：

```css
/* Block（块） */
.case-study { }

/* Element（元素） */
.case-study__header { }
.case-study__body { }
.case-study__image { }

/* Modifier（修饰符） */
.case-study--success { }
.case-study--failure { }
```

---

## 3. 文件结构

每个报告包含以下文件：

```
/pages/reports/2025-10-middleeast/
├── index.html              # 主HTML文件
├── style.css               # 页面样式
├── script.js               # 页面脚本
├── i18n/                   # 多语言文件夹
│   ├── zh-CN.js           # 中文翻译
│   ├── en-US.js           # 英文翻译
│   └── ar-SA.js           # 阿拉伯语翻译
├── images/                 # 图片资源
│   ├── 01主视觉.png
│   ├── 02核心洞察配图1网图.png
│   └── ...
└── README.md              # 报告说明文档（可选）
```

### 3.1 必须包含的文件

- `index.html` - 主页面
- `style.css` - 样式文件
- `script.js` - 脚本文件
- `i18n/` - 多语言文件夹（包含至少3个语言文件）
- `images/` - 图片文件夹

---

## 4. HTML结构规范

### 4.1 基础模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-i18n="pageTitle">报告标题 - YECO</title>

    <!-- SEO Meta -->
    <meta name="description" content="报告描述">
    <meta name="keywords" content="关键词1,关键词2,关键词3">

    <!-- 全局样式 -->
    <link rel="stylesheet" href="../../../assets/styles/variables.css">
    <link rel="stylesheet" href="../../../assets/styles/typography.css">
    <link rel="stylesheet" href="../../../assets/styles/rtl.css">

    <!-- 组件样式 -->
    <link rel="stylesheet" href="../../../shared/components/LanguageSwitcher/styles.css">

    <!-- 页面样式 -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 语言切换器 -->
    <div class="language-switcher">
        <div class="lang-tab active" data-lang="zh-CN">中文</div>
        <div class="lang-tab" data-lang="en-US">English</div>
        <div class="lang-tab" data-lang="ar-SA">العربية</div>
    </div>

    <!-- 伊斯兰纹样背景 -->
    <div class="islamic-pattern"></div>

    <!-- 报告内容 -->
    <!-- ... -->

    <!-- 页脚 -->
    <footer class="footer">
        <!-- ... -->
    </footer>

    <!-- 脚本 -->
    <script src="../../../shared/i18n/i18n-core.js"></script>
    <script src="../../../shared/i18n/rtl-handler.js"></script>
    <script src="i18n/zh-CN.js"></script>
    <script src="i18n/en-US.js"></script>
    <script src="i18n/ar-SA.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### 4.2 章节结构

每个报告由多个 `<section>` 组成：

```html
<!-- 1. 封面 -->
<section class="cover-page">
    <div class="cover-content">
        <div class="cover-logo" data-i18n="logo">YECO</div>
        <div class="cover-title" data-i18n="cover.title">报告标题</div>
        <div class="cover-subtitle" data-i18n="cover.subtitle">副标题</div>
        <div class="cover-issue">
            <span data-i18n="cover.issue">第01期</span>
            <span class="separator">|</span>
            <span data-i18n="cover.date">2025年10月</span>
        </div>
    </div>
</section>

<!-- 2. 目录 -->
<section class="table-of-contents">
    <div class="container">
        <h2 class="toc-title" data-i18n="toc.title">本期内容</h2>
        <div class="toc-grid">
            <div class="toc-item fade-in">
                <div class="toc-number">01</div>
                <div class="toc-content">
                    <h3 data-i18n="toc.items.0.title">执行摘要</h3>
                    <p data-i18n="toc.items.0.desc">核心洞察</p>
                </div>
            </div>
            <!-- 更多目录项 -->
        </div>
    </div>
</section>

<!-- 3. 正文章节 -->
<section class="section-name">
    <div class="container">
        <!-- 章节标题 -->
        <div class="section-header fade-in">
            <span class="section-number">01</span>
            <h2 class="section-title" data-i18n="section1.title">章节标题</h2>
            <div class="section-line"></div>
            <p class="section-subtitle" data-i18n="section1.subtitle">副标题</p>
        </div>

        <!-- 章节内容 -->
        <div class="section-content fade-in">
            <!-- ... -->
        </div>
    </div>
</section>

<!-- 4. 结语 -->
<section class="conclusion">
    <div class="container">
        <div class="conclusion-content fade-in">
            <blockquote data-i18n="conclusion.quote">
                核心结论...
            </blockquote>
        </div>
    </div>
</section>

<!-- 5. 页脚 -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-logo" data-i18n="footer.logo">YECO</div>
            <div class="footer-tagline" data-i18n="footer.tagline">
                致力于香水行业供应链创新与卓越
            </div>
            <div class="footer-divider"></div>
            <div class="footer-meta">
                <span data-i18n="footer.copyright">© 2025 YECO. 保留所有权利</span>
            </div>
        </div>
    </div>
</footer>
```

### 4.3 常用内容块

#### 特征块（Feature Block）

```html
<div class="feature-block fade-in">
    <div class="feature-image-large">
        <div class="image-placeholder">
            <img src="images/02核心洞察配图1网图.png" alt="核心洞察配图">
        </div>
    </div>
    <div class="feature-content">
        <h3 class="feature-title" data-i18n="feature.title">特征标题</h3>
        <p class="feature-text" data-i18n="feature.text">
            特征描述...
        </p>
    </div>
</div>
```

#### 数据卡片

```html
<div class="key-stats fade-in">
    <div class="stat-card">
        <div class="stat-icon" data-number>7</div>
        <div class="stat-label" data-i18n="stats.0.label">设计的"七宗罪"</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon" data-number>85%</div>
        <div class="stat-label" data-i18n="stats.1.label">消费者认可度</div>
    </div>
</div>
```

#### 案例研究

```html
<div class="case-study success fade-in">
    <div class="case-header">
        <div class="case-title-group">
            <h3 data-i18n="case.title">案例标题</h3>
            <span class="case-subtitle" data-i18n="case.subtitle">副标题</span>
        </div>
        <span class="verdict-badge positive" data-i18n="case.verdict">成功案例</span>
    </div>

    <div class="case-body">
        <div class="case-image-group">
            <div class="case-main-image">
                <img src="images/11.png" alt="案例图片">
            </div>
        </div>

        <div class="case-content">
            <div class="case-section">
                <h4 data-i18n="case.section1.title">分析标题</h4>
                <p data-i18n="case.section1.desc">分析内容...</p>
            </div>

            <blockquote class="case-quote" data-i18n="case.quote">
                核心观点...
            </blockquote>
        </div>
    </div>
</div>
```

### 4.4 图片容器

统一使用 `.image-placeholder` 包裹图片：

```html
<div class="image-placeholder">
    <img src="images/01主视觉.png" alt="描述">
</div>

<div class="image-placeholder small">
    <img src="images/02.png" alt="描述">
</div>

<div class="image-placeholder large">
    <img src="images/03.png" alt="描述">
</div>
```

---

## 5. CSS规范

### 5.1 文件组织

```css
/* ==========================================
   报告名称 - 样式
   描述信息
   ========================================== */

/* 1. 基础样式重置 */
/* 2. 封面样式 */
/* 3. 目录样式 */
/* 4. 章节样式 */
/* 5. 组件样式 */
/* 6. 响应式样式 */
/* 7. RTL适配 */
```

### 5.2 变量使用

优先使用全局变量：

```css
/* ✅ 推荐 */
.section {
    background-color: var(--primary-black);
    color: var(--white);
    padding: var(--spacing-xl) 0;
}

/* ❌ 不推荐 */
.section {
    background-color: #000000;
    color: #FFFFFF;
    padding: 96px 0;
}
```

### 5.3 响应式设计

使用移动优先策略：

```css
/* 移动端默认样式 */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
}

/* 平板 */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 桌面 */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
    }
}
```

### 5.4 动画与过渡

```css
/* 淡入动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
}

/* 悬停效果 */
.card {
    transition: all var(--transition-base);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-gold);
}
```

### 5.5 RTL适配

```css
/* 使用逻辑属性 */
.element {
    margin-inline-start: 1rem;
    padding-inline: 2rem;
}

/* RTL特定样式 */
[dir="rtl"] .language-switcher {
    left: var(--spacing-md);
    right: auto;
}

[dir="rtl"] .arrow-icon {
    transform: scaleX(-1);
}
```

---

## 6. JavaScript规范

### 6.1 基础结构

```javascript
/* ==========================================
   报告名称 - 脚本
   ========================================== */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 初始化报告页面...');

    // 1. 注册语言包
    registerTranslations();

    // 2. 初始化i18n系统
    await initI18n();

    // 3. 初始化滚动动画
    initScrollAnimations();

    // 4. 初始化交互功能
    initInteractions();

    console.log('✅ 报告页面初始化完成');
});

/* ==========================================
   注册语言包
   ========================================== */
function registerTranslations() {
    window.i18n.registerMultipleTranslations({
        'zh-CN': translations_zhCN,
        'en-US': translations_enUS,
        'ar-SA': translations_arSA
    });
}

/* ==========================================
   初始化i18n系统
   ========================================== */
async function initI18n() {
    await window.i18n.init();
    console.log('🌍 i18n系统已初始化');
}

/* ==========================================
   初始化滚动动画
   ========================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    console.log('📜 滚动动画已初始化');
}

/* ==========================================
   初始化交互功能
   ========================================== */
function initInteractions() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🖱️ 交互功能已初始化');
}
```

### 6.2 代码规范

- 使用 ES6+ 语法
- 函数使用清晰的命名
- 添加注释分隔符
- 使用 `console.log` 输出关键步骤
- 避免全局变量污染

---

## 7. 多语言开发

### 7.1 语言包结构

```javascript
// i18n/zh-CN.js
const translations_zhCN = {
    // 页面标题
    pageTitle: "香水行业趋势月刊 - 中东版 - YECO",

    // 封面
    cover: {
        logo: "YECO",
        title: "香水行业趋势月刊",
        subtitle: "解码香水消费者的灵魂",
        issue: "第01期",
        date: "2025年10月",
        region: "中东版"
    },

    // 目录
    toc: {
        title: "本期内容",
        items: [
            {
                title: "执行摘要",
                desc: "香水作为"图腾物件"的市场转变"
            },
            {
                title: "设计美学分析",
                desc: "渴望的形态与美学的战场"
            }
        ]
    },

    // 章节内容
    section1: {
        number: "01",
        title: "执行摘要",
        subtitle: "核心洞察",
        content: {
            // ...
        }
    }
};
```

### 7.2 HTML标记

```html
<!-- 简单文本 -->
<h2 data-i18n="section1.title">执行摘要</h2>

<!-- 数组元素 -->
<h3 data-i18n="toc.items.0.title">执行摘要</h3>
<p data-i18n="toc.items.0.desc">核心洞察</p>

<!-- HTML内容 -->
<p data-i18n-html="section1.richContent"></p>
```

---

## 8. 图片规范

### 8.1 图片格式

| 类型 | 格式 | 说明 |
|------|------|------|
| 照片 | JPG | 压缩质量 85-90% |
| 插图/图表 | PNG | 保留透明度 |
| Logo/图标 | SVG | 矢量格式 |
| 动画 | GIF/WebP | 优先使用 WebP |

### 8.2 图片尺寸

```
封面主视觉：1920 x 1080 px
章节配图：1200 x 800 px
案例图片：800 x 600 px
小图/细节：400 x 300 px
```

### 8.3 图片优化

```bash
# 使用 ImageOptim 或类似工具压缩
# 目标：减小文件大小 30-50%，不损失明显质量

# PNG 压缩
pngquant --quality=80-90 input.png -o output.png

# JPG 压缩
convert input.jpg -quality 85 output.jpg
```

### 8.4 响应式图片

```html
<!-- 使用 srcset 提供多尺寸 -->
<img
    src="images/hero-800.jpg"
    srcset="
        images/hero-400.jpg 400w,
        images/hero-800.jpg 800w,
        images/hero-1200.jpg 1200w,
        images/hero-1920.jpg 1920w
    "
    sizes="(max-width: 768px) 100vw, 80vw"
    alt="Hero Image"
>
```

### 8.5 懒加载

```html
<!-- 使用 loading="lazy" -->
<img
    src="images/image.png"
    alt="描述"
    loading="lazy"
>
```

---

## 9. 测试清单

### 9.1 功能测试

- [ ] 语言切换正常工作（中文、英文、阿拉伯语）
- [ ] 所有 `data-i18n` 标记的元素正确翻译
- [ ] 滚动动画正常触发
- [ ] 所有链接可点击且指向正确
- [ ] 图片正确加载
- [ ] 无 JavaScript 错误（检查控制台）

### 9.2 多语言测试

- [ ] 中文显示正常，无乱码
- [ ] 英文显示正常，无截断
- [ ] 阿拉伯语显示正常，RTL布局正确
- [ ] 数字在 RTL 中保持 LTR 方向
- [ ] 邮箱、URL 在 RTL 中保持 LTR 方向

### 9.3 RTL测试

- [ ] 语言切换器位置正确（RTL时在左侧）
- [ ] 导航菜单镜像正确
- [ ] 文本对齐正确（RTL时右对齐）
- [ ] 图标方向正确（箭头等需镜像）
- [ ] 布局无错乱
- [ ] 滚动条位置正确

### 9.4 响应式测试

测试设备尺寸：

- [ ] 手机竖屏（375px）
- [ ] 手机横屏（667px）
- [ ] 平板（768px）
- [ ] 小笔记本（1024px）
- [ ] 桌面（1440px）
- [ ] 大屏（1920px+）

测试要点：

- [ ] 字体大小适配
- [ ] 间距适配
- [ ] 栅格布局适配（多列变单列）
- [ ] 图片缩放正确
- [ ] 按钮可点击（最小44px）
- [ ] 无横向滚动条

### 9.5 性能测试

- [ ] 页面加载时间 < 3秒
- [ ] 首屏加载时间 < 1.5秒
- [ ] 图片懒加载工作正常
- [ ] 无卡顿和闪烁
- [ ] Lighthouse 性能分数 > 90

### 9.6 浏览器测试

- [ ] Chrome（最新版）
- [ ] Firefox（最新版）
- [ ] Safari（最新版）
- [ ] Edge（最新版）
- [ ] 移动端 Safari（iOS）
- [ ] 移动端 Chrome（Android）

### 9.7 SEO测试

- [ ] `<title>` 标签正确
- [ ] `<meta description>` 存在
- [ ] `<meta keywords>` 存在
- [ ] 所有图片有 `alt` 属性
- [ ] 标题层级正确（h1 > h2 > h3）
- [ ] 无重复 h1 标签

### 9.8 无障碍测试

- [ ] 键盘导航正常
- [ ] 焦点指示器清晰
- [ ] 所有按钮有 `aria-label`
- [ ] 颜色对比度符合 WCAG AA 标准
- [ ] 屏幕阅读器友好

---

## 10. 完整示例

### 示例：创建一个新报告

**步骤 1：创建目录结构**

```bash
cd /pages/reports/
mkdir 2025-11-europe
cd 2025-11-europe

mkdir i18n
mkdir images

touch index.html
touch style.css
touch script.js
touch i18n/zh-CN.js
touch i18n/en-US.js
touch i18n/ar-SA.js
```

**步骤 2：编写 HTML（index.html）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-i18n="pageTitle">欧洲香水趋势报告 - YECO</title>

    <link rel="stylesheet" href="../../../assets/styles/variables.css">
    <link rel="stylesheet" href="../../../assets/styles/typography.css">
    <link rel="stylesheet" href="../../../assets/styles/rtl.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 语言切换器 -->
    <div class="language-switcher">
        <div class="lang-tab active" data-lang="zh-CN">中文</div>
        <div class="lang-tab" data-lang="en-US">English</div>
        <div class="lang-tab" data-lang="ar-SA">العربية</div>
    </div>

    <!-- 伊斯兰纹样背景 -->
    <div class="islamic-pattern"></div>

    <!-- 封面 -->
    <section class="cover-page">
        <div class="cover-content">
            <div class="cover-logo" data-i18n="logo">YECO</div>
            <div class="cover-title" data-i18n="cover.title">欧洲香水趋势报告</div>
            <div class="cover-subtitle" data-i18n="cover.subtitle">2025年11月</div>
        </div>
    </section>

    <!-- 更多内容... -->

    <!-- 页脚 -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">YECO</div>
                <div class="footer-meta">
                    <span>© 2025 YECO. 保留所有权利</span>
                </div>
            </div>
        </div>
    </footer>

    <script src="../../../shared/i18n/i18n-core.js"></script>
    <script src="../../../shared/i18n/rtl-handler.js"></script>
    <script src="i18n/zh-CN.js"></script>
    <script src="i18n/en-US.js"></script>
    <script src="i18n/ar-SA.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

**步骤 3：编写样式（style.css）**

```css
/* ==========================================
   欧洲香水趋势报告 - 样式
   ========================================== */

/* 基础重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-body);
    background-color: var(--primary-black);
    color: var(--white);
    line-height: 1.6;
}

/* 封面样式 */
.cover-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--spacing-xl);
}

.cover-logo {
    font-family: var(--font-decorative);
    font-size: 3rem;
    color: var(--accent-gold);
    margin-bottom: var(--spacing-md);
}

.cover-title {
    font-size: var(--font-size-h1);
    color: var(--accent-gold);
    margin-bottom: var(--spacing-sm);
}

/* 响应式 */
@media (max-width: 768px) {
    .cover-title {
        font-size: var(--font-size-h1-mobile);
    }
}

/* RTL适配 */
[dir="rtl"] .cover-content {
    direction: rtl;
}
```

**步骤 4：编写脚本（script.js）**

```javascript
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 初始化欧洲报告页面...');

    // 注册语言包
    window.i18n.registerMultipleTranslations({
        'zh-CN': translations_zhCN,
        'en-US': translations_enUS,
        'ar-SA': translations_arSA
    });

    // 初始化i18n
    await window.i18n.init();

    console.log('✅ 页面初始化完成');
});
```

**步骤 5：编写语言包（i18n/zh-CN.js）**

```javascript
const translations_zhCN = {
    pageTitle: "欧洲香水趋势报告 - YECO",
    logo: "YECO",
    cover: {
        title: "欧洲香水趋势报告",
        subtitle: "2025年11月"
    }
};
```

**步骤 6：测试**

1. 在浏览器中打开 `index.html`
2. 测试语言切换
3. 测试 RTL 布局
4. 测试响应式
5. 检查控制台无错误

---

## 附录：常用代码片段

### 章节标题

```html
<div class="section-header fade-in">
    <span class="section-number">01</span>
    <h2 class="section-title" data-i18n="section.title">章节标题</h2>
    <div class="section-line"></div>
</div>
```

### 两栏布局

```html
<div class="two-column-layout">
    <div class="column-image">
        <img src="images/01.png" alt="图片">
    </div>
    <div class="column-content">
        <h3>内容标题</h3>
        <p>内容描述...</p>
    </div>
</div>
```

### 引用块

```html
<blockquote class="case-quote">
    这是一段引用文字...
</blockquote>
```

---

## 更新日志

- **2025-11-12**: 初始版本创建
