import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Wine, Music, MapPin, Star,
  ArrowRight, Clock, Sparkles, Coffee, Moon
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Adliya Bahrain — Best Restaurants, Bars & Nightlife Guide 2026',
  description: 'Discover Adliya, Bahrain\'s bohemian dining and nightlife district. Explore the best restaurants, bars, cafes, and hidden gems in this vibrant neighborhood.',
  keywords: 'Adliya Bahrain, Adliya restaurants, Adliya bars, Adliya nightlife, Block 338, dining Adliya, Bahrain nightlife',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/adliya-restaurants-bars',
  },
  openGraph: {
    title: 'Adliya Bahrain — Best Restaurants, Bars & Nightlife Guide 2026',
    description: 'Your complete guide to Adliya\'s best restaurants, bars, and nightlife spots.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/adliya-restaurants-bars',
  },
};

const venues = [
  {
    name: 'Calexico',
    type: 'Mexican Restaurant & Bar',
    vibe: 'Lively',
    rating: 5,
    priceRange: 'BD 15-25',
    highlights: ['Craft cocktails', 'Tacos & burritos', 'Late night vibes', 'Outdoor terrace'],
    bestFor: 'Groups, date night, cocktail lovers',
  },
  {
    name: 'Lilou',
    type: 'French Café & Bistro',
    vibe: 'Chic',
    rating: 5,
    priceRange: 'BD 10-20',
    highlights: ['Artisan pastries', 'All-day breakfast', 'Instagram-worthy', 'Boutique shop'],
    bestFor: 'Brunch, coffee dates, ladies gatherings',
  },
  {
    name: 'Trader Vic\'s',
    type: 'Polynesian Restaurant & Bar',
    vibe: 'Tropical',
    rating: 4,
    priceRange: 'BD 20-35',
    highlights: ['Signature Mai Tais', 'Exotic cuisine', 'Happy hour deals', 'Live entertainment'],
    bestFor: 'Celebrations, exotic food lovers',
  },
  {
    name: 'Masso',
    type: 'Italian Restaurant',
    vibe: 'Elegant',
    rating: 5,
    priceRange: 'BD 18-30',
    highlights: ['Handmade pasta', 'Wood-fired pizza', 'Fine wines', 'Romantic ambiance'],
    bestFor: 'Romantic dinners, Italian cuisine fans',
  },
  {
    name: 'JJ\'s Irish Bar',
    type: 'Pub & Sports Bar',
    vibe: 'Casual',
    rating: 4,
    priceRange: 'BD 8-15',
    highlights: ['Live sports', 'Pub grub', 'Draught beers', 'Pool tables'],
    bestFor: 'Sports fans, casual drinks',
  },
  {
    name: 'Zoe',
    type: 'Mediterranean Restaurant',
    vibe: 'Contemporary',
    rating: 4,
    priceRange: 'BD 15-25',
    highlights: ['Mezze platters', 'Grilled meats', 'Cozy interiors', 'Shisha available'],
    bestFor: 'Mediterranean food lovers, groups',
  },
  {
    name: 'La Vinoteca',
    type: 'Wine Bar & Tapas',
    vibe: 'Intimate',
    rating: 5,
    priceRange: 'BD 20-35',
    highlights: ['Extensive wine list', 'Spanish tapas', 'Cheese boards', 'Romantic setting'],
    bestFor: 'Wine enthusiasts, date night',
  },
  {
    name: 'Block 338 Art Space',
    type: 'Gallery & Café',
    vibe: 'Artistic',
    rating: 4,
    priceRange: 'BD 5-12',
    highlights: ['Art exhibitions', 'Creative events', 'Specialty coffee', 'Unique atmosphere'],
    bestFor: 'Art lovers, creative minds',
  },
];

const barCrawlRoute = [
  { name: 'Start at Lilou', time: '6:00 PM', activity: 'Pre-dinner coffee & pastries' },
  { name: 'Dinner at Calexico', time: '7:30 PM', activity: 'Tacos, nachos & margaritas' },
  { name: 'Cocktails at La Vinoteca', time: '9:30 PM', activity: 'Wine & tapas' },
  { name: 'Late night at Trader Vic\'s', time: '11:00 PM', activity: 'Mai Tais & live music' },
];

const faqs = [
  { q: 'What is Adliya known for in Bahrain?', a: 'Adliya (also known as Block 338) is Bahrain\'s premier dining and nightlife district, famous for its diverse restaurants, trendy bars, art galleries, and bohemian atmosphere. It\'s the go-to destination for foodies and night owls.' },
  { q: 'What are the best restaurants in Adliya?', a: 'Top restaurants in Adliya include Lilou for French cuisine, Calexico for Mexican, Masso for Italian, Zoe for Mediterranean, and Trader Vic\'s for Polynesian. The area offers cuisines from around the world.' },
  { q: 'Is Adliya safe at night?', a: 'Yes, Adliya is very safe at night. It\'s a well-lit, popular area with security presence. The neighborhood is frequented by both locals and expats enjoying the nightlife.' },
  { q: 'What are the best bars in Adliya Bahrain?', a: 'Popular bars include Calexico for craft cocktails, Trader Vic\'s for tropical drinks, La Vinoteca for wine, and JJ\'s Irish Bar for a pub atmosphere. Most restaurants also have excellent bar menus.' },
  { q: 'How do I get to Adliya from Manama?', a: 'Adliya is located about 5 minutes south of central Manama. You can easily reach it by taxi (around BD 2-3) or ride-sharing apps. Parking is available on the streets and in nearby lots.' },
];

export default function AdliyaGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Adliya Restaurants & Bars', url: 'https://www.bahrainnights.com/guides/adliya-restaurants-bars' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🍷 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Adliya
              </span>
              {' '}— Bahrain&apos;s Dining & Nightlife Heart
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to Block 338 — where cobblestone streets meet world-class dining. 
              Adliya is Bahrain&apos;s most eclectic neighborhood, packed with restaurants, 
              bars, art galleries, and boutiques that define the kingdom&apos;s creative soul.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '40+', icon: UtensilsCrossed },
              { label: 'Bars & Lounges', value: '15+', icon: Wine },
              { label: 'Art Galleries', value: '10+', icon: Sparkles },
              { label: 'Peak Hours', value: '8PM-2AM', icon: Moon },
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

      {/* About Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Adliya is Special</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Adliya, affectionately known as Block 338, has transformed from a quiet residential area into 
              Bahrain&apos;s most vibrant dining and entertainment district. The neighborhood&apos;s charm lies in 
              its unique blend of old Bahraini architecture, converted into trendy restaurants, galleries, 
              and boutique shops that attract locals and visitors alike.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Unlike the flashy hotel scenes of Juffair or the mall culture of Seef, Adliya offers an 
              intimate, walkable experience. You can stroll from a French patisserie to a Mexican cantina, 
              stop for wine and tapas, catch an art exhibition, and end the night dancing — all within 
              a few blocks. This concentrated diversity makes it the perfect destination for a night out.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              The area truly comes alive after sunset. By 8 PM, the streets fill with well-dressed diners, 
              and by midnight, the bars and lounges are in full swing. Whether you&apos;re celebrating a 
              special occasion, hosting visiting friends, or simply craving excellent food in a vibrant 
              atmosphere, Adliya delivers an experience that&apos;s quintessentially Bahraini yet 
              internationally sophisticated.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants & Bars</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From casual cafés to upscale dining, here are Adliya&apos;s must-visit establishments.
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
                    <p className="text-purple-400 text-sm">{venue.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{venue.priceRange}</div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      venue.vibe === 'Lively' ? 'bg-orange-500/30 text-orange-300' :
                      venue.vibe === 'Chic' ? 'bg-pink-500/30 text-pink-300' :
                      venue.vibe === 'Intimate' ? 'bg-red-500/30 text-red-300' :
                      'bg-purple-500/30 text-purple-300'
                    }`}>
                      {venue.vibe}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < venue.rating ? 'text-purple-400 fill-purple-400' : 'text-gray-600'}`} 
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

      {/* Bar Crawl Route */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Perfect Adliya Night Out</h2>
          <p className="text-gray-400 text-center mb-12">
            Follow this tried-and-tested route for an unforgettable evening in Block 338.
          </p>
          
          <div className="space-y-4">
            {barCrawlRoute.map((stop, index) => (
              <div key={stop.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-purple-400">{index + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{stop.name}</h3>
                      <p className="text-gray-400 text-sm">{stop.activity}</p>
                    </div>
                    <span className="text-purple-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stop.time}
                    </span>
                  </div>
                </div>
                {index < barCrawlRoute.length - 1 && (
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
          <h2 className="text-3xl font-bold mb-12 text-center">Insider Tips</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                Adliya is 5 minutes from Manama center. Taxi from the airport costs around BD 6-8. 
                Street parking is available but can be tricky on weekends — arrive before 8 PM 
                or use ride-sharing apps.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">Best Times</h3>
              <p className="text-gray-400 text-sm">
                Weeknights (Tue-Wed) for intimate dining without crowds. Thursday and Friday 
                nights for the full experience — book popular spots in advance. Most venues 
                stay open until 2 AM.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Coffee className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">Day vs Night</h3>
              <p className="text-gray-400 text-sm">
                During the day, Adliya offers excellent cafés and art galleries. Lilou and 
                the art spaces are perfect for afternoon exploration. The energy shifts 
                dramatically after 7 PM when the restaurants and bars take center stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
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
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More of Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover events, venues, and experiences across the kingdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link 
              href="/places?category=bar"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Explore Bars & Lounges
            </Link>
          </div>
          
          {/* Cross-promotion */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Looking for events in Adliya?{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                Check upcoming events on Platinumlist →
              </a>
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Planning an event? <a href="https://eventsbahrain.com" className="text-purple-400 hover:underline">EventsBahrain.com</a></span>
              <span>•</span>
              <span>Need a venue website? <a href="https://cinematicwebworks.com" className="text-purple-400 hover:underline">CinematicWebWorks.com</a></span>
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
            headline: 'Adliya Bahrain — Best Restaurants, Bars & Nightlife Guide 2026',
            description: 'Complete guide to Adliya\'s best restaurants, bars, and nightlife spots in Bahrain.',
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
