// ==========================================
// YECO 香水行业趋势月刊 - 交互脚本
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 滚动动画 - Intersection Observer
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 为了性能,元素出现后停止观察
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要淡入效果的元素
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // ==========================================
    // 统计数字动画
    // ==========================================
    function animateValue(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }

            if (suffix === '$') {
                element.textContent = Math.floor(current) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    // 观察统计数字元素
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent.trim();

                // 解析数字和后缀
                let value, suffix = '';
                if (text.includes('$')) {
                    value = parseInt(text.replace('$', ''));
                    suffix = '$';
                } else if (text.includes('%')) {
                    value = parseInt(text.replace('%', ''));
                    suffix = '%';
                } else {
                    value = parseInt(text);
                }

                if (!isNaN(value)) {
                    element.textContent = '0' + suffix;
                    animateValue(element, 0, value, 2000, suffix);
                }

                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有统计数字
    document.querySelectorAll('.stat-icon, .stat-number').forEach(el => {
        statObserver.observe(el);
    });

    // ==========================================
    // 平滑滚动
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 悬停效果增强
    // ==========================================
    const interactiveCards = document.querySelectorAll(
        '.pillar-card, .case-study, .toc-item, .stat-card, .grail-card, .story-card, .need-item'
    );

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ==========================================
    // 图片占位符交互提示
    // ==========================================
    const placeholders = document.querySelectorAll('.image-placeholder');

    placeholders.forEach(placeholder => {
        // 添加点击提示
        placeholder.style.cursor = 'pointer';
        placeholder.setAttribute('title', '点击查看建议的图片尺寸和类型');

        placeholder.addEventListener('click', function() {
            const text = this.querySelector('.placeholder-text p');
            if (text) {
                // 添加点击反馈
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });

        // 悬停效果
        placeholder.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(212, 175, 55, 0.5)';
            this.style.transition = 'border-color 0.3s ease';
        });

        placeholder.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        });
    });

    // ==========================================
    // 引用文本动画
    // ==========================================
    const quotes = document.querySelectorAll('.case-quote, .insight-quote, .final-quote');

    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);

                quoteObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    quotes.forEach(quote => {
        quoteObserver.observe(quote);
    });

    // ==========================================
    // 案例研究卡片展开/收起 (可选功能)
    // ==========================================
    const caseStudies = document.querySelectorAll('.case-study');

    caseStudies.forEach(caseStudy => {
        const header = caseStudy.querySelector('.case-header');
        if (header) {
            // 可以添加展开/收起功能
            // 这里保持简单,只添加视觉反馈
            header.style.cursor = 'pointer';
        }
    });

    // ==========================================
    // 关键词标签交互
    // ==========================================
    const keywords = document.querySelectorAll('.keyword');

    keywords.forEach(keyword => {
        keyword.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.borderColor = 'var(--accent-gold)';
            this.style.color = 'var(--accent-gold)';
            this.style.transition = 'all 0.2s ease';
        });

        keyword.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'var(--dark-gray)';
            this.style.color = 'var(--warm-gray)';
        });
    });

    // ==========================================
    // 目录项点击滚动
    // ==========================================
    const tocItems = document.querySelectorAll('.toc-item');
    const sections = {
        0: '.executive-summary',
        1: '.design-analysis',
        2: '.case-studies',
        3: '.narrative-trends',
        4: '.user-dynamics'
    };

    tocItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const targetSection = document.querySelector(sections[index]);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 进度指示器 (滚动进度)
    // ==========================================
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-gold), var(--soft-gold));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createProgressBar();

    // ==========================================
    // 返回顶部按钮 (可选)
    // ==========================================
    function createBackToTop() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 50px;
            height: 50px;
            background: var(--accent-gold);
            color: var(--primary-black);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
    }

    createBackToTop();

    // ==========================================
    // 图片懒加载准备 (为后续添加真实图片做准备)
    // ==========================================
    function prepareLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    prepareLazyLoading();

    // ==========================================
    // 打印优化
    // ==========================================
    window.addEventListener('beforeprint', () => {
        // 在打印前展开所有内容
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    });

    // ==========================================
    // 性能优化 - 防抖函数
    // ==========================================
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

    // 优化窗口调整大小事件
    window.addEventListener('resize', debounce(() => {
        // 这里可以添加响应式调整逻辑
        console.log('Window resized');
    }, 250));

    // ==========================================
    // 控制台信息
    // ==========================================
    console.log('%c YECO 香水行业趋势月刊 ', 'background: #D4AF37; color: #000; font-size: 16px; font-weight: bold; padding: 10px;');
    console.log('%c Version 2.0 - 高端奢侈品杂志风格 ', 'background: #000; color: #D4AF37; font-size: 12px; padding: 5px;');
    console.log('%c 图片占位符说明: ', 'color: #D4AF37; font-weight: bold;');
    console.log('所有标记为"📷"的区域为图片占位符,请根据提示尺寸上传相应图片');
    console.log('图片格式建议: JPG/PNG, 高质量, 符合奢侈品杂志美学标准');

    // ==========================================
    // 辅助功能 - 键盘导航
    // ==========================================
    document.addEventListener('keydown', (e) => {
        // 空格键或Page Down: 向下滚动
        if (e.code === 'Space' || e.code === 'PageDown') {
            if (e.code === 'Space') e.preventDefault();
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }

        // Page Up: 向上滚动
        if (e.code === 'PageUp') {
            window.scrollBy({
                top: -window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }

        // Home: 返回顶部
        if (e.code === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // End: 滚动到底部
        if (e.code === 'End' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    });

    // ==========================================
    // 暗色模式切换 (预留功能)
    // ==========================================
    function initDarkModeToggle() {
        // 已经是暗色主题,这里预留切换功能
        // 可以添加一个切换按钮在未来版本中
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        console.log('用户系统偏好暗色模式:', prefersDark.matches);
    }

    initDarkModeToggle();

    // ==========================================
    // 数据收集 (页面浏览分析 - 可选)
    // ==========================================
    function trackSectionViews() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionTitle = entry.target.querySelector('.section-title');
                    if (sectionTitle) {
                        console.log('查看章节:', sectionTitle.textContent);
                        // 这里可以集成分析工具
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    trackSectionViews();

});

// ==========================================
// 导出图片占位符信息 (开发辅助)
// ==========================================
function exportPlaceholderInfo() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    const info = [];

    placeholders.forEach((ph, index) => {
        const text = ph.querySelector('.placeholder-text p');
        const size = ph.querySelector('.placeholder-text span');

        info.push({
            index: index + 1,
            description: text ? text.textContent : '未命名',
            size: size ? size.textContent : '未指定尺寸',
            location: ph.closest('section') ? ph.closest('section').className : '未知位置'
        });
    });

    console.table(info);
    return info;
}

// 在控制台输入 exportPlaceholderInfo() 可以查看所有占位符信息
window.exportPlaceholderInfo = exportPlaceholderInfo;

// ==========================================
// 国际化 (i18n) 功能
// ==========================================

// 语言数据映射 - 使用函数延迟获取,确保语言包已加载
function getI18nData() {
    return {
        'zh-CN': window.zhCN || null,
        'en-US': window.enUS || null,
        'ar-SA': window.arSA || null
    };
}

// 当前语言
let currentLanguage = 'zh-CN';

// 更新页面文本内容
function updatePageContent(lang) {
    const i18nData = getI18nData();
    const data = i18nData[lang];
    if (!data) {
        console.error('语言包未找到:', lang);
        return;
    }

    // 更新页面标题
    document.title = data.pageTitle;
    document.documentElement.lang = lang;

    // 更新封面
    updateElement('.cover-logo', data.cover.logo);
    updateElement('.cover-title', data.cover.title);
    updateElement('.cover-subtitle', data.cover.subtitle);
    updateElement('.cover-subtitle-en', data.cover.subtitleEn);
    updateElement('.issue-number', data.cover.issueNumber);
    updateElement('.issue-date', data.cover.issueDate);
    updateElement('.issue-region', data.cover.issueRegion);

    // 更新目录
    updateElement('.toc-title', data.toc.title);
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, index) => {
        if (data.toc.items[index]) {
            const title = item.querySelector('h3');
            const desc = item.querySelector('p');
            if (title) title.textContent = data.toc.items[index].title;
            if (desc) desc.textContent = data.toc.items[index].desc;
        }
    });

    // 更新执行摘要
    updateSectionTitle('.executive-summary', data.executive.sectionNumber, data.executive.sectionTitle);
    updateElement('.executive-summary .feature-title', data.executive.featureTitle);

    // 更新执行摘要的详细文本
    const featureText = document.querySelector('.executive-summary .feature-text');
    if (featureText && data.executive.featureText) {
        featureText.innerHTML = `${data.executive.featureText}
                        <span class="highlight">${data.executive.featureHighlight}</span>${data.executive.featureTextEnd}`;
    }

    // 更新三大支柱
    updateElement('.pillars-section .subsection-title', data.executive.pillarsTitle);
    updatePillars(data.executive);

    // 更新关键统计
    updateStats(data.executive.stats);

    // 更新设计美学分析
    updateSectionTitle('.design-analysis', data.design.sectionNumber, data.design.sectionTitle);
    updateElement('.design-analysis .section-subtitle', data.design.sectionSubtitle);
    updateSevenSins(data.design.sevenSins);
    updateGrail(data.design.grail);

    // 更新品牌案例研究
    updateSectionTitle('.case-studies', data.cases.sectionNumber, data.cases.sectionTitle);
    updateElement('.case-studies .section-subtitle', data.cases.sectionSubtitle);
    updateCaseStudies(data.cases);

    // 更新叙事趋势
    updateSectionTitle('.narrative-trends', data.narrative.sectionNumber, data.narrative.sectionTitle);
    updateElement('.narrative-trends .section-subtitle', data.narrative.sectionSubtitle);
    updateNarrative(data.narrative);

    // 更新用户动态
    updateSectionTitle('.user-dynamics', data.user.sectionNumber, data.user.sectionTitle);
    updateElement('.user-dynamics .section-subtitle', data.user.sectionSubtitle);
    updateUserDynamics(data.user);

    // 更新结语
    updateElement('.final-quote', data.conclusion.quote);

    // 更新页脚
    updateElement('.footer-logo', data.footer.logo);
    updateElement('.footer-tagline', data.footer.tagline);
    updateFooter(data.footer);
}

// 辅助函数: 更新元素文本
function updateElement(selector, text) {
    const element = document.querySelector(selector);
    if (element && text !== undefined) {
        element.textContent = text;
    }
}

// 更新章节标题
function updateSectionTitle(sectionSelector, number, title) {
    const section = document.querySelector(sectionSelector);
    if (section) {
        const numberEl = section.querySelector('.section-number');
        const titleEl = section.querySelector('.section-title');
        if (numberEl) numberEl.textContent = number;
        if (titleEl) titleEl.textContent = title;
    }
}

// 更新三大支柱
function updatePillars(data) {
    const pillars = document.querySelectorAll('.pillar-row');
    const placeholderTexts = ['designAesthetics', 'narrativeTrend', 'userDynamics'];

    [data.pillar1, data.pillar2, data.pillar3].forEach((pillar, index) => {
        if (pillars[index] && pillar) {
            const title = pillars[index].querySelector('h4');
            const paragraph = pillars[index].querySelector('.pillar-content > p');
            const stat = pillars[index].querySelector('.stat-number');
            const label = pillars[index].querySelector('.stat-label');

            if (title) title.textContent = pillar.title;
            if (stat) stat.textContent = pillar.statNumber;
            if (label) label.textContent = pillar.statLabel;

            // 更新placeholder文本
            const placeholderText = pillars[index].querySelector('.placeholder-text p');
            if (placeholderText && data.placeholders) {
                placeholderText.textContent = data.placeholders[placeholderTexts[index]];
            }

            // 更新段落内容 - 处理带有highlight的文本
            if (paragraph && pillar.desc) {
                if (index === 0) {
                    // 支柱1
                    paragraph.innerHTML = `${pillar.desc}<span class="highlight">${pillar.highlight}</span>${pillar.descEnd}`;
                } else if (index === 1) {
                    // 支柱2
                    paragraph.innerHTML = `${pillar.desc}<span class="highlight">${pillar.highlight1}</span>${pillar.middle}<span class="highlight">${pillar.highlight2}</span>${pillar.descEnd}`;
                } else if (index === 2) {
                    // 支柱3
                    paragraph.innerHTML = `${pillar.desc}<span class="highlight">${pillar.highlight}</span>${pillar.descEnd}`;
                }
            }
        }
    });
}

// 更新统计数据
function updateStats(stats) {
    const statCards = document.querySelectorAll('.key-stats .stat-card');
    stats.forEach((stat, index) => {
        if (statCards[index]) {
            const icon = statCards[index].querySelector('.stat-icon');
            const label = statCards[index].querySelector('.stat-label');
            if (icon) icon.textContent = stat.icon;
            if (label) label.textContent = stat.label;
        }
    });
}

// 更新七宗罪
function updateSevenSins(data) {
    const block = document.querySelector('.analysis-block');
    if (block) {
        const title = block.querySelector('h3');
        const badge = block.querySelector('.verdict-badge');
        if (title) title.textContent = data.title;
        if (badge) badge.textContent = data.badge;

        const sins = block.querySelectorAll('.sin-item');
        data.sins.forEach((sin, index) => {
            if (sins[index]) {
                const titleEl = sins[index].querySelector('h4');
                const descEl = sins[index].querySelector('p');
                if (titleEl) titleEl.textContent = sin.title;
                if (descEl) descEl.textContent = sin.desc;
            }
        });
    }
}

// 更新圣杯
function updateGrail(data) {
    const grailBlock = document.querySelectorAll('.analysis-block')[1];
    if (grailBlock) {
        const title = grailBlock.querySelector('h3');
        const badge = grailBlock.querySelector('.verdict-badge');
        if (title) title.textContent = data.title;
        if (badge) badge.textContent = data.badge;

        const cards = grailBlock.querySelectorAll('.grail-card');
        data.items.forEach((item, index) => {
            if (cards[index]) {
                const titleEl = cards[index].querySelector('h4');
                const descEl = cards[index].querySelector('.grail-content p');
                const placeholderText = cards[index].querySelector('.placeholder-text p');

                if (titleEl) titleEl.textContent = item.title;
                if (descEl) descEl.textContent = item.desc;
                if (placeholderText && item.placeholder) {
                    placeholderText.textContent = item.placeholder;
                }
            }
        });
    }
}

// 更新案例研究
function updateCaseStudies(data) {
    // Replica 成功案例
    const replica = document.querySelector('.case-study.success');
    if (replica && data.replica) {
        updateElement('.case-study.success h3', data.replica.title);
        updateElement('.case-study.success .case-subtitle', data.replica.subtitle);
        updateElement('.case-study.success .verdict-badge', data.replica.badge);
        updateElement('.case-study.success .case-quote', data.replica.quote);

        // 更新设计元素列表
        const designTitle = replica.querySelector('.case-section h4');
        if (designTitle) designTitle.textContent = data.replica.designTitle;

        const designItems = replica.querySelectorAll('.elegant-list li');
        if (data.replica.designItems && designItems.length >= 3) {
            designItems[0].innerHTML = `<strong>${data.replica.designItems[0].label}</strong>${data.replica.designItems[0].text}`;
            designItems[1].innerHTML = `<strong>${data.replica.designItems[1].label}</strong>${data.replica.designItems[1].text}`;
            designItems[2].innerHTML = `<strong>${data.replica.designItems[2].label}</strong>${data.replica.designItems[2].text}`;
        }

        // 更新消费者感知
        const perceptionTitle = replica.querySelectorAll('.case-section h4')[1];
        if (perceptionTitle) perceptionTitle.textContent = data.replica.perceptionTitle;

        const perceptionText = replica.querySelectorAll('.case-section p')[0];
        if (perceptionText && data.replica.perceptionText) {
            perceptionText.textContent = data.replica.perceptionText;
        }
    }

    // Byredo 失败案例
    const byredo = document.querySelector('.case-study.failure');
    if (byredo && data.byredo) {
        updateElement('.case-study.failure h3', data.byredo.title);
        updateElement('.case-study.failure .case-subtitle', data.byredo.subtitle);
        updateElement('.case-study.failure .verdict-badge', data.byredo.badge);
        updateElement('.case-study.failure .case-quote', data.byredo.quote);

        // 更新评价标题
        const evalTitle = byredo.querySelector('.case-section h4');
        if (evalTitle) evalTitle.textContent = data.byredo.evalTitle;

        // 更新评价列表
        const evalList = byredo.querySelector('.elegant-list.negative');
        if (evalList && data.byredo.evalItems) {
            const items = evalList.querySelectorAll('li');
            if (items.length >= 3) {
                items[0].innerHTML = `${data.byredo.evalItems[0]}<strong>${data.byredo.evalItems[1]}</strong>`;
                items[1].innerHTML = `${data.byredo.evalItems[2]}<strong>${data.byredo.evalItems[3]}</strong>${data.byredo.evalItems[4]}`;
                items[2].textContent = data.byredo.evalItems[5];
            }
        }
    }

    // Xerjoff 品控危机
    const xerjoff = document.querySelector('.case-study.mixed');
    if (xerjoff && data.xerjoff) {
        updateElement('.case-study.mixed h3', data.xerjoff.title);
        updateElement('.case-study.mixed .case-subtitle', data.xerjoff.subtitle);
        const badges = xerjoff.querySelectorAll('.verdict-badge');
        if (badges[0]) badges[0].textContent = data.xerjoff.badge;

        // 更新失败标题
        const failureTitle = xerjoff.querySelector('.case-section h4');
        if (failureTitle) failureTitle.textContent = data.xerjoff.failureTitle;

        // 更新失败列表
        const failureList = xerjoff.querySelector('.elegant-list.negative');
        if (failureList && data.xerjoff.failureItems) {
            const items = failureList.querySelectorAll('li');
            if (items.length >= 4) {
                items[0].textContent = data.xerjoff.failureItems[0];
                items[1].textContent = data.xerjoff.failureItems[1];
                items[2].textContent = data.xerjoff.failureItems[2];
                items[3].innerHTML = `${data.xerjoff.failureItems[3]}<strong>${data.xerjoff.failureItems[4]}</strong>`;
            }
        }

        // 更新警告框
        const warningTitle = xerjoff.querySelector('.warning-content h5');
        if (warningTitle) warningTitle.textContent = data.xerjoff.warningTitle;

        const warningText = xerjoff.querySelector('.warning-content p');
        if (warningText && data.xerjoff.warningText) {
            warningText.innerHTML = `${data.xerjoff.warningText}<strong>${data.xerjoff.warningAmount}</strong>${data.xerjoff.warningTextEnd}`;
        }
    }

    // Lattafa 案例
    const lattafa = document.querySelectorAll('.case-study.mixed')[1];
    if (lattafa && data.lattafa) {
        const h3 = lattafa.querySelector('h3');
        const subtitle = lattafa.querySelector('.case-subtitle');
        const badge = lattafa.querySelector('.verdict-badge');

        if (h3) h3.textContent = data.lattafa.title;
        if (subtitle) subtitle.textContent = data.lattafa.subtitle;
        if (badge) badge.textContent = data.lattafa.badge;

        // 更新赞誉部分
        const praiseTitle = lattafa.querySelector('.success-column h4');
        if (praiseTitle) praiseTitle.textContent = data.lattafa.praiseTitle;

        const praiseText = lattafa.querySelector('.success-column p');
        if (praiseText) praiseText.textContent = data.lattafa.praiseText;

        // 更新翻车部分
        const failTitle = lattafa.querySelector('.failure-column h4');
        if (failTitle) failTitle.textContent = data.lattafa.failureTitle;

        const failList = lattafa.querySelector('.compact-list');
        if (failList && data.lattafa.failureItems) {
            const items = failList.querySelectorAll('li');
            data.lattafa.failureItems.forEach((text, idx) => {
                if (items[idx]) items[idx].textContent = text;
            });
        }

        // 更新placeholder
        if (data.lattafa.placeholders) {
            const productPlaceholder = lattafa.querySelector('.success-column .placeholder-text p');
            const packagingPlaceholder = lattafa.querySelector('.failure-column .placeholder-text p');
            if (productPlaceholder) productPlaceholder.textContent = data.lattafa.placeholders.product;
            if (packagingPlaceholder) packagingPlaceholder.textContent = data.lattafa.placeholders.packaging;
        }

        const quote = lattafa.querySelector('.case-quote');
        if (quote) quote.textContent = data.lattafa.quote;
    }
}

// 更新叙事趋势
function updateNarrative(data) {
    if (data.intro) {
        updateElement('.trend-content h3', data.intro.title);
        const largeText = document.querySelector('.trend-content .large-text');
        if (largeText && data.intro.textStart) {
            largeText.innerHTML = `${data.intro.textStart}<span class="highlight">${data.intro.highlight1}</span>${data.intro.textMiddle}<span class="highlight">${data.intro.highlight2}</span>${data.intro.textEnd}`;
        }
        const trendDesc = document.querySelector('.trend-content > p:not(.large-text)');
        if (trendDesc) trendDesc.textContent = data.intro.desc;

        // 更新placeholder
        const placeholderText = document.querySelector('.trend-intro .placeholder-text p');
        if (placeholderText && data.intro.placeholder) {
            placeholderText.textContent = data.intro.placeholder;
        }
    }

    if (data.vibes) {
        updateElement('.vibe-showcase .subsection-title', data.vibes.title);
        const vibeCards = document.querySelectorAll('.vibe-card');
        data.vibes.items.forEach((vibe, index) => {
            if (vibeCards[index]) {
                const title = vibeCards[index].querySelector('h4');
                const tag = vibeCards[index].querySelector('.vibe-tag');
                const emotionLabel = vibeCards[index].querySelector('.vibe-emotions strong');
                const emotionText = vibeCards[index].querySelector('.vibe-emotions');
                const brandsLabel = vibeCards[index].querySelector('.vibe-brands strong');
                const brandsText = vibeCards[index].querySelector('.vibe-brands');

                if (title) title.textContent = vibe.title;
                if (tag) tag.textContent = vibe.tag;
                if (emotionLabel) emotionLabel.textContent = data.vibes.emotionLabel;
                if (emotionText) emotionText.innerHTML = `<strong>${data.vibes.emotionLabel}</strong> ${vibe.emotions}`;
                if (brandsLabel) brandsLabel.textContent = data.vibes.brandsLabel;
                if (brandsText) brandsText.innerHTML = `<strong>${data.vibes.brandsLabel}</strong> ${vibe.brands}`;

                // 更新关键词
                const keywordsContainer = vibeCards[index].querySelector('.vibe-keywords');
                if (keywordsContainer && vibe.keywords) {
                    keywordsContainer.innerHTML = vibe.keywords.map(keyword =>
                        `<span class="keyword">${keyword}</span>`
                    ).join('');
                }
            }
        });
    }

    if (data.storytelling) {
        updateElement('.brand-storytelling .subsection-title', data.storytelling.title);
        updateElement('.brand-storytelling .intro-text', data.storytelling.intro);

        const storyCards = document.querySelectorAll('.story-card');
        data.storytelling.brands.forEach((brand, index) => {
            if (storyCards[index]) {
                const title = storyCards[index].querySelector('.story-content h4');
                const desc = storyCards[index].querySelector('.story-content p');
                const placeholderText = storyCards[index].querySelector('.placeholder-text p');

                if (title) title.textContent = brand.title;
                if (desc) desc.textContent = brand.desc;
                if (placeholderText && brand.placeholder) {
                    placeholderText.textContent = brand.placeholder;
                }
            }
        });
    }
}

// 更新用户动态
function updateUserDynamics(data) {
    if (data.conflict) {
        const conflictBlock = document.querySelector('.dynamic-block');
        if (conflictBlock) {
            updateElement('.dynamic-block h3', data.conflict.title);
            updateElement('.dynamic-block .dynamic-stat', data.conflict.stat);
            updateElement('.dynamic-block .insight-quote', data.conflict.quote);

            // 更新冲突品牌标题
            const brandsTitle = conflictBlock.querySelector('.conflict-brands h4');
            if (brandsTitle) brandsTitle.textContent = data.conflict.brandsTitle;

            // 更新品牌列表
            const brandList = conflictBlock.querySelectorAll('.conflict-list li');
            data.conflict.brands.forEach((brand, index) => {
                if (brandList[index]) {
                    brandList[index].innerHTML = `<strong>${brand.name}</strong> - ${brand.quote}`;
                }
            });

            // 更新应对行为标题
            const copingTitle = conflictBlock.querySelector('.coping-mechanisms h4');
            if (copingTitle) copingTitle.textContent = data.conflict.copingTitle;

            // 更新应对行为
            const copingItems = conflictBlock.querySelectorAll('.coping-item');
            data.conflict.copingItems.forEach((item, index) => {
                if (copingItems[index]) {
                    const title = copingItems[index].querySelector('h5');
                    const desc = copingItems[index].querySelector('p');
                    if (title) title.textContent = item.title;
                    if (desc) desc.textContent = item.desc;
                }
            });
        }
    }

    if (data.veto) {
        const vetoBlocks = document.querySelectorAll('.dynamic-block');
        if (vetoBlocks[1]) {
            const title = vetoBlocks[1].querySelector('h3');
            if (title) title.textContent = data.veto.title;

            // 更新引用
            const quoteCards = vetoBlocks[1].querySelectorAll('.quote-card p');
            data.veto.quotes.forEach((quote, index) => {
                if (quoteCards[index]) quoteCards[index].textContent = quote;
            });
        }
    }

    if (data.practical) {
        const practicalBlock = document.querySelectorAll('.dynamic-block')[2];
        if (practicalBlock) {
            const title = practicalBlock.querySelector('h3');
            const subtitle = practicalBlock.querySelector('.header-subtitle');
            if (title) title.textContent = data.practical.title;
            if (subtitle) subtitle.textContent = data.practical.subtitle;

            // 更新实用需求
            const needItems = practicalBlock.querySelectorAll('.need-item');
            data.practical.needs.forEach((need, index) => {
                if (needItems[index]) {
                    const titleEl = needItems[index].querySelector('h4');
                    const descEl = needItems[index].querySelector('p');

                    if (titleEl) titleEl.textContent = need.title;

                    if (descEl && need.desc) {
                        if (need.highlight) {
                            descEl.innerHTML = `${need.desc}<strong>${need.highlight}</strong>`;
                        } else if (need.highlight1) {
                            descEl.innerHTML = `${need.desc}<strong>${need.highlight1}</strong>${need.middle}<strong>${need.highlight2}</strong>${need.descEnd || ''}`;
                        } else if (need.descEnd) {
                            descEl.innerHTML = `${need.desc}<strong>${need.highlight}</strong>${need.descEnd}`;
                        } else {
                            descEl.textContent = need.desc;
                        }
                    }
                }
            });
        }
    }

    if (data.opportunity) {
        const oppBlock = document.querySelector('.opportunity-block');
        if (oppBlock) {
            updateElement('.opportunity-block h3', data.opportunity.title);
            updateElement('.opportunity-block .opportunity-badge', data.opportunity.badge);

            const caseTitle = oppBlock.querySelector('.case-highlight h4');
            if (caseTitle) caseTitle.textContent = data.opportunity.caseTitle;

            const caseDesc = oppBlock.querySelector('.case-highlight p');
            if (caseDesc) caseDesc.textContent = data.opportunity.caseDesc;

            const reactionLabel = oppBlock.querySelector('.consumer-reaction strong');
            const reactionText = oppBlock.querySelector('.consumer-reaction');
            if (reactionLabel) reactionLabel.textContent = data.opportunity.reactionLabel;
            if (reactionText) {
                reactionText.innerHTML = `<strong>${data.opportunity.reactionLabel}</strong>${data.opportunity.reactionText}`;
            }

            const quote = oppBlock.querySelector('.insight-quote');
            if (quote && data.opportunity.quote) {
                quote.innerHTML = `${data.opportunity.quote}<strong>${data.opportunity.quoteHighlight}</strong>${data.opportunity.quoteEnd}`;
            }
        }
    }
}

// 更新页脚
function updateFooter(data) {
    const metaSpans = document.querySelectorAll('.footer-meta > span:not(.separator)');
    if (metaSpans[0]) metaSpans[0].textContent = data.copyright;
    if (metaSpans[1]) metaSpans[1].textContent = data.source;
    if (metaSpans[2]) metaSpans[2].textContent = data.region;
}

// 语言切换功能
function switchLanguage(lang) {
    console.log('=== switchLanguage 被调用 ===');
    console.log('目标语言:', lang);
    console.log('当前语言:', currentLanguage);

    const i18nData = getI18nData();
    console.log('可用语言包:', Object.keys(i18nData));
    console.log('window.zhCN存在:', !!window.zhCN);
    console.log('window.enUS存在:', !!window.enUS);
    console.log('语言包是否存在:', !!i18nData[lang]);

    if (!i18nData[lang]) {
        console.error('语言包未找到:', lang);
        console.error('window.zhCN:', window.zhCN);
        console.error('window.enUS:', window.enUS);
        return;
    }

    // 更新当前语言
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    console.log('已保存语言到localStorage:', localStorage.getItem('language'));

    // 设置HTML lang属性（用于RTL支持）
    const langCode = lang === 'ar-SA' ? 'ar' : lang === 'zh-CN' ? 'zh' : 'en';
    document.documentElement.setAttribute('lang', langCode);
    console.log('设置HTML lang属性为:', langCode);

    // 更新页面内容
    console.log('开始更新页面内容...');
    updatePageContent(lang);

    // 更新切换器状态
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.lang === lang) {
            tab.classList.add('active');
            console.log('激活tab:', lang);
        }
    });

    console.log('=== 语言切换完成 ===');
}

// 导出语言切换函数供外部使用
window.switchLanguage = switchLanguage;

// 初始化语言切换器
(function initI18n() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLanguageSwitcher);
    } else {
        setupLanguageSwitcher();
    }

    function setupLanguageSwitcher() {
        // 绑定语言切换事件
        document.querySelectorAll('.lang-tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                console.log('切换语言到:', lang);
                switchLanguage(lang);
            });
        });

        // 延迟初始化语言，确保所有DOM都已加载
        setTimeout(() => {
            const savedLang = localStorage.getItem('language') || 'zh-CN';
            console.log('初始化语言:', savedLang);
            switchLanguage(savedLang);
        }, 100);
    }
})();