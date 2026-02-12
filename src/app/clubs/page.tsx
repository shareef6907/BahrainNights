import { permanentRedirect } from 'next/navigation';

export default function ClubsPage() {
  permanentRedirect('/places?category=nightclub');
}
