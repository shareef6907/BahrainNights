import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Wine, Clock, MapPin, Star,
  ArrowRight, Users, Music, Sun, DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Brunches in Bahrain 2026 | Friday Brunch Guide',
  description: 'Complete guide to the best Friday brunches in Bahrain - from budget-friendly to luxury experiences. Find the perfect brunch for every occasion.',
  keywords: 'Bahrain brunch, Friday brunch Bahrain, best brunch Bahrain, brunch deals Bahrain, hotel brunch Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brunches',
  },
  openGraph: {
    title: 'Best Brunches in Bahrain 2026 | Friday Brunch Guide',
    description: 'Your ultimate guide to Friday brunches in Bahrain - from casual to luxury.',
    type: 'article',
    locale: 'en_US',
  },
};

const brunches = [
  {
    name: 'Four Seasons Bahrain Bay',
    venue: 'CUT by Wolfgang Puck / re/Asian',
    price: 'BD 45-65',
    tier: 'Luxury',
    rating: 5,
    highlights: ['Premium steaks', 'Stunning bay views', 'Live stations', 'Poolside option'],
    bestFor: 'Special occasions, impressing guests',
    hours: '12:30 PM - 4:00 PM',
  },
  {
    name: 'The Ritz-Carlton',
    venue: 'La Med / Primavera',
    price: 'BD 40-55',
    tier: 'Luxury',
    rating: 5,
    highlights: ['Beachfront setting', 'International cuisine', 'Champagne packages', 'Kids area'],
    bestFor: 'Family celebrations, romantic dates',
    hours: '12:00 PM - 4:00 PM',
  },
  {
    name: 'Gulf Hotel',
    venue: 'Multiple Outlets',
    price: 'BD 28-45',
    tier: 'Premium',
    rating: 4,
    highlights: ['Variety of cuisines', 'Pool access', 'Live entertainment', 'Large groups'],
    bestFor: 'Groups, variety seekers',
    hours: '12:30 PM - 4:00 PM',
  },
  {
    name: 'The Merchant House',
    venue: 'The Orangery',
    price: 'BD 35-50',
    tier: 'Premium',
    rating: 5,
    highlights: ['Boutique atmosphere', 'Gourmet dishes', 'Garden setting', 'Intimate vibe'],
    bestFor: 'Foodies, couples',
    hours: '1:00 PM - 5:00 PM',
  },
  {
    name: 'Sofitel Bahrain',
    venue: 'Salon de Thé',
    price: 'BD 30-42',
    tier: 'Premium',
    rating: 4,
    highlights: ['French cuisine', 'Elegant setting', 'Pastry station', 'Cocktails'],
    bestFor: 'French food lovers, elegant atmosphere',
    hours: '12:30 PM - 4:00 PM',
  },
  {
    name: 'ART Rotana',
    venue: 'Choices',
    price: 'BD 22-35',
    tier: 'Mid-Range',
    rating: 4,
    highlights: ['Good value', 'International buffet', 'Family-friendly', 'Pool included'],
    bestFor: 'Families, budget-conscious',
    hours: '12:30 PM - 4:00 PM',
  },
  {
    name: 'Crowne Plaza',
    venue: 'La Mosaique',
    price: 'BD 20-32',
    tier: 'Mid-Range',
    rating: 4,
    highlights: ['Affordable', 'Large variety', 'Central location', 'Good for groups'],
    bestFor: 'Budget brunches, casual gatherings',
    hours: '12:30 PM - 4:00 PM',
  },
  {
    name: 'Coral Bay',
    venue: 'Beach Brunch',
    price: 'BD 25-40',
    tier: 'Mid-Range',
    rating: 4,
    highlights: ['Beach setting', 'Pool access', 'Relaxed vibe', 'Water sports'],
    bestFor: 'Beach lovers, active day out',
    hours: '12:00 PM - 5:00 PM',
  },
];

const tips = [
  {
    icon: Clock,
    title: 'Book Ahead',
    content: 'Popular brunches book out weeks in advance, especially during cooler months (Oct-Apr). Call or book online at least a week ahead.',
  },
  {
    icon: DollarSign,
    title: 'Package Options',
    content: 'Most venues offer soft drinks, house beverages, or premium packages. House packages typically add BD 10-15 to the base price.',
  },
  {
    icon: Users,
    title: 'Group Bookings',
    content: 'Groups of 6+ often get special rates. Ask about private areas or dedicated service for celebrations.',
  },
  {
    icon: Sun,
    title: 'Pool Access',
    content: 'Many hotel brunches include pool access. Bring swimwear and make a day of it - perfect during warmer months.',
  },
];

const byOccasion = [
  {
    occasion: 'Romantic Date',
    picks: ['The Merchant House', 'Four Seasons', 'Ritz-Carlton'],
    tip: 'Book a table with a view and opt for the champagne package',
  },
  {
    occasion: 'Family Brunch',
    picks: ['Gulf Hotel', 'ART Rotana', 'Coral Bay'],
    tip: 'Look for venues with kids entertainment and pool access',
  },
  {
    occasion: 'Friends Gathering',
    picks: ['Gulf Hotel', 'Crowne Plaza', 'Sofitel'],
    tip: 'Book early for large groups and ask about group rates',
  },
  {
    occasion: 'Business Brunch',
    picks: ['Four Seasons', 'The Merchant House', 'Ritz-Carlton'],
    tip: 'Choose quieter venues with good service for discussions',
  },
];

export default function BrunchesGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🥂 Brunch Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Brunches
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Friday brunch is a Bahrain institution. From lavish hotel spreads to 
              beachside feasts — find your perfect weekend indulgence.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Hotel Brunches', value: '30+', icon: UtensilsCrossed },
              { label: 'Price Range', value: 'BD 20-65', icon: DollarSign },
              { label: 'Avg Duration', value: '3-4 hrs', icon: Clock },
              { label: 'With Pool', value: '15+', icon: Sun },
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

      {/* Brunches List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Brunches</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our handpicked selection of the best Friday brunches across Bahrain.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {brunches.map((brunch) => (
              <div 
                key={brunch.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{brunch.name}</h3>
                    <p className="text-amber-400 text-sm">{brunch.venue}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{brunch.price}</div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      brunch.tier === 'Luxury' ? 'bg-purple-500/30 text-purple-300' :
                      brunch.tier === 'Premium' ? 'bg-amber-500/30 text-amber-300' :
                      'bg-green-500/30 text-green-300'
                    }`}>
                      {brunch.tier}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < brunch.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{brunch.hours}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {brunch.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-300">Best for:</strong> {brunch.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Occasion */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Occasion</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {byOccasion.map((item) => (
              <div key={item.occasion} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-3">{item.occasion}</h3>
                <ul className="space-y-2 mb-4">
                  {item.picks.map((pick) => (
                    <li key={pick} className="text-sm flex items-center gap-2">
                      <span className="text-amber-500">•</span> {pick}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 italic">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Brunch Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <tip.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Brunch?</h2>
          <p className="text-gray-300 mb-8">
            Browse restaurants and make your reservation for this Friday.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link 
              href="/guides/things-to-do"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              More Things to Do
            </Link>
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
            headline: 'Best Brunches in Bahrain 2026',
            description: 'Complete guide to Friday brunches in Bahrain from budget to luxury.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-25',
            dateModified: '2026-01-25',
          }),
        }}
      />
    </div>
  );
}
