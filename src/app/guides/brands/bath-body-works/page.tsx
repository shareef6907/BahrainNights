import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bath & Body Works Bahrain - Store Locations & Guide 2026',
  description: 'Find Bath & Body Works stores in Bahrain. Complete guide to BBW locations. Body care, candles, fragrances, and seasonal collections. Store hours & tips.',
  keywords: 'Bath and Body Works Bahrain, BBW Bahrain, Bath Body Works store Bahrain, candles Bahrain, body mist Bahrain, fragrance mist Bahrain',
  openGraph: {
    title: 'Bath & Body Works Bahrain - Store Locations & Guide 2026',
    description: 'Find Bath & Body Works stores in Bahrain. Complete guide to BBW locations.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/bath-body-works',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/bath-body-works',
  },
};

const storeLocations = [
  {
    name: 'Bath & Body Works - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Body Care', 'Hand Soaps', 'Candles', 'Home Fragrance', 'Fragrance Mists', 'Aromatherapy'],
    features: ['Largest store', 'Full collection', 'Seasonal products', 'Gift sets'],
    mapsLink: 'https://www.google.com/maps/search/Bath+Body+Works+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Bath & Body Works - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Body Care', 'Hand Soaps', 'Candles', 'Home Fragrance', 'Fragrance Mists'],
    features: ['Good selection', 'Popular scents'],
    mapsLink: 'https://www.google.com/maps/search/Bath+Body+Works+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Bath & Body Works - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Body Care', 'Hand Soaps', 'Candles', 'Home Fragrance', 'Fragrance Mists', 'Aromatherapy'],
    features: ['Modern store', 'Full range'],
    mapsLink: 'https://www.google.com/maps/search/Bath+Body+Works+Avenues+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Bath & Body Works - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Body Care', 'Hand Soaps', 'Candles', 'Home Fragrance', 'Fragrance Mists'],
    features: ['Beachfront mall', 'Premium location', 'Near Marassi Aquarium'],
    mapsLink: 'https://www.google.com/maps/search/Bath+Body+Works+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const popularScents = [
  'Japanese Cherry Blossom', 'A Thousand Wishes', 'Warm Vanilla Sugar', 
  'Into The Night', 'Gingham', 'Champagne Toast', 'Eucalyptus Spearmint',
  'Mahogany Teakwood', 'Sweet Pea', 'Paris Cafe'
];

const shoppingTips = [
  {
    title: 'Semi-Annual Sale',
    tip: 'The biggest sales happen twice yearly (January and June). Products go up to 75% off - but shop early for best selection.',
  },
  {
    title: 'Buy 3 Get 3 Free',
    tip: 'Regular promotions include B3G3 on body care. Mix and match your favorites. Stock up when offers run.',
  },
  {
    title: 'Candle Day',
    tip: 'Annual Candle Day (early December) offers 3-wick candles at major discounts. Expect crowds!',
  },
  {
    title: 'Rewards Program',
    tip: 'Sign up for the rewards program to earn points, get birthday rewards, and early access to sales.',
  },
];

const relatedBrands = [
  { name: 'Sephora', href: '/guides/brands/sephora', emoji: '💄' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '✨' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'IKEA', href: '/guides/brands/ikea', emoji: '🏠' },
];

const faqs = [
  {
    q: 'Where is Bath & Body Works in Bahrain?',
    a: 'Bath & Body Works has 4 stores in Bahrain - City Centre Bahrain (largest), Seef Mall, The Avenues Bahrain, and Marassi Galleria.',
  },
  {
    q: 'Does Bath & Body Works Bahrain have sales?',
    a: 'Yes, BBW has regular promotions including Buy 3 Get 3 Free, semi-annual sales (January & June), and special events like Candle Day.',
  },
  {
    q: 'What are the best Bath & Body Works scents?',
    a: 'Popular bestsellers include Japanese Cherry Blossom, A Thousand Wishes, Warm Vanilla Sugar, Into The Night, and Mahogany Teakwood (candles).',
  },
  {
    q: 'Does Bath & Body Works sell candles in Bahrain?',
    a: 'Yes, all stores carry the full candle collection including 3-wick candles, single wick candles, and candle accessories.',
  },
];

export default function BathBodyWorksBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Bath & Body Works', url: 'https://www.bahrainnights.com/guides/brands/bath-body-works' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🛁 Body Care & Home
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-purple-400">Bath & Body Works</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              America&apos;s favorite destination for body care and home fragrance. 
              From signature scent collections to iconic 3-wick candles, Bath & Body Works 
              brings delightful fragrances to Bahrain at multiple locations.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '4+', icon: ShoppingBag },
              { label: 'Flagship', value: 'City Centre', icon: Star },
              { label: 'Candles', value: '3-Wick', icon: Sparkles },
              { label: 'Sales', value: 'B3G3', icon: Info },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Bath & Body Works Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest BBW location.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-purple-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <p className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {store.address}
                      </p>
                      <p className="flex items-center gap-2 text-gray-300">
                        <Info className="w-4 h-4 text-gray-500" />
                        {store.floor}
                      </p>
                      <p className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {store.hours}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:min-w-[200px]">
                    <a 
                      href={store.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Scents */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Popular Scents</h2>
          <p className="text-gray-400 mb-8">Bestselling fragrances you&apos;ll find at Bath & Body Works Bahrain.</p>
          
          <div className="flex flex-wrap gap-3">
            {popularScents.map((scent) => (
              <span key={scent} className="px-4 py-2 bg-white/5 text-white rounded-full text-sm hover:bg-purple-500/20 transition-colors">
                {scent}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping at Bath & Body Works Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Brands in Bahrain</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBrands.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
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

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other lifestyle brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/sephora"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition-colors"
            >
              Sephora Guide
            </Link>
            <Link 
              href="/guides"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Guides
            </Link>
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
            headline: 'Bath & Body Works Bahrain - Store Locations & Guide 2026',
            description: 'Find Bath & Body Works stores in Bahrain. Complete guide to BBW locations.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
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
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
