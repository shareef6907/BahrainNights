import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Home, TreePine, MapPin, Star,
  ArrowRight, Clock, ShoppingCart, Car, Mountain
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Riffa Bahrain — Best Restaurants & Things to Do Guide 2026',
  description: 'Explore Riffa, Bahrain\'s largest city. Discover the best restaurants, Riffa Fort, shopping centers, and family attractions in this comprehensive local guide.',
  keywords: 'Riffa Bahrain, Riffa restaurants, Riffa Fort, East Riffa, West Riffa, Riffa Views, things to do Riffa, Bahrain International Circuit',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/riffa-guide',
  },
  openGraph: {
    title: 'Riffa Bahrain — Best Restaurants & Things to Do Guide 2026',
    description: 'Your complete guide to Riffa\'s best restaurants, historic sites, and family activities.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/riffa-guide',
  },
};

const venues = [
  {
    name: 'The Meat Co',
    type: 'Steakhouse & Grill',
    vibe: 'Premium',
    rating: 5,
    priceRange: 'BD 20-40',
    highlights: ['Aged steaks', 'South African cuts', 'Private booths', 'Extensive wine list'],
    bestFor: 'Meat lovers, special celebrations',
  },
  {
    name: 'Bahrain Bay Kitchen',
    type: 'International Buffet',
    vibe: 'Family',
    rating: 4,
    priceRange: 'BD 15-25',
    highlights: ['Live cooking stations', 'Friday brunch', 'Kid-friendly', 'Gulf views'],
    bestFor: 'Family gatherings, brunch lovers',
  },
  {
    name: 'Trader Vic\'s at Ritz Carlton',
    type: 'Polynesian Restaurant',
    vibe: 'Tropical',
    rating: 5,
    priceRange: 'BD 25-45',
    highlights: ['Signature cocktails', 'Island cuisine', 'Beachside setting', 'Live entertainment'],
    bestFor: 'Romantic evenings, beach vibes',
  },
  {
    name: 'La Med at Ritz Carlton',
    type: 'Mediterranean Restaurant',
    vibe: 'Elegant',
    rating: 5,
    priceRange: 'BD 25-40',
    highlights: ['Fresh seafood', 'Terrace dining', 'Sunset views', 'Chef specials'],
    bestFor: 'Fine dining, anniversaries',
  },
  {
    name: 'Al Abraaj',
    type: 'Traditional Arabic Restaurant',
    vibe: 'Cultural',
    rating: 4,
    priceRange: 'BD 10-20',
    highlights: ['Authentic Arabian', 'Grilled meats', 'Shisha terrace', 'Family atmosphere'],
    bestFor: 'Traditional cuisine, groups',
  },
  {
    name: 'Riffa Town Center Food Court',
    type: 'Multi-Cuisine',
    vibe: 'Casual',
    rating: 3,
    priceRange: 'BD 3-10',
    highlights: ['Quick bites', 'Variety of options', 'Budget friendly', 'Air-conditioned'],
    bestFor: 'Quick meals, shopping breaks',
  },
  {
    name: 'Thai Lounge',
    type: 'Thai Restaurant',
    vibe: 'Refined',
    rating: 4,
    priceRange: 'BD 12-22',
    highlights: ['Authentic Thai', 'Spa-like ambiance', 'Vegetarian options', 'Private rooms'],
    bestFor: 'Thai food enthusiasts, couples',
  },
  {
    name: 'Hawar Traditional Restaurant',
    type: 'Bahraini Cuisine',
    vibe: 'Heritage',
    rating: 4,
    priceRange: 'BD 8-18',
    highlights: ['Local recipes', 'Fresh fish', 'Traditional setting', 'Friendly service'],
    bestFor: 'Cultural experience, locals\' favorite',
  },
];

const explorationRoute = [
  { name: 'Morning at Riffa Fort', time: '9:00 AM', activity: 'Explore historic fortress & views' },
  { name: 'Riffa Views Golf Course', time: '10:30 AM', activity: 'Championship course or café' },
  { name: 'Lunch at Ritz Carlton', time: '1:00 PM', activity: 'Beachside dining experience' },
  { name: 'Bahrain International Circuit', time: '3:30 PM', activity: 'Track tours & experiences' },
  { name: 'Riffa Town Center', time: '5:30 PM', activity: 'Shopping & entertainment' },
  { name: 'Dinner in East Riffa', time: '7:30 PM', activity: 'Traditional or international cuisine' },
];

const faqs = [
  { q: 'What is Riffa known for in Bahrain?', a: 'Riffa is Bahrain\'s largest city and a major residential hub, known for the historic Riffa Fort, the Ritz Carlton beach resort, Riffa Views residential community with its golf course, and proximity to the Bahrain International Circuit which hosts the Formula 1 Grand Prix.' },
  { q: 'What are the best restaurants in Riffa?', a: 'Top restaurants in Riffa include The Meat Co for premium steaks, Trader Vic\'s and La Med at the Ritz Carlton for resort dining, Al Abraaj for traditional Arabic cuisine, and Thai Lounge for authentic Thai food. The Ritz Carlton property offers multiple world-class dining options.' },
  { q: 'How far is Riffa from Manama?', a: 'Riffa is approximately 15-20 kilometers south of Manama, about a 20-30 minute drive depending on traffic. The city is well-connected via main highways. East Riffa and West Riffa are the two main areas, each with distinct character and amenities.' },
  { q: 'What is there to do in Riffa?', a: 'Riffa offers diverse activities including touring the historic Riffa Fort, golfing at Riffa Views, enjoying beach resort facilities at the Ritz Carlton, visiting the Bahrain International Circuit, shopping at Riffa Town Center, and exploring the residential neighborhoods known for their greenery and calm atmosphere.' },
  { q: 'Is Riffa good for families?', a: 'Yes, Riffa is excellent for families. The area is known for its quieter, more suburban atmosphere compared to Manama. It offers family-friendly restaurants, parks, the Al Areen Wildlife Park nearby, and easy access to the Lost Paradise of Dilmun water park. Many expatriate families choose Riffa for its spacious housing and community feel.' },
];

export default function RiffaGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Riffa Guide', url: 'https://www.bahrainnights.com/guides/riffa-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🏡 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                Riffa
              </span>
              {' '}— Best Restaurants & Things to Do
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover Bahrain&apos;s largest city — a blend of historic forts, world-class golf, 
              Formula 1 excitement, and the island&apos;s most prestigious resort. Riffa offers 
              a more relaxed pace while delivering exceptional dining and family experiences.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '100+', icon: UtensilsCrossed },
              { label: 'Golf Courses', value: '2', icon: TreePine },
              { label: 'Historic Sites', value: '5+', icon: Mountain },
              { label: 'Shopping Centers', value: '3', icon: ShoppingCart },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
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
          <h2 className="text-3xl font-bold mb-6">Exploring Riffa: Bahrain&apos;s Green Heart</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Riffa represents a different side of Bahrain — one of tree-lined streets, expansive 
              villas, world-class golf courses, and a slower pace of life that provides welcome 
              respite from the bustling capital. As Bahrain&apos;s most populous city, Riffa has 
              evolved from a traditional settlement into a prestigious residential destination 
              while maintaining its connection to the kingdom&apos;s royal heritage and history.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The city is divided into two distinct areas: East Riffa and West Riffa. East Riffa 
              is home to the historic Riffa Fort, a beautifully restored 19th-century fortress 
              that once served as the residence of Bahrain&apos;s rulers. Perched on a hill overlooking 
              palm groves, the fort offers panoramic views and a fascinating glimpse into the 
              kingdom&apos;s past. The surrounding area maintains a traditional character, with 
              winding streets and local markets that feel authentically Bahraini.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              West Riffa presents a more modern face, anchored by the Riffa Views development — 
              one of Bahrain&apos;s most exclusive residential communities. The Colin Montgomerie-designed 
              golf course here attracts enthusiasts from across the Gulf, while the surrounding 
              community of villas houses many of Bahrain&apos;s affluent families and long-term 
              expatriate residents. The area&apos;s reputation for quality extends to its dining scene, 
              with restaurants catering to discerning residents who appreciate good food.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The crown jewel of Riffa&apos;s hospitality offering is undoubtedly the Ritz Carlton 
              Bahrain. This stunning beachfront resort combines Arabic architectural elegance with 
              world-class facilities, offering visitors a genuine five-star experience. Multiple 
              restaurants, a pristine private beach, and impeccable service make it a destination 
              in its own right. Trader Vic&apos;s here has become legendary for its tropical cocktails 
              and Polynesian cuisine, while La Med delivers sophisticated Mediterranean dining 
              with stunning Gulf views.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              For motorsport enthusiasts, Riffa&apos;s proximity to the Bahrain International Circuit 
              adds an exciting dimension. This world-class facility, which hosts the Formula 1 
              Bahrain Grand Prix each spring, offers track experiences throughout the year. 
              Visitors can take driving experiences on the actual F1 circuit, attend various 
              racing events, or simply tour the impressive facilities. The circuit has become 
              a symbol of Bahrain&apos;s modern ambitions and draws international visitors year-round.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Family-friendly attractions abound in and around Riffa. The Al Areen Wildlife Park 
              provides a unique opportunity to see Arabian oryx, gazelles, and other regional 
              wildlife in naturalistic settings. The Lost Paradise of Dilmun water park offers 
              thrilling rides and pools perfect for escaping the summer heat. These attractions, 
              combined with Riffa&apos;s quieter streets and spacious parks, make the area particularly 
              appealing for families with children.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Dining in Riffa ranges from casual local eateries serving authentic Bahraini cuisine 
              to the refined international restaurants of the Ritz Carlton. East Riffa offers 
              traditional coffee houses and family restaurants where you can sample machboos 
              and fresh fish prepared in time-honored ways. West Riffa and the Riffa Views area 
              cater to more upscale tastes, with restaurants offering cuisines from around the world. 
              Whether you&apos;re seeking a leisurely Friday brunch, a romantic dinner with a view, 
              or an authentic local meal, Riffa delivers options that satisfy every palate and occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants in Riffa</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From resort fine dining to traditional Arabic cuisine, discover Riffa&apos;s diverse culinary landscape.
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
                    <p className="text-green-400 text-sm">{venue.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{venue.priceRange}</div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      venue.vibe === 'Premium' ? 'bg-amber-500/30 text-amber-300' :
                      venue.vibe === 'Tropical' ? 'bg-cyan-500/30 text-cyan-300' :
                      venue.vibe === 'Elegant' ? 'bg-purple-500/30 text-purple-300' :
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
                      className={`w-4 h-4 ${i < venue.rating ? 'text-green-400 fill-green-400' : 'text-gray-600'}`} 
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
          <h2 className="text-3xl font-bold mb-4 text-center">The Perfect Day in Riffa</h2>
          <p className="text-gray-400 text-center mb-12">
            Experience the best of Bahrain&apos;s largest city with this curated itinerary.
          </p>
          
          <div className="space-y-4">
            {explorationRoute.map((stop, index) => (
              <div key={stop.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-green-400">{index + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{stop.name}</h3>
                      <p className="text-gray-400 text-sm">{stop.activity}</p>
                    </div>
                    <span className="text-green-400 text-sm flex items-center gap-1">
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
          <h2 className="text-3xl font-bold mb-12 text-center">Insider Tips for Riffa</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Car className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                Riffa is a 20-30 minute drive from Manama via the main highway. A rental car is 
                highly recommended as the area is spread out and public transport is limited. 
                Taxis and ride-shares are available but less frequent than in Manama.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Best Times to Visit</h3>
              <p className="text-gray-400 text-sm">
                Morning visits to Riffa Fort beat the heat. Ritz Carlton restaurants are 
                busiest on weekends — book ahead for Friday brunch. F1 season (March) brings 
                excitement but also crowds and higher prices.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Home className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Neighborhood Vibes</h3>
              <p className="text-gray-400 text-sm">
                East Riffa is traditional and historic; West Riffa is modern and upscale. 
                The Ritz Carlton area offers resort luxury. Riffa Views is residential 
                with excellent golf facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Things to Do in Riffa</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Mountain className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Riffa Fort</h3>
              <p className="text-gray-400 text-sm">
                Explore the restored 19th-century fortress with panoramic views.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <TreePine className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Golf at Riffa Views</h3>
              <p className="text-gray-400 text-sm">
                Play the championship course designed by Colin Montgomerie.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Car className="w-10 h-10 text-red-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">F1 Circuit</h3>
              <p className="text-gray-400 text-sm">
                Drive the actual Grand Prix track or take a facility tour.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Al Areen Wildlife</h3>
              <p className="text-gray-400 text-sm">
                See Arabian oryx and regional wildlife in natural habitats.
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-teal-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More of Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover events, venues, and experiences across the kingdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse All Restaurants
            </Link>
            <Link 
              href="/guides/manama-city-guide"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Explore Manama Guide
            </Link>
          </div>
          
          {/* Cross-promotion */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Looking for events near Riffa?{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                Check upcoming events on Platinumlist →
              </a>
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Planning an event? <a href="https://eventsbahrain.com" className="text-green-400 hover:underline">EventsBahrain.com</a></span>
              <span>•</span>
              <span>Need a venue website? <a href="https://cinematicwebworks.com" className="text-green-400 hover:underline">CinematicWebWorks.com</a></span>
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
            headline: 'Riffa Bahrain — Best Restaurants & Things to Do Guide 2026',
            description: 'Complete guide to Riffa\'s best restaurants, historic sites, and family activities in Bahrain.',
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
