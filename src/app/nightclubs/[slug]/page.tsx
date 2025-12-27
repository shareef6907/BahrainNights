import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

export default function NightclubDetailPage() {
  return <PlaceDetailPageContent category="nightclub" />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch from database
  return {
    title: `Nightclub in Bahrain | BahrainNights`,
    description: `Discover this amazing nightclub in Bahrain. View photos, event schedule, and more.`,
  };
}
