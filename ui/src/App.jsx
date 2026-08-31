import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { GamifiedHud } from './components/GamifiedHud';
import { NavControls } from './components/NavControls';
import { LeafCanvas } from './components/LeafCanvas';

// Screens
import { Screen1_GurukulTree } from './components/screens/Screen1_GurukulTree';
import { Screen4_SpecialtySchools } from './components/screens/Screen4_SpecialtySchools';
import { Screen3_Offerings } from './components/screens/Screen3_Offerings';
import { Screen2_AlumniSuccess } from './components/screens/Screen2_AlumniSuccess';
import { Screen5_AdventurousRoadmap } from './components/screens/Screen5_AdventurousRoadmap';
import { Screen6_BookFreeTest } from './components/screens/Screen6_BookFreeTest';

// Modals
import { SchoolModal } from './components/modals/SchoolModal';
import { TestimonialModal } from './components/modals/TestimonialModal';
import { StageQuestModal } from './components/modals/StageQuestModal';
import { LoginModal } from './components/modals/LoginModal';
import { SlotBookingModal } from './components/modals/SlotBookingModal';
import { LaunchTransitionOverlay } from './components/modals/LaunchTransitionOverlay';
import { EntranceTestPortal } from './components/modals/EntranceTestPortal';

// Master CSS import (exact cascade order as original)
import './styles/style.css';

const MainAppContent = () => {
    const { currentScreen, xpToasts } = useApp();

    useEffect(() => {
        if (currentScreen > 0) {
            document.body.classList.add('slide-other');
        } else {
            document.body.classList.remove('slide-other');
        }
    }, [currentScreen]);

    return (
        <>
            {/* World Background Layers & Particle Leaf Canvas */}
            <div id="world">
                <div className="banyan-bg-layer">
                    <div className="world-overlay"></div>
                </div>
                <LeafCanvas />
            </div>

            {/* Header HUD Track & Vehicle */}
            <GamifiedHud />

            {/* XP Toasts */}
            {xpToasts.map(toast => (
                <div key={toast.id} className="xp-toast">
                    {toast.text}
                </div>
            ))}

            {/* Navigation Arrows */}
            <NavControls />

            {/* Stage Container */}
            <div id="stage">
                <Screen1_GurukulTree />
                <Screen4_SpecialtySchools />
                <Screen3_Offerings />
                <Screen2_AlumniSuccess />
                <Screen5_AdventurousRoadmap />
                <Screen6_BookFreeTest />
            </div>

            {/* Modals & Portal Overlays */}
            <TestimonialModal />
            <SchoolModal />
            <StageQuestModal />
            <LoginModal />
            <SlotBookingModal />
            <LaunchTransitionOverlay />
            <EntranceTestPortal />
        </>
    );
};

export default function App() {
    return (
        <AppProvider>
            <MainAppContent />
        </AppProvider>
    );
}
