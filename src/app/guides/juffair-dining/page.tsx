import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Star, MapPin, Moon, Coffee,
  ArrowRight, Globe, DollarSign, Clock, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Restaurants in Juffair 2026 | Juffair Dining Guide Bahrain',
  description: 'Find the best restaurants in Juffair, Bahrain! From international cuisine to late-night eats, explore the top dining spots in Juffair. Complete restaurant guide.',
  keywords: 'best restaurants in Juffair, Juffair restaurants, Juffair dining, where to eat Juffair, Juffair food, restaurants near Juffair Bahrain',
  openGraph: {
    title: 'Best Restaurants in Juffair 2026 | Juffair Dining Guide Bahrain',
    description: 'Your complete guide to restaurants in Juffair - international cuisine, late-night eats, and local favorites.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/juffair-dining',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/juffair-dining',
  },
};

const topRestaurants = [
  {
    name: 'Monsoon',
    cuisine: 'Pan-Asian',
    location: 'Gulf Hotel',
    price: '$$$',
    rating: 4.6,
    description: 'Popular pan-Asian restaurant with excellent Thai, Japanese, and Chinese dishes. Great for groups.',
    highlights: ['Pan-Asian menu', 'Good portions', 'Popular with expats', 'Hotel quality'],
    bestFor: 'Groups, Asian food lovers',
    hours: 'Lunch and dinner',
  },
  {
    name: 'Sherlock Holmes',
    cuisine: 'British Pub',
    location: 'Gulf Hotel',
    price: '$$',
    rating: 4.5,
    description: 'Legendary British pub with great food, drinks, and Friday brunch. A Juffair institution.',
    highlights: ['Friday brunch', 'Live music', 'Pub classics', 'Friendly atmosphere'],
    bestFor: 'Brunch, drinks, casual dining',
    hours: 'Lunch to late night',
  },
  {
    name: 'Charcoal Grill',
    cuisine: 'Indian',
    location: 'Juffair',
    price: '$$',
    rating: 4.5,
    description: 'Excellent Indian restaurant known for tandoori dishes and North Indian cuisine.',
    highlights: ['Tandoori specials', 'Authentic flavors', 'Good value', 'Popular'],
    bestFor: 'Indian food lovers',
    hours: 'Lunch and dinner',
  },
  {
    name: 'Nando\'s',
    cuisine: 'Peri-Peri Chicken',
    location: 'Juffair',
    price: '$$',
    rating: 4.3,
    description: 'Reliable chain known for flame-grilled peri-peri chicken. Quick, casual, and tasty.',
    highlights: ['Peri-peri chicken', 'Casual dining', 'Quick service', 'Family-friendly'],
    bestFor: 'Quick meals, families',
    hours: 'All day',
  },
  {
    name: 'Lanterns',
    cuisine: 'Indian',
    location: 'Juffair',
    price: '$$',
    rating: 4.4,
    description: 'Popular Indian restaurant with excellent biryani and curries. Great value.',
    highlights: ['Biryani', 'Curries', 'Value for money', 'Local favorite'],
    bestFor: 'Indian cuisine, value',
    hours: 'Lunch and dinner',
  },
  {
    name: 'Gulf Hotel Restaurants',
    cuisine: 'Various',
    location: 'Gulf Hotel',
    price: '$$$',
    rating: 4.5,
    description: 'Multiple dining options including Fusions (Peruvian-Japanese), Rasoi (Indian), and more.',
    highlights: ['Multiple cuisines', 'Quality dining', 'Full bar', 'Various atmospheres'],
    bestFor: 'Variety, hotel dining',
    hours: 'Varies by restaurant',
  },
];

const cuisineGuide = [
  {
    cuisine: 'Indian',
    description: 'Juffair has excellent Indian restaurants, from fine dining to casual.',
    topPicks: ['Charcoal Grill', 'Lanterns', 'Rasoi by Vineet', 'Various'],
  },
  {
    cuisine: 'Fast Food & Casual',
    description: 'Major chains and quick eats throughout the area.',
    topPicks: ['Nando\'s', 'KFC', 'McDonald\'s', 'Fuddruckers'],
  },
  {
    cuisine: 'Asian',
    description: 'Pan-Asian options including Chinese, Thai, and Japanese.',
    topPicks: ['Monsoon', 'Various Chinese restaurants', 'Thai places'],
  },
  {
    cuisine: 'Western/Pub Food',
    description: 'Pub fare and Western dishes, especially in hotel venues.',
    topPicks: ['Sherlock Holmes', 'JJ\'s Irish Pub', 'Hotel restaurants'],
  },
];

const lateNightOptions = [
  { name: 'Sherlock Holmes', hours: 'Until 2 AM', type: 'Pub food' },
  { name: 'JJ\'s Irish Pub', hours: 'Until 2 AM', type: 'Pub food' },
  { name: 'Fast food chains', hours: 'Until midnight+', type: 'Quick eats' },
  { name: 'Shawarma shops', hours: 'Until late', type: 'Middle Eastern' },
];

const budgetGuide = [
  { level: 'Budget (Under BD 5)', options: 'Shawarma spots, fast food, local cafeterias' },
  { level: 'Mid-Range (BD 5-15)', options: 'Nando\'s, Charcoal Grill, most restaurants' },
  { level: 'Higher End (BD 15+)', options: 'Gulf Hotel restaurants, fine dining options' },
];

export default function JuffairDiningPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Juffair Dining', url: 'https://www.bahrainnights.com/guides/juffair-dining' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🍽️ Dining Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Restaurants in Juffair
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Juffair is Bahrain&apos;s most diverse dining district, home to international cuisines, 
              late-night eats, and everything from budget shawarma to hotel fine dining. 
              Here&apos;s your guide to eating in Juffair.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '100+', icon: Utensils },
              { label: 'Cuisines', value: '30+', icon: Globe },
              { label: 'Budget From', value: 'BD 2', icon: DollarSign },
              { label: 'Late Night', value: '2 AM', icon: Moon },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Restaurants */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Restaurants</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best dining spots in Juffair.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topRestaurants.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-orange-400 text-sm">{restaurant.cuisine}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="font-bold">{restaurant.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{restaurant.price}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-3">{restaurant.location}</p>
                <p className="text-gray-300 text-sm mb-4">{restaurant.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Best for: {restaurant.bestFor}</span>
                  <span>{restaurant.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Cuisine */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Cuisine</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {cuisineGuide.map((cat) => (
              <div key={cat.cuisine} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-orange-400 mb-2">{cat.cuisine}</h3>
                <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                <p className="text-xs text-orange-400">Top picks: {cat.topPicks.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Late Night */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🌙 Late Night Eating</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lateNightOptions.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold">{place.name}</h3>
                <p className="text-sm text-orange-400">{place.hours}</p>
                <p className="text-xs text-gray-400 mt-1">{place.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💰 Budget Guide</h2>
          
          <div className="space-y-4">
            {budgetGuide.map((level) => (
              <div key={level.level} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{level.level}</h3>
                <p className="text-gray-400 text-sm">{level.options}</p>
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
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Juffair Nightlife', href: '/guides/nightlife-juffair', emoji: '🌙' },
              { title: 'Best Cafes', href: '/guides/cafes', emoji: '☕' },
              { title: 'Best Brunch', href: '/guides/brunch', emoji: '🥂' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-orange-400 transition-colors">
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
                q: 'What are the best restaurants in Juffair?',
                a: 'Top restaurants include Monsoon (Pan-Asian), Sherlock Holmes (British pub), Charcoal Grill (Indian), and the various restaurants at Gulf Hotel. The area offers incredible variety.',
              },
              {
                q: 'Is there late-night food in Juffair?',
                a: 'Yes! Sherlock Holmes and JJ\'s serve until 2 AM, fast food chains stay open late, and numerous shawarma shops operate into the early hours.',
              },
              {
                q: 'Is Juffair good for Indian food?',
                a: 'Excellent! Juffair has some of Bahrain\'s best Indian restaurants including Charcoal Grill, Lanterns, and Rasoi by Vineet at Gulf Hotel.',
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
            headline: 'Best Restaurants in Juffair 2026',
            description: 'Complete guide to restaurants in Juffair, Bahrain - international cuisine, late-night eats, and dining recommendations.',
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
                name: 'What are the best restaurants in Juffair?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Top restaurants include Monsoon (Pan-Asian), Sherlock Holmes (British pub), Charcoal Grill (Indian), and the various restaurants at Gulf Hotel.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there late-night food in Juffair?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Several venues serve until 2 AM, and numerous shawarma shops operate into the early hours.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
