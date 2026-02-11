import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Breakfast Spots in Bahrain 2026 | Brunch, Cafes & Morning Eats',
  description: 'Find the best breakfast spots in Bahrain. From traditional Bahraini breakfast to trendy brunch cafes. Complete guide to morning dining in Adliya, Seef, and beyond.',
  keywords: 'breakfast Bahrain, brunch Bahrain, best breakfast Bahrain, breakfast cafe Bahrain, morning food Bahrain, Bahraini breakfast, eggs benedict Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/breakfast-spots-bahrain' },
  openGraph: {
    title: 'Best Breakfast Spots in Bahrain 2026',
    description: 'Your guide to the best breakfast and brunch spots in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is a traditional Bahraini breakfast?', a: 'Traditional Bahraini breakfast includes balaleet (sweet vermicelli with eggs), khameer bread with cheese and honey, chebab pancakes, and legaimat (sweet dumplings). Served with chai haleeb (milk tea).' },
  { q: 'Where can I find the best brunch in Bahrain?', a: 'Top brunch spots include Lilou in Adliya, The Orangery, and hotel brunches at Four Seasons, Ritz-Carlton, and Gulf Hotel. Friday brunch is a Bahrain institution.' },
  { q: 'What time do breakfast places open in Bahrain?', a: 'Most cafes open 7-8am on weekdays, slightly later (8-9am) on weekends. Hotel restaurants serve breakfast from 6:30-7am. Traditional spots open very early (5-6am).' },
  { q: 'Are there 24-hour breakfast spots in Bahrain?', a: 'Yes, several cafes serve all-day breakfast. IHOP, some hotel restaurants, and local eateries offer breakfast items around the clock.' },
  { q: 'Where can I get healthy breakfast in Bahrain?', a: 'The Orangery, Crust & Crema, and various hotel cafes offer healthy options — açaí bowls, avocado toast, smoothies, and egg-white dishes.' },
];

const venues = [
  { 
    name: 'Lilou Artisan Patisserie', 
    location: 'Adliya',
    style: 'French Café & Bakery',
    hours: '7am - 10pm',
    priceRange: 'BD 5-12',
    highlight: 'Instagram-worthy pastries, elegant brunch',
    mustTry: 'Eggs Benedict, French Toast, Croissants',
    rating: 4.7,
  },
  { 
    name: 'The Orangery', 
    location: 'Seef',
    style: 'Health-Focused Café',
    hours: '7am - 11pm',
    priceRange: 'BD 4-10',
    highlight: 'Fresh, healthy options, great smoothies',
    mustTry: 'Açaí Bowl, Avocado Toast, Green Smoothie',
    rating: 4.5,
  },
  { 
    name: 'Crust & Crema', 
    location: 'Adliya',
    style: 'Artisan Café',
    hours: '7am - 10pm',
    priceRange: 'BD 4-9',
    highlight: 'Specialty coffee, fresh baked goods',
    mustTry: 'Shakshuka, Pancakes, Pour-over Coffee',
    rating: 4.4,
  },
  { 
    name: 'Saffron by Jena', 
    location: 'Riffa',
    style: 'Traditional Bahraini',
    hours: '7am - 11pm',
    priceRange: 'BD 3-7',
    highlight: 'Authentic Bahraini breakfast dishes',
    mustTry: 'Balaleet, Khameer, Chebab',
    rating: 4.6,
  },
  { 
    name: 'Four Seasons Breakfast', 
    location: 'Bahrain Bay',
    style: 'Luxury Hotel Buffet',
    hours: '6:30am - 11am',
    priceRange: 'BD 18-25',
    highlight: 'Lavish international breakfast buffet',
    mustTry: 'Full Buffet, Made-to-order Eggs, Fresh Juices',
    rating: 4.8,
  },
  { 
    name: 'La Vinoteca Brunch', 
    location: 'Adliya',
    style: 'Mediterranean Brunch',
    hours: '9am - 4pm (Fri-Sat)',
    priceRange: 'BD 8-15',
    highlight: 'Weekend brunch with wine options',
    mustTry: 'Brunch Platter, Eggs Florentine',
    rating: 4.4,
  },
  { 
    name: 'IHOP', 
    location: 'Multiple Locations',
    style: 'American Breakfast',
    hours: '24 hours',
    priceRange: 'BD 4-10',
    highlight: 'Classic American breakfast, all-day',
    mustTry: 'Pancake Stack, Omelettes, Hash Browns',
    rating: 4.1,
  },
  { 
    name: 'Furn Bistro', 
    location: 'Adliya',
    style: 'Lebanese Bakery',
    hours: '7am - 11pm',
    priceRange: 'BD 2-6',
    highlight: 'Fresh manakish and Lebanese breakfast',
    mustTry: 'Zaatar Manakish, Labneh, Foul',
    rating: 4.3,
  },
];

export default function BreakfastSpotsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-yellow-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Breakfast Spots', url: 'https://www.bahrainnights.com/guides/breakfast-spots-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">🍳 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Breakfast Spots</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From traditional Bahraini balaleet to trendy avocado toast — discover 
              the best places to start your day across the Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Breakfast in Bahrain ranges from traditional Khaleeji dishes that have been served 
            for generations to Instagram-worthy brunch spreads at trendy cafes. Whether you&apos;re 
            an early riser seeking authentic local fare or a late-morning bruncher looking for 
            eggs benedict with a view, Bahrain has you covered.
          </p>
          <p>
            Friday brunch is particularly special in Bahrain — a weekly ritual where families 
            and friends gather for leisurely meals that stretch into the afternoon. Hotel 
            brunches are legendary, while neighborhood cafes offer more intimate experiences.
          </p>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Breakfast Spots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue, index) => (
              <div 
                key={venue.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-yellow-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {venue.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 font-medium">{venue.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{venue.hours}</span>
                </div>
                <p className="text-orange-400 text-sm mb-2">{venue.style}</p>
                <p className="text-gray-300 text-sm mb-3">{venue.highlight}</p>
                <p className="text-gray-400 text-sm mb-2">Must Try: {venue.mustTry}</p>
                <p className="text-green-400 text-sm">{venue.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast Types */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Breakfast Styles</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">🇧🇭 Traditional Bahraini</h3>
              <p className="text-gray-300">
                Start your day like a local with balaleet (sweet vermicelli with egg), 
                khameer bread, and chai haleeb. Saffron by Jena is the go-to for authentic Bahraini breakfast.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">🥐 French & European</h3>
              <p className="text-gray-300">
                Croissants, pain au chocolat, and elegant egg dishes. Lilou leads this category 
                with impeccable pastries and a refined atmosphere.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">🥑 Healthy & Modern</h3>
              <p className="text-gray-300">
                Açaí bowls, avocado toast, smoothies, and grain bowls. The Orangery and similar 
                cafes cater to the health-conscious crowd.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">🇱🇧 Middle Eastern</h3>
              <p className="text-gray-300">
                Fresh manakish, labneh, foul, and hummus. Furn Bistro and Lebanese cafes 
                serve hearty, flavorful morning meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Dining</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/brunches" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Friday Brunches →
            </Link>
            <Link href="/guides/cafes" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Best Cafes →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-medium transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
