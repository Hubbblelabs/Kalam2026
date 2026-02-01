'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Instagram, Twitter, Linkedin, Facebook, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { CursorSpotlight } from '../landing/CursorSpotlight';

const socialLinks = [
  { href: 'https://www.instagram.com/siet_kalam_official?igsh=MWhxZjNmNjUxc3ptdg==', icon: Instagram },
  { href: 'https://x.com/SietkalamOffl?t=kXFXDRayKEG4s3vDU8DZwA&s=09', icon: Twitter },
  { href: 'https://www.linkedin.com/school/sri-shakthi-institute-of-engineering-&-technology/', icon: Linkedin },
  { href: 'https://www.facebook.com/share/18qb6GWkCr/', icon: Facebook },
];

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        window.dispatchEvent(new CustomEvent('footer-visibility-change', { detail: isVisible }));
      },
      { threshold: 0.1 } // Trigger when 10% of footer is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative h-auto md:h-[800px]'
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className='relative md:fixed bottom-0 h-auto md:h-[800px] w-full'>
        <div className="h-full w-full bg-[#1C2533] text-[#Fdfdf8] flex flex-col justify-between relative overflow-hidden">

          {/* 3D Background - Reduced opacity for subtle effect */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <CursorSpotlight theme="dark" />
          </div>

          {/* Absolute Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

          <div className="container-custom relative z-10 h-full flex flex-col pt-12 pb-10 ">

            {/* Top Section: Links & Socials */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 md:mb-auto">
              <div className="w-full lg:w-auto flex flex-col gap-8">
                {/* Footer Logo */}
                {/* <div className="relative w-40 h-12 mb-2">
                  <NextImage
                    src="/kalam26-logo-hor.svg"
                    alt="Kalam 2026"
                    fill
                    className="object-contain object-left opacity-90"
                  />
                </div> */}

                <div>
                  <h3 className="text-[#F5B301] text-sm uppercase tracking-widest font-bold mb-6">Connect</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#F5B301] hover:text-[#1C2533] hover:scale-110 transition-all duration-300"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#F5B301] text-sm uppercase tracking-widest font-bold mb-4">Contact Us</h3>
                  <div className="flex flex-col gap-3 text-white/60 text-sm">
                    <a href="mailto:kalam@siet.ac.in" className="hover:text-white transition-colors flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F5B301] group-hover:text-[#1C2533] transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span>kalam@siet.ac.in</span>
                    </a>
                    <a href="tel:+917540084863" className="hover:text-white transition-colors flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F5B301] group-hover:text-[#1C2533] transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span>(+91) 75400 84863</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto flex flex-col md:flex-row gap-12 lg:gap-24">
                <div className="grid grid-cols-2 gap-12 md:gap-24">
                  <div>
                    <h3 className="text-[#F5B301] text-sm uppercase tracking-widest font-bold mb-6">Explore</h3>
                    <ul className="space-y-4 text-lg font-medium text-white/60">
                      <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                      <li><Link href="/schedule" className="hover:text-white transition-colors">Schedule</Link></li>
                      <li><Link href="/sponsors" className="hover:text-white transition-colors">Sponsors</Link></li>
                      <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#F5B301] text-sm uppercase tracking-widest font-bold mb-6">Legal</h3>
                    <ul className="space-y-4 text-lg font-medium text-white/60">
                      <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                      <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                      <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Map Section */}
                <div>
                  <h3 className="text-[#F5B301] text-sm uppercase tracking-widest font-bold mb-6">Locate Us</h3>
                  <div className="w-full md:w-[400px] h-[220px] rounded-xl overflow-hidden shadow-lg border-2 border-white/5 relative bg-white/5 ">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7913.527095429474!2d77.0720385!3d11.0407133!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85851693f4a5d%3A0x929165d4884224ee!2sSRI%20SHAKTHI%20INSTITUTE%20OF%20ENGINEERING%20AND%20TECHNOLOGY!5e0!3m2!1sen!2sin!4v1769852904243!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>


            {/* Giant Typography Section */}
            <div className="relative mt-8 md:mt-10">
              <div className="w-full border-t border-white/10 mb-8" />

              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
                {/* Typography Block */}
                <div className="w-full md:w-auto text-center md:text-left">
                  <h1 className="font-heading font-black text-[20vw] md:text-[18vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 select-none">
                    KALAM
                  </h1>
                  <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full pl-0 md:pl-8">
                    <div className="text-[8vw] md:text-[5vw] font-bold text-[#F5B301] tracking-tighter">2K26</div>
                    <div className="text-white/40 text-xs md:text-base max-w-md text-center md:text-right mt-2 md:mt-0 leading-relaxed hover:text-white transition-colors">
                      <a href="https://siet.ac.in/" target="_blank" rel="noopener noreferrer">
                        Sri Shakthi Institute of Engineering and Technology<br />
                        L&T Bypass Road, Coimbatore - 641 062
                      </a>
                    </div>
                  </div>
                </div>

                {/* Logo & Register CTA */}
                <div className="w-full md:w-auto mb-4 md:mb-16 flex flex-col items-center gap-4 md:gap-6">
                  <div className="relative w-16 h-20 md:w-32 md:h-44">
                    <NextImage
                      src="/kalam26-logo.png"
                      alt="Kalam 2026"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Link href="/register" className="group flex items-center gap-2 md:gap-4 text-lg md:text-2xl font-bold bg-white text-[#1C2533] py-3 px-6 md:py-4 md:px-8 rounded-full hover:bg-[#F5B301] transition-all duration-300 whitespace-nowrap">
                    Register Now
                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 group-hover:rotate-45 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 flex justify-between text-white/30 text-sm">
              <p>&copy; 2026 Kalam</p>
              <p>Designed with passion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
