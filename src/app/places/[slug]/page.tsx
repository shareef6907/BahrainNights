import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVenueBySlug, getApprovedVenues, getVenueEvents, getVenueOffers, getVenueReels } from '@/lib/db/venues';
import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';
import VenueSchema from '@/components/seo/VenueSchema';

// Force dynamic rendering to ensure fresh data after admin approval
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue || venue.status !== 'approved' || venue.is_hidden) {
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

  // Return 404 if venue not found, not approved, or hidden
  if (!venue || venue.status !== 'approved' || venue.is_hidden) {
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

  // Fetch Instagram reels for this venue
  const venueReels = await getVenueReels(venue.id);

  return (
    <>
      <VenueSchema
        venue={{
          name: venue.name,
          description: venue.description,
          address: venue.address,
          location: venue.area,
          phone: venue.phone,
          website: venue.website,
          image_url: venue.logo_url,
          cover_url: venue.cover_image_url,
          category: venue.category,
          google_maps_url: venue.google_maps_url,
          reservation_url: venue.reservation_url,
          slug: venue.slug,
        }}
      />
      <PlaceDetailPageContent
        venue={venue}
        similarVenues={filteredSimilarVenues}
        events={venueEvents}
        offers={venueOffers}
        reels={venueReels}
      />
    </>
  );
}
