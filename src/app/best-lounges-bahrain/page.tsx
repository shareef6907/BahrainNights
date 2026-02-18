import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Star, MapPin, Sparkles, Eye, Wine, Music, Crown, Heart
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Best Lounges in Bahrain 2026 | Rooftop Bars & Skyline Views | BahrainNights',
  description: 'Discover the best lounges in Bahrain 2026. Stunning rooftop bars, skyline views, luxury hotel lounges, and sophisticated spots for cocktails and special occasions.',
  keywords: [
    'best lounges Bahrain', 'rooftop lounge Bahrain', 'Bahrain lounges',
    'rooftop bars Manama', 'skyline bar Bahrain', 'luxury lounge Bahrain',
    'cocktail lounge Bahrain', 'hotel lounge Bahrain', 'romantic bars Bahrain',
    'best rooftop Manama 2026', 'upscale bars Bahrain', 'sunset lounge Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-lounges-bahrain',
  },
  openGraph: {
    title: 'Best Lounges in Bahrain 2026 | Rooftop Bars & Skyline Views',
    description: 'Your guide to the most stunning lounges in Bahrain. Rooftop bars, hotel lounges, and sophisticated spots.',
    url: 'https://www.bahrainnights.com/best-lounges-bahrain',
    siteName: 'BahrainNights',
    type: 'article',
    locale: 'en_BH',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Lounges in Bahrain 2026',
    description: 'Rooftop bars, skyline views & sophisticated cocktail spots!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400;

// Lounge categories
const loungeCategories = [
  {
    title: 'Best Rooftop Lounges with Views',
    icon: Eye,
    description: 'Stunning skyline panoramas and sunset cocktails',
    color: 'from-purple-500 to-indigo-500',
    lounges: [
      { name: 'CUT Lounge', location: 'Four Seasons Hotel', area: 'Bahrain Bay', highlight: 'Iconic skyline views', rating: '★★★★★' },
      { name: 'Blue Moon Lounge', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Panoramic sea views', rating: '★★★★★' },
      { name: 'MOOD Rooftop Lounge', location: 'Wyndham Garden', area: 'Juffair', highlight: 'Sunset cocktails', rating: '★★★★☆' },
      { name: 'Level 34', location: 'Gulf Hotel', area: 'Adliya', highlight: 'City lights', rating: '★★★★☆' },
      { name: 'Meisei', location: 'Downtown', area: 'Manama', highlight: 'Japanese elegance', rating: '★★★★★' },
      { name: 'Taiga Sky Lounge', location: 'Jumeirah Royal Saray', area: 'Seef', highlight: 'Ocean views', rating: '★★★★★' },
      { name: 'The Billionaire Lounge', location: 'Yacht Club', area: 'Amwaj', highlight: 'Marina setting', rating: '★★★★☆' },
    ]
  },
  {
    title: 'Best Hotel Lounges',
    icon: Crown,
    description: 'Elegant settings with impeccable service',
    color: 'from-amber-500 to-orange-500',
    lounges: [
      { name: 'Baharat Lounge', location: 'Four Seasons', area: 'Bahrain Bay', highlight: 'Arabian elegance', rating: '★★★★★' },
      { name: 'Polo Bar', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Refined atmosphere', rating: '★★★★★' },
      { name: 'Waha Lounge', location: 'Jumeirah Royal Saray', area: 'Seef', highlight: 'Oceanfront luxury', rating: '★★★★★' },
      { name: 'The Cigar Bar', location: 'Gulf Hotel', area: 'Adliya', highlight: 'Classic sophistication', rating: '★★★★☆' },
      { name: 'Lobby Lounge', location: 'Four Seasons', area: 'Bahrain Bay', highlight: 'Afternoon tea & evening drinks', rating: '★★★★★' },
    ]
  },
  {
    title: 'Best Cocktail Lounges',
    icon: Wine,
    description: 'Creative mixology and signature drinks',
    color: 'from-pink-500 to-rose-500',
    lounges: [
      { name: 'Orangery', location: 'Block 338', area: 'Adliya', highlight: 'Founding partner ★', rating: '★★★★★' },
      { name: 'Masso', location: 'Block 338', area: 'Adliya', highlight: 'Founding partner ★', rating: '★★★★★' },
      { name: 'Circa', location: 'Block 338', area: 'Adliya', highlight: 'Founding partner ★', rating: '★★★★★' },
      { name: 'Trader Vic\'s', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Tiki classics', rating: '★★★★☆' },
      { name: 'Zen', location: 'Wyndham Grand', area: 'Manama', highlight: 'Asian-inspired cocktails', rating: '★★★★☆' },
    ]
  },
  {
    title: 'Best Cigar Lounges',
    icon: Sparkles,
    description: 'Premium cigars and aged spirits',
    color: 'from-stone-600 to-stone-800',
    lounges: [
      { name: 'The Cigar Bar', location: 'Gulf Hotel', area: 'Adliya', highlight: 'Extensive humidor', rating: '★★★★★' },
      { name: 'Havana Club', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Cuban selection', rating: '★★★★☆' },
      { name: 'Davidoff Lounge', location: 'City Centre', area: 'Seef', highlight: 'Premium cigars', rating: '★★★★☆' },
    ]
  },
  {
    title: 'Best Beach & Pool Lounges',
    icon: Star,
    description: 'Beachfront vibes and poolside cocktails',
    color: 'from-cyan-500 to-blue-500',
    lounges: [
      { name: 'Azure Beach Lounge', location: 'ART Rotana', area: 'Amwaj', highlight: 'Beach club atmosphere', rating: '★★★★★' },
      { name: 'Lagoon Lounge', location: 'Sofitel', area: 'Zallaq', highlight: 'Pool & beach access', rating: '★★★★☆' },
      { name: 'The Beach', location: 'Ritz-Carlton', area: 'Seef', highlight: 'Private beach setting', rating: '★★★★★' },
    ]
  },
];

// Best for occasions
const bestFor = [
  { occasion: 'Romantic Date', recommendation: 'CUT Lounge or Baharat Lounge', icon: Heart },
  { occasion: 'Sunset Drinks', recommendation: 'Blue Moon or MOOD Rooftop', icon: Moon },
  { occasion: 'Special Celebration', recommendation: 'Four Seasons Lobby Lounge', icon: Sparkles },
  { occasion: 'Business Meeting', recommendation: 'Polo Bar or The Cigar Bar', icon: Crown },
];

export default function BestLoungesBahrain() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-[url('/images/lounge-hero.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-purple-950/50 to-slate-950" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-6">
            <Moon className="w-4 h-4" />
            <span>Updated February 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Best Lounges in <span className="text-purple-400">Bahrain</span> 2026
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            From rooftop bars with breathtaking skyline views to sophisticated hotel lounges,
            discover Bahrain's most elegant spots for cocktails and conversations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/best-bars-bahrain"
              className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-400 transition-all"
            >
              🍺 Best Bars
            </Link>
            <Link 
              href="/nightlife-bahrain"
              className="px-6 py-3 bg-pink-500/20 border border-pink-500/50 text-pink-400 font-semibold rounded-full hover:bg-pink-500/30 transition-all"
            >
              🌙 Nightlife Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-12 px-4 border-y border-white/10 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-8">Best Lounge For...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestFor.map((item) => (
              <div key={item.occasion} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                <item.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-white font-medium text-sm">{item.occasion}</div>
                <div className="text-purple-400 text-xs mt-1">{item.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lounge Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {loungeCategories.map((category) => (
            <div key={category.title} id={category.title.toLowerCase().replace(/\s+/g, '-')}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.lounges.map((lounge) => (
                  <div 
                    key={lounge.name}
                    className="p-5 bg-slate-800/50 border border-white/10 rounded-xl hover:border-purple-500/30 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {lounge.name}
                      </h3>
                      <span className="text-amber-400 text-sm">{lounge.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{lounge.location}, {lounge.area}</span>
                    </div>
                    <div className="mt-3 text-sm text-purple-400/80">
                      ✨ {lounge.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Lounge Tips & Etiquette
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">👔 Dress Code</h3>
              <p className="text-gray-300">
                Smart casual to formal. Most rooftop lounges require collared shirts for men. 
                Upscale hotels may have stricter dress codes — call ahead.
              </p>
            </div>
            
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">📞 Reservations</h3>
              <p className="text-gray-300">
                Highly recommended for weekends and special occasions. 
                Some rooftop lounges require reservations for prime sunset seating.
              </p>
            </div>
            
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">💰 Price Range</h3>
              <p className="text-gray-300">
                Cocktails: BD 8-15 | Wine: BD 10-20/glass | Bottle service available at most venues.
                Five-star hotel lounges are at the higher end.
              </p>
            </div>
            
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">🌅 Best Times</h3>
              <p className="text-gray-300">
                Sunset (5-7 PM) for rooftop views. Late evening (9 PM+) for atmosphere.
                Book Thursday/Friday well in advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Explore More</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/best-bars-bahrain" className="px-6 py-3 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full hover:bg-amber-500/30 transition-all">
              Best Bars
            </Link>
            <Link href="/guides/happy-hour-bahrain" className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full hover:bg-green-500/30 transition-all">
              Happy Hours
            </Link>
            <Link href="/ladies-night-bahrain" className="px-6 py-3 bg-pink-500/20 border border-pink-500/50 text-pink-400 rounded-full hover:bg-pink-500/30 transition-all">
              Ladies Night
            </Link>
            <Link href="/best-restaurants-bahrain" className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full hover:bg-red-500/30 transition-all">
              Best Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Lounges in Bahrain 2026 | Rooftop Bars & Skyline Views",
            "description": "Complete guide to the best lounges in Bahrain including rooftop bars, hotel lounges, and sophisticated cocktail spots.",
            "author": {
              "@type": "Organization",
              "name": "BahrainNights"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BahrainNights",
              "url": "https://www.bahrainnights.com"
            },
            "datePublished": "2026-02-18",
            "dateModified": "2026-02-18",
            "mainEntityOfPage": "https://www.bahrainnights.com/best-lounges-bahrain"
          })
        }}
      />
    </div>
  );
}
