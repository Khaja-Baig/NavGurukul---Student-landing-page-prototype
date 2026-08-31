import React from 'react';
import { useApp } from '../../context/AppContext';

export const LaunchTransitionOverlay = () => {
    const { isLaunchOverlayOpen, launchTransitionText, isLaunchReverse } = useApp();

    if (!isLaunchOverlayOpen) return null;

    return (
        <div id="etLaunchTransitionOverlay" className={`et-launch-overlay active ${isLaunchReverse ? 'reverse' : ''}`}>
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

