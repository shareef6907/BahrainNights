import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Italian Restaurants in Bahrain 2026 | Pizza, Pasta & Fine Dining',
  description: 'Discover the best Italian restaurants in Bahrain. From authentic Neapolitan pizza and fresh pasta to fine dining trattorias. Complete guide with prices, locations, and reviews.',
  keywords: 'best Italian restaurants Bahrain, Italian food Bahrain, pizza Bahrain, pasta Bahrain, Italian restaurant Manama, trattoria Bahrain, Italian fine dining Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-italian-restaurants-bahrain' },
  openGraph: {
    title: 'Best Italian Restaurants in Bahrain 2026',
    description: 'Your complete guide to the best Italian cuisine in Bahrain — from pizzerias to fine dining.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Italian restaurant in Bahrain?', a: 'Masso in Adliya and Re Napoli at Four Seasons are considered among the best. For authentic pizza, Il Forno and 800 Degrees are excellent. La Vinoteca offers a great wine-focused Italian experience.' },
  { q: 'Where can I find authentic Neapolitan pizza in Bahrain?', a: 'Il Forno in Adliya serves authentic wood-fired Neapolitan pizza. 800 Degrees and Pizza Express also offer quality pizza. Re Napoli at Four Seasons has excellent pizza with a waterfront view.' },
  { q: 'How much does Italian food cost in Bahrain?', a: 'Casual Italian like Pizza Express costs BD 6-12. Mid-range trattorias like Masso run BD 15-25. Fine dining Italian at hotels starts at BD 30-50 per person.' },
  { q: 'Which Italian restaurants in Bahrain have outdoor seating?', a: 'Masso in Adliya, Café Italia in Seef, and La Vinoteca have pleasant outdoor seating. Waterfront options include Re Napoli at Four Seasons and BiCE at Gulf Hotel.' },
  { q: 'Are there Italian restaurants with vegetarian options?', a: 'Yes, Italian cuisine is naturally vegetarian-friendly. Most restaurants offer extensive pasta, risotto, pizza, and antipasti options without meat. Masso and Il Forno have excellent vegetarian choices.' },
];

const restaurants = [
  { 
    name: 'Masso', 
    location: 'Adliya',
    cuisine: 'Contemporary Italian',
    priceRange: 'BD 15-30',
    highlight: 'Stylish Adliya spot, excellent pasta and wine',
    mustTry: 'Truffle Pasta, Ossobuco, Tiramisu',
    rating: 4.7,
  },
  { 
    name: 'Re Napoli', 
    location: 'Four Seasons, Bahrain Bay',
    cuisine: 'Authentic Italian & Pizzeria',
    priceRange: 'BD 25-45',
    highlight: 'Stunning waterfront views, imported ingredients',
    mustTry: 'Margherita DOC, Fresh Pasta, Gelato',
    rating: 4.8,
  },
  { 
    name: 'BiCE', 
    location: 'Gulf Hotel, Adliya',
    cuisine: 'Northern Italian Fine Dining',
    priceRange: 'BD 25-40',
    highlight: 'Classic Italian elegance, extensive wine list',
    mustTry: 'Risotto, Veal Milanese, Carpaccio',
    rating: 4.6,
  },
  { 
    name: 'La Vinoteca', 
    location: 'Adliya',
    cuisine: 'Wine Bar & Italian',
    priceRange: 'BD 12-25',
    highlight: 'Wine-focused, intimate atmosphere',
    mustTry: 'Charcuterie Board, Pasta Dishes, Wine Selection',
    rating: 4.5,
  },
  { 
    name: 'Il Forno', 
    location: 'Adliya',
    cuisine: 'Neapolitan Pizzeria',
    priceRange: 'BD 6-12',
    highlight: 'Authentic wood-fired pizza, casual vibe',
    mustTry: 'Pizza Margherita, Diavola, Calzone',
    rating: 4.4,
  },
  { 
    name: '800 Degrees', 
    location: 'The Avenues',
    cuisine: 'Neapolitan Pizza',
    priceRange: 'BD 5-10',
    highlight: 'Build-your-own pizza concept',
    mustTry: 'Custom Pizza, Meatballs, Caesar Salad',
    rating: 4.3,
  },
  { 
    name: 'Café Italia', 
    location: 'Seef',
    cuisine: 'Italian Café & Restaurant',
    priceRange: 'BD 8-15',
    highlight: 'Family-friendly, all-day dining',
    mustTry: 'Lasagna, Spaghetti Carbonara, Espresso',
    rating: 4.2,
  },
  { 
    name: 'Pizza Express', 
    location: 'Multiple Locations',
    cuisine: 'Casual Italian Chain',
    priceRange: 'BD 5-12',
    highlight: 'Reliable quality, great for families',
    mustTry: 'Romana Pizza, Dough Balls, Pasta',
    rating: 4.1,
  },
];

export default function BestItalianRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Italian Restaurants', url: 'https://www.bahrainnights.com/guides/best-italian-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">🍝 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-green-400 to-red-500 bg-clip-text text-transparent">Italian Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From authentic Neapolitan pizzas and handmade pasta to elegant Northern Italian 
              fine dining — discover Bahrain&apos;s finest Italian trattorias and ristorantes.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Italian cuisine is universally beloved, and Bahrain offers an impressive selection of 
            Italian restaurants ranging from casual pizzerias to sophisticated fine dining establishments. 
            Whether you&apos;re craving a simple margherita pizza, a bowl of perfectly al dente pasta, or 
            an elaborate multi-course Italian dinner, you&apos;ll find it here.
          </p>
          <p>
            Adliya remains the heart of Italian dining in Bahrain, with Masso, La Vinoteca, and Il Forno 
            all within walking distance. The Five-star hotels offer upscale Italian experiences, while 
            mall-based restaurants provide family-friendly options. This guide covers the best Italian 
            restaurants across all budgets and occasions.
          </p>
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Italian Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-green-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-green-400 fill-green-400" />
                    <span className="text-green-400 font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{restaurant.cuisine}</p>
                <p className="text-gray-400 text-sm mb-3">{restaurant.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-green-400">
                    <DollarSign className="w-4 h-4" /> {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Utensils className="w-4 h-4" /> {restaurant.mustTry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Cuisine Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Italian Regional Cuisines</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">🍕 Neapolitan (Southern)</h3>
              <p className="text-gray-300 mb-2">
                The birthplace of pizza. Neapolitan cuisine features simple, high-quality ingredients — 
                San Marzano tomatoes, fresh mozzarella, and olive oil. Pizza should have a soft, charred crust.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Il Forno, Re Napoli, 800 Degrees
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">🥩 Northern Italian</h3>
              <p className="text-gray-300 mb-2">
                Richer and creamier than southern cuisine. Features risotto, polenta, butter-based sauces, 
                and meats like ossobuco and veal Milanese. Less tomato-focused, more cream and cheese.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> BiCE, Masso
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">🍝 Roman</h3>
              <p className="text-gray-300 mb-2">
                Home to classic pasta dishes like carbonara, cacio e pepe, and amatriciana. Simple recipes 
                that showcase quality ingredients — guanciale (cured pork cheek), pecorino romano, and black pepper.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Masso, Café Italia
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">🍷 Tuscan</h3>
              <p className="text-gray-300 mb-2">
                Rustic, hearty fare with a focus on grilled meats, beans, and bread. Famous for 
                bistecca alla fiorentina (Florentine steak), ribollita soup, and Chianti wines.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> La Vinoteca (wine focus), BiCE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Italian Dining in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">🍷 Wine Pairing</h3>
              <p className="text-gray-300 text-sm">
                Italian food and wine are inseparable. Restaurants like La Vinoteca and BiCE 
                have extensive Italian wine lists. Ask for recommendations — sommeliers love 
                matching regional wines with their dishes.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">🧀 Fresh Ingredients</h3>
              <p className="text-gray-300 text-sm">
                Top Italian restaurants import key ingredients from Italy — mozzarella di bufala, 
                prosciutto di Parma, Parmigiano-Reggiano. Ask if they use imported ingredients 
                for an authentic experience.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">⏰ Lunch Deals</h3>
              <p className="text-gray-300 text-sm">
                Many Italian restaurants offer lunch set menus at 30-40% off dinner prices. 
                Perfect for trying upscale spots like BiCE or Re Napoli without the full 
                fine dining price tag.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">👨‍👩‍👧 Family Dining</h3>
              <p className="text-gray-300 text-sm">
                Italian food is inherently family-friendly. Pizza and pasta are kid favorites. 
                Restaurants like Pizza Express and Café Italia cater well to families with 
                children&apos;s menus and relaxed atmospheres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white/5">
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
          <h2 className="text-3xl font-bold mb-4">Explore More Cuisines</h2>
          <p className="text-gray-400 mb-8">Discover more dining options across Bahrain</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-arabic-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Arabic Restaurants →
            </Link>
            <Link href="/guides/best-seafood-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Seafood Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-green-500 to-red-500 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* More Cuisine Guides */}
      <section className="py-8 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Other Cuisine Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Lebanese', href: '/guides/best-lebanese-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
              { title: 'Korean', href: '/guides/best-korean-restaurants-bahrain' },
              { title: 'Turkish', href: '/guides/best-turkish-restaurants-bahrain' },
              { title: 'Mexican', href: '/guides/best-mexican-restaurants-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-green-500/20 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Date Night', href: '/guides/best-date-night-bahrain' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Business Lunch', href: '/guides/best-business-lunch-bahrain' },
              { title: 'Tonight', href: '/tonight' },
              { title: 'This Weekend', href: '/this-weekend' },
              { title: 'Adliya', href: '/guides/adliya' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
