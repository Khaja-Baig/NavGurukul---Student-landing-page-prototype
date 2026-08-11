// Gamified HUD, Progress Bar, Vehicle Runner & XP Engine

const levelData = [
    { title: 'GURUKUL TREE', icon: '🌱' },
    { title: 'VISION & IMPACT', icon: '🌟' },
    { title: '100% SCHOLARSHIP', icon: '💎' },
    { title: 'SPECIALTY TRACKS', icon: '⚡' },
    { title: 'ADMISSION ROADMAP', icon: '🗺️' },
    { title: 'BOOK FREE TEST', icon: '🎓' }
];

function scrambleDecode(element, targetText, duration = 350) {
    if (!element) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#@&*!';
    const originalText = targetText;
    let iterations = 0;
    const maxIterations = 8;
    const intervalTime = duration / maxIterations;

    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (char === ' ' || index < (iterations / maxIterations) * originalText.length) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        iterations++;
        if (iterations >= maxIterations) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, intervalTime);
}

function spawnVehicleSparks(wrapperEl) {
    const rect = wrapperEl.getBoundingClientRect();
    const trackEl = document.getElementById('hudTrack');
    if (!trackEl) return;
    const trackRect = trackEl.getBoundingClientRect();

    const count = 10;
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'hud-spark';
        const size = Math.random() * 5 + 3;
        const color = ['#f59e0b', '#e91e63', '#ea580c', '#0284c7', '#fef08a'][Math.floor(Math.random() * 5)];

        spark.style.width = size + 'px';
        spark.style.height = size + 'px';
        spark.style.background = color;
        spark.style.boxShadow = `0 0 6px ${color}`;

        const startX = rect.left - trackRect.left - 4;
        const startY = rect.top - trackRect.top + rect.height / 2;

        const angle = Math.PI + (Math.random() * 0.8 - 0.4);
        const speed = Math.random() * 30 + 15;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed + (Math.random() * 12 - 6);

        spark.style.left = startX + 'px';
        spark.style.top = startY + 'px';
        spark.style.setProperty('--dx', dx + 'px');
        spark.style.setProperty('--dy', dy + 'px');

        trackEl.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
    }
}

function updateGamifiedHud(n, prevIndex, addXp) {
    const screens = document.querySelectorAll('.screen');
    const totalScreens = screens.length || 6;
    const targetPct = (n / (totalScreens - 1)) * 100;
    const isForward = n > prevIndex;
    const isBackward = n < prevIndex;

    const hudFill = document.getElementById('hudFill');
    const hudVehicleWrapper = document.getElementById('hudVehicleWrapper');
    const hudVehicleCallout = document.getElementById('hudVehicleCallout');

    if (hudFill) hudFill.style.width = targetPct + '%';

    if (hudVehicleWrapper) {
        hudVehicleWrapper.style.left = targetPct + '%';

        hudVehicleWrapper.classList.remove('is-zooming-forward', 'is-zooming-backward');
        void hudVehicleWrapper.offsetWidth;

        if (isForward) {
            hudVehicleWrapper.classList.add('is-zooming-forward');

            const callouts = ["ZOOM! 🚀", "ZOOM, ZOOM! ⚡", "BOOST! 🌟", "+100 XP! 🎯", "LEVEL UP! 🔥", "FULL SPEED! ✈️"];
            const txt = callouts[Math.floor(Math.random() * callouts.length)];
            if (hudVehicleCallout) {
                hudVehicleCallout.textContent = txt;
                hudVehicleCallout.classList.remove('show-callout');
                void hudVehicleCallout.offsetWidth;
                hudVehicleCallout.classList.add('show-callout');
            }

            spawnVehicleSparks(hudVehicleWrapper);
        } else if (isBackward) {
            hudVehicleWrapper.classList.add('is-zooming-backward');
        }

        setTimeout(() => {
            hudVehicleWrapper.classList.remove('is-zooming-forward', 'is-zooming-backward');
        }, 800);
    }

    // Checkpoint Nodes
    const nodes = document.querySelectorAll('.hud-node');
    nodes.forEach((node, idx) => {
        node.classList.remove('active', 'passed', 'node-burst');
        if (idx < n) {
            node.classList.add('passed');
        } else if (idx === n) {
            node.classList.add('active', 'passed', 'node-burst');
        }
    });

    // Level Badge Scramble
    const hudLevelTag = document.getElementById('hudLevelTag');
    const hudLevelTitle = document.getElementById('hudLevelTitle');
    if (hudLevelTag) hudLevelTag.textContent = 'LVL 0' + (n + 1);
    if (hudLevelTitle && levelData[n]) {
        scrambleDecode(hudLevelTitle, levelData[n].title);
    }

    // XP Gain
    if (isForward && addXp !== false) {
        if (typeof window.xp !== 'number') window.xp = 4650;
        window.xp += 100;
        const xpValEl = document.getElementById('hudXpVal');
        const xpChip = document.getElementById('hudXpChip');
        if (xpValEl) xpValEl.textContent = window.xp.toLocaleString() + ' XP';
        if (xpChip) {
            xpChip.classList.remove('xp-gain');
            void xpChip.offsetWidth;
            xpChip.classList.add('xp-gain');
        }

        const toast = document.createElement('div');
        toast.className = 'xp-toast';
        toast.textContent = '+100 XP 🎯';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1200);
    }
}
