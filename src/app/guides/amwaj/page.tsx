import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Waves, Star, MapPin, Utensils, Anchor,
  ArrowRight, Hotel, Coffee, Sun, Sailboat
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Amwaj Islands Guide 2026 | Things to Do in Amwaj Bahrain',
  description: 'Discover Amwaj Islands, Bahrain! From beach clubs to waterfront dining, explore the best attractions, restaurants, and activities. Complete Amwaj guide.',
  keywords: 'Amwaj Islands, things to do Amwaj, Amwaj Bahrain, Amwaj beach, Amwaj restaurants, Dragon Hotel, Marassi Galleria',
  openGraph: {
    title: 'Amwaj Islands Guide 2026 | Things to Do in Amwaj Bahrain',
    description: 'Your complete guide to Amwaj Islands - beaches, marina, restaurants, and waterfront living.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/amwaj',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/amwaj',
  },
};

const amwajHighlights = [
  {
    name: 'Marassi Beach',
    type: 'Public Beach',
    description: 'Beautiful free public beach with clean sand, facilities, and promenade. One of the best public beaches in Bahrain.',
    highlights: ['Free access', 'Clean facilities', 'Promenade', 'Cafes nearby'],
    bestFor: 'Families, beach days, sunsets',
    tip: 'Gets busy on weekends. Arrive early for best spots.',
  },
  {
    name: 'Marassi Galleria',
    type: 'Shopping & Dining',
    description: 'Waterfront mall with restaurants, cafes, and retail. Beautiful marina views and relaxed atmosphere.',
    highlights: ['Marina views', 'Restaurants', 'Shops', 'Cafes'],
    bestFor: 'Dining, shopping, walking',
    tip: 'Great for evening strolls and dinner with marina views.',
  },
  {
    name: 'The Dragon Hotel & Resort',
    type: 'Resort',
    description: 'Distinctive Chinese-themed resort with pools, spa, and Thai restaurant. Day passes available for pools.',
    highlights: ['Unique theme', 'Pools', 'Spa', 'Restaurants'],
    bestFor: 'Pool days, dining, staycations',
    tip: 'Try the Thai restaurant. Pool day passes good value.',
  },
  {
    name: 'Amwaj Marina',
    type: 'Marina',
    description: 'Scenic marina with yachts and waterfront walking paths. Multiple restaurants line the waterfront.',
    highlights: ['Yacht views', 'Walking paths', 'Restaurants', 'Photography'],
    bestFor: 'Walking, photography, dining',
    tip: 'Best in evening when it\'s cooler and restaurants are lively.',
  },
];

const amwajDining = [
  { name: 'Trader Vic\'s', cuisine: 'Polynesian', location: 'Dragon Resort', price: '$$$', highlight: 'Waterfront Polynesian' },
  { name: 'Tong Thai', cuisine: 'Thai', location: 'Dragon Hotel', price: '$$$', highlight: 'Authentic Thai' },
  { name: 'La Fontana', cuisine: 'Italian', location: 'Marassi Galleria', price: '$$', highlight: 'Italian marina views' },
  { name: 'Café del Mar', cuisine: 'Mediterranean', location: 'Amwaj Marina', price: '$$$', highlight: 'Beach club vibes' },
  { name: 'Elevation Burger', cuisine: 'Burgers', location: 'Marassi', price: '$$', highlight: 'Organic burgers' },
  { name: 'Various cafes', cuisine: 'Cafe', location: 'Marassi Galleria', price: '$', highlight: 'Coffee with views' },
];

const beachInfo = {
  bestBeaches: [
    { name: 'Marassi Beach', type: 'Public, free', features: 'Clean sand, facilities, promenade, cafes' },
    { name: 'Dragon Beach', type: 'Hotel beach', features: 'Day passes available, pools, facilities' },
  ],
  tips: [
    'Bring your own umbrella and supplies for Marassi Beach',
    'Water is calm and family-friendly',
    'Lifeguards on duty at main beaches',
    'Respect local customs regarding swimwear',
  ],
};

export default function AmwajGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Amwaj Islands', url: 'https://www.bahrainnights.com/guides/amwaj' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏝️ Island Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Amwaj Islands
              </span>
              {' '}Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Amwaj Islands is a stunning reclaimed island development featuring beaches, 
              marina, waterfront dining, and resort living. It&apos;s one of Bahrain&apos;s best 
              spots for a beach day or waterfront meal.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Beaches', value: '2+', icon: Waves },
              { label: 'Marina', value: '1', icon: Anchor },
              { label: 'Restaurants', value: '20+', icon: Utensils },
              { label: 'From Manama', value: '25 min', icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
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
          <h2 className="text-3xl font-bold mb-12 text-center">Things to Do in Amwaj</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {amwajHighlights.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-400">{place.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{place.type}</p>
                <p className="text-gray-300 text-sm mb-4">{place.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {place.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mb-1">Best for: {place.bestFor}</p>
                <p className="text-sm text-blue-400 italic">💡 {place.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🏖️ Beaches</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {beachInfo.bestBeaches.map((beach) => (
              <div key={beach.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-blue-400">{beach.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{beach.type}</p>
                <p className="text-gray-300 text-sm">{beach.features}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-500/10 rounded-xl p-5">
            <h3 className="font-bold mb-3">Beach Tips</h3>
            <ul className="space-y-2">
              {beachInfo.tips.map((tip, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <Sun className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🍽️ Dining in Amwaj</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amwajDining.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-400">{restaurant.cuisine}</p>
                  </div>
                  <span className="text-blue-400 text-sm">{restaurant.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{restaurant.location}</p>
                <p className="text-xs text-blue-400 mt-1">{restaurant.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Getting to Amwaj</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'By Car', tip: 'About 25-30 minutes from central Manama. Connected by causeway. Plenty of parking.' },
              { title: 'Best Time to Visit', tip: 'Cooler months (Oct-Apr) for beach. Evening for dining. Weekdays less crowded.' },
              { title: 'What to Bring', tip: 'Sunscreen, hat, umbrella for beach. Camera for marina views.' },
              { title: 'Nearby', tip: 'Muharraq heritage area (10 min), Bahrain International Airport (15 min).' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{item.title}</h3>
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
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
              { title: 'Things to Do in Seef', href: '/guides/seef', emoji: '🛍️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is there to do in Amwaj Islands?',
                a: 'Amwaj offers Marassi Beach (free public beach), Marassi Galleria shopping and dining, Dragon Hotel pools and spa, marina walks, and numerous waterfront restaurants.',
              },
              {
                q: 'Is Marassi Beach free?',
                a: 'Yes! Marassi Beach is a free public beach with facilities. Bring your own umbrella and supplies. It\'s one of the best public beaches in Bahrain.',
              },
              {
                q: 'How do I get to Amwaj Islands?',
                a: 'Amwaj is connected to Muharraq by causeway. It\'s about 25-30 minutes drive from central Manama. A car is recommended as there\'s limited public transport.',
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
            headline: 'Amwaj Islands Guide 2026',
            description: 'Complete guide to Amwaj Islands, Bahrain - beaches, marina, restaurants, and waterfront activities.',
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
                name: 'What is there to do in Amwaj Islands?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Amwaj offers Marassi Beach, shopping at Marassi Galleria, Dragon Hotel pools, marina walks, and waterfront restaurants.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Marassi Beach free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Marassi Beach is a free public beach with facilities. It\'s one of the best public beaches in Bahrain.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
