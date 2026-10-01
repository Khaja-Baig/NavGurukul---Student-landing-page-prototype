import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const SCREENING_QUESTIONS = [
    {
        id: 1,
        topic: 'Basic Math & Calculation',
        topicIcon: '🧮',
        question: 'Agar ek dukan par 5 pen ₹50 ke milte hain, toh 12 pen ki keemat kya hogi?',
        options: ['₹100', '₹120', '₹110', '₹140'],
        correct: 1,
        tip: 'Pehle 1 pen ki keemat nikalo (₹50 ÷ 5 = ₹10), phir 12 se multiply karo! 💡'
    },
    {
        id: 2,
        topic: 'Pattern Recognition',
        topicIcon: '🧩',
        question: 'Select the correct missing number in the sequence: 2, 4, 8, 16, ___',
        options: ['24', '30', '32', '64'],
        correct: 2,
        tip: 'Har number pichle number ka double (× 2) ho raha hai! 🧠'
    },
    {
        id: 3,
        topic: 'Logical Reasoning',
        topicIcon: '💡',
        question: 'Asha and Rahul are working together on a project. If Asha completes it in 4 days alone and Rahul in 4 days alone, together in how many days will they complete it?',
        options: ['1 day', '2 days', '3 days', '4 days'],
        correct: 1,
        tip: 'Dono milkar kaam karenge toh speed double ho jayegi aur time aadha! 🚀'
    }
];

export const ScreeningTestPlaceholder = () => {
    const {
        selectedCampus,
        selectedCourse,
        exitScreeningTest,
        userProfile,
        studentName,
        bookedInterviewSlot,
        openSlotBookingModal,
        triggerXpToast
    } = useApp();

    const [viewMode, setViewMode] = useState('quiz'); // 'quiz' | 'results'
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({ 0: 1 });
    const [testScore, setTestScore] = useState(null);

    const handleSelectOption = (optIdx) => {
        setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    };

    const handleNext = () => {
        if (currentQ < SCREENING_QUESTIONS.length - 1) {
            setCurrentQ(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQ > 0) {
            setCurrentQ(prev => prev - 1);
        }
    };

    const handleSubmitTest = () => {
        let correctCount = 0;
        SCREENING_QUESTIONS.forEach((q, idx) => {
            if (answers[idx] === q.correct) correctCount++;
        });
        const marks = correctCount > 0 ? 24 : 24; // full marks 24 matching original screenshot
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const timeStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

        setTestScore({
            marks,
            timeStr,
            isPassed: true
        });

        setViewMode('results');
        if (triggerXpToast) {
            triggerXpToast('🎉 Screening Test Passed! Eligible for Learning Round!');
        }
    };

    const currentQuestion = SCREENING_QUESTIONS[currentQ];
    const isOptionSelected = (idx) => answers[currentQ] === idx;
    const progressPercent = Math.round(((currentQ + 1) / SCREENING_QUESTIONS.length) * 100);

    // Candidate details matching user profile & screenshot
    const displayName = (userProfile?.firstName || userProfile?.lastName)
        ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
        : (studentName && studentName !== 'Friend' ? studentName : 'Sujit Kumar');
    const displayEmail = userProfile?.email || 'sujitkumar19013@gmail.com';
    const displayPhone = userProfile?.phone || userProfile?.whatsapp || '3512313132';
    const displayState = userProfile?.state || 'Chhattisgarh';
    const displaySchool = selectedCourse?.title || userProfile?.schoolName || 'School of Business (SOB)';
    const displayCampus = selectedCampus?.name
        ? (selectedCampus.name.toLowerCase().includes('campus') ? selectedCampus.name : `${selectedCampus.name} Campus`)
        : (userProfile?.preferredCampus || 'Sarjapur Campus');

    return (
        <div className="screening-test-portal-view" id="screeningTestView">
            {/* Top Navigation Bar */}
            <header className="st-header">
                <div className="st-logo-wrap">
                    <img src="/navgurukul-logo.png" alt="NavGurukul Logo" className="st-real-logo" />
                </div>

                {viewMode === 'quiz' ? (
                    <div className="st-header-right">
                        <span className="st-portal-tag">SCREENING TEST</span>
                    </div>
                ) : (
                    <div className="st-header-right-results">
                        <div className="st-lang-pill">
                            <span className="globe-icon">🌐</span> English <span className="lang-sep">|</span> हिंदी
                        </div>
                        <button
                            type="button"
                            className="st-back-journey-btn"
                            onClick={exitScreeningTest}
                        >
                            <span className="exit-icon">✕</span> Back to Journey
                        </button>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="st-main-content">
                {viewMode === 'quiz' ? (
                    /* ========================================================
                       MODE 1: SCREENING TEST QUESTION UI
                       ======================================================== */
                    <div className="st-quiz-container">
                        {/* Progress Bar */}
                        <div className="st-progress-section">
                            <div className="st-progress-meta">
                                <span className="st-q-count">
                                    Question <strong>{currentQ + 1}</strong> of {SCREENING_QUESTIONS.length}
                                </span>
                                <span className="st-q-percent">{progressPercent}% Completed</span>
                            </div>
                            <div className="st-progress-track">
                                <div
                                    className="st-progress-fill"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Interactive Question Card */}
                        <div className="st-question-card">
                            {/* Question Header without Marks Pill */}
                            <div className="st-q-card-header">
                                <div className="st-topic-pill">
                                    <span>{currentQuestion.topicIcon}</span>
                                    <span>{currentQuestion.topic}</span>
                                </div>
                            </div>

                            {/* Question Statement */}
                            <h2 className="st-q-text">
                                {currentQuestion.question}
                            </h2>

                            {/* 4 Options Grid */}
                            <div className="st-options-list">
                                {currentQuestion.options.map((optText, oIdx) => {
                                    const selected = isOptionSelected(oIdx);
                                    const letter = String.fromCharCode(65 + oIdx);
                                    return (
                                        <button
                                            key={oIdx}
                                            type="button"
                                            className={`st-option-btn ${selected ? 'is-selected' : ''}`}
                                            onClick={() => handleSelectOption(oIdx)}
                                        >
                                            <span className="st-opt-letter">{letter}</span>
                                            <span className="st-opt-label">{optText}</span>
                                            <span className="st-opt-radio">
                                                {selected ? '✓' : ''}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Mentor Quick Tip */}
                            <div className="st-quick-tip-card">
                                <div className="st-tip-icon">⚡</div>
                                <div className="st-tip-text">
                                    <strong>Mentor Tip:</strong>
                                    <span>{currentQuestion.tip}</span>
                                </div>
                            </div>

                            {/* Card Footer with Clean Separated Button Rows */}
                            <div className="st-card-footer">
                                {/* Question Palette Navigation */}
                                <div className="st-q-dots-row">
                                    {SCREENING_QUESTIONS.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            className={`st-q-dot ${currentQ === idx ? 'current' : ''} ${answers[idx] !== undefined ? 'answered' : ''}`}
                                            onClick={() => setCurrentQ(idx)}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Previous & Next Action Buttons */}
                                <div className="st-q-actions-row">
                                    {currentQ > 0 && (
                                        <button
                                            type="button"
                                            className="st-btn secondary-btn"
                                            onClick={handlePrev}
                                        >
                                            Previous
                                        </button>
                                    )}

                                    {currentQ < SCREENING_QUESTIONS.length - 1 ? (
                                        <button
                                            type="button"
                                            className="st-btn primary-btn"
                                            onClick={handleNext}
                                        >
                                            <span>Next Question →</span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="st-btn submit-btn"
                                            onClick={handleSubmitTest}
                                        >
                                            <span>Submit Test 🚀</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ========================================================
                       MODE 2: TEST RESULTS & LR BOOKING PAGE (EXACT VERCEL DESIGN)
                       ======================================================== */
                    <div className="et-results-container custom-results-view">
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
                                <div className="res-detail-item">
                                    <span className="res-detail-label">Preferred Campus:</span>
                                    <span className="res-detail-val">{displayCampus}</span>
                                </div>
                                <div className="res-detail-item full-width">
                                    <span className="res-detail-label">Selected School:</span>
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

                            <div className="res-stage-cards-container">
                                {/* Screening Test Stage Card */}
                                <div className="res-stage-card stage-card-pass">
                                    <div className="stage-card-accent-bar accent-pass"></div>
                                    <div className="stage-card-inner">
                                        <div className="stage-card-header-row">
                                            <div className="stage-card-title-wrap">
                                                <h4 className="stage-card-name">Screening Test</h4>
                                            </div>
                                            <div className="stage-card-badges-wrap">
                                                <div className="stage-card-marks-box">
                                                    <span className="marks-box-lbl">MARKS:</span>
                                                    <span className="marks-box-val">{testScore?.marks || 24}</span>
                                                </div>
                                                <div className="stage-card-status-pill pill-pass">
                                                    <span className="pill-dot">✓</span> PASS
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stage-card-time-row">
                                            <span className="stage-cal-icon">📅</span>
                                            <span className="stage-time-val">{testScore?.timeStr || '01/10/2026 15:45'}</span>
                                        </div>
                                        <div className="stage-card-actions-section">
                                            <span className="stage-actions-heading">ACTIONS</span>
                                            <span className="stage-action-dash">—</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Learning Round Stage Card */}
                                <div className={`res-stage-card ${bookedInterviewSlot ? 'stage-card-pass' : 'stage-card-pending'}`} id="resCardLearning">
                                    <div className={`stage-card-accent-bar ${bookedInterviewSlot ? 'accent-pass' : 'accent-amber'}`}></div>
                                    <div className="stage-card-inner">
                                        <div className="stage-card-header-row">
                                            <div className="stage-card-title-wrap">
                                                <h4 className="stage-card-name">Learning Round</h4>
                                            </div>
                                            <div className="stage-card-badges-wrap">
                                                <div className={`stage-card-status-pill ${bookedInterviewSlot ? 'pill-scheduled' : 'pill-pending'}`}>
                                                    {bookedInterviewSlot ? (
                                                        <>
                                                            <span className="pill-dot">✔</span> SCHEDULED
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="pill-dot">⏳</span> PENDING
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stage-card-time-row">
                                            <span className="stage-cal-icon">📅</span>
                                            <span className={`stage-time-val ${!bookedInterviewSlot ? 'not-scheduled' : ''}`}>
                                                {bookedInterviewSlot || 'Not Scheduled'}
                                            </span>
                                        </div>
                                        <div className="stage-card-actions-section">
                                            <span className="stage-actions-heading">ACTIONS</span>
                                            {!bookedInterviewSlot ? (
                                                <button
                                                    type="button"
                                                    className="stage-action-btn btn-stage-book"
                                                    onClick={openSlotBookingModal}
                                                >
                                                    Book Slot
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="stage-action-btn btn-stage-book"
                                                    onClick={openSlotBookingModal}
                                                    style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}
                                                >
                                                    Reschedule Slot
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
