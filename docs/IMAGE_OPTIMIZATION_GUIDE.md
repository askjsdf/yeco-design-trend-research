# YECO 图片优化系统使用指南

## 📖 目录

1. [系统概述](#系统概述)
2. [快速开始](#快速开始)
3. [如何添加新图片](#如何添加新图片)
4. [在页面中使用图片](#在页面中使用图片)
5. [高级用法](#高级用法)
6. [故障排查](#故障排查)

---

## 系统概述

YECO 图片优化系统是一套全自动化的图片处理方案，能够：

✅ **自动转换格式**：将 PNG/JPG 自动转换为 WebP（体积减少 70-85%）
✅ **生成响应式尺寸**：自动生成多个尺寸适配不同设备
✅ **懒加载**：只加载可见区域的图片，提升页面速度
✅ **全站覆盖**：支持首页、趋势页、报告页等所有页面
✅ **零手工操作**：部署时自动优化，无需手动处理

### 技术架构

```
原始图片 (PNG/JPG)
    ↓
构建脚本自动处理
    ↓
生成 WebP + 多尺寸
    ↓
响应式组件自动选择最优图片
    ↓
用户看到优化后的图片
```

---

## 快速开始

### 1. 安装依赖

第一次使用时，在项目根目录运行：

```bash
npm install
```

### 2. 优化所有图片

```bash
npm run optimize-images
```

这会扫描所有 `pages/**/images/` 目录并优化图片。

### 3. 只优化特定目录

```bash
npm run optimize-images:report  # 只优化报告页面
npm run optimize-images -- --path pages/home  # 只优化首页
```

---

## 如何添加新图片

### 方法一：直接添加（推荐）

1. **将图片放入对应目录**

```bash
# 新报告的图片
pages/reports/2025-11-新报告/images/你的图片.png

# 首页的图片
pages/home/images/你的图片.jpg

# 趋势页的图片
pages/trends/images/你的图片.png
```

2. **提交并推送代码**

```bash
git add .
git commit -m "添加新报告图片"
git push
```

3. **Vercel 自动处理** ✨

部署时会自动优化所有图片，无需任何手动操作！

### 方法二：本地预览优化效果

如果你想在提交前看看优化效果：

```bash
# 优化图片
npm run optimize-images

# 本地预览（需要安装 http-server）
npm run dev
```

然后访问 `http://localhost:8080`

---

## 在页面中使用图片

### 基础用法

在 HTML 中使用响应式图片组件：

#### 第一步：引入组件样式和脚本

在页面 `<head>` 中添加：

```html
<!-- 响应式图片组件样式 -->
<link rel="stylesheet" href="../../../shared/components/ResponsiveImage/styles.css">
```

在页面底部 `</body>` 前添加：

```html
<!-- 响应式图片组件脚本 -->
<script src="../../../shared/components/ResponsiveImage/component.js"></script>
```

#### 第二步：使用组件

替换原来的 `<img>` 标签：

**旧方式：**
```html
<img src="images/01主视觉.png" alt="主视觉图片">
```

**新方式：**
```html
<div class="responsive-image"
     data-image="images/01主视觉.png"
     data-alt="主视觉图片"></div>
```

就这么简单！组件会自动：
- 加载 WebP 格式（如果可用）
- 根据屏幕大小选择合适尺寸
- 懒加载图片
- 显示加载动画

### 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>示例页面</title>

    <!-- 全局样式 -->
    <link rel="stylesheet" href="../../assets/styles/variables.css">
    <link rel="stylesheet" href="../../assets/styles/typography.css">

    <!-- 响应式图片组件 -->
    <link rel="stylesheet" href="../../shared/components/ResponsiveImage/styles.css">
</head>
<body>
    <!-- 使用响应式图片 -->
    <div class="responsive-image"
         data-image="images/hero.png"
         data-alt="英雄图片"></div>

    <!-- 响应式图片组件脚本 -->
    <script src="../../shared/components/ResponsiveImage/component.js"></script>
</body>
</html>
```

---

## 高级用法

### 1. 不同尺寸变体

```html
<!-- 小尺寸图片 -->
<div class="responsive-image small"
     data-image="images/icon.png"
     data-alt="图标"></div>

<!-- 中等尺寸 -->
<div class="responsive-image medium"
     data-image="images/feature.png"
     data-alt="特性图片"></div>

<!-- 全宽图片 -->
<div class="responsive-image full-width"
     data-image="images/banner.png"
     data-alt="横幅"></div>
```

### 2. 圆角和边框

```html
<!-- 圆角图片 -->
<div class="responsive-image rounded"
     data-image="images/photo.jpg"
     data-alt="照片"></div>

<!-- 圆形图片（如头像）-->
<div class="responsive-image circle"
     data-image="images/avatar.jpg"
     data-alt="头像"></div>

<!-- 金色边框 -->
<div class="responsive-image bordered-gold"
     data-image="images/product.png"
     data-alt="产品图"></div>
```

### 3. 悬浮效果

```html
<!-- 悬浮时上浮 -->
<div class="responsive-image hoverable"
     data-image="images/card.png"
     data-alt="卡片"></div>

<!-- 悬浮时放大 -->
<div class="responsive-image zoom-on-hover"
     data-image="images/gallery.jpg"
     data-alt="画廊图片"></div>
```

### 4. 图片网格

```html
<div class="image-grid cols-3">
    <div class="responsive-image"
         data-image="images/1.png"
         data-alt="图片1"></div>
    <div class="responsive-image"
         data-image="images/2.png"
         data-alt="图片2"></div>
    <div class="responsive-image"
         data-image="images/3.png"
         data-alt="图片3"></div>
</div>
```

### 5. 禁用懒加载

对于首屏关键图片，可以禁用懒加载：

```html
<div class="responsive-image"
     data-image="images/hero.png"
     data-alt="英雄图片"
     data-lazy="false"></div>
```

### 6. 设置宽高比

防止加载时布局跳动：

```html
<div class="responsive-image"
     data-image="images/banner.png"
     data-alt="横幅"
     data-aspect-ratio="16/9"></div>
```

---

## 目录结构

```
pages/
├── home/
│   └── images/           # 首页图片
│       ├── hero.png      # 原始图片
│       └── optimized/    # 自动生成（不要手动编辑）
│           ├── hero.webp
│           ├── hero-small.webp
│           ├── hero-medium.webp
│           ├── hero-large.webp
│           └── manifest.json
│
├── trends/
│   └── images/           # 趋势页图片
│
└── reports/
    └── 2025-10-middleeast/
        └── images/       # 报告图片
            ├── 01主视觉.png
            └── optimized/
                ├── 01主视觉.webp
                ├── 01主视觉-small.webp
                ├── 01主视觉-medium.webp
                ├── 01主视觉-large.webp
                └── manifest.json
```

**重要提示：**
- ✅ 只需要管理 `images/` 下的原始图片
- ❌ 不要手动编辑 `images/optimized/` 目录
- ❌ 不要提交 `optimized/` 目录到 Git（已在 .gitignore 中）

---

## 性能优化效果

### 优化前 vs 优化后

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 单个报告图片总大小 | 41 MB | 6-12 MB | 70-85% ↓ |
| 首屏加载时间 | ~8-10s | ~2-3s | 60-70% ↓ |
| 移动端流量消耗 | 41 MB | 3-5 MB | 88% ↓ |
| 图片加载数量（首屏）| 所有图片 | 仅可见图片 | 节省 60%+ |

### 缓存策略

所有图片都配置了 1 年的浏览器缓存：
- **首次访问**：下载优化后的图片
- **再次访问**：直接从缓存加载，几乎瞬间显示

---

## 故障排查

### Q: 部署后图片没有被优化？

**A:** 检查以下几点：

1. 确保 `package.json` 存在并包含依赖：
```bash
cat package.json  # 检查是否有 sharp 和 glob
```

2. 查看 Vercel 构建日志，确认脚本是否执行：
```
✓ YECO 图片优化工具
✓ 找到 X 个图片目录
✓ 优化完成
```

3. 检查图片路径是否正确：
```bash
# 图片应该在这些位置
pages/*/images/*.{png,jpg,jpeg}
```

### Q: 本地看不到优化后的图片？

**A:** 本地开发时需要先运行优化脚本：

```bash
npm run optimize-images
npm run dev
```

### Q: 某些图片显示不出来？

**A:** 检查：

1. **原始图片存在吗？**
```bash
ls pages/reports/2025-10-middleeast/images/
```

2. **路径是否正确？**
```html
<!-- 确保路径相对于 HTML 文件 -->
<div class="responsive-image" data-image="images/01主视觉.png"></div>
```

3. **查看浏览器控制台**，看是否有 404 错误

### Q: 如何查看优化效果？

**A:** 运行优化脚本后会显示详细报告：

```bash
npm run optimize-images

# 输出示例：
✓ 01主视觉.png: 8.4MB → 1.2MB (节省 85.7%)
✓ 02核心洞察.png: 4.0MB → 580KB (节省 85.5%)

总节省: 35MB (85.4%)
```

### Q: 能否只优化新增的图片？

**A:** 脚本会跳过已优化的图片。如果想强制重新优化：

```bash
# 删除 optimized 目录
rm -rf pages/**/images/optimized

# 重新优化
npm run optimize-images
```

---

## 最佳实践

### 1. 图片命名

使用描述性的文件名：

✅ **好的命名**
- `hero-banner.png`
- `product-luxury-perfume.jpg`
- `01-main-visual.png`

❌ **不好的命名**
- `IMG_1234.png`
- `屏幕截图 2024-11-13.png`
- `未命名.jpg`

### 2. 图片尺寸

上传前确保图片尺寸合理：

- **英雄图片/横幅**：1920px 宽即可
- **内容图片**：1200px 宽即可
- **缩略图/图标**：400px 宽即可

不要上传超大原图（如 4000px+），会浪费存储和构建时间。

### 3. 图片格式选择

- **照片/复杂图像**：使用 JPG
- **插图/图标/透明背景**：使用 PNG
- **不用担心 WebP**：脚本会自动转换

### 4. 组织图片

每个报告/页面的图片放在自己的 `images/` 目录：

```
pages/
├── reports/
│   ├── 2025-10-middleeast/images/
│   ├── 2025-11-european/images/
│   └── 2025-12-asian/images/
```

---

## 未来扩展

### 计划中的功能

- [ ] 支持 AVIF 格式（更高压缩率）
- [ ] 自动生成 Blur Hash 占位符
- [ ] 图片批量上传界面
- [ ] CDN 集成（七牛云/Cloudflare R2）

---

## 需要帮助？

如果遇到问题：

1. 查看本文档的 [故障排查](#故障排查) 部分
2. 检查 `scripts/optimize-images.js` 的注释
3. 联系团队技术支持

---

**最后更新**: 2025-11-13
**版本**: 1.0.0
