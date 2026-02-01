'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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

      {/* Floating Capsule */}
      <header
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "flex items-center justify-between px-2 md:px-3 py-2",
          "rounded-full border border-white/10 shadow-2xl shadow-black/10",
          "backdrop-blur-3xl bg-[#1C2533]/80 supports-[backdrop-filter]:bg-[#1C2533]/80",
          isHidden ? "-translate-y-[200%] opacity-0" : "translate-y-0 opacity-100",
          isScrolled ? "w-[90%] md:w-[60rem]" : "w-[95%] md:w-[70rem]"
        )}
      >

        {/* Logo */}
        <Link
          href="/"
          className="ml-4 md:ml-6 font-heading text-lg md:text-2xl font-black tracking-tight text-white hover:text-[#F5B301] transition-colors whitespace-nowrap"
        >
          Kalam<span className="text-[#F5B301]">2k26</span>
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
                  isActive ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] font-semibold" : "text-white/70 hover:text-white hover:bg-white/5"
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
            className="hidden sm:block px-4 py-2.5 text-sm font-bold text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Login
          </button>

          {/* Register CTA */}
          <button
            onClick={() => openAuth('register')}
            className="hidden sm:flex items-center px-6 py-2.5 rounded-full font-bold text-sm transition-all bg-white text-[#1C2533] hover:bg-[#F5B301] hover:text-[#1C2533] hover:shadow-[0_0_20px_rgba(245,179,1,0.4)] cursor-pointer"
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
