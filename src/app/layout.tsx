import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'AI Poker School — Train with the Best AI Poker Coach',
    template: '%s | AI Poker School',
  },
  description:
    "The world's most advanced AI poker coach. Master GTO strategy across 25+ game types with Coach Andrew. Interactive poker table, real-time analysis, and personalized training.",
  keywords: [
    'poker training',
    'AI poker coach',
    'GTO poker',
    'poker strategy',
    'learn poker',
    'poker school',
    'Texas Holdem',
    'poker variants',
    'poker education',
  ],
  openGraph: {
    title: 'AI Poker School — AI is beating the best. Why not train with the best?',
    description:
      "The world's most advanced AI poker coach. Master GTO strategy across 25+ game types.",
    url: 'https://aipokerschool.com',
    siteName: 'AI Poker School',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Poker School — Train with the Best AI Poker Coach',
    description:
      "The world's most advanced AI poker coach. Master GTO strategy across 25+ game types.",
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
    <html lang="en" className="dark">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-dark-bg text-white`}>
        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
