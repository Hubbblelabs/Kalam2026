'use client';

import { useEffect, useRef, useCallback } from 'react';

interface CursorSpotlightProps {
    className?: string;
    theme?: 'light' | 'dark';
}

interface Point {
    x: number;
    y: number;
    age: number;
}

interface Dot {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    baseSize: number;
}

export function CursorSpotlight({ className = '', theme = 'light' }: CursorSpotlightProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const trailRef = useRef<Point[]>([]);
    const dotsRef = useRef<Dot[]>([]);
    const animationRef = useRef<number | null>(null);

    // Configuration
    const SPACING = 20; // Increased spacing for better visibility
    const DOT_BASE_SIZE = 1.5;
    const MAX_TRAIL_LENGTH = 20;
    const TRAIL_WIDTH = 150;

    const initDots = useCallback((width: number, height: number) => {
        const dots: Dot[] = [];
        const cols = Math.ceil(width / SPACING) + 2;
        const rows = Math.ceil(height / SPACING) + 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * SPACING;
                const y = row * SPACING;
                dots.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    size: DOT_BASE_SIZE,
                    baseSize: DOT_BASE_SIZE,
                });
            }
        }
        dotsRef.current = dots;
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update trail
        trailRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y, age: 0 });
        if (trailRef.current.length > MAX_TRAIL_LENGTH) {
            trailRef.current.shift();
        }

        trailRef.current.forEach(point => point.age++);
        trailRef.current = trailRef.current.filter(p => p.age < MAX_TRAIL_LENGTH);

        dotsRef.current.forEach((dot) => {
            let scale = 1;
            let opacity = 0.2; // Increased base opacity for visibility

            const dxMouse = mouseRef.current.x - dot.baseX;
            const dyMouse = mouseRef.current.y - dot.baseY;

            for (const point of trailRef.current) {
                const dx = point.x - dot.baseX;
                const dy = point.y - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < TRAIL_WIDTH) {
                    const factor = (1 - dist / TRAIL_WIDTH) * (1 - point.age / MAX_TRAIL_LENGTH);
                    scale = Math.max(scale, 1 + factor * 3);
                    opacity = Math.max(opacity, 0.5 + factor * 0.5); // Higher max opacity
                }
            }

            dot.size = dot.size + (dot.baseSize * scale - dot.size) * 0.1;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);

            if (opacity > 0.3) {
                // Active Color (Gold/Yellow)
                ctx.fillStyle = `rgba(245, 179, 1, ${opacity})`;
            } else {
                // Dormant Color based on theme
                if (theme === 'dark') {
                    // White/Light Blue for dark background - MORE VISIBLE NOW
                    ctx.fillStyle = `rgba(255, 255, 255, 0.15)`;
                } else {
                    // Deep Blue for light background
                    ctx.fillStyle = `rgba(11, 60, 93, 0.15)`;
                }
            }
            ctx.fill();
        });

        // Mouse glow for dark theme visibility
        if (theme === 'dark' && mouseRef.current.x > 0) {
            const gradient = ctx.createRadialGradient(
                mouseRef.current.x, mouseRef.current.y, 0,
                mouseRef.current.x, mouseRef.current.y, 150
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const rect = parent.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                initDots(canvas.width, canvas.height);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [animate, initDots]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    );
}
