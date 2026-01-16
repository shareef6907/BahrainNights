interface EventListSchemaProps {
  events: Array<{
    title: string;
    start_date?: string | null;
    date?: string | null;
    venue_name?: string | null;
    affiliate_url?: string | null;
    image_url?: string | null;
    cover_url?: string | null;
    slug?: string | null;
  }>;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
}

export default function EventListSchema({ events, pageTitle, pageDescription, pageUrl }: EventListSchemaProps) {
  if (!events || events.length === 0) return null;

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
        startDate: event.start_date || event.date,
        location: {
          '@type': 'Place',
          name: event.venue_name || 'Venue TBA',
        },
        url: event.affiliate_url || (event.slug ? `https://bahrainnights.com/events/${event.slug}` : pageUrl),
        image: event.cover_url || event.image_url,
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
