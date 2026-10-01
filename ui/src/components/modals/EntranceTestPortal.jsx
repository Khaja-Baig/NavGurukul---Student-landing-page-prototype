import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
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
        openCampusPage,
        go
    } = useApp();

    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('');
    const [loginLang, setLoginLang] = useState('en');
    const [step1Error, setStep1Error] = useState(false);
    const [showGreetingAck, setShowGreetingAck] = useState(false);
    const [hasSubmittedName, setHasSubmittedName] = useState(false);
    const [holoStage, setHoloStage] = useState('holo-stage-off');
    const [qSlideAnimClass, setQSlideAnimClass] = useState('');
    const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    useEffect(() => {
        setIsHeaderScrolled(false);

        const handleScroll = () => {
            const portalScreen = document.getElementById('entranceTestPortalScreen');
            const portalBody = document.querySelector('.et-portal-body');
            const screenScroll = portalScreen ? portalScreen.scrollTop : 0;
            const bodyScroll = portalBody ? portalBody.scrollTop : 0;
            const winScroll = window.scrollY || document.documentElement.scrollTop || 0;
            setIsHeaderScrolled(screenScroll > 8 || bodyScroll > 8 || winScroll > 8);
        };

        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

        const portalScreen = document.getElementById('entranceTestPortalScreen');
        if (portalScreen) {
            portalScreen.addEventListener('scroll', handleScroll, { passive: true });
        }
        const portalBody = document.querySelector('.et-portal-body');
        if (portalBody) {
            portalBody.addEventListener('scroll', handleScroll, { passive: true });
        }

        handleScroll();
        const t = setTimeout(handleScroll, 100);

        return () => {
            clearTimeout(t);
            window.removeEventListener('scroll', handleScroll, { capture: true });
            document.removeEventListener('scroll', handleScroll, { capture: true });
            if (portalScreen) {
                portalScreen.removeEventListener('scroll', handleScroll);
            }
            if (portalBody) {
                portalBody.removeEventListener('scroll', handleScroll);
            }
        };
    }, [portalStep]);

    // Lock body scrolling when the portal is open to prevent double scrollbars
    useEffect(() => {
        if (isPortalOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isPortalOpen]);

    const handleStartTestInCockpit = () => {
        startReverseRocketLaunchTransition(null, 'LANDING AT OUR CAMPUSES...', () => {
            openCampusPage();
        });
        setTimeout(() => {
            openCampusPage();
        }, 800);
    };

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

    const handlePopupBack = () => {
        const env = document.getElementById('rocketInteriorEnv');
        if (env && env.classList.contains('cockpit-exit-sequence')) {
            return;
        }

        if (portalStep === 2) {
            if (typeof cockpitStep === 'number' && cockpitStep > 0) {
                setCockpitStep(prev => prev - 1);
            } else {
                startReverseRocketLaunchTransition();
            }
        } else {
            closePortal();
        }
    };

    const cockpitVideoRef = useRef(null);

    useEffect(() => {
        let animId;
        const checkVideoTime = () => {
            if (cockpitVideoRef.current) {
                if (cockpitVideoRef.current.currentTime >= 8) {
                    cockpitVideoRef.current.currentTime = 0;
                    cockpitVideoRef.current.play().catch(() => { });
                }
            }
            animId = requestAnimationFrame(checkVideoTime);
        };
        if (portalStep === 2) {
            animId = requestAnimationFrame(checkVideoTime);
        }
        return () => {
            if (animId) cancelAnimationFrame(animId);
        };
    }, [portalStep]);



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

    if (!isPortalOpen || portalStep === 1) return null;

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



    return (
        <div id="entranceTestPortalScreen" className={`et-portal-screen active ${portalStep === 1 ? 'step1-active' : ''} ${portalStep === 2 ? 'et-cockpit-mode' : ''} ${portalStep === 5 ? 'step3-active et-quiz-mode' : ''} ${portalStep === 4 ? 'step4-active' : ''}`}>
            {/* ROCKET MISSION LAUNCH TRANSITION OVERLAY */}
            <LaunchTransitionOverlay />

            {/* Ambient Glowing Background FX */}
            <div className="world-overlay" style={{ opacity: 0.5 }}></div>
            <div className="et-portal-glow glow-1"></div>
            <div className="et-portal-glow glow-2"></div>

            {/* Top Navigation HUD Header */}
            <header className={`et-portal-header ${isHeaderScrolled ? 'is-scrolled' : ''}`}>
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
            <main className={`et-portal-body ${portalStep === 2 ? 'step2-active' : ''} ${portalStep === 5 ? 'step3-active' : ''} ${portalStep === 4 ? 'step4-active' : ''}`}>
                {/* Left Hero Sidebar: Mentor Asha for Quiz Mode */}
                {portalStep === 5 && (
                    <aside className="et-hero-sidebar">
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
                    </aside>
                )}

                {/* Right Main Canvas */}
                <section className="et-portal-canvas">
                    {/* STEP 1: INSTRUCTIONS (Removed - now handled directly by Screen7_TestInstructions on Slide 7) */}

                    {/* STEP 2: ROCKET COCKPIT ONBOARDING */}
                    {portalStep === 2 && (
                        <div className="et-step-pane active" id="etStep2">
                            <div className="rocket-interior-environment active" id="rocketInteriorEnv">
                                {/* 1. Background Space Starfield Layer */}
                                <div className="cockpit-bg-layer">
                                    <video
                                        ref={cockpitVideoRef}
                                        className="cockpit-bg-video"
                                        src="/video5.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        onTimeUpdate={(e) => {
                                            if (e.currentTarget.currentTime >= 8) {
                                                e.currentTarget.currentTime = 0;
                                                e.currentTarget.play().catch(() => { });
                                            }
                                        }}
                                    />
                                    <div className="cockpit-space-stars"></div>
                                    <div className="cockpit-nebula-pulse"></div>

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
                                                        0: `Welcome Explorer! 🌟<br>Let’s start your dream journey!`,
                                                        1: `Hey Explorer! 👋<br>What’s your name?`,
                                                        2: `Contact Details 📱<br>Enter Phone, WhatsApp & Email`,
                                                        3: `Awesome, ${userProfile.firstName || name}! 🎂<br>Select your DOB & Gender`,
                                                        4: `Location Details 🏙️<br>Enter State, District & School`,
                                                        5: `Category Info 👥<br>Select your category`,
                                                        6: `Qualification 📜<br>What is your highest education level?`,
                                                        7: `Education Details 🏫<br>Enter your School or Institute name`,
                                                        8: `Almost done, ${userProfile.firstName || name}! 📸<br>Let’s add your photo`,
                                                        9: `All Systems Ready! 🚀<br>Choose Campus to proceed`,
                                                        'test_init': `Initializing test mode... 🚀<br>Calibrating system`,
                                                        'test': `Read carefully and choose the best answer. 🚀`,
                                                        'test_submitting': `Submitting test... 📊<br>Analyzing responses`,
                                                        'test_results': `Test Completed! 🎉<br>Check your final score`
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
                                    {/* Responsive Top-Left Back / Close Arrow Button (Only on First Welcome Step) */}
                                    {cockpitStep === 0 && (
                                        <button
                                            type="button"
                                            className="cockpit-popup-back-btn"
                                            id="cockpitPopupBackBtn"
                                            onClick={handlePopupBack}
                                            aria-label="Back"
                                            title="Back"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 12H5M12 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}
                                    <div className="cockpit-stage-viewport">
                                        {/* TASK 0: WELCOME & AUTH METHOD STEP (From Reference Mockup) */}
                                        {cockpitStep === 0 && (
                                            <div className="floating-step-card active auth-welcome-card" id="missionStep0">
                                                <div className="auth-welcome-header text-center">
                                                    <h2 className="auth-welcome-title">
                                                        Your dream <br />
                                                        deserves a <span className="guide-word-highlight">
                                                            guide
                                                            <svg className="guide-swoosh-svg" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2 6.5C24 2 52 2 70 6.5" stroke="url(#guideSwooshGrad)" strokeWidth="3.2" strokeLinecap="round" />
                                                                <defs>
                                                                    <linearGradient id="guideSwooshGrad" x1="2" y1="6.5" x2="70" y2="6.5" gradientUnits="userSpaceOnUse">
                                                                        <stop stopColor="#e91e63" />
                                                                        <stop offset="1" stopColor="#ea580c" />
                                                                    </linearGradient>
                                                                </defs>
                                                            </svg>
                                                        </span>
                                                    </h2>
                                                    <p className="auth-welcome-subtitle">
                                                        Let's get started on your dream journey!
                                                    </p>
                                                </div>

                                                <div className="auth-welcome-body">
                                                    {/* 1. Continue with Google Button */}
                                                    <button
                                                        type="button"
                                                        className="auth-google-btn"
                                                        onClick={() => {
                                                            setUserProfile(prev => ({
                                                                ...prev,
                                                                firstName: prev.firstName || 'Rahul',
                                                                lastName: prev.lastName || 'Kumar',
                                                                email: prev.email || 'rahul.kumar@gmail.com'
                                                            }));
                                                            setStudentName('Rahul');
                                                            setCockpitStep(1);
                                                        }}
                                                    >
                                                        <span className="auth-google-icon-wrapper">
                                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.6-5.2 3.6-9.15z"/>
                                                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.09-6.67-4.9H1.27v3.13C3.25 21.3 7.31 24 12 24z"/>
                                                                <path fill="#FBBC05" d="M5.33 14.3c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3V6.57H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.43l4.06-3.13z"/>
                                                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.57l4.06 3.13c.94-2.81 3.57-4.9 6.67-4.9z"/>
                                                            </svg>
                                                        </span>
                                                        <span className="auth-btn-label">Continue with Google</span>
                                                    </button>

                                                    {/* 2. OR Divider */}
                                                    <div className="auth-or-divider">
                                                        <span className="divider-line"></span>
                                                        <span className="divider-text">OR</span>
                                                        <span className="divider-line"></span>
                                                    </div>

                                                    {/* 3. Enter Manually Button */}
                                                    <button
                                                        type="button"
                                                        className="auth-manual-btn"
                                                        onClick={() => setCockpitStep(1)}
                                                    >
                                                        <span className="auth-manual-icon">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                <circle cx="12" cy="7" r="4" />
                                                            </svg>
                                                        </span>
                                                        <span className="auth-btn-label">Enter Manually</span>
                                                    </button>
                                                </div>

                                                {/* 4. Trust Footer Badge */}
                                                <div className="auth-trust-badge">
                                                    <span className="trust-sparkle">✨</span>
                                                    <span className="trust-shield">🛡️</span>
                                                    <span className="trust-text">Your data is safe with us</span>
                                                    <span className="trust-sparkle">✨</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 1: NAME STEP */}
                                        {cockpitStep === 1 && (
                                            <div className={`floating-step-card active ${step1Error ? 'field-error-shake' : ''}`} id="missionStep1">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">What's your name? 👤</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group name-fields-group">
                                                        {/* 1. First Name Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    First Name <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">👤</span>
                                                                <input
                                                                    type="text"
                                                                    className="floating-text-input"
                                                                    placeholder="First Name ( Rahul )"
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
                                                        </div>

                                                        {/* 2. Last Name Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    Last Name <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper secondary-wrap">
                                                                <span className="floating-icon">📝</span>
                                                                <input
                                                                    type="text"
                                                                    className="floating-text-input"
                                                                    placeholder="Last Name ( Kumar )"
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
                                                        onClick={() => setCockpitStep(0)}
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

                                        {/* TASK 2: PHONE & EMAIL STEP */}
                                        {cockpitStep === 2 && (
                                            <div className="floating-step-card active" id="missionStep2">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Contact Details 📱</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group contact-fields-group">
                                                        {/* 1. Phone Number Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    Phone Number <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">📞</span>
                                                                <input
                                                                    type="tel"
                                                                    className="floating-text-input"
                                                                    placeholder="9876543210"
                                                                    value={userProfile.phone}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value;
                                                                        setUserProfile(prev => ({
                                                                            ...prev,
                                                                            phone: val,
                                                                            whatsapp: (!prev.whatsapp || prev.whatsapp === prev.phone) ? val : prev.whatsapp
                                                                        }));
                                                                    }}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(3); }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* 2. WhatsApp Number Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    WhatsApp Number <span className="req-star">*</span>
                                                                </label>
                                                                {userProfile.phone && userProfile.whatsapp !== userProfile.phone && (
                                                                    <button
                                                                        type="button"
                                                                        className="same-as-phone-btn"
                                                                        onClick={() => setUserProfile({ ...userProfile, whatsapp: userProfile.phone })}
                                                                    >
                                                                        Same as Phone
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">💬</span>
                                                                <input
                                                                    type="tel"
                                                                    className="floating-text-input"
                                                                    placeholder="9876543210"
                                                                    value={userProfile.whatsapp}
                                                                    onChange={(e) => setUserProfile({ ...userProfile, whatsapp: e.target.value })}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(3); }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* 3. Email Address Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    Email Address <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">✉️</span>
                                                                <input
                                                                    type="email"
                                                                    className="floating-text-input"
                                                                    placeholder="rahul@example.com"
                                                                    value={userProfile.email}
                                                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(3); }}
                                                                />
                                                            </div>
                                                        </div>
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

                                        {/* TASK 3: DOB & GENDER STEP */}
                                        {cockpitStep === 3 && (
                                            <div className="floating-step-card active" id="missionStep3">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Birthday & Gender 🎂</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="dob-gender-fields-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                                                        {/* 1. Date of Birth Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    Date of Birth <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">📅</span>
                                                                <input
                                                                    type="date"
                                                                    className="floating-text-input floating-date-picker"
                                                                    value={userProfile.dob}
                                                                    onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(4); }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* 2. Gender Selection Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    Gender <span className="req-star">*</span>
                                                                </label>
                                                            </div>
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

                                        {/* TASK 4: STATE, DISTRICT & SCHOOL STEP */}
                                        {cockpitStep === 4 && (
                                            <div className="floating-step-card active" id="missionStep4">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Where are you located? 🏙️</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="location-fields-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                                                        {/* 1. State Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    State <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">🗺️</span>
                                                                <input
                                                                    type="text"
                                                                    className="floating-text-input"
                                                                    placeholder="e.g. Bihar / Maharashtra"
                                                                    value={userProfile.state}
                                                                    onChange={(e) => setUserProfile({ ...userProfile, state: e.target.value })}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(5); }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* 2. District Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    District <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">🏙️</span>
                                                                <input
                                                                    type="text"
                                                                    className="floating-text-input"
                                                                    placeholder="e.g. Patna / Pune"
                                                                    value={userProfile.district}
                                                                    onChange={(e) => setUserProfile({ ...userProfile, district: e.target.value })}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(5); }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* 3. School / Institute Name Field */}
                                                        <div className="floating-input-field">
                                                            <div className="floating-label-row">
                                                                <label className="floating-input-label">
                                                                    School / Institute Name <span className="req-star">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="floating-input-wrapper">
                                                                <span className="floating-icon">🏫</span>
                                                                <input
                                                                    type="text"
                                                                    className="floating-text-input"
                                                                    placeholder="e.g. Govt High School / ABC College"
                                                                    value={userProfile.schoolName || ''}
                                                                    onChange={(e) => setUserProfile({ ...userProfile, schoolName: e.target.value })}
                                                                    onKeyDown={(e) => { if (e.key === 'Enter') setCockpitStep(5); }}
                                                                />
                                                            </div>
                                                        </div>
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

                                        {/* TASK 5: CATEGORY STEP */}
                                        {cockpitStep === 5 && (
                                            <div className="floating-step-card active" id="missionStep5">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">Select your category 👥</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row category-4-row">
                                                        {[
                                                            { label: 'General', icon: '👥' },
                                                            { label: 'OBC', icon: '👥' },
                                                            { label: 'SC', icon: '👥' },
                                                            { label: 'ST', icon: '👥' },
                                                            { label: 'Others', icon: '👥' }
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

                                        {/* TASK 6: HIGHEST QUALIFICATION STEP */}
                                        {cockpitStep === 6 && (
                                            <div className="floating-step-card active" id="missionStep6">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">What is your highest qualification? 📜</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-gender-row qual-4-grid">
                                                        {[
                                                            { label: '12th Pass', icon: '📚' },
                                                            { label: 'Pursuing College', icon: '🏫' },
                                                            { label: 'Graduated', icon: '🎓' },
                                                            { label: 'Diploma', icon: '📜' }
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
                                                        onClick={() => setCockpitStep(5)}
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

                                        {/* TASK 7: SCHOOL / INSTITUTE NAME STEP */}
                                        {cockpitStep === 7 && (
                                            <div className="floating-step-card active" id="missionStep7">
                                                <div className="floating-step-header text-center">
                                                    <h2 className="floating-prompt-title">School / Institute Name 🏫</h2>
                                                </div>
                                                <div className="floating-step-body">
                                                    <div className="floating-input-group">
                                                        <div className="floating-input-wrapper">
                                                            <span className="floating-icon">🏫</span>
                                                            <input
                                                                type="text"
                                                                className="floating-text-input"
                                                                placeholder="School or College Name (Govt Senior Secondary School)"
                                                                value={userProfile.schoolName || ''}
                                                                onChange={(e) => setUserProfile({ ...userProfile, schoolName: e.target.value })}
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

                                        {/* TASK 8: PHOTO STEP */}
                                        {cockpitStep === 8 && (
                                            <div className="floating-step-card active" id="missionStep8">
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
                                                                <div className="floating-photo-uploaded-wrap">
                                                                    <div className="floating-photo-preview">
                                                                        <img src={uploadedPhotoUrl || userProfile.photoUrl} alt="Explorer Photo" id="cockpitPhotoImg" />
                                                                        <span className="photo-change-overlay">✏️ Change</span>
                                                                    </div>
                                                                    <span className="photo-change-hint">✏️ Tap to change photo</span>
                                                                </div>
                                                            ) : (
                                                                <div className="floating-photo-placeholder">
                                                                    <div className="photo-cam-icon-glow">📷</div>
                                                                    <span className="photo-main-text">Add Your Photo</span>
                                                                    <span className="photo-sub-text">Tap to upload your picture</span>
                                                                </div>
                                                            )}
                                                        </label>
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
                                                        onClick={() => setCockpitStep(9)}
                                                    >
                                                        <span>Continue →</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* TASK 9: FINAL CONFIRMATION & LAUNCH TEST */}
                                        {cockpitStep === 9 && (
                                            <div className="floating-step-card active" id="missionStep9">
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
                                                                {userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName || ''}`.trim() : name}
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
                                                        onClick={() => setCockpitStep(8)}
                                                    >
                                                        <span>← Back</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="floating-action-btn launch-glow-btn"
                                                        onClick={handleStartTestInCockpit}
                                                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.5)' }}
                                                    >
                                                        <span>Choose Campus 🚀</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

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