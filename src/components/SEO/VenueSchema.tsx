interface VenueSchemaProps {
  venue: {
    name: string;
    description?: string | null;
    address?: string | null;
    location?: string | null;
    phone?: string | null;
    website?: string | null;
    image_url?: string | null;
    cover_url?: string | null;
    category?: string | null;
    google_maps_url?: string | null;
    reservation_url?: string | null;
    slug?: string | null;
  };
}

export default function VenueSchema({ venue }: VenueSchemaProps) {
  const getVenueType = (category?: string | null) => {
    if (!category) return 'LocalBusiness';
    const types: Record<string, string> = {
      restaurant: 'Restaurant',
      restaurants: 'Restaurant',
      dining: 'Restaurant',
      cafe: 'CafeOrCoffeeShop',
      coffee: 'CafeOrCoffeeShop',
      bar: 'BarOrPub',
      bars: 'BarOrPub',
      nightclub: 'NightClub',
      club: 'NightClub',
      lounge: 'BarOrPub',
      lounges: 'BarOrPub',
      hotel: 'Hotel',
      hotels: 'Hotel',
      spa: 'DaySpa',
      beach: 'Beach',
      default: 'LocalBusiness',
    };
    return types[category.toLowerCase()] || types.default;
  };

  const venueUrl = venue.slug
    ? `https://bahrainnights.com/places/${venue.slug}`
    : venue.website || 'https://bahrainnights.com/places';

  const schema = {
    '@context': 'https://schema.org',
    '@type': getVenueType(venue.category),
    name: venue.name,
    description: venue.description || `${venue.name} - Premier venue in Bahrain`,
    image: venue.cover_url || venue.image_url || 'https://bahrainnights.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address || '',
      addressLocality: venue.location || 'Manama',
      addressCountry: 'Bahrain',
    },
    telephone: venue.phone || '',
    url: venueUrl,
    hasMap: venue.google_maps_url || '',
    acceptsReservations: !!venue.reservation_url,
    ...(venue.reservation_url && {
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: venue.reservation_url,
        },
        result: {
          '@type': 'Reservation',
          name: `Reservation at ${venue.name}`,
        },
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
