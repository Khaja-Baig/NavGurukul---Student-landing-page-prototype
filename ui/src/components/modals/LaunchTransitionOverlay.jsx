import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const LaunchTransitionOverlay = () => {
    const { isLaunchOverlayOpen, launchTransitionText, isLaunchReverse } = useApp();
    const [shouldRender, setShouldRender] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isLaunchOverlayOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                setIsActive(true);
            }, 20);
            return () => clearTimeout(timer);
        } else {
            setIsActive(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isLaunchOverlayOpen]);

    if (!shouldRender) return null;

    return (
        <div id="etLaunchTransitionOverlay" className={`et-launch-overlay ${isActive ? 'active' : ''} ${isLaunchReverse ? 'reverse' : ''}`}>
            <div className="launch-stars-bg"></div>
            <div className="launch-speed-lines"></div>
            <div className="launch-glow-pulse"></div>
            <div className="launch-rocket-stage">
                <div className="launch-rocket-body">
                    <div className="launch-thruster-flame">
                        <span className="launch-flame-core"></span>
                        <span className="launch-flame-glow"></span>
                    </div>
                    <div className="launch-rocket-icon">🚀</div>
                </div>
                <div className="launch-status-text" id="launchStatusText">
                    {launchTransitionText || (isLaunchReverse ? 'RETURNING TO MISSION BASE...' : 'INITIATING ROCKET LAUNCH...')}
                </div>
            </div>
        </div>
    );
};
