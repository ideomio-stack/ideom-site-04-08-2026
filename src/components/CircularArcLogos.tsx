import React, { useEffect, useRef } from 'react';
import { LOGOS, LOGOS_TRIPLED, ARC_SAGITTA, CENTER_SCALE_BOOST } from '../data/siteData';
import { Motion, useMotionTick } from '../hooks/useMotionEngine';

function circleArcOffset(d: number, hw: number, sagitta: number): number {
    if (hw <= 0 || sagitta <= 0) return 0;
    const R = (hw * hw + sagitta * sagitta) / (2 * sagitta);
    const dClamped = Math.min(Math.abs(d), hw);
    const underRoot = R * R - dClamped * dClamped;
    return R - Math.sqrt(Math.max(underRoot, 0));
}

export function CircularArcLogos() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const slotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const innersRef = useRef<(HTMLDivElement | null)[]>([]);

    const posRef = useRef(0);
    const layoutInfo = useRef<{ centerOffset: number }[]>([]);
    const loopWidthRef = useRef(0);

    useEffect(() => {
        if (!stripRef.current) return;

        const updateMetrics = () => {
            if (!slotsRef.current.length) return;
            const originalCount = LOGOS.length;
            if (!slotsRef.current[originalCount]) return;

            loopWidthRef.current = slotsRef.current[originalCount]!.offsetLeft;

            layoutInfo.current = slotsRef.current.map((el) => {
                if (!el) return { centerOffset: 0 };
                return { centerOffset: el.offsetLeft + el.offsetWidth / 2 };
            });
        };

        updateMetrics();

        const ro = new ResizeObserver(() => {
            updateMetrics();
        });

        ro.observe(stripRef.current);
        return () => ro.disconnect();
    }, []);

    useMotionTick(() => {
        if (!containerRef.current || !stripRef.current || !loopWidthRef.current || !layoutInfo.current.length) return;

        const hw = window.innerWidth / 2;
        posRef.current += Motion.velocity;

        const loopW = loopWidthRef.current;
        const scrollX = ((posRef.current % loopW) + loopW) % loopW;

        stripRef.current.style.transform = `translate3d(-${scrollX}px, 0, 0)`;

        for (let i = 0; i < LOGOS_TRIPLED.length; i++) {
            const el = innersRef.current[i];
            if (!el) continue;
            const info = layoutInfo.current[i];
            if (!info) continue;

            const screenX = info.centerOffset - scrollX;
            const d = screenX - hw;
            const sagittaOffset = circleArcOffset(d, hw, ARC_SAGITTA);
            const distRatio = Math.min(Math.abs(d) / hw, 1);
            const scaleBoost = CENTER_SCALE_BOOST * (1 - distRatio);

            el.style.transform = `translate3d(0, -${sagittaOffset}px, ${scaleBoost * 150}px) scale(${1 + scaleBoost})`;
        }
    });

    return (
        <section className="pt-8 pb-12 mx-6 overflow-hidden">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#6B6B6B] mb-16 mt-8">
                Trusted by industry leaders
            </p>

            <div
                ref={containerRef}
                className="relative w-full"
                style={{ height: "150px", perspective: "1200px" }}
            >
                <div
                    ref={stripRef}
                    className="absolute flex items-center gap-16"
                    style={{ willChange: "transform" }}
                >
                    {LOGOS_TRIPLED.map((logo, i) => (
                        <div
                            key={i}
                            ref={(el) => { slotsRef.current[i] = el; }}
                            className="flex-shrink-0"
                        >
                            <div
                                ref={(el) => { innersRef.current[i] = el; }}
                                className="flex items-center justify-center group transform-gpu"
                                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                            >
                                {logo.type === "image" ? (
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className={`w-auto h-auto max-h-[60px] max-w-[180px] object-contain px-2 mix-blend-multiply grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${logo.alt === "Mutimer" ? "contrast-[1.2] brightness-[1.1]" : ""
                                            }`}
                                        style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                                        draggable={false}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 select-none">
                                        <span
                                            style={{ fontFamily: "'Playfair Display', 'Instrument Serif', Georgia, serif" }}
                                            className="text-4xl font-extrabold text-black tracking-tight leading-none"
                                        >
                                            {logo.text}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
