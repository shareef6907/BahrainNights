import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Baby, Star, MapPin, Clock, DollarSign,
  ArrowRight, Waves, Gamepad2, TreePalm, Palette, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Things to Do in Bahrain with Kids 2025 | Kid-Friendly Activities',
  description: 'Best things to do in Bahrain with kids! From water parks to play areas, discover top kid-friendly activities and attractions. Complete guide for parents visiting Bahrain.',
  keywords: 'things to do in Bahrain with kids, kid-friendly Bahrain, Bahrain kids activities, children activities Bahrain, family days out Bahrain, toddler activities Bahrain',
  openGraph: {
    title: 'Things to Do in Bahrain with Kids 2025 | Kid-Friendly Activities',
    description: 'Your complete guide to kid-friendly activities in Bahrain - water parks, play areas, and fun for children of all ages.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/things-to-do-with-kids',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/things-to-do-with-kids',
  },
};

const toddlerActivities = [
  {
    name: 'Jungle Bungle',
    location: 'Multiple locations',
    ageRange: '1-6 years',
    price: 'From BD 4',
    description: 'Soft play paradise with ball pits, slides, and climbing frames. Designed specifically for little ones with safety in mind.',
    features: ['Soft play areas', 'Party rooms', 'Cafe for parents', 'Air-conditioned'],
  },
  {
    name: 'Faby Land',
    location: 'Oasis Mall, Juffair',
    ageRange: '2-8 years',
    price: 'From BD 3',
    description: 'Colorful indoor playground with rides, games, and activities tailored for younger children.',
    features: ['Indoor rides', 'Arcade games', 'Soft play', 'Birthday packages'],
  },
  {
    name: 'Magic Planet',
    location: 'City Centre Bahrain',
    ageRange: '2-12 years',
    price: 'Pay per activity',
    description: 'Large entertainment center with rides, games, and toddler-specific areas within City Centre mall.',
    features: ['Toddler zone', 'Rides', 'Arcade', 'Redemption games'],
  },
  {
    name: 'Fun Factory',
    location: 'Seef Mall',
    ageRange: '2-10 years',
    price: 'Pay per activity',
    description: 'Classic arcade and play center with games suitable for younger kids and fun for the whole family.',
    features: ['Soft play', 'Kiddie rides', 'Games', 'Prize counter'],
  },
];

const olderKidsActivities = [
  {
    name: 'KidZania',
    location: 'The Avenues Bahrain',
    ageRange: '4-14 years',
    price: 'From BD 12',
    duration: '4-5 hours',
    description: 'An interactive city where kids can role-play as adults - becoming doctors, pilots, firefighters, and more. Educational and incredibly fun.',
    highlights: ['80+ professions', 'Earn KidZos currency', 'Real-world learning', 'Supervised activities'],
    tip: 'Book online and arrive early. Kids get tired - plan for breaks.',
  },
  {
    name: 'Trampo Extreme',
    location: 'The Avenues Bahrain',
    ageRange: '3+ years',
    price: 'From BD 8',
    duration: '1-2 hours',
    description: 'Indoor trampoline park with bouncing zones, foam pits, dodgeball courts, and ninja courses. Great for burning energy!',
    highlights: ['Trampoline zones', 'Foam pit', 'Ninja course', 'Toddler area'],
    tip: 'Grip socks required (can buy there). Book 1-hour sessions.',
  },
  {
    name: 'Gravity Indoor Skydiving',
    location: 'Dragon City',
    ageRange: '4+ years',
    price: 'From BD 25',
    duration: '1-2 hours',
    description: 'Experience the thrill of flight in a safe, vertical wind tunnel. Kids love the sensation of floating in mid-air!',
    highlights: ['Safe for kids 4+', 'Professional instructors', 'Flight suits provided', 'Video packages'],
    tip: 'Minimum weight 18kg. Great for birthdays!',
  },
  {
    name: 'Karting at BIC',
    location: 'Bahrain International Circuit',
    ageRange: '7+ years',
    price: 'From BD 12',
    duration: '1-2 hours',
    description: 'Race go-karts at the actual F1 circuit! Junior karts available for kids, with full safety equipment provided.',
    highlights: ['Junior karts', 'F1 circuit location', 'Safety gear provided', 'Family sessions'],
    tip: 'Closed-toe shoes required. Evening sessions are cooler.',
  },
];

const waterParks = [
  {
    name: 'Wahooo! Waterpark',
    location: 'City Centre Bahrain, Seef',
    ageRange: 'All ages (toddler areas available)',
    price: 'From BD 12',
    description: 'Bahrain\'s only indoor waterpark - perfect for year-round fun. Climate-controlled with slides for all thrill levels.',
    forKids: ['Splash zone for toddlers', 'Lazy river', 'Wave pool', 'Family slides'],
    tip: 'Weekday mornings are quieter. Under-3s often go free.',
  },
  {
    name: 'Lost Paradise of Dilmun',
    location: 'A\'ali',
    ageRange: 'All ages',
    price: 'From BD 16',
    description: 'Massive outdoor waterpark with ancient Dilmun theme. Huge variety of slides and dedicated kids\' areas.',
    forKids: ['Kids Kingdom area', 'Wave pool', 'Lazy river', 'Family raft rides'],
    tip: 'Bring lots of sunscreen. Rent a cabana for shade. Visit in cooler months.',
  },
];

const educationalActivities = [
  {
    name: 'Bahrain Science Centre',
    location: 'Isa Town',
    ageRange: '5+ years',
    price: 'BD 2',
    description: 'Interactive science museum with hands-on exhibits covering physics, biology, and technology.',
  },
  {
    name: 'Bahrain National Museum',
    location: 'Manama Corniche',
    ageRange: 'All ages',
    price: 'BD 1',
    description: 'Learn about Bahrain\'s 6,000 years of history through interactive displays and fascinating artifacts.',
  },
  {
    name: 'Al Areen Wildlife Park',
    location: 'Al Areen',
    ageRange: 'All ages',
    price: 'BD 2',
    description: 'See Arabian wildlife including oryx, gazelles, and flamingos. Safari bus tours through natural habitats.',
  },
  {
    name: 'Bahrain Fort',
    location: 'Karbabad',
    ageRange: 'All ages',
    price: 'Free',
    description: 'UNESCO World Heritage Site with ancient ruins to explore. Kids love climbing and discovering history.',
  },
];

const ageGuide = [
  {
    age: 'Babies (0-2)',
    activities: ['Soft play areas', 'Splash zones', 'Parks (morning)', 'Beach (shaded areas)'],
    tips: 'Most malls have nursing rooms. Many restaurants are baby-friendly.',
  },
  {
    age: 'Toddlers (2-4)',
    activities: ['Jungle Bungle', 'Faby Land', 'Wahooo splash area', 'Magic Planet rides'],
    tips: 'Toddler zones in waterparks are great. Avoid peak heat hours.',
  },
  {
    age: 'Young Kids (5-8)',
    activities: ['KidZania', 'Trampo Extreme', 'Waterparks', 'Al Areen Wildlife Park'],
    tips: 'This age loves KidZania - plan for a full day there.',
  },
  {
    age: 'Tweens (9-12)',
    activities: ['Go-karting', 'Indoor skydiving', 'Adventure activities', 'Escape rooms'],
    tips: 'They want thrills! Gravity and karting are big hits.',
  },
];

export default function ThingsToDoWithKidsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Things to Do with Kids', url: 'https://www.bahrainnights.com/guides/things-to-do-with-kids' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              👶 Kids Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Things to Do in{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Bahrain with Kids
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain offers endless entertainment for children of all ages. Whether you have 
              toddlers or tweens, this guide covers the best kid-friendly activities, from 
              waterparks to educational adventures.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Play Areas', value: '20+', icon: Gamepad2 },
              { label: 'Water Parks', value: '2', icon: Waves },
              { label: 'Parks & Gardens', value: '15+', icon: TreePalm },
              { label: 'Educational', value: '10+', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Activities by Age</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ageGuide.map((guide) => (
              <div key={guide.age} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-3">{guide.age}</h3>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  {guide.activities.map((act) => (
                    <li key={act}>• {act}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 italic">💡 {guide.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toddler Activities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">For Toddlers & Little Ones</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Safe, fun play areas designed specifically for younger children.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {toddlerActivities.map((activity) => (
              <div 
                key={activity.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{activity.name}</h3>
                    <p className="text-pink-400 text-sm">{activity.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">
                      {activity.ageRange}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {activity.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-white/10 text-xs rounded">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-400">{activity.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Older Kids */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">For Older Kids & Tweens</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Exciting adventures for kids who want more thrills.
          </p>
          
          <div className="space-y-6">
            {olderKidsActivities.map((activity) => (
              <div 
                key={activity.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pink-400">{activity.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1 mb-3">
                      <span>{activity.location}</span>
                      <span>•</span>
                      <span>{activity.ageRange}</span>
                      <span>•</span>
                      <span>{activity.duration}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{activity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {activity.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-amber-400 italic">💡 Tip: {activity.tip}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{activity.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Parks */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🌊 Water Parks</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {waterParks.map((park) => (
              <div key={park.name} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400">{park.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{park.location} • {park.price}</p>
                <p className="text-gray-300 mb-4">{park.description}</p>
                <div className="mb-4">
                  <span className="text-sm text-cyan-400 font-medium">For kids:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {park.forKids.map((item) => (
                      <span key={item} className="px-2 py-1 bg-cyan-500/20 text-xs rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-amber-400 italic">💡 {park.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Activities */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">📚 Educational Fun</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {educationalActivities.map((activity) => (
              <div key={activity.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg">{activity.name}</h3>
                <p className="text-sm text-pink-400">{activity.location} • {activity.price}</p>
                <p className="text-gray-400 text-sm mt-2">{activity.description}</p>
                <span className="text-xs text-gray-500">Ages: {activity.ageRange}</span>
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
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">
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
                q: 'What are the best things to do in Bahrain with kids?',
                a: 'Top activities include KidZania for role-playing, Wahooo! Waterpark for splashing fun, Trampo Extreme for bouncing, and Al Areen Wildlife Park for animal lovers. For toddlers, soft play areas like Jungle Bungle are perfect.',
              },
              {
                q: 'What indoor activities are there for kids in Bahrain?',
                a: 'Indoor options include Wahooo! Waterpark (climate-controlled), KidZania, Trampo Extreme, Gravity Indoor Skydiving, bowling alleys, and numerous soft play areas in malls like Magic Planet and Faby Land.',
              },
              {
                q: 'Are Bahrain\'s attractions suitable for toddlers?',
                a: 'Yes! Most waterparks have dedicated toddler splash zones, malls have soft play areas, and attractions like Al Areen Wildlife Park are suitable for all ages. Many restaurants also have play areas.',
              },
              {
                q: 'What can teenagers do in Bahrain?',
                a: 'Teenagers can enjoy go-karting at BIC, indoor skydiving at Gravity, escape rooms, water park thrill rides, bowling, cinema, and visiting modern attractions like The Avenues mall.',
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
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Family Adventure</h2>
          <p className="text-gray-300 mb-8">
            Browse our full attractions list or check what&apos;s on this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/attractions"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors"
            >
              All Attractions
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
            headline: 'Things to Do in Bahrain with Kids 2025',
            description: 'Complete guide to kid-friendly activities in Bahrain including waterparks, play areas, and educational attractions.',
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
              '@id': 'https://bahrainnights.com/guides/things-to-do-with-kids',
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
                name: 'What are the best things to do in Bahrain with kids?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Top activities include KidZania for role-playing, Wahooo! Waterpark, Trampo Extreme, and Al Areen Wildlife Park. For toddlers, soft play areas like Jungle Bungle are perfect.',
                },
              },
              {
                '@type': 'Question',
                name: 'What indoor activities are there for kids in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Indoor options include Wahooo! Waterpark, KidZania, Trampo Extreme, Gravity Indoor Skydiving, bowling alleys, and numerous soft play areas in malls.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are Bahrain\'s attractions suitable for toddlers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Most waterparks have dedicated toddler splash zones, malls have soft play areas, and attractions like Al Areen Wildlife Park are suitable for all ages.',
                },
              },
              {
                '@type': 'Question',
                name: 'What can teenagers do in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Teenagers can enjoy go-karting at BIC, indoor skydiving at Gravity, escape rooms, water park thrill rides, bowling, and cinema.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
