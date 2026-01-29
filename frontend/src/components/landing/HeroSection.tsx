'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CursorSpotlight } from './CursorSpotlight';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const scale = Math.max(0.85, 1 - scrollY / 3000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 pt-32">
      {/* Clean background */}
      {/* Clean background - Removed to show CursorSpotlight */}

      {/* Cursor Spotlight Effect with Interactive Dots */}
      <CursorSpotlight />

      {/* Floating 3D Element Container */}
      {/* 3D Element Removed for cleaner design */}

      {/* Content */}
      <div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{
          opacity,
          transform: `translateY(${scrollY * 0.15}px)`
        }}
      >
        {/* Venue Info */}
        <p
          className="font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-2 animate-fade-in"
          style={{ color: '#F5B301' }}
        >
          Sri Shakthi College, CBE
        </p>
        <p
          className="font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-6 animate-fade-in delay-100"
          style={{ color: '#1C5D99' }}
        >
          Presents
        </p>

        {/* Main title */}
        <h1
          className="font-heading text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tight animate-fade-in-up leading-[0.9]"
        >
          <span style={{ color: '#1C5D99' }}>Kalam</span>
          <span
            className="block md:inline"
            style={{
              background: 'linear-gradient(135deg, #F5B301 0%, #FFD633 50%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          > 2k26</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-10 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto animate-fade-in delay-200 font-semibold"
          style={{ color: '#2B89CF' }}
        >
          National Level Technical Symposium - Where Innovation Meets Inspiration
        </p>
        <p
          className="mt-3 text-base md:text-lg max-w-xl mx-auto animate-fade-in delay-300"
          style={{ color: '#6B7B8C' }}
        >
          Join us for the ultimate tech fest. Workshops, Hackathons, and more.
        </p>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up delay-300">
          <Link
            href="/register"
            className="group px-12 py-5 text-lg rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #F5B301 0%, #FFD633 50%, #FF8C00 100%)',
              color: '#1D1D1F',
              boxShadow: '0 15px 50px rgba(245, 179, 1, 0.4)'
            }}
          >
            Register Now
          </Link>
          <Link
            href="/events"
            className="px-12 py-5 text-lg rounded-full font-semibold transition-all duration-300 hover:bg-[#1C5D99] hover:text-white hover:scale-105"
            style={{
              color: '#1C5D99',
              border: '2px solid #1C5D99'
            }}
          >
            Explore Events
          </Link>
        </div>

        {/* Event date */}
        <div className="mt-20 animate-fade-in delay-400">
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: '#8B9BAC' }}>
            Save the Date
          </p>
          <p className="text-2xl md:text-4xl font-bold mt-3 tracking-tight" style={{ color: '#1C5D99' }}>
            March 15-17, 2026
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce-arrow">
        <div className="flex flex-col items-center gap-3" style={{ color: '#1C5D99' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Scroll</span>
          <div
            className="w-7 h-11 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: 'rgba(28, 93, 153, 0.3)' }}
          >
            <div
              className="w-1.5 h-3 rounded-full animate-bounce"
              style={{ background: '#F5B301' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
