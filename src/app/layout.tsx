import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { TranslationProvider } from "@/lib/i18n/TranslationContext";
import { PublicAuthProvider } from "@/context/PublicAuthContext";
import { PageTracker } from "@/components/analytics/PageTracker";
import FloatingBackButton from "@/components/ui/FloatingBackButton";
import SwipeBackHandler from "@/components/SwipeBackHandler";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bahrainnights.com'),
  title: {
    default: "BahrainNights - Events, Nightlife & Things to Do in Bahrain",
    template: "%s | BahrainNights"
  },
  description: "Discover the best events, restaurants, nightlife, cinema, and things to do in Bahrain. Your complete guide to happenings in Bahrain - from family activities to parties.",
  keywords: [
    "Bahrain events", "events in Bahrain", "Bahrain nightlife", "things to do in Bahrain",
    "restaurants in Bahrain", "cafes in Bahrain", "lounges in Bahrain", "Bahrain parties",
    "cinema in Bahrain", "movies in Bahrain", "kids activities in Bahrain", "family activities in Bahrain",
    "hotels in Bahrain", "spas in Bahrain", "gyms in Bahrain", "Bahrain sports",
    "BahrainNights", "Bahrain Nights"
  ],
  authors: [{ name: "BahrainNights" }],
  creator: "BahrainNights",
  publisher: "BahrainNights",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://bahrainnights.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "BahrainNights - Events, Nightlife & Things to Do in Bahrain",
    description: "Discover the best events, restaurants, nightlife, cinema, and things to do in Bahrain. Your complete guide to happenings in Bahrain.",
    url: "https://bahrainnights.com",
    siteName: "BahrainNights",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BahrainNights - Events, Nightlife & Things to Do in Bahrain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BahrainNights - Events, Nightlife & Things to Do in Bahrain",
    description: "Discover the best events, restaurants, nightlife, cinema, and things to do in Bahrain.",
    images: ["/og-image.png"],
    creator: "@bahaborainNights",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://bahrainnights-production.s3.me-south-1.amazonaws.com" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://bahrainnights-production.s3.me-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://cdn.platinumlist.net" />
        {/* Organization and WebSite Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://bahrainnights.com/#organization',
                  name: 'BahrainNights',
                  url: 'https://bahrainnights.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://bahrainnights.com/logo.png',
                    width: 512,
                    height: 512
                  },
                  sameAs: [
                    'https://instagram.com/bahaborainnights',
                    'https://facebook.com/bahaborainnights',
                    'https://twitter.com/bahaborainnights'
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: 'admin@bahrainnights.com'
                  }
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://bahrainnights.com/#website',
                  url: 'https://bahrainnights.com',
                  name: 'BahrainNights',
                  description: 'Discover the best events, restaurants, nightlife, cinema, and things to do in Bahrain',
                  publisher: {
                    '@id': 'https://bahrainnights.com/#organization'
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://bahrainnights.com/search?q={search_term_string}'
                    },
                    'query-input': 'required name=search_term_string'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-inter antialiased`}>
        <TranslationProvider>
          <PublicAuthProvider>
            <AuthProvider>
              <PageTracker />
              <SwipeBackHandler threshold={80} edgeWidth={25} />
              {children}
              <FloatingBackButton />
            </AuthProvider>
          </PublicAuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
