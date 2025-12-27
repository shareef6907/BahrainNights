import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

export default function LoungeBarDetailPage() {
  return <PlaceDetailPageContent category="lounge" />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch from database
  return {
    title: `Lounge & Bar in Bahrain | BahrainNights`,
    description: `Discover this amazing lounge & bar in Bahrain. View photos, hours, drinks menu, and more.`,
  };
}
