// Guide Timeline Controller for Gender-Neutral Mentor "Navi"

function runGuideTimeline(guideEl, captionEl, steps) {
    if (!guideEl || !captionEl || !steps) return;
    let i = 0;
    function step() {
        if (i >= steps.length) return;
        const s = steps[i];
        captionEl.classList.remove('show');
        if (s.clearHighlight) s.clearHighlight();
        guideEl.style.left = s.left + '%';

        const laterFn = typeof window.later === 'function' ? window.later : setTimeout;
        laterFn(() => {
            captionEl.textContent = s.caption;
            captionEl.classList.add('show');
            if (s.onArrive) s.onArrive();
            i++;
            laterFn(step, s.hold || 2400);
        }, 1000);
    }
    step();
}
