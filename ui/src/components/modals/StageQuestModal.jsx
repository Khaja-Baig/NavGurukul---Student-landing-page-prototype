import React from 'react';
import { useApp } from '../../context/AppContext';

export const questData = {
    1: {
        stageId: 'ST',
        title: 'Level 1: Screening Test (ST)',
        subtitle: '⛺ Your First Treasure Hunt Milestone',
        badge: 'LEVEL 1 QUEST',
        avatarMsg: 'Namaste [Name]! Aap Screening Test (ST) ke tent par pauch gaye ho! Yahan aapka basic problem-solving and logical aptitude check hota hai.',
        sections: [
            {
                icon: '📋',
                heading: 'Test Me Kya Hota Hai?',
                text: 'Screening Test ek simple online test hai jisme Basic Math, Logical Reasoning aur English ke simple interactive questions hote hain.'
            },
            {
                icon: '⏱️',
                heading: 'Duration & Mode',
                text: 'Yeh test 60 se 90 minutes ka hota hai. Aap ise apne mobile phone ya cyber cafe / laptop se ghar baithe aasani se de sakte ho.'
            },
            {
                icon: '💡',
                heading: 'Prior Coding Required?',
                text: 'Bilkul nahi! Zero coding experience wale students bhi is test ko easily crack kar sakte hain. Hum sirf aapki seekhne ki chhah (curiosity) dekhte hain.'
            },
            {
                icon: '🏆',
                heading: 'Treasure Secret Tip',
                text: 'Questions ko dhyaan se padhein, basic maths ki practice karein, aur bina kisi pressure ke confidence ke saath test attempt karein!'
            }
        ],
        ctaText: 'Walk to Level 2 (Learning Round) →',
        nextStage: 2
    },
    2: {
        stageId: 'LR',
        title: 'Level 2: Learning Round (LR)',
        subtitle: '🏠 Stage 2 Quest • 5-7 Days Practical Learning Tryout',
        badge: 'LEVEL 2 QUEST',
        avatarMsg: 'Awesome [Name]! Aap Learning Round (LR) Tech Cottage me aa gaye ho. Yahan aap real tech environment me seekh ke dikhate ho!',
        sections: [
            {
                icon: '💻',
                heading: 'Learning Round Kya Hai?',
                text: 'Yeh 5 se 7 dino ka ek online practical workshop hota hai jahan aapko real self-learning assignments aur problem-solving tasks milte hain.'
            },
            {
                icon: '👥',
                heading: 'Peer & Mentor Support',
                text: 'Aap akele nahi seekhte! NavGurukul ke mentors aur fellow aspirants ke saath milkar team work aur doubt solving hoti hai.'
            },
            {
                icon: '🔍',
                heading: 'What We Evaluate?',
                text: 'Hum check karte hain ki aap tough problems me kaise struggle karke solution dhoondhte ho aur kitne dedicatedly daily attend karte ho.'
            },
            {
                icon: '🏆',
                heading: 'Treasure Secret Tip',
                text: 'Doubts poochne me kabhi mat hichkichao! Mentors se baatchat karo aur daily submission complete karo.'
            }
        ],
        ctaText: 'Walk to Level 3 (Culture-Fit Round) →',
        nextStage: 3
    },
    3: {
        stageId: 'CFR',
        title: 'Level 3: Culture-Fit Round (CFR)',
        subtitle: '🤝 Stage 3 Quest • 1-on-1 Personal Interaction',
        badge: 'LEVEL 3 QUEST',
        avatarMsg: 'Shabaash [Name]! Welcome to Culture-Fit Round (CFR) Gazebo! Yeh ek friendly 1-on-1 conversation hai jahan hum aapke future goals ke baare me baat karte hain.',
        sections: [
            {
                icon: '🗣️',
                heading: 'CFR Me Kya Hota Hai?',
                text: 'Yeh ek friendly 1-on-1 interview / conversation hoti hai NavGurukul team members aur alumni ke saath.'
            },
            {
                icon: '🏡',
                heading: 'Residential Program Alignment',
                text: 'NavGurukul 1-2 saal ka 100% free residential campus program hai. Hum aapke background, motivation aur campus rules ke baare me discuss karte hain.'
            },
            {
                icon: '❤️',
                heading: 'Family Support & Commitment',
                text: 'Aapki family ki permission aur aapka 100% commitment towards your tech career verify kiya jaata hai.'
            },
            {
                icon: '🏆',
                heading: 'Treasure Secret Tip',
                text: 'Dil se aur imandari se baat karein. Apne dreams aur challenges clear btaiye. Authenticity is key!'
            }
        ],
        ctaText: 'Walk to Campus Welcome →',
        nextStage: 4
    },
    4: {
        stageId: 'FINAL',
        title: 'Final Destination: Campus Welcome',
        subtitle: '🎓 Final Stage Quest • 100% Free Residential Campus Life',
        badge: 'FINAL DESTINATION',
        avatarMsg: 'Badhai Ho [Name]! Aap NavGurukul Campus Gate pauch gaye ho! Yahan se aapka fully funded tech journey start hota hai!',
        sections: [
            {
                icon: '💻',
                heading: 'Free Laptop & Accommodation',
                text: 'Campus aate hi aapko personalized coding laptop, comfortable hostel room aur 3 nutritious meals daily 100% free milte hain.'
            },
            {
                icon: '📚',
                heading: 'Industry-Ready Specialty Tracks',
                text: 'Software Engineering (SOP), Business Operations (SOB), Finance (SOF), ya UI/UX Design (SOD) me practical skills seekhein.'
            },
            {
                icon: '💼',
                heading: '100% Guaranteed Job Placement',
                text: 'Zoho, Swiggy, Razorpay, Infosys jaise top tech companies me 3.5 - 8 LPA tak ki job lagne tak placement support.'
            },
            {
                icon: '🎉',
                heading: 'Ready to Start?',
                text: 'Abhi Screening Test ke liye register karein aur apne life-changing tech journey ki shuruat karein!'
            }
        ],
        ctaText: 'Book Admission Test Now 🎉',
        nextStage: null
    }
};

export const StageQuestModal = () => {
    const { selectedStageQuestIdx, closeStageQuestModal, studentName, setS5CurrentStage, openLoginModal } = useApp();

    if (selectedStageQuestIdx === null || !questData[selectedStageQuestIdx]) return null;

    const q = questData[selectedStageQuestIdx];
    const name = studentName || 'Friend';
    const avatarMsgFormatted = q.avatarMsg.replace(/\[Name\]/g, name);

    const handleCtaClick = () => {
        closeStageQuestModal();
        if (q.nextStage !== null) {
            setTimeout(() => {
                setS5CurrentStage(q.nextStage);
            }, 350);
        } else {
            openLoginModal();
        }
    };

    return (
        <div
            id="stageQuestModal"
            className="sq-overlay open"
            onClick={(e) => {
                if (e.target === e.currentTarget) closeStageQuestModal();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="sq-card">
                <button className="sq-close" onClick={closeStageQuestModal} aria-label="Close modal">✕</button>

                <div className="sq-header" id="sqHeader">
                    <div className="sq-badge" id="sqBadge">{q.badge}</div>
                    <h2 className="sq-title" id="sqTitle">{q.title}</h2>
                    <div className="sq-subtitle" id="sqSubtitle">{q.subtitle}</div>
                </div>

                <div className="sq-body">
                    <div className="sq-avatar-col">
                        <div className="sq-avatar-frame">
                            <img src="/mentor-avatar2.png" alt="Guide Asha" className="sq-avatar-img" />
                            <div className="sq-avatar-pulse"></div>
                        </div>
                        <div className="sq-avatar-name">Guide Asha 🧭</div>
                        <div className="sq-speech-bubble" id="sqAvatarMsg">{avatarMsgFormatted}</div>
                    </div>

                    <div className="sq-details-col">
                        <div className="sq-sections-grid" id="sqSectionsGrid">
                            {q.sections.map((sec, idx) => (
                                <div key={idx} className="sq-sec-card">
                                    <div className="sq-sec-header">
                                        <span className="sq-sec-icon">{sec.icon}</span>
                                        <span className="sq-sec-title">{sec.heading}</span>
                                    </div>
                                    <p className="sq-sec-text">{sec.text.replace(/\[Name\]/g, name)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sq-footer">
                    <button className="sq-secondary-btn" onClick={closeStageQuestModal}>Explore Map 🗺️</button>
                    <button className="sq-primary-btn" id="sqCtaBtn" onClick={handleCtaClick}>
                        {q.ctaText}
                    </button>
                </div>
            </div>
        </div>
    );
};
