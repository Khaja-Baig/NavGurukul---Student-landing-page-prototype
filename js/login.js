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
        if (fnInput && fnInput.value.trim()) {
            window.studentName = fnInput.value.trim();
        }
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

    // Live Entrance Test Questions Data
    const etQuestions = [
        {
            id: 1,
            topic: 'Logic & Calculation',
            text: 'If 5 coders can write 5 programs in 5 minutes, how many minutes will 100 coders take to write 100 programs?',
            options: ['100 minutes', '5 minutes', '50 minutes', '20 minutes'],
            correct: 1,
            mentorMsg: 'Dhyan se calculate karein! Har 1 coder ko 1 program banane me 5 minutes hi lagte hain! 💡'
        },
        {
            id: 2,
            topic: 'Pattern Recognition',
            text: 'What is the next number in this logical sequence: 3, 7, 15, 31, 63, ...?',
            options: ['127', '125', '128', '95'],
            correct: 0,
            mentorMsg: 'Sequence pattern dekhein: (Previous x 2) + 1. Next number bohot easy hai! 🔢'
        },
        {
            id: 3,
            topic: 'Algorithmic Thinking',
            text: 'A frog is at the bottom of a 30ft well. Each day it climbs up 3ft and slips back 2ft at night. On which day will it reach the top?',
            options: ['30th day', '28th day', '27th day', '29th day'],
            correct: 1,
            mentorMsg: 'Jaise hi 28th day frog 30ft top par pahoochega, wo slip nahi karega! Rough paper use karein! ✏️'
        },
        {
            id: 4,
            topic: 'Data Sets & Logic',
            text: 'In a coding bootcamp of 60 students, 60% know Python and 50% know JavaScript. If 20% know both, how many students know NEITHER language?',
            options: ['6 students', '12 students', '10 students', '18 students'],
            correct: 0,
            mentorMsg: 'Total % Formula: (60% + 50% - 20%) = 90% at least 1 jante hain. Baaki 10% calculate karein! 📊'
        },
        {
            id: 5,
            topic: 'Computational Thinking',
            text: 'Which of the following best describes "Decomposition" in computational problem solving?',
            options: [
                'Writing code as fast as possible without planning',
                'Breaking down a complex problem into smaller manageable parts',
                'Fixing syntax errors in a program',
                'Storing data in a cloud database'
            ],
            correct: 1,
            mentorMsg: 'Complex problem ko chote-chote steps me todna hi Decomposition hota hai! 🧠'
        }
    ];

    let currentEtQIndex = 0;
    let userEtAnswers = {};
    let etRemainingSeconds = 3600; // 1 Hour Timer
    let etTimerInterval = null;

    window.goToEtStep = function (stepNum) {
        const bodyGrid = document.querySelector('.et-portal-body');
        const portalScreen = document.getElementById('entranceTestPortalScreen');
        const trackWrap = document.querySelector('.et-hud-track-wrapper');
        const isQuizActive = (stepNum === 5);

        if (bodyGrid) {
            bodyGrid.classList.toggle('step2-active', stepNum >= 2 && stepNum <= 4);
            bodyGrid.classList.toggle('step3-active', isQuizActive);
            bodyGrid.scrollTop = 0;
        }

        if (portalScreen) {
            portalScreen.classList.toggle('step3-active', isQuizActive);
        }

        if (trackWrap) {
            trackWrap.style.display = isQuizActive ? 'none' : 'block';
        }

        const step2Pane = document.getElementById('etStep2');
        if (step2Pane) {
            step2Pane.scrollTop = 0;
        }

        // Handle Main Panes (Step 1 Instructions, Step 2 Form Profile, Step 3 Quiz)
        const step1Pane = document.getElementById('etStep1');
        const step3Pane = document.getElementById('etStep3');

        if (step1Pane) step1Pane.classList.toggle('active', stepNum === 1);
        if (step2Pane) step2Pane.classList.toggle('active', stepNum >= 2 && stepNum <= 4);
        if (step3Pane) step3Pane.classList.toggle('active', isQuizActive);

        // Switch Sub-Quest Panes inside Step 2 Form
        if (stepNum >= 2 && stepNum <= 4) {
            const subNum = stepNum - 1; // step 2 -> sub 1, step 3 -> sub 2, step 4 -> sub 3
            for (let s = 1; s <= 3; s++) {
                const subPane = document.getElementById('subQuestPane' + s);
                if (subPane) subPane.classList.toggle('active', s === subNum);
            }
        }

        // Activate HUD Nodes (1. Instructions, 2. Basic Details, 3. Contact Info, 4. Education & Location)
        for (let i = 1; i <= 4; i++) {
            const node = document.getElementById('etNode' + i);
            if (node) {
                node.classList.toggle('active', i === stepNum);
                node.classList.toggle('passed', i < stepNum);
            }
        }

        // Update top HUD progress track fill bar & Rocket Vehicle position
        const hudFill = document.getElementById('etHudFill');
        const vehicle = document.getElementById('etHudVehicleWrapper');
        const positions = ['0%', '33.3%', '66.6%', '100%'];
        const pct = positions[Math.min(stepNum - 1, 3)] || '0%';

        if (hudFill) hudFill.style.width = pct;
        if (vehicle) vehicle.style.left = pct;

        // Speech bubble updates for Asha mentor
        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        if (stepNum === 1) {
            window.startGuidedRuleSequence();
        } else if (stepNum === 2) {
            window.clearAllRuleTimeouts();
            if (bubble) {
                bubble.innerHTML = `Aao <span class="student-name-placeholder">${name}</span>! Sabse pehle apni basic details fill karo! 👤`;
                bubble.classList.remove('speech-bounce');
                void bubble.offsetWidth;
                bubble.classList.add('speech-bounce');
            }
        } else if (stepNum === 3) {
            window.clearAllRuleTimeouts();
            // Capture name if entered
            const fNameInput = document.getElementById('etFirstName');
            if (fNameInput && fNameInput.value.trim() !== '') {
                window.studentName = fNameInput.value.trim();
                const placeholders = document.querySelectorAll('.student-name-placeholder');
                placeholders.forEach(el => el.innerText = window.studentName);
            }
            if (bubble) {
                bubble.innerHTML = `Shabash <span class="student-name-placeholder">${name}</span>! Ab apna WhatsApp number aur contact details share karo! 📞`;
                bubble.classList.remove('speech-bounce');
                void bubble.offsetWidth;
                bubble.classList.add('speech-bounce');
            }
        } else if (stepNum === 4) {
            window.clearAllRuleTimeouts();
            if (bubble) {
                bubble.innerHTML = `Almost done <span class="student-name-placeholder">${name}</span>! Apni education details bharo aur Entrance Test launch karo! 🚀`;
                bubble.classList.remove('speech-bounce');
                void bubble.offsetWidth;
                bubble.classList.add('speech-bounce');
            }
        } else if (stepNum === 5) {
            window.clearAllRuleTimeouts();
            loadEtQuestion(currentEtQIndex);
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

        // Start Live 1-Hour MCQ Test
        startLiveEtQuiz();
    };

    function startLiveEtQuiz() {
        currentEtQIndex = 0;
        userEtAnswers = {};
        etRemainingSeconds = 3600; // Reset 1-hour countdown

        if (etTimerInterval) clearInterval(etTimerInterval);
        etTimerInterval = setInterval(updateEtTimer, 1000);
        updateEtTimer();

        window.goToEtStep(5);
    }

    function updateEtTimer() {
        if (etRemainingSeconds <= 0) {
            clearInterval(etTimerInterval);
            finishEtQuiz();
            return;
        }

        const mins = Math.floor(etRemainingSeconds / 60);
        const secs = etRemainingSeconds % 60;
        const timerText = document.getElementById('etQuizTimerText');
        const timerCard = document.getElementById('etQuizTimerCard');

        const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        if (timerText) timerText.innerText = formatted;

        if (etRemainingSeconds < 300 && timerCard) {
            timerCard.classList.add('low-time-pulse');
        } else if (timerCard) {
            timerCard.classList.remove('low-time-pulse');
        }

        etRemainingSeconds--;
    }

    function loadEtQuestion(index) {
        if (index < 0 || index >= etQuestions.length) return;
        currentEtQIndex = index;

        const qData = etQuestions[index];
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        const numBadge = document.getElementById('etQNumBadge');
        const topicBadge = document.getElementById('etQTopicBadge');
        const qText = document.getElementById('etQuestionText');

        if (numBadge) numBadge.innerText = `Question ${index + 1}`;
        if (topicBadge) topicBadge.innerHTML = `<span class="badge-icon">💬</span> ${qData.topic}`;
        if (qText) qText.innerText = qData.text;

        const tipSub = document.getElementById('etStep3TipSub');
        if (tipSub) tipSub.innerText = qData.mentorMsg;

        const grid = document.getElementById('etOptionsGrid');
        if (grid) {
            grid.innerHTML = '';
            const labels = ['A', 'B', 'C', 'D'];
            qData.options.forEach((optText, oIdx) => {
                const btn = document.createElement('div');
                btn.className = `et-option-card ${userEtAnswers[index] === oIdx ? 'selected' : ''}`;
                btn.onclick = () => selectEtOption(oIdx);
                btn.innerHTML = `
                    <div class="opt-badge">${labels[oIdx]}</div>
                    <span class="opt-text">${optText}</span>
                    <div class="opt-radio-dot"></div>
                `;
                grid.appendChild(btn);
            });
        }

        renderEtPalette();

        const prevBtn = document.getElementById('etPrevQBtn');
        const nextBtn = document.getElementById('etNextQBtn');

        if (prevBtn) prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        if (nextBtn) {
            const nextSpan = nextBtn.querySelector('span');
            if (index === etQuestions.length - 1) {
                if (nextSpan) nextSpan.innerText = 'Finish & Submit Test 🏁';
            } else {
                if (nextSpan) nextSpan.innerText = 'Next Question →';
            }
        }

        const bubble = document.getElementById('etPortalSpeechBubble');
        if (bubble) {
            bubble.innerHTML = `<span class="student-name-placeholder">${name}</span>, ${qData.mentorMsg}`;
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }
    }

    function selectEtOption(optIdx) {
        userEtAnswers[currentEtQIndex] = optIdx;
        loadEtQuestion(currentEtQIndex);
    }

    function renderEtPalette() {
        const pal = document.getElementById('etQPalette');
        if (!pal) return;
        pal.innerHTML = '';

        etQuestions.forEach((q, idx) => {
            const dot = document.createElement('div');
            let cls = 'et-q-dot';
            if (idx === currentEtQIndex) cls += ' active';
            if (userEtAnswers[idx] !== undefined) cls += ' answered';
            dot.className = cls;
            dot.innerText = idx + 1;
            dot.onclick = () => loadEtQuestion(idx);
            pal.appendChild(dot);
        });
    }

    window.nextEtQuestion = function () {
        if (currentEtQIndex < etQuestions.length - 1) {
            loadEtQuestion(currentEtQIndex + 1);
        } else {
            finishEtQuiz();
        }
    };

    window.prevEtQuestion = function () {
        if (currentEtQIndex > 0) {
            loadEtQuestion(currentEtQIndex - 1);
        }
    };

    function finishEtQuiz() {
        if (etTimerInterval) clearInterval(etTimerInterval);

        let score = 0;
        etQuestions.forEach((q, idx) => {
            if (userEtAnswers[idx] === q.correct) {
                score++;
            }
        });

        const pct = Math.round((score / etQuestions.length) * 100);
        const elapsed = 3600 - etRemainingSeconds;
        const eMins = Math.floor(elapsed / 60);
        const eSecs = elapsed % 60;
        const timeFormatted = `${String(eMins).padStart(2, '0')}:${String(eSecs).padStart(2, '0')}`;

        const scoreEl = document.getElementById('etFinalScore');
        const accEl = document.getElementById('etAccuracy');
        const timeEl = document.getElementById('etTimeTaken');

        if (scoreEl) scoreEl.innerText = `${score}/${etQuestions.length}`;
        if (accEl) accEl.innerText = `${pct}%`;
        if (timeEl) timeEl.innerText = timeFormatted;

        if (typeof window.runConfetti === 'function') {
            window.runConfetti();
        }

        window.goToEtStep(4);
    }

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
        // Setup interactive Step 2 form guidance for Asha mentor
        window.setupFormFocusGuidance();
    }

    // Interactive Form Field Guidance for Step 2 Form (Asha Mentor)
    const formFieldGuidance = {
        'etFirstName': 'Yahan apna First Name bharein jaisa aapke ID proof par hai! ✍️',
        'etMiddleName': 'Yahan apna Middle Name likhein, ya khali chhod sakte hain! 📝',
        'etLastName': 'Yahan apna Surname ya Last Name bharein! 👤',
        'etDob': 'Apni asli Date of Birth (Janm Tithi) select karein! 📅',
        'etWhatsapp': 'Apka WhatsApp number bilkul sahi bharein, test result & schedule SMS ispe aayega! 📱',
        'etPhone': 'Alternate contact/calling phone number enter karein! 📞',
        'etEmail': 'Apni valid email address enter karein update alerts ke liye! 📧',
        'etPincode': 'Apne ilake ka 6-digit PIN code enter karein! 📍',
        'etDistrict': 'Apne District (Jila) ka naam likhein! 🏡',
        'etState': 'Apni State (Rajya) ka naam select karein! 🗺️',
        'etCurrentStatus': 'Apna current status (Student / Job Seeker) select karein! 🎓',
        'etQualification': 'Apni highest qualification (10th/12th/Graduate) choose karein! 📜',
        'etMedium': 'Apni school education medium (Hindi / English / Regional) choose karein! 📚',
        'etCategory': 'Apni Caste / Category select karein scholarship eligibility ke liye! 🏷️'
    };

    window.setupFormFocusGuidance = function () {
        const profileForm = document.getElementById('etProfileForm');
        if (!profileForm || profileForm.dataset.guidanceAttached) return;
        profileForm.dataset.guidanceAttached = "true";

        // Radios for gender
        const genderRadios = profileForm.querySelectorAll('input[name="etGender"]');
        genderRadios.forEach(radio => {
            radio.addEventListener('focus', function () {
                showMentorGuidance('Apni Gender preference select karein! 🚻');
            });
            radio.addEventListener('blur', function () {
                resetMentorGuidanceDefault();
            });
        });

        // Photo upload wrap
        const photoWrap = document.querySelector('.et-photo-upload-wrap');
        if (photoWrap) {
            photoWrap.addEventListener('mouseenter', function () {
                showMentorGuidance('Apni ek saaf passport size photo upload karein admit card ke liye! 📷');
            });
            photoWrap.addEventListener('mouseleave', function () {
                resetMentorGuidanceDefault();
            });
        }

        // All form inputs & selects
        for (const [fieldId, msg] of Object.entries(formFieldGuidance)) {
            const el = document.getElementById(fieldId);
            if (el) {
                el.addEventListener('focus', function () {
                    showMentorGuidance(msg);
                });
                el.addEventListener('blur', function () {
                    resetMentorGuidanceDefault();
                });
            }
        }
    };

    function showMentorGuidance(msg) {
        const bubble = document.getElementById('etPortalSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        if (bubble) {
            bubble.innerHTML = `<span class="student-name-placeholder">${name}</span>, ${msg}`;
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }
    }

    function resetMentorGuidanceDefault() {
        const bubble = document.getElementById('etPortalSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        if (bubble) {
            bubble.innerHTML = `Apni details bharein <span class="student-name-placeholder">${name}</span>! Taaki hum campus & scholarship assign kar sakein! 📋`;
        }
    }

    /* Sub-Quest Navigation for Step 2 Gamified Quest Flow */
    window.currentSubQuest = 1;

    window.switchSubQuest = function (num) {
        window.currentSubQuest = num;

        // Update HUD Pills
        for (let i = 1; i <= 3; i++) {
            const pill = document.getElementById('questPill' + i);
            const pane = document.getElementById('subQuestPane' + i);
            if (pill) {
                pill.classList.toggle('active', i === num);
                pill.classList.toggle('passed', i < num);
            }
            if (pane) {
                pane.classList.toggle('active', i === num);
            }
        }

        // Update Progress Fill
        const fill = document.getElementById('etQuestProgressFill');
        const indicator = document.getElementById('etSubQuestIndicator');
        const pcts = ['33%', '66%', '100%'];
        const titles = [
            'STAGE 1 OF 3 • BASIC DETAILS',
            'STAGE 2 OF 3 • CONTACT INFORMATION',
            'STAGE 3 OF 3 • EDUCATION & LOCATION'
        ];

        if (fill) fill.style.width = pcts[num - 1];
        if (indicator) indicator.innerText = titles[num - 1];

        // Asha Speech Bubble Dialogue per Sub-Quest
        const bubble = document.getElementById('etPortalSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        const dialogues = [
            `Aao ${name}! Sabse pehle apni basic details fill karo! 👤`,
            `Shabash ${name}! Ab apna WhatsApp number aur contact details share karo! 📞`,
            `Almost done! Apni education details bharo aur Entrance Test launch karo! 🚀`
        ];

        if (bubble) {
            bubble.innerHTML = dialogues[num - 1];
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }
    };

    window.nextSubQuest = function (targetNum) {
        if (window.currentSubQuest === 1) {
            const fNameInput = document.getElementById('etFirstName');
            if (fNameInput && fNameInput.value.trim() !== '') {
                window.studentName = fNameInput.value.trim();
                const placeholders = document.querySelectorAll('.student-name-placeholder');
                placeholders.forEach(el => el.innerText = window.studentName);
            }
        }
        window.switchSubQuest(targetNum);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoginEvents);
    } else {
        initLoginEvents();
    }
})();
