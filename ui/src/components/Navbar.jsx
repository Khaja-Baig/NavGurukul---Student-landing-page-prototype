import React, { useState, useEffect } from 'react';
import { useApp, levelData } from '../context/AppContext';

export const Navbar = () => {
    const { currentScreen, xp, openLoginModal } = useApp();
    const [displayTitle, setDisplayTitle] = useState(levelData[0].title);

    useEffect(() => {
        const targetText = levelData[currentScreen]?.title || 'GURUKUL TREE';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#@&*!';
        let iterations = 0;
        const maxIterations = 8;
        const intervalTime = 350 / maxIterations;

        const interval = setInterval(() => {
            setDisplayTitle(
                targetText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ' || index < (iterations / maxIterations) * targetText.length) {
                            return targetText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            iterations++;
            if (iterations >= maxIterations) {
                clearInterval(interval);
                setDisplayTitle(targetText);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [currentScreen]);

    return (
        <header className="brand-header">
            <div className="brand-logo">
                <img src="/assets/navgurukul-logo.png" alt="NavGurukul Logo" className="logo-img" />
                <div className="brand-text">
                    <h1>NavGurukul</h1>
                    <span className="brand-sub">100% Free Residential Higher Education</span>
                </div>
            </div>

            <div className="header-badge" id="hudLevelBadge">
                <span className="badge-pulse"></span>
                <span className="badge-tag">LVL 0{currentScreen + 1}</span>
                <span className="badge-divider">•</span>
                <span className="badge-title">{displayTitle}</span>
            </div>

            <div className="xp-chip" id="hudXpChip">
                <span className="xp-star">⭐</span>
                <span className="xp-val" id="hudXpVal">{xp.toLocaleString()} XP</span>

                <button
                    type="button"
                    className="header-g-login-btn"
                    onClick={openLoginModal}
                    title="Sign in with Google"
                >
                    <svg className="g-btn-icon" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign In</span>
                </button>
            </div>
        </header>
    );
};
