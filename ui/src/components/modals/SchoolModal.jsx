import React from 'react';
import { useApp } from '../../context/AppContext';
import { schools } from '../screens/Screen4_SpecialtySchools';

export const SchoolModal = () => {
    const { selectedSchoolIdx, closeSchoolModal, go } = useApp();

    if (selectedSchoolIdx === null || !schools[selectedSchoolIdx]) return null;

    const s = schools[selectedSchoolIdx];

    const handleApply = () => {
        closeSchoolModal();
        go(2);
    };

    return (
        <div
            id="schoolModal"
            className="sm-overlay open"
            onClick={(e) => {
                if (e.target === e.currentTarget) closeSchoolModal();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="sm-card">
                <div className={`sm-header ${s.bgClass}`} id="smHeader">
                    <span className="sm-tag" id="smTag">{s.tag}</span>
                    <h2 className="sm-title" id="smTitle">{s.title}</h2>
                    <button className="sm-close" onClick={closeSchoolModal} aria-label="Close modal">✕</button>
                </div>

                <div className="sm-body">
                    <div className="sm-col">
                        <div className="sm-section">
                            <div className="sm-sec-header">
                                <span className="sm-sec-icon">🎯</span>
                                <span className="sm-sec-title">Eligibility</span>
                            </div>
                            <ul className="sm-list" id="smEligibility">
                                {s.eligibility.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="sm-section">
                            <div className="sm-sec-header">
                                <span className="sm-sec-icon">📚</span>
                                <span className="sm-sec-title">Curriculum focus</span>
                            </div>
                            <ul className="sm-list" id="smCurriculum">
                                {s.curriculum.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="sm-col">
                        <div className="sm-section">
                            <div className="sm-sec-header">
                                <span className="sm-sec-icon">🏆</span>
                                <span className="sm-sec-title">Outcomes</span>
                            </div>
                            <ul className="sm-list" id="smOutcomes">
                                {s.outcomes.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="sm-info-box">
                            <div className="sm-info-item">
                                <div className="sm-info-label">⏳ Duration</div>
                                <div className="sm-info-val" id="smDuration">{s.duration}</div>
                            </div>
                            <div className="sm-info-divider"></div>
                            <div className="sm-info-item">
                                <div className="sm-info-label">📍 Location</div>
                                <div className="sm-info-val" id="smLocation">{s.location}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm-footer">
                    <button className="sm-apply-btn" id="smApplyBtn" onClick={handleApply}>
                        Explore 100% Free Scholarship →
                    </button>
                </div>
            </div>
        </div>
    );
};
