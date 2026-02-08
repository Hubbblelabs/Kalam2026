import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: {
    default: 'Kalam 2026 | National Level Technical Symposium',
    template: '%s | Kalam 2026',
  },
  description:
    'Kalam 2026 - The premier national level technical symposium featuring workshops, hackathons, competitions, and more.',
  keywords: [
    'kalam 2026',
    'technical symposium',
    'college fest',
    'hackathon',
    'workshops',
    'competitions',
  ],
  authors: [{ name: 'SIET' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Kalam 2026',
    title: 'Kalam 2026 | National Level Technical Symposium',
    description:
      'Join us for the premier national level technical symposium featuring workshops, hackathons, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalam 2026 | National Level Technical Symposium',
    description:
      'Join us for the premier national level technical symposium featuring workshops, hackathons, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white antialiased dark:bg-gray-950">
        <Header />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
