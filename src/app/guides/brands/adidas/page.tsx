import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Adidas Bahrain - All Store Locations & Shopping Guide 2026',
  description: 'Find Adidas stores in Bahrain. Complete guide to Adidas locations at City Centre, Seef Mall, The Avenues & more. Store hours, directions & shopping tips.',
  keywords: 'Adidas Bahrain, Adidas store Bahrain, Adidas City Centre Bahrain, Adidas shoes Bahrain, where to buy Adidas Bahrain, Adidas Originals Bahrain',
  openGraph: {
    title: 'Adidas Bahrain - All Store Locations & Shopping Guide 2026',
    description: 'Find Adidas stores in Bahrain. Complete guide to Adidas locations across the Kingdom.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/adidas',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/adidas',
  },
};

const storeLocations = [
  {
    name: 'Adidas - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Running', 'Football', 'Training', 'Originals', 'Lifestyle', 'Kids', 'Apparel'],
    features: ['Largest Adidas store', 'Originals section', 'Full collection'],
    mapsLink: 'https://www.google.com/maps/search/Adidas+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Adidas - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Running', 'Training', 'Lifestyle', 'Apparel', 'Kids'],
    features: ['Good selection', 'Popular location'],
    mapsLink: 'https://www.google.com/maps/search/Adidas+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Adidas - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Running', 'Football', 'Training', 'Originals', 'Lifestyle', 'Apparel'],
    features: ['Modern store', 'Good Originals selection'],
    mapsLink: 'https://www.google.com/maps/search/Adidas+Avenues+Bahrain',
    isPrimary: false,
  },
];

const multiRetailers = [
  {
    name: 'Sun & Sand Sports',
    location: 'Multiple locations',
    products: ['Adidas sports', 'Running', 'Football'],
    mapsLink: 'https://www.google.com/maps/search/Sun+Sand+Sports+Bahrain',
  },
  {
    name: 'Sports Corner',
    location: 'City Centre Bahrain',
    products: ['Adidas football', 'Sports equipment'],
    mapsLink: 'https://www.google.com/maps/search/Sports+Corner+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'Adidas Membership',
    tip: 'Join adiClub for free to earn points on purchases, get early access to drops, and receive member-only offers.',
  },
  {
    title: 'Originals vs Performance',
    tip: 'Adidas Originals (lifestyle/streetwear) and Performance (sports) are different lines. City Centre has both.',
  },
  {
    title: 'Collaborations',
    tip: 'Limited edition collabs with Yeezy, Pharrell, and others sell out fast. Follow Adidas social media for drops.',
  },
  {
    title: 'Football Specialists',
    tip: 'For football boots and gear, the City Centre store has the best selection including Predator and X models.',
  },
];

const relatedBrands = [
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟' },
  { name: 'Uniqlo', href: '/guides/brands/uniqlo', emoji: '🧥' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'Crocs', href: '/guides/brands/crocs', emoji: '🐊' },
];

const faqs = [
  {
    q: 'How many Adidas stores are there in Bahrain?',
    a: 'Adidas has 4 dedicated stores in Bahrain - City Centre Bahrain (flagship), Seef Mall, The Avenues Bahrain, and Marassi Galleria. Adidas products are also available at multi-brand retailers.',
  },
  {
    q: 'Which is the biggest Adidas store in Bahrain?',
    a: 'The City Centre Bahrain Adidas store is the largest and serves as the flagship, with comprehensive Originals and Performance collections.',
  },
  {
    q: 'Does Adidas Bahrain sell Yeezy?',
    a: 'Yeezy availability varies. Check with the City Centre flagship or follow Adidas Bahrain social media for limited release announcements.',
  },
  {
    q: 'Can I find Adidas Originals in Bahrain?',
    a: 'Yes, the City Centre and The Avenues stores have dedicated Adidas Originals sections with Stan Smith, Superstar, Samba, and other lifestyle classics.',
  },
];

export default function AdidasBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Adidas', url: 'https://www.bahrainnights.com/guides/brands/adidas' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              ⚽ Sportswear
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">ADIDAS</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              &quot;Impossible Is Nothing&quot; - Adidas is the largest sportswear manufacturer in Europe, 
              founded in 1949. From the iconic three stripes to collaborations with top athletes 
              and designers, Adidas offers performance and lifestyle products across Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Adidas Stores', value: '4+', icon: ShoppingBag },
              { label: 'Flagship', value: 'City Centre', icon: Star },
              { label: 'Originals', value: 'Available', icon: Sparkles },
              { label: 'Multi-Retail', value: '2+', icon: Info },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/70" />
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
          <h2 className="text-3xl font-bold mb-4">Adidas Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Adidas location.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-white text-black text-xs font-bold rounded">
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
                          <span key={product} className="px-2 py-1 bg-white/10 text-white text-xs rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
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

      {/* Multi-Retailers */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Other Adidas Retailers</h2>
          <p className="text-gray-400 mb-8">Find Adidas at these multi-brand stores.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {multiRetailers.map((retailer) => (
              <div key={retailer.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-white mb-2">{retailer.name}</h3>
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
                  className="text-sm text-white hover:underline flex items-center gap-1"
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Adidas in Bahrain</h2>
          
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
      <section className="py-16 px-4 bg-gradient-to-r from-gray-800/30 to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other sportswear brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/nike"
              className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-colors"
            >
              Nike Guide
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
            headline: 'Adidas Bahrain - All Store Locations & Shopping Guide 2026',
            description: 'Find Adidas stores in Bahrain. Complete guide to Adidas locations across the Kingdom.',
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
