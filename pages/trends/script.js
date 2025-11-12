/* ==========================================
   YECO 趋势研究目录页脚本
   功能: 报告加载、筛选、排序、i18n初始化
   ========================================== */

(function() {
    'use strict';

    /* ==========================================
       全局状态
       ========================================== */
    const state = {
        reports: [],
        filteredReports: [],
        currentLang: 'zh-CN',
        filters: {
            search: '',
            category: 'all',
            region: 'all',
            sort: 'latest'
        }
    };

    /* ==========================================
       初始化函数
       ========================================== */
    async function init() {
        console.log('🚀 初始化趋势研究目录页...');

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

            // 2. 加载报告数据
            await loadReports();

            // 3. 初始化筛选器
            initFilters();

            // 4. 初始化事件监听
            initEventListeners();

            // 5. 初始化返回顶部按钮
            initBackToTop();

            console.log('✅ 趋势研究目录页初始化完成');
        } catch (error) {
            console.error('❌ 初始化过程中出错:', error);
            showError();
        }
    }

    /* ==========================================
       1. 初始化 i18n 系统
       ========================================== */
    async function initializeI18n() {
        console.log('🌍 初始化 i18n 系统...');

        // 检查 i18n 实例是否存在
        if (typeof window.i18n === 'undefined') {
            console.error('❌ i18n 系统未加载');
            return;
        }

        try {
            // 合并翻译数据
            const translations = {
                'zh-CN': window.trendsTranslations_zhCN || {},
                'en-US': window.trendsTranslations_enUS || {},
                'ar-SA': window.trendsTranslations_arSA || {}
            };

            // 初始化 i18n
            await window.i18n.init(translations);

            // 监听语言切换事件
            window.i18n.on('languageChanged', (data) => {
                state.currentLang = data.to;
                console.log('🔄 趋势页语言切换到:', state.currentLang);
                renderReports();
                updateFiltersLanguage();
            });

            state.currentLang = window.i18n.currentLang;

            console.log('✅ i18n 系统初始化完成, 当前语言:', state.currentLang);
        } catch (error) {
            console.error('❌ i18n 初始化失败:', error);
        }
    }

    /* ==========================================
       2. 加载报告数据
       ========================================== */
    async function loadReports() {
        console.log('📚 加载报告数据...');

        try {
            const response = await fetch('data/reports-index.json');
            if (!response.ok) {
                throw new Error('Failed to load reports');
            }

            const data = await response.json();
            state.reports = data.reports || [];
            state.categories = data.categories || {};
            state.regions = data.regions || {};

            console.log(`✅ 成功加载 ${state.reports.length} 篇报告`);

            // 初始化筛选结果
            applyFilters();
        } catch (error) {
            console.error('❌ 加载报告失败:', error);
            throw error;
        }
    }

    /* ==========================================
       3. 初始化筛选器
       ========================================== */
    function initFilters() {
        console.log('🔧 初始化筛选器...');

        // 填充类别选项
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter && state.categories) {
            const categories = state.categories[state.currentLang] || state.categories['zh-CN'] || [];
            categoryFilter.innerHTML = categories.map((cat, index) => {
                const value = index === 0 ? 'all' : cat;
                return `<option value="${value}">${cat}</option>`;
            }).join('');
        }

        // 填充地区选项
        const regionFilter = document.getElementById('regionFilter');
        if (regionFilter && state.regions) {
            const regions = state.regions[state.currentLang] || state.regions['zh-CN'] || [];
            regionFilter.innerHTML = regions.map((region, index) => {
                const value = index === 0 ? 'all' : region;
                return `<option value="${value}">${region}</option>`;
            }).join('');
        }
    }

    /* ==========================================
       更新筛选器语言
       ========================================== */
    function updateFiltersLanguage() {
        initFilters();
    }

    /* ==========================================
       4. 初始化事件监听
       ========================================== */
    function initEventListeners() {
        // 搜索输入
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                state.filters.search = e.target.value;
                applyFilters();
            }, 300));
        }

        // 类别筛选
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                state.filters.category = e.target.value;
                applyFilters();
            });
        }

        // 地区筛选
        const regionFilter = document.getElementById('regionFilter');
        if (regionFilter) {
            regionFilter.addEventListener('change', (e) => {
                state.filters.region = e.target.value;
                applyFilters();
            });
        }

        // 排序
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                state.filters.sort = e.target.value;
                applyFilters();
            });
        }

        // 重置按钮
        const resetButton = document.getElementById('resetFilters');
        if (resetButton) {
            resetButton.addEventListener('click', resetFilters);
        }
    }

    /* ==========================================
       应用筛选
       ========================================== */
    function applyFilters() {
        let filtered = [...state.reports];

        // 1. 搜索筛选
        if (state.filters.search) {
            const searchTerm = state.filters.search.toLowerCase();
            filtered = filtered.filter(report => {
                const title = report.title[state.currentLang] || '';
                const subtitle = report.subtitle[state.currentLang] || '';
                const description = report.description[state.currentLang] || '';
                const tags = report.tags[state.currentLang] || [];

                return (
                    title.toLowerCase().includes(searchTerm) ||
                    subtitle.toLowerCase().includes(searchTerm) ||
                    description.toLowerCase().includes(searchTerm) ||
                    tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
            });
        }

        // 2. 类别筛选
        if (state.filters.category !== 'all') {
            filtered = filtered.filter(report => {
                const tags = report.tags[state.currentLang] || [];
                return tags.includes(state.filters.category);
            });
        }

        // 3. 地区筛选
        if (state.filters.region !== 'all') {
            filtered = filtered.filter(report => {
                // 地区映射
                const regionMap = {
                    '中东': 'middleeast',
                    'Middle East': 'middleeast',
                    'الشرق الأوسط': 'middleeast',
                    '亚洲': 'asia',
                    'Asia': 'asia',
                    'آسيا': 'asia',
                    '欧洲': 'europe',
                    'Europe': 'europe',
                    'أوروبا': 'europe',
                    '北美': 'northamerica',
                    'North America': 'northamerica',
                    'أمريكا الشمالية': 'northamerica'
                };

                const targetRegion = regionMap[state.filters.region];
                return targetRegion ? report.region === targetRegion : false;
            });
        }

        // 4. 排序
        if (state.filters.sort === 'latest') {
            filtered.sort((a, b) => {
                const dateA = new Date(a.year, a.month - 1);
                const dateB = new Date(b.year, b.month - 1);
                return dateB - dateA;
            });
        } else if (state.filters.sort === 'oldest') {
            filtered.sort((a, b) => {
                const dateA = new Date(a.year, a.month - 1);
                const dateB = new Date(b.year, b.month - 1);
                return dateA - dateB;
            });
        }

        state.filteredReports = filtered;
        renderReports();
        updateResultsCount();
    }

    /* ==========================================
       重置筛选
       ========================================== */
    function resetFilters() {
        state.filters = {
            search: '',
            category: 'all',
            region: 'all',
            sort: 'latest'
        };

        // 重置UI
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const regionFilter = document.getElementById('regionFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (regionFilter) regionFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'latest';

        applyFilters();
    }

    /* ==========================================
       渲染报告
       ========================================== */
    function renderReports() {
        const grid = document.getElementById('reportsGrid');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');

        if (!grid) return;

        // 隐藏加载状态
        if (loadingState) {
            loadingState.style.display = 'none';
        }

        // 检查是否有报告
        if (state.filteredReports.length === 0) {
            grid.innerHTML = '';
            if (emptyState) {
                emptyState.style.display = 'block';
            }
            return;
        }

        // 隐藏空状态
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        // 渲染报告卡片
        grid.innerHTML = state.filteredReports.map(report => createReportCard(report)).join('');

        // 添加卡片点击事件
        grid.querySelectorAll('.report-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const report = state.filteredReports[index];
                if (report.url) {
                    window.location.href = report.url;
                }
            });
        });
    }

    /* ==========================================
       创建报告卡片
       ========================================== */
    function createReportCard(report) {
        const title = report.title[state.currentLang] || report.title['zh-CN'] || '';
        const subtitle = report.subtitle[state.currentLang] || report.subtitle['zh-CN'] || '';
        const description = report.description[state.currentLang] || report.description['zh-CN'] || '';
        const tags = report.tags[state.currentLang] || report.tags['zh-CN'] || [];

        // 格式化日期
        const date = formatDate(report.year, report.month);

        // 封面图片
        const coverImage = report.coverImage || '';

        // 获取翻译文本
        const featuredText = window.i18n ? window.i18n.t('reports.featured') : '精选';
        const readMoreText = window.i18n ? window.i18n.t('reports.readMore') : '阅读报告';

        // 是否精选
        const featuredClass = report.featured ? ' featured' : '';
        const featuredBadge = report.featured
            ? `<span class="report-badge">${featuredText}</span>`
            : '';

        return `
            <div class="report-card${featuredClass}">
                ${coverImage ? `<img src="${coverImage}" alt="${title}" class="report-cover">` : ''}
                <div class="report-content">
                    ${featuredBadge}
                    <div class="report-date">${date}</div>
                    <h3 class="report-title">${title}</h3>
                    <p class="report-subtitle">${subtitle}</p>
                    <p class="report-description">${description}</p>
                    <div class="report-tags">
                        ${tags.slice(0, 4).map(tag => `<span class="report-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${report.url}" class="report-link">${readMoreText} →</a>
                </div>
            </div>
        `;
    }

    /* ==========================================
       格式化日期
       ========================================== */
    function formatDate(year, month) {
        const lang = state.currentLang;

        if (lang === 'zh-CN') {
            return `${year}年${month}月`;
        } else if (lang === 'en-US') {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthNames[month - 1]} ${year}`;
        } else if (lang === 'ar-SA') {
            const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                              'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
            return `${monthNames[month - 1]} ${year}`;
        }

        return `${year}-${month.toString().padStart(2, '0')}`;
    }

    /* ==========================================
       更新结果统计
       ========================================== */
    function updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        if (!countElement) return;

        const count = state.filteredReports.length;
        const lang = state.currentLang;

        let text = '';
        if (lang === 'zh-CN') {
            text = `共 ${count} 篇报告`;
        } else if (lang === 'en-US') {
            text = `${count} Report${count !== 1 ? 's' : ''}`;
        } else if (lang === 'ar-SA') {
            text = `${count} تقرير`;
        }

        countElement.textContent = text;
    }

    /* ==========================================
       显示错误
       ========================================== */
    function showError() {
        const grid = document.getElementById('reportsGrid');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');

        if (loadingState) {
            loadingState.style.display = 'none';
        }

        if (grid) {
            grid.innerHTML = `
                <div class="error-state">
                    <p data-i18n="common.error">加载失败</p>
                    <button onclick="location.reload()" data-i18n="common.retry">重试</button>
                </div>
            `;
        }
    }

    /* ==========================================
       5. 返回顶部按钮
       ========================================== */
    function initBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;

        // 滚动显示/隐藏
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // 点击返回顶部
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       工具函数
       ========================================== */

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /* ==========================================
       启动应用
       ========================================== */
    init();

})();
