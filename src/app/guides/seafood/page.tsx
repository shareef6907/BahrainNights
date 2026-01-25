import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Fish, Clock, MapPin, Star,
  DollarSign, Waves, Anchor, Shell
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Seafood Restaurants in Bahrain 2025 | Fresh Fish, Lobster & Shrimp',
  description: 'Discover the best seafood restaurants in Bahrain! Complete guide to fresh fish, lobster, shrimp, and waterfront dining from fine dining to local catches.',
  keywords: 'seafood Bahrain, best fish restaurant Bahrain, lobster Bahrain, fresh seafood Manama, waterfront dining Bahrain, fish market restaurant',
  openGraph: {
    title: 'Best Seafood Restaurants in Bahrain 2025 | Fresh Fish, Lobster & Shrimp',
    description: 'Your guide to the best seafood restaurants in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/seafood',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/seafood',
  },
};

const restaurants = [
  {
    name: 'CUT by Wolfgang Puck',
    location: 'Four Seasons Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 40-80 per person',
    cuisine: 'American Seafood & Steaks',
    description: 'Celebrity chef Wolfgang Puck\'s award-winning restaurant featuring premium seafood alongside steaks. Stunning bay views and impeccable service.',
    specialties: ['Lobster', 'Fresh oysters', 'Seafood towers', 'Wagyu beef', 'Tasting menus'],
    atmosphere: 'Ultra-luxury, bay views, celebrity chef',
    hours: 'Daily 6PM-11PM',
    reservation: 'Essential',
    bestFor: 'Special occasions, luxury dining, celebrations',
    signature: 'Seafood tower, Maine lobster',
  },
  {
    name: 'La Mer',
    location: 'Ritz-Carlton Bahrain',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 30-60 per person',
    cuisine: 'French Seafood',
    description: 'Elegant French seafood restaurant with Mediterranean influences. Fresh catches prepared with classic techniques.',
    specialties: ['Fresh fish', 'Bouillabaisse', 'Lobster', 'Oysters', 'French preparations'],
    atmosphere: 'Elegant, refined, beachfront setting',
    hours: 'Tue-Sat 7PM-11PM',
    reservation: 'Required',
    bestFor: 'Romantic dinners, special occasions',
    signature: 'Bouillabaisse, Grilled lobster',
  },
  {
    name: 'Masso',
    location: 'Ritz-Carlton Bahrain',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Italian Seafood',
    description: 'Upscale Italian restaurant with excellent seafood pasta and fresh catches. Beautiful terrace dining.',
    specialties: ['Seafood pasta', 'Fresh fish', 'Italian classics', 'Risotto', 'Grilled seafood'],
    atmosphere: 'Elegant Italian, terrace views',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Italian seafood, romantic dinner',
    signature: 'Seafood linguine, Branzino',
  },
  {
    name: 'Fares Seafood',
    location: 'Multiple locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-20 per person',
    cuisine: 'Lebanese Seafood',
    description: 'Popular Lebanese restaurant famous for fresh, simply prepared fish and seafood. Multiple convenient locations.',
    specialties: ['Fresh fish (grilled/fried)', 'Shrimp', 'Calamari', 'Fish sayadieh', 'Mezze'],
    atmosphere: 'Casual, family-friendly',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Families, casual seafood, value',
    signature: 'Grilled hammour, Fried calamari',
  },
  {
    name: 'Bushido',
    location: 'Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-45 per person',
    cuisine: 'Japanese Seafood',
    description: 'Premium Japanese restaurant with exceptional sushi, sashimi, and fresh seafood preparations.',
    specialties: ['Sushi', 'Sashimi', 'Japanese seafood', 'Wagyu', 'Omakase'],
    atmosphere: 'Sleek Japanese, intimate',
    hours: 'Daily 12PM-3PM, 7PM-12AM',
    reservation: 'Recommended',
    bestFor: 'Japanese seafood, sushi lovers',
    signature: 'Omakase, Signature rolls',
  },
  {
    name: 'Olives',
    location: 'Gulf Hotel',
    type: 'Casual Fine',
    rating: 4,
    price: 'BD 15-30 per person',
    cuisine: 'Mediterranean Seafood',
    description: 'Mediterranean restaurant with excellent seafood options, fresh salads, and grilled catches.',
    specialties: ['Grilled fish', 'Seafood pasta', 'Mediterranean dishes', 'Fresh salads'],
    atmosphere: 'Mediterranean, poolside setting',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Casual lunch, Mediterranean food',
    signature: 'Grilled sea bass, Seafood risotto',
  },
  {
    name: 'Al Dar Islands Restaurant',
    location: 'Al Dar Islands',
    type: 'Waterfront Casual',
    rating: 4,
    price: 'BD 10-25 per person',
    cuisine: 'Bahraini Seafood',
    description: 'Island restaurant serving fresh catches in a unique setting. Part of the Al Dar Islands experience.',
    specialties: ['Fresh local fish', 'Grilled seafood', 'Bahraini style', 'Island atmosphere'],
    atmosphere: 'Casual island dining, unique setting',
    hours: 'Daytime with island visits',
    reservation: 'Book island trip',
    bestFor: 'Unique experience, day trips',
    signature: 'Fresh catch of the day',
  },
  {
    name: 'Cantina Kahlo',
    location: 'Adliya',
    type: 'Casual',
    rating: 4,
    price: 'BD 12-25 per person',
    cuisine: 'Mexican Seafood',
    description: 'Vibrant Mexican restaurant with excellent seafood tacos, ceviche, and coastal Mexican dishes.',
    specialties: ['Fish tacos', 'Ceviche', 'Shrimp dishes', 'Mexican seafood'],
    atmosphere: 'Colorful, lively, Mexican vibes',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended for weekends',
    bestFor: 'Casual dining, Mexican seafood',
    signature: 'Fish tacos, Ceviche',
  },
  {
    name: 'Bait Al Kabab',
    location: 'Manama',
    type: 'Casual',
    rating: 4,
    price: 'BD 6-15 per person',
    cuisine: 'Persian Seafood',
    description: 'Persian restaurant with excellent grilled fish and seafood alongside traditional kebabs.',
    specialties: ['Grilled fish', 'Shrimp kebab', 'Persian rice', 'Grilled hammour'],
    atmosphere: 'Traditional Persian',
    hours: 'Daily 12PM-11PM',
    reservation: 'Not required',
    bestFor: 'Persian style fish, casual dining',
    signature: 'Grilled hammour with saffron rice',
  },
  {
    name: 'Manama Fish Market',
    location: 'Central Manama',
    type: 'Market',
    rating: 4,
    price: 'BD 3-10 per person',
    cuisine: 'Local/Market',
    description: 'Buy fresh fish at the market and have it cooked at nearby restaurants. Authentic local experience.',
    specialties: ['Fresh daily catch', 'Local fish varieties', 'Custom cooking', 'Hammour', 'Shrimp'],
    atmosphere: 'Market bustle, authentic',
    hours: '5AM-12PM (market hours)',
    reservation: 'Not required',
    bestFor: 'Authentic experience, budget, fresh fish',
    signature: 'Pick your own fish',
  },
];

const localFish = [
  { name: 'Hammour', description: 'Gulf grouper - Bahrain\'s most popular fish, firm white flesh', best: 'Grilled or fried' },
  { name: 'Safi', description: 'Rabbitfish - delicate flavor, excellent grilled whole', best: 'Grilled with lemon' },
  { name: 'Sheiri', description: 'Emperor fish - firm texture, slightly sweet', best: 'Grilled or machboos' },
  { name: 'Channad', description: 'Mackerel - rich flavor, great for curries', best: 'Curried or fried' },
  { name: 'Rubyan', description: 'Local shrimp - sweet and succulent', best: 'Grilled or in rice dishes' },
  { name: 'Subaiti', description: 'Sea bream - mild flavor, versatile', best: 'Grilled or fried' },
];

const tips = [
  {
    title: 'Freshness',
    content: 'Ask what\'s fresh today. Good restaurants proudly display their daily catch.',
  },
  {
    title: 'Local Fish',
    content: 'Try hammour (Gulf grouper) - it\'s the local favorite. Safi and sheiri are also excellent.',
  },
  {
    title: 'Preparation',
    content: 'Most places offer grilled, fried, or local-style preparation. Grilled preserves natural flavors.',
  },
  {
    title: 'Fish Market',
    content: 'For the freshest and cheapest, buy at Manama fish market and have it cooked nearby.',
  },
];

export default function SeafoodPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Seafood', url: 'https://www.bahrainnights.com/guides/seafood' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🦐 Restaurant Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Best Seafood
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From luxury lobster to fresh-from-the-Gulf hammour — discover the best 
              seafood restaurants, fish markets, and waterfront dining in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Seafood Spots', value: '25+', icon: Fish },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Waterfront', value: '5+', icon: Waves },
              { label: 'Local Species', value: '10+', icon: Shell },
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

      {/* Local Fish Guide */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Local Fish Guide</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {localFish.map((fish) => (
              <div key={fish.name} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-blue-400">{fish.name}</h3>
                <p className="text-xs text-gray-400 mb-1">{fish.description}</p>
                <p className="text-xs text-cyan-300">Best: {fish.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Seafood Restaurants</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From fine dining to fish market cooking.
          </p>
          
          <div className="space-y-6">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        <p className="text-blue-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.cuisine}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-blue-400">Signature: </strong>
                        {restaurant.signature}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-blue-400 italic pt-2">Best for: {restaurant.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Seafood Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Dining</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/sushi" className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors">
              Sushi Guide
            </Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">
              All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Best Sushi', href: '/guides/sushi', emoji: '🍣' },
              { title: 'Arabic Food', href: '/guides/arabic-restaurants', emoji: '🥙' },
              { title: 'Fine Dining', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the best fish to try in Bahrain?', a: 'Hammour (Gulf grouper) is the local favorite — firm white flesh, excellent grilled. Safi and sheiri are also delicious local options.' },
              { q: 'Where is the best seafood in Bahrain?', a: 'For fine dining, CUT and La Mer at luxury hotels. For casual fresh fish, Fares Seafood. For authentic experience, Manama fish market.' },
              { q: 'Is seafood expensive in Bahrain?', a: 'Ranges widely. Fish market meals from BD 3-10, casual restaurants BD 8-20, fine dining BD 30-80 per person.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Best Seafood Restaurants in Bahrain 2025',
        description: 'Complete guide to seafood restaurants in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2025-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
