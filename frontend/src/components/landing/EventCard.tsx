'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface EventCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    accentColor?: 'blue' | 'orange' | 'yellow';
}

export function EventCard({
    title,
    description,
    icon,
    href,
    accentColor = 'blue'
}: EventCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const colorMap = {
        blue: '#1C5D99',
        orange: '#FF8C00',
        yellow: '#F5B301'
    };

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on mouse position relative to center
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8; // Max 8deg rotation
        const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 8;

        setRotation({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    return (
        <Link
            ref={cardRef}
            href={href}
            className="group relative flex flex-col h-full bg-white rounded-[2rem] p-8 border border-black/5 overflow-hidden"
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                transformStyle: 'preserve-3d',
                boxShadow: isHovered
                    ? `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px ${colorMap[accentColor]}20`
                    : '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {/* Hover Gradient Background */}
            <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at top right, ${colorMap[accentColor]}, transparent 70%)`,
                    opacity: isHovered ? 0.15 : 0
                }}
            />

            {/* Shine effect on hover */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    opacity: isHovered ? 1 : 0,
                    animation: isHovered ? 'shine 0.8s ease-out forwards' : 'none',
                }}
            />

            {/* Header: Icon + Arrow */}
            <div className="flex justify-between items-start mb-8" style={{ transform: 'translateZ(30px)' }}>
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-500"
                    style={{
                        backgroundColor: colorMap[accentColor],
                        transform: isHovered ? 'scale(1.15) rotate(6deg)' : 'scale(1) rotate(0deg)'
                    }}
                >
                    {icon}
                </div>

                <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                        borderColor: isHovered ? colorMap[accentColor] : 'rgba(0,0,0,0.1)',
                        backgroundColor: isHovered ? '#1C2533' : 'transparent',
                        color: isHovered ? 'white' : 'inherit',
                    }}
                >
                    <ArrowUpRight
                        className="w-5 h-5 transition-transform duration-300"
                        style={{ transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto" style={{ transform: 'translateZ(20px)' }}>
                <h4
                    className="font-heading text-3xl font-bold text-[#1C2533] mb-3 leading-tight transition-transform duration-300"
                    style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
                >
                    {title}
                </h4>
                <p
                    className="text-lg leading-relaxed transition-colors duration-300"
                    style={{ color: isHovered ? '#1C2533' : '#6B7B8C' }}
                >
                    {description}
                </p>
            </div>

            {/* Decorative background shape */}
            <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
                style={{
                    backgroundColor: colorMap[accentColor],
                    opacity: isHovered ? 0.25 : 0
                }}
            />

            {/* Border glow on hover */}
            <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-300"
                style={{
                    boxShadow: `inset 0 0 30px ${colorMap[accentColor]}15`,
                    opacity: isHovered ? 1 : 0,
                }}
            />
        </Link>
    );
}
