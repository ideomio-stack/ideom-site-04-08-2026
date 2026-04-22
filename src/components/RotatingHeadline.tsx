import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HEADLINE_WORDS } from '../data/siteData';

export function RotatingHeadline() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "end 15%"]
    });

    return (
        <div ref={containerRef} className="relative mb-12 py-4">
            {/* Base Layer (Grey) */}
            <div className="flex flex-col gap-2 md:gap-4">
                {HEADLINE_WORDS.map((word, i) => (
                    <HeadlineLine key={`base-${i}`} word={word} i={i} opacity={0.15} />
                ))}
            </div>

            {/* Highlight Layer (Black) */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 md:gap-4 select-none pointer-events-none"
                style={{
                    clipPath: useTransform(scrollYProgress, (v) => `inset(0 0 ${(1 - v) * 100}% 0)`)
                }}
            >
                {HEADLINE_WORDS.map((word, i) => (
                    <HeadlineLine key={`highlight-${i}`} word={word} i={i} opacity={1} isHighlight />
                ))}
            </motion.div>
        </div>
    );
}

interface HeadlineLineProps {
    word: string;
    i: number;
    opacity: number;
    isHighlight?: boolean;
}

const HeadlineLine: React.FC<HeadlineLineProps> = ({ word, i, opacity, isHighlight }) => {
    const isLast = i === HEADLINE_WORDS.length - 1;

    return (
        <h1
            className="text-[12vw] md:text-[8vw] leading-[0.9] font-bold tracking-tight text-black whitespace-nowrap uppercase"
            style={{ opacity, fontFamily: 'var(--font-sans)' }}
        >
            {isLast ? (
                <span className={`font-serif italic ${isHighlight ? 'text-black' : 'text-[#6B6B6B]'}`}>{word}</span>
            ) : (
                word
            )}
        </h1>
    );
}
