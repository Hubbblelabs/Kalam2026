'use client';

import Link from 'next/link';

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
    const accentStyles = {
        blue: 'from-primary to-secondary',
        orange: 'from-accent-orange to-accent',
        yellow: 'from-accent to-accent-400'
    };

    return (
        <Link
            href={href}
            className="group relative block"
        >
            <div className="glass-card rounded-2xl p-8 card-hover overflow-hidden">
                {/* Gradient accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentStyles[accentColor]}`} />

                {/* Pixel art decoration in corner */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-sm ${i % 3 === 0 ? 'bg-primary' : 'bg-transparent'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform">
                    {icon}
                </div>

                {/* Title */}
                <h4 className="font-heading text-2xl font-bold text-text mb-3">
                    {title}
                </h4>

                {/* Description */}
                <p className="text-text-muted leading-relaxed mb-6">
                    {description}
                </p>

                {/* Enter CTA */}
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    <span>Enter</span>
                    <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${accentStyles[accentColor]} opacity-10`} />
                </div>
            </div>
        </Link>
    );
}
