# YECO 设计系统文档

## 目录
- [1. 概述](#1-概述)
- [2. 配色规范](#2-配色规范)
- [3. 字体规范](#3-字体规范)
- [4. 间距规范](#4-间距规范)
- [5. 组件规范](#5-组件规范)
- [6. 统一元素要求](#6-统一元素要求)
- [7. 响应式设计](#7-响应式设计)
- [8. 动画与过渡](#8-动画与过渡)

---

## 1. 概述

YECO 设计系统以高端奢华的黑金配色为基础，融合中东文化元素（伊斯兰纹样），创造独特的视觉体验。本文档定义了所有设计规范，确保跨页面的一致性。

### 设计原则
- **优雅奢华**：黑金配色营造高端感
- **文化融合**：融入中东伊斯兰纹样元素
- **现代简约**：避免过度装饰，保持现代感
- **多语言友好**：支持中文、英文、阿拉伯语等多语言
- **响应式优先**：移动端优先，适配各种设备

---

## 2. 配色规范

### 2.1 主色调

所有颜色定义在 `/assets/styles/variables.css` 中：

```css
/* 主色 - 黑色系 */
--primary-black: #000000;      /* 主背景色 */
--secondary-black: #111111;    /* 次要背景色 */
--tertiary-black: #1a1a1a;     /* 三级背景色 */

/* 强调色 - 金色系 */
--accent-gold: #D4AF37;        /* 主金色 */
--accent-gold-light: #E5C158; /* 浅金色 */
--accent-gold-dark: #B8941F;  /* 深金色 */

/* 中性色 */
--white: #FFFFFF;              /* 纯白 */
--gray-light: #CCCCCC;         /* 浅灰 */
--gray-medium: #999999;        /* 中灰 */
--gray-dark: #666666;          /* 深灰 */
```

### 2.2 语义化颜色

```css
/* 状态颜色 */
--success-green: #10b981;      /* 成功 */
--warning-yellow: #f59e0b;     /* 警告 */
--error-red: #ef4444;          /* 错误 */
--info-blue: #3b82f6;          /* 信息 */
```

### 2.3 透明度变体

```css
/* 半透明金色 */
rgba(212, 175, 55, 0.1)  /* 10% - 背景装饰 */
rgba(212, 175, 55, 0.2)  /* 20% - 边框 */
rgba(212, 175, 55, 0.5)  /* 50% - 悬停效果 */

/* 半透明黑色 */
rgba(0, 0, 0, 0.5)       /* 50% - 遮罩 */
rgba(0, 0, 0, 0.8)       /* 80% - 卡片背景 */
```

### 2.4 渐变色

```css
/* 金色渐变 */
--gradient-gold: linear-gradient(
    135deg,
    var(--accent-gold) 0%,
    var(--accent-gold-light) 100%
);

/* 黑金渐变 */
--gradient-black-gold: linear-gradient(
    180deg,
    var(--primary-black) 0%,
    var(--secondary-black) 100%
);
```

### 2.5 使用指南

| 元素类型 | 推荐颜色 | 示例 |
|---------|---------|------|
| 主背景 | `--primary-black` | body 背景 |
| 卡片背景 | `rgba(0, 0, 0, 0.8)` | .card |
| 主标题 | `--accent-gold` | h1, h2 |
| 正文 | `--white` | p, span |
| 次要文本 | `--gray-light` | 描述文字 |
| 链接 | `--accent-gold` | a |
| 按钮主色 | `--accent-gold` | .btn-primary |
| 按钮次色 | `transparent` + 金色边框 | .btn-secondary |
| 边框 | `rgba(212, 175, 55, 0.2)` | border |
| 分割线 | `rgba(212, 175, 55, 0.3)` | hr |

---

## 3. 字体规范

### 3.1 字体栈

```css
/* 中文字体 */
--font-chinese: 'Noto Serif SC', 'Source Han Serif SC', serif;

/* 英文字体 */
--font-english: 'Playfair Display', 'Georgia', serif;

/* 阿拉伯语字体 */
--font-arabic: 'Noto Naskh Arabic', 'Arabic Typesetting', serif;

/* 正文字体（通用） */
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Microsoft YaHei', sans-serif;

/* 装饰字体 */
--font-decorative: 'Cinzel', 'Trajan Pro', serif;
```

### 3.2 字体大小

```css
/* 桌面端 */
--font-size-h1: 4rem;          /* 64px */
--font-size-h2: 3rem;          /* 48px */
--font-size-h3: 2.25rem;       /* 36px */
--font-size-h4: 1.5rem;        /* 24px */
--font-size-body: 1rem;        /* 16px */
--font-size-small: 0.875rem;   /* 14px */

/* 移动端 */
--font-size-h1-mobile: 2.5rem; /* 40px */
--font-size-h2-mobile: 2rem;   /* 32px */
--font-size-h3-mobile: 1.5rem; /* 24px */
--font-size-h4-mobile: 1.25rem;/* 20px */
```

### 3.3 字体粗细

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 3.4 行高

```css
--line-height-tight: 1.2;      /* 标题 */
--line-height-normal: 1.6;     /* 正文 */
--line-height-relaxed: 1.8;    /* 长文本 */
```

### 3.5 字距

```css
--letter-spacing-tight: -0.02em;   /* 大标题 */
--letter-spacing-normal: 0;        /* 正文 */
--letter-spacing-wide: 0.05em;     /* 装饰文字 */
```

### 3.6 使用示例

```css
/* 主标题 */
h1 {
    font-family: var(--font-decorative);
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-tight);
    color: var(--accent-gold);
}

/* 正文 */
p {
    font-family: var(--font-body);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-normal);
    color: var(--white);
}
```

---

## 4. 间距规范

### 4.1 间距尺度

采用 8px 基准的间距系统：

```css
--spacing-xs: 0.5rem;    /* 8px */
--spacing-sm: 1rem;      /* 16px */
--spacing-md: 2rem;      /* 32px */
--spacing-lg: 4rem;      /* 64px */
--spacing-xl: 6rem;      /* 96px */
--spacing-2xl: 8rem;     /* 128px */
```

### 4.2 应用场景

| 场景 | 推荐间距 | 说明 |
|------|---------|------|
| 按钮内边距 | `--spacing-sm` `--spacing-md` | 上下 16px, 左右 32px |
| 卡片内边距 | `--spacing-md` | 32px |
| 区块间距 | `--spacing-xl` | 96px |
| 行间距 | `--spacing-sm` | 16px |
| 栅格间隙 | `--spacing-md` | 32px |

### 4.3 布局容器

```css
/* 最大宽度 */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### 4.4 示例代码

```css
/* Section 间距 */
section {
    padding: var(--spacing-xl) 0;
}

/* 卡片间距 */
.card {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

/* 栅格布局 */
.grid {
    display: grid;
    gap: var(--spacing-md);
}
```

---

## 5. 组件规范

### 5.1 按钮 (Buttons)

#### 主按钮

```css
.btn-primary {
    background: var(--accent-gold);
    color: var(--primary-black);
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-sm);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.btn-primary:hover {
    background: var(--accent-gold-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-gold);
}
```

#### 次按钮

```css
.btn-secondary {
    background: transparent;
    color: var(--accent-gold);
    padding: var(--spacing-sm) var(--spacing-md);
    border: 2px solid var(--accent-gold);
    border-radius: var(--radius-sm);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.btn-secondary:hover {
    background: rgba(212, 175, 55, 0.1);
}
```

### 5.2 卡片 (Cards)

```css
.card {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    transition: all var(--transition-base);
}

.card:hover {
    border-color: var(--accent-gold);
    box-shadow: var(--shadow-gold);
    transform: translateY(-4px);
}
```

### 5.3 语言切换器

```css
.language-switcher {
    position: fixed;
    top: var(--spacing-md);
    right: var(--spacing-md);
    display: flex;
    gap: var(--spacing-xs);
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: var(--spacing-xs);
    border-radius: var(--radius-full);
    border: 1px solid rgba(212, 175, 55, 0.2);
    z-index: var(--z-sticky);
}

.lang-tab {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    color: var(--gray-light);
}

.lang-tab.active {
    background: var(--accent-gold);
    color: var(--primary-black);
}
```

### 5.4 导航栏

```css
.navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    z-index: var(--z-sticky);
}

.nav-item {
    color: var(--white);
    text-decoration: none;
    padding: var(--spacing-xs) var(--spacing-sm);
    transition: color var(--transition-base);
}

.nav-item:hover {
    color: var(--accent-gold);
}
```

### 5.5 输入框

```css
.input {
    width: 100%;
    padding: var(--spacing-sm);
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: var(--radius-sm);
    color: var(--white);
    font-size: var(--font-size-body);
    transition: all var(--transition-base);
}

.input:focus {
    outline: none;
    border-color: var(--accent-gold);
    box-shadow: var(--shadow-gold);
}
```

### 5.6 伊斯兰纹样背景

所有页面统一使用的装饰性背景：

```css
.islamic-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(212, 175, 55, 0.02) 50px,
            rgba(212, 175, 55, 0.02) 52px
        ),
        repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 50px,
            rgba(212, 175, 55, 0.02) 50px,
            rgba(212, 175, 55, 0.02) 52px
        );
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
}
```

---

## 6. 统一元素要求

### 6.1 必须包含的元素

每个页面都必须包含以下元素：

1. **语言切换器**
   - 位置：右上角（RTL时左上角）
   - 支持：中文、English、العربية
   - 样式：半透明黑底 + 金色边框

2. **伊斯兰纹样背景**
   - 全页面固定背景
   - 半透明金色斜线纹理
   - 不影响交互（pointer-events: none）

3. **页脚 (Footer)**
   ```html
   <footer class="footer">
       <div class="container">
           <div class="footer-content">
               <div class="footer-logo">YECO</div>
               <div class="footer-tagline">世界文化交融的香水包装设计专家</div>
               <div class="footer-divider"></div>
               <div class="footer-meta">
                   <span>© 2024 YECO. 保留所有权利</span>
               </div>
           </div>
       </div>
   </footer>
   ```

4. **返回顶部按钮**（长页面）
   ```html
   <button class="back-to-top" aria-label="返回顶部">↑</button>
   ```

### 6.2 Meta 标签规范

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="页面描述">
<meta name="keywords" content="关键词1,关键词2">
<title>页面标题 - YECO</title>
```

### 6.3 CSS 引入顺序

```html
<!-- 1. 全局样式 -->
<link rel="stylesheet" href="/assets/styles/variables.css">
<link rel="stylesheet" href="/assets/styles/typography.css">
<link rel="stylesheet" href="/assets/styles/rtl.css">

<!-- 2. 组件样式 -->
<link rel="stylesheet" href="/shared/components/LanguageSwitcher/styles.css">

<!-- 3. 页面样式 -->
<link rel="stylesheet" href="style.css">
```

### 6.4 JavaScript 引入顺序

```html
<!-- 1. i18n 核心 -->
<script src="/shared/i18n/i18n-core.js"></script>
<script src="/shared/i18n/rtl-handler.js"></script>

<!-- 2. 语言包 -->
<script src="i18n/zh-CN.js"></script>
<script src="i18n/en-US.js"></script>
<script src="i18n/ar-SA.js"></script>

<!-- 3. 页面脚本 -->
<script src="script.js"></script>
```

---

## 7. 响应式设计

### 7.1 断点定义

```css
/* 超小屏幕（手机竖屏） */
@media (max-width: 480px) { }

/* 小屏幕（手机横屏） */
@media (max-width: 768px) { }

/* 中屏幕（平板） */
@media (max-width: 1024px) { }

/* 大屏幕（桌面） */
@media (min-width: 1025px) { }
```

### 7.2 移动端适配要点

```css
/* 移动端减小字体 */
@media (max-width: 768px) {
    h1 { font-size: var(--font-size-h1-mobile); }
    h2 { font-size: var(--font-size-h2-mobile); }

    /* 减小间距 */
    section { padding: var(--spacing-lg) 0; }

    /* 栅格改为单列 */
    .grid { grid-template-columns: 1fr; }
}
```

### 7.3 触摸优化

```css
/* 增大点击区域 */
.btn, .nav-item, .lang-tab {
    min-height: 44px;  /* iOS建议的最小触摸尺寸 */
    min-width: 44px;
}
```

---

## 8. 动画与过渡

### 8.1 过渡时长

```css
--transition-fast: 0.15s;
--transition-base: 0.3s;
--transition-slow: 0.5s;
```

### 8.2 缓动函数

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 8.3 常用动画

```css
/* 淡入 */
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
    animation: fadeIn var(--transition-base) var(--ease-out);
}

/* 悬停缩放 */
.hover-scale {
    transition: transform var(--transition-base);
}

.hover-scale:hover {
    transform: scale(1.05);
}
```

### 8.4 滚动动画

```javascript
// IntersectionObserver 实现滚动淡入
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

---

## 附录：常用阴影效果

```css
/* 阴影定义 */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* 金色光晕 */
--shadow-gold: 0 0 20px rgba(212, 175, 55, 0.3);
--shadow-gold-lg: 0 0 40px rgba(212, 175, 55, 0.5);
```

---

## 更新日志

- **2024-11-12**: 初始版本创建
