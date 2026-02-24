import { Metadata } from 'next';
import ArtistRegistrationForm from '@/components/artists/ArtistRegistrationForm';

export const metadata: Metadata = {
  title: 'Join Our Agency | Become a BahrainNights Artist',
  description: 'Join Bahrain\'s premier entertainment booking agency. Register as a DJ, vocalist, musician, performer, or entertainer and get booked for events across Bahrain.',
  keywords: ['artist registration Bahrain', 'DJ registration', 'performer registration', 'entertainment agency Bahrain'],
};

export default function BecomeAnArtistPage() {
  return <ArtistRegistrationForm />;
}
