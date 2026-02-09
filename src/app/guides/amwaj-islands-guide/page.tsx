import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Waves, Sun, MapPin, Star,
  ArrowRight, Clock, Home, Coffee, Anchor, Music
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Amwaj Islands — Restaurants, Beach Clubs & Things to Do 2026',
  description: 'Discover Amwaj Islands, Bahrain\'s stunning waterfront community. Guide to the best restaurants, beach clubs, cafés, and activities in this island paradise.',
  keywords: 'Amwaj Islands Bahrain, Amwaj restaurants, Amwaj beach club, Lagoon Beach Bahrain, Amwaj things to do, Bahrain islands',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/amwaj-islands-guide',
  },
  openGraph: {
    title: 'Amwaj Islands — Restaurants, Beach Clubs & Things to Do 2026',
    description: 'Your complete guide to Amwaj Islands\' best restaurants, beach clubs, and activities.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/amwaj-islands-guide',
  },
};

const venues = [
  {
    name: 'The Lagoon Beach',
    type: 'Beach Club & Restaurant',
    rating: 5,
    priceRange: 'BD 15-30',
    highlights: ['Private beach', 'Infinity pool', 'Beach dining', 'Weekend brunch', 'Sunset views'],
    bestFor: 'Beach day, brunch, sunset drinks',
  },
  {
    name: 'Trader Vic\'s',
    type: 'Polynesian Restaurant',
    rating: 5,
    priceRange: 'BD 20-35',
    highlights: ['Mai Tais', 'Waterfront seating', 'Exotic cuisine', 'Live entertainment'],
    bestFor: 'Tropical vibes, cocktails, groups',
  },
  {
    name: 'Cantina Kahlo',
    type: 'Mexican Restaurant',
    rating: 4,
    priceRange: 'BD 12-22',
    highlights: ['Authentic tacos', 'Margaritas', 'Vibrant décor', 'Waterfront terrace'],
    bestFor: 'Mexican food, casual dining',
  },
  {
    name: 'Big Texas BBQ',
    type: 'American BBQ',
    rating: 4,
    priceRange: 'BD 10-18',
    highlights: ['Smoked meats', 'Ribs & brisket', 'Casual atmosphere', 'Big portions'],
    bestFor: 'BBQ lovers, families',
  },
  {
    name: 'Coda Jazz Lounge',
    type: 'Jazz Bar & Restaurant',
    rating: 5,
    priceRange: 'BD 18-30',
    highlights: ['Live jazz', 'Cocktails', 'Sophisticated ambiance', 'Late night'],
    bestFor: 'Date night, live music lovers',
  },
  {
    name: 'Costa Coffee',
    type: 'Café',
    rating: 4,
    priceRange: 'BD 3-8',
    highlights: ['Coffee & pastries', 'Waterfront view', 'Casual meetings'],
    bestFor: 'Quick coffee, casual hangout',
  },
  {
    name: 'Saffron by Jena',
    type: 'Indian Restaurant',
    rating: 4,
    priceRange: 'BD 10-18',
    highlights: ['North Indian cuisine', 'Family-friendly', 'Takeaway'],
    bestFor: 'Indian food, families',
  },
  {
    name: 'The Dragon Hotel Restaurants',
    type: 'Multiple Cuisines',
    rating: 4,
    priceRange: 'BD 15-25',
    highlights: ['Chinese', 'Thai', 'Hotel dining', 'Room service'],
    bestFor: 'Asian cuisine, hotel guests',
  },
];

const activities = [
  {
    name: 'Lagoon Beach Day Pass',
    type: 'Beach Club',
    description: 'Spend the day on the private beach with pool access, sun loungers, and full F&B service.',
    price: 'BD 15-25',
    icon: Sun,
  },
  {
    name: 'Jet Skiing',
    type: 'Water Sports',
    description: 'Rent jet skis and explore the waters around Amwaj Islands.',
    price: 'BD 20-40/hour',
    icon: Waves,
  },
  {
    name: 'Kayaking',
    type: 'Water Sports',
    description: 'Paddle through the calm lagoon waters — great for beginners and families.',
    price: 'BD 10-15/hour',
    icon: Anchor,
  },
  {
    name: 'Marina Walk',
    type: 'Leisure',
    description: 'Stroll along the marina promenade, browse shops, and enjoy waterfront dining.',
    price: 'Free',
    icon: MapPin,
  },
  {
    name: 'Yacht Charter',
    type: 'Luxury Experience',
    description: 'Charter a yacht from Amwaj Marina for fishing trips or sunset cruises.',
    price: 'BD 100-500',
    icon: Anchor,
  },
  {
    name: 'Live Jazz at Coda',
    type: 'Entertainment',
    description: 'Enjoy world-class jazz performances with cocktails in an intimate setting.',
    price: 'BD 20-40',
    icon: Music,
  },
];

const faqs = [
  { q: 'What is Amwaj Islands?', a: 'Amwaj Islands is a group of man-made islands in northeast Bahrain, featuring residential communities, hotels, a marina, beach clubs, restaurants, and shops. It\'s known for its relaxed, resort-like atmosphere.' },
  { q: 'Can non-residents visit Amwaj Islands?', a: 'Yes! Amwaj Islands is open to visitors. You can dine at restaurants, visit The Lagoon Beach (day pass required), walk along the marina, and enjoy the cafés and shops without being a resident.' },
  { q: 'What is the best restaurant in Amwaj?', a: 'Popular choices include The Lagoon Beach for beach dining, Trader Vic\'s for Polynesian cuisine, Cantina Kahlo for Mexican, and Coda Jazz Lounge for sophisticated dining with live music.' },
  { q: 'Is there a beach in Amwaj Islands?', a: 'Yes, The Lagoon Beach offers a private beach experience with day passes available. It includes beach access, infinity pool, sun loungers, and full food and beverage service.' },
  { q: 'How do I get to Amwaj Islands?', a: 'Amwaj Islands is about 25 minutes from Manama and 15 minutes from the airport. Drive via the causeway or take a taxi (approximately BD 7-10 from central Manama).' },
];

export default function AmwajGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Amwaj Islands', url: 'https://www.bahrainnights.com/guides/amwaj-islands-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              🏝️ Island Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Amwaj Islands
              </span>
              {' '}— Bahrain&apos;s Island Paradise
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A stunning waterfront community where beach clubs, marina dining, and laid-back 
              island vibes create the perfect escape from city life — just 25 minutes from Manama.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '20+', icon: UtensilsCrossed },
              { label: 'Beach Clubs', value: '1', icon: Waves },
              { label: 'Marina Berths', value: '200+', icon: Anchor },
              { label: 'From Manama', value: '25 min', icon: Clock },
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
          <h2 className="text-3xl font-bold mb-6">Your Island Escape</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Amwaj Islands represents Bahrain&apos;s ambitious vision of waterfront living. This 
              cluster of man-made islands, connected to the mainland by a causeway, offers a 
              distinctly different experience from the bustling streets of Manama. Here, 
              the pace slows down, the views open up, and the sound of waves replaces traffic.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The islands are home to residential towers, villas, hotels, and a marina that 
              serves as the social hub. The marina promenade is lined with restaurants and 
              cafés, each offering waterfront seating with views of bobbing yachts. Whether 
              you&apos;re craving Mexican at Cantina Kahlo, Polynesian at Trader Vic&apos;s, or 
              smoky American BBQ at Big Texas, the dining options punch well above what 
              you&apos;d expect from a small island community.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The crown jewel is The Lagoon Beach — a private beach club that offers the 
              full resort experience. With day passes available, even visitors can enjoy 
              the private beach, infinity pool, sun loungers, and excellent food and 
              beverage service. It&apos;s arguably the best beach experience in Bahrain for 
              those who don&apos;t have hotel beach access.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Beyond dining and beach time, Amwaj offers water sports, yacht charters, and 
              the simple pleasure of a sunset walk along the marina. It&apos;s become a favorite 
              weekend destination for Bahrain residents and a pleasant surprise for visitors 
              who discover this slice of island life.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Where to Eat & Drink</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From beachside dining to sophisticated jazz lounges, Amwaj delivers on variety.
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

      {/* Activities */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Things to Do</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Beyond dining, Amwaj offers beach days, water sports, and marina vibes.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <activity.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{activity.name}</h3>
                    <p className="text-cyan-400 text-sm mb-2">{activity.type}</p>
                    <p className="text-gray-400 text-sm mb-2">{activity.description}</p>
                    <p className="text-gray-500 text-sm font-medium">{activity.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect Day */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">A Perfect Day in Amwaj</h2>
          
          <div className="space-y-4">
            {[
              { time: '10:00 AM', activity: 'Arrive at The Lagoon Beach', desc: 'Get your day pass, claim a lounger, apply sunscreen' },
              { time: '11:00 AM', activity: 'Beach & Pool Time', desc: 'Alternate between the infinity pool and private beach' },
              { time: '1:00 PM', activity: 'Beachside Lunch', desc: 'Order from The Lagoon menu — burgers, salads, fresh juice' },
              { time: '3:00 PM', activity: 'Water Sports', desc: 'Try jet skiing or kayaking around the lagoon' },
              { time: '5:00 PM', activity: 'Marina Walk', desc: 'Shower and stroll the marina promenade as the sun lowers' },
              { time: '6:30 PM', activity: 'Sunset Cocktails', desc: 'Watch the sunset with a Mai Tai at Trader Vic\'s' },
              { time: '8:00 PM', activity: 'Dinner', desc: 'Choose your cuisine — Mexican, BBQ, or jazz lounge fine dining' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-cyan-400 font-medium">{item.time}</span>
                </div>
                <div className="w-4 h-4 bg-cyan-500 rounded-full mt-1 flex-shrink-0" />
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <h3 className="font-bold">{item.activity}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
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
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Island Day</h2>
          <p className="text-gray-300 mb-8">
            Explore more beach clubs and outdoor activities across Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/beach-clubs"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-lg transition-colors"
            >
              Beach Clubs Guide
            </Link>
            <Link 
              href="/guides/outdoor-activities"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Outdoor Activities
            </Link>
          </div>
          
          {/* Cross-promotion */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Book beach parties and events{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                on Platinumlist →
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
            headline: 'Amwaj Islands — Restaurants, Beach Clubs & Things to Do 2026',
            description: 'Complete guide to Amwaj Islands\' best restaurants, beach clubs, and activities in Bahrain.',
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
