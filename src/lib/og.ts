/**
 * Shared Open Graph image helpers.
 *
 * Every page that declares its own `openGraph` block replaces the root
 * layout's openGraph entirely, which drops the inherited `og:image`. Guide
 * pages were doing exactly that and shipping no og:image at all.
 *
 * Import `OG_IMAGE` alongside a page's own openGraph object so each page
 * carries a shareable image.
 */

export const OG_IMAGE = {
  url: 'https://www.bahrainnights.com/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Bahrain Nights - Events, Nightlife & Things to Do in Bahrain',
} as const;

/**
 * Per-section OG images. Each maps to a generated asset in public/
 * (see scripts/generate-og-images.js).
 */
export const OG_IMAGES = {
  default: OG_IMAGE,
  restaurants: {
    url: 'https://www.bahrainnights.com/og-restaurants.jpg',
    width: 1200,
    height: 630,
    alt: 'Best Restaurants in Bahrain - Bahrain Nights',
  },
  cafes: {
    url: 'https://www.bahrainnights.com/og-cafes.jpg',
    width: 1200,
    height: 630,
    alt: 'Best Cafes in Bahrain - Bahrain Nights',
  },
  nightlife: {
    url: 'https://www.bahrainnights.com/og-nightlife.jpg',
    width: 1200,
    height: 630,
    alt: 'Bahrain Nightlife Guide - Bahrain Nights',
  },
  hotels: {
    url: 'https://www.bahrainnights.com/og-hotels.jpg',
    width: 1200,
    height: 630,
    alt: 'Best Hotels in Bahrain - Bahrain Nights',
  },
  events: {
    url: 'https://www.bahrainnights.com/og-events.jpg',
    width: 1200,
    height: 630,
    alt: 'Events in Bahrain - Bahrain Nights',
  },
  weekend: {
    url: 'https://www.bahrainnights.com/og-weekend.jpg',
    width: 1200,
    height: 630,
    alt: "What's Happening in Bahrain This Weekend - Bahrain Nights",
  },
  thingsToDo: {
    url: 'https://www.bahrainnights.com/og-things-to-do.jpg',
    width: 1200,
    height: 630,
    alt: 'Things to Do in Bahrain - Bahrain Nights',
  },
} as const;
