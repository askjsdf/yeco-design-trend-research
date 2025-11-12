/* ==========================================
   YECO 共享导航栏脚本
   功能: 加载导航栏HTML、移动端菜单切换、滚动效果
   ========================================== */

(function() {
    'use strict';

    /* ==========================================
       全局状态
       ========================================== */
    const state = {
        isMenuOpen: false,
        lastScrollTop: 0
    };

    /* ==========================================
       初始化函数
       ========================================== */
    async function init() {
        console.log('🚀 初始化导航栏组件...');

        // 等待DOM完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadNavigation);
        } else {
            loadNavigation();
        }
    }

    /* ==========================================
       加载导航栏
       ========================================== */
    async function loadNavigation() {
        const placeholder = document.getElementById('navigation-placeholder');

        if (!placeholder) {
            console.warn('⚠️ 未找到导航栏占位符 #navigation-placeholder');
            return;
        }

        try {
            // 计算相对路径
            const basePath = getBasePath();
            const navigationPath = `${basePath}shared/components/Navigation/index.html`;

            console.log(`📂 加载导航栏: ${navigationPath}`);

            // 加载HTML
            const response = await fetch(navigationPath);
            if (!response.ok) {
                throw new Error(`加载失败: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            placeholder.innerHTML = html;

            console.log('✅ 导航栏HTML加载成功');

            // 初始化功能
            initializeFeatures();

        } catch (error) {
            console.error('❌ 加载导航栏失败:', error);
            placeholder.innerHTML = '<div style="color: red; padding: 1rem;">导航栏加载失败</div>';
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
            const depth = (currentPath.match(/\/pages\/reports\//g) || []).length;
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
        console.log('⚙️ 初始化导航栏功能...');

        // 0. 立即应用当前语言的翻译（避免显示空白或默认文字）
        applyCurrentLanguageTranslations();

        // 1. 初始化移动端菜单
        initMobileMenu();

        // 2. 初始化滚动效果
        initScrollEffect();

        // 3. 设置当前激活的导航项
        setActiveNavItem();

        // 4. 初始化语言切换器
        initLanguageSwitcher();

        console.log('✅ 导航栏功能初始化完成');
    }

    /* ==========================================
       立即应用当前语言的翻译
       ========================================== */
    function applyCurrentLanguageTranslations() {
        if (window.i18n && window.i18n.currentLang) {
            const currentLang = window.i18n.getCurrentLanguage ?
                window.i18n.getCurrentLanguage() :
                window.i18n.currentLang;

            console.log(`🔄 导航栏应用当前语言: ${currentLang}`);

            // 立即翻译所有带data-i18n属性的元素
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (window.i18n.t) {
                    const translation = window.i18n.t(key, currentLang);
                    if (translation && translation !== key) {
                        element.textContent = translation;
                    }
                }
            });
        }
    }

    /* ==========================================
       初始化移动端菜单
       ========================================== */
    function initMobileMenu() {
        const hamburger = document.querySelector('.nav-hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) {
            console.warn('⚠️ 移动端菜单元素未找到');
            return;
        }

        // 点击汉堡菜单
        hamburger.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // 点击导航项关闭菜单
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        // 点击菜单外部关闭
        document.addEventListener('click', function(e) {
            if (state.isMenuOpen &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && state.isMenuOpen) {
                closeMobileMenu();
            }
        });

        console.log('📱 移动端菜单已初始化');
    }

    /* ==========================================
       切换移动端菜单
       ========================================== */
    function toggleMobileMenu() {
        const hamburger = document.querySelector('.nav-hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        state.isMenuOpen = !state.isMenuOpen;

        if (state.isMenuOpen) {
            navMenu.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        } else {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    /* ==========================================
       关闭移动端菜单
       ========================================== */
    function closeMobileMenu() {
        const hamburger = document.querySelector('.nav-hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        state.isMenuOpen = false;
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /* ==========================================
       初始化滚动效果
       ========================================== */
    function initScrollEffect() {
        const navigation = document.querySelector('.navigation');

        if (!navigation) {
            console.warn('⚠️ 导航栏元素未找到');
            return;
        }

        let isScrolling = false;

        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    handleScroll(navigation);
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        // 初始检查
        handleScroll(navigation);

        console.log('📜 滚动效果已初始化');
    }

    /* ==========================================
       处理滚动
       ========================================== */
    function handleScroll(navigation) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 添加/移除滚动样式
        if (scrollTop > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }

        state.lastScrollTop = scrollTop;
    }

    /* ==========================================
       设置当前激活的导航项
       ========================================== */
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');

            // 移除已有的active类
            item.classList.remove('active');

            // 检查是否匹配当前路径
            if (href && currentPath.includes(href.split('#')[0])) {
                item.classList.add('active');
            }

            // 特殊处理首页
            if (href && href.includes('/pages/home/') &&
                (currentPath === '/' || currentPath.includes('/pages/home/'))) {
                item.classList.add('active');
            }
        });

        console.log('🎯 当前激活导航项已设置');
    }

    /* ==========================================
       初始化语言切换器
       ========================================== */
    function initLanguageSwitcher() {
        console.log('🌍 初始化语言切换器...');

        const dropdownButton = document.querySelector('.lang-dropdown-button');
        const dropdownMenu = document.querySelector('.lang-dropdown-menu');
        const langOptions = document.querySelectorAll('.lang-option');
        const currentLangText = document.querySelector('.current-lang-text');

        if (!dropdownButton || !dropdownMenu) {
            console.warn('⚠️ 语言切换器元素未找到');
            return;
        }

        // 语言名称映射
        const langNames = {
            'zh-CN': '中文',
            'en-US': 'English',
            'ar-SA': 'العربية'
        };

        // 点击下拉按钮切换菜单
        dropdownButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                closeLanguageDropdown();
            } else {
                openLanguageDropdown();
            }
        });

        // 点击语言选项
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const targetLang = this.getAttribute('data-lang');
                console.log(`🔄 切换语言到: ${targetLang}`);

                // 调用i18n系统切换语言
                if (window.i18n && typeof window.i18n.switchLanguage === 'function') {
                    window.i18n.switchLanguage(targetLang);

                    // 更新UI
                    updateLanguageSwitcherUI(targetLang);

                    // 关闭下拉菜单
                    closeLanguageDropdown();
                } else {
                    console.error('❌ i18n系统未找到');
                }
            });
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', function(e) {
            if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
                closeLanguageDropdown();
            }
        });

        // ESC键关闭下拉菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLanguageDropdown();
            }
        });

        // 立即同步当前语言状态（避免闪烁）
        if (window.i18n) {
            // 获取当前语言
            const currentLang = window.i18n.getCurrentLanguage ?
                window.i18n.getCurrentLanguage() :
                (window.i18n.currentLang || 'zh-CN');

            console.log('🌍 初始化语言切换器显示:', currentLang);
            updateLanguageSwitcherUI(currentLang);

            // 监听i18n系统的语言切换事件
            window.i18n.on('languageChanged', function(data) {
                console.log('🔔 收到语言切换事件:', data);
                updateLanguageSwitcherUI(data.to);
            });
        }

        console.log('✅ 语言切换器已初始化');

        // 内部函数：打开下拉菜单
        function openLanguageDropdown() {
            dropdownButton.setAttribute('aria-expanded', 'true');
            dropdownMenu.classList.add('active');
        }

        // 内部函数：关闭下拉菜单
        function closeLanguageDropdown() {
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownMenu.classList.remove('active');
        }

        // 内部函数：更新UI
        function updateLanguageSwitcherUI(lang) {
            // 更新按钮显示的语言
            if (currentLangText) {
                currentLangText.textContent = langNames[lang] || lang;
            }

            // 更新选项的active状态
            langOptions.forEach(option => {
                if (option.getAttribute('data-lang') === lang) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });

            console.log(`✅ 语言切换器UI已更新: ${lang}`);
        }
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
        console.log('🧹 清理导航栏资源...');

        // 关闭移动端菜单
        closeMobileMenu();

        console.log('✅ 导航栏资源清理完成');
    }

    /* ==========================================
       页面卸载时清理
       ========================================== */
    window.addEventListener('beforeunload', cleanup);

    /* ==========================================
       导出到全局（调试用）
       ========================================== */
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.YECO_NAV = {
            state,
            toggleMobileMenu,
            closeMobileMenu,
            setActiveNavItem,
            cleanup
        };
        console.log('🔧 导航栏调试工具已加载: window.YECO_NAV');
    }

    /* ==========================================
       启动应用
       ========================================== */
    init();

})();
