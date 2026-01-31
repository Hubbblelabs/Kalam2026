'use client';

import { useEffect, useRef, useState } from 'react';

interface MarqueeTextProps {
    items: string[];
    speed?: 'slow' | 'normal' | 'fast';
    direction?: 'left' | 'right';
}

export function MarqueeText({
    items,
    speed = 'normal',
    direction = 'left'
}: MarqueeTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const speedMap = {
        slow: '35s',
        normal: '25s',
        fast: '15s'
    };

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const animationStyle = {
        animationDuration: speedMap[speed],
        animationDirection: direction === 'right' ? 'reverse' : 'normal',
        animationPlayState: isHovered ? 'paused' : 'running',
    };

    // Subtle parallax based on scroll
    const parallaxOffset = (scrollY * 0.02) % 100;

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden py-10 bg-[#Fdfdf8] border-y border-black/5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: '800px' }}
        >
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#Fdfdf8] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#Fdfdf8] to-transparent z-10" />

            {/* Main marquee track */}
            <div
                className="flex whitespace-nowrap animate-marquee"
                style={{
                    ...animationStyle,
                    transform: `translateX(${parallaxOffset}px)`,
                }}
            >
                {/* Triple the items for safer loop on wide screens */}
                {[...items, ...items, ...items].map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center group"
                    >
                        <span
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8 text-transparent transition-all duration-300 group-hover:scale-110"
                            style={{
                                WebkitTextStroke: isHovered && index % 3 === 1 ? '2px #1C5D99' : '1px #1C2533',
                                fontFamily: 'var(--font-heading)',
                                opacity: 0.8,
                                textShadow: isHovered ? '0 4px 30px rgba(28, 93, 153, 0.15)' : 'none',
                            }}
                        >
                            {item}
                        </span>
                        {/* Decorative separator with glow */}
                        <span
                            className="text-4xl transition-all duration-300"
                            style={{
                                color: '#F5B301',
                                textShadow: isHovered ? '0 0 20px rgba(245, 179, 1, 0.6)' : 'none',
                                transform: isHovered ? 'scale(1.2) rotate(15deg)' : 'scale(1) rotate(0deg)',
                            }}
                        >
                            ✦
                        </span>
                    </div>
                ))}
            </div>

            {/* Subtle 3D depth layer behind */}
            <div
                className="absolute inset-0 flex whitespace-nowrap pointer-events-none opacity-20"
                style={{
                    transform: `translateZ(-50px) translateX(${parallaxOffset * 0.5 + 20}px) scale(1.05)`,
                    filter: 'blur(2px)',
                }}
            >
                {[...items, ...items, ...items].map((item, index) => (
                    <div key={`shadow-${index}`} className="flex items-center">
                        <span
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8"
                            style={{
                                WebkitTextStroke: '1px rgba(28, 37, 51, 0.3)',
                                fontFamily: 'var(--font-heading)',
                                color: 'transparent',
                            }}
                        >
                            {item}
                        </span>
                        <span className="text-4xl text-[#F5B301]/30">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
