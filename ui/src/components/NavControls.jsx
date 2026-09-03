import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const NavControls = () => {
    const { currentScreen, totalScreens, go } = useApp();

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
