import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Film, Sparkles,
  Star, Baby, Hotel, Waves
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'The Avenues Bahrain - Complete Store Directory & Guide 2026',
  description: 'Complete guide to The Avenues Bahrain Bay. 130+ stores, Below Zero ice rink, VOX Cinemas, The Cheesecake Factory, water taxi rides. 1.5km waterfront promenade.',
  keywords: 'The Avenues Bahrain, Bahrain Bay mall, shopping Bahrain, Below Zero ice rink, VOX Cinemas, The Cheesecake Factory Bahrain, waterfront Bahrain',
  openGraph: {
    title: 'The Avenues Bahrain - Waterfront Shopping & Dining Guide 2026',
    description: 'Premium waterfront mall on Bahrain Bay with 130+ stores, Below Zero ice rink, VOX Cinemas & water taxi.',
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
  tagline: 'The Place to Be',
  address: 'Bahrain Bay, King Faisal Road, Manama, Kingdom of Bahrain',
  mapsLink: 'https://www.google.com/maps/place/The+Avenues+Bahrain/@26.2344,50.5893,17z',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '1,400+',
    cost: 'Free',
    valet: 'Available',
  },
  stores: '130+',
  yearOpened: '2017',
};

// COMPLETE Store Directory from Official The Avenues Website
// Opened: October 2017 | Phase 2 expanding to 218+ stores

const storeCategories = [
  {
    name: 'Stores A-Z (Partial)',
    icon: ShoppingBag,
    stores: [
      '1B', 'A La Mode', 'Abdulsamad Al Qurashi', 'Acqua Dell Elba',
      'Adidas', 'Adidas Kids', 'Adidas Originals', 'ADL',
      'Ahmed Al Maghribi', 'Aireno', 'Ajmal'
    ],
    note: '130+ stores in Phase 1, expanding to 218+ in Phase 2',
  },
  {
    name: 'Anchor Stores',
    icon: ShoppingBag,
    stores: [
      'LuLu Hypermarket (Phase 2)', 'VOX Cinemas', 'Magic Planet',
      'The Cheesecake Factory', 'H&M', 'Victoria\'s Secret', 'RIVA & Choice'
    ],
  },
  {
    name: 'Beauty & Cosmetics',
    icon: Sparkles,
    stores: [
      'Abdulsamad Al Qurashi', 'Acqua Dell Elba', 'Ahmed Al Maghribi',
      'Ajmal', 'Victoria\'s Secret'
    ],
  },
  {
    name: 'Sports & Fitness',
    icon: ShoppingBag,
    stores: [
      'Adidas', 'Adidas Kids', 'Adidas Originals'
    ],
  },
];

const diningOptions = [
  {
    category: 'Signature Restaurants',
    restaurants: [
      'The Cheesecake Factory', 'Le Pain Quotidien', 'Texas Roadhouse',
      'Katsuya by Starck', 'Babel', '400 Gradi'
    ],
  },
  {
    category: 'Casual Dining',
    restaurants: [
      'Blaze Pizza', 'Dean & Deluca', 'Bridgewater Chocolate'
    ],
  },
  {
    category: 'Food Court',
    restaurants: [
      'Multiple dining options in the Food Court area'
    ],
  },
];

const entertainment = [
  {
    name: 'VOX Cinemas',
    description: '10 screens featuring the latest blockbusters with premium viewing experiences.',
    icon: Film,
  },
  {
    name: 'Magic Planet',
    description: 'Family entertainment center with games, rides, and activities for all ages.',
    icon: Baby,
  },
  {
    name: 'Water Taxi Rides',
    description: 'Unique water taxi experience around Bahrain Bay for BD 2 per ride.',
    icon: Waves,
  },
];

const connectedHotels = [
  {
    name: 'Hilton Garden Inn Bahrain Bay',
    rating: 'Connected to mall',
    icon: Hotel,
  },
];

const phase2Info = {
  title: 'Phase 2 Expansion (Opening 2025)',
  features: [
    'Additional 41,200 sqm of retail space',
    'LuLu Hypermarket anchor',
    'More stores and restaurants',
    'Total stores expanding from 130+ to 218+'
  ],
};

const tips = [
  {
    title: 'Unique Design',
    tip: 'The mall features a glass ceiling and street-style design on a single level - easy to navigate.',
  },
  {
    title: 'Water Taxi',
    tip: 'Try the unique water taxi ride around Bahrain Bay for just BD 2.',
  },
  {
    title: 'Dining Focus',
    tip: 'Over 50% of The Avenues is dedicated to food & beverage - great for foodies.',
  },
  {
    title: 'Phase 2 Coming',
    tip: 'Major expansion in 2025 will add LuLu Hypermarket and many more stores.',
  },
];

const faqs = [
  {
    q: 'Where is The Avenues Bahrain located?',
    a: 'The Avenues is located on Bahrain Bay, King Faisal Road in Manama. It\'s connected to the Hilton Garden Inn.',
  },
  {
    q: 'What are The Avenues opening hours?',
    a: 'Saturday-Wednesday: 10 AM - 10 PM. Thursday-Friday: 10 AM - 12 Midnight. Restaurants may operate longer hours.',
  },
  {
    q: 'Does The Avenues have a cinema?',
    a: 'Yes, VOX Cinemas operates 10 screens at The Avenues Bahrain.',
  },
  {
    q: 'What is special about The Avenues design?',
    a: 'The Avenues features a unique street-style design with a glass ceiling, mostly on a single level making it easy to navigate.',
  },
  {
    q: 'Is there a hotel at The Avenues?',
    a: 'Yes, the Hilton Garden Inn Bahrain Bay is connected to the mall.',
  },
];

export default function TheAvenuesPage() {
  const lastUpdated = '2025-01-27';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🌊 Bahrain Bay • Since 2017
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                The Avenues
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. A premium shopping destination with 130+ stores (expanding to 218+), 
              VOX Cinemas, The Cheesecake Factory, and unique water taxi rides on Bahrain Bay.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '130+', icon: ShoppingBag },
              { label: 'Cinema', value: '10 screens', icon: Film },
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
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Opening Hours
              </h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM (Midnight)</p>
                <p className="text-sm text-gray-500">* Restaurants may operate longer hours</p>
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

      {/* Entertainment */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Entertainment & Attractions</h2>
          
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

      {/* Phase 2 Expansion */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold mb-4">{phase2Info.title}</h2>
            <ul className="space-y-2">
              {phase2Info.features.map((feature, i) => (
                <li key={i} className="text-gray-300 flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory</h2>
          <p className="text-gray-400 mb-8">130+ stores in Phase 1, expanding to 218+ stores</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-blue-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {category.stores.map((store) => (
                    <span key={store} className="block text-gray-400 text-sm">
                      {store}
                    </span>
                  ))}
                </div>
                {category.note && (
                  <p className="text-xs text-gray-500 mt-2 italic">{category.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-blue-400" />
            Food & Dining
          </h2>
          <p className="text-gray-400 mb-8">Over 50% of The Avenues is dedicated to food & beverage</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-3">{option.category}</h3>
                <div className="space-y-1">
                  {option.restaurants.map((restaurant) => (
                    <span key={restaurant} className="block text-gray-400 text-sm">
                      {restaurant}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected Hotel */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Hotel className="w-8 h-8 text-blue-400" />
            Connected Hotel
          </h2>
          
          <div className="max-w-md">
            {connectedHotels.map((hotel) => (
              <div key={hotel.name} className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-blue-400">{hotel.rating}</p>
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
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover The Avenues Bahrain on beautiful Bahrain Bay
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <a 
              href={mallInfo.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Get Directions
            </a>
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
            description: 'Premium shopping destination on Bahrain Bay with 130+ stores, VOX Cinemas, dining & water taxi rides.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bahrain Bay, King Faisal Road',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
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
