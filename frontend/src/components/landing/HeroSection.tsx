'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight, Globe } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { CursorSpotlight } from './CursorSpotlight';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark as loaded after mount for animations
    setIsLoaded(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 800);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#Fdfdf8] text-[#1C2533] pt-20"
      style={{ perspective: '1000px' }}
    >
      {/* Background Elements */}
      <CursorSpotlight />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F5B301]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#1C5D99]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 w-full max-w-[95%] mx-auto flex flex-col items-center justify-center text-center"
        style={{
          opacity,
          transform: `scale(${Math.max(0.9, 1 - scrollY / 5000)})`
        }}
      >
        {/* Top Tagline */}
        <div className="overflow-hidden mt-8 md:mt-12 mb-4">
          <div
            className={`flex items-center gap-3 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="h-[1px] w-8 bg-[#1C5D99]" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1C5D99]">
              Reimagining The Future
            </span>
            <span className="h-[1px] w-8 bg-[#1C5D99]" />
          </div>
        </div>


        {/* Massive Typography with stagger animation */}
        <div className="relative font-heading font-black tracking-tighter leading-[0.85] select-none">
          {/* Row 1 */}
          <h1 className="flex flex-wrap justify-center gap-[0.15em] text-[15vw] md:text-[13rem] lg:text-[16rem]">
            <span
              className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.2s' }}
            >
              KALAM
            </span>
            <span
              className={`text-[#1C5D99] transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.4s' }}
            >
              2K26
            </span>
          </h1>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-4 md:mt-0">
            <div
              className={`h-[1px] bg-[#1C2533] transition-all duration-1000 ${isLoaded ? 'w-12 md:w-32 opacity-100' : 'w-0 opacity-0'}`}
              style={{ transitionDelay: '0.8s' }}
            />
            <p
              className={`text-xl md:text-3xl font-light italic text-[#5AA7DE] max-w-2xl text-center leading-tight transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.6s' }}
            >
              Where Innovation Meets Inspiration
            </p>
            <div
              className={`h-[1px] bg-[#1C2533] transition-all duration-1000 ${isLoaded ? 'w-12 md:w-32 opacity-100' : 'w-0 opacity-0'}`}
              style={{ transitionDelay: '0.8s' }}
            />
          </div>
        </div>

        {/* Interactive CTA Section with Magnetic Buttons */}
        <div
          className={`mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.9s' }}
        >
          <MagneticButton href="/register" strength={0.25}>
            <div className="group relative px-10 py-5 bg-[#1C2533] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative flex items-center gap-3 font-medium text-lg">
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </MagneticButton>

          <MagneticButton href="/events" strength={0.25}>
            <div className="group px-10 py-5 rounded-full border border-[#1C2533]/10 hover:border-[#F5B301] bg-white transition-all hover:scale-105 active:scale-95">
              <div className="flex items-center gap-3 font-medium text-lg text-[#1C2533]">
                <Globe className="w-5 h-5" />
                <span>Explore Events</span>
              </div>
            </div>
          </MagneticButton>
        </div>
      </div>


      <div
        className="absolute bottom-1/4 right-10 md:right-20 animate-float opacity-60 hidden lg:block"
        style={{ animationDelay: '1s', transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1C5D99]/20 via-[#1C5D99]/5 to-transparent backdrop-blur-sm border border-[#1C5D99]/10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent opacity-50" />
          <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-[#1C5D99]/10 blur-xl" />
        </div>
      </div>

      {/* Modern Grid Background Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(28,93,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,93,153,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
      />

      {/* Scroll indicator */}
      {/* <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${isLoaded ? 'opacity-60' : 'opacity-0'}`}
        style={{ transitionDelay: '1.2s' }}
      >
        <span className="text-xs uppercase tracking-widest text-[#1C5D99] font-medium">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-[#1C5D99]/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-[#1C5D99]/50 rounded-full animate-bounce-arrow" />
        </div>
      </div> */}
    </section>
  );
}
