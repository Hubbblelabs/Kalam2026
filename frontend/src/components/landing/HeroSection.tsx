'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Play, Sparkles } from 'lucide-react';
import { CursorSpotlight } from './CursorSpotlight';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 800);
  const scale = 1 + scrollY * 0.0005;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#Fdfdf8] text-[#1C2533] pt-20"
      style={{ perspective: '1000px' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F5B301]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#1C5D99]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <CursorSpotlight />

      {/* Main Content */}
      <div 
        className="relative z-10 w-full max-w-[95%] mx-auto flex flex-col items-center justify-center text-center"
        style={{
          opacity,
          transform: `scale(${Math.max(0.9, 1 - scrollY / 5000)})`
        }}
      >
        {/* Top Tagline */}
        <div className="overflow-hidden mb-4">
          <div className="flex items-center gap-3 animate-slide-up opacity-0 relative" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="h-[1px] w-8 bg-[#1C5D99]" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1C5D99]">
              Reimagining The Future
            </span>
            <span className="h-[1px] w-8 bg-[#1C5D99]" />
          </div>
        </div>

        {/* Massive Typography */}
        <div className="relative font-heading font-black tracking-tighter leading-[0.85] select-none">
          {/* Row 1 */}
          <h1 className="flex flex-wrap justify-center gap-[0.15em] text-[15vw] md:text-[13rem] lg:text-[16rem]">
            <span className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              KALAM
            </span>
{/* Image Pill Removed */}
            <span className="animate-fade-in-up opacity-0 text-[#1C5D99]" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              2K26
            </span>
          </h1>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-4 md:mt-0">
             <div 
              className="h-[1px] bg-[#1C2533] w-12 md:w-32 animate-width opacity-0"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            />
            <p 
              className="text-xl md:text-3xl font-light italic text-[#5AA7DE] max-w-2xl text-center leading-tight animate-fade-in opacity-0"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              Where Innovation Meets Inspiration
            </p>
            <div 
              className="h-[1px] bg-[#1C2533] w-12 md:w-32 animate-width opacity-0"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            />
          </div>
        </div>

        {/* Interactive CTA Section */}
        <div 
          className="mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <Link
            href="/register"
            className="group relative px-10 py-5 bg-[#1C2533] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative flex items-center gap-3 font-medium text-lg">
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/events"
            className="group px-10 py-5 rounded-full border border-[#1C2533]/10 hover:border-[#F5B301] bg-white transition-all hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-3 font-medium text-lg text-[#1C2533]">
              <Globe className="w-5 h-5" />
              <span>Explore Events</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Floating Elements - Parallax */}
      <div className="absolute top-1/4 left-10 md:left-20 animate-float-slow opacity-60 hidden lg:block perspective-[1000px]">
        {/* Abstract 3D shape: Floating Cube/prism representation using gradients */}
        <div 
          className="w-20 h-20 relative transform rotate-12 transition-transform hover:scale-110 duration-500"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5B301]/20 to-[#F5B301]/5 rounded-xl backdrop-blur-md border border-[#F5B301]/20 shadow-[0_8px_32px_0_rgba(245,179,1,0.1)]" />
          <div className="absolute inset-0 bg-[#F5B301]/10 rounded-xl transform translate-z-4 translate-x-2 translate-y-2" />
        </div>
      </div>
      
      <div 
        className="absolute bottom-1/4 right-10 md:right-20 animate-float opacity-60 hidden lg:block" 
        style={{ animationDelay: '1s' }}
      >
        {/* Abstract 3D shape: Sphere representation */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1C5D99]/20 via-[#1C5D99]/5 to-transparent backdrop-blur-sm border border-[#1C5D99]/10 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent opacity-50" />
           <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-[#1C5D99]/10 blur-xl" />
        </div>
      </div>

      {/* Modern Grid Background Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(28,93,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,93,153,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" 
      />

    </section>
  );
}
