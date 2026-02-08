'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, Package } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const userLinks = [
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/orders', label: 'Orders', icon: Package },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const { openAuth } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/Hide logic for navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;

      // Style logic for scrolled state
      setIsScrolled(currentScrollY > 20);
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 md:pt-4 pointer-events-none">
      <header
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "relative flex items-center justify-between",
          isHidden ? "-translate-y-[200%] opacity-0" : "translate-y-0 opacity-100",
          // Responsive width and padding
          "w-[95%] max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3",
          "rounded-2xl border border-white/10 shadow-lg",
          "bg-[#0B3C5D]",
          isScrolled ? "border-[#F5B301]/20" : ""

        )}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            href="/"
            className="relative h-8 w-28 md:h-10 md:w-36 hover:opacity-90 transition-opacity"
          >
            <NextImage
              src="/kalam26-logo-hor-yellow.svg"
              alt="Kalam 2026 Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 112px, 144px"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden xl:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-[#F5B301]" : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                {/* Active Indicator */}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#F5B301] transition-all duration-300",
                  isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* User Icons (Cart/Orders) */}
          <div className="hidden xl:flex items-center gap-2 border-r border-white/10 pr-4 mr-1">
            {userLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200",
                    isActive ? "bg-white/10 text-[#F5B301]" : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                  title={link.label}
                >
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                  {isActive && <span className="text-xs font-medium">{link.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuth('login')}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => openAuth('register')}
              className={cn(
                "px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold tracking-wide transition-all duration-300",
                "text-xs sm:text-sm",
                "bg-[#F5B301] text-[#0B3C5D] shadow-[0_0_15px_rgba(245,179,1,0.3)]",
                "hover:bg-[#FFD700] hover:shadow-[0_0_25px_rgba(245,179,1,0.5)] hover:-translate-y-0.5"
              )}
            >
              Register
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
