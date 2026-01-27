import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, UtensilsCrossed, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Cheesecake Factory Bahrain - Location & Menu Guide 2026',
  description: 'Find The Cheesecake Factory in Bahrain at The Avenues Mall. Complete guide with menu highlights, famous cheesecakes, hours, reservations & tips.',
  keywords: 'Cheesecake Factory Bahrain, Cheesecake Factory The Avenues Bahrain, Cheesecake Factory menu Bahrain, American restaurant Bahrain',
  openGraph: {
    title: 'Cheesecake Factory Bahrain - Location & Menu Guide 2026',
    description: 'Find The Cheesecake Factory in Bahrain at The Avenues Mall. Menu, cheesecakes, and reservations.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/cheesecake-factory',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/cheesecake-factory',
  },
};

const storeLocations = [
  {
    name: 'The Cheesecake Factory - The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    hours: 'Sun-Wed: 11:00 AM - 11:00 PM, Thu-Sat: 11:00 AM - 12:00 AM',
    mapsLink: 'https://www.google.com/maps/search/Cheesecake+Factory+Avenues+Bahrain',
    features: ['Full menu', 'Famous cheesecakes', 'American portions', 'Family-friendly', 'Reservations accepted'],
    isPrimary: true,
  },
];

const popularItems = [
  { category: 'Cheesecakes', items: ['Original', 'Dulce de Leche', 'Godiva Chocolate', 'Fresh Strawberry', 'Tiramisu', 'Oreo Dream Extreme'] },
  { category: 'Appetizers', items: ['Avocado Egg Rolls', 'Fried Macaroni & Cheese', 'Buffalo Wings', 'Loaded Baked Potato Tots'] },
  { category: 'Mains', items: ['Pasta Carbonara', 'Fish & Chips', 'Glamburgers', 'Louisiana Chicken Pasta', 'Bang-Bang Chicken'] },
  { category: 'Salads', items: ['Caesar Salad', 'Cobb Salad', 'Thai Chicken Salad'] },
];

const shoppingTips = [
  {
    title: 'Make a Reservation',
    tip: 'The restaurant is extremely popular. Book ahead, especially for weekends and evenings. Walk-ins may face long waits.',
  },
  {
    title: 'Portions Are Huge',
    tip: 'American-sized portions mean one dish can feed two. Consider sharing or take leftovers home.',
  },
  {
    title: 'Save Room for Cheesecake',
    tip: 'With 30+ cheesecake varieties, the cheesecake is a must. Consider sharing a slice after a shared main.',
  },
  {
    title: 'Massive Menu',
    tip: 'The menu has 250+ items. Browse online before visiting to avoid decision paralysis.',
  },
];

const relatedBrands = [
  { name: 'Shake Shack', href: '/guides/brands/shake-shack', emoji: '🍔' },
  { name: 'Five Guys', href: '/guides/brands/five-guys', emoji: '🍟' },
  { name: 'Starbucks', href: '/guides/brands/starbucks', emoji: '☕' },
  { name: 'Costa Coffee', href: '/guides/brands/costa-coffee', emoji: '☕' },
];

const faqs = [
  {
    q: 'Where is The Cheesecake Factory in Bahrain?',
    a: 'The Cheesecake Factory has 1 location in Bahrain at The Avenues Mall in Bahrain Bay, Manama.',
  },
  {
    q: 'Do I need a reservation for Cheesecake Factory Bahrain?',
    a: 'Reservations are highly recommended, especially for weekends and evenings. The restaurant is very popular and wait times can be long for walk-ins.',
  },
  {
    q: 'How many cheesecakes does Cheesecake Factory Bahrain have?',
    a: 'The Cheesecake Factory offers 30+ varieties of cheesecake, from the Original to specialty flavors like Dulce de Leche, Godiva Chocolate, and Oreo Dream Extreme.',
  },
  {
    q: 'Is Cheesecake Factory expensive in Bahrain?',
    a: 'Prices are mid-to-high range. Expect to pay BD 8-15 for mains and BD 4-6 for cheesecake slices. Portions are very generous.',
  },
];

export default function CheesecakeFactoryBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Cheesecake Factory', url: 'https://www.bahrainnights.com/guides/brands/cheesecake-factory' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-yellow-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🍰 American Dining
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-amber-400">The Cheesecake Factory</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              America&apos;s iconic restaurant famous for over 250 menu items and 30+ legendary 
              cheesecakes. Experience generous portions, an extensive menu, and those 
              world-famous desserts at The Avenues Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Locations', value: '2', icon: MapPin },
              { label: 'Menu Items', value: '250+', icon: UtensilsCrossed },
              { label: 'Cheesecakes', value: '30+', icon: Sparkles },
              { label: 'Style', value: 'American', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Locations</h2>
          <p className="text-gray-400 mb-8">Find The Cheesecake Factory in Bahrain.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div key={store.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-amber-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-amber-500 text-black text-xs font-bold rounded">
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
                        <Clock className="w-4 h-4 text-gray-500" />
                        {store.hours}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-amber-500/10 text-amber-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
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

      {/* Popular Items */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Popular Menu Items</h2>
          <p className="text-gray-400 mb-8">Fan favorites from the 250+ item menu.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularItems.map((category) => (
              <div key={category.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-3">{category.category}</h3>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li key={item} className="text-gray-300 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Food & Drink in Bahrain</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBrands.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry for More?</h2>
          <p className="text-gray-300 mb-8">
            Discover other popular American restaurants in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/shake-shack"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Shake Shack Guide
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
            headline: 'Cheesecake Factory Bahrain - Location & Menu Guide 2026',
            description: 'Find The Cheesecake Factory in Bahrain at The Avenues Mall. Menu, cheesecakes, and reservations.',
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
      
      {/* Restaurant Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'The Cheesecake Factory Bahrain',
            servesCuisine: 'American',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'The Avenues Mall, Bahrain Bay',
              addressLocality: 'Seef',
              addressCountry: 'BH',
            },
            openingHours: 'Su-We 11:00-23:00, Th-Sa 11:00-24:00',
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
