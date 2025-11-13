/**
 * YECO 图片自动优化加载器
 *
 * 自动将页面中的所有 <img> 标签升级为使用优化后的 WebP 图片
 * 支持响应式尺寸和懒加载
 */

(function() {
    'use strict';

    // 检测浏览器是否支持 WebP
    function supportsWebP() {
        const elem = document.createElement('canvas');
        if (elem.getContext && elem.getContext('2d')) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    }

    // 获取屏幕宽度对应的图片尺寸
    function getOptimalSize() {
        const width = window.innerWidth || document.documentElement.clientWidth;
        if (width <= 640) return 'small';
        if (width <= 1024) return 'medium';
        return 'large';
    }

    // 转换图片路径为优化后的 WebP 路径
    function getOptimizedPath(originalPath, size = null) {
        // 如果已经是优化后的路径，直接返回
        if (originalPath.includes('/optimized/')) {
            return originalPath;
        }

        // 解析路径
        const pathParts = originalPath.split('/');
        const fileName = pathParts.pop();
        const fileNameWithoutExt = fileName.replace(/\.(png|jpg|jpeg)$/i, '');

        // 构建优化后的路径
        const optimizedDir = [...pathParts, 'optimized'].join('/');

        if (size && size !== 'large') {
            // 使用响应式尺寸
            return `${optimizedDir}/${fileNameWithoutExt}-${size}.webp`;
        } else {
            // 使用主要 WebP 版本
            return `${optimizedDir}/${fileNameWithoutExt}.webp`;
        }
    }

    // 优化单张图片（不改变 DOM 结构，只替换路径）
    function upgradeImageToPicture(img) {
        // 跳过已处理的图片
        if (img.dataset.optimized === 'true') return;

        const originalSrc = img.getAttribute('src');

        // 只处理 images/ 目录下的图片
        if (!originalSrc || !originalSrc.includes('images/')) {
            return;
        }

        const isWebPSupported = supportsWebP();

        if (isWebPSupported) {
            // 保存原始路径作为 fallback
            img.dataset.originalSrc = originalSrc;

            // 使用屏幕宽度选择合适的尺寸
            const screenWidth = window.innerWidth || document.documentElement.clientWidth;
            let size = null;
            if (screenWidth <= 640) {
                size = 'small';
            } else if (screenWidth <= 1024) {
                size = 'medium';
            } else {
                size = 'large';
            }

            // 设置优化后的 WebP 路径
            const optimizedPath = getOptimizedPath(originalSrc, size);
            img.src = optimizedPath;

            // 如果 WebP 加载失败，回退到原图
            img.onerror = function() {
                if (this.src !== this.dataset.originalSrc) {
                    console.warn(`WebP 加载失败，回退到原图: ${this.dataset.originalSrc}`);
                    this.src = this.dataset.originalSrc;
                }
            };

            // 添加 loading="lazy" 如果原图没有
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            img.dataset.optimized = 'true';

        } else {
            // 不支持 WebP，保持原图但添加懒加载
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
            img.dataset.optimized = 'true';
        }
    }

    // 处理所有图片
    function optimizeAllImages() {
        const images = document.querySelectorAll('img:not([data-optimized="true"])');
        images.forEach(upgradeImageToPicture);
    }

    // 处理 CSS 背景图片
    function optimizeBackgroundImages() {
        const elements = document.querySelectorAll('[style*="background-image"], [style*="--cover-bg-image"]');

        elements.forEach(elem => {
            const style = elem.getAttribute('style');
            if (!style) return;

            // 匹配 url('images/xxx.png') 模式
            const urlMatch = style.match(/url\(['"]?(images\/[^'"]+\.(png|jpg|jpeg))['"]?\)/i);
            if (urlMatch && supportsWebP()) {
                const originalPath = urlMatch[1];
                const optimizedPath = getOptimizedPath(originalPath);

                // 替换为优化后的路径
                const newStyle = style.replace(urlMatch[0], `url('${optimizedPath}')`);
                elem.setAttribute('style', newStyle);
            }
        });
    }

    // 初始化
    function init() {
        // DOM 加载完成后执行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                optimizeAllImages();
                optimizeBackgroundImages();
            });
        } else {
            optimizeAllImages();
            optimizeBackgroundImages();
        }

        // 监听动态添加的图片
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // 元素节点
                        if (node.tagName === 'IMG') {
                            upgradeImageToPicture(node);
                        } else if (node.querySelectorAll) {
                            const imgs = node.querySelectorAll('img:not([data-optimized="true"])');
                            imgs.forEach(upgradeImageToPicture);
                        }
                    }
                });
            });
        });

        // 开始观察
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 执行初始化
    init();

    // 导出到全局（可选）
    window.YECOImageOptimizer = {
        optimizeAllImages,
        optimizeBackgroundImages,
        getOptimizedPath
    };

})();
