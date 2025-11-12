# 部署检查清单

## 部署前检查

### 1. 文件完整性 ✅

- [x] `index.html` - 主页面
- [x] `style.css` - 样式文件
- [x] `script.js` - 脚本文件
- [x] `i18n/zh-CN.js` - 中文翻译
- [x] `i18n/en-US.js` - 英文翻译
- [x] `i18n/ar-SA.js` - 阿拉伯语翻译
- [x] `data/reports-index.json` - 报告数据

### 2. 依赖文件检查

确保以下全局文件存在：

- [ ] `/assets/styles/variables.css`
- [ ] `/assets/styles/typography.css`
- [ ] `/assets/styles/rtl.css`
- [ ] `/shared/i18n/i18n-core.js`
- [ ] `/shared/i18n/rtl-handler.js`
- [ ] `/shared/components/LanguageSwitcher/styles.css`

### 3. 路径验证

检查所有资源路径：

- [ ] CSS文件路径正确
- [ ] JavaScript文件路径正确
- [ ] 图片路径正确
- [ ] 报告链接路径正确

### 4. 功能测试

- [ ] 页面正常加载
- [ ] 报告数据正常显示
- [ ] 语言切换功能正常
- [ ] 搜索功能正常
- [ ] 筛选功能正常
- [ ] 排序功能正常
- [ ] 移动端适配正常

### 5. 浏览器测试

- [ ] Chrome/Edge 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版
- [ ] 移动Safari
- [ ] Chrome Android

### 6. 性能检查

- [ ] 首次加载时间 < 2秒
- [ ] 图片大小合理
- [ ] 无JavaScript错误
- [ ] 无CSS警告
- [ ] 无控制台错误

### 7. SEO优化

- [ ] 页面标题设置
- [ ] Meta描述设置
- [ ] Meta关键词设置
- [ ] 语言标签正确
- [ ] 结构化数据（可选）

### 8. 安全检查

- [ ] 无外部脚本引入
- [ ] 无混合内容警告
- [ ] HTTPS准备就绪
- [ ] CSP策略配置（可选）

## 部署步骤

### 方案A: 静态服务器部署

1. **上传文件**
   ```bash
   # 上传整个trends目录到服务器
   scp -r /Volumes/SD2/yeco/pages/trends user@server:/var/www/yeco/pages/
   ```

2. **配置Web服务器**

   **Nginx配置**:
   ```nginx
   location /pages/trends/ {
       try_files $uri $uri/ /pages/trends/index.html;

       # 启用Gzip压缩
       gzip on;
       gzip_types text/css application/javascript application/json;

       # 缓存静态资源
       location ~* \.(css|js|png|jpg|jpeg|gif|ico)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

   **Apache配置**:
   ```apache
   <Directory "/var/www/yeco/pages/trends">
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted

       # 启用Gzip
       <IfModule mod_deflate.c>
           AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
       </IfModule>
   </Directory>
   ```

3. **设置权限**
   ```bash
   chmod -R 755 /var/www/yeco/pages/trends
   chown -R www-data:www-data /var/www/yeco/pages/trends
   ```

### 方案B: CDN部署

1. **上传到CDN**
   - 上传所有静态资源到CDN
   - 更新资源URL为CDN地址

2. **配置缓存策略**
   - HTML: 5分钟
   - CSS/JS: 1年
   - 图片: 1年
   - JSON: 1小时

### 方案C: Netlify/Vercel部署

1. **连接Git仓库**
2. **配置构建设置**
   - Build command: 无（纯静态）
   - Publish directory: `pages/trends`
3. **部署**

## 部署后检查

### 1. 功能验证

- [ ] 访问生产URL
- [ ] 测试所有功能
- [ ] 检查移动端
- [ ] 验证多语言

### 2. 性能监控

使用工具检查：
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] WebPageTest
- [ ] Chrome Lighthouse

目标分数：
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### 3. 错误监控

- [ ] 配置错误日志收集
- [ ] 设置监控告警
- [ ] 用户反馈渠道

### 4. Analytics集成

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 回滚方案

如果部署出现问题：

1. **立即回滚**
   ```bash
   # 恢复上一个版本
   cp -r /var/www/yeco/pages/trends.backup /var/www/yeco/pages/trends
   ```

2. **检查日志**
   ```bash
   # 查看错误日志
   tail -f /var/log/nginx/error.log
   ```

3. **通知团队**
   - 发送回滚通知
   - 记录问题原因
   - 制定修复计划

## 维护计划

### 日常维护

**每天**:
- 检查错误日志
- 监控性能指标

**每周**:
- 更新报告数据
- 检查用户反馈
- 验证所有链接

**每月**:
- 性能审计
- 安全检查
- 依赖更新

### 数据备份

**备份策略**:
```bash
# 每天备份
0 2 * * * tar -czf /backup/trends-$(date +\%Y\%m\%d).tar.gz /var/www/yeco/pages/trends

# 保留30天备份
find /backup/trends-* -mtime +30 -delete
```

## 监控指标

### 关键指标

1. **性能指标**
   - 页面加载时间
   - 首次内容绘制（FCP）
   - 最大内容绘制（LCP）
   - 累积布局偏移（CLS）

2. **使用指标**
   - 日访问量
   - 平均停留时间
   - 跳出率
   - 报告点击率

3. **错误指标**
   - JavaScript错误率
   - API失败率
   - 404错误数
   - 加载失败数

### 告警设置

- 错误率 > 5%: 警告
- 错误率 > 10%: 严重
- 页面加载时间 > 5秒: 警告
- 服务器5xx错误: 严重

## 文档更新

部署完成后更新：

- [ ] 更新README中的URL
- [ ] 更新CHANGELOG
- [ ] 标记Git版本号
- [ ] 更新团队Wiki

## 上线通知

### 内部通知

**发送给**:
- 开发团队
- 设计团队
- 产品团队
- 运营团队

**通知内容**:
- 上线时间
- 新功能说明
- 已知问题
- 联系方式

### 外部通知

- [ ] 更新社交媒体
- [ ] 发送Newsletter
- [ ] 更新网站公告
- [ ] PR稿件（可选）

## 应急联系

**技术负责人**:
- 姓名: ___________
- 电话: ___________
- Email: ___________

**运维负责人**:
- 姓名: ___________
- 电话: ___________
- Email: ___________

**产品负责人**:
- 姓名: ___________
- 电话: ___________
- Email: ___________

## 部署记录

| 日期 | 版本 | 部署人 | 变更内容 | 状态 |
|------|------|--------|----------|------|
| YYYY-MM-DD | v1.0.0 | _______ | 初始版本 | ✅ |
| | | | | |

## 验收标准

部署成功标准：

- ✅ 所有功能正常工作
- ✅ 性能指标达标
- ✅ 无严重错误
- ✅ 跨浏览器兼容
- ✅ 移动端适配完善
- ✅ 文档完整
- ✅ 监控配置完成

---

**部署状态**: ⏳ 待部署
**计划日期**: ___________
**实际日期**: ___________
