import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, Car, 
  ShoppingBag, Utensils, Film, Users, Sparkles,
  Dumbbell, Baby, Star, Coffee
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Oasis Mall Juffair - Shopping & Entertainment Guide 2026',
  description: 'Complete guide to Oasis Mall Juffair, a convenient neighborhood mall in Bahrain. 80+ stores, cinema, fitness center, dining options. Hours, stores & visitor tips.',
  keywords: 'Oasis Mall, Oasis Mall Juffair, Juffair mall, shopping mall Bahrain, Juffair shopping, community mall Bahrain',
  openGraph: {
    title: 'Oasis Mall Juffair - Shopping & Entertainment Guide 2026',
    description: 'Convenient neighborhood mall in Juffair with 80+ stores, cinema, fitness center, and family entertainment.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/oasis-mall',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/oasis-mall',
  },
};

const mallInfo = {
  name: 'Oasis Mall',
  tagline: 'Juffair\'s Convenient Neighborhood Shopping Destination',
  address: 'Juffair, Capital Governorate, Kingdom of Bahrain',
  website: '', // Website unavailable
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Oasis+Mall+Juffair+Bahrain',
  hours: {
    regular: 'Sat-Wed: 9:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 9:00 AM - 11:00 PM',
    ramadan: 'Special hours during Ramadan',
  },
  parking: {
    spaces: '1,500+',
    cost: 'Free',
    valet: 'Available',
  },
  size: '35,000 sqm',
  stores: '80+',
  yearOpened: '2010',
};

const storeCategories = [
  {
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    stores: [
      { name: 'Lifestyle', link: null },
      { name: 'Splash', link: null },
      { name: 'Max Fashion', link: null },
      { name: 'Shoe Mart', link: null },
      { name: 'Claire\'s', link: null },
      { name: 'Sports Corner', link: null },
    ],
  },
  {
    name: 'Beauty & Personal Care',
    icon: Sparkles,
    stores: [
      { name: 'Bath & Body Works', link: '/guides/brands/bath-body-works' },
      { name: 'The Body Shop', link: null },
      { name: 'Mikyajy', link: null },
      { name: 'Paris Gallery', link: null },
      { name: 'Faces', link: null },
    ],
  },
  {
    name: 'Electronics & Mobile',
    icon: ShoppingBag,
    stores: [
      { name: 'Batelco Shop', link: null },
      { name: 'Zain', link: null },
      { name: 'STC', link: null },
      { name: 'Mobile accessories', link: null },
    ],
  },
  {
    name: 'Home & Living',
    icon: ShoppingBag,
    stores: [
      { name: 'Home Centre', link: null },
      { name: 'BHS Home', link: null },
      { name: 'Tavola', link: null },
    ],
  },
  {
    name: 'Supermarket',
    icon: ShoppingBag,
    stores: [
      { name: 'Lulu Express', link: null },
      { name: 'Fresh produce', link: null },
      { name: 'Daily essentials', link: null },
    ],
  },
  {
    name: 'Services',
    icon: Users,
    stores: [
      { name: 'Banks & ATMs', link: null },
      { name: 'Exchange houses', link: null },
      { name: 'Pharmacy', link: null },
      { name: 'Optician', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Casual Dining',
    restaurants: ['Chili\'s', 'Fuddruckers', 'Pizza Hut', 'Hardee\'s'],
  },
  {
    category: 'Fast Food',
    restaurants: ['McDonald\'s', 'KFC', 'Subway', 'Burger King'],
  },
  {
    category: 'Coffee & Desserts',
    restaurants: ['Starbucks', 'Costa Coffee', 'Baskin Robbins', 'Cinnabon'],
  },
  {
    category: 'Food Court',
    restaurants: ['International cuisine', 'Quick bites', 'Local favorites'],
  },
];

const entertainment = [
  {
    name: 'Cineco Cinema',
    description: 'Modern multiplex cinema with multiple screens showing the latest Hollywood, Bollywood, and Arabic releases.',
    icon: Film,
  },
  {
    name: 'Fitness First',
    description: 'Full-service fitness center with gym equipment, group classes, and personal training options.',
    icon: Dumbbell,
  },
  {
    name: 'Kids Play Area',
    description: 'Safe and fun play zone for children with supervised activities and entertainment.',
    icon: Baby,
  },
  {
    name: 'Gaming Zone',
    description: 'Arcade games and entertainment for all ages, perfect for family fun.',
    icon: Users,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings are quietest. Evenings get busy with the Juffair expat community.',
  },
  {
    title: 'Parking',
    tip: 'Ample free parking available in basement and outdoor lots. Arrives early on weekends.',
  },
  {
    title: 'Location Advantage',
    tip: 'Walking distance from many Juffair hotels and apartments - convenient for residents and tourists.',
  },
  {
    title: 'Quick Shopping',
    tip: 'Great for everyday needs - supermarket, pharmacy, and essential services all in one place.',
  },
  {
    title: 'Dining Scene',
    tip: 'Good variety of casual restaurants. Popular with families for weekend dinners.',
  },
];

const faqs = [
  {
    q: 'What are Oasis Mall\'s opening hours?',
    a: 'Oasis Mall is open Saturday-Wednesday 9 AM - 10 PM, and Thursday-Friday 9 AM - 11 PM. Hours may vary during Ramadan and public holidays.',
  },
  {
    q: 'Is parking free at Oasis Mall?',
    a: 'Yes, Oasis Mall offers free parking with over 1,500 spaces available in basement and outdoor parking areas.',
  },
  {
    q: 'Does Oasis Mall have a cinema?',
    a: 'Yes, Oasis Mall features Cineco Cinema, a multiplex showing the latest Hollywood, Bollywood, and Arabic films.',
  },
  {
    q: 'Is there a gym at Oasis Mall?',
    a: 'Yes, Fitness First operates a full-service gym at Oasis Mall with equipment, classes, and personal training.',
  },
  {
    q: 'Where is Oasis Mall located?',
    a: 'Oasis Mall is located in Juffair, a popular area in the Capital Governorate known for its hotels, restaurants, and expat community.',
  },
];

export default function OasisMallPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Oasis Mall', url: 'https://www.bahrainnights.com/guides/malls/oasis-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🏪 Community Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Oasis Mall
              </span>
              {' '}Juffair
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. A convenient hub for everyday shopping, 
              dining, cinema, and fitness right in the heart of Juffair.
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
          <p className="text-gray-400 mb-8">Browse 80+ stores and services</p>
          
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
          <h2 className="text-3xl font-bold mb-8">Entertainment & Facilities</h2>
          
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
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
              { name: 'Enma Mall', href: '/guides/malls/enma-mall' },
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
            name: 'Oasis Mall Juffair',
            description: 'Convenient neighborhood shopping mall in Juffair with 80+ stores, cinema, fitness center, and family entertainment.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Juffair',
              addressLocality: 'Manama',
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
              { '@type': 'LocationFeatureSpecification', name: 'Cinema', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Fitness Center', value: true },
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
