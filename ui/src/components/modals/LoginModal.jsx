import React from 'react';
import { useApp } from '../../context/AppContext';

export const LoginModal = () => {
    const {
        isLoginModalOpen,
        closeLoginModal,
        loginLang,
        setLoginLang,
        studentName,
        setStudentName,
        userProfile,
        setUserProfile,
        openPortalAtStep
    } = useApp();

    if (!isLoginModalOpen) return null;

    const name = (studentName && studentName !== 'Friend') ? studentName : 'Friend';

    const handleGoogleSignIn = () => {
        closeLoginModal();
        openPortalAtStep(1);
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (userProfile.firstName.trim()) {
            setStudentName(userProfile.firstName.trim());
        }
        closeLoginModal();
        openPortalAtStep(1);
    };

    return (
        <div id="loginViewOverlay" className="login-overlay open" role="dialog" aria-modal="true">
            <div className="login-bg-glow glow-1"></div>
            <div className="login-bg-glow glow-2"></div>

            <div className="login-card-container">
                <button
                    className="login-close-btn"
                    id="closeLoginBtn"
                    onClick={closeLoginModal}
                    aria-label="Close login portal"
                >
                    <span className="close-icon">✕</span>
                    <span className="close-text">Back to Journey</span>
                </button>

                <div className="login-left-panel">
                    <div className="login-brand-header">
                        <img src="/navgurukul-logo.png" alt="NavGurukul Logo" className="login-logo-img" />
                    </div>

                    <div className="login-mentor-stage">
                        <div className="login-mentor-glow"></div>
                        <img src="/mentor-avatar2.png" alt="Mentor Asha" className="login-mentor-img" />
                        <div className="login-speech-bubble" id="loginSpeechBubble">
                            Aao <span className="student-name-placeholder">{name}</span>! Form bharein aur apna Screening Test result & registration status check karein! 📝
                        </div>
                    </div>
                </div>

                <div className="login-right-panel">
                    <div className="login-top-bar">
                        <div className="login-lang-switch">
                            <button
                                className={`lang-btn ${loginLang === 'en' ? 'active' : ''}`}
                                onClick={() => setLoginLang('en')}
                            >
                                🌐 English
                            </button>
                            <button
                                className={`lang-btn ${loginLang === 'hi' ? 'active' : ''}`}
                                onClick={() => setLoginLang('hi')}
                            >
                                हिंदी
                            </button>
                        </div>
                    </div>

                    <div className="login-form-header">
                        <h2 className="login-title" id="loginTitle">
                            Welcome to <span className="nav-brand-pink">Nav</span>Gurukul
                        </h2>
                        <p className="login-subtitle" id="loginSubtitle">Sign in to complete your screening test.</p>
                    </div>

                    <div className="google-quick-section" id="googleAuthSection">
                        <button
                            className="google-btn"
                            id="googleSignInBtn"
                            onClick={handleGoogleSignIn}
                        >
                            <svg className="google-svg" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span id="googleBtnText" className="g-btn-text">Continue with Google</span>
                            <div className="btn-shimmer"></div>
                        </button>
                    </div>

                    <div className="login-divider" id="loginDivider">
                        <span id="loginDividerText">OR REGISTER WITH DETAILS</span>
                    </div>

                    <div className="login-tab-content active" id="manualAuthSection">
                        <form className="login-form" id="loginManualForm" onSubmit={handleManualSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="loginFirstName" className="form-label" id="fnLabel">First Name</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            id="loginFirstName"
                                            className="form-input"
                                            placeholder="Enter first name"
                                            value={userProfile.firstName}
                                            onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="loginLastName" className="form-label" id="lnLabel">Last Name</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            id="loginLastName"
                                            className="form-input"
                                            placeholder="Enter last name"
                                            value={userProfile.lastName}
                                            onChange={(e) => setUserProfile({ ...userProfile, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="loginMiddleName" className="form-label" id="mnLabel">
                                        Middle Name <span className="opt-tag">(Optional)</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            id="loginMiddleName"
                                            className="form-input"
                                            placeholder="Enter middle name"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="loginPhone" className="form-label" id="phoneLabel">Phone Number</label>
                                    <div className="input-wrapper phone-wrapper">
                                        <span className="phone-prefix">+91</span>
                                        <input
                                            type="tel"
                                            id="loginPhone"
                                            className="form-input phone-input"
                                            placeholder="10-digit phone number"
                                            maxLength={10}
                                            value={userProfile.phone}
                                            onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-glow-btn" id="loginSubmitBtn">
                                <span className="btn-text">Register / Check Result</span>
                                <span className="btn-arrow">→</span>
                            </button>
                        </form>
                    </div>

                    <div className="login-footer-help">
                        <span className="help-question">Having trouble signing in?</span>
                        <div className="help-links">
                            <a href="mailto:admissions@navgurukul.org" className="help-link">admissions@navgurukul.org</a>
                            <span className="help-sep">•</span>
                            <a href="tel:+919730879683" className="help-link">+91 97308 79683</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
