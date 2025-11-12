/* ==========================================
   YECO RTL处理器
   处理阿拉伯语等RTL语言的特殊需求
   ========================================== */

class RTLHandler {
    constructor() {
        this.rtlLanguages = ['ar', 'ar-SA', 'he', 'he-IL', 'fa', 'fa-IR', 'ur'];
        this.initialized = false;
    }

    /* ==========================================
       初始化
       ========================================== */
    init() {
        console.log('🔄 初始化 RTL 处理器...');

        // 监听语言切换事件
        document.addEventListener('languageChanged', (e) => {
            this.handleLanguageChange(e.detail);
        });

        this.initialized = true;
        console.log('✅ RTL 处理器初始化完成');
    }

    /* ==========================================
       处理语言切换
       ========================================== */
    handleLanguageChange(detail) {
        const { to: lang, isRTL } = detail;

        console.log(`🔄 RTL处理器响应语言切换: ${lang}, RTL: ${isRTL}`);

        if (isRTL) {
            this.applyRTL(lang);
        } else {
            this.removeLTR();
        }
    }

    /* ==========================================
       应用RTL
       ========================================== */
    applyRTL(lang) {
        console.log('➡️ 应用 RTL 布局...');

        // 设置文档方向
        document.documentElement.dir = 'rtl';
        document.body.classList.add('rtl');
        document.body.classList.remove('ltr');

        // 调整动画方向
        this.adjustAnimations(true);

        // 调整滚动位置
        this.adjustScrollPosition(true);

        // 处理嵌入的LTR内容
        this.handleEmbeddedLTRContent();

        // 处理数字显示
        this.handleNumbers();

        // 处理图表（如果有）
        this.adjustCharts(true);

        // 处理自定义组件
        this.adjustCustomComponents(true);

        console.log('✅ RTL 布局已应用');
    }

    /* ==========================================
       移除RTL（应用LTR）
       ========================================== */
    removeLTR() {
        console.log('⬅️ 应用 LTR 布局...');

        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
        document.body.classList.add('ltr');

        this.adjustAnimations(false);
        this.adjustScrollPosition(false);
        this.adjustCharts(false);
        this.adjustCustomComponents(false);

        console.log('✅ LTR 布局已应用');
    }

    /* ==========================================
       判断是否为RTL语言
       ========================================== */
    isRTLLanguage(lang) {
        const langCode = lang.split('-')[0];
        return this.rtlLanguages.includes(langCode) || this.rtlLanguages.includes(lang);
    }

    /* ==========================================
       调整动画方向
       ========================================== */
    adjustAnimations(isRTL) {
        const direction = isRTL ? 'right' : 'left';
        document.documentElement.style.setProperty('--slide-direction', direction);

        // 调整所有使用方向变量的动画
        const animatedElements = document.querySelectorAll('[data-animation]');
        animatedElements.forEach(el => {
            if (isRTL) {
                el.classList.add('rtl-animation');
            } else {
                el.classList.remove('rtl-animation');
            }
        });
    }

    /* ==========================================
       调整滚动位置
       ========================================== */
    adjustScrollPosition(isRTL) {
        // 处理横向滚动容器
        const horizontalScrolls = document.querySelectorAll('.horizontal-scroll, [data-scroll="horizontal"]');

        horizontalScrolls.forEach(container => {
            if (isRTL) {
                // Safari/Chrome RTL滚动修正
                if (this.isSafariOrChrome()) {
                    container.scrollLeft = container.scrollWidth - container.clientWidth;
                }
            } else {
                container.scrollLeft = 0;
            }
        });

        // 处理无限滚动/轮播
        const carousels = document.querySelectorAll('.carousel, [data-carousel]');
        carousels.forEach(carousel => {
            if (carousel.rtlAdjust && typeof carousel.rtlAdjust === 'function') {
                carousel.rtlAdjust(isRTL);
            }
        });
    }

    /* ==========================================
       处理嵌入的LTR内容
       ========================================== */
    handleEmbeddedLTRContent() {
        // 处理邮箱、URL等应保持LTR的内容
        const ltrContent = document.querySelectorAll('[data-ltr], .email, .url, code, pre');

        ltrContent.forEach(el => {
            el.dir = 'ltr';
            el.style.direction = 'ltr';
            el.style.textAlign = 'left';
        });
    }

    /* ==========================================
       处理数字显示
       ========================================== */
    handleNumbers() {
        // 确保数字在RTL中保持正确显示
        const numbers = document.querySelectorAll('.number, .stat-number, .number-display, [data-number]');

        numbers.forEach(el => {
            el.dir = 'ltr';
            el.style.display = 'inline-block';
            el.style.direction = 'ltr';
        });

        // 处理带单位的数字
        const numbersWithUnits = document.querySelectorAll('[data-number-unit]');
        numbersWithUnits.forEach(el => {
            const isRTL = document.dir === 'rtl';
            // 在RTL中，单位应该在数字前面
            if (isRTL) {
                el.style.flexDirection = 'row-reverse';
            } else {
                el.style.flexDirection = 'row';
            }
        });
    }

    /* ==========================================
       调整图表
       ========================================== */
    adjustCharts(isRTL) {
        const charts = document.querySelectorAll('[data-chart], .chart-container, canvas[id*="chart"]');

        charts.forEach(chart => {
            // 设置RTL属性
            chart.setAttribute('data-rtl', isRTL);

            // 触发图表重绘事件
            const event = new CustomEvent('rtlChanged', {
                detail: { isRTL },
                bubbles: true
            });
            chart.dispatchEvent(event);

            // 如果图表有特定的RTL方法
            if (chart.chartInstance && typeof chart.chartInstance.setRTL === 'function') {
                chart.chartInstance.setRTL(isRTL);
            }
        });
    }

    /* ==========================================
       调整自定义组件
       ========================================== */
    adjustCustomComponents(isRTL) {
        // 时间轴
        this.adjustTimeline(isRTL);

        // 进度条
        this.adjustProgressBars(isRTL);

        // 工具提示
        this.adjustTooltips(isRTL);

        // 下拉菜单
        this.adjustDropdowns(isRTL);
    }

    /* ==========================================
       调整时间轴
       ========================================== */
    adjustTimeline(isRTL) {
        const timelines = document.querySelectorAll('.timeline, [data-timeline]');

        timelines.forEach(timeline => {
            if (isRTL) {
                timeline.classList.add('timeline-rtl');
            } else {
                timeline.classList.remove('timeline-rtl');
            }
        });
    }

    /* ==========================================
       调整进度条
       ========================================== */
    adjustProgressBars(isRTL) {
        const progressBars = document.querySelectorAll('.progress-bar, [data-progress]');

        progressBars.forEach(bar => {
            if (isRTL) {
                bar.style.transformOrigin = 'right';
            } else {
                bar.style.transformOrigin = 'left';
            }
        });
    }

    /* ==========================================
       调整工具提示
       ========================================== */
    adjustTooltips(isRTL) {
        const tooltips = document.querySelectorAll('[data-tooltip], .tooltip');

        tooltips.forEach(tooltip => {
            const position = tooltip.getAttribute('data-position') || 'top';

            if (isRTL) {
                // 翻转左右位置
                if (position === 'left') {
                    tooltip.setAttribute('data-position-rtl', 'right');
                } else if (position === 'right') {
                    tooltip.setAttribute('data-position-rtl', 'left');
                }
            }
        });
    }

    /* ==========================================
       调整下拉菜单
       ========================================== */
    adjustDropdowns(isRTL) {
        const dropdowns = document.querySelectorAll('.dropdown, [data-dropdown]');

        dropdowns.forEach(dropdown => {
            if (isRTL) {
                dropdown.classList.add('dropdown-rtl');
                // 调整下拉菜单位置
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.left = 'auto';
                    menu.style.right = '0';
                }
            } else {
                dropdown.classList.remove('dropdown-rtl');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.left = '0';
                    menu.style.right = 'auto';
                }
            }
        });
    }

    /* ==========================================
       浏览器检测
       ========================================== */
    isSafariOrChrome() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') > -1 || ua.indexOf('chrome') > -1;
    }

    isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }

    /* ==========================================
       镜像翻转元素
       ========================================== */
    mirrorElement(element) {
        element.style.transform = 'scaleX(-1)';
    }

    unMirrorElement(element) {
        element.style.transform = '';
    }

    /* ==========================================
       获取RTL调整后的值
       ========================================== */
    getRTLValue(ltrValue, rtlValue) {
        return document.dir === 'rtl' ? rtlValue : ltrValue;
    }

    /* ==========================================
       强制重新布局（某些情况需要）
       ========================================== */
    forceReflow() {
        document.body.style.display = 'none';
        document.body.offsetHeight; // 触发reflow
        document.body.style.display = '';
    }

    /* ==========================================
       调试辅助
       ========================================== */
    debug() {
        console.group('🐛 RTL Handler Debug Info');
        console.log('当前方向:', document.dir);
        console.log('是否RTL:', document.dir === 'rtl');
        console.log('支持的RTL语言:', this.rtlLanguages);
        console.log('浏览器:', this.isSafariOrChrome() ? 'Safari/Chrome' : this.isFirefox() ? 'Firefox' : 'Other');
        console.groupEnd();
    }
}

/* ==========================================
   创建全局实例并自动初始化
   ========================================== */
if (typeof window !== 'undefined') {
    window.RTLHandler = RTLHandler;
    window.rtlHandler = new RTLHandler();

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.rtlHandler.init();
        });
    } else {
        window.rtlHandler.init();
    }

    console.log('🔄 YECO RTL 处理器已加载');
}

/* ==========================================
   导出（支持模块化）
   ========================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RTLHandler;
}
