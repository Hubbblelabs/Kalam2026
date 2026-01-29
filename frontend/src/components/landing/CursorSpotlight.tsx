'use client';

import { useEffect, useRef, useCallback } from 'react';

interface CursorSpotlightProps {
    className?: string;
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

export function CursorSpotlight({ className = '' }: CursorSpotlightProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const trailRef = useRef<Point[]>([]);
    const dotsRef = useRef<Dot[]>([]);
    const animationRef = useRef<number | null>(null);

    // Configuration
    const SPACING = 16;
    const DOT_BASE_SIZE = 1.2;
    const MAX_TRAIL_LENGTH = 25;
    const TRAIL_WIDTH = 100;

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

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update trail
        trailRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y, age: 0 });
        if (trailRef.current.length > MAX_TRAIL_LENGTH) {
            trailRef.current.shift();
        }

        // Age points in trail
        trailRef.current.forEach(point => point.age++);
        // Remove old points
        trailRef.current = trailRef.current.filter(p => p.age < MAX_TRAIL_LENGTH);

        // Update and draw dots
        dotsRef.current.forEach((dot) => {
            // Calculate influence from trail (fluid effect)
            let scale = 1;
            let opacity = 0.1; // Base faint visibility

            // Check distance to current mouse first
            const dxMouse = mouseRef.current.x - dot.baseX;
            const dyMouse = mouseRef.current.y - dot.baseY;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            // Check distance to trail points for "flow"
            for (const point of trailRef.current) {
                const dx = point.x - dot.baseX;
                const dy = point.y - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < TRAIL_WIDTH) {
                    // Points closer to trail center and newer = stronger effect
                    const factor = (1 - dist / TRAIL_WIDTH) * (1 - point.age / MAX_TRAIL_LENGTH);
                    scale = Math.max(scale, 1 + factor * 2.5);
                    opacity = Math.max(opacity, 0.1 + factor * 0.8);
                }
            }

            // Smoothly interpolate size
            dot.size = dot.size + (dot.baseSize * scale - dot.size) * 0.1;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);

            // Color logic: Blue dots, becoming brighter/Yellow-ish near cursor
            if (opacity > 0.3) {
                // Active/hot dots
                ctx.fillStyle = `rgba(245, 179, 1, ${opacity})`; // Yellow/Gold
            } else {
                // Dormant dots
                ctx.fillStyle = `rgba(11, 60, 93, ${opacity})`; // Deep Blue
            }
            ctx.fill();
        });

        // Draw main cursor glow
        if (mouseRef.current.x > 0) {
            const gradient = ctx.createRadialGradient(
                mouseRef.current.x, mouseRef.current.y, 0,
                mouseRef.current.x, mouseRef.current.y, 100
            );
            gradient.addColorStop(0, 'rgba(29, 93, 153, 0.1)'); // Blue center glow
            gradient.addColorStop(1, 'rgba(245, 179, 1, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Optimized check needed if full fill is heavy? just fill rect around mouse

            // Custom Cursor
            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#F5B301'; // Yellow
            ctx.fill();
        }

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDots(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
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
