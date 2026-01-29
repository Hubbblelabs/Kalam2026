import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 py-20 text-white lg:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Kalam 2026
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100 md:text-xl">
              National Level Technical Symposium
            </p>
            <p className="mx-auto mt-2 max-w-xl text-primary-200">
              Join us for an extraordinary celebration of technology, innovation, and creativity.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/events"
                className="rounded-full bg-white px-8 py-3 font-semibold text-primary-700 shadow-lg transition hover:bg-primary-50 hover:shadow-xl"
              >
                Explore Events
              </Link>
              <Link
                href="/register"
                className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary-700"
              >
                Register Now
              </Link>
            </div>

            {/* Countdown or Date */}
            <div className="mt-16">
              <p className="text-sm uppercase tracking-wider text-primary-200">Coming Soon</p>
              <p className="mt-2 text-2xl font-bold">March 2026</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              What Awaits You
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-gray-400">
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
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="text-4xl">{feature.icon}</span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Ready to Join?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-400">
              Register now to secure your spot and be part of the biggest technical symposium of the year.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-full bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-primary-700 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
