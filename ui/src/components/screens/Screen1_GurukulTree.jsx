import React from 'react';
import { useApp } from '../../context/AppContext';

export const Screen1_GurukulTree = () => {
    const { currentScreen, studentName, setStudentName, go } = useApp();

    return (
        <section className={`screen ${currentScreen === 0 ? 'active' : ''}`} data-i="0">
            <div className="eyebrow"><span className="eyebrow-star">🌱</span> 100% Free Education</div>
            <h1 className="headline">
                Building Brighter Futures<br />
                <span className="highlight-pink">for India's Youth</span>
            </h1>

            <div className="name-field">
                <span className="name-label">Aapka Naam:</span>
                <input
                    id="nameInput"
                    placeholder="Asha / Rahul"
                    maxLength={18}
                    autoComplete="name"
                    value={studentName === 'Friend' ? '' : studentName}
                    onChange={(e) => setStudentName(e.target.value || 'Friend')}
                />
            </div>

            <button className="glow-btn" id="startBtn" onClick={() => go(1)}>
                Start Journey →
            </button>
        </section>
    );
};
