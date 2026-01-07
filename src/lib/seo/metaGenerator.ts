import { Metadata } from 'next';
import { SEO_CONFIG, getPageSEO, getCanonicalUrl, getOgImageUrl } from './config';

interface MetaOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path: string;
  type?: 'website' | 'article' | 'event' | 'place';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Generate Next.js Metadata object for any page
 */
export function generateMetadata(options: MetaOptions): Metadata {
  const {
    title = SEO_CONFIG.defaultTitle,
    description = SEO_CONFIG.defaultDescription,
    keywords = SEO_CONFIG.targetKeywords,
    image,
    path,
    type = 'website',
    publishedTime,
    modifiedTime,
    noindex = false
  } = options;

  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = getOgImageUrl(image);

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SEO_CONFIG.siteName }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,

    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': canonicalUrl,
        'ar': `${canonicalUrl}?lang=ar`
      }
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: SEO_CONFIG.locale,
      type: 'website' as const,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle
    },

    robots: noindex ? {
      index: false,
      follow: false
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1
      }
    },

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },

    other: {
      'geo.region': 'BH',
      'geo.placename': 'Bahrain',
      'geo.position': '26.0667;50.5577'
    }
  };
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  const pageConfig = getPageSEO('home');
  return generateMetadata({
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    path: '/',
    type: 'website'
  });
}

/**
 * Generate metadata for events listing page
 */
export function generateEventsMetadata(): Metadata {
  const pageConfig = getPageSEO('events');
  return generateMetadata({
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    path: '/events',
    type: 'website'
  });
}

/**
 * Generate metadata for a single event
 */
export function generateEventMetadata(event: {
  title: string;
  description?: string;
  slug: string;
  featured_image?: string;
  start_date?: string;
  venue_name?: string;
}): Metadata {
  const title = `${event.title} | Events in Bahrain | BahrainNights`;
  const description = event.description?.slice(0, 155) ||
    `${event.title}${event.venue_name ? ` at ${event.venue_name}` : ''} in Bahrain. Get event details, tickets, and more on BahrainNights.`;

  return generateMetadata({
    title,
    description,
    keywords: ['events in bahrain', event.title.toLowerCase(), 'bahrain events'],
    image: event.featured_image,
    path: `/events/${event.slug}`,
    type: 'event',
    publishedTime: event.start_date
  });
}

/**
 * Generate metadata for venues/places listing page
 */
export function generatePlacesMetadata(category?: string): Metadata {
  const categoryTitles: Record<string, string> = {
    restaurants: 'Restaurants in Bahrain',
    cafes: 'Cafes in Bahrain',
    'lounges-bars': 'Lounges & Bars in Bahrain',
    nightclubs: 'Nightclubs in Bahrain',
    'beach-pool-clubs': 'Beach & Pool Clubs in Bahrain'
  };

  const title = category
    ? `${categoryTitles[category] || category} | BahrainNights`
    : 'Places in Bahrain | Venues & Locations | BahrainNights';

  const description = category
    ? `Discover the best ${categoryTitles[category]?.toLowerCase() || category} in Bahrain. Browse venues, read reviews, and find your next favorite spot.`
    : 'Browse all venues and places in Bahrain - restaurants, clubs, cafes, and more. Find the perfect spot for any occasion.';

  return generateMetadata({
    title,
    description,
    keywords: ['places in bahrain', category || 'venues bahrain', 'bahrain locations'],
    path: category ? `/${category}` : '/places',
    type: 'website'
  });
}

/**
 * Generate metadata for a single venue/place
 */
export function generateVenueMetadata(venue: {
  name: string;
  description?: string;
  slug: string;
  category: string;
  cover_image_url?: string;
  area?: string;
}): Metadata {
  const categoryMap: Record<string, string> = {
    restaurant: 'Restaurant',
    cafe: 'Cafe',
    lounge: 'Lounge',
    bar: 'Bar',
    nightclub: 'Nightclub',
    'beach-club': 'Beach Club',
    'pool-club': 'Pool Club'
  };

  const categoryLabel = categoryMap[venue.category] || venue.category;
  const title = `${venue.name} | ${categoryLabel} in ${venue.area || 'Bahrain'} | BahrainNights`;
  const description = venue.description?.slice(0, 155) ||
    `${venue.name} - ${categoryLabel} in ${venue.area || 'Bahrain'}. View menu, photos, reviews, and book your visit on BahrainNights.`;

  return generateMetadata({
    title,
    description,
    keywords: [`${venue.category} bahrain`, venue.name.toLowerCase(), `${venue.area?.toLowerCase() || ''} restaurants`],
    image: venue.cover_image_url,
    path: `/${venue.category}s/${venue.slug}`,
    type: 'place'
  });
}

/**
 * Generate metadata for cinema page
 */
export function generateCinemaMetadata(): Metadata {
  const pageConfig = getPageSEO('cinema');
  return generateMetadata({
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    path: '/cinema',
    type: 'website'
  });
}

/**
 * Generate metadata for attractions page
 */
export function generateAttractionsMetadata(): Metadata {
  const pageConfig = getPageSEO('attractions');
  return generateMetadata({
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    path: '/attractions',
    type: 'website'
  });
}

/**
 * Generate metadata for a single attraction
 */
export function generateAttractionMetadata(attraction: {
  name: string;
  description?: string;
  slug: string;
  featured_image?: string;
  area?: string;
}): Metadata {
  const title = `${attraction.name} | Attractions in Bahrain | BahrainNights`;
  const description = attraction.description?.slice(0, 155) ||
    `Visit ${attraction.name}${attraction.area ? ` in ${attraction.area}` : ''} - one of the top attractions in Bahrain. Get info, photos, and visitor tips on BahrainNights.`;

  return generateMetadata({
    title,
    description,
    keywords: ['attractions in bahrain', attraction.name.toLowerCase(), 'things to do in bahrain'],
    image: attraction.featured_image,
    path: `/attractions/${attraction.slug}`,
    type: 'place'
  });
}

/**
 * Generate metadata for offers page
 */
export function generateOffersMetadata(): Metadata {
  return generateMetadata({
    title: 'Offers & Deals in Bahrain | BahrainNights',
    description: 'Find the best offers and deals in Bahrain - restaurant discounts, happy hours, ladies nights, and special promotions.',
    keywords: ['offers bahrain', 'deals bahrain', 'discounts bahrain', 'happy hour bahrain'],
    path: '/offers',
    type: 'website'
  });
}
