import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Nike Bahrain - All Store Locations & Shopping Guide 2026',
  description: 'Find Nike stores in Bahrain. Complete guide to Nike locations at City Centre, Seef Mall, The Avenues & more. Store hours, directions & shopping tips.',
  keywords: 'Nike Bahrain, Nike store Bahrain, Nike City Centre Bahrain, Nike shoes Bahrain, where to buy Nike Bahrain, Nike Jordan Bahrain',
  openGraph: {
    title: 'Nike Bahrain - All Store Locations & Shopping Guide 2026',
    description: 'Find Nike stores in Bahrain. Complete guide to Nike locations across the Kingdom.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/nike',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/nike',
  },
};

const storeLocations = [
  {
    name: 'Nike - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    phone: '+973 1717 8400',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Running Shoes', 'Basketball', 'Football', 'Training', 'Lifestyle', 'Jordan', 'Apparel', 'Kids'],
    features: ['Largest Nike store', 'Jordan section', 'Nike by You customization'],
    mapsLink: 'https://www.google.com/maps/search/Nike+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Nike - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    phone: '+973 1758 1200',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Running Shoes', 'Training', 'Lifestyle', 'Apparel', 'Kids'],
    features: ['Good selection', 'Popular location'],
    mapsLink: 'https://www.google.com/maps/search/Nike+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Nike - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Running Shoes', 'Basketball', 'Training', 'Lifestyle', 'Jordan', 'Apparel'],
    features: ['Modern store', 'Full collection'],
    mapsLink: 'https://www.google.com/maps/search/Nike+Avenues+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Nike - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Running Shoes', 'Training', 'Lifestyle', 'Apparel', 'Kids'],
    features: ['Beachfront mall', 'Premium location', 'Near Marassi Aquarium'],
    mapsLink: 'https://www.google.com/maps/search/Nike+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const multiRetailers = [
  {
    name: 'Foot Locker',
    location: 'City Centre Bahrain',
    products: ['Nike sneakers', 'Jordan', 'Lifestyle'],
    mapsLink: 'https://www.google.com/maps/search/Foot+Locker+City+Centre+Bahrain',
  },
  {
    name: 'Sun & Sand Sports',
    location: 'Multiple locations',
    products: ['Nike sports', 'Running', 'Training'],
    mapsLink: 'https://www.google.com/maps/search/Sun+Sand+Sports+Bahrain',
  },
  {
    name: 'Sports Corner',
    location: 'City Centre Bahrain',
    products: ['Nike football', 'Sports equipment'],
    mapsLink: 'https://www.google.com/maps/search/Sports+Corner+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'Nike Membership',
    tip: 'Join Nike Membership for free to access member pricing, early access to drops, and exclusive products.',
  },
  {
    title: 'Sneaker Drops',
    tip: 'Limited edition sneakers release on specific dates. Follow Nike Bahrain social media for drop announcements.',
  },
  {
    title: 'Jordan Brand',
    tip: 'The City Centre store has the best Jordan selection in Bahrain. Hot releases often require early queuing.',
  },
  {
    title: 'Try Before You Buy',
    tip: 'Nike sizing can vary by model. Always try running shoes and ask staff about fit recommendations.',
  },
];

const relatedBrands = [
  { name: 'Adidas', href: '/guides/brands/adidas', emoji: '⚽' },
  { name: 'Uniqlo', href: '/guides/brands/uniqlo', emoji: '🧥' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'Crocs', href: '/guides/brands/crocs', emoji: '🐊' },
];

const faqs = [
  {
    q: 'How many Nike stores are there in Bahrain?',
    a: 'Nike has 4 dedicated stores in Bahrain - City Centre Bahrain (flagship), Seef Mall, The Avenues Bahrain, and Marassi Galleria. Nike products are also available at multi-brand retailers.',
  },
  {
    q: 'Which is the biggest Nike store in Bahrain?',
    a: 'The City Centre Bahrain Nike store is the largest and serves as the flagship, with the widest selection including Jordan brand and Nike by You customization.',
  },
  {
    q: 'Does Nike Bahrain sell Jordan shoes?',
    a: 'Yes, Jordan brand is available at Nike stores in Bahrain. The City Centre flagship has the best Jordan selection including retro releases.',
  },
  {
    q: 'Can I customize Nike shoes in Bahrain?',
    a: 'Yes, the Nike flagship at City Centre Bahrain offers Nike by You customization services for select shoe models.',
  },
];

export default function NikeBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Nike', url: 'https://www.bahrainnights.com/guides/brands/nike' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-black/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              👟 Sportswear
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-orange-500">NIKE</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              &quot;Just Do It&quot; - Nike is the world&apos;s largest athletic apparel company, 
              founded in 1964. From Air Max to Jordan, Nike offers performance footwear, 
              apparel, and lifestyle products at multiple locations across Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Nike Stores', value: '4+', icon: ShoppingBag },
              { label: 'Flagship', value: 'City Centre', icon: Star },
              { label: 'Jordan', value: 'Available', icon: Sparkles },
              { label: 'Multi-Retail', value: '3+', icon: Info },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
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
          <h2 className="text-3xl font-bold mb-4">Nike Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Nike location.</p>
          
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

      {/* Multi-Retailers */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Other Nike Retailers</h2>
          <p className="text-gray-400 mb-8">Find Nike at these multi-brand stores.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {multiRetailers.map((retailer) => (
              <div key={retailer.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-orange-400 mb-2">{retailer.name}</h3>
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
                  className="text-sm text-orange-400 hover:underline flex items-center gap-1"
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Nike in Bahrain</h2>
          
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
                <span className="font-medium group-hover:text-orange-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/10 to-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other sportswear brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/adidas"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
            >
              Adidas Guide
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
            headline: 'Nike Bahrain - All Store Locations & Shopping Guide 2026',
            description: 'Find Nike stores in Bahrain. Complete guide to Nike locations across the Kingdom.',
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
