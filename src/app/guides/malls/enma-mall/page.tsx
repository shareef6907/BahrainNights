import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, Car, 
  ShoppingBag, Utensils, Users, Sparkles,
  Baby, Gamepad2, Star, Store
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Enma Mall Riffa - Shopping & Family Guide 2026',
  description: 'Complete guide to Enma Mall (Al Enma Mall) in Riffa, Bahrain. 70+ stores, Fun City entertainment, supermarket, family dining. Hours, stores & visitor tips.',
  keywords: 'Enma Mall, Al Enma Mall, Riffa mall, shopping mall Riffa, Bahrain mall, family mall Bahrain, Riffa shopping',
  openGraph: {
    title: 'Enma Mall Riffa - Shopping & Family Guide 2026',
    description: 'Riffa\'s main shopping destination with 70+ stores, Fun City entertainment, and family-friendly facilities.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/enma-mall',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/enma-mall',
  },
};

const mallInfo = {
  name: 'Enma Mall',
  tagline: 'Riffa\'s Premier Family Shopping Destination',
  address: 'Riffa, Southern Governorate, Kingdom of Bahrain',
  website: 'https://www.enmamall.bh',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Enma+Mall+Riffa+Bahrain',
  hours: {
    regular: 'Sat-Wed: 9:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 9:00 AM - 11:00 PM',
    ramadan: 'Special hours during Ramadan',
  },
  parking: {
    spaces: '2,000+',
    cost: 'Free',
    valet: 'Not available',
  },
  size: '30,000 sqm',
  stores: '70+',
  yearOpened: '2012',
};

const storeCategories = [
  {
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    stores: [
      { name: 'Centrepoint', link: null },
      { name: 'Splash', link: null },
      { name: 'Max Fashion', link: null },
      { name: 'Shoe Mart', link: null },
      { name: 'Payless', link: null },
      { name: 'LC Waikiki', link: null },
    ],
  },
  {
    name: 'Kids & Baby',
    icon: Baby,
    stores: [
      { name: 'Mothercare', link: null },
      { name: 'Babyshop', link: null },
      { name: 'Claire\'s', link: null },
      { name: 'Toys R Us', link: null },
      { name: 'Build-A-Bear', link: null },
    ],
  },
  {
    name: 'Beauty & Personal Care',
    icon: Sparkles,
    stores: [
      { name: 'Bath & Body Works', link: '/guides/brands/bath-body-works' },
      { name: 'The Body Shop', link: null },
      { name: 'Mikyajy', link: null },
      { name: 'Wojooh', link: null },
      { name: 'Areej', link: null },
    ],
  },
  {
    name: 'Electronics & Mobile',
    icon: ShoppingBag,
    stores: [
      { name: 'Lulu Connect', link: null },
      { name: 'Batelco Shop', link: null },
      { name: 'Zain', link: null },
      { name: 'Mobile accessories', link: null },
    ],
  },
  {
    name: 'Supermarket & Grocery',
    icon: Store,
    stores: [
      { name: 'Lulu Hypermarket', link: null },
      { name: 'Fresh produce', link: null },
      { name: 'Bakery', link: null },
      { name: 'Daily essentials', link: null },
    ],
  },
  {
    name: 'Services',
    icon: Users,
    stores: [
      { name: 'Banks & ATMs', link: null },
      { name: 'Exchange houses', link: null },
      { name: 'Pharmacies', link: null },
      { name: 'Optical stores', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Casual Dining',
    restaurants: ['Chili\'s', 'Pizza Hut', 'Burger King', 'Hardee\'s'],
  },
  {
    category: 'Fast Food',
    restaurants: ['McDonald\'s', 'KFC', 'Subway', 'Popeyes'],
  },
  {
    category: 'Coffee & Desserts',
    restaurants: ['Starbucks', 'Costa Coffee', 'Baskin Robbins', 'Cold Stone'],
  },
  {
    category: 'Food Court',
    restaurants: ['Arabic cuisine', 'Indian food', 'Chinese', 'Quick bites'],
  },
];

const entertainment = [
  {
    name: 'Fun City',
    description: 'Large family entertainment center with arcade games, rides, soft play areas, and birthday party facilities.',
    icon: Gamepad2,
  },
  {
    name: 'Kids Play Zone',
    description: 'Dedicated play area for younger children with safe, supervised activities and fun equipment.',
    icon: Baby,
  },
  {
    name: 'Gaming Arcade',
    description: 'Video games, racing simulators, and prize machines for teenagers and adults.',
    icon: Gamepad2,
  },
  {
    name: 'Family Events',
    description: 'Regular family entertainment programs, seasonal celebrations, and community events.',
    icon: Users,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings are quietest. Friday afternoons are popular with families after prayers.',
  },
  {
    title: 'Parking',
    tip: 'Large free parking lot with 2,000+ spaces. Covered parking available near main entrance.',
  },
  {
    title: 'Family Tip',
    tip: 'Great for families with kids - Fun City is one of the largest in the Southern Governorate.',
  },
  {
    title: 'Shopping Value',
    tip: 'Good prices on everyday items. Popular with Riffa residents for weekly shopping.',
  },
  {
    title: 'Hypermarket',
    tip: 'Lulu Hypermarket offers everything from groceries to electronics at competitive prices.',
  },
];

const faqs = [
  {
    q: 'What are Enma Mall\'s opening hours?',
    a: 'Enma Mall is open Saturday-Wednesday 9 AM - 10 PM, and Thursday-Friday 9 AM - 11 PM. Hours may vary during Ramadan and public holidays.',
  },
  {
    q: 'Is parking free at Enma Mall?',
    a: 'Yes, Enma Mall offers free parking with over 2,000 spaces available. Both covered and open-air parking are available.',
  },
  {
    q: 'Does Enma Mall have entertainment for kids?',
    a: 'Yes, Enma Mall features Fun City, a large family entertainment center with arcade games, rides, and play areas perfect for children.',
  },
  {
    q: 'Is there a supermarket at Enma Mall?',
    a: 'Yes, Lulu Hypermarket is located at Enma Mall, offering groceries, fresh produce, electronics, and household items.',
  },
  {
    q: 'Where is Enma Mall located?',
    a: 'Enma Mall is located in Riffa, in the Southern Governorate of Bahrain. It\'s the main shopping destination for Riffa and surrounding communities.',
  },
];

export default function EnmaMallPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Enma Mall', url: 'https://www.bahrainnights.com/guides/malls/enma-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              👨‍👩‍👧‍👦 Family Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Enma Mall
              </span>
              {' '}Riffa
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Serving southern Bahrain with 70+ stores, 
              family entertainment, Lulu Hypermarket, and convenient facilities.
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
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
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
                <MapPin className="w-5 h-5 text-pink-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors text-sm"
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
                <Clock className="w-5 h-5 text-pink-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 9:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 9:00 AM - 11:00 PM</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Hours may vary during Ramadan and public holidays
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-pink-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Covered parking available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory by Category</h2>
          <p className="text-gray-400 mb-8">Browse 70+ stores and services</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-pink-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-pink-400 transition-colors text-sm"
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
          <h2 className="text-3xl font-bold mb-8">Entertainment & Family Fun</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-pink-400" />
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
            <Utensils className="w-8 h-8 text-pink-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{option.category}</h3>
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
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
              { name: 'Oasis Mall', href: '/guides/malls/oasis-mall' },
              { name: 'Dragon City', href: '/guides/malls/dragon-city' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-pink-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors"
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

      {/* Structured Data - ShoppingCenter Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ShoppingCenter',
            name: 'Enma Mall',
            alternateName: 'Al Enma Mall',
            description: 'Riffa\'s premier family shopping destination with 70+ stores, Fun City entertainment, Lulu Hypermarket, and family-friendly facilities.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Riffa',
              addressLocality: 'Riffa',
              addressRegion: 'Southern Governorate',
              addressCountry: 'BH',
            },
            url: mallInfo.website,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                opens: '09:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Thursday', 'Friday'],
                opens: '09:00',
                closes: '23:00',
              },
            ],
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Family Entertainment', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Hypermarket', value: true },
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
