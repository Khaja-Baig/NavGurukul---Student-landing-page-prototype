import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const NavControls = () => {
    const { currentScreen, totalScreens, go } = useApp();

    // ── Keyboard navigation ──
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Do not navigate if user is typing in an input or text area
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
                return;
            }

            if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                e.preventDefault();
                go(currentScreen + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                go(currentScreen - 1, false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentScreen, go]);

    // ── Touch swipe navigation (mobile) ──
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        const handleTouchStart = (e) => {
            // Ignore swipe if a modal or input is active
            if (document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA') return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = true;
        };

        const handleTouchEnd = (e) => {
            if (!isSwiping) return;
            isSwiping = false;

            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;

            // Only register horizontal swipes (ignore scrolling gestures)
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.3;
            const isSignificantSwipe = Math.abs(deltaX) > 55;

            if (isHorizontalSwipe && isSignificantSwipe) {
                if (deltaX < 0) {
                    go(currentScreen + 1); // Swipe left → next screen
                } else {
                    go(currentScreen - 1);  // Swipe right → prev screen
                }
            }
        };

        const handleTouchCancel = () => { isSwiping = false; };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
        document.addEventListener('touchcancel', handleTouchCancel, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchcancel', handleTouchCancel);
        };
    }, [currentScreen, go]);

    return (
        <>
            <button
                className="nav-arrow"
                id="prevBtn"
                aria-label="Previous Slide"
                onClick={() => go(currentScreen - 1, false)}
                style={{ opacity: currentScreen === 0 ? 0.3 : 1, pointerEvents: currentScreen === 0 ? 'none' : 'auto' }}
            >
                ‹
            </button>
            <button
                className="nav-arrow"
                id="nextBtn"
                aria-label="Next Slide"
                onClick={() => go(currentScreen + 1)}
                style={{ opacity: currentScreen === totalScreens - 1 ? 0.3 : 1, pointerEvents: currentScreen === totalScreens - 1 ? 'none' : 'auto' }}
            >
                ›
            </button>
        </>
    );
};
