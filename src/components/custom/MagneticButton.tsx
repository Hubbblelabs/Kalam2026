'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';
import Link from 'next/link';

interface MagneticButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export function MagneticButton({
    children,
    href,
    className = '',
    onClick,
    strength = 0.3,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            setPosition({
                x: distanceX * strength,
                y: distanceY * strength,
            });
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const [particles, setParticles] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

    const handleCreateParticles = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create 8 particles
        const newParticles = Array.from({ length: 8 }).map((_, i) => ({
            id: Date.now() + i,
            x,
            y,
            angle: (i * 360) / 8,
        }));

        setParticles(prev => [...prev, ...newParticles]);

        // Cleanup particles
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.includes(p)));
        }, 600);

        onClick?.();
    }, [onClick]);

    const content = (
        <div
            ref={buttonRef}
            className={`relative inline-block cursor-pointer select-none ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={handleCreateParticles}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            {/* Glow effect on hover */}
            <div
                className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(245,179,1,0.3) 0%, transparent 70%)',
                    opacity: isHovered ? 1 : 0,
                    transform: 'scale(1.5)',
                }}
            />

            {/* Click Particles */}
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent-500 pointer-events-none animate-particle-burst"
                    style={{
                        left: p.x,
                        top: p.y,
                        '--tx': `${Math.cos(p.angle * Math.PI / 180) * 50}px`,
                        '--ty': `${Math.sin(p.angle * Math.PI / 180) * 50}px`,
                    } as React.CSSProperties}
                />
            ))}

            {children}
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}
