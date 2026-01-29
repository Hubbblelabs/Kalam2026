import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-heading text-xl font-bold text-white">
          Kalam 2026
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 transition hover:text-accent"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium text-white/90 transition hover:text-accent"
          >
            Events
          </Link>
          <Link
            href="/schedule"
            className="text-sm font-medium text-white/90 transition hover:text-accent"
          >
            Schedule
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-white/90 transition hover:text-accent"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white/90 transition hover:text-accent"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-white/90 transition hover:text-accent md:block"
          >
            Login
          </Link>
          <Button asChild size="sm">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
