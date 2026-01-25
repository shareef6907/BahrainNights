import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Landmark, Clock, MapPin, Star,
  Ticket, DollarSign, BookOpen, Camera
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Museums in Bahrain 2025 | National Museum, Art & Cultural Sites',
  description: 'Discover museums in Bahrain! Complete guide to Bahrain National Museum, Beit Al Quran, Currency Museum, art galleries, and cultural attractions.',
  keywords: 'museums Bahrain, Bahrain National Museum, Beit Al Quran, museums Manama, art galleries Bahrain, cultural attractions Bahrain, history museum Bahrain',
  openGraph: {
    title: 'Museums in Bahrain 2025 | National Museum, Art & Cultural Sites',
    description: 'Your guide to museums and cultural attractions in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/museums',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/museums',
  },
};

const museums = [
  {
    name: 'Bahrain National Museum',
    location: 'Al Fatih District, Manama',
    type: 'National Museum',
    rating: 5,
    price: 'BD 1 (adults), Free (children)',
    description: 'Bahrain\'s premier museum showcasing 6,000 years of history from the ancient Dilmun civilization to modern times. Stunning architecture and comprehensive exhibits.',
    highlights: ['Dilmun burial mounds exhibit', 'Traditional crafts hall', 'Ancient artifacts', 'Pearl diving history', 'Contemporary art wing'],
    exhibits: [
      { name: 'Dilmun Hall', desc: 'Ancient civilization artifacts (3000-300 BC)' },
      { name: 'Tylos Hall', desc: 'Greek influence period' },
      { name: 'Islamic Era', desc: 'Islamic heritage and manuscripts' },
      { name: 'Customs & Traditions', desc: 'Traditional Bahraini life' },
    ],
    duration: '2-3 hours',
    hours: 'Daily 8AM-8PM (Fri 3PM-8PM)',
    tips: 'Start with the ground floor chronological exhibits. Rooftop cafe has great views.',
    mustSee: true,
  },
  {
    name: 'Beit Al Quran',
    location: 'Hoora, Manama',
    type: 'Islamic Heritage Museum',
    rating: 5,
    price: 'Free',
    description: 'World-renowned Islamic arts museum housing one of the largest collections of Quran manuscripts, Islamic art, and calligraphy. Architectural masterpiece.',
    highlights: ['Rare Quran manuscripts', 'Islamic calligraphy', 'Pearl artifacts', 'Mosque', 'Research library'],
    exhibits: [
      { name: 'Quran Gallery', desc: 'Manuscripts spanning 1400 years' },
      { name: 'Calligraphy Hall', desc: 'Arabic script art forms' },
      { name: 'Islamic Artifacts', desc: 'Tiles, textiles, and metalwork' },
      { name: 'Pearl Heritage', desc: 'Bahrain\'s pearl diving history' },
    ],
    duration: '1.5-2 hours',
    hours: 'Sat-Thu 9AM-12PM, 4PM-6PM',
    tips: 'Dress modestly. The mosque is beautiful for quiet reflection.',
    mustSee: true,
  },
  {
    name: 'Bahrain Currency Museum',
    location: 'Central Bank of Bahrain, Diplomatic Area',
    type: 'Specialized Museum',
    rating: 4,
    price: 'Free',
    description: 'Fascinating collection tracing the history of money in Bahrain from ancient trade to modern currency. Features rare coins and banknotes.',
    highlights: ['Ancient Dilmun weights', 'Colonial currency', 'Gulf currency history', 'Bahraini Dinar evolution'],
    exhibits: [
      { name: 'Pre-Currency Trade', desc: 'Barter and early exchange' },
      { name: 'Indian Rupee Era', desc: 'Gulf Rupee period' },
      { name: 'Bahraini Dinar', desc: 'Modern currency from 1965' },
    ],
    duration: '45 min - 1 hour',
    hours: 'Sun-Thu 8AM-2PM',
    tips: 'Small but interesting. Combine with walking tour of Diplomatic Area.',
    mustSee: false,
  },
  {
    name: 'Oil Museum',
    location: 'Sakhir, near Oil Well No. 1',
    type: 'Industry Museum',
    rating: 4,
    price: 'Free',
    description: 'Located near Bahrain\'s first oil well (1932), this museum tells the story of oil discovery and its transformation of Bahrain and the Gulf region.',
    highlights: ['First oil well site', 'Drilling equipment', 'Industry development', 'Historical photographs'],
    exhibits: [
      { name: 'Discovery Story', desc: 'How oil was found in 1932' },
      { name: 'Industry Growth', desc: 'BAPCO and development' },
      { name: 'Equipment Hall', desc: 'Historic drilling machinery' },
    ],
    duration: '1-1.5 hours',
    hours: 'Sun-Thu 8AM-2PM',
    tips: 'See the actual first oil well outside. Great for history enthusiasts.',
    mustSee: false,
  },
  {
    name: 'Bahrain Fort Museum',
    location: 'Qal\'at al-Bahrain (Bahrain Fort)',
    type: 'Archaeological Museum',
    rating: 5,
    price: 'BD 1',
    description: 'Modern museum at the UNESCO World Heritage Site of Qal\'at al-Bahrain, showcasing artifacts from the fort\'s 4,000-year history.',
    highlights: ['Dilmun capital artifacts', 'Portuguese period', 'Archaeological findings', 'Fort views'],
    exhibits: [
      { name: 'Dilmun Era', desc: 'Ancient capital city remains' },
      { name: 'Trade Routes', desc: 'Bahrain as ancient hub' },
      { name: 'Portuguese Fort', desc: '16th century occupation' },
    ],
    duration: '1-2 hours (with fort)',
    hours: 'Daily 8AM-8PM',
    tips: 'Visit museum first, then explore the fort. Sunset is magical.',
    mustSee: true,
  },
  {
    name: 'Bahrain Authority for Culture & Antiquities Gallery',
    location: 'National Museum Complex',
    type: 'Art Gallery',
    rating: 4,
    price: 'Free - BD 2',
    description: 'Contemporary art space hosting rotating exhibitions by local and international artists. Check current exhibitions before visiting.',
    highlights: ['Contemporary art', 'Bahraini artists', 'Rotating exhibitions', 'Art workshops'],
    exhibits: [
      { name: 'Rotating Shows', desc: 'Changes every 2-3 months' },
    ],
    duration: '30 min - 1 hour',
    hours: 'Daily 8AM-8PM',
    tips: 'Check website for current exhibitions. Part of National Museum complex.',
    mustSee: false,
  },
  {
    name: 'La Fontaine Centre of Contemporary Art',
    location: 'Hoora, Manama',
    type: 'Contemporary Art Gallery',
    rating: 4,
    price: 'Free',
    description: 'Private contemporary art gallery in a beautiful traditional house, featuring local and regional artists. Intimate exhibition spaces.',
    highlights: ['Contemporary Middle Eastern art', 'Historic building', 'Artist talks', 'Sculpture garden'],
    exhibits: [
      { name: 'Permanent Collection', desc: 'Regional contemporary works' },
      { name: 'Guest Exhibitions', desc: 'Rotating shows' },
    ],
    duration: '30-45 minutes',
    hours: 'Sat-Thu 10AM-6PM',
    tips: 'Beautiful building alone worth the visit. Peaceful atmosphere.',
    mustSee: false,
  },
];

const visitingTips = [
  {
    title: 'Best Time',
    content: 'Mornings are quietest. Avoid Friday mornings (most closed) and school group times (9-11AM).',
  },
  {
    title: 'Photography',
    content: 'Generally allowed without flash. Some exhibits restrict photos — check signage.',
  },
  {
    title: 'Dress Code',
    content: 'Modest dress recommended, especially for Beit Al Quran. No shorts or sleeveless tops.',
  },
  {
    title: 'Language',
    content: 'Exhibits have English and Arabic labels. Audio guides available at National Museum.',
  },
  {
    title: 'Combine Visits',
    content: 'National Museum + Bahrain Fort make an excellent history day trip.',
  },
  {
    title: 'Free Days',
    content: 'Many museums are free or under BD 2. Great value cultural experiences.',
  },
];

const museumsByTheme = [
  { theme: 'Must-See', museums: ['Bahrain National Museum', 'Beit Al Quran', 'Bahrain Fort Museum'] },
  { theme: 'History Buffs', museums: ['National Museum', 'Oil Museum', 'Fort Museum'] },
  { theme: 'Art Lovers', museums: ['La Fontaine', 'BACA Gallery', 'National Museum'] },
  { theme: 'Free Entry', museums: ['Beit Al Quran', 'Currency Museum', 'Oil Museum', 'La Fontaine'] },
];

export default function MuseumsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Museums', url: 'https://www.bahrainnights.com/guides/museums' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🏛️ Cultural Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Museums
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore 6,000 years of history at Bahrain's world-class museums — from ancient 
              Dilmun civilization to contemporary art and Islamic heritage.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Museums', value: '7+', icon: Landmark },
              { label: 'Entry From', value: 'Free', icon: Ticket },
              { label: 'Max Entry', value: 'BD 2', icon: DollarSign },
              { label: 'History Span', value: '6,000 yrs', icon: BookOpen },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Pick by Theme */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Museums by Interest</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {museumsByTheme.map((cat) => (
              <div key={cat.theme} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-amber-400 mb-2">{cat.theme}</h3>
                <p className="text-sm text-gray-300">{cat.museums.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Museums List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">All Museums in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide with hours, exhibits, and visitor information.
          </p>
          
          <div className="space-y-6">
            {museums.map((museum) => (
              <div 
                key={museum.name}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all ${
                  museum.mustSee ? 'ring-2 ring-amber-500/50' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{museum.name}</h3>
                          {museum.mustSee && (
                            <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded font-bold">MUST SEE</span>
                          )}
                        </div>
                        <p className="text-amber-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {museum.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(museum.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-green-400">{museum.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{museum.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {museum.highlights.map((h) => (
                        <span key={h} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>

                    {museum.exhibits && (
                      <div className="grid grid-cols-2 gap-2">
                        {museum.exhibits.map((ex) => (
                          <div key={ex.name} className="bg-black/20 rounded-lg p-2">
                            <p className="font-semibold text-amber-400 text-sm">{ex.name}</p>
                            <p className="text-xs text-gray-400">{ex.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Duration:</strong> {museum.duration}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {museum.hours}</p>
                    <p className="text-amber-400 italic pt-2">💡 {museum.tips}</p>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Visiting Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitingTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More History</h2>
          <p className="text-gray-300 mb-8">
            Discover Bahrain's historical sites and cultural attractions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/historical-sites"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Historical Sites
            </Link>
            <Link 
              href="/guides/tourist-attractions"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Tourist Attractions
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
              { title: 'Historical Sites', href: '/guides/historical-sites', emoji: '🏰' },
              { title: 'Tourist Attractions', href: '/guides/tourist-attractions', emoji: '🗺️' },
              { title: 'Traditional Souks', href: '/guides/souks', emoji: '🏺' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
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
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is the best museum in Bahrain?',
                a: 'Bahrain National Museum is the must-visit museum, showcasing 6,000 years of history from Dilmun civilization to modern times. Beit Al Quran is equally impressive for Islamic heritage.',
              },
              {
                q: 'Are museums free in Bahrain?',
                a: 'Many museums are free including Beit Al Quran, Currency Museum, Oil Museum, and La Fontaine gallery. Others charge BD 1-2 maximum.',
              },
              {
                q: 'What are the museum opening hours in Bahrain?',
                a: 'Most museums open 8AM-8PM daily, with some closed or opening later on Fridays. Always check specific hours as they vary.',
              },
              {
                q: 'How long should I spend at Bahrain National Museum?',
                a: 'Allow 2-3 hours to properly explore the National Museum. It covers extensive history and has excellent exhibits on each era of Bahrain\'s past.',
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
            headline: 'Museums in Bahrain 2025 | National Museum, Art & Cultural Sites',
            description: 'Complete guide to museums in Bahrain including National Museum, Beit Al Quran, and cultural attractions.',
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
              '@id': 'https://bahrainnights.com/guides/museums',
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
                name: 'What is the best museum in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain National Museum is the must-visit museum, showcasing 6,000 years of history.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are museums free in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Many museums are free including Beit Al Quran and Currency Museum. Others charge BD 1-2.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long should I spend at Bahrain National Museum?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Allow 2-3 hours to properly explore the National Museum.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
