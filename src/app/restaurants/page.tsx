import { permanentRedirect } from 'next/navigation';

export default function RestaurantsPage() {
  permanentRedirect('/places?category=restaurant');
}
