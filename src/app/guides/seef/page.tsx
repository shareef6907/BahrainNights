import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShoppingBag, Star, MapPin, Waves, Utensils,
  ArrowRight, Hotel, Coffee, PartyPopper, Moon
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Things to Do in Seef Bahrain 2026 | Seef Guide',
  description: 'Discover things to do in Seef, Bahrain! From shopping malls to beach clubs, explore the best attractions, restaurants, and nightlife in Seef district. Complete area guide.',
  keywords: 'things to do in Seef, Seef Bahrain, Seef Mall, Seef nightlife, Seef restaurants, shopping in Seef, Seef beach clubs',
  openGraph: {
    title: 'Things to Do in Seef Bahrain 2026 | Seef Guide',
    description: 'Your complete guide to Seef district - shopping, dining, beaches, and entertainment.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/seef',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/seef',
  },
};

const seefHighlights = [
  {
    name: 'City Centre Bahrain',
    type: 'Shopping Mall',
    description: 'Bahrain\'s largest mall with Wahooo! Waterpark, Magic Planet, cinema, and hundreds of stores.',
    highlights: ['Wahooo! Waterpark', 'Magic Planet', 'Cinema', '350+ stores'],
    bestFor: 'Families, shopping, entertainment',
  },
  {
    name: 'Seef Mall',
    type: 'Shopping Mall',
    description: 'Popular mall with diverse shops, food court, cinema, and family entertainment.',
    highlights: ['Shopping', 'Dining', 'Cinema', 'Fun Factory'],
    bestFor: 'Shopping, families, dining',
  },
  {
    name: 'The Ritz-Carlton Beach',
    type: 'Beach Club',
    description: 'Luxury beach club with pristine sand, pools, and world-class dining at the iconic Ritz-Carlton.',
    highlights: ['Private beach', 'Multiple pools', 'Fine dining', 'Day passes'],
    bestFor: 'Beach lovers, luxury seekers',
  },
  {
    name: 'Jumeirah Royal Saray',
    type: 'Resort/Beach',
    description: 'Palatial resort with Ottoman-inspired design, beach, and spa. Day passes available.',
    highlights: ['Beach access', 'Talise Spa', 'Pool', 'Architecture'],
    bestFor: 'Spa seekers, photography',
  },
];

const seefDining = [
  { name: 'Trader Vic\'s', cuisine: 'Polynesian', location: 'Ritz-Carlton', price: '$$$' },
  { name: 'Primavera', cuisine: 'Italian', location: 'Ritz-Carlton', price: '$$$$' },
  { name: 'Bushido', cuisine: 'Japanese', location: 'Ritz-Carlton', price: '$$$$' },
  { name: 'La Plage', cuisine: 'Beach dining', location: 'Ritz-Carlton', price: '$$$' },
  { name: 'Salt', cuisine: 'Steakhouse', location: 'Jumeirah', price: '$$$$' },
  { name: 'Plums', cuisine: 'International', location: 'Jumeirah', price: '$$$' },
  { name: 'Mall restaurants', cuisine: 'Various', location: 'City Centre/Seef Mall', price: '$$' },
];

const seefNightlife = [
  {
    name: 'Ritz-Carlton Bars',
    type: 'Hotel bars',
    description: 'Multiple bars at the Ritz including Trader Vic\'s, Thai lounge, and lobby bar.',
    vibe: 'Upscale, sophisticated',
  },
  {
    name: 'Jumeirah Lounges',
    type: 'Hotel lounges',
    description: 'Elegant lounges and shisha terraces at Jumeirah Royal Saray.',
    vibe: 'Luxurious, relaxed',
  },
];

const areaInfo = {
  description: 'Seef is Bahrain\'s commercial and retail hub, home to major malls, luxury hotels, and beach resorts. It\'s the go-to area for shopping, beach days, and upscale dining.',
  gettingThere: 'Central location, easily accessible by car. Taxis readily available. About 15 minutes from airport.',
  bestFor: ['Shopping', 'Beach clubs', 'Luxury hotels', 'Family entertainment', 'Fine dining'],
  nearbyAreas: ['Manama (10 min)', 'Juffair (15 min)', 'Bahrain Bay (10 min)'],
};

export default function SeefGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Seef', url: 'https://www.bahrainnights.com/guides/seef' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              📍 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Things to Do in{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Seef
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {areaInfo.description}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Malls', value: '3+', icon: ShoppingBag },
              { label: 'Beach Clubs', value: '2+', icon: Waves },
              { label: 'Hotels', value: '10+', icon: Hotel },
              { label: 'Restaurants', value: '100+', icon: Utensils },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
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
          <h2 className="text-3xl font-bold mb-12 text-center">Top Attractions in Seef</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {seefHighlights.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400">{place.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{place.type}</p>
                <p className="text-gray-300 text-sm mb-4">{place.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {place.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Best for: {place.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🍽️ Dining in Seef</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seefDining.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-400">{restaurant.cuisine}</p>
                  </div>
                  <span className="text-cyan-400 text-sm">{restaurant.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{restaurant.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nightlife */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🌙 Seef Nightlife</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {seefNightlife.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg">{venue.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{venue.type}</p>
                <p className="text-gray-300 text-sm mb-2">{venue.description}</p>
                <p className="text-xs text-cyan-400">Vibe: {venue.vibe}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-400 mt-8">
            For more nightlife options, Adliya and Juffair are a short drive away.
          </p>
        </div>
      </section>

      {/* Area Info */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Seef</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="font-bold text-cyan-400 mb-3">Getting There</h3>
              <p className="text-gray-400 text-sm">{areaInfo.gettingThere}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="font-bold text-cyan-400 mb-3">Best For</h3>
              <p className="text-gray-400 text-sm">{areaInfo.bestFor.join(' • ')}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 md:col-span-2">
              <h3 className="font-bold text-cyan-400 mb-3">Nearby Areas</h3>
              <p className="text-gray-400 text-sm">{areaInfo.nearbyAreas.join(' • ')}</p>
            </div>
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
              { title: 'Things to Do Manama', href: '/guides/manama', emoji: '🏙️' },
              { title: 'Best Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-cyan-400 transition-colors">
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
                q: 'What is there to do in Seef, Bahrain?',
                a: 'Seef offers major shopping at City Centre Bahrain and Seef Mall, beach clubs at Ritz-Carlton and Jumeirah, luxury hotels, waterparks (Wahooo!), and numerous restaurants.',
              },
              {
                q: 'Is Seef good for shopping?',
                a: 'Yes! Seef is Bahrain\'s main shopping district with City Centre Bahrain (largest mall), Seef Mall, and various other retail options.',
              },
              {
                q: 'Are there beach clubs in Seef?',
                a: 'Yes, the Ritz-Carlton Beach Club and Jumeirah Royal Saray both offer beach and pool access. Day passes are available at both.',
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
            headline: 'Things to Do in Seef Bahrain 2026',
            description: 'Complete guide to Seef district including shopping, beaches, dining, and hotels.',
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
                name: 'What is there to do in Seef, Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Seef offers major shopping, beach clubs at luxury hotels, waterparks, and numerous restaurants.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there beach clubs in Seef?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, the Ritz-Carlton Beach Club and Jumeirah Royal Saray both offer beach and pool access with day passes.',
                },
              },
            ],
          }),
        }}
      />

      <InternalLinks 
        title="Explore More"
        links={[
          { title: 'All Guides', href: '/guides' },
          { title: 'Discover Places', href: '/places' },
          { title: 'Upcoming Events', href: '/events' },
          { title: 'Beach Clubs', href: '/guides/beach-clubs' },
          { title: 'Shopping Malls', href: '/guides/malls' },
          { title: 'Family Activities', href: '/guides/family-activities' },
        ]}
      />
    </div>
  );
}
