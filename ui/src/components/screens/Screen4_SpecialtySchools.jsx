import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const schools = [
    {
        tag: 'SOFTWARE DEVELOPMENT',
        tagClass: 'blue-tag',
        themeClass: 'blue-theme',
        badgeClass: 'blue-badge',
        icon: '💻',
        title: 'School of Programming (SOP)',
        desc: 'Learn coding from basics to full-stack web development.',
        bgClass: 'blue-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be a Graduate',
            'Family income less than 5 LPA',
            'Strong interest in coding and problem solving',
            'Ready to stay in a residential program'
        ],
        curriculum: [
            'Programming Basics & Logical Thinking',
            'Frontend: HTML, CSS, JavaScript, React',
            'Backend: Node.js, Express, Databases',
            'Git & GitHub',
            'English Communication & Workplace Skills'
        ],
        outcomes: [
            'Software Engineer',
            'Full Stack Developer',
            'Entry-level IT Jobs',
            'Career growth in the tech industry'
        ],
        duration: '20–24 months (Self-paced, duration may vary)',
        location: 'Various Campuses (Dantewada, Bengaluru, Pune etc.)'
    },
    {
        tag: 'OPERATIONS & MARKETING',
        tagClass: 'green-tag',
        themeClass: 'green-theme',
        badgeClass: 'green-badge',
        icon: '📊',
        title: 'School of Business (SOB)',
        desc: 'Master business operations, marketing & management.',
        bgClass: 'green-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be 12th pass',
            'Family income less than 5 LPA',
            'Good communication skills and willingness to learn'
        ],
        curriculum: [
            'Business Operations & Reporting',
            'Digital Marketing (SEO, Social Media, Content Writing)',
            'Customer & Client Coordination',
            'Email Writing & Time Management',
            'Real-world projects with startups & NGOs'
        ],
        outcomes: [
            'Marketing Associate',
            'Operations Executive',
            'Customer Support Executive',
            'Business Development Roles'
        ],
        duration: '12–18 months (Self-paced, duration may vary)',
        location: 'Bengaluru, Jashpur, Dantewada, Pune'
    },
    {
        tag: 'ACCOUNTING & TAXATION',
        tagClass: 'orange-tag',
        themeClass: 'orange-theme',
        badgeClass: 'orange-badge',
        icon: '💰',
        title: 'School of Finance (SOF)',
        desc: 'Practical accounting, GST, income tax & Tally/Excel.',
        bgClass: 'orange-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be 12th pass',
            'Family income less than 5 LPA',
            'Interest in finance and numbers'
        ],
        curriculum: [
            'Practical Accounting',
            'GST & Income Tax Basics',
            'Payroll Management',
            'Tally & Advanced Excel',
            'Financial Reporting'
        ],
        outcomes: [
            'Accounts Executive',
            'Tax Associate',
            'Finance Operations Executive',
            'Compliance Assistant'
        ],
        duration: '8–12 months (Self-paced, duration may vary)',
        location: 'Pune, Maharashtra'
    },
    {
        tag: 'UI/UX & GRAPHIC DESIGN',
        tagClass: 'purple-tag',
        themeClass: 'purple-theme',
        badgeClass: 'purple-badge',
        icon: '🎨',
        title: 'School of Design (SOD)',
        desc: 'UI/UX design, Figma prototyping & visual branding.',
        bgClass: 'purple-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be 12th pass',
            'Family income less than 5 LPA',
            'Creativity and passion for visual design & user experiences'
        ],
        curriculum: [
            'Design Thinking & UI/UX Principles',
            'Figma, Adobe XD & Prototyping',
            'User Research & Wireframing',
            'Visual Branding & Graphic Design',
            'Live Client & Portfolio Projects'
        ],
        outcomes: [
            'UI/UX Designer',
            'Product Designer',
            'Graphic Designer',
            'Visual Communication Specialist'
        ],
        duration: '12–15 months (Self-paced, duration may vary)',
        location: 'Bengaluru, Pune, Himachal'
    }
];

export const Screen4_SpecialtySchools = () => {
    const { currentScreen, openSchoolModal, studentName } = useApp();
    const [isWrapVisible, setIsWrapVisible] = useState(false);
    const [speechText, setSpeechText] = useState('');
    const [showSpeech, setShowSpeech] = useState(false);
    const [activeCardIdx, setActiveCardIdx] = useState(-1);
    const [hoveredIdx, setHoveredIdx] = useState(-1);

    const name = (studentName && studentName !== 'Friend') ? studentName : null;
    const greet = name ? `Hi ${name}! 👋` : 'Hello there! 👋';

    useEffect(() => {
        if (currentScreen !== 1) {
            setIsWrapVisible(false);
            setShowSpeech(false);
            setActiveCardIdx(-1);
            return;
        }

        const script = [
            { msg: `${greet} Let me show you our 4 specialty schools!`, card: -1, hold: 2600 },
            { msg: '💻 School of Programming (SOP) — Coding & Full-Stack Development!', card: 0, hold: 3000 },
            { msg: '📊 School of Business (SOB) — Operations, Marketing & Management!', card: 1, hold: 3000 },
            { msg: '💰 School of Finance (SOF) — Accounting, GST & Taxation!', card: 2, hold: 3000 },
            { msg: '🎨 School of Design (SOD) — UI/UX Design, Figma & Prototyping!', card: 3, hold: 3000 },
            { msg: 'Click any school card to check full details & eligibility! 🚀', card: -1, hold: 3500 }
        ];

        let timeouts = [];
        const timer = setTimeout(() => {
            setIsWrapVisible(true);

            let cumulativeTime = 0;
            script.forEach((step, index) => {
                const t = setTimeout(() => {
                    setShowSpeech(false);
                    setTimeout(() => {
                        setSpeechText(step.msg);
                        setShowSpeech(true);
                        setActiveCardIdx(step.card);
                    }, 180);
                }, cumulativeTime);

                timeouts.push(t);
                cumulativeTime += step.hold;
            });
        }, 400);

        timeouts.push(timer);

        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [currentScreen, greet]);

    const cardTips = [
        '💻 SOP: 20–24 months · Residential coding & full stack web dev!',
        '📊 SOB: 12–18 months · Operations, digital marketing & management!',
        '💰 SOF: 8–12 months · Practical accounting, GST & taxation!',
        '🎨 SOD: 12–15 months · UI/UX design, Figma & product design!'
    ];

    const handleMouseEnter = (idx) => {
        setHoveredIdx(idx);
        setSpeechText(cardTips[idx]);
        setShowSpeech(true);
    };

    const handleMouseLeave = () => {
        setHoveredIdx(-1);
    };

    const effectiveActiveCard = hoveredIdx >= 0 ? hoveredIdx : activeCardIdx;

    return (
        <section className={`screen ${currentScreen === 1 ? 'active' : ''}`} data-i="1">
            <div className="eyebrow"><span className="eyebrow-star">🧭</span> Our Schools</div>
            <h1 className="headline">Choose the Program That Fits You</h1>

            <div className="s4-stage">
                <div className="s4-avatar-zone" id="s4AvatarStage">
                    <div className={`s4-avatar-wrap ${isWrapVisible ? 'visible' : ''}`} id="s4AvatarWrap">
                        <div className="s4-navi">
                            <img src="/mentor-avatar2.png" alt="Guide Avatar" className="s4-avatar-img" />
                        </div>
                    </div>
                </div>

                <div className={`s4-cards-grid ${effectiveActiveCard >= 0 ? 'has-active' : ''}`} id="schoolRow">
                    {schools.map((s, idx) => (
                        <div
                            key={idx}
                            className={`school-card ${s.themeClass} ${effectiveActiveCard === idx ? 'avatar-highlight' : ''}`}
                            data-school={idx}
                            onClick={() => openSchoolModal(idx)}
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={handleMouseLeave}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="school-left-border"></div>
                            <div className={`school-icon-badge ${s.badgeClass}`}>{s.icon}</div>
                            <div className="school-content">
                                <div className="school-header-row">
                                    <span className={`school-tag ${s.tagClass}`}>{s.tag}</span>
                                    <h3 className="school-title">{s.title}</h3>
                                </div>
                                <p className="school-desc">{s.desc}</p>
                                <div className="school-footer-row">
                                    <div className="school-meta">
                                        <span className="meta-item">📍 Campuses</span>
                                        <span className="meta-item">⏳ {s.duration.split(' ')[0]}</span>
                                    </div>
                                    <div className="school-cta">Check Details →</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`s4-speech-bubble ${showSpeech ? 'show' : ''}`} id="s4SpeechBubble">
                    {speechText}
                </div>
            </div>
        </section>
    );
};
