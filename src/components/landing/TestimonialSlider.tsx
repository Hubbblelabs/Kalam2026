'use client';

import { useRef, useEffect, useState } from 'react';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    avatar?: string;
    skills: string[];
}

const testimonials: Testimonial[] = [
    {
        name: 'Priya Sharma',
        role: 'CS Student, IIT Delhi',
        content: 'The hackathon at Kalam was life-changing! I met my co-founders here and we\'ve been building ever since.',
        skills: ['React', 'Node.js', 'AI/ML']
    },
    {
        name: 'Rahul Verma',
        role: 'Design Lead, TechCorp',
        content: 'Best workshops I\'ve attended. The mentors were incredibly helpful and the networking was amazing.',
        skills: ['Figma', 'UI/UX', 'Motion']
    },
    {
        name: 'Ananya Patel',
        role: 'ML Engineer, DataSci',
        content: 'Won my first hackathon here! The experience taught me more than a semester of coursework.',
        skills: ['Python', 'TensorFlow', 'Data']
    },
    {
        name: 'Vikram Singh',
        role: 'Founder, StartupXYZ',
        content: 'The exposure to industry experts and cutting-edge tech made Kalam a must-attend event.',
        skills: ['Web3', 'Blockchain', 'Smart Contracts']
    },
    {
        name: 'Sneha Reddy',
        role: 'Product Manager, Meta',
        content: 'From participant to speaker - Kalam has been part of my journey for 5 years now.',
        skills: ['Product', 'Strategy', 'Growth']
    },
    {
        name: 'Arjun Kumar',
        role: 'Full Stack Dev, Google',
        content: 'The connections I made at Kalam led directly to my dream job. Forever grateful!',
        skills: ['Go', 'Kubernetes', 'Cloud']
    }
];

export function TestimonialSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || isPaused) return;

        let animationId: number;
        let scrollPosition = 0;

        const scroll = () => {
            scrollPosition += 0.5;
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }
            scrollContainer.scrollLeft = scrollPosition;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <section className="section-padding overflow-hidden">
            <div className="container-custom mb-12">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-text text-center">
                    What Past Attendees Say
                </h2>
                <p className="text-text-muted text-center mt-4 max-w-2xl mx-auto">
                    Hear from students and professionals who transformed their careers at Kalam
                </p>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-hidden no-scrollbar py-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ perspective: '1000px' }}
            >
                {/* Double the testimonials for seamless infinite scroll */}
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[350px] md:w-[400px] glass-card rounded-2xl p-6 transition-all duration-500"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            transform: hoveredIndex === index
                                ? 'translateY(-12px) scale(1.02) rotateX(2deg)'
                                : 'translateY(0) scale(1) rotateX(0deg)',
                            boxShadow: hoveredIndex === index
                                ? '0 25px 50px -12px rgba(28, 93, 153, 0.25), 0 0 0 1px rgba(28, 93, 153, 0.1)'
                                : '0 8px 32px rgba(0, 0, 0, 0.08)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                            {/* Avatar with animation */}
                            <div
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold transition-transform duration-500"
                                style={{
                                    transform: hoveredIndex === index ? 'scale(1.15) rotate(6deg)' : 'scale(1)',
                                    boxShadow: hoveredIndex === index
                                        ? '0 8px 20px rgba(28, 93, 153, 0.4)'
                                        : '0 4px 10px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h4
                                    className="font-semibold text-text transition-colors duration-300"
                                    style={{ color: hoveredIndex === index ? '#1C5D99' : undefined }}
                                >
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm text-text-muted">{testimonial.role}</p>
                            </div>
                        </div>

                        {/* Content with quote marks */}
                        <div className="relative">
                            <span
                                className="absolute -top-2 -left-1 text-4xl text-[#F5B301]/30 font-serif leading-none transition-all duration-300"
                                style={{
                                    transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)',
                                    opacity: hoveredIndex === index ? 0.6 : 0.3,
                                }}
                            >
                                &quot;
                            </span>
                            <p className="text-text-muted leading-relaxed mb-4 pl-4">
                                {testimonial.content}
                            </p>
                        </div>

                        {/* Skills/Interests with staggered animation */}
                        <div className="flex flex-wrap gap-2">
                            {testimonial.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                                    style={{
                                        backgroundColor: hoveredIndex === index
                                            ? 'rgba(28, 93, 153, 0.15)'
                                            : 'rgba(11, 60, 93, 0.1)',
                                        color: hoveredIndex === index ? '#1C5D99' : '#0B3C5D',
                                        transform: hoveredIndex === index
                                            ? `translateY(-2px) translateX(${i * 2}px)`
                                            : 'translateY(0)',
                                        transitionDelay: `${i * 50}ms`,
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Decorative corner accent */}
                        <div
                            className="absolute top-0 right-0 w-20 h-20 pointer-events-none transition-opacity duration-500"
                            style={{
                                background: 'radial-gradient(circle at top right, rgba(245, 179, 1, 0.2) 0%, transparent 70%)',
                                opacity: hoveredIndex === index ? 1 : 0,
                                borderRadius: '0 1rem 0 0',
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
