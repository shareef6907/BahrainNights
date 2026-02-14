import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { TranslationProvider } from "@/lib/i18n/TranslationContext";
import { PublicAuthProvider } from "@/context/PublicAuthContext";
import { PageTracker } from "@/components/analytics/PageTracker";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import FloatingBackButton from "@/components/ui/FloatingBackButton";
import SwipeBackHandler from "@/components/SwipeBackHandler";
import { PWARegister } from "@/components/PWARegister";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bahrainnights.com'),
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BahrainNights',
  },
  formatDetection: {
    telephone: true,
  },
  // Note: Don't set a static canonical here - it would apply to ALL pages
  // Each page should have its own canonical, or let Next.js infer from metadataBase + path
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
    url: "https://www.bahrainnights.com",
    siteName: "BahrainNights",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BahrainNights - Events, Nightlife & Things to Do in Bahrain",
      },
    ],
    locale: "en_BH",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BahrainNights - Events, Nightlife & Things to Do in Bahrain',
    description: 'Discover the best events, restaurants, nightlife, cinema, and things to do in Bahrain.',
    images: ['/og-image.png'],
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
  // Google verification handled via Search Console
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Viewport for PWA keyboard support */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BahrainNights" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

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
                  '@id': 'https://www.bahrainnights.com/#organization',
                  name: 'BahrainNights',
                  url: 'https://www.bahrainnights.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.bahrainnights.com/logo.png',
                    width: 512,
                    height: 512
                  },
                  description: "Bahrain's premier guide to events, dining, nightlife, and entertainment. Discover the best things to do in Bahrain and the region.",
                  sameAs: [
                    'https://www.instagram.com/bh.nights',
                    'https://facebook.com/BahrainNights',
                    'https://www.eventsbahrain.com',
                    'https://www.filmproductionbahrain.com'
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+973-3900-7750',
                    contactType: 'customer service',
                    email: 'ceo@bahrainnights.com',
                    areaServed: ['BH', 'AE', 'SA', 'QA', 'EG', 'TR', 'GB'],
                    availableLanguage: ['English', 'Arabic']
                  },
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'Bahrain'
                  },
                  subOrganization: [
                    {
                      '@type': 'Organization',
                      name: 'Events Bahrain',
                      url: 'https://www.eventsbahrain.com',
                      description: 'Professional event equipment rental and production services in Bahrain. Sound systems, lighting, stages & LED screens.'
                    },
                    {
                      '@type': 'Organization',
                      name: 'Film Production Bahrain',
                      url: 'https://www.filmproductionbahrain.com',
                      description: 'Professional video and film production services in Bahrain. Corporate videos, event coverage, commercials & post-production.'
                    }
                  ]
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.bahrainnights.com/#website',
                  url: 'https://www.bahrainnights.com',
                  name: 'BahrainNights',
                  description: 'Discover events, dining, nightlife, and entertainment in Bahrain and the region.',
                  publisher: {
                    '@id': 'https://www.bahrainnights.com/#organization'
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://www.bahrainnights.com/search?q={search_term_string}'
                    },
                    'query-input': 'required name=search_term_string'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${ibmPlexArabic.variable} font-inter antialiased`}>
        <GoogleAnalytics />
        <TranslationProvider>
          <PublicAuthProvider>
            <AuthProvider>
              <PageTracker />
              <SwipeBackHandler threshold={50} edgeWidth={50} />
              {children}
              <FloatingBackButton />
            </AuthProvider>
          </PublicAuthProvider>
        </TranslationProvider>
        <PWARegister />
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
