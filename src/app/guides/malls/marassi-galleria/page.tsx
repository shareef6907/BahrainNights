import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Film, Sparkles,
  Star, Gem, Hotel, Fish, Waves, Eye,
  Watch, Footprints, Dumbbell, Gamepad2, Baby
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Marassi Galleria Bahrain - Complete Store Directory & Guide 2026',
  description: 'Complete guide to Marassi Galleria in Diyar Al Muharraq. 150+ stores including Louis Vuitton, Dior, Chanel, Gucci, Prada, plus 30+ restaurants, Reel Cinemas & Marassi Aquarium.',
  keywords: 'Marassi Galleria, Diyar Al Muharraq mall, luxury shopping Bahrain, Louis Vuitton Bahrain, Gucci Bahrain, Marassi Aquarium, Prada Bahrain',
  openGraph: {
    title: 'Marassi Galleria Bahrain - Luxury Shopping & Entertainment 2026',
    description: 'Bahrain\'s premier luxury destination with 150+ stores, 30+ restaurants, Reel Cinemas & Marassi Aquarium.',
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
  website: 'https://marassigalleria.bh',
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
  stores: '150+',
  restaurants: '30+',
  yearOpened: '2024',
};

// ===================================================================
// COMPLETE STORE DIRECTORY — Verified from marassigalleria.bh/en/shop/
// and official floor maps (January 2026)
// ===================================================================

const storeCategories = [
  {
    name: 'Luxury Houses',
    icon: Gem,
    stores: [
      'Louis Vuitton', 'Gucci', 'Dior', 'Chanel', 'Prada', 'Hermès',
      'Cartier', 'Bulgari', 'Bottega Veneta', 'Fendi', 'Valentino',
      'Dolce & Gabbana', 'Saint Laurent', 'Miu Miu', 'Etro',
      'Giorgio Armani', 'Max Mara', 'Zegna', 'Tod\'s', 'Balmain',
      'Zimmermann', 'Gianvito Rossi', 'Gianfranco Ferré',
      'Loro Piana', 'Damiani',
    ],
  },
  {
    name: 'Watches & Jewellery',
    icon: Watch,
    stores: [
      'Rolex Boutique', 'Cartier', 'Chopard', 'Omega', 'Panerai',
      'Piaget', 'Tiffany & Co.', 'Van Cleef & Arpels',
      'Jaeger-LeCoultre', 'Longines', 'G-Shock',
      'A La Mode', 'Rivoli',
      'Al Fardan Jewellery', 'Kooheji Jewellery', 'Bijoux Jewels',
      'Damiani',
    ],
  },
  {
    name: 'Fashion & Lifestyle',
    icon: ShoppingBag,
    stores: [
      'Zara', 'H&M', 'Bershka', 'Pull & Bear', 'Stradivarius',
      'Massimo Dutti', 'Lefties', 'Oysho', 'Zara Home',
      'Mango', 'Marks & Spencer', 'Centrepoint', 'R&B',
      'New Yorker', 'Reserved', 'ADL', 'DeFacto', 'Terranova',
      'OXXO', 'Ipekol', 'Sandro', 'Maje',
      'Diesel', 'DKNY', 'Armani Exchange',
      'Gant', 'Beverly Hills Polo Club',
      'Aigner', 'The Editor\'s Market',
      'Baindemer', 'GUL Abbayas', 'Wool House',
      'Alo Yoga', 'Penti',
    ],
  },
  {
    name: 'Shoes & Accessories',
    icon: Footprints,
    stores: [
      'Aldo', 'Geox', 'Charles & Keith', 'Vincci', 'Skechers',
      'Birkenstock', 'Cole Haan', 'Sam Edelman',
    ],
  },
  {
    name: 'Sports & Fitness',
    icon: Dumbbell,
    stores: [
      'Decathlon', 'Sun & Sand Sports', 'Nike', 'Puma',
      'Under Armour', 'Columbia',
    ],
  },
  {
    name: 'Beauty & Perfumes',
    icon: Sparkles,
    stores: [
      'Sephora', 'Kiko Milano', 'Bath & Body Works',
      'YSL Beauté', 'Rituals', 'Note Cosmetique',
      'Ajmal Perfumes', 'Rasasi Perfumes', 'Beauty Blends',
      'Aireno World', 'Qadeem Perfume',
    ],
  },
  {
    name: 'Eyewear',
    icon: Eye,
    stores: [
      'Ray-Ban', 'Rivoli EyeZone', 'Optica',
    ],
  },
  {
    name: 'Lifestyle & Gifts',
    icon: ShoppingBag,
    stores: [
      'Miniso', 'Mumuso', 'Virgin Megastore', 'Laialy',
    ],
  },
  {
    name: 'Grocery & Services',
    icon: ShoppingBag,
    stores: [
      'HyperMax', 'Trolley Market', 'Batelco',
      'BFC Exchange', 'Al Salam ATM',
    ],
  },
];

// ===================================================================
// DINING — Verified from marassigalleria.bh/en/dine/
// ===================================================================

const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: [
      'Cipriani', 'Sumosan Bahrain', 'The Butcher Shop & Grill',
      'Jamie\'s Italian', 'Twist', 'TGI Fridays', 'Bosporus',
      'Awani', 'Nomad', 'Zaatar w Zeit',
      'Five Guys', 'Nando\'s', 'Hardee\'s', 'KFC',
    ],
  },
  {
    category: 'Cafés & Bakeries',
    restaurants: [
      'Paul Café', 'Brunch & Cake', 'Café Sego', 'Tim Hortons',
      'Starbucks', 'The Matcha Bar', 'Gulnar Café',
    ],
  },
  {
    category: 'Desserts & Ice Cream',
    restaurants: [
      'Venchi', 'La Romana Dal 1947', 'Baskin Robbins',
      'Cinnabon', 'Candylicious',
    ],
  },
  {
    category: 'Hotel Dining',
    restaurants: [
      'The Lounge at Address', 'The Bistro by Origins (Vida)',
    ],
  },
];

// ===================================================================
// ENTERTAINMENT — Verified from marassigalleria.bh/en/entertain/
// ===================================================================

const entertainment = [
  {
    name: 'Reel Cinemas',
    description: 'Premium cinema experience with top-notch screens, immersive sound, and ultimate comfort for the latest blockbusters.',
    icon: Film,
  },
  {
    name: 'Marassi Aquarium & Underwater Zoo',
    description: 'Discover marine and freshwater wonders across the Oceanarium, Rainforest Lagoon, Reef Zone and more. Encounter sharks, rays, Arapaima, and the Giant Pacific Octopus.',
    icon: Fish,
  },
  {
    name: 'Adventure Park',
    description: 'State-of-the-art sports park for kids (2+ years) with climbing walls, interactive trampoline area, cave maze, sling line obstacle course, and exciting playgrounds.',
    icon: Baby,
  },
  {
    name: 'EVA (Virtual Reality)',
    description: 'Ultimate VR gaming experience in massive 5,600 sq ft arenas. Face off against other players in epic virtual battles.',
    icon: Gamepad2,
  },
  {
    name: 'Ground Control',
    description: 'World-first entertainment experience with bowling, gaming, and a wide range of thrilling activities for all ages.',
    icon: Gamepad2,
  },
];

// ===================================================================
// ADDITIONAL SHOPS — From floor maps (not yet on website directory)
// ===================================================================

const comingSoon = [
  'Home Bakery', 'My Cafe', 'Simit Sarayi', 'Chai Chai',
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
    tip: 'Floor 1 is the luxury level with all the high-end fashion houses and fine jewellery.',
  },
  {
    title: 'Aquarium Visit',
    tip: 'The Marassi Aquarium on Floor 2 features sharks, rays, and a Giant Pacific Octopus — plan 2-3 hours.',
  },
  {
    title: 'Beach Access',
    tip: 'Connected to Address and Vida beach resorts with beachfront dining options.',
  },
  {
    title: 'Opening 2024',
    tip: 'Bahrain\'s newest luxury shopping destination — stores are still opening regularly.',
  },
];

const faqs = [
  {
    q: 'Where is Marassi Galleria located?',
    a: 'Marassi Galleria is located in Diyar Al Muharraq, a reclaimed island development in the Kingdom of Bahrain.',
  },
  {
    q: 'What luxury brands are at Marassi Galleria?',
    a: 'Marassi Galleria features Louis Vuitton, Dior, Chanel, Hermès, Cartier, Gucci, Prada, Bulgari, Van Cleef & Arpels, Rolex, Valentino, Fendi, Saint Laurent, and many more.',
  },
  {
    q: 'Does Marassi Galleria have a cinema?',
    a: 'Yes, Reel Cinemas operates a premium cinema at Marassi Galleria with top-notch screens and immersive sound.',
  },
  {
    q: 'What is the Marassi Aquarium?',
    a: 'The Marassi Aquarium & Underwater Zoo features marine and freshwater exhibits including sharks, rays, Arapaima, and a Giant Pacific Octopus across multiple themed zones.',
  },
  {
    q: 'Are there hotels at Marassi Galleria?',
    a: 'Yes, two 5-star hotels are connected: Address Beach Resort Bahrain and Vida Beach Resort Marassi Al-Bahrain.',
  },
  {
    q: 'What are Marassi Galleria opening hours?',
    a: 'Saturday-Wednesday: 10 AM - 10 PM. Thursday-Friday: 10 AM - Midnight.',
  },
];

export default function MarassiGalleriaPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  const totalStores = storeCategories.reduce((acc, cat) => acc + cat.stores.length, 0);
  const totalDining = diningOptions.reduce((acc, cat) => acc + cat.restaurants.length, 0);
  
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
              {mallInfo.tagline}. Featuring {totalStores}+ stores including Louis Vuitton, Dior, Chanel, Prada &amp; Gucci, 
              {totalDining}+ restaurants, Reel Cinemas, and the Marassi Aquarium &amp; Underwater Zoo.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} • Source: <a href="https://marassigalleria.bh" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">marassigalleria.bh</a>
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
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="font-semibold text-amber-400">{mallInfo.address}</p>
                <p className="text-sm text-gray-400">Located on Diyar Al Muharraq island</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                  <a 
                    href={mallInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm"
                  >
                    Official Website
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
          <p className="text-gray-400 mb-8">Bahrain&apos;s most prestigious collection of luxury brands (Floor 1)</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {storeCategories[0].stores.map((brand) => (
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
          <h2 className="text-3xl font-bold mb-8">Entertainment & Attractions (Floor 2)</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Complete Store Directory */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Complete Store Directory</h2>
          <p className="text-gray-400 mb-8">{totalStores}+ stores from the <a href="https://marassigalleria.bh/en/shop/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">official Marassi Galleria directory</a></p>
          
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
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          {comingSoon.length > 0 && (
            <div className="mt-8 bg-amber-500/10 rounded-xl p-5 border border-amber-500/20">
              <h3 className="font-bold text-amber-400 mb-2">Opening Soon</h3>
              <p className="text-gray-400 text-sm">{comingSoon.join(' • ')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-amber-400" />
            Food & Dining ({totalDining}+ options)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-3">
                  {option.category}
                  <span className="text-xs text-gray-500 ml-2">({option.restaurants.length})</span>
                </h3>
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
            description: 'Bahrain\'s premier luxury shopping destination with 150+ stores, 30+ restaurants, Reel Cinemas & Marassi Aquarium.',
            url: mallInfo.website,
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
