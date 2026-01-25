import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Castle, Clock, MapPin, Star,
  Ticket, Camera, Globe, Compass
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Historical Sites in Bahrain 2025 | UNESCO Heritage, Forts & Ruins',
  description: 'Explore Bahrain\'s historical sites! Complete guide to Bahrain Fort (UNESCO), Qal\'at al-Bahrain, burial mounds, Portuguese fort, Tree of Life & ancient Dilmun.',
  keywords: 'historical sites Bahrain, Bahrain Fort, UNESCO Bahrain, Qal\'at al-Bahrain, burial mounds Bahrain, Tree of Life, Dilmun civilization, forts Bahrain',
  openGraph: {
    title: 'Historical Sites in Bahrain 2025 | UNESCO Heritage, Forts & Ruins',
    description: 'Your guide to historical sites and UNESCO heritage in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/historical-sites',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/historical-sites',
  },
};

const historicalSites = [
  {
    name: 'Qal\'at al-Bahrain (Bahrain Fort)',
    location: 'Karbabad',
    type: 'UNESCO World Heritage Site',
    rating: 5,
    price: 'BD 1 (site + museum)',
    established: '2300 BC - Present',
    description: 'The crown jewel of Bahrain\'s heritage — a UNESCO World Heritage Site with 4,000 years of continuous human occupation. Layers of Dilmun, Kassites, Portuguese, and Arab civilizations.',
    highlights: ['UNESCO status (2005)', '4,000 years of history', 'Dilmun capital city', 'Portuguese fort ruins', 'Sea views', 'On-site museum'],
    whatsToSee: [
      { name: 'Portuguese Fort', desc: '16th century fortification' },
      { name: 'Dilmun Ruins', desc: 'Ancient city excavations' },
      { name: 'Museum', desc: 'Artifacts and site history' },
      { name: 'Watchtower', desc: 'Panoramic views' },
    ],
    duration: '2-3 hours',
    hours: 'Daily 8AM-8PM',
    tips: 'Visit at sunset for magical lighting. Museum first, then explore the site.',
    mustSee: true,
  },
  {
    name: 'Dilmun Burial Mounds',
    location: 'A\'ali & surrounding areas',
    type: 'UNESCO World Heritage Site',
    rating: 5,
    price: 'Free (public sites)',
    established: '2050-1750 BC',
    description: 'One of the world\'s largest ancient cemeteries with 21 archaeological sites featuring burial mounds from the early Dilmun era. UNESCO inscribed in 2019.',
    highlights: ['UNESCO status (2019)', '170,000+ mounds originally', 'Royal Mounds at A\'ali', 'Unique architecture', 'Dilmun culture'],
    whatsToSee: [
      { name: 'Royal Mounds A\'ali', desc: 'Largest burial mounds' },
      { name: 'Mound Fields', desc: 'Scattered ancient cemeteries' },
      { name: 'Excavated Tombs', desc: 'Visible internal chambers' },
    ],
    duration: '1-2 hours',
    hours: '24/7 (outdoor sites)',
    tips: 'A\'ali Royal Mounds are most accessible. Combine with Pottery workshops nearby.',
    mustSee: true,
  },
  {
    name: 'Pearling Path (Muharraq)',
    location: 'Muharraq Island',
    type: 'UNESCO World Heritage Site',
    rating: 5,
    price: 'Free (walking) / BD 1-3 (buildings)',
    established: '19th-20th century',
    description: 'UNESCO-listed testimony to Bahrain\'s pearl diving heritage. Walking trail through historic Muharraq connecting traditional houses, merchants\' homes, and seafront.',
    highlights: ['UNESCO status (2012)', 'Historic houses', 'Pearl diving heritage', 'Traditional architecture', 'Seafront views'],
    whatsToSee: [
      { name: 'Siyadi Houses', desc: 'Merchant family homes' },
      { name: 'Bu Maher Fort', desc: 'Seafront fortification' },
      { name: 'Amarat Fakhro', desc: 'Traditional house museum' },
      { name: 'Pearling Jetty', desc: 'Historic boat launch' },
    ],
    duration: '2-3 hours',
    hours: 'Buildings 9AM-5PM (varies)',
    tips: 'Start at Pearling Trail Visitor Centre. Best walked in cooler months.',
    mustSee: true,
  },
  {
    name: 'Tree of Life (Shajarat al-Hayat)',
    location: 'Southern Desert',
    type: 'Natural Wonder',
    rating: 4,
    price: 'Free',
    established: '400+ years old',
    description: 'Iconic 400-year-old mesquite tree standing alone in the barren desert with no visible water source. One of Bahrain\'s most photographed landmarks.',
    highlights: ['400+ year old tree', 'Mystery of survival', 'Desert setting', 'Sunset spot', 'Photo opportunity'],
    whatsToSee: [
      { name: 'The Tree', desc: 'Ancient Prosopis cineraria' },
      { name: 'Desert Views', desc: 'Barren landscape' },
      { name: 'Visitor Area', desc: 'Parking and facilities' },
    ],
    duration: '30 min - 1 hour',
    hours: '24/7',
    tips: 'Visit at sunset. Combine with nearby oil wells. 4WD not required but road is rough.',
    mustSee: true,
  },
  {
    name: 'Arad Fort',
    location: 'Arad, Muharraq',
    type: 'Historic Fort',
    rating: 4,
    price: 'Free',
    established: '15th century',
    description: 'Beautifully restored 15th-century Arabian fort near Bahrain International Airport. Atmospheric setting especially when lit at night.',
    highlights: ['15th century architecture', 'Night illumination', 'Waterfront location', 'Cultural events', 'Photo opportunities'],
    whatsToSee: [
      { name: 'Fort Interior', desc: 'Restored rooms and passages' },
      { name: 'Watchtowers', desc: 'Corner defensive towers' },
      { name: 'Courtyard', desc: 'Central open area' },
    ],
    duration: '45 min - 1 hour',
    hours: 'Daily 8AM-8PM',
    tips: 'Evening visits are magical when the fort is illuminated. Great for photography.',
    mustSee: false,
  },
  {
    name: 'Riffa Fort (Sheikh Salman bin Ahmed Fort)',
    location: 'Riffa',
    type: 'Historic Fort',
    rating: 4,
    price: 'Free',
    established: '1812',
    description: 'Historic fort built in 1812, former residence of Bahrain\'s ruling family. Overlooks the Hunanaiya Valley with beautiful views.',
    highlights: ['19th century architecture', 'Royal history', 'Valley views', 'Traditional design', 'Photography'],
    whatsToSee: [
      { name: 'Residential Quarters', desc: 'Former royal rooms' },
      { name: 'Watchtower', desc: 'Valley viewpoint' },
      { name: 'Courtyard', desc: 'Central gathering space' },
    ],
    duration: '30-45 minutes',
    hours: 'Sun-Thu 8AM-2PM, 4PM-6PM',
    tips: 'Combine with Royal Golf Club nearby. Valley views are worth the visit.',
    mustSee: false,
  },
  {
    name: 'Barbar Temple',
    location: 'Barbar Village',
    type: 'Archaeological Site',
    rating: 4,
    price: 'Free',
    established: '3000-2000 BC',
    description: 'Ancient Dilmun temple complex dedicated to Enki, god of wisdom and fresh water. One of the most important archaeological discoveries in Bahrain.',
    highlights: ['4,000+ year old temple', 'Dilmun religion', 'Sacred spring', 'Archaeological excavations'],
    whatsToSee: [
      { name: 'Temple Complex', desc: 'Three overlapping temples' },
      { name: 'Sacred Pool', desc: 'Ancient water source' },
      { name: 'Altar Remains', desc: 'Sacrificial areas' },
    ],
    duration: '45 min - 1 hour',
    hours: 'Daily 8AM-6PM',
    tips: 'Bring informational material — signage is limited. Combine with Qal\'at al-Bahrain.',
    mustSee: false,
  },
  {
    name: 'Al Khamis Mosque',
    location: 'Al Khamis',
    type: 'Historic Mosque',
    rating: 4,
    price: 'Free',
    established: '7th-11th century',
    description: 'One of the oldest mosques in the Arabian Gulf, believed to date to the 7th century. Notable twin minarets added in the 11th century.',
    highlights: ['Ancient mosque', 'Twin minarets', 'Islamic history', 'Archaeological importance'],
    whatsToSee: [
      { name: 'Twin Minarets', desc: '11th century additions' },
      { name: 'Prayer Hall', desc: 'Original mosque foundation' },
      { name: 'Surroundings', desc: 'Archaeological zone' },
    ],
    duration: '30 minutes',
    hours: 'Exterior always visible',
    tips: 'Non-Muslims can view exterior. Important for Islamic history enthusiasts.',
    mustSee: false,
  },
];

const visitingTips = [
  {
    title: 'Best Time',
    content: 'October-April offers pleasant weather. Summer visits should be early morning or evening only.',
  },
  {
    title: 'UNESCO Sites',
    content: 'Bahrain has 3 UNESCO World Heritage Sites. Plan at least one full day to see them all.',
  },
  {
    title: 'What to Bring',
    content: 'Water, sunscreen, hat, comfortable shoes. Many sites have uneven terrain.',
  },
  {
    title: 'Dress Code',
    content: 'Modest dress recommended. Cover shoulders and knees at religious sites.',
  },
  {
    title: 'Guided Tours',
    content: 'Consider guided tours for deeper understanding. National Museum offers context before visiting sites.',
  },
  {
    title: 'Photography',
    content: 'Generally allowed everywhere. Sunset at Bahrain Fort and Tree of Life is spectacular.',
  },
];

export default function HistoricalSitesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Historical Sites', url: 'https://www.bahrainnights.com/guides/historical-sites' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🏰 Heritage Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Historical Sites
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Walk through 5,000 years of history — from ancient Dilmun temples to Portuguese 
              forts and UNESCO World Heritage sites.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'UNESCO Sites', value: '3', icon: Globe },
              { label: 'Historic Sites', value: '15+', icon: Castle },
              { label: 'Entry From', value: 'Free', icon: Ticket },
              { label: 'History Span', value: '5,000 yrs', icon: Compass },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNESCO Highlight */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Globe className="w-5 h-5 text-orange-400" />
            UNESCO World Heritage Sites
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4">
              <h3 className="font-bold text-orange-400">Qal\'at al-Bahrain</h3>
              <p className="text-xs text-gray-400">Inscribed 2005</p>
              <p className="text-sm text-gray-300 mt-1">Ancient harbor and capital of Dilmun</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4">
              <h3 className="font-bold text-orange-400">Pearling Path</h3>
              <p className="text-xs text-gray-400">Inscribed 2012</p>
              <p className="text-sm text-gray-300 mt-1">Testimony to island\'s pearling economy</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4">
              <h3 className="font-bold text-orange-400">Dilmun Burial Mounds</h3>
              <p className="text-xs text-gray-400">Inscribed 2019</p>
              <p className="text-sm text-gray-300 mt-1">Ancient cemetery of early Dilmun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Sites List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">All Historical Sites</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide with visiting hours and tips.
          </p>
          
          <div className="space-y-6">
            {historicalSites.map((site) => (
              <div 
                key={site.name}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all ${
                  site.mustSee ? 'ring-2 ring-orange-500/50' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{site.name}</h3>
                          {site.mustSee && (
                            <span className="text-xs bg-orange-500 text-black px-2 py-0.5 rounded font-bold">MUST SEE</span>
                          )}
                        </div>
                        <p className="text-orange-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {site.location} • {site.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(site.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-green-400">{site.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">Established: {site.established}</p>
                    <p className="text-gray-300 mb-4">{site.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {site.highlights.map((h) => (
                        <span key={h} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      {site.whatsToSee.map((item) => (
                        <div key={item.name} className="bg-black/20 rounded-lg p-2">
                          <p className="font-semibold text-orange-400 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Duration:</strong> {site.duration}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {site.hours}</p>
                    <p className="text-orange-400 italic pt-2">💡 {site.tips}</p>
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
                <h3 className="font-bold text-orange-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-red-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Culture</h2>
          <p className="text-gray-300 mb-8">
            Discover Bahrain's museums and cultural attractions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/museums"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
            >
              Museums
            </Link>
            <Link 
              href="/guides/souks"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Traditional Souks
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
              { title: 'Museums', href: '/guides/museums', emoji: '🏛️' },
              { title: 'Tourist Attractions', href: '/guides/tourist-attractions', emoji: '🗺️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Free Things', href: '/guides/free-things-to-do', emoji: '🆓' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-orange-400 transition-colors">
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
                q: 'What are the UNESCO World Heritage Sites in Bahrain?',
                a: 'Bahrain has three UNESCO sites: Qal\'at al-Bahrain (Bahrain Fort, 2005), Pearling Path in Muharraq (2012), and Dilmun Burial Mounds (2019).',
              },
              {
                q: 'What is the oldest historical site in Bahrain?',
                a: 'Qal\'at al-Bahrain dates back to 2300 BC, and Barbar Temple to around 3000 BC. The Dilmun burial mounds date from 2050-1750 BC.',
              },
              {
                q: 'Is the Tree of Life worth visiting?',
                a: 'Yes! While it\'s essentially just a tree, its survival for 400+ years in barren desert is remarkable. It\'s especially beautiful at sunset.',
              },
              {
                q: 'How long do I need to see Bahrain\'s historical sites?',
                a: 'Allow 2-3 days to properly explore all major sites. At minimum, spend one full day covering Bahrain Fort, National Museum, and the Pearling Path.',
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
            headline: 'Historical Sites in Bahrain 2025 | UNESCO Heritage, Forts & Ruins',
            description: 'Complete guide to historical sites in Bahrain including UNESCO World Heritage Sites and ancient Dilmun ruins.',
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
              '@id': 'https://bahrainnights.com/guides/historical-sites',
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
                name: 'What are the UNESCO World Heritage Sites in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain has three UNESCO sites: Qal\'at al-Bahrain (2005), Pearling Path (2012), and Dilmun Burial Mounds (2019).',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the oldest historical site in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Barbar Temple dates to around 3000 BC, and Qal\'at al-Bahrain to 2300 BC.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the Tree of Life worth visiting?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Its survival for 400+ years in barren desert is remarkable, especially at sunset.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
