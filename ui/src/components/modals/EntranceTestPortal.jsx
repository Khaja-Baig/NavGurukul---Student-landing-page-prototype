import React, { useState, useEffect, useRef } from 'react';
import { useApp, etQuestionsData } from '../../context/AppContext';
import { LaunchTransitionOverlay } from './LaunchTransitionOverlay';

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
    const [loginLang, setLoginLang] = useState('en');
    const [step1Error, setStep1Error] = useState(false);
    const [showGreetingAck, setShowGreetingAck] = useState(false);
    const [hasSubmittedName, setHasSubmittedName] = useState(false);
    const [holoStage, setHoloStage] = useState('holo-stage-off');

    const handleStep1Continue = () => {
        const fn = userProfile.firstName ? userProfile.firstName.trim() : '';
        if (!fn) {
            setStep1Error(true);
            setTimeout(() => setStep1Error(false), 600);
            return;
        }

        setStudentName(fn);
        setHasSubmittedName(true);
        setShowGreetingAck(true);

        setTimeout(() => {
            setCockpitStep(2);
        }, 750);
    };

    // Guided Rule Sequence Animation States
    const [visibleStripes, setVisibleStripes] = useState([false, false, false, false]);
    const [activeStripeIdx, setActiveStripeIdx] = useState(null);
    const [isStartBtnVisible, setIsStartBtnVisible] = useState(false);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [customSpeechMsg, setCustomSpeechMsg] = useState(null);
    const sequenceTimersRef = useRef([]);

    const clearSequenceTimers = () => {
        sequenceTimersRef.current.forEach(t => clearTimeout(t));
        sequenceTimersRef.current = [];
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
            msg: 'Notebook aur pen paas mein zaroor rakhna.'
        },
        {
            icon: '📱',
            title: 'Mobile / Laptop Online Mode 📱',
            desc: 'You can solve all multiple-choice questions directly on your mobile device or laptop screen.',
            theme: 'card-theme-purple',
            msg: 'Test mobile ya laptop par online hoga.'
        },
        {
            icon: '🤝',
            title: 'Honesty Policy 🤝',
            desc: 'We evaluate true learning potential. Give your best effort without any unfair means or cheating.',
            theme: 'card-theme-green',
            msg: 'Aur honestly test dena — bina cheating ke.'
        }
    ];

    useEffect(() => {
        if (!isPortalOpen || portalStep !== 1) return;

        clearSequenceTimers();
        setIsUserInteracting(false);
        setVisibleStripes([false, false, false, false]);
        setActiveStripeIdx(null);
        setIsStartBtnVisible(false);
        setCustomSpeechMsg(null);

        // Delay 400ms -> Stripe 0
        sequenceTimersRef.current.push(setTimeout(() => {
            setVisibleStripes([true, false, false, false]);
            setActiveStripeIdx(0);
        }, 400));

        // Delay 1400ms -> Stripe 1
        sequenceTimersRef.current.push(setTimeout(() => {
            setVisibleStripes([true, true, false, false]);
            setActiveStripeIdx(1);
        }, 1400));

        // Delay 2400ms -> Stripe 2
        sequenceTimersRef.current.push(setTimeout(() => {
            setVisibleStripes([true, true, true, false]);
            setActiveStripeIdx(2);
        }, 2400));

        // Delay 3400ms -> Stripe 3
        sequenceTimersRef.current.push(setTimeout(() => {
            setVisibleStripes([true, true, true, true]);
            setActiveStripeIdx(3);
        }, 3400));

        // Delay 4400ms -> Reveal Start Button and clear highlight
        sequenceTimersRef.current.push(setTimeout(() => {
            setActiveStripeIdx(null);
            setIsStartBtnVisible(true);
        }, 4400));

        return () => {
            clearSequenceTimers();
        };
    }, [isPortalOpen, portalStep]);

    // Staggered Hologram Activation Animation (Matches legacy 4-stage JS sequence)
    useEffect(() => {
        if (isPortalOpen && portalStep === 2) {
            setHoloStage('holo-stage-off');

            const t0 = setTimeout(() => {
                setHoloStage('holo-stage-powering');
            }, 60);

            const t1 = setTimeout(() => {
                setHoloStage('holo-stage-powering holo-stage-beam');
            }, 300);

            const t2 = setTimeout(() => {
                setHoloStage('holo-stage-powering holo-stage-beam holo-stage-forming');
            }, 620);

            const t3 = setTimeout(() => {
                setHoloStage('holo-stage-ready');
            }, 1000);

            return () => {
                clearTimeout(t0);
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        } else {
            setHoloStage('holo-stage-off');
        }
    }, [isPortalOpen, portalStep]);

    // Avatar Gesture & Speech Bubble Reaction on Step Changes (Matches legacy JS)
    useEffect(() => {
        if (portalStep === 2) {
            const wrapper = document.getElementById('holoAvatarWrapper');
            if (wrapper) {
                wrapper.classList.remove('holo-gesture-react');
                void wrapper.offsetWidth; // trigger reflow for animation restart
                wrapper.classList.add('holo-gesture-react');
            }

            const caption = document.getElementById('holoGuideCaption');
            if (caption) {
                caption.classList.remove('caption-pop');
                void caption.offsetWidth; // trigger reflow for animation restart
                caption.classList.add('caption-pop');
            }
        }
    }, [cockpitStep, portalStep]);

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

    const handleStripeHover = (idx) => {
        clearSequenceTimers();
        setIsUserInteracting(true);
        setVisibleStripes([true, true, true, true]);
        setIsStartBtnVisible(true);
        setActiveStripeIdx(idx);
        setCustomSpeechMsg(stripeRules[idx].msg);
    };

    const handleStripeLeave = () => {
        setActiveStripeIdx(null);
        if (isUserInteracting) {
            setCustomSpeechMsg(`Kisi bhi instruction par hover karke details padhein ya<br/><strong>START Mission</strong> par click karke apna mission start<br/>karein! ✨`);
        } else {
            setCustomSpeechMsg(null);
        }
    };

    let currentStripeMsg = '';
    if (customSpeechMsg) {
        currentStripeMsg = customSpeechMsg;
    } else if (activeStripeIdx !== null && activeStripeIdx < stripeRules.length) {
        currentStripeMsg = stripeRules[activeStripeIdx].msg;
    } else if (isStartBtnVisible) {
        currentStripeMsg = `Jab aap ready ho jain, toh <strong>START Mission</strong> par click karke apna mission start karein! 🚀`;
    } else {
        currentStripeMsg = `Hey <span class="student-name-placeholder">${name}</span>! Aage badhne se pehle kuch important instructions padh lo. 💡`;
    }

    return (
        <div id="entranceTestPortalScreen" className={`et-portal-screen active ${portalStep === 2 ? 'et-cockpit-mode' : ''} ${portalStep === 5 ? 'step3-active et-quiz-mode' : ''} ${portalStep === 4 ? 'step4-active' : ''}`}>
            {/* ROCKET MISSION LAUNCH TRANSITION OVERLAY */}
            <LaunchTransitionOverlay />

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
                    {portalStep !== 5 ? (
                        <div className="et-mentor-card">
                            <div className="et-mentor-aura"></div>
                            <img src="/mentor-avatar2.png" alt="Mentor Asha" className="et-mentor-avatar" />
                            <div
                                className="et-speech-bubble"
                                id="etPortalSpeechBubble"
                                dangerouslySetInnerHTML={{ __html: currentStripeMsg }}
                            />
                        </div>
                    ) : (
                        <div className="et-step3-sidebar-wrapper">
                            {/* Top Speech Bubble above Asha */}
                            <div className="et-step3-top-bubble">
                                <div className="top-bubble-header">
                                    Chalo <span className="student-name-placeholder">{userProfile.firstName || name || 'Sujit'}</span> ! 💡
                                </div>
                                <div className="top-bubble-body">
                                    Logic lagao, best answer chuno aur apna score badhao!
                                </div>
                                <div className="step3-paper-plane" title="Paper plane decoration">
                                    <svg className="plane-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 2L11 13" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Center Avatar Stage with Floating Decorations */}
                            <div className="et-step3-avatar-stage">
                                <div className="floating-icon icon-lightbulb" title="Logic bulb">💡</div>
                                <div className="floating-sparkle sparkle-1">✨</div>
                                <div className="floating-sparkle sparkle-2">✦</div>
                                <img src="/mentor-avatar2.png" alt="Mentor Asha" className="et-step3-avatar-img" />
                            </div>

                            {/* Bottom Tip Card below Asha */}
                            <div className="et-step3-bottom-tip">
                                <div className="tip-star-badge">⭐</div>
                                <div className="tip-content">
                                    <div className="tip-header-text">
                                        <span className="tip-bold-pink">Tip: </span>
                                        <span className="tip-bold-dark" id="etStep3TipHeader">Dhyan se calculate karein! 🚀</span>
                                    </div>
                                    <div className="tip-sub-text" id="etStep3TipSub">
                                        {etQuestionsData[currentQuizQIndex]?.mentorMsg || 'Har 1 coder ko 1 program banane me 5 minutes hi lagte hain! 💡'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                                        className={`et-circle-start-btn et-ready-btn ${isStartBtnVisible ? 'visible' : ''}`}
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
                                <div className="et-rules-grid" onMouseLeave={handleStripeLeave}>
                                    {stripeRules.map((rule, idx) => (
                                        <div
                                            key={idx}
                                            className={`et-rule-card ${rule.theme} ${visibleStripes[idx] ? 'visible' : ''} ${activeStripeIdx === idx ? 'active-guide' : ''}`}
                                            onMouseEnter={() => handleStripeHover(idx)}
                                            onClick={() => handleStripeHover(idx)}
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
                                {/* 1. Background Space Starfield Layer */}
                                <div className="cockpit-bg-layer">
                                    <video
                                        className="cockpit-bg-video"
                                        src="/video.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className="cockpit-space-stars"></div>
                                    <div className="cockpit-nebula-pulse"></div>
                                </div>

                                {/* 2. Holographic Avatar Guide System (Console Projector on Left Side) */}
                                <div className={`cockpit-hologram-system ${holoStage}`} id="cockpitHologramSystem">
                                    <div className="holo-console-glow"></div>

                                    <div className="holo-projection-assembly">
                                        {/* Holographic Speech Bubble Caption */}
                                        <div className="holo-guide-caption caption-pop" id="holoGuideCaption">
                                            <div className="holo-caption-glow"></div>
                                            <div
                                                className="holo-caption-content"
                                                id="holoCaptionText"
                                                dangerouslySetInnerHTML={{
                                                    __html: {
                                                        1: `Hey Explorer! 👋<br>What’s your name?`,
                                                        2: `Great, ${userProfile.firstName || name}! 📸<br>Let’s add your photo`,
                                                        3: `Awesome! 🎂<br>When’s your birthday?`,
                                                        4: `Select your option ✨<br>Almost done with basic details`,
                                                        5: `Contact Phone 📱<br>How can we reach you?`,
                                                        6: `Email & PIN Code ✉️<br>Enter your email and PIN code`,
                                                        7: `Location Details 🏙️<br>Where are you located?`,
                                                        8: `Current Status 💼<br>Are you a student or job seeker?`,
                                                        9: `Qualification 📜<br>What is your education level?`,
                                                        10: `School Medium 📚<br>In which language did you study?`,
                                                        11: `Category Info 👥<br>Select your caste / category`,
                                                        12: `All Systems Ready! 🚀<br>Launch Entrance Test`
                                                    }[cockpitStep] || `Ready for launch! 🚀`
                                                }}
                                            />
                                            <div className="holo-caption-pointer"></div>
                                        </div>

                                        {/* Floating Holographic Avatar Unit */}
                                        <div className="holo-avatar-wrapper holo-gesture-react" id="holoAvatarWrapper">
                                            <div className="holo-particle-field">
                                                <span className="holo-particle p1"></span>
                                                <span className="holo-particle p2"></span>
                                                <span className="holo-particle p3"></span>
                                                <span className="holo-particle p4"></span>
                                                <span className="holo-particle p5"></span>
                                            </div>
                                            <div className="holo-scanlines"></div>
                                            <div className="holo-light-sweep"></div>
                                            <img src="/mentor-avatar2.png" alt="Holographic Guide" className="holo-avatar-img" id="holoAvatarImg" />
                                        </div>

                                        {/* Focused Vertical Cyan Light Beam */}
                                        <div className="holo-light-beam" id="holoLightBeam">
                                            <div className="beam-cone"></div>
                                            <div className="beam-core-glow"></div>
                                        </div>
                                    </div>

                                    {/* Physical Projector Base Unit on Console */}
                                    <div className="holo-projector-base" id="holoProjectorBase">
                                        <div className="projector-bezel">
                                            <div className="projector-glow-ring"></div>
                                            <div className="projector-lens-core"></div>
                                            <div className="projector-pulse-emitter"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Floating Cockpit Screen Viewport */}
                                <div className="cockpit-floating-stage">
                                    <div className="cockpit-stage-viewport">
                                        {/* TASK 1: NAME STEP */}
                                        {cockpitStep === 1 && (
                                            <div className={`floating-step-card active ${step1Error ? 'field-error-shake' : ''}`} id="missionStep1">
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
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setUserProfile({ ...userProfile, firstName: val });
                                                                    if (showGreetingAck) setShowGreetingAck(false);
                                                                    if (hasSubmittedName) setHasSubmittedName(false);
                                                                }}
                                                                onKeyDown={(e) => { if (e.key === 'Enter') handleStep1Continue(); }}
                                                            />
                                                        </div>
                                                        <div className="floating-input-wrapper secondary-wrap">
                                                            <span className="floating-icon">📝</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="Last Name (e.g. Kumar)"
                                                                value={userProfile.lastName}
                                                                onChange={(e) => {
                                                                    setUserProfile({ ...userProfile, lastName: e.target.value });
                                                                    if (showGreetingAck) setShowGreetingAck(false);
                                                                    if (hasSubmittedName) setHasSubmittedName(false);
                                                                }}
                                                                onKeyDown={(e) => { if (e.key === 'Enter') handleStep1Continue(); }}
                                                            />
                                                        </div>
                                                    </div>
                                                    {((showGreetingAck || hasSubmittedName) && userProfile.firstName.trim() !== '') && (
                                                        <div className="mission-greeting-ack" id="missionGreetingAck">
                                                            <span className="ack-icon">👋</span>
                                                            <span className="ack-text" id="ackText">
                                                                Nice to meet you, {userProfile.firstName.trim()}! 👋
                                                            </span>
                                                            <div className="ack-sparkles">✨ ✦ ⭐</div>
                                                        </div>
                                                    )}
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
                                                        onClick={handleStep1Continue}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 2: PHOTO STEP */}
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
                                                            {uploadedPhotoUrl || userProfile.photoUrl ? (
                                                                <div className="floating-photo-preview">
                                                                    <img src={uploadedPhotoUrl || userProfile.photoUrl} alt="Explorer Photo" id="cockpitPhotoImg" />
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

                                        {/* TASK 3: DATE OF BIRTH STEP */}
                                        {cockpitStep === 3 && (
                                            <div className="floating-step-card active" id="missionStep3">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">When’s your birthday? 🎂</h2>
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

                                        {/* TASK 4: GENDER STEP */}
                                        {cockpitStep === 4 && (
                                            <div className="floating-step-card active" id="missionStep4">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">How should we identify you? ✨</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row">
                                                        {[
                                                            { label: 'Male', icon: '👨‍🚀' },
                                                            { label: 'Female', icon: '👩‍🚀' },
                                                            { label: 'Other', icon: '🧑‍🚀' }
                                                        ].map(g => (
                                                            <button
                                                                key={g.label}
                                                                type="button"
                                                                className={`floating-gender-btn ${userProfile.gender === g.label ? 'selected' : ''}`}
                                                                onClick={() => setUserProfile({ ...userProfile, gender: g.label })}
                                                            >
                                                                <span className="gender-btn-icon">{g.icon}</span>
                                                                <span className="gender-btn-label">{g.label}</span>
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

                                        {/* TASK 5: CONTACT PHONE NUMBERS STEP */}
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
                                                                onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(6); }}
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
                                                                onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(6); }}
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

                                        {/* TASK 6: EMAIL & PIN CODE STEP */}
                                        {cockpitStep === 6 && (
                                            <div className="floating-step-card active" id="missionStep6">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Email & PIN Code ✉️</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group">
                                                        <div className="floating-input-wrapper">
                                                            <span className="floating-icon">✉️</span>
                                                            <input
                                                                type="email"
                                                                className="floating-text-input"
                                                                placeholder="Email Address (e.g. student@gmail.com)"
                                                                value={userProfile.email}
                                                                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                                onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(7); }}
                                                            />
                                                        </div>
                                                        <div className="floating-input-wrapper secondary-wrap" style={{ marginTop: '10px' }}>
                                                            <span className="floating-icon">📍</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                maxLength={6}
                                                                placeholder="6-Digit PIN Code"
                                                                value={userProfile.pincode}
                                                                onChange={(e) => setUserProfile({ ...userProfile, pincode: e.target.value })}
                                                                onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(7); }}
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
                                                        onClick={() => setCockpitStep(7)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 7: LOCATION DETAILS (DISTRICT & STATE) */}
                                        {cockpitStep === 7 && (
                                            <div className="floating-step-card active" id="missionStep7">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Where are you located? 🏙️</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group">
                                                        <div className="floating-input-wrapper">
                                                            <span className="floating-icon">🏙️</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="District (e.g. Patna)"
                                                                value={userProfile.district}
                                                                onChange={(e) => setUserProfile({ ...userProfile, district: e.target.value })}
                                                                onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(8); }}
                                                            />
                                                        </div>
                                                        <div className="floating-input-wrapper secondary-wrap" style={{ marginTop: '10px' }}>
                                                            <span className="floating-icon">🗺️</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="State (e.g. Bihar)"
                                                                value={userProfile.state}
                                                                onChange={(e) => setUserProfile({ ...userProfile, state: e.target.value })}
                                                                onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(8); }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(6)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(8)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 8: CURRENT STATUS STEP */}
                                        {cockpitStep === 8 && (
                                            <div className="floating-step-card active" id="missionStep8">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">What is your current status? 💼</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row">
                                                        {[
                                                            { label: 'Student', icon: '🎓' },
                                                            { label: 'Job Seeker', icon: '💼' },
                                                            { label: 'Other', icon: '🌟' }
                                                        ].map(st => (
                                                            <button
                                                                key={st.label}
                                                                type="button"
                                                                className={`floating-gender-btn cockpit-pill-btn ${userProfile.status === st.label ? 'selected' : ''}`}
                                                                onClick={() => setUserProfile({ ...userProfile, status: st.label })}
                                                            >
                                                                <span className="gender-btn-icon">{st.icon}</span>
                                                                <span className="gender-btn-label">{st.label}</span>
                                                                <span className="gender-btn-check">✓</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(7)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(9)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 9: HIGHEST QUALIFICATION STEP */}
                                        {cockpitStep === 9 && (
                                            <div className="floating-step-card active" id="missionStep9">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">What is your highest qualification? 📜</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row">
                                                        {[
                                                            { label: '10th Pass', icon: '📜' },
                                                            { label: '12th Pass', icon: '📖' },
                                                            { label: 'Graduate', icon: '🎓' }
                                                        ].map(q => (
                                                            <button
                                                                key={q.label}
                                                                type="button"
                                                                className={`floating-gender-btn cockpit-pill-btn ${userProfile.qualification === q.label ? 'selected' : ''}`}
                                                                onClick={() => setUserProfile({ ...userProfile, qualification: q.label })}
                                                            >
                                                                <span className="gender-btn-icon">{q.icon}</span>
                                                                <span className="gender-btn-label">{q.label}</span>
                                                                <span className="gender-btn-check">✓</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(8)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(10)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 10: SCHOOL MEDIUM STEP */}
                                        {cockpitStep === 10 && (
                                            <div className="floating-step-card active" id="missionStep10">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">What was your school medium? 📚</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row">
                                                        {[
                                                            { label: 'Hindi', icon: '📚' },
                                                            { label: 'English', icon: '🌐' },
                                                            { label: 'Regional', icon: '🗣️' }
                                                        ].map(m => (
                                                            <button
                                                                key={m.label}
                                                                type="button"
                                                                className={`floating-gender-btn cockpit-pill-btn ${userProfile.medium === m.label ? 'selected' : ''}`}
                                                                onClick={() => setUserProfile({ ...userProfile, medium: m.label })}
                                                            >
                                                                <span className="gender-btn-icon">{m.icon}</span>
                                                                <span className="gender-btn-label">{m.label}</span>
                                                                <span className="gender-btn-check">✓</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(9)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(11)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 11: CASTE / CATEGORY STEP */}
                                        {cockpitStep === 11 && (
                                            <div className="floating-step-card active" id="missionStep11">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Select your category / caste 👥</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row">
                                                        {[
                                                            { label: 'General', icon: '👥' },
                                                            { label: 'OBC', icon: '👥' },
                                                            { label: 'SC / ST', icon: '👥' }
                                                        ].map(cat => (
                                                            <button
                                                                key={cat.label}
                                                                type="button"
                                                                className={`floating-gender-btn cockpit-pill-btn ${userProfile.category === cat.label ? 'selected' : ''}`}
                                                                onClick={() => setUserProfile({ ...userProfile, category: cat.label })}
                                                            >
                                                                <span className="gender-btn-icon">{cat.icon}</span>
                                                                <span className="gender-btn-label">{cat.label}</span>
                                                                <span className="gender-btn-check">✓</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(10)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn primary-glow-btn"
                                                        onClick={() => setCockpitStep(12)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 12: FINAL CONFIRMATION & LAUNCH TEST */}
                                        {cockpitStep === 12 && (
                                            <div className="floating-step-card active" id="missionStep12">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title ready-sparkle-title">All Systems Ready! 🚀</h2>
                                                </div>
                                                <div className="floating-step-body text-center">
                                                    <div className="floating-summary-seal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.05)', padding: '10px 16px', borderRadius: '12px' }}>
                                                        <div className="summary-avatar-preview" id="summaryAvatarPreview" style={{ fontSize: '24px' }}>
                                                            {uploadedPhotoUrl || userProfile.photoUrl ? (
                                                                <img src={uploadedPhotoUrl || userProfile.photoUrl} alt="Preview" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                                                            ) : (
                                                                '👨‍🚀'
                                                            )}
                                                        </div>
                                                        <div className="summary-details" style={{ textAlign: 'left' }}>
                                                            <div className="summary-name" style={{ fontWeight: '700', fontSize: '13px', color: '#ffffff' }}>
                                                                {userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : name}
                                                            </div>
                                                            <div className="summary-sub" style={{ fontSize: '11px', color: '#94a3b8' }}>
                                                                {userProfile.district ? `${userProfile.district}, ${userProfile.state || ''}` : 'Location & Details Verified'}
                                                            </div>
                                                        </div>
                                                        <span className="summary-check-seal" style={{ marginLeft: 'auto', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800' }}>✓ VERIFIED</span>
                                                    </div>
                                                </div>
                                                <div className="floating-step-footer flex-between">
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn secondary-btn"
                                                        onClick={() => setCockpitStep(11)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn launch-glow-btn"
                                                        onClick={startLiveEtQuiz}
                                                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.5)' }}
                                                    >
                                                        <span>START Entrance Test 🚀</span>
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
                        <div className="et-step-pane active et-quiz-page-view" id="etStep3">
                            <div className="et-quiz-light-wrapper">
                                {/* RIGHT MAIN CARD */}
                                <div className="quiz-main-card">
                                    {/* Header: Test Title & Count Down Timer */}
                                    <div className="quiz-card-header">
                                        <div className="quiz-title-badge">
                                            <span className="quiz-title-icon">🧮</span>
                                            <span className="quiz-title-text">NavGurukul Logic & Problem Solving Test</span>
                                        </div>

                                        <div className="quiz-timer-badge">
                                            <span className="timer-label">TIME REMAINING</span>
                                            <div className="timer-value">
                                                <span className="timer-icon">⏱️</span>
                                                <span>{formatTime(quizTimerSeconds)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-Header Metadata: Question Counter & Category (10XP & Progress bar removed as requested) */}
                                    <div className="quiz-meta-row">
                                        <span className="meta-pill question-pill">
                                            Question {currentQuizQIndex + 1}/{etQuestionsData.length}
                                        </span>
                                        <span className="meta-pill category-pill">
                                            {etQuestionsData[currentQuizQIndex]?.topic || etQuestionsData[currentQuizQIndex]?.topicName || 'Logic & Calculation'}
                                        </span>
                                    </div>

                                    {/* Question Statement */}
                                    <div className="quiz-question-box">
                                        <span className="q-badge-icon">?</span>
                                        <h3 className="q-text-content">
                                            {etQuestionsData[currentQuizQIndex]?.text || etQuestionsData[currentQuizQIndex]?.question}
                                        </h3>
                                    </div>

                                    {/* 2x2 Options Grid */}
                                    <div className="quiz-options-grid">
                                        {etQuestionsData[currentQuizQIndex]?.options.map((opt, oIdx) => {
                                            const isSelected = userAnswers[currentQuizQIndex] === oIdx;
                                            const letter = String.fromCharCode(65 + oIdx);
                                            return (
                                                <button
                                                    key={oIdx}
                                                    type="button"
                                                    className={`grid-option-card ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => setUserAnswers({ ...userAnswers, [currentQuizQIndex]: oIdx })}
                                                >
                                                    <span className="grid-opt-letter">{letter}</span>
                                                    <span className="grid-opt-text">{opt}</span>
                                                    <span className="grid-radio-icon">
                                                        {isSelected ? '⦿' : '◯'}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Card Footer Row: Quick Tip & Action Area (Answer & Earn removed as requested) */}
                                    <div className="quiz-card-footer">
                                        <div className="quick-tip-card">
                                            <span className="tip-flash-icon">⚡</span>
                                            <div className="tip-text-body">
                                                <span className="tip-label">Quick Tip</span>
                                                <span className="tip-content">
                                                    {etQuestionsData[currentQuizQIndex]?.mentorMsg || 'Time is directly proportional to work when number of coders changes.'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="quiz-action-area">
                                            {currentQuizQIndex > 0 && (
                                                <button
                                                    type="button"
                                                    className="quiz-sub-prev-btn"
                                                    onClick={() => setCurrentQuizQIndex(prev => prev - 1)}
                                                >
                                                    ← Previous
                                                </button>
                                            )}

                                            {currentQuizQIndex < etQuestionsData.length - 1 ? (
                                                <button
                                                    type="button"
                                                    className="quiz-primary-next-btn"
                                                    onClick={() => setCurrentQuizQIndex(prev => prev + 1)}
                                                >
                                                    <span>Next Question →</span>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="quiz-primary-next-btn submit-style"
                                                    onClick={finishEtQuiz}
                                                >
                                                    <span>Submit Test 🚀</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: RESULTS & ATTEMPT HISTORY DASHBOARD */}
                    {portalStep === 4 && (() => {
                        const displayHistory = attemptHistory.length > 0 ? attemptHistory : [
                            { attemptNum: 1, timeStr: '08/27/2026, 11:58 AM', marks: 20, isPassed: true }
                        ];
                        const hasAnyPassed = displayHistory.some(a => a.isPassed);

                        const displayName = (userProfile.firstName || userProfile.lastName)
                            ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
                            : (studentName && studentName !== 'Friend' ? studentName : 'Sujit');
                        const displayEmail = userProfile.email || 'sujitkumar19013@gmail.com';
                        const displayPhone = userProfile.phone || userProfile.whatsapp || '3512313132';
                        const displayState = userProfile.state || 'Chhattisgarh';
                        const displaySchool = userProfile.selectedSchool || 'School of Programming (SOP)';

                        return (
                            <div className="et-step-pane active" id="etStep4">
                                <div className="et-results-container">
                                    {/* Student Details Card */}
                                    <div className="res-card res-student-card">
                                        <div className="res-card-title">
                                            <span className="card-title-icon student-icon">👤</span>
                                            <h3>Student Details</h3>
                                        </div>
                                        <div className="res-details-grid">
                                            <div className="res-detail-item">
                                                <span className="res-detail-label">Name:</span>
                                                <span className="res-detail-val">{displayName}</span>
                                            </div>
                                            <div className="res-detail-item">
                                                <span className="res-detail-label">Email:</span>
                                                <span className="res-detail-val">{displayEmail}</span>
                                            </div>
                                            <div className="res-detail-item">
                                                <span className="res-detail-label">Phone Number:</span>
                                                <span className="res-detail-val">{displayPhone}</span>
                                            </div>
                                            <div className="res-detail-item">
                                                <span className="res-detail-label">State:</span>
                                                <span className="res-detail-val">{displayState}</span>
                                            </div>
                                            <div className="res-detail-item full-width">
                                                <span class="res-detail-label">Selected School:</span>
                                                <span className="res-detail-val">{displaySchool}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Test Results & Slot Booking Card */}
                                    <div className="res-card res-results-card">
                                        <div className="res-card-title">
                                            <span className="card-title-icon test-icon">📑</span>
                                            <h3>Test Results & Slot Booking</h3>
                                        </div>

                                        <div className="res-table-wrapper">
                                            <table className="res-table">
                                                <thead>
                                                    <tr>
                                                        <th>STAGE</th>
                                                        <th>STATUS</th>
                                                        <th>SCHEDULED TIME</th>
                                                        <th>ACTIONS</th>
                                                        <th>MARKS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {displayHistory.map((attempt, index) => {
                                                        const isLatest = (index === displayHistory.length - 1);
                                                        const stageName = (displayHistory.length > 1)
                                                            ? `Screening Test (Attempt ${attempt.attemptNum})`
                                                            : `Screening Test`;

                                                        const canRetest = !attempt.isPassed && isLatest && !hasAnyPassed;

                                                        return (
                                                            <tr key={index}>
                                                                <td className="td-stage">
                                                                    <div className="stage-cell">
                                                                        <span className="stage-icon st-icon">📄</span>
                                                                        <span className="stage-name-text">{stageName}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="td-status">
                                                                    {attempt.isPassed ? (
                                                                        <span className="res-status-badge status-pass">✓ Pass</span>
                                                                    ) : (
                                                                        <span className="res-status-badge status-fail">✖ Fail</span>
                                                                    )}
                                                                </td>
                                                                <td className="td-time">
                                                                    <span className="time-cell">
                                                                        <span className="cal-icon">📅</span> {attempt.timeStr}
                                                                    </span>
                                                                </td>
                                                                <td className="td-actions">
                                                                    {canRetest ? (
                                                                        <button type="button" className="res-action-btn btn-retest" onClick={startLiveEtQuiz}>
                                                                            Retest
                                                                        </button>
                                                                    ) : (
                                                                        '–'
                                                                    )}
                                                                </td>
                                                                <td className="td-marks">{attempt.marks}</td>
                                                            </tr>
                                                        );
                                                    })}

                                                    {hasAnyPassed && (
                                                        <tr id="resRowLearning">
                                                            <td className="td-stage">
                                                                <div className="stage-cell">
                                                                    <span className="stage-icon lr-icon">👥</span>
                                                                    <span className="stage-name-text">Learning Round</span>
                                                                </div>
                                                            </td>
                                                            <td className="td-status">
                                                                {bookedInterviewSlot ? (
                                                                    <span className="res-status-badge status-scheduled">✔ Scheduled</span>
                                                                ) : (
                                                                    <span className="res-status-badge status-pending">⏳ Pending</span>
                                                                )}
                                                            </td>
                                                            <td className="td-time">
                                                                <span className="time-cell">
                                                                    <span className="cal-icon">📅</span> {bookedInterviewSlot || 'Not Scheduled'}
                                                                </span>
                                                            </td>
                                                            <td className="td-actions">
                                                                {!bookedInterviewSlot ? (
                                                                    <button type="button" className="res-action-btn btn-book-slot" onClick={openSlotBookingModal}>
                                                                        Book Slot
                                                                    </button>
                                                                ) : (
                                                                    '–'
                                                                )}
                                                            </td>
                                                            <td className="td-marks">–</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </section>
            </main>
        </div>
    );
};
