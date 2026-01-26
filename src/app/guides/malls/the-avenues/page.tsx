import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, Car, 
  ShoppingBag, Utensils, Film, Sparkles,
  Star, Crown, Waves
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'The Avenues Bahrain - Store Directory & Shopping Guide 2026',
  description: 'Complete guide to The Avenues Bahrain at Bahrain Bay. 200+ stores, luxury brands, waterfront dining. Store directory, hours, parking & tips.',
  keywords: 'The Avenues Bahrain, Avenues mall Bahrain, Bahrain Bay shopping, luxury mall Bahrain, waterfront dining Bahrain, premium shopping Manama',
  openGraph: {
    title: 'The Avenues Bahrain - Store Directory & Shopping Guide 2026',
    description: 'Complete guide to The Avenues Bahrain - premium lifestyle destination at Bahrain Bay.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/the-avenues',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/the-avenues',
  },
};

const mallInfo = {
  name: 'The Avenues Bahrain',
  tagline: 'Premium Lifestyle Destination at Bahrain Bay',
  address: 'Bahrain Bay, Manama, Kingdom of Bahrain',
  website: 'https://www.theavenuesbahrain.com',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=The+Avenues+Bahrain',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '4,000+',
    cost: 'Free',
    valet: 'Available',
  },
  size: '170,000 sqm',
  stores: '200+',
  yearOpened: '2017',
};

const storeCategories = [
  {
    name: 'Luxury Fashion',
    icon: Crown,
    stores: [
      { name: 'Louis Vuitton', link: '/guides/brands/louis-vuitton' },
      { name: 'Gucci', link: '/guides/brands/gucci' },
      { name: 'Dior', link: '/guides/brands/dior' },
      { name: 'Prada', link: null },
      { name: 'Chanel', link: '/guides/brands/chanel' },
      { name: 'Cartier', link: null },
      { name: 'Tiffany & Co.', link: null },
      { name: 'Versace', link: null },
    ],
  },
  {
    name: 'Premium Fashion',
    icon: ShoppingBag,
    stores: [
      { name: 'Zara', link: '/guides/brands/zara' },
      { name: 'H&M', link: '/guides/brands/hm' },
      { name: 'Massimo Dutti', link: null },
      { name: 'COS', link: null },
      { name: 'Arket', link: null },
      { name: 'Ted Baker', link: null },
      { name: 'AllSaints', link: null },
      { name: 'Reiss', link: null },
    ],
  },
  {
    name: 'Sports & Lifestyle',
    icon: ShoppingBag,
    stores: [
      { name: 'Nike', link: '/guides/brands/nike' },
      { name: 'Adidas', link: '/guides/brands/adidas' },
      { name: 'Lululemon', link: null },
      { name: 'Under Armour', link: null },
      { name: 'JD Sports', link: null },
    ],
  },
  {
    name: 'Beauty & Cosmetics',
    icon: Sparkles,
    stores: [
      { name: 'Sephora', link: '/guides/brands/sephora' },
      { name: 'MAC', link: null },
      { name: 'Jo Malone', link: null },
      { name: 'Kiehl\'s', link: null },
      { name: 'Charlotte Tilbury', link: null },
      { name: 'Nars', link: null },
    ],
  },
  {
    name: 'Electronics',
    icon: ShoppingBag,
    stores: [
      { name: 'Apple (iStyle)', link: '/guides/brands/apple' },
      { name: 'Samsung', link: null },
      { name: 'Bang & Olufsen', link: null },
      { name: 'Bose', link: null },
    ],
  },
  {
    name: 'Home & Design',
    icon: ShoppingBag,
    stores: [
      { name: 'Pottery Barn', link: null },
      { name: 'West Elm', link: null },
      { name: 'Crate & Barrel', link: null },
      { name: 'Bo Concept', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Waterfront Dining',
    restaurants: ['The Cheesecake Factory', 'P.F. Chang\'s', 'Zuma', 'Nusr-Et'],
  },
  {
    category: 'Casual Dining',
    restaurants: ['Five Guys', 'Shake Shack', 'Tim Hortons', 'Pinkberry'],
  },
  {
    category: 'Premium Cafes',
    restaurants: ['Ralph\'s Coffee', 'Starbucks Reserve', 'TWG Tea', 'Eataly'],
  },
  {
    category: 'International Cuisine',
    restaurants: ['Lebanese', 'Italian', 'Japanese', 'American'],
  },
];

const entertainment = [
  {
    name: 'VOX Cinemas',
    description: 'Premium cinema experience with IMAX, 4DX, and VIP screens.',
    icon: Film,
  },
  {
    name: 'Bahrain Bay Promenade',
    description: 'Scenic waterfront walkway with stunning views and outdoor seating.',
    icon: Waves,
  },
  {
    name: 'Kids Entertainment',
    description: 'Family entertainment zones and play areas.',
    icon: Star,
  },
];

const tips = [
  {
    title: 'Waterfront Views',
    tip: 'Book waterfront restaurant seating for stunning Bahrain Bay views, especially at sunset.',
  },
  {
    title: 'Luxury Shopping',
    tip: 'The Avenues has Bahrain\'s best concentration of luxury brands outside Moda Mall.',
  },
  {
    title: 'Best Time',
    tip: 'Visit Thursday/Friday evenings for the best atmosphere along the promenade.',
  },
  {
    title: 'Parking',
    tip: 'Free parking available. Use the underground parking for closer access to luxury stores.',
  },
  {
    title: 'Special Events',
    tip: 'Check for seasonal events and fashion shows at the main atrium.',
  },
];

const faqs = [
  {
    q: 'What luxury brands are at The Avenues Bahrain?',
    a: 'The Avenues features top luxury brands including Louis Vuitton, Gucci, Dior, Prada, Chanel, Cartier, Tiffany & Co., and Versace, along with 200+ other stores.',
  },
  {
    q: 'Is The Avenues Bahrain on the waterfront?',
    a: 'Yes, The Avenues Bahrain is located at Bahrain Bay with beautiful waterfront views. The outdoor promenade features restaurants and cafes with bay views.',
  },
  {
    q: 'What are The Avenues Bahrain opening hours?',
    a: 'The Avenues is open Saturday-Wednesday 10 AM - 10 PM, and Thursday-Friday 10 AM - 12 AM (midnight).',
  },
  {
    q: 'Is parking free at The Avenues Bahrain?',
    a: 'Yes, The Avenues offers free parking with over 4,000 spaces. Valet parking is also available for convenience.',
  },
];

export default function TheAvenuesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'The Avenues', url: 'https://www.bahrainnights.com/guides/malls/the-avenues' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              🌊 Lifestyle Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                The Avenues
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Stunning waterfront location with 200+ stores, 
              luxury brands, world-class dining, and breathtaking bay views.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: mallInfo.stores, icon: ShoppingBag },
              { label: 'Size', value: mallInfo.size, icon: MapPin },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Since', value: mallInfo.yearOpened, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                  <a 
                    href={mallInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm flex items-center gap-1"
                  >
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM (midnight)</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Waterfront restaurants may stay open later
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-cyan-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Valet available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory by Category</h2>
          <p className="text-gray-400 mb-8">Browse 200+ stores across all categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-cyan-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {store.name} →
                      </Link>
                    ) : (
                      <span key={store.name} className="block text-gray-400 text-sm">
                        {store.name}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entertainment */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Entertainment & Attractions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-cyan-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-cyan-400 mb-2">{option.category}</h3>
                <p className="text-gray-400 text-sm">
                  {option.restaurants.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
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

      {/* Related Links */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore More Malls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-cyan-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <Link 
              href="/guides/restaurants"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Restaurant Guide
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
            '@type': 'ShoppingCenter',
            name: 'The Avenues Bahrain',
            description: 'Premium lifestyle destination at Bahrain Bay with 200+ stores, luxury brands, waterfront dining, and entertainment.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bahrain Bay',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            url: mallInfo.website,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                opens: '10:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Thursday', 'Friday'],
                opens: '10:00',
                closes: '00:00',
              },
            ],
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Waterfront', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Cinema', value: true },
            ],
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
