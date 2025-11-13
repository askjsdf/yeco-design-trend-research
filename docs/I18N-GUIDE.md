# YECO 多语言开发指南

## 目录
- [1. 概述](#1-概述)
- [2. i18n系统架构](#2-i18n系统架构)
- [3. 语言包结构](#3-语言包结构)
- [4. HTML标记规范](#4-html标记规范)
- [5. RTL支持](#5-rtl支持)
- [6. JavaScript API](#6-javascript-api)
- [7. 最佳实践](#7-最佳实践)
- [8. 常见问题](#8-常见问题)

---

## 1. 概述

YECO 多语言系统支持中文、英文和阿拉伯语三种语言，提供完整的 RTL（从右到左）布局支持。

### 支持的语言

| 语言代码 | 语言名称 | 方向 | 字体 |
|---------|---------|------|------|
| `zh-CN` | 简体中文 | LTR | Noto Serif SC |
| `en-US` | English | LTR | Playfair Display |
| `ar-SA` | العربية | RTL | Noto Naskh Arabic |

### 核心文件

```
/shared/i18n/
├── i18n-core.js       # i18n核心系统
├── rtl-handler.js     # RTL布局处理器

/pages/{page-name}/i18n/
├── zh-CN.js          # 中文翻译
├── en-US.js          # 英文翻译
└── ar-SA.js          # 阿拉伯语翻译
```

---

## 2. i18n系统架构

### 2.1 系统初始化

在每个页面的主脚本中初始化 i18n 系统：

```javascript
// script.js
document.addEventListener('DOMContentLoaded', async () => {
    // 注册所有语言包
    window.i18n.registerMultipleTranslations({
        'zh-CN': translations_zhCN,
        'en-US': translations_enUS,
        'ar-SA': translations_arSA
    });

    // 初始化i18n系统
    await window.i18n.init();

    console.log('页面初始化完成');
});
```

### 2.2 语言检测顺序

系统按以下优先级检测语言：

1. **localStorage** - 用户上次选择的语言
2. **URL参数** - `?lang=zh-CN`
3. **浏览器语言** - `navigator.language`
4. **默认语言** - `zh-CN`

```javascript
// 自动检测示例
const lang = i18n.detectLanguage();
// 可能返回: 'zh-CN', 'en-US', 'ar-SA'
```

### 2.3 语言切换

```javascript
// 切换到英文
await i18n.switchLanguage('en-US');

// 切换到阿拉伯语
await i18n.switchLanguage('ar-SA');

// 监听语言切换事件
document.addEventListener('languageChanged', (e) => {
    const { from, to, isRTL } = e.detail;
    console.log(`语言从 ${from} 切换到 ${to}`);
    console.log(`是否RTL: ${isRTL}`);
});
```

---

## 3. 语言包结构

### 3.1 标准结构

语言包使用嵌套对象结构，支持无限层级：

```javascript
// i18n/zh-CN.js
const translations_zhCN = {
    // 页面标题
    pageTitle: "YECO - 世界文化交融的香水包装设计专家",

    // 导航
    nav: {
        home: "首页",
        about: "关于我们",
        trends: "趋势研究",
        contact: "联系我们"
    },

    // 英雄区
    hero: {
        title: "世界文化的诗意容器",
        subtitle: "YECO",
        description: "我们不仅设计香水包装，更创造文化的对话空间",
        cta: "探索我们的趋势研究",
        scroll: "向下滚动探索"
    },

    // 品牌介绍
    brand: {
        title: "关于YECO",
        subtitle: "世界文化交融的设计哲学",
        intro: "YECO是一家面向世界的香水包装设计生产公司...",

        values: {
            title: "我们的核心价值观",
            items: [
                {
                    title: "世界文化交融",
                    desc: "我们深信多元文化的力量..."
                },
                {
                    title: "热爱 · 尊重 · 理解",
                    desc: "我们热爱世界各地的文化..."
                }
            ]
        }
    }
};
```

### 3.2 数组数据处理

对于列表数据，使用数组：

```javascript
// 正确的数组结构
services: {
    items: [
        {
            title: "包装设计",
            desc: "从概念到落地的全流程设计服务"
        },
        {
            title: "生产制造",
            desc: "高标准的生产工艺和严格品控"
        }
    ]
}
```

HTML 中访问：

```html
<!-- 使用索引访问数组元素 -->
<h4 data-i18n="services.items.0.title">包装设计</h4>
<p data-i18n="services.items.0.desc">从概念到落地的全流程设计服务</p>
```

### 3.3 命名规范

- 使用 **camelCase** 命名
- 层级不超过 4 层
- 使用语义化的键名
- 避免使用数字作为键名（数组除外）

```javascript
// ✅ 推荐
hero: {
    title: "标题",
    cta: "行动号召"
}

// ❌ 不推荐
hero_title: "标题",
hero_cta: "行动号召"
```

---

## 4. HTML标记规范

### 4.1 文本内容翻译

使用 `data-i18n` 属性标记需要翻译的文本：

```html
<!-- 简单文本 -->
<h1 data-i18n="hero.title">世界文化的诗意容器</h1>
<p data-i18n="hero.description">我们不仅设计香水包装...</p>

<!-- 嵌套路径 -->
<span data-i18n="nav.home">首页</span>
<span data-i18n="brand.values.title">我们的核心价值观</span>

<!-- 数组索引 -->
<h4 data-i18n="services.items.0.title">包装设计</h4>
```

### 4.2 HTML内容翻译

包含 HTML 标签的内容使用 `data-i18n-html`：

```html
<!-- 包含 <strong>, <em> 等标签 -->
<p data-i18n-html="hero.richDescription"></p>

<!-- 语言包中 -->
const translations = {
    hero: {
        richDescription: "我们热爱<strong>世界各地的文化</strong>，擅长用当地文化进行设计故事的<em>挖掘和呈现</em>。"
    }
};
```

### 4.3 属性翻译

#### 占位符

```html
<input
    type="text"
    data-i18n-placeholder="form.namePlaceholder"
    placeholder="请输入您的姓名"
>
```

#### 标题属性

```html
<button
    data-i18n-title="button.submitTooltip"
    title="点击提交表单"
>
    提交
</button>
```

#### aria-label（无障碍）

```html
<button
    data-i18n-aria="button.closeLabel"
    aria-label="关闭对话框"
>
    ×
</button>
```

### 4.4 保持原样的内容

某些内容不应翻译（如邮箱、URL、代码），使用 `data-ltr` 属性：

```html
<!-- 邮箱地址 -->
<a href="mailto:contact@yeco.design" data-ltr>
    contact@yeco.design
</a>

<!-- URL -->
<span class="url" data-ltr>
    https://yeco.design
</span>

<!-- 代码 -->
<code data-ltr>
    const lang = 'zh-CN';
</code>
```

### 4.5 数字显示

数字在 RTL 中应保持 LTR 方向：

```html
<!-- 统计数字 -->
<div class="stat-number" data-number>
    250
</div>

<!-- 带单位的数字 -->
<div data-number-unit>
    <span class="number">100</span>
    <span class="unit" data-i18n="unit.ml">ml</span>
</div>
```

---

## 5. RTL支持

### 5.1 自动RTL切换

系统会自动处理 RTL 布局：

```javascript
// RTL语言列表（自动识别）
const rtlLanguages = ['ar', 'ar-SA', 'he', 'fa'];

// 切换到阿拉伯语时自动应用RTL
await i18n.switchLanguage('ar-SA');
// document.dir = 'rtl'
// document.body.classList.add('rtl')
```

### 5.2 CSS RTL适配

使用 CSS 逻辑属性实现自动镜像：

```css
/* ✅ 推荐：使用逻辑属性 */
.element {
    margin-inline-start: 1rem;  /* LTR时=margin-left, RTL时=margin-right */
    margin-inline-end: 2rem;    /* LTR时=margin-right, RTL时=margin-left */
    padding-inline: 1rem;       /* 左右内边距 */
}

/* ✅ 推荐：使用属性选择器 */
[dir="rtl"] .language-switcher {
    left: var(--spacing-md);
    right: auto;
}

/* ❌ 不推荐：硬编码left/right */
.element {
    margin-left: 1rem;
    margin-right: 2rem;
}
```

### 5.3 需要镜像的元素

```css
/* 箭头、图标等需要镜像 */
[dir="rtl"] .arrow-right {
    transform: scaleX(-1);
}

/* 进度条从右到左 */
[dir="rtl"] .progress-bar {
    transform-origin: right;
}
```

### 5.4 不需要镜像的元素

```css
/* 数字、图片、logo等不镜像 */
.number,
.logo,
[data-ltr] {
    direction: ltr;
}

/* 图表不镜像 */
[data-chart] {
    direction: ltr;
}
```

### 5.5 RTL样式文件

全局 RTL 样式定义在 `/assets/styles/rtl.css`：

```css
/* 固定定位元素的RTL适配 */
[dir="rtl"] .language-switcher {
    left: var(--spacing-md);
    right: auto;
}

[dir="rtl"] .back-to-top {
    left: var(--spacing-md);
    right: auto;
}

/* 文本对齐 */
[dir="rtl"] .text-left {
    text-align: right;
}

[dir="rtl"] .text-right {
    text-align: left;
}
```

### 5.6 动画方向

```css
/* 滑动动画的RTL适配 */
@keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

[dir="rtl"] .slide-in-left {
    animation: slideInRight var(--transition-base);
}

@keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}
```

---

## 6. JavaScript API

### 6.1 I18nManager API

```javascript
// 获取当前语言
const currentLang = i18n.getCurrentLanguage();
// 返回: 'zh-CN', 'en-US', 'ar-SA'

// 检查是否为RTL语言
const isRTL = i18n.isRTL();
// 返回: true/false

// 获取翻译文本
const text = i18n.t('hero.title');
// 返回: "世界文化的诗意容器"

// 获取指定语言的翻译
const enText = i18n.t('hero.title', 'en-US');
// 返回: "Poetic Vessels of World Cultures"

// 注册新的翻译
i18n.registerTranslations('zh-CN', {
    newSection: {
        title: "新章节"
    }
});

// 批量注册
i18n.registerMultipleTranslations({
    'zh-CN': { /* ... */ },
    'en-US': { /* ... */ }
});

// 动态加载语言包
await i18n.loadLanguagePack('zh-CN', '/path/to/zh-CN.json');
```

### 6.2 事件监听

```javascript
// 监听语言切换事件
document.addEventListener('languageChanged', (e) => {
    const { from, to, isRTL } = e.detail;

    console.log(`从 ${from} 切换到 ${to}`);

    if (isRTL) {
        // 执行RTL特定逻辑
        console.log('已切换到RTL语言');
    }
});

// 使用 i18n 内部监听器
i18n.on('languageChanged', (data) => {
    console.log('语言已更改:', data);
});

// 移除监听器
const callback = (data) => { /* ... */ };
i18n.on('languageChanged', callback);
i18n.off('languageChanged', callback);
```

### 6.3 RTLHandler API

```javascript
// 判断是否为RTL语言
const isRTL = rtlHandler.isRTLLanguage('ar-SA');
// 返回: true

// 手动应用RTL
rtlHandler.applyRTL('ar-SA');

// 移除RTL
rtlHandler.removeLTR();

// 获取RTL调整后的值
const value = rtlHandler.getRTLValue('left', 'right');
// RTL时返回 'right', LTR时返回 'left'

// 镜像翻转元素
const arrow = document.querySelector('.arrow');
rtlHandler.mirrorElement(arrow);

// 取消镜像
rtlHandler.unMirrorElement(arrow);

// 强制重新布局（某些情况需要）
rtlHandler.forceReflow();
```

---

## 7. 最佳实践

### 7.1 翻译文本编写

#### 长度考虑

不同语言的文本长度差异很大：

```javascript
// 英文通常比中文长
{
    button: "联系我们"  // 4个字
    button: "Contact Us"  // 10个字母
}

// 阿拉伯语可能更长
{
    button: "اتصل بنا"  // 8个字符
}
```

**建议**：
- 使用灵活布局（flex, grid）
- 避免固定宽度
- 为按钮留出足够空间

```css
/* ✅ 推荐 */
.btn {
    padding: 0.5rem 2rem;  /* 左右留出足够空间 */
    min-width: 120px;
    white-space: nowrap;   /* 防止换行 */
}

/* ❌ 不推荐 */
.btn {
    width: 100px;  /* 固定宽度可能导致文字溢出 */
}
```

#### 避免字符串拼接

```javascript
// ❌ 不推荐
const text = `欢迎，${userName}！`;

// ✅ 推荐：使用模板
welcome: "欢迎，{name}！",

// JavaScript中替换
let text = i18n.t('welcome');
text = text.replace('{name}', userName);
```

#### 复数处理

```javascript
// 中文不需要复数
items: "{count} 个项目",

// 英文需要复数
items: {
    one: "{count} item",
    other: "{count} items"
}

// JavaScript中处理
const count = 5;
const key = count === 1 ? 'items.one' : 'items.other';
let text = i18n.t(key).replace('{count}', count);
```

### 7.2 图片与媒体

#### 包含文字的图片

```html
<!-- 使用不同语言的图片 -->
<img
    src="images/hero-zh.png"
    data-i18n-src-en="images/hero-en.png"
    data-i18n-src-ar="images/hero-ar.png"
    alt="Hero Image"
>

<script>
document.addEventListener('languageChanged', (e) => {
    const { to } = e.detail;
    const img = document.querySelector('[data-i18n-src-en]');

    if (to === 'en-US') {
        img.src = img.dataset.i18nSrcEn;
    } else if (to === 'ar-SA') {
        img.src = img.dataset.i18nSrcAr;
    }
});
</script>
```

#### SVG图标方向

```html
<!-- 箭头等方向性图标需要镜像 -->
<svg class="icon-arrow" data-rtl-mirror>
    <use href="#arrow-right"></use>
</svg>

<style>
[dir="rtl"] [data-rtl-mirror] {
    transform: scaleX(-1);
}
</style>
```

### 7.3 日期与时间

```javascript
// 使用 Intl.DateTimeFormat 自动本地化
const date = new Date();
const formatter = new Intl.DateTimeFormat(i18n.getCurrentLanguage(), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

console.log(formatter.format(date));
// zh-CN: 2025年11月12日
// en-US: November 12, 2025
// ar-SA: ١٢ نوفمبر ٢٠٢٤
```

### 7.4 数字格式

```javascript
// 使用 Intl.NumberFormat
const number = 12345.67;
const formatter = new Intl.NumberFormat(i18n.getCurrentLanguage(), {
    style: 'currency',
    currency: 'USD'
});

console.log(formatter.format(number));
// zh-CN: US$12,345.67
// en-US: $12,345.67
// ar-SA: US$ ١٢٬٣٤٥٫٦٧
```

### 7.5 性能优化

#### 懒加载语言包

```javascript
// 只加载当前需要的语言
async function loadLanguagePack(lang) {
    if (!i18n.translations[lang]) {
        const response = await fetch(`/i18n/${lang}.json`);
        const data = await response.json();
        i18n.registerTranslations(lang, data);
    }
}

// 切换语言时加载
document.querySelector('[data-lang="en-US"]').addEventListener('click', async () => {
    await loadLanguagePack('en-US');
    await i18n.switchLanguage('en-US');
});
```

#### 避免重复翻译

```javascript
// ❌ 不推荐：每次切换都重新翻译所有元素
document.querySelectorAll('[data-i18n]').forEach(/* ... */);

// ✅ 推荐：i18n系统自动处理
await i18n.switchLanguage('en-US');
```

---

## 8. 常见问题

### Q1: 如何添加新语言？

```javascript
// 1. 在 i18n-core.js 添加语言支持
supportedLanguages: ['zh-CN', 'en-US', 'ar-SA', 'fr-FR'],

// 2. 如果是RTL语言，添加到RTL列表
rtlLanguages: ['ar', 'ar-SA', 'he', 'fa'],

// 3. 创建语言包文件
// /pages/{page}/i18n/fr-FR.js
const translations_frFR = {
    pageTitle: "YECO - Expert en conception d'emballages de parfums",
    // ...
};

// 4. 在HTML中添加语言选项
<div class="lang-tab" data-lang="fr-FR">
    <span class="lang-icon">🇫🇷</span>
    <span class="lang-text">Français</span>
</div>

// 5. 注册语言包
i18n.registerTranslations('fr-FR', translations_frFR);
```

### Q2: 翻译键找不到怎么办？

系统会在控制台显示警告：

```
⚠️ 翻译键未找到: hero.missingKey
```

**解决方法**：
1. 检查语言包中是否存在该键
2. 检查路径是否正确（注意大小写）
3. 确保语言包已正确注册

### Q3: RTL布局错乱怎么办？

**常见原因**：
1. 使用了固定的 `left/right` 而非逻辑属性
2. 元素没有正确镜像
3. CSS 优先级问题

**解决方法**：
```css
/* 检查是否使用了逻辑属性 */
.element {
    /* ❌ */
    margin-left: 1rem;

    /* ✅ */
    margin-inline-start: 1rem;
}

/* 确保RTL样式优先级足够 */
[dir="rtl"] .element {
    /* 使用 !important 如果必要 */
    left: 0 !important;
}
```

### Q4: 语言切换后页面没有更新？

**可能原因**：
1. 元素没有 `data-i18n` 属性
2. 语言包未正确注册
3. JavaScript 错误阻止了更新

**调试方法**：
```javascript
// 1. 检查当前语言
console.log(i18n.getCurrentLanguage());

// 2. 检查语言包
i18n.debug();

// 3. 检查元素标记
document.querySelectorAll('[data-i18n]').forEach(el => {
    console.log(el.getAttribute('data-i18n'));
});
```

### Q5: 如何处理动态内容的翻译？

```javascript
// 动态创建的元素
function createCard(data) {
    const card = document.createElement('div');
    card.innerHTML = `
        <h3 data-i18n="card.title">${data.title}</h3>
        <p data-i18n="card.desc">${data.desc}</p>
    `;

    // 手动应用翻译
    const currentLang = i18n.getCurrentLanguage();
    const title = card.querySelector('[data-i18n="card.title"]');
    const desc = card.querySelector('[data-i18n="card.desc"]');

    title.textContent = i18n.t('card.title');
    desc.textContent = i18n.t('card.desc');

    return card;
}
```

---

## 附录：完整示例

### 完整的页面设置

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-i18n="pageTitle">YECO - 世界文化交融的香水包装设计专家</title>

    <!-- 样式 -->
    <link rel="stylesheet" href="/assets/styles/variables.css">
    <link rel="stylesheet" href="/assets/styles/typography.css">
    <link rel="stylesheet" href="/assets/styles/rtl.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 语言切换器 -->
    <div class="language-switcher">
        <div class="lang-tab active" data-lang="zh-CN">
            <span class="lang-icon">🇨🇳</span>
            <span class="lang-text">中文</span>
        </div>
        <div class="lang-tab" data-lang="en-US">
            <span class="lang-icon">🇬🇧</span>
            <span class="lang-text">English</span>
        </div>
        <div class="lang-tab" data-lang="ar-SA">
            <span class="lang-icon">🇸🇦</span>
            <span class="lang-text">العربية</span>
        </div>
    </div>

    <!-- 内容 -->
    <h1 data-i18n="hero.title">世界文化的诗意容器</h1>
    <p data-i18n="hero.description">我们不仅设计香水包装...</p>

    <!-- 脚本 -->
    <script src="/shared/i18n/i18n-core.js"></script>
    <script src="/shared/i18n/rtl-handler.js"></script>
    <script src="i18n/zh-CN.js"></script>
    <script src="i18n/en-US.js"></script>
    <script src="i18n/ar-SA.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            // 注册语言包
            window.i18n.registerMultipleTranslations({
                'zh-CN': translations_zhCN,
                'en-US': translations_enUS,
                'ar-SA': translations_arSA
            });

            // 初始化
            await window.i18n.init();

            console.log('✅ 页面初始化完成');
        });
    </script>
</body>
</html>
```

---

## 更新日志

- **2025-11-12**: 初始版本创建
