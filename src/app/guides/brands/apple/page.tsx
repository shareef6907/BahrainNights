import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info, Monitor
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Apple Store Bahrain - Authorized Resellers & Shopping Guide 2026',
  description: 'Find Apple products in Bahrain. Complete guide to Apple authorized resellers including iMachines, iWorld, Virgin Megastore & Lulu. iMacBook, iPad locations.',
  keywords: 'Apple Store Bahrain, Apple authorized reseller Bahrain, buy iPhone Bahrain, MacBook Bahrain, iPad Bahrain, iMachines Bahrain, iWorld Bahrain, Apple products Bahrain',
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
    name: 'iMachines - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    website: 'https://imachines.bh',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories', 'AppleCare'],
    features: ['Apple Authorized Reseller', 'Apple Authorized Service Centre', 'Full product range', 'Trade-in service', 'Business solutions'],
    mapsLink: 'https://www.google.com/maps/search/iMachines+City+Centre+Bahrain',
    isPrimary: true,
    type: 'Authorized Reseller & Service Centre',
  },
  {
    name: 'iMachines - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    website: 'https://imachines.bh',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'],
    features: ['Apple Authorized Reseller', 'Good selection', 'Service support'],
    mapsLink: 'https://www.google.com/maps/search/iMachines+Seef+Mall+Bahrain',
    isPrimary: false,
    type: 'Authorized Reseller',
  },
  {
    name: 'iWorld - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    website: 'https://iworld.bh',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'],
    features: ['Apple Authorized Reseller', 'Modern store', 'Full range', 'Trade-in available'],
    mapsLink: 'https://www.google.com/maps/search/iWorld+Avenues+Bahrain',
    isPrimary: true,
    type: 'Authorized Reseller',
  },
  {
    name: 'iWorld - Bahrain City Centre',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    website: 'https://iworld.bh',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'],
    features: ['Apple Authorized Reseller', 'Workshop services', 'Financing available'],
    mapsLink: 'https://www.google.com/maps/search/iWorld+City+Centre+Bahrain',
    isPrimary: false,
    type: 'Authorized Reseller',
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
    tip: 'Bahrain doesn\'t have an official Apple Store. iMachines and iWorld are Apple Authorized Resellers with the best selection and support.',
  },
  {
    title: 'Service & Repairs',
    tip: 'iMachines is an Apple Authorized Service Centre - they can handle repairs and AppleCare services.',
  },
  {
    title: 'Trade-In Programs',
    tip: 'Both iMachines and iWorld offer trade-in for old Apple devices. Check their current promotions for upgrade deals.',
  },
  {
    title: 'Price Comparison',
    tip: 'Compare prices between iMachines, iWorld, Virgin, Lulu, and Jarir. Promotions vary by retailer.',
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
    a: 'No, Bahrain doesn\'t have an official Apple Store. However, iMachines and iWorld operate as Apple Authorized Resellers with multiple locations offering the full Apple product range and services.',
  },
  {
    q: 'Where can I buy iPhone in Bahrain?',
    a: 'You can buy iPhone from iMachines and iWorld (Apple Authorized Resellers) at City Centre, Seef Mall, and The Avenues. Also available at Virgin Megastore, Lulu Hypermarket, and Jarir Bookstore.',
  },
  {
    q: 'Where can I get Apple repairs in Bahrain?',
    a: 'iMachines is an Apple Authorized Service Centre and can handle official Apple repairs and AppleCare services.',
  },
  {
    q: 'Are Apple products cheaper in Bahrain?',
    a: 'Apple products in Bahrain are generally aligned with regional Apple pricing. Prices are comparable to Dubai and other GCC countries.',
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
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides/brands' },
          { name: 'Apple', url: 'https://www.bahrainnights.com/guides/brands/apple' },
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/guides/brands" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            ← Back to Brand Guides
          </Link>
          
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-medium mb-4">
              Shopping Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">Apple</span>
              <span className="text-gray-400"> in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your complete guide to Apple authorized resellers in Bahrain. Find iMacBook, iPad and more at iMachines, iWorld, and other retailers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Authorized Resellers', value: '2', icon: ShoppingBag },
              { label: 'Store Locations', value: '4+', icon: MapPin },
              { label: 'Service Centre', value: '1', icon: Monitor },
              { label: 'Other Retailers', value: '3+', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Stores Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Apple Authorized Resellers</h2>
          <div className="grid gap-6">
            {storeLocations.map((store, index) => (
              <div key={index} className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border ${store.isPrimary ? 'border-gray-400/30' : 'border-white/10'}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{store.name}</h3>
                        <p className="text-gray-400">{store.mall}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                          {store.type}
                        </span>
                      </div>
                      {store.isPrimary && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {store.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {store.hours}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {store.features.map((feature) => (
                        <span key={feature} className="px-2 py-1 bg-gray-500/10 text-gray-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href={store.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        View on Maps
                      </a>
                      {store.website && (
                        <a 
                          href={store.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Resellers */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Other Apple Retailers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {otherResellers.map((reseller, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-white mb-1">{reseller.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{reseller.location}</p>
                <p className="text-xs text-gray-500 mb-3">{reseller.products.join(', ')}</p>
                <a 
                  href={reseller.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm inline-flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" /> Find Location
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Shopping Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((tip, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-400">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Brand Guides</h2>
          <div className="flex flex-wrap gap-3">
            {relatedBrands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
              >
                <span>{brand.emoji}</span>
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="py-8 px-4 text-center text-gray-500 text-sm">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
}
