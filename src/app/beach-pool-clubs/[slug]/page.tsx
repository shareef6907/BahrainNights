import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

export default function BeachPoolClubDetailPage() {
  return <PlaceDetailPageContent category="beach-club" />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch from database
  return {
    title: `Beach & Pool Club in Bahrain | BahrainNights`,
    description: `Discover this amazing beach & pool club in Bahrain. View photos, amenities, and more.`,
  };
}
