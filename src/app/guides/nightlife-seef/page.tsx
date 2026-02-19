import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Wine, Music, Star, Crown, Car, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nightlife in Seef, Bahrain 2026 | Best Bars, Clubs & Lounges | BahrainNights',
  description: 'Complete guide to Seef nightlife 2026. Discover the best bars, clubs, and rooftop lounges in Seef District. Hotel bars, upscale venues, and late-night spots.',
  keywords: [
    'nightlife Seef Bahrain', 'Seef bars', 'Seef clubs', 'Seef lounges',
    'Ritz-Carlton bar Bahrain', 'Seef district nightlife', 'bars near City Centre Bahrain',
    'upscale bars Seef', 'hotel bars Seef', 'rooftop Seef Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/nightlife-seef',
  },
  openGraph: {
    title: 'Nightlife in Seef, Bahrain 2026 | Best Bars, Clubs & Lounges',
    description: 'Your guide to Seef District nightlife - hotel bars, rooftop lounges, and upscale venues.',
    url: 'https://www.bahrainnights.com/guides/nightlife-seef',
    siteName: 'BahrainNights',
    type: 'article',
    locale: 'en_BH',
  },
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

const seefVenues = [
  {
    category: 'Rooftop Lounges',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    venues: [
      { name: 'Blue Moon Lounge', hotel: 'The Ritz-Carlton', vibe: 'Sophisticated', highlight: 'Panoramic sea views' },
      { name: 'Taiga Sky Lounge', hotel: 'Jumeirah Royal Saray', vibe: 'Upscale', highlight: 'Ocean sunset views' },
      { name: 'Sky Lounge', hotel: 'Elite Grande', vibe: 'Modern', highlight: 'City skyline' },
    ]
  },
  {
    category: 'Hotel Bars',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
    venues: [
      { name: 'Polo Bar', hotel: 'The Ritz-Carlton', vibe: 'Elegant', highlight: 'Premium spirits' },
      { name: 'Trader Vic\'s', hotel: 'The Ritz-Carlton', vibe: 'Tiki', highlight: 'Classic cocktails' },
      { name: 'Waha Lounge', hotel: 'Jumeirah Royal Saray', vibe: 'Luxury', highlight: 'Oceanfront setting' },
      { name: 'The Pub', hotel: 'Elite Resort', vibe: 'Casual', highlight: 'Sports & beer' },
    ]
  },
  {
    category: 'Clubs & Late Night',
    icon: Music,
    color: 'from-pink-500 to-red-500',
    venues: [
      { name: 'Ibrida', hotel: 'Downtown Seef', vibe: 'Nightclub', highlight: 'International DJs' },
      { name: 'W Club Lounge', hotel: 'W Hotel', vibe: 'Trendy', highlight: 'Premium nightlife' },
      { name: 'Stage', hotel: 'Elite Seef', vibe: 'Live Music', highlight: 'Bands & entertainment' },
    ]
  },
];

const comparison = [
  { area: 'Seef', vibe: 'Upscale & Corporate', best: 'Hotel bars, rooftop lounges', crowd: 'Business travelers, couples' },
  { area: 'Juffair', vibe: 'Diverse & Lively', best: 'Variety of bars & clubs', crowd: 'Mixed, expats' },
  { area: 'Adliya', vibe: 'Trendy & Artsy', best: 'Cocktail bars, restaurants', crowd: 'Young professionals' },
];

export default function NightlifeSeef() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-950" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span>Seef District</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Nightlife in <span className="text-purple-400">Seef</span>, Bahrain
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Seef District is Bahrain's upscale business hub, home to five-star hotel bars, 
            stunning rooftop lounges, and sophisticated venues perfect for after-work drinks 
            or special occasions.
          </p>
        </div>
      </section>

      {/* Venue Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {seefVenues.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color}`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{cat.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.venues.map((venue) => (
                  <div key={venue.name} className="p-5 bg-slate-800/50 border border-white/10 rounded-xl hover:border-purple-500/30 transition-all">
                    <h3 className="text-lg font-semibold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm">{venue.hotel}</p>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-purple-400">{venue.vibe}</span>
                      <span className="text-gray-500">✨ {venue.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Area Comparison */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Seef vs Other Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {comparison.map((area) => (
              <div key={area.area} className={`p-6 rounded-xl border ${area.area === 'Seef' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-slate-800/50 border-white/10'}`}>
                <h3 className="text-xl font-bold text-white mb-2">{area.area}</h3>
                <p className="text-purple-400 text-sm mb-3">{area.vibe}</p>
                <p className="text-gray-400 text-sm"><strong>Best for:</strong> {area.best}</p>
                <p className="text-gray-500 text-sm mt-2"><strong>Crowd:</strong> {area.crowd}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Car className="w-5 h-5 text-purple-400" /> Getting There
            </h3>
            <p className="text-gray-300 text-sm">
              Seef is well-connected with ample parking at City Centre and hotel venues. 
              Taxis and ride-shares readily available. 15 mins from Manama center.
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-white/10 rounded-xl">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Best Times
            </h3>
            <p className="text-gray-300 text-sm">
              Happy hours: 5-8 PM. Rooftop sunset: 5-7 PM. 
              Peak nightlife: Thursday & Friday from 10 PM.
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
          <Link href="/guides/nightlife-juffair" className="px-5 py-2 bg-blue-500/20 border border-blue-500/40 text-blue-400 rounded-full hover:bg-blue-500/30 text-sm">Juffair Nightlife</Link>
          <Link href="/guides/nightlife-adliya" className="px-5 py-2 bg-pink-500/20 border border-pink-500/40 text-pink-400 rounded-full hover:bg-pink-500/30 text-sm">Adliya Nightlife</Link>
          <Link href="/best-bars-bahrain" className="px-5 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-full hover:bg-amber-500/30 text-sm">Best Bars</Link>
          <Link href="/best-lounges-bahrain" className="px-5 py-2 bg-purple-500/20 border border-purple-500/40 text-purple-400 rounded-full hover:bg-purple-500/30 text-sm">Best Lounges</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Nightlife in Seef, Bahrain 2026",
        "author": { "@type": "Organization", "name": "BahrainNights" },
        "datePublished": "2026-02-19",
        "mainEntityOfPage": "https://www.bahrainnights.com/guides/nightlife-seef"
      })}} />
    </div>
  );
}
