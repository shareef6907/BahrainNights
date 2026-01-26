import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Film, Sparkles,
  Star, Gem, Hotel, Fish, Waves
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Marassi Galleria Bahrain - Complete Store Directory & Guide 2025',
  description: 'Complete guide to Marassi Galleria in Diyar Al Muharraq. 188+ luxury stores including Louis Vuitton, Dior, Chanel, Gucci, plus 53+ restaurants, Reel Cinemas IMAX & Bahrain\'s largest aquarium.',
  keywords: 'Marassi Galleria, Diyar Al Muharraq mall, luxury shopping Bahrain, Louis Vuitton Bahrain, Gucci Bahrain, Marassi Aquarium',
  openGraph: {
    title: 'Marassi Galleria Bahrain - Luxury Shopping & Entertainment 2025',
    description: 'Bahrain\'s premier luxury destination with 188+ stores, 53+ restaurants, IMAX cinema & largest aquarium.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/marassi-galleria',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/marassi-galleria',
  },
};

const mallInfo = {
  name: 'Marassi Galleria',
  tagline: 'Bahrain\'s Premier Luxury Shopping Destination',
  address: 'Diyar Al Muharraq, Kingdom of Bahrain',
  phone: '+973 1700 0123',
  mapsLink: 'https://www.google.com/maps/place/Marassi+Galleria/@26.3089,50.6281,17z',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '3,000+',
    cost: 'Free',
    valet: 'Available',
  },
  stores: '188+',
  restaurants: '53+',
  yearOpened: '2024',
};

// COMPLETE Store Directory from Official Marassi Galleria
// Opened: February 2024

const luxuryBrands = [
  'Louis Vuitton', 'Dior', 'Chanel', 'Hermès', 'Cartier', 'Gucci',
  'Bulgari', 'Bottega Veneta', 'Van Cleef & Arpels', 'Rolex',
  'Panerai', 'IWC', 'Fendi', 'Loro Piana', 'Saint Laurent', 'Tudor'
];

const storeCategories = [
  {
    name: 'Luxury Houses',
    icon: Gem,
    stores: luxuryBrands,
  },
  {
    name: 'Fashion & Lifestyle',
    icon: ShoppingBag,
    stores: [
      'Zara', 'Bershka', 'Pull & Bear', 'Massimo Dutti', 'Aigner', 'ADL',
      'Alo Yoga', 'The Editor\'s Market', 'Doppelgänger', 'DKNY',
      'Sam Edelman', 'Cole Haan', 'Koton', 'Furla', 'Marli'
    ],
  },
  {
    name: 'Other Stores',
    icon: ShoppingBag,
    stores: [
      'A La Mode', 'Aireno World', 'Ajmal Perfumes', 'Al Fardan Jewellery',
      'Aldo', 'Alsalam ATM', 'Beauty Blends'
    ],
    note: '188+ total stores',
  },
];

const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: [
      'Bosporus (Turkish)', 'Katana Torii (Japanese)', 'TGI Friday\'s'
    ],
  },
  {
    category: 'Cafés & Desserts',
    restaurants: [
      'Venchi (Italian chocolate/gelato)', 'PappaRoti', 'Baskin Robbins'
    ],
  },
];

const entertainment = [
  {
    name: 'Reel Cinemas IMAX',
    description: 'Premium cinema experience featuring IMAX technology and luxury seating for the ultimate movie experience.',
    icon: Film,
  },
  {
    name: 'Marassi Aquarium & Underwater Zoo',
    description: 'The largest aquarium in Bahrain featuring diverse marine life, interactive exhibits, and educational experiences for all ages.',
    icon: Fish,
  },
  {
    name: 'Adventure Park',
    description: 'Family entertainment center with activities and attractions for children and adults.',
    icon: Star,
  },
];

const connectedHotels = [
  {
    name: 'Address Beach Resort Bahrain',
    rating: '5-star luxury',
    icon: Hotel,
  },
  {
    name: 'Vida Beach Resort Marassi Al-Bahrain',
    rating: '5-star lifestyle',
    icon: Hotel,
  },
];

const tips = [
  {
    title: 'Luxury Shopping',
    tip: 'Home to Bahrain\'s largest collection of luxury brands including Louis Vuitton, Dior, and Chanel.',
  },
  {
    title: 'Aquarium Visit',
    tip: 'The Marassi Aquarium is Bahrain\'s largest - plan 2-3 hours for a full experience.',
  },
  {
    title: 'Beach Access',
    tip: 'Connected to two 5-star beach resorts with beachfront dining options.',
  },
  {
    title: 'New Development',
    tip: 'Opened February 2024 - Bahrain\'s newest luxury shopping destination.',
  },
];

const faqs = [
  {
    q: 'Where is Marassi Galleria located?',
    a: 'Marassi Galleria is located in Diyar Al Muharraq, a reclaimed island development in the Kingdom of Bahrain. It is NOT in Muharraq city.',
  },
  {
    q: 'What luxury brands are at Marassi Galleria?',
    a: 'Marassi Galleria features Louis Vuitton, Dior, Chanel, Hermès, Cartier, Gucci, Bulgari, Van Cleef & Arpels, Rolex, and many more luxury houses.',
  },
  {
    q: 'Does Marassi Galleria have a cinema?',
    a: 'Yes, Reel Cinemas operates a premium IMAX cinema at Marassi Galleria.',
  },
  {
    q: 'What is the Marassi Aquarium?',
    a: 'The Marassi Aquarium & Underwater Zoo is the largest aquarium in Bahrain, featuring diverse marine life and interactive exhibits.',
  },
  {
    q: 'Are there hotels at Marassi Galleria?',
    a: 'Yes, two 5-star hotels are connected: Address Beach Resort Bahrain and Vida Beach Resort Marassi Al-Bahrain.',
  },
];

export default function MarassiGalleriaPage() {
  const lastUpdated = '2025-01-27';
  
  const totalStores = 188;
  const totalDining = 53;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Marassi Galleria', url: 'https://www.bahrainnights.com/guides/malls/marassi-galleria' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              ✨ Luxury Destination • Opened 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Marassi Galleria
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Featuring {totalStores}+ stores including Louis Vuitton, Dior, Chanel, 
              {totalDining}+ restaurants, Reel Cinemas IMAX, and Bahrain&apos;s largest aquarium.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: `${totalStores}+`, icon: ShoppingBag },
              { label: 'Dining', value: `${totalDining}+`, icon: Utensils },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Opened', value: mallInfo.yearOpened, icon: Star },
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

      {/* Location & Hours */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="font-semibold text-amber-400">{mallInfo.address}</p>
                <p className="text-sm text-gray-400">Located on Diyar Al Muharraq island (not Muharraq city)</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Opening Hours
              </h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM</p>
                <p className="text-sm text-gray-500">* Restaurant hours may vary</p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Valet available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Brands Highlight */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Gem className="w-8 h-8 text-amber-400" />
            Luxury Houses
          </h2>
          <p className="text-gray-400 mb-8">Bahrain&apos;s most prestigious collection of luxury brands</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {luxuryBrands.map((brand) => (
              <div key={brand} className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-lg p-3 text-center border border-amber-500/20">
                <span className="text-sm font-medium text-amber-200">{brand}</span>
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
                  <item.icon className="w-5 h-5 text-amber-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Hotel className="w-8 h-8 text-amber-400" />
            Connected Hotels
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {connectedHotels.map((hotel) => (
              <div key={hotel.name} className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl p-6 border border-amber-500/20">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-amber-400">{hotel.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory</h2>
          <p className="text-gray-400 mb-8">188+ stores across luxury, fashion, and lifestyle categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-amber-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                  <span className="text-xs text-gray-500 ml-auto">({category.stores.length})</span>
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-amber-400" />
            Food & Dining (53+ options)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-3">{option.category}</h3>
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
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-amber-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Experience Bahrain&apos;s premier luxury destination
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
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
            name: 'Marassi Galleria',
            description: 'Bahrain\'s premier luxury shopping destination with 188+ stores, 53+ restaurants, IMAX cinema & largest aquarium.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Diyar Al Muharraq',
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
