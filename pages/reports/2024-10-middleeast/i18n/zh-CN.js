// 中文语言包
const zhCN = {
    // 页面标题
    pageTitle: "YECO - 香水行业趋势10月月刊 - 中东版",

    // 封面
    cover: {
        logo: "YECO",
        title: "香水行业趋势月刊",
        subtitle: "解码香水消费者的灵魂",
        subtitleEn: "Decoding the Soul of Perfume Consumers",
        placeholderCover: "封面主视觉",
        placeholderSize: "建议尺寸: 1920x1080px",
        issueNumber: "第01期",
        issueDate: "2025年10月",
        issueRegion: "中东版"
    },

    // 目录
    toc: {
        title: "本期内容",
        items: [
            { number: "01", title: "执行摘要", desc: "香水作为【图腾物件】的市场转变" },
            { number: "02", title: "设计美学分析", desc: "渴望的形态与美学的战场" },
            { number: "03", title: "品牌案例研究", desc: "赞誉、矛盾与【翻车】" },
            { number: "04", title: "叙事趋势", desc: "从【品牌故事】到【个人氛围】" },
            { number: "05", title: "用户动态", desc: "核心需求与未满足的期待" }
        ]
    },

    // 执行摘要
    executive: {
        sectionNumber: "01",
        sectionTitle: "摘要",
        featureTitle: "香水作为【图腾物件】",
        featureText: "本报告基于对Reddit香水社区的深度定性分析,揭示了一个核心的市场转变:",
        featureHighlight: "香水瓶身正从一个单纯的【容器】演变为一个【图腾物件】",
        featureTextEnd: "。当今的消费者购买的不仅是嗅觉体验,更是一种美学表达、一种叙事工具和一种身份徽章。",

        pillarsTitle: "三大核心支柱",
        pillar1: {
            number: "01",
            title: "设计美学",
            desc: "瓶身设计已成为品牌的第一道",
            highlight: "【守门人】",
            descEnd: "。消费者对【廉价感】有着高度一致的共识,例如对Carolina Herrera Good Girl【高跟鞋】造型的普遍嘲讽。与此同时,他们极度渴望【艺术品】级的设计,将Dries Van Noten或Argos的瓶身誉为【博物馆藏品】。",
            statNumber: "85%",
            statLabel: "消费者认为瓶身设计影响购买决策"
        },
        pillar2: {
            number: "02",
            title: "叙事趋势",
            desc: "市场正在经历一场从",
            highlight1: "【品牌讲述的故事】",
            middle: "到",
            highlight2: "【消费者寻求的氛围】",
            descEnd: "的深刻变革。消费者不再被动接受营销信息,而是主动提问:【我如何才能闻起来像'旧书图书馆'、'森林女巫'或'雨后泥土'?】",
            statNumber: "72%",
            statLabel: "消费者寻求特定【氛围】而非单纯香调"
        },
        pillar3: {
            number: "03",
            title: "用户动态",
            desc: "美学与叙事正在直接驱动(或阻碍)购买行为。分析发现了一种强大的",
            highlight: "【美学否决权】",
            descEnd: ",即消费者会因为瓶身设计【无聊】而拒绝试用甚至完全忽视某些高端品牌,如Byredo和Nishane。",
            statNumber: "68%",
            statLabel: "消费者经历【爱香味,恨瓶子】的冲突"
        },

        stats: [
            { icon: "7", label: "设计的【七宗罪】" },
            { icon: "4", label: "美学【圣杯】标准" },
            { icon: "3", label: "高频【氛围】需求" },
            { icon: "250$", label: "高端品牌品控期望" }
        ],

        placeholders: {
            coreInsight: "核心洞察配图",
            coreInsightDesc: "奢华香水瓶特写 | 1200x800px",
            designAesthetics: "设计美学",
            narrativeTrend: "叙事趋势",
            userDynamics: "用户动态",
            size800x600: "800x600px"
        }
    },

    // 设计美学分析
    design: {
        sectionNumber: "02",
        sectionTitle: "瓶身美学分析",
        sectionSubtitle: "渴望的形态与美学的战场",

        sevenSins: {
            title: "设计的【七宗罪】】",
            badge: "消费者排斥",
            placeholder: "【廉价感】案例",
            placeholderSize: "600x800px",
            sins: [
                {
                    number: "01",
                    title: "刻意模仿荒谬物品",
                    desc: "Carolina Herrera Good Girl的【高跟鞋】造型被批评为【奇怪】、【荒谬】,带来【尴尬的50度灰氛围】。Marc Jacobs Decadence的【手提包】设计同样被指【太俗气】。"
                },
                {
                    number: "02",
                    title: "幼稚化与卡通化",
                    desc: "Paco Rabanne Phantom的【机器人】瓶身,Lattafa Yara的亮粉色被形容为【幼稚】、【像儿童玩具】,甚至【让我想到生猪排】。"
                },
                {
                    number: "03",
                    title: "过度夸张的【Bling】",
                    desc: "Paco Rabanne One Million的【金条】造型,Roja Doves瓶盖上的【水钻】,Bond No.9被普遍认为【丑陋的】、【过于花哨和俗气】。"
                },
                {
                    number: "04",
                    title: "廉价的材料质感",
                    desc: "Gucci Rush的【红色塑料块】被形象地比作【该死的乐高积木】。在香水这一高度感官化的品类中,触感上的【塑料感】是不可饶恕的【原罪】。"
                }
            ]
        },

        grail: {
            title: "设计的【圣杯】",
            badge: "消费者推崇",
            items: [
                {
                    title: "艺术与神话概念",
                    desc: "Argos品牌瓶身上的艺术品,如【维纳斯的诞生】和【法厄同的陨落】,被形容为【真正令人惊叹】。",
                    placeholder: "艺术概念"
                },
                {
                    title: "雕塑感与独特性",
                    desc: "Dries Van Noten的瓶子被用户形容为【我第一次看到照片时,我以为它是一个博物馆展品】。",
                    placeholder: "雕塑形态"
                },
                {
                    title: "经典与永恒",
                    desc: "Guerlain的Shalimar瓶被描述为【不仅漂亮,而且如此具有标志性】。历史悠久的【蜂瓶】也被视为永恒经典的代表。",
                    placeholder: "经典永恒"
                },
                {
                    title: "现代极简的【图腾】",
                    desc: "Tom Ford Private Blend的【棋子】风格瓶身,虽然【朴素简单】,但被认为是【标志性的】。",
                    placeholder: "现代图腾"
                }
            ],
            placeholderSize: "500x500px"
        }
    },

    // 品牌案例研究
    cases: {
        sectionNumber: "03",
        sectionTitle: "品牌案例研究",
        sectionSubtitle: "赞誉、矛盾与【翻车】",

        replica: {
            title: "Maison Margiela Replica",
            subtitle: "成功的【氛围极简主义】",
            badge: "成功案例",
            designTitle: "设计元素解码",
            designItems: [
                { label: "形态:", text: " 【药剂瓶】形态 - 带有复古、专业的医疗或炼金术内涵" },
                { label: "标签:", text: " 【织物标签】 - 在视觉和触觉上与行业标准形成鲜明对比,消费者称【非常舒适】" },
                { label: "字体:", text: " 【打字机字体】 - 强化复古和叙事属性" }
            ],
            perceptionTitle: "消费者感知",
            perceptionText: "这种【药剂瓶+织物标签+打字机字体】的设计组合成功唤起了【怀旧感】。消费者将其与【旅行者】、【旧火车】、【皮革日记本和钢笔】等具体意象联系起来。一位用户精准地总结道,这个瓶子感觉【就像一个日志条目】。",
            quote: "Replica的成功在于其【多感官】的极简主义。品牌不仅在视觉上做减法,更在触觉和智力上做加法,创造了一种【有温度】的极简主义。",
            placeholders: {
                product: "Replica产品图",
                label: "织物标签特写",
                detail: "瓶身细节",
                size700: "700x500px",
                size300: "300x300px"
            }
        },

        byredo: {
            title: "Byredo & Nishane",
            subtitle: "被【美学否决】的【无聊极简主义】",
            badge: "【翻车】案例",
            evalTitle: "消费者评价",
            evalItems: [
                "瓶子被形容为",
                "【无聊】、【冷漠、贫瘠、不受欢迎】",
                "拥有120瓶香水的资深消费者承认",
                "【完全忽视了Byredo】",
                ",因为【瓶子没有让我认为里面的香水会刺激我的感官】",
                "Byredo的瓶子【可以在亚马逊上买到一模一样的通用瓶子】,直接摧毁其作为奢侈品的独特性"
            ],
            quote: "在视觉饱和的市场中,【无聊】可能比【丑陋】更致命。【无聊】导致了消费者的彻底忽视,而设计必须有记忆点。",
            placeholder: "Byredo产品图",
            placeholderSize: "700x500px"
        },

        xerjoff: {
            title: "Xerjoff",
            subtitle: "高端定位的【品控悖论】",
            badge: "品控危机",
            failureTitle: "压倒性的品控失败",
            failureItems: [
                "天鹅绒涂层瓶身出现【脱皮】、【变粘】、【粘灰】问题",
                "根本原因: 香水(酒精)泄漏会【溶解胶水】",
                "品牌方将问题视为【用户错误】且【不予退款】,激怒消费者",
                "一位用户尖锐地喊道: ",
                "【停止给东西上涂层！！！】"
            ],
            warningIcon: "⚠",
            warningTitle: "品控警示",
            warningText: "消费者支付了",
            warningAmount: "250美元",
            warningTextEnd: "的高昂价格,当瓶身在物理上【自毁】时,消费者感受到的不仅是【失望】,更是【背叛】。对于高端品牌,任何物理上的缺陷都是不可接受的。",
            placeholders: {
                product: "Xerjoff天鹅绒系列",
                issue: "脱皮问题",
                size700: "700x500px",
                size300: "300x300px"
            }
        },

        lattafa: {
            title: "Lattafa",
            subtitle: "【平替】品牌的【包装天花板】",
            badge: "赞誉与【翻车】并存",
            praiseTitle: "赞誉 (香水)",
            praiseText: "消费者称赞其【疯狂的品质】和极低价格(100欧元购买5瓶100mL),甚至被誉为【GOATED】(最伟大)。",
            failureTitle: "【翻车】 (包装)",
            failureItems: [
                "包装被批评为【廉价】、【俗气】、【幼稚】",
                "Yara粉色瓶子被形容为【生猪排】",
                "糟糕的【喷头】是高频抱怨点"
            ],
            quote: "包装是【平替】品牌无法逾越的【阶级鸿沟】。如果Lattafa投资于更成熟、更高质量的设计,它可能会从根本上颠覆设计师品牌市场。",
            placeholders: {
                product: "Lattafa产品线",
                packaging: "包装细节",
                size: "400x300px"
            }
        }
    },

    // 叙事趋势
    narrative: {
        sectionNumber: "04",
        sectionTitle: "叙事趋势",
        sectionSubtitle: "从【品牌故事】到【个人氛围】",

        intro: {
            title: "核心转变",
            textStart: "消费者的提问方式正在从",
            highlight1: "【我想要一款带有X香调的香水】",
            textMiddle: "转变为\n                        ",
            highlight2: "【我想要闻起来像[某种抽象概念/场景]】",
            textEnd: "。",
            desc: "香水不再是装饰品,而是角色扮演工具——消费者寻找能够作为其个人身份和情感状态的【嗅觉道具】。",
            placeholder: "叙事转变概念图",
            placeholderSize: "800x600px"
        },

        vibes: {
            title: "三大高频【氛围】需求",
            items: [
                {
                    number: "01",
                    title: "图书馆/旧书",
                    tag: "智识与怀旧",
                    placeholder: "古籍图书馆氛围",
                    placeholderSize: "600x400px",
                    keywords: ["羊皮纸", "墨水", "旧纸", "皮革装订", "铅笔屑"],
                    emotions: "智识、怀旧、安静、舒适",
                    brands: "Alkemia, Nui Cobalt, Commodity, Replica"
                },
                {
                    number: "02",
                    title: "森林女巫/哥特",
                    tag: "神秘与自然",
                    placeholder: "神秘森林氛围",
                    placeholderSize: "600x400px",
                    keywords: ["潮湿森林", "焚香", "黑暗", "泥土", "黑玫瑰"],
                    emotions: "力量、神秘、个性、自然连接",
                    brands: "Ormonde Jayne, BPAL, Zoologist, Anna Sui"
                },
                {
                    number: "03",
                    title: "雨后泥土",
                    tag: "环境与体验",
                    placeholder: "雨后清新氛围",
                    placeholderSize: "600x400px",
                    keywords: ["雨后泥土", "潮湿混凝土", "臭氧", "绿色植物"],
                    emotions: "净化、宁静、怀旧、自然",
                    brands: "Demeter, Solstice Scents, Heretic, Zoologist"
                }
            ],
            emotionLabel: "驱动情感:",
            brandsLabel: "推荐品牌:"
        },

        storytelling: {
            title: "品牌驱动的叙事: 打造【嗅觉宇宙】",
            intro: "消费者对提供完整、概念性【宇宙】的品牌表现出高度参与度。购买这些香水就像【购买一个故事的一部分】。",
            brands: [
                {
                    title: "Penhaligon's Portraits",
                    desc: "为每款香水创造维多利亚式的虚构【角色】,如【被诅咒的雅斯敏】、【无与伦比的威廉·潘海利根】",
                    placeholder: "Penhaligon's Portraits"
                },
                {
                    title: "Jusbox",
                    desc: "围绕【音乐】构建宇宙,瓶盖设计成【迷你黑胶唱片】,每款香水受音乐流派、特定乐队或时期启发",
                    placeholder: "Jusbox音乐主题"
                },
                {
                    title: "Masque Milano",
                    desc: "使用【生命歌剧】概念,将香水分为【四幕,每幕四景】",
                    placeholder: "Masque Milano"
                },
                {
                    title: "Imaginary Authors",
                    desc: "围绕不存在的作者和书籍构建叙事",
                    placeholder: "Imaginary Authors"
                }
            ],
            placeholderSize: "400x400px"
        }
    },

    // 用户动态
    user: {
        sectionNumber: "05",
        sectionTitle: "核心用户动态",
        sectionSubtitle: "未满足的需求与市场机遇",

        conflict: {
            title: "【爱香味,恨瓶子】的冲突",
            stat: "68% 消费者经历此冲突",
            brandsTitle: "高频【冲突】品牌",
            brands: [
                { name: "Parfums de Marly (Delina)", quote: "【不喜欢粉色少女的外观,但该死的它闻起来太棒了】" },
                { name: "Paco Rabanne", quote: "【Million系列的瓶子超级俗气,但我很喜欢Lucky这款香水】" },
                { name: "Bond No. 9", quote: "【漂亮的香味,丑陋的瓶子】" },
                { name: "Glossier You", quote: "【我非常喜欢这个香味,但瓶子让我想起洗甲水】" }
            ],
            copingTitle: "消费者应对行为",
            copingItems: [
                { icon: "🙈", title: "隐藏", desc: "【我把瓶子藏在盒子里,这样我就不用看它了】" },
                { icon: "⬇️", title: "降级购买", desc: "转而购买旅行装或小样来规避【丑陋的】全尺寸瓶" },
                { icon: "🔄", title: "重新装瓶", desc: "将香水倒入【玻璃展示瓶】,甚至添加染料" }
            ],
            quote: "这种【爱恨交织】的状态是品牌忠诚度的腐蚀剂。每一次消费者因【丑陋的瓶子】而感到尴尬或需要【藏起来】时,都是在削弱品牌忠诚度,并为竞争对手创造机会。",
            placeholder: "冲突概念图",
            placeholderSize: "600x600px"
        },

        veto: {
            title: "美学否决权: 瓶身作为【守门人】",
            quotes: [
                "瓶身美学对我来说是成败的关键",
                "如果我不喜欢瓶子,我真的不在乎里面的汁液",
                "有时候我甚至不会去闻香水,纯粹是基于品牌(瓶子)"
            ],
            placeholder: "美学否决示意图",
            placeholderSize: "800x400px"
        },

        practical: {
            title: "未被满足的实用主义",
            subtitle: "超越美学的【隐形需求】",
            needs: [
                {
                    icon: "👁️",
                    title: "可见性",
                    desc: "对不透明瓶子普遍感到【恼火】,因为",
                    highlight: "【我想看到我还剩多少】"
                },
                {
                    icon: "⚖️",
                    title: "稳定性与人体工程学",
                    desc: "对Bvlgari Omnia",
                    highlight1: "【容易翻倒】",
                    middle: "和Bvlgari Aqua",
                    highlight2: "【只能躺着】",
                    descEnd: "的强烈不满"
                },
                {
                    icon: "📦",
                    title: "存储效率",
                    desc: "消费者明确表示将香水保存在盒子里,因为",
                    highlight: "【更容易堆叠和存放】"
                },
                {
                    icon: "✈️",
                    title: "旅行友好",
                    desc: "抱怨瓶子【太重】或【太花哨】而无法旅行,积极寻找",
                    highlight: "【不会泄漏】",
                    descEnd: "的旅行喷雾瓶"
                }
            ]
        },

        opportunity: {
            title: "新兴机遇: 【瓶子的来世】",
            badge: "可持续性与多功能性",
            caseTitle: "Xinu品牌案例",
            caseDesc: "华丽的沙漏形瓶子带有木质顶部,当用完香水后,瓶子可以变成花蕾花瓶",
            reactionLabel: "消费者反应:",
            reactionText: " 【这有多酷？？】并计划在用完后【将其用作装饰】",
            quote: "Xinu的【花瓶】概念是情感性和美学性的。它将【已用完】的废弃物(空瓶)转变为【新的】有价值的物品(花瓶),从而无限期地延长了品牌在消费者生活中的存在感。这为YECO客户提供了强大的战略方向: ",
            quoteHighlight: "设计时就考虑【第二次生命】",
            quoteEnd: "。",
            placeholder: "Xinu花瓶概念",
            placeholderSize: "700x500px"
        }
    },

    // 结语
    conclusion: {
        quote: "未来的市场赢家将是那些能够将其物理产品(瓶身)、嗅觉产品(香水)和情感产品(叙事)完美统一的品牌。"
    },

    // 页脚
    footer: {
        logo: "YECO",
        tagline: "致力于香水行业供应链创新与卓越",
        copyright: "© 2024 YECO. 保留所有权利",
        source: "基于Reddit社区深度洞察",
        region: "中东版"
    }
};

// 将语言包挂载到全局对象
window.zhCN = zhCN;
