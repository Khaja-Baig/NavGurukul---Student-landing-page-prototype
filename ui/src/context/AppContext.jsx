import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const levelData = [
    { title: 'GURUKUL TREE', icon: '🌱' },
    { title: 'SPECIALTY TRACKS', icon: '⚡' },
    { title: '100% SCHOLARSHIP', icon: '💎' },
    { title: 'VISION & IMPACT', icon: '🌟' },
    { title: 'ADMISSION ROADMAP', icon: '🗺️' },
    { title: 'BOOK FREE TEST', icon: '🎓' }
];

export const etQuestionsData = [
    {
        id: 1,
        question: "Agar ek dukan par 5 pen ₹50 ke milte hain, toh 12 pen ki keemat kya hogi?",
        options: ["₹100", "₹120", "₹110", "₹140"],
        correct: 1
    },
    {
        id: 2,
        question: "Select the correct missing number in sequence: 2, 4, 8, 16, __",
        options: ["24", "30", "32", "64"],
        correct: 2
    },
    {
        id: 3,
        question: "Asha and Rahul are working together on a project. If Asha completes it in 4 days and Rahul in 4 days, together how many days?",
        options: ["1 day", "2 days", "3 days", "4 days"],
        correct: 1
    }
];

export const AppProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [xp, setXp] = useState(4650);
    const [studentName, setStudentName] = useState('Friend');
    const [loginLang, setLoginLang] = useState('en');
    const [xpToasts, setXpToasts] = useState([]);
    
    // Modal Visibility States
    const [selectedSchoolIdx, setSelectedSchoolIdx] = useState(null);
    const [selectedTestimonialIdx, setSelectedTestimonialIdx] = useState(null);
    const [selectedStageQuestIdx, setSelectedStageQuestIdx] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [portalStep, setPortalStep] = useState(1);
    const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
    const [isLaunchOverlayOpen, setIsLaunchOverlayOpen] = useState(false);

    // Screen 5 Roadmap State
    const [s5CurrentStage, setS5CurrentStage] = useState(0);
    const [s5IsWalking, setS5IsWalking] = useState(false);

    // User Profile Form State
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        whatsapp: '',
        dob: '',
        gender: '',
        category: '',
        qualification: '',
        guardianName: '',
        guardianPhone: '',
        pinCode: '',
        email: ''
    });

    const triggerXpToast = (text) => {
        const id = Date.now() + Math.random();
        setXpToasts(prev => [...prev, { id, text }]);
        setTimeout(() => {
            setXpToasts(prev => prev.filter(t => t.id !== id));
        }, 1200);
    };

    const go = (n, addXp = true) => {
        n = Math.max(0, Math.min(5, n));
        if (n === currentScreen) return;

        const prev = currentScreen;
        setCurrentScreen(n);

        if (n > prev && addXp !== false) {
            setXp(prevXp => prevXp + 100);
            triggerXpToast('+100 XP 🎯');
        }
    };

    const openSchoolModal = (idx) => setSelectedSchoolIdx(idx);
    const closeSchoolModal = () => setSelectedSchoolIdx(null);

    const openTestimonialModal = (idx) => setSelectedTestimonialIdx(idx);
    const closeTestimonialModal = () => setSelectedTestimonialIdx(null);

    const openStageQuestModal = (idx) => setSelectedStageQuestIdx(idx);
    const closeStageQuestModal = () => setSelectedStageQuestIdx(null);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openPortalAtStep = (step = 1) => {
        setIsLoginModalOpen(false);
        setPortalStep(step);
        setIsPortalOpen(true);
    };

    const closePortal = () => setIsPortalOpen(false);

    const openSlotModal = () => setIsSlotModalOpen(true);
    const closeSlotModal = () => setIsSlotModalOpen(false);

    const triggerLaunchTransition = (onComplete) => {
        setIsLaunchOverlayOpen(true);
        setTimeout(() => {
            setIsLaunchOverlayOpen(false);
            if (onComplete) onComplete();
        }, 3200);
    };

    return (
        <AppContext.Provider
            value={{
                currentScreen,
                totalScreens: 6,
                go,
                xp,
                setXp,
                studentName,
                setStudentName,
                loginLang,
                setLoginLang,
                xpToasts,
                selectedSchoolIdx,
                openSchoolModal,
                closeSchoolModal,
                selectedTestimonialIdx,
                openTestimonialModal,
                closeTestimonialModal,
                selectedStageQuestIdx,
                openStageQuestModal,
                closeStageQuestModal,
                isLoginModalOpen,
                openLoginModal,
                closeLoginModal,
                isPortalOpen,
                portalStep,
                setPortalStep,
                openPortalAtStep,
                closePortal,
                isSlotModalOpen,
                openSlotModal,
                closeSlotModal,
                isLaunchOverlayOpen,
                triggerLaunchTransition,
                s5CurrentStage,
                setS5CurrentStage,
                s5IsWalking,
                setS5IsWalking,
                userProfile,
                setUserProfile
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
