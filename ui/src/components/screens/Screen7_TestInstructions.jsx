import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const Screen7_TestInstructions = () => {
    const {
        currentScreen,
        studentName,
        startRocketLaunchTransition
    } = useApp();

    const [visibleStripes, setVisibleStripes] = useState([false, false, false, false]);
    const [activeStripeIdx, setActiveStripeIdx] = useState(null);
    const [isStartBtnVisible, setIsStartBtnVisible] = useState(false);
    const [customSpeechMsg, setCustomSpeechMsg] = useState(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    const sequenceTimersRef = useRef([]);

    const clearSequenceTimers = () => {
        sequenceTimersRef.current.forEach(t => clearTimeout(t));
        sequenceTimersRef.current = [];
    };

    const stripeRules = [
        {
            icon: '⏱️',
            title: '1 Hour Test ⏱️',
            desc: 'The test will takes around 1 hour. Please find a quiet place with no distractions.',
            theme: 'card-theme-pink',
            msg: 'Sabse pehle, test complete karne ke liye 1 hour milega. ⏱️'
        },
        {
            icon: '📝',
            title: 'Notebook & Pen 📝',
            desc: 'Keep a rough notebook and pen for quick calculation and notes.',
            theme: 'card-theme-orange',
            msg: 'Notebook aur pen paas mein zaroor rakhna.'
        },
        {
            icon: '📱',
            title: 'Mobile / Laptop 📱',
            desc: 'Use any device (mobile or laptop) with a stable internet connection.',
            theme: 'card-theme-purple',
            msg: 'Test mobile ya laptop par online hoga.'
        },
        {
            icon: '🤝',
            title: 'Honesty Policy 🤝',
            desc: "Give your best effort without cheating. It's all about your learning!",
            theme: 'card-theme-green',
            msg: 'Aur honestly test dena — bina cheating ke.'
        }
    ];

    useEffect(() => {
        if (currentScreen !== 6) return;

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
    }, [currentScreen]);

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

    const name = (studentName && studentName !== 'Friend') ? studentName : 'Friend';

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
        <section className={`screen screen-instructions ${currentScreen === 6 ? 'active' : ''}`} data-i="6">
            {/* Main Workspace Body Grid */}
            <main className="et-portal-body step1-active">
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
                    <div className="et-step-pane active" id="etStep1">
                        <div className="et-pane-header">
                            <h2 className="et-pane-title">
                                NavGurukul Entrance Test <br className="et-title-break" />Instructions
                            </h2>
                            <p className="et-pane-sub">Please read the following important instructions carefully before starting your screening test.</p>
                        </div>

                        <div className="et-rules-grid-stage">
                            {/* Gamified Animated Circle START CTA */}
                            <div className="et-circle-start-wrap">
                                <div className="et-btn-action-row">
                                    <span className="et-side-sparkle left">✨</span>
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
                                            <span className="circle-arrow-mobile">→</span>
                                        </div>
                                        <div className="circle-hover-tooltip">
                                            <span>Tap to Start! 🎯</span>
                                        </div>
                                    </button>
                                    <span className="et-side-sparkle right">✨</span>
                                </div>
                                <div className={`et-safe-hands-badge ${isStartBtnVisible ? 'visible' : ''}`}>
                                    <span className="safe-hands-sparkle">·</span>
                                    <span className="safe-hands-shield">🛡️</span>
                                    <span className="safe-hands-text">You're in safe hands</span>
                                    <span className="safe-hands-sparkle">·</span>
                                </div>
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
                </section>
            </main>
        </section>
    );
};
