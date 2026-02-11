import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Moon, Clock, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Late Night Food in Bahrain 2026 | After Midnight Eats',
  description: 'Find the best late night food spots in Bahrain. Restaurants, cafes, and takeaway open after midnight. Where to eat after a night out in Bahrain.',
  keywords: 'late night food Bahrain, after midnight restaurants Bahrain, 24 hour food Bahrain, late night delivery Bahrain, night food Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-late-night-food-bahrain' },
  openGraph: {
    title: 'Best Late Night Food in Bahrain 2026',
    description: 'Where to eat after midnight in Bahrain - restaurants, cafes and delivery options.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What restaurants are open late in Bahrain?', a: 'Many cafes and fast food places stay open until 2-4 AM. Shawarma shops often run until dawn. Hotel restaurants typically close by midnight but 24-hour room service is available. Juffair and Adliya have the most late-night options.' },
  { q: 'Is there 24-hour food delivery in Bahrain?', a: 'Talabat and other delivery apps have late-night options, though selection decreases after midnight. Some restaurants offer delivery until 2-3 AM. Fast food chains like McDonald\'s often have extended delivery hours.' },
  { q: 'Where can I get shawarma late at night?', a: 'Shawarma shops in Juffair, Hoora, and Manama stay open very late, some until 4-5 AM on weekends. Look for the shops with cars lined up outside — that\'s usually a good sign.' },
  { q: 'What food is available after 2 AM in Bahrain?', a: 'After 2 AM your options narrow to select cafes, shawarma shops, fast food drive-throughs, and hotel room service. On weekends (Thu-Fri nights), more places stay open later.' },
  { q: 'Are there 24-hour cafes in Bahrain?', a: 'Some cafes and coffee shops operate 24 hours or very late, particularly in Juffair, Hoora, and near Bahrain City Centre. These typically serve light food alongside drinks.' },
];

const venues = [
  {
    name: 'Shawarma Shops',
    area: 'Juffair, Hoora, Manama',
    rating: 5,
    hours: 'Until 4-5 AM',
    food: ['Shawarma wraps', 'Plates with rice', 'Fresh juices'],
    bestFor: 'Post-club hunger, authentic late-night',
  },
  {
    name: 'Late-Night Cafes',
    area: 'Juffair, Seef',
    rating: 4,
    hours: 'Until 2-4 AM',
    food: ['Sandwiches', 'Shisha', 'Coffee', 'Light bites'],
    bestFor: 'Relaxed late-night hangout',
  },
  {
    name: 'Fast Food Drive-Thrus',
    area: 'Various',
    rating: 4,
    hours: 'Until 3-4 AM',
    food: ['Burgers', 'Fried chicken', 'Quick bites'],
    bestFor: 'Convenience, familiar options',
  },
  {
    name: 'Hotel Room Service',
    area: 'All Major Hotels',
    rating: 4,
    hours: '24 hours',
    food: ['Full menus (limited late)', 'Club sandwiches', 'Comfort food'],
    bestFor: 'Hotel guests, reliable quality',
  },
  {
    name: 'Calexico',
    area: 'Adliya',
    rating: 5,
    hours: 'Until 2 AM (bar), food until 1 AM',
    food: ['Tacos', 'Burritos', 'Mexican'],
    bestFor: 'Post-drinks food in Adliya',
  },
  {
    name: 'Manama Souq Area',
    area: 'Old Manama',
    rating: 4,
    hours: 'Various late options',
    food: ['Traditional', 'Indian', 'Arabic'],
    bestFor: 'Authentic local experience',
  },
  {
    name: 'Delivery Apps',
    area: 'Citywide',
    rating: 3,
    hours: 'Limited selection after midnight',
    food: ['Various restaurants', 'Fast food'],
    bestFor: 'Staying in, convenience',
  },
  {
    name: '24-Hour Supermarkets',
    area: 'Various',
    rating: 3,
    hours: '24 hours',
    food: ['Ready meals', 'Sandwiches', 'Snacks'],
    bestFor: 'Emergency snacks, self-catering',
  },
];

export default function BestLateNightFoodBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Late Night Food', url: 'https://www.bahrainnights.com/guides/best-late-night-food-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">🌙 Night Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Late Night Food</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              It&apos;s 2 AM and you&apos;re hungry. Here&apos;s where to find the best eats 
              after midnight in Bahrain.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain&apos;s late-night food scene centers around a few key areas. Juffair and 
            Hoora have shawarma shops that stay open until dawn, serving the post-club crowd 
            with perfectly wrapped chicken or lamb shawarmas. Adliya offers more upscale 
            late-night options until around 2 AM.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            On weekends (Thursday and Friday nights), more venues extend their hours. The key 
            is knowing where to look — follow the crowds and the lights, and you&apos;ll find 
            sustenance even in the early morning hours.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Late Night Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {venue.name}
                      <Moon className="w-4 h-4 text-purple-400" />
                    </h3>
                    <p className="text-purple-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {venue.hours}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {venue.food.map((f) => (
                    <span key={f} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {venue.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Late Night FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">More Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Nightlife', href: '/guides/nightlife' },
              { title: 'Juffair Area', href: '/guides/juffair-restaurants-bars' },
              { title: 'Shisha Lounges', href: '/guides/shisha-lounges-bahrain' },
              { title: 'Happy Hour', href: '/guides/happy-hour-bahrain' },
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
        headline: 'Best Late Night Food in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
