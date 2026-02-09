import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Building2, Landmark, MapPin, Star,
  ArrowRight, Clock, Sparkles, Coffee, ShoppingBag
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manama City Guide — Best Restaurants, Cafes & Attractions 2026',
  description: 'Explore Manama, Bahrain\'s capital city. Discover the best restaurants, historic souks, modern attractions, cafes, and cultural landmarks in this comprehensive guide.',
  keywords: 'Manama Bahrain, Manama restaurants, Manama attractions, Bab Al Bahrain, Manama Souq, Bahrain capital, things to do Manama, Manama cafes',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/manama-city-guide',
  },
  openGraph: {
    title: 'Manama City Guide — Best Restaurants, Cafes & Attractions 2026',
    description: 'Your complete guide to Manama\'s best restaurants, historic sites, and modern attractions.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/manama-city-guide',
  },
};

const venues = [
  {
    name: 'Haji\'s Café',
    type: 'Traditional Bahraini Café',
    vibe: 'Heritage',
    rating: 5,
    priceRange: 'BD 2-8',
    highlights: ['Karak chai', 'Traditional breakfast', 'Historic setting', 'Local experience'],
    bestFor: 'Authentic Bahraini culture seekers',
  },
  {
    name: 'Saffron by Jena',
    type: 'Fine Dining Restaurant',
    vibe: 'Elegant',
    rating: 5,
    priceRange: 'BD 25-45',
    highlights: ['Gulf cuisine', 'Artistic presentation', 'Private dining', 'Award-winning chef'],
    bestFor: 'Special occasions, food enthusiasts',
  },
  {
    name: 'Mezzaluna',
    type: 'Italian Restaurant',
    vibe: 'Sophisticated',
    rating: 5,
    priceRange: 'BD 20-35',
    highlights: ['Truffle dishes', 'Handmade pasta', 'Extensive wine list', 'City views'],
    bestFor: 'Romantic dinners, business dining',
  },
  {
    name: 'Bahrain Fort Kitchen',
    type: 'Bahraini Restaurant',
    vibe: 'Cultural',
    rating: 4,
    priceRange: 'BD 8-18',
    highlights: ['Fort views', 'Local dishes', 'Outdoor seating', 'Sunset dining'],
    bestFor: 'Tourists, culture lovers',
  },
  {
    name: 'Café Lilou',
    type: 'French Café & Bakery',
    vibe: 'Chic',
    rating: 5,
    priceRange: 'BD 8-15',
    highlights: ['Fresh pastries', 'Specialty coffee', 'Brunch menu', 'Gift boutique'],
    bestFor: 'Brunch dates, afternoon tea',
  },
  {
    name: 'The Gulf Hotel Restaurants',
    type: 'Multi-Cuisine Complex',
    vibe: 'Varied',
    rating: 4,
    priceRange: 'BD 15-40',
    highlights: ['Multiple cuisines', 'Al Waha Arabic', 'China Garden', 'Fusions'],
    bestFor: 'Groups with varied tastes',
  },
  {
    name: 'Bab Al Bahrain Cafés',
    type: 'Traditional Coffee Houses',
    vibe: 'Authentic',
    rating: 4,
    priceRange: 'BD 1-5',
    highlights: ['Arabic coffee', 'People watching', 'Historic ambiance', 'Budget friendly'],
    bestFor: 'Experiencing local life',
  },
  {
    name: 'La Pergola',
    type: 'Mediterranean Restaurant',
    vibe: 'Refined',
    rating: 4,
    priceRange: 'BD 18-30',
    highlights: ['Sea views', 'Fresh seafood', 'Sunset terrace', 'Extensive menu'],
    bestFor: 'Waterfront dining, celebrations',
  },
];

const explorationRoute = [
  { name: 'Start at Bab Al Bahrain', time: '9:00 AM', activity: 'Historic gateway & morning coffee' },
  { name: 'Explore Manama Souq', time: '10:00 AM', activity: 'Spices, gold, textiles & treasures' },
  { name: 'Lunch at Heritage Area', time: '1:00 PM', activity: 'Traditional Bahraini cuisine' },
  { name: 'Bahrain National Museum', time: '3:00 PM', activity: 'Culture & history exhibits' },
  { name: 'Sunset at the Corniche', time: '5:30 PM', activity: 'Walk & waterfront views' },
  { name: 'Dinner in Downtown', time: '7:30 PM', activity: 'Fine dining experience' },
];

const faqs = [
  { q: 'What is Manama known for?', a: 'Manama is Bahrain\'s capital and largest city, known for its blend of modern skyscrapers and ancient heritage. The city features the historic Bab Al Bahrain gateway, traditional souks, world-class museums, and a thriving culinary scene that reflects the kingdom\'s cosmopolitan character.' },
  { q: 'What are the must-visit attractions in Manama?', a: 'Must-visit attractions include Bab Al Bahrain and Manama Souq, the Bahrain National Museum, Al-Fateh Grand Mosque, Bahrain World Trade Center, and the historic pearling trail. The Corniche waterfront promenade offers stunning views of the city skyline.' },
  { q: 'Where can I find the best restaurants in Manama?', a: 'Top restaurants in Manama include Saffron by Jena for elevated Gulf cuisine, Mezzaluna for Italian fine dining, traditional spots in the souq area for authentic Bahraini food, and numerous international restaurants in the hotel district and Financial Harbour area.' },
  { q: 'Is Manama walkable for tourists?', a: 'The historic center around Bab Al Bahrain and the souq is very walkable. However, Manama spreads across several districts, so taxis or ride-shares are recommended for moving between areas. The summer heat (May-September) makes air-conditioned transport essential.' },
  { q: 'What is the best time to visit Manama?', a: 'The best time to visit Manama is between November and March when temperatures are pleasant (15-25°C). Avoid the summer months (June-August) when temperatures exceed 40°C. The spring Formula 1 Grand Prix season brings exciting energy to the entire city.' },
];

export default function ManamaCityGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Manama City Guide', url: 'https://www.bahrainnights.com/guides/manama-city-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏙️ City Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Manama City Guide
              </span>
              {' '}— Best Restaurants, Cafes & Attractions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to Manama, where ancient pearl diving heritage meets 21st-century ambition. 
              Bahrain&apos;s capital city is a fascinating blend of historic souks, gleaming skyscrapers, 
              world-class museums, and a culinary scene that rivals any global metropolis.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '500+', icon: UtensilsCrossed },
              { label: 'Hotels', value: '50+', icon: Building2 },
              { label: 'Museums', value: '8+', icon: Landmark },
              { label: 'Souq Shops', value: '200+', icon: ShoppingBag },
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

      {/* About Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Discovering Manama: Bahrain&apos;s Timeless Capital</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Manama stands as one of the Middle East&apos;s most underrated capital cities, offering visitors 
              an authentic glimpse into Arabian Gulf culture without the overwhelming scale of Dubai or 
              the strict conservatism of some neighboring states. With a history stretching back over 
              5,000 years to the ancient Dilmun civilization, Bahrain&apos;s capital has transformed from 
              a humble pearl diving village into a sophisticated financial center while maintaining 
              its distinctive character and warm hospitality.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The city&apos;s heart remains the iconic Bab Al Bahrain, the historic gateway that has welcomed 
              traders and travelers for centuries. Beyond this ornate arch lies the sprawling Manama 
              Souq, a labyrinthine marketplace where the scent of oud perfume mingles with fresh spices, 
              where goldsmiths craft intricate jewelry, and where fabric merchants display silks from 
              around the world. Unlike sanitized tourist souks elsewhere in the Gulf, Manama&apos;s market 
              retains its authentic trading atmosphere, with local Bahrainis shopping alongside curious visitors.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Modern Manama presents a striking contrast to its historic core. The Bahrain World Trade 
              Center, with its iconic wind turbines, has become a symbol of the kingdom&apos;s forward-thinking 
              approach to development. The Bahrain Financial Harbour area gleams with contemporary 
              architecture, housing international banks, upscale restaurants, and luxury hotels. Yet 
              even here, traditional hospitality prevails — Bahrainis are known throughout the region 
              for their genuine warmth and welcoming nature.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The culinary landscape of Manama reflects its position as a cosmopolitan crossroads. 
              Traditional Bahraini cuisine draws from Persian, Indian, and Arabian influences, resulting 
              in distinctive dishes like machboos (spiced rice with meat), muhammar (sweet rice), and 
              the beloved mahyawa fish sauce. Historic coffee houses serve qahwa (Arabic coffee) and 
              karak chai in the traditional manner, providing perfect spots to observe local life unfold.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              For those seeking fine dining, Manama delivers exceptional experiences. Award-winning 
              restaurants helmed by international chefs operate alongside family-run establishments 
              that have perfected recipes over generations. The city&apos;s hotels — from the historic 
              Gulf Hotel to contemporary five-star properties — house some of the region&apos;s best 
              restaurants, offering everything from authentic Chinese to refined French cuisine.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Cultural attractions abound throughout the capital. The Bahrain National Museum provides 
              an excellent introduction to the kingdom&apos;s rich history, from Dilmun burial mounds to 
              the pearl diving era. The Al-Fateh Grand Mosque, one of the largest in the world, welcomes 
              visitors of all faiths to admire its stunning architecture and learn about Islamic traditions. 
              Art enthusiasts will appreciate the growing gallery scene and regular exhibitions that 
              showcase both local and international talent.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Manama truly comes alive after dark. The Corniche waterfront promenade fills with families 
              enjoying the cooler evening air, while restaurants and cafés buzz with conversation until 
              the early hours. Unlike neighboring capitals, Bahrain offers a relaxed social atmosphere 
              where diverse communities mingle freely. Whether you&apos;re exploring ancient history, 
              savoring world-class cuisine, or simply soaking in the unique atmosphere, Manama offers 
              a genuine Arabian experience that rewards curious travelers who venture beyond the 
              typical tourist trail.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants & Cafes in Manama</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From traditional coffee houses to fine dining establishments, discover Manama&apos;s diverse culinary scene.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-blue-400 text-sm">{venue.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{venue.priceRange}</div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      venue.vibe === 'Heritage' ? 'bg-amber-500/30 text-amber-300' :
                      venue.vibe === 'Elegant' ? 'bg-purple-500/30 text-purple-300' :
                      venue.vibe === 'Sophisticated' ? 'bg-blue-500/30 text-blue-300' :
                      'bg-green-500/30 text-green-300'
                    }`}>
                      {venue.vibe}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < venue.rating ? 'text-blue-400 fill-blue-400' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-300">Best for:</strong> {venue.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Exploration Route */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Perfect Day in Manama</h2>
          <p className="text-gray-400 text-center mb-12">
            Follow this itinerary to experience the best of Bahrain&apos;s capital in one memorable day.
          </p>
          
          <div className="space-y-4">
            {explorationRoute.map((stop, index) => (
              <div key={stop.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-blue-400">{index + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{stop.name}</h3>
                      <p className="text-gray-400 text-sm">{stop.activity}</p>
                    </div>
                    <span className="text-blue-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stop.time}
                    </span>
                  </div>
                </div>
                {index < explorationRoute.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Insider Tips for Manama</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Getting Around</h3>
              <p className="text-gray-400 text-sm">
                Taxis are readily available and affordable. Ride-sharing apps like Uber and Careem 
                work well. The historic center is walkable, but summer heat makes AC transport 
                essential. Rental cars are recommended for exploring beyond Manama.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Timing Your Visit</h3>
              <p className="text-gray-400 text-sm">
                The souq is best explored in the morning (9 AM - 12 PM) or evening. Friday is 
                the weekly holiday — some shops close but restaurants remain open. Museums 
                typically close on Fridays or have reduced hours.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Coffee className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Cultural Tips</h3>
              <p className="text-gray-400 text-sm">
                Bahrain is relatively liberal but modest dress is appreciated, especially 
                when visiting mosques or traditional areas. Always ask permission before 
                photographing people. Tipping 10% is customary at restaurants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Manama Neighborhoods to Explore</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Old Manama</h3>
              <p className="text-gray-400 text-sm">
                Historic heart with souks, traditional cafés, and authentic atmosphere.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Building2 className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Financial Harbour</h3>
              <p className="text-gray-400 text-sm">
                Modern district with upscale dining, luxury hotels, and waterfront promenades.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <UtensilsCrossed className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Diplomatic Area</h3>
              <p className="text-gray-400 text-sm">
                Embassies, international restaurants, and the Bahrain National Museum.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <ShoppingBag className="w-10 h-10 text-pink-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Seef District</h3>
              <p className="text-gray-400 text-sm">
                Shopping malls, cinema complexes, and family entertainment centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More of Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover events, venues, and experiences across the kingdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link 
              href="/guides/adliya-restaurants-bars"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Explore Adliya Guide
            </Link>
          </div>
          
          {/* Cross-promotion */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Looking for events in Manama?{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Check upcoming events on Platinumlist →
              </a>
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Planning an event? <a href="https://eventsbahrain.com" className="text-blue-400 hover:underline">EventsBahrain.com</a></span>
              <span>•</span>
              <span>Need a venue website? <a href="https://cinematicwebworks.com" className="text-blue-400 hover:underline">CinematicWebWorks.com</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 text-sm border-t border-white/5">
        <p>Powered by BahrainNights.com — Bahrain&apos;s #1 Events & Lifestyle Platform</p>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Manama City Guide — Best Restaurants, Cafes & Attractions 2026',
            description: 'Complete guide to Manama\'s best restaurants, historic sites, and modern attractions in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-01',
            dateModified: '2026-02-05',
          }),
        }}
      />
    </div>
  );
}
