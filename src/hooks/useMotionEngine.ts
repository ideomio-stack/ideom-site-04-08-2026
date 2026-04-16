import { useEffect, useRef } from 'react';
import {
    MOTION_EASING,
    MOTION_DAMPING,
    MOTION_BASE_SPEED,
    MOTION_SCROLL_MULT
} from '../data/siteData';

export type MotionState = "loading" | "intro" | "ready" | "interactive";

export interface MotionEngine {
    velocity: number;
    targetVelocity: number;
    progress: number;
    state: MotionState;
    scrollDelta: number;
    _lastScrollY: number;
    _raf: number;
    _listeners: Set<() => void>;
}

export const Motion: MotionEngine = {
    velocity: 0,
    targetVelocity: 0,
    progress: 0,
    state: "loading",
    scrollDelta: 0,
    _lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
    _listeners: new Set(),
    _raf: 0,
};

export function startMotionEngine() {
    const onScroll = () => {
        if (Motion.state !== "interactive") return;
        const y = window.scrollY;
        const delta = y - Motion._lastScrollY;
        Motion.scrollDelta += delta;
        Motion._lastScrollY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    function update() {
        Motion.targetVelocity *= MOTION_DAMPING;

        if (Motion.state === "interactive" && Motion.scrollDelta !== 0) {
            Motion.targetVelocity += Motion.scrollDelta * MOTION_SCROLL_MULT;
            Motion.scrollDelta = 0;
        }

        const currentTarget = MOTION_BASE_SPEED + Motion.targetVelocity;
        Motion.velocity += (currentTarget - Motion.velocity) * MOTION_EASING;
        Motion.progress += Motion.velocity;

        Motion._listeners.forEach((fn) => fn());
        Motion._raf = requestAnimationFrame(update);
    }

    Motion._raf = requestAnimationFrame(update);

    return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(Motion._raf);
    };
}

export function useMotionTick(callback: () => void) {
    const cbRef = useRef(callback);
    cbRef.current = callback;

    useEffect(() => {
        const fn = () => cbRef.current();
        Motion._listeners.add(fn);
        return () => { Motion._listeners.delete(fn); };
    }, []);
}
