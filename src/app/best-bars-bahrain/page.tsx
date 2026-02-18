import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wine, Star, MapPin, Clock, Music, Sparkles, 
  Heart, Moon, Flame, Crown, Beer, Martini
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Best Bars in Bahrain 2026 | Top Bars, Pubs & Rooftop Lounges | BahrainNights',
  description: 'Discover the best bars in Bahrain 2026. From rooftop bars to sports pubs, hotel bars to cocktail lounges. Complete guide to Manama nightlife with locations, hours, and insider tips.',
  keywords: [
    'best bars Bahrain', 'bars in Bahrain', 'Bahrain bars', 'Manama bars',
    'rooftop bars Bahrain', 'sports bars Bahrain', 'hotel bars Bahrain',
    'cocktail bars Bahrain', 'Irish pub Bahrain', 'best bars Manama 2026',
    'Juffair bars', 'Adliya bars', 'Seef bars', 'where to drink Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-bars-bahrain',
  },
  openGraph: {
    title: 'Best Bars in Bahrain 2026 | Top Bars, Pubs & Rooftop Lounges',
    description: 'Your complete guide to the best bars in Bahrain. Rooftop bars, sports pubs, hotel bars, and hidden gems.',
    url: 'https://www.bahrainnights.com/best-bars-bahrain',
    siteName: 'BahrainNights',
    type: 'article',
    locale: 'en_BH',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Bars in Bahrain 2026',
    description: 'Complete guide to Bahrain bars - rooftop lounges, sports pubs & more!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 86400; // Revalidate daily

// Bar categories data
const barCategories = [
  {
    title: 'Best Rooftop Bars',
    icon: Moon,
    description: 'Stunning skyline views and sunset cocktails',
    color: 'from-purple-500 to-pink-500',
    bars: [
      { name: 'Blue Moon Lounge', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Panoramic sea views' },
      { name: 'MOOD Rooftop Lounge', location: 'Wyndham Garden', area: 'Juffair', highlight: 'Sunset cocktails' },
      { name: 'CUT Lounge', location: 'Four Seasons', area: 'Bahrain Bay', highlight: 'Sophisticated vibe' },
      { name: 'Level 34', location: 'Gulf Hotel', area: 'Adliya', highlight: 'City views' },
      { name: 'Sky Lounge', location: 'Hotel & Spa', area: 'Manama', highlight: 'Rooftop pool bar' },
    ]
  },
  {
    title: 'Best Sports Bars',
    icon: Beer,
    description: 'Big screens, cold beers, and live matches',
    color: 'from-green-500 to-emerald-500',
    bars: [
      { name: 'JJ\'s Irish Restaurant', location: 'Gulf Hotel', area: 'Adliya', highlight: 'Classic sports pub' },
      { name: 'Sherlock Holmes', location: 'Gulf Hotel', area: 'Adliya', highlight: 'British pub vibes' },
      { name: 'Heroes Sports Café', location: 'Crowne Plaza', area: 'Manama', highlight: 'Multiple screens' },
      { name: 'The Rugby Club', location: 'The Domain Hotel', area: 'Manama', highlight: 'Rugby & football' },
    ]
  },
  {
    title: 'Best Hotel Bars',
    icon: Crown,
    description: 'Elegant settings and premium spirits',
    color: 'from-amber-500 to-orange-500',
    bars: [
      { name: 'Polo Bar', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Refined atmosphere' },
      { name: 'Azure', location: 'ART Rotana', area: 'Amwaj', highlight: 'Beach club bar' },
      { name: 'Baharat Lounge', location: 'Four Seasons', area: 'Bahrain Bay', highlight: 'Arabian nights' },
      { name: 'Zengo Bar', location: 'Gulf Hotel', area: 'Adliya', highlight: 'Pan-Asian cocktails' },
      { name: 'Waha Lounge', location: 'Jumeirah Royal Saray', area: 'Seef', highlight: 'Oceanfront luxury' },
    ]
  },
  {
    title: 'Best Cocktail Bars',
    icon: Martini,
    description: 'Creative mixology and signature drinks',
    color: 'from-pink-500 to-rose-500',
    bars: [
      { name: 'Orangery', location: 'Block 338', area: 'Adliya', highlight: 'Craft cocktails ★' },
      { name: 'Masso', location: 'Block 338', area: 'Adliya', highlight: 'Italian aperitivo ★' },
      { name: 'Trader Vic\'s', location: 'The Ritz-Carlton', area: 'Seef', highlight: 'Tiki classics' },
      { name: 'Takeover', location: 'Block 338', area: 'Adliya', highlight: 'Creative mixology' },
    ]
  },
  {
    title: 'Best Irish & British Pubs',
    icon: Beer,
    description: 'Traditional pubs with great craic',
    color: 'from-emerald-600 to-green-700',
    bars: [
      { name: 'Molly Malone\'s', location: 'Gulf Gate Hotel', area: 'Manama', highlight: 'Authentic Irish' },
      { name: 'The Langer\'s', location: 'Downtown', area: 'Manama', highlight: 'Live music' },
      { name: 'Big Texas', location: 'Various', area: 'Multiple', highlight: 'BBQ & beers' },
      { name: 'The Old Manor', location: 'Elite Resort', area: 'Muharraq', highlight: 'English pub' },
    ]
  },
];

// Areas for nightlife
const areas = [
  { name: 'Juffair', description: 'Entertainment hub with diverse bars', link: '/guides/nightlife-juffair' },
  { name: 'Adliya', description: 'Trendy cafes and upscale lounges', link: '/guides/nightlife-adliya' },
  { name: 'Seef', description: 'Hotel bars and rooftop venues', link: '/guides/seef' },
  { name: 'Amwaj', description: 'Beach clubs and resort bars', link: '/guides/amwaj' },
];

export default function BestBarsBahrain() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-[url('/images/bar-hero.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6">
            <Wine className="w-4 h-4" />
            <span>Updated February 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Best Bars in <span className="text-amber-400">Bahrain</span> 2026
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            From rooftop lounges with stunning views to traditional Irish pubs, 
            discover the best bars across Manama, Juffair, Adliya, and Seef.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/happy-hour-bahrain"
              className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all"
            >
              🍺 Happy Hour Deals
            </Link>
            <Link 
              href="/ladies-night-bahrain"
              className="px-6 py-3 bg-pink-500/20 border border-pink-500/50 text-pink-400 font-semibold rounded-full hover:bg-pink-500/30 transition-all"
            >
              💃 Ladies Night Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-8 px-4 border-y border-white/10 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {barCategories.map((cat) => (
              <a 
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all text-sm"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bar Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {barCategories.map((category, idx) => (
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
                {category.bars.map((bar) => (
                  <div 
                    key={bar.name}
                    className="p-5 bg-slate-800/50 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all group"
                  >
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {bar.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{bar.location}, {bar.area}</span>
                    </div>
                    <div className="mt-3 text-sm text-amber-400/80">
                      ✨ {bar.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bars by Area */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Bars by Area
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area) => (
              <Link
                key={area.name}
                href={area.link}
                className="p-6 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all group text-center"
              >
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {area.name}
                </h3>
                <p className="text-gray-400 text-sm">{area.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Good to Know
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Opening Hours
              </h3>
              <p className="text-gray-300">
                Most bars open around 5-6 PM and close between midnight and 2 AM. 
                Thursday and Friday nights are busiest. Some hotel bars open earlier.
              </p>
            </div>
            
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Dress Code
              </h3>
              <p className="text-gray-300">
                Smart casual is the norm. Hotel bars may require formal attire. 
                Avoid sportswear and flip-flops at upscale venues.
              </p>
            </div>
            
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Wine className="w-5 h-5 text-amber-400" />
                Price Guide
              </h3>
              <p className="text-gray-300">
                Beers: BD 3-6 | Cocktails: BD 5-12 | Wine: BD 6-15/glass.
                Happy hours offer 20-50% off at many venues.
              </p>
            </div>
            
            <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400" />
                Best Nights
              </h3>
              <p className="text-gray-300">
                Ladies nights (Tue-Wed), happy hours (daily 5-8 PM), 
                live music (Thu-Fri), and brunch parties (Fri-Sat).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Related Guides
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/best-lounges-bahrain" className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-full hover:bg-purple-500/30 transition-all">
              Best Lounges
            </Link>
            <Link href="/nightlife-bahrain" className="px-6 py-3 bg-pink-500/20 border border-pink-500/50 text-pink-400 rounded-full hover:bg-pink-500/30 transition-all">
              Nightlife Guide
            </Link>
            <Link href="/guides/nightlife-juffair" className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-full hover:bg-blue-500/30 transition-all">
              Juffair Nightlife
            </Link>
            <Link href="/guides/nightlife-adliya" className="px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-all">
              Adliya Nightlife
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
            "headline": "Best Bars in Bahrain 2026 | Top Bars, Pubs & Rooftop Lounges",
            "description": "Complete guide to the best bars in Bahrain including rooftop bars, sports pubs, hotel bars, and cocktail lounges.",
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
            "mainEntityOfPage": "https://www.bahrainnights.com/best-bars-bahrain"
          })
        }}
      />
    </div>
  );
}
