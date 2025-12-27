import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

export default function CafeDetailPage() {
  return <PlaceDetailPageContent category="cafe" />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch from database
  return {
    title: `Cafe in Bahrain | BahrainNights`,
    description: `Discover this amazing cafe in Bahrain. View photos, hours, menu, and more.`,
  };
}
