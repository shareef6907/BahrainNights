import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bahrain Nights | AI-Powered Cultural Discovery",
  description: "Bahrain's first AI-powered guide to events, dining, and culture. Always updated, always alive.",
  manifest: "/site.webmanifest",
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
    title: "Bahrain Nights | AI-Powered Cultural Discovery",
    description: "Bahrain's first AI-powered guide to events, dining, and culture. Always updated, always alive.",
    url: "https://bahrainnights.com",
    siteName: "Bahrain Nights",
    images: [
      {
        url: "/og-icon.png",
        width: 512,
        height: 512,
        alt: "Bahrain Nights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahrain Nights | AI-Powered Cultural Discovery",
    description: "Bahrain's first AI-powered guide to events, dining, and culture.",
    images: ["/og-icon.png"],
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
      </head>
      <body className={`${inter.variable} font-inter antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
