interface AttractionSchemaProps {
  attraction: {
    title?: string | null;
    name?: string | null;
    description?: string | null;
    venue?: string | null;
    location?: string | null;
    city?: string | null;
    country?: string | null;
    image_url?: string | null;
    cover_url?: string | null;
    category?: string | null;
    affiliate_url?: string | null;
    url?: string | null;
    is_sold_out?: boolean;
    slug?: string | null;
  };
}

export default function AttractionSchema({ attraction }: AttractionSchemaProps) {
  const getAttractionType = (category?: string | null) => {
    if (!category) return 'TouristAttraction';
    const types: Record<string, string> = {
      tours: 'TouristAttraction',
      'water-sports': 'SportsActivityLocation',
      'water sports': 'SportsActivityLocation',
      'indoor-activities': 'EntertainmentBusiness',
      'indoor activities': 'EntertainmentBusiness',
      'theme-parks': 'AmusementPark',
      'theme parks': 'AmusementPark',
      'boat-tours': 'TouristAttraction',
      'boat tours': 'TouristAttraction',
      sightseeing: 'TouristAttraction',
      adventure: 'TouristAttraction',
      experiences: 'TouristAttraction',
      default: 'TouristAttraction',
    };
    return types[category.toLowerCase()] || types.default;
  };

  const getCountryName = (code?: string | null) => {
    if (!code) return 'Bahrain';
    const countries: Record<string, string> = {
      bahrain: 'Bahrain',
      Bahrain: 'Bahrain',
      uae: 'United Arab Emirates',
      UAE: 'United Arab Emirates',
      saudi: 'Saudi Arabia',
      'Saudi Arabia': 'Saudi Arabia',
      qatar: 'Qatar',
      Qatar: 'Qatar',
      egypt: 'Egypt',
      Egypt: 'Egypt',
      turkey: 'Turkey',
      'Türkiye': 'Turkey',
      uk: 'United Kingdom',
      UK: 'United Kingdom',
    };
    return countries[code] || code;
  };

  const title = attraction.title || attraction.name || 'Attraction';
  const attractionUrl = attraction.affiliate_url || attraction.url ||
    (attraction.slug ? `https://bahrainnights.com/attractions/${attraction.slug}` : 'https://bahrainnights.com/attractions');

  const schema = {
    '@context': 'https://schema.org',
    '@type': getAttractionType(attraction.category),
    name: title,
    description: attraction.description || `${title} - Experience in ${attraction.location || 'Bahrain'}`,
    image: attraction.cover_url || attraction.image_url || 'https://bahrainnights.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: attraction.city || attraction.location || '',
      addressCountry: getCountryName(attraction.country),
    },
    isAccessibleForFree: false,
    publicAccess: true,
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: attractionUrl,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
