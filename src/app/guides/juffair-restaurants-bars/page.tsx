import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Wine, Music, MapPin, Star,
  ArrowRight, Clock, Building, Coffee, Moon, Dumbbell
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Juffair Bahrain — Best Restaurants, Bars & Entertainment Guide 2026',
  description: 'Explore Juffair, Bahrain\'s expat hub with the best restaurants, bars, hotels, and entertainment. Your complete guide to dining and nightlife in Juffair.',
  keywords: 'Juffair Bahrain, Juffair restaurants, Juffair bars, Juffair nightlife, Juffair hotels, expat Bahrain, Juffair entertainment',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/juffair-restaurants-bars',
  },
  openGraph: {
    title: 'Juffair Bahrain — Best Restaurants, Bars & Entertainment Guide 2026',
    description: 'Your complete guide to Juffair\'s best restaurants, bars, and entertainment venues.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/juffair-restaurants-bars',
  },
};

const venues = [
  {
    name: 'The Meat Company',
    type: 'Steakhouse',
    location: 'The Domain Hotel',
    rating: 5,
    priceRange: 'BD 25-45',
    highlights: ['Premium steaks', 'South African cuts', 'Wine pairing', 'Private dining'],
    bestFor: 'Steak lovers, special occasions',
  },
  {
    name: 'Bushido',
    type: 'Japanese Restaurant & Lounge',
    location: 'The Gulf Hotel',
    rating: 5,
    priceRange: 'BD 30-50',
    highlights: ['Sushi & sashimi', 'Teppanyaki', 'Sake bar', 'Stylish ambiance'],
    bestFor: 'Japanese cuisine, date night',
  },
  {
    name: 'Sherlock Holmes',
    type: 'British Pub',
    location: 'Gulf Hotel',
    rating: 4,
    priceRange: 'BD 10-20',
    highlights: ['Live music', 'Pub classics', 'Draft beers', 'Sports screens'],
    bestFor: 'Casual drinks, live entertainment',
  },
  {
    name: 'Spices',
    type: 'Indian Restaurant',
    location: 'Gulf Hotel',
    rating: 5,
    priceRange: 'BD 15-28',
    highlights: ['Authentic Indian', 'Live tandoor', 'Curry specialists', 'Elegant setting'],
    bestFor: 'Indian food lovers, groups',
  },
  {
    name: 'Club Se7en',
    type: 'Nightclub',
    location: 'Elite Crystal Hotel',
    rating: 4,
    priceRange: 'BD 15-30',
    highlights: ['DJ nights', 'VIP tables', 'Dance floor', 'Late night'],
    bestFor: 'Dancing, late night crowd',
  },
  {
    name: 'Furn Bistro',
    type: 'Mediterranean Café',
    location: 'The Westin',
    rating: 4,
    priceRange: 'BD 12-22',
    highlights: ['All-day dining', 'Fresh pastries', 'Healthy options', 'Hotel quality'],
    bestFor: 'Breakfast, casual dining',
  },
  {
    name: 'The Den',
    type: 'Sports Bar & Grill',
    location: 'Intercontinental Regency',
    rating: 4,
    priceRange: 'BD 10-18',
    highlights: ['Multiple screens', 'American classics', 'Happy hour', 'Game nights'],
    bestFor: 'Sports fans, casual gatherings',
  },
  {
    name: 'Elements Pool Lounge',
    type: 'Pool Bar & Restaurant',
    location: 'The Westin',
    rating: 4,
    priceRange: 'BD 15-25',
    highlights: ['Poolside dining', 'Sunset views', 'Light bites', 'Cocktails'],
    bestFor: 'Relaxed afternoon, sunset drinks',
  },
];

const hotels = [
  { name: 'The Gulf Hotel', stars: 5, highlight: 'Historic luxury with multiple dining options' },
  { name: 'The Westin Bahrain', stars: 5, highlight: 'Modern luxury with excellent wellness facilities' },
  { name: 'Intercontinental Regency', stars: 5, highlight: 'Business-friendly with great location' },
  { name: 'The Domain Hotel', stars: 4, highlight: 'Boutique feel with top steakhouse' },
  { name: 'Elite Crystal Hotel', stars: 4, highlight: 'Nightlife hub with clubs' },
  { name: 'Downtown Rotana', stars: 4, highlight: 'Value luxury in central Juffair' },
];

const faqs = [
  { q: 'What is Juffair known for in Bahrain?', a: 'Juffair is Bahrain\'s primary expat and entertainment district, known for its concentration of hotels, restaurants, bars, nightclubs, and international dining options. It\'s popular with both residents and visitors seeking nightlife.' },
  { q: 'What are the best restaurants in Juffair?', a: 'Top restaurants include The Meat Company for steaks, Bushido for Japanese, Spices for Indian, and Furn Bistro for Mediterranean. Most 5-star hotels in the area have excellent dining options.' },
  { q: 'Is Juffair safe for tourists?', a: 'Yes, Juffair is very safe and popular with tourists. The area has significant security presence due to its many hotels and is well-lit and maintained. It\'s one of the most tourist-friendly areas in Bahrain.' },
  { q: 'What is the nightlife like in Juffair?', a: 'Juffair has Bahrain\'s most active nightlife scene with numerous bars, clubs, and live entertainment venues. Popular spots include Sherlock Holmes pub, Club Se7en, and various hotel bars. Most venues are busiest Thursday-Saturday.' },
  { q: 'How far is Juffair from Bahrain airport?', a: 'Juffair is approximately 15-20 minutes from Bahrain International Airport by taxi (around BD 5-7). The area is centrally located, close to Manama and Adliya.' },
];

export default function JuffairGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Juffair Restaurants & Bars', url: 'https://www.bahrainnights.com/guides/juffair-restaurants-bars' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏨 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Juffair
              </span>
              {' '}— Bahrain&apos;s Entertainment Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The beating heart of Bahrain&apos;s expat community. Juffair combines world-class hotels, 
              diverse restaurants, buzzing nightlife, and endless entertainment in one vibrant district.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Hotels', value: '20+', icon: Building },
              { label: 'Restaurants', value: '50+', icon: UtensilsCrossed },
              { label: 'Bars & Clubs', value: '25+', icon: Wine },
              { label: 'Entertainment', value: '24/7', icon: Moon },
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
          <h2 className="text-3xl font-bold mb-6">The Expat Capital of Bahrain</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Juffair has earned its reputation as Bahrain&apos;s most cosmopolitan neighborhood. 
              Originally developed to accommodate the growing expat community, particularly those 
              connected to the nearby US Naval base, the area has evolved into a full-fledged 
              entertainment district that rivals any in the Gulf region.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              What makes Juffair special is its concentration of everything you need within walking 
              distance. Luxury hotels like The Gulf Hotel and The Westin anchor the district, each 
              offering multiple dining venues, from fine dining to casual bars. The streets between 
              are lined with restaurants representing cuisines from around the world — Filipino, 
              Indian, Lebanese, American, Thai, and more.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The nightlife here is legendary in the Gulf. While neighboring Saudi visitors flock 
              here for the lively bar scene, the entertainment options have matured beyond just 
              drinking spots. Live music venues, sports bars with multiple screens, sophisticated 
              lounges, and high-energy nightclubs cater to every taste and mood.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              For expats living in Bahrain, Juffair often becomes a second home — a place to unwind 
              after work, meet friends for dinner, catch the big game, or dance until dawn. For 
              visitors, it provides a convenient base with endless options steps from your hotel door.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants & Bars</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From hotel fine dining to late-night clubs, here&apos;s where to eat and drink in Juffair.
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
                    <p className="text-gray-500 text-xs">{venue.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{venue.priceRange}</div>
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

      {/* Hotels Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Where to Stay</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Juffair offers Bahrain&apos;s highest concentration of quality hotels.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{hotel.name}</h3>
                  <div className="flex gap-0.5">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{hotel.highlight}</p>
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
              <MapPin className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Getting Around</h3>
              <p className="text-gray-400 text-sm">
                Juffair is compact and walkable, especially the hotel district. For venues slightly 
                further out, taxis are cheap (BD 1-2 within the area). Most hotels offer free 
                shuttle service to City Centre Mall.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Peak Times</h3>
              <p className="text-gray-400 text-sm">
                Thursday and Friday nights are busiest — book restaurants in advance. For a 
                quieter experience, visit Sunday-Wednesday. Happy hours typically run 5-8 PM. 
                Clubs don&apos;t pick up until after midnight.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Dumbbell className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Beyond Nightlife</h3>
              <p className="text-gray-400 text-sm">
                Juffair isn&apos;t just about bars. The Westin has an excellent spa, hotels have 
                great pools, and there are supermarkets, pharmacies, and services for everyday 
                needs. It&apos;s a complete neighborhood.
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Juffair Tonight</h2>
          <p className="text-gray-300 mb-8">
            Browse venues, check events, and plan your perfect night out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link 
              href="/guides/nightlife-juffair"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Juffair Nightlife Guide
            </Link>
          </div>
          
          {/* Cross-promotion */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Find events and parties in Juffair{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                on Platinumlist →
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
            headline: 'Juffair Bahrain — Best Restaurants, Bars & Entertainment Guide 2026',
            description: 'Complete guide to Juffair\'s best restaurants, bars, and entertainment in Bahrain.',
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
