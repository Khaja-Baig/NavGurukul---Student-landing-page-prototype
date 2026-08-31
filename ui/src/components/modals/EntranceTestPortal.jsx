import React, { useState, useEffect } from 'react';
import { useApp, etQuestionsData } from '../../context/AppContext';

export const EntranceTestPortal = () => {
    const {
        isPortalOpen,
        closePortal,
        portalStep,
        setPortalStep,
        cockpitStep,
        setCockpitStep,
        studentName,
        setStudentName,
        userProfile,
        setUserProfile,
        startRocketLaunchTransition,
        startReverseRocketLaunchTransition,
        userAnswers,
        setUserAnswers,
        currentQuizQIndex,
        setCurrentQuizQIndex,
        quizTimerSeconds,
        startLiveEtQuiz,
        finishEtQuiz,
        attemptHistory,
        openSlotBookingModal,
        bookedInterviewSlot
    } = useApp();

    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('');
    const [activeStripeHover, setActiveStripeHover] = useState(null);
    const [loginLang, setLoginLang] = useState('en');

    if (!isPortalOpen) return null;

    const name = (studentName && studentName !== 'Friend') ? studentName : 'Friend';

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const url = ev.target?.result;
                if (url) {
                    setUploadedPhotoUrl(url);
                    setUserProfile(prev => ({ ...prev, photoUrl: url }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const stripeRules = [
        {
            icon: '⏱️',
            title: '1 Hour Complete Test ⏱️',
            desc: 'The test takes approximately 1 hour. Please complete it in a quiet place free from disruptions.',
            theme: 'card-theme-pink',
            msg: 'Sabse pehle, test complete karne ke liye 1 hour milega. ⏱️'
        },
        {
            icon: '📝',
            title: 'Notebook & Pen Required 📝',
            desc: 'Keep a rough notebook and pen handy for quick mathematical and logic calculations.',
            theme: 'card-theme-orange',
            msg: 'Notebook aur pen paas mein zaroor rakhna. 📝'
        },
        {
            icon: '📱',
            title: 'Mobile / Laptop Online Mode 📱',
            desc: 'You can solve all multiple-choice questions directly on your mobile device or laptop screen.',
            theme: 'card-theme-purple',
            msg: 'Test mobile ya laptop par online hoga. 📱'
        },
        {
            icon: '🤝',
            title: 'Honesty Policy 🤝',
            desc: 'We evaluate true learning potential. Give your best effort without any unfair means or cheating.',
            theme: 'card-theme-green',
            msg: 'Aur honestly test dena — bina cheating ke. 🤝'
        }
    ];

    const currentStripeMsg = activeStripeHover !== null
        ? stripeRules[activeStripeHover].msg
        : `Aao <span class="student-name-placeholder">${name}</span>! Rules dhyan se padhein aur Entrance Test start karein! 📝`;

    return (
        <div id="entranceTestPortalScreen" className={`et-portal-screen active ${portalStep === 5 ? 'step3-active' : ''} ${portalStep === 4 ? 'step4-active' : ''}`}>
            {/* Ambient Glowing Background FX */}
            <div className="world-overlay" style={{ opacity: 0.5 }}></div>
            <div className="et-portal-glow glow-1"></div>
            <div className="et-portal-glow glow-2"></div>

            {/* Top Navigation HUD Header */}
            <header className="et-portal-header">
                <div className="et-header-brand">
                    <img src="/navgurukul-logo.png" alt="NavGurukul Logo" className="et-portal-logo" />
                </div>

                {/* Gamified HUD Progress Track Bar */}
                <div className="et-hud-track-wrapper" style={{ display: (portalStep === 5 || portalStep === 4) ? 'none' : 'block' }}>
                    <div className="et-hud-track" id="etHudTrack">
                        <div
                            className="et-hud-fill"
                            id="etHudFill"
                            style={{ width: portalStep === 1 ? '0%' : portalStep === 2 ? '50%' : '100%' }}
                        ></div>

                        <div className="et-hud-checkpoints">
                            <button
                                className={`et-hud-node ${portalStep >= 1 ? 'active' : ''}`}
                                id="etNode1"
                                style={{ left: '0%' }}
                                onClick={() => setPortalStep(1)}
                            >
                                <span className="node-icon">🌱</span>
                                <span className="node-tooltip">1. Instructions</span>
                            </button>
                        </div>

                        <div
                            className="et-hud-vehicle-wrapper"
                            id="etHudVehicleWrapper"
                            style={{ left: portalStep === 1 ? '0%' : portalStep === 2 ? '50%' : '100%' }}
                        >
                            <div className="hud-vehicle">
                                <div className="vehicle-thruster">
                                    <span className="flame-core"></span>
                                    <span className="flame-outer"></span>
                                </div>
                                <svg className="vehicle-svg" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 10L1 3C0.5 2.2 1.2 1 2.2 1H8.5L12 10H6Z" fill="#d97706" />
                                    <path d="M6 18L1 25C0.5 25.8 1.2 27 2.2 27H8.5L12 18H6Z" fill="#d97706" />
                                    <path d="M4 8C4 8 10 6 22 6C34 6 42 12 43 14C42 16 34 22 22 22C10 22 4 20 4 20V8Z" fill="url(#etHullGradient)" />
                                    <path d="M34 8.5C38 10.5 42.5 13 43.5 14C42.5 15 38 17.5 34 19.5V8.5Z" fill="#f59e0b" />
                                    <path d="M12 11H28C29.1 11 30 11.9 30 13V15C30 16.1 29.1 17 28 17H12V11Z" fill="#ffffff" opacity="0.3" />
                                    <ellipse cx="26" cy="14" rx="7" ry="5" fill="url(#etVisorGradient)" stroke="#ffffff" strokeWidth="0.8" />
                                    <circle cx="26" cy="13" r="2.5" fill="#fef08a" />
                                    <path d="M23 17.5C23.8 16 25 15.5 26 15.5C27 15.5 28.2 16 29 17.5" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" />
                                    <line x1="22" y1="11.5" x2="28" y2="11.5" stroke="#ffffff" strokeLinecap="round" opacity="0.7" />
                                    <defs>
                                        <linearGradient id="etHullGradient" x1="4" y1="14" x2="43" y2="14" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#be185d" />
                                            <stop offset="0.55" stopColor="#e91e63" />
                                            <stop offset="1" stopColor="#ea580c" />
                                        </linearGradient>
                                        <linearGradient id="etVisorGradient" x1="19" y1="9" x2="33" y2="19" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0284c7" />
                                            <stop offset="1" stopColor="#38bdf8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="et-header-actions">
                    <div className="login-lang-switch">
                        <button
                            className={`lang-btn ${loginLang === 'en' ? 'active' : ''}`}
                            onClick={() => setLoginLang('en')}
                        >
                            🌐 English
                        </button>
                        <button
                            className={`lang-btn ${loginLang === 'hi' ? 'active' : ''}`}
                            onClick={() => setLoginLang('hi')}
                        >
                            हिंदी
                        </button>
                    </div>
                    <button
                        className="et-exit-btn"
                        onClick={() => {
                            if (portalStep === 2) {
                                startReverseRocketLaunchTransition();
                            } else {
                                closePortal();
                            }
                        }}
                    >
                        <span className="exit-icon">✕</span>
                        <span>Back to Journey</span>
                    </button>
                </div>
            </header>

            {/* Main Workspace Body Grid */}
            <main className={`et-portal-body ${portalStep === 1 ? 'step1-active' : ''} ${portalStep === 2 ? 'step2-active' : ''} ${portalStep === 5 ? 'step3-active' : ''} ${portalStep === 4 ? 'step4-active' : ''}`}>
                {/* Left Hero Sidebar: Mentor Asha */}
                <aside className="et-hero-sidebar">
                    <div className="et-mentor-card">
                        <div className="et-mentor-aura"></div>
                        <img src="/mentor-avatar2.png" alt="Mentor Asha" className="et-mentor-avatar" />
                        <div
                            className="et-speech-bubble"
                            id="etPortalSpeechBubble"
                            dangerouslySetInnerHTML={{ __html: currentStripeMsg }}
                        />
                    </div>
                </aside>

                {/* Right Main Canvas */}
                <section className="et-portal-canvas">
                    {/* STEP 1: INSTRUCTIONS */}
                    {portalStep === 1 && (
                        <div className="et-step-pane active" id="etStep1">
                            <div className="et-pane-header">
                                <h2 className="et-pane-title">NavGurukul Entrance Test Instructions</h2>
                                <p className="et-pane-sub">Please read the following important instructions carefully before starting your screening test.</p>
                            </div>

                            <div className="et-rules-grid-stage">
                                {/* Gamified Animated Circle START CTA */}
                                <div className="et-circle-start-wrap">
                                    <button
                                        type="button"
                                        className="et-circle-start-btn et-ready-btn visible"
                                        id="etStartBtn"
                                        onClick={startRocketLaunchTransition}
                                        aria-label="Start Entrance Test"
                                    >
                                        <div className="circle-pulse-ring ring-1"></div>
                                        <div className="circle-pulse-ring ring-2"></div>
                                        <div className="circle-sparkle s1">✨</div>
                                        <div className="circle-sparkle s2">⭐</div>
                                        <div className="circle-sparkle s3">⚡</div>
                                        <div className="circle-content">
                                            <div className="circle-icon">🚀</div>
                                            <span className="circle-text">Start</span>
                                            <span className="circle-sub">Mission</span>
                                        </div>
                                        <div className="circle-hover-tooltip">
                                            <span>Tap to Start! 🎯</span>
                                        </div>
                                    </button>
                                </div>

                                {/* 4 Colored Rules Stripes Grid */}
                                <div className="et-rules-grid" onMouseLeave={() => setActiveStripeHover(null)}>
                                    {stripeRules.map((rule, idx) => (
                                        <div
                                            key={idx}
                                            className={`et-rule-card ${rule.theme} visible ${activeStripeHover === idx ? 'active-guide' : ''}`}
                                            onMouseEnter={() => setActiveStripeHover(idx)}
                                            onClick={() => setActiveStripeHover(idx)}
                                        >
                                            <div className="stripe-left-icon">{rule.icon}</div>
                                            <div className="stripe-main-content">
                                                <strong className="stripe-title">{rule.title}</strong>
                                                <p className="stripe-desc">{rule.desc}</p>
                                            </div>
                                            <span className="card-check">✓</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: ROCKET COCKPIT ONBOARDING */}
                    {portalStep === 2 && (
                        <div className="et-step-pane active" id="etStep2">
                            <div className="rocket-interior-environment active" id="rocketInteriorEnv">
                                <div className="cockpit-bg-layer">
                                    <div className="cockpit-bg-img" style={{ backgroundImage: "url('/rocket.png')" }}></div>
                                    <div className="cockpit-space-stars"></div>
                                    <div className="cockpit-nebula-pulse"></div>
                                </div>

                                <div className="cockpit-floating-stage">
                                    <div className="cockpit-stage-viewport">
                                        {/* Task 1: Name Step */}
                                        {cockpitStep === 1 && (
                                            <div className="floating-step-card active" id="missionStep1">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">What's your name? 👤</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group">
                                                        <div className="floating-input-wrapper">
                                                            <span className="floating-icon">👤</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="First Name (e.g. Rahul)"
                                                                value={userProfile.firstName}
                                                                onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="floating-input-wrapper secondary-wrap" style={{ marginTop: '8px' }}>
                                                            <span className="floating-icon">📝</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="Last Name (e.g. Kumar)"
                                                                value={userProfile.lastName}
                                                                onChange={(e) => setUserProfile({ ...userProfile, lastName: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={startReverseRocketLaunchTransition}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(2)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Task 2: Photo Step */}
                                        {cockpitStep === 2 && (
                                            <div className="floating-step-card active" id="missionStep2">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Add your photo 📸</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-photo-box">
                                                        <input
                                                            type="file"
                                                            id="etPhotoInput"
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            onChange={handlePhotoUpload}
                                                        />
                                                        <label htmlFor="etPhotoInput" className="floating-photo-dropzone">
                                                            {uploadedPhotoUrl ? (
                                                                <div className="floating-photo-preview">
                                                                    <img src={uploadedPhotoUrl} alt="Explorer Photo" />
                                                                    <span className="photo-change-overlay">✏️ Change Photo</span>
                                                                </div>
                                                            ) : (
                                                                <div className="floating-photo-placeholder">
                                                                    <div className="photo-cam-icon-glow">📷</div>
                                                                    <span className="photo-main-text">Add Your Photo</span>
                                                                </div>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(1)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(3)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Task 3: Date of Birth */}
                                        {cockpitStep === 3 && (
                                            <div className="floating-step-card active" id="missionStep3">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">When's your birthday? 🎂</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-dob-group">
                                                        <span className="dob-calendar-icon">📅</span>
                                                        <input
                                                            type="date"
                                                            className="floating-date-picker"
                                                            value={userProfile.dob}
                                                            onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(2)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(4)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Task 4: Gender */}
                                        {cockpitStep === 4 && (
                                            <div className="floating-step-card active" id="missionStep4">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">How should we identify you? ✨</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row">
                                                        {['Male', 'Female', 'Other'].map(g => (
                                                            <button
                                                                key={g}
                                                                type="button"
                                                                className={`floating-gender-btn ${userProfile.gender === g ? 'active' : ''}`}
                                                                onClick={() => setUserProfile({ ...userProfile, gender: g })}
                                                            >
                                                                <span className="gender-btn-icon">{g === 'Male' ? '👨‍🚀' : g === 'Female' ? '👩‍🚀' : '🧑‍🚀'}</span>
                                                                <span className="gender-btn-label">{g}</span>
                                                                <span className="gender-btn-check">✓</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(3)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(5)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Task 5: Contact Numbers */}
                                        {cockpitStep === 5 && (
                                            <div className="floating-step-card active" id="missionStep5">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">How can we reach you? 📱</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group">
                                                        <div className="floating-input-wrapper">
                                                            <span className="floating-icon">💬</span>
                                                            <input
                                                                type="tel"
                                                                className="floating-text-input"
                                                                placeholder="WhatsApp Number (e.g. 9876543210)"
                                                                value={userProfile.whatsapp}
                                                                onChange={(e) => setUserProfile({ ...userProfile, whatsapp: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="floating-input-wrapper secondary-wrap" style={{ marginTop: '10px' }}>
                                                            <span className="floating-icon">📞</span>
                                                            <input
                                                                type="tel"
                                                                className="floating-text-input"
                                                                placeholder="Calling Phone Number"
                                                                value={userProfile.phone}
                                                                onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(4)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(6)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Task 6: PIN Code & Location */}
                                        {cockpitStep === 6 && (
                                            <div className="floating-step-card active" id="missionStep6">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">PIN Code & Location 📍</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group">
                                                        <div className="floating-input-wrapper">
                                                            <span className="floating-icon">📍</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                maxLength={6}
                                                                placeholder="6-Digit PIN Code"
                                                                value={userProfile.pincode}
                                                                onChange={(e) => setUserProfile({ ...userProfile, pincode: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="floating-input-wrapper secondary-wrap" style={{ marginTop: '10px' }}>
                                                            <span className="floating-icon">🏙️</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="District (e.g. Patna)"
                                                                value={userProfile.district}
                                                                onChange={(e) => setUserProfile({ ...userProfile, district: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(5)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={startLiveEtQuiz}
                                                    >
                                                        <span>LAUNCH SCREENING TEST NOW 🚀</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: LIVE MCQ QUIZ */}
                    {portalStep === 5 && (
                        <div className="et-step-pane active" id="etStep3">
                            <div className="et-quiz-container">
                                <div className="et-quiz-card">
                                    <div className="quiz-header">
                                        <div className="quiz-q-counter">
                                            Question {currentQuizQIndex + 1} of {etQuestionsData.length}
                                        </div>
                                        <div className="quiz-topic-badge">
                                            {etQuestionsData[currentQuizQIndex].topic}
                                        </div>
                                        <div className="quiz-timer">
                                            ⏱️ {formatTime(quizTimerSeconds)}
                                        </div>
                                    </div>

                                    <div className="quiz-body">
                                        <h3 className="quiz-q-text">
                                            {etQuestionsData[currentQuizQIndex].text}
                                        </h3>

                                        <div className="quiz-options-list">
                                            {etQuestionsData[currentQuizQIndex].options.map((opt, oIdx) => {
                                                const isSelected = userAnswers[currentQuizQIndex] === oIdx;
                                                return (
                                                    <button
                                                        key={oIdx}
                                                        type="button"
                                                        className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => setUserAnswers({ ...userAnswers, [currentQuizQIndex]: oIdx })}
                                                    >
                                                        <span className="opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                                                        <span className="opt-text">{opt}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="quiz-mentor-hint">
                                            <span className="hint-icon">💡 Mentor Tip:</span>
                                            <span>{etQuestionsData[currentQuizQIndex].mentorMsg}</span>
                                        </div>
                                    </div>

                                    <div className="quiz-footer">
                                        <div className="quiz-palette-dots">
                                            {etQuestionsData.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`q-dot ${idx === currentQuizQIndex ? 'current' : ''} ${userAnswers[idx] !== undefined ? 'answered' : ''}`}
                                                    onClick={() => setCurrentQuizQIndex(idx)}
                                                >
                                                    {idx + 1}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="quiz-nav-btns">
                                            <button
                                                type="button"
                                                className="quiz-prev-btn"
                                                disabled={currentQuizQIndex === 0}
                                                onClick={() => setCurrentQuizQIndex(prev => prev - 1)}
                                            >
                                                ‹ Previous
                                            </button>

                                            {currentQuizQIndex < etQuestionsData.length - 1 ? (
                                                <button
                                                    type="button"
                                                    className="quiz-next-btn"
                                                    onClick={() => setCurrentQuizQIndex(prev => prev + 1)}
                                                >
                                                    Next Question ›
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="quiz-submit-btn"
                                                    onClick={finishEtQuiz}
                                                >
                                                    SUBMIT TEST 🎉
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: RESULTS & ATTEMPT HISTORY DASHBOARD */}
                    {portalStep === 4 && (
                        <div className="et-step-pane active" id="etStep4">
                            <div className="et-results-container">
                                <div className="et-results-card">
                                    <div className="res-header">
                                        <div className="res-avatar-wrap">
                                            <img src={uploadedPhotoUrl || '/mentor-avatar2.png'} alt="Student Avatar" />
                                        </div>
                                        <div className="res-user-meta">
                                            <h2>{name}'s Admission Portal</h2>
                                            <span>WhatsApp: {userProfile.whatsapp || 'Registered'} • Status: Active Aspirant</span>
                                        </div>
                                    </div>

                                    <div className="res-attempts-section">
                                        <h3>📋 Screening Test Attempt History</h3>

                                        <table className="attempts-table">
                                            <thead>
                                                <tr>
                                                    <th>Attempt #</th>
                                                    <th>Date & Time</th>
                                                    <th>Score</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attemptHistory.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                                                            No test attempts recorded yet. Click below to start your test!
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    attemptHistory.map((att, idx) => (
                                                        <tr key={idx}>
                                                            <td>Attempt #{att.attemptNum}</td>
                                                            <td>{att.timeStr}</td>
                                                            <td>{att.marks} / 25</td>
                                                            <td>
                                                                <span className={`status-tag ${att.isPassed ? 'passed' : 'failed'}`}>
                                                                    {att.isPassed ? 'PASSED ✓' : 'NEEDS PRACTICE'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {att.isPassed ? (
                                                                    <span className="action-txt">Eligible for LR</span>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        className="retake-sm-btn"
                                                                        onClick={startLiveEtQuiz}
                                                                    >
                                                                        Retake
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="res-lr-section">
                                        <div className="lr-card-box">
                                            <div className="lr-info">
                                                <h4>Level 2: Learning Round (LR) Booking</h4>
                                                <p>Practical 5-7 days evaluation call with NavGurukul Tech Mentors.</p>
                                                {bookedInterviewSlot && (
                                                    <div className="booked-slot-pill">
                                                        ✅ Interview Booked: <strong>{bookedInterviewSlot}</strong>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                className="book-slot-cta-btn"
                                                onClick={openSlotBookingModal}
                                            >
                                                <span>{bookedInterviewSlot ? 'Reschedule Slot 📅' : 'Book Interview Slot 📅'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
