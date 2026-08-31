import React from 'react';
import { useApp } from '../../context/AppContext';

export const LaunchTransitionOverlay = () => {
    const { rocketTransition, rocketTransitionText } = useApp();

    if (!rocketTransition) return null;

    return (
        <div className={`rocket-launch-overlay ${rocketTransition ? 'active' : ''}`} id="rocketLaunchOverlay">
            <div className="launch-anim-content">
                <div className="launch-rocket-sprite">
                    <img src="/assets/rocket.png" alt="Launching Rocket" />
                    <div className="launch-flame-burst"></div>
                </div>

                <h2 className="launch-status-text" id="launchStatusText">
                    {rocketTransitionText}
                </h2>

                <div className="launch-progress-bar">
                    <div className="launch-progress-fill"></div>
                </div>
            </div>
        </div>
    );
};
