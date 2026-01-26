import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Clock, MapPin, Star,
  DollarSign, Calendar, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Buffets in Bahrain 2026 | Friday Brunch, Hotel Buffets & All-You-Can-Eat',
  description: 'Discover the best buffets in Bahrain! Complete guide to Friday brunches, hotel buffets, international spreads, and all-you-can-eat dining.',
  keywords: 'buffets Bahrain, Friday brunch Bahrain, hotel buffet Bahrain, all you can eat Bahrain, best brunch Manama, international buffet Bahrain',
  openGraph: {
    title: 'Best Buffets in Bahrain 2026 | Friday Brunch, Hotel Buffets',
    description: 'Your guide to the best buffets and brunches in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/buffets',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/buffets',
  },
};

const buffets = [
  {
    name: 'Friday Brunch at Four Seasons',
    location: 'Four Seasons Bahrain Bay',
    type: 'Luxury Brunch',
    rating: 5,
    price: 'BD 50-75 per person',
    day: 'Friday 12:30PM-4PM',
    description: 'Bahrain\'s most lavish Friday brunch with live cooking stations, seafood, premium cuts, and stunning bay views.',
    highlights: ['Seafood station', 'Sushi & sashimi', 'Carving station', 'Dessert room', 'Live cooking', 'Bay views'],
    cuisine: 'International with Asian, Arabic, Western stations',
    atmosphere: 'Ultra-luxury, celebratory',
    bestFor: 'Special occasions, celebrations, luxury seekers',
    tips: 'Book 1-2 weeks ahead. Soft packages available.',
  },
  {
    name: 'Ritz-Carlton Friday Brunch',
    location: 'Ritz-Carlton, Seef',
    type: 'Luxury Brunch',
    rating: 5,
    price: 'BD 45-65 per person',
    day: 'Friday 12:30PM-4PM',
    description: 'Legendary brunch across multiple restaurants with vast selection, live entertainment, and family-friendly atmosphere.',
    highlights: ['Multiple venues', 'Kids entertainment', 'Live music', 'Seafood tower', 'Asian station', 'BBQ grill'],
    cuisine: 'International spanning multiple restaurants',
    atmosphere: 'Elegant, family-friendly',
    bestFor: 'Families, groups, comprehensive selection',
    tips: 'Pool access often included. Kids programs available.',
  },
  {
    name: 'La Vinoteca Brunch',
    location: 'Sofitel Bahrain Zallaq',
    type: 'Resort Brunch',
    rating: 4,
    price: 'BD 35-50 per person',
    day: 'Friday 1PM-4PM',
    description: 'Mediterranean brunch at the beach resort with French flair, fresh seafood, and pool access included.',
    highlights: ['Mediterranean focus', 'Beach setting', 'Pool access', 'French pastries', 'Seafood', 'Cheese selection'],
    cuisine: 'Mediterranean, French',
    atmosphere: 'Relaxed resort, beachside',
    bestFor: 'Beach day + brunch, couples, relaxed atmosphere',
    tips: 'Combine with pool day. Less crowded than city brunches.',
  },
  {
    name: 'Gulf Hotel Brunch',
    location: 'Gulf Hotel, Adliya',
    type: 'Hotel Brunch',
    rating: 4,
    price: 'BD 30-45 per person',
    day: 'Friday 12:30PM-4PM',
    description: 'Established brunch with excellent variety across the hotel\'s restaurants. Known for consistent quality.',
    highlights: ['Multiple cuisines', 'Zahle Lebanese', 'Fusions Thai', 'Carving station', 'Good value'],
    cuisine: 'International with Lebanese, Thai, Western',
    atmosphere: 'Classic hotel brunch',
    bestFor: 'Good value, variety, central location',
    tips: 'Ask about access to specialty restaurants like Zahle.',
  },
  {
    name: 'ART Rotana Friday Brunch',
    location: 'ART Rotana, Amwaj',
    type: 'Resort Brunch',
    rating: 4,
    price: 'BD 28-40 per person',
    day: 'Friday 12:30PM-4PM',
    description: 'Family-friendly brunch in Amwaj with good value, beach access, and entertainment for kids.',
    highlights: ['Family-friendly', 'Beach access', 'Kids entertainment', 'BBQ station', 'International spread'],
    cuisine: 'International',
    atmosphere: 'Casual, family-oriented',
    bestFor: 'Families, value seekers, beach access',
    tips: 'Great value with beach/pool access. Book for outdoor seating.',
  },
  {
    name: 'Choices at Mövenpick',
    location: 'Mövenpick Hotel',
    type: 'Daily Buffet',
    rating: 4,
    price: 'BD 15-25 per person',
    day: 'Daily lunch & dinner',
    description: 'Popular daily buffet with themed nights and good variety. Excellent value for hotel buffet quality.',
    highlights: ['Themed nights', 'Seafood Friday', 'Asian Monday', 'Desserts', 'Live cooking'],
    cuisine: 'International, themed nights',
    atmosphere: 'Casual hotel dining',
    bestFor: 'Weekday buffets, themed nights, regular visits',
    tips: 'Check themed night schedule. Seafood nights popular.',
  },
  {
    name: 'Coral Bay Brunch',
    location: 'Coral Bay, Budaiya',
    type: 'Beach Club Brunch',
    rating: 4,
    price: 'BD 30-45 per person',
    day: 'Friday 1PM-5PM',
    description: 'Beach club brunch combining food with pool party atmosphere. Popular with younger crowd.',
    highlights: ['Pool party', 'DJ', 'Beach access', 'BBQ', 'Social atmosphere'],
    cuisine: 'International BBQ focus',
    atmosphere: 'Party, social, beach vibes',
    bestFor: 'Social brunchers, young professionals',
    tips: 'More party than food-focused. Great atmosphere.',
  },
  {
    name: 'Ramee Grand Buffet',
    location: 'Ramee Grand Hotel, Seef',
    type: 'Budget Buffet',
    rating: 3,
    price: 'BD 8-15 per person',
    day: 'Daily lunch & dinner',
    description: 'Affordable hotel buffet with decent variety. Good option for budget-conscious diners.',
    highlights: ['Budget-friendly', 'Indian dishes', 'Arabic options', 'Daily availability'],
    cuisine: 'International, Indian focus',
    atmosphere: 'Simple, functional',
    bestFor: 'Budget dining, weekday lunch',
    tips: 'Best for value, not premium experience.',
  },
];

const themedNights = [
  { day: 'Monday', theme: 'Asian Night', where: 'Multiple hotels' },
  { day: 'Tuesday', theme: 'BBQ Night', where: 'Ritz, Gulf Hotel' },
  { day: 'Wednesday', theme: 'Italian Night', where: 'Various' },
  { day: 'Thursday', theme: 'Arabic Night', where: 'Multiple venues' },
  { day: 'Friday', theme: 'Brunch Day', where: 'All major hotels' },
  { day: 'Saturday', theme: 'Seafood Night', where: 'Sofitel, Ritz' },
];

const tips = [
  { title: 'Book Early', content: 'Friday brunches at top hotels book out 1-2 weeks ahead. Reserve early.' },
  { title: 'Arrive Hungry', content: 'Pace yourself - start with lighter dishes, save room for favorites.' },
  { title: 'Timing', content: 'Arrive early for best selection. Late arrival means depleted stations.' },
  { title: 'Packages', content: 'Compare soft vs premium packages. Soft packages good value for families.' },
];

export default function BuffetsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Buffets', url: 'https://www.bahrainnights.com/guides/buffets' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🍽️ Dining Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Best Buffets</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From legendary Friday brunches to themed dinner buffets — discover Bahrain's best all-you-can-eat experiences.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Top Buffets', value: '15+', icon: Utensils },
              { label: 'Budget From', value: 'BD 8', icon: DollarSign },
              { label: 'Best Day', value: 'Friday', icon: Calendar },
              { label: 'Luxury Brunches', value: '5+', icon: Star },
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

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Themed Buffet Nights</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {themedNights.map((n) => (
              <div key={n.day} className="bg-white/5 rounded-xl p-3 text-center">
                <h3 className="font-semibold text-amber-400 text-sm">{n.day}</h3>
                <p className="text-xs text-gray-300">{n.theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Buffets & Brunches</h2>
          <p className="text-gray-400 text-center mb-12">Complete guide with prices and booking tips.</p>
          
          <div className="space-y-6">
            {buffets.map((b) => (
              <div key={b.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{b.name}</h3>
                        <p className="text-amber-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />{b.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">{[...Array(b.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />))}</div>
                        <span className="text-sm font-bold text-white">{b.price}</span>
                      </div>
                    </div>
                    <p className="text-sm text-amber-300 mb-2"><Clock className="w-4 h-4 inline mr-1" />{b.day}</p>
                    <p className="text-gray-300 mb-4">{b.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {b.highlights.map((h) => (<span key={h} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                    <p className="text-sm text-gray-400"><strong>Cuisine:</strong> {b.cuisine}</p>
                  </div>
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {b.atmosphere}</p>
                    <p><strong className="text-gray-400">Best for:</strong> {b.bestFor}</p>
                    <p className="text-amber-400 italic pt-2">💡 {b.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Buffet Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Dining Options</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/brunch" className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors">Brunch Guide</Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">All Restaurants</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Friday Brunch', href: '/guides/brunch', emoji: '🥂' },
              { title: 'Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Seafood', href: '/guides/seafood', emoji: '🦐' },
              { title: 'Hotels', href: '/guides/hotels', emoji: '🏨' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the best Friday brunch in Bahrain?', a: 'Four Seasons and Ritz-Carlton are considered the best luxury brunches. Gulf Hotel offers excellent value.' },
              { q: 'How much does brunch cost in Bahrain?', a: 'Budget options from BD 8-15, mid-range BD 25-40, luxury BD 45-75 per person.' },
              { q: 'Do I need to book for Friday brunch?', a: 'Yes! Popular brunches book out 1-2 weeks ahead. Always reserve in advance.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Best Buffets in Bahrain 2026',
        description: 'Complete guide to buffets and Friday brunches in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
