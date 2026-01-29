import Link from 'next/link';

const footerLinks = {
  quickLinks: [
    { href: '/events', label: 'Events' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/register', label: 'Register' },
    { href: '/sponsors', label: 'Sponsors' },
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com', label: 'IG', name: 'Instagram' },
  { href: 'https://twitter.com', label: 'TW', name: 'Twitter' },
  { href: 'https://linkedin.com', label: 'LI', name: 'LinkedIn' },
  { href: 'https://youtube.com', label: 'YT', name: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid-light opacity-10" />

      {/* Contact Section Banner */}
      <div className="relative border-b border-white/10">
        <div className="container-custom py-16 text-center">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            CONTACT US
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Have questions? Get in touch with our team.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 btn-accent rounded-xl"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container-custom py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-heading text-2xl font-bold">
              Kalam<span className="text-accent">2k26</span>
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              National Level Technical Symposium organized by Sri Shakthi College.
              Join us for workshops, hackathons, competitions, and more.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-white/70 hover:text-accent hover:border-accent transition-colors"
                  aria-label={social.name}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Sri Shakthi College<br />Coimbatore, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:kalam@siet.ac.in" className="hover:text-accent transition-colors">
                  kalam@siet.ac.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Kalam 2k26. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Crafted with ❤️ by Sri Shakthi Students
          </p>
        </div>
      </div>
    </footer>
  );
}
