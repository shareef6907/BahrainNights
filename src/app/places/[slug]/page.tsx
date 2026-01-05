import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVenueBySlug, getApprovedVenues, getVenueEvents, getVenueOffers } from '@/lib/db/venues';
import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

// Force dynamic rendering to ensure fresh data after admin approval
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue || venue.status !== 'approved') {
    return {
      title: 'Venue Not Found | BahrainNights',
    };
  }

  return {
    title: `${venue.name} | BahrainNights`,
    description: venue.description?.slice(0, 160) || `Discover ${venue.name} in ${venue.area}, Bahrain`,
    openGraph: {
      title: venue.name,
      description: venue.description?.slice(0, 160) || `Discover ${venue.name} in ${venue.area}, Bahrain`,
      images: venue.cover_image_url ? [venue.cover_image_url] : [],
    },
  };
}

export default async function PlaceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch venue from database
  const venue = await getVenueBySlug(slug);

  // Return 404 if venue not found or not approved
  if (!venue || venue.status !== 'approved') {
    notFound();
  }

  // Fetch similar venues (same category, excluding current venue)
  const similarVenues = await getApprovedVenues({
    category: venue.category,
    limit: 4,
  });

  // Filter out current venue from similar venues
  const filteredSimilarVenues = similarVenues.filter(v => v.id !== venue.id);

  // Fetch upcoming events for this venue
  const venueEvents = await getVenueEvents(venue.name);

  // Fetch active offers for this venue
  const venueOffers = await getVenueOffers(venue.id);

  return (
    <PlaceDetailPageContent
      venue={venue}
      similarVenues={filteredSimilarVenues}
      events={venueEvents}
      offers={venueOffers}
    />
  );
}
