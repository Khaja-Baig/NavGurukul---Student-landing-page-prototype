import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Screen3_Offerings = () => {
    const { currentScreen } = useApp();
    const [guideLeft, setGuideLeft] = useState(8);
    const [captionText, setCaptionText] = useState('');
    const [showCaption, setShowCaption] = useState(false);
    const [activeZoneIdx, setActiveZoneIdx] = useState(-1);
    const [showReward, setShowReward] = useState(false);

    useEffect(() => {
        if (currentScreen !== 2) {
            setGuideLeft(8);
            setShowCaption(false);
            setActiveZoneIdx(-1);
            setShowReward(false);
            return;
        }

        const steps = [
            { left: 8, caption: 'Every candidate receives a personal coding laptop on day one.', zoneIdx: 0, hold: 2400 },
            { left: 26, caption: 'Three nutritious meals daily provided completely free.', zoneIdx: 1, hold: 2400 },
            { left: 48, caption: 'Safe, comfortable campus residential stay.', zoneIdx: 2, hold: 2400 },
            { left: 68, caption: '24x7 High-speed Wi-Fi internet for uninterrupted learning.', zoneIdx: 3, hold: 2400 },
            { left: 88, caption: '100% placement guarantee until you get hired in tech!', zoneIdx: 4, hold: 4000 }
        ];

        let timeouts = [];
        let stepIdx = 0;

        function runStep() {
            if (stepIdx >= steps.length) return;
            const s = steps[stepIdx];

            setShowCaption(false);
            setGuideLeft(s.left);

            const t1 = setTimeout(() => {
                setCaptionText(s.caption);
                setShowCaption(true);
                setActiveZoneIdx(s.zoneIdx);

                if (s.zoneIdx === 4) {
                    setShowReward(true);
                }

                stepIdx++;
                const t2 = setTimeout(runStep, s.hold || 2400);
                timeouts.push(t2);
            }, 1000);

            timeouts.push(t1);
        }

        runStep();

        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [currentScreen]);

    return (
        <section className={`screen ${currentScreen === 2 ? 'active' : ''}`} data-i="2">
            <div className="eyebrow"><span className="eyebrow-star">🎁</span> Comprehensive 100% Scholarship</div>
            <h1 className="headline">
                Everything Covered.<br />
                <span className="highlight-pink">Zero Financial Barrier.</span>
            </h1>

            <div className="room-row">
                <div className={`zone ${activeZoneIdx === 0 ? 'highlight' : ''}`} id="zoneLearn">
                    <div className="zone-icon">💻</div>
                    <div className="zone-name">Free Laptop</div>
                    <div className="zone-sub">Learning Power Source</div>
                </div>

                <div className={`zone ${activeZoneIdx === 1 ? 'highlight' : ''}`} id="zoneFood">
                    <div className="zone-icon">
                        <img src="/indian-thali.png" alt="Indian Thali" className="thali-icon-img" />
                    </div>
                    <div className="zone-name">3 Meals/Day</div>
                    <div className="zone-sub">Healthy Food</div>
                </div>

                <div className={`zone ${activeZoneIdx === 2 ? 'highlight' : ''}`} id="zoneStay">
                    <div className="zone-icon">🏠</div>
                    <div className="zone-name">On-Campus Stay</div>
                    <div className="zone-sub">Safe Living</div>
                </div>

                <div className={`zone ${activeZoneIdx === 3 ? 'highlight' : ''}`} id="zoneWifi">
                    <div className="zone-icon">
                        <svg className="wifi-icon-svg" viewBox="0 0 24 24" fill="none" stroke="url(#wifiGrad)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                            <defs>
                                <linearGradient id="wifiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0284c7" />
                                    <stop offset="100%" stopColor="#e91e63" />
                                </linearGradient>
                            </defs>
                            <path d="M12 20h.01" strokeWidth="3.2" stroke="url(#wifiGrad)" />
                            <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                            <path d="M5 12.5a10 10 0 0 1 14 0" />
                            <path d="M2 8.5a15 15 0 0 1 20 0" />
                        </svg>
                    </div>
                    <div className="zone-name">High-Speed Wifi</div>
                    <div className="zone-sub">24/7 Internet</div>
                </div>

                <div className={`zone ${activeZoneIdx === 4 ? 'highlight' : ''}`} id="zonePlacement">
                    <div className="zone-icon">🚀</div>
                    <div className="zone-name">100% Mentor Support</div>
                </div>
            </div>

            <div className="guide-stage">
                <div className="guide-track"></div>
                <div className="guide-wrap" id="guide3" style={{ left: `${guideLeft}%` }}>
                    <div className="navi-avatar">
                        <img src="/mentor-avatar2.png" alt="Mentor" className="avatar-img" />
                    </div>
                </div>
                <div className={`caption-bar ${showCaption ? 'show' : ''}`} id="cap3">
                    {captionText}
                </div>
            </div>

            <div className={`reward-line ${showReward ? 'show' : ''}`} id="rewardLine">
                All you need is dedication and a desire to learn!
            </div>
        </section>
    );
};
