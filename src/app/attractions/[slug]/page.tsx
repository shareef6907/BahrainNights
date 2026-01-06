import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAttractionBySlug, getSimilarAttractions } from '@/lib/db/attractions';
import AttractionDetailContent from '@/components/attractions/AttractionDetailContent';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const attraction = await getAttractionBySlug(slug);

  if (!attraction) {
    return {
      title: 'Attraction Not Found | BahrainNights',
    };
  }

  const title = attraction.seo_title || `${attraction.name} | Things to Do in Bahrain | BahrainNights`;
  const description = attraction.seo_description ||
    attraction.short_description ||
    attraction.description?.slice(0, 160) ||
    `Discover ${attraction.name} in ${attraction.area}, Bahrain. ${attraction.category} attraction perfect for ${attraction.suitable_for?.join(', ') || 'everyone'}.`;

  return {
    title,
    description,
    openGraph: {
      title: attraction.name,
      description,
      images: attraction.image_url ? [attraction.image_url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: attraction.name,
      description,
      images: attraction.image_url ? [attraction.image_url] : [],
    },
  };
}

export default async function AttractionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch attraction from database
  const attraction = await getAttractionBySlug(slug);

  // Return 404 if attraction not found
  if (!attraction) {
    notFound();
  }

  // Fetch similar attractions (same category)
  const similarAttractions = await getSimilarAttractions(
    attraction.category || 'Family & Kids',
    attraction.id,
    4
  );

  return (
    <AttractionDetailContent
      attraction={attraction}
      similarAttractions={similarAttractions}
    />
  );
}
