import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Film, Sparkles,
  Star, Baby, Watch, Gem, Eye, Footprints,
  Building2, Scissors, Home, Gift, Laptop, Dumbbell, Droplets
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'City Centre Bahrain - Complete Store Directory & Guide 2025',
  description: 'Complete guide to City Centre Bahrain. 340+ stores including Zara, H&M, VOX Cinema, Carrefour, Magic Planet, Time Out Market. Full store directory.',
  keywords: 'City Centre Bahrain, City Center Bahrain, Bahrain mall, shopping Bahrain, VOX Cinema Bahrain, Carrefour Bahrain, Time Out Market',
  openGraph: {
    title: 'City Centre Bahrain - Complete Store Directory & Guide 2025',
    description: 'Bahrain\'s largest mall with 340+ stores, VOX Cinema, Magic Planet & Time Out Market.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/city-centre-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/city-centre-bahrain',
  },
};

const mallInfo = {
  name: 'City Centre Bahrain',
  tagline: 'Bahrain\'s Premier Shopping & Entertainment Destination',
  address: 'Sheikh Khalifa Bin Salman Highway, Seef District, Manama, Kingdom of Bahrain',
  phone: '+973 8000 0131',
  mapsLink: 'https://www.google.com/maps/place/City+Centre+Bahrain/@26.2168,50.5481,17z',
  hours: {
    shops: {
      regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
      weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
    },
  },
  parking: {
    spaces: '5,000+',
    cost: 'Free',
    valet: 'Available',
  },
  stores: '340+',
  yearOpened: '2008',
};

// COMPLETE Store Directory from Official City Centre Bahrain Directory (maps.proximi.ae/bahrain)
// Last verified: January 2025

const storeCategories = [
  {
    name: 'Fashion - Unisex',
    icon: ShoppingBag,
    stores: [
      '5.11 Tactical', 'Aigner', 'American Eagle', 'Armani Exchange', 'Bershka',
      'Beverly Hills Polo Club', 'Calvin Klein', 'Centrepoint', 'CH Carolina Herrera',
      'COS', 'Diesel', 'Fred Perry', 'Giordano', 'Guess', 'H&M', 'Hugo Boss',
      'Jashanmal', 'Lacoste', 'LC Waikiki', 'Lefties', 'Levi\'s', 'Marks & Spencer',
      'Massimo Dutti', 'Max Fashion', 'New Yorker', 'Pull & Bear', 'R&B',
      'Ralph Lauren', 'Reiss', 'Sacoor Brothers', 'Salsa', 'Scotch & Soda',
      'Splash', 'Ted Baker', 'Tommy Bahama', 'Tommy Hilfiger',
      'United Colors of Benetton', 'Urban Outfitters', 'Zara'
    ],
  },
  {
    name: 'Fashion - Ladies',
    icon: ShoppingBag,
    stores: [
      'Anthropologie', 'Coast', 'Debenhams', 'Forever 21', 'Karen Millen',
      'Mango', 'Monsoon', 'Oasis', 'River Island', 'Stradivarius', 'Warehouse'
    ],
  },
  {
    name: 'Fashion - Men',
    icon: ShoppingBag,
    stores: [
      'Brooks Brothers', 'Celio', 'Charles Tyrwhitt', 'Gant', 'Jack & Jones',
      'Moss Bros', 'Suit Supply', 'The Kooples'
    ],
  },
  {
    name: 'Accessories & Shoes',
    icon: Footprints,
    stores: [
      'Aldo', 'Aldo Accessories', 'Birkenstock', 'Call It Spring', 'Charles & Keith',
      'Claire\'s', 'Clarks', 'Cole Haan', 'Da Milano', 'Dune London', 'Duozoulu',
      'ECCO', 'Jouri', 'K Corner', 'Longchamp', 'Lovisa', 'Milano', 'Montblanc',
      'Muji', 'Naturalizer', 'Parfois', 'Sam Edelman', 'Shoemart', 'Skechers',
      'Swarovski', 'Verona Shoes', 'Vincci'
    ],
  },
  {
    name: 'Beauty & Cosmetics',
    icon: Sparkles,
    stores: [
      'Bath & Body Works', 'Boots', 'Charlotte Tilbury', 'Faces', 'Flormar',
      'Jo Malone', 'Kiko Milano', 'L\'Occitane', 'Lush', 'MAC Cosmetics',
      'NYX Professional Makeup', 'Rituals', 'Sephora', 'The Body Shop',
      'Victoria\'s Secret Beauty', 'Watsons'
    ],
  },
  {
    name: 'Arabian Perfumes',
    icon: Sparkles,
    stores: [
      'Abdul Samad Al Qurashi', 'Ajmal Perfumes', 'Al Haramain', 'Arabian Oud',
      'Asgharali', 'Hind Al Oud', 'Rasasi'
    ],
  },
  {
    name: 'Jewellery & Watches',
    icon: Gem,
    stores: [
      'Al Zain Jewellers', 'Cartier', 'Chopard', 'Damas', 'Hour Choice',
      'Jawhara Jewellery', 'Pandora', 'Rivoli', 'Rolex', 'Swatch',
      'TAG Heuer', 'Tiffany & Co.', 'Tissot', 'Tudor'
    ],
  },
  {
    name: 'Optics & Sunglasses',
    icon: Eye,
    stores: [
      'Al Jaber Optical', 'Grand Optics', 'Magrabi Optical', 'Rivoli EyeZone',
      'Sunglass Hut', 'Yateem Optician'
    ],
  },
  {
    name: 'Electronics',
    icon: Laptop,
    stores: [
      'Apple', 'Bang & Olufsen', 'Bose', 'Emax', 'iStyle',
      'Samsung', 'Sharaf DG', 'Virgin Megastore'
    ],
  },
  {
    name: 'Sports & Fitness',
    icon: Dumbbell,
    stores: [
      'Adidas', 'Athlete\'s Co', 'Foot Locker', 'Go Sport', 'JD Sports',
      'Nike', 'Puma', 'Sun & Sand Sports', 'Under Armour'
    ],
  },
  {
    name: 'Kids & Toys',
    icon: Baby,
    stores: [
      'Babyshop', 'Build-A-Bear', 'Carter\'s', 'Hamleys', 'Kiddy Zone',
      'Mothercare', 'OshKosh B\'gosh', 'The Toy Store', 'Toys R Us'
    ],
  },
  {
    name: 'Home & Living',
    icon: Home,
    stores: [
      'Crate & Barrel', 'H&M Home', 'Home Centre', 'IKEA Pop-Up',
      'Marina Home', 'Pottery Barn', 'The White Company', 'West Elm', 'Zara Home'
    ],
  },
  {
    name: 'Books & Gifts',
    icon: Gift,
    stores: [
      'Hallmark', 'Jashanmal', 'Kinokuniya', 'Typo', 'Virgin Megastore'
    ],
  },
  {
    name: 'Lingerie',
    icon: ShoppingBag,
    stores: [
      'La Senza', 'Nayomi', 'Oysho', 'Victoria\'s Secret', 'Women\'secret'
    ],
  },
  {
    name: 'Services & Banks',
    icon: Building2,
    stores: [
      'Ahli United Bank', 'Al Baraka Bank', 'BBK', 'BFC Exchange',
      'KFH', 'National Bank of Bahrain'
    ],
  },
  {
    name: 'Hypermarket',
    icon: ShoppingBag,
    stores: ['Carrefour Hypermarket'],
  },
];

// Dining from Official Directory
const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: [
      'Allo Beirut', 'Asha\'s', 'Baharat', 'Bait Al Jedder', 'Butcher and Buns',
      'De Linos', 'Furn Bistro & Bakery', 'Lumee', 'Mezzanine Lounge', 'Nasmat',
      'Ô Liban', 'P.F. Chang\'s', 'Parker\'s', 'Paul Café', 'Raising Cane\'s',
      'Rendezvous', 'Salero', 'Shake Shack', 'Sisler', 'The Butcher Shop & Grill', 'Vapiano'
    ],
  },
  {
    category: 'Cafés',
    restaurants: [
      'Bacha Coffee', 'Brunch and Cake', 'Caribou Coffee', 'Cinnabon', 'Costa',
      'Crème London', 'Dunkin\' Donuts', 'EL&N Cafe', 'Illy', 'Marketplace by Live Well',
      'Nagwa', 'Romeo\'s', 'Snatch a Matcha', 'Starbucks', 'The Good Wolf'
    ],
  },
  {
    category: 'Fast Food',
    restaurants: [
      'ALBAIK', 'Asian Delights', 'Charleys', 'Gold Label Burger', 'Hardee\'s',
      'Jasmi\'s', 'Jollibee', 'Karami', 'KFC', 'Krispy Kreme', 'La Casa Pasta',
      'Lord of the Wings', 'Mazmiz', 'McDonald\'s', 'Pizza Hut', 'Popeyes', 'Yummies'
    ],
  },
  {
    category: 'Desserts & Ice Cream',
    restaurants: [
      'Baskin Robbins', 'Cold Stone Creamery', 'Häagen-Dazs', 'Pinkberry'
    ],
  },
  {
    category: 'Time Out Market',
    restaurants: [
      'Multiple food vendors offering diverse cuisines in a food hall setting'
    ],
  },
];

const entertainment = [
  {
    name: 'VOX Cinemas',
    description: '20+ screens including IMAX, 4DX, GOLD, and Kids experiences. Premium movie viewing.',
    icon: Film,
  },
  {
    name: 'Magic Planet',
    description: 'Family entertainment center with rides, games, bowling and attractions for all ages.',
    icon: Baby,
  },
  {
    name: 'Wahoo! Waterpark',
    description: 'Indoor waterpark with slides, wave pool and lazy river. Perfect for families.',
    icon: Droplets,
  },
  {
    name: 'Escape Code',
    description: 'Escape room experiences with various themed rooms and challenges.',
    icon: Star,
  },
  {
    name: 'Mega Blast',
    description: 'Trampoline park and adventure zone for kids and adults.',
    icon: Baby,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings are quietest. Avoid Thursday/Friday evenings when it\'s most crowded.',
  },
  {
    title: 'Parking',
    tip: 'Multiple car parks available. Use the designated levels for quicker access to your preferred stores.',
  },
  {
    title: 'Time Out Market',
    tip: 'Great for lunch - multiple cuisines in one spot. Gets busy at peak times.',
  },
  {
    title: 'Cinema Tip',
    tip: 'Book VOX Gold for a premium experience with recliner seats and in-seat dining service.',
  },
];

const faqs = [
  {
    q: 'What are City Centre Bahrain opening hours?',
    a: 'Shops are open Sat-Wed 10 AM - 10 PM, Thu-Fri 10 AM - 12 AM. VOX Cinema and restaurants may have extended hours.',
  },
  {
    q: 'Is parking free at City Centre Bahrain?',
    a: 'Yes, parking is free with over 5,000 spaces across multiple car parks. Valet parking is also available.',
  },
  {
    q: 'Does City Centre Bahrain have a waterpark?',
    a: 'Yes! Wahoo! Waterpark is an indoor waterpark located inside the mall with slides, wave pool and lazy river.',
  },
  {
    q: 'What cinemas are in City Centre Bahrain?',
    a: 'VOX Cinemas operates 20+ screens including IMAX, 4DX, GOLD luxury, and Kids cinema experiences.',
  },
  {
    q: 'Is there a hotel at City Centre Bahrain?',
    a: 'The Westin City Centre Bahrain hotel is directly connected to the mall.',
  },
];

export default function CityCentrePage() {
  const lastUpdated = '2025-01-27';
  
  // Count total stores
  const totalStores = storeCategories.reduce((acc, cat) => acc + cat.stores.length, 0);
  const totalDining = diningOptions.reduce((acc, cat) => acc + cat.restaurants.length, 0);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'City Centre Bahrain', url: 'https://www.bahrainnights.com/guides/malls/city-centre-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🏬 Bahrain&apos;s Largest Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                City Centre
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Home to {totalStores}+ stores, VOX Cinema, 
              Wahoo! Waterpark, Magic Planet, Time Out Market, and Carrefour Hypermarket.
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
              { label: 'Since', value: mallInfo.yearOpened, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
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
                <MapPin className="w-5 h-5 text-purple-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <p>Phone: {mallInfo.phone}</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Opening Hours
              </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="font-semibold text-white">Shops:</p>
                  <p>Sat-Wed: 10:00 AM - 10:00 PM</p>
                  <p>Thu-Fri: 10:00 AM - 12:00 AM</p>
                </div>
                <p className="text-sm text-gray-500">* Cinema & restaurants may have extended hours</p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-purple-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Valet available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entertainment Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Entertainment & Attractions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-purple-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Store Directory */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Complete Store Directory</h2>
          <p className="text-gray-400 mb-8">All {totalStores}+ stores from official City Centre directory</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-purple-400 mb-3 flex items-center gap-2">
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
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-purple-400" />
            Food & Dining ({totalDining}+ options)
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-3">
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
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-purple-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors"
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
            name: 'City Centre Bahrain',
            description: 'Bahrain\'s largest mall with 340+ stores, VOX Cinema, Wahoo! Waterpark, Magic Planet and dining.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            telephone: '+973 8000 0131',
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
