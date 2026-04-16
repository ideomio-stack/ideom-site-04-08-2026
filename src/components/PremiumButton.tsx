import React, { useState } from 'react';
import { motion } from 'motion/react';

export function PremiumButton({
    children,
    href,
    onClick,
    type = "button",
    className = "",
    size = "default"
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    size?: "default" | "sm";
}) {
    const [isHovered, setIsHovered] = useState(false);

    const content = (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`inline-flex items-center gap-4 bg-[#eaeaea] p-[12px] px-[18px] rounded-[20px] 
        border border-black/10 group cursor-pointer transition-all duration-300 ${className} 
        ${size === "sm" ? "scale-90 origin-left" : ""}`}
        >
            <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center transition-colors duration-500 shadow-sm overflow-hidden"
                style={{ backgroundColor: isHovered ? "#000000" : "white" }}
            >
                <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full flex items-center justify-center p-0 m-0"
                >
                    <span
                        className="text-4xl font-bold leading-none select-none transition-colors duration-500"
                        style={{
                            color: isHovered ? "white" : "#1F2F2A",
                            marginTop: '0.22em'
                        }}
                    >
                        *
                    </span>
                </motion.div>
            </div>

            <span className="text-[20px] font-medium tracking-tight text-black whitespace-nowrap pr-2">
                {children}
            </span>
        </div>
    );

    if (href) return <a href={href} className="inline-block">{content}</a>;
    return (
        <button type={type} onClick={onClick} className="inline-block">
            {content}
        </button>
    );
}
