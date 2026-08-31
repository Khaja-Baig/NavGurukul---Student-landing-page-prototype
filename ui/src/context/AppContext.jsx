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
    const [cockpitStep, setCockpitStep] = useState(1);

    // Rocket Launch Overlay State
    const [isLaunchOverlayOpen, setIsLaunchOverlayOpen] = useState(false);
    const [launchTransitionText, setLaunchTransitionText] = useState('INITIATING ROCKET LAUNCH...');
    const [isLaunchReverse, setIsLaunchReverse] = useState(false);

    // Quiz & Attempt State
    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuizQIndex, setCurrentQuizQIndex] = useState(0);
    const [quizTimerSeconds, setQuizTimerSeconds] = useState(3600);
    const [attemptHistory, setAttemptHistory] = useState([]);
    const [bookedInterviewSlot, setBookedInterviewSlot] = useState(null);
    const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

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
        pincode: '',
        district: '',
        email: ''
    });

    const triggerXpToast = (text) => {
        const id = Date.now() + Math.random();
        setXpToasts(prev => [...prev, { id, text }]);
        setTimeout(() => {
            setXpToasts(prev => prev.filter(t => t.id !== id));
        }, 1500);
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
    const openSlotBookingModal = () => setIsSlotModalOpen(true);

    const startRocketLaunchTransition = () => {
        setIsLaunchReverse(false);
        setLaunchTransitionText('INITIATING ROCKET LAUNCH...');
        setIsLaunchOverlayOpen(true);

        const env = document.getElementById('rocketInteriorEnv');
        if (env) env.classList.add('cockpit-intro-sequence');

        setTimeout(() => {
            setPortalStep(2);
            setCockpitStep(1);

            // Staggered hologram power-on sequence
            const holoSys = document.getElementById('cockpitHologramSystem');
            if (holoSys) {
                holoSys.className = 'cockpit-hologram-system holo-stage-off';
                setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-powering'; }, 50);
                setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-powering holo-stage-beam'; }, 250);
                setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-powering holo-stage-beam holo-stage-forming'; }, 500);
                setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-ready'; }, 850);
            }
        }, 1300);

        setTimeout(() => {
            setIsLaunchOverlayOpen(false);
            if (env) setTimeout(() => env.classList.remove('cockpit-intro-sequence'), 500);
        }, 1800);
    };

    const startReverseRocketLaunchTransition = () => {
        const env = document.getElementById('rocketInteriorEnv');
        if (env) {
            env.classList.add('cockpit-exit-sequence');
        }

        // Staggered hologram power down sequence
        const holoSys = document.getElementById('cockpitHologramSystem');
        if (holoSys) {
            holoSys.className = 'cockpit-hologram-system holo-stage-forming';
            setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-beam'; }, 100);
            setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-powering'; }, 200);
            setTimeout(() => { if (holoSys) holoSys.className = 'cockpit-hologram-system holo-stage-off'; }, 320);
        }

        setTimeout(() => {
            setIsLaunchReverse(true);
            setLaunchTransitionText('RETURNING TO MISSION BASE...');
            setIsLaunchOverlayOpen(true);
        }, 320);

        setTimeout(() => {
            setPortalStep(1);
            if (env) env.classList.remove('cockpit-exit-sequence');
        }, 1650);

        setTimeout(() => {
            setIsLaunchOverlayOpen(false);
            setIsLaunchReverse(false);
        }, 2050);
    };

    const startLiveEtQuiz = () => {
        setUserAnswers({});
        setCurrentQuizQIndex(0);
        setQuizTimerSeconds(3600);
        setPortalStep(5);
    };

    const finishEtQuiz = () => {
        let correctCount = 0;
        etQuestionsData.forEach((q, idx) => {
            if (userAnswers[idx] === q.correct) {
                correctCount++;
            }
        });
        const marks = correctCount * 8; // out of 24
        const isPassed = marks >= 12;
        const now = new Date();
        const timeStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        const newAttempt = {
            attemptNum: attemptHistory.length + 1,
            timeStr,
            marks,
            isPassed
        };

        setAttemptHistory(prev => [newAttempt, ...prev]);
        setXp(prev => prev + 500);
        triggerXpToast('+500 XP 🎉 Screening Test Submitted!');
        setPortalStep(4);
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
                cockpitStep,
                setCockpitStep,
                openPortalAtStep,
                closePortal,
                isSlotModalOpen,
                openSlotModal,
                closeSlotModal,
                openSlotBookingModal,
                isLaunchOverlayOpen,
                launchTransitionText,
                isLaunchReverse,
                startRocketLaunchTransition,
                startReverseRocketLaunchTransition,
                userAnswers,
                setUserAnswers,
                currentQuizQIndex,
                setCurrentQuizQIndex,
                quizTimerSeconds,
                startLiveEtQuiz,
                finishEtQuiz,
                attemptHistory,
                bookedInterviewSlot,
                setBookedInterviewSlot,
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
