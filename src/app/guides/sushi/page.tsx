import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Clock, MapPin, Star,
  DollarSign, Award, Fish
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Sushi in Bahrain 2026 | Japanese Restaurants & Omakase',
  description: 'Discover the best sushi restaurants in Bahrain! Complete guide to Japanese dining, omakase experiences, sushi bars, and authentic Japanese cuisine.',
  keywords: 'sushi Bahrain, Japanese restaurant Bahrain, best sushi Manama, omakase Bahrain, sashimi Bahrain, Japanese food Bahrain',
  openGraph: {
    title: 'Best Sushi in Bahrain 2026 | Japanese Restaurants & Omakase',
    description: 'Your guide to the best sushi and Japanese restaurants in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/sushi',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/sushi',
  },
};

const restaurants = [
  {
    name: 'Bushido',
    location: 'Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    description: 'Bahrain\'s premier Japanese restaurant with exceptional sushi, sashimi, and omakase experiences. Sleek modern setting with expert chefs.',
    specialties: ['Omakase', 'Premium sashimi', 'Signature rolls', 'Wagyu', 'Japanese whisky'],
    highlights: 'Omakase experience, Private rooms, Expert sushi chefs',
    hours: 'Daily 12PM-3PM, 7PM-12AM',
    reservation: 'Essential for dinner',
    bestFor: 'Special occasions, sushi connoisseurs, omakase',
  },
  {
    name: 'Sato',
    location: 'Four Seasons Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 30-60 per person',
    description: 'Elegant Japanese restaurant at Four Seasons with stunning bay views, teppanyaki, and premium sushi counter.',
    specialties: ['Teppanyaki', 'Sushi counter', 'Fresh sashimi', 'Japanese wagyu', 'Sake selection'],
    highlights: 'Bay views, Teppanyaki show, Premium ingredients',
    hours: 'Daily 6PM-11PM',
    reservation: 'Required',
    bestFor: 'Luxury dining, celebrations, teppanyaki',
  },
  {
    name: 'Maki',
    location: 'Adliya',
    type: 'Casual Fine',
    rating: 4,
    price: 'BD 15-30 per person',
    description: 'Popular contemporary Japanese spot known for creative rolls and stylish atmosphere. Great for groups.',
    specialties: ['Creative maki rolls', 'Tempura', 'Japanese tapas', 'Cocktails', 'Fusion dishes'],
    highlights: 'Creative rolls, Trendy vibe, Good for groups',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended for weekends',
    bestFor: 'Groups, casual Japanese, creative rolls',
  },
  {
    name: 'Kei',
    location: 'Seef',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 12-25 per person',
    description: 'Reliable Japanese restaurant with good sushi, sashimi, and bento options. Family-friendly atmosphere.',
    specialties: ['Sushi platters', 'Bento boxes', 'Ramen', 'Tempura', 'Teriyaki'],
    highlights: 'Family-friendly, Bento boxes, Consistent quality',
    hours: 'Daily 12PM-11PM',
    reservation: 'Walk-in friendly',
    bestFor: 'Families, casual lunch, bento',
  },
  {
    name: 'Sake',
    location: 'Gulf Hotel',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 20-40 per person',
    description: 'Sophisticated Japanese restaurant at Gulf Hotel with traditional and contemporary dishes.',
    specialties: ['Sushi bar', 'Traditional dishes', 'Sake pairing', 'Robata grill', 'Set menus'],
    highlights: 'Sake selection, Traditional setting, Hotel quality',
    hours: 'Daily 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Traditional Japanese, sake lovers, hotel guests',
  },
  {
    name: 'P.F. Chang\'s',
    location: 'Multiple locations',
    type: 'Casual',
    rating: 4,
    price: 'BD 10-20 per person',
    description: 'Popular Asian chain with sushi alongside other Asian dishes. Convenient locations and consistent quality.',
    specialties: ['Sushi rolls', 'Asian fusion', 'Lettuce wraps', 'Noodles', 'Sharing plates'],
    highlights: 'Multiple locations, Convenient, Family-friendly',
    hours: 'Mall hours typically',
    reservation: 'Not usually required',
    bestFor: 'Casual dining, families, convenience',
  },
  {
    name: 'Yo! Sushi',
    location: 'Multiple locations',
    type: 'Fast Casual',
    rating: 3,
    price: 'BD 6-15 per person',
    description: 'Conveyor belt sushi chain for quick, affordable Japanese food. Good for solo diners and quick meals.',
    specialties: ['Conveyor belt sushi', 'Quick bites', 'Affordable rolls', 'Edamame', 'Gyoza'],
    highlights: 'Conveyor belt, Quick service, Budget-friendly',
    hours: 'Mall hours',
    reservation: 'Not required',
    bestFor: 'Quick meals, budget, solo dining',
  },
  {
    name: 'Nozomi',
    location: 'Ritz-Carlton',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 30-55 per person',
    description: 'Sophisticated Japanese restaurant with premium ingredients and artistic presentations.',
    specialties: ['Premium sushi', 'Signature dishes', 'Japanese cocktails', 'Private dining'],
    highlights: 'Artistic presentation, Premium quality, Elegant setting',
    hours: 'Daily 7PM-12AM',
    reservation: 'Required',
    bestFor: 'Special occasions, premium sushi',
  },
];

const sushiTypes = [
  { type: 'Nigiri', description: 'Hand-pressed rice with fish on top', tip: 'Eat fish-side down on tongue' },
  { type: 'Maki', description: 'Rolled sushi with seaweed outside', tip: 'Dip lightly in soy sauce' },
  { type: 'Sashimi', description: 'Sliced raw fish without rice', tip: 'Highest quality fish test' },
  { type: 'Omakase', description: 'Chef\'s choice tasting menu', tip: 'Trust the chef, don\'t customize' },
];

const tips = [
  { title: 'Omakase Etiquette', content: 'Let the chef guide you. Don\'t add wasabi or heavy soy sauce to premium pieces.' },
  { title: 'Fresh Signs', content: 'Good sushi restaurants smell clean, not fishy. Fish should be shiny and firm.' },
  { title: 'Order Smart', content: 'Start with lighter fish, move to richer. Traditionally ends with egg.' },
  { title: 'Reservations', content: 'Fine dining spots like Bushido and Sato require booking, especially weekends.' },
];

export default function SushiPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Sushi', url: 'https://www.bahrainnights.com/guides/sushi' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🍣 Restaurant Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">Best Sushi</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From omakase experiences to casual conveyor belt sushi — discover Bahrain's best Japanese restaurants and sushi spots.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Japanese Spots', value: '15+', icon: Utensils },
              { label: 'Budget From', value: 'BD 6', icon: DollarSign },
              { label: 'Fine Dining', value: '5+', icon: Award },
              { label: 'Omakase', value: '3+', icon: Fish },
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
          <h2 className="text-xl font-bold mb-4 text-center">Sushi Types</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {sushiTypes.map((s) => (
              <div key={s.type} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-red-400">{s.type}</h3>
                <p className="text-xs text-gray-400 mb-1">{s.description}</p>
                <p className="text-xs text-pink-300">💡 {s.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Sushi Restaurants</h2>
          <p className="text-gray-400 text-center mb-12">From omakase to casual dining.</p>
          
          <div className="space-y-6">
            {restaurants.map((r) => (
              <div key={r.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{r.name}</h3>
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />{r.location} • {r.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">{[...Array(r.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-red-400 fill-red-400" />))}</div>
                        <span className="text-sm font-bold text-white">{r.price}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{r.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {r.specialties.map((s) => (<span key={s} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">{s}</span>))}
                    </div>
                    <p className="text-sm text-pink-300">✨ {r.highlights}</p>
                  </div>
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Hours:</strong> {r.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {r.reservation}</p>
                    <p className="text-red-400 italic pt-2">Best for: {r.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Sushi Tips</h2>
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

      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/seafood" className="px-8 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors">Seafood Guide</Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">All Restaurants</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Seafood', href: '/guides/seafood', emoji: '🦐' },
              { title: 'Fine Dining', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Buffets', href: '/guides/buffets', emoji: '🍱' },
              { title: 'Romantic', href: '/guides/romantic', emoji: '💕' },
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
              { q: 'What is the best sushi restaurant in Bahrain?', a: 'Bushido in Adliya is widely considered the best for omakase and premium sushi. Sato at Four Seasons is excellent for luxury dining.' },
              { q: 'How much does sushi cost in Bahrain?', a: 'Ranges from BD 6-15 at casual spots like Yo! Sushi to BD 30-60 at fine dining restaurants for full omakase.' },
              { q: 'What is omakase?', a: 'Omakase means "I leave it up to you" — the chef creates a tasting menu of their best dishes. Premium experience at BD 40-80.' },
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
        headline: 'Best Sushi in Bahrain 2026',
        description: 'Complete guide to sushi restaurants in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the best sushi restaurant in Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'Bushido in Adliya is widely considered the best for omakase and premium sushi. Sato at Four Seasons is excellent for luxury dining.' } },
          { '@type': 'Question', name: 'How much does sushi cost in Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'Ranges from BD 6-15 at casual spots like Yo! Sushi to BD 30-60 at fine dining restaurants for full omakase.' } },
          { '@type': 'Question', name: 'What is omakase?', acceptedAnswer: { '@type': 'Answer', text: 'Omakase means "I leave it up to you" — the chef creates a tasting menu of their best dishes. Premium experience at BD 40-80.' } },
        ]
      })}} />
    </div>
  );
}
