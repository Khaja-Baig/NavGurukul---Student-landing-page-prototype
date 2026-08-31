import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const AutonomousBird = () => {
    const { currentScreen } = useApp();
    const [isDocked, setIsDocked] = useState(true);
    const [isFlying, setIsFlying] = useState(false);
    const [flightPos, setFlightPos] = useState({ x: -100, y: -100 });
    const [flightOrient, setFlightOrient] = useState({ yaw: 0, pitch: 0, bank: 0 });
    const [bannerTilt, setBannerTilt] = useState(0);
    const [shadowStyle, setShadowStyle] = useState({ left: '0px', top: '0px', scale: 1, opacity: 0 });
    const [wingState, setWingState] = useState('flapping'); // 'flapping' | 'gliding'

    const animFrameRef = useRef(null);
    const stateRef = useRef({
        isFlying: false,
        flightMode: 'intro_tour',
        posX: 0,
        posY: 0,
        velX: 0,
        velY: 0,
        heading: 0.2,
        currentPitch: 0,
        currentBank: 0,
        currentYaw: 0,
        bannerTilt: 0,
        bannerAngularVel: 0,
        flightState: 'flapping',
        stateTimer: 0,
        nextStateDuration: 3.2,
        currentWaypointIdx: 0,
        sparkleTimer: 0,
        lastTimestamp: performance.now()
    });

    const getPerchTarget = () => {
        return {
            x: window.innerWidth * 0.88,
            y: 75
        };
    };

    const buildTourWaypoints = () => {
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        return [
            { x: -vpWidth * 0.08, y: vpHeight * 0.32, speed: 135 },
            { x: vpWidth * 0.35, y: vpHeight * 0.20, speed: 125 },
            { x: vpWidth * 0.75, y: vpHeight * 0.30, speed: 120 },
            { x: vpWidth * 0.88, y: vpHeight * 0.68, speed: 115 },
            { x: vpWidth * 0.52, y: vpHeight * 0.80, speed: 120 },
            { x: vpWidth * 0.16, y: vpHeight * 0.60, speed: 125 },
            { x: vpWidth * 0.40, y: vpHeight * 0.28, speed: 115 },
            { x: vpWidth * 0.72, y: vpHeight * 0.18, speed: 100 }
        ];
    };

    const emitSparklesBurst = (cx, cy) => {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'trail-sparkle';
            sparkle.style.left = `${cx + (Math.random() * 40 - 20)}px`;
            sparkle.style.top = `${cy + (Math.random() * 40 - 20)}px`;
            sparkle.style.setProperty('--svx', `${(Math.random() - 0.5) * 60}px`);
            sparkle.style.setProperty('--svy', `${(Math.random() - 0.5) * 60}px`);
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 750);
        }
    };

    const startFlight = () => {
        if (stateRef.current.isFlying) {
            // Trigger mid-air loop / burst maneuver on click while flying!
            emitSparklesBurst(stateRef.current.posX, stateRef.current.posY);
            stateRef.current.heading += Math.PI;
            stateRef.current.bannerAngularVel += 25;
            return;
        }

        setIsDocked(false);
        setIsFlying(true);
        stateRef.current.isFlying = true;
        stateRef.current.flightMode = 'intro_tour';

        const waypoints = buildTourWaypoints();
        stateRef.current.waypoints = waypoints;
        stateRef.current.currentWaypointIdx = 0;
        stateRef.current.posX = waypoints[0].x;
        stateRef.current.posY = waypoints[0].y;
        stateRef.current.heading = 0.2;
        stateRef.current.lastTimestamp = performance.now();

        const updateFlight = (now) => {
            if (!stateRef.current.isFlying) return;

            const st = stateRef.current;
            const dt = Math.min((now - st.lastTimestamp) / 1000, 0.06);
            st.lastTimestamp = now;

            st.stateTimer += dt;
            st.sparkleTimer += dt;

            let targetX = 0;
            let targetY = 0;
            let targetSpeed = 120;

            if (st.flightMode === 'intro_tour') {
                const wp = st.waypoints[st.currentWaypointIdx] || st.waypoints[0];
                targetX = wp.x;
                targetY = wp.y;
                targetSpeed = wp.speed || 120;

                const dist = Math.hypot(targetX - st.posX, targetY - st.posY);
                if (dist < 110) {
                    st.currentWaypointIdx++;
                    if (st.currentWaypointIdx >= st.waypoints.length) {
                        st.flightMode = 'landing';
                    }
                }
            } else if (st.flightMode === 'landing') {
                const dock = getPerchTarget();
                targetX = dock.x;
                targetY = dock.y;

                const dist = Math.hypot(targetX - st.posX, targetY - st.posY);
                targetSpeed = Math.max(35, Math.min(110, dist * 1.0));

                if (dist < 16) {
                    st.isFlying = false;
                    setIsFlying(false);
                    setIsDocked(true);
                    return;
                }
            }

            const dx = targetX - st.posX;
            const dy = targetY - st.posY;
            let desiredHeading = Math.atan2(dy, dx);

            let angleDiff = desiredHeading - st.heading;
            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;

            const maxTurnRate = st.flightMode === 'landing' ? 3.5 : 2.0;
            const turnStep = Math.max(-maxTurnRate * dt, Math.min(maxTurnRate * dt, angleDiff));
            st.heading += turnStep;

            while (st.heading < -Math.PI) st.heading += 2 * Math.PI;
            while (st.heading > Math.PI) st.heading -= 2 * Math.PI;

            st.velX = Math.cos(st.heading) * targetSpeed;
            st.velY = Math.sin(st.heading) * targetSpeed;

            const turbX = Math.sin(now * 0.0022) * 6;
            const turbY = Math.cos(now * 0.0030) * 5;

            st.posX += (st.velX + turbX) * dt;
            st.posY += (st.velY + turbY) * dt;

            // Wing flap / glide toggle
            if (st.flightMode !== 'landing') {
                if (st.stateTimer > st.nextStateDuration) {
                    st.stateTimer = 0;
                    if (st.flightState === 'flapping') {
                        if (st.velY > -25) {
                            st.flightState = 'gliding';
                            setWingState('gliding');
                            st.nextStateDuration = 2.2 + Math.random() * 2.8;
                        } else {
                            st.nextStateDuration = 2.0;
                        }
                    } else {
                        st.flightState = 'flapping';
                        setWingState('flapping');
                        st.nextStateDuration = 2.8 + Math.random() * 3.5;
                    }
                }
            } else {
                st.flightState = 'flapping';
                setWingState('flapping');
            }

            // 3D Pitch / Bank / Yaw
            const isHeadingRight = Math.cos(st.heading) >= 0;
            const targetYaw = isHeadingRight ? 0 : 180;
            st.currentYaw += (targetYaw - st.currentYaw) * (7.0 * dt);

            const targetPitch = Math.max(-25, Math.min(23, (st.velY / targetSpeed) * 32));
            st.currentPitch += (targetPitch - st.currentPitch) * (5.0 * dt);

            const turnRate = turnStep / dt;
            const targetBank = Math.max(-28, Math.min(28, turnRate * 12 * (isHeadingRight ? 1 : -1)));
            st.currentBank += (targetBank - st.currentBank) * (4.2 * dt);

            // Carried Poster Pendulum Swing
            const targetTilt = Math.max(-28, Math.min(28, (-st.velX * 0.06) + (turnRate * 4.2)));
            const spring = (targetTilt - st.bannerTilt) * 20;
            const damping = st.bannerAngularVel * 5.0;
            st.bannerAngularVel += (spring - damping) * dt;
            st.bannerTilt += st.bannerAngularVel * dt;

            setFlightPos({ x: st.posX, y: st.posY });
            setFlightOrient({ yaw: st.currentYaw, pitch: st.currentPitch, bank: st.currentBank });
            setBannerTilt(st.bannerTilt);

            // Ground Shadow
            const vpHeight = window.innerHeight;
            const groundY = vpHeight * 0.92;
            const shadowScale = Math.max(0.35, 1 - ((groundY - st.posY) / vpHeight) * 0.65);
            const shadowOpacity = Math.max(0.04, 0.22 - ((groundY - st.posY) / vpHeight) * 0.15);

            setShadowStyle({
                left: `${st.posX}px`,
                top: `${Math.min(groundY, st.posY + 105)}px`,
                scale: shadowScale,
                opacity: shadowOpacity
            });

            animFrameRef.current = requestAnimationFrame(updateFlight);
        };

        animFrameRef.current = requestAnimationFrame(updateFlight);
    };

    // Auto-trigger flight when entering Screen 4 (Outcomes)
    useEffect(() => {
        if (currentScreen === 3 && isDocked) {
            startFlight();
        }
    }, [currentScreen]);

    return (
        <>
            {/* Ground Shadow */}
            <div
                className={`bird-shadow ${isFlying ? 'active' : ''}`}
                style={{
                    left: shadowStyle.left,
                    top: shadowStyle.top,
                    transform: `translate(-50%, -50%) scale(${shadowStyle.scale})`,
                    opacity: shadowStyle.opacity
                }}
            />

            {/* Top Right Perch Dock */}
            <div className="perch-corner-dock">
                <div
                    className={`perched-unit ${isDocked ? 'is-docked' : ''}`}
                    onClick={startFlight}
                    title="Click bird to trigger flight!"
                    style={{ cursor: 'pointer', pointerEvents: isDocked ? 'auto' : 'none' }}
                >
                    <div className="perched-bird-sprite" style={{ opacity: isDocked ? 1 : 0 }}></div>
                    <div className="poster-pill-badge" style={{ opacity: isDocked ? 1 : 0 }}>
                        <span className="sparkle-icon">✨</span>
                        <span>100% Job Support</span>
                    </div>
                </div>
            </div>

            {/* Autonomous Flying Carrier (Never blocks underlying page clicks) */}
            <div className="flight-carrier-layer" style={{ pointerEvents: 'none' }}>
                <div
                    className={`bird-carrier ${isFlying ? 'active' : ''}`}
                    onClick={startFlight}
                    title="Click bird in flight!"
                    style={{
                        transform: `translate3d(${flightPos.x - 50}px, ${flightPos.y - 50}px, 0px)`,
                        pointerEvents: isFlying ? 'auto' : 'none',
                        cursor: 'pointer'
                    }}
                >
                    <div
                        className="bird-orient"
                        style={{
                            transform: `rotateY(${flightOrient.yaw}deg) rotateZ(${flightOrient.pitch}deg) rotateX(${flightOrient.bank}deg)`
                        }}
                    >
                        <div className={`bird-rig ${wingState}`}>
                            <div className="bird-sprite"></div>
                        </div>
                    </div>

                    <div
                        className="carried-poster-assembly"
                        style={{
                            transform: `translateX(-50%) rotateZ(${bannerTilt}deg)`
                        }}
                    >
                        <svg className="poster-tether-cables" viewBox="0 0 64 16">
                            <line x1="24" y1="2" x2="16" y2="14" className="tether-line" />
                            <circle cx="24" cy="2" r="2.5" className="tether-claw-ring" />
                            <line x1="40" y1="2" x2="48" y2="14" className="tether-line" />
                            <circle cx="40" cy="2" r="2.5" className="tether-claw-ring" />
                        </svg>
                        <div className="carried-poster-badge">
                            <span className="sparkle-icon">✨</span>
                            <span>100% Job Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
