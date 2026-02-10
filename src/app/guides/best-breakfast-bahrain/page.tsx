import { Metadata } from 'next';
import Link from 'next/link';
import { Coffee, MapPin, Star, Sun, Croissant, Clock, Heart } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';

export const metadata: Metadata = {
  title: 'Best Breakfast in Bahrain 2026 | Top Brunch Spots & Morning Cafés',
  description: 'Discover the best breakfast spots in Bahrain for 2026. From luxury hotel brunches to cozy cafés, find the perfect spot for pancakes, eggs benedict, Arabic breakfast, and more.',
  keywords: 'best breakfast Bahrain, brunch Bahrain, breakfast cafes Manama, morning restaurants Bahrain, eggs benedict Bahrain, pancakes Bahrain',
  openGraph: {
    title: 'Best Breakfast in Bahrain 2026 | Top Brunch Spots',
    description: 'Complete guide to the best breakfast and brunch spots in Bahrain.',
    type: 'article',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/guides/best-breakfast-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-breakfast-bahrain',
  },
};

const faqs = [
  {
    q: 'What time do breakfast spots open in Bahrain?',
    a: 'Most cafés open between 7-8 AM on weekdays and 8-9 AM on weekends. Hotel restaurants typically serve breakfast from 6:30 AM. Many spots transition to brunch menus around 10-11 AM on Fridays.',
  },
  {
    q: 'How much does breakfast cost in Bahrain?',
    a: 'Café breakfasts range from BD 3-8 per person. Hotel breakfast buffets cost BD 12-25. All-you-can-eat Friday brunches start at BD 20 and go up to BD 60+ with beverages.',
  },
  {
    q: 'What is a traditional Bahraini breakfast?',
    a: 'Traditional Bahraini breakfast includes balaleet (sweet vermicelli with eggs), khameer bread, regag bread with cheese or honey, chebab pancakes, and Arabic coffee with dates. Hotels and local restaurants offer these authentic options.',
  },
  {
    q: 'Which hotels have the best breakfast buffets?',
    a: 'Top hotel breakfast buffets include Four Seasons, Ritz-Carlton, Gulf Hotel, and Sofitel. They offer extensive spreads with live cooking stations, international cuisines, and Arabic specialties.',
  },
];

const spots = [
  {
    name: 'Café Lilou',
    location: 'Adliya',
    type: 'French Café',
    rating: 4.5,
    price: 'BD 5-10',
    description: 'The quintessential Bahrain breakfast destination. French pastries, perfectly brewed coffee, and a charming terrace that\'s become an institution. Their eggs benedict and croissants are legendary.',
    mustTry: ['Eggs Benedict', 'Pain au chocolat', 'French toast', 'Fresh orange juice'],
    hours: '7:30 AM - Late',
    bestFor: 'Weekend catch-ups, solo mornings with a book, Adliya vibes',
  },
  {
    name: 'La Vinoteca',
    location: 'Adliya',
    type: 'Mediterranean Café',
    rating: 4.5,
    price: 'BD 5-12',
    description: 'Mediterranean breakfast favorites with Spanish influences. Excellent shakshuka, fresh baked goods, and great coffee in a stylish setting.',
    mustTry: ['Shakshuka', 'Spanish omelette', 'Avocado toast', 'Churros'],
    hours: '8:00 AM - Late',
    bestFor: 'Foodies, Mediterranean flavors, quality ingredients',
  },
  {
    name: 'Haji\'s Café',
    location: 'Muharraq',
    type: 'Traditional Bahraini',
    rating: 4.5,
    price: 'BD 2-5',
    description: 'Authentic Bahraini breakfast in a heritage house setting. Experience balaleet, khameer, and traditional dishes served with Arabic hospitality.',
    mustTry: ['Balaleet', 'Khameer bread', 'Chebab', 'Karak chai'],
    hours: '6:30 AM - 12 PM',
    bestFor: 'Authentic experience, cultural immersion, budget-friendly',
  },
  {
    name: 'Four Seasons Hotel Breakfast',
    location: 'Bahrain Bay',
    type: 'Luxury Hotel',
    rating: 5.0,
    price: 'BD 18-25',
    description: 'Lavish breakfast buffet with stunning bay views. Everything from fresh pastries to made-to-order eggs, Arabic specialties, and healthy options.',
    mustTry: ['Made-to-order omelettes', 'Arabic corner', 'Fresh pastries', 'Detox juices'],
    hours: '6:30 AM - 11 AM',
    bestFor: 'Special occasions, business breakfast, luxury experience',
  },
  {
    name: 'Crust & Crumb',
    location: 'Seef',
    type: 'Bakery Café',
    rating: 4.5,
    price: 'BD 4-8',
    description: 'Artisan bakery famous for fresh breads and pastries. Their breakfast menu features quality ingredients with a focus on baked goods.',
    mustTry: ['Sourdough toast', 'Croissant sandwiches', 'Fresh baked pastries'],
    hours: '7:00 AM - 10 PM',
    bestFor: 'Bread lovers, quick quality breakfast, takeaway',
  },
  {
    name: 'The Orangery',
    location: 'Seef Mall',
    type: 'All-day Dining',
    rating: 4.0,
    price: 'BD 5-10',
    description: 'Popular mall café with reliable breakfast fare. Great for families with kids and a convenient location for morning shopping.',
    mustTry: ['Full English', 'Pancake stacks', 'Healthy bowls'],
    hours: '9:00 AM - Late',
    bestFor: 'Families, mall shoppers, reliable classics',
  },
  {
    name: 'Ritz-Carlton Primavera',
    location: 'Seef',
    type: 'Luxury Hotel',
    rating: 5.0,
    price: 'BD 20-30',
    description: 'Elegant breakfast setting with extensive international buffet. Live cooking stations, fresh juices, and impeccable service.',
    mustTry: ['Live cooking stations', 'Fresh waffles', 'Smoked salmon', 'Arabic spread'],
    hours: '6:30 AM - 11 AM',
    bestFor: 'Hotel guests, celebrations, luxury dining',
  },
  {
    name: 'Segreto',
    location: 'Amwaj',
    type: 'Italian Café',
    rating: 4.5,
    price: 'BD 6-12',
    description: 'Italian-inspired breakfast on the Amwaj lagoon. Beautiful waterfront terrace, excellent coffee, and Mediterranean morning dishes.',
    mustTry: ['Eggs Florentine', 'Italian pastries', 'Granola bowls'],
    hours: '8:00 AM - Late',
    bestFor: 'Waterfront dining, Amwaj residents, leisurely mornings',
  },
];

export default function BreakfastBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Breakfast Bahrain', url: 'https://www.bahrainnights.com/guides/best-breakfast-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              ☀️ Morning Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best Breakfast in{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From traditional Bahraini balaleet to French croissants — discover the best 
              spots to start your morning in the kingdom.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Spots Featured', value: '20+', icon: Coffee },
              { label: 'Areas Covered', value: '8', icon: MapPin },
              { label: 'Price Range', value: 'BD 2-30', icon: Croissant },
              { label: 'Opening From', value: '6:30 AM', icon: Sun },
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

      {/* Spots Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Breakfast Spots</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From cozy cafés to luxury hotels — our favorite morning destinations
          </p>
          
          <div className="grid gap-6">
            {spots.map((spot, index) => (
              <div 
                key={spot.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-2xl font-bold text-amber-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{spot.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {spot.location}
                          <span className="text-amber-400">•</span>
                          <span>{spot.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-medium">{spot.rating}</span>
                        </div>
                        <div className="text-sm text-amber-400 mt-1">{spot.price}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{spot.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {spot.mustTry.map((item) => (
                        <span key={item} className="px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{spot.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Heart className="w-4 h-4" />
                        <span>{spot.bestFor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional vs Western */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Traditional vs Western Breakfast</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-400">🍳 Traditional Bahraini</h3>
              <ul className="space-y-3 text-gray-300">
                <li><strong>Balaleet</strong> — Sweet vermicelli with cardamom, topped with omelette</li>
                <li><strong>Khameer</strong> — Sweet bread with date syrup or cheese</li>
                <li><strong>Regag</strong> — Paper-thin bread with eggs, cheese, or honey</li>
                <li><strong>Chebab</strong> — Bahraini pancakes with date syrup</li>
                <li><strong>Karak Chai</strong> — Sweet spiced tea with condensed milk</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">Best at: Haji&apos;s Café, hotel Arabic corners, Muharraq</p>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-400">🥐 Western Favorites</h3>
              <ul className="space-y-3 text-gray-300">
                <li><strong>Eggs Benedict</strong> — Poached eggs, hollandaise, English muffin</li>
                <li><strong>Avocado Toast</strong> — Sourdough, smashed avo, various toppings</li>
                <li><strong>French Toast</strong> — Brioche, maple syrup, fresh berries</li>
                <li><strong>Full English</strong> — Eggs, bacon, sausage, beans, toast</li>
                <li><strong>Pancakes/Waffles</strong> — Stacks with fruit and syrup</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">Best at: Café Lilou, La Vinoteca, Hotel restaurants</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-amber-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Promo */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Planning a Breakfast Event?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Cinematic Group offers professional photography and videography for restaurant launches, 
              food content creation, and culinary events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.filmproductionbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 rounded-lg font-medium transition-colors">
                Food Photography
              </a>
              <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Event Production
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Best Brunch Spots', href: '/guides/brunch', emoji: '🥂' },
              { title: 'Cafés & Coffee', href: '/guides/cafes', emoji: '☕' },
              { title: 'Desserts & Bakeries', href: '/guides/desserts-cafes-bahrain', emoji: '🍰' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">{guide.title}</span>
              </Link>
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
            headline: 'Best Breakfast in Bahrain 2026',
            description: 'Complete guide to the best breakfast and brunch spots in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-02-11',
            dateModified: '2026-02-11',
          }),
        }}
      />
    </div>
  );
}
