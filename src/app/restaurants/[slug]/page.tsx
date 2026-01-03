import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVenueBySlug, getApprovedVenues, getVenueEvents } from '@/lib/db/venues';
import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue || venue.status !== 'approved') {
    return {
      title: 'Restaurant Not Found | BahrainNights',
    };
  }

  return {
    title: `${venue.name} | Restaurants in Bahrain | BahrainNights`,
    description: venue.description?.slice(0, 160) || `Discover ${venue.name} in ${venue.area}, Bahrain. View photos, hours, menu, and make a reservation.`,
    openGraph: {
      title: venue.name,
      description: venue.description?.slice(0, 160) || `Discover ${venue.name} in ${venue.area}, Bahrain`,
      images: venue.cover_image_url ? [venue.cover_image_url] : [],
    },
  };
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const venue = await getVenueBySlug(slug);

  if (!venue || venue.status !== 'approved') {
    notFound();
  }

  const similarVenues = await getApprovedVenues({
    category: venue.category,
    limit: 4,
  });

  const filteredSimilarVenues = similarVenues.filter(v => v.id !== venue.id);

  const venueEvents = await getVenueEvents(venue.name);

  return (
    <PlaceDetailPageContent
      venue={venue}
      similarVenues={filteredSimilarVenues}
      events={venueEvents}
    />
  );
}
