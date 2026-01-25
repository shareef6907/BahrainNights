import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Clock, MapPin, Star,
  DollarSign, Users, Flame, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Indian Restaurants in Bahrain 2025 | Curry, Biryani & Fine Dining',
  description: 'Discover the best Indian restaurants in Bahrain! Complete guide to Indian fine dining, street food, biryani spots, vegetarian options, and authentic cuisine.',
  keywords: 'Indian restaurants Bahrain, best Indian food Bahrain, biryani Bahrain, curry Bahrain, Indian fine dining Manama, vegetarian Indian Bahrain',
  openGraph: {
    title: 'Best Indian Restaurants in Bahrain 2025 | Curry, Biryani & Fine Dining',
    description: 'Your guide to the best Indian restaurants in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/indian-restaurants',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/indian-restaurants',
  },
};

const restaurants = [
  {
    name: 'Rasoi by Vineet',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Modern Indian',
    description: 'Michelin-starred Chef Vineet Bhatia\'s signature restaurant offering innovative modern Indian cuisine in an elegant setting. Bahrain\'s premier Indian fine dining.',
    specialties: ['Tasting menus', 'Lamb chops', 'Seafood curry', 'Contemporary presentations', 'Wine pairings'],
    atmosphere: 'Elegant fine dining with modern décor',
    hours: 'Daily 7PM-11PM',
    reservation: 'Essential, especially weekends',
    bestFor: 'Special occasions, business dinners, foodies',
    mustTry: 'Chef\'s tasting menu, Lamb seekh kebab, Dessert selection',
  },
  {
    name: 'Silk\'s',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'North Indian',
    description: 'Sophisticated North Indian restaurant at the Ritz-Carlton with live cooking stations and refined atmosphere. Excellent tandoor dishes.',
    specialties: ['Tandoori dishes', 'Dal makhani', 'Butter chicken', 'Biryani', 'Live cooking'],
    atmosphere: 'Elegant hotel dining, open kitchen',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Celebrations, romantic dinners, hotel guests',
    mustTry: 'Tandoori platter, Lamb biryani, Gulab jamun',
  },
  {
    name: 'Lanterns',
    location: 'The Ritz-Carlton, Seef',
    type: 'Pan-Asian/Indian',
    rating: 4,
    price: 'BD 15-30 per person',
    cuisine: 'Indian & Thai',
    description: 'Popular for Indian dishes in a beautiful setting with outdoor terrrace. Great for casual fine dining.',
    specialties: ['Indian curries', 'Thai dishes', 'Seafood', 'Vegetarian options'],
    atmosphere: 'Relaxed elegance, outdoor seating',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Mixed groups, casual celebrations',
    mustTry: 'Signature curries, Grilled seafood',
  },
  {
    name: 'Zafran',
    location: 'Seef District',
    type: 'Casual Fine Dining',
    rating: 5,
    price: 'BD 12-25 per person',
    cuisine: 'North Indian',
    description: 'Popular upscale Indian restaurant known for consistent quality, generous portions, and authentic North Indian flavors.',
    specialties: ['Butter chicken', 'Biryani', 'Naan breads', 'Paneer dishes', 'Kebabs'],
    atmosphere: 'Contemporary Indian, comfortable',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended for weekends',
    bestFor: 'Family dinners, groups, regular visits',
    mustTry: 'Butter chicken, Hyderabadi biryani, Garlic naan',
  },
  {
    name: 'Copper Chimney',
    location: 'Adliya',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'North Indian',
    description: 'Long-established Indian restaurant known for reliable, flavorful dishes and family-friendly atmosphere.',
    specialties: ['Tandoor dishes', 'Curries', 'Biryani', 'Vegetarian options', 'Family portions'],
    atmosphere: 'Traditional Indian, family-friendly',
    hours: 'Daily 12PM-11:30PM',
    reservation: 'Not usually required',
    bestFor: 'Families, casual dining, groups',
    mustTry: 'Chicken tikka, Dal tadka, Paneer butter masala',
  },
  {
    name: 'Saffron by Atul Kochhar',
    location: 'Al Areen Palace',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-45 per person',
    cuisine: 'Modern Indian',
    description: 'Celebrity chef Atul Kochhar\'s restaurant offering refined Indian cuisine in a luxurious resort setting.',
    specialties: ['Chef\'s specials', 'Seafood dishes', 'Contemporary Indian', 'Tasting menus'],
    atmosphere: 'Luxury resort dining',
    hours: 'Dinner only, Thu-Sat (check schedules)',
    reservation: 'Essential',
    bestFor: 'Special occasions, resort guests',
    mustTry: 'Seasonal tasting menu, Seafood specialties',
  },
  {
    name: 'Charcoal Grill',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-15 per person',
    cuisine: 'North Indian/Pakistani',
    description: 'Popular spot for grilled meats and authentic subcontinental flavors. Great value and generous portions.',
    specialties: ['Grilled meats', 'Karahi dishes', 'Biryani', 'Kebabs', 'Naan'],
    atmosphere: 'Casual, lively',
    hours: 'Daily 12PM-12AM',
    reservation: 'Not required',
    bestFor: 'Meat lovers, budget dining, late night',
    mustTry: 'Mixed grill platter, Karahi, Seekh kebab',
  },
  {
    name: 'Tandoori Hut',
    location: 'Gudaibiya',
    type: 'Budget',
    rating: 4,
    price: 'BD 3-8 per person',
    cuisine: 'North Indian',
    description: 'No-frills authentic Indian food at excellent prices. Local favorite for delicious, affordable meals.',
    specialties: ['Tandoori chicken', 'Biryani', 'Curries', 'Fresh naan', 'Value meals'],
    atmosphere: 'Simple, authentic',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Budget meals, authentic flavors, takeaway',
    mustTry: 'Tandoori chicken, Biryani, Fresh roti',
  },
  {
    name: 'India Palace',
    location: 'Multiple locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-12 per person',
    cuisine: 'North Indian',
    description: 'Popular chain with consistent quality across multiple branches. Reliable choice for Indian food.',
    specialties: ['All-round menu', 'Vegetarian options', 'Biryani', 'Tandoor items'],
    atmosphere: 'Comfortable, family-friendly',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Families, consistent quality, convenience',
    mustTry: 'Thali meals, Biryani, Paneer tikka',
  },
  {
    name: 'Moti Mahal',
    location: 'Various locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'North Indian',
    description: 'Legendary Delhi-origin restaurant known for inventing butter chicken. Multiple branches across Bahrain.',
    specialties: ['Butter chicken (original!)', 'Dal makhani', 'Tandoor items', 'Classic recipes'],
    atmosphere: 'Traditional Indian',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Butter chicken lovers, history buffs, families',
    mustTry: 'Butter chicken, Dal makhani, Rumali roti',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['Rasoi by Vineet', 'Silk\'s', 'Saffron'] },
  { category: 'Best Value', picks: ['Tandoori Hut', 'Copper Chimney', 'India Palace'] },
  { category: 'Best Biryani', picks: ['Zafran', 'Copper Chimney', 'Charcoal Grill'] },
  { category: 'Vegetarian Friendly', picks: ['Zafran', 'India Palace', 'Copper Chimney'] },
];

const dishes = [
  { dish: 'Butter Chicken', description: 'Creamy tomato-based curry with tandoori chicken', where: 'Moti Mahal, Zafran' },
  { dish: 'Biryani', description: 'Fragrant rice with meat/vegetables and spices', where: 'Zafran, Copper Chimney' },
  { dish: 'Tandoori Chicken', description: 'Marinated chicken cooked in clay oven', where: 'Tandoori Hut, Silk\'s' },
  { dish: 'Dal Makhani', description: 'Creamy black lentils slow-cooked overnight', where: 'Moti Mahal, Silk\'s' },
  { dish: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', where: 'Zafran, India Palace' },
  { dish: 'Kebabs', description: 'Various grilled meat preparations', where: 'Charcoal Grill, Rasoi' },
];

const tips = [
  {
    title: 'Reservations',
    content: 'Fine dining (Rasoi, Silk\'s) requires booking. Casual spots are usually walk-in friendly.',
  },
  {
    title: 'Spice Levels',
    content: 'Ask for spice level preference. "Medium" at Indian restaurants is usually quite spicy.',
  },
  {
    title: 'Vegetarian Options',
    content: 'Indian cuisine has excellent vegetarian dishes. Most restaurants have extensive veg menus.',
  },
  {
    title: 'Sharing',
    content: 'Indian food is designed for sharing. Order variety and share dishes family-style.',
  },
];

export default function IndianRestaurantsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Indian Restaurants', url: 'https://www.bahrainnights.com/guides/indian-restaurants' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🍛 Restaurant Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Best Indian Restaurants
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Michelin-starred fine dining to authentic street food — discover Bahrain's 
              best Indian restaurants, biryani spots, and curry houses.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Top Restaurants', value: '50+', icon: Utensils },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Fine Dining', value: '5+', icon: Award },
              { label: 'Cuisines', value: 'All India', icon: Flame },
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

      {/* By Category */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Quick Picks</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {restaurantsByCategory.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-orange-400 mb-2">{cat.category}</h3>
                <p className="text-sm text-gray-300">{cat.picks.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Indian Restaurants</h2>
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
                        <p className="text-orange-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-orange-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-orange-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-orange-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-orange-400 italic pt-2">Best for: {restaurant.bestFor}</p>
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
                <h3 className="font-bold text-orange-400 mb-1">{dish.dish}</h3>
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
                <h3 className="font-bold text-orange-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-red-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Cuisines</h2>
          <p className="text-gray-300 mb-8">
            Discover other great dining options in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/arabic-restaurants"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
            >
              Arabic Restaurants
            </Link>
            <Link 
              href="/guides/restaurants"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Restaurants
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
              { title: 'Arabic Restaurants', href: '/guides/arabic-restaurants', emoji: '🥙' },
              { title: 'Seafood', href: '/guides/seafood', emoji: '🦐' },
              { title: 'Best Buffets', href: '/guides/buffets', emoji: '🍽️' },
              { title: 'Street Food', href: '/guides/street-food', emoji: '🌯' },
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

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is the best Indian restaurant in Bahrain?',
                a: 'For fine dining, Rasoi by Vineet at Gulf Hotel is widely considered the best. For excellent food at better value, Zafran in Seef is a top choice.',
              },
              {
                q: 'Where can I find good vegetarian Indian food in Bahrain?',
                a: 'Most Indian restaurants have extensive vegetarian menus. Zafran, India Palace, and Copper Chimney are particularly good for vegetarian options.',
              },
              {
                q: 'What\'s the best biryani in Bahrain?',
                a: 'Zafran\'s Hyderabadi biryani is highly rated. Copper Chimney and Charcoal Grill also serve excellent biryani at better prices.',
              },
              {
                q: 'Are there cheap Indian restaurants in Bahrain?',
                a: 'Yes! Tandoori Hut in Gudaibiya offers authentic Indian food from BD 3-8. Charcoal Grill and India Palace are also affordable options.',
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
            headline: 'Best Indian Restaurants in Bahrain 2025 | Curry, Biryani & Fine Dining',
            description: 'Complete guide to Indian restaurants in Bahrain from fine dining to budget options.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2025-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/indian-restaurants',
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
                name: 'What is the best Indian restaurant in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For fine dining, Rasoi by Vineet is the best. For value, Zafran in Seef is a top choice.',
                },
              },
              {
                '@type': 'Question',
                name: 'What\'s the best biryani in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Zafran\'s Hyderabadi biryani is highly rated. Copper Chimney and Charcoal Grill also serve excellent biryani.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there cheap Indian restaurants in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Tandoori Hut offers authentic Indian food from BD 3-8.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
