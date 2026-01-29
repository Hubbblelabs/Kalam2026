'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollSectionProps {
    children: ReactNode;
    animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
    delay?: number;
    className?: string;
}

export function ScrollSection({
    children,
    animation = 'fade-up',
    delay = 0,
    className = ''
}: ScrollSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const animationMap = {
        'fade-up': 'animate-fade-in-up',
        'fade-in': 'animate-fade-in',
        'slide-left': 'animate-slide-in-left',
        'slide-right': 'animate-slide-in-right',
        'scale': 'animate-scale-in'
    };

    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? animationMap[animation] : 'opacity-0'}`}
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
}
