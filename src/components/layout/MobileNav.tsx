'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="w-5 h-5" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
];

export interface NavLink {
    href: string;
    label: string;
}

export function MobileToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className="md:hidden relative group w-12 h-12 flex items-center justify-center focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
            {/* Hover Background/Glow */}
            <div className={cn(
                "absolute inset-0 rounded-full transition-all duration-300 ease-out",
                isOpen ? "bg-accent-500/10 scale-100" : "bg-white/0 scale-75 group-hover:bg-white/10 group-hover:scale-100"
            )} />

            {/* Icon Container */}
            <div className="w-5 h-[14px] relative z-10">
                {/* Inner rotating container */}
                <div className={cn(
                    "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "rotate-90" : "rotate-0"
                )}>
                    {/* Top span */}
                    <span className="absolute left-0 right-0 top-0 block">
                        {/* Top-left segment */}
                        <span className={cn(
                            "absolute left-0 top-0 block w-[47%] h-[2px] rounded-full origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isOpen
                                ? "bg-accent-500 rotate-45 translate-x-[2.2px] -translate-y-[3px] scale-x-105"
                                : "bg-white group-hover:bg-accent-500 translate-x-px scale-x-110"
                        )} />
                        {/* Top-right segment */}
                        <span className={cn(
                            "absolute right-0 top-0 block w-[47%] h-[2px] rounded-full origin-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isOpen
                                ? "bg-accent-500 -rotate-45 -translate-x-[2.2px] -translate-y-[3px] scale-x-105"
                                : "bg-white group-hover:bg-accent-500 -translate-x-px scale-x-110"
                        )} />
                    </span>

                    {/* Bottom span */}
                    <span className="absolute left-0 right-0 bottom-0 block">
                        {/* Bottom-left segment */}
                        <span className={cn(
                            "absolute left-0 bottom-0 block w-[47%] h-[2px] rounded-full origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isOpen
                                ? "bg-accent-500 -rotate-45 translate-x-[2.2px] translate-y-[3px] scale-x-105"
                                : "bg-white group-hover:bg-accent-500 translate-x-px scale-x-110"
                        )} />
                        {/* Bottom-right segment */}
                        <span className={cn(
                            "absolute right-0 bottom-0 block w-[47%] h-[2px] rounded-full origin-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isOpen
                                ? "bg-accent-500 rotate-45 -translate-x-[2.2px] translate-y-[3px] scale-x-105"
                                : "bg-white group-hover:bg-accent-500 -translate-x-px scale-x-110"
                        )} />
                    </span>
                </div>

                {/* Left circular arc SVG */}
                <svg
                    viewBox="0 0 44 44"
                    className={cn(
                        "absolute left-1/2 top-1/2 -ml-[22px] -mt-[22px] w-11 h-11",
                        "fill-none stroke-2 stroke-white group-hover:stroke-accent-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "stroke-accent-500!"
                    )}
                    style={{
                        strokeLinecap: 'round',
                        strokeDasharray: isOpen ? '0 82.801 62 82.801' : '0 82.801 8 82.801',
                        strokeDashoffset: isOpen ? '62' : '82.801',
                        transform: isOpen ? 'scale(1) rotate(90deg)' : 'scale(1) rotate(0deg)',
                    }}
                >
                    <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22" />
                </svg>

                {/* Right circular arc SVG */}
                <svg
                    viewBox="0 0 44 44"
                    className={cn(
                        "absolute left-1/2 top-1/2 -ml-[22px] -mt-[22px] w-11 h-11",
                        "fill-none stroke-2 stroke-white group-hover:stroke-accent-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "stroke-accent-500!"
                    )}
                    style={{
                        strokeLinecap: 'round',
                        strokeDasharray: isOpen ? '0 82.801 62 82.801' : '0 82.801 8 82.801',
                        strokeDashoffset: isOpen ? '62' : '82.801',
                        transform: isOpen ? 'scale(1) rotate(270deg)' : 'scale(1) rotate(180deg)',
                    }}
                >
                    <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22" />
                </svg>
            </div>
        </button>
    );
}

export function MobileMenu({ isOpen, navLinks, onClose }: { isOpen: boolean; navLinks: NavLink[]; onClose: () => void }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col px-6 pb-8 pt-4 gap-8">
            <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={cn(
                                "text-3xl font-bold transition-all duration-300 transform block text-center",
                                isActive ? "text-accent-500" : "text-white/80 hover:text-white hover:translate-x-2",
                                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                            )}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Auth & Social */}
            <div
                className={cn(
                    "flex flex-col gap-6 transition-all duration-500",
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: '200ms' }}
            >
                <div className="h-px w-full bg-white/10" />

                <div className="grid grid-cols-2 gap-3">
                    <Link
                        href="/login"
                        onClick={onClose}
                        className="flex items-center justify-center py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        onClick={onClose}
                        className="flex items-center justify-center py-3 rounded-xl bg-accent-500 text-primary font-bold hover:bg-white hover:text-primary transition-all"
                    >
                        Register
                    </Link>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium uppercase tracking-wider">Follow Us</span>
                    <div className="flex gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:bg-white/10 hover:text-accent-500 transition-all"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
