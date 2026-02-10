import { Metadata } from 'next';
import Link from 'next/link';
import { Cake, MapPin, Star, Coffee, IceCream, Cookie, Heart } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';

export const metadata: Metadata = {
  title: 'Best Desserts & Cafés in Bahrain 2026 | Top Sweet Spots',
  description: 'Discover the best dessert spots and cafés in Bahrain for 2026. From Arabic sweets to French patisseries, ice cream parlors to chocolate shops.',
  keywords: 'desserts Bahrain, best cafes Bahrain, cake shops Manama, Arabic sweets Bahrain, ice cream Bahrain, chocolate Bahrain, patisserie Bahrain',
  openGraph: {
    title: 'Best Desserts & Cafés in Bahrain 2026',
    description: 'Complete guide to the best dessert spots and cafés in Bahrain.',
    type: 'article',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain',
  },
};

const faqs = [
  {
    q: 'What are traditional Bahraini desserts?',
    a: 'Traditional Bahraini sweets include halwa (rosewater-scented sweet), luqaimat (sweet dumplings with date syrup), balaleet (sweet vermicelli), and various date-based desserts. These are often found in heritage areas and during Ramadan.',
  },
  {
    q: 'Where can I find the best cakes in Bahrain?',
    a: 'Top cake shops include Café Lilou (French pastries), Sugar Daddy (custom cakes), Bakemart, and La Table Krug (gourmet desserts). Hotel patisseries like Four Seasons and Ritz-Carlton also excel.',
  },
  {
    q: 'Are there good vegan dessert options in Bahrain?',
    a: 'Yes, several cafés now offer vegan options including Café Lilou, Crust & Crumb, and specialty shops. Naturally vegan Arabic sweets like luqaimat and some halwa varieties are also widely available.',
  },
];

const spots = [
  {
    name: 'Café Lilou',
    location: 'Adliya',
    type: 'French Patisserie',
    rating: 4.8,
    price: 'BD 3-8',
    description: 'The crown jewel of Bahrain\'s dessert scene. Exquisite French pastries, macarons, éclairs, and cakes in a charming setting. Their pastry display is a work of art.',
    specialties: ['Macarons', 'Éclairs', 'Tarte au citron', 'Mille-feuille', 'Croissants'],
  },
  {
    name: 'La Table Krug',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining Patisserie',
    rating: 4.9,
    price: 'BD 8-15',
    description: 'Gourmet desserts from the Gulf Hotel\'s finest restaurant. Artistic plated desserts and a sophisticated take on classic sweet treats.',
    specialties: ['Chocolate sphere', 'Seasonal fruit tarts', 'Petits fours', 'Cheese selections'],
  },
  {
    name: 'Luqaimat Café',
    location: 'Seef',
    type: 'Arabic Sweets',
    rating: 4.5,
    price: 'BD 2-5',
    description: 'Modern take on traditional Arabic desserts. Famous for their signature luqaimat (sweet dumplings) with various toppings and drizzles.',
    specialties: ['Luqaimat variations', 'Kunafa', 'Arabic coffee', 'Date desserts'],
  },
  {
    name: 'Milk Bar',
    location: 'Multiple Locations',
    type: 'Ice Cream & Shakes',
    rating: 4.5,
    price: 'BD 2-5',
    description: 'Popular ice cream and milkshake destination with creative flavors and over-the-top presentations perfect for Instagram.',
    specialties: ['Crazy shakes', 'Ice cream sundaes', 'Waffles', 'Cookie sandwiches'],
  },
  {
    name: 'Sugar Daddy',
    location: 'Juffair',
    type: 'Custom Cakes',
    rating: 4.6,
    price: 'BD 15-80',
    description: 'Go-to destination for stunning custom cakes and cupcakes. Perfect for birthdays, weddings, and celebrations.',
    specialties: ['Custom cakes', 'Wedding cakes', 'Cupcakes', 'Cake pops'],
  },
  {
    name: 'Pinkberry',
    location: 'Multiple Locations',
    type: 'Frozen Yogurt',
    rating: 4.3,
    price: 'BD 2-4',
    description: 'Premium frozen yogurt with fresh fruit toppings. Light and refreshing option with customizable creations.',
    specialties: ['Original flavor', 'Pomegranate', 'Fresh fruit toppings'],
  },
  {
    name: 'Godiva',
    location: 'City Centre, Avenues',
    type: 'Chocolate',
    rating: 4.7,
    price: 'BD 5-20',
    description: 'Luxury Belgian chocolate boutique with an attached café. Indulgent hot chocolates, chocolate drinks, and boxed gifts.',
    specialties: ['Hot chocolate', 'Chocolate truffles', 'Gift boxes', 'Chocolate fountain'],
  },
  {
    name: 'Bread Talk',
    location: 'Multiple Locations',
    type: 'Asian Bakery',
    rating: 4.2,
    price: 'BD 1-4',
    description: 'Popular Asian bakery chain with soft breads, pastries, and creative sweet buns. Great for quick treats.',
    specialties: ['Floss buns', 'Curry buns', 'Cheesecakes', 'Asian pastries'],
  },
];

const categories = [
  { name: 'French Patisseries', icon: Cake, spots: ['Café Lilou', 'La Table Krug', 'Crust & Crumb'] },
  { name: 'Arabic Sweets', icon: Cookie, spots: ['Luqaimat Café', 'Al Hallab', 'Bab Al Bahrain shops'] },
  { name: 'Ice Cream', icon: IceCream, spots: ['Milk Bar', 'Baskin Robbins', 'Marble Slab'] },
  { name: 'Chocolate', icon: Heart, spots: ['Godiva', 'Patchi', 'Hotel boutiques'] },
];

export default function DessertsCafesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Desserts & Cafés', url: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🍰 Sweet Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best Desserts & Cafés in{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From French macarons to Arabic luqaimat — discover the sweetest spots 
              in the kingdom for every sugar craving.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Sweet Spots', value: '30+', icon: Cake },
              { label: 'Categories', value: '6', icon: Cookie },
              { label: 'Price Range', value: 'BD 1-20', icon: Coffee },
              { label: 'Best For', value: 'All Ages', icon: Heart },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Dessert Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-white/5 rounded-xl p-6 text-center">
                <cat.icon className="w-10 h-10 mx-auto mb-4 text-pink-400" />
                <h3 className="font-bold mb-3">{cat.name}</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  {cat.spots.map((spot) => (
                    <li key={spot}>{spot}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spots Grid */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Sweet Spots</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our handpicked favorites for every dessert craving
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {spots.map((spot) => (
              <div 
                key={spot.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{spot.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      {spot.location}
                      <span className="text-pink-400">•</span>
                      <span>{spot.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{spot.rating}</span>
                    </div>
                    <div className="text-sm text-pink-400 mt-1">{spot.price}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{spot.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {spot.specialties.map((item) => (
                    <span key={item} className="px-2 py-1 bg-pink-500/10 text-pink-300 rounded-full text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arabic vs Western */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Traditional vs International</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-pink-400">🌙 Arabic Sweets</h3>
              <ul className="space-y-3 text-gray-300">
                <li><strong>Luqaimat</strong> — Fried dough balls with date syrup</li>
                <li><strong>Kunafa</strong> — Cheese pastry with rose syrup</li>
                <li><strong>Halwa</strong> — Bahraini rosewater sweet</li>
                <li><strong>Baklava</strong> — Layered filo with nuts</li>
                <li><strong>Um Ali</strong> — Arabic bread pudding</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-pink-400">🥐 French & Western</h3>
              <ul className="space-y-3 text-gray-300">
                <li><strong>Macarons</strong> — Delicate French cookies</li>
                <li><strong>Éclairs</strong> — Choux pastry with cream</li>
                <li><strong>Tiramisu</strong> — Italian coffee dessert</li>
                <li><strong>Cheesecakes</strong> — New York and Japanese style</li>
                <li><strong>Crème brûlée</strong> — Caramelized custard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-pink-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Promo */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Opening a Café or Bakery?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Cinematic Group offers professional food photography, menu shoots, and 
              launch event production for restaurants and cafés across Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.filmproductionbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-pink-500 hover:bg-pink-400 rounded-lg font-medium transition-colors">
                Food Photography
              </a>
              <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Launch Events
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
              { title: 'Best Breakfast', href: '/guides/best-breakfast-bahrain', emoji: '☀️' },
              { title: 'Cafés Guide', href: '/guides/cafes', emoji: '☕' },
              { title: 'Brunch Spots', href: '/guides/brunch', emoji: '🥂' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">{guide.title}</span>
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
            headline: 'Best Desserts & Cafés in Bahrain 2026',
            description: 'Complete guide to the best dessert spots and cafés in Bahrain.',
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
