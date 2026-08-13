// Main Application State, Navigation Controller & Event Initialization

(function () {
    window.xp = 4650;
    window.studentName = 'Friend';
    window.pendingTimeouts = [];

    window.clearTimers = function () {
        window.pendingTimeouts.forEach(t => clearTimeout(t));
        window.pendingTimeouts = [];
    };

    window.later = function (fn, ms) {
        const t = setTimeout(fn, ms);
        window.pendingTimeouts.push(t);
        return t;
    };

    let screens = [];
    let dots = [];
    let current = 0;

    function restartAnimations(scope) {
        if (!scope) return;
        const els = scope.querySelectorAll('.lvl-circle, .lvl-connector, .lvl-label, .stat-card, .type-line, .quest-item, .xp-float');
        els.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = '';
        });
    }

    function go(n, addXp) {
        if (!screens.length) return;
        n = Math.max(0, Math.min(screens.length - 1, n));
        if (n === current && screens[current].classList.contains('active')) return;
        const prev = current;
        window.clearTimers();
        if (screens[current]) screens[current].classList.remove('active');
        current = n;
        if (screens[current]) screens[current].classList.add('active');
        document.body.classList.toggle('slide-other', current !== 0);
        dots.forEach((d, i) => d.classList.toggle('active', i === current));

        if (typeof updateGamifiedHud === 'function') {
            updateGamifiedHud(current, prev, addXp);
        }
        restartAnimations(screens[current]);

        if (current === 1 && typeof runScreen4 === 'function') runScreen4();
        if (current === 2 && typeof runScreen3 === 'function') runScreen3();
        if (current === 3 && typeof runScreen2 === 'function') runScreen2();
        if (current === 5 && typeof runConfetti === 'function') runConfetti();
    }

    // Export go globally so triggers can call it
    window.go = go;

    function initApp() {
        screens = Array.from(document.querySelectorAll('.screen'));
        dots = Array.from(document.querySelectorAll('.dot'));

        // Checkpoint node clicks on HUD
        document.querySelectorAll('.hud-node').forEach((node) => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                const lvl = parseInt(node.getAttribute('data-level'), 10);
                if (!isNaN(lvl)) go(lvl);
            });
        });

        // Navigation controls
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1, false));
        if (nextBtn) nextBtn.addEventListener('click', () => go(current + 1));

        dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') go(current + 1);
            if (e.key === 'ArrowLeft') go(current - 1, false);
        });

        // Start Journey button on Screen 1
        const nameInput = document.getElementById('nameInput');
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (nameInput) {
                    window.studentName = (nameInput.value || 'Friend').trim();
                }
                go(1);
            });
        }

        // School card clicks are handled via onclick="openSchoolModal(idx)" in HTML

        // Unlock next level button on Screen 5
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        if (nextLevelBtn) {
            nextLevelBtn.addEventListener('click', () => go(5));
        }

        // Final registration CTA on Screen 6
        const finalRegisterBtn = document.getElementById('finalRegisterBtn');
        if (finalRegisterBtn) {
            finalRegisterBtn.addEventListener('click', () => {
                alert('Congratulations ' + window.studentName + '! The NavGurukul Admissions Team will contact you shortly.');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
