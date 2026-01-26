import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, Car, 
  ShoppingBag, Utensils, Film, Users, Sparkles,
  Star, Baby, ShoppingCart
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Seef Mall Bahrain - Store Directory & Shopping Guide 2026',
  description: 'Complete guide to Seef Mall Bahrain. 300+ stores, family entertainment, dining. Store directory, opening hours, parking info & shopping tips.',
  keywords: 'Seef Mall Bahrain, Seef mall shops, Seef district shopping, family mall Bahrain, shopping mall Manama, Seef Mall stores',
  openGraph: {
    title: 'Seef Mall Bahrain - Store Directory & Shopping Guide 2026',
    description: 'Complete guide to Seef Mall Bahrain with 300+ stores, family entertainment & dining.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/seef-mall',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/seef-mall',
  },
};

const mallInfo = {
  name: 'Seef Mall',
  tagline: 'Bahrain\'s Original Premier Shopping Destination',
  address: 'Road 2825, Block 428, Seef District, Manama, Bahrain',
  phone: '+973 17 581 111',
  website: 'https://www.seefmall.com',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Seef+Mall+Bahrain',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '5,000+',
    cost: 'Free',
    valet: 'Available',
  },
  size: '140,000 sqm',
  stores: '300+',
  yearOpened: '1997',
};

const storeCategories = [
  {
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    stores: [
      { name: 'Massimo Dutti', link: null },
      { name: 'Mango', link: null },
      { name: 'Next', link: null },
      { name: 'Oysho', link: null },
      { name: 'Springfield', link: null },
      { name: 'Aldo', link: null },
      { name: 'Charles & Keith', link: null },
      { name: 'Nine West', link: null },
    ],
  },
  {
    name: 'Beauty & Fragrance',
    icon: Sparkles,
    stores: [
      { name: 'Sephora', link: '/guides/brands/sephora' },
      { name: 'Bath & Body Works', link: '/guides/brands/bath-body-works' },
      { name: 'MAC', link: null },
      { name: 'Victoria\'s Secret', link: null },
      { name: 'The Body Shop', link: null },
      { name: 'Lush', link: null },
    ],
  },
  {
    name: 'Home & Living',
    icon: ShoppingBag,
    stores: [
      { name: 'Pottery Barn', link: null },
      { name: 'Crate & Barrel', link: null },
      { name: 'Williams Sonoma', link: null },
      { name: 'West Elm', link: null },
      { name: 'Zara Home', link: null },
    ],
  },
  {
    name: 'Sports & Activewear',
    icon: Users,
    stores: [
      { name: 'Nike', link: '/guides/brands/nike' },
      { name: 'Adidas', link: '/guides/brands/adidas' },
      { name: 'Foot Locker', link: null },
      { name: 'Sun & Sand Sports', link: null },
    ],
  },
  {
    name: 'Kids & Baby',
    icon: Baby,
    stores: [
      { name: 'Mothercare', link: null },
      { name: 'Toys R Us', link: null },
      { name: 'Petit Bateau', link: null },
      { name: 'Carter\'s', link: null },
      { name: 'OshKosh', link: null },
    ],
  },
  {
    name: 'Hypermarket',
    icon: ShoppingCart,
    stores: [
      { name: 'Geant Hypermarket', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: ['Fuddruckers', 'Applebee\'s', 'Chili\'s', 'Texas Roadhouse'],
  },
  {
    category: 'Casual Dining',
    restaurants: ['Pizza Hut', 'KFC', 'Hardee\'s', 'Subway', 'Papa John\'s'],
  },
  {
    category: 'Coffee & Desserts',
    restaurants: ['Starbucks', 'Costa Coffee', 'Cinnabon', 'Baskin Robbins'],
  },
  {
    category: 'Food Court',
    restaurants: ['Arabic cuisine', 'Asian food', 'Western options', 'Indian food'],
  },
];

const entertainment = [
  {
    name: 'Cinema',
    description: 'Multi-screen cinema showing latest releases in Hollywood and Bollywood.',
    icon: Film,
  },
  {
    name: 'Kids Play Area',
    description: 'Dedicated play zones for children with games and activities.',
    icon: Baby,
  },
  {
    name: 'Geant Hypermarket',
    description: 'Full-service hypermarket for groceries and household items.',
    icon: ShoppingCart,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday afternoons are ideal. The mall gets busy on Thursday/Friday evenings.',
  },
  {
    title: 'Parking',
    tip: 'Use the multi-story parking. Ground level fills up quickly on weekends.',
  },
  {
    title: 'Family Friendly',
    tip: 'Great for families with dedicated kids areas and family dining options.',
  },
  {
    title: 'Home Decor',
    tip: 'Seef Mall is known for premium home brands like Pottery Barn and Crate & Barrel.',
  },
];

const faqs = [
  {
    q: 'What are Seef Mall opening hours?',
    a: 'Seef Mall is open Saturday-Wednesday 10 AM - 10 PM, and Thursday-Friday 10 AM - 12 AM (midnight). Hours may vary during Ramadan.',
  },
  {
    q: 'Is parking free at Seef Mall?',
    a: 'Yes, Seef Mall offers free parking with over 5,000 spaces available. Valet parking is also available.',
  },
  {
    q: 'What makes Seef Mall different from City Centre?',
    a: 'Seef Mall focuses on premium mid-range and home brands with stores like Pottery Barn, Crate & Barrel, and Williams Sonoma. It has a more relaxed atmosphere compared to City Centre.',
  },
  {
    q: 'Does Seef Mall have a hypermarket?',
    a: 'Yes, Seef Mall has Geant Hypermarket offering groceries, fresh produce, electronics, and household essentials.',
  },
];

export default function SeefMallPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Seef Mall', url: 'https://www.bahrainnights.com/guides/malls/seef-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏬 Premium Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Seef Mall
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Established in 1997, offering 300+ stores 
              with premium fashion, home brands, and family entertainment.
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
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
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
                <MapPin className="w-5 h-5 text-blue-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {mallInfo.phone}
                </p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors text-sm"
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
                <Clock className="w-5 h-5 text-blue-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM (midnight)</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Hours may vary during Ramadan
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-400" />
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
          <p className="text-gray-400 mb-8">Browse 300+ stores across all categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-blue-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-blue-400 transition-colors text-sm"
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
          <h2 className="text-3xl font-bold mb-8">Entertainment & Services</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-blue-400" />
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
            <Utensils className="w-8 h-8 text-blue-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{option.category}</h3>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-blue-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <Link 
              href="/guides/souks"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Traditional Souks
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
            name: 'Seef Mall Bahrain',
            description: 'Bahrain\'s original premier shopping destination with 300+ stores, family entertainment, and dining.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Road 2825, Block 428, Seef District',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            telephone: mallInfo.phone,
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
