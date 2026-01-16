interface AttractionListSchemaProps {
  attractions: Array<{
    title?: string | null;
    name?: string | null;
    description?: string | null;
    location?: string | null;
    affiliate_url?: string | null;
    image_url?: string | null;
  }>;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function AttractionListSchema({ attractions, pageTitle, pageDescription, pageUrl }: AttractionListSchemaProps) {
  if (!attractions || attractions.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    numberOfItems: attractions.length,
    itemListElement: attractions.slice(0, 10).map((attraction, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristAttraction',
        name: attraction.title || attraction.name,
        description: attraction.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: attraction.location || 'Bahrain',
          addressCountry: 'Bahrain',
        },
        url: attraction.affiliate_url || pageUrl,
        image: attraction.image_url,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
