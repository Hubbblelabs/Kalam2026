'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ShoppingCart, Package, Calendar, Home, Instagram, Linkedin, Twitter, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/orders', label: 'Orders', icon: Package },
];

const moreLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/sponsors', label: 'Sponsors' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="w-5 h-5" /> },
  { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" /> },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const { openAuth } = useAuth();

  useEffect(() => {
    if (isMoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMoreOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const offset = currentY - dragStartY;
    if (offset > 0) {
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      setIsMoreOpen(false);
    }
    setDragOffset(0);
    setDragStartY(0);
  };



  return (
    <>
      {/* Backdrop Blur */}
      {isMoreOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {/* Bottom Navigation Container */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-2 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md relative">
          {/* Unified Container - Always visible */}
          <div
            ref={sheetRef}
            className={cn(
              "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden",
              "bg-[#0B3C5D] rounded-[2rem] border border-white/10 shadow-lg"
            )}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Menu Content - Hidden when closed */}
            <div
              className={cn(
                "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isMoreOpen ? "opacity-100 max-h-[65vh]" : "opacity-0 max-h-0 overflow-hidden"
              )}
            >
              {/* Drag Handle */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-6 pb-6">
                {/* Links */}
                <nav className="flex flex-col gap-2 mb-6">
                  {moreLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={cn(
                          "text-xl font-bold py-3 px-4 rounded-xl transition-all duration-300",
                          isActive
                            ? "text-[#F5B301] bg-[#F5B301]/10"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Social Links */}
                <div className="mb-6">
                  <div className="h-px w-full bg-white/10 mb-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm font-medium uppercase tracking-wider">Follow Us</span>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:bg-white/10 hover:text-[#F5B301] transition-all"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setIsMoreOpen(false);
                        openAuth('login');
                      }}
                      className="py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsMoreOpen(false);
                        openAuth('register');
                      }}
                      className="py-3 rounded-xl bg-[#F5B301] text-[#0B3C5D] font-bold hover:bg-white transition-all"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation Icons - Always visible */}
            <div className="grid grid-cols-5 h-[68px] px-3 py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center transition-all duration-300"
                    )}
                  >
                    <div className={cn(
                      "relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300",
                      isActive
                        ? "bg-[#F5B301]/15 text-[#F5B301] shadow-[0_0_12px_rgba(245,179,1,0.2)]"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                    )}>
                      <Icon className={cn(
                        "transition-all duration-300",
                        isActive ? "w-5 h-5" : "w-5 h-5"
                      )} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium transition-all duration-300",
                      isActive ? "text-[#F5B301] font-semibold" : "text-white/60"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* More Button */}
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 transition-all duration-300"
                )}
              >
                <div className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300",
                  isMoreOpen
                    ? "bg-[#F5B301]/15 text-[#F5B301] shadow-[0_0_12px_rgba(245,179,1,0.2)]"
                    : "text-white/60 hover:text-white/90 hover:bg-white/5"
                )}>
                  <MoreHorizontal className={cn(
                    "transition-all duration-300",
                    isMoreOpen ? "w-5 h-5" : "w-5 h-5"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium transition-all duration-300",
                  isMoreOpen ? "text-[#F5B301] font-semibold" : "text-white/60"
                )}>
                  More
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
