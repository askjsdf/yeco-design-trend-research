# YECO 趋势研究目录页

## 概述

这是YECO网站的趋势研究目录页面，展示所有已发布的趋势研究报告。页面支持多语言（中文、英文、阿拉伯语）和多种筛选功能。

## 文件结构

```
/pages/trends/
├── index.html          # 主页面HTML
├── style.css           # 页面样式（黑金配色 + RTL支持）
├── script.js           # 页面交互逻辑
├── i18n/              # 国际化翻译文件
│   ├── zh-CN.js       # 中文翻译
│   ├── en-US.js       # 英文翻译
│   └── ar-SA.js       # 阿拉伯语翻译
├── data/              # 数据文件
│   └── reports-index.json  # 报告索引数据
└── images/            # 页面图片资源
```

## 主要功能

### 1. 多语言支持
- 中文（zh-CN）
- 英文（en-US）
- 阿拉伯语（ar-SA）with RTL布局支持

### 2. 报告筛选
- **搜索**: 按标题、副标题、描述、标签搜索
- **类别筛选**: 按报告类别筛选（设计美学、消费者洞察等）
- **地区筛选**: 按地区筛选（中东、亚洲、欧洲、北美）
- **排序**: 按最新/最早发布时间排序

### 3. 报告展示
- 网格布局展示报告卡片
- 精选报告标记
- 封面图片展示
- 标签展示
- 悬停效果

### 4. 响应式设计
- 桌面端：多列网格布局
- 平板端：自适应网格
- 移动端：单列布局

## 数据格式

报告数据存储在 `data/reports-index.json`，格式如下：

```json
{
  "reports": [
    {
      "id": "2025-10-middleeast",
      "date": "2025-10",
      "year": 2025,
      "month": 10,
      "region": "middleeast",
      "title": {
        "zh-CN": "香水行业趋势月刊 - 中东版",
        "en-US": "Perfume Industry Trend Monthly - Middle East Edition",
        "ar-SA": "تقرير اتجاهات صناعة العطور الشهري - نسخة الشرق الأوسط"
      },
      "subtitle": { ... },
      "description": { ... },
      "tags": {
        "zh-CN": ["设计美学", "叙事趋势", "用户动态"],
        "en-US": ["Design Aesthetics", "Narrative Trends", "User Dynamics"],
        "ar-SA": ["جماليات التصميم", "اتجاهات السرد", "ديناميكيات المستخدم"]
      },
      "coverImage": "../../pages/reports/2025-10-middleeast/images/01主视觉.png",
      "url": "../../pages/reports/2025-10-middleeast/",
      "featured": true,
      "published": true
    }
  ],
  "categories": {
    "zh-CN": ["全部", "设计美学", "消费者洞察", "市场趋势", "区域分析"],
    "en-US": ["All", "Design Aesthetics", "Consumer Insights", "Market Trends", "Regional Analysis"],
    "ar-SA": ["الكل", "جماليات التصميم", "رؤى المستهلك", "اتجاهات السوق", "التحليل الإقليمي"]
  },
  "regions": {
    "zh-CN": ["全部", "中东", "亚洲", "欧洲", "北美"],
    "en-US": ["All", "Middle East", "Asia", "Europe", "North America"],
    "ar-SA": ["الكل", "الشرق الأوسط", "آسيا", "أوروبا", "أمريكا الشمالية"]
  }
}
```

## 添加新报告

1. 在 `data/reports-index.json` 的 `reports` 数组中添加新报告对象
2. 确保提供所有三种语言的翻译
3. 设置 `published: true` 以显示报告
4. 可选：设置 `featured: true` 标记为精选报告

## 设计规范

### 颜色
- 主色：纯黑 `#000000`
- 强调色：金色 `#D4AF37`
- 文字：白色 `#FFFFFF` / 浅灰 `#E5E5E5`
- 背景：深黑 `#0d0d0d`

### 字体
- 标题：Playfair Display
- 正文：Noto Serif SC / Noto Serif
- 阿拉伯语：Noto Sans Arabic

### 间距
基于8px网格系统

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动浏览器（iOS Safari 14+, Chrome Android 90+）

## 依赖

- 全局样式系统（`/assets/styles/`）
- i18n核心系统（`/shared/i18n/`）
- 语言切换器组件（`/shared/components/LanguageSwitcher/`）

## 开发说明

### 本地开发
使用本地服务器运行，不要直接用 file:// 协议打开（会导致CORS错误）

推荐使用：
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server扩展
```

### 调试
打开浏览器开发者工具查看控制台日志：
- 🚀 初始化信息
- 🌍 i18n系统状态
- 📚 报告加载状态
- ✅ 成功信息
- ❌ 错误信息

## 性能优化

- 图片懒加载（可选添加）
- CSS动画使用GPU加速
- 防抖搜索（300ms延迟）
- 最小化重绘

## 待改进

- [ ] 添加分页功能（当报告数量超过20时）
- [ ] 添加图片懒加载
- [ ] 添加骨架屏加载状态
- [ ] 添加报告收藏功能
- [ ] 添加社交分享功能
- [ ] SEO优化（元标签、结构化数据）
