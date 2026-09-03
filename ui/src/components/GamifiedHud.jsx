import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const GamifiedHud = () => {
    const { currentScreen, go } = useApp();
    const prevScreenRef = useRef(currentScreen);
    const [calloutText, setCalloutText] = React.useState('ZOOM! 🚀');
    const [showCallout, setShowCallout] = React.useState(false);
    const [isZoomingForward, setIsZoomingForward] = React.useState(false);
    const [isZoomingBackward, setIsZoomingBackward] = React.useState(false);

    const nodes = [
        { level: 0, icon: '🌱', tooltip: 'L1 · Gurukul Tree', left: '0%' },
        { level: 1, icon: '⚡', tooltip: 'L2 · Specialty Tracks', left: '20%' },
        { level: 2, icon: '💎', tooltip: 'L3 · 100% Scholarship', left: '40%' },
        { level: 3, icon: '🌟', tooltip: 'L4 · Vision & Impact', left: '60%' },
        { level: 4, icon: '🗺️', tooltip: 'L5 · Admission Roadmap', left: '80%' },
        { level: 5, icon: '🎓', tooltip: 'L6 · Book Free Test', left: '100%' }
    ];

    const fillWidth = `${(currentScreen / 5) * 100}%`;

    useEffect(() => {
        const isForward = currentScreen > prevScreenRef.current;
        const isBackward = currentScreen < prevScreenRef.current;
        prevScreenRef.current = currentScreen;

        if (isForward) {
            setIsZoomingForward(true);
            setIsZoomingBackward(false);
            const callouts = ["ZOOM! 🚀", "ZOOM, ZOOM! ⚡", "BOOST! 🌟", "+100 XP! 🎯", "LEVEL UP! 🔥", "FULL SPEED! ✈️"];
            setCalloutText(callouts[Math.floor(Math.random() * callouts.length)]);
            setShowCallout(true);
            setTimeout(() => setShowCallout(false), 1200);
            setTimeout(() => setIsZoomingForward(false), 800);

            // Spawn floating XP Toast brief popup
            const toast = document.createElement('div');
            toast.className = 'xp-toast';
            toast.textContent = '+100 XP 🎯';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 1200);
        } else if (isBackward) {
            setIsZoomingBackward(true);
            setIsZoomingForward(false);
            setTimeout(() => setIsZoomingBackward(false), 800);
        }
    }, [currentScreen]);

    return (
        <div id="hud">
            <div className="hud-brand" title="NavGurukul · Pravesh" onClick={() => go(0)} style={{ cursor: 'pointer' }}>
                <img src="/navgurukul-logo.png" alt="NavGurukul Logo" className="hud-brand-img" />
                <span className="hud-brand-title">· Pravesh</span>
            </div>

            <div className="hud-track-wrapper">
                <div className="hud-track" id="hudTrack">
                    <div className="hud-fill" id="hudFill" style={{ width: fillWidth }}></div>

                    <div className="hud-checkpoints">
                        {nodes.map((node) => (
                            <button
                                key={node.level}
                                className={`hud-node ${currentScreen === node.level ? 'active passed node-burst' : currentScreen > node.level ? 'passed' : ''}`}
                                style={{ left: node.left }}
                                onClick={() => go(node.level)}
                                aria-label={node.tooltip}
                            >
                                <span className="node-icon">{node.icon}</span>
                                <span className="node-tooltip">{node.tooltip}</span>
                            </button>
                        ))}
                    </div>

                    <div
                        className={`hud-vehicle-wrapper ${isZoomingForward ? 'is-zooming-forward' : ''} ${isZoomingBackward ? 'is-zooming-backward' : ''}`}
                        id="hudVehicleWrapper"
                        style={{ left: fillWidth }}
                    >
                        <div className={`hud-vehicle-callout ${showCallout ? 'show-callout' : ''}`} id="hudVehicleCallout">
                            {calloutText}
                        </div>
                        <div className="hud-vehicle" id="hudVehicle">
                            <div className="vehicle-thruster">
                                <span className="flame-core"></span>
                                <span className="flame-outer"></span>
                            </div>
                            <svg className="vehicle-svg" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10L1 3C0.5 2.2 1.2 1 2.2 1H8.5L12 10H6Z" fill="#d97706" />
                                <path d="M6 18L1 25C0.5 25.8 1.2 27 2.2 27H8.5L12 18H6Z" fill="#d97706" />
                                <path d="M4 8C4 8 10 6 22 6C34 6 42 12 43 14C42 16 34 22 22 22C10 22 4 20 4 20V8Z" fill="url(#hullGradient)" />
                                <path d="M34 8.5C38 10.5 42.5 13 43.5 14C42.5 15 38 17.5 34 19.5V8.5Z" fill="#f59e0b" />
                                <path d="M12 11H28C29.1 11 30 11.9 30 13V15C30 16.1 29.1 17 28 17H12V11Z" fill="#ffffff" opacity="0.3" />
                                <ellipse cx="26" cy="14" rx="7" ry="5" fill="url(#visorGradient)" stroke="#ffffff" strokeWidth="0.8" />
                                <circle cx="26" cy="13" r="2.5" fill="#fef08a" />
                                <path d="M23 17.5C23.8 16 25 15.5 26 15.5C27 15.5 28.2 16 29 17.5" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" />
                                <line x1="22" y1="11.5" x2="28" y2="11.5" stroke="#ffffff" strokeLinecap="round" opacity="0.7" />
                                <defs>
                                    <linearGradient id="hullGradient" x1="4" y1="14" x2="43" y2="14" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#be185d" />
                                        <stop offset="0.55" stopColor="#e91e63" />
                                        <stop offset="1" stopColor="#ea580c" />
                                    </linearGradient>
                                    <linearGradient id="visorGradient" x1="19" y1="9" x2="33" y2="19" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#0284c7" />
                                        <stop offset="1" stopColor="#38bdf8" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hud-level-badge" id="hudLevelBadge"></div>
        </div>
    );
};
