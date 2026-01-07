'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema
} from '@/lib/seo/structuredData';

interface StructuredDataProps {
  schemas?: object[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeDefault?: boolean;
}

/**
 * Component to render JSON-LD structured data
 */
export function StructuredData({
  schemas = [],
  breadcrumbs,
  includeDefault = true
}: StructuredDataProps) {
  const pathname = usePathname();

  // Build all schemas
  const allSchemas: object[] = [];

  // Add default schemas if requested
  if (includeDefault) {
    allSchemas.push(generateOrganizationSchema());
    allSchemas.push(generateWebsiteSchema());
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    // Always include Home
    const fullBreadcrumbs = [
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ];
    allSchemas.push(generateBreadcrumbSchema(fullBreadcrumbs));
  } else if (pathname && pathname !== '/') {
    // Generate default breadcrumbs based on pathname
    const defaultBreadcrumbs = generateDefaultBreadcrumbs(pathname);
    if (defaultBreadcrumbs.length > 0) {
      allSchemas.push(generateBreadcrumbSchema(defaultBreadcrumbs));
    }
  }

  // Add custom schemas
  allSchemas.push(...schemas);

  if (allSchemas.length === 0) return null;

  // Render as single array or individual items
  const jsonLd = allSchemas.length === 1
    ? JSON.stringify(allSchemas[0])
    : JSON.stringify(allSchemas);

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
      strategy="afterInteractive"
    />
  );
}

/**
 * Generate default breadcrumbs from pathname
 */
function generateDefaultBreadcrumbs(pathname: string): Array<{ name: string; url: string }> {
  const breadcrumbs: Array<{ name: string; url: string }> = [
    { name: 'Home', url: '/' }
  ];

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return breadcrumbs;

  // Map segments to readable names
  const segmentNames: Record<string, string> = {
    events: 'Events',
    cinema: 'Cinema',
    places: 'Places',
    restaurants: 'Restaurants',
    cafes: 'Cafes',
    'lounges-bars': 'Lounges & Bars',
    nightclubs: 'Nightclubs',
    'beach-pool-clubs': 'Beach & Pool Clubs',
    attractions: 'Attractions',
    offers: 'Offers',
    about: 'About',
    contact: 'Contact'
  };

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Skip dynamic segments (they'll be replaced by item name in page-specific schemas)
    if (index === segments.length - 1 && segments.length > 1) {
      return; // Let the page component handle the last breadcrumb
    }

    const name = segmentNames[segment] || formatSegmentName(segment);
    breadcrumbs.push({ name, url: currentPath });
  });

  return breadcrumbs;
}

/**
 * Format a URL segment into a readable name
 */
function formatSegmentName(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Wrapper for event structured data
 */
export function EventStructuredData({
  event
}: {
  event: {
    title: string;
    description?: string;
    slug: string;
    start_date: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    featured_image?: string;
    venue_name?: string;
    venue_address?: string;
    price_range?: string;
    booking_url?: string;
    category?: string;
  };
}) {
  // Import here to avoid circular dependency
  const { generateEventSchema } = require('@/lib/seo/structuredData');

  return (
    <StructuredData
      schemas={[generateEventSchema(event)]}
      breadcrumbs={[
        { name: 'Events', url: '/events' },
        { name: event.title, url: `/events/${event.slug}` }
      ]}
    />
  );
}

/**
 * Wrapper for venue structured data
 */
export function VenueStructuredData({
  venue
}: {
  venue: {
    name: string;
    description?: string;
    slug: string;
    category: string;
    address?: string;
    area?: string;
    phone?: string;
    email?: string;
    website?: string;
    cover_image_url?: string;
    logo_url?: string;
    opening_hours?: string;
    price_range?: string;
    rating?: number;
    review_count?: number;
  };
}) {
  const { generateLocalBusinessSchema } = require('@/lib/seo/structuredData');

  const categoryPaths: Record<string, { path: string; name: string }> = {
    restaurant: { path: 'restaurants', name: 'Restaurants' },
    cafe: { path: 'cafes', name: 'Cafes' },
    lounge: { path: 'lounges-bars', name: 'Lounges & Bars' },
    bar: { path: 'lounges-bars', name: 'Lounges & Bars' },
    nightclub: { path: 'nightclubs', name: 'Nightclubs' },
    'beach-club': { path: 'beach-pool-clubs', name: 'Beach & Pool Clubs' },
    'pool-club': { path: 'beach-pool-clubs', name: 'Beach & Pool Clubs' }
  };

  const categoryInfo = categoryPaths[venue.category] || { path: 'places', name: 'Places' };

  return (
    <StructuredData
      schemas={[generateLocalBusinessSchema(venue)]}
      breadcrumbs={[
        { name: categoryInfo.name, url: `/${categoryInfo.path}` },
        { name: venue.name, url: `/${categoryInfo.path}/${venue.slug}` }
      ]}
    />
  );
}

/**
 * Wrapper for attraction structured data
 */
export function AttractionStructuredData({
  attraction
}: {
  attraction: {
    name: string;
    description?: string;
    slug: string;
    featured_image?: string;
    address?: string;
    area?: string;
    opening_hours?: string;
    price_range?: string;
  };
}) {
  const { generateAttractionSchema } = require('@/lib/seo/structuredData');

  return (
    <StructuredData
      schemas={[generateAttractionSchema(attraction)]}
      breadcrumbs={[
        { name: 'Attractions', url: '/attractions' },
        { name: attraction.name, url: `/attractions/${attraction.slug}` }
      ]}
    />
  );
}

/**
 * Wrapper for movie structured data
 */
export function MovieStructuredData({
  movie
}: {
  movie: {
    title: string;
    slug: string;
    overview?: string;
    poster_url?: string;
    duration_minutes?: number;
    genre?: string[];
    imdb_rating?: number;
    release_date?: string;
    director?: string;
  };
}) {
  const { generateMovieSchema } = require('@/lib/seo/structuredData');

  return (
    <StructuredData
      schemas={[generateMovieSchema(movie)]}
      breadcrumbs={[
        { name: 'Cinema', url: '/cinema' },
        { name: movie.title, url: `/cinema/${movie.slug}` }
      ]}
    />
  );
}

/**
 * FAQ structured data wrapper
 */
export function FAQStructuredData({
  faqs
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const { generateFAQSchema } = require('@/lib/seo/structuredData');

  return (
    <StructuredData
      schemas={[generateFAQSchema(faqs)]}
      includeDefault={false}
    />
  );
}

export default StructuredData;
