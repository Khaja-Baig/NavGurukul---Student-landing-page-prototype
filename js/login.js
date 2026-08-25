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
                startEntranceTestFlow();
            }, 600);
        }, 800);
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
            if (btn) btn.style.pointerEvents = 'auto';
            startEntranceTestFlow();
        }, 700);
    };

    window.startEntranceTestFlow = function () {
        // Close small popup modal
        window.closeLoginModal();

        // Reveal Full-Screen Entrance Test Portal Screen
        const portalScreen = document.getElementById('entranceTestPortalScreen');
        if (portalScreen) {
            portalScreen.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        // Auto pre-fill Profile form inputs if initial form was filled
        const fnInput = document.getElementById('loginFirstName');
        const lnInput = document.getElementById('loginLastName');
        const mnInput = document.getElementById('loginMiddleName');
        const phoneInput = document.getElementById('loginPhone');

        const etFn = document.getElementById('etFirstName');
        const etLn = document.getElementById('etLastName');
        const etMn = document.getElementById('etMiddleName');
        const etPhone = document.getElementById('etPhone');
        const etWhatsapp = document.getElementById('etWhatsapp');

        if (etFn && fnInput && fnInput.value) etFn.value = fnInput.value;
        if (etLn && lnInput && lnInput.value) etLn.value = lnInput.value;
        if (etMn && mnInput && mnInput.value) etMn.value = mnInput.value;
        if (etPhone && phoneInput && phoneInput.value) etPhone.value = phoneInput.value;
        if (etWhatsapp && phoneInput && phoneInput.value) etWhatsapp.value = phoneInput.value;

        window.goToEtStep(1);
        window.startGuidedRuleSequence();
    };

    window.closeEntranceTestPortal = function () {
        const portalScreen = document.getElementById('entranceTestPortalScreen');
        if (portalScreen) {
            portalScreen.style.display = 'none';
            document.body.style.overflow = '';
        }
        window.clearAllRuleTimeouts();
    };

    // Interactive Asha Mentor Guided Sequence
    const ruleDetails = [
        {
            title: "1 Hour Complete Test ⏱️",
            text: "1 ghanta shant jagah par baith kar bina distraction test solve karein! ⏱️"
        },
        {
            title: "Notebook & Pen Required 📝",
            text: "Rough math aur logic questions solve karne ke liye notebook aur pen zaroor paas rakhein! 📝"
        },
        {
            title: "Mobile / Laptop Online Mode 📱",
            text: "Aap ye entrance test direct apne Phone ya Laptop screen par aasaani se de sakte hain! 📱"
        },
        {
            title: "Honesty Policy 🤝",
            text: "Imandari se test dein! NavGurukul me aapki seekhne ki sacchi koshish aur potential evaluate hota hai! 🤝"
        }
    ];

    let ruleSequenceTimeouts = [];
    let isUserInteracting = false;

    window.clearAllRuleTimeouts = function () {
        ruleSequenceTimeouts.forEach(t => clearTimeout(t));
        ruleSequenceTimeouts = [];
    };

    window.startGuidedRuleSequence = function () {
        window.clearAllRuleTimeouts();
        isUserInteracting = false;

        const cards = document.querySelectorAll('.et-rules-grid .et-rule-card');
        const bubble = document.getElementById('etPortalSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        // Stage 1: Welcome intro message
        cards.forEach(card => card.classList.remove('active-guide'));
        if (bubble) {
            bubble.innerHTML = `Aao <span class="student-name-placeholder">${name}</span>! Rules dhyan se padhein aur Entrance Test start karein! 📝`;
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }

        // Stage 2: 1 Single Round through the 4 rules
        let delay = 2600;

        ruleDetails.forEach((detail, index) => {
            const t = setTimeout(() => {
                if (isUserInteracting) return;

                cards.forEach((card, idx) => {
                    card.classList.toggle('active-guide', idx === index);
                });

                if (bubble) {
                    bubble.innerHTML = `<span class="student-name-placeholder">${name}</span>, ${detail.text}`;
                    bubble.classList.remove('speech-bounce');
                    void bubble.offsetWidth;
                    bubble.classList.add('speech-bounce');
                }
            }, delay);
            ruleSequenceTimeouts.push(t);
            delay += 3500;
        });

        // Stage 3: End summary after 1 round
        const finalTimeout = setTimeout(() => {
            if (isUserInteracting) return;

            cards.forEach(card => card.classList.remove('active-guide'));
            if (bubble) {
                bubble.innerHTML = `Kisi bhi rule card par hover karke uski details padhein ya niche button se Sign Up start karein! ✨`;
                bubble.classList.remove('speech-bounce');
                void bubble.offsetWidth;
                bubble.classList.add('speech-bounce');
            }
        }, delay);
        ruleSequenceTimeouts.push(finalTimeout);
    };

    window.highlightRuleCard = function (index, isManual = false) {
        if (isManual) {
            isUserInteracting = true;
            window.clearAllRuleTimeouts();
        }

        const cards = document.querySelectorAll('.et-rules-grid .et-rule-card');
        const bubble = document.getElementById('etPortalSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        if (!cards.length || index < 0 || index >= ruleDetails.length) return;

        cards.forEach((card, idx) => {
            card.classList.toggle('active-guide', idx === index);
        });

        if (bubble) {
            const detail = ruleDetails[index];
            bubble.innerHTML = `<span class="student-name-placeholder">${name}</span>, ${detail.text}`;
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }
    };

    window.resetRuleCardHover = function () {
        if (!isUserInteracting) return;
        const cards = document.querySelectorAll('.et-rules-grid .et-rule-card');
        const bubble = document.getElementById('etPortalSpeechBubble');
        cards.forEach(card => card.classList.remove('active-guide'));
        if (bubble) {
            bubble.innerHTML = `Kisi bhi rule card par hover karke uski details padhein ya niche button se Sign Up start karein! ✨`;
        }
    };

    window.goToEtStep = function (stepNum) {
        // Activate step panes (Step 1 & Step 2)
        for (let i = 1; i <= 2; i++) {
            const pane = document.getElementById('etStep' + i);
            const node = document.getElementById('etNode' + i);

            if (pane) pane.classList.toggle('active', i === stepNum);
            if (node) {
                node.classList.toggle('active', i === stepNum);
                node.classList.toggle('passed', i < stepNum);
            }
        }

        // Update top HUD progress track fill bar & Rocket Vehicle position
        const hudFill = document.getElementById('etHudFill');
        const vehicle = document.getElementById('etHudVehicleWrapper');
        if (hudFill) {
            hudFill.style.width = stepNum === 1 ? '0%' : '100%';
        }
        if (vehicle) {
            vehicle.style.left = stepNum === 1 ? '0%' : '100%';
        }

        // Speech bubble updates for Asha mentor in full-screen portal
        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        if (stepNum === 1) {
            window.startGuidedRuleSequence();
        } else if (stepNum === 2) {
            window.clearAllRuleTimeouts();
            if (bubble) {
                bubble.innerHTML = `Apni details bharein <span class="student-name-placeholder">${name}</span>! Taaki hum campus & scholarship assign kar sakein! 📋`;
                bubble.classList.remove('speech-bounce');
                void bubble.offsetWidth;
                bubble.classList.add('speech-bounce');
            }
        }
    };

    window.handleEtProfileSubmit = function (e) {
        e.preventDefault();
        const fn = document.getElementById('etFirstName');
        if (fn && fn.value.trim()) {
            window.studentName = fn.value.trim();
            updateNamePlaceholders();
        }

        if (typeof window.runConfetti === 'function') {
            window.runConfetti();
        }

        alert(`🎉 Badhai Ho ${(window.studentName || 'Friend')}! Aapka NavGurukul Registration safaltapoorvak submit ho gaya hai!\n\nOfficial Screening Test team aapko WhatsApp par contact karegi.`);
        window.closeEntranceTestPortal();
    };

    window.selectQuizOption = function (btnEl, isCorrect) {
        const allOpts = document.querySelectorAll('.et-opt-btn');
        allOpts.forEach(btn => btn.classList.remove('correct', 'wrong'));

        if (isCorrect) {
            btnEl.classList.add('correct');
            const fbBox = document.getElementById('quizFeedbackBox');
            if (fbBox) fbBox.style.display = 'flex';
            const finishBtn = document.getElementById('finishQuizBtn');
            if (finishBtn) finishBtn.disabled = false;

            if (typeof window.runConfetti === 'function') {
                window.runConfetti();
            }
        } else {
            btnEl.classList.add('wrong');
        }
    };

    window.startOfficialTestNow = function () {
        if (typeof window.runConfetti === 'function') {
            window.runConfetti();
        }
        alert("🚀 Redirecting to Official NavGurukul Screening Test Portal! Good luck!");
        window.closeEntranceTestPortal();
    };

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
