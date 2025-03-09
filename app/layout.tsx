import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });
const isProduction = process.env.NODE_ENV === 'production';


export const metadata: Metadata = {
  metadataBase: new URL('https://typingTunes.com'), 
  title: 'TypingTunes - Improve Your Typing with Lyrics',
  description: 'TypingTunes is a typing practice tool where users improve typing speed by typing song lyrics.',
  keywords: ['typing practice', 'song lyrics typing', 'improve typing speed', 'WPM tracker'],
  authors: [{ name: 'TypingTunes' }],
  icons: {
    icon: '/favicon.ico', 
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest', 
  openGraph: {
    title: 'TypingTunes - Fun Typing Practice with Song Lyrics',
    description: 'Enhance your typing skills by typing song lyrics. Track your speed and accuracy live!',
    url: 'https://typingTunes.com/',
    siteName: 'TypingTunes',
    images: [
      {
        url: 'https://typingTunes.com/logo.png',
        width: 512,
        height: 512,
        alt: 'TypingTunes logo',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="typing practice, song lyrics typing, improve typing speed, WPM tracker" />
        <meta name="author" content="TypingTunes" />
        <link rel="canonical" href="https://typingTunes.com/" />

        {/* Icons & Manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "TypingTunes",
          "url": "https://typingTunes.com/",
          "description": "TypingTunes is a typing practice tool where users improve typing speed by typing song lyrics.",
          "applicationCategory": "Educational",
          "operatingSystem": "All"
        })}} />

      {/* Google Analytics - Runs only in production */}
        {isProduction && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-0NZH20B168"></script>
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0NZH20B168');
            `}} />
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}