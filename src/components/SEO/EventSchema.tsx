interface EventSchemaProps {
  event: {
    title: string;
    description?: string | null;
    start_date?: string | null;
    date?: string | null;
    start_time?: string | null;
    time?: string | null;
    end_date?: string | null;
    venue_name?: string | null;
    location?: string | null;
    city?: string | null;
    country?: string | null;
    image_url?: string | null;
    cover_url?: string | null;
    featured_image?: string | null;
    affiliate_url?: string | null;
    category?: string | null;
    is_sold_out?: boolean;
    slug?: string | null;
  };
}

export default function EventSchema({ event }: EventSchemaProps) {
  const getCountryName = (code: string) => {
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

  const formatDateTime = (date: string, time?: string | null) => {
    if (time) {
      // Handle various time formats
      const cleanTime = time.replace(/\s*(AM|PM)/i, (match) => match.toUpperCase());
      // Convert 12h to 24h if needed
      if (cleanTime.includes('AM') || cleanTime.includes('PM')) {
        const [timePart, period] = cleanTime.split(/\s*(AM|PM)/i);
        const [hours, minutes] = timePart.split(':');
        let h = parseInt(hours, 10);
        if (period?.toUpperCase() === 'PM' && h !== 12) h += 12;
        if (period?.toUpperCase() === 'AM' && h === 12) h = 0;
        return `${date}T${h.toString().padStart(2, '0')}:${minutes || '00'}:00`;
      }
      return `${date}T${time}:00`;
    }
    return `${date}T19:00:00`; // Default to 7 PM if no time
  };

  const eventDate = event.start_date || event.date;
  if (!eventDate) return null;

  const eventTime = event.start_time || event.time;
  const eventImage = event.cover_url || event.featured_image || event.image_url || 'https://bahrainnights.com/og-image.jpg';
  const eventUrl = event.affiliate_url || (event.slug ? `https://bahrainnights.com/events/${event.slug}` : 'https://bahrainnights.com/events');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description || `${event.title} - Live event at ${event.venue_name || 'Bahrain'}`,
    startDate: formatDateTime(eventDate, eventTime),
    endDate: event.end_date
      ? formatDateTime(event.end_date, eventTime)
      : formatDateTime(eventDate, eventTime),
    eventStatus: event.is_sold_out
      ? 'https://schema.org/EventPostponed'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue_name || 'Venue TBA',
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city || event.location || '',
        addressCountry: event.country ? getCountryName(event.country) : 'Bahrain',
      },
    },
    image: eventImage,
    offers: {
      '@type': 'Offer',
      url: eventUrl,
      availability: event.is_sold_out
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      priceCurrency: 'BHD',
      validFrom: new Date().toISOString(),
    },
    organizer: {
      '@type': 'Organization',
      name: 'BahrainNights',
      url: 'https://bahrainnights.com',
    },
    performer: {
      '@type': 'PerformingGroup',
      name: event.title.split(' - ')[0] || event.title,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
