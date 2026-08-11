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
    const scene = document.getElementById('parrotScene');
    if (!scene) return;
    scene.classList.remove('flying');
    void scene.offsetWidth; // force DOM reflow
    scene.classList.add('flying');
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
                window.go(4); // Advance to Admission Roadmap (Screen 5)
            }
        };
    }

    modal.classList.add('open');
};

window.closeSchoolModal = function () {
    const modal = document.getElementById('schoolModal');
    if (modal) modal.classList.remove('open');
};

function runScreen4() {
    // Screen 4 is ready with interactive school cards
}

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
