import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-heading text-xl font-bold text-primary-600">
          Kalam 2026
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-primary-600 dark:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium text-gray-700 transition hover:text-primary-600 dark:text-gray-300"
          >
            Events
          </Link>
          <Link
            href="/schedule"
            className="text-sm font-medium text-gray-700 transition hover:text-primary-600 dark:text-gray-300"
          >
            Schedule
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-primary-600 dark:text-gray-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 transition hover:text-primary-600 dark:text-gray-300"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-gray-700 transition hover:text-primary-600 dark:text-gray-300 md:block"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
