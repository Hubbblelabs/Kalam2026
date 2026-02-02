'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

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
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const { openAuth } = useAuth(); // Use auth context

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/Hide logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;

      // Style logic
      setIsScrolled(currentScrollY > 20);
    };

    const handleFooterVisibility = (e: CustomEvent<boolean>) => {
      // If footer is visible, hide navbar to avoid clash
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 md:pt-6 pointer-events-none">

      <header
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "flex items-center justify-between px-2 md:px-3 py-2",
          "rounded-full border border-[#F5B301]/30 shadow-2xl shadow-[#0B3C5D]/20",
          "backdrop-blur-3xl bg-[#0B3C5D]/90 supports-[backdrop-filter]:bg-[#0B3C5D]/90",
          isHidden ? "-translate-y-[200%] opacity-0" : "translate-y-0 opacity-100",
          isScrolled ? "w-[90%] md:w-[60rem]" : "w-[95%] md:w-[70rem]"
        )}
      >

        {/* Logo */}
        <Link
          href="/"
          className="ml-4 md:ml-6 relative h-8 w-28 md:w-32 hover:opacity-80 transition-opacity"
        >
          <NextImage
            src="/kalam26-logo-hor-yellow.svg"
            alt="Kalam 2026"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation - Clean Glass Style */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  isActive ? "text-[#0B3C5D] bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] font-bold" : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 mr-1">
          {/* Login Link */}
          <button
            onClick={() => openAuth('login')}
            className="hidden sm:block px-4 py-2.5 text-sm font-bold text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            Login
          </button>

          {/* Register CTA */}
          <button
            onClick={() => openAuth('register')}
            className="hidden sm:flex items-center px-6 py-2.5 rounded-full font-bold text-sm transition-all bg-[#F5B301] text-[#0B3C5D] hover:bg-white hover:text-[#0B3C5D] hover:shadow-[0_0_20px_rgba(245,179,1,0.4)] cursor-pointer"
          >
            Register
          </button>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <MobileNav navLinks={navLinks} />
          </div>
        </div>
      </header>
    </div>
  );
}
