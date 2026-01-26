import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info, Home
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'IKEA Bahrain - Store Location & Shopping Guide 2026',
  description: 'Visit IKEA Bahrain for affordable furniture, home decor & Swedish food. Complete guide with directions, hours, tips & what to expect at IKEA Sitra.',
  keywords: 'IKEA Bahrain, IKEA store Bahrain, IKEA Sitra, furniture Bahrain, home decor Bahrain, IKEA restaurant Bahrain, IKEA hours Bahrain',
  openGraph: {
    title: 'IKEA Bahrain - Store Location & Shopping Guide 2026',
    description: 'Visit IKEA Bahrain for affordable furniture, home decor & Swedish food.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/ikea',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/ikea',
  },
};

const storeInfo = {
  name: 'IKEA Bahrain',
  address: 'IKEA, Sitra, Kingdom of Bahrain',
  fullAddress: 'Building 2101, Road 5228, Block 952, Sitra, Bahrain',
  hours: 'Daily: 10:00 AM - 10:00 PM',
  ramadanHours: 'Ramadan hours may vary',
  mapsLink: 'https://www.google.com/maps/search/IKEA+Bahrain+Sitra',
  website: 'https://www.ikea.com/bh/',
  features: ['Full showroom', 'Market Hall', 'Self-serve warehouse', 'IKEA Restaurant', 'Swedish Food Market', 'Småland (kids play area)', 'Delivery & assembly services'],
  sections: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Outdoor', 'Children\'s', 'Office', 'Storage', 'Textiles', 'Decoration'],
};

const shoppingTips = [
  {
    title: 'Plan Your Trip',
    tip: 'Browse ikea.com/bh first to note item names and aisle locations. The store is huge - planning saves hours.',
  },
  {
    title: 'Click & Collect',
    tip: 'Order online and pick up in-store to skip the showroom. Great for repeat purchases or when you know what you want.',
  },
  {
    title: 'Visit Weekday Mornings',
    tip: 'The store gets crowded on weekends, especially Thursday and Friday. Weekday mornings are quietest.',
  },
  {
    title: 'Use Småland',
    tip: 'Drop kids (ages 3-10) at Småland play area while you shop. Free supervised play for up to 1 hour.',
  },
  {
    title: 'IKEA Family Card',
    tip: 'Sign up for free IKEA Family membership for discounts, free coffee/tea, and special offers.',
  },
  {
    title: 'Delivery Available',
    tip: 'Can\'t fit everything in your car? IKEA offers home delivery. Assembly services also available.',
  },
];

const whatToExpect = [
  {
    area: 'Showroom',
    description: 'Walk through fully furnished room setups. Get inspiration and note product codes.',
  },
  {
    area: 'Market Hall',
    description: 'Smaller items like kitchenware, textiles, plants, and decor. Self-serve shopping.',
  },
  {
    area: 'Self-Serve Warehouse',
    description: 'Pick up flat-pack furniture. Use the aisle and bin numbers from your shopping list.',
  },
  {
    area: 'IKEA Restaurant',
    description: 'Swedish meatballs, salmon, and more. Family-friendly with kids\' menu.',
  },
  {
    area: 'Swedish Food Market',
    description: 'Take home Swedish treats - meatballs, lingonberry jam, chocolates.',
  },
];

const relatedBrands = [
  { name: 'Apple', href: '/guides/brands/apple', emoji: '📱' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'Starbucks', href: '/guides/brands/starbucks', emoji: '☕' },
  { name: 'Sephora', href: '/guides/brands/sephora', emoji: '💄' },
];

const faqs = [
  {
    q: 'Where is IKEA in Bahrain?',
    a: 'IKEA Bahrain is located in Sitra, in the east of Bahrain. It\'s easily accessible from both Manama and Muharraq via the main highways.',
  },
  {
    q: 'What are IKEA Bahrain\'s opening hours?',
    a: 'IKEA Bahrain is open daily from 10:00 AM to 10:00 PM. Hours may vary during Ramadan and public holidays.',
  },
  {
    q: 'Does IKEA Bahrain deliver?',
    a: 'Yes, IKEA Bahrain offers home delivery services. You can arrange delivery at checkout or order online for home delivery.',
  },
  {
    q: 'Does IKEA Bahrain assemble furniture?',
    a: 'Yes, IKEA offers assembly services for an additional fee. You can add this service when purchasing or arranging delivery.',
  },
  {
    q: 'Is there an IKEA restaurant in Bahrain?',
    a: 'Yes, IKEA Bahrain has a full restaurant serving Swedish food including the famous meatballs, as well as local options and a kids\' menu.',
  },
];

export default function IKEABahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'IKEA', url: 'https://www.bahrainnights.com/guides/brands/ikea' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-yellow-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏠 Home & Living
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-blue-400">IKEA</span>
              {' '}
              <span className="text-yellow-400">Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Swedish home furnishing giant offers affordable, well-designed furniture 
              and home accessories at its Sitra location. From the famous showroom to 
              Swedish meatballs, IKEA is a destination shopping experience.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Store', value: '1', icon: ShoppingBag },
              { label: 'Location', value: 'Sitra', icon: MapPin },
              { label: 'Restaurant', value: 'Yes', icon: Star },
              { label: 'Kids Play', value: 'Småland', icon: Home },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">IKEA Bahrain Store</h2>
          <p className="text-gray-400 mb-8">The only IKEA store in Bahrain.</p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-400 mb-4">{storeInfo.name}</h3>
                
                <div className="space-y-2 text-sm mb-4">
                  <p className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {storeInfo.fullAddress}
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {storeInfo.hours}
                  </p>
                  <p className="flex items-center gap-2 text-yellow-400 text-xs">
                    <Info className="w-4 h-4" />
                    {storeInfo.ramadanHours}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {storeInfo.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Sections:</p>
                  <div className="flex flex-wrap gap-2">
                    {storeInfo.sections.map((section) => (
                      <span key={section} className="px-2 py-1 bg-yellow-500/10 text-yellow-300 text-xs rounded">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:min-w-[200px] space-y-3">
                <a 
                  href={storeInfo.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                <a 
                  href={storeInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Shop Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What to Expect at IKEA Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatToExpect.map((item) => (
              <div key={item.area} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-yellow-400 mb-2">{item.area}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping at IKEA Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{item.title}</h3>
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
                <span className="font-medium group-hover:text-blue-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your IKEA Trip</h2>
          <p className="text-gray-300 mb-8">
            Browse online first, then visit for the full Swedish experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={storeInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
            >
              Shop IKEA Online
            </a>
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
            headline: 'IKEA Bahrain - Store Location & Shopping Guide 2026',
            description: 'Visit IKEA Bahrain for affordable furniture, home decor & Swedish food.',
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
      
      {/* Store Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FurnitureStore',
            name: 'IKEA Bahrain',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Building 2101, Road 5228, Block 952',
              addressLocality: 'Sitra',
              addressCountry: 'BH',
            },
            openingHours: 'Mo-Su 10:00-22:00',
            url: 'https://www.ikea.com/bh/',
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
