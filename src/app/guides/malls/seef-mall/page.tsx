import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Film, Sparkles,
  Star, Baby, Watch, Gem, Eye, Footprints,
  Building2, Scissors, Home, Gift, Plane, Laptop, Dumbbell, Heart
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Seef Mall Bahrain - Complete Store Directory & Guide 2025',
  description: 'Complete guide to Seef Mall Bahrain. 200+ stores including H&M, Marks & Spencer, Mango, Sephora, plus dining & Magic Island entertainment. Full store list.',
  keywords: 'Seef Mall Bahrain, Seef mall shops, Seef district shopping, family mall Bahrain, shopping mall Manama, Seef Mall stores, Magic Island',
  openGraph: {
    title: 'Seef Mall Bahrain - Complete Store Directory & Guide 2025',
    description: 'Complete guide to Seef Mall Bahrain with 200+ stores, Magic Island entertainment & dining.',
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
  address: 'Seef District, Manama, Bahrain',
  phone: '+973 7791 1114',
  mapsLink: 'https://www.google.com/maps/place/Seef+Mall/@26.2325003,50.5364399,17z',
  hours: {
    shops: {
      regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
      weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
    },
    restaurants: {
      regular: 'Sat-Wed: 10:00 AM - 11:00 PM',
      weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
    },
  },
  parking: {
    spaces: '5,000+',
    cost: 'Free',
    valet: 'Available',
  },
  stores: '200+',
  yearOpened: '1997',
};

// COMPLETE Store Directory from Official Seef Mall Website (seefdistrict.seefmall.com.bh)
// Last verified: January 2025

const storeCategories = [
  {
    name: 'Fashion',
    icon: ShoppingBag,
    stores: [
      '5.11 Trading', 'Adelena Outlet', 'Alia Vintage', 'American Eagle', 'Annada',
      'Azure Fashion', 'B&G Casuals Fashion', 'BBZ', 'Beverly Hills Polo Club',
      'Beverly Hills Polo Club Kids', 'Big and Tall', 'Brands for Less', 'By Ema',
      'Cocoon Fashion', 'Defacto', 'Dolyan Boutique', 'Dusk', 'Faith Fashions',
      'Fashion Store', 'Gant', 'Giordano', 'H&M', 'Incanto Boutique',
      'Kampoos Accessories', 'KASHAKHTI BOUTIQUE', 'Kay Abayas', 'Khoyot Alzain Abayat',
      'KIABI', 'La Noor By Noor Atelier', 'La Senza', 'Lalla Eman Tailoring',
      'LC Waikiki', 'Levant Fashion', 'Mamas & Papas', 'Mango', 'Marks & Spencer',
      'Matalan', 'Montania', 'Mothercare', 'Nayomi', 'New Yorker', 'Next',
      'Night Moda', 'Noof Boutique', 'NS by Nariman Shukralla', 'NS Design',
      'OXXO', 'R&B', 'Sabina', 'Wool House', 'Yashmak', 'Zash Outfit', 'Zumorrod Trading'
    ],
  },
  {
    name: 'Perfumes & Cosmetics',
    icon: Sparkles,
    stores: [
      'Abdul Samad Alqurashi', 'Ahmet Arifoglu', 'Ajmal Perfumes', 'Al Haramain Perfumes',
      'Al Hawaj', 'Albayraq Al Omane Perfumes', 'AlRasasi Perfumes', 'Arabian Oud',
      'Artal Altabiea', 'Asghar Ali', 'Asgharali Perfumes', 'Aurora Aroma Accessories',
      'Bath & Body Works', 'Beauty Blends', 'Daniya Perfumes', 'Dasman Perfume',
      'Dr Scent', 'Flormar', 'Gissah Perfumes', 'Golden Rose Cosmetics',
      'Kaleem Perfumes', 'Kiko Milano', 'La Maison De La Vanilla', 'LaRosa Perfume',
      'MAC Cosmetics', 'Montale Paris', 'Natural Blends', 'NC COSMETICS',
      'NOTE Cosmetics', 'Nujoom Al Oud', 'NYX Professional Makeup', 'Osma Perfumes',
      'Reef Perfumes', 'San Francisco Soaps', 'Sephora', 'Syed Junaid Alam',
      'The Body Shop', 'The Perfume Lounge', 'Ushk Perfumes'
    ],
  },
  {
    name: 'Jewellery',
    icon: Gem,
    stores: [
      'Ahmed AlWazzan Jewellery', 'Al Jawhara Jewellery', 'Al Sarraj Diamond Centre',
      'Al Sayegh Jewellery', 'Al Zain Jewellery', 'AlHashimi Jewellery',
      'Amal Al Majed Jewellery', 'Asia Jewellers', 'Blue Diamonds Jewellery',
      'Coronet', 'Damas Jewellery', 'Devji Jewellery', 'eSKay Jewellery',
      'Humaidan Jewels', 'Jewellery Falawh', 'Kooheji Jewellery', 'LifeStyle Jewelery',
      'MM. Kooheji Jewellery', 'Modern Jewelry', 'Mouj', 'Pearl Biography',
      'Sahar Jewellery', 'Sentiments Jewelry', 'Soho Diamonds', 'YKA Pearls'
    ],
  },
  {
    name: 'Watches',
    icon: Watch,
    stores: ['A La Mode', 'CALIBER 7', 'Happy Times', 'Watch Time'],
  },
  {
    name: 'Health & Fitness',
    icon: Dumbbell,
    stores: [
      'Adidas', 'Be Sports Wear', 'BlissLab By Nasser Pharmacy', 'Boots Pharmacy',
      'Olympia Health & Fitness', 'Olympia Sports', 'Rashid Center for Physical Therapy',
      'Shoot Sports', 'Smart Nutrition Life', 'Sun & Sand Sports', 'Watsons'
    ],
  },
  {
    name: 'Footwear',
    icon: Footprints,
    stores: ['Aldo', 'Crocs Shoes', 'Kooheji Shoes', 'Latif Shoe', 'Milano', 'Skechers'],
  },
  {
    name: 'Optics',
    icon: Eye,
    stores: ['Ahmed AlWazzan Optician', 'Ammar Optician', 'Eyewa', 'L\'optique', 'Optica', 'Yateem Optician'],
  },
  {
    name: 'Accessories',
    icon: Heart,
    stores: [
      'Claire\'s', 'Dame Accessories', 'Dunhill & Montblanc', 'Ella Jewellery',
      'Mobile Outfitters', 'nyyt', 'Plata', 'Steelmasters', 'Swarovski'
    ],
  },
  {
    name: 'Electronics',
    icon: Laptop,
    stores: ['Extra', 'Yaqoobi Store'],
  },
  {
    name: 'Home & Decor',
    icon: Home,
    stores: ['Liel Excellence', 'Marina Home', 'Phoenicia Decor'],
  },
  {
    name: 'Books, Gifts & Chocolates',
    icon: Gift,
    stores: [
      'Dar Kalemat', 'Hallmark', 'La Casa Del Habano',
      'Qudoo Sweet', 'Update Date Chocolate & more', 'Yousif Showaiter Sweets'
    ],
  },
  {
    name: 'Banks & Financial',
    icon: Building2,
    stores: [
      'Ahli United Bank (AUB)', 'Bahrain Financing Company (BFC)',
      'Bank of Bahrain and Kuwait (BBK)', 'KFH', 'Khaleeji Bank',
      'National Bank of Bahrain (NBB)'
    ],
  },
  {
    name: 'Air Travel',
    icon: Plane,
    stores: ['Emirates Airlines', 'Gulf Air'],
  },
  {
    name: 'Spa & Salon',
    icon: Scissors,
    stores: [
      'Hair Spa', 'N. Spa', 'Prime Gents Saloon', 'Prive Gent\'s Salon',
      'Privé Ladies Salon', 'Ricci E Capricci', 'Toni & Guy Salon'
    ],
  },
  {
    name: 'Kids & Entertainment',
    icon: Baby,
    stores: ['House of Uniforms', 'Magic Island', 'Miniso', 'Seef Megaplex Cinema', 'Toys R Us'],
  },
  {
    name: 'Services',
    icon: Building2,
    stores: [
      'Bumtaia and Mojalli Consultancy', 'Cuddle Carts', 'First Mobile',
      'Fraser Suites Seef', 'HQ by Hope', 'Jobs Plus', 'Perfect Car Services',
      'Solidarity Insurance', 'Tamkeen', 'VAL TECH'
    ],
  },
  {
    name: 'Supermarket',
    icon: ShoppingBag,
    stores: ['Aljazira Supermarket'],
  },
];

// Restaurants & Cafés from Official Website
const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: [
      'AlAbraaj Restaurant', 'Applebee\'s', 'Bahrain Grills', 'Frangipani Restaurant',
      'IHOP', 'Jasmi\'s', 'Kadoura', 'KFC', 'Machabees Restaurant',
      'McDonald\'s', 'Nando\'s Restaurant', 'Oishi', 'Papa John\'s Pizza',
      'Rendezvous', 'Sub Station', 'Yasmine Restaurant', 'Hardee\'s'
    ],
  },
  {
    category: 'Cafés',
    restaurants: [
      '3 Lines', 'CAF', 'Calo Cafe', 'Caribou Coffee', 'Derby Cafe',
      'Fresh Superfood Café', 'Gonul Kahvesi', 'Latea', 'Nespresso',
      'Paul Café', 'Starbucks Coffee', 'Tim Hortons'
    ],
  },
  {
    category: 'Desserts & Ice Cream',
    restaurants: [
      'Auntie Anne\'s', 'Baskin Robbins', 'Cake Boutique', 'Cinnabon',
      'Cold Stone', 'Great American Cookies', 'Marble Slab Creamery',
      'Monster Cookies', 'Pinkberry'
    ],
  },
];

const entertainment = [
  {
    name: 'Seef Megaplex Cinema',
    description: 'Multi-screen cinema showing latest Hollywood, Bollywood and Arabic releases.',
    icon: Film,
  },
  {
    name: 'Magic Island',
    description: 'Family entertainment center with games, rides and activities for all ages.',
    icon: Baby,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings and afternoons are quietest. Thursday/Friday evenings are busiest.',
  },
  {
    title: 'Parking',
    tip: 'Use the multi-story car park. Free parking with 5,000+ spaces. Ground level fills quickly on weekends.',
  },
  {
    title: 'Family Friendly',
    tip: 'Magic Island and Toys R Us make it great for families. Many kid-friendly dining options available.',
  },
  {
    title: 'Hotels Connected',
    tip: 'Fraser Suites Seef hotel is connected to the mall for convenient stays.',
  },
];

const faqs = [
  {
    q: 'What are Seef Mall opening hours?',
    a: 'Shops are open Sat-Wed 10 AM - 10 PM, Thu-Fri 10 AM - 12 AM. Restaurants stay open until 11 PM on weekdays and midnight on weekends.',
  },
  {
    q: 'Is parking free at Seef Mall?',
    a: 'Yes, Seef Mall offers free parking with over 5,000 spaces available. Valet parking is also available.',
  },
  {
    q: 'What stores are in Seef Mall?',
    a: 'Seef Mall has 200+ stores including H&M, Marks & Spencer, Mango, Sephora, MAC, Bath & Body Works, Skechers, Toys R Us, and many more.',
  },
  {
    q: 'Does Seef Mall have a cinema?',
    a: 'Yes, Seef Megaplex Cinema is located in the mall showing the latest movies.',
  },
  {
    q: 'Is there entertainment for kids?',
    a: 'Yes, Magic Island is a popular family entertainment center with games and activities for children of all ages.',
  },
];

export default function SeefMallPage() {
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
              {mallInfo.tagline}. Established in 1997 with {totalStores}+ retail stores, 
              {totalDining}+ dining options, Magic Island entertainment, and Seef Megaplex Cinema.
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
                <p>Phone: {mallInfo.phone}</p>
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
                <div>
                  <p className="font-semibold text-white">Shops:</p>
                  <p>Sat-Wed: 10:00 AM - 10:00 PM</p>
                  <p>Thu-Fri: 10:00 AM - 12:00 AM</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Restaurants:</p>
                  <p>Sat-Wed: 10:00 AM - 11:00 PM</p>
                  <p>Thu-Fri: 10:00 AM - 12:00 AM</p>
                </div>
                <p className="text-sm text-gray-500">* Hours may vary during Ramadan</p>
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

      {/* Complete Store Directory */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Complete Store Directory</h2>
          <p className="text-gray-400 mb-8">All {totalStores}+ stores from official Seef Mall directory</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-blue-400 mb-3 flex items-center gap-2">
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

      {/* Entertainment */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Entertainment</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
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
            Food & Dining ({totalDining}+ options)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-3">
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
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
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
            description: 'Bahrain\'s original premier shopping destination with 200+ stores, Magic Island entertainment, and dining.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Seef District',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            telephone: '+973 7791 1114',
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
