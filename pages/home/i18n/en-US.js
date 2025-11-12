/* ==========================================
   YECO Home - English Translation
   ========================================== */

const homeEnUS = {
    pageTitle: "YECO - Global Experts in Culturally-Infused Perfume Packaging Design",

    // Navigation (must match shared/components/Navigation/i18n.js)
    nav: {
        home: "Home",
        trends: "Trend Research"
    },

    // Hero Section
    hero: {
        title: "Poetic Vessels of World Cultures",
        subtitle: "YECO",
        description: "We don't just design perfume packaging—we create spaces for cultural dialogue",
        cta: "Explore Our Trend Research",
        scroll: "Scroll to Explore"
    },

    // Brand Introduction
    brand: {
        title: "About YECO",
        subtitle: "A Design Philosophy of Cultural Convergence",

        intro: "YECO is a globally-oriented perfume packaging design and production company. We believe that every perfume bottle is not merely a container, but a carrier of cultural narrative and a medium of aesthetic expression.",

        values: {
            title: "Our Core Values",
            items: [
                {
                    icon: "🌍",
                    title: "Global Cultural Convergence",
                    desc: "We deeply believe in the power of multicultural fusion, dedicated to blending Eastern and Western, traditional and modern, local and global aesthetic elements into design languages that transcend boundaries."
                },
                {
                    icon: "❤️",
                    title: "Love · Respect · Understanding",
                    desc: "We love cultures from around the world, respect each unique aesthetic tradition, and deeply understand consumer needs and emotional resonances across different cultural backgrounds."
                },
                {
                    icon: "📖",
                    title: "Story Excavation & Presentation",
                    desc: "We excel at excavating profound design stories from local cultures, transforming history, mythology, art, and lifestyles into touching packaging designs where every bottle tells a unique story."
                }
            ]
        },

        approach: {
            title: "Our Design Approach",
            desc: "YECO's design is not a simple accumulation of cultural elements, but a deep cultural understanding and creative transformation. We study artistic traditions, color languages, symbolic systems, and craft aesthetics from various regions, skillfully integrating these cultural genes into modern design language.",

            steps: [
                {
                    number: "01",
                    title: "Cultural Research",
                    desc: "In-depth study of target market's cultural background, aesthetic traditions, and consumer psychology"
                },
                {
                    number: "02",
                    title: "Story Refinement",
                    desc: "Extract core stories and visual symbols with emotional resonance from culture"
                },
                {
                    number: "03",
                    title: "Design Creation",
                    desc: "Transform cultural elements into modern design language, creating unique visual experiences"
                },
                {
                    number: "04",
                    title: "Precision Execution",
                    desc: "Perfect presentation of design through exquisite craftsmanship and rigorous quality control"
                }
            ]
        }
    },

    // Middle East Focus
    middleeast: {
        title: "Middle East Edition: Deep Cultural Dialogue",
        subtitle: "Design Practice of Understanding and Respect",

        intro: "Taking the Middle Eastern market as an example, we not only adopt visual elements such as Arabic geometric patterns and golden aesthetics, but also deeply understand the spiritual connotations of Islamic culture, the imagery of deserts and oases, and the sacred status of perfume in Middle Eastern culture.",

        features: [
            {
                title: "Geometric Aesthetics",
                desc: "Meticulously designed Islamic geometric patterns, both traditional and modern",
                image: "geometric-pattern.jpg"
            },
            {
                title: "Golden Language",
                desc: "Restrained yet luxurious golden accents conveying nobility and elegance",
                image: "gold-accent.jpg"
            },
            {
                title: "Bilingual Expression",
                desc: "Perfect support for Arabic RTL layout, respecting linguistic culture",
                image: "bilingual.jpg"
            }
        ]
    },

    // Trend Research
    research: {
        title: "In-Depth Trend Research",
        subtitle: "Data-Driven Design Insights",

        desc: "YECO is not only a designer but also a researcher of industry trends. We regularly publish in-depth trend reports based on consumer insights from global social platforms like Reddit, Instagram, and TikTok, providing clients with forward-looking design directions.",

        latest: {
            title: "Latest Reports",
            reports: [
                {
                    date: "October 2024",
                    title: "Perfume Industry Trend Monthly - Middle East Edition",
                    subtitle: "Decoding the Soul of Perfume Consumers",
                    desc: "Based on in-depth qualitative analysis of Reddit perfume communities, revealing the market transformation of perfume bottles from containers to totemic objects",
                    link: "/pages/reports/2024-10-middleeast/",
                    tags: ["Design Aesthetics", "Narrative Trends", "User Dynamics", "Middle East Market"]
                }
            ]
        },

        cta: "View All Trend Research"
    },

    // Services
    services: {
        title: "Our Services",
        items: [
            {
                icon: "🎨",
                title: "Packaging Design",
                desc: "Full-process design services from concept to execution"
            },
            {
                icon: "🏭",
                title: "Production Manufacturing",
                desc: "High-standard production craftsmanship and rigorous quality control"
            },
            {
                icon: "📊",
                title: "Trend Research",
                desc: "Regular publication of in-depth industry trend reports"
            },
            {
                icon: "🤝",
                title: "Brand Consulting",
                desc: "Cultural insight-driven brand strategy consulting"
            }
        ]
    },

    // Call to Action
    cta: {
        title: "Let's Create Vessels of Culture Together",
        desc: "Wherever your brand story comes from, YECO can help you find the most touching way to express it",
        button: "Contact Us"
    },

    // Footer
    footer: {
        logo: "YECO",
        tagline: "Global Experts in Culturally-Infused Perfume Packaging Design",

        links: {
            company: {
                title: "Company",
                items: ["About Us", "Services", "Portfolio", "Contact"]
            },
            resources: {
                title: "Resources",
                items: ["Trend Research", "Blog", "News", "Downloads"]
            },
            follow: {
                title: "Follow Us",
                items: ["LinkedIn", "Instagram", "WeChat"]
            }
        },

        copyright: "© 2024 YECO. All Rights Reserved",
        location: "Headquarters: China"
    }
};

// Register globally
if (typeof window !== 'undefined') {
    window.homeEnUS = homeEnUS;
}
