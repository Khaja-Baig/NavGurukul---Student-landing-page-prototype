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
        const isResultActive = (stepNum === 4);

        if (bodyGrid) {
            bodyGrid.classList.toggle('step2-active', stepNum >= 2 && stepNum <= 3);
            bodyGrid.classList.toggle('step3-active', isQuizActive);
            bodyGrid.classList.toggle('step4-active', isResultActive);
            bodyGrid.scrollTop = 0;
        }

        if (portalScreen) {
            portalScreen.classList.toggle('step3-active', isQuizActive);
            portalScreen.classList.toggle('step4-active', isResultActive);
        }

        if (trackWrap) {
            trackWrap.style.display = (isQuizActive || isResultActive) ? 'none' : 'block';
        }

        const step2Pane = document.getElementById('etStep2');
        if (step2Pane) {
            step2Pane.scrollTop = 0;
        }

        // Handle Main Panes (Step 1 Instructions, Step 2 Form Profile, Step 3 Quiz, Step 4 Results)
        const step1Pane = document.getElementById('etStep1');
        const step3Pane = document.getElementById('etStep3');
        const step4Pane = document.getElementById('etStep4');

        if (step1Pane) step1Pane.classList.toggle('active', stepNum === 1);
        if (step2Pane) step2Pane.classList.toggle('active', stepNum >= 2 && stepNum <= 3);
        if (step3Pane) step3Pane.classList.toggle('active', isQuizActive);
        if (step4Pane) step4Pane.classList.toggle('active', isResultActive);

        // Switch Sub-Quest Panes inside Step 2 Form
        if (stepNum >= 2 && stepNum <= 3) {
            const subNum = stepNum - 1; // step 2 -> sub 1, step 3 -> sub 2
            for (let s = 1; s <= 2; s++) {
                const subPane = document.getElementById('subQuestPane' + s);
                if (subPane) subPane.classList.toggle('active', s === subNum);
            }
        }

        // Activate HUD Nodes (1. Instructions, 2. Basic Details, 3. Contact & Location)
        for (let i = 1; i <= 3; i++) {
            const node = document.getElementById('etNode' + i);
            if (node) {
                node.classList.toggle('active', i === stepNum);
                node.classList.toggle('passed', i < stepNum);
            }
        }

        // Update top HUD progress track fill bar & Rocket Vehicle position
        const hudFill = document.getElementById('etHudFill');
        const vehicle = document.getElementById('etHudVehicleWrapper');
        const positions = ['0%', '50%', '100%'];
        const pct = positions[Math.min(stepNum - 1, 2)] || '0%';

        if (hudFill) hudFill.style.width = pct;
        if (vehicle) vehicle.style.left = pct;

        // Speech bubble updates for Asha mentor
        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';

        if (stepNum === 1) {
            window.startGuidedRuleSequence();
        } else if (stepNum === 2) {
            window.clearAllRuleTimeouts();
            if (typeof window.validateStep1Progress === 'function') {
                window.validateStep1Progress();
            }
            if (bubble) {
                bubble.innerHTML = `Aao <span class="student-name-placeholder">${name}</span>! Sabse pehle apni basic details fill karo! 👋`;
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
                bubble.innerHTML = `Shabash <span class="student-name-placeholder">${name}</span>! Ab contact & location details bharein aur test start karein! 🚀`;
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

        // Validate Stage 2 fields
        const whatsapp = document.getElementById('etWhatsapp');
        const phone = document.getElementById('etPhone');
        const email = document.getElementById('etEmail');
        const pincode = document.getElementById('etPincode');
        const district = document.getElementById('etDistrict');
        const state = document.getElementById('etState');
        const currentStatus = document.getElementById('etCurrentStatus');
        const qualification = document.getElementById('etQualification');
        const medium = document.getElementById('etMedium');
        const category = document.getElementById('etCategory');

        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        document.querySelectorAll('.field-error-shake').forEach(el => el.classList.remove('field-error-shake'));

        if (!whatsapp || !whatsapp.value.trim()) {
            const grp = document.getElementById('groupWhatsapp');
            if (grp) grp.classList.add('field-error-shake');
            if (whatsapp) whatsapp.focus();
            if (bubble) bubble.innerHTML = `Almost there! Please enter your WhatsApp number 📱`;
            return;
        }

        if (!phone || !phone.value.trim()) {
            const grp = document.getElementById('groupPhone');
            if (grp) grp.classList.add('field-error-shake');
            if (phone) phone.focus();
            if (bubble) bubble.innerHTML = `Almost there! Enter your phone number 📞`;
            return;
        }

        if (!email || !email.value.trim()) {
            const grp = document.getElementById('groupEmail');
            if (grp) grp.classList.add('field-error-shake');
            if (email) email.focus();
            if (bubble) bubble.innerHTML = `Almost there! Enter your email address 📧`;
            return;
        }

        if (!pincode || !pincode.value.trim()) {
            const grp = document.getElementById('groupPincode');
            if (grp) grp.classList.add('field-error-shake');
            if (pincode) pincode.focus();
            if (bubble) bubble.innerHTML = `Almost there! Enter your 6-digit PIN code 📍`;
            return;
        }

        if (!district || !district.value.trim()) {
            const grp = document.getElementById('groupDistrict');
            if (grp) grp.classList.add('field-error-shake');
            if (district) district.focus();
            if (bubble) bubble.innerHTML = `Almost there! Enter your District name 🏡`;
            return;
        }

        if (!state || !state.value.trim()) {
            const grp = document.getElementById('groupState');
            if (grp) grp.classList.add('field-error-shake');
            if (state) state.focus();
            if (bubble) bubble.innerHTML = `Almost there! Enter your State name 🗺️`;
            return;
        }

        if (!currentStatus || !currentStatus.value) {
            const grp = document.getElementById('groupCurrentStatus');
            if (grp) grp.classList.add('field-error-shake');
            if (currentStatus) currentStatus.focus();
            if (bubble) bubble.innerHTML = `Just one detail — select your Current Status 🎓`;
            return;
        }

        if (!qualification || !qualification.value) {
            const grp = document.getElementById('groupQualification');
            if (grp) grp.classList.add('field-error-shake');
            if (qualification) qualification.focus();
            if (bubble) bubble.innerHTML = `Select your Highest Qualification 📜`;
            return;
        }

        if (!medium || !medium.value) {
            const grp = document.getElementById('groupMedium');
            if (grp) grp.classList.add('field-error-shake');
            if (medium) medium.focus();
            if (bubble) bubble.innerHTML = `Select your School Medium 📚`;
            return;
        }

        if (!category || !category.value) {
            const grp = document.getElementById('groupCategory');
            if (grp) grp.classList.add('field-error-shake');
            if (category) category.focus();
            if (bubble) bubble.innerHTML = `Select your Caste / Category 👥`;
            return;
        }

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

        if (numBadge) numBadge.innerText = `Question ${index + 1}/16`;
        if (topicBadge) topicBadge.style.display = 'none';
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

    window.startLiveEtQuiz = function () {
        startLiveEtQuiz();
    };

    function finishEtQuiz() {
        if (etTimerInterval) clearInterval(etTimerInterval);

        let score = 0;
        etQuestions.forEach((q, idx) => {
            if (userEtAnswers[idx] === q.correct) {
                score++;
            }
        });

        window.etAttemptHistory = window.etAttemptHistory || [];
        window.bookedInterviewSlot = window.bookedInterviewSlot || null;

        const isPassed = (score >= Math.ceil(etQuestions.length / 2));
        const marks = Math.round((score / etQuestions.length) * 25);
        const now = new Date();
        const timeStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const sName = (window.studentName && window.studentName !== 'Friend') ? window.studentName : (document.getElementById('etFirstName')?.value.trim() || 'Sujit Kumar');
        const sEmail = document.getElementById('etEmail')?.value.trim() || 'student@example.com';
        const sPhone = document.getElementById('etPhone')?.value.trim() || document.getElementById('etWhatsapp')?.value.trim() || '9915694098';
        const sState = document.getElementById('etState')?.value.trim() || 'Bihar';

        const nameEl = document.getElementById('resStudentName');
        const emailEl = document.getElementById('resStudentEmail');
        const phoneEl = document.getElementById('resStudentPhone');
        const stateEl = document.getElementById('resStudentState');

        if (nameEl) nameEl.innerText = sName;
        if (emailEl) emailEl.innerText = sEmail;
        if (phoneEl) phoneEl.innerText = sPhone;
        if (stateEl) stateEl.innerText = sState;

        // Push new attempt record to history
        window.etAttemptHistory.push({
            attemptNum: window.etAttemptHistory.length + 1,
            timeStr: timeStr,
            marks: marks,
            isPassed: isPassed
        });

        // Render dynamic attempt history table
        window.renderEtResultTable();

        if (isPassed && typeof window.runConfetti === 'function') {
            window.runConfetti();
        }

        window.goToEtStep(4);
    };

    // Render Dynamic Results Table with Attempt History & LR Row
    window.renderEtResultTable = function () {
        const tbody = document.getElementById('resTableBody');
        if (!tbody) return;

        let html = '';
        const history = window.etAttemptHistory || [];
        const hasAnyPassed = history.some(a => a.isPassed);

        history.forEach((attempt, index) => {
            const isLatest = (index === history.length - 1);
            const stageName = (history.length > 1) 
                ? `Screening Test (Attempt ${attempt.attemptNum})` 
                : `Screening Test`;

            const statusBadge = attempt.isPassed 
                ? `<span class="res-status-badge status-pass">✔ Pass</span>` 
                : `<span class="res-status-badge status-fail">✖ Fail</span>`;

            let actionCell = '-';
            if (!attempt.isPassed && isLatest && !hasAnyPassed) {
                actionCell = `<button type="button" class="res-action-btn btn-retest" onclick="startLiveEtQuiz()">Retest</button>`;
            }

            html += `
                <tr>
                    <td class="td-stage">${stageName}</td>
                    <td class="td-status">${statusBadge}</td>
                    <td class="td-time">${attempt.timeStr}</td>
                    <td class="td-actions">${actionCell}</td>
                    <td class="td-marks">${attempt.marks}</td>
                </tr>
            `;
        });

        // If ANY attempt was passed, show Learning Round row!
        if (hasAnyPassed) {
            let lrStatus = `<span class="res-status-badge status-pending">⏳ Pending</span>`;
            let lrTime = `Not Scheduled`;
            let lrAction = `<button type="button" class="res-action-btn btn-book-slot" onclick="openSlotBookingModal()">Book Slot</button>`;

            if (window.bookedInterviewSlot) {
                lrStatus = `<span class="res-status-badge status-scheduled">✔ Scheduled</span>`;
                lrTime = window.bookedInterviewSlot;
                lrAction = `-`;
            }

            html += `
                <tr id="resRowLearning">
                    <td class="td-stage">Learning Round</td>
                    <td class="td-status">${lrStatus}</td>
                    <td class="td-time">${lrTime}</td>
                    <td class="td-actions">${lrAction}</td>
                    <td class="td-marks">-</td>
                </tr>
            `;
        }

        tbody.innerHTML = html;
    };

    // Book Interview Slot Modal Handlers
    window.openSlotBookingModal = function () {
        const modal = document.getElementById('slotBookingModal');
        if (modal) modal.style.display = 'flex';

        const sName = document.getElementById('resStudentName')?.innerText || 'Sujit Kumar';
        const sEmail = document.getElementById('resStudentEmail')?.innerText || 'student@example.com';
        const userInfo = document.getElementById('slotModalUserInfo');
        if (userInfo) userInfo.innerText = `👤 ${sName} • ${sEmail}`;

        const dateInput = document.getElementById('slotDatePicker');
        if (dateInput) {
            const tmrw = new Date();
            tmrw.setDate(tmrw.getDate() + 1);
            dateInput.valueAsDate = tmrw;
            window.updateSelectedDatePreview();
        }
    };

    window.closeSlotBookingModal = function () {
        const modal = document.getElementById('slotBookingModal');
        if (modal) modal.style.display = 'none';
    };

    window.updateSelectedDatePreview = function () {
        const dateInput = document.getElementById('slotDatePicker');
        const preview = document.getElementById('slotDatePreview');
        if (dateInput && dateInput.value && preview) {
            const d = new Date(dateInput.value);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            preview.innerText = `Selected Date: ${d.toLocaleDateString('en-US', options)}`;
        }
    };

    window.selectSlotChip = function (el) {
        document.querySelectorAll('.slot-chip').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
    };

    window.confirmSlotBooking = function () {
        const dateInput = document.getElementById('slotDatePicker');
        const selectedChip = document.querySelector('.slot-chip.selected');

        const dateStr = dateInput?.value ? new Date(dateInput.value).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '08/27/2026';
        const slotTime = selectedChip ? selectedChip.innerText : '05:00 PM - 06:00 PM';

        window.bookedInterviewSlot = `${dateStr}, ${slotTime}`;
        window.renderEtResultTable();
        window.closeSlotBookingModal();

        if (typeof window.runConfetti === 'function') {
            window.runConfetti();
        }

        const sName = document.getElementById('resStudentName')?.innerText || 'Friend';
        const bubble = document.getElementById('ashaMentorBubble');
        if (bubble) {
            bubble.innerHTML = `Bahut Badhiya <strong>${sName}</strong>! 🎉 Aapka Interview Slot (${dateStr}) successfully book ho gaya hai!`;
        }

        alert(`🎉 Interview Slot Booked Successfully!\n\nDate: ${dateStr}\nTime: ${slotTime}\n\nConfirmation sent to your email & WhatsApp!`);
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
        // Setup interactive Step 2 form guidance for Asha mentor
        window.setupFormFocusGuidance();
    }

    // ==========================================================================
    // STEP 1 GAMIFIED & INTERACTIVE LOGIC (Basic Details & Admit Card Photo)
    // ==========================================================================
    let step1CelebrationTriggered = false;

    window.handleEtPhotoUpload = function (event) {
        const file = event.target && event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const previewWrap = document.getElementById('etPhotoPreviewWrap');
            const imgEl = document.getElementById('etPhotoImg');
            const badgeEl = document.getElementById('etPhotoTileBadge');
            const labelEl = document.getElementById('etPhotoLabel');
            const subEl = document.getElementById('etPhotoSub');
            const cardEl = document.getElementById('etPhotoCard');

            if (imgEl) imgEl.src = e.target.result;
            if (previewWrap) previewWrap.style.display = 'block';
            if (badgeEl) badgeEl.style.display = 'none';
            if (labelEl) labelEl.textContent = 'Looks great! ✓';
            if (subEl) subEl.textContent = 'Change Photo ✏️';
            if (cardEl) cardEl.classList.add('photo-uploaded');

            const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
            if (bubble) {
                bubble.innerHTML = `Looking great! 😄`;
                bubble.classList.remove('speech-bounce');
                void bubble.offsetWidth;
                bubble.classList.add('speech-bounce');
            }

            window.validateStep1Progress();
        };
        reader.readAsDataURL(file);
    };

    window.validateStep1Progress = function () {
        const fnInput = document.getElementById('etFirstName');
        const lnInput = document.getElementById('etLastName');
        const dobInput = document.getElementById('etDob');
        const genderChecked = document.querySelector('input[name="etGender"]:checked');
        const photoCard = document.getElementById('etPhotoCard');
        const photoUploaded = photoCard && photoCard.classList.contains('photo-uploaded');

        const isFnValid = !!(fnInput && fnInput.value.trim().length > 0);
        const isLnValid = !!(lnInput && lnInput.value.trim().length > 0);
        const isDobValid = !!(dobInput && dobInput.value !== '');
        const isGenderValid = !!genderChecked;
        const isPhotoValid = !!photoUploaded;

        // Update Group Checkmarks
        const groupFn = document.getElementById('groupFirstName');
        if (groupFn) groupFn.classList.toggle('is-valid', isFnValid);

        const groupLn = document.getElementById('groupLastName');
        if (groupLn) groupLn.classList.toggle('is-valid', isLnValid);

        const groupDob = document.getElementById('groupDob');
        if (groupDob) groupDob.classList.toggle('is-valid', isDobValid);

        // Gender Pills Selection Highlight
        const pills = document.querySelectorAll('.et-gender-pill');
        pills.forEach(pill => {
            const radio = pill.querySelector('input[name="etGender"]');
            pill.classList.toggle('pill-selected', !!(radio && radio.checked));
        });

        // Calculate completed count out of 5 required items
        let completedCount = 0;
        if (isFnValid) completedCount++;
        if (isLnValid) completedCount++;
        if (isDobValid) completedCount++;
        if (isGenderValid) completedCount++;
        if (isPhotoValid) completedCount++;

        // Next Button readiness style
        const nextBtn = document.getElementById('etStep1NextBtn');
        if (nextBtn) {
            nextBtn.classList.toggle('ready-to-proceed', completedCount === 5);
        }

        // Small local celebration on completion (rocket stays at Stop 1/Node 2!)
        if (completedCount === 5 && !step1CelebrationTriggered) {
            step1CelebrationTriggered = true;
            window.triggerStep1Celebration();
        } else if (completedCount < 5) {
            step1CelebrationTriggered = false;
        }
    };

    window.triggerStep1Celebration = function () {
        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        if (bubble) {
            bubble.innerHTML = `Awesome! You're ready for the next step! 🎉`;
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }

        const card = document.getElementById('etStep1FormCard');
        if (!card) return;

        const sparkles = ['✨', '✦', '⭐'];
        for (let i = 0; i < 3; i++) {
            const el = document.createElement('span');
            el.className = 'step1-micro-sparkle';
            el.textContent = sparkles[i % sparkles.length];
            el.style.left = (20 + Math.random() * 60) + '%';
            el.style.top = (15 + Math.random() * 70) + '%';
            card.appendChild(el);

            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 1200);
        }
    };

    window.handleStep1Next = function (e) {
        if (e) e.preventDefault();

        const fnInput = document.getElementById('etFirstName');
        const lnInput = document.getElementById('etLastName');
        const dobInput = document.getElementById('etDob');
        const genderChecked = document.querySelector('input[name="etGender"]:checked');
        const photoCard = document.getElementById('etPhotoCard');
        const photoUploaded = photoCard && photoCard.classList.contains('photo-uploaded');

        const isFnValid = !!(fnInput && fnInput.value.trim().length > 0);
        const isLnValid = !!(lnInput && lnInput.value.trim().length > 0);
        const isDobValid = !!(dobInput && dobInput.value !== '');
        const isGenderValid = !!genderChecked;
        const isPhotoValid = !!photoUploaded;

        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');

        // Clear previous error shakes
        document.querySelectorAll('.field-error-shake').forEach(el => el.classList.remove('field-error-shake'));

        if (!isFnValid) {
            const group = document.getElementById('groupFirstName');
            if (group) group.classList.add('field-error-shake');
            if (fnInput) fnInput.focus();
            if (bubble) bubble.innerHTML = `Almost there! What should we call you? 😊`;
            return;
        }

        if (!isLnValid) {
            const group = document.getElementById('groupLastName');
            if (group) group.classList.add('field-error-shake');
            if (lnInput) lnInput.focus();
            if (bubble) bubble.innerHTML = `Almost there! Add your last name 😊`;
            return;
        }

        if (!isDobValid) {
            const group = document.getElementById('groupDob');
            if (group) group.classList.add('field-error-shake');
            if (dobInput) dobInput.focus();
            if (bubble) bubble.innerHTML = `Almost there! When were you born? 📅`;
            return;
        }

        if (!isGenderValid) {
            const group = document.getElementById('groupGender');
            if (group) group.classList.add('field-error-shake');
            if (bubble) bubble.innerHTML = `Just one more thing — select your gender. 🚻`;
            return;
        }

        if (!isPhotoValid) {
            if (photoCard) photoCard.classList.add('field-error-shake');
            if (bubble) bubble.innerHTML = `Don't forget to add your photo! 📷`;
            return;
        }

        // Capture name if entered
        if (fnInput && fnInput.value.trim()) {
            window.studentName = fnInput.value.trim();
            const placeholders = document.querySelectorAll('.student-name-placeholder');
            placeholders.forEach(el => el.innerText = window.studentName);
        }

        // Animate Rocket smoothly from Stop 2 (50%) to Stop 3 (100%), then move to step 3
        const hudFill = document.getElementById('etHudFill');
        const vehicle = document.getElementById('etHudVehicleWrapper');
        if (hudFill && vehicle) {
            hudFill.style.transition = 'width 0.8s cubic-bezier(0.34, 1.25, 0.64, 1)';
            vehicle.style.transition = 'left 0.8s cubic-bezier(0.34, 1.25, 0.64, 1)';
            vehicle.classList.add('is-zooming-forward');
            hudFill.style.width = '100%';
            vehicle.style.left = '100%';
        }

        setTimeout(() => {
            if (vehicle) vehicle.classList.remove('is-zooming-forward');
            window.goToEtStep(3);
        }, 800);
    };

    // Interactive Form Field Guidance for Step 2 Form (Asha Mentor)
    const formFieldGuidance = {
        'etFirstName': "What should we call you? 😊",
        'etMiddleName': 'Optional middle name 📝',
        'etLastName': 'Enter your last name 👤',
        'etDob': 'Just one more detail! 📅',
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

        // Step 1 Inputs live listeners
        const step1Inputs = ['etFirstName', 'etMiddleName', 'etLastName', 'etDob'];
        step1Inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', function () {
                    if (id === 'etFirstName' && el.value.trim().length > 0) {
                        showMentorGuidance("Nice! Great start ✨");
                    }
                    window.validateStep1Progress();
                });
                el.addEventListener('change', function () {
                    window.validateStep1Progress();
                });
            }
        });

        // Radios for gender
        const genderRadios = profileForm.querySelectorAll('input[name="etGender"]');
        genderRadios.forEach(radio => {
            radio.addEventListener('focus', function () {
                showMentorGuidance('Tell us a little about you 🚻');
            });
            radio.addEventListener('change', function () {
                showMentorGuidance('Got it! 👍');
                window.validateStep1Progress();
            });
            radio.addEventListener('blur', function () {
                resetMentorGuidanceDefault();
            });
        });

        // Photo upload card hover & focus
        const photoCard = document.getElementById('etPhotoCard');
        if (photoCard) {
            photoCard.addEventListener('mouseenter', function () {
                showMentorGuidance('Help us recognize you! 👋');
            });
            photoCard.addEventListener('mouseleave', function () {
                resetMentorGuidanceDefault();
            });
        }

        // All form inputs & selects focus guidance
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

        // Stage 2 Inputs live listeners
        const stage2Inputs = ['etWhatsapp', 'etPhone', 'etEmail', 'etPincode', 'etDistrict', 'etState', 'etCurrentStatus', 'etQualification', 'etMedium', 'etCategory'];
        stage2Inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', function () {
                    window.validateStep2Progress();
                });
                el.addEventListener('change', function () {
                    window.validateStep2Progress();
                });
            }
        });

        // Initial validation run
        window.validateStep1Progress();
        window.validateStep2Progress();
    };

    window.validateStep2Progress = function () {
        const fields = [
            { id: 'etWhatsapp', group: 'groupWhatsapp' },
            { id: 'etPhone', group: 'groupPhone' },
            { id: 'etEmail', group: 'groupEmail' },
            { id: 'etPincode', group: 'groupPincode' },
            { id: 'etDistrict', group: 'groupDistrict' },
            { id: 'etState', group: 'groupState' },
            { id: 'etCurrentStatus', group: 'groupCurrentStatus' },
            { id: 'etQualification', group: 'groupQualification' },
            { id: 'etMedium', group: 'groupMedium' },
            { id: 'etCategory', group: 'groupCategory' }
        ];

        let validCount = 0;
        fields.forEach(f => {
            const el = document.getElementById(f.id);
            const grp = document.getElementById(f.group);
            const isValid = !!(el && el.value.trim() !== '');
            if (grp) grp.classList.toggle('is-valid', isValid);
            if (isValid) validCount++;
        });

        const submitBtn = document.getElementById('etSubmitProfileBtn');
        if (submitBtn) {
            submitBtn.classList.toggle('ready-to-proceed', validCount === fields.length);
        }
    };

    function showMentorGuidance(msg) {
        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        if (bubble) {
            bubble.innerHTML = `<span class="student-name-placeholder">${name}</span>, ${msg}`;
            bubble.classList.remove('speech-bounce');
            void bubble.offsetWidth;
            bubble.classList.add('speech-bounce');
        }
    }

    function resetMentorGuidanceDefault() {
        const bubble = document.getElementById('etPortalSpeechBubble') || document.getElementById('loginSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        const isPane2Active = document.getElementById('subQuestPane2')?.classList.contains('active');
        if (bubble) {
            if (isPane2Active) {
                bubble.innerHTML = `Shabash <span class="student-name-placeholder">${name}</span>! Ab contact & location details bharein aur test start karein! 🚀`;
            } else {
                bubble.innerHTML = `Aao <span class="student-name-placeholder">${name}</span>! Sabse pehle apni basic details fill karo! 👋`;
            }
        }
    }

    /* Sub-Quest Navigation for Step 2 Gamified Quest Flow */
    window.currentSubQuest = 1;

    window.switchSubQuest = function (num) {
        window.currentSubQuest = num;

        // Update HUD Pills
        for (let i = 1; i <= 2; i++) {
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
        const pcts = ['50%', '100%'];
        const titles = [
            'STAGE 1 OF 2 • BASIC DETAILS',
            'STAGE 2 OF 2 • CONTACT, EDUCATION & LOCATION'
        ];

        if (fill) fill.style.width = pcts[num - 1];
        if (indicator) indicator.innerText = titles[num - 1];

        // Asha Speech Bubble Dialogue per Sub-Quest
        const bubble = document.getElementById('etPortalSpeechBubble');
        const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : 'Friend';
        const dialogues = [
            `Aao ${name}! Sabse pehle apni basic details fill karo! 👤`,
            `Shabash ${name}! Ab contact & location details bharein aur test start karein! 🚀`
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
