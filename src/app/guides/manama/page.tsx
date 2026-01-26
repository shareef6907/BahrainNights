import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, Star, MapPin, Store, Utensils,
  ArrowRight, Hotel, Landmark, Moon, Coffee
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Things to Do in Manama 2026 | Manama City Guide Bahrain',
  description: 'Discover things to do in Manama, Bahrain! From traditional souqs to modern attractions, explore the best sights, restaurants, and activities in the capital. Complete guide.',
  keywords: 'things to do in Manama, Manama guide, Manama Bahrain, Manama attractions, Manama souq, downtown Manama, Manama restaurants',
  openGraph: {
    title: 'Things to Do in Manama 2026 | Manama City Guide Bahrain',
    description: 'Your complete guide to Manama - the capital of Bahrain with souqs, museums, dining, and culture.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/manama',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/manama',
  },
};

const manamaHighlights = [
  {
    name: 'Manama Souq',
    type: 'Traditional Market',
    description: 'Bahrain\'s oldest and most atmospheric market. Wander through narrow alleys lined with gold shops, spice stalls, and traditional goods.',
    highlights: ['Gold Souq', 'Spice Souq', 'Bab Al Bahrain', 'Local atmosphere'],
    bestFor: 'Shopping, photography, cultural experience',
    tip: 'Visit in the evening when it\'s cooler and more lively.',
  },
  {
    name: 'Bahrain National Museum',
    type: 'Museum',
    description: 'Premier museum showcasing 6,000 years of Bahraini history. Beautiful architecture on the Corniche.',
    highlights: ['Dilmun artifacts', 'Traditional house', 'Art gallery', 'Cafe'],
    bestFor: 'History buffs, families, rainy days',
    tip: 'Allow 2-3 hours. The cafe has great views.',
  },
  {
    name: 'Bahrain World Trade Center',
    type: 'Landmark',
    description: 'Iconic twin towers with wind turbines. A symbol of modern Bahrain and great for architecture photography.',
    highlights: ['Unique architecture', 'Wind turbines', 'Shopping', 'Dining'],
    bestFor: 'Photography, architecture lovers',
    tip: 'Great photo opportunity at any time of day.',
  },
  {
    name: 'Bab Al Bahrain',
    type: 'Historic Landmark',
    description: 'Historic gateway to Manama Souq. Recently restored and a beautiful starting point for souq exploration.',
    highlights: ['Historic gate', 'Photo spot', 'Souq entrance', 'Visitor center'],
    bestFor: 'Quick visit, starting point',
    tip: 'Combine with souq visit for full experience.',
  },
];

const manamaDining = [
  { name: 'The Merchant House', cuisine: 'International', location: 'Heritage area', price: '$$$$', highlight: 'Boutique hotel restaurant' },
  { name: 'Downtown Rotana - Masso', cuisine: 'Italian', location: 'City center', price: '$$$', highlight: 'Best Italian in town' },
  { name: 'InterContinental', cuisine: 'Various', location: 'City center', price: '$$$', highlight: 'Multiple restaurants' },
  { name: 'Haji\'s Cafe', cuisine: 'Bahraini', location: 'Various', price: '$', highlight: 'Traditional breakfast' },
  { name: 'Al Osra Supermarket', cuisine: 'Local/Juice', location: 'Gudaibiya', price: '$', highlight: 'Famous juices' },
  { name: 'Souq restaurants', cuisine: 'Local', location: 'Manama Souq', price: '$', highlight: 'Authentic experience' },
];

const manamaCulture = [
  {
    name: 'Beit Al Quran',
    type: 'Museum',
    description: 'Stunning museum of Islamic arts and Quranic manuscripts.',
    entry: 'BD 0.5',
  },
  {
    name: 'La Fontaine Centre of Contemporary Art',
    type: 'Art Gallery',
    description: 'Contemporary art in a beautiful heritage setting.',
    entry: 'Free',
  },
  {
    name: 'Bahrain Financial Harbour',
    type: 'Modern Landmark',
    description: 'Impressive financial district with twin towers and marina.',
    entry: 'Free',
  },
];

export default function ManamaGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Manama', url: 'https://www.bahrainnights.com/guides/manama' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🏙️ City Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Things to Do in{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Manama
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manama is the vibrant capital of Bahrain, where ancient souqs meet modern skyscrapers. 
              Explore traditional markets, world-class museums, and the cultural heart of the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Museums', value: '5+', icon: Landmark },
              { label: 'Souqs', value: '3+', icon: Store },
              { label: 'Hotels', value: '20+', icon: Hotel },
              { label: 'Restaurants', value: '200+', icon: Utensils },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Attractions in Manama</h2>
          
          <div className="space-y-6">
            {manamaHighlights.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-400">{place.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{place.type}</p>
                    <p className="text-gray-300 text-sm mb-4">{place.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {place.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mb-1">Best for: {place.bestFor}</p>
                    <p className="text-sm text-amber-400 italic">💡 {place.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🍽️ Where to Eat in Manama</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {manamaDining.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-400">{restaurant.cuisine}</p>
                  </div>
                  <span className="text-amber-400 text-sm">{restaurant.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{restaurant.location}</p>
                <p className="text-xs text-amber-400 mt-1">{restaurant.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🎭 Cultural Attractions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {manamaCulture.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg">{place.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{place.type}</p>
                <p className="text-gray-300 text-sm mb-2">{place.description}</p>
                <p className="text-xs text-amber-400">Entry: {place.entry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💡 Manama Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Getting Around', tip: 'Manama is compact. Walk the souq area, taxi between attractions. Street parking available.' },
              { title: 'Best Time to Visit', tip: 'Early morning for museums, evening for souqs. Avoid Friday afternoon prayer time.' },
              { title: 'Photography', tip: 'Great spots: Bab Al Bahrain, World Trade Center, souq alleys. Ask before photographing people.' },
              { title: 'Shopping', tip: 'Gold Souq for jewelry, Bab Al Bahrain for souvenirs, supermarkets for local products.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Tourist Attractions', href: '/guides/tourist-attractions', emoji: '🏛️' },
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Things to Do in Seef', href: '/guides/seef', emoji: '🛍️' },
              { title: 'Nightlife Adliya', href: '/guides/nightlife-adliya', emoji: '🌙' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is there to do in Manama, Bahrain?',
                a: 'Manama offers traditional souqs, the Bahrain National Museum, Bab Al Bahrain, World Trade Center, heritage sites, excellent restaurants, and the vibrant city atmosphere.',
              },
              {
                q: 'Is Manama Souq worth visiting?',
                a: 'Yes! Manama Souq is the cultural heart of Bahrain with gold shops, spices, traditional goods, and authentic atmosphere. Best visited in the evening.',
              },
              {
                q: 'What is the best area to stay in Manama?',
                a: 'Central Manama is great for business and culture. For beach access, stay in nearby Seef. For nightlife, consider Juffair or Adliya.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Things to Do in Manama 2026',
            description: 'Complete guide to Manama, Bahrain\'s capital - souqs, museums, restaurants, and attractions.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
          }),
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is there to do in Manama, Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Manama offers traditional souqs, the Bahrain National Museum, Bab Al Bahrain, World Trade Center, and excellent restaurants.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Manama Souq worth visiting?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Manama Souq is the cultural heart of Bahrain with gold shops, spices, traditional goods, and authentic atmosphere.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
