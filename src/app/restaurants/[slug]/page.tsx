import PlaceDetailPageContent from '@/components/places/PlaceDetailPageContent';

export default function RestaurantDetailPage() {
  return <PlaceDetailPageContent category="restaurant" />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch from database
  return {
    title: `Restaurant in Bahrain | BahrainNights`,
    description: `Discover this amazing restaurant in Bahrain. View photos, hours, menu, and make a reservation.`,
  };
}
