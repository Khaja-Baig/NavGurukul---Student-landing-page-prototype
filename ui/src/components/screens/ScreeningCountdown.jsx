import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const ScreeningCountdown = () => {
    const { finishScreeningCountdown } = useApp();

    // Steps: 3 -> 2 -> 1 -> 'GO!'
    const [count, setCount] = useState(3);
    const [popKey, setPopKey] = useState(0);

    // Play cheerful audio beep for each countdown step using Web Audio API
    const playBeep = (freq = 480, duration = 0.12, type = 'sine') => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch {
            // Audio context policy fallback
        }
    };

    useEffect(() => {
        // Initial beep for '3'
        playBeep(520, 0.15, 'triangle');

        const timer1 = setTimeout(() => {
            setCount(2);
            setPopKey(prev => prev + 1);
            playBeep(520, 0.15, 'triangle');
        }, 1000);

        const timer2 = setTimeout(() => {
            setCount(1);
            setPopKey(prev => prev + 1);
            playBeep(580, 0.15, 'triangle');
        }, 2000);

        const timer3 = setTimeout(() => {
            setCount('GO!');
            setPopKey(prev => prev + 1);
            playBeep(880, 0.35, 'sine');
        }, 3000);

        const timer4 = setTimeout(() => {
            finishScreeningCountdown();
        }, 4200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <div className="countdown-screen-container" id="screeningCountdownScreen">
            {/* Central Sunburst Rays radiating outward */}
            <div className="countdown-sunburst-wrap">
                <div className="countdown-sunburst"></div>
            </div>

            {/* Center Content: GET READY + 3D Countdown Number */}
            <div className="countdown-center-zone">
                <div className="countdown-get-ready-label">GET READY</div>

                <div
                    key={popKey}
                    className={`countdown-number-display ${count === 'GO!' ? 'is-go' : ''}`}
                >
                    {count}
                </div>
            </div>

            {/* Bottom-left: Asha 3D Avatar */}
            <div className="countdown-avatar-zone">
                <img
                    src="/mentor-avatar2.png"
                    alt="Guide Asha"
                    className="countdown-asha-avatar"
                />
            </div>
        </div>
    );
};
