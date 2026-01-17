/**
 * EventListSchema Component
 * Generates JSON-LD structured data for event listing pages
 */

interface EventItem {
  title: string;
  slug: string;
  description?: string | null;
  start_date?: string | null;
  date?: string | null;
  venue_name?: string | null;
  image_url?: string | null;
  cover_url?: string | null;
}

interface EventListSchemaProps {
  events: EventItem[];
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function EventListSchema({
  events,
  pageTitle,
  pageDescription,
  pageUrl,
}: EventListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    numberOfItems: events.length,
    itemListElement: events.slice(0, 10).map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        url: `https://bahrainnights.com/events/${event.slug}`,
        description: event.description?.slice(0, 200) || event.title,
        startDate: event.start_date || event.date || new Date().toISOString(),
        location: {
          '@type': 'Place',
          name: event.venue_name || 'Bahrain',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Manama',
            addressCountry: 'BH',
          },
        },
        image: event.cover_url || event.image_url || 'https://bahrainnights.com/og-image.jpg',
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
