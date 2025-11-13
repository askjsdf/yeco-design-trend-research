/* ==========================================
   YECO 共享页脚组件 - 多语言翻译
   ========================================== */

const footerI18n = {
    'zh-CN': {
        footer: {
            logo: 'YECO',
            tagline: '世界文化交融的香水包装设计专家',
            copyright: '© 2025 YECO. 保留所有权利',
            location: '总部: 中国'
        }
    },
    'en-US': {
        footer: {
            logo: 'YECO',
            tagline: 'Global Cultural Fusion in Perfume Packaging Design',
            copyright: '© 2025 YECO. All rights reserved',
            location: 'Headquarters: China'
        }
    },
    'ar-SA': {
        footer: {
            logo: 'YECO',
            tagline: 'الاندماج الثقافي العالمي في تصميم تغليف العطور',
            copyright: '© 2025 YECO. جميع الحقوق محفوظة',
            location: 'المقر الرئيسي: الصين'
        }
    }
};

// 注册翻译数据
if (typeof window !== 'undefined' && window.i18n) {
    // 立即注册翻译
    Object.keys(footerI18n).forEach(lang => {
        window.i18n.registerTranslations(lang, footerI18n[lang]);
    });
    console.log('✅ 页脚翻译数据已注册');
} else if (typeof window !== 'undefined') {
    // 如果i18n还未加载，等待加载后再注册
    window.footerI18n = footerI18n;
    console.log('⏳ 等待i18n系统加载页脚翻译...');
}
