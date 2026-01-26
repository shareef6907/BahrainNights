import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info, Monitor
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Apple Store Bahrain - Authorized Resellers & Shopping Guide 2026',
  description: 'Find Apple products in Bahrain. Complete guide to Apple authorized resellers including iStyle, Virgin Megastore & Lulu. iPhone, MacBook, iPad locations.',
  keywords: 'Apple Store Bahrain, Apple authorized reseller Bahrain, buy iPhone Bahrain, MacBook Bahrain, iPad Bahrain, iStyle Bahrain, Apple products Bahrain',
  openGraph: {
    title: 'Apple Store Bahrain - Authorized Resellers & Shopping Guide 2026',
    description: 'Find Apple products in Bahrain. Complete guide to Apple authorized resellers.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/apple',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/apple',
  },
};

const storeLocations = [
  {
    name: 'iStyle - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    phone: '+973 1717 8600',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories', 'AppleCare'],
    features: ['Apple Premium Reseller', 'Full product range', 'Technical support', 'Trade-in service'],
    mapsLink: 'https://www.google.com/maps/search/iStyle+City+Centre+Bahrain',
    isPrimary: true,
    type: 'Premium Reseller',
  },
  {
    name: 'iStyle - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    phone: '+973 1711 6500',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'],
    features: ['Apple Premium Reseller', 'Modern store', 'Full range'],
    mapsLink: 'https://www.google.com/maps/search/iStyle+Avenues+Bahrain',
    isPrimary: false,
    type: 'Premium Reseller',
  },
  {
    name: 'iStyle - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'],
    features: ['Apple Premium Reseller', 'Good selection'],
    mapsLink: 'https://www.google.com/maps/search/iStyle+Seef+Mall+Bahrain',
    isPrimary: false,
    type: 'Premium Reseller',
  },
  {
    name: 'iStyle - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'],
    features: ['Apple Premium Reseller', 'Beachfront mall', 'Near Marassi Aquarium'],
    mapsLink: 'https://www.google.com/maps/search/iStyle+Marassi+Galleria+Bahrain',
    isPrimary: false,
    type: 'Premium Reseller',
  },
];

const otherResellers = [
  {
    name: 'Virgin Megastore',
    location: 'City Centre Bahrain',
    products: ['iPhone', 'iPad', 'AirPods', 'Accessories'],
    type: 'Authorized Reseller',
    mapsLink: 'https://www.google.com/maps/search/Virgin+Megastore+City+Centre+Bahrain',
  },
  {
    name: 'Lulu Hypermarket',
    location: 'Multiple locations',
    products: ['iPhone', 'iPad', 'AirPods', 'Accessories'],
    type: 'Authorized Reseller',
    mapsLink: 'https://www.google.com/maps/search/Lulu+Hypermarket+Bahrain',
  },
  {
    name: 'Jarir Bookstore',
    location: 'Multiple locations',
    products: ['MacBook', 'iPad', 'iPhone', 'Accessories'],
    type: 'Authorized Reseller',
    mapsLink: 'https://www.google.com/maps/search/Jarir+Bookstore+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'No Official Apple Store',
    tip: 'Bahrain doesn\'t have an official Apple Store. iStyle is the Apple Premium Reseller with the best selection and support.',
  },
  {
    title: 'AppleCare+',
    tip: 'Purchase AppleCare+ at the time of buying your device. iStyle can help set it up immediately.',
  },
  {
    title: 'Trade-In Programs',
    tip: 'iStyle offers trade-in for old Apple devices. Check their current promotions for upgrade deals.',
  },
  {
    title: 'Price Comparison',
    tip: 'Compare prices between iStyle, Virgin, Lulu, and Jarir. Promotions vary by retailer.',
  },
];

const relatedBrands = [
  { name: 'IKEA', href: '/guides/brands/ikea', emoji: '🏠' },
  { name: 'Sephora', href: '/guides/brands/sephora', emoji: '💄' },
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
];

const faqs = [
  {
    q: 'Is there an official Apple Store in Bahrain?',
    a: 'No, Bahrain doesn\'t have an official Apple Store. However, iStyle operates as an Apple Premium Reseller with multiple locations offering the full Apple product range and services.',
  },
  {
    q: 'Where can I buy iPhone in Bahrain?',
    a: 'You can buy iPhone from iStyle (Apple Premium Reseller) at City Centre, Seef Mall, The Avenues, and Marassi Galleria. Also available at Virgin Megastore, Lulu Hypermarket, and Jarir Bookstore.',
  },
  {
    q: 'Can I get AppleCare in Bahrain?',
    a: 'Yes, AppleCare+ is available for purchase at iStyle stores. They can also help with Apple service and repairs as an authorized service provider.',
  },
  {
    q: 'Are Apple products cheaper in Bahrain?',
    a: 'Bahrain has 0% VAT, which can make Apple products slightly cheaper than high-tax countries. However, prices are generally aligned with regional Apple pricing.',
  },
];

export default function AppleBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Apple', url: 'https://www.bahrainnights.com/guides/brands/apple' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-black/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-medium mb-4">
              📱 Technology
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-gray-200">Apple</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              While Bahrain doesn&apos;t have an official Apple Store, you can find the 
              complete range of Apple products at authorized resellers. iStyle is the 
              Apple Premium Reseller with multiple locations offering sales, support, and service.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'iStyle Stores', value: '4+', icon: ShoppingBag },
              { label: 'Premium Reseller', value: 'iStyle', icon: Star },
              { label: 'Other Resellers', value: '3+', icon: Monitor },
              { label: 'VAT', value: '0%', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iStyle Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">iStyle - Apple Premium Reseller</h2>
          <p className="text-gray-400 mb-8">The best place to buy Apple products in Bahrain.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">{store.name}</h3>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-200 text-xs font-medium rounded">
                        {store.type}
                      </span>
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
                          <span key={product} className="px-2 py-1 bg-gray-700/50 text-gray-200 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
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

      {/* Other Resellers */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Other Authorized Resellers</h2>
          <p className="text-gray-400 mb-8">More places to buy Apple products in Bahrain.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {otherResellers.map((retailer) => (
              <div key={retailer.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-white mb-1">{retailer.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{retailer.type}</p>
                <p className="text-sm text-gray-400 mb-3">{retailer.location}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {retailer.products.map((product) => (
                    <span key={product} className="px-2 py-1 bg-white/10 text-xs rounded">
                      {product}
                    </span>
                  ))}
                </div>
                <a 
                  href={retailer.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:underline flex items-center gap-1"
                >
                  Find on Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Buying Apple in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
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
                <span className="font-medium group-hover:text-white transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-gray-800/20 to-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other lifestyle brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/ikea"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              IKEA Guide
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
            headline: 'Apple Store Bahrain - Authorized Resellers & Shopping Guide 2026',
            description: 'Find Apple products in Bahrain. Complete guide to Apple authorized resellers.',
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
