import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, ShoppingBag, Film, MapPin, Star,
  ArrowRight, Clock, Building, Coffee, Car, Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Seef District — Best Restaurants, Shopping & Entertainment 2026',
  description: 'Explore Seef District, Bahrain\'s premier shopping and dining destination. Complete guide to restaurants, malls, entertainment, and family activities.',
  keywords: 'Seef Bahrain, Seef Mall, City Centre Bahrain, Seef restaurants, shopping Bahrain, Seef District, Bahrain malls',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/seef-restaurants-shopping',
  },
  openGraph: {
    title: 'Seef District — Best Restaurants, Shopping & Entertainment 2026',
    description: 'Your complete guide to Seef District\'s best restaurants, malls, and entertainment.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/seef-restaurants-shopping',
  },
};

const malls = [
  {
    name: 'City Centre Bahrain',
    size: '350,000 sqm',
    stores: '340+',
    rating: 5,
    highlights: ['Largest mall', 'Wahoo! Waterpark', 'Magic Planet', 'VOX Cinema', 'Major brands'],
    dining: ['P.F. Chang\'s', 'Cheesecake Factory', 'Texas Roadhouse', 'Nandos'],
  },
  {
    name: 'Seef Mall',
    size: '130,000 sqm',
    stores: '200+',
    rating: 4,
    highlights: ['Original Seef mall', 'Family-friendly', 'Affordable brands', 'Good food court'],
    dining: ['McDonald\'s', 'Pizza Hut', 'Subway', 'Local restaurants'],
  },
  {
    name: 'The Avenues Bahrain',
    size: '175,000 sqm',
    stores: '280+',
    rating: 5,
    highlights: ['Newest mall', 'Luxury brands', 'Cinema', 'Waterfront dining', 'Modern design'],
    dining: ['The Butcher Shop', 'Carino\'s', 'Salt', 'High-end cafés'],
  },
];

const restaurants = [
  {
    name: 'P.F. Chang\'s',
    type: 'Asian Fusion',
    location: 'City Centre',
    rating: 5,
    priceRange: 'BD 15-25',
    highlights: ['Signature lettuce wraps', 'Extensive menu', 'Stylish ambiance'],
    bestFor: 'Groups, Asian food lovers',
  },
  {
    name: 'The Cheesecake Factory',
    type: 'American',
    location: 'City Centre',
    rating: 5,
    priceRange: 'BD 12-22',
    highlights: ['Huge menu', 'Famous cheesecakes', 'Big portions'],
    bestFor: 'Families, American cuisine fans',
  },
  {
    name: 'Texas Roadhouse',
    type: 'American Steakhouse',
    location: 'City Centre',
    rating: 4,
    priceRange: 'BD 10-20',
    highlights: ['Hand-cut steaks', 'Fresh rolls', 'Country atmosphere'],
    bestFor: 'Steak lovers, casual dining',
  },
  {
    name: 'The Butcher Shop',
    type: 'Steakhouse',
    location: 'The Avenues',
    rating: 5,
    priceRange: 'BD 20-35',
    highlights: ['Premium cuts', 'Pick your steak', 'Modern grill'],
    bestFor: 'Meat enthusiasts, upscale casual',
  },
  {
    name: 'Salt',
    type: 'Burgers & American',
    location: 'The Avenues',
    rating: 4,
    priceRange: 'BD 6-12',
    highlights: ['Gourmet burgers', 'Sliders', 'Hip vibe'],
    bestFor: 'Quick bites, burger fans',
  },
  {
    name: 'Nando\'s',
    type: 'Peri-Peri Chicken',
    location: 'City Centre',
    rating: 4,
    priceRange: 'BD 6-12',
    highlights: ['Flame-grilled chicken', 'Spice levels', 'Quick service'],
    bestFor: 'Casual meals, chicken lovers',
  },
];

const entertainment = [
  {
    name: 'Wahoo! Waterpark',
    type: 'Indoor Waterpark',
    location: 'City Centre',
    description: 'Bahrain\'s biggest indoor waterpark with slides, wave pool, and lazy river.',
    priceRange: 'BD 8-15',
  },
  {
    name: 'VOX Cinema',
    type: 'Movie Theater',
    location: 'City Centre & The Avenues',
    description: 'Premium cinema with IMAX, 4DX, GOLD, and kids screens.',
    priceRange: 'BD 4-20',
  },
  {
    name: 'Magic Planet',
    type: 'Family Entertainment',
    location: 'City Centre',
    description: 'Arcade games, rides, and attractions for kids and families.',
    priceRange: 'BD 5-15',
  },
  {
    name: 'Bounce',
    type: 'Trampoline Park',
    location: 'The Avenues',
    description: 'Interconnected trampolines, foam pits, and freestyle areas.',
    priceRange: 'BD 6-12',
  },
];

const faqs = [
  { q: 'What is Seef District known for in Bahrain?', a: 'Seef District is Bahrain\'s premier shopping and commercial hub, home to major malls including City Centre Bahrain (the largest) and The Avenues. It\'s known for retail therapy, family entertainment, and diverse dining options.' },
  { q: 'What are the best malls in Seef?', a: 'The top malls are City Centre Bahrain (largest, with Wahoo! Waterpark), The Avenues (newest, upscale), and the original Seef Mall. Together they offer over 800 stores and endless entertainment.' },
  { q: 'What are the best restaurants in Seef District?', a: 'Popular restaurants include P.F. Chang\'s, The Cheesecake Factory, and Texas Roadhouse at City Centre, plus The Butcher Shop and Salt at The Avenues. Food courts offer quick, affordable options.' },
  { q: 'Is Seef good for families?', a: 'Yes, Seef is excellent for families. Wahoo! Waterpark, Magic Planet, Bounce trampoline park, and multiple cinemas provide entertainment for all ages. Most restaurants are family-friendly with kids\' menus.' },
  { q: 'How do I get to Seef District?', a: 'Seef is located in central Bahrain, about 15-20 minutes from the airport. Major hotels offer shuttle services to the malls. Parking is plentiful and free at all shopping centers.' },
];

export default function SeefGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Seef Restaurants & Shopping', url: 'https://www.bahrainnights.com/guides/seef-restaurants-shopping' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              🛍️ Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Seef District
              </span>
              {' '}— Shop, Dine & Play
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s retail and entertainment capital. From mega malls to waterparks, 
              international dining to movie theaters — Seef has everything under one roof 
              (or three).
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Malls', value: '3', icon: ShoppingBag },
              { label: 'Stores', value: '800+', icon: Sparkles },
              { label: 'Restaurants', value: '100+', icon: UtensilsCrossed },
              { label: 'Free Parking', value: '5000+', icon: Car },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
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
          <h2 className="text-3xl font-bold mb-6">Bahrain&apos;s Retail Paradise</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Seef District has transformed from sandy plots to Bahrain&apos;s commercial heart over 
              the past two decades. The area is dominated by three mega malls that collectively 
              offer the most comprehensive shopping experience in the kingdom. Whether you&apos;re hunting 
              for luxury brands, budget finds, or just escaping the summer heat, Seef delivers.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              City Centre Bahrain anchors the district as the largest mall in the country. Its 
              340+ stores are joined by Wahoo! Waterpark — a full-scale indoor waterpark that 
              makes it a destination in itself. VOX Cinema offers premium movie experiences 
              including IMAX and 4DX, while Magic Planet keeps younger visitors entertained.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The Avenues, Bahrain&apos;s newest mall, brings a more upscale experience with 
              international brands, waterfront dining, and modern architecture. Bounce trampoline 
              park adds another entertainment dimension. The original Seef Mall remains popular 
              for its accessible prices and local charm.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Beyond shopping, Seef has become a dining destination. Chain restaurants from America 
              and beyond have set up shop here, while food courts offer quick bites from around 
              the world. It&apos;s the kind of place where you pop in for an hour and leave four 
              hours later, bags in hand, stomach full.
            </p>
          </div>
        </div>
      </section>

      {/* Malls Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Big Three Malls</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Seef&apos;s three mega malls offer distinct experiences — here&apos;s what each brings to the table.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {malls.map((mall) => (
              <div 
                key={mall.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{mall.name}</h3>
                  <div className="flex gap-4 text-sm text-gray-400 mt-1">
                    <span>{mall.size}</span>
                    <span>•</span>
                    <span>{mall.stores} stores</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < mall.rating ? 'text-emerald-400 fill-emerald-400' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-300 font-medium mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {mall.highlights.map((h) => (
                      <span key={h} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-300 font-medium mb-2">Dining:</p>
                  <p className="text-sm text-gray-400">{mall.dining.join(' • ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From American classics to Asian fusion, these restaurants are worth the trip.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-emerald-400 text-sm">{restaurant.type}</p>
                    <p className="text-gray-500 text-xs">{restaurant.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{restaurant.priceRange}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < restaurant.rating ? 'text-emerald-400 fill-emerald-400' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-300">Best for:</strong> {restaurant.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entertainment */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Entertainment & Activities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Shopping is just the beginning — Seef keeps the whole family entertained.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {entertainment.map((ent) => (
              <div key={ent.name} className="bg-white/5 rounded-xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Film className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{ent.name}</h3>
                  <p className="text-emerald-400 text-sm mb-2">{ent.type} • {ent.location}</p>
                  <p className="text-gray-400 text-sm mb-2">{ent.description}</p>
                  <p className="text-gray-500 text-sm">Price: {ent.priceRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Insider Tips</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">Best Times to Visit</h3>
              <p className="text-gray-400 text-sm">
                Weekday mornings are quietest. Friday afternoons and weekends are packed. 
                Malls open 10 AM-10 PM (until midnight on weekends). Restaurants stay open 
                later than stores.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Car className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">Parking</h3>
              <p className="text-gray-400 text-sm">
                All malls offer free parking. City Centre has multi-story lots — use the 
                color-coded zones to remember your spot. The Avenues has underground parking. 
                Peak times may require patience.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                Seef is central and well-connected. Most hotels offer shuttle buses. Taxis 
                from Juffair run about BD 2-3. The malls are walking distance from each 
                other if you don&apos;t mind a short stroll.
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
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Seef Adventure</h2>
          <p className="text-gray-300 mb-8">
            Discover more places to explore across Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls/city-centre"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-colors"
            >
              City Centre Guide
            </Link>
            <Link 
              href="/places?category=shopping"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Shopping
            </Link>
          </div>
          
          {/* Cross-promotion */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Check movie times and events{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                on Platinumlist →
              </a>
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Planning an event? <a href="https://eventsbahrain.com" className="text-emerald-400 hover:underline">EventsBahrain.com</a></span>
              <span>•</span>
              <span>Need a venue website? <a href="https://cinematicwebworks.com" className="text-emerald-400 hover:underline">CinematicWebWorks.com</a></span>
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
            headline: 'Seef District — Best Restaurants, Shopping & Entertainment 2026',
            description: 'Complete guide to Seef District\'s best restaurants, malls, and entertainment in Bahrain.',
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
