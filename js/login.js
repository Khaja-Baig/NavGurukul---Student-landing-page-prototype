// Creative Login & Admission Portal Controller

(function () {
    let currentLang = 'en';

    const translations = {
        en: {
            title: 'Welcome to NavGurukul',
            subtitle: 'Sign in to complete your free screening test.',
            tabGoogle: '✨ Quick Google Sign-In',
            tabManual: '📝 Register / Check Result',
            secTag: 'Secure One-Click Authentication',
            gBtn: 'Continue with Google',
            gNote: 'By signing in with Google, you agree to receive test updates and admission support from NavGurukul.',
            fnLabel: 'First Name *',
            lnLabel: 'Last Name *',
            mnLabel: 'Middle Name (Optional)',
            phoneLabel: 'Phone Number *',
            submitBtn: 'Register / Check Result →',
            bubbleGoogle: 'Form bharein aur apna Screening Test result & registration status check karein! 📝',
            bubbleManual: 'Form bharein aur apna Screening Test result & registration status check karein! 📝',
            bubbleSuccess: 'Shabaash! Aapka registration confirm ho gaya hai! 🎉'
        },
        hi: {
            title: 'NavGurukul Me Swagat Hai',
            subtitle: 'Apna free screening test complete karne ke liye sign in karein.',
            tabGoogle: '✨ Quick Google Sign-In',
            tabManual: '📝 Register / Result Dekhein',
            secTag: 'Surakshit One-Click Authentication',
            gBtn: 'Google ke saath Continue Karein',
            gNote: 'Google se sign in karke aap test updates aur admission support lene ke liye agree karte hain.',
            fnLabel: 'Pehla Naam *',
            lnLabel: 'Aakhri Naam *',
            mnLabel: 'Middle Name (Optional)',
            phoneLabel: 'Mobile Number *',
            submitBtn: 'Register Karein / Result Check Karein →',
            bubbleGoogle: 'Form bharein aur apna Screening Test result & registration status check karein! 📝',
            bubbleManual: 'Form bharein aur apna Screening Test result & registration status check karein! 📝',
            bubbleSuccess: 'Badhai Ho! Aapka registration confirm ho gaya hai! 🎉'
        }
    };


    window.openLoginModal = function () {
        const overlay = document.getElementById('loginViewOverlay');
        if (!overlay) return;

        // Auto-fill student name from Screen 1 if available
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : '';
        const firstNameInput = document.getElementById('loginFirstName');
        if (firstNameInput && name && !firstNameInput.value) {
            const parts = name.split(' ');
            firstNameInput.value = parts[0] || '';
            const lastNameInput = document.getElementById('loginLastName');
            if (lastNameInput && parts.length > 1) {
                lastNameInput.value = parts.slice(1).join(' ');
            }
        }

        // Update name in placeholders
        updateNamePlaceholders();

        // Show overlay with transition
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Re-trigger tab & speech animation
        switchLoginTab('google');
    };

    window.closeLoginModal = function () {
        const overlay = document.getElementById('loginViewOverlay');
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    function updateNamePlaceholders() {
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        const placeholders = document.querySelectorAll('.student-name-placeholder');
        placeholders.forEach(el => el.textContent = name);

        const gUserName = document.getElementById('gUserName');
        if (gUserName) gUserName.textContent = name;

        const successStudentName = document.getElementById('successStudentName');
        if (successStudentName) successStudentName.textContent = name;
    }

    window.switchLoginTab = function (tab) {
        const bubble = document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        if (bubble) {
            const text = translations[currentLang].bubbleManual.replace(/\[Name\]/g, name);
            bubble.innerHTML = `Aao <span class="student-name-placeholder">${name}</span>! ${text}`;
        }
    };

    window.handleGoogleSignIn = function () {
        const btnText = document.getElementById('googleBtnText');
        const preview = document.getElementById('gAccountPreview');
        const gBtn = document.getElementById('googleSignInBtn');

        if (btnText) btnText.textContent = 'Connecting Google Account...';
        if (gBtn) gBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            if (preview) preview.style.display = 'flex';
            if (btnText) btnText.textContent = 'Signed in with Google ✓';

            setTimeout(() => {
                showSuccessState('Google One-Click');
            }, 700);
        }, 900);
    };

    window.handleManualSubmit = function (e) {
        e.preventDefault();
        const fnInput = document.getElementById('loginFirstName');
        const phoneInput = document.getElementById('loginPhone');
        if (!fnInput || !fnInput.value.trim() || !phoneInput || !phoneInput.value.trim()) return;

        window.studentName = fnInput.value.trim();
        updateNamePlaceholders();

        const btn = document.getElementById('loginSubmitBtn');
        const spinner = document.getElementById('loginSpinner');

        if (btn) {
            btn.classList.add('loading');
            btn.style.pointerEvents = 'none';
        }
        if (spinner) spinner.style.display = 'inline-block';

        setTimeout(() => {
            if (spinner) spinner.style.display = 'none';
            showSuccessState('Manual Registration');
        }, 950);
    };

    function showSuccessState(mode) {
        const secGoogle = document.getElementById('googleAuthSection');
        const divider = document.getElementById('loginDivider');
        const secManual = document.getElementById('manualAuthSection');
        const successCard = document.getElementById('loginSuccessCard');
        const bubble = document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        if (secGoogle) secGoogle.style.display = 'none';
        if (divider) divider.style.display = 'none';
        if (secManual) secManual.style.display = 'none';
        if (successCard) successCard.style.display = 'block';

        if (bubble) {
            bubble.innerHTML = `Badhai Ho <span class="student-name-placeholder">${name}</span>! ${translations[currentLang].bubbleSuccess}`;
        }

        // Trigger celebration confetti burst!
        if (typeof window.runConfetti === 'function') {
            window.runConfetti();
        }
    }

    window.setLoginLanguage = function (lang) {
        currentLang = lang;
        const t = translations[lang] || translations.en;

        const langBtns = document.querySelectorAll('.login-lang-switch .lang-btn');
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        const title = document.getElementById('loginTitle');
        if (title) {
            title.textContent = lang === 'hi' ? 'NavGurukul Me Swagat Hai' : 'Welcome to NavGurukul';
        }

        const sub = document.getElementById('loginSubtitle');
        if (sub) sub.textContent = t.subtitle;

        const divText = document.getElementById('loginDividerText');
        if (divText) divText.textContent = lang === 'hi' ? 'YA DETAILS SE REGISTER KAREIN' : 'OR REGISTER WITH DETAILS';

        const submitBtn = document.getElementById('loginSubmitBtn');
        if (submitBtn) {
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = lang === 'hi' ? 'Register Karein / Result Check' : 'Register / Check Result';
        }
    };

    // Attach listeners once DOM is ready
    function initLoginEvents() {
        // Esc key closes modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLoginModal();
        });

        // Click outside card closes modal
        const overlay = document.getElementById('loginViewOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeLoginModal();
            });
        }

        // Language toggle buttons
        document.querySelectorAll('.login-lang-switch .lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (lang) window.setLoginLanguage(lang);
            });
        });

        // Wire up main CTA button on Screen 6
        const finalRegisterBtn = document.getElementById('finalRegisterBtn');
        if (finalRegisterBtn) {
            finalRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLoginModal();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoginEvents);
    } else {
        initLoginEvents();
    }
})();
