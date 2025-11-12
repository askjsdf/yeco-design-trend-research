# 趋势目录页快速入门

## 快速查看

1. **启动本地服务器**
   ```bash
   cd /Volumes/SD2/yeco
   python -m http.server 8000
   ```

2. **在浏览器中打开**
   ```
   http://localhost:8000/pages/trends/
   ```

3. **查看效果**
   - 页面应该显示黑金配色
   - 看到报告卡片网格
   - 可以切换语言（中文/英文/阿拉伯语）
   - 可以使用筛选器

## 文件说明

### 核心文件
| 文件 | 大小 | 作用 |
|------|------|------|
| `index.html` | 9.3KB | 页面结构 |
| `style.css` | 17KB | 样式定义（黑金配色 + RTL） |
| `script.js` | 17KB | 交互逻辑（加载、筛选、i18n） |

### 翻译文件
| 文件 | 大小 | 语言 |
|------|------|------|
| `i18n/zh-CN.js` | 3.3KB | 中文 |
| `i18n/en-US.js` | 3.5KB | 英文 |
| `i18n/ar-SA.js` | 4.7KB | 阿拉伯语 |

### 数据文件
| 文件 | 作用 |
|------|------|
| `data/reports-index.json` | 报告索引数据 |

## 功能概览

### 1. 语言切换
- 点击右上角的语言标签
- 支持：🇨🇳 中文 | 🇬🇧 English | 🇸🇦 العربية
- 切换时页面内容实时更新

### 2. 搜索报告
- 在搜索框输入关键词
- 支持搜索：标题、副标题、描述、标签
- 自动防抖，300ms后执行搜索

### 3. 筛选报告
**按类别**：
- 全部
- 设计美学
- 消费者洞察
- 市场趋势
- 区域分析

**按地区**：
- 全部
- 中东
- 亚洲
- 欧洲
- 北美

**排序**：
- 最新发布（默认）
- 最早发布

### 4. 重置筛选
点击"重置筛选"按钮清空所有筛选条件

## 添加新报告

编辑 `data/reports-index.json`：

```json
{
  "reports": [
    {
      "id": "2024-11-asia",
      "date": "2024-11",
      "year": 2024,
      "month": 11,
      "region": "asia",
      "title": {
        "zh-CN": "报告标题（中文）",
        "en-US": "Report Title (English)",
        "ar-SA": "عنوان التقرير (عربي)"
      },
      "subtitle": {
        "zh-CN": "副标题",
        "en-US": "Subtitle",
        "ar-SA": "العنوان الفرعي"
      },
      "description": {
        "zh-CN": "描述文字...",
        "en-US": "Description...",
        "ar-SA": "الوصف..."
      },
      "tags": {
        "zh-CN": ["标签1", "标签2"],
        "en-US": ["Tag1", "Tag2"],
        "ar-SA": ["علامة1", "علامة2"]
      },
      "coverImage": "../../pages/reports/2024-11-asia/images/cover.png",
      "url": "../../pages/reports/2024-11-asia/",
      "featured": false,
      "published": true
    }
  ]
}
```

**注意**：
- `id`: 唯一标识符
- `region`: 地区代码（middleeast, asia, europe, northamerica）
- `featured`: 是否精选（精选报告显示金色徽章）
- `published`: 是否发布（false时不显示）
- 所有文本字段都需要提供三种语言

## 样式定制

### 修改配色
编辑 `../../assets/styles/variables.css`：

```css
:root {
    --primary-black: #000000;   /* 主背景色 */
    --accent-gold: #D4AF37;     /* 金色强调 */
    --white: #FFFFFF;           /* 文字颜色 */
}
```

### 修改布局
编辑 `style.css`：

```css
/* 报告网格列数 */
.reports-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

/* 容器最大宽度 */
.container {
    max-width: var(--container-xl); /* 1280px */
}
```

## 常见问题

### Q: 报告卡片不显示？
A: 检查：
1. 报告数据是否加载成功（看控制台）
2. `published` 字段是否为 `true`
3. 图片路径是否正确

### Q: 语言切换不生效？
A: 检查：
1. i18n文件是否正确加载
2. 翻译数据是否包含对应语言
3. 浏览器控制台是否有错误

### Q: 筛选器不工作？
A: 检查：
1. 筛选器ID是否匹配
2. 数据格式是否正确
3. JavaScript是否有错误

### Q: RTL布局异常？
A: 检查：
1. `rtl.css` 是否加载
2. `dir="rtl"` 属性是否应用
3. CSS是否有覆盖RTL样式

### Q: 图片不显示？
A: 检查：
1. 图片路径是否正确（相对路径）
2. 图片文件是否存在
3. 图片格式是否支持

## 性能优化建议

1. **图片优化**
   - 压缩封面图片
   - 使用WebP格式
   - 添加懒加载

2. **代码优化**
   - 合并CSS文件
   - 压缩JavaScript
   - 启用Gzip

3. **缓存策略**
   - 设置图片缓存
   - 使用CDN
   - Service Worker

## 开发工具

**推荐VS Code扩展**：
- Live Server（实时预览）
- Prettier（代码格式化）
- ESLint（代码检查）
- CSS Peek（CSS跳转）

**浏览器工具**：
- Chrome DevTools
- React Developer Tools
- Vue.js DevTools

## 下一步

- [ ] 添加分页功能
- [ ] 实现图片懒加载
- [ ] 添加骨架屏
- [ ] SEO优化
- [ ] 性能监控
- [ ] A/B测试

## 支持

如有问题，请查看：
- `README.md` - 详细文档
- `TESTING.md` - 测试清单
- 控制台日志 - 调试信息
