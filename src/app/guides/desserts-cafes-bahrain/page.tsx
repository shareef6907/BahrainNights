import { Metadata } from 'next';
import Link from 'next/link';
import { Cake, MapPin, Star, Coffee, IceCream, Cookie, Heart, Clock, Sparkles } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Best Desserts & Cafés in Bahrain 2026 | Sweet Spots & Bakeries',
  description: 'Discover the best dessert spots, cafés, and bakeries in Bahrain. From French patisseries to Arabic sweets, ice cream parlors to chocolate shops — your complete guide to sweet indulgence.',
  keywords: 'desserts Bahrain, best cafes Bahrain, cake shops Manama, Arabic sweets Bahrain, ice cream Bahrain, chocolate Bahrain, patisserie Bahrain, luqaimat Bahrain, kunafa Bahrain',
  openGraph: {
    title: 'Best Desserts & Cafés in Bahrain 2026',
    description: 'Complete guide to the best dessert spots, cafés, and sweet treats in Bahrain.',
    type: 'article',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/desserts-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Desserts & Cafés in Bahrain 2026',
    description: 'Discover Bahrain\'s sweetest spots.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain',
  },
};

const faqs = [
  {
    q: 'What are traditional Bahraini desserts?',
    a: 'Traditional Bahraini sweets include halwa (rosewater-scented sweet similar to Turkish delight), luqaimat (sweet fried dumplings with date syrup), balaleet (sweet vermicelli with eggs and saffron), machboos-inspired desserts, and various date-based sweets. These are found in heritage areas, souks, and during Ramadan.',
  },
  {
    q: 'Where can I find the best cakes in Bahrain?',
    a: 'Top cake shops include Café Lilou (French pastries), Sugar Daddy (custom celebration cakes), Bakemart (variety bakery), La Table Krug at Gulf Hotel (gourmet desserts), and Crust & Crumb (artisan cakes). Hotel patisseries at Four Seasons, Ritz-Carlton, and Gulf Hotel also excel at premium cakes.',
  },
  {
    q: 'Are there good vegan dessert options in Bahrain?',
    a: 'Yes, several cafés now offer vegan options including Café Lilou, Crust & Crumb, Wild Fig, and specialty health cafés. Naturally vegan Arabic sweets like luqaimat (without dairy toppings), some halwa varieties, and date-based desserts are widely available at traditional sweet shops.',
  },
  {
    q: 'What is the best Arabic sweet shop in Bahrain?',
    a: 'Al Hallab, Fadel Sweets, and traditional shops in Bab Al Bahrain souq are excellent for authentic Arabic sweets. Al Hallab is known for kunafa, baklava, and premium Arabic desserts. For luqaimat, dedicated cafés like Luqaimat Café offer modern takes on the classic.',
  },
  {
    q: 'Where can I find late-night desserts in Bahrain?',
    a: 'Many cafés stay open until midnight or later, especially on weekends. Popular late-night options include Milk Bar (milkshakes), café chains in Adliya and Juffair, hotel lounges, and 24-hour kunafa shops. Dessert trucks and kiosks also operate during evening hours.',
  },
  {
    q: 'What\'s the best café for working or studying in Bahrain?',
    a: 'For work-friendly atmospheres, try Café Lilou (Adliya), Crust & Crumb (quiet corners), Common Ground, and specialty coffee shops in Seef and Bahrain Bay. Many offer WiFi, good seating, and reasonable coffee prices for extended stays.',
  },
];

const premiumSpots = [
  {
    name: 'Café Lilou',
    location: 'Adliya',
    type: 'French Patisserie',
    rating: 4.8,
    price: 'BD 3-8',
    hours: '7am-11pm',
    description: 'The crown jewel of Bahrain\'s dessert scene. This beloved French patisserie offers exquisite pastries, macarons, éclairs, and cakes in a charming Parisian setting. Their pastry display is a work of art, and the afternoon tea is legendary. A must-visit for dessert lovers.',
    specialties: ['Macarons', 'Éclairs', 'Tarte au citron', 'Mille-feuille', 'Croissants', 'Afternoon tea'],
    vibe: 'Romantic & charming',
  },
  {
    name: 'La Table Krug',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining Patisserie',
    rating: 4.9,
    price: 'BD 8-15',
    hours: '12pm-11pm',
    description: 'Gourmet desserts from the Gulf Hotel\'s finest restaurant. Known for artistic plated desserts, a sophisticated take on classic treats, and flawless presentation. The chocolate sphere and seasonal tasting menus are exceptional. Perfect for special occasions.',
    specialties: ['Chocolate sphere', 'Seasonal tarts', 'Petits fours', 'Cheese selections', 'Tasting menus'],
    vibe: 'Elegant & sophisticated',
  },
  {
    name: 'Four Seasons Patisserie',
    location: 'Bahrain Bay',
    type: 'Luxury Hotel Pastry',
    rating: 4.8,
    price: 'BD 5-12',
    hours: '9am-10pm',
    description: 'The Four Seasons pastry team creates stunning cakes, chocolates, and French-inspired desserts. Perfect for buying gifts, celebration cakes, or enjoying treats with bay views. Their chocolate work is exceptional.',
    specialties: ['Celebration cakes', 'Chocolate truffles', 'French pastries', 'Afternoon tea', 'Gift boxes'],
    vibe: 'Luxurious & view-blessed',
  },
  {
    name: 'Crust & Crumb',
    location: 'Multiple Locations',
    type: 'Artisan Bakery',
    rating: 4.6,
    price: 'BD 3-7',
    hours: '7am-10pm',
    description: 'Popular artisan bakery known for fresh bread, croissants, and creative pastries. Their cookies, brownies, and cinnamon rolls have cult followings. Great for breakfast pastries, work-from-café sessions, or afternoon treats.',
    specialties: ['Croissants', 'Cookies', 'Brownies', 'Cinnamon rolls', 'Sourdough bread'],
    vibe: 'Cozy & casual',
  },
];

const arabicSweets = [
  {
    name: 'Al Hallab',
    location: 'Multiple Locations',
    specialty: 'Lebanese sweets & kunafa',
    mustTry: 'Kunafa, baklava, maamoul',
    price: 'BD 2-6',
    description: 'Famous Lebanese sweet shop with stunning kunafa, crispy baklava, and premium Arabic desserts. Perfect for gifting or indulging.',
  },
  {
    name: 'Luqaimat Café',
    location: 'Seef',
    specialty: 'Modern luqaimat',
    mustTry: 'Luqaimat with various toppings',
    price: 'BD 2-5',
    description: 'Modern take on the traditional Bahraini sweet dumplings. Choose from dozens of toppings — Nutella, Lotus, dates, and more.',
  },
  {
    name: 'Fadel Sweets',
    location: 'Manama',
    specialty: 'Traditional Bahraini',
    mustTry: 'Halwa, dates, local sweets',
    price: 'BD 1-4',
    description: 'Authentic traditional sweets including Bahraini halwa, date-based desserts, and local specialties. Great for souvenirs.',
  },
  {
    name: 'Souq Shops',
    location: 'Bab Al Bahrain',
    specialty: 'Heritage sweets',
    mustTry: 'Halwa, rahash, date confections',
    price: 'BD 1-5',
    description: 'Traditional sweet shops in the old souq selling halwa by weight, date confections, and heritage Bahraini treats.',
  },
];

const iceCreamSpots = [
  { name: 'Milk Bar', location: 'Multiple', specialty: 'Crazy milkshakes & ice cream', price: 'BD 2-5', description: 'Over-the-top milkshakes and sundaes perfect for Instagram' },
  { name: 'Marble Slab', location: 'City Centre', specialty: 'Custom mix-in ice cream', price: 'BD 2-4', description: 'Cold stone-style ice cream with endless mix-in combinations' },
  { name: 'Baskin Robbins', location: 'Multiple', specialty: 'Classic flavors', price: 'BD 1-3', description: 'Reliable classic with 31+ flavors and ice cream cakes' },
  { name: 'Pinkberry', location: 'Multiple', specialty: 'Frozen yogurt', price: 'BD 2-4', description: 'Light and refreshing frozen yogurt with fresh fruit toppings' },
  { name: 'Häagen-Dazs', location: 'City Centre', specialty: 'Premium ice cream', price: 'BD 3-6', description: 'Premium Belgian chocolate and classic luxury flavors' },
];

const chocolateSpots = [
  { name: 'Godiva', location: 'City Centre, Avenues', specialty: 'Belgian chocolate', price: 'BD 5-25', highlights: 'Hot chocolate, truffles, gift boxes' },
  { name: 'Patchi', location: 'Multiple', specialty: 'Lebanese chocolate', price: 'BD 3-20', highlights: 'Decorated chocolates, gift sets' },
  { name: 'Mirzam', location: 'Specialty stores', specialty: 'Artisan craft chocolate', price: 'BD 4-10', highlights: 'Single-origin bars, UAE-made' },
  { name: 'Hotel Boutiques', location: 'Four Seasons, Ritz', specialty: 'Handmade chocolates', price: 'BD 5-15', highlights: 'Seasonal collections, truffles' },
];

const cafeCategories = [
  { name: 'French Patisseries', icon: Cake, spots: ['Café Lilou', 'La Table Krug', 'Paul', 'Le Pain Quotidien'] },
  { name: 'Arabic Sweets', icon: Cookie, spots: ['Al Hallab', 'Luqaimat Café', 'Fadel Sweets', 'Souq shops'] },
  { name: 'Ice Cream', icon: IceCream, spots: ['Milk Bar', 'Marble Slab', 'Baskin Robbins', 'Pinkberry'] },
  { name: 'Chocolate', icon: Heart, spots: ['Godiva', 'Patchi', 'Hotel boutiques', 'Mirzam'] },
];

const traditionalVsWestern = {
  arabic: [
    { name: 'Luqaimat', desc: 'Fried dough balls with date syrup — Bahrain\'s beloved sweet' },
    { name: 'Kunafa', desc: 'Cheese pastry soaked in rose syrup with crispy kadaif' },
    { name: 'Halwa', desc: 'Bahraini rosewater-scented sweet, similar to Turkish delight' },
    { name: 'Baklava', desc: 'Layered filo pastry with nuts and honey or syrup' },
    { name: 'Um Ali', desc: 'Arabic bread pudding with cream, nuts, and raisins' },
    { name: 'Balaleet', desc: 'Sweet vermicelli with eggs, cardamom, and saffron' },
  ],
  western: [
    { name: 'Macarons', desc: 'Delicate French almond cookies with flavored fillings' },
    { name: 'Éclairs', desc: 'Choux pastry filled with cream and glazed' },
    { name: 'Tiramisu', desc: 'Italian coffee-soaked dessert with mascarpone' },
    { name: 'Cheesecakes', desc: 'New York, Japanese, and Basque burnt varieties' },
    { name: 'Crème brûlée', desc: 'Rich custard with caramelized sugar top' },
    { name: 'Mille-feuille', desc: 'Crispy puff pastry layers with cream' },
  ],
};

const bestFor = [
  { occasion: 'Date Night', spots: 'Café Lilou, La Table Krug, Four Seasons', tip: 'Book ahead for window seats' },
  { occasion: 'Birthday Cakes', spots: 'Sugar Daddy, Bakemart, Magnolia', tip: 'Order 2-3 days ahead for custom designs' },
  { occasion: 'Work/Study', spots: 'Crust & Crumb, Common Ground, The Coffee Club', tip: 'Morning visits are quieter' },
  { occasion: 'Family Outings', spots: 'Milk Bar, Baskin Robbins, Mall cafés', tip: 'Kids love the over-the-top presentations' },
  { occasion: 'Gift Buying', spots: 'Godiva, Patchi, Al Hallab, Hotel boutiques', tip: 'Pre-wrapped boxes available' },
  { occasion: 'Ramadan Nights', spots: 'Luqaimat cafés, kunafa shops, traditional souq', tip: 'Peak hours after iftar' },
];

export default function DessertsCafesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Desserts & Cafés', url: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain' },
      ]} />
      
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              From French macarons to Arabic luqaimat — discover the sweetest spots 
              in the Kingdom for every sugar craving. Your complete guide to patisseries, 
              cafés, ice cream, and traditional sweets.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Sweet Spots', value: '50+', icon: Cake },
              { label: 'Categories', value: '6', icon: Cookie },
              { label: 'Price Range', value: 'BD 1-20', icon: Coffee },
              { label: 'Best For', value: 'Everyone', icon: Heart },
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

      {/* Introduction */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain&apos;s dessert scene is a delicious fusion of East and West. You&apos;ll find exquisite French patisseries 
            alongside traditional Arabic sweet shops, artisan chocolate boutiques next to beloved luqaimat cafés. 
            The Kingdom&apos;s café culture is thriving, with new spots opening regularly while classics like Café Lilou 
            remain perennial favorites.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Whether you&apos;re celebrating a birthday, seeking the perfect date night spot, or simply craving something 
            sweet after dinner, Bahrain delivers. From five-star hotel patisseries to hidden souq gems, every 
            neighborhood has its sweet spots worth discovering.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-pink-400">Pro tip:</strong> For special occasions, order custom cakes 2-3 days 
            ahead. For Ramadan, expect peak crowds after iftar — the best kunafa and luqaimat spots get busy!
          </p>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Dessert Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cafeCategories.map((cat) => (
              <div key={cat.name} className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
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

      {/* Premium Spots */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-pink-400" /> Top Sweet Spots
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The cream of Bahrain&apos;s dessert scene — must-visit destinations
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {premiumSpots.map((spot) => (
              <div 
                key={spot.name}
                className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded">{spot.type}</span>
                    <h3 className="text-xl font-bold mt-2">{spot.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      {spot.location}
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
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Clock className="w-3 h-3" /> {spot.hours}
                  <span className="text-pink-400">•</span>
                  <span>{spot.vibe}</span>
                </div>
                
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

      {/* Arabic Sweets */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🌙 Arabic & Traditional Sweets</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {arabicSweets.map((spot) => (
              <div key={spot.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-amber-400">{spot.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {spot.location}
                    </p>
                  </div>
                  <span className="text-pink-400 font-medium">{spot.price}</span>
                </div>
                <p className="text-sm text-amber-300 mb-2">{spot.specialty}</p>
                <p className="text-gray-300 text-sm mb-3">{spot.description}</p>
                <p className="text-xs text-gray-400"><strong>Must try:</strong> {spot.mustTry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ice Cream & Chocolate */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ice Cream */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <IceCream className="w-6 h-6 text-blue-400" /> Ice Cream & Frozen
              </h2>
              <div className="space-y-4">
                {iceCreamSpots.map((spot) => (
                  <div key={spot.name} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">{spot.name}</h3>
                      <span className="text-blue-400 text-sm">{spot.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{spot.location}</p>
                    <p className="text-sm text-gray-300">{spot.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chocolate */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-400" /> Chocolate
              </h2>
              <div className="space-y-4">
                {chocolateSpots.map((spot) => (
                  <div key={spot.name} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">{spot.name}</h3>
                      <span className="text-rose-400 text-sm">{spot.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{spot.location}</p>
                    <p className="text-sm text-gray-300">{spot.highlights}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs Western */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Traditional vs International</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-400">🌙 Arabic Sweets</h3>
              <ul className="space-y-4 text-gray-300">
                {traditionalVsWestern.arabic.map((item) => (
                  <li key={item.name}>
                    <strong className="text-amber-300">{item.name}</strong>
                    <span className="text-gray-400"> — {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-pink-400">🥐 French & Western</h3>
              <ul className="space-y-4 text-gray-300">
                {traditionalVsWestern.western.map((item) => (
                  <li key={item.name}>
                    <strong className="text-pink-300">{item.name}</strong>
                    <span className="text-gray-400"> — {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best For Occasions */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎯 Best For Each Occasion</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestFor.map((item) => (
              <div key={item.occasion} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{item.occasion}</h3>
                <p className="text-sm text-gray-300 mb-2">{item.spots}</p>
                <p className="text-xs text-gray-400">💡 {item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Bahrain Food Guides</h2>
          <p className="text-gray-300 mb-6">Complete your culinary journey through the Kingdom</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-breakfast-bahrain" className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-colors">Best Breakfast</Link>
            <Link href="/guides/cafes" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Cafés Guide</Link>
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
                <h3 className="font-bold mb-2 text-pink-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Best Breakfast', href: '/guides/best-breakfast-bahrain', emoji: '☀️' },
              { title: 'Cafés Guide', href: '/guides/cafes', emoji: '☕' },
              { title: 'Brunch Spots', href: '/guides/brunch', emoji: '🥂' },
              { title: 'Romantic Spots', href: '/guides/romantic', emoji: '💑' },
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

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for café events and launches? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">EventsBahrain.com</a> for the latest.
          </p>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Desserts & Cafés in Bahrain 2026',
        description: 'Complete guide to the best dessert spots, cafés, and sweet treats in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-02-11',
        dateModified: lastUpdated,
        mainEntityOfPage: 'https://www.bahrainnights.com/guides/desserts-cafes-bahrain'
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })}} />

      <InternalLinks 
        title="Sweet Spots in Bahrain" 
        links={[
          { title: 'Best Cafes in Bahrain', href: '/guides/cafes' },
          { title: 'Best Breakfast Spots', href: '/guides/best-breakfast-bahrain' },
          { title: 'Adliya Restaurants & Cafes', href: '/guides/adliya-restaurants-bars' },
          { title: 'Shopping Malls', href: '/guides/malls' },
          { title: 'Family-Friendly Spots', href: '/guides/best-family-restaurants-bahrain' },
        ]} 
      />
    </div>
  );
}
