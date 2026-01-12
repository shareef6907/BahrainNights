import { Suspense } from 'react';
import { getActiveExperiences, getExperienceCategories, Experience } from '@/lib/db/experiences';
import AttractionsPageClient, { Attraction } from '@/components/attractions/AttractionsPageClient';

// Revalidate every 5 minutes
export const revalidate = 300;

// Convert database Experience to Attraction type for the client
function toAttraction(exp: Experience): Attraction {
  return {
    id: exp.id,
    title: exp.title,
    description: exp.description,
    price: exp.price,
    price_currency: exp.price_currency,
    image_url: exp.image_url,
    venue: exp.venue,
    location: exp.location,
    category: exp.category,
    type: exp.type,
    affiliate_url: exp.affiliate_url,
  };
}

// Fetch attractions from the experiences table
async function getAttractions(): Promise<Attraction[]> {
  try {
    const experiences = await getActiveExperiences();
    return experiences.map(toAttraction);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }
}

// Fetch categories
async function getCategories(): Promise<string[]> {
  try {
    return await getExperienceCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Server Component
export default async function AttractionsPage() {
  const [attractions, categories] = await Promise.all([
    getAttractions(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<AttractionsLoadingSkeleton />}>
      <AttractionsPageClient
        initialAttractions={attractions}
        categories={categories}
      />
    </Suspense>
  );
}

// Loading skeleton
function AttractionsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-12 w-64 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="h-14 w-full max-w-2xl bg-white/10 rounded-2xl mx-auto animate-pulse" />
        </div>
      </div>
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 bg-white/10" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Attractions & Experiences in Bahrain - Tours, Water Sports & More | BahrainNights',
  description: 'Discover the best attractions, tours, water sports, and experiences in Bahrain. Book desert safaris, boat tours, indoor activities, and more.',
  keywords: ['Bahrain attractions', 'things to do in Bahrain', 'Bahrain tours', 'water sports Bahrain', 'desert safari Bahrain', 'boat tours Bahrain', 'indoor activities Bahrain'],
  openGraph: {
    title: 'Attractions & Experiences in Bahrain | BahrainNights',
    description: 'Explore the best tours, water sports, and experiences in Bahrain',
    url: 'https://bahrainnights.com/attractions',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Attractions in Bahrain',
      },
    ],
  },
  alternates: {
    canonical: 'https://bahrainnights.com/attractions',
  },
};
