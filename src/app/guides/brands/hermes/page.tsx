import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Hermès Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Hermès stores in Bahrain. Complete guide to Hermès at Moda Mall. Birkin bags, scarves, leather goods & more. Store hours, directions & shopping tips.',
  keywords: 'Hermès Bahrain, Hermes Bahrain, Hermès store Bahrain, Birkin bag Bahrain, Hermès Moda Mall, Hermès scarf Bahrain',
  openGraph: {
    title: 'Hermès Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Hermès stores in Bahrain. Complete guide to Hermès at Moda Mall.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/hermes',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/hermes',
  },
};

const storeLocations = [
  {
    name: 'Hermès - Moda Mall',
    mall: 'Moda Mall (Bahrain World Trade Center)',
    address: 'Bahrain World Trade Center, King Faisal Highway, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Leather Goods', 'Silk Scarves', 'Ready-to-Wear', 'Accessories', 'Shoes', 'Watches', 'Jewelry', 'Fragrances', 'Home'],
    features: ['Full collection', 'Exclusive pieces', 'Personal shopping by appointment'],
    mapsLink: 'https://www.google.com/maps/search/Hermes+Moda+Mall+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Hermès - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Road 6403, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Leather Goods', 'Silk Scarves', 'Ready-to-Wear', 'Accessories', 'Shoes', 'Fragrances'],
    features: ['Beachfront luxury mall', 'Premium boutique', 'Near Address Hotel'],
    mapsLink: 'https://www.google.com/maps/search/Hermes+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'Build a Relationship',
    tip: 'Hermès values long-term customer relationships. Regular purchases and a consistent sales associate can help with access to limited items.',
  },
  {
    title: 'Birkin & Kelly Reality',
    tip: 'These iconic bags aren\'t displayed openly. You\'ll need to build a purchase history and express interest. Waitlists are long worldwide.',
  },
  {
    title: 'Start with Classics',
    tip: 'Silk scarves, belts, and small leather goods are accessible ways to start your Hermès collection.',
  },
  {
    title: 'Appointment Shopping',
    tip: 'For a more personalized experience, request an appointment with a dedicated sales associate.',
  },
];

const relatedBrands = [
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤' },
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜' },
  { name: 'Gucci', href: '/guides/brands/gucci', emoji: '🐍' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄' },
];

const faqs = [
  {
    q: 'Is Hermès available in Bahrain?',
    a: 'Yes, Hermès has two boutiques in Bahrain - the flagship at Moda Mall (Bahrain World Trade Center) and a new location at Marassi Galleria in Diyar Al Muharraq, offering leather goods, silk scarves, fashion, accessories, and fragrances.',
  },
  {
    q: 'Can I buy a Birkin bag in Bahrain?',
    a: 'Hermès Bahrain occasionally has Birkin and Kelly bags, but availability is extremely limited. Building a purchase history with the boutique increases your chances of being offered one.',
  },
  {
    q: 'Is Hermès cheaper in Bahrain?',
    a: 'Hermès maintains consistent global pricing across all markets. Prices in Bahrain are generally comparable to Dubai and other GCC countries.',
  },
  {
    q: 'What is the most affordable Hermès item?',
    a: 'Hermès fragrances, enamel bracelets, and twilly scarves are entry-level items starting from around BD 50-100. Silk scarves start around BD 150.',
  },
];

export default function HermesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Hermès', url: 'https://www.bahrainnights.com/guides/brands/hermes' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-amber-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🧣 Luxury Craftsmanship
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-orange-400">HERMÈS</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded in Paris in 1837 as a harness workshop, Hermès has become the epitome 
              of luxury craftsmanship. Famous for the Birkin and Kelly bags, silk scarves, 
              and impeccable quality, Hermès offers a curated experience at its Bahrain boutique.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Boutiques', value: '2', icon: ShoppingBag },
              { label: '', value: 'Moda Mall', icon: MapPin },
              { label: '', value: 'Marassi Galleria', icon: MapPin },
              { label: 'Since', value: '1837', icon: Sparkles },
            ].map((stat, index) => (
              <div key={`${stat.value}-${index}`} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.label && <div className="text-sm text-gray-400">{stat.label}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Hermès Boutiques in Bahrain</h2>
          <p className="text-gray-400 mb-8">Two exclusive Hermès boutiques in Bahrain.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-orange-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-orange-500 text-black text-xs font-bold rounded">
                          EXCLUSIVE
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
                      <p className="text-sm text-gray-500 mb-2">Products Available:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-orange-500/10 text-orange-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Hermès in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{item.title}</h3>
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
                <span className="font-medium group-hover:text-orange-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other luxury brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/chanel"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
            >
              Chanel Guide
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
            headline: 'Hermès Bahrain - Store Locations & Shopping Guide 2026',
            description: 'Find Hermès stores in Bahrain. Complete guide to Hermès at Moda Mall.',
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
