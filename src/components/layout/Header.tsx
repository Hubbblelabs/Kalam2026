'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { ShoppingCart, Package, User, LogOut } from 'lucide-react';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const lastScrollY = useRef(0);


  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
          setIsLoggedIn(false);
          return;
        }
        const data = await res.json();
        if (data.success && data.data?.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

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

    const handleAuthChange = () => {
      checkSession();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('footer-visibility-change', handleFooterVisibility as EventListener);
    window.addEventListener('auth-change', handleAuthChange as EventListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('footer-visibility-change', handleFooterVisibility as EventListener);
      window.removeEventListener('auth-change', handleAuthChange as EventListener);
    };
  }, []);

  // Re-check session when pathname changes
  useEffect(() => {
    const recheckSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
          setIsLoggedIn(false);
          return;
        }
        const data = await res.json();
        if (data.success && data.data?.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Session recheck failed:', error);
      }
    };

    recheckSession();
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      window.dispatchEvent(new CustomEvent('auth-change'));
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 md:pt-4 pointer-events-none">
      <header
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "relative flex items-center",
          isHidden ? "-translate-y-[200%] opacity-0" : "translate-y-0 opacity-100",
          // Responsive width and padding
          "w-[95%] max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3",
          "rounded-2xl border border-white/10 shadow-lg",
          "bg-primary",
          isScrolled ? "border-accent-500/20" : ""

        )}
      >
        {/* Logo Section */}
        <div className="shrink-0 flex items-center mr-12">
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
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-accent-500" : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                {/* Active Indicator */}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-accent-500 transition-all duration-300",
                  isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-3 md:gap-6">
          {/* User Icons (Cart/Orders) */}
          <div className="hidden xl:flex items-center gap-1 border-r border-white/10 pr-4">
            {userLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive ? "bg-white/10 text-accent-500" : "text-white/70 hover:text-white hover:bg-white/5"
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
          <div className="flex items-center gap-2">
            {!isLoading && (
              isLoggedIn ? (
                <>
                  <Link
                    href="/account"
                    className="hidden sm:flex items-center gap-2 pr-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Account
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold tracking-wide transition-all duration-300 whitespace-nowrap",
                      "text-xs sm:text-sm",
                      "bg-red-500/10 text-red-400 border border-red-500/20",
                      "hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30"
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:block px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={cn(
                      "px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold tracking-wide transition-all duration-300",
                      "text-xs sm:text-sm",
                      "bg-accent-500 text-primary shadow-[0_0_15px_rgba(245,179,1,0.3)]",
                      "hover:bg-accent-400 hover:shadow-[0_0_25px_rgba(245,179,1,0.5)] hover:-translate-y-0.5"
                    )}
                  >
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
