'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleFooterVisibility = (e: CustomEvent<boolean>) => {
      setIsHidden(e.detail);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('footer-visibility-change', handleFooterVisibility as EventListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('footer-visibility-change', handleFooterVisibility as EventListener);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'} ${isScrolled
        ? 'bg-primary/95 backdrop-blur-md shadow-lg py-2 sm:py-3'
        : 'bg-transparent py-3 sm:py-5'
        }`}
    >
      <div className="container-custom flex items-center justify-between px-4 sm:px-6">
        {/* Logo - Responsive sizing */}
        <Link
          href="/"
          className={`font-heading text-lg sm:text-xl md:text-2xl font-bold transition-colors ${isScrolled ? 'text-white hover:text-accent' : 'text-primary hover:text-accent-600'}`}
        >
          Kalam<span className="text-accent">2k26</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${isScrolled ? 'text-white/80 hover:text-accent' : 'text-primary/80 hover:text-secondary'}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side - CTA + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Login link - desktop only */}
          <Link
            href="/login"
            className={`hidden md:block text-sm font-medium transition-colors ${isScrolled ? 'text-white/80 hover:text-accent' : 'text-primary hover:text-accent-600'}`}
          >
            Login
          </Link>

          {/* Register CTA - Hidden on small mobile, visible on larger screens */}
          <Link
            href="/register"
            className={`hidden sm:flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all ${isScrolled
              ? 'bg-accent text-text hover:bg-accent-400'
              : 'bg-primary text-white hover:bg-primary-700 shadow-md'
              }`}
          >
            <span className="hidden sm:inline">Register</span>
            <span className="sm:hidden">Sign Up</span>
          </Link>

          {/* Mobile Navigation */}
          <MobileNav isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}
