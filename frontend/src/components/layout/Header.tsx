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
  const headerRef = useRef<HTMLElement>(null);
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 pointer-events-none">

      <header
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "shadow-[0_0_40px_rgba(245,179,1,0.15),0_8px_32px_rgba(11,60,93,0.4)]",
          "backdrop-blur-3xl bg-gradient-to-b from-[#0B3C5D]/95 to-[#0B3C5D]/90 supports-[backdrop-filter]:bg-[#0B3C5D]/90",
          "before:absolute before:inset-0 before:rounded-[1.5rem] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
          "relative",
          isHidden ? "-translate-y-[200%] opacity-0" : "translate-y-0 opacity-100",
          "w-[85%] md:w-auto",
          "rounded-[1.5rem] border border-[#F5B301]/30"
        )}
      >

        {/* Top Bar */}
        <div className="flex items-center justify-center md:justify-between px-3 md:px-6 py-1.5 w-full">
            {/* Logo - Centered on mobile, left on desktop */}
            <Link
              href="/"
              className="relative h-6 w-20 md:h-7 md:w-28 hover:opacity-80 transition-opacity"
            >
              <NextImage
                src="/kalam26-logo-hor-yellow.svg"
                alt="Kalam 2026"
                fill
                className="object-contain"
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
              {/* User Links (Cart & Orders) - Hidden on mobile, shown in bottom nav */}
              {userLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      isActive 
                        ? "text-[#0B3C5D] bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] font-bold" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}

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
            </div>
        </div>
        
      </header>
    </div>
  );
}
