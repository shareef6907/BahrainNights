import { Metadata } from 'next';
import { getApprovedArtists, countArtistsByCategory } from '@/lib/db/artists';
import EntertainmentPageClient from '@/components/artists/EntertainmentPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Book World-Class Entertainment | DJs, Live Bands, Performers | BahrainNights',
  description: 'Book premium DJs, live bands, vocalists, fire shows, and performers for your event in Bahrain. Exclusive artist bookings through BahrainNights - Bahrain\'s premier entertainment agency.',
  keywords: ['entertainment booking Bahrain', 'hire DJ Bahrain', 'live band Bahrain', 'wedding entertainment', 'corporate event entertainment', 'fire show Bahrain', 'book artist Bahrain'],
  openGraph: {
    title: 'Book World-Class Entertainment | BahrainNights',
    description: 'Bahrain\'s premier artist booking agency. DJs, live bands, vocalists, fire shows, and more.',
    type: 'website',
    url: 'https://bahrainnights.com/artists',
  },
};

// Schema markup for artist booking service
function ArtistBookingSchema({ artistCount }: { artistCount: number }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.bahrainnights.com/artists#service',
    name: 'Artist Booking Service',
    description: 'Book premium DJs, live bands, vocalists, fire shows, and performers for events in Bahrain. Professional entertainment for weddings, corporate events, and private parties.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.bahrainnights.com/#organization',
      name: 'BahrainNights',
      url: 'https://www.bahrainnights.com'
    },
    serviceType: 'Entertainment Booking Agency',
    areaServed: {
      '@type': 'Country',
      name: 'Bahrain'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Entertainment Categories',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DJ Booking' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Live Band Booking' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vocalist Booking' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fire Show Performers' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Saxophone Players' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Violin Players' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Percussionists' } }
      ]
    },
    aggregateRating: artistCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: artistCount,
      bestRating: '5',
      worstRating: '1'
    } : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function EntertainmentPage() {
  // Fetch all approved artists
  const artists = await getApprovedArtists();
  
  // Get category counts
  const categoryCounts = await countArtistsByCategory();

  return (
    <>
      <ArtistBookingSchema artistCount={artists.length} />
      <EntertainmentPageClient 
        artists={artists} 
        categoryCounts={categoryCounts}
      />
    </>
  );
}
