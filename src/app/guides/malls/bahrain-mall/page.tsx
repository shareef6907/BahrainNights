import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, Car, 
  ShoppingBag, Utensils, Gamepad2, Baby,
  Star, Snowflake, ShoppingCart
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain Mall - Store Directory & Shopping Guide 2026',
  description: 'Complete guide to Bahrain Mall in Sanabis. 120+ stores, ice skating, bowling, LuLu Hypermarket. Store directory, opening hours, parking & family tips.',
  keywords: 'Bahrain Mall, Bahrain Mall Sanabis, ice skating Bahrain, family mall Bahrain, budget shopping Bahrain, LuLu Hypermarket Bahrain',
  openGraph: {
    title: 'Bahrain Mall - Store Directory & Shopping Guide 2026',
    description: 'Complete guide to Bahrain Mall - family-friendly shopping with ice skating, bowling & entertainment.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/bahrain-mall',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/bahrain-mall',
  },
};

const mallInfo = {
  name: 'Bahrain Mall',
  tagline: 'Family-Friendly Shopping & Entertainment',
  address: 'Road 3804, Block 338, Sanabis, Kingdom of Bahrain',
  phone: '+973 17 554 444',
  website: 'https://www.bahrainmall.com.bh',
  mapsLink: 'https://www.google.com/maps/place/Bahrain+Mall',
  hours: {
    regular: 'Sat-Wed: 9:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 9:00 AM - 11:00 PM',
  },
  parking: {
    spaces: '3,000+',
    cost: 'Free',
    valet: 'Available',
  },
  size: '60,000 sqm',
  stores: '120+',
  yearOpened: '2002',
};

const storeCategories = [
  {
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    stores: [
      { name: 'Centrepoint', link: null },
      { name: 'Max', link: null },
      { name: 'Splash', link: null },
      { name: 'LC Waikiki', link: null },
      { name: 'Shoexpress', link: null },
      { name: 'Lifestyle', link: null },
      { name: 'New Look', link: null },
    ],
  },
  {
    name: 'Kids & Baby',
    icon: Baby,
    stores: [
      { name: 'Mothercare', link: null },
      { name: 'Toys R Us', link: null },
      { name: 'Early Learning Centre', link: null },
      { name: 'Build-A-Bear', link: null },
      { name: 'Claire\'s', link: null },
    ],
  },
  {
    name: 'Home & Living',
    icon: ShoppingBag,
    stores: [
      { name: 'Home Centre', link: null },
      { name: 'Pan Emirates', link: null },
      { name: 'Danube Home', link: null },
    ],
  },
  {
    name: 'Electronics',
    icon: ShoppingBag,
    stores: [
      { name: 'Jarir Bookstore', link: null },
      { name: 'Extra', link: null },
      { name: 'Samsung', link: null },
    ],
  },
  {
    name: 'Sports',
    icon: ShoppingBag,
    stores: [
      { name: 'Sports Corner', link: null },
      { name: 'Sun & Sand Sports', link: null },
    ],
  },
  {
    name: 'Hypermarket',
    icon: ShoppingCart,
    stores: [
      { name: 'LuLu Hypermarket', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: ['Pizza Hut', 'KFC', 'McDonald\'s', 'Burger King', 'Hardee\'s'],
  },
  {
    category: 'Casual Dining',
    restaurants: ['Chili\'s', 'Applebee\'s', 'Papa John\'s'],
  },
  {
    category: 'Coffee & Desserts',
    restaurants: ['Starbucks', 'Costa Coffee', 'Baskin Robbins', 'Cinnabon'],
  },
  {
    category: 'Food Court',
    restaurants: ['Arabic food', 'Indian cuisine', 'Chinese', 'Fast food options'],
  },
];

const entertainment = [
  {
    name: 'Ice Skating Rink',
    description: 'Olympic-size ice skating rink - one of the best in Bahrain. Perfect for families and date nights.',
    icon: Snowflake,
  },
  {
    name: 'Bowling Center',
    description: 'Multi-lane bowling alley with modern facilities and cosmic bowling nights.',
    icon: Gamepad2,
  },
  {
    name: 'Fun Zone / Play Area',
    description: 'Kids entertainment center with games, rides, and play areas.',
    icon: Baby,
  },
  {
    name: 'LuLu Hypermarket',
    description: 'One of the largest hypermarkets in Bahrain with groceries, fresh food, and electronics.',
    icon: ShoppingCart,
  },
];

const tips = [
  {
    title: 'Best for Families',
    tip: 'Bahrain Mall is ideal for families with kids due to ice skating, bowling, and play areas.',
  },
  {
    title: 'Budget-Friendly',
    tip: 'Great for value shopping with stores like Centrepoint, Max, and LC Waikiki.',
  },
  {
    title: 'Ice Skating',
    tip: 'Book ice skating sessions in advance on weekends. Skate rental included in entry fee.',
  },
  {
    title: 'LuLu Hypermarket',
    tip: 'Visit LuLu for competitive prices on groceries and household items.',
  },
  {
    title: 'Parking',
    tip: 'Free parking available. Use the rear entrance for easier access to LuLu.',
  },
];

const faqs = [
  {
    q: 'Does Bahrain Mall have ice skating?',
    a: 'Yes, Bahrain Mall features a popular Olympic-size ice skating rink, one of the best in Bahrain. Skate rental is included in the entry fee.',
  },
  {
    q: 'What are Bahrain Mall opening hours?',
    a: 'Bahrain Mall is open Saturday-Wednesday 9 AM - 10 PM, and Thursday-Friday 9 AM - 11 PM. Hours may vary during Ramadan.',
  },
  {
    q: 'Is parking free at Bahrain Mall?',
    a: 'Yes, Bahrain Mall offers free parking with over 3,000 spaces available for visitors.',
  },
  {
    q: 'Is Bahrain Mall good for families?',
    a: 'Yes, Bahrain Mall is one of the most family-friendly malls in Bahrain with ice skating, bowling, kids play areas, and family dining options.',
  },
  {
    q: 'Does Bahrain Mall have a hypermarket?',
    a: 'Yes, Bahrain Mall features LuLu Hypermarket, one of the largest supermarkets in Bahrain with groceries, fresh food, electronics, and household items.',
  },
];

export default function BahrainMallPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Bahrain Mall', url: 'https://www.bahrainnights.com/guides/malls/bahrain-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              👨‍👩‍👧‍👦 Family Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                Bahrain Mall
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Home to 120+ stores, ice skating rink, 
              bowling, LuLu Hypermarket, and great value shopping.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: mallInfo.stores, icon: ShoppingBag },
              { label: 'Ice Skating', value: 'Yes', icon: Snowflake },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Since', value: mallInfo.yearOpened, icon: Star },
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

      {/* Location & Hours */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
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
                    className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors text-sm"
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
                <Clock className="w-5 h-5 text-green-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 9:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 9:00 AM - 11:00 PM</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Ice skating and bowling may have different hours
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-green-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entertainment - Featured */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Entertainment & Attractions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-green-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory by Category</h2>
          <p className="text-gray-400 mb-8">Browse 120+ stores across all categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-green-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-green-400 transition-colors text-sm"
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

      {/* Food & Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-green-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{option.category}</h3>
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
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-green-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-teal-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <Link 
              href="/guides/family-activities"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Family Activities
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
            name: 'Bahrain Mall',
            description: 'Family-friendly shopping mall with 120+ stores, ice skating rink, bowling, and LuLu Hypermarket.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Road 3804, Block 338, Sanabis',
              addressLocality: 'Sanabis',
              addressCountry: 'BH',
            },
            telephone: mallInfo.phone,
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
              { '@type': 'LocationFeatureSpecification', name: 'Ice Skating', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Bowling', value: true },
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
