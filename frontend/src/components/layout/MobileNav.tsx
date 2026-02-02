'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Linkedin, Twitter, X } from 'lucide-react';

const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="w-6 h-6" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-6 h-6" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-6 h-6" /> },
];

interface NavLink {
    href: string;
    label: string;
}

interface MobileNavProps {
    navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // Handle client-side mounting for portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const overlayContent = (
        <div
            className={cn(
                "fixed inset-0 z-[100] md:hidden transition-all duration-300",
                isOpen 
                    ? "visible opacity-100 pointer-events-auto" 
                    : "invisible opacity-0 pointer-events-none"
            )}
        >
            {/* Solid background layer to prevent content bleeding through */}
            <div className="absolute inset-0 bg-[#0B3C5D]" />
            {/* Background Decor */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#F5B301]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-[#1C5D99]/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Close Button - Inside portal for proper z-index */}
            <button
                onClick={() => setIsOpen(false)}
                className="fixed top-4 right-4 z-[110] w-12 h-12 flex flex-col items-center justify-center gap-1.5"
                aria-label="Close menu"
            >
                <div className="w-8 h-1 rounded-full bg-white rotate-45 translate-y-2.5 transition-all duration-300" />
                <div className="w-8 h-1 rounded-full bg-white opacity-0 transition-all duration-300" />
                <div className="w-8 h-1 rounded-full bg-white -rotate-45 -translate-y-2.5 transition-all duration-300" />
            </button>

            {/* Content Container */}
            <div className="h-full w-full flex flex-col justify-between px-6 pt-24 pb-12 overflow-y-auto relative">
                {/* Brand Logo */}
                <div className="absolute top-6 left-6 w-32 h-10">
                    <NextImage
                        src="/kalam26-logo-hor-yellow.svg"
                        alt="Kalam 2026"
                        fill
                        className="object-contain object-left"
                    />
                </div>

                {/* Navigation - GIANT TYPOGRAPHY */}
                <nav className="flex flex-col gap-6">
                    {navLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "font-heading font-black text-5xl sm:text-6xl tracking-tight transition-all duration-500 transform uppercase",
                                    isActive ? "text-[#F5B301]" : "text-white/40 hover:text-[#F5B301]",
                                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                                )}
                                style={{ transitionDelay: `${100 + (index * 50)}ms` }}
                            >
                                {link.label}
                                {isActive && <span className="inline-block ml-4 w-3 h-3 rounded-full bg-[#F5B301] align-middle animate-pulse" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section: Auth & Social */}
                <div
                    className={cn(
                        "flex flex-col gap-8 transition-all duration-700 transform",
                        isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    )}
                    style={{ transitionDelay: '300ms' }}
                >
                    {/* Auth Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center py-4 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center py-4 rounded-full bg-[#F5B301] text-[#0B3C5D] font-bold text-lg hover:bg-white hover:text-[#0B3C5D] transition-all shadow-lg shadow-[#F5B301]/20"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                        <span className="text-white/30 font-medium text-sm tracking-widest uppercase">Follow Us</span>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:text-white hover:bg-[#1C5D99] transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Animated Hamburger Button - stays in header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <div className={cn(
                    "w-8 h-1 rounded-full transition-all duration-300 transform origin-center",
                    isOpen ? "rotate-45 translate-y-2.5 bg-white" : "bg-[#F5B301]"
                )} />
                <div className={cn(
                    "w-8 h-1 rounded-full transition-all duration-300",
                    isOpen ? "opacity-0" : "bg-[#F5B301]"
                )} />
                <div className={cn(
                    "w-8 h-1 rounded-full transition-all duration-300 transform origin-center",
                    isOpen ? "-rotate-45 -translate-y-2.5 bg-white" : "bg-[#F5B301]"
                )} />
            </button>

            {/* Portal the overlay to document.body to escape header's stacking context */}
            {mounted && createPortal(overlayContent, document.body)}
        </>
    );
}
