import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Star, Home, Utensils, ShoppingBag,
  ArrowRight, Building, Trophy, Trees, Car
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Things to Do in Riffa 2026 | Riffa Guide Bahrain',
  description: 'Discover things to do in Riffa, Bahrain! Explore attractions, malls, dining, and activities in East and West Riffa. Complete local guide.',
  keywords: 'things to do in Riffa, Riffa Bahrain, Riffa attractions, East Riffa, West Riffa, Riffa Mall, Riffa Fort, Riffa golf',
  openGraph: {
    title: 'Things to Do in Riffa 2026 | Riffa Guide Bahrain',
    description: 'Your complete guide to Riffa - residential heart of Bahrain with golf, malls, and local attractions.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/riffa',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/riffa',
  },
};

const riffaHighlights = [
  {
    name: 'Riffa Fort',
    type: 'Historic Site',
    description: 'Restored 19th-century fort overlooking Riffa Valley. Offers panoramic views and insight into Bahraini history. Recently renovated with museum.',
    highlights: ['Panoramic views', 'Historic architecture', 'Photography spot', 'Museum'],
    bestFor: 'History buffs, photography',
    entry: 'BD 0.5',
  },
  {
    name: 'Royal Golf Club',
    type: 'Golf Course',
    description: 'Championship 18-hole golf course designed by Karl Litten. One of the premier golf experiences in Bahrain.',
    highlights: ['18 holes', 'Pro shop', 'Restaurant', 'Academy'],
    bestFor: 'Golf enthusiasts',
    entry: 'Green fees from BD 25',
  },
  {
    name: 'Lulu Hypermarket Riffa',
    type: 'Shopping',
    description: 'Large hypermarket and mall complex with shops, food court, and entertainment options.',
    highlights: ['Shopping', 'Food court', 'Hypermarket', 'Family entertainment'],
    bestFor: 'Shopping, families',
    entry: 'Free',
  },
  {
    name: 'Riffa Views',
    type: 'Golf Community',
    description: 'Upscale residential and golf community with restaurants and recreational facilities.',
    highlights: ['Golf course', 'Restaurants', 'Walking paths', 'Community'],
    bestFor: 'Golf, dining',
    entry: 'Varies',
  },
];

const riffaDining = [
  { name: 'Indian Palace', cuisine: 'Indian', location: 'Riffa', price: '$$', highlight: 'Popular local Indian' },
  { name: 'Fuddruckers', cuisine: 'Burgers', location: 'Riffa', price: '$$', highlight: 'American burgers' },
  { name: 'Pizza Hut/KFC', cuisine: 'Fast food', location: 'Various', price: '$', highlight: 'Quick bites' },
  { name: 'Local cafeterias', cuisine: 'Arabic/Indian', location: 'Throughout', price: '$', highlight: 'Authentic local food' },
  { name: 'Riffa Views Restaurants', cuisine: 'Various', location: 'Riffa Views', price: '$$$', highlight: 'Golf course dining' },
];

const nearbyAttractions = [
  {
    name: 'Bahrain International Circuit',
    distance: '15 min drive',
    description: 'Home of F1 Bahrain Grand Prix. Karting and experiences available year-round.',
  },
  {
    name: 'Al Areen Wildlife Park',
    distance: '20 min drive',
    description: 'Wildlife reserve with Arabian animals. Great for families.',
  },
  {
    name: 'Lost Paradise of Dilmun',
    distance: '25 min drive',
    description: 'Large waterpark with slides and pools.',
  },
  {
    name: 'Tree of Life',
    distance: '20 min drive',
    description: 'Famous 400-year-old tree in the desert.',
  },
];

export default function RiffaGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Riffa', url: 'https://www.bahrainnights.com/guides/riffa' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              📍 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Things to Do in{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Riffa
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Riffa is Bahrain&apos;s largest residential area, home to both traditional neighborhoods 
              and modern golf communities. While more suburban than Manama, it offers historic sites, 
              golf, and easy access to southern attractions.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Golf Courses', value: '2', icon: Trophy },
              { label: 'Historic Sites', value: '1', icon: Building },
              { label: 'Parks', value: '5+', icon: Trees },
              { label: 'From Manama', value: '20 min', icon: Car },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
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
          <h2 className="text-3xl font-bold mb-12 text-center">Things to Do in Riffa</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {riffaHighlights.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-400">{place.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{place.type}</p>
                <p className="text-gray-300 text-sm mb-4">{place.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {place.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Best for: {place.bestFor}</span>
                  <span>{place.entry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🍽️ Dining in Riffa</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riffaDining.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-400">{restaurant.cuisine}</p>
                  </div>
                  <span className="text-green-400 text-sm">{restaurant.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{restaurant.location}</p>
                <p className="text-xs text-green-400 mt-1">{restaurant.highlight}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-400 text-sm mt-8">
            For more dining options, Manama and Seef are a short drive away.
          </p>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">📍 Nearby Attractions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {nearbyAttractions.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-xl p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{place.name}</h3>
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                    {place.distance}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">{place.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Riffa */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Riffa</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'East Riffa', tip: 'Traditional area with the historic fort, local markets, and established neighborhoods.' },
              { title: 'West Riffa', tip: 'Modern residential area with villas, newer developments, and family-friendly communities.' },
              { title: 'Riffa Views', tip: 'Upscale golf community with international residents, club facilities, and premium homes.' },
              { title: 'Getting There', tip: 'About 20 minutes from Manama. Car recommended as public transport is limited.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
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
              { title: 'Things to Do Manama', href: '/guides/manama', emoji: '🏙️' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
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
                q: 'What is there to do in Riffa?',
                a: 'Riffa offers historic Riffa Fort, golf at Royal Golf Club and Riffa Views, shopping at Lulu Hypermarket, and easy access to southern attractions like BIC and Al Areen Wildlife Park.',
              },
              {
                q: 'Is Riffa worth visiting as a tourist?',
                a: 'Riffa Fort is worth a visit for history lovers. For tourists, Riffa is more a base for accessing southern Bahrain attractions rather than a destination itself.',
              },
              {
                q: 'How far is Riffa from Manama?',
                a: 'Riffa is about 20 minutes drive from central Manama, depending on traffic. It\'s located in central Bahrain.',
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
            headline: 'Things to Do in Riffa 2026',
            description: 'Complete guide to Riffa, Bahrain - historic fort, golf, and local attractions.',
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
                name: 'What is there to do in Riffa?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Riffa offers historic Riffa Fort, golf courses, shopping, and access to southern attractions like BIC and Al Areen.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
