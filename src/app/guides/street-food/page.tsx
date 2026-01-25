import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Clock, MapPin, Star,
  DollarSign, Flame, Coffee
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Street Food in Bahrain 2025 | Shawarma, Falafel & Local Eats',
  description: 'Discover the best street food in Bahrain! Complete guide to shawarma, falafel, samosas, local snacks, and cheap eats across Manama and beyond.',
  keywords: 'street food Bahrain, shawarma Bahrain, falafel Bahrain, cheap eats Manama, local food Bahrain, best shawarma Bahrain, Bahrain snacks',
  openGraph: {
    title: 'Street Food in Bahrain 2025 | Shawarma, Falafel & Local Eats',
    description: 'Your guide to the best street food and cheap eats in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/street-food',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/street-food',
  },
};

const streetFood = [
  {
    name: 'Al Abraaj',
    location: 'Juffair',
    type: 'Syrian/Lebanese',
    rating: 5,
    price: '500 fils - BD 2',
    description: 'Legendary late-night spot for the best shawarma in Bahrain. Fresh bread from the oven, perfectly seasoned meat.',
    mustTry: ['Chicken shawarma', 'Meat shawarma', 'Fresh bread', 'Garlic sauce'],
    hours: '10AM-2AM (best late night)',
    vibe: 'Bustling, authentic, late-night crowd',
  },
  {
    name: 'Falafel Moe',
    location: 'Adliya',
    type: 'Falafel',
    rating: 5,
    price: '300-800 fils',
    description: 'Cult favorite for fresh, crispy falafel. Simple menu, perfect execution. Always a queue.',
    mustTry: ['Falafel sandwich', 'Falafel plate', 'Hummus', 'Pickles'],
    hours: '11AM-11PM',
    vibe: 'Simple, queues, worth the wait',
  },
  {
    name: 'Tamarind',
    location: 'Adliya',
    type: 'Indian Street Food',
    rating: 4,
    price: 'BD 1-3',
    description: 'Authentic Indian street food favorites — chaat, pani puri, dosa, and more at great prices.',
    mustTry: ['Pani puri', 'Bhel puri', 'Dosa', 'Samosa chaat'],
    hours: '11AM-11PM',
    vibe: 'Casual, flavorful, authentic',
  },
  {
    name: 'Jasmi\'s',
    location: 'Multiple locations',
    type: 'Filipino/Asian',
    rating: 4,
    price: 'BD 1-3',
    description: 'Popular spot for affordable Filipino and Asian food. Great chicken and rice dishes.',
    mustTry: ['Chicken inasal', 'Sisig', 'Halo-halo', 'Rice meals'],
    hours: '10AM-12AM',
    vibe: 'Casual, filling, good value',
  },
  {
    name: 'Jasmis Grill',
    location: 'Gudaibiya',
    type: 'Indian/Pakistani',
    rating: 4,
    price: '500 fils - BD 2',
    description: 'No-frills spot for excellent grilled meats, biryani, and subcontinental street food.',
    mustTry: ['Seekh kebab', 'Chicken tikka', 'Biryani', 'Fresh naan'],
    hours: '11AM-12AM',
    vibe: 'Authentic, smoky grills, local crowd',
  },
  {
    name: 'Gudaibiya Street Food Area',
    location: 'Gudaibiya',
    type: 'Various',
    rating: 4,
    price: '300 fils - BD 2',
    description: 'Street-side vendors and small shops offering Pakistani, Indian, and Arabic street food. Most authentic experience.',
    mustTry: ['Fresh samosas', 'Pakoras', 'Kebab rolls', 'Tea'],
    hours: 'Evening-late night',
    vibe: 'Authentic street, adventurous eating',
  },
  {
    name: 'Manama Souq Food Stalls',
    location: 'Bab Al Bahrain Souq',
    type: 'Various',
    rating: 4,
    price: '300 fils - BD 1.5',
    description: 'Traditional food stalls in the souq offering Arabic snacks, fresh juices, and quick bites.',
    mustTry: ['Fresh juice', 'Samboosa', 'Arabic sweets', 'Shawarma'],
    hours: 'Souq hours (9AM-9PM)',
    vibe: 'Traditional, authentic, part of souq experience',
  },
  {
    name: 'Karak Tea Spots',
    location: 'Throughout Bahrain',
    type: 'Tea/Snacks',
    rating: 4,
    price: '100-300 fils',
    description: 'Ubiquitous karak chai (spiced tea) stalls. Essential Bahrain experience, especially late night.',
    mustTry: ['Karak chai', 'Cheese fatayer', 'Cream cheese', 'Simple snacks'],
    hours: '24/7 many locations',
    vibe: 'Social, late-night, essential Bahrain',
  },
  {
    name: 'Saffron Street',
    location: 'Manama',
    type: 'Indian',
    rating: 4,
    price: 'BD 1-3',
    description: 'Popular Indian street food chain with biryanis, curries, and snacks at excellent prices.',
    mustTry: ['Biryani', 'Butter chicken', 'Samosa', 'Mango lassi'],
    hours: '10AM-12AM',
    vibe: 'Casual, quick, reliable',
  },
  {
    name: 'Muharraq Old Town Cafes',
    location: 'Muharraq',
    type: 'Traditional Bahraini',
    rating: 5,
    price: '500 fils - BD 2',
    description: 'Traditional cafes serving Bahraini breakfast, halwa, and authentic local snacks in heritage setting.',
    mustTry: ['Bahraini halwa', 'Balaleet', 'Khanfaroosh', 'Traditional breakfast'],
    hours: '7AM-10PM',
    vibe: 'Heritage, authentic, cultural experience',
  },
];

const dishes = [
  { name: 'Shawarma', description: 'Rotating spit meat in bread with garlic/tahini', price: '500 fils - BD 1.5' },
  { name: 'Falafel', description: 'Fried chickpea balls in pita with salad', price: '300-500 fils' },
  { name: 'Karak', description: 'Strong spiced tea with condensed milk', price: '100-200 fils' },
  { name: 'Samboosa', description: 'Fried pastry with meat/veg filling', price: '100-200 fils' },
  { name: 'Halwa', description: 'Traditional Bahraini sweet (many flavors)', price: 'BD 1-5 per kg' },
  { name: 'Biryani', description: 'Spiced rice with meat', price: 'BD 1-2' },
];

const areas = [
  { area: 'Gudaibiya', specialty: 'Indian/Pakistani street food, late night', vibe: 'Authentic, busy' },
  { area: 'Juffair', specialty: 'Shawarma, late night eats, variety', vibe: 'International crowd' },
  { area: 'Adliya', specialty: 'Trendy casual, falafel, cafes', vibe: 'Hipster, diverse' },
  { area: 'Manama Souq', specialty: 'Traditional snacks, juices, Arabic', vibe: 'Traditional, tourist' },
  { area: 'Muharraq', specialty: 'Bahraini breakfast, halwa, heritage', vibe: 'Authentic local' },
];

const tips = [
  { title: 'Cash Only', content: 'Most street food spots are cash only. Carry small bills.' },
  { title: 'Late Night', content: 'Street food peaks 9PM-2AM. Best shawarma is late night.' },
  { title: 'Hygiene', content: 'Busy spots with high turnover are usually safest. Fresh = good.' },
  { title: 'Ask Locals', content: 'Follow the queues. If locals line up, it\'s good.' },
];

export default function StreetFoodPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Street Food', url: 'https://www.bahrainnights.com/guides/street-food' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🌯 Food Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Street Food</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From legendary shawarma to crispy falafel and late-night karak — discover Bahrain's best cheap eats and street food.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Street Spots', value: '50+', icon: Utensils },
              { label: 'Starting From', value: '100 fils', icon: DollarSign },
              { label: 'Best Time', value: 'Late Night', icon: Clock },
              { label: 'Must-Try', value: 'Shawarma', icon: Flame },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Street Food Dishes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dishes.map((d) => (
              <div key={d.name} className="bg-white/5 rounded-xl p-3">
                <h3 className="font-semibold text-red-400">{d.name}</h3>
                <p className="text-xs text-gray-400 mb-1">{d.description}</p>
                <p className="text-xs text-orange-300">{d.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Street Food Spots</h2>
          <p className="text-gray-400 text-center mb-12">From shawarma legends to hidden gems.</p>
          
          <div className="space-y-6">
            {streetFood.map((spot) => (
              <div key={spot.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{spot.name}</h3>
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />{spot.location} • {spot.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">{[...Array(spot.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-red-400 fill-red-400" />))}</div>
                        <span className="text-sm font-bold text-green-400">{spot.price}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{spot.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {spot.mustTry.map((item) => (<span key={item} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">{item}</span>))}
                    </div>
                  </div>
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Hours:</strong> {spot.hours}</p>
                    <p><strong className="text-gray-400">Vibe:</strong> {spot.vibe}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Street Food Areas</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {areas.map((a) => (
              <div key={a.area} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-bold text-red-400">{a.area}</h3>
                <p className="text-xs text-gray-300 mb-1">{a.specialty}</p>
                <p className="text-xs text-gray-500">{a.vibe}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Street Food Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Food Guides</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/budget" className="px-8 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors">Budget Guide</Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">All Restaurants</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Budget Bahrain', href: '/guides/budget', emoji: '💰' },
              { title: 'Indian Food', href: '/guides/indian-restaurants', emoji: '🍛' },
              { title: 'Arabic Food', href: '/guides/arabic-restaurants', emoji: '🥙' },
              { title: 'Souks', href: '/guides/souks', emoji: '🏺' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-red-400 transition-colors">{g.title}</span>
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
              { q: 'Where is the best shawarma in Bahrain?', a: 'Al Abraaj in Juffair is legendary. Late night (11PM+) is when the magic happens.' },
              { q: 'Is street food safe in Bahrain?', a: 'Generally yes. Stick to busy spots with high turnover. Fresh preparation is a good sign.' },
              { q: 'What is karak?', a: 'Strong tea made with cardamom, saffron, and condensed milk. Essential late-night Bahrain experience.' },
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
        headline: 'Street Food in Bahrain 2025',
        description: 'Complete guide to street food in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2025-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
