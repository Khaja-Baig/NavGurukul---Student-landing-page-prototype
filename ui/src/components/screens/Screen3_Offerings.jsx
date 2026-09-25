import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const OFFERING_CARDS = [
    {
        id: 'zoneLearn',
        icon: <div className="zone-icon">💻</div>,
        name: 'Free Laptop',
        sub: 'Learning Power Source',
        caption: 'Every candidate receives a personal coding laptop on day one.',
        desktopLeft: 8,
        hold: 2400
    },
    {
        id: 'zoneFood',
        icon: (
            <div className="zone-icon">
                <img src="/indian-thali.png" alt="Indian Thali" className="thali-icon-img" />
            </div>
        ),
        name: '3 Meals/Day',
        sub: 'Healthy Food',
        caption: 'Three nutritious meals daily provided completely free.',
        desktopLeft: 26,
        hold: 2400
    },
    {
        id: 'zoneStay',
        icon: <div className="zone-icon">🏠</div>,
        name: 'On-Campus Stay',
        sub: 'Safe Living',
        caption: 'Safe, comfortable campus residential stay.',
        desktopLeft: 48,
        hold: 2400
    },
    {
        id: 'zoneWifi',
        icon: (
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
        ),
        name: 'High-Speed Wifi',
        sub: '24/7 Internet',
        caption: '24x7 High-speed Wi-Fi internet for uninterrupted learning.',
        desktopLeft: 68,
        hold: 2400
    },
    {
        id: 'zonePlacement',
        icon: <div className="zone-icon">🚀</div>,
        name: '100% Mentor Support',
        sub: null,
        caption: '100% placement guarantee until you get hired in tech!',
        desktopLeft: 88,
        hold: 4000
    }
];

// Bidirectional infinite loop with clones for seamless direction-preserving transitions
const slides = [
    OFFERING_CARDS[4], // idx 0: clone of Card 5 (100% Mentor Support)
    ...OFFERING_CARDS, // idx 1..5: Cards 1, 2, 3, 4, 5
    OFFERING_CARDS[0]  // idx 6: clone of Card 1 (Free Laptop)
];

export const Screen3_Offerings = () => {
    const { currentScreen } = useApp();
    const [guideLeft, setGuideLeft] = useState(8);
    const [captionText, setCaptionText] = useState('');
    const [showCaption, setShowCaption] = useState(false);
    const [activeZoneIdx, setActiveZoneIdx] = useState(-1);
    const [showReward, setShowReward] = useState(false);

    // Mobile carousel state (starts at 1 = Card 1 Free Laptop)
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const [carouselIdx, setCarouselIdx] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [captionFade, setCaptionFade] = useState(true);

    const isSlidingRef = useRef(false);
    const touchStartXRef = useRef(null);
    const trackRef = useRef(null);
    const slideTimeoutRef = useRef(null);

    // Responsive viewport detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
        };
    }, []);

    // Calculate real index 0 to 4 for captions and metadata
    const getRealIdx = (idx) => {
        if (idx === 0) return 4;
        if (idx === slides.length - 1) return 0;
        return idx - 1;
    };

    const mobileActiveIdx = getRealIdx(carouselIdx);

    const handleNext = () => {
        if (isSlidingRef.current) return;
        isSlidingRef.current = true;
        setIsTransitioning(true);
        setCaptionFade(false);

        if (trackRef.current) {
            trackRef.current.classList.remove('no-anim');
            trackRef.current.classList.add('is-animating');
        }

        setCarouselIdx(prev => prev + 1);

        if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = setTimeout(() => {
            isSlidingRef.current = false;
        }, 750);

        setTimeout(() => setCaptionFade(true), 200);
    };

    const handlePrev = () => {
        if (isSlidingRef.current) return;
        isSlidingRef.current = true;
        setIsTransitioning(true);
        setCaptionFade(false);

        if (trackRef.current) {
            trackRef.current.classList.remove('no-anim');
            trackRef.current.classList.add('is-animating');
        }

        setCarouselIdx(prev => prev - 1);

        if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = setTimeout(() => {
            isSlidingRef.current = false;
        }, 750);

        setTimeout(() => setCaptionFade(true), 200);
    };

    const handleTransitionEnd = (e) => {
        // Ignore bubbling transitions from child elements (e.g. icon or zone styles)
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

        if (slideTimeoutRef.current) {
            clearTimeout(slideTimeoutRef.current);
            slideTimeoutRef.current = null;
        }

        if (!isMobile) {
            isSlidingRef.current = false;
            return;
        }

        if (carouselIdx === slides.length - 1) {
            // Reached clone of Card 1 at index 6 -> instantly snap to real Card 1 at index 1 without animation
            if (trackRef.current) {
                trackRef.current.classList.remove('is-animating');
                trackRef.current.classList.add('no-anim');
                trackRef.current.style.transform = `translateX(calc(-1 * 1 * (100% + var(--carousel-gap, 18px))))`;
                void trackRef.current.offsetHeight; // Force reflow so snap applies immediately
            }
            setIsTransitioning(false);
            setCarouselIdx(1);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (trackRef.current) {
                        trackRef.current.classList.remove('no-anim');
                        trackRef.current.classList.add('is-animating');
                    }
                    setIsTransitioning(true);
                    isSlidingRef.current = false;
                });
            });
        } else if (carouselIdx === 0) {
            // Reached clone of Card 5 at index 0 -> instantly snap to real Card 5 at index 5 without animation
            const targetIdx = slides.length - 2; // 5
            if (trackRef.current) {
                trackRef.current.classList.remove('is-animating');
                trackRef.current.classList.add('no-anim');
                trackRef.current.style.transform = `translateX(calc(-1 * ${targetIdx} * (100% + var(--carousel-gap, 18px))))`;
                void trackRef.current.offsetHeight; // Force reflow
            }
            setIsTransitioning(false);
            setCarouselIdx(targetIdx);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (trackRef.current) {
                        trackRef.current.classList.remove('no-anim');
                        trackRef.current.classList.add('is-animating');
                    }
                    setIsTransitioning(true);
                    isSlidingRef.current = false;
                });
            });
        } else {
            isSlidingRef.current = false;
        }
    };

    const handleTouchStart = (e) => {
        if (!isMobile) return;
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!isMobile || touchStartXRef.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartXRef.current - touchEndX;

        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                // Swiped left -> next
                handleNext();
            } else {
                // Swiped right -> prev
                handlePrev();
            }
        }
        touchStartXRef.current = null;
    };

    // Primary lifecycle effect: Desktop sequential animation OR Mobile setup
    useEffect(() => {
        if (currentScreen !== 2) {
            setGuideLeft(8);
            setShowCaption(false);
            setActiveZoneIdx(-1);
            setShowReward(false);
            return;
        }

        if (isMobile) {
            setCarouselIdx(1);
            setIsTransitioning(true);
            setShowCaption(true);
            setCaptionFade(true);
            return;
        }

        // DESKTOP: EXACT ORIGINAL BEHAVIOR PRESERVED
        const steps = OFFERING_CARDS.map((card, zoneIdx) => ({
            left: card.desktopLeft,
            caption: card.caption,
            zoneIdx,
            hold: card.hold
        }));

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
    }, [currentScreen, isMobile]);

    return (
        <section className={`screen ${currentScreen === 2 ? 'active' : ''}`} data-i="2">
            <div className="eyebrow"><span className="eyebrow-star">🎁</span> Comprehensive 100% Scholarship</div>
            <h1 className="headline">
                Everything Covered.<br />
                <span className="highlight-pink">Zero Financial Barrier.</span>
            </h1>

            <div className="offering-carousel-wrap">
                <button
                    type="button"
                    className="offering-carousel-arrow offering-arrow-prev"
                    onClick={handlePrev}
                    aria-label="Previous offering"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className="offering-carousel-viewport">
                    <div
                        ref={trackRef}
                        className={`room-row offering-carousel-track ${isMobile ? (isTransitioning ? 'is-animating' : 'no-anim') : ''}`}
                        style={{
                            transform: isMobile
                                ? `translateX(calc(-1 * ${carouselIdx} * (100% + var(--carousel-gap, 18px))))`
                                : 'none'
                        }}
                        onTransitionEnd={handleTransitionEnd}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {slides.map((card, idx) => {
                            const isClone = idx === 0 || idx === slides.length - 1;
                            const cardRealIdx = idx === 0 ? 4 : idx === slides.length - 1 ? 0 : idx - 1;
                            const isHighlighted = isMobile
                                ? cardRealIdx === mobileActiveIdx
                                : activeZoneIdx === cardRealIdx;

                            return (
                                <div
                                    key={`${card.id}-${idx}`}
                                    className={`zone ${isHighlighted ? 'highlight' : ''} ${isClone ? 'clone-card' : ''}`}
                                    id={isClone ? undefined : card.id}
                                >
                                    {card.icon}
                                    <div className="zone-name">{card.name}</div>
                                    {card.sub && <div className="zone-sub">{card.sub}</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="button"
                    className="offering-carousel-arrow offering-arrow-next"
                    onClick={handleNext}
                    aria-label="Next offering"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            <div className="guide-stage">
                <div className="guide-track"></div>
                <div className="guide-wrap" id="guide3" style={{ left: `${guideLeft}%` }}>
                    <div className="navi-avatar">
                        <img src="/mentor-avatar2.png" alt="Mentor" className="avatar-img" />
                    </div>
                </div>
                <div
                    className={`caption-bar ${isMobile ? (captionFade ? 'show' : '') : (showCaption ? 'show' : '')}`}
                    id="cap3"
                >
                    {isMobile ? OFFERING_CARDS[mobileActiveIdx].caption : captionText}
                </div>
            </div>

            <div
                className={`reward-line ${isMobile ? (mobileActiveIdx === 4 ? 'show' : '') : (showReward ? 'show' : '')}`}
                id="rewardLine"
            >
                All you need is dedication and a desire to learn!
            </div>
        </section>
    );
};
