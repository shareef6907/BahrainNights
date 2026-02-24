import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Music, Coffee, PartyPopper, Calendar, 
  MapPin, Heart, Sparkles, Clock, ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | BahrainNights — Guides, Reviews & Things to Do in Bahrain',
  description: 'Explore our guides and articles about the best restaurants, brunches, nightlife, activities, and things to do in Bahrain. Expert local recommendations.',
  keywords: [
    'Bahrain blog', 'Bahrain guides', 'things to do Bahrain', 'Bahrain restaurants guide',
    'Bahrain nightlife guide', 'Bahrain brunch guide', 'Bahrain travel blog'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blogs',
  },
  openGraph: {
    title: 'Blog | BahrainNights — Guides, Reviews & Things to Do in Bahrain',
    description: 'Explore our guides and articles about the best restaurants, brunches, nightlife, and things to do in Bahrain.',
    url: 'https://www.bahrainnights.com/blogs',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BahrainNights Blog',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | BahrainNights',
    description: 'Guides, reviews & things to do in Bahrain',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const blogPosts = [
  {
    title: 'The Ultimate Bahrain Foodie Guide — 50 Must-Try Dishes',
    slug: 'bahrain-foodie-guide',
    description: 'From traditional machboos and harees to international favorites. Your complete Bahrain food bucket list with where to find each dish.',
    icon: Utensils,
    color: 'from-orange-500 to-red-600',
    category: 'Food & Dining',
    readTime: '15 min read',
  },
  {
    title: 'Best Restaurants in Bahrain 2026',
    slug: 'best-restaurants-bahrain-2026',
    description: 'From five-star hotel dining to beloved local haunts. Our guide to the best verified restaurants in Bahrain.',
    icon: Utensils,
    color: 'from-amber-500 to-orange-600',
    category: 'Food & Dining',
    readTime: '10 min read',
  },
  {
    title: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide',
    slug: 'best-brunches-bahrain-2026',
    description: 'Friday brunch is a Gulf institution, and Bahrain does it better than anywhere. Discover the best verified brunches.',
    icon: Coffee,
    color: 'from-yellow-500 to-amber-600',
    category: 'Food & Dining',
    readTime: '8 min read',
  },
  {
    title: 'Bahrain Nightlife Guide 2026',
    slug: 'bahrain-nightlife-guide-2026',
    description: 'Your complete guide to Bahrain\'s best lounges, live music venues, and entertainment across Juffair, Adliya, and Seef.',
    icon: Music,
    color: 'from-purple-500 to-pink-600',
    category: 'Nightlife',
    readTime: '8 min read',
  },
  {
    title: 'New Restaurant Openings in Bahrain 2026',
    slug: 'new-restaurants-bahrain-2026',
    description: 'Stay ahead of the dining curve with our guide to the newest restaurants opening in Bahrain.',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-600',
    category: 'Food & Dining',
    readTime: '5 min read',
  },
  {
    title: 'Things to Do in Bahrain 2026 — 75+ Activities',
    slug: 'things-to-do-bahrain-2026',
    description: 'From ancient forts and pearl diving heritage to F1 thrills and pristine beaches. Everything to see and do in Bahrain.',
    icon: MapPin,
    color: 'from-green-500 to-emerald-600',
    category: 'Activities',
    readTime: '18 min read',
  },
  {
    title: 'Valentine\'s Day in Bahrain 2026',
    slug: 'valentines-day-bahrain-2026',
    description: 'Make Valentine\'s Day unforgettable. Romantic restaurants, exclusive events, and unique experiences.',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    category: 'Special Events',
    readTime: '10 min read',
  },
  {
    title: 'Weekend Guide: What\'s Happening in Bahrain',
    slug: 'weekend-guide-bahrain-february-2026',
    description: 'Your complete guide to the best events, brunches, and activities in Bahrain this weekend.',
    icon: Calendar,
    color: 'from-violet-500 to-purple-600',
    category: 'Events',
    readTime: '8 min read',
  },
  {
    title: 'Planning a Birthday Party in Bahrain',
    slug: 'birthday-party-planning-bahrain',
    description: 'Complete guide to venues, catering, entertainment, and everything you need for the perfect birthday celebration.',
    icon: PartyPopper,
    color: 'from-pink-500 to-rose-600',
    category: 'Planning',
    readTime: '12 min read',
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li>/</li>
              <li className="text-white">Blog</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent leading-tight">
              BahrainNights Blog
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Expert guides, reviews, and recommendations for the best restaurants, nightlife, 
              activities, and things to do in Bahrain.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${post.color} mb-4`}>
                  <post.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {post.description}
                </p>
                
                <span className="inline-flex items-center gap-1 text-amber-400 text-sm group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Looking for Something Specific?</h2>
          <p className="text-gray-300 mb-6">
            Browse our complete directory of restaurants, events, and activities in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/restaurants"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              Restaurants
            </Link>
            <Link 
              href="/events"
              className="px-6 py-3 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
            >
              Events
            </Link>
            <Link 
              href="/guides"
              className="px-6 py-3 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
            >
              Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
