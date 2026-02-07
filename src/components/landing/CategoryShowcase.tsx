'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Cpu, Code, Trophy, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    accentColor: 'blue' | 'orange' | 'yellow';
}

interface CategoryShowcaseProps {
    categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
    const [activeindex, setActiveIndex] = useState<number>(0);


    // Intersection Observer removed to prevent auto-expansion on scroll (user request: expand only on click)


    const colorMap = {
        blue: {
            bg: 'bg-[#1C5D99]',
            text: 'text-[#1C5D99]',
            gradient: 'from-[#1C5D99]/20 to-[#1C5D99]/5'
        },
        orange: {
            bg: 'bg-[#FF8C00]',
            text: 'text-[#FF8C00]',
            gradient: 'from-[#FF8C00]/20 to-[#FF8C00]/5'
        },
        yellow: {
            bg: 'bg-[#F5B301]',
            text: 'text-[#F5B301]',
            gradient: 'from-[#F5B301]/20 to-[#F5B301]/5'
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-[850px] lg:h-[500px] w-full transition-all duration-500">
            {categories.map((category, index) => {
                const isActive = activeindex === index;
                const colors = colorMap[category.accentColor];

                return (
                    <div
                        key={index}

                        className={cn(
                            "relative flex-1 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group border border-black/5",
                            isActive ? "flex-[3] lg:flex-[4]" : "hover:flex-[1.2]"
                        )}
                        onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* Background Image / Gradient */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                            colors.gradient,
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                        )} />

                        {/* Base white background for contrast */}
                        <div className="absolute inset-0 bg-white -z-10" />

                        {/* Content Container */}
                        <div className="relative h-full flex flex-col p-6 lg:p-10 justify-start lg:justify-between">

                            {/* Header: Icon & Title */}
                            <div className={cn("flex flex-col transition-all duration-500", isActive ? "gap-4" : "gap-1")}>
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                                    isActive ? cn(colors.bg, "text-white scale-110") : "bg-black/5 text-black/40 group-hover:bg-black/10"
                                )}>
                                    {category.icon}
                                </div>

                                <h3 className={cn(
                                    "font-heading font-bold text-2xl lg:text-4xl transition-all duration-500 origin-left whitespace-nowrap",
                                    isActive
                                        ? "text-[#1C2533] scale-100 translate-x-0 translate-y-0 rotate-0"
                                        : "text-[#1C2533]/40 rotate-0 translate-x-0 translate-y-0 lg:-rotate-90 lg:origin-top-left lg:translate-y-44 lg:translate-x-12"
                                )}>
                                    <span className={cn(
                                        "block transition-all duration-500",
                                    )}>
                                        {category.title}
                                    </span>
                                </h3>
                            </div>

                            {/* Expanded Content */}
                            <div className={cn(
                                "space-y-6 transition-opacity duration-500 mt-4 lg:mt-0",
                                isActive ? "opacity-100 relative" : "opacity-0 absolute bottom-0 left-0 right-0 p-6 lg:p-10 pointer-events-none"
                            )}>
                                <p className="text-base lg:text-lg text-[#6B7B8C] leading-relaxed max-w-md">
                                    {category.description}
                                </p>

                                <Link
                                    href={category.href}
                                    className={cn(
                                        "inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-full font-bold text-white transition-all hover:gap-3 sm:hover:gap-4 whitespace-nowrap text-sm sm:text-base w-fit",
                                        colors.bg
                                    )}
                                >
                                    Explore {category.title}
                                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                </Link>
                            </div>

                            {/* Collapsed Vertical Text for Desktop (Visual Aid for non-active items) */}
                            {!isActive && (
                                <div className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-6 h-6 text-black/20" />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
