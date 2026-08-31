import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const s5RoadSegments = {
    '0-1': 'M 105 750 C 125 730, 150 690, 185 635',
    '1-2': 'M 185 635 C 215 645, 245 642, 275 620 C 295 605, 335 605, 360 615 C 390 635, 420 648, 450 645',
    '2-3': 'M 450 645 C 480 665, 530 695, 575 702 C 600 705, 615 702, 630 700',
    '3-4': 'M 630 700 C 665 695, 715 665, 755 605 C 785 540, 810 480, 835 420'
};

export const s5CheckpointCoordinates = [
    { left: 10.5, top: 75.0 },
    { left: 18.5, top: 63.5 },
    { left: 45.0, top: 64.5 },
    { left: 63.0, top: 70.0 },
    { left: 83.5, top: 42.0 }
];

export const s5BannerMessages = [
    (name) => `Aao ${name}! <span class="s5-highlight-pink">Level 1: Screening Test (ST)</span> explore karein! 🚀`,
    (name) => `Awesome ${name}! <span class="s5-highlight-pink">Level 1 (Screening Test)</span> cleared! Now advance to Level 2! 💻`,
    (name) => `Great job ${name}! <span class="s5-highlight-pink">Level 2 (Learning Round)</span> unlocked! Move to Level 3! 🤝`,
    (name) => `Fantastic ${name}! <span class="s5-highlight-pink">Level 3 (Culture-fit Round)</span> complete! Welcome to Campus! 🎓`,
    (name) => `Congratulations ${name}! You reached <span class="s5-highlight-pink">Campus Welcome</span>! Book your free test below! 🎉`
];

export const Screen5_AdventurousRoadmap = () => {
    const {
        currentScreen,
        studentName,
        go,
        openStageQuestModal,
        s5CurrentStage,
        setS5CurrentStage,
        s5IsWalking,
        setS5IsWalking
    } = useApp();

    const name = (studentName && studentName !== 'Friend') ? studentName : 'Asha';
    const [runnerPos, setRunnerPos] = useState(s5CheckpointCoordinates[0]);
    const [charFacing, setCharFacing] = useState(1);
    const [charSlope, setCharSlope] = useState(0);

    const animFrameRef = useRef(null);

    useEffect(() => {
        if (currentScreen === 4) {
            const initialCp = s5CheckpointCoordinates[s5CurrentStage];
            setRunnerPos(initialCp);
        }
    }, [currentScreen, s5CurrentStage]);

    const createS5RoadPath = (fromStage, toStage) => {
        let fullD = '';
        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const isReversed = fromStage > toStage;

        const startS = isReversed ? toStage : fromStage;
        const endS = isReversed ? fromStage : toStage;

        for (let s = startS; s < endS; s++) {
            const segKey = `${s}-${s + 1}`;
            const segD = s5RoadSegments[segKey];
            if (!segD) continue;
            if (fullD === '') {
                fullD = segD;
            } else {
                const stripped = segD.replace(/^M\s*[\d\.]+\s+[\d\.]+\s*/, ' ');
                fullD += stripped;
            }
        }

        pathEl.setAttribute('d', fullD);
        return { pathEl, isReversed };
    };

    const s5GoToStage = (targetStage) => {
        if (s5IsWalking) return;
        targetStage = Math.max(0, Math.min(4, targetStage));

        if (targetStage === s5CurrentStage) {
            setS5IsWalking(true);
            setTimeout(() => {
                setS5IsWalking(false);
                if (targetStage > 0) openStageQuestModal(targetStage);
            }, 450);
            return;
        }

        const { pathEl, isReversed } = createS5RoadPath(s5CurrentStage, targetStage);
        const totalLength = pathEl.getTotalLength();

        if (!totalLength || totalLength <= 0) {
            setS5CurrentStage(targetStage);
            setRunnerPos(s5CheckpointCoordinates[targetStage]);
            return;
        }

        setS5IsWalking(true);

        const stageDiff = Math.abs(targetStage - s5CurrentStage);
        const duration = Math.max(3600, Math.min(7200, totalLength * 11.0 + stageDiff * 450));
        const startTime = performance.now();

        function getWalkPathProgress(t) {
            if (t <= 0) return 0;
            if (t >= 1) return 1;
            const a = 0.15;
            const d = 0.15;
            const s = 1 - a - d;
            const vMax = 1 / (s + 0.5 * (a + d));

            if (t < a) {
                const u = t / a;
                return 0.5 * vMax * a * (u * u * (2 - u));
            } else if (t <= 1 - d) {
                const sAccel = 0.5 * vMax * a;
                return sAccel + vMax * (t - a);
            } else {
                const u = (1 - t) / d;
                const sRemaining = 0.5 * vMax * d * (u * u * (2 - u));
                return 1 - sRemaining;
            }
        }

        function animateWalk(now) {
            const elapsed = now - startTime;
            const linearT = Math.min(1, elapsed / duration);
            const progressT = getWalkPathProgress(linearT);

            const currentDist = isReversed ? (1 - progressT) * totalLength : progressT * totalLength;
            const pt = pathEl.getPointAtLength(Math.max(0, Math.min(totalLength, currentDist)));

            const lookAheadDist = isReversed
                ? Math.max(0, currentDist - 4.0)
                : Math.min(totalLength, currentDist + 4.0);
            const ptNext = pathEl.getPointAtLength(lookAheadDist);

            const dx = ptNext.x - pt.x;
            const dy = ptNext.y - pt.y;

            if (dx > 0.05) {
                setCharFacing(1);
            } else if (dx < -0.05) {
                setCharFacing(-1);
            }

            const slopeAngle = Math.max(-8, Math.min(8, Math.atan2(dy, Math.abs(dx) + 0.01) * (180 / Math.PI) * 0.25));
            setCharSlope(slopeAngle);

            const leftPercent = pt.x / 10;
            const topPercent = pt.y / 10;
            setRunnerPos({ left: leftPercent, top: topPercent });

            if (linearT < 1) {
                animFrameRef.current = requestAnimationFrame(animateWalk);
            } else {
                setS5CurrentStage(targetStage);
                setS5IsWalking(false);
                const finalCp = s5CheckpointCoordinates[targetStage];
                setRunnerPos(finalCp);
                setCharSlope(0);

                if (targetStage > 0) {
                    setTimeout(() => {
                        openStageQuestModal(targetStage);
                    }, 380);
                }
            }
        }

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(animateWalk);
    };

    const s5AdvanceMilestone = () => {
        if (s5CurrentStage < 4) {
            s5GoToStage(s5CurrentStage + 1);
        } else {
            go(5);
        }
    };

    const bannerHtml = s5BannerMessages[s5CurrentStage] ? s5BannerMessages[s5CurrentStage](name) : '';

    return (
        <section className={`screen ${currentScreen === 4 ? 'active' : ''}`} data-i="4">
            <h1 className="headline">Simple 4-Step <span className="highlight-pink s5-underline">Admission Journey</span></h1>

            <div className="s5-adventure-stage">
                <div className="s5-parchment-frame">
                    <img src="/css/Map.png" alt="Admission Journey Map" className="s5-map-bg-img" />

                    {[0, 1, 2, 3, 4].map((stageIdx) => (
                        <div
                            key={stageIdx}
                            className={`s5-stage-spot spot-${stageIdx} ${s5CurrentStage === stageIdx ? 'active' : ''}`}
                            data-stage={stageIdx}
                            onClick={() => s5GoToStage(stageIdx)}
                        >
                            <div className="s5-spot-pulse"></div>
                        </div>
                    ))}

                    <div
                        className={`s5-avatar-runner ${s5IsWalking ? 'is-walking' : 'is-idle'}`}
                        id="s5AvatarRunner"
                        style={{
                            left: `${runnerPos.left}%`,
                            top: `${runnerPos.top}%`
                        }}
                    >
                        <div className="s5-ground-shadow"></div>
                        <div
                            className="s5-char-rig"
                            id="s5CharRig"
                            style={{
                                transform: `scaleX(${charFacing}) rotate(${charSlope}deg)`
                            }}
                        >
                            <div className="s5-asha-sprite" id="s5AshaSprite"></div>
                        </div>
                        <div className="s5-avatar-tag" id="s5AvatarTag">{name}</div>
                    </div>

                    <div className="s5-wooden-banner" id="s5WoodenBanner" onClick={s5AdvanceMilestone}>
                        <div
                            className="s5-banner-text"
                            id="s5BannerText"
                            dangerouslySetInnerHTML={{ __html: bannerHtml }}
                        />
                        <div className="s5-banner-cta">Tap to Walk →</div>
                    </div>
                </div>
            </div>

            <div className="s5-actions-row">
                <button className="glow-btn" id="nextLevelBtn" onClick={s5AdvanceMilestone}>
                    Unlock Next Milestone →
                </button>
            </div>
        </section>
    );
};
