/* ==========================================
   YECO 共享页脚脚本
   功能: 加载页脚HTML、返回顶部按钮、多语言支持
   ========================================== */

(function() {
    'use strict';

    /* ==========================================
       全局状态
       ========================================== */
    const state = {
        backToTopVisible: false
    };

    /* ==========================================
       初始化函数
       ========================================== */
    async function init() {
        console.log('🚀 初始化页脚组件...');

        // 等待DOM完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadFooter);
        } else {
            loadFooter();
        }
    }

    /* ==========================================
       加载页脚
       ========================================== */
    async function loadFooter() {
        const placeholder = document.getElementById('footer-placeholder');

        if (!placeholder) {
            console.warn('⚠️ 未找到页脚占位符 #footer-placeholder');
            return;
        }

        try {
            // 计算相对路径
            const basePath = getBasePath();
            const footerPath = `${basePath}shared/components/Footer/index.html`;

            console.log(`📂 加载页脚: ${footerPath}`);

            // 加载HTML
            const response = await fetch(footerPath);
            if (!response.ok) {
                throw new Error(`加载失败: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            placeholder.innerHTML = html;

            console.log('✅ 页脚HTML加载成功');

            // 初始化功能
            initializeFeatures();

        } catch (error) {
            console.error('❌ 加载页脚失败:', error);
            placeholder.innerHTML = '<div style="color: red; padding: 1rem;">页脚加载失败</div>';
        }
    }

    /* ==========================================
       获取基础路径
       ========================================== */
    function getBasePath() {
        const currentPath = window.location.pathname;

        // 根据当前路径确定相对路径
        if (currentPath.includes('/pages/home/')) {
            return '../../';
        } else if (currentPath.includes('/pages/trends/')) {
            return '../../';
        } else if (currentPath.includes('/pages/reports/')) {
            // 报告页面可能在子目录中
            if (currentPath.split('/').length > 6) {
                return '../../../';
            }
            return '../../../';
        } else if (currentPath === '/' || currentPath === '/index.html') {
            return './';
        }

        // 默认路径
        return '../../';
    }

    /* ==========================================
       初始化功能
       ========================================== */
    function initializeFeatures() {
        console.log('⚙️ 初始化页脚功能...');

        // 1. 初始化返回顶部按钮
        initBackToTop();

        // 2. 更新当前年份（如果需要）
        updateCopyrightYear();

        console.log('✅ 页脚功能初始化完成');
    }

    /* ==========================================
       初始化返回顶部按钮
       ========================================== */
    function initBackToTop() {
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

        // 初始检查
        toggleBackToTopButton(backToTopButton);

        console.log('⬆️ 返回顶部按钮已初始化');
    }

    /* ==========================================
       切换返回顶部按钮显示
       ========================================== */
    function toggleBackToTopButton(button) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 300) {
            if (!state.backToTopVisible) {
                button.classList.add('visible');
                state.backToTopVisible = true;
            }
        } else {
            if (state.backToTopVisible) {
                button.classList.remove('visible');
                state.backToTopVisible = false;
            }
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

            // 使用缓动函数
            const ease = easeInOutCubic(progress);
            window.scrollTo(0, startPosition * (1 - ease));

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
       更新版权年份
       ========================================== */
    function updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        const copyrightElement = document.querySelector('[data-i18n="footer.copyright"]');

        if (copyrightElement) {
            // 如果年份不是2025，更新为当前年份
            if (currentYear !== 2025) {
                const currentText = copyrightElement.textContent;
                copyrightElement.textContent = currentText.replace('2025', currentYear);
            }
        }

        console.log(`📅 版权年份: ${currentYear}`);
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
       清理函数
       ========================================== */
    function cleanup() {
        console.log('🧹 清理页脚资源...');

        // 隐藏返回顶部按钮
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            backToTopButton.classList.remove('visible');
        }

        console.log('✅ 页脚资源清理完成');
    }

    /* ==========================================
       页面卸载时清理
       ========================================== */
    window.addEventListener('beforeunload', cleanup);

    /* ==========================================
       导出到全局（调试用）
       ========================================== */
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.YECO_FOOTER = {
            state,
            smoothScrollToTop,
            toggleBackToTopButton,
            cleanup
        };
        console.log('🔧 页脚调试工具已加载: window.YECO_FOOTER');
    }

    /* ==========================================
       启动应用
       ========================================== */
    init();

})();
