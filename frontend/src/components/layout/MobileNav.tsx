'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

interface MobileNavProps {
    isScrolled: boolean;
}

export function MobileNav({ isScrolled }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-white hover:text-accent' : 'text-primary hover:text-accent-600'}`}
                aria-label="Open menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Slide-out Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-primary z-50 transform transition-transform duration-300 ease-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <span className="font-heading text-xl font-bold text-white">Kalam 2026</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-white/70 hover:text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-6">
                    <ul className="space-y-4">
                        {navLinks.map((link, index) => (
                            <li
                                key={link.href}
                                className="transform transition-all duration-300"
                                style={{
                                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                                }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 text-lg font-medium text-white/80 hover:text-accent transition-colors border-b border-white/10"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <div
                        className="mt-8 transform transition-all duration-300"
                        style={{
                            transitionDelay: isOpen ? `${navLinks.length * 50}ms` : '0ms',
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                        }}
                    >
                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="block w-full btn-accent text-center rounded-xl"
                        >
                            Register Now
                        </Link>
                    </div>
                </nav>

                {/* Social Links */}
                <div className="absolute bottom-8 left-6 right-6">
                    <div className="flex justify-center gap-6">
                        {['instagram', 'twitter', 'linkedin'].map((social) => (
                            <a
                                key={social}
                                href={`https://${social}.com`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-accent transition-colors"
                            >
                                <span className="sr-only">{social}</span>
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                                    {social[0].toUpperCase()}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
