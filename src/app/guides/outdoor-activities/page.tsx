import { Metadata } from 'next';
import Link from 'next/link';
import { 
  TreePalm, Clock, MapPin, Star,
  Sun, Waves, Wind, Mountain
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Outdoor Activities in Bahrain 2025 | Desert Safari, Water Sports & More',
  description: 'Discover outdoor activities in Bahrain! Complete guide to desert safaris, water sports, camping, kayaking, diving, horse riding, and adventure experiences.',
  keywords: 'outdoor activities Bahrain, desert safari Bahrain, water sports Bahrain, kayaking Bahrain, diving Bahrain, camping Bahrain, horse riding Bahrain',
  openGraph: {
    title: 'Outdoor Activities in Bahrain 2025 | Desert Safari, Water Sports & More',
    description: 'Your guide to outdoor adventures in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/outdoor-activities',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/outdoor-activities',
  },
};

const activities = [
  {
    name: 'Desert Safari & Dune Bashing',
    category: 'Desert',
    rating: 5,
    price: 'BD 25-50 per person',
    description: 'Thrilling 4x4 adventures across Bahrain\'s southern desert. Experience dune bashing, sandboarding, camel rides, and traditional Bedouin camps.',
    highlights: ['4x4 dune driving', 'Sandboarding', 'Camel rides', 'Desert camps', 'BBQ dinners', 'Sunset views'],
    location: 'Sakhir Desert (southern Bahrain)',
    duration: '4-6 hours (half-day) or overnight',
    season: 'October - April (too hot in summer)',
    providers: ['Local tour operators', 'Hotel concierge', 'Adventure companies'],
    tips: 'Book sunset tours for best experience. Wear closed shoes and light layers.',
  },
  {
    name: 'Scuba Diving & Snorkeling',
    category: 'Water',
    rating: 5,
    price: 'BD 30-80 per dive',
    description: 'Explore Bahrain\'s underwater world with coral reefs, shipwrecks, and diverse marine life. Clear waters and warm temperatures year-round.',
    highlights: ['Coral reefs', 'Shipwrecks', 'Marine life', 'Pearl diving', 'Night dives', 'PADI courses'],
    location: 'Various sites around Bahrain',
    duration: '2-4 hours per session',
    season: 'Year-round (best Oct-May)',
    providers: ['Al Dar Islands', 'Bahrain Yacht Club', 'Dive shops'],
    tips: 'Visibility best in winter. Many sites suitable for beginners.',
  },
  {
    name: 'Kayaking & Paddleboarding',
    category: 'Water',
    rating: 4,
    price: 'BD 10-25 per hour',
    description: 'Paddle through mangroves, along coastlines, and around islands. Peaceful way to explore Bahrain\'s marine environment.',
    highlights: ['Mangrove tours', 'Island hopping', 'Sunset paddles', 'Wildlife spotting', 'Fitness paddling'],
    location: 'Tubli Bay, Al Dar Islands, Amwaj',
    duration: '1-3 hours',
    season: 'October - May (cooler months)',
    providers: ['Coral Bay', 'Al Dar Islands', 'Kayak rental shops'],
    tips: 'Tubli Bay mangroves are unique. Go early morning for calm water.',
  },
  {
    name: 'Horse Riding',
    category: 'Land',
    rating: 4,
    price: 'BD 15-40 per hour',
    description: 'Ride Arabian horses through desert trails and beaches. Bahrain has a rich equestrian tradition with excellent facilities.',
    highlights: ['Beach rides', 'Desert trails', 'Lessons', 'Arabian horses', 'Sunset rides'],
    location: 'Various stables across Bahrain',
    duration: '1-2 hours',
    season: 'October - April',
    providers: ['Rashid Equestrian Club', 'Various stables'],
    tips: 'Beach rides at sunset are magical. Book in advance, especially weekends.',
  },
  {
    name: 'Cycling',
    category: 'Land',
    rating: 4,
    price: 'Free - BD 10 (rental)',
    description: 'Explore Bahrain on two wheels with dedicated cycling paths, desert trails, and coastal routes. Growing cycling community.',
    highlights: ['Bahrain Bay track', 'Al Fateh Corniche', 'F1 circuit cycling', 'Desert trails', 'Island routes'],
    location: 'Throughout Bahrain',
    duration: '1-4 hours',
    season: 'October - April',
    providers: ['Bike rental shops', 'Hotel rentals', 'Cycling clubs'],
    tips: 'F1 circuit opens to cyclists on certain days. Join community rides.',
  },
  {
    name: 'Jet Skiing & Boat Tours',
    category: 'Water',
    rating: 4,
    price: 'BD 20-40 per 30min',
    description: 'Speed across Bahrain\'s blue waters on jet skis or enjoy leisurely boat tours around the islands and coastline.',
    highlights: ['Jet ski rental', 'Island tours', 'Fishing trips', 'Sunset cruises', 'Party boats'],
    location: 'Amwaj Islands, Al Dar Islands, hotel beaches',
    duration: '30min - half day',
    season: 'Year-round',
    providers: ['Beach clubs', 'Marina operators', 'Tour companies'],
    tips: 'Al Dar Islands combo trips offer best value. Book speedboat to explore.',
  },
  {
    name: 'Fishing',
    category: 'Water',
    rating: 4,
    price: 'BD 50-150 per trip',
    description: 'Traditional and sport fishing in the Arabian Gulf. Catch hamour (grouper), kingfish, and other local species.',
    highlights: ['Deep sea fishing', 'Traditional dhow trips', 'Hamour fishing', 'Night fishing', 'Barbecue your catch'],
    location: 'Gulf waters from various marinas',
    duration: '4-8 hours',
    season: 'Year-round (spring/fall best)',
    providers: ['Bahrain Yacht Club', 'Local fishermen', 'Fishing charters'],
    tips: 'Early morning trips most productive. Many trips include cooking your catch.',
  },
  {
    name: 'Bird Watching',
    category: 'Nature',
    rating: 4,
    price: 'Free',
    description: 'Bahrain lies on bird migration routes with excellent spots for spotting flamingos, waders, and migratory species.',
    highlights: ['Flamingos', 'Migratory birds', 'Hawar Islands', 'Tubli Bay', 'Al Areen'],
    location: 'Hawar Islands, Tubli Bay, Al Areen',
    duration: '2-4 hours',
    season: 'October - March (migration)',
    providers: ['Self-guided', 'Nature tours', 'Al Areen Wildlife Park'],
    tips: 'Hawar Islands for flamingos. Tubli Bay for waders. Bring binoculars.',
  },
  {
    name: 'Desert Camping',
    category: 'Desert',
    rating: 4,
    price: 'BD 30-100 per person',
    description: 'Experience Bahrain\'s desert under the stars. Traditional Bedouin camps or luxury glamping options available.',
    highlights: ['Star gazing', 'Campfire BBQ', 'Traditional music', 'Bedouin experience', 'Sunrise views'],
    location: 'Sakhir Desert',
    duration: 'Overnight',
    season: 'October - March',
    providers: ['Desert camps', 'Tour operators', 'DIY (permits needed)'],
    tips: 'Winter nights can be cold — bring warm layers. Book organized camps for amenities.',
  },
  {
    name: 'Rock Climbing & Hiking',
    category: 'Land',
    rating: 3,
    price: 'Free - BD 20',
    description: 'While Bahrain is flat, there are some climbing walls and hiking opportunities around Jebel Dukhan (Bahrain\'s highest point at 134m).',
    highlights: ['Jebel Dukhan', 'Indoor climbing', 'Nature walks', 'Desert hiking'],
    location: 'Jebel Dukhan, fitness centers',
    duration: '1-3 hours',
    season: 'October - April',
    providers: ['Gravity climbing gym', 'Outdoor clubs'],
    tips: 'Jebel Dukhan is accessible. Indoor climbing at Gravity for year-round.',
  },
];

const seasonGuide = [
  { season: 'Winter (Nov-Feb)', temp: '14-24°C', rating: '⭐⭐⭐⭐⭐', notes: 'Perfect for all outdoor activities' },
  { season: 'Spring (Mar-Apr)', temp: '20-32°C', rating: '⭐⭐⭐⭐', notes: 'Great before heat arrives' },
  { season: 'Summer (May-Sep)', temp: '35-45°C', rating: '⭐⭐', notes: 'Water activities only, early AM/late PM' },
  { season: 'Autumn (Oct)', temp: '28-35°C', rating: '⭐⭐⭐', notes: 'Season returns, still warm' },
];

const tips = [
  {
    title: 'Timing',
    content: 'October-April is prime season. Summer activities should be water-based or indoors.',
  },
  {
    title: 'Hydration',
    content: 'Essential! Drink 3-4 liters per day when active outdoors. Carry water always.',
  },
  {
    title: 'Sun Protection',
    content: 'SPF 50+ sunscreen, hat, sunglasses. UV is intense even in winter.',
  },
  {
    title: 'Booking',
    content: 'Weekend activities book up. Reserve desert safaris and water sports in advance.',
  },
];

export default function OutdoorActivitiesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Outdoor Activities', url: 'https://www.bahrainnights.com/guides/outdoor-activities' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium mb-4">
              🏜️ Adventure Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Outdoor Activities
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From desert safaris to diving adventures — discover outdoor experiences 
              in Bahrain's deserts, beaches, and crystal-clear waters.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Activities', value: '15+', icon: TreePalm },
              { label: 'Best Season', value: 'Oct-Apr', icon: Sun },
              { label: 'Water Sports', value: '8+', icon: Waves },
              { label: 'Desert Options', value: '5+', icon: Wind },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-teal-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season Guide */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">When to Go Outdoors</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {seasonGuide.map((s) => (
              <div key={s.season} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-teal-400">{s.season}</h3>
                <p className="text-lg font-bold">{s.temp}</p>
                <p className="text-yellow-400">{s.rating}</p>
                <p className="text-xs text-gray-400 mt-1">{s.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Outdoor Activities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to outdoor adventures in Bahrain.
          </p>
          
          <div className="space-y-6">
            {activities.map((activity) => (
              <div 
                key={activity.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{activity.name}</h3>
                          <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">
                            {activity.category}
                          </span>
                        </div>
                        <p className="text-teal-400 text-sm">{activity.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(activity.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-teal-400 fill-teal-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{activity.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{activity.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.highlights.map((h) => (
                        <span key={h} className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Duration:</strong> {activity.duration}</p>
                    <p><strong className="text-gray-400">Season:</strong> {activity.season}</p>
                    <p><strong className="text-gray-400">Providers:</strong> {activity.providers.join(', ')}</p>
                    <p className="text-teal-400 italic pt-2">💡 {activity.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Essential Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Adventure?</h2>
          <p className="text-gray-300 mb-8">
            Explore more activities and experiences in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/beach-clubs"
              className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-lg transition-colors"
            >
              Beach Clubs
            </Link>
            <Link 
              href="/guides/water-parks"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Water Parks
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Golf Courses', href: '/guides/golf', emoji: '⛳' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Summer Activities', href: '/guides/summer', emoji: '☀️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-teal-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What outdoor activities can you do in Bahrain?',
                a: 'Bahrain offers desert safaris, scuba diving, snorkeling, kayaking, jet skiing, horse riding, cycling, fishing, bird watching, and camping. Water sports are particularly popular.',
              },
              {
                q: 'When is the best time for outdoor activities in Bahrain?',
                a: 'October to April offers the best weather (15-30°C). Summer (May-September) is too hot (35-45°C) for most outdoor activities except early morning water sports.',
              },
              {
                q: 'Can you go diving in Bahrain?',
                a: 'Yes! Bahrain has excellent diving with coral reefs, shipwrecks, and clear waters. Several dive shops offer PADI courses and dive trips. Best visibility is October-May.',
              },
              {
                q: 'How much does a desert safari cost in Bahrain?',
                a: 'Desert safaris typically cost BD 25-50 per person for half-day tours including dune bashing, camel rides, and sometimes BBQ dinner. Overnight camping costs more.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Outdoor Activities in Bahrain 2025 | Desert Safari, Water Sports & More',
            description: 'Complete guide to outdoor activities in Bahrain including desert safaris, diving, and water sports.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2025-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/outdoor-activities',
            },
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
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What outdoor activities can you do in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain offers desert safaris, scuba diving, kayaking, jet skiing, horse riding, cycling, fishing, and camping.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the best time for outdoor activities in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'October to April offers the best weather (15-30°C) for outdoor activities.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does a desert safari cost in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Desert safaris typically cost BD 25-50 per person for half-day tours.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
