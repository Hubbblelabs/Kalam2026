import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { CategoryShowcase } from '@/components/landing/CategoryShowcase';
import { TestimonialSlider } from '@/components/landing/TestimonialSlider';
import { MarqueeText } from '@/components/landing/MarqueeText';
import { ScrollSection } from '@/components/landing/ScrollSection';
import { SponsorMarquee } from '@/components/landing/SponsorMarquee';
import { ArrowRight, Code, Cpu, Trophy, Mic, Rocket, Users, Sparkles } from 'lucide-react';

const eventCategories = [
  {
    title: 'Workshops',
    description: 'Deep dive into the future. From Generative AI to Blockchain forensics, master in-demand skills with hands-on guidance from industry leaders.',
    href: '/events?category=workshops',
    icon: <Cpu className="w-8 h-8" />,
    accentColor: 'blue' as const,
  },
  {
    title: 'Hackathons',
    description: '48 hours of pure adrenaline. Assemble your team, tackle real-world problem statements, and build deployment-ready solutions for a ₹5L prize pool.',
    href: '/events?category=hackathons',
    icon: <Code className="w-8 h-8" />,
    accentColor: 'orange' as const,
  },
  {
    title: 'Competitions',
    description: 'The ultimate test of skill. Debugging relays, blind coding, UI/UX design battles, and CTF challenges. Prove you are the sharpest mind in the arena.',
    href: '/events?category=competitions',
    icon: <Trophy className="w-8 h-8" />,
    accentColor: 'yellow' as const,
  },
  {
    title: 'Spotlights',
    description: 'Beyond the code. Witness electric pro-shows, stand-up comedy, and inspiring keynotes from the visionaries shaping the tech landscape.',
    href: '/events?category=spotlights',
    icon: <Sparkles className="w-8 h-8" />,
    accentColor: 'blue' as const,
  },
];

const marqueeItems = [
  'Innovate', 'Create', 'Inspire', 'Develop', 'Design', 'Deploy', 'Connect', 'Grow'
];

const stats = [
  { value: '50+', label: 'Events' },
  { value: '5k+', label: 'Participants' },
  { value: '₹5L', label: 'Prize Pool' },
  { value: '100+', label: 'Colleges' },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#Fdfdf8] text-[#1C2533] selection:bg-[#F5B301] selection:text-[#1C2533]">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Marquee Separator */}
        <MarqueeText items={marqueeItems} speed="fast" />

        {/* Stats Section - Typographic */}
        <section className="py-32 border-b border-black/5">
          <div className="container mx-auto px-6">
            <ScrollSection animation="fade-up">
              <div className="flex flex-wrap justify-between items-end gap-12">
                <div className="max-w-xl">
                  <h2 className="font-heading text-5xl md:text-7xl font-bold leading-[0.9] mb-8">
                    The Numbers <br /> <span className="text-[#1C5D99] italic">Speak Louder.</span>
                  </h2>
                  <p className="text-xl text-[#6B7B8C] leading-relaxed">
                    Kalam 2k26 is not just an event; It's a gathering of the brightest minds.
                    Witness the scale of innovation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-6xl md:text-7xl font-bold text-[#1C2533]">
                        {stat.value}
                      </p>
                      <p className="text-[#1C5D99] font-medium tracking-widest uppercase text-sm mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollSection>
          </div>
        </section>

        {/* Sponsor Marquee */}
        <SponsorMarquee />

        {/* Events Grid - Bento Style */}
        <section className="py-32 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#F5B301]/5 to-transparent pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <ScrollSection animation="fade-up">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[1px] w-12 bg-[#1C5D99]" />
                    <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1C5D99]">
                      Explore Categories
                    </span>
                  </div>
                  <h2 className="font-heading text-6xl md:text-8xl font-black text-[#1C2533]">
                    WHAT'S ON.
                  </h2>
                </div>
                <Link
                  href="/events"
                  className="group flex items-center gap-3 text-lg font-bold border-b-2 border-[#1C2533] pb-1 hover:text-[#1C5D99] hover:border-[#F5B301] transition-all"
                >
                  View All Departments
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </ScrollSection>

            <div className="mt-20">
              <CategoryShowcase categories={eventCategories} />
            </div>
          </div>
        </section>

        {/* About Section - Legacy of Innovation */}
        <section className="py-32 bg-[#1C2533] text-[#Fdfdf8] relative overflow-hidden">
          {/* Architectural grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <ScrollSection animation="fade-up">
              <div className="flex flex-col lg:flex-row gap-16 border-t border-white/10 pt-16">
                {/* Left Column: Heading & Manifesto */}
                <div className="lg:w-1/2">
                  <div className="inline-block px-3 py-1 mb-6 border border-[#F5B301] rounded-full text-[#F5B301] text-sm tracking-widest uppercase font-medium">
                    Est. 2010
                  </div>
                  <h2 className="font-heading text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter">
                    LEGACY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B301] to-[#FF8C00] italic pr-2">OF</span> <br />
                    INNOVATION.
                  </h2>

                  <div className="pl-6 border-l-2 border-[#1C5D99] space-y-6 text-white/70 text-lg leading-relaxed max-w-lg">
                    <p>
                      We don't just host events; we engineer experiences. For over 15 years, <span className="text-white font-bold">Kalam</span> has been the proving ground for the next generation of technologists.
                    </p>
                    <p>
                      From humble beginnings to a national phenomenon, our mission remains unchanged:
                      <span className="italic ml-1 text-[#F5B301]">Ignite. Innovate. Inspire.</span>
                    </p>
                  </div>

                  <Link href="/about" className="inline-flex items-center gap-3 mt-12 text-white font-bold text-xl hover:text-[#F5B301] transition-colors group">
                    Discover Our Story
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

                {/* Right Column: Creative Stats/Timeline */}
                <div className="lg:w-1/2 flex flex-col justify-end">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Bento Box 1 */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors duration-500">
                      <p className="text-5xl font-bold font-heading mb-2">15+</p>
                      <p className="text-sm uppercase tracking-widest text-[#6B7B8C]">Years Active</p>
                    </div>

                    {/* Bento Box 2 - Image/Creative */}
                    <div className="bg-[#F5B301] text-[#1C2533] p-8 rounded-[2rem] flex items-center justify-center transform rotate-2 hover:rotate-0 transition-transform duration-500">
                      <Rocket className="w-12 h-12" />
                    </div>

                    {/* Bento Box 3 */}
                    <div className="col-span-2 bg-[#1C5D99] p-8 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-[#154570] transition-colors">
                      <div className="text-white">
                        <p className="text-3xl font-bold font-heading">Alumni Network</p>
                        <p className="text-white/60">Success stories worldwide</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSection>
          </div>
        </section>

        {/* CTA Section - Big Footer Style */}
        <section className="py-40 bg-[#Fdfdf8] text-center relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <ScrollSection animation="scale">
              <h2 className="font-heading text-[12vw] leading-[0.8] font-black tracking-tighter text-[#1C2533] uppercase opacity-10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                Register
              </h2>

              <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 relative z-10">
                Ready to Make History?
              </h2>
              <p className="text-xl text-[#6B7B8C] mb-12 max-w-2xl mx-auto relative z-10">
                Join the thousands of students transforming their ideas into reality.
              </p>

              <Link
                href="/register"
                className="relative z-10 inline-flex items-center px-12 py-6 bg-[#1C2533] text-white rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl hover:shadow-[#1C5D99]/50"
              >
                Secure Your Spot
                <span className="ml-3 bg-[#F5B301] text-[#1C2533] rounded-full w-8 h-8 flex items-center justify-center">
                  →
                </span>
              </Link>
            </ScrollSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
