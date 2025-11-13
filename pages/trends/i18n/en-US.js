/* ==========================================
   YECO Trends Directory - English Translation
   ========================================== */

const trendsTranslations_enUS = {
    // Page metadata
    pageTitle: "Trend Research - YECO",
    pageDescription: "Explore the latest trends and deep insights in the perfume industry",

    // Navigation (must match shared/components/Navigation/i18n.js)
    nav: {
        home: "Home",
        trends: "Trend Research"
    },

    // Hero section
    hero: {
        title: "Deep Trend Research",
        subtitle: "Data-Driven Design Insights",
        description: "Based on consumer insights from global social platforms, we reveal the latest trends and design directions in the perfume industry. We dive deep into Reddit, Instagram, TikTok and more, transforming massive data into actionable design strategies.",
        scroll: "Scroll to explore"
    },

    // Filters
    filters: {
        title: "Filter Reports",
        search: {
            placeholder: "Search reports, keywords..."
        },
        category: {
            label: "By Category",
            all: "All Categories"
        },
        region: {
            label: "By Region",
            all: "All Regions"
        },
        sort: {
            label: "Sort",
            latest: "Latest First",
            oldest: "Oldest First"
        },
        reset: "Reset Filters"
    },

    // Reports list
    reports: {
        title: "Research Reports",
        count: "{count} Reports",
        noResults: "No matching reports found",
        noResultsDesc: "Try adjusting your filters or search keywords",
        featured: "Featured",
        readMore: "Read Report",
        tags: "Tags"
    },

    // Subscribe section
    subscribe: {
        title: "Subscribe to Trend Research",
        description: "Get the latest industry insights and design trends delivered to your inbox",
        emailPlaceholder: "Enter your email",
        button: "Subscribe",
        success: "Successfully subscribed!",
        error: "Subscription failed, please try again later"
    },

    // About research
    about: {
        title: "About Our Research Methodology",
        description: "YECO's trend research is based on rigorous data science methods, combining qualitative and quantitative analysis to deeply explore genuine consumer needs.",
        methods: [
            {
                title: "Social Listening",
                description: "Monitor consumer discussions on Reddit, Instagram and more to capture authentic voices"
            },
            {
                title: "Data Analysis",
                description: "Leverage AI technology to analyze massive data, identifying trend patterns and key insights"
            },
            {
                title: "Cultural Insights",
                description: "Deeply understand cultural backgrounds across regions, providing localized design recommendations"
            },
            {
                title: "Design Translation",
                description: "Transform research insights into actionable design strategies and creative directions"
            }
        ]
    },

    // Footer
    footer: {
        logo: "YECO",
        tagline: "Global Cultural Fusion in Perfume Packaging Design",
        copyright: "© 2025 YECO. All rights reserved",
        location: "Headquarters: China"
    },

    // Common
    common: {
        loading: "Loading...",
        error: "Loading failed",
        retry: "Retry"
    }
};

// Register globally
if (typeof window !== 'undefined') {
    window.trendsTranslations_enUS = trendsTranslations_enUS;
}
