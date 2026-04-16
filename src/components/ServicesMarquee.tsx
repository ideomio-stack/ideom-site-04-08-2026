import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { SERVICES } from '../data/siteData';
import { Motion, useMotionTick } from '../hooks/useMotionEngine';

export function ServicesMarquee() {
    const x = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const momentum = useRef(0);

    useEffect(() => {
        if (containerRef.current) {
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    useMotionTick(() => {
        if (isDragging || !contentWidth) return;

        momentum.current *= 0.96;
        const baseAutoSpeed = 0.58;
        const move = baseAutoSpeed + (Motion.velocity * 1.0) + momentum.current;

        let nextX = x.get() + move;

        if (nextX > 0) {
            nextX -= contentWidth;
        } else if (nextX <= -contentWidth) {
            nextX += contentWidth;
        }

        x.set(nextX);
    });

    return (
        <motion.div
            ref={containerRef}
            drag="x"
            style={{ x, width: "max-content" }}
            onDragStart={() => setIsDragging(true)}
            onDrag={() => {
                const currentX = x.get();
                if (currentX <= -contentWidth) x.set(currentX + contentWidth);
                if (currentX > 0) x.set(currentX - contentWidth);
            }}
            onDragEnd={(_, info) => {
                setIsDragging(false);
                momentum.current = info.velocity.x * 0.018;
            }}
            className="flex gap-8 md:gap-12 py-10 cursor-grab active:cursor-grabbing will-change-transform"
        >
            {[...SERVICES, ...SERVICES].map((service, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 flex flex-col gap-6 w-[80vw] md:w-[45vw] lg:w-[352px] select-none"
                >
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#F8F8F8] shadow-sm border border-black/5 group p-4">
                        <div className="w-full h-full overflow-hidden rounded-[1.8rem] relative">
                            <img
                                src={service.img}
                                alt={service.title}
                                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125 pointer-events-none ${service.img.includes('flower') || service.title.includes('P/R') ? 'scale-[1.4]' : 'scale-[1.1]'}`}
                                style={{
                                    objectPosition: 'center',
                                }}
                                draggable={false}
                            />
                        </div>
                    </div>
                    <div className="px-4">
                        <h3 className="text-2xl font-bold mb-3 text-black transition-colors tracking-tight">
                            {service.title}
                        </h3>
                        <p className="text-[#6B6B6B] leading-relaxed text-sm font-medium">
                            {service.desc}
                        </p>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
