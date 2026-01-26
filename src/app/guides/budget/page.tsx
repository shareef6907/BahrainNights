import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet, Clock, MapPin, Star,
  Ticket, DollarSign, Coffee, Utensils
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain on a Budget 2025 | Free & Cheap Things to Do',
  description: 'Explore Bahrain without breaking the bank! Complete guide to free attractions, cheap eats, budget tips, and affordable activities in Bahrain.',
  keywords: 'budget Bahrain, cheap things to do Bahrain, free attractions Bahrain, budget travel Bahrain, affordable Bahrain, backpacking Bahrain',
  openGraph: {
    title: 'Bahrain on a Budget 2025 | Free & Cheap Things to Do',
    description: 'Your guide to affordable Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/budget',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/budget',
  },
};

const freeAttractions = [
  { name: 'Beit Al Quran', type: 'Museum', description: 'World-class Islamic arts museum' },
  { name: 'Bahrain Currency Museum', type: 'Museum', description: 'History of money in Bahrain' },
  { name: 'Oil Museum', type: 'Museum', description: 'Story of oil discovery' },
  { name: 'Tree of Life', type: 'Natural', description: 'Mysterious 400-year-old tree' },
  { name: 'Jazair Beach', type: 'Beach', description: 'Beautiful free public beach in Hidd' },
  { name: 'Arad Fort', type: 'Historic', description: '15th century fort, stunning at night' },
  { name: 'Muharraq Heritage Walk', type: 'Culture', description: 'UNESCO pearling path' },
  { name: 'Al Fateh Mosque', type: 'Religious', description: 'Grand Mosque tours' },
  { name: 'Bahrain Bay Walk', type: 'Leisure', description: 'Waterfront promenade' },
  { name: 'Souq Exploration', type: 'Culture', description: 'Window shopping in traditional markets' },
];

const cheapEats = [
  { name: 'Falafel Moe', cuisine: 'Falafel', price: '300-800 fils', location: 'Adliya' },
  { name: 'Tandoori Hut', cuisine: 'Indian', price: 'BD 3-8', location: 'Gudaibiya' },
  { name: 'Karak Shops', cuisine: 'Tea & Snacks', price: '100-300 fils', location: 'Everywhere' },
  { name: 'Saffron Street', cuisine: 'Indian', price: 'BD 1-3', location: 'Various' },
  { name: 'Souq Food Stalls', cuisine: 'Various', price: 'BD 1-2', location: 'Manama Souq' },
];

const budgetTips = [
  {
    category: 'Accommodation',
    tips: [
      'Budget hotels in Gudaibiya/Hoora from BD 15-25/night',
      'Consider apartment rentals for longer stays',
      'Book weekdays for better rates',
      'Summer offers biggest discounts (but hot!)',
    ],
  },
  {
    category: 'Transport',
    tips: [
      'Use taxi apps for metered fares (Careem)',
      'Buses very cheap but limited routes',
      'Walk in cooler months - Manama is compact',
      'Rent car only if exploring outside Manama',
    ],
  },
  {
    category: 'Food',
    tips: [
      'Street food is excellent and cheap',
      'Supermarket lunches (Lulu, Carrefour)',
      'Friday brunch buffets can be good value',
      'Water is cheap - stay hydrated',
    ],
  },
  {
    category: 'Activities',
    tips: [
      'Many museums are free or under BD 2',
      'Public beaches are free (Jazair Beach)',
      'Mall entertainment (window shopping, AC)',
      'Free walking tours occasionally offered',
    ],
  },
];

const dailyBudgets = [
  { level: 'Shoestring', daily: 'BD 20-30', description: 'Budget hotel, street food, free attractions' },
  { level: 'Budget', daily: 'BD 30-50', description: 'Mid-range hotel, casual restaurants, some paid activities' },
  { level: 'Mid-Range', daily: 'BD 50-100', description: 'Nice hotel, good restaurants, most attractions' },
];

const freeActivities = [
  'Watch sunset at Bahrain Bay',
  'Walk the Pearling Path in Muharraq',
  'Explore Manama Souq (just looking!)',
  'Beach day at Jazair Beach',
  'Visit free museums',
  'Visit Al Fateh Grand Mosque (free tours)',
  'Walk along Bahrain Fort',
  'People watch at The Avenues',
  'Morning jog along the Corniche',
  'Sunset at Karbabad Beach',
];

export default function BudgetPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Budget', url: 'https://www.bahrainnights.com/guides/budget' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">💰 Budget Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Bahrain on a Budget</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience Bahrain without breaking the bank! Free attractions, cheap eats, and budget-friendly tips for travelers.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Free Attractions', value: '15+', icon: Ticket },
              { label: 'Street Food From', value: '100 fils', icon: Utensils },
              { label: 'Museum Entry', value: 'BD 0-2', icon: Star },
              { label: 'Daily Budget', value: 'BD 20+', icon: Wallet },
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

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Daily Budget Guide</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {dailyBudgets.map((b) => (
              <div key={b.level} className="bg-white/5 rounded-xl p-4 text-center">
                <h3 className="font-bold text-green-400">{b.level}</h3>
                <p className="text-2xl font-bold">{b.daily}/day</p>
                <p className="text-sm text-gray-400">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Free Attractions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {freeAttractions.map((a) => (
              <div key={a.name} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-bold text-green-400">{a.name}</h3>
                <p className="text-xs text-gray-400 mb-1">{a.type}</p>
                <p className="text-sm text-gray-300">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Cheap Eats</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cheapEats.map((e) => (
              <div key={e.name} className="bg-white/5 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-green-400">{e.name}</h3>
                  <span className="text-sm font-bold text-white">{e.price}</span>
                </div>
                <p className="text-sm text-gray-400">{e.cuisine} • {e.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Budget Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {budgetTips.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-green-400 mb-4 text-lg">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400">✓</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">10 Free Things to Do</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {freeActivities.map((a, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                <span className="text-green-400 font-bold">{i + 1}</span>
                <span className="text-gray-300">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Budget Resources</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/free-things-to-do" className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors">Free Activities</Link>
            <Link href="/guides/street-food" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Street Food</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Free Things', href: '/guides/free-things-to-do', emoji: '🆓' },
              { title: 'Street Food', href: '/guides/street-food', emoji: '🌯' },
              { title: 'Public Beaches', href: '/guides/public-beaches', emoji: '🏖️' },
              { title: 'First Time', href: '/guides/first-time', emoji: '✈️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">{g.title}</span>
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
              { q: 'Is Bahrain expensive to visit?', a: 'Bahrain can be done on various budgets. Budget travelers can manage on BD 20-30/day with street food and free attractions. Mid-range is BD 50-100/day.' },
              { q: 'What are the best free attractions in Bahrain?', a: 'Beit Al Quran, Tree of Life, Jazair Beach, Arad Fort, and Muharraq Heritage Walk are all free and excellent.' },
              { q: 'Where to eat cheap in Bahrain?', a: 'Street food in Juffair and Gudaibiya. Shawarma from 500 fils, full meals under BD 3. Souq food stalls also very affordable.' },
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
        headline: 'Bahrain on a Budget 2025',
        description: 'Complete guide to budget travel in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2025-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
