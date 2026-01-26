import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Hotel, Clock, MapPin, Star,
  Waves, Utensils, Sparkles, DollarSign
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Staycations in Bahrain 2026 | Hotel Packages & Deals',
  description: 'Discover the best staycation deals in Bahrain! Complete guide to luxury hotel packages, beach resorts, spa retreats, and weekend getaway offers.',
  keywords: 'staycation Bahrain, hotel packages Bahrain, weekend getaway Bahrain, luxury hotels Bahrain, beach resort Bahrain, hotel deals Manama',
  openGraph: {
    title: 'Best Staycations in Bahrain 2026 | Hotel Packages & Deals',
    description: 'Your guide to the best staycation deals in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/staycations',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/staycations',
  },
};

const staycations = [
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    type: 'Ultra Luxury',
    rating: 5,
    priceFrom: 'BD 150-250/night',
    description: 'Bahrain\'s most luxurious staycation on a private island with stunning bay views, world-class spa, and exceptional dining.',
    includes: ['Private beach', 'Infinity pools', 'Award-winning spa', 'Multiple restaurants', 'Kids\' club', 'Water sports'],
    packages: [
      { name: 'Weekend Escape', includes: 'Breakfast, spa credit, late checkout' },
      { name: 'Romance Package', includes: 'Champagne, dinner, couples spa' },
      { name: 'Family Fun', includes: 'Kids activities, breakfast, pool access' },
    ],
    bestFor: 'Couples, special occasions, ultimate luxury',
    highlights: 'Private island setting, CUT by Wolfgang Puck, rooftop pool',
  },
  {
    name: 'The Ritz-Carlton Bahrain',
    location: 'Seef',
    type: 'Luxury',
    rating: 5,
    priceFrom: 'BD 120-200/night',
    description: 'Elegant beachfront resort with extensive facilities, excellent dining, and renowned Ritz service. Perfect for families.',
    includes: ['Private beach', 'Multiple pools', 'Spa & fitness', 'Kids\' club', '10+ restaurants', 'Tennis courts'],
    packages: [
      { name: 'Beach Escape', includes: 'Breakfast, beach access, F&B credit' },
      { name: 'Spa Retreat', includes: 'Spa treatment, breakfast, late checkout' },
      { name: 'Club Level', includes: 'Lounge access, premium amenities' },
    ],
    bestFor: 'Families, business travelers, beach lovers',
    highlights: 'Largest hotel beach, Thai restaurant, cigar lounge',
  },
  {
    name: 'Sofitel Bahrain Zallaq',
    location: 'Zallaq',
    type: 'Luxury Resort',
    rating: 5,
    priceFrom: 'BD 90-160/night',
    description: 'Beach resort escape away from the city with French elegance, thalassotherapy spa, and beautiful coastline setting.',
    includes: ['Private beach', 'Thalassa spa', 'Pools', 'Multiple dining', 'Kids\' activities', 'Tennis'],
    packages: [
      { name: 'Thalasso Escape', includes: 'Spa circuit, breakfast, pool access' },
      { name: 'Beach Weekend', includes: 'Half-board, water sports, late checkout' },
      { name: 'Family Package', includes: 'Connecting rooms, kids activities, meals' },
    ],
    bestFor: 'Spa lovers, families, beach escape',
    highlights: 'Thalassotherapy spa, French dining, secluded beach',
  },
  {
    name: 'ART Rotana Amwaj Islands',
    location: 'Amwaj Islands',
    type: 'Resort',
    rating: 4,
    priceFrom: 'BD 60-100/night',
    description: 'Family-friendly resort in Amwaj with good value packages, beach access, and convenient island location.',
    includes: ['Beach access', 'Pool', 'Spa', 'Multiple restaurants', 'Kids\' pool', 'Gym'],
    packages: [
      { name: 'Weekend Getaway', includes: 'Breakfast, pool, late checkout' },
      { name: 'Half Board', includes: 'Breakfast & dinner, beach access' },
      { name: 'Family Stay', includes: 'Connecting rooms, kids meals free' },
    ],
    bestFor: 'Families, budget luxury, Amwaj visitors',
    highlights: 'Amwaj location, value packages, island atmosphere',
  },
  {
    name: 'Gulf Hotel Bahrain',
    location: 'Adliya',
    type: 'Heritage Luxury',
    rating: 4,
    priceFrom: 'BD 70-120/night',
    description: 'Iconic Bahrain hotel with decades of history, excellent dining options, and central Adliya location.',
    includes: ['Pool', 'Spa', '8+ restaurants', 'Fitness center', 'Garden', 'Kids\' club'],
    packages: [
      { name: 'Dine Around', includes: 'Dining credit, breakfast, pool access' },
      { name: 'Spa Package', includes: 'Spa treatment, breakfast, gym' },
      { name: 'Weekend Special', includes: 'Room upgrade, breakfast, late checkout' },
    ],
    bestFor: 'Foodies, central location, business',
    highlights: 'Legendary restaurants (Fusions, Zahle), central location',
  },
  {
    name: 'The Merchant House',
    location: 'Manama',
    type: 'Boutique',
    rating: 5,
    priceFrom: 'BD 80-140/night',
    description: 'Boutique heritage hotel in restored traditional building. Intimate, unique, and full of character.',
    includes: ['Rooftop pool', 'Restaurant', 'Heritage tours', 'Personalized service', 'Art collection'],
    packages: [
      { name: 'Heritage Experience', includes: 'Walking tour, breakfast, afternoon tea' },
      { name: 'Romantic Escape', includes: 'Dinner, champagne, late checkout' },
    ],
    bestFor: 'Couples, culture lovers, unique stays',
    highlights: 'Heritage building, rooftop pool, boutique experience',
  },
  {
    name: 'Wyndham Grand Manama',
    location: 'Bahrain Bay',
    type: 'Business Luxury',
    rating: 4,
    priceFrom: 'BD 55-90/night',
    description: 'Modern hotel in Bahrain Bay with good value, rooftop pool, and proximity to Avenues Mall.',
    includes: ['Rooftop pool', 'Gym', 'Restaurants', 'Bay views', 'Meeting rooms'],
    packages: [
      { name: 'Bay View', includes: 'Breakfast, pool, parking' },
      { name: 'Weekend Deal', includes: 'Brunch, late checkout, upgrade' },
    ],
    bestFor: 'Business stays, shopping trips, value luxury',
    highlights: 'Bahrain Bay views, Avenues Mall access, rooftop pool',
  },
  {
    name: 'Jumeirah Royal Saray',
    location: 'Seef',
    type: 'Luxury',
    rating: 5,
    priceFrom: 'BD 100-180/night',
    description: 'Opulent beachfront resort with palatial design, lagoon pools, and exclusive beach club.',
    includes: ['Private beach', 'Lagoon pools', 'Spa', 'Kids\' club', 'Fine dining', 'Tennis'],
    packages: [
      { name: 'Royal Escape', includes: 'Breakfast, spa credit, beach access' },
      { name: 'Family Kingdom', includes: 'Kids activities, meals, pool' },
    ],
    bestFor: 'Families, luxury seekers, beach lovers',
    highlights: 'Palatial architecture, lagoon pools, private beach',
  },
];

const tips = [
  {
    title: 'Best Deals',
    content: 'Book direct on hotel websites or apps for best rates. Check for advance booking discounts (14-21 days).',
  },
  {
    title: 'Timing',
    content: 'Weekday rates are often cheaper. Summer brings great deals as it\'s low season.',
  },
  {
    title: 'Packages vs Rooms',
    content: 'Compare package value vs room-only + à la carte. Packages often save 20-30% on total cost.',
  },
  {
    title: 'Loyalty Programs',
    content: 'Join hotel loyalty programs (Marriott Bonvoy, Hilton Honors) for upgrades and perks.',
  },
  {
    title: 'Ask for Upgrades',
    content: 'Mention special occasions. Hotels often upgrade for birthdays, anniversaries.',
  },
  {
    title: 'Half Board Value',
    content: 'Half-board (breakfast + dinner) packages often offer best value at resort hotels.',
  },
];

const staycationsByMood = [
  { mood: 'Ultimate Luxury', hotels: ['Four Seasons', 'Ritz-Carlton'] },
  { mood: 'Beach Escape', hotels: ['Sofitel Zallaq', 'Ritz-Carlton', 'Jumeirah'] },
  { mood: 'Family Fun', hotels: ['ART Rotana', 'Jumeirah', 'Ritz-Carlton'] },
  { mood: 'Romantic Getaway', hotels: ['Four Seasons', 'Merchant House'] },
  { mood: 'Best Value', hotels: ['ART Rotana', 'Wyndham Grand', 'Gulf Hotel'] },
  { mood: 'Spa Focus', hotels: ['Sofitel Zallaq', 'Four Seasons', 'Ritz-Carlton'] },
];

export default function StaycationsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Staycations', url: 'https://www.bahrainnights.com/guides/staycations' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mb-4">
              🏨 Staycation Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Best Staycations
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Escape without leaving Bahrain — discover the best hotel packages, 
              beach resorts, and weekend getaway deals.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Luxury Hotels', value: '15+', icon: Hotel },
              { label: 'From/Night', value: 'BD 55', icon: DollarSign },
              { label: 'Beach Resorts', value: '5+', icon: Waves },
              { label: 'Spa Hotels', value: '8+', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Mood */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Find Your Perfect Staycation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {staycationsByMood.map((item) => (
              <div key={item.mood} className="bg-white/5 rounded-xl p-4 text-center">
                <h3 className="font-semibold text-indigo-400 text-sm mb-2">{item.mood}</h3>
                <p className="text-xs text-gray-400">{item.hotels.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staycations List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Staycation Hotels</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to the best hotel staycation packages in Bahrain.
          </p>
          
          <div className="space-y-6">
            {staycations.map((hotel) => (
              <div 
                key={hotel.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{hotel.name}</h3>
                        <p className="text-indigo-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {hotel.location} • {hotel.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(hotel.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{hotel.priceFrom}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{hotel.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.includes.map((item) => (
                        <span key={item} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-300">Popular Packages:</p>
                      <div className="grid md:grid-cols-3 gap-2">
                        {hotel.packages.map((pkg) => (
                          <div key={pkg.name} className="bg-black/20 rounded-lg p-2">
                            <p className="font-semibold text-indigo-400 text-sm">{pkg.name}</p>
                            <p className="text-xs text-gray-400">{pkg.includes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Best for:</strong> {hotel.bestFor}</p>
                    <p><strong className="text-gray-400">Highlights:</strong> {hotel.highlights}</p>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Staycation Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-indigo-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Relax?</h2>
          <p className="text-gray-300 mb-8">
            Explore more accommodation and wellness options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/hotels"
              className="px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-black font-bold rounded-lg transition-colors"
            >
              All Hotels
            </Link>
            <Link 
              href="/guides/spas"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Best Spas
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Best Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Best Spas', href: '/guides/spas', emoji: '💆' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Romantic Ideas', href: '/guides/romantic', emoji: '💕' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-indigo-400 transition-colors">
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
                q: 'What are the best hotels for a staycation in Bahrain?',
                a: 'Top staycation picks include Four Seasons Bahrain Bay (ultimate luxury), Ritz-Carlton (families/beach), Sofitel Zallaq (spa retreat), and ART Rotana (value). Each offers excellent packages.',
              },
              {
                q: 'How much does a staycation cost in Bahrain?',
                a: 'Prices range from BD 55-250 per night depending on hotel class. Most hotels offer packages that include breakfast, pool access, and dining credits starting from BD 60-80.',
              },
              {
                q: 'When are the best staycation deals in Bahrain?',
                a: 'Summer (May-September) offers the best deals as it\'s low season. Weekdays are typically cheaper than weekends. Look for advance booking discounts.',
              },
              {
                q: 'Do hotels offer staycation packages for residents?',
                a: 'Yes! Most hotels have specific resident rates and staycation packages with added value like F&B credits, late checkout, and spa discounts. Show your CPR or residence visa.',
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
            headline: 'Best Staycations in Bahrain 2026 | Hotel Packages & Deals',
            description: 'Complete guide to staycation packages in Bahrain including luxury hotels and beach resorts.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/staycations',
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the best hotels for a staycation in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Top staycation picks include Four Seasons (luxury), Ritz-Carlton (families), Sofitel Zallaq (spa), and ART Rotana (value).',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does a staycation cost in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Prices range from BD 55-250 per night depending on hotel class.',
                },
              },
              {
                '@type': 'Question',
                name: 'When are the best staycation deals in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Summer (May-September) offers the best deals as it\'s low season.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
