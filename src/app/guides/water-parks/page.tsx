import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Waves, Sun, Clock, MapPin, Star,
  ArrowRight, Users, DollarSign, Calendar, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Water Parks in Bahrain 2025 | Wahooo!, Lost Paradise & More',
  description: 'Discover the best water parks in Bahrain! Complete guide to Wahooo! Waterpark, Lost Paradise of Dilmun, prices, slides, and family fun. Beat the heat!',
  keywords: 'water parks Bahrain, Wahooo Bahrain, Lost Paradise Dilmun, water slides Bahrain, waterpark Bahrain, family fun Bahrain, wave pool Bahrain, lazy river Bahrain',
  openGraph: {
    title: 'Water Parks in Bahrain 2025 | Wahooo!, Lost Paradise & More',
    description: 'Your guide to the best water parks and aquatic fun in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/water-parks',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/water-parks',
  },
};

const waterParks = [
  {
    name: 'Wahooo! Waterpark',
    location: 'City Centre Bahrain, Seef',
    type: 'Indoor Water Park',
    rating: 5,
    price: 'BD 12-18 (adult), BD 9-15 (child)',
    description: 'The Middle East\'s first temperature-controlled indoor waterpark, located inside City Centre Bahrain. Perfect year-round entertainment with thrilling slides and attractions.',
    features: ['15+ water slides', 'FlowRider surf simulator', 'Wave pool', 'Lazy river', 'Kids\' zones', 'Year-round climate control'],
    highlights: [
      { name: 'Stingray', desc: 'Heart-pounding speed slide' },
      { name: 'Barracuda', desc: 'Adrenaline tube slide' },
      { name: 'FlowRider', desc: 'Surf simulator experience' },
      { name: 'Python', desc: 'Twisting enclosed slide' },
    ],
    bestFor: 'Families, thrill seekers, year-round visits',
    hours: 'Sun-Wed 10AM-8PM, Thu-Sat 10AM-10PM',
    tips: 'Book online for discounts. Go on weekdays to avoid crowds.',
  },
  {
    name: 'Lost Paradise of Dilmun',
    location: 'Sakhir (near F1 circuit)',
    type: 'Outdoor Water Park',
    rating: 5,
    price: 'BD 18-22 (adult), BD 14-18 (child)',
    description: 'Bahrain\'s largest waterpark themed around ancient Dilmun civilization. Outdoor park with massive slides, wave pool, and beautiful landscaping.',
    features: ['20+ slides & attractions', 'Wave pool', 'Lazy river', 'Kids\' splash zones', 'Cabanas', 'Private beach area'],
    highlights: [
      { name: 'Aqua Loop', desc: 'Vertical drop loop slide' },
      { name: 'Master Blaster', desc: 'Water coaster experience' },
      { name: 'Tidal Wave', desc: 'Large wave pool' },
      { name: 'Toddler Lagoon', desc: 'Safe splash zone for little ones' },
    ],
    bestFor: 'Families, groups, special occasions',
    hours: '10AM-6PM (seasonal variations)',
    tips: 'Best visited October-April. Bring sunscreen! Cabanas sell out fast on weekends.',
  },
  {
    name: 'Al Areen Wildlife Park (Splash)',
    location: 'Al Areen',
    type: 'Wildlife Park with Water Features',
    rating: 4,
    price: 'BD 2-5',
    description: 'While primarily a wildlife park, Al Areen offers water play areas and splash zones perfect for kids alongside animal encounters.',
    features: ['Splash zones', 'Wildlife exhibits', 'Train rides', 'Picnic areas', 'Educational programs'],
    highlights: [
      { name: 'Water Play', desc: 'Kids splash area' },
      { name: 'Safari', desc: 'Wildlife viewing' },
    ],
    bestFor: 'Young children, educational trips',
    hours: '8AM-5PM',
    tips: 'Combine with wildlife visit for full day out.',
  },
];

const comparisonData = [
  { feature: 'Best For', wahooo: 'Year-round, mall convenience', lost: 'Big groups, outdoor vibes' },
  { feature: 'Age Range', wahooo: 'All ages', lost: 'All ages (better for 6+)' },
  { feature: 'Climate', wahooo: 'Indoor, air-conditioned', lost: 'Outdoor (hot in summer)' },
  { feature: 'Slides Count', wahooo: '15+', lost: '20+' },
  { feature: 'Unique Feature', wahooo: 'FlowRider surf', lost: 'Dilmun theming' },
  { feature: 'Location', wahooo: 'City Centre Seef', lost: 'Sakhir (30min drive)' },
  { feature: 'Food Options', wahooo: 'Mall food court nearby', lost: 'On-site restaurants' },
];

const tips = [
  {
    title: 'Best Time to Visit',
    content: 'Wahooo! is perfect year-round. Lost Paradise is best October-April due to outdoor heat.',
  },
  {
    title: 'What to Bring',
    content: 'Swimwear, towel (or rent), sunscreen (outdoor parks), waterproof phone case, change of clothes.',
  },
  {
    title: 'Money Saving',
    content: 'Book online for discounts. Season passes save money if visiting 3+ times. Weekday prices often lower.',
  },
  {
    title: 'Beating Crowds',
    content: 'Visit on weekday mornings. Fridays and holidays are busiest. Summer holidays = packed.',
  },
  {
    title: 'Kids Safety',
    content: 'Life jackets available for free. Dedicated kids\' zones are well-supervised. Height restrictions apply to big slides.',
  },
  {
    title: 'Food & Drinks',
    content: 'Outside food usually not allowed. Budget BD 5-10 per person for food inside the parks.',
  },
];

export default function WaterParksPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Water Parks', url: 'https://www.bahrainnights.com/guides/water-parks' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🌊 Family Fun Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Water Parks
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beat the heat at Bahrain's amazing water parks! From the indoor thrills of 
              Wahooo! to the outdoor paradise of Lost Paradise of Dilmun — splash into fun.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Parks', value: '2', icon: Waves },
              { label: 'Entry From', value: 'BD 12', icon: DollarSign },
              { label: 'Slides Total', value: '35+', icon: Sparkles },
              { label: 'Best Season', value: 'Year-round', icon: Sun },
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

      {/* Water Parks List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Water Parks in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to water parks with prices, attractions, and tips.
          </p>
          
          <div className="space-y-8">
            {waterParks.map((park) => (
              <div 
                key={park.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold">{park.name}</h3>
                        <p className="text-blue-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {park.location} • {park.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(park.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{park.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{park.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {park.features.map((f) => (
                        <span key={f} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {f}
                        </span>
                      ))}
                    </div>

                    {park.highlights && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {park.highlights.map((h) => (
                          <div key={h.name} className="bg-white/5 rounded-lg p-2">
                            <p className="font-semibold text-blue-400">{h.name}</p>
                            <p className="text-xs text-gray-400">{h.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="lg:w-1/3 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Best for:</strong> {park.bestFor}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {park.hours}</p>
                    <p className="text-blue-400 italic">💡 {park.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Wahooo! vs Lost Paradise</h2>
          <p className="text-gray-400 text-center mb-8">
            Can't decide? Here's how they compare:
          </p>
          
          <div className="bg-white/5 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-blue-500/20 p-4 font-bold">
              <div>Feature</div>
              <div className="text-center">Wahooo!</div>
              <div className="text-center">Lost Paradise</div>
            </div>
            {comparisonData.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 p-4 ${i % 2 === 0 ? 'bg-white/5' : ''}`}>
                <div className="text-gray-400">{row.feature}</div>
                <div className="text-center text-sm">{row.wahooo}</div>
                <div className="text-center text-sm">{row.lost}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Water Park Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Splash?</h2>
          <p className="text-gray-300 mb-8">
            Check out more family-friendly activities in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/family-activities"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors"
            >
              Family Activities
            </Link>
            <Link 
              href="/guides/things-to-do-with-kids"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Kids Activities
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
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Summer Activities', href: '/guides/summer', emoji: '☀️' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
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
                q: 'What are the best water parks in Bahrain?',
                a: 'Bahrain has two main water parks: Wahooo! Waterpark (indoor, at City Centre Bahrain) and Lost Paradise of Dilmun (outdoor, near Sakhir). Both offer excellent slides, wave pools, and family entertainment.',
              },
              {
                q: 'How much does it cost to visit water parks in Bahrain?',
                a: 'Wahooo! costs BD 12-18 for adults and BD 9-15 for children. Lost Paradise of Dilmun is BD 18-22 for adults and BD 14-18 for children. Online bookings often have discounts.',
              },
              {
                q: 'Which water park is better for kids?',
                a: 'Both parks have excellent kids\' zones. Wahooo! is better for younger children (climate-controlled) while Lost Paradise has more variety for older kids who can handle bigger slides.',
              },
              {
                q: 'Can you visit water parks in summer?',
                a: 'Wahooo! is perfect for summer as it\'s indoor and air-conditioned. Lost Paradise is very hot in summer (May-September) — visit early morning or consider Wahooo! instead.',
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
            headline: 'Water Parks in Bahrain 2025 | Wahooo!, Lost Paradise & More',
            description: 'Complete guide to water parks in Bahrain including Wahooo! and Lost Paradise of Dilmun.',
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
              '@id': 'https://bahrainnights.com/guides/water-parks',
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
                name: 'What are the best water parks in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain has two main water parks: Wahooo! Waterpark (indoor) and Lost Paradise of Dilmun (outdoor).',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does it cost to visit water parks in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Wahooo! costs BD 12-18 for adults. Lost Paradise of Dilmun is BD 18-22 for adults.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you visit water parks in summer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Wahooo! is perfect for summer as it\'s indoor and air-conditioned.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
