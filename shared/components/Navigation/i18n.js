/* ==========================================
   YECO 导航栏多语言数据
   ========================================== */

const navigationI18n = {
    'zh-CN': {
        nav: {
            home: '首页',
            trends: '趋势研究'
        }
    },
    'en-US': {
        nav: {
            home: 'Home',
            trends: 'Trend Research'
        }
    },
    'ar-SA': {
        nav: {
            home: 'الرئيسية',
            trends: 'أبحاث الاتجاهات'
        }
    }
};

// 注册到全局i18n系统
if (typeof window !== 'undefined' && window.i18n) {
    window.i18n.registerMultipleTranslations(navigationI18n);
    console.log('✅ 导航栏翻译数据已注册');
}

// 导出供外部使用
if (typeof window !== 'undefined') {
    window.navigationI18n = navigationI18n;
}
