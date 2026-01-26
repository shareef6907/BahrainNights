import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShoppingBag, Clock, MapPin, Star,
  ArrowRight, DollarSign, Car
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Malls in Bahrain 2026 | Shopping Guide & Mall Directory',
  description: 'Discover the best malls in Bahrain! Complete guide to Marassi Galleria, City Centre, Seef Mall, The Avenues & more. Find brands, dining, entertainment.',
  keywords: 'malls in Bahrain, shopping Bahrain, Marassi Galleria, City Centre Bahrain, Seef Mall, The Avenues Bahrain, Moda Mall, shopping centers Bahrain',
  openGraph: {
    title: 'Best Malls in Bahrain 2025 | Shopping Guide & Mall Directory',
    description: 'Your complete guide to shopping malls in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls',
  },
};

const malls = [
  {
    name: 'City Centre Bahrain',
    location: 'Seef District',
    type: 'Mega Mall',
    rating: 5,
    size: '185,000 sqm',
    stores: '340+ stores',
    description: 'Bahrain\'s largest and most popular mall with world-class shopping, dining, and entertainment including Wahooo! Waterpark, Magic Planet, and Yalla! Bowling.',
    highlights: ['Wahooo! Waterpark', 'Magic Planet', 'Yalla! Bowling', 'VOX Cinemas', 'Carrefour Hypermarket'],
    brands: ['Zara', 'H&M', 'Marks & Spencer', 'Apple', 'Nike', 'Sephora', 'Virgin Megastore'],
    dining: 'Food court + 50+ restaurants',
    parking: '7,000+ spaces (free)',
    hours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    bestFor: 'One-stop shopping, families, entertainment',
    href: '/guides/malls/city-centre-bahrain',
  },
  {
    name: 'Seef Mall',
    location: 'Seef District',
    type: 'Premium Mall',
    rating: 5,
    size: '135,000 sqm',
    stores: '250+ stores',
    description: 'Bahrain\'s first authentic mall and premier family shopping destination, known for distinctive architecture and excellent mix of brands and entertainment.',
    highlights: ['Geant Hypermarket', 'Magic Island', 'Cinema complex', 'Fashion galleries'],
    brands: ['Massimo Dutti', 'Mango', 'Next', 'Pottery Barn', 'Crate & Barrel', 'Bath & Body Works'],
    dining: 'Food court + restaurants',
    parking: '5,000+ spaces (free)',
    hours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    bestFor: 'Family shopping, mid-range brands',
    href: '/guides/malls/seef-mall',
  },
  {
    name: 'Marassi Galleria',
    location: 'Diyar Al Muharraq',
    type: 'Luxury Mall',
    rating: 5,
    size: '200,000 sqm',
    stores: '400+ stores',
    description: 'Bahrain\'s premier beachfront luxury destination featuring high-end brands, the Kingdom\'s largest aquarium, diverse dining, and connected to 5-star hotels.',
    highlights: ['Marassi Aquarium', 'Beachfront location', 'Luxury brands', 'VOX Cinemas', 'Connected to Address Hotel'],
    brands: ['Al Fardan Jewellery', 'Aigner', 'ALDO', 'Ajmal Perfumes', 'AZADEA brands'],
    dining: 'Premium restaurants + international cuisine',
    parking: 'Covered parking (free)',
    hours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    bestFor: 'Luxury shopping, beachfront dining, family entertainment',
    href: null,
  },
  {
    name: 'The Avenues Bahrain',
    location: 'Bahrain Bay',
    type: 'Lifestyle Mall',
    rating: 5,
    size: '40,000 sqm',
    stores: '130+ stores',
    description: 'Premium waterfront lifestyle destination along 1.5km seafront with stunning Bahrain Bay views, luxury brands, Below Zero ice skating rink, and VOX Cinemas.',
    highlights: ['Below Zero Ice Rink', 'Bahrain Bay waterfront', 'VOX Cinemas', 'Outdoor promenade', '50% restaurants/cafes'],
    brands: ['Christian Dior', 'Swarovski', 'H&M', 'Cheesecake Factory', 'Shake Shack'],
    dining: 'Premium restaurants + waterfront cafes',
    parking: '4,000+ spaces',
    hours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    bestFor: 'Waterfront dining, ice skating, cinema',
    href: '/guides/malls/the-avenues',
  },
  {
    name: 'Moda Mall',
    location: 'Bahrain World Trade Centre',
    type: 'Luxury Mall',
    rating: 5,
    size: '45,000 sqm',
    stores: '90+ stores',
    description: 'Bahrain\'s premier luxury shopping destination housed in the iconic World Trade Centre, featuring the Kingdom\'s largest portfolio of high-end fashion and jewelry brands.',
    highlights: ['BWTC location', 'Luxury fashion', '50+ jewelry brands', 'Premium dining'],
    brands: ['Louis Vuitton', 'Dior', 'Gucci', 'Bvlgari', 'Rolex', 'Cartier'],
    dining: 'Premium restaurants + cafes',
    parking: 'BWTC parking (paid)',
    hours: 'Sat-Thu 10AM-10PM, Fri 2PM-10PM',
    bestFor: 'Luxury shopping, business travelers',
    href: '/guides/malls/moda-mall',
  },
  {
    name: 'Bahrain Mall',
    location: 'Sanabis',
    type: 'Community Mall',
    rating: 4,
    size: '70,000 sqm',
    stores: '120+ stores',
    description: 'Popular family-friendly mall with good value shopping, a large Carrefour hypermarket, and family entertainment including Fun Zone for kids.',
    highlights: ['Carrefour Hypermarket', 'Fun Zone', 'Family dining', 'Budget fashion'],
    brands: ['Centrepoint', 'Max', 'Splash', 'Home Centre', 'LC Waikiki'],
    dining: 'Food court + restaurants',
    parking: '1,600+ spaces (free)',
    hours: 'Sat-Wed 9AM-10PM, Thu-Fri 9AM-11PM',
    bestFor: 'Budget shopping, families with kids',
    href: '/guides/malls/bahrain-mall',
  },
  {
    name: 'Oasis Mall',
    location: 'Juffair',
    type: 'Community Mall',
    rating: 4,
    size: '35,000 sqm',
    stores: '80+ stores',
    description: 'Convenient neighborhood mall in Juffair with everyday shopping, dining, and services.',
    highlights: ['Cinema', 'Supermarket', 'Fitness center', 'Kids play area'],
    brands: ['Lifestyle', 'Shoe Mart', 'Sports Corner', 'Claire\'s'],
    dining: 'Food court + casual dining',
    parking: '1,500+ spaces (free)',
    hours: 'Sat-Wed 9AM-10PM, Thu-Fri 9AM-11PM',
    bestFor: 'Juffair residents, quick shopping',
    href: null,
  },
  {
    name: 'Enma Mall',
    location: 'Riffa',
    type: 'Community Mall',
    rating: 4,
    size: '30,000 sqm',
    stores: '70+ stores',
    description: 'Riffa\'s main shopping destination serving the southern communities with family-friendly shopping and entertainment.',
    highlights: ['Fun City', 'Supermarket', 'Fashion stores', 'Family dining'],
    brands: ['Centrepoint', 'Mothercare', 'Payless', 'Claire\'s'],
    dining: 'Food court',
    parking: '2,000+ spaces (free)',
    hours: 'Sat-Wed 9AM-10PM, Thu-Fri 9AM-11PM',
    bestFor: 'Riffa residents, family shopping',
    href: null,
  },
  {
    name: 'Dragon City',
    location: 'Diyar Al Muharraq',
    type: 'Wholesale Mall',
    rating: 4,
    size: '70,000 sqm',
    stores: '800+ shops',
    description: 'Bahrain\'s largest wholesale market featuring Chinese goods at bargain prices - electronics, fashion, home goods, and more.',
    highlights: ['800+ wholesale shops', 'Bargain prices', 'Bulk buying', 'Chinese products'],
    brands: 'Various wholesale vendors',
    dining: 'Chinese restaurants + food stalls',
    parking: '3,000+ spaces (free)',
    hours: 'Sat-Thu 10AM-10PM, Fri 4PM-10PM',
    bestFor: 'Bargain hunting, bulk buying, electronics',
    href: null,
  },
];

const shoppingTips = [
  {
    title: 'Sale Seasons',
    content: 'Major sales happen during Dubai Shopping Festival (Jan-Feb), Ramadan, and year-end. Shop Bahrain runs Feb-Mar with great deals.',
  },
  {
    title: 'Tax Free',
    content: 'Bahrain has no sales tax (VAT-free), making it great value compared to UAE. What you see is what you pay.',
  },
  {
    title: 'Best Days',
    content: 'Weekday mornings are quietest. Friday afternoons and weekends are busiest. Ramadan hours differ.',
  },
  {
    title: 'Gold Shopping',
    content: 'For gold jewelry, visit Gold City in Manama Souq for traditional shopping with negotiation. Malls have fixed prices.',
  },
];

const mallsByCategory = [
  { category: 'Luxury Shopping', malls: ['Marassi Galleria', 'Moda Mall', 'The Avenues'] },
  { category: 'Family Entertainment', malls: ['City Centre', 'Marassi Galleria'] },
  { category: 'Budget Shopping', malls: ['Dragon City', 'Bahrain Mall'] },
  { category: 'Beachfront/Waterfront', malls: ['Marassi Galleria', 'The Avenues'] },
];

export default function MallsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🛍️ Shopping Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Best Malls
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From luxury boutiques to bargain finds — discover Bahrain's best shopping 
              malls, entertainment centers, and retail destinations.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Malls', value: '9+', icon: ShoppingBag },
              { label: 'Total Stores', value: '2,000+', icon: Star },
              { label: 'VAT Rate', value: '0%', icon: DollarSign },
              { label: 'Free Parking', value: 'Most Malls', icon: Car },
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

      {/* Quick Pick by Category */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Quick Pick by Category</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {mallsByCategory.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-pink-400 mb-2">{cat.category}</h3>
                <p className="text-sm text-gray-300">{cat.malls.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Malls List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">All Malls in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete directory of shopping malls with hours, brands, and facilities.
          </p>
          
          <div className="space-y-6">
            {malls.map((mall) => (
              <div 
                key={mall.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {mall.href ? (
                          <Link href={mall.href} className="hover:text-pink-400 transition-colors">
                            <h3 className="text-xl font-bold">{mall.name}</h3>
                          </Link>
                        ) : (
                          <h3 className="text-xl font-bold">{mall.name}</h3>
                        )}
                        <p className="text-pink-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {mall.location} • {mall.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(mall.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-pink-400 fill-pink-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{mall.stores}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{mall.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mall.highlights.map((h) => (
                        <span key={h} className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-400 mb-2">
                      <strong>Popular Brands:</strong> {typeof mall.brands === 'string' ? mall.brands : mall.brands.join(', ')}
                    </p>
                    
                    {mall.href && (
                      <Link 
                        href={mall.href}
                        className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm font-medium mt-2"
                      >
                        View Complete Guide <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Size:</strong> {mall.size}</p>
                    <p><strong className="text-gray-400">Dining:</strong> {mall.dining}</p>
                    <p><strong className="text-gray-400">Parking:</strong> {mall.parking}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {mall.hours}</p>
                    <p className="text-pink-400 italic pt-2">Best for: {mall.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Shopping Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shoppingTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-gray-300 mb-8">
            Explore traditional markets and unique shopping experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/souks"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors"
            >
              Traditional Souks
            </Link>
            <Link 
              href="/places?category=shopping"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Shopping Venues
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
              { title: 'Traditional Souks', href: '/guides/souks', emoji: '🏺' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">
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
                q: 'What is the biggest mall in Bahrain?',
                a: 'City Centre Bahrain is the largest mall with 185,000 sqm of retail space, 340+ stores, and entertainment including Wahooo! Waterpark and Magic Planet.',
              },
              {
                q: 'Which mall has the best luxury brands in Bahrain?',
                a: 'The Avenues Bahrain and Moda Mall are the top destinations for luxury brands including Louis Vuitton, Gucci, Dior, Prada, and Chanel.',
              },
              {
                q: 'Is there VAT on shopping in Bahrain?',
                a: 'Bahrain has 0% VAT on retail shopping (as of 2025), making it excellent value compared to UAE\'s 5% VAT. What you see is what you pay.',
              },
              {
                q: 'What are mall hours in Bahrain?',
                a: 'Most malls open 10AM-10PM Saturday-Wednesday, and 10AM-12AM on Thursday-Friday. Some malls have different Friday afternoon hours.',
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
            headline: 'Best Malls in Bahrain 2025 | Shopping Guide & Mall Directory',
            description: 'Complete guide to shopping malls in Bahrain including City Centre, Seef Mall, The Avenues, and more.',
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
              '@id': 'https://bahrainnights.com/guides/malls',
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
                name: 'What is the biggest mall in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'City Centre Bahrain is the largest mall with 185,000 sqm of retail space and 340+ stores.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which mall has the best luxury brands in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Avenues Bahrain and Moda Mall are the top destinations for luxury brands.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there VAT on shopping in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain has 0% VAT on retail shopping, making it excellent value compared to other Gulf countries.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
