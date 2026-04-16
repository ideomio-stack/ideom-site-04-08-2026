import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SCROLL_TICKER_WORDS } from '../data/siteData';
import { useMotionTick } from '../hooks/useMotionEngine';

export function ScrollDrivenTicker() {
    const [index, setIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef(0);

    useEffect(() => {
        if (headlineRef.current) {
            headlineRef.current.style.transform = 'translateX(-100vw)';
        }
    }, []);

    useMotionTick(() => {
        if (!containerRef.current || !headlineRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;

        const entranceRange = 600;
        const progress = Math.min(Math.max((windowH - rect.top) / entranceRange, 0), 1);

        if (progress < 1) {
            const eased = 1 - Math.pow(1 - progress, 3);
            const x = (1 - eased) * -100;
            headlineRef.current.style.transform = `translateX(${x}vw)`;
            if (isLocked) setIsLocked(false);
        } else {
            headlineRef.current.style.transform = `translateX(0)`;
            if (!isLocked) setIsLocked(true);
        }

        if (progress === 1) {
            timerRef.current += 16.67;
            if (timerRef.current >= 1900) {
                setIndex((prev) => (prev + 1) % SCROLL_TICKER_WORDS.length);
                timerRef.current = 0;
            }
        }
    });

    const words = [...SCROLL_TICKER_WORDS, SCROLL_TICKER_WORDS[0]];

    return (
        <section
            ref={containerRef}
            className="bg-transparent py-20 overflow-x-hidden relative flex flex-col justify-center items-center"
            style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
            }}
        >
            <div
                ref={headlineRef}
                className="flex items-baseline gap-x-4 whitespace-nowrap will-change-transform"
            >
                <span className="text-[6vw] font-medium tracking-tighter text-black leading-none">
                    Human-centered
                </span>

                <div
                    className="text-[6vw] relative inline-block overflow-hidden align-top"
                    style={{ height: '1.3em' }}
                >
                    <motion.div
                        animate={{ y: `-${index * 1.3}em` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col leading-[1.1]"
                    >
                        {words.map((word, i) => (
                            <div
                                key={i}
                                className="flex items-center font-medium tracking-tighter"
                                style={{
                                    height: '1.3em',
                                    filter: index === i + 1 ? 'blur(2px)' : 'blur(0px)',
                                    transition: 'filter 0.4s ease-out',
                                }}
                            >
                                {word}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
