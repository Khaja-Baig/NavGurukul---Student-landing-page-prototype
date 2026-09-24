import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const campusesData = [
    {
        id: 'dharamshala',
        name: 'Dharamshala',
        state: 'Himachal Pradesh · North',
        type: 'Boys',
        theme: 'theme-dharamshala',
        highlightColor: '#0284c7',
        courseCodes: ['SOB', 'SOP'],
        speech: {
            welcome: "Acha! Aapne Dharamshala campus chuna! 🏔️ Dharamshala pahadon ki sunder aur shaant vadiyon mein sthit boys campus hai... Chalo dekhte hain yahan kaunse courses hain!",
            courses: "Yahan available hain: School of Business (SOB) aur School of Programming (SOP)! 🚀",
            closing: "Kisi bhi course par click karke full eligibility aur syllabus check karein! ✨"
        }
    },
    {
        id: 'sarjapur',
        name: 'Sarjapur',
        state: 'Karnataka · South',
        type: 'Girls',
        theme: 'theme-sarjapur',
        highlightColor: '#7c3aed',
        courseCodes: ['SOP', 'SOB'],
        speech: {
            welcome: "Acha! Aapne Sarjapur campus chuna! 🌸 Bangalore ki high-energy tech hub mein girls ke liye premier campus... Chalo dekhte hain yahan ke courses!",
            courses: "Yahan available hain: School of Programming (SOP) aur School of Business (SOB)! 💻",
            closing: "Kisi bhi course par click karke full eligibility aur syllabus check karein! ✨"
        }
    },
    {
        id: 'pune',
        name: 'Pune',
        state: 'Maharashtra · West',
        type: 'Girls',
        theme: 'theme-pune',
        highlightColor: '#4f46e5',
        courseCodes: ['SOB', 'SOP', 'SOF'],
        speech: {
            welcome: "Acha! Aapne Pune campus chuna! 🎓 Maharashtra ka Oxford of the East, jahan girls tech aur finance mein aage badh rahi hain!",
            courses: "Yahan available hain 3 top tracks: SOB, SOP aur School of Finance (SOF)! 💰",
            closing: "Kisi bhi course par click karke full eligibility aur syllabus check karein! ✨"
        }
    },
    {
        id: 'jashpur',
        name: 'Jashpur',
        state: 'Chhattisgarh · Central',
        type: 'Girls',
        theme: 'theme-jashpur',
        highlightColor: '#059669',
        courseCodes: ['SOP', 'SOB'],
        speech: {
            welcome: "Acha! Aapne Jashpur campus chuna! 🌿 Chhattisgarh ki natural aur shaant vadiyon mein girls residential learning space!",
            courses: "Yahan available hain: School of Programming (SOP) aur School of Business (SOB)! 💻",
            closing: "Kisi bhi course par click karke full eligibility aur syllabus check karein! ✨"
        }
    },
    {
        id: 'dantewada',
        name: 'Dantewada',
        state: 'Chhattisgarh · Central',
        type: 'Co-ed',
        theme: 'theme-dantewada',
        highlightColor: '#ea580c',
        courseCodes: ['SOP', 'SOB', 'SOF'],
        speech: {
            welcome: "Acha! Aapne Dantewada campus chuna! 🌳 Chhattisgarh ka vibrant Co-ed learning hub jahan boys aur girls dono seekh rahe hain!",
            courses: "Yahan available hain 3 tracks: SOP, SOB aur School of Finance (SOF)! 🌟",
            closing: "Kisi bhi course par click karke full eligibility aur syllabus check karein! ✨"
        }
    },
    {
        id: 'kishanganj',
        name: 'Kishanganj',
        state: 'Bihar · North',
        type: 'Girls',
        theme: 'theme-kishanganj',
        highlightColor: '#d97706',
        courseCodes: ['SOB'],
        speech: {
            welcome: "Acha! Aapne Kishanganj campus chuna! 🌟 Bihar mein transformative residential learning space girls ke liye!",
            courses: "Yahan exclusively available hai: School of Business (SOB) — management aur marketing mastery! 📊",
            closing: "Card par click karke full details aur curriculum check karein! ✨"
        }
    },
    {
        id: 'himachal',
        name: 'Himachal Campus',
        state: 'Himachal Pradesh · North',
        type: 'Girls',
        theme: 'theme-himachal',
        highlightColor: '#0d9488',
        courseCodes: ['BCA'],
        speech: {
            welcome: "Acha! Aapne Himachal Campus chuna! 🏔️ Himachal ki shaant pahadiyon mein girls ke liye higher education hub!",
            courses: "Yahan exclusively available hai hamara UGC-recognized BCA degree program (3 Years)! 🎓",
            closing: "Card par click karke BCA degree eligibility aur subjects check karein! 🚀"
        }
    },
];

export const allCourses = {
    SOP: {
        code: 'SOP',
        schoolIdx: 0,
        tag: 'SOFTWARE DEVELOPMENT',
        tagClass: 'blue-tag',
        themeClass: 'blue-theme',
        badgeClass: 'blue-badge',
        icon: '💻',
        title: 'School of Programming (SOP)',
        desc: 'Learn coding from basics to full-stack web development.',
        duration: '20–24 months (Self-paced)',
        tip: '💻 SOP: 20–24 months · Residential coding & full-stack web development!'
    },
    SOB: {
        code: 'SOB',
        schoolIdx: 1,
        tag: 'OPERATIONS & MARKETING',
        tagClass: 'green-tag',
        themeClass: 'green-theme',
        badgeClass: 'green-badge',
        icon: '📊',
        title: 'School of Business (SOB)',
        desc: 'Master business operations, marketing & management.',
        duration: '12–18 months (Self-paced)',
        tip: '📊 SOB: 12–18 months · Operations, digital marketing & management!'
    },
    SOF: {
        code: 'SOF',
        schoolIdx: 2,
        tag: 'ACCOUNTING & TAXATION',
        tagClass: 'orange-tag',
        themeClass: 'orange-theme',
        badgeClass: 'orange-badge',
        icon: '💰',
        title: 'School of Finance (SOF)',
        desc: 'Practical accounting, GST, income tax & Tally/Excel.',
        duration: '8–12 months (Self-paced)',
        tip: '💰 SOF: 8–12 months · Practical accounting, GST & taxation!'
    },
    BCA: {
        code: 'BCA',
        schoolIdx: 3,
        tag: 'DEGREE PROGRAM',
        tagClass: 'purple-tag',
        themeClass: 'purple-theme',
        badgeClass: 'purple-badge',
        icon: '🎓',
        title: 'Bachelor of Computer Applications (BCA)',
        desc: '3-year accredited university degree with residential software training.',
        duration: '3 Years (Degree Program)',
        tip: '🎓 BCA: 3 Years · UGC accredited university degree with residential software training!'
    }
};

export const Screen2_OurCampus = () => {
    const { currentScreen, openSchoolModal, studentName } = useApp();
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [clickedCardId, setClickedCardId] = useState(null);

    // Avatar & Speech State for View 2 (Inside Campus)
    const [isAvatarVisible, setIsAvatarVisible] = useState(false);
    const [speechText, setSpeechText] = useState('');
    const [showSpeech, setShowSpeech] = useState(false);
    const [activeCardCode, setActiveCardCode] = useState(null);
    const [hoveredCardCode, setHoveredCardCode] = useState(null);

    // Reset when switching screens
    useEffect(() => {
        if (currentScreen !== 1) {
            setSelectedCampus(null);
            setClickedCardId(null);
            setIsAvatarVisible(false);
            setShowSpeech(false);
            setActiveCardCode(null);
        }
    }, [currentScreen]);

    // Handle Campus Selection
    const handleSelectCampus = (campus) => {
        setClickedCardId(campus.id);
        setTimeout(() => {
            setSelectedCampus(campus);
            setClickedCardId(null);
        }, 160);
    };

    // Handle Back to Campuses Grid
    const handleBackToGrid = () => {
        setSelectedCampus(null);
        setIsAvatarVisible(false);
        setShowSpeech(false);
        setActiveCardCode(null);
        setHoveredCardCode(null);
    };

    // Trigger Navi's voice and avatar sequence when a campus is opened
    useEffect(() => {
        if (!selectedCampus) {
            setIsAvatarVisible(false);
            setShowSpeech(false);
            setActiveCardCode(null);
            return;
        }

        let timeouts = [];

        // Intro Avatar Animation
        const timerWrap = setTimeout(() => {
            setIsAvatarVisible(true);
        }, 220);
        timeouts.push(timerWrap);

        // Step 1: Welcome & Campus Character
        const t1 = setTimeout(() => {
            setSpeechText(selectedCampus.speech.welcome);
            setShowSpeech(true);
            setActiveCardCode(null);
        }, 450);
        timeouts.push(t1);

        // Step 2: Course Introduction
        const t2 = setTimeout(() => {
            setShowSpeech(false);
            setTimeout(() => {
                setSpeechText(selectedCampus.speech.courses);
                setShowSpeech(true);
                // Highlight first course
                if (selectedCampus.courseCodes.length > 0) {
                    setActiveCardCode(selectedCampus.courseCodes[0]);
                }
            }, 180);
        }, 4200);
        timeouts.push(t2);

        // Step 3: Interactive Prompt
        const t3 = setTimeout(() => {
            setShowSpeech(false);
            setTimeout(() => {
                setSpeechText(selectedCampus.speech.closing);
                setShowSpeech(true);
                setActiveCardCode(null);
            }, 180);
        }, 8200);
        timeouts.push(t3);

        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [selectedCampus]);

    // Card Hover Handlers
    const handleCardHover = (course) => {
        setHoveredCardCode(course.code);
        setSpeechText(course.tip);
        setShowSpeech(true);
    };

    const handleCardLeave = () => {
        setHoveredCardCode(null);
    };

    const effectiveActiveCard = hoveredCardCode || activeCardCode;

    // Available courses for the selected campus
    const currentCourses = selectedCampus
        ? selectedCampus.courseCodes.map(code => allCourses[code]).filter(Boolean)
        : [];

    return (
        <section className={`screen campus-screen ${currentScreen === 1 ? 'active' : ''}`} data-i="1">
            {!selectedCampus ? (
                /* ================= VIEW 1: CAMPUS GRID ================= */
                <div className="campus-view-container campus-grid-view">
                    <h1 className="headline campus-main-title">Our Campus</h1>
                    <p className="campus-subline">
                        Explore our residential campuses across India. View the programs available at each location — you can discuss and confirm your preference later with your mentor.
                    </p>

                    <div className="campus-cards-grid-wrap">
                        <div className="campus-cards-grid">
                            {campusesData.map((campus, idx) => (
                                <div
                                    key={campus.id}
                                    className={`campus-card ${campus.theme} ${clickedCardId === campus.id ? 'is-tactile-pressed' : ''}`}
                                    style={{ animationDelay: `${idx * 0.05 + 0.1}s` }}
                                    onClick={() => handleSelectCampus(campus)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View programs at ${campus.name}`}
                                >
                                    {/* Colored Header Strip */}
                                    <div className="campus-card-header">
                                        <div className="campus-location-title">
                                            <span className="campus-pin">📍</span>
                                            <h3 className="campus-name">{campus.name}</h3>
                                        </div>
                                        {/* Space-inspired telemetry beacon */}
                                        <div className="campus-beacon" title="Admissions Active">
                                            <span className="beacon-ping"></span>
                                            <span className="beacon-dot"></span>
                                        </div>
                                    </div>

                                    {/* Centered Card Content Body */}
                                    <div className="campus-card-body">
                                        {/* State / Region */}
                                        <p className="campus-region">{campus.state}</p>

                                        {/* Gender / Cohort Pill */}
                                        <div className="campus-pill-wrap">
                                            <span className={`campus-pill ${campus.type === 'Boys' ? 'boys-pill' : campus.type === 'Co-ed' ? 'coed-pill' : 'girls-pill'}`}>
                                                {campus.type === 'Boys' ? '👦 Boys Campus' : campus.type === 'Co-ed' ? '👦👧 Co-ed Campus' : '👧 Girls Campus'}
                                            </span>
                                        </div>

                                        {/* Available Programs Preview Chips */}
                                        <div className="campus-programs-preview">
                                            <span className="programs-preview-label">Programs:</span>
                                            <div className="programs-preview-badges">
                                                {campus.courseCodes.map(code => (
                                                    <span key={code} className={`campus-program-chip chip-${code.toLowerCase()}`}>
                                                        {code === 'SOP' && '💻 SOP'}
                                                        {code === 'SOB' && '📊 SOB'}
                                                        {code === 'SOF' && '💰 SOF'}
                                                        {code === 'BCA' && '🎓 BCA'}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer CTA */}
                                    <div className="campus-card-footer">
                                        <span className="campus-cta-text">Click to view available schools & courses</span>
                                        <span className="campus-cta-arrow">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                /* ================= VIEW 2: SECOND SLIDE INSIDE CAMPUS ================= */
                <div className="campus-view-container campus-programs-view visible">
                    {/* Breadcrumb Navigation */}
                    <div className="campus-breadcrumb-bar">
                        <button
                            type="button"
                            className="campus-breadcrumb-back"
                            onClick={handleBackToGrid}
                        >
                            <span className="back-arrow">←</span> Choose campus
                        </button>
                        <span className="breadcrumb-slash">/</span>
                        <span className="breadcrumb-current">{selectedCampus.name}</span>
                    </div>

                    {/* Headline & Badges */}
                    <div className="programs-header-block">
                        <h1 className="headline programs-headline">
                            Programs at <span className="highlight-pink">{selectedCampus.name}</span>
                        </h1>
                        <div className="programs-badge-row">
                            <span className={`campus-pill ${selectedCampus.type === 'Boys' ? 'boys-pill' : selectedCampus.type === 'Co-ed' ? 'coed-pill' : 'girls-pill'}`}>
                                {selectedCampus.type === 'Boys' ? '👦 Boys Campus' : selectedCampus.type === 'Co-ed' ? '👦👧 Co-ed Campus' : '👧 Girls Campus'}
                            </span>
                        </div>
                        <p className="campus-subline programs-subline">
                            {currentCourses.length} {currentCourses.length === 1 ? 'specialty program' : 'specialty programs'} available for admission at this campus.
                        </p>
                    </div>

                    {/* Second Slide Stage with Avatar on Left & Courses on Right */}
                    <div className="s4-stage campus-s4-stage">
                        {/* Avatar Column */}
                        <div className="s4-avatar-zone" id="s4AvatarStage">
                            <div className={`s4-avatar-wrap ${isAvatarVisible ? 'visible' : ''}`} id="s4AvatarWrap">
                                <div className="s4-navi">
                                    <img src="/mentor-avatar2.png" alt="Guide Avatar" className="s4-avatar-img" />
                                </div>
                            </div>
                        </div>

                        {/* Course Cards Grid Filtered for this Campus */}
                        <div
                            className={`s4-cards-grid ${effectiveActiveCard ? 'has-active' : ''}`}
                            id="schoolRow"
                            style={{
                                gridTemplateColumns: currentCourses.length === 1 ? 'minmax(320px, 460px)' : currentCourses.length === 2 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
                                justifyContent: 'center'
                            }}
                        >
                            {currentCourses.map((course) => (
                                <div
                                    key={course.code}
                                    className={`school-card ${course.themeClass} ${effectiveActiveCard === course.code ? 'avatar-highlight' : ''}`}
                                    onClick={() => openSchoolModal(course.schoolIdx)}
                                    onMouseEnter={() => handleCardHover(course)}
                                    onMouseLeave={handleCardLeave}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View details of ${course.title}`}
                                >
                                    <div className="school-left-border"></div>
                                    <div className={`school-icon-badge ${course.badgeClass}`}>{course.icon}</div>
                                    <div className="school-content">
                                        <div className="school-header-row">
                                            <span className={`school-tag ${course.tagClass}`}>{course.tag}</span>
                                            <h3 className="school-title">{course.title}</h3>
                                        </div>
                                        <p className="school-desc">{course.desc}</p>
                                        <div className="school-footer-row">
                                            <div className="school-meta">
                                                <span className="meta-item">📍 {selectedCampus.name}</span>
                                                <span className="meta-item">⏳ {course.duration.split(' ')[0]}</span>
                                            </div>
                                            <div className="school-cta">Check Details →</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Speech Bubble with Navi's Voice */}
                        <div className={`s4-speech-bubble ${showSpeech ? 'show' : ''}`} id="s4SpeechBubble">
                            {speechText}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
