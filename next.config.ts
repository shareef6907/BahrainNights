import type { NextConfig } from "next";
import { eventRedirects } from "./src/data/event-redirects";

// Security headers for all pages
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig: NextConfig = {
  // Turbopack config (Next.js 16 default bundler)
  turbopack: {},

  // Enable compression
  compress: true,

  // Optimize production builds with SWC minifier
  // swcMinify is now default in Next.js 15

  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Optimized image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bahrainnights-production.s3.me-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bahrainnights-production-us.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.platinumlist.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.voxcinemas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bahrain.cineco.net',
        port: '',
        pathname: '/**',
      },
    ],
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 7 days
    minimumCacheTTL: 604800,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },

  // Add security headers and caching headers
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Cache static assets for 1 year (immutable)
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache JS and CSS for 1 year (immutable)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache fonts for 1 year
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache video files for 7 days
      {
        source: '/:all*(mp4|webm|ogg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // PWA Service Worker - no cache for updates
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
        ],
      },
      // PWA Manifest
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      // Homepage - cache with stale-while-revalidate for instant loads
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=120, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },

  // Redirects for SEO and renamed pages
  async redirects() {
    return [
      // Dead Platinumlist event URLs. These pages were indexed by Google and
      // still earn impressions, but their rows were removed from the events
      // table, so they started returning 404 and leaking clicks every day.
      // Each one is redirected to the closest live page. Generated by
      // scripts/generate-event-redirects.mjs — see that file for the evidence
      // behind every mapping.
      //
      // `statusCode: 301` rather than `permanent: true`: Next.js maps
      // `permanent: true` to 308, and these are genuine permanent moves that
      // should be cached as 301s.
      ...Object.entries(eventRedirects).map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301,
      })),
      {
        // /best-lounges-bahrain was deleted in 3bc09e4, so this redirect chain
        // ended on a 404. Point it at the live venue listing instead.
        source: '/best-bars-bahrain',
        destination: '/places?category=lounge',
        permanent: true,
      },
      {
        // /lounges-bars has no index route - only a [slug] child - so it
        // rendered a 404 while being linked from several hub pages.
        // Point it at the live venue listing instead.
        source: '/lounges-bars',
        destination: '/places?category=lounge',
        permanent: true,
      },
      // ---------------------------------------------------------------------
      // Indexed URLs outside the /events/ namespace that now 404.
      //
      // scripts/generate-event-redirects.mjs deliberately covers /events/ only
      // (it filters GSC rows on '/events/'), so a sweep of every URL that
      // earns impressions in GSC found a further 7 that 404 and were not
      // covered by the map. Measured 2026-11-03: 1,518 GSC URLs with
      // impressions, 14 returning 404, 7 of them not covered by the map.
      //
      // These are hand-written rather than generated because they are not
      // Platinumlist event URLs -- they are deleted static guides, a venue
      // whose slug lost its trailing dash, and a deactivated attraction.
      // Same treatment as the /lounges-bars entry above.
      //
      // Every destination below was verified live: HTTP 200, `index, follow`,
      // and carrying real event/venue links.
      {
        // 48 impressions. The general restaurant guide was replaced by
        // /best-restaurants-bahrain, which links out to the related
        // /best-cafes-bahrain and /best-brunches-bahrain guides.
        source: '/guides/restaurants',
        destination: '/best-restaurants-bahrain',
        statusCode: 301,
      },
      {
        // 98 impressions - the largest single leak in this batch. The 2026
        // Bahrain Grand Prix guide was deleted after the race and has no
        // successor page: there is no live F1 content anywhere on the site.
        // /events is the live hub that carries the site's sports and
        // international listings (544 event links).
        //
        // Note /events/category/sports is NOT a valid target - it is an empty
        // hub, served as `noindex, nofollow` since PR #38.
        source: '/guides/f1-2026',
        destination: '/events',
        statusCode: 301,
      },
      {
        // 15 impressions. The beach-clubs guide was deleted and there are no
        // approved `beach-club` venues to point at, so /places?category=beach-club
        // would render an empty filtered view. /attractions is the live
        // listing that actually carries the beach content (boat trips,
        // snorkeling, pearl diving).
        source: '/guides/beach-clubs',
        destination: '/attractions',
        statusCode: 301,
      },
      {
        // 1 impression. A guide to concerts in Saudi Arabia was deleted.
        // /international/saudi-arabia is the live, populated country hub for
        // exactly this content (70 event links).
        source: '/guides/saudi-concerts',
        destination: '/international/saudi-arabia',
        statusCode: 301,
      },
      {
        // 2 impressions. The venue exists and is approved, but the indexed URL
        // carries a trailing dash that the route does not match.
        source: '/places/vibes-bahrain-entertainment-',
        destination: '/places/vibes-bahrain-entertainment',
        statusCode: 301,
      },
      {
        // 1 impression. No venue named "Amber Lounge" exists in the database
        // (approved or otherwise), so the page is permanently gone. /places is
        // the venue directory.
        source: '/places/amber-lounge',
        destination: '/places',
        statusCode: 301,
      },
      {
        // 19 impressions. The row still exists but has is_active=false, so
        // getAttractionBySlug() filters it out and the page 404s by design.
        // /attractions is the live listing for the same category.
        source: '/attractions/janat-dilmun-water-park-bahrain-ladies-night-107282',
        destination: '/attractions',
        statusCode: 301,
      },
      {
        source: '/shopping',
        destination: '/explore/shopping',
        permanent: true,
      },
      {
        source: '/tonight',
        destination: '/things-to-do-in-bahrain',
        permanent: true,
      },
      {
        source: '/this-weekend',
        destination: '/weekend-in-bahrain',
        permanent: true,
      },
      // Critical redirects
      {
        source: '/best-bars',
        destination: '/places',
        permanent: true,
      },
      {
        source: '/best-clubs',
        destination: '/places',
        permanent: true,
      },
      {
        source: '/clubs',
        destination: '/places',
        permanent: true,
      },
      {
        source: '/hotels',
        destination: '/places',
        permanent: true,
      },
      {
        source: '/spas',
        destination: '/places',
        permanent: true,
      },
      // fixed 404s causing traffic collapse (Jun 2026)
      {
        source: '/bars',
        destination: '/places',
        permanent: true,
      },
      {
        source: '/nightlife',
        destination: '/places',
        permanent: true,
      },
      {
        source: '/restaurants',
        destination: '/places',
        permanent: true,
      },
    ];
  },

  // Multi-zone: serve marketing site at /marketing
  // beforeFiles rewrites run before checking filesystem/static assets
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/marketing',
          destination: 'https://nightsoutriyadh.com/marketing',
        },
        {
          source: '/marketing/:path*',
          destination: 'https://nightsoutriyadh.com/marketing/:path*',
        },
      ],
    };
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Don't include node modules in client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
};

export default nextConfig;
