import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Clock, MapPin, Star,
  DollarSign, Users, Flame, Coffee
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Arabic Restaurants in Bahrain 2025 | Lebanese, Khaleeji & Middle Eastern',
  description: 'Discover the best Arabic restaurants in Bahrain! Complete guide to Lebanese, Khaleeji, Syrian, and Middle Eastern cuisine with mezze, grills, and authentic dishes.',
  keywords: 'Arabic restaurants Bahrain, Lebanese restaurant Bahrain, Middle Eastern food Bahrain, best mezze Bahrain, Khaleeji food Manama, shawarma Bahrain',
  openGraph: {
    title: 'Best Arabic Restaurants in Bahrain 2025 | Lebanese, Khaleeji & Middle Eastern',
    description: 'Your guide to the best Arabic restaurants in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/arabic-restaurants',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/arabic-restaurants',
  },
};

const restaurants = [
  {
    name: 'Zahle',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'Lebanese',
    description: 'Award-winning Lebanese restaurant with decades of history. Known as one of the best Arabic restaurants in the Gulf with authentic recipes and elegant setting.',
    specialties: ['Hot & cold mezze', 'Mixed grills', 'Seafood', 'Kibbeh', 'Fresh juices'],
    atmosphere: 'Elegant Lebanese décor, live music nights',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended, especially weekends',
    bestFor: 'Special occasions, business meals, authentic Lebanese',
    mustTry: 'Mezze platter, Mixed grill, Lamb chops',
  },
  {
    name: 'Abd El Wahab',
    location: 'Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Lebanese',
    description: 'Sophisticated Lebanese dining with beautiful interiors and exceptional mezze. Outdoor terrace perfect for Adliya evenings.',
    specialties: ['Premium mezze', 'Grilled meats', 'Lebanese desserts', 'Fattoush', 'Hummus'],
    atmosphere: 'Elegant, indoor and outdoor seating',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended',
    bestFor: 'Romantic dinners, celebrations, groups',
    mustTry: 'Hot mezze selection, Grilled halloumi, Kunafa',
  },
  {
    name: 'Al Safir',
    location: 'Diplomatic Area',
    type: 'Upscale Casual',
    rating: 4,
    price: 'BD 12-25 per person',
    cuisine: 'Lebanese',
    description: 'Popular Lebanese spot known for generous portions, consistent quality, and great value for money.',
    specialties: ['Mezze platters', 'Grills', 'Shawarma', 'Fresh bread', 'Arabic sweets'],
    atmosphere: 'Contemporary Lebanese, family-friendly',
    hours: 'Daily 11AM-12AM',
    reservation: 'Recommended for groups',
    bestFor: 'Family gatherings, regular visits, groups',
    mustTry: 'Mixed mezze, Chicken taouk, Shawarma',
  },
  {
    name: 'Fares Seafood',
    location: 'Multiple locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-20 per person',
    cuisine: 'Lebanese/Seafood',
    description: 'Popular Lebanese restaurant famous for fresh seafood and traditional Arabic dishes. Multiple branches across Bahrain.',
    specialties: ['Fresh fish', 'Seafood mezze', 'Grills', 'Fish sayadieh', 'Shrimp'],
    atmosphere: 'Casual, family-oriented',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Seafood lovers, families, casual dining',
    mustTry: 'Fish of the day, Shrimp saganaki, Fried calamari',
  },
  {
    name: 'Al Abraaj',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-15 per person',
    cuisine: 'Syrian/Lebanese',
    description: 'Beloved neighborhood spot for authentic Syrian and Lebanese food at great prices. Known for shawarma and fresh bread.',
    specialties: ['Shawarma', 'Fresh bread', 'Mezze', 'Grills', 'Falafel'],
    atmosphere: 'Casual, bustling',
    hours: 'Daily 10AM-2AM',
    reservation: 'Not required',
    bestFor: 'Late night, shawarma runs, casual meals',
    mustTry: 'Shawarma plate, Hummus, Fresh bread from oven',
  },
  {
    name: 'Mamig',
    location: 'Seef',
    type: 'Casual Fine',
    rating: 4,
    price: 'BD 10-20 per person',
    cuisine: 'Armenian/Lebanese',
    description: 'Armenian-Lebanese restaurant with unique dishes and excellent meat preparations. Popular for its soujok and manti.',
    specialties: ['Soujok', 'Manti', 'Grilled meats', 'Armenian dishes', 'Mezze'],
    atmosphere: 'Contemporary, comfortable',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for weekends',
    bestFor: 'Armenian cuisine, meat lovers, groups',
    mustTry: 'Soujok, Manti, Lamb cutlets',
  },
  {
    name: 'Mirai',
    location: 'Seef Mall',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-15 per person',
    cuisine: 'Lebanese',
    description: 'Modern Lebanese restaurant in Seef Mall. Great for shopping breaks with reliable Lebanese classics.',
    specialties: ['Mezze', 'Wraps', 'Grills', 'Fresh juices', 'Desserts'],
    atmosphere: 'Modern, mall dining',
    hours: 'Mall hours',
    reservation: 'Walk-in friendly',
    bestFor: 'Shopping breaks, quick meals, families',
    mustTry: 'Mezze combo, Chicken shawarma, Lemonade',
  },
  {
    name: 'Layali Zaman',
    location: 'Juffair',
    type: 'Casual',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'Khaleeji/Arabic',
    description: 'Authentic Gulf cuisine restaurant serving traditional Bahraini and Khaleeji dishes. Popular with locals.',
    specialties: ['Machboos', 'Harees', 'Grilled fish', 'Rice dishes', 'Bahraini cuisine'],
    atmosphere: 'Traditional, local crowd',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Authentic local food, Khaleeji cuisine, budget',
    mustTry: 'Chicken machboos, Fish machboos, Harees',
  },
  {
    name: 'Sablat Al Zain',
    location: 'Muharraq',
    type: 'Traditional',
    rating: 4,
    price: 'BD 4-10 per person',
    cuisine: 'Bahraini',
    description: 'Authentic Bahraini restaurant in historic Muharraq. Traditional setting with local specialties.',
    specialties: ['Bahraini breakfast', 'Machboos', 'Balaleet', 'Traditional dishes'],
    atmosphere: 'Traditional Bahraini, heritage setting',
    hours: 'Daily 7AM-10PM',
    reservation: 'Not required',
    bestFor: 'Authentic experience, Bahraini food, cultural immersion',
    mustTry: 'Bahraini breakfast, Balaleet, Chicken machboos',
  },
  {
    name: 'Em Sherif',
    location: 'The Avenues',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-45 per person',
    cuisine: 'Lebanese',
    description: 'Glamorous Lebanese restaurant known for dramatic presentations and extensive mezze. A theatrical dining experience.',
    specialties: ['Theatrical mezze service', 'Premium grills', 'Seafood', 'Lebanese desserts'],
    atmosphere: 'Luxurious, theatrical presentations',
    hours: 'Daily 12PM-12AM',
    reservation: 'Essential',
    bestFor: 'Special occasions, celebrations, groups',
    mustTry: 'Full mezze experience, Mixed grill, Kunafa',
  },
];

const cuisineTypes = [
  { type: 'Lebanese', description: 'Mezze, grills, hummus, fattoush', examples: 'Zahle, Abd El Wahab, Em Sherif' },
  { type: 'Khaleeji', description: 'Machboos, harees, Gulf specialties', examples: 'Layali Zaman, Sablat Al Zain' },
  { type: 'Syrian', description: 'Shawarma, kibbeh, similar to Lebanese', examples: 'Various Syrian restaurants' },
  { type: 'Armenian', description: 'Soujok, manti, unique preparations', examples: 'Mamig' },
];

const dishes = [
  { dish: 'Mezze', description: 'Assorted appetizers - hummus, mutabbal, tabbouleh, etc.', where: 'Zahle, Abd El Wahab' },
  { dish: 'Machboos', description: 'Bahraini spiced rice with meat or fish', where: 'Layali Zaman, Sablat Al Zain' },
  { dish: 'Shawarma', description: 'Marinated meat in bread with garlic sauce', where: 'Syrian and Lebanese restaurants' },
  { dish: 'Mixed Grill', description: 'Assorted grilled meats - kebab, tikka, chops', where: 'Zahle, Em Sherif' },
  { dish: 'Fattoush', description: 'Fresh salad with crispy bread and sumac', where: 'Abd El Wahab, Mirai' },
  { dish: 'Kunafa', description: 'Sweet cheese pastry with syrup', where: 'Em Sherif, Zahle' },
];

const tips = [
  {
    title: 'Sharing Culture',
    content: 'Arabic food is meant to be shared. Order mezze for the table and share main courses.',
  },
  {
    title: 'Bread is Key',
    content: 'Fresh Arabic bread is essential. Use it to scoop mezze. Ask for more — it\'s usually free.',
  },
  {
    title: 'Pacing',
    content: 'Mezze comes first, then grills. Don\'t fill up on mezze! Leave room for the main course.',
  },
  {
    title: 'Fresh Juices',
    content: 'Arabic restaurants make excellent fresh juices. Try lemon mint, pomegranate, or mixed fruit.',
  },
];

export default function ArabicRestaurantsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Arabic Restaurants', url: 'https://www.bahrainnights.com/guides/arabic-restaurants' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              🥙 Restaurant Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Best Arabic Restaurants
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From elegant Lebanese mezze to authentic Bahraini machboos — discover the best 
              Arabic and Middle Eastern restaurants in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Top Restaurants', value: '30+', icon: Utensils },
              { label: 'Budget From', value: 'BD 4', icon: DollarSign },
              { label: 'Cuisine Types', value: '5+', icon: Flame },
              { label: 'Fine Dining', value: '6+', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine Types */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Arabic Cuisine Types</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {cuisineTypes.map((c) => (
              <div key={c.type} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-emerald-400 mb-1">{c.type}</h3>
                <p className="text-xs text-gray-400 mb-2">{c.description}</p>
                <p className="text-sm text-gray-300">{c.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Arabic Restaurants</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide with prices, specialties, and recommendations.
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
                        <p className="text-emerald-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.cuisine}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-emerald-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-emerald-400 italic pt-2">Best for: {restaurant.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Must-Try Dishes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dishes.map((dish) => (
              <div key={dish.dish} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-emerald-400 mb-1">{dish.dish}</h3>
                <p className="text-sm text-gray-300 mb-2">{dish.description}</p>
                <p className="text-xs text-gray-400">Best at: {dish.where}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Dining Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-emerald-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Cuisines</h2>
          <p className="text-gray-300 mb-8">
            Discover other great dining options in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/indian-restaurants"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors"
            >
              Indian Restaurants
            </Link>
            <Link 
              href="/guides/seafood"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Seafood
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
              { title: 'Indian Restaurants', href: '/guides/indian-restaurants', emoji: '🍛' },
              { title: 'Seafood', href: '/guides/seafood', emoji: '🦐' },
              { title: 'Best Buffets', href: '/guides/buffets', emoji: '🍽️' },
              { title: 'All Restaurants', href: '/guides/restaurants', emoji: '🍴' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-emerald-400 transition-colors">
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
                q: 'What is the best Arabic restaurant in Bahrain?',
                a: 'Zahle at Gulf Hotel is widely considered the best Lebanese restaurant. Em Sherif and Abd El Wahab are also exceptional for Lebanese cuisine.',
              },
              {
                q: 'Where can I try authentic Bahraini food?',
                a: 'For authentic Khaleeji/Bahraini cuisine, try Layali Zaman in Juffair or Sablat Al Zain in Muharraq for traditional dishes like machboos and harees.',
              },
              {
                q: 'What is mezze?',
                a: 'Mezze is a collection of small dishes served as appetizers in Arabic cuisine — hummus, mutabbal, tabbouleh, fattoush, kibbeh, etc. It\'s meant to be shared.',
              },
              {
                q: 'What is machboos?',
                a: 'Machboos is the traditional Bahraini rice dish with meat, chicken, or fish, cooked with baharat spices, onions, and loomi (dried lime). It\'s the national dish.',
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
            headline: 'Best Arabic Restaurants in Bahrain 2025',
            description: 'Complete guide to Arabic restaurants in Bahrain including Lebanese, Khaleeji, and Middle Eastern cuisine.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2025-01-26',
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
                name: 'What is the best Arabic restaurant in Bahrain?',
                acceptedAnswer: { '@type': 'Answer', text: 'Zahle at Gulf Hotel is widely considered the best Lebanese restaurant.' },
              },
              {
                '@type': 'Question',
                name: 'Where can I try authentic Bahraini food?',
                acceptedAnswer: { '@type': 'Answer', text: 'Try Layali Zaman or Sablat Al Zain for traditional Bahraini machboos and harees.' },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
