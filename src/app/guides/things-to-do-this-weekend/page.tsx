import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, Star, MapPin, Clock, Sun,
  ArrowRight, Music, Utensils, Waves, Moon, PartyPopper
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Things to Do in Bahrain This Weekend 2025 | Weekend Events Guide',
  description: 'Find the best things to do in Bahrain this weekend! From brunches to parties, discover events, activities, and entertainment happening this Friday, Saturday, Sunday.',
  keywords: 'things to do in Bahrain this weekend, Bahrain weekend events, what to do this weekend Bahrain, weekend activities Bahrain, Bahrain Friday Saturday',
  openGraph: {
    title: 'Things to Do in Bahrain This Weekend 2025 | Weekend Events Guide',
    description: 'Your complete guide to weekend events and activities in Bahrain - brunches, parties, concerts, and more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/things-to-do-this-weekend',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/things-to-do-this-weekend',
  },
};

const weekendHighlights = [
  {
    day: 'Thursday Night',
    icon: Moon,
    activities: [
      { name: 'Ladies Night', description: 'Free drinks for ladies at most bars - JJ\'s, Trader Vic\'s, and more' },
      { name: 'Pre-Weekend Parties', description: 'Clubs start getting busy - Block 338, Juffair area' },
      { name: 'Late Night Dining', description: 'Restaurants open late in Adliya and Juffair' },
    ],
    tip: 'Thursday is the start of the weekend. Book restaurant tables in advance.',
  },
  {
    day: 'Friday',
    icon: Sun,
    activities: [
      { name: 'Friday Brunch', description: 'Bahrain\'s legendary all-you-can-eat brunches at hotels' },
      { name: 'Beach Clubs', description: 'Day passes at Coral Bay, Marassi, and hotel pools' },
      { name: 'Family Time', description: 'Malls, waterparks, and attractions busy but fun' },
      { name: 'Evening Walks', description: 'Bahrain Bay, Corniche, and Adliya come alive' },
    ],
    tip: 'Friday brunch is a must-do Bahrain experience. Book ahead!',
  },
  {
    day: 'Saturday',
    icon: PartyPopper,
    activities: [
      { name: 'Saturday Brunch', description: 'Alternative brunches for those who missed Friday' },
      { name: 'Shopping', description: 'Malls and souqs at their busiest' },
      { name: 'Day Activities', description: 'Waterparks, karting, bowling, attractions' },
      { name: 'Night Out', description: 'Biggest party night - clubs packed until late' },
    ],
    tip: 'Saturday night is THE night out. Dress well and arrive fashionably late.',
  },
  {
    day: 'Sunday',
    icon: Calendar,
    activities: [
      { name: 'Relaxed Brunch', description: 'Quieter brunches, often family-friendly' },
      { name: 'Cultural Visits', description: 'Museums, heritage sites, quieter crowds' },
      { name: 'Preparation', description: 'Last chance for weekend activities before work week' },
    ],
    tip: 'Sunday is the last weekend day. Perfect for recovery activities.',
  },
];

const brunchSpots = [
  {
    name: 'Four Seasons Friday Brunch',
    venue: 'Four Seasons Bahrain Bay',
    price: 'From BD 45',
    vibe: 'Upscale, international',
    highlights: ['Multiple restaurants', 'Premium drinks', 'Bay views'],
  },
  {
    name: 'Ritz-Carlton Brunch',
    venue: 'The Ritz-Carlton',
    price: 'From BD 50',
    vibe: 'Luxury, elegant',
    highlights: ['Extensive buffet', 'Champagne flows', 'Impeccable service'],
  },
  {
    name: 'Gulf Hotel Sherlock Holmes',
    venue: 'Gulf Hotel',
    price: 'From BD 38',
    vibe: 'Classic, popular',
    highlights: ['Live cooking', 'Great drinks deals', 'Entertainment'],
  },
  {
    name: 'Sofitel Friday Brunch',
    venue: 'Sofitel Bahrain',
    price: 'From BD 35',
    vibe: 'French flair, stylish',
    highlights: ['French cuisine', 'Pool access', 'Good value'],
  },
];

const weekendActivities = [
  {
    category: 'With Kids',
    activities: [
      'Wahooo! Waterpark - indoor fun',
      'KidZania at The Avenues',
      'Bahrain National Museum',
      'Al Areen Wildlife Park',
      'Cinema - new releases',
    ],
  },
  {
    category: 'With Friends',
    activities: [
      'Friday brunch',
      'Beach club day',
      'Bowling and arcade games',
      'Karting at BIC',
      'Bar hopping in Adliya',
    ],
  },
  {
    category: 'Couples',
    activities: [
      'Romantic dinner',
      'Sunset at Bahrain Fort',
      'Couples spa',
      'Dhow cruise',
      'Rooftop drinks',
    ],
  },
  {
    category: 'Solo',
    activities: [
      'Explore Manama Souq',
      'Museum visits',
      'Beach time',
      'Cafe hopping',
      'Gym and wellness',
    ],
  },
];

const nightlifeGuide = [
  {
    area: 'Adliya',
    vibe: 'Trendy, artsy, diverse',
    spots: ['Block 338', 'Coco\'s', 'Lilou', 'Various bars'],
    bestFor: 'Bar hopping, dining, casual nightlife',
  },
  {
    area: 'Juffair',
    vibe: 'Lively, international, party',
    spots: ['JJ\'s Irish Pub', 'Sherlock Holmes', 'Various clubs'],
    bestFor: 'Nightclubs, late nights, expat scene',
  },
  {
    area: 'Hotel Bars',
    vibe: 'Upscale, sophisticated',
    spots: ['Four Seasons', 'Ritz-Carlton', 'Gulf Hotel'],
    bestFor: 'Cocktails, elegant atmosphere, after-dinner drinks',
  },
];

const freeWeekendIdeas = [
  'Sunset at Bahrain Fort (free entry to fort)',
  'Walk along Bahrain Bay promenade',
  'Explore Muharraq heritage trail',
  'Visit Al Fateh Grand Mosque (free tours)',
  'Beach time at Marassi Beach',
  'Window shopping at The Avenues',
  'Street photography in Manama Souq',
];

export default function ThisWeekendGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  // Get current day to show dynamic content
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'This Weekend', url: 'https://www.bahrainnights.com/guides/things-to-do-this-weekend' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              📅 Weekend Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Things to Do in{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Bahrain This Weekend
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From legendary Friday brunches to buzzing Saturday nights, here&apos;s everything 
              happening in Bahrain this weekend. Plan your perfect Thursday through Sunday with 
              our complete guide.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Live Events CTA */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">🎉 Live Events This Weekend</h2>
            <p className="text-gray-300 mb-4">
              Check our events page for real-time listings of what&apos;s happening right now.
            </p>
            <Link 
              href="/events/this-weekend"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              View Live Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Weekend Day by Day */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Your Weekend, Day by Day</h2>
          
          <div className="space-y-6">
            {weekendHighlights.map((day) => (
              <div 
                key={day.day}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <day.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{day.day}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {day.activities.map((act) => (
                    <div key={act.name} className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-amber-400 mb-1">{act.name}</h4>
                      <p className="text-gray-400 text-sm">{act.description}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-amber-400 italic">💡 Tip: {day.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brunch Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">🥂 Friday Brunch Guide</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Friday brunch is a Bahrain institution. Here are the top spots to book.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {brunchSpots.map((brunch) => (
              <div key={brunch.name} className="bg-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{brunch.name}</h3>
                  <span className="text-amber-400 font-bold">{brunch.price}</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{brunch.venue}</p>
                <p className="text-xs text-gray-500 italic mb-3">{brunch.vibe}</p>
                <div className="flex flex-wrap gap-2">
                  {brunch.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/guides/brunches"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300"
            >
              See Full Brunch Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Activities by Group */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Weekend Ideas by Group</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weekendActivities.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-4">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.activities.map((act) => (
                    <li key={act} className="text-gray-300 text-sm flex items-start gap-2">
                      <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nightlife Quick Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🌙 Weekend Nightlife</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {nightlifeGuide.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-amber-400 mb-2">{area.area}</h3>
                <p className="text-xs text-gray-500 italic mb-3">{area.vibe}</p>
                <p className="text-sm text-gray-400 mb-3">{area.spots.join(' • ')}</p>
                <p className="text-xs text-gray-500">Best for: {area.bestFor}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/guides/nightlife"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300"
            >
              Full Nightlife Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Free Weekend Ideas */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💰 Free Weekend Ideas</h2>
          
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-3">
              {freeWeekendIdeas.map((idea) => (
                <div key={idea} className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span>
                  {idea}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link 
                href="/guides/free-things-to-do"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300"
              >
                More Free Activities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Best Parties', href: '/guides/parties', emoji: '🎉' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the best things to do in Bahrain this weekend?',
                a: 'Weekend highlights include Friday brunches at hotels (a Bahrain tradition), beach clubs, nightlife in Adliya and Juffair, family activities at malls and waterparks, and cultural visits to places like Bahrain Fort.',
              },
              {
                q: 'When is the weekend in Bahrain?',
                a: 'The weekend in Bahrain runs from Friday to Saturday. Thursday night is also popular for going out as it kicks off the weekend. Sunday is a work day for most.',
              },
              {
                q: 'What is Friday brunch in Bahrain?',
                a: 'Friday brunch is a legendary Bahrain tradition - all-you-can-eat buffets at hotels running from noon to around 4 PM, with packages including soft drinks, house drinks, or premium beverages. Prices range from BD 30-65.',
              },
              {
                q: 'What nightlife is there in Bahrain on weekends?',
                a: 'Bahrain has a vibrant nightlife scene. Key areas include Adliya for bars and dining, Juffair for clubs and late nights, and hotel bars for upscale drinks. Thursday and Saturday are the busiest nights.',
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

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">See What&apos;s Happening Now</h2>
          <p className="text-gray-300 mb-8">
            Check our live events page for the latest happenings this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events/this-weekend"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              This Weekend&apos;s Events
            </Link>
            <Link 
              href="/events"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Events
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
            headline: 'Things to Do in Bahrain This Weekend 2025',
            description: 'Complete guide to weekend activities, events, brunches, and nightlife in Bahrain.',
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
              '@id': 'https://bahrainnights.com/guides/things-to-do-this-weekend',
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
                name: 'What are the best things to do in Bahrain this weekend?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Weekend highlights include Friday brunches at hotels, beach clubs, nightlife in Adliya and Juffair, family activities, and cultural visits to places like Bahrain Fort.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the weekend in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The weekend in Bahrain runs from Friday to Saturday. Thursday night is also popular for going out. Sunday is a work day for most.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Friday brunch in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Friday brunch is a Bahrain tradition - all-you-can-eat buffets at hotels running from noon to around 4 PM. Prices range from BD 30-65.',
                },
              },
              {
                '@type': 'Question',
                name: 'What nightlife is there in Bahrain on weekends?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Key nightlife areas include Adliya for bars and dining, Juffair for clubs, and hotel bars for upscale drinks. Thursday and Saturday are the busiest nights.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
