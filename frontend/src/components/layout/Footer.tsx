import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-heading text-xl font-bold text-white">
              Kalam 2026
            </Link>
            <p className="mt-4 text-sm text-white/70">
              National Level Technical Symposium organized by SIET.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-accent-500">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-white/70 transition hover:text-accent-500"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="text-sm text-white/70 transition hover:text-accent-500"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-white/70 transition hover:text-accent-500"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-accent-500">Support</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 transition hover:text-accent-500"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/70 transition hover:text-accent-500"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@siet.ac.in"
                  className="text-sm text-white/70 transition hover:text-accent-500"
                >
                  support@siet.ac.in
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-accent-500">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>SIET College</li>
              <li>products@siet.ac.in</li>
              <li>support@siet.ac.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/70">
            © {new Date().getFullYear()} Kalam 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
