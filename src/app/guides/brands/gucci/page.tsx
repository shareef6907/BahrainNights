import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Gucci Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Gucci stores in Bahrain. Complete guide to Gucci locations at Moda Mall and City Centre. Store hours, directions & tips for shopping Gucci in Bahrain.',
  keywords: 'Gucci Bahrain, Gucci store Bahrain, where to buy Gucci Bahrain, Gucci Moda Mall, Gucci bags Bahrain, Gucci City Centre Bahrain',
  openGraph: {
    title: 'Gucci Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Gucci stores in Bahrain. Complete guide to Gucci locations at Moda Mall and City Centre.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/gucci',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/gucci',
  },
};

const storeLocations = [
  {
    name: 'Gucci - Moda Mall',
    mall: 'Moda Mall (Bahrain World Trade Center)',
    address: 'Bahrain World Trade Center, King Faisal Highway, Manama',
    floor: 'Ground Floor',
    phone: '+973 1753 5500',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Handbags', 'Leather Goods', 'Ready-to-Wear', 'Shoes', 'Accessories', 'Eyewear', 'Watches', 'Jewelry', 'Fragrances'],
    features: ['Full collection', 'Exclusive items', 'Personal shopping'],
    mapsLink: 'https://www.google.com/maps/search/Gucci+Moda+Mall+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Gucci - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    phone: '+973 1717 2000',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Handbags', 'Leather Goods', 'Shoes', 'Accessories', 'Selected Ready-to-Wear'],
    features: ['Convenient location', 'Good selection', 'Extended weekend hours'],
    mapsLink: 'https://www.google.com/maps/search/Gucci+City+Centre+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'Know Your Lines',
    tip: 'Gucci has distinct lines - GG Marmont, Dionysus, Jackie, and Horsebit are iconic. Research what you want beforehand.',
  },
  {
    title: 'Check Both Locations',
    tip: 'Inventory varies between Moda Mall and City Centre. If you can\'t find your item, try the other store.',
  },
  {
    title: 'Sales Periods',
    tip: 'Gucci rarely discounts in-store but may have end-of-season sales. Ask about any current promotions.',
  },
  {
    title: 'VIP Program',
    tip: 'High-spending customers may qualify for Gucci\'s VIP program with early access to new collections.',
  },
];

const relatedBrands = [
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜' },
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄' },
  { name: 'Hermès', href: '/guides/brands/hermes', emoji: '🧣' },
];

const faqs = [
  {
    q: 'Is Gucci available in Bahrain?',
    a: 'Yes, Gucci has two boutiques in Bahrain - the flagship store at Moda Mall (Bahrain World Trade Center) and another location at City Centre Bahrain.',
  },
  {
    q: 'Which mall has Gucci in Bahrain?',
    a: 'Gucci is available at both Moda Mall (BWTC) and City Centre Bahrain. The Moda Mall location is the flagship with a larger selection.',
  },
  {
    q: 'Is Gucci cheaper in Bahrain than Europe?',
    a: 'Bahrain has no VAT, which can make items more affordable compared to European prices. However, prices are generally aligned with global pricing minus local taxes.',
  },
  {
    q: 'Does Gucci Bahrain have the latest collections?',
    a: 'Yes, both Gucci stores in Bahrain receive new collections shortly after global releases. The Moda Mall flagship typically gets the widest selection.',
  },
];

export default function GucciBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Gucci', url: 'https://www.bahrainnights.com/guides/brands/gucci' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-red-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🐍 Luxury Fashion
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-green-400">GUCCI</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded in Florence in 1921, Gucci is one of the world&apos;s leading luxury fashion brands. 
              Known for its eclectic contemporary style, iconic GG logo, and Italian craftsmanship, 
              Gucci offers fashion, leather goods, and accessories at two locations in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '2', icon: ShoppingBag },
              { label: 'Flagship', value: 'Moda Mall', icon: Star },
              { label: 'Also At', value: 'City Centre', icon: MapPin },
              { label: 'VAT', value: '0%', icon: Sparkles },
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

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Gucci Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Two boutiques serving the Kingdom of Bahrain.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-green-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-green-500 text-black text-xs font-bold rounded">
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
                      {store.phone && (
                        <p className="flex items-center gap-2 text-gray-300">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {store.phone}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Products Available:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-green-500/10 text-green-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Store locations may change. Please verify current location before visiting.
            </p>
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Gucci in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Luxury Brands in Bahrain</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBrands.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
                  {brand.name}
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

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other luxury brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/dior"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Dior Guide
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
            headline: 'Gucci Bahrain - Store Locations & Shopping Guide 2026',
            description: 'Find Gucci stores in Bahrain. Complete guide to Gucci locations at Moda Mall and City Centre.',
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
