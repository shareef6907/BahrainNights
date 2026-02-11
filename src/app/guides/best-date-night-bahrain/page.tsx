import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Heart, Wine, Moon, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Date Night Restaurants in Bahrain 2026 | Romantic Spots',
  description: 'Discover the most romantic restaurants and date night spots in Bahrain. Candlelit dinners, waterfront views, and intimate settings for couples.',
  keywords: 'date night Bahrain, romantic restaurants Bahrain, couples dining Bahrain, romantic dinner Bahrain, anniversary restaurants Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-date-night-bahrain' },
  openGraph: {
    title: 'Best Date Night Restaurants in Bahrain 2026',
    description: 'Find the perfect romantic restaurant for your date night in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the most romantic restaurants in Bahrain?', a: 'Top romantic spots include CUT by Wolfgang Puck (Four Seasons), Mezzaluna (Ritz-Carlton), La Mer (Sofitel), Bushido, and the rooftop restaurants at various hotels. Waterfront venues in Bahrain Bay and Amwaj are also perfect for date nights.' },
  { q: 'Where can I have a candlelit dinner in Bahrain?', a: 'Many upscale restaurants offer candlelit settings including Mezzaluna, Re Asian Cuisine, CUT, and Italian restaurants like Primavera. Some venues can arrange special candlelit setups with advance booking.' },
  { q: 'What\'s a good budget for date night in Bahrain?', a: 'Mid-range date nights cost 30-50 BD for two including drinks. Upscale experiences range from 60-120 BD. For special occasions, fine dining can exceed 150 BD for a full experience with wine.' },
  { q: 'Are there restaurants with private dining in Bahrain?', a: 'Yes, several restaurants offer private dining rooms including CUT, Gulf Hotel venues, Four Seasons restaurants, and Bushido. Advance booking required, often with minimum spend.' },
  { q: 'What are good date ideas beyond dinner in Bahrain?', a: 'Combine dinner with sunset drinks at a rooftop bar, a walk along the Corniche, dessert at Lilou, or an after-dinner lounge visit. Beach clubs during cooler months offer romantic day-to-night date options.' },
];

const restaurants = [
  {
    name: 'CUT by Wolfgang Puck',
    area: 'Four Seasons',
    rating: 5,
    priceRange: 'BD 50-80',
    vibe: 'Sophisticated, intimate',
    romantic: ['Private booths', 'Exceptional service', 'World-class steaks'],
    bestFor: 'Special anniversaries, proposals',
  },
  {
    name: 'Mezzaluna',
    area: 'Ritz-Carlton',
    rating: 5,
    priceRange: 'BD 40-70',
    vibe: 'Elegant Italian romance',
    romantic: ['City views', 'Handmade pasta', 'Wine selection'],
    bestFor: 'Classic romantic dinner',
  },
  {
    name: 'La Mer',
    area: 'Sofitel Zallaq',
    rating: 5,
    priceRange: 'BD 35-60',
    vibe: 'Beachfront elegance',
    romantic: ['Sea views', 'Fresh seafood', 'Sunset timing'],
    bestFor: 'Beach romance, seafood lovers',
  },
  {
    name: 'Bushido',
    area: 'Ritz-Carlton',
    rating: 5,
    priceRange: 'BD 40-70',
    vibe: 'Mysterious, theatrical',
    romantic: ['Dramatic setting', 'Japanese-Peruvian fusion', 'Cocktails'],
    bestFor: 'Adventurous couples',
  },
  {
    name: 'Re Asian Cuisine',
    area: 'Four Seasons',
    rating: 5,
    priceRange: 'BD 45-75',
    vibe: 'Sleek Asian elegance',
    romantic: ['Modern décor', 'Tasting menus', 'Bay views'],
    bestFor: 'Foodie couples',
  },
  {
    name: 'Primavera',
    area: 'Diplomat Radisson',
    rating: 4,
    priceRange: 'BD 30-50',
    vibe: 'Cozy Italian',
    romantic: ['Intimate setting', 'Classic Italian', 'Good wine list'],
    bestFor: 'Mid-range romance',
  },
  {
    name: 'Trader Vic\'s',
    area: 'Ritz-Carlton',
    rating: 4,
    priceRange: 'BD 35-55',
    vibe: 'Polynesian escapism',
    romantic: ['Tiki atmosphere', 'Creative cocktails', 'Unique experience'],
    bestFor: 'Fun, playful dates',
  },
  {
    name: 'Rooftop Bars',
    area: 'Various Hotels',
    rating: 4,
    priceRange: 'BD 25-45',
    vibe: 'Sunset & skyline views',
    romantic: ['Open air', 'City lights', 'Cocktails'],
    bestFor: 'Pre/post dinner drinks',
  },
];

export default function BestDateNightBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-rose-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Date Night', url: 'https://www.bahrainnights.com/guides/best-date-night-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium mb-4">💕 Date Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Date Night</span> Spots in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Candlelit dinners, rooftop views, and intimate settings — discover the most romantic 
              restaurants for unforgettable date nights in Bahrain.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain offers surprisingly romantic dining options, from sophisticated hotel restaurants 
            with city skyline views to intimate neighborhood gems with candlelit tables. Whether 
            you&apos;re celebrating an anniversary, planning a proposal, or simply want a special 
            evening together, the kingdom delivers memorable experiences.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            The best date nights combine atmosphere, exceptional food, and attentive service. 
            Consider starting with sunset drinks at a rooftop bar, moving to dinner, and ending 
            with dessert or a moonlit walk along the waterfront.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Most Romantic Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {restaurant.name}
                      {restaurant.rating === 5 && <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />}
                    </h3>
                    <p className="text-rose-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{restaurant.priceRange}</div>
                    <div className="text-xs text-gray-400">{restaurant.vibe}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.romantic.map((r) => (
                    <span key={r} className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">{r}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {restaurant.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Date Night FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">More Dining Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Best Date Night Restaurants in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
