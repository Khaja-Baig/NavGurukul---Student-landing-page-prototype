import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { GamifiedHud } from './components/GamifiedHud';
import { NavControls } from './components/NavControls';
import { LeafCanvas } from './components/LeafCanvas';

// Screens
import { Screen1_GurukulTree } from './components/screens/Screen1_GurukulTree';
import { Screen2_OurSchools } from './components/screens/Screen2_OurSchools';
import { Screen3_Offerings } from './components/screens/Screen3_Offerings';
import { Screen2_AlumniSuccess } from './components/screens/Screen2_AlumniSuccess';
import { Screen5_AdventurousRoadmap } from './components/screens/Screen5_AdventurousRoadmap';
import { Screen6_BookFreeTest } from './components/screens/Screen6_BookFreeTest';
import { Screen7_TestInstructions } from './components/screens/Screen7_TestInstructions';
import { OurCampusView } from './components/screens/OurCampusView';

// Modals
import { SchoolModal } from './components/modals/SchoolModal';
import { TestimonialModal } from './components/modals/TestimonialModal';
import { StageQuestModal } from './components/modals/StageQuestModal';
import { SlotBookingModal } from './components/modals/SlotBookingModal';
import { EntranceTestPortal } from './components/modals/EntranceTestPortal';

// Master CSS import (exact cascade order as original)
import './styles/style.css';

const MainAppContent = () => {
    const { currentScreen, xpToasts, isCampusPageActive } = useApp();

    useEffect(() => {
        if (currentScreen > 0 || isCampusPageActive) {
            document.body.classList.add('slide-other');
        } else {
            document.body.classList.remove('slide-other');
        }
    }, [currentScreen, isCampusPageActive]);

    return (
        <>
            {/* World Background Layers & Particle Leaf Canvas */}
            <div id="world">
                <div className="banyan-bg-layer">
                    <div className="world-overlay"></div>
                </div>
                <LeafCanvas />
            </div>

            {/* Separate Campus View OR 7-Slide Landing Stage & HUD */}
            {isCampusPageActive ? (
                <OurCampusView />
            ) : (
                <>
                    {/* Header HUD Track & Vehicle (7 Slides Only) */}
                    <GamifiedHud />

                    {/* Stage Container (7 Slides) */}
                    <div id="stage">
                        <Screen1_GurukulTree />
                        <Screen2_OurSchools />
                        <Screen3_Offerings />
                        <Screen2_AlumniSuccess />
                        <Screen5_AdventurousRoadmap />
                        <Screen6_BookFreeTest />
                        <Screen7_TestInstructions />
                    </div>

                    {/* Navigation Arrows */}
                    <NavControls />
                </>
            )}

            {/* Modals & Portal Overlays */}
            <TestimonialModal />
            <SchoolModal />
            <StageQuestModal />
            <EntranceTestPortal />
            <SlotBookingModal />
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
