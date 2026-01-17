/**
 * AttractionListSchema Component
 * Generates JSON-LD structured data for attraction listing pages
 */

interface AttractionItem {
  id: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  location?: string | null;
}

interface AttractionListSchemaProps {
  attractions: AttractionItem[];
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function AttractionListSchema({
  attractions,
  pageTitle,
  pageDescription,
  pageUrl,
}: AttractionListSchemaProps) {
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
        name: attraction.title,
        url: `https://bahrainnights.com/attractions/${attraction.id}`,
        description: attraction.description?.slice(0, 200) || attraction.title,
        image: attraction.image_url || 'https://bahrainnights.com/og-image.jpg',
        address: {
          '@type': 'PostalAddress',
          streetAddress: attraction.location || 'Bahrain',
          addressLocality: 'Manama',
          addressCountry: 'BH',
        },
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
