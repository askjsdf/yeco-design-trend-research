/* ==========================================
   YECO 国际化核心系统
   统一的多语言管理
   ========================================== */

class I18nManager {
    constructor() {
        this.currentLang = 'zh-CN';
        this.supportedLanguages = ['zh-CN', 'en-US', 'ar-SA'];
        this.rtlLanguages = ['ar', 'ar-SA', 'he', 'fa'];
        this.translations = {};
        this.initialized = false;

        // 事件监听器存储
        this.eventListeners = {
            languageChanged: []
        };
    }

    /* ==========================================
       初始化
       ========================================== */
    async init(pageTranslations = {}) {
        console.log('🌍 初始化 i18n 系统...');

        // 合并页面专属翻译
        this.translations = { ...this.translations, ...pageTranslations };

        // 检测初始语言
        const initialLang = this.detectLanguage();
        console.log('📍 检测到的语言:', initialLang);

        // 应用语言
        await this.switchLanguage(initialLang, false);

        // 初始化语言切换器UI
        this.initLanguageSwitcherUI();

        this.initialized = true;
        console.log('✅ i18n 系统初始化完成');

        return this;
    }

    /* ==========================================
       语言检测
       ========================================== */
    detectLanguage() {
        console.log('🔍 检测语言...');

        // 1. 检查 localStorage
        const savedLang = localStorage.getItem('yeco_language');
        console.log('📦 localStorage.yeco_language:', savedLang);
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            console.log('✅ 使用保存的语言:', savedLang);
            return savedLang;
        }

        // 2. 检查 URL 参数
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        console.log('🔗 URL参数 lang:', urlLang);
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            console.log('✅ 使用URL参数语言:', urlLang);
            return urlLang;
        }

        // 3. 默认返回中文（不检查浏览器语言，确保所有用户默认看到中文）
        console.log('⚙️  使用默认语言: zh-CN');
        return 'zh-CN';
    }

    /* ==========================================
       切换语言
       ========================================== */
    async switchLanguage(lang, saveToStorage = true) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`❌ 不支持的语言: ${lang}`);
            return false;
        }

        console.log(`🔄 切换语言到: ${lang}`);

        // 更新当前语言
        const previousLang = this.currentLang;
        this.currentLang = lang;

        // 保存到 localStorage
        if (saveToStorage) {
            localStorage.setItem('yeco_language', lang);
        }

        // 更新文档属性
        this.updateDocumentAttributes(lang);

        // 应用翻译
        this.applyTranslations(lang);

        // 触发语言切换事件
        this.triggerEvent('languageChanged', {
            from: previousLang,
            to: lang,
            isRTL: this.isRTL(lang)
        });

        // 更新语言切换器UI
        this.updateLanguageSwitcherUI(lang);

        console.log('✅ 语言切换完成');
        return true;
    }

    /* ==========================================
       更新文档属性
       ========================================== */
    updateDocumentAttributes(lang) {
        const isRTL = this.isRTL(lang);
        const langCode = lang.split('-')[0];

        // 设置 lang 属性
        document.documentElement.setAttribute('lang', langCode);

        // 设置 dir 属性
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

        // 添加/移除 RTL body class
        document.body.classList.toggle('rtl', isRTL);
        document.body.classList.toggle('ltr', !isRTL);

        // 添加语言class
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        document.body.classList.add(`lang-${langCode}`);

        console.log(`📝 文档属性已更新: lang=${langCode}, dir=${isRTL ? 'rtl' : 'ltr'}`);
    }

    /* ==========================================
       应用翻译
       ========================================== */
    applyTranslations(lang) {
        const translations = this.translations[lang];

        if (!translations) {
            console.warn(`⚠️ 未找到 ${lang} 的翻译数据`);
            return;
        }

        let translatedCount = 0;

        // 处理简单文本 [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getNestedValue(translations, key);

            if (value !== undefined) {
                element.textContent = value;
                translatedCount++;
            } else {
                console.warn(`⚠️ 翻译键未找到: ${key}`);
            }
        });

        // 处理HTML内容 [data-i18n-html]
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const value = this.getNestedValue(translations, key);

            if (value !== undefined) {
                element.innerHTML = value;
                translatedCount++;
            } else {
                console.warn(`⚠️ 翻译键未找到: ${key}`);
            }
        });

        // 处理占位符 [data-i18n-placeholder]
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const value = this.getNestedValue(translations, key);

            if (value !== undefined) {
                element.placeholder = value;
                translatedCount++;
            }
        });

        // 处理标题属性 [data-i18n-title]
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const value = this.getNestedValue(translations, key);

            if (value !== undefined) {
                element.title = value;
                translatedCount++;
            }
        });

        // 处理 aria-label [data-i18n-aria]
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            const value = this.getNestedValue(translations, key);

            if (value !== undefined) {
                element.setAttribute('aria-label', value);
                translatedCount++;
            }
        });

        console.log(`✅ 已翻译 ${translatedCount} 个元素`);
    }

    /* ==========================================
       获取嵌套对象值
       ========================================== */
    getNestedValue(obj, path) {
        if (!path) return undefined;

        const keys = path.split('.');
        let value = obj;

        for (const key of keys) {
            if (value === null || value === undefined) {
                return undefined;
            }
            value = value[key];
        }

        return value;
    }

    /* ==========================================
       判断是否为RTL语言
       ========================================== */
    isRTL(lang = this.currentLang) {
        const langCode = lang.split('-')[0];
        return this.rtlLanguages.includes(langCode) || this.rtlLanguages.includes(lang);
    }

    /* ==========================================
       获取当前语言
       ========================================== */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /* ==========================================
       获取翻译文本
       ========================================== */
    t(key, lang = this.currentLang) {
        const translations = this.translations[lang];
        if (!translations) return key;

        return this.getNestedValue(translations, key) || key;
    }

    /* ==========================================
       初始化语言切换器UI
       ========================================== */
    initLanguageSwitcherUI() {
        const switchers = document.querySelectorAll('.language-switcher');

        switchers.forEach(switcher => {
            // 查找所有语言选项
            const langTabs = switcher.querySelectorAll('[data-lang]');

            langTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetLang = tab.getAttribute('data-lang');
                    this.switchLanguage(targetLang);
                });
            });
        });

        console.log('✅ 语言切换器UI已初始化');
    }

    /* ==========================================
       更新语言切换器UI状态
       ========================================== */
    updateLanguageSwitcherUI(lang) {
        document.querySelectorAll('[data-lang]').forEach(tab => {
            if (tab.getAttribute('data-lang') === lang) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    /* ==========================================
       事件系统
       ========================================== */
    on(eventName, callback) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
    }

    off(eventName, callback) {
        if (!this.eventListeners[eventName]) return;

        const index = this.eventListeners[eventName].indexOf(callback);
        if (index > -1) {
            this.eventListeners[eventName].splice(index, 1);
        }
    }

    triggerEvent(eventName, data) {
        // 触发自定义事件
        const event = new CustomEvent(eventName, {
            detail: data,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);

        // 触发内部监听器
        if (this.eventListeners[eventName]) {
            this.eventListeners[eventName].forEach(callback => {
                callback(data);
            });
        }
    }

    /* ==========================================
       加载语言包（动态加载）
       ========================================== */
    async loadLanguagePack(lang, url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            this.translations[lang] = {
                ...this.translations[lang],
                ...data
            };

            console.log(`✅ 已加载 ${lang} 语言包`);
            return true;
        } catch (error) {
            console.error(`❌ 加载语言包失败: ${lang}`, error);
            return false;
        }
    }

    /* ==========================================
       深度合并对象
       ========================================== */
    deepMerge(target, source) {
        const result = { ...target };

        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    // 递归合并嵌套对象
                    result[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    // 直接赋值（包括数组和基本类型）
                    result[key] = source[key];
                }
            }
        }

        return result;
    }

    /* ==========================================
       注册翻译数据（使用深度合并避免覆盖）
       ========================================== */
    registerTranslations(lang, translations) {
        // 使用深度合并，避免后注册的翻译完全覆盖之前的同名对象
        this.translations[lang] = this.deepMerge(
            this.translations[lang] || {},
            translations
        );
        console.log(`✅ 已注册 ${lang} 翻译数据`);
    }

    /* ==========================================
       批量注册翻译
       ========================================== */
    registerMultipleTranslations(translationsMap) {
        Object.keys(translationsMap).forEach(lang => {
            this.registerTranslations(lang, translationsMap[lang]);
        });
    }

    /* ==========================================
       调试辅助
       ========================================== */
    debug() {
        console.group('🐛 i18n Debug Info');
        console.log('当前语言:', this.currentLang);
        console.log('支持的语言:', this.supportedLanguages);
        console.log('是否RTL:', this.isRTL());
        console.log('已注册的语言包:', Object.keys(this.translations));
        console.log('翻译数据:', this.translations);
        console.groupEnd();
    }
}

/* ==========================================
   创建全局实例
   ========================================== */
if (typeof window !== 'undefined') {
    window.I18nManager = I18nManager;
    window.i18n = new I18nManager();

    console.log('🌍 YECO i18n 系统已加载');
}

/* ==========================================
   导出（支持模块化）
   ========================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}
