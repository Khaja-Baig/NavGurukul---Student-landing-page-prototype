// Interactive Screen Routines & Animations (Screens 2–6)

const alumni = [
    {
        n: 'Ananya Singh', co: 'Zoho', domain: 'zoho.com',
        logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='20' fill='%23ea2328'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='Arial, sans-serif' font-weight='900' font-size='30' letter-spacing='-1'>ZOHO</text></svg>",
        role: 'Full Stack Dev', pkg: '₹4.5 LPA', color: '#e91e63',
        batch: 'Batch of 2022', city: 'Chennai',
        quote: 'NavGurukul gave me hands-on peer learning and 1-on-1 mentorship. Cracking Zoho with zero prior tech background was a dream turned reality!'
    },
    {
        n: 'Rahul Kumar', co: 'Razorpay', domain: 'razorpay.com',
        logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='20' fill='%23072654'/><path d='M25 75 L55 25 L75 25 L45 75 Z' fill='%233395ff'/><path d='M42 75 L72 25 L82 25 L52 75 Z' fill='%2300d2ff' opacity='0.85'/></svg>",
        role: 'Data Analyst', pkg: '₹4.2 LPA', color: '#d97706',
        batch: 'Batch of 2023', city: 'Bengaluru',
        quote: 'Coming from a small village with zero coding experience, NavGurukul transformed my trajectory into a fintech unicorn analyst.'
    },
    {
        n: 'Priya Sharma', co: 'Swiggy', domain: 'swiggy.com',
        logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='20' fill='%23fc8019'/><path d='M50 20 C38 20 30 28 30 38 C30 52 50 78 50 78 C50 78 70 52 70 38 C70 28 62 20 50 20 Z M50 48 C44.5 48 40 43.5 40 38 C40 32.5 44.5 28 50 28 C55.5 28 60 32.5 60 38 C60 43.5 55.5 48 50 48 Z' fill='%23ffffff'/></svg>",
        role: 'QA Engineer', pkg: '₹3.8 LPA', color: '#059669',
        batch: 'Batch of 2022', city: 'Bengaluru',
        quote: 'The 100% scholarship residential program gave me focus, safety, and world-class training to start my engineering career.'
    },
    {
        n: 'Karan Patel', co: 'Infosys', domain: 'infosys.com',
        logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='20' fill='%23007cc3'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='Arial, sans-serif' font-weight='900' font-size='28' letter-spacing='-1'>infosys</text></svg>",
        role: 'Backend Dev', pkg: '₹4.8 LPA', color: '#0284c7',
        batch: 'Batch of 2021', city: 'Pune',
        quote: 'NavGurukul taught me how to learn on my own. That self-learning ability is why I excel today as a senior backend engineer.'
    },
    {
        n: 'Sneha Verma', co: 'TCS', domain: 'tcs.com',
        logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='20' fill='%23004b87'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='Arial, sans-serif' font-weight='900' font-size='34' letter-spacing='1'>TCS</text></svg>",
        role: 'Frontend Dev', pkg: '₹4.0 LPA', color: '#e91e63',
        batch: 'Batch of 2023', city: 'Mumbai',
        quote: 'Building real projects alongside passionate peers under the banyan tree vibe made learning web dev fun and fast!'
    },
    {
        n: 'Vikram Joshi', co: 'Freshworks', domain: 'freshworks.com',
        logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='20' fill='%23111827'/><path d='M30 25 L70 25 C75 25 75 35 70 35 L45 35 L45 50 L65 50 C70 50 70 60 65 60 L45 60 L45 80 L30 80 Z' fill='%23f43f5e'/></svg>",
        role: 'Support Eng', pkg: '₹3.6 LPA', color: '#d97706',
        batch: 'Batch of 2022', city: 'Chennai',
        quote: 'From zero confidence to leading product support at Freshworks! NavGurukul truly empowers youth from underserved communities.'
    }
];

function getLogoUrls(a) {
    return {
        primary: `https://logo.clearbit.com/${a.domain}`,
        fallback1: `https://img.logo.dev/${a.domain}?token=pk_1c6bce7e84d04fc2b48bbdd0ca0cd498`,
        fallback2: a.logo
    };
}

let alumniBuilt = false;
function buildAlumni() {
    if (alumniBuilt) return;
    const track = document.getElementById('alumniTrack');
    if (!track) return;
    const list = alumni.concat(alumni);
    track.innerHTML = list.map((a, idx) => {
        const realIdx = idx % alumni.length;
        const initials = a.n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        const urls = getLogoUrls(a);
        return `<div class="alumni-card" data-idx="${realIdx}" onclick="openTestimonialModal(${realIdx})" role="button" tabindex="0" title="Click to view ${a.n}'s testimonial">
            <div class="acard-top">
                <div class="alumni-avatar" style="background:${a.color}">${initials}</div>
                <div class="alumni-meta">
                    <div class="aname">${a.n}</div>
                    <div class="arole">${a.role}</div>
                    <div class="apkg">${a.pkg}</div>
                </div>
                <div class="alumni-logo-wrap">
                    <img class="alumni-logo" src="${urls.primary}" alt="${a.co}" 
                         onerror="if(!this.dataset.t1){this.dataset.t1='1';this.src='${urls.fallback1}';}else if(!this.dataset.t2){this.dataset.t2='1';this.src='${urls.fallback2}';}">
                </div>
            </div>
            <div class="acard-quote">"${a.quote}"</div>
            <div class="acard-bottom">
                <div class="acard-city">📍 ${a.city}</div>
                <div class="acard-link">View story →</div>
            </div>
        </div>`;
    }).join('');
    alumniBuilt = true;
}

const companyPool = [
    { co: 'Zoho', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23ea2328'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='28' letter-spacing='-1'>ZOHO</text></svg>" },
    { co: 'Razorpay', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23072654'/><path d='M25 75 L55 25 L75 25 L45 75 Z' fill='%233395ff'/><path d='M42 75 L72 25 L82 25 L52 75 Z' fill='%2300d2ff' opacity='0.85'/></svg>" },
    { co: 'Swiggy', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23fc8019'/><path d='M50 20 C38 20 30 28 30 38 C30 52 50 78 50 78 C50 78 70 52 70 38 C70 28 62 20 50 20 Z M50 48 C44.5 48 40 43.5 40 38 C40 32.5 44.5 28 50 28 C55.5 28 60 32.5 60 38 C60 43.5 55.5 48 50 48 Z' fill='%23ffffff'/></svg>" },
    { co: 'Infosys', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23007cc3'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='26' letter-spacing='-1'>infosys</text></svg>" },
    { co: 'TCS', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23004b87'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='32' letter-spacing='1'>TCS</text></svg>" },
    { co: 'Freshworks', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23111827'/><path d='M30 25 L70 25 C75 25 75 35 70 35 L45 35 L45 50 L65 50 C70 50 70 60 65 60 L45 60 L45 80 L30 80 Z' fill='%23f43f5e'/></svg>" },
    { co: 'Wipro', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='3'/><circle cx='36' cy='45' r='14' fill='%23e11d48'/><circle cx='64' cy='45' r='14' fill='%232563eb'/><circle cx='50' cy='62' r='14' fill='%23059669'/></svg>" },
    { co: 'HCLTech', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%2300529b'/><text x='50' y='64' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-weight='900' font-size='28'>HCL</text></svg>" },
    { co: 'Accenture', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%23a100ff'/><path d='M25 65 L75 35 L75 48 L35 75 Z' fill='%23ffffff'/></svg>" },
    { co: 'Flipkart', logo: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' rx='22' fill='%232874f0'/><text x='50' y='66' text-anchor='middle' fill='%23ffe500' font-family='sans-serif' font-weight='900' font-size='42'>f</text></svg>" }
];

let activeSlots = [0, 1, 2, 3, 4, 5];
let unassignedPool = [6, 7, 8, 9];
let companyRotationTimer = null;
let companiesBuilt = false;

function buildCompanies() {
    const track = document.getElementById('companiesTrack');
    if (!track) return;
    if (!companiesBuilt) {
        track.innerHTML = activeSlots.map((coIdx, slotIdx) => {
            const c = companyPool[coIdx];
            return `<div class="company-slot" id="cslot-${slotIdx}">
                <div class="cslot-logo-wrap">
                    <img src="${c.logo}" alt="${c.co}">
                </div>
                <span class="cslot-name">${c.co}</span>
            </div>`;
        }).join('');
        companiesBuilt = true;
    }
    startCompanyRotation();
}

function startCompanyRotation() {
    if (companyRotationTimer) clearInterval(companyRotationTimer);

    companyRotationTimer = setInterval(() => {
        if (unassignedPool.length === 0) return;

        // Pick a random visible slot (0 to 5)
        const slotIdx = Math.floor(Math.random() * activeSlots.length);
        const slotEl = document.getElementById(`cslot-${slotIdx}`);
        if (!slotEl) return;

        // Pick next company from unassigned pool
        const nextCoIdx = unassignedPool.shift();
        const prevCoIdx = activeSlots[slotIdx];

        // Put previous company back into unassigned pool
        unassignedPool.push(prevCoIdx);
        activeSlots[slotIdx] = nextCoIdx;

        const newCo = companyPool[nextCoIdx];

        // Animate exit then entry
        slotEl.classList.remove('entering');
        slotEl.classList.add('exiting');

        setTimeout(() => {
            slotEl.innerHTML = `<div class="cslot-logo-wrap">
                <img src="${newCo.logo}" alt="${newCo.co}">
            </div>
            <span class="cslot-name">${newCo.co}</span>`;

            slotEl.classList.remove('exiting');
            slotEl.classList.add('entering');

            setTimeout(() => {
                slotEl.classList.remove('entering');
            }, 450);
        }, 360);

    }, 2800);
}

window.openTestimonialModal = function (idx) {
    const a = alumni[idx];
    if (!a) return;
    const modal = document.getElementById('testimonialModal');
    if (!modal) return;

    modal.querySelector('.tm-avatar').style.background = a.color;
    modal.querySelector('.tm-initials').textContent = a.n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    modal.querySelector('.tm-name').textContent = a.n;
    modal.querySelector('.tm-role').textContent = a.role;
    modal.querySelector('.tm-city').textContent = a.city + ' • ' + a.batch;
    modal.querySelector('.tm-quote').textContent = '"' + a.quote + '"';
    modal.querySelector('.tm-pkg').textContent = a.pkg;

    // Set company name beside logo box
    const coNameEl = modal.querySelector('.tm-co-name');
    if (coNameEl) coNameEl.textContent = a.co;

    const urls = getLogoUrls(a);
    const logoImg = modal.querySelector('.tm-logo');

    if (logoImg) {
        delete logoImg.dataset.t1;
        delete logoImg.dataset.t2;
        logoImg.style.display = 'block';
        logoImg.src = urls.primary;
        logoImg.alt = a.co;
        logoImg.onerror = function () {
            if (!this.dataset.t1) {
                this.dataset.t1 = '1';
                this.src = urls.fallback1;
            } else if (!this.dataset.t2) {
                this.dataset.t2 = '1';
                this.src = urls.fallback2;
            }
        };
    }

    modal.classList.add('open');
};

window.closeTestimonialModal = function () {
    const modal = document.getElementById('testimonialModal');
    if (modal) modal.classList.remove('open');
};

function triggerParrotFlight() {
    if (window.startAutonomousBirdFlight) {
        window.startAutonomousBirdFlight('intro_tour');
    }
}

function runScreen2() {
    buildAlumni();
    buildCompanies();
    triggerParrotFlight();
}

// Screen 3 Offerings
function runScreen3() {
    const guide = document.getElementById('guide3');
    const cap = document.getElementById('cap3');
    const zones = ['zoneLearn', 'zoneFood', 'zoneStay', 'zoneWifi', 'zonePlacement'].map(id => document.getElementById(id));
    zones.forEach(z => z && z.classList.remove('highlight'));
    const rewardEl = document.getElementById('rewardLine');
    if (rewardEl) rewardEl.classList.remove('show');
    if (guide) guide.style.left = '8%';

    function clearAll() { zones.forEach(z => z && z.classList.remove('highlight')); }

    runGuideTimeline(guide, cap, [
        { left: 8, caption: 'Every candidate receives a personal coding laptop on day one.', onArrive: () => zones[0] && zones[0].classList.add('highlight'), clearHighlight: clearAll },
        { left: 26, caption: 'Three nutritious meals daily provided completely free.', onArrive: () => zones[1] && zones[1].classList.add('highlight'), clearHighlight: clearAll },
        { left: 48, caption: 'Safe, comfortable campus residential stay.', onArrive: () => zones[2] && zones[2].classList.add('highlight'), clearHighlight: clearAll },
        { left: 68, caption: '24x7 High-speed Wi-Fi internet for uninterrupted learning.', onArrive: () => zones[3] && zones[3].classList.add('highlight'), clearHighlight: clearAll },
        { left: 88, caption: '100% placement guarantee until you get hired in tech!', onArrive: () => { zones[4] && zones[4].classList.add('highlight'); rewardEl && rewardEl.classList.add('show'); }, clearHighlight: clearAll, hold: 4000 }
    ]);
}

// Screen 4 Choose Specialty Path & School Details Modal
const schools = [
    {
        tag: 'SOFTWARE DEVELOPMENT',
        title: 'School of Programming (SOP)',
        bgClass: 'blue-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be a Graduate',
            'Family income less than 5 LPA',
            'Strong interest in coding and problem solving',
            'Ready to stay in a residential program'
        ],
        curriculum: [
            'Programming Basics & Logical Thinking',
            'Frontend: HTML, CSS, JavaScript, React',
            'Backend: Node.js, Express, Databases',
            'Git & GitHub',
            'English Communication & Workplace Skills'
        ],
        outcomes: [
            'Software Engineer',
            'Full Stack Developer',
            'Entry-level IT Jobs',
            'Career growth in the tech industry'
        ],
        duration: '20–24 months (Self-paced, duration may vary)',
        location: 'Various Campuses (Dantewada, Bengaluru, Pune etc.)'
    },
    {
        tag: 'OPERATIONS & MARKETING',
        title: 'School of Business (SOB)',
        bgClass: 'green-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be 12th pass',
            'Family income less than 5 LPA',
            'Good communication skills and willingness to learn'
        ],
        curriculum: [
            'Business Operations & Reporting',
            'Digital Marketing (SEO, Social Media, Content Writing)',
            'Customer & Client Coordination',
            'Email Writing & Time Management',
            'Real-world projects with startups & NGOs'
        ],
        outcomes: [
            'Marketing Associate',
            'Operations Executive',
            'Customer Support Executive',
            'Business Development Roles'
        ],
        duration: '12–18 months (Self-paced, duration may vary)',
        location: 'Bengaluru, Jashpur, Dantewada, Pune'
    },
    {
        tag: 'ACCOUNTING & TAXATION',
        title: 'School of Finance (SOF)',
        bgClass: 'orange-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be 12th pass',
            'Family income less than 5 LPA',
            'Interest in finance and numbers'
        ],
        curriculum: [
            'Practical Accounting',
            'GST & Income Tax Basics',
            'Payroll Management',
            'Tally & Advanced Excel',
            'Financial Reporting'
        ],
        outcomes: [
            'Accounts Executive',
            'Tax Associate',
            'Finance Operations Executive',
            'Compliance Assistant'
        ],
        duration: '8–12 months (Self-paced, duration may vary)',
        location: 'Pune, Maharashtra'
    },
    {
        tag: 'UI/UX & GRAPHIC DESIGN',
        title: 'School of Design (SOD)',
        bgClass: 'purple-bg',
        eligibility: [
            'Minimum age: 16.5 years',
            'Must be 12th pass',
            'Family income less than 5 LPA',
            'Creativity and passion for visual design & user experiences'
        ],
        curriculum: [
            'Design Thinking & UI/UX Principles',
            'Figma, Adobe XD & Prototyping',
            'User Research & Wireframing',
            'Visual Branding & Graphic Design',
            'Live Client & Portfolio Projects'
        ],
        outcomes: [
            'UI/UX Designer',
            'Product Designer',
            'Graphic Designer',
            'Visual Communication Specialist'
        ],
        duration: '12–15 months (Self-paced, duration may vary)',
        location: 'Bengaluru, Pune, Himachal'
    }
];

window.openSchoolModal = function (idx) {
    const s = schools[idx];
    if (!s) return;
    const modal = document.getElementById('schoolModal');
    if (!modal) return;

    const header = document.getElementById('smHeader');
    if (header) {
        header.className = 'sm-header ' + s.bgClass;
    }

    document.getElementById('smTag').textContent = s.tag;
    document.getElementById('smTitle').textContent = s.title;

    function renderList(elId, items) {
        const el = document.getElementById(elId);
        if (el) {
            el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
        }
    }

    renderList('smEligibility', s.eligibility);
    renderList('smCurriculum', s.curriculum);
    renderList('smOutcomes', s.outcomes);

    document.getElementById('smDuration').textContent = s.duration;
    document.getElementById('smLocation').textContent = s.location;

    const applyBtn = document.getElementById('smApplyBtn');
    if (applyBtn) {
        applyBtn.onclick = function () {
            window.closeSchoolModal();
            if (typeof window.go === 'function') {
                window.go(2); // Advance to 100% Scholarship (Screen 3)
            }
        };
    }

    modal.classList.add('open');
};

window.closeSchoolModal = function () {
    const modal = document.getElementById('schoolModal');
    if (modal) modal.classList.remove('open');
};

let s4HoverBound = false;

function runScreen4() {
    const wrap = document.getElementById('s4AvatarWrap');
    const bubble = document.getElementById('s4SpeechBubble');
    const cards = document.querySelectorAll('.school-card');
    const stack = document.getElementById('schoolRow');
    if (!wrap || !bubble) return;

    const laterFn = typeof window.later === 'function' ? window.later : setTimeout;

    // Reset state
    wrap.classList.remove('visible');
    bubble.classList.remove('show');
    bubble.textContent = '';
    if (stack) stack.classList.remove('has-active');
    cards.forEach(c => c.classList.remove('avatar-highlight'));

    const name = (window.studentName && window.studentName !== 'Friend') ? window.studentName : null;
    const greet = name ? `Hi ${name}! 👋` : 'Hello there! 👋';

    const script = [
        { msg: `${greet} Let me show you our 4 specialty schools!`, card: -1, hold: 2600 },
        { msg: '💻 School of Programming (SOP) — Coding & Full-Stack Development!', card: 0, hold: 3000 },
        { msg: '📊 School of Business (SOB) — Operations, Marketing & Management!', card: 1, hold: 3000 },
        { msg: '💰 School of Finance (SOF) — Accounting, GST & Taxation!', card: 2, hold: 3000 },
        { msg: '🎨 School of Design (SOD) — UI/UX Design, Figma & Prototyping!', card: 3, hold: 3000 },
        { msg: 'Click any school card to check full details & eligibility! 🚀', card: -1, hold: 3500 },
    ];

    let currentScriptStep = -1;

    function showMsg(msg) {
        bubble.classList.remove('show');
        laterFn(() => {
            bubble.textContent = msg;
            bubble.classList.add('show');
        }, 180);
    }

    function clearHighlights() {
        cards.forEach(c => c.classList.remove('avatar-highlight'));
        if (stack) stack.classList.remove('has-active');
    }

    function setHighlight(idx) {
        clearHighlights();
        if (idx >= 0 && cards[idx]) {
            cards[idx].classList.add('avatar-highlight');
            if (stack) stack.classList.add('has-active');
        }
    }

    // Slide in avatar after short entrance delay
    laterFn(() => {
        wrap.classList.add('visible');
        let i = 0;
        function runStep() {
            if (i >= script.length) {
                bubble.classList.remove('show');
                clearHighlights();
                currentScriptStep = -1;
                return;
            }
            currentScriptStep = i;
            const step = script[i];
            showMsg(step.msg);
            setHighlight(step.card);
            i++;
            laterFn(runStep, step.hold);
        }
        runStep();
    }, 400);

    // Bind card hover event listeners only once
    if (!s4HoverBound) {
        const tips = [
            '💻 SOP: 20–24 months · Residential coding & full stack web dev!',
            '📊 SOB: 12–18 months · Operations, digital marketing & management!',
            '💰 SOF: 8–12 months · Practical accounting, GST & taxation!',
            '🎨 SOD: 12–15 months · UI/UX design, Figma & product design!'
        ];

        cards.forEach((card, idx) => {
            card.addEventListener('mouseenter', () => {
                bubble.textContent = tips[idx];
                bubble.classList.add('show');
                setHighlight(idx);
            });
            card.addEventListener('mouseleave', () => {
                if (currentScriptStep === -1) {
                    bubble.classList.remove('show');
                    clearHighlights();
                } else if (script[currentScriptStep]) {
                    const step = script[currentScriptStep];
                    bubble.textContent = step.msg;
                    setHighlight(step.card);
                }
            });
        });
        s4HoverBound = true;
    }
}

// ===================== SCREEN 5: ADVENTUROUS ROADMAP CONTROLLER =====================
let s5CurrentStage = 0;
let s5IsWalking = false;

// Waypoints along winding trail on parchment map (% left, % top)
const s5StageWaypoints = [
    // Stage 0: START Signpost (on trail)
    [{ left: 11, top: 72 }],

    // Stage 1: Level 1 - Screening Test (Pink Tent - path in front of tent)
    [{ left: 13, top: 70 }, { left: 15, top: 66 }, { left: 18.5, top: 64 }],

    // Stage 2: Level 2 - Learning Round (Tech Cottage - path in front of cottage)
    [{ left: 24, top: 68 }, { left: 31, top: 72 }, { left: 37, top: 66 }, { left: 40.5, top: 62 }],

    // Stage 3: Level 3 - Culture-fit Round (Gazebo - path in front of gazebo)
    [{ left: 46, top: 64 }, { left: 51, top: 67 }, { left: 59.5, top: 66 }],

    // Stage 4: Final Destination - Campus Welcome (path in front of campus gate)
    [{ left: 66, top: 68 }, { left: 74, top: 65 }, { left: 78, top: 58 }, { left: 80, top: 55 }]
];

const s5BannerMessages = [
    (name) => `Aao ${name}! <span class="s5-highlight-pink">Level 1: Screening Test (ST)</span> explore karein! 🚀`,
    (name) => `Awesome ${name}! <span class="s5-highlight-pink">Level 1 (Screening Test)</span> cleared! Now advance to Level 2! 💻`,
    (name) => `Great job ${name}! <span class="s5-highlight-pink">Level 2 (Learning Round)</span> unlocked! Move to Level 3! 🤝`,
    (name) => `Fantastic ${name}! <span class="s5-highlight-pink">Level 3 (Culture-fit Round)</span> complete! Welcome to Campus! 🎓`,
    (name) => `Congratulations ${name}! You reached <span class="s5-highlight-pink">Campus Welcome</span>! Book your free test below! 🎉`
];

function updateS5AvatarPosition(left, top) {
    const runner = document.getElementById('s5AvatarRunner');
    if (!runner) return;
    runner.style.left = left + '%';
    runner.style.top = top + '%';
}

// ===================== STAGE QUEST PROCESS DETAILS POPUP CONTROLLER =====================
const questData = {
    1: {
        stageId: 'ST',
        title: 'Level 1: Screening Test (ST)',
        subtitle: '⛺ Stage 1 Quest • Online Aptitude & Mindset Test',
        badge: 'LEVEL 1 QUEST',
        avatarMsg: 'Namaste [Name]! Aap Screening Test (ST) ke tent par pauch gaye ho! Yahan aapka basic problem-solving and logical aptitude check hota hai.',
        sections: [
            {
                icon: '📋',
                heading: 'Test Me Kya Hota Hai?',
                text: 'Screening Test ek simple online test hai jisme Basic Math, Logical Reasoning aur English ke simple interactive questions hote hain.'
            },
            {
                icon: '⏱️',
                heading: 'Duration & Mode',
                text: 'Yeh test 60 se 90 minutes ka hota hai. Aap ise apne mobile phone ya cyber cafe / laptop se ghar baithe aasani se de sakte ho.'
            },
            {
                icon: '💡',
                heading: 'Prior Coding Required?',
                text: 'Bilkul nahi! Zero coding experience wale students bhi is test ko easily crack kar sakte hain. Hum sirf aapki seekhne ki chhah (curiosity) dekhte hain.'
            },
            {
                icon: '🏆',
                heading: 'Treasure Secret Tip',
                text: 'Questions ko dhyaan se padhein, basic maths ki practice karein, aur bina kisi pressure ke confidence ke saath test attempt karein!'
            }
        ],
        ctaText: 'Walk to Level 2 (Learning Round) →',
        nextStage: 2
    },
    2: {
        stageId: 'LR',
        title: 'Level 2: Learning Round (LR)',
        subtitle: '🏠 Stage 2 Quest • 5-7 Days Practical Learning Tryout',
        badge: 'LEVEL 2 QUEST',
        avatarMsg: 'Awesome [Name]! Aap Learning Round (LR) Tech Cottage me aa gaye ho. Yahan aap real tech environment me seekh ke dikhate ho!',
        sections: [
            {
                icon: '💻',
                heading: 'Learning Round Kya Hai?',
                text: 'Yeh 5 se 7 dino ka ek online practical workshop hota hai jahan aapko real self-learning assignments aur problem-solving tasks milte hain.'
            },
            {
                icon: '👥',
                heading: 'Peer & Mentor Support',
                text: 'Aap akele nahi seekhte! NavGurukul ke mentors aur fellow aspirants ke saath milkar team work aur doubt solving hoti hai.'
            },
            {
                icon: '🔍',
                heading: 'What We Evaluate?',
                text: 'Hum check karte hain ki aap tough problems me kaise struggle karke solution dhoondhte ho aur kitne dedicatedly daily attend karte ho.'
            },
            {
                icon: '🏆',
                heading: 'Treasure Secret Tip',
                text: 'Doubts poochne me kabhi mat hichkichao! Mentors se baatchat karo aur daily submission complete karo.'
            }
        ],
        ctaText: 'Walk to Level 3 (Culture-Fit Round) →',
        nextStage: 3
    },
    3: {
        stageId: 'CFR',
        title: 'Level 3: Culture-Fit Round (CFR)',
        subtitle: '🤝 Stage 3 Quest • 1-on-1 Personal Interaction',
        badge: 'LEVEL 3 QUEST',
        avatarMsg: 'Shabaash [Name]! Welcome to Culture-Fit Round (CFR) Gazebo! Yeh ek friendly 1-on-1 conversation hai jahan hum aapke future goals ke baare me baat karte hain.',
        sections: [
            {
                icon: '🗣️',
                heading: 'CFR Me Kya Hota Hai?',
                text: 'Yeh ek friendly 1-on-1 interview / conversation hoti hai NavGurukul team members aur alumni ke saath.'
            },
            {
                icon: '🏡',
                heading: 'Residential Program Alignment',
                text: 'NavGurukul 1-2 saal ka 100% free residential campus program hai. Hum aapke background, motivation aur campus rules ke baare me discuss karte hain.'
            },
            {
                icon: '❤️',
                heading: 'Family Support & Commitment',
                text: 'Aapki family ki permission aur aapka 100% commitment towards your tech career verify kiya jaata hai.'
            },
            {
                icon: '🏆',
                heading: 'Treasure Secret Tip',
                text: 'Dil se aur imandari se baat karein. Apne dreams aur challenges clear btaiye. Authenticity is key!'
            }
        ],
        ctaText: 'Walk to Campus Welcome →',
        nextStage: 4
    },
    4: {
        stageId: 'FINAL',
        title: 'Final Destination: Campus Welcome',
        subtitle: '🎓 Final Stage Quest • 100% Free Residential Campus Life',
        badge: 'FINAL DESTINATION',
        avatarMsg: 'Badhai Ho [Name]! Aap NavGurukul Campus Gate pauch gaye ho! Yahan se aapka fully funded tech journey start hota hai!',
        sections: [
            {
                icon: '💻',
                heading: 'Free Laptop & Accommodation',
                text: 'Campus aate hi aapko personalized coding laptop, comfortable hostel room aur 3 nutritious meals daily 100% free milte hain.'
            },
            {
                icon: '📚',
                heading: 'Industry-Ready Specialty Tracks',
                text: 'Software Engineering (SOP), Business Operations (SOB), Finance (SOF), ya UI/UX Design (SOD) me practical skills seekhein.'
            },
            {
                icon: '💼',
                heading: '100% Guaranteed Job Placement',
                text: 'Zoho, Swiggy, Razorpay, Infosys jaise top tech companies me 3.5 - 8 LPA tak ki job lagne tak placement support.'
            },
            {
                icon: '🎉',
                heading: 'Ready to Start?',
                text: 'Abhi Screening Test ke liye register karein aur apne life-changing tech journey ki shuruat karein!'
            }
        ],
        ctaText: 'Book Admission Test Now 🎉',
        nextStage: null
    }
};

window.openStageQuestModal = function (stageIdx) {
    const q = questData[stageIdx];
    if (!q) return;

    const modal = document.getElementById('stageQuestModal');
    if (!modal) return;

    const name = window.studentName || 'Friend';

    const badge = document.getElementById('sqBadge');
    if (badge) badge.textContent = q.badge;

    const title = document.getElementById('sqTitle');
    if (title) title.textContent = q.title;

    const subtitle = document.getElementById('sqSubtitle');
    if (subtitle) subtitle.textContent = q.subtitle;

    const avatarMsg = document.getElementById('sqAvatarMsg');
    if (avatarMsg) avatarMsg.textContent = q.avatarMsg.replace(/\[Name\]/g, name);

    const grid = document.getElementById('sqSectionsGrid');
    if (grid) {
        grid.innerHTML = q.sections.map(sec => `
            <div class="sq-sec-card">
                <div class="sq-sec-header">
                    <span class="sq-sec-icon">${sec.icon}</span>
                    <span class="sq-sec-title">${sec.heading}</span>
                </div>
                <p class="sq-sec-text">${sec.text.replace(/\[Name\]/g, name)}</p>
            </div>
        `).join('');
    }

    const ctaBtn = document.getElementById('sqCtaBtn');
    if (ctaBtn) {
        ctaBtn.textContent = q.ctaText;
        ctaBtn.onclick = function () {
            window.closeStageQuestModal();
            if (q.nextStage !== null) {
                setTimeout(() => {
                    window.s5GoToStage(q.nextStage);
                }, 350);
            } else {
                if (typeof window.go === 'function') {
                    window.go(5);
                }
            }
        };
    }

    modal.classList.add('open');
};

window.closeStageQuestModal = function () {
    const modal = document.getElementById('stageQuestModal');
    if (modal) modal.classList.remove('open');
};

function updateS5AvatarPosition(left, top) {
    const runner = document.getElementById('s5AvatarRunner');
    if (!runner) return;
    runner.style.left = left + '%';
    runner.style.top = top + '%';
}

function s5GoToStage(targetStage) {
    if (s5IsWalking) return;
    targetStage = Math.max(0, Math.min(4, targetStage));
    const runner = document.getElementById('s5AvatarRunner');
    const bannerText = document.getElementById('s5BannerText');
    const tag = document.getElementById('s5AvatarTag');
    const name = window.studentName || 'Asha';
    if (tag) tag.textContent = name;

    if (targetStage === s5CurrentStage) {
        if (runner) {
            runner.classList.add('is-walking');
            setTimeout(() => {
                runner.classList.remove('is-walking');
                if (targetStage > 0) window.openStageQuestModal(targetStage);
            }, 500);
        }
        return;
    }

    s5IsWalking = true;
    if (runner) {
        runner.classList.remove('is-idle');
        runner.classList.add('is-walking');
    }

    let waypointsToWalk = [];
    if (targetStage > s5CurrentStage) {
        for (let s = s5CurrentStage + 1; s <= targetStage; s++) {
            waypointsToWalk = waypointsToWalk.concat(s5StageWaypoints[s]);
        }
    } else {
        for (let s = s5CurrentStage; s > targetStage; s--) {
            const reversed = [...s5StageWaypoints[s]].reverse();
            waypointsToWalk = waypointsToWalk.concat(reversed);
        }
    }

    let stepIndex = 0;
    function walkStep() {
        if (stepIndex >= waypointsToWalk.length) {
            s5CurrentStage = targetStage;
            s5IsWalking = false;
            if (runner) {
                runner.classList.remove('is-walking');
                runner.classList.add('is-idle');
            }
            if (bannerText && s5BannerMessages[targetStage]) {
                bannerText.innerHTML = s5BannerMessages[targetStage](name);
            }
            document.querySelectorAll('.s5-stage-spot').forEach((spot, idx) => {
                spot.classList.toggle('active', idx === targetStage);
            });

            if (targetStage > 0) {
                setTimeout(() => {
                    window.openStageQuestModal(targetStage);
                }, 300);
            }
            return;
        }

        const wp = waypointsToWalk[stepIndex];
        updateS5AvatarPosition(wp.left, wp.top);
        stepIndex++;
        setTimeout(walkStep, 320);
    }

    walkStep();
}

function s5AdvanceMilestone() {
    if (s5CurrentStage < 4) {
        s5GoToStage(s5CurrentStage + 1);
    } else {
        if (typeof window.go === 'function') window.go(5);
    }
}

function runScreen5() {
    const name = window.studentName || 'Asha';
    const tag = document.getElementById('s5AvatarTag');
    if (tag) tag.textContent = name;

    const initialWp = s5StageWaypoints[s5CurrentStage][0];
    updateS5AvatarPosition(initialWp.left, initialWp.top);

    const bannerText = document.getElementById('s5BannerText');
    if (bannerText && s5BannerMessages[s5CurrentStage]) {
        bannerText.innerHTML = s5BannerMessages[s5CurrentStage](name);
    }

    const nextLevelBtn = document.getElementById('nextLevelBtn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = function () {
            if (s5CurrentStage < 4) {
                s5GoToStage(s5CurrentStage + 1);
            } else {
                if (typeof window.go === 'function') window.go(5);
            }
        };
    }
}

window.s5GoToStage = s5GoToStage;
window.s5AdvanceMilestone = s5AdvanceMilestone;
window.runScreen5 = runScreen5;

// Screen 6 Victory Confetti
function runConfetti() {
    const screens = document.querySelectorAll('.screen');
    const scope = screens[5];
    if (!scope) return;
    const old = scope.querySelectorAll('.confetti');
    old.forEach(o => o.remove());
    const colors = ['#e91e63', '#d97706', '#059669', '#0284c7', '#f59e0b'];
    for (let i = 0; i < 45; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + '%';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDelay = (Math.random() * 0.7) + 's';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
        scope.appendChild(c);
    }
}

/* ========================================================
   AUTONOMOUS BIRD FLIGHT & CARRIED POSTER PHYSICS ENGINE
   ======================================================== */
(function () {
    let isFlying = false;
    let flightMode = 'intro_tour'; // 'intro_tour' | 'landing'

    let posX = 0;
    let posY = 0;
    let velX = 0;
    let velY = 0;

    let heading = 0.0; // Heading in radians
    let currentPitch = 0.0;
    let currentBank = 0.0;
    let currentYaw = 0.0;

    // Carried Poster Pendulum Dynamics
    let bannerTilt = 0.0;
    let bannerAngularVel = 0.0;

    let flightState = 'flapping'; // 'flapping' | 'gliding'
    let stateTimer = 0;
    let nextStateDuration = 3.2;

    let tourWaypoints = [];
    let currentWaypointIdx = 0;
    let sparkleTimer = 0;
    let lastTimestamp = performance.now();

    function getElements() {
        return {
            flightLayer: document.getElementById('flightLayer'),
            carrier: document.getElementById('birdCarrier'),
            orient: document.getElementById('birdOrient'),
            rig: document.getElementById('birdRig'),
            shadow: document.getElementById('birdShadow'),
            carriedPoster: document.getElementById('carriedPoster'),
            perchedUnit: document.getElementById('perchedUnit'),
            perchedBirdImg: document.getElementById('perchedBirdImg'),
            dockedBadge: document.getElementById('dockedBadge')
        };
    }

    // Compute Target Landing Spot (Top Right Perch)
    function getPerchTarget() {
        const { perchedUnit } = getElements();
        if (!perchedUnit) return { x: window.innerWidth * 0.85, y: 80 };
        const rect = perchedUnit.getBoundingClientRect();
        return {
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height * 0.35)
        };
    }

    // Waypoints covering the entire screen for a majestic, smooth & easy-to-read flight
    function buildTourWaypoints() {
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        return [
            { x: -vpWidth * 0.08, y: vpHeight * 0.32, speed: 135 }, // Start off left
            { x: vpWidth * 0.35, y: vpHeight * 0.20, speed: 125 },  // High glide left-center
            { x: vpWidth * 0.75, y: vpHeight * 0.30, speed: 120 },  // Glide across top right
            { x: vpWidth * 0.88, y: vpHeight * 0.68, speed: 115 },  // Swoop down right
            { x: vpWidth * 0.52, y: vpHeight * 0.80, speed: 120 },  // Sweep across lower viewport
            { x: vpWidth * 0.16, y: vpHeight * 0.60, speed: 125 },  // Curve up along left
            { x: vpWidth * 0.40, y: vpHeight * 0.28, speed: 115 },  // Soar through center
            { x: vpWidth * 0.72, y: vpHeight * 0.18, speed: 100 }   // Line up for landing approach
        ];
    }

    function setWingState(newState) {
        const { rig } = getElements();
        if (!rig || flightState === newState) return;
        flightState = newState;
        if (newState === 'flapping') {
            rig.classList.remove('gliding');
            rig.classList.add('flapping');
        } else {
            rig.classList.remove('flapping');
            rig.classList.add('gliding');
        }
    }

    // Starburst on landing
    function spawnLandingBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'landing-burst';
        burst.style.left = `${x}px`;
        burst.style.top = `${y}px`;

        const icons = ['✨', '🌟', '💫', '✦', '⭐'];
        for (let i = 0; i < 12; i++) {
            const s = document.createElement('div');
            s.className = 'burst-star';
            s.textContent = icons[Math.floor(Math.random() * icons.length)];
            const ang = (Math.PI * 2 * i) / 12 + (Math.random() * 0.3);
            const dist = 35 + Math.random() * 55;
            s.style.setProperty('--bx', `${Math.cos(ang) * dist}px`);
            s.style.setProperty('--by', `${Math.sin(ang) * dist}px`);
            s.style.setProperty('--brot', `${Math.random() * 360}deg`);
            burst.appendChild(s);
        }

        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 900);
    }

    // Trail sparkles
    function emitSparkle(x, y) {
        const { flightLayer } = getElements();
        if (!flightLayer) return;
        const sp = document.createElement('div');
        sp.className = 'trail-sparkle';
        const sz = 6 + Math.random() * 8;
        sp.style.width = `${sz}px`;
        sp.style.height = `${sz}px`;
        sp.style.left = `${x}px`;
        sp.style.top = `${y + 25}px`;
        sp.style.setProperty('--svx', `${(Math.random() - 0.5) * 35}px`);
        sp.style.setProperty('--svy', `${12 + Math.random() * 24}px`);
        flightLayer.appendChild(sp);
        setTimeout(() => sp.remove(), 750);
    }

    // Start Flight
    window.startAutonomousBirdFlight = function (mode = 'intro_tour') {
        if (isFlying) return;

        const { carrier, shadow, perchedUnit, perchedBirdImg, dockedBadge } = getElements();

        isFlying = true;
        flightMode = mode;

        if (perchedUnit) perchedUnit.classList.remove('is-docked');
        if (perchedBirdImg) perchedBirdImg.style.opacity = '0';
        if (dockedBadge) dockedBadge.style.opacity = '0';

        if (carrier) carrier.classList.add('active');
        if (shadow) shadow.classList.add('active');

        tourWaypoints = buildTourWaypoints();
        currentWaypointIdx = 0;
        const p = tourWaypoints[0];
        posX = p.x;
        posY = p.y;
        heading = 0.2; // Face right

        setWingState('flapping');
        lastTimestamp = performance.now();
        requestAnimationFrame(updateFlight);
    };

    function triggerLanding() {
        flightMode = 'landing';
    }

    function finishLanding() {
        const { carrier, shadow, perchedUnit, perchedBirdImg, dockedBadge } = getElements();

        isFlying = false;
        if (carrier) carrier.classList.remove('active');
        if (shadow) shadow.classList.remove('active');

        if (perchedUnit) perchedUnit.classList.add('is-docked');
        if (perchedBirdImg) perchedBirdImg.style.opacity = '1';
        if (dockedBadge) dockedBadge.style.opacity = '1';

        const dockPos = getPerchTarget();
        spawnLandingBurst(dockPos.x, dockPos.y);
    }

    function updateFlight(now) {
        if (!isFlying) return;

        const { carrier, orient, carriedPoster, shadow } = getElements();
        if (!carrier || !orient) return;

        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;

        const dt = Math.min((now - lastTimestamp) / 1000, 0.06);
        lastTimestamp = now;

        stateTimer += dt;
        sparkleTimer += dt;

        let targetX = 0;
        let targetY = 0;
        let targetSpeed = 120;

        if (flightMode === 'intro_tour') {
            const wp = tourWaypoints[currentWaypointIdx];
            targetX = wp.x;
            targetY = wp.y;
            targetSpeed = wp.speed || 120;

            const dist = Math.hypot(targetX - posX, targetY - posY);
            if (dist < 110) {
                currentWaypointIdx++;
                if (currentWaypointIdx >= tourWaypoints.length) {
                    triggerLanding();
                }
            }
        } else if (flightMode === 'landing') {
            const dock = getPerchTarget();
            targetX = dock.x;
            targetY = dock.y;

            const dist = Math.hypot(targetX - posX, targetY - posY);
            targetSpeed = Math.max(35, Math.min(110, dist * 1.0));

            if (dist < 16) {
                finishLanding();
                return;
            }
        }

        // 1. Desired Heading towards Target
        const dx = targetX - posX;
        const dy = targetY - posY;
        let desiredHeading = Math.atan2(dy, dx);

        let angleDiff = desiredHeading - heading;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;

        const maxTurnRate = flightMode === 'landing' ? 3.5 : 2.0;
        const turnStep = Math.max(-maxTurnRate * dt, Math.min(maxTurnRate * dt, angleDiff));
        heading += turnStep;

        while (heading < -Math.PI) heading += 2 * Math.PI;
        while (heading > Math.PI) heading -= 2 * Math.PI;

        // 2. Velocity
        velX = Math.cos(heading) * targetSpeed;
        velY = Math.sin(heading) * targetSpeed;

        const turbX = Math.sin(now * 0.0022) * 6;
        const turbY = Math.cos(now * 0.0030) * 5;

        posX += (velX + turbX) * dt;
        posY += (velY + turbY) * dt;

        // 3. Flap vs Glide state machine
        if (flightMode !== 'landing') {
            if (stateTimer > nextStateDuration) {
                stateTimer = 0;
                if (flightState === 'flapping') {
                    if (velY > -25) {
                        setWingState('gliding');
                        nextStateDuration = 2.2 + Math.random() * 2.8;
                    } else {
                        nextStateDuration = 2.0;
                    }
                } else {
                    setWingState('flapping');
                    nextStateDuration = 2.8 + Math.random() * 3.5;
                }
            }
        } else {
            setWingState('flapping');
        }

        // 4. 3D Orientation (Yaw, Pitch, Bank Roll)
        const isHeadingRight = Math.cos(heading) >= 0;
        const targetYaw = isHeadingRight ? 0 : 180;
        currentYaw += (targetYaw - currentYaw) * (7.0 * dt);

        const targetPitch = Math.max(-25, Math.min(23, (velY / targetSpeed) * 32));
        currentPitch += (targetPitch - currentPitch) * (5.0 * dt);

        const turnRate = turnStep / dt;
        const targetBank = Math.max(-28, Math.min(28, turnRate * 12 * (isHeadingRight ? 1 : -1)));
        currentBank += (targetBank - currentBank) * (4.2 * dt);

        // 5. Attached Poster Pendulum Dynamic Swing
        const targetTilt = Math.max(-28, Math.min(28, (-velX * 0.06) + (turnRate * 4.2)));
        const spring = (targetTilt - bannerTilt) * 20;
        const damping = bannerAngularVel * 5.0;
        bannerAngularVel += (spring - damping) * dt;
        bannerTilt += bannerAngularVel * dt;

        // 6. Apply Transforms
        const carrierW = carrier.offsetWidth || 100;
        const carrierH = carrier.offsetHeight || (100 * (396 / 331));
        const halfW = carrierW / 2;
        const halfH = carrierH / 2;

        carrier.style.transform = `translate3d(${posX - halfW}px, ${posY - halfH}px, 0px)`;
        orient.style.transform = `rotateY(${currentYaw}deg) rotateZ(${currentPitch}deg) rotateX(${currentBank}deg)`;
        if (carriedPoster) carriedPoster.style.transform = `translateX(-50%) rotateZ(${bannerTilt}deg)`;

        // 7. Ground / Atmospheric Shadow Tracking
        if (shadow) {
            const groundY = vpHeight * 0.92;
            const shadowScale = Math.max(0.35, 1 - ((groundY - posY) / vpHeight) * 0.65);
            const shadowOpacity = Math.max(0.04, 0.22 - ((groundY - posY) / vpHeight) * 0.15);

            shadow.style.left = `${posX}px`;
            shadow.style.top = `${Math.min(groundY, posY + 105)}px`;
            shadow.style.transform = `translate(-50%, -50%) scale(${shadowScale})`;
            shadow.style.opacity = shadowOpacity.toString();
        }

        // 8. Trail Sparkles
        if (sparkleTimer > 0.09) {
            sparkleTimer = 0;
            emitSparkle(posX, posY);
        }

        requestAnimationFrame(updateFlight);
    }

    // Attach click handler on perched bird
    document.addEventListener('DOMContentLoaded', () => {
        const perchedUnit = document.getElementById('perchedUnit');
        if (perchedUnit) {
            perchedUnit.addEventListener('click', () => {
                window.startAutonomousBirdFlight('intro_tour');
            });
        }
    });
})();
