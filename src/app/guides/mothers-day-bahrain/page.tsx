import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Heart, Gift, Sparkles, Flower } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mother\'s Day in Bahrain 2026 | Best Brunches, Gifts & Ideas',
  description: 'Celebrate Mother\'s Day in Bahrain with special brunches, spa treatments, gifts, and experiences. Guide to making mum feel special.',
  keywords: 'Mothers Day Bahrain, Mother Day brunch Bahrain, gifts for mum Bahrain, Mother Day restaurants Bahrain, Mother Day spa Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/mothers-day-bahrain' },
  openGraph: {
    title: 'Mother\'s Day in Bahrain 2026',
    description: 'Special brunches, gifts, and experiences for Mother\'s Day in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'When is Mother\'s Day in Bahrain?', a: 'Bahrain typically follows the Arab World Mother\'s Day on March 21st, though some celebrate the Western date in May. Many venues run promotions for both dates.' },
  { q: 'What are the best Mother\'s Day brunches in Bahrain?', a: 'Hotel brunches are perfect for Mother\'s Day — Four Seasons, Ritz-Carlton, Gulf Hotel, and InterContinental offer special menus. Lilou and Café Blanc are also popular for family celebrations.' },
  { q: 'What gifts do mums in Bahrain like?', a: 'Popular Mother\'s Day gifts include flowers (Interflora, local florists), perfumes (Paris Gallery), jewelry, spa vouchers, afternoon tea experiences, and premium chocolates or dates.' },
  { q: 'Are there Mother\'s Day deals at spas?', a: 'Yes, most hotel spas offer Mother\'s Day packages. Popular options include mother-daughter treatments, facial packages, and half-day pamper experiences.' },
  { q: 'Where can I get flowers delivered for Mother\'s Day?', a: 'Local florists, Interflora, and hotel flower shops offer delivery. Order 2-3 days ahead for March 21st as demand is high. Talabat also has flower delivery options.' },
];

const ideas = [
  {
    name: 'Hotel Brunch',
    description: 'Treat mum to a lavish Friday brunch with the whole family',
    options: ['Four Seasons', 'Ritz-Carlton', 'Gulf Hotel', 'InterContinental'],
    price: 'BD 25-45/person',
    icon: '🍳',
  },
  {
    name: 'Spa Day',
    description: 'Book a relaxing spa treatment or pamper package',
    options: ['Sofitel Thalassa Spa', 'Ritz-Carlton Spa', 'ESPA (Four Seasons)'],
    price: 'BD 50-150',
    icon: '💆‍♀️',
  },
  {
    name: 'Afternoon Tea',
    description: 'Elegant tea service with sandwiches and pastries',
    options: ['Four Seasons', 'Ritz-Carlton', 'Lilou'],
    price: 'BD 15-35/person',
    icon: '🫖',
  },
  {
    name: 'Flowers & Gifts',
    description: 'Beautiful arrangements delivered to her door',
    options: ['Interflora', 'Local florists', 'Hotel concierge'],
    price: 'BD 15-80',
    icon: '💐',
  },
  {
    name: 'Special Dinner',
    description: 'Book her favorite restaurant for a family dinner',
    options: ['Her favorite cuisine', 'Somewhere new to try'],
    price: 'BD 30-80',
    icon: '🍽️',
  },
  {
    name: 'Jewelry',
    description: 'Something sparkly to show appreciation',
    options: ['Gold Souq', 'Moda Mall', 'Paris Gallery'],
    price: 'Varies',
    icon: '💎',
  },
];

export default function MothersDayBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Mother\'s Day', url: 'https://www.bahrainnights.com/guides/mothers-day-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">💐 Mother&apos;s Day</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Mother&apos;s Day</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Special brunches, spa experiences, and thoughtful gifts to celebrate 
              the most important woman in your life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Mother&apos;s Day in Bahrain (March 21st, following the Arab World date) is a 
            cherished occasion for showing appreciation. Hotels roll out special brunch 
            menus, spas offer pamper packages, and florists work overtime delivering 
            beautiful arrangements across the kingdom.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-pink-400">Tip:</strong> Book brunches and spa appointments 
            at least a week in advance — Mother&apos;s Day is one of the busiest days for 
            hospitality venues in Bahrain.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Gift Ideas for Mum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div key={idea.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl mb-3">{idea.icon}</div>
                <h3 className="text-xl font-bold mb-2">{idea.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{idea.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {idea.options.map((opt) => (
                    <span key={opt} className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded">{opt}</span>
                  ))}
                </div>
                <p className="text-pink-400 font-medium text-sm">{idea.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Mother&apos;s Day FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Brunches', href: '/guides/brunches' },
              { title: 'Family Restaurants', href: '/guides/best-family-restaurants-bahrain' },
              { title: 'Spa & Wellness', href: '/guides/spa-wellness-bahrain' },
              { title: 'Cafes', href: '/guides/cafes' },
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
        headline: 'Mother\'s Day in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
