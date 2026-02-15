import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, Star, MapPin, Clock, 
  ArrowRight, Waves, Ticket, TreePalm, Palette, Building2
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Family Activities in Bahrain 2026 | Best Things to Do with Family',
  description: 'Discover the best family activities in Bahrain! From water parks to museums, explore top family-friendly attractions and activities in Bahrain. Complete guide for families.',
  keywords: 'family activities Bahrain, things to do with family Bahrain, family fun Bahrain, Bahrain family attractions, kid-friendly Bahrain, family outings Bahrain',
  openGraph: {
    title: 'Family Activities in Bahrain 2026 | Best Things to Do with Family',
    description: 'Your complete guide to family activities in Bahrain - water parks, museums, and fun attractions for all ages.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/family-activities',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/family-activities',
  },
};

const familyAttractions = [
  {
    name: 'Bahrain National Museum',
    location: 'Manama Corniche',
    ageRange: 'All ages',
    duration: '2-3 hours',
    price: 'BD 1',
    description: 'Bahrain\'s premier museum showcasing 6,000 years of history. Interactive exhibits, ancient burial mounds, and traditional crafts. The architecture itself is stunning.',
    highlights: ['Dilmun burial artifacts', 'Traditional Bahraini house', 'Natural history hall', 'Art gallery'],
    tip: 'Visit in the morning when it\'s cooler, then have lunch at nearby restaurants.',
  },
  {
    name: 'Wahooo! Waterpark',
    location: 'City Centre Bahrain, Seef',
    ageRange: '3+ years',
    duration: 'Full day',
    price: 'From BD 12',
    description: 'Bahrain\'s largest indoor waterpark with slides, wave pools, and lazy rivers. Climate-controlled for year-round fun, perfect for hot summer days.',
    highlights: ['Abyss tornado slide', 'Wave pool', 'Kids splash zone', 'Lazy river'],
    tip: 'Book online for discounts. Weekday mornings are less crowded.',
  },
  {
    name: 'Al Areen Wildlife Park',
    location: 'Al Areen',
    ageRange: 'All ages',
    duration: '2-4 hours',
    price: 'BD 2',
    description: 'A 7 square kilometer reserve housing Arabian wildlife including oryx, gazelles, and flamingos. Safari-style tours through natural habitats.',
    highlights: ['Safari bus tour', 'Arabian oryx', 'Flamingo lake', 'Bird sanctuary'],
    tip: 'Best visited in cooler months (October-April). Morning visits see more active animals.',
  },
  {
    name: 'Gravity Indoor Skydiving',
    location: 'Dragon City',
    ageRange: '4+ years',
    duration: '1-2 hours',
    price: 'From BD 25',
    description: 'Experience the thrill of skydiving in a safe, indoor wind tunnel. Professional instructors guide first-timers through an unforgettable experience.',
    highlights: ['Wind tunnel flying', 'Professional instructors', 'No experience needed', 'Photo/video packages'],
    tip: 'Book the family package for better value.',
  },
  {
    name: 'Lost Paradise of Dilmun',
    location: 'A\'ali',
    ageRange: 'All ages',
    duration: 'Full day',
    price: 'From BD 16',
    description: 'One of the largest waterparks in the Middle East with thrilling slides, wave pools, and dedicated kids\' areas. Ancient Dilmun theme throughout.',
    highlights: ['Tornado slide', 'Lazy river', 'Kids\' kingdom', 'Wave pool'],
    tip: 'Rent a cabana for shade and comfort. Bring extra sunscreen.',
  },
  {
    name: 'Bahrain Fort (Qal\'at al-Bahrain)',
    location: 'Karbabad',
    ageRange: 'All ages',
    duration: '2-3 hours',
    price: 'Free',
    description: 'UNESCO World Heritage Site dating back 4,000 years. Explore ancient ruins, climb the fort, and enjoy stunning sea views. Great for history-loving families.',
    highlights: ['UNESCO heritage site', 'On-site museum', 'Ancient ruins', 'Sea views'],
    tip: 'Visit at sunset for beautiful photos. The museum provides great context.',
  },
];

const weekendIdeas = [
  {
    activity: 'Beach Day at Marassi Beach',
    description: 'Clean, family-friendly beach with facilities, cafes, and water activities.',
    bestTime: 'Friday morning',
    location: 'Diyar Al Muharraq',
  },
  {
    activity: 'Explore the Tree of Life',
    description: 'Visit Bahrain\'s famous 400-year-old tree in the desert. A unique photo opportunity.',
    bestTime: 'Late afternoon (cooler)',
    location: 'Southern Desert',
  },
  {
    activity: 'Karting at Bahrain International Circuit',
    description: 'Family-friendly go-kart experience at the F1 circuit. Various kart sizes for all ages.',
    bestTime: 'Anytime',
    location: 'Sakhir',
  },
  {
    activity: 'Al Fateh Grand Mosque',
    description: 'One of the world\'s largest mosques. Free guided tours available. Educational for all ages.',
    bestTime: 'Morning (outside prayer times)',
    location: 'Juffair',
  },
  {
    activity: 'Manama Souq',
    description: 'Traditional market with spices, gold, and local goods. Kids love the maze-like alleys.',
    bestTime: 'Evening (after 4 PM)',
    location: 'Manama',
  },
];

const mallActivities = [
  {
    mall: 'City Centre Bahrain',
    activities: ['Wahooo! Waterpark', 'Magic Planet arcade', 'Cinema', 'Ice skating'],
    location: 'Seef',
  },
  {
    mall: 'The Avenues Bahrain',
    activities: ['KidZania', 'Trampo Extreme', 'Cinema', 'Family dining'],
    location: 'Bahrain Bay',
  },
  {
    mall: 'Seef Mall',
    activities: ['Fun Factory arcade', 'Cinema', 'Kids play areas', 'Food court'],
    location: 'Seef',
  },
  {
    mall: 'Oasis Mall',
    activities: ['Faby Land', 'Bowling', 'Arcade games', 'Family restaurants'],
    location: 'Juffair',
  },
];

export default function FamilyActivitiesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Family Activities', url: 'https://www.bahrainnights.com/guides/family-activities' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              👨‍👩‍👧‍👦 Family Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Family Activities
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain is a fantastic destination for families with children of all ages. 
              From thrilling water parks to educational museums, discover the best family-friendly 
              attractions and activities in the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Attractions', value: '50+', icon: Ticket },
              { label: 'Water Parks', value: '3', icon: Waves },
              { label: 'Museums', value: '8+', icon: Building2 },
              { label: 'Mall Play Areas', value: '10+', icon: Palette },
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

      {/* Top Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Family Attractions</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Must-visit attractions for families visiting Bahrain.
          </p>
          
          <div className="space-y-6">
            {familyAttractions.map((attraction) => (
              <div 
                key={attraction.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-400">{attraction.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {attraction.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {attraction.ageRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {attraction.duration}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{attraction.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {attraction.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-amber-400 italic">💡 Tip: {attraction.tip}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white">{attraction.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekend Ideas */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Weekend Activity Ideas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekendIdeas.map((idea) => (
              <div key={idea.activity} className="bg-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">{idea.activity}</h3>
                <p className="text-gray-400 text-sm mb-4">{idea.description}</p>
                <div className="text-xs space-y-1">
                  <p><span className="text-cyan-400">Best time:</span> {idea.bestTime}</p>
                  <p><span className="text-cyan-400">Location:</span> {idea.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mall Activities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Indoor Family Fun</h2>
          <p className="text-gray-400 text-center mb-12">
            Beat the heat with these indoor entertainment options at Bahrain&apos;s malls.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mallActivities.map((mall) => (
              <div 
                key={mall.mall}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6"
              >
                <h3 className="font-bold text-lg text-cyan-400">{mall.mall}</h3>
                <p className="text-sm text-gray-400 mb-3">{mall.location}</p>
                <div className="flex flex-wrap gap-2">
                  {mall.activities.map((act) => (
                    <span key={act} className="px-3 py-1 bg-white/10 text-sm rounded-full">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Family Travel Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Best Time to Visit',
                content: 'October to April offers pleasant weather. Summer (June-August) is very hot, so stick to indoor activities or water parks.',
              },
              {
                title: 'Getting Around',
                content: 'Rent a car for flexibility. Taxis are safe and affordable. Most attractions have parking available.',
              },
              {
                title: 'Dining with Kids',
                content: 'Most restaurants are family-friendly. Malls have great food courts. Many places offer kids\' menus.',
              },
              {
                title: 'Budget Tips',
                content: 'Many attractions offer family packages. Book online for discounts. Friday is typically family day at many venues.',
              },
            ].map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-cyan-400 mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Things to Do with Kids', href: '/guides/things-to-do-with-kids', emoji: '👶' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Places to Visit', href: '/guides/places-to-visit', emoji: '🗺️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-cyan-400 transition-colors">
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
                q: 'What are the best family activities in Bahrain?',
                a: 'The best family activities include Wahooo! Waterpark, Bahrain National Museum, Al Areen Wildlife Park, Lost Paradise of Dilmun waterpark, and Bahrain Fort. These offer fun for all ages with educational and entertainment value.',
              },
              {
                q: 'Is Bahrain family-friendly?',
                a: 'Yes, Bahrain is very family-friendly! Most restaurants welcome children, malls have play areas, and there are numerous attractions designed for families. The country is safe, clean, and easy to navigate with kids.',
              },
              {
                q: 'What can kids do in Bahrain when it\'s hot?',
                a: 'During hot summer months, visit indoor attractions like Wahooo! Waterpark, KidZania at The Avenues, Gravity Indoor Skydiving, bowling alleys, or the air-conditioned Bahrain National Museum.',
              },
              {
                q: 'Are there free activities for families in Bahrain?',
                a: 'Yes! Free family activities include visiting Bahrain Fort (UNESCO site), beaches like Marassi Beach, the Tree of Life, Al Fateh Grand Mosque, and exploring traditional souqs in Manama.',
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

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Family Day Out</h2>
          <p className="text-gray-300 mb-8">
            Explore our attractions directory or check what&apos;s on this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/attractions"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse Attractions
            </Link>
            <Link 
              href="/events/this-weekend"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              This Weekend
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
            '@type': 'Article',
            headline: 'Best Family Activities in Bahrain 2026',
            description: 'Complete guide to family activities and attractions in Bahrain including water parks, museums, and kid-friendly venues.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/family-activities',
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
                name: 'What are the best family activities in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The best family activities include Wahooo! Waterpark, Bahrain National Museum, Al Areen Wildlife Park, Lost Paradise of Dilmun waterpark, and Bahrain Fort.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Bahrain family-friendly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Bahrain is very family-friendly! Most restaurants welcome children, malls have play areas, and there are numerous attractions designed for families.',
                },
              },
              {
                '@type': 'Question',
                name: 'What can kids do in Bahrain when it\'s hot?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'During hot months, visit indoor attractions like Wahooo! Waterpark, KidZania at The Avenues, Gravity Indoor Skydiving, bowling alleys, or the Bahrain National Museum.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there free activities for families in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Free family activities include Bahrain Fort (UNESCO site), beaches like Marassi Beach, the Tree of Life, Al Fateh Grand Mosque, and exploring traditional souqs.',
                },
              },
            ],
          }),
        }}
      />

      <InternalLinks
        title="More Family Fun in Bahrain"
        links={[
          { title: 'Things to Do with Kids', href: '/guides/things-to-do-with-kids' },
          { title: 'Free Things to Do', href: '/guides/free-things-to-do' },
          { title: 'Beach Clubs', href: '/guides/beach-clubs' },
          { title: 'Best Restaurants', href: '/guides/restaurants' },
          { title: 'Shopping Malls', href: '/guides/malls' },
          { title: 'Tourist Attractions', href: '/guides/tourist-attractions' },
          { title: 'Amwaj Islands', href: '/guides/amwaj' },
          { title: 'Weekend Getaways', href: '/guides/weekend-getaways' },
        ]}
      />
    </div>
  );
}
