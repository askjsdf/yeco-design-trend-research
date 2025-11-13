/**
 * YECO 响应式图片组件
 *
 * 功能：
 * - 自动使用 WebP 格式（带 fallback）
 * - 响应式尺寸（根据屏幕大小加载合适尺寸）
 * - 懒加载（只加载可见区域的图片）
 * - 加载动画和占位符
 * - 支持 RTL 布局
 *
 * 使用方式：
 * <div class="responsive-image"
 *      data-image="images/01主视觉.png"
 *      data-alt="主视觉图片"></div>
 */

class ResponsiveImage {
    constructor(element) {
        this.element = element;
        this.imagePath = element.dataset.image;
        this.alt = element.dataset.alt || '';
        this.lazy = element.dataset.lazy !== 'false'; // 默认启用懒加载
        this.aspectRatio = element.dataset.aspectRatio || null;

        this.init();
    }

    /**
     * 初始化图片
     */
    init() {
        // 设置占位符
        this.setupPlaceholder();

        // 如果启用懒加载，使用 Intersection Observer
        if (this.lazy) {
            this.setupLazyLoading();
        } else {
            this.loadImage();
        }
    }

    /**
     * 设置占位符
     */
    setupPlaceholder() {
        this.element.classList.add('loading');

        // 如果指定了宽高比，设置占位符高度
        if (this.aspectRatio) {
            this.element.style.aspectRatio = this.aspectRatio;
        }
    }

    /**
     * 设置懒加载
     */
    setupLazyLoading() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage();
                        observer.unobserve(this.element);
                    }
                });
            },
            {
                rootMargin: '50px' // 提前 50px 加载
            }
        );

        observer.observe(this.element);
    }

    /**
     * 生成图片路径
     */
    getImagePaths() {
        const ext = this.imagePath.split('.').pop();
        const basePath = this.imagePath.replace(`.${ext}`, '');

        // 检查是否有优化后的图片目录
        const parts = basePath.split('/');
        const filename = parts.pop();
        const dir = parts.join('/');

        return {
            // 优化后的 WebP 路径
            webp: {
                small: `${dir}/optimized/${filename}-small.webp`,
                medium: `${dir}/optimized/${filename}-medium.webp`,
                large: `${dir}/optimized/${filename}-large.webp`,
                main: `${dir}/optimized/${filename}.webp`
            },
            // 原始图片作为 fallback
            original: this.imagePath
        };
    }

    /**
     * 加载图片
     */
    async loadImage() {
        const paths = this.getImagePaths();

        // 创建 picture 元素
        const picture = document.createElement('picture');

        // 添加响应式 WebP sources
        const sources = [
            { media: '(max-width: 640px)', srcset: paths.webp.small },
            { media: '(max-width: 1024px)', srcset: paths.webp.medium },
            { media: '(min-width: 1025px)', srcset: paths.webp.large }
        ];

        sources.forEach(({ media, srcset }) => {
            const source = document.createElement('source');
            source.type = 'image/webp';
            source.media = media;
            source.srcset = srcset;
            picture.appendChild(source);
        });

        // 添加默认 WebP source
        const defaultWebpSource = document.createElement('source');
        defaultWebpSource.type = 'image/webp';
        defaultWebpSource.srcset = paths.webp.main;
        picture.appendChild(defaultWebpSource);

        // 添加 fallback img 标签（使用原图）
        const img = document.createElement('img');
        img.src = paths.original;
        img.alt = this.alt;
        img.loading = 'lazy';

        // 监听加载完成
        img.onload = () => {
            this.element.classList.remove('loading');
            this.element.classList.add('loaded');
        };

        // 监听加载失败（使用原图）
        img.onerror = () => {
            console.warn(`图片加载失败，使用原图: ${this.imagePath}`);
            img.src = paths.original;
            this.element.classList.remove('loading');
            this.element.classList.add('loaded');
        };

        picture.appendChild(img);
        this.element.appendChild(picture);
    }

    /**
     * 静态方法：初始化所有响应式图片
     */
    static initAll() {
        const elements = document.querySelectorAll('.responsive-image:not(.initialized)');
        elements.forEach(element => {
            new ResponsiveImage(element);
            element.classList.add('initialized');
        });
    }
}

// 自动初始化
if (typeof document !== 'undefined') {
    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ResponsiveImage.initAll();
        });
    } else {
        ResponsiveImage.initAll();
    }
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveImage;
}
