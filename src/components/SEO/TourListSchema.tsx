/**
 * TourListSchema Component
 * Generates JSON-LD structured data for tours listing pages
 */

interface TourItem {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  image?: string;
  duration?: string;
  category?: string;
  priceFrom?: number | null;
  currency?: string;
  rating?: number | null;
}

interface TourListSchemaProps {
  tours: TourItem[];
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function TourListSchema({
  tours,
  pageTitle,
  pageDescription,
  pageUrl,
}: TourListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    numberOfItems: tours.length,
    itemListElement: tours.slice(0, 10).map((tour, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristTrip',
        name: tour.name,
        url: `https://www.bahrainnights.com/tours#${tour.slug || tour.id}`,
        description: (tour.shortDescription || tour.description || '').slice(0, 200),
        image: tour.image || 'https://www.bahrainnights.com/og-image.jpg',
        tourSchedule: tour.duration
          ? {
              '@type': 'Schedule',
              duration: tour.duration,
            }
          : undefined,
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
