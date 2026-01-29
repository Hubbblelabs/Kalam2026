import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-700 to-primary-800 py-20 text-white lg:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Kalam 2026
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
              National Level Technical Symposium
            </p>
            <p className="mx-auto mt-2 max-w-xl text-white/70">
              Join us for an extraordinary celebration of technology, innovation, and creativity.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button asChild variant="outline-accent" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/register">Register Now</Link>
              </Button>
            </div>

            {/* Countdown or Date */}
            <div className="mt-16">
              <p className="text-sm uppercase tracking-wider text-accent">Coming Soon</p>
              <p className="mt-2 text-2xl font-bold">March 2026</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-neutral-light py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-heading text-3xl font-bold text-neutral-dark md:text-4xl">
              What Awaits You
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-dark/70">
              Experience a diverse range of events designed to challenge, inspire, and connect.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Workshops',
                  description: 'Hands-on learning sessions with industry experts',
                  icon: '🔧',
                },
                {
                  title: 'Hackathons',
                  description: '24-hour coding challenges with exciting prizes',
                  icon: '💻',
                },
                {
                  title: 'Competitions',
                  description: 'Technical and non-technical competitions',
                  icon: '🏆',
                },
                {
                  title: 'Guest Lectures',
                  description: 'Inspiring talks from industry leaders',
                  icon: '🎤',
                },
              ].map((feature) => (
                <Card key={feature.title}>
                  <span className="text-4xl">{feature.icon}</span>
                  <CardHeader className="p-0">
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-soft-yellow py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark md:text-4xl">
              Ready to Join?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-dark/70">
              Register now to secure your spot and be part of the biggest technical symposium of the year.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
