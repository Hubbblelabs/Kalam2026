'use client';

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
    // Map accent colors to hex values for inline styles if needed, 
    // or just use them for subtle border/bg classes.
    const colorMap = {
        blue: '#1C5D99',
        orange: '#FF8C00',
        yellow: '#F5B301'
    };

    return (
        <Link
            href={href}
            className="group relative flex flex-col h-full bg-white rounded-[2rem] p-8 border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 overflow-hidden"
        >
            {/* Hover Gradient Background */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${colorMap[accentColor]}, transparent 70%)` }}
            />

            {/* Header: Icon + Arrow */}
            <div className="flex justify-between items-start mb-8">
                <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                    style={{ backgroundColor: colorMap[accentColor] }}
                >
                    {icon}
                </div>
                
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
                <h4 className="font-heading text-3xl font-bold text-[#1C2533] mb-3 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {title}
                </h4>
                <p className="text-[#6B7B8C] text-lg leading-relaxed group-hover:text-[#1C2533] transition-colors duration-300">
                    {description}
                </p>
            </div>
            
            {/* Decorative background shape */}
            <div 
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: colorMap[accentColor] }}
            />
        </Link>
    );
}
