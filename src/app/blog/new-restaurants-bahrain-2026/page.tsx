import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star, Calendar, Clock, ArrowRight,
  Sparkles, ChefHat, Wine, Coffee, Globe, TrendingUp,
  Heart, Camera, Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Restaurant Openings in Bahrain 2026 — Latest Dining Spots | BahrainNights',
  description: 'Discover the newest restaurants opening in Bahrain in 2026. From fine dining to casual eateries, stay ahead of the curve with our guide to the latest restaurant openings.',
  keywords: [
    'new restaurants Bahrain 2026', 'restaurant openings Bahrain', 'new dining Bahrain',
    'latest restaurants Manama', 'new cafes Bahrain', 'upcoming restaurants Bahrain',
    'best new restaurants Bahrain', 'Bahrain food scene 2026', 'new places to eat Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/new-restaurants-bahrain-2026',
  },
  openGraph: {
    title: 'New Restaurant Openings in Bahrain 2026',
    description: 'The hottest new restaurants opening in Bahrain this year. Be first to discover the newest dining spots!',
    url: 'https://www.bahrainnights.com/blog/new-restaurants-bahrain-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-new-restaurants-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'New Restaurants in Bahrain 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Restaurant Openings in Bahrain 2026',
    description: 'Discover the newest dining spots in Bahrain!',
  },
  authors: [{ name: 'BahrainNights Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'New Restaurant Openings in Bahrain 2026',
    description: 'Discover the newest restaurants opening in Bahrain in 2026. From fine dining to casual eateries.',
    image: 'https://www.bahrainnights.com/og-new-restaurants-2026.jpg',
    author: {
      '@type': 'Organization',
      name: 'BahrainNights Team',
      url: 'https://www.bahrainnights.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BahrainNights',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bahrainnights.com/logo.png'
      }
    },
    datePublished: '2026-01-15',
    dateModified: '2026-02-24',
    mainEntityOfPage: 'https://www.bahrainnights.com/blog/new-restaurants-bahrain-2026'
  };
}

const neighborhoodGuide = [
  { area: 'Adliya', vibe: 'Trendy and eclectic', notable: 'Independent restaurants and hip cafes' },
  { area: 'Seef', vibe: 'Mall dining and family-friendly', notable: 'Accessible international chains' },
  { area: 'Muharraq', vibe: 'Heritage and authentic', notable: 'Traditional Bahraini and cultural experiences' },
  { area: 'Juffair', vibe: 'International and diverse', notable: 'Variety of cuisines and casual dining' },
];

export default function NewRestaurantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-red-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">New Restaurants 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-orange-300 text-sm mb-4">
                <Sparkles className="w-4 h-4" /> Updated February 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent leading-tight">
                New Restaurant Openings in Bahrain 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Stay ahead of the dining curve with our guide to the newest restaurants 
                opening in Bahrain. We verify each listing to bring you accurate information.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 5 min read
                </span>
                <span>•</span>
                <span>By BahrainNights Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Bahrain's restaurant scene continues to evolve with exciting new concepts and dining experiences. 
              As the Kingdom positions itself as a culinary destination in the Gulf, new restaurants are 
              opening regularly across Manama, Adliya, Seef, and other popular dining districts.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              We're committed to providing accurate, verified information about new restaurant openings. 
              This page is updated regularly as we confirm new openings across the Kingdom.
            </p>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30 text-center">
              <ChefHat className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Restaurant Listings Coming Soon</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We're currently verifying the latest restaurant openings in Bahrain to ensure all information 
                is accurate. Check back soon for updated listings, or follow us on social media for announcements.
              </p>
              <p className="text-gray-400 text-sm">
                Know of a new restaurant opening? <Link href="/contact" className="text-orange-400 hover:text-orange-300">Let us know</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Where to Eat by Neighborhood */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Where to Eat by Neighborhood</h2>
                <p className="text-gray-400">Find your vibe</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoodGuide.map((area) => (
                <div key={area.area} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-2">{area.area}</h3>
                  <p className="text-orange-400 text-sm mb-3">{area.vibe}</p>
                  <p className="text-gray-400 text-sm">{area.notable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Tips for Trying New Restaurants
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                <h3 className="text-xl font-semibold text-amber-300 mb-2">🎫 Book Early for New Openings</h3>
                <p className="text-gray-300">
                  New restaurant openings in Bahrain generate significant buzz. For popular spots, 
                  expect to book in advance once reservations open. Follow restaurants on social media 
                  to get first access to booking announcements.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">🕐 Soft Opening Perks</h3>
                <p className="text-gray-300">
                  Many restaurants do soft openings before their official launch, often with special 
                  preview menus or discounted prices. Follow @bahrainnights on Instagram for updates 
                  on soft opening opportunities.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">📱 Give It Time</h3>
                <p className="text-gray-300">
                  While it's exciting to be first, new restaurants often take a few weeks to hit their 
                  stride. For the best experience, consider visiting 2-3 weeks after opening when the 
                  team has settled into their rhythm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Explore Bahrain's Restaurant Scene</h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse our directory of established restaurants with verified reviews and information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Restaurants
              </Link>
              <Link 
                href="/blog/best-restaurants-bahrain-2026"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Best Restaurants Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/bahrain-foodie-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Heart className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-red-300 transition">Bahrain Foodie Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Must-try dishes in Bahrain</p>
              </Link>
              <Link href="/blog/weekend-guide-bahrain-february-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Weekend Guide</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening this weekend</p>
              </Link>
              <Link href="/blog/best-brunches-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Coffee className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">Friday Brunch Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Best brunches in Bahrain</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
