'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const sponsors = [
    { name: 'TechGiant', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=TechGiant' },
    { name: 'CloudCorp', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=CloudCorp' },
    { name: 'InnovateAI', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=InnovateAI' },
    { name: 'DevStudio', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=DevStudio' },
    { name: 'FutureSystems', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=FutureSystems' },
    { name: 'QuantumBits', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=QuantumBits' },
    { name: 'CodeWorks', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=CodeWorks' },
    { name: 'DataFlow', logo: 'https://placehold.co/200x80/transparent/1C5D99?text=DataFlow' },
];

export function SponsorMarquee() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-10 bg-cream border-b border-black/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-6">
                <p className="text-center text-sm font-semibold tracking-[0.2em] uppercase text-neutral-dark/60">
                    Trusted by Industry Leaders
                </p>
            </div>

            <div
                className="relative flex overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-cream to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-cream to-transparent z-10 pointer-events-none" />

                <div
                    className="flex items-center gap-16 animate-marquee whitespace-nowrap"
                    style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
                >
                    {/* Triple loop for seamless infinite scroll */}
                    {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                        <div
                            key={index}
                            className="shrink-0 group cursor-pointer"
                        >
                            {/* Using simple text representation styled as logo for now if images fail, 
                                but img tag is used for placeholders */}
                            <div className="relative h-12 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 hover:scale-110">
                                {/* Fallback text if image doesn't load nicely or for semantic value */}
                                <span className="text-2xl font-black text-secondary-500 opacity-70 group-hover:opacity-100">{sponsor.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
