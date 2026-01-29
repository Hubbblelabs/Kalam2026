import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-heading text-xl font-bold text-primary-600">
              Kalam 2026
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              National Level Technical Symposium organized by SIET.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-gray-600 transition hover:text-primary-600 dark:text-gray-400"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="text-sm text-gray-600 transition hover:text-primary-600 dark:text-gray-400"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-gray-600 transition hover:text-primary-600 dark:text-gray-400"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Support</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition hover:text-primary-600 dark:text-gray-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 transition hover:text-primary-600 dark:text-gray-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@siet.ac.in"
                  className="text-sm text-gray-600 transition hover:text-primary-600 dark:text-gray-400"
                >
                  support@siet.ac.in
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>SIET College</li>
              <li>products@siet.ac.in</li>
              <li>support@siet.ac.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Kalam 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
