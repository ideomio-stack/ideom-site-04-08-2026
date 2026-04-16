import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../data/siteData';
import { PremiumArrowButton } from './PremiumArrowButton';

export function CaseStudySlider() {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const itemsPerView = width < 768 ? 1 : width < 1024 ? 2 : 3;
    const gap = 24;

    const next = () => {
        if (index < CASE_STUDIES.length - itemsPerView) {
            setIndex(index + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    return (
        <section className="py-24 overflow-hidden bg-transparent">
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <span className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase mb-4 block">
                    PROVEN AT SCALE
                </span>
                <h2 className="text-5xl md:text-6xl font-medium text-white leading-[1.05] mb-8">
                    Retention Wins<br />Across Industries
                </h2>
                <p className="text-lg text-white/60 max-w-xl font-medium">
                    We are committed to your growth and always want to get the most out of the email channel.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="flex justify-end gap-3 mb-8">
                    <PremiumArrowButton
                        onClick={prev}
                        direction="left"
                        disabled={index === 0}
                    />
                    <PremiumArrowButton
                        onClick={next}
                        direction="right"
                        disabled={index >= CASE_STUDIES.length - itemsPerView}
                    />
                </div>

                <div className="overflow-visible" ref={containerRef}>
                    <motion.div
                        className="flex gap-6 will-change-transform"
                        animate={{
                            x: `calc(-${index * (100 / itemsPerView)}% - ${index * (gap / itemsPerView)}px)`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{
                            left: -((CASE_STUDIES.length - itemsPerView) * (100 / itemsPerView) * containerRef.current?.offsetWidth! / 100),
                            right: 0
                        }}
                        onDragEnd={(_, info) => {
                            const threshold = 50;
                            if (info.offset.x < -threshold) next();
                            else if (info.offset.x > threshold) prev();
                        }}
                    >
                        {CASE_STUDIES.map((study, i) => {
                            const Content = (
                                <motion.div
                                    className="relative flex-shrink-0 bg-white/5 border border-white/10 rounded-[32px] p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 group select-none h-full overflow-hidden"
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                                        borderColor: "rgba(255,255,255,0.2)"
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                                        initial={{ scale: 1.15 }}
                                        whileHover={{ scale: 1 }}
                                    >
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                                    </motion.div>

                                    <div className="relative z-10 flex flex-col gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                            <span className="text-sm font-bold tracking-tight text-white/80">
                                                {study.title}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
                                            {study.subtitle}
                                        </h3>
                                    </div>
                                    <p className="relative z-10 text-sm md:text-base text-white/60 leading-relaxed font-medium">
                                        {study.description}
                                    </p>
                                </motion.div>
                            );

                            return (
                                <div
                                    key={i}
                                    className="flex-shrink-0"
                                    style={{
                                        width: `calc(${100 / itemsPerView}% - ${(gap * (itemsPerView - 1)) / itemsPerView}px)`,
                                        minHeight: '420px'
                                    }}
                                >
                                    {study.href.startsWith('/') ? (
                                        <Link to={study.href} className="block h-full">
                                            {Content}
                                        </Link>
                                    ) : (
                                        <div className="h-full">
                                            {Content}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
