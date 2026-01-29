import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { EventCard } from '@/components/landing/EventCard';
import { TestimonialSlider } from '@/components/landing/TestimonialSlider';
import { MarqueeText } from '@/components/landing/MarqueeText';
import { ScrollSection } from '@/components/landing/ScrollSection';

const eventCategories = [
  {
    title: 'Workshops',
    description: 'Hands-on learning sessions with industry experts. Master new skills in AI/ML, Web3, Cloud Computing, and more.',
    href: '/events?category=workshops',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accentColor: 'blue' as const,
  },
  {
    title: 'Hackathons',
    description: '24-48 hour coding challenges with exciting prizes. Build innovative solutions and compete with the best minds.',
    href: '/events?category=hackathons',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    accentColor: 'orange' as const,
  },
  {
    title: 'Competitions',
    description: 'Technical and non-technical competitions including paper presentations, coding contests, and design challenges.',
    href: '/events?category=competitions',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    accentColor: 'yellow' as const,
  },
  {
    title: 'Guest Lectures',
    description: 'Inspiring talks from industry leaders, tech visionaries, and successful entrepreneurs. Get insights into the future.',
    href: '/events?category=lectures',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    accentColor: 'blue' as const,
  },
];

const marqueeItems = [
  '50+ Events',
  '5000+ Participants',
  '₹5 Lakh Prize Pool',
  '100+ Colleges',
  '3 Days of Innovation',
  'Industry Mentors',
  'Networking Opportunities',
  'Certificates for All',
];

const stats = [
  { value: '50+', label: 'Events' },
  { value: '5000+', label: 'Expected Participants' },
  { value: '₹5L+', label: 'Prize Pool' },
  { value: '100+', label: 'Colleges' },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Marquee Highlights */}
        <MarqueeText items={marqueeItems} speed="normal" />

        {/* Stats Section */}
        <section className="section-padding bg-surface-50">
          <div className="container-custom">
            <ScrollSection animation="fade-up">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-text-muted font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollSection>
          </div>
        </section>

        {/* Events Section */}
        <section className="section-padding">
          <div className="container-custom">
            <ScrollSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-text">
                  What Awaits You
                </h2>
                <p className="mt-4 text-text-muted max-w-2xl mx-auto">
                  Experience a diverse range of events designed to challenge, inspire, and connect the brightest minds.
                </p>
              </div>
            </ScrollSection>

            <div className="grid gap-8 md:grid-cols-2">
              {eventCategories.map((category, index) => (
                <ScrollSection
                  key={category.title}
                  animation={index % 2 === 0 ? 'slide-left' : 'slide-right'}
                  delay={index * 100}
                >
                  <EventCard
                    title={category.title}
                    description={category.description}
                    href={category.href}
                    icon={category.icon}
                    accentColor={category.accentColor}
                  />
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="section-padding bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-light opacity-20" />

          <div className="container-custom relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollSection animation="slide-left">
                <h2 className="font-heading text-4xl md:text-5xl font-bold">
                  Why <span className="text-accent">Kalam 2k26</span>?
                </h2>
                <p className="mt-6 text-white/80 leading-relaxed">
                  Named after the legendary APJ Abdul Kalam, our symposium embodies his vision of
                  inspiring young minds to dream big and innovate fearlessly. For over a decade,
                  Kalam has been the premier platform for students to showcase their talents,
                  learn from experts, and connect with like-minded peers.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    'Industry-recognized certificates',
                    'Hands-on workshops by tech leaders',
                    'Networking with startups & recruiters',
                    'Exciting prizes worth ₹5 Lakhs+',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 mt-8 text-accent font-semibold hover:gap-4 transition-all"
                >
                  Learn More About Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </ScrollSection>

              <ScrollSection animation="slide-right" delay={200}>
                <div className="relative">
                  {/* Decorative card stack */}
                  <div className="absolute -top-4 -left-4 w-full h-full bg-accent/20 rounded-2xl rotate-3" />
                  <div className="absolute -top-2 -left-2 w-full h-full bg-accent/10 rounded-2xl rotate-1" />
                  <div className="relative glass rounded-2xl p-8 text-text">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="font-heading text-2xl font-bold mb-2">Launch Your Career</h3>
                    <p className="text-text-muted">
                      Many of our past participants have gone on to join top tech companies,
                      start their own ventures, and make significant contributions to the industry.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                          >
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-text-muted">+500 Alumni Network</span>
                    </div>
                  </div>
                </div>
              </ScrollSection>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSlider />

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-accent via-accent-500 to-accent-orange relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-10" />

          <div className="container-custom relative text-center">
            <ScrollSection animation="scale">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text">
                Ready to Join the Revolution?
              </h2>
              <p className="mt-6 text-text/80 max-w-2xl mx-auto text-lg">
                Don't miss out on the biggest technical symposium of the year.
                Register now and secure your spot!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="btn-primary px-10 py-4 text-lg rounded-xl"
                >
                  Register Now — It's Free
                </Link>
                <Link
                  href="/events"
                  className="px-10 py-4 text-lg rounded-xl font-semibold text-text border-2 border-text/30 hover:bg-text/10 transition-all"
                >
                  View All Events
                </Link>
              </div>
              <p className="mt-6 text-text/60 text-sm">
                Early bird registration closes February 28, 2026
              </p>
            </ScrollSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
