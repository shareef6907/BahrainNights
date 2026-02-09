import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Award, Wine
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Italian Restaurants in Bahrain 2026 | Top 12 Pizza, Pasta & Fine Dining',
  description: 'Discover the best Italian restaurants in Bahrain for 2026. From authentic Neapolitan pizza to fine dining pasta, find top-rated Italian venues including Masso, La Vinoteca, and Villa Mamas.',
  keywords: 'best Italian restaurants Bahrain, Italian food Bahrain, pizza Bahrain, pasta Bahrain, Masso Bahrain, Italian fine dining Manama, best pizza Bahrain',
  openGraph: {
    title: 'Best Italian Restaurants in Bahrain 2026 | Top 12 Pizza, Pasta & Fine Dining',
    description: 'Complete guide to the best Italian restaurants in Bahrain - from authentic pizza to fine dining pasta.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-italian-restaurants-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/italian-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Italian Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Italian Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to Italian cuisine in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-italian-restaurants-bahrain',
  },
};

const restaurants = [
  {
    name: 'Masso',
    slug: 'masso-ritz-carlton',
    location: 'Ritz-Carlton Bahrain',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Contemporary Italian',
    description: 'Masso at the Ritz-Carlton is Bahrain\'s premier Italian fine dining destination. The restaurant offers authentic Italian cuisine prepared with premium imported ingredients, complemented by an extensive wine cellar. The elegant terrace overlooking the gardens provides a romantic setting for exceptional handmade pasta, fresh seafood, and classic Italian preparations elevated to an art form.',
    specialties: ['Handmade pasta', 'Fresh seafood', 'Italian wines', 'Terrace dining', 'Truffle dishes'],
    atmosphere: 'Elegant and romantic with beautiful outdoor terrace',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Essential for dinner',
    bestFor: 'Special occasions, romantic dinners, fine Italian dining',
    mustTry: 'Truffle pasta, Seafood linguine, Tiramisu, Italian wine pairing',
  },
  {
    name: 'La Vinoteca',
    slug: 'la-vinoteca-bahrain',
    location: 'Adliya',
    type: 'Wine Bar & Bistro',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Italian Wine Bar',
    description: 'La Vinoteca combines exceptional Italian cuisine with one of Bahrain\'s most impressive wine collections. This sophisticated wine bar and bistro offers an intimate atmosphere perfect for wine lovers and food enthusiasts. The menu features classic Italian dishes designed to pair perfectly with their curated selection of over 200 wines.',
    specialties: ['Extensive wine list', 'Cheese boards', 'Pasta', 'Risotto', 'Wine pairings'],
    atmosphere: 'Intimate wine bar with sophisticated ambiance',
    hours: 'Daily 6PM-12AM',
    reservation: 'Highly recommended',
    bestFor: 'Wine lovers, date nights, sophisticated dining',
    mustTry: 'Wine flight, Burrata, Risotto, Cheese selection',
  },
  {
    name: 'Villa Mamas',
    slug: 'villa-mamas-bahrain',
    location: 'Adliya',
    type: 'Casual Fine',
    rating: 5,
    price: 'BD 15-30 per person',
    cuisine: 'Mediterranean/Italian',
    description: 'While Villa Mamas celebrates Mediterranean cuisine broadly, its Italian offerings are exceptional. The charming villa setting, with its lush garden courtyard, provides the perfect backdrop for homestyle Italian cooking. The restaurant is beloved for its warm hospitality and dishes that taste like they\'re made by an Italian grandmother.',
    specialties: ['Garden dining', 'Homestyle cooking', 'Fresh pasta', 'Mediterranean mezze', 'Dolce'],
    atmosphere: 'Charming villa with beautiful garden courtyard',
    hours: 'Daily 8AM-11PM',
    reservation: 'Recommended, especially for garden seating',
    bestFor: 'Brunch, families, garden dining, celebrations',
    mustTry: 'Fresh pasta of the day, Wood-fired pizza, Tiramisu',
  },
  {
    name: 'Primavera',
    slug: 'primavera-bahrain',
    location: 'Gulf Hotel',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 20-40 per person',
    cuisine: 'Classic Italian',
    description: 'Primavera at the Gulf Hotel has been serving refined Italian cuisine for decades, making it a trusted institution in Bahrain\'s dining scene. The restaurant offers classic Italian preparations with a focus on quality ingredients and traditional techniques. The elegant setting is perfect for business dinners and celebrations.',
    specialties: ['Classic recipes', 'Seafood pasta', 'Veal dishes', 'Italian desserts', 'Wine selection'],
    atmosphere: 'Classic elegance, formal hotel dining',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Business dinners, classic Italian, hotel guests',
    mustTry: 'Lobster linguine, Veal milanese, Panna cotta',
  },
  {
    name: 'Piatto',
    slug: 'piatto-bahrain',
    location: 'Seef District',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 10-20 per person',
    cuisine: 'Modern Italian',
    description: 'Piatto offers contemporary Italian cuisine in a stylish, accessible setting. The restaurant strikes a perfect balance between quality and value, serving wood-fired pizzas, fresh pasta, and Italian classics without the fine dining price tag. Popular with families and groups.',
    specialties: ['Wood-fired pizza', 'Pasta dishes', 'Risotto', 'Italian desserts', 'Aperitivo'],
    atmosphere: 'Modern and stylish with casual vibes',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for weekends',
    bestFor: 'Families, casual dining, pizza nights',
    mustTry: 'Margherita pizza, Carbonara, Affogato',
  },
  {
    name: 'Il Terrazzo',
    slug: 'il-terrazzo-bahrain',
    location: 'Four Seasons Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Italian Fine Dining',
    description: 'Il Terrazzo offers spectacular Italian cuisine with stunning views of Bahrain Bay. The restaurant combines traditional Italian cooking with premium ingredients and impeccable presentation. The terrace setting is particularly magical at sunset, making it one of Bahrain\'s most romantic dining spots.',
    specialties: ['Bay views', 'Seafood', 'Handmade pasta', 'Italian wines', 'Sunset dining'],
    atmosphere: 'Luxurious with breathtaking waterfront views',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Essential',
    bestFor: 'Special occasions, romantic dinners, celebrations',
    mustTry: 'Truffle risotto, Branzino, Sunset cocktails',
  },
  {
    name: 'PF Chang\'s Italian Side',
    slug: 'pf-changs-italian',
    location: 'Multiple locations',
    type: 'Casual',
    rating: 3,
    price: 'BD 8-16 per person',
    cuisine: 'Italian-American',
    description: 'While primarily known for Asian cuisine, PF Chang\'s pasta selections offer reliable Italian-American comfort food at accessible prices. The convenient locations and consistent quality make it a good option for casual Italian cravings.',
    specialties: ['Pasta dishes', 'Salads', 'Convenient locations', 'Family-friendly'],
    atmosphere: 'Casual chain restaurant',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Quick Italian fix, families, convenience',
    mustTry: 'Pasta dishes, Caesar salad',
  },
  {
    name: 'Dolce Vita',
    slug: 'dolce-vita-bahrain',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'Traditional Italian',
    description: 'Dolce Vita brings authentic Italian flavors to Juffair, offering traditional recipes in a warm, welcoming atmosphere. The restaurant is run by passionate owners who take pride in serving genuine Italian cuisine without pretension. Great for those seeking real Italian comfort food.',
    specialties: ['Authentic recipes', 'Wood-fired pizza', 'Homemade pasta', 'Italian coffee'],
    atmosphere: 'Warm and authentic Italian trattoria feel',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Authentic Italian, casual dining, pizza lovers',
    mustTry: 'Pizza napoletana, Fresh pasta, Espresso',
  },
  {
    name: 'Vapiano',
    slug: 'vapiano-bahrain',
    location: 'City Centre Bahrain',
    type: 'Fast Casual',
    rating: 3,
    price: 'BD 5-12 per person',
    cuisine: 'Fresh Italian Fast Casual',
    description: 'Vapiano offers a unique concept where fresh pasta and pizza are prepared in front of you. The affordable prices and fresh ingredients make it popular for quick Italian meals during shopping trips. The interactive ordering system adds to the experience.',
    specialties: ['Fresh pasta made on-site', 'Pizza', 'Salads', 'Quick service'],
    atmosphere: 'Modern fast-casual with open kitchen',
    hours: 'Mall hours, typically 10AM-10PM',
    reservation: 'Not required',
    bestFor: 'Quick lunch, shopping breaks, budget Italian',
    mustTry: 'Fresh pasta, Pizza, Tiramisu',
  },
  {
    name: 'Trattoria Bahrain',
    slug: 'trattoria-bahrain',
    location: 'Adliya',
    type: 'Casual Fine',
    rating: 4,
    price: 'BD 12-25 per person',
    cuisine: 'Regional Italian',
    description: 'Trattoria focuses on regional Italian specialties, showcasing dishes from various parts of Italy. The restaurant takes pride in sourcing authentic ingredients and preparing dishes according to traditional regional recipes. A must-visit for those who want to explore Italy\'s diverse culinary regions.',
    specialties: ['Regional specialties', 'Fresh pasta', 'Wine selection', 'Italian imports'],
    atmosphere: 'Classic trattoria with regional touches',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Regional Italian exploration, food enthusiasts',
    mustTry: 'Regional pasta specials, Italian salumi, Cannoli',
  },
];

const pastaTypes = [
  { type: 'Carbonara', description: 'Egg, pecorino, guanciale - creamy without cream', where: 'Masso, La Vinoteca' },
  { type: 'Bolognese', description: 'Slow-cooked meat ragù, typically with tagliatelle', where: 'Villa Mamas, Trattoria' },
  { type: 'Aglio e Olio', description: 'Garlic, olive oil, chili - simple perfection', where: 'Dolce Vita, Piatto' },
  { type: 'Cacio e Pepe', description: 'Pecorino and black pepper - Roman classic', where: 'Masso, Primavera' },
  { type: 'Frutti di Mare', description: 'Seafood medley with pasta', where: 'Masso, Il Terrazzo' },
  { type: 'Amatriciana', description: 'Tomato, guanciale, pecorino - Roman favorite', where: 'Trattoria, La Vinoteca' },
];

const tips = [
  {
    title: 'Al Dente Matters',
    content: 'True Italian pasta is cooked al dente (firm). Don\'t be surprised if it feels firmer than you\'re used to.',
  },
  {
    title: 'Wine Pairing',
    content: 'Match regional dishes with regional wines. Ask your server for recommendations - they know their list.',
  },
  {
    title: 'Course Order',
    content: 'Traditional Italian dining: antipasti, primi (pasta/risotto), secondi (meat/fish), dolce (dessert).',
  },
  {
    title: 'Pizza Etiquette',
    content: 'In Italy, pizza is eaten with knife and fork. Don\'t be shy to do the same at fine Italian restaurants.',
  },
  {
    title: 'Espresso After',
    content: 'Italians drink espresso after a meal, never cappuccino (that\'s for breakfast). End your meal properly!',
  },
  {
    title: 'Bread Purpose',
    content: 'Italian bread is for \'fare la scarpetta\' - mopping up delicious sauce. Save some for this purpose.',
  },
];

const faqs = [
  {
    q: 'What is the best Italian restaurant in Bahrain?',
    a: 'Masso at the Ritz-Carlton is widely considered Bahrain\'s finest Italian restaurant for its exceptional handmade pasta and fine dining experience. La Vinoteca in Adliya is perfect for wine lovers, while Villa Mamas offers wonderful Italian dishes in a charming garden setting.',
  },
  {
    q: 'Where can I find the best pizza in Bahrain?',
    a: 'For authentic Neapolitan-style pizza, try Dolce Vita in Juffair or Piatto in Seef. Villa Mamas serves excellent wood-fired pizza in their garden setting. For quick pizza, Vapiano at City Centre offers fresh options at budget prices.',
  },
  {
    q: 'Are there authentic Italian restaurants in Bahrain?',
    a: 'Yes! Dolce Vita, Trattoria, and La Vinoteca are known for authentic Italian cuisine. Many fine dining Italian restaurants like Masso import ingredients directly from Italy to ensure authenticity.',
  },
  {
    q: 'What are the best Italian restaurants for a romantic dinner in Bahrain?',
    a: 'Masso at Ritz-Carlton with its garden terrace, Il Terrazzo at Four Seasons with stunning bay views, and La Vinoteca in Adliya are all excellent romantic choices. Book terrace seating at sunset for the best experience.',
  },
  {
    q: 'Where can I find affordable Italian food in Bahrain?',
    a: 'Vapiano offers the most affordable fresh Italian food from BD 5-12 per person. Dolce Vita and Piatto offer great value mid-range options around BD 8-18 per person with authentic flavors.',
  },
];

export default function BestItalianRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Italian Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-italian-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🍝 Ultimate Italian Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-red-500 bg-clip-text text-transparent">
                Best Italian Restaurants
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From handmade pasta at Michelin-worthy Masso to authentic Neapolitan pizza — 
              your complete guide to the best Italian restaurants, wine bars, and trattorias in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-green-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '15+', icon: Utensils },
              { label: 'Budget From', value: 'BD 5', icon: DollarSign },
              { label: 'Fine Dining Options', value: '5+', icon: Award },
              { label: 'Wine Selections', value: '200+', icon: Wine },
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

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              Italian cuisine holds a special place in Bahrain&apos;s dining landscape. From elegant fine dining 
              establishments serving handmade pasta and imported truffles to cozy trattorias where pizza 
              emerges from wood-fired ovens, the Kingdom offers authentic Italian experiences for every taste and budget.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re craving a romantic dinner with perfectly paired wines, a family-friendly pizza 
              night, or a quick espresso with fresh pasta, this comprehensive guide will help you navigate 
              Bahrain&apos;s Italian dining scene like a local. Buon appetito!
            </p>
          </div>
        </div>
      </section>

      {/* Pasta Types Guide */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Classic Pasta Dishes to Try</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pastaTypes.map((pasta) => (
              <div key={pasta.type} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-green-400 mb-1">{pasta.type}</h3>
                <p className="text-xs text-gray-400 mb-2">{pasta.description}</p>
                <p className="text-xs text-red-300">Best at: {pasta.where}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Italian Restaurants in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive reviews covering pizza, pasta, wine, and authentic Italian experiences for 2026.
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
                        <Link href={`/restaurants/${restaurant.slug}`} className="hover:text-green-400 transition-colors">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        </Link>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-green-400 fill-green-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-green-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-green-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-green-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-green-400 italic pt-2">Best for: {restaurant.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Italian Dining Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-500/20 to-red-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Discover Italian Food Events</h2>
          <p className="text-gray-300 mb-6">
            Find wine tastings, Italian food festivals, and culinary events in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://bahrain.platinumlist.net/?affiliate=yjg3yzi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse Events on Platinumlist
            </a>
            <a 
              href="https://www.eventsbahrain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              EventsBahrain.com
            </a>
          </div>
        </div>
      </section>

      {/* Related Cuisine Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore More Cuisine Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Indian Restaurants', href: '/guides/best-indian-restaurants-bahrain', emoji: '🍛' },
              { title: 'Japanese & Sushi', href: '/guides/best-japanese-restaurants-bahrain', emoji: '🍣' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain', emoji: '🦐' },
              { title: 'Arabic & Lebanese', href: '/guides/best-arabic-restaurants-bahrain', emoji: '🥙' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain', emoji: '🍜' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain', emoji: '🥡' },
              { title: 'All Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
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
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Powered by <Link href="https://www.bahrainnights.com" className="text-green-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">CinematicWebWorks.com</a>
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
            headline: 'Best Italian Restaurants in Bahrain 2026',
            description: 'Complete guide to the best Italian restaurants in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-01',
            dateModified: lastUpdated,
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.bahrainnights.com/guides/best-italian-restaurants-bahrain' },
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
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
