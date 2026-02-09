import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Building2, Waves, MapPin, Star,
  ArrowRight, Clock, Hotel, Sparkles, Wine
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain Bay — Fine Dining, Hotels & Waterfront Living 2026',
  description: 'Explore Bahrain Bay, the kingdom\'s most prestigious waterfront destination. Discover luxury hotels, fine dining restaurants, the Four Seasons, and stunning architecture at this iconic development.',
  keywords: 'Bahrain Bay, Bahrain Bay restaurants, Four Seasons Bahrain, Bahrain luxury hotels, Bahrain waterfront, fine dining Bahrain, Bahrain Bay dining, CUT by Wolfgang Puck',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/bahrain-bay-guide',
  },
  openGraph: {
    title: 'Bahrain Bay — Fine Dining, Hotels & Waterfront Living 2026',
    description: 'Your complete guide to Bahrain Bay\'s luxury hotels, fine dining, and waterfront experiences.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/bahrain-bay-guide',
  },
};

const venues = [
  {
    name: 'CUT by Wolfgang Puck',
    type: 'Steakhouse',
    vibe: 'Ultra-Premium',
    rating: 5,
    priceRange: 'BD 40-80',
    highlights: ['USDA Prime steaks', 'Celebrity chef', 'Bay views', 'World-class wine'],
    bestFor: 'Special celebrations, meat aficionados',
  },
  {
    name: 'Re Asian Cuisine',
    type: 'Pan-Asian Fine Dining',
    vibe: 'Sophisticated',
    rating: 5,
    priceRange: 'BD 30-55',
    highlights: ['Japanese-Chinese fusion', 'Tasting menus', 'Sake selection', 'Contemporary design'],
    bestFor: 'Asian cuisine lovers, date nights',
  },
  {
    name: 'Bahrain Bay Kitchen',
    type: 'International Buffet',
    vibe: 'Elegant Casual',
    rating: 5,
    priceRange: 'BD 25-40',
    highlights: ['Live cooking stations', 'Friday brunch', 'Terrace seating', 'All-day dining'],
    bestFor: 'Family celebrations, brunch lovers',
  },
  {
    name: 'Nusr-Et Bahrain',
    type: 'Turkish Steakhouse',
    vibe: 'Theatrical',
    rating: 4,
    priceRange: 'BD 35-70',
    highlights: ['Salt Bae experience', 'Ottoman meat cuts', 'Instagram-worthy', 'Show cooking'],
    bestFor: 'Experience seekers, celebrations',
  },
  {
    name: 'Elementa by Nino',
    type: 'Modern European',
    vibe: 'Innovative',
    rating: 5,
    priceRange: 'BD 30-50',
    highlights: ['Seasonal menus', 'Local ingredients', 'Waterfront setting', 'Tasting experiences'],
    bestFor: 'Gastronomy enthusiasts, couples',
  },
  {
    name: 'Azure',
    type: 'Mediterranean Seafood',
    vibe: 'Refined',
    rating: 4,
    priceRange: 'BD 25-45',
    highlights: ['Fresh catch daily', 'Pool-side dining', 'Sunset views', 'Mediterranean flavors'],
    bestFor: 'Seafood lovers, romantic dinners',
  },
  {
    name: 'The Rooftop',
    type: 'Lounge & Bar',
    vibe: 'Glamorous',
    rating: 5,
    priceRange: 'BD 20-40',
    highlights: ['Skyline views', 'Craft cocktails', 'DJ nights', 'Shisha menu'],
    bestFor: 'Nightlife, drinks with views',
  },
  {
    name: 'Vento Italian Restaurant',
    type: 'Italian Fine Dining',
    vibe: 'Classic',
    rating: 4,
    priceRange: 'BD 25-45',
    highlights: ['Handmade pasta', 'Wood-fired pizza', 'Italian wines', 'Elegant ambiance'],
    bestFor: 'Italian cuisine, family occasions',
  },
];

const luxuryExperience = [
  { name: 'Morning Spa at Four Seasons', time: '10:00 AM', activity: 'Relaxation & wellness treatments' },
  { name: 'Pool Day by the Bay', time: '12:00 PM', activity: 'Infinity pool & light lunch' },
  { name: 'Afternoon Tea', time: '3:00 PM', activity: 'Traditional service with Bay views' },
  { name: 'Sunset at The Rooftop', time: '6:00 PM', activity: 'Cocktails & panoramic views' },
  { name: 'Dinner at CUT', time: '8:00 PM', activity: 'World-class steakhouse experience' },
];

const faqs = [
  { q: 'What is Bahrain Bay?', a: 'Bahrain Bay is a prestigious 380,000 square meter waterfront development located between Manama and the sea. It features the iconic Four Seasons Hotel, luxury residences, the distinctive Arcapita Building, and some of Bahrain\'s finest restaurants. The area represents the kingdom\'s most ambitious urban development project.' },
  { q: 'What are the best restaurants in Bahrain Bay?', a: 'Top restaurants include CUT by Wolfgang Puck for premium steaks, Re Asian Cuisine for elevated Pan-Asian dining, Nusr-Et for the theatrical Salt Bae experience, Elementa by Nino for modern European cuisine, and The Rooftop for cocktails with stunning views. The Four Seasons hosts multiple award-winning dining venues.' },
  { q: 'How do I get to Bahrain Bay?', a: 'Bahrain Bay is located between Manama and the Diplomatic Area, connected via the scenic Bahrain Bay Boulevard. It\'s approximately 10 minutes from central Manama and 20 minutes from the airport. Parking is available throughout the development, and ride-shares drop directly at hotel entrances.' },
  { q: 'Is Bahrain Bay worth visiting?', a: 'Absolutely. Bahrain Bay offers the kingdom\'s most concentrated luxury experience. Whether you\'re seeking world-class dining, spa treatments, stunning architecture, or simply want to admire the bay from the promenade, it\'s essential for those interested in Bahrain\'s contemporary side. The sunset views alone are worth the visit.' },
  { q: 'Can non-hotel guests dine at Bahrain Bay restaurants?', a: 'Yes, all restaurants in Bahrain Bay welcome non-hotel guests. Reservations are recommended, especially for popular venues like CUT by Wolfgang Puck and weekend brunches. Some restaurants and lounges have dress codes, so smart casual attire is advised.' },
];

export default function BahrainBayGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Bahrain Bay Guide', url: 'https://www.bahrainnights.com/guides/bahrain-bay-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              ✨ Luxury Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Bahrain Bay
              </span>
              {' '}— Fine Dining, Hotels & Waterfront Living
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to Bahrain&apos;s most exclusive address. Bahrain Bay rises from the Arabian 
              Gulf as a testament to the kingdom&apos;s ambition — a stunning waterfront destination 
              where celebrity chefs, luxury hotels, and breathtaking architecture create experiences 
              that rival the world&apos;s great cities.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Fine Dining', value: '15+', icon: UtensilsCrossed },
              { label: 'Luxury Hotels', value: '2', icon: Hotel },
              { label: 'Waterfront', value: '1.5km', icon: Waves },
              { label: 'Michelin Stars', value: '3', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
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
          <h2 className="text-3xl font-bold mb-6">Bahrain Bay: The Kingdom&apos;s Crown Jewel</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Rising from a masterfully reclaimed peninsula between Manama and the azure waters 
              of the Arabian Gulf, Bahrain Bay represents the most ambitious urban development 
              in the kingdom&apos;s history. This 380,000 square meter waterfront district has 
              transformed Bahrain&apos;s skyline and established the island nation as a serious 
              player in Gulf luxury hospitality. For visitors seeking the finest dining, most 
              prestigious accommodations, and most stunning views in Bahrain, the Bay is 
              the unrivaled destination.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The centerpiece of Bahrain Bay is the magnificent Four Seasons Hotel, a soaring 
              landmark that has become synonymous with five-star excellence in the kingdom. 
              From its dramatic atrium to its collection of world-class restaurants, the property 
              sets the standard for luxury hospitality in Bahrain. Wolfgang Puck&apos;s CUT, perhaps 
              the most celebrated restaurant in the Gulf region, draws discerning diners from 
              across the Middle East for its exceptional USDA Prime steaks and impeccable service. 
              Re Asian Cuisine delivers sophisticated Pan-Asian flavors in a setting that rivals 
              the best of Hong Kong and Tokyo.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Beyond the Four Seasons, Bahrain Bay has attracted an impressive roster of culinary 
              talent. Nusr-Et, the theatrical Turkish steakhouse made famous by Salt Bae&apos;s 
              viral seasoning technique, brings its unique brand of dining entertainment to the 
              waterfront. Elementa by Nino showcases modern European cuisine with a focus on 
              seasonal ingredients and innovative techniques. The variety ensures that whether 
              you crave Japanese precision, Mediterranean freshness, or American steakhouse 
              indulgence, Bahrain Bay delivers at the highest level.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The architectural significance of Bahrain Bay cannot be overstated. The Arcapita 
              Building, with its distinctive geometric façade, has become an iconic feature of 
              Manama&apos;s skyline. Residential towers designed by internationally acclaimed 
              architects offer some of the most coveted addresses in the Gulf. The development&apos;s 
              urban planning prioritizes the waterfront experience, with promenades, marinas, 
              and public spaces that invite exploration and relaxation.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              For those staying at the Four Seasons or visiting for the day, the wellness 
              offerings are exceptional. The spa provides treatments drawing from global 
              traditions, while the infinity pool overlooking the Bay creates perfect moments 
              of relaxation. The hotel&apos;s private beach offers a rare commodity in Bahrain — 
              a pristine stretch of sand with attentive service and beautiful surroundings.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Bahrain Bay truly comes alive at sunset. As the Arabian sun descends toward the 
              Gulf, the development&apos;s architecture takes on golden hues, and the outdoor 
              terraces of restaurants and lounges fill with well-dressed patrons. The Rooftop 
              lounge offers perhaps the finest sundowner experience in Bahrain, with panoramic 
              views encompassing the city skyline, the bay, and the open sea beyond. This is 
              the hour when Bahrain Bay reveals its true character — sophisticated yet relaxed, 
              cosmopolitan yet distinctly Gulf.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you&apos;re celebrating a special occasion with dinner at CUT, enjoying a 
              leisurely Friday brunch at Bahrain Bay Kitchen, exploring the waterfront promenade, 
              or simply admiring the architecture over a perfectly crafted cocktail, Bahrain Bay 
              delivers experiences that exceed expectations. This is modern Bahrain at its most 
              confident and accomplished — a destination that stands proudly alongside the 
              great waterfront developments of the world. For travelers seeking luxury without 
              the overwhelming scale of Dubai, Bahrain Bay offers an intimate yet world-class 
              alternative that rewards those who discover it.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants at Bahrain Bay</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From celebrity chef venues to sophisticated lounges, discover Bahrain&apos;s finest dining destination.
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
                    <p className="text-cyan-400 text-sm">{venue.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{venue.priceRange}</div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      venue.vibe === 'Ultra-Premium' ? 'bg-amber-500/30 text-amber-300' :
                      venue.vibe === 'Theatrical' ? 'bg-pink-500/30 text-pink-300' :
                      venue.vibe === 'Glamorous' ? 'bg-purple-500/30 text-purple-300' :
                      'bg-cyan-500/30 text-cyan-300'
                    }`}>
                      {venue.vibe}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < venue.rating ? 'text-cyan-400 fill-cyan-400' : 'text-gray-600'}`} 
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

      {/* Luxury Day Route */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Ultimate Bahrain Bay Experience</h2>
          <p className="text-gray-400 text-center mb-12">
            Indulge in a day of luxury at Bahrain&apos;s most exclusive waterfront destination.
          </p>
          
          <div className="space-y-4">
            {luxuryExperience.map((stop, index) => (
              <div key={stop.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-cyan-400">{index + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{stop.name}</h3>
                      <p className="text-gray-400 text-sm">{stop.activity}</p>
                    </div>
                    <span className="text-cyan-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stop.time}
                    </span>
                  </div>
                </div>
                {index < luxuryExperience.length - 1 && (
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
          <h2 className="text-3xl font-bold mb-12 text-center">Insider Tips for Bahrain Bay</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                Bahrain Bay is centrally located, 10 minutes from Manama and 20 minutes from 
                the airport. Valet parking is available at the Four Seasons. Ride-shares 
                drop directly at hotel entrances for convenience.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Wine className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Reservations</h3>
              <p className="text-gray-400 text-sm">
                CUT and Re Asian require advance booking, especially weekends. Friday brunch 
                is extremely popular — book 1-2 weeks ahead. The Rooftop accepts walk-ins 
                but tables with views book up quickly after 6 PM.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Dress Code</h3>
              <p className="text-gray-400 text-sm">
                Smart casual is the minimum for restaurants. CUT and Re Asian prefer elegant 
                attire for dinner. Beach and pool areas are casual during the day. Evening 
                lounges attract a well-dressed crowd.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Bahrain Bay Experiences</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <UtensilsCrossed className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Celebrity Chef Dining</h3>
              <p className="text-gray-400 text-sm">
                Wolfgang Puck&apos;s CUT and other renowned chef concepts.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Hotel className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Luxury Hotels</h3>
              <p className="text-gray-400 text-sm">
                Five-star accommodation at the Four Seasons Bahrain.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Waves className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Waterfront Living</h3>
              <p className="text-gray-400 text-sm">
                Promenades, marina views, and seaside relaxation.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Building2 className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Iconic Architecture</h3>
              <p className="text-gray-400 text-sm">
                Stunning buildings that define Bahrain&apos;s modern skyline.
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
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More of Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover events, venues, and experiences across the kingdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse All Restaurants
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
              Looking for events at Bahrain Bay?{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Check upcoming events on Platinumlist →
              </a>
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Planning an event? <a href="https://eventsbahrain.com" className="text-cyan-400 hover:underline">EventsBahrain.com</a></span>
              <span>•</span>
              <span>Need a venue website? <a href="https://cinematicwebworks.com" className="text-cyan-400 hover:underline">CinematicWebWorks.com</a></span>
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
            headline: 'Bahrain Bay — Fine Dining, Hotels & Waterfront Living 2026',
            description: 'Complete guide to Bahrain Bay\'s luxury hotels, fine dining, and waterfront experiences.',
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
