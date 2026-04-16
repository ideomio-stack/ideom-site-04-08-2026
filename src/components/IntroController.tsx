import { useEffect } from 'react';
import { Motion, startMotionEngine } from '../hooks/useMotionEngine';
import { MOTION_INTRO_INJECT } from '../data/siteData';

export function IntroController() {
    useEffect(() => {
        const cleanup = startMotionEngine();
        Motion.state = "intro";

        const introTimer = setTimeout(() => {
            Motion.state = "ready";
            Motion.targetVelocity = MOTION_INTRO_INJECT;

            setTimeout(() => {
                Motion.state = "interactive";
            }, 200);
        }, 1200);

        return () => {
            clearTimeout(introTimer);
            cleanup();
        };
    }, []);

    return null;
}
