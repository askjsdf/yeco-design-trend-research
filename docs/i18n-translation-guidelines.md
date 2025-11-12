# 多语言翻译数据管理规范

## 问题背景

在多页面应用中，如果各个页面都定义了相同的翻译键（如`nav.home`），后注册的页面翻译会覆盖之前的翻译，导致同一个导航栏在不同页面显示不同的文字。

**问题示例**：
- 首页注册：`nav.trends: "Trend Research"`
- 趋势页注册：`nav.trends: "Trends"` ❌
- 结果：在趋势页看到"Trends"，但在首页看到"Trend Research"

## 解决方案

### 1. 翻译数据分层（推荐）

将翻译数据分为三层：

#### a) 共享组件翻译（最高优先级）
位置：`/shared/components/[ComponentName]/i18n.js`

这些翻译数据是全局共享的，所有页面必须使用相同的翻译。

**示例：导航栏翻译**
```javascript
// /shared/components/Navigation/i18n.js
const navigationI18n = {
    'zh-CN': {
        nav: {
            home: '首页',
            trends: '趋势研究'
        }
    },
    'en-US': {
        nav: {
            home: 'Home',
            trends: 'Trend Research'  // ✅ 全局统一
        }
    }
};
```

#### b) 页面翻译（普通优先级）
位置：`/pages/[PageName]/i18n/[lang].js`

页面特定的翻译数据。**如果页面需要使用共享组件的翻译键，必须保持一致。**

```javascript
// /pages/home/i18n/en-US.js
const homeEnUS = {
    // ⚠️ 必须与 shared/components/Navigation/i18n.js 保持一致
    nav: {
        home: "Home",
        trends: "Trend Research"  // ✅ 与导航栏翻译一致
    },

    // ✅ 页面特定的翻译
    hero: {
        title: "Poetic Vessels of World Cultures",
        description: "..."
    }
};
```

#### c) 页面独立翻译（最低优先级）
页面可以有自己独特的翻译键，不会与其他页面冲突。

```javascript
// /pages/trends/i18n/en-US.js
const trendsEnUS = {
    // ✅ 趋势页独有的翻译
    filters: {
        title: "Filter Reports",
        category: "By Category"
    }
};
```

### 2. 脚本加载顺序

**必须按照以下顺序加载**：

```html
<!-- 1. i18n核心系统 -->
<script src="../../shared/i18n/i18n-core.js"></script>
<script src="../../shared/i18n/rtl-handler.js"></script>

<!-- 2. 共享组件翻译数据（优先级最高） -->
<script src="../../shared/components/Navigation/i18n.js"></script>
<script src="../../shared/components/Footer/i18n.js"></script>

<!-- 3. 页面翻译数据 -->
<script src="i18n/zh-CN.js"></script>
<script src="i18n/en-US.js"></script>
<script src="i18n/ar-SA.js"></script>

<!-- 4. 组件脚本 -->
<script src="../../shared/components/Navigation/script.js"></script>

<!-- 5. 页面脚本 -->
<script src="script.js"></script>
```

### 3. 深度合并机制

i18n系统使用**深度合并**策略：

```javascript
// 第一次注册
nav: { home: "Home", trends: "Trend Research" }

// 第二次注册（页面特定翻译）
nav: { home: "Home" }

// 合并结果（保留了trends键）
nav: { home: "Home", trends: "Trend Research" } ✅
```

这样即使页面翻译中缺少某些键，也不会丢失共享组件的翻译。

## 最佳实践

### ✅ 正确做法

1. **共享组件的翻译键必须全局一致**
   ```javascript
   // 所有页面都使用相同的nav翻译
   nav: {
       home: "Home",
       trends: "Trend Research"
   }
   ```

2. **在翻译文件中添加注释提醒**
   ```javascript
   // Navigation (must match shared/components/Navigation/i18n.js)
   nav: {
       home: "Home",
       trends: "Trend Research"
   }
   ```

3. **页面特定的翻译使用独立的命名空间**
   ```javascript
   // ✅ 使用页面特定的命名空间
   trendsFilters: { ... },
   trendsHero: { ... }
   ```

### ❌ 错误做法

1. **不同页面使用不同的翻译文本**
   ```javascript
   // 首页
   nav: { trends: "Trend Research" }

   // 趋势页
   nav: { trends: "Trends" }  // ❌ 不一致！
   ```

2. **省略共享组件的翻译键**
   ```javascript
   // ❌ 缺少nav对象，可能导致翻译丢失
   const pageTranslations = {
       hero: { ... }
   };
   ```

## 检查清单

在添加新页面时，请检查：

- [ ] 是否加载了所有共享组件的i18n文件？
- [ ] 页面的`nav`翻译是否与`shared/components/Navigation/i18n.js`一致？
- [ ] 脚本加载顺序是否正确（共享组件翻译 → 页面翻译）？
- [ ] 是否添加了注释提醒维护者保持一致性？
- [ ] 在所有三种语言（zh-CN, en-US, ar-SA）中都保持了一致性？

## 相关文件

- i18n核心系统：`/shared/i18n/i18n-core.js`
- 导航栏翻译：`/shared/components/Navigation/i18n.js`
- 页脚翻译：`/shared/components/Footer/i18n.js`

## 技术细节

深度合并函数实现在 `i18n-core.js` 的 `deepMerge()` 方法中，它会递归合并嵌套对象，确保不会因为浅合并而丢失数据。
