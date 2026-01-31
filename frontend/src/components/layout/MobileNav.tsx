'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
    )},
    { name: 'Twitter', href: 'https://twitter.com', icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
    )},
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    )},
];

interface MobileNavProps {
    isScrolled: boolean;
}

export function MobileNav({ isScrolled }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <>
            {/* Animated Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors z-[70] ${
                    isScrolled ? 'text-white' : 'text-primary'
                }`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <span
                    className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                />
                <span
                    className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? 'opacity-0' : ''
                    }`}
                />
                <span
                    className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                        isOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                />
            </button>

            {/* Full Screen Navigation Overlay */}
            <div
                className={`fixed inset-0 bg-gradient-to-br from-[#0B3C5D] via-[#0a2d42] to-[#051d2e] z-[60] transition-all duration-500 md:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="h-full w-full flex flex-col items-center justify-center px-8">
                    {/* Navigation Links */}
                    <nav className="w-full max-w-md">
                        <ul className="space-y-3">
                            {navLinks.map((link, index) => (
                                <li
                                    key={link.href}
                                    className="transform transition-all duration-500"
                                    style={{
                                        transitionDelay: isOpen ? `${index * 60}ms` : '0ms',
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0)' : 'translateY(-30px)'
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-4 text-center text-3xl font-semibold text-white/90 hover:text-accent transition-all duration-300 relative group"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-20" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Auth Buttons */}
                        <div
                            className="mt-12 space-y-4 w-full transform transition-all duration-500"
                            style={{
                                transitionDelay: isOpen ? `${navLinks.length * 80}ms` : '0ms',
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateY(0)' : 'translateY(-20px)'
                            }}
                        >
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full px-8 py-4 text-center text-lg font-semibold text-white bg-white/5 hover:bg-white/15 border border-white/20 rounded-2xl transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="block w-full px-8 py-4 text-center text-lg font-semibold text-[#0B3C5D] bg-accent hover:bg-accent-400 rounded-2xl transition-all duration-300 shadow-2xl shadow-accent/40"
                            >
                                Register Now
                            </Link>
                        </div>
                    </nav>

                    {/* Social Links */}
                    <div
                        className="absolute bottom-10 left-0 right-0 transform transition-all duration-500"
                        style={{
                            transitionDelay: isOpen ? `${(navLinks.length + 1) * 80}ms` : '0ms',
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                        }}
                    >
                        <p className="text-xs text-white/40 mb-4 text-center uppercase tracking-wider">Follow Us</p>
                        <div className="flex justify-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent border border-white/10 hover:border-accent hover:scale-110 text-white/60 hover:text-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}