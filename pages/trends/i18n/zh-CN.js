/* ==========================================
   YECO 趋势研究目录页 - 中文翻译
   ========================================== */

const trendsTranslations_zhCN = {
    // 页面元数据
    pageTitle: "趋势研究 - YECO",
    pageDescription: "探索香水行业的最新趋势与深度洞察",

    // 导航 (must match shared/components/Navigation/i18n.js)
    nav: {
        home: "首页",
        trends: "趋势研究"
    },

    // 英雄区
    hero: {
        title: "深度趋势研究",
        subtitle: "数据驱动的设计洞察",
        description: "基于全球社交平台的消费者洞察，为您揭示香水行业的最新趋势与设计方向。我们深入Reddit、Instagram、TikTok等平台，将海量数据转化为可落地的设计策略。",
        scroll: "向下滚动探索"
    },

    // 筛选器
    filters: {
        title: "筛选报告",
        search: {
            placeholder: "搜索报告标题、关键词..."
        },
        category: {
            label: "按类别",
            all: "全部类别"
        },
        region: {
            label: "按地区",
            all: "全部地区"
        },
        sort: {
            label: "排序",
            latest: "最新发布",
            oldest: "最早发布"
        },
        reset: "重置筛选"
    },

    // 报告列表
    reports: {
        title: "研究报告",
        count: "共 {count} 篇报告",
        noResults: "未找到匹配的报告",
        noResultsDesc: "请尝试调整筛选条件或搜索关键词",
        featured: "精选",
        readMore: "阅读报告",
        tags: "标签"
    },

    // 订阅区
    subscribe: {
        title: "订阅趋势研究",
        description: "获取最新的行业洞察与设计趋势，直接发送到您的邮箱",
        emailPlaceholder: "输入您的邮箱",
        button: "订阅",
        success: "订阅成功！",
        error: "订阅失败，请稍后重试"
    },

    // 关于研究
    about: {
        title: "关于我们的研究方法",
        description: "YECO的趋势研究基于严谨的数据科学方法，结合定性与定量分析，深入挖掘消费者真实需求。",
        methods: [
            {
                title: "社交聆听",
                description: "监测Reddit、Instagram等平台的消费者讨论，捕捉真实声音"
            },
            {
                title: "数据分析",
                description: "运用AI技术分析海量数据，识别趋势模式与关键洞察"
            },
            {
                title: "文化洞察",
                description: "深入理解不同地区的文化背景，提供本地化设计建议"
            },
            {
                title: "设计转化",
                description: "将研究洞察转化为可落地的设计策略与创意方向"
            }
        ]
    },

    // 页脚
    footer: {
        logo: "YECO",
        tagline: "世界文化交融的香水包装设计专家",
        copyright: "© 2025 YECO. 保留所有权利",
        location: "总部: 中国"
    },

    // 通用
    common: {
        loading: "加载中...",
        error: "加载失败",
        retry: "重试"
    }
};

// 注册到全局
if (typeof window !== 'undefined') {
    window.trendsTranslations_zhCN = trendsTranslations_zhCN;
}
