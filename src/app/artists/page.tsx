import { Metadata } from 'next';
import { getApprovedArtists, countArtistsByCategory } from '@/lib/db/artists';
import EntertainmentPageClient from '@/components/artists/EntertainmentPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Book World-Class Entertainment | DJs, Live Bands, Performers | BahrainNights',
  description: 'Book premium DJs, live bands, vocalists, fire shows, and performers for your event in Bahrain. Exclusive artist bookings through BahrainNights - Bahrain\'s premier entertainment agency.',
  keywords: ['entertainment booking Bahrain', 'hire DJ Bahrain', 'live band Bahrain', 'wedding entertainment', 'corporate event entertainment', 'fire show Bahrain', 'book artist Bahrain'],
  openGraph: {
    title: 'Book World-Class Entertainment | BahrainNights',
    description: 'Bahrain\'s premier artist booking agency. DJs, live bands, vocalists, fire shows, and more.',
    type: 'website',
    url: 'https://bahrainnights.com/artists',
  },
};

export default async function EntertainmentPage() {
  // Fetch all approved artists
  const artists = await getApprovedArtists();
  
  // Get category counts
  const categoryCounts = await countArtistsByCategory();

  return (
    <EntertainmentPageClient 
      artists={artists} 
      categoryCounts={categoryCounts}
    />
  );
}
