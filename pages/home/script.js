/* ==========================================
   YECO 首页脚本
   功能: i18n初始化、滚动动画、平滑滚动、返回顶部
   ========================================== */

(function() {
    'use strict';

    /* ==========================================
       全局状态
       ========================================== */
    const state = {
        isScrolling: false,
        lastScrollTop: 0,
        observer: null
    };

    /* ==========================================
       初始化函数
       ========================================== */
    async function init() {
        console.log('🚀 初始化YECO首页...');

        // 等待DOM完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
    }

    /* ==========================================
       应用初始化
       ========================================== */
    async function initializeApp() {
        try {
            // 1. 初始化 i18n 系统
            await initializeI18n();

            // 2. 初始化滚动动画
            initScrollAnimations();

            // 3. 初始化平滑滚动
            initSmoothScroll();

            // 4. 初始化返回顶部按钮
            initBackToTop();

            // 5. 初始化导航栏滚动效果
            initNavigationScroll();

            // 6. 初始化hero滚动指示器
            initHeroScrollIndicator();

            console.log('✅ YECO首页初始化完成');
        } catch (error) {
            console.error('❌ 初始化过程中出错:', error);
        }
    }

    /* ==========================================
       1. 初始化 i18n 系统
       ========================================== */
    async function initializeI18n() {
        console.log('🌍 初始化 i18n 系统...');

        // 检查 i18n 实例是否存在
        if (typeof window.i18n === 'undefined') {
            console.error('❌ i18n 系统未加载，请确保已引入 i18n-core.js');
            return;
        }

        try {
            // 合并所有语言的翻译数据
            const translations = {};

            // 检查各语言文件是否已加载
            if (typeof window.homeZhCN !== 'undefined') {
                translations['zh-CN'] = window.homeZhCN;
            }
            if (typeof window.homeEnUS !== 'undefined') {
                translations['en-US'] = window.homeEnUS;
            }
            if (typeof window.homeArSA !== 'undefined') {
                translations['ar-SA'] = window.homeArSA;
            }

            // 初始化 i18n
            await window.i18n.init(translations);

            // 监听语言切换事件
            window.i18n.on('languageChanged', handleLanguageChange);

            console.log('✅ i18n 系统初始化完成');
        } catch (error) {
            console.error('❌ i18n 初始化失败:', error);
        }
    }

    /* ==========================================
       语言切换处理
       ========================================== */
    function handleLanguageChange(data) {
        console.log('🔄 语言切换:', data);

        // 可以在这里添加语言切换后的自定义处理
        // 例如: 更新某些动态内容、重新计算布局等

        // RTL 布局调整
        if (data.isRTL) {
            console.log('📝 应用 RTL 布局');
            // 可以添加特定的 RTL 处理逻辑
        } else {
            console.log('📝 应用 LTR 布局');
        }

        // 重新触发滚动动画检查（因为文本长度可能改变）
        setTimeout(() => {
            checkScrollAnimations();
        }, 100);
    }

    /* ==========================================
       2. 初始化滚动动画
       ========================================== */
    function initScrollAnimations() {
        console.log('✨ 初始化滚动动画...');

        // 检查是否支持 IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            console.warn('⚠️ 浏览器不支持 IntersectionObserver，滚动动画将被禁用');
            // 直接显示所有元素
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        // 创建观察器
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // 当元素 10% 可见时触发
        };

        state.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 添加延迟以创建交错效果
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    // 停止观察已显示的元素（性能优化）
                    state.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            // 为同一组元素添加交错延迟
            if (!el.dataset.delay) {
                el.dataset.delay = index * 100;
            }
            state.observer.observe(el);
        });

        console.log('✅ 滚动动画初始化完成');
    }

    /* ==========================================
       检查滚动动画（手动触发）
       ========================================== */
    function checkScrollAnimations() {
        if (!state.observer) return;

        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (isVisible) {
                el.classList.add('visible');
            }
        });
    }

    /* ==========================================
       3. 初始化平滑滚动
       ========================================== */
    function initSmoothScroll() {
        console.log('🎯 初始化平滑滚动...');

        // 为所有带有 href="#..." 的链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // 跳过空锚点
                if (href === '#' || href === '#!') {
                    e.preventDefault();
                    return;
                }

                // 查找目标元素
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    smoothScrollTo(targetElement);
                }
            });
        });

        console.log('✅ 平滑滚动初始化完成');
    }

    /* ==========================================
       平滑滚动到指定元素
       ========================================== */
    function smoothScrollTo(element, offset = -80) {
        if (!element) return;

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // 毫秒
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // 使用缓动函数
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /* ==========================================
       缓动函数
       ========================================== */
    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /* ==========================================
       4. 初始化返回顶部按钮
       ========================================== */
    function initBackToTop() {
        console.log('⬆️ 初始化返回顶部按钮...');

        const backToTopButton = document.querySelector('.back-to-top');

        if (!backToTopButton) {
            console.warn('⚠️ 未找到返回顶部按钮');
            return;
        }

        // 滚动事件监听
        let isScrolling = false;

        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    toggleBackToTopButton(backToTopButton);
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        // 点击事件
        backToTopButton.addEventListener('click', function() {
            smoothScrollToTop();
        });

        console.log('✅ 返回顶部按钮初始化完成');
    }

    /* ==========================================
       切换返回顶部按钮显示
       ========================================== */
    function toggleBackToTopButton(button) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }

    /* ==========================================
       平滑滚动到顶部
       ========================================== */
    function smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const duration = 600;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const ease = easeInOutCubic(progress);
            window.scrollTo(0, startPosition * (1 - ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /* ==========================================
       5. 初始化导航栏滚动效果
       ========================================== */
    function initNavigationScroll() {
        console.log('📜 初始化导航栏滚动效果...');

        const navigation = document.querySelector('.navigation');

        if (!navigation) {
            console.warn('⚠️ 未找到导航栏');
            return;
        }

        let lastScrollTop = 0;
        let isScrolling = false;

        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    // 添加滚动样式
                    if (scrollTop > 50) {
                        navigation.classList.add('scrolled');
                    } else {
                        navigation.classList.remove('scrolled');
                    }

                    lastScrollTop = scrollTop;
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        console.log('✅ 导航栏滚动效果初始化完成');
    }

    /* ==========================================
       6. 初始化Hero滚动指示器
       ========================================== */
    function initHeroScrollIndicator() {
        console.log('👇 初始化Hero滚动指示器...');

        const heroScroll = document.querySelector('.hero-scroll');

        if (!heroScroll) {
            console.warn('⚠️ 未找到Hero滚动指示器');
            return;
        }

        heroScroll.addEventListener('click', function() {
            // 滚动到下一个section
            const nextSection = document.querySelector('.brand-intro');
            if (nextSection) {
                smoothScrollTo(nextSection);
            }
        });

        console.log('✅ Hero滚动指示器初始化完成');
    }

    /* ==========================================
       工具函数: 节流
       ========================================== */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /* ==========================================
       工具函数: 防抖
       ========================================== */
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    /* ==========================================
       清理函数
       ========================================== */
    function cleanup() {
        console.log('🧹 清理资源...');

        // 断开 IntersectionObserver
        if (state.observer) {
            state.observer.disconnect();
            state.observer = null;
        }

        // 移除事件监听器
        window.i18n?.off('languageChanged', handleLanguageChange);

        console.log('✅ 资源清理完成');
    }

    /* ==========================================
       页面卸载时清理
       ========================================== */
    window.addEventListener('beforeunload', cleanup);

    /* ==========================================
       性能监控（开发环境）
       ========================================== */
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', function() {
            if (window.performance && window.performance.timing) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

                console.group('⚡ 性能指标');
                console.log(`页面加载时间: ${pageLoadTime}ms`);
                console.log(`DOM就绪时间: ${domReadyTime}ms`);
                console.groupEnd();
            }
        });
    }

    /* ==========================================
       导出到全局（调试用）
       ========================================== */
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.YECO_HOME = {
            state,
            smoothScrollTo,
            smoothScrollToTop,
            checkScrollAnimations,
            cleanup
        };
        console.log('🔧 调试工具已加载: window.YECO_HOME');
    }

    /* ==========================================
       启动应用
       ========================================== */
    init();

})();
