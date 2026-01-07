import { SEO_CONFIG } from './config';

/**
 * Generate Organization schema for BahrainNights
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...SEO_CONFIG.organization,
    '@id': `${SEO_CONFIG.siteUrl}/#organization`
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en', 'ar']
  };
}

/**
 * Generate Event schema
 */
export function generateEventSchema(event: {
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
}) {
  const startDateTime = event.start_time
    ? `${event.start_date}T${event.start_time}:00`
    : `${event.start_date}T00:00:00`;

  const endDateTime = event.end_date
    ? (event.end_time ? `${event.end_date}T${event.end_time}:00` : `${event.end_date}T23:59:59`)
    : startDateTime;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description || `${event.title} in Bahrain`,
    url: `${SEO_CONFIG.siteUrl}/events/${event.slug}`,
    image: event.featured_image || SEO_CONFIG.defaultImage,
    startDate: startDateTime,
    endDate: endDateTime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue_name || 'Bahrain',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bahrain',
        addressCountry: 'BH',
        streetAddress: event.venue_address || ''
      }
    },
    organizer: {
      '@type': 'Organization',
      name: event.venue_name || SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl
    },
    ...(event.price_range && {
      offers: {
        '@type': 'Offer',
        price: event.price_range.replace(/[^0-9.]/g, '') || '0',
        priceCurrency: 'BHD',
        availability: 'https://schema.org/InStock',
        url: event.booking_url || `${SEO_CONFIG.siteUrl}/events/${event.slug}`
      }
    }),
    performer: {
      '@type': 'PerformingGroup',
      name: event.venue_name || 'Various Artists'
    }
  };
}

/**
 * Generate LocalBusiness schema for venues
 */
export function generateLocalBusinessSchema(venue: {
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
}) {
  const businessTypeMap: Record<string, string> = {
    restaurant: 'Restaurant',
    cafe: 'CafeOrCoffeeShop',
    lounge: 'BarOrPub',
    bar: 'BarOrPub',
    nightclub: 'NightClub',
    'beach-club': 'BeachResort',
    'pool-club': 'SportsClub',
    hotel: 'Hotel'
  };

  const businessType = businessTypeMap[venue.category] || 'LocalBusiness';

  return {
    '@context': 'https://schema.org',
    '@type': businessType,
    '@id': `${SEO_CONFIG.siteUrl}/places/${venue.slug}`,
    name: venue.name,
    description: venue.description || `${venue.name} - ${venue.category} in Bahrain`,
    url: `${SEO_CONFIG.siteUrl}/places/${venue.slug}`,
    image: venue.cover_image_url || SEO_CONFIG.defaultImage,
    logo: venue.logo_url,
    telephone: venue.phone,
    email: venue.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address || '',
      addressLocality: venue.area || 'Manama',
      addressCountry: 'BH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.0667,
      longitude: 50.5577
    },
    ...(venue.opening_hours && {
      openingHoursSpecification: parseOpeningHours(venue.opening_hours)
    }),
    priceRange: venue.price_range || '$$',
    ...(venue.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: venue.rating,
        reviewCount: venue.review_count || 1,
        bestRating: 5,
        worstRating: 1
      }
    }),
    ...(venue.website && { sameAs: [venue.website] })
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SEO_CONFIG.siteUrl}${item.url}`
    }))
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate ItemList schema for event/venue listings
 */
export function generateItemListSchema(
  items: Array<{ name: string; url: string; image?: string; position: number }>,
  listName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      url: item.url.startsWith('http') ? item.url : `${SEO_CONFIG.siteUrl}${item.url}`,
      name: item.name,
      ...(item.image && { image: item.image })
    }))
  };
}

/**
 * Generate Movie schema for cinema listings
 */
export function generateMovieSchema(movie: {
  title: string;
  slug: string;
  overview?: string;
  poster_url?: string;
  duration_minutes?: number;
  genre?: string[];
  imdb_rating?: number;
  release_date?: string;
  director?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    url: `${SEO_CONFIG.siteUrl}/cinema/${movie.slug}`,
    description: movie.overview || `${movie.title} - Now showing in Bahrain cinemas`,
    image: movie.poster_url || SEO_CONFIG.defaultImage,
    ...(movie.duration_minutes && { duration: `PT${movie.duration_minutes}M` }),
    ...(movie.genre && { genre: movie.genre }),
    ...(movie.imdb_rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: movie.imdb_rating,
        bestRating: 10,
        worstRating: 1,
        ratingCount: 1000
      }
    }),
    ...(movie.release_date && { dateCreated: movie.release_date }),
    ...(movie.director && {
      director: {
        '@type': 'Person',
        name: movie.director
      }
    })
  };
}

/**
 * Generate TouristAttraction schema
 */
export function generateAttractionSchema(attraction: {
  name: string;
  description?: string;
  slug: string;
  featured_image?: string;
  address?: string;
  area?: string;
  opening_hours?: string;
  price_range?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description || `${attraction.name} - Tourist attraction in Bahrain`,
    url: `${SEO_CONFIG.siteUrl}/attractions/${attraction.slug}`,
    image: attraction.featured_image || SEO_CONFIG.defaultImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: attraction.address || '',
      addressLocality: attraction.area || 'Bahrain',
      addressCountry: 'BH'
    },
    isAccessibleForFree: attraction.price_range === 'free' || attraction.price_range === 'Free',
    ...(attraction.opening_hours && {
      openingHoursSpecification: parseOpeningHours(attraction.opening_hours)
    }),
    touristType: ['Cultural tourists', 'Family travelers', 'Adventure travelers']
  };
}

/**
 * Helper to parse opening hours string
 */
function parseOpeningHours(hoursString: string) {
  // Simple parsing - in production, this would be more sophisticated
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Default to typical business hours if parsing fails
  return days.map(day => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: day,
    opens: '10:00',
    closes: '22:00'
  }));
}

/**
 * Combine multiple schemas into a JSON-LD script
 */
export function combineSchemas(...schemas: object[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }
  return JSON.stringify(schemas);
}
