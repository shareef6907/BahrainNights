import { permanentRedirect } from 'next/navigation';

export default function NightlifePage() {
  permanentRedirect('/places?category=nightclub');
}
