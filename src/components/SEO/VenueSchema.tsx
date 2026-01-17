/**
 * VenueSchema Component
 * Generates JSON-LD structured data for venue/place pages
 */

interface VenueSchemaProps {
  venue: {
    name: string;
    slug: string;
    description?: string | null;
    address?: string | null;
    location?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    logo_url?: string | null;
    image_url?: string | null;
    cover_url?: string | null;
    cover_image_url?: string | null;
    category?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    opening_hours?: string | null;
    price_range?: string | null;
    google_maps_url?: string | null;
  };
}

export default function VenueSchema({ venue }: VenueSchemaProps) {
  // Map category to Schema.org type
  const getSchemaType = (category?: string | null): string => {
    const types: Record<string, string> = {
      restaurant: 'Restaurant',
      cafe: 'CafeOrCoffeeShop',
      bar: 'BarOrPub',
      nightclub: 'NightClub',
      hotel: 'Hotel',
      spa: 'HealthAndBeautyBusiness',
      gym: 'ExerciseGym',
      shopping: 'ShoppingCenter',
      entertainment: 'EntertainmentBusiness',
    };
    return types[(category || '').toLowerCase()] || 'LocalBusiness';
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(venue.category),
    name: venue.name,
    description: venue.description?.slice(0, 500) || `${venue.name} in Bahrain`,
    url: `https://bahrainnights.com/places/${venue.slug}`,
    image: venue.cover_url || venue.cover_image_url || venue.image_url || venue.logo_url || 'https://bahrainnights.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address || venue.location || 'Bahrain',
      addressLocality: venue.location || 'Manama',
      addressCountry: 'BH',
    },
    ...(venue.phone && { telephone: venue.phone }),
    ...(venue.email && { email: venue.email }),
    ...(venue.website && { sameAs: [venue.website] }),
    ...(venue.google_maps_url && { hasMap: venue.google_maps_url }),
    ...(venue.latitude && venue.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: venue.latitude,
        longitude: venue.longitude,
      },
    }),
    ...(venue.price_range && { priceRange: venue.price_range }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
