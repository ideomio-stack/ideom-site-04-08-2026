import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PremiumArrowButtonProps {
    onClick: () => void;
    direction: 'left' | 'right';
    disabled: boolean;
}

export function PremiumArrowButton({
    onClick,
    direction,
    disabled
}: PremiumArrowButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border ${disabled ? 'bg-[#F5F5F5] border-black/5 text-black/10 cursor-not-allowed' : 'bg-black border-white/10 text-white cursor-pointer hover:bg-black/90'}`}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Asterisk slide */}
                <motion.span
                    animate={{
                        rotate: isHovered ? 90 : 0,
                        y: isHovered ? "-120%" : "0%"
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl font-bold leading-none select-none pt-[0.1em]"
                >
                    *
                </motion.span>
                {/* Arrow slide */}
                <motion.span
                    animate={{
                        y: isHovered ? "0%" : "120%"
                    }}
                    initial={{ y: "120%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Icon className="w-6 h-6" />
                </motion.span>
            </div>
        </button>
    );
}
