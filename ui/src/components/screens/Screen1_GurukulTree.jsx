import React from 'react';
import { useApp } from '../../context/AppContext';

export const Screen1_GurukulTree = () => {
    const { currentScreen, studentName, setStudentName, go } = useApp();

    return (
        <section className={`screen ${currentScreen === 0 ? 'active' : ''}`} data-i="0">
            <div className="eyebrow"><span className="eyebrow-star">🌱</span> 100% Free Residential Education</div>
            <h1 className="headline">
                Empowering India's Youth with<br />
                <span className="highlight-pink">World-Class Education</span>
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
