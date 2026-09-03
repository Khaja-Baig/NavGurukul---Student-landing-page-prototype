import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Screen6_BookFreeTest = () => {
    const { currentScreen, openLoginModal } = useApp();
    const [confettiPieces, setConfettiPieces] = useState([]);

    useEffect(() => {
        if (currentScreen === 5) {
            const colors = ['#e91e63', '#d97706', '#059669', '#0284c7', '#f59e0b'];
            const pieces = [];
            for (let i = 0; i < 40; i++) {
                pieces.push({
                    id: i,
                    left: `${Math.random() * 100}%`,
                    bg: colors[Math.floor(Math.random() * colors.length)],
                    delay: `${Math.random() * 0.7}s`,
                    borderRadius: Math.random() > 0.5 ? '50%' : '3px'
                });
            }
            setConfettiPieces(pieces);
        } else {
            setConfettiPieces([]);
        }
    }, [currentScreen]);

    return (
        <section className={`screen ${currentScreen === 5 ? 'active' : ''}`} data-i="5">
            {confettiPieces.map(c => (
                <div
                    key={c.id}
                    className="confetti"
                    style={{
                        left: c.left,
                        background: c.bg,
                        animationDelay: c.delay,
                        borderRadius: c.borderRadius
                    }}
                />
            ))}

            <div className="eyebrow"><span className="eyebrow-star">🎉</span> Final Step</div>
            <div className="type-line">Your Journey Begins Today!</div>

            <div className="quest-list">
                <div className="quest-item">✅ Step 1: Complete Online Screening Test</div>
                <div className="quest-item">⏳ Step 2: Try-out Hands-on Learning Round</div>
                <div className="quest-item">🔒 Step 3: Join the Residential Campus</div>
            </div>

            <button
                className="glow-btn final-btn"
                id="finalRegisterBtn"
                onClick={openLoginModal}
            >
                Book Free Admission Test Now →
            </button>
        </section>
    );
};
