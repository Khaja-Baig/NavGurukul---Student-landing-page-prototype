import React from 'react';
import { useApp } from '../../context/AppContext';

export const ScreeningTestPlaceholder = () => {
    const {
        selectedCampus,
        selectedCourse,
        startScreeningCountdown,
        exitScreeningTest
    } = useApp();

    const handleReplay = () => {
        startScreeningCountdown(selectedCampus, selectedCourse);
    };

    return (
        <div className="screening-test-portal-view" id="screeningTestView">
            {/* Top Bar */}
            <header className="st-header">
                <div className="st-logo-wrap">
                    <span className="st-logo-accent">nav</span>
                    <span className="st-logo-bold">gurukul</span>
                    <span className="st-portal-tag">SCREENING TEST</span>
                </div>

                <div className="st-badges-cluster">
                    {selectedCampus && (
                        <div className="st-meta-pill">
                            <span className="pill-dot">📍</span>
                            <span>{selectedCampus.name} Campus</span>
                        </div>
                    )}
                    {selectedCourse && (
                        <div className="st-meta-pill course-pill">
                            <span className="pill-dot">🎓</span>
                            <span>{selectedCourse.title}</span>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="st-exit-btn"
                    onClick={exitScreeningTest}
                >
                    ✕ Back to Campuses
                </button>
            </header>

            {/* Main Stage */}
            <main className="st-main-content">
                <div className="st-welcome-card">
                    <div className="st-card-badge">✨ ENTRANCE ASSESSMENT READY</div>
                    <h1 className="st-title">Welcome to the Screening Test!</h1>
                    <p className="st-subtext">
                        You have selected <strong>{selectedCourse?.title || 'Selected Program'}</strong> at{' '}
                        <strong>{selectedCampus?.name || 'NavGurukul'} Campus</strong>.
                    </p>

                    <div className="st-info-box">
                        <div className="info-icon">🚀</div>
                        <div className="info-text">
                            <strong>Screening Test UI Under Construction</strong>
                            <p>
                                Aapka <strong>3 · 2 · 1 · GO!</strong> countdown sequence successfully create ho gaya hai.
                                Screening Test ke actual questions aur test UI hum next step mein design karenge!
                            </p>
                        </div>
                    </div>

                    <div className="st-actions-row">
                        <button
                            type="button"
                            className="st-btn primary-btn"
                            onClick={handleReplay}
                        >
                            <span>↺ Replay 3 2 1 Go! Countdown</span>
                        </button>

                        <button
                            type="button"
                            className="st-btn secondary-btn"
                            onClick={exitScreeningTest}
                        >
                            <span>← Change Campus / Course</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
