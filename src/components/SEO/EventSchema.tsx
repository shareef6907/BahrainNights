/**
 * EventSchema Component
 * Generates JSON-LD structured data for events to improve SEO
 * and fix Google Search Console structured data issues.
 *
 * Required fields by Google:
 * - name, startDate, location (with address)
 *
 * Recommended fields we're adding:
 * - endDate, offers (with price), performer, organizer, image, description
 */

interface EventSchemaProps {
  event: {
    title: string;
    description?: string | null;
    start_date?: string | null;
    date?: string | null;
    start_time?: string | null;
    time?: string | null;
    end_date?: string | null;
    end_time?: string | null;
    venue_name?: string | null;
    venue_address?: string | null;
    location?: string | null;
    city?: string | null;
    country?: string | null;
    image_url?: string | null;
    cover_url?: string | null;
    featured_image?: string | null;
    affiliate_url?: string | null;
    booking_url?: string | null;
    category?: string | null;
    price?: string | null;
    is_sold_out?: boolean;
    slug?: string | null;
  };
}

// Parse price string to extract numeric value
function parsePrice(priceStr?: string | null): { price: number; currency: string } {
  if (!priceStr || priceStr.toLowerCase().includes('free')) {
    return { price: 0, currency: 'BHD' };
  }

  // Extract number from price string (e.g., "BD 25", "From BD 15", "25 BD", "BHD 50")
  const match = priceStr.match(/(\d+(?:\.\d+)?)/);
  if (match) {
    return {
      price: parseFloat(match[1]),
      currency: 'BHD',
    };
  }

  return { price: 0, currency: 'BHD' };
}

// Try to extract performer name from title
function extractPerformerFromTitle(title: string): string {
  // Common patterns: "Artist Name Live", "Artist Name Concert", "Artist Name at Venue"
  const patterns = [
    /^(.+?)\s+live\s+/i,
    /^(.+?)\s+concert/i,
    /^(.+?)\s+at\s+/i,
    /^(.+?)\s+in\s+bahrain/i,
    /^(.+?)\s+tour/i,
    /^(.+?)\s+-\s+/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      const performer = match[1].trim();
      // Skip if it's a generic term
      if (!['the', 'a', 'an', 'this', 'that'].includes(performer.toLowerCase())) {
        return performer;
      }
    }
  }

  // Fallback: use the first part of the title
  return title.split(' - ')[0] || title;
}

// Get country name and code from various formats
function getCountryInfo(code?: string | null): { name: string; code: string } {
  const countries: Record<string, { name: string; code: string }> = {
    bahrain: { name: 'Bahrain', code: 'BH' },
    bh: { name: 'Bahrain', code: 'BH' },
    uae: { name: 'United Arab Emirates', code: 'AE' },
    ae: { name: 'United Arab Emirates', code: 'AE' },
    saudi: { name: 'Saudi Arabia', code: 'SA' },
    'saudi arabia': { name: 'Saudi Arabia', code: 'SA' },
    sa: { name: 'Saudi Arabia', code: 'SA' },
    qatar: { name: 'Qatar', code: 'QA' },
    qa: { name: 'Qatar', code: 'QA' },
    egypt: { name: 'Egypt', code: 'EG' },
    eg: { name: 'Egypt', code: 'EG' },
    turkey: { name: 'Turkey', code: 'TR' },
    tr: { name: 'Turkey', code: 'TR' },
    uk: { name: 'United Kingdom', code: 'GB' },
    gb: { name: 'United Kingdom', code: 'GB' },
  };

  const key = (code || 'bahrain').toLowerCase();
  return countries[key] || { name: code || 'Bahrain', code: 'BH' };
}

// Map category to Schema.org event type
function getSchemaEventType(category?: string | null): string {
  const eventTypes: Record<string, string> = {
    music: 'MusicEvent',
    nightlife: 'MusicEvent',
    arts: 'ExhibitionEvent',
    cultural: 'ExhibitionEvent',
    sports: 'SportsEvent',
    business: 'BusinessEvent',
    dining: 'FoodEvent',
    family: 'ChildrensEvent',
    wellness: 'Event',
  };

  return eventTypes[(category || '').toLowerCase()] || 'Event';
}

export default function EventSchema({ event }: EventSchemaProps) {
  const formatDateTime = (date: string, time?: string | null, isEndTime?: boolean) => {
    if (time && !time.toLowerCase().includes('tba')) {
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
      // Already in 24h format
      const timeParts = cleanTime.split(':');
      return `${date}T${timeParts[0].padStart(2, '0')}:${timeParts[1] || '00'}:00`;
    }
    // Default: 7 PM start, 11:59 PM end
    return isEndTime ? `${date}T23:59:00` : `${date}T19:00:00`;
  };

  const eventDate = event.start_date || event.date;
  if (!eventDate) return null;

  const eventTime = event.start_time || event.time;
  const eventEndDate = event.end_date || eventDate;
  const eventEndTime = event.end_time || eventTime;

  const eventImage = event.cover_url || event.featured_image || event.image_url || 'https://bahrainnights.com/og-image.jpg';
  const eventUrl = event.affiliate_url || event.booking_url || (event.slug ? `https://bahrainnights.com/events/${event.slug}` : 'https://bahrainnights.com/events');
  const countryInfo = getCountryInfo(event.country);
  const priceInfo = parsePrice(event.price);
  const performerName = extractPerformerFromTitle(event.title);
  const schemaType = getSchemaEventType(event.category);

  // Build proper address with streetAddress (required by Google)
  const venueAddress = event.venue_address || event.location || event.venue_name || '';
  const addressParts = venueAddress.split(',').map((p) => p.trim());

  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: event.title,
    description: event.description?.slice(0, 500) || `${event.title} - Live event at ${event.venue_name || 'Bahrain'}`,
    startDate: formatDateTime(eventDate, eventTime),
    endDate: formatDateTime(eventEndDate, eventEndTime, true),
    eventStatus: event.is_sold_out
      ? 'https://schema.org/EventPostponed'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue_name || 'Venue TBA',
      address: {
        '@type': 'PostalAddress',
        streetAddress: addressParts[0] || event.venue_name || 'Bahrain',
        addressLocality: addressParts[1] || event.city || 'Manama',
        addressRegion: addressParts[2] || 'Capital Governorate',
        addressCountry: countryInfo.code,
      },
    },
    image: [eventImage],
    offers: {
      '@type': 'Offer',
      url: eventUrl,
      price: priceInfo.price,
      priceCurrency: priceInfo.currency,
      availability: event.is_sold_out
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    organizer: {
      '@type': 'Organization',
      name: event.venue_name || 'BahrainNights',
      url: 'https://bahrainnights.com',
    },
    performer: {
      '@type': 'PerformingGroup',
      name: performerName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
