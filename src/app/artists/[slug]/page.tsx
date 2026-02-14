import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtistBySlug, getArtistsByCategory } from '@/lib/db/artists';
import ArtistPageClient from '@/components/artists/ArtistPageClient';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    return {
      title: 'Artist Not Found | BahrainNights',
    };
  }

  const categoryLabels: Record<string, string> = {
    dj: 'DJ',
    vocalist: 'Vocalist',
    instrumentalist: 'Instrumentalist',
    band: 'Live Band',
    fire_show: 'Fire Show',
    performer: 'Performer',
    kids_entertainment: 'Kids Entertainment',
    magician: 'Magician',
  };

  const displayCategory = artist.subcategory 
    ? artist.subcategory.charAt(0).toUpperCase() + artist.subcategory.slice(1)
    : categoryLabels[artist.category];

  return {
    title: `${artist.stage_name} - ${displayCategory} | Book Now | BahrainNights`,
    description: artist.short_description || artist.bio || `Book ${artist.stage_name} for your event in Bahrain. Professional ${displayCategory.toLowerCase()} available for private parties, corporate events, weddings, and more.`,
    openGraph: {
      title: `${artist.stage_name} - ${displayCategory}`,
      description: artist.short_description || `Book ${artist.stage_name} for your event in Bahrain.`,
      images: artist.profile_image ? [{ url: artist.profile_image }] : [],
      type: 'profile',
      url: `https://bahrainnights.com/artists/${artist.slug}`,
    },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  // Get related artists (same category, excluding current artist)
  const relatedArtists = await getArtistsByCategory(artist.category);
  const filteredRelated = relatedArtists
    .filter(a => a.id !== artist.id)
    .slice(0, 4);

  return <ArtistPageClient artist={artist} relatedArtists={filteredRelated} />;
}
