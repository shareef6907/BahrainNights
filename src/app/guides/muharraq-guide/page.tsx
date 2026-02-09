import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Landmark, Compass, MapPin, Star,
  ArrowRight, Clock, Shell, Building, Camera
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Muharraq Bahrain — Heritage, Restaurants & Hidden Gems 2026',
  description: 'Discover Muharraq, Bahrain\'s cultural heart and UNESCO World Heritage site. Explore traditional restaurants, pearling history, ancient mosques, and hidden gems in this historic island.',
  keywords: 'Muharraq Bahrain, Muharraq restaurants, Muharraq heritage, Pearling Path Bahrain, Bahrain UNESCO, Muharraq Souq, traditional Bahrain, Siyadi House',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/muharraq-guide',
  },
  openGraph: {
    title: 'Muharraq Bahrain — Heritage, Restaurants & Hidden Gems 2026',
    description: 'Your complete guide to Muharraq\'s UNESCO heritage, traditional dining, and authentic Bahraini culture.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/muharraq-guide',
  },
};

const venues = [
  {
    name: 'Haji\'s Café',
    type: 'Traditional Café',
    vibe: 'Heritage',
    rating: 5,
    priceRange: 'BD 2-6',
    highlights: ['Historic building', 'Karak chai', 'Traditional sweets', 'Local atmosphere'],
    bestFor: 'Authentic experience, heritage lovers',
  },
  {
    name: 'Saffron by Jena',
    type: 'Contemporary Bahraini',
    vibe: 'Refined',
    rating: 5,
    priceRange: 'BD 20-35',
    highlights: ['Modern Bahraini', 'Heritage house setting', 'Artistic presentation', 'Tasting menus'],
    bestFor: 'Fine dining, special occasions',
  },
  {
    name: 'Bu Khalaf',
    type: 'Traditional Bahraini',
    vibe: 'Authentic',
    rating: 4,
    priceRange: 'BD 3-8',
    highlights: ['Fresh fish', 'Machboos', 'Local favorite', 'No frills'],
    bestFor: 'Budget-friendly authentic meals',
  },
  {
    name: 'Pearling Path Café',
    type: 'Heritage Café',
    vibe: 'Cultural',
    rating: 4,
    priceRange: 'BD 4-10',
    highlights: ['UNESCO setting', 'Light meals', 'Heritage tours', 'Traditional drinks'],
    bestFor: 'Cultural exploration, coffee breaks',
  },
  {
    name: 'Qaisariya Souq Stalls',
    type: 'Street Food',
    vibe: 'Traditional',
    rating: 4,
    priceRange: 'BD 1-4',
    highlights: ['Fresh samosas', 'Dates', 'Arabic sweets', 'Spice shops'],
    bestFor: 'Street food adventures',
  },
  {
    name: 'Traditional Coffee Houses',
    type: 'Local Qahwa',
    vibe: 'Authentic',
    rating: 4,
    priceRange: 'BD 1-3',
    highlights: ['Arabic coffee', 'Shisha', 'Local crowd', 'Evening atmosphere'],
    bestFor: 'People watching, evening hangouts',
  },
  {
    name: 'Al Fanar Restaurant',
    type: 'Bahraini Cuisine',
    vibe: 'Family',
    rating: 4,
    priceRange: 'BD 5-12',
    highlights: ['Grilled fish', 'Mixed grills', 'Family seating', 'Generous portions'],
    bestFor: 'Family dinners, groups',
  },
  {
    name: 'Dar Al Muharraq',
    type: 'Heritage Restaurant',
    vibe: 'Historic',
    rating: 4,
    priceRange: 'BD 8-18',
    highlights: ['Traditional house', 'Bahraini menu', 'Cultural setting', 'Courtyard dining'],
    bestFor: 'Heritage atmosphere, tourists',
  },
];

const heritageWalk = [
  { name: 'Start at Bu Maher Fort', time: '9:00 AM', activity: 'Seafront fortress & morning views' },
  { name: 'Walk the Pearling Path', time: '10:00 AM', activity: 'UNESCO World Heritage trail' },
  { name: 'Visit Siyadi Houses', time: '11:00 AM', activity: 'Merchant heritage architecture' },
  { name: 'Qaisariya Souq', time: '12:00 PM', activity: 'Traditional market exploration' },
  { name: 'Lunch at Heritage Restaurant', time: '1:00 PM', activity: 'Traditional Bahraini cuisine' },
  { name: 'Muharraq Corniche', time: '4:00 PM', activity: 'Sunset walk & sea views' },
];

const faqs = [
  { q: 'What is Muharraq famous for?', a: 'Muharraq is Bahrain\'s cultural capital and former seat of power, famous for its UNESCO World Heritage Pearling Path, traditional architecture, ancient mosques, and authentic Bahraini cuisine. It was the center of the pearl diving industry that shaped Gulf history and remains the most culturally significant island in Bahrain.' },
  { q: 'What is the Pearling Path in Muharraq?', a: 'The Pearling Path is a UNESCO World Heritage Site that traces the historic pearling industry through Muharraq. It includes restored merchants\' houses, seafront forts, traditional souks, and the sea passages where divers once set off. The path offers a walking route through 3.5 kilometers of heritage buildings and authentic streetscapes.' },
  { q: 'What are the best traditional restaurants in Muharraq?', a: 'Top traditional restaurants include Haji\'s Café for authentic chai and sweets, Bu Khalaf for fresh fish and machboos, Saffron by Jena for elevated Bahraini cuisine, and the various stalls in Qaisariya Souq for street food. Dar Al Muharraq offers dining in a restored heritage house setting.' },
  { q: 'How do I get to Muharraq from Manama?', a: 'Muharraq is connected to Manama by several causeways and is just 10-15 minutes by car. The island is also home to Bahrain International Airport. Taxis and ride-shares are readily available. For the full experience, take a water taxi from Manama to arrive as pearling traders once did.' },
  { q: 'Is Muharraq worth visiting?', a: 'Absolutely. Muharraq offers the most authentic glimpse into pre-oil Bahrain. The UNESCO heritage sites, traditional architecture, genuine local atmosphere, and excellent traditional food make it essential for anyone wanting to understand Bahraini culture. It\'s the antidote to the modern malls and hotels found elsewhere.' },
];

export default function MuharraqGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Muharraq Guide', url: 'https://www.bahrainnights.com/guides/muharraq-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🏛️ Heritage Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Muharraq
              </span>
              {' '}— Heritage, Restaurants & Hidden Gems
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Step back in time to Bahrain&apos;s cultural soul. Muharraq is where pearl divers 
              once built fortunes, where traditional crafts thrive, and where authentic 
              Bahraini cuisine is served in century-old buildings. This UNESCO World Heritage 
              island is the kingdom&apos;s most treasured secret.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Heritage Sites', value: '20+', icon: Landmark },
              { label: 'Traditional Eateries', value: '50+', icon: UtensilsCrossed },
              { label: 'Historic Mosques', value: '10+', icon: Building },
              { label: 'UNESCO Sites', value: '3', icon: Shell },
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

      {/* About Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Muharraq: Where Bahrain&apos;s Soul Lives</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Before the discovery of oil transformed the Gulf, pearls were the white gold that 
              built kingdoms. Muharraq Island stood at the heart of this ancient industry, its 
              harbors filled with dhows, its streets lined with the grand houses of pearl 
              merchants, its air thick with the stories of divers who descended into the 
              depths seeking fortune. Today, this historic island remains Bahrain&apos;s most 
              authentic destination — a living museum where tradition is not performance but 
              daily life.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The UNESCO-inscribed Pearling Path traces this remarkable heritage through the 
              island&apos;s historic core. Beginning at the seafront Bu Maher Fort, where divers 
              once assembled before months-long expeditions, the trail winds through 
              meticulously restored buildings that tell the story of the pearl trade. The 
              Siyadi complex — comprising houses, a mosque, and a majlis — showcases the 
              wealth that successful merchants accumulated. Narrow alleyways open into hidden 
              courtyards, each building revealing layers of history through traditional 
              architectural details: wind towers, carved doors, and shaded walkways designed 
              for the Gulf climate.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Unlike sanitized heritage attractions elsewhere, Muharraq remains a living 
              community. Local Bahraini families still reside in traditional neighborhoods. 
              Elderly men gather in coffee houses to discuss politics and football, just as 
              their grandfathers did. Children play in the same streets where pearl merchants 
              once conducted business. The Qaisariya Souq bustles with shoppers seeking spices, 
              textiles, and the famous Muharraq halwa — a sweet confection that has been 
              produced by the same families for generations.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The culinary heritage of Muharraq represents Bahraini cuisine at its most 
              authentic. Restaurants here serve dishes that have remained unchanged for 
              centuries: machboos with freshly caught fish, muhammar sweetened with dates, 
              and harees slow-cooked to silky perfection. The legendary Haji&apos;s Café, 
              operating from a beautifully restored heritage building, serves karak chai 
              alongside traditional sweets in an atmosphere that transports visitors to 
              another era. For those seeking elevated dining, Saffron by Jena reimagines 
              these traditional recipes through a contemporary lens while maintaining deep 
              respect for ancestral flavors.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Religious heritage adds another dimension to Muharraq&apos;s cultural significance. 
              The island hosts some of Bahrain&apos;s oldest mosques, including the 14th-century 
              Khamis Mosque — believed to be the first mosque built in Bahrain and one of the 
              earliest in the entire Gulf region. The call to prayer echoes through narrow 
              streets, mingling with the sounds of craftsmen at work and vendors calling their 
              wares. This living spirituality infuses the island with a contemplative 
              atmosphere rare in the modern Gulf.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Art and creativity flourish in Muharraq&apos;s restored spaces. Traditional 
              craftspeople — weavers, boat builders, and calligraphers — practice skills 
              passed down through generations. Contemporary artists have established studios 
              in heritage houses, creating a dialogue between past and present. The annual 
              Muharraq cultural festivals transform the island into a celebration of Bahraini 
              heritage, with traditional music, pearl diving demonstrations, and craft markets 
              drawing visitors from across the region.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              For travelers seeking authentic Gulf culture beyond the glittering towers and 
              air-conditioned malls, Muharraq offers an experience that money cannot buy 
              elsewhere. Walking through its streets at dusk, when golden light falls on 
              ancient buildings and the scent of Arabic coffee drifts from open doorways, 
              visitors connect with a heritage that defines Bahraini identity. This is not 
              a museum island but a living community that welcomes those curious enough to 
              explore. The hidden gems here — a particularly excellent fish restaurant known 
              only to locals, a craftsman still making traditional dhow models, a courtyard 
              garden behind an unassuming door — reveal themselves to patient explorers who 
              approach with respect and genuine curiosity.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants & Cafes in Muharraq</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From legendary heritage cafés to authentic street food, discover Muharraq&apos;s culinary treasures.
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
                    <p className="text-amber-400 text-sm">{venue.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{venue.priceRange}</div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      venue.vibe === 'Heritage' ? 'bg-amber-500/30 text-amber-300' :
                      venue.vibe === 'Refined' ? 'bg-purple-500/30 text-purple-300' :
                      venue.vibe === 'Authentic' ? 'bg-green-500/30 text-green-300' :
                      'bg-orange-500/30 text-orange-300'
                    }`}>
                      {venue.vibe}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < venue.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} 
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

      {/* Heritage Walk Route */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Perfect Muharraq Heritage Walk</h2>
          <p className="text-gray-400 text-center mb-12">
            Explore UNESCO World Heritage sites and authentic neighborhoods on this curated walking route.
          </p>
          
          <div className="space-y-4">
            {heritageWalk.map((stop, index) => (
              <div key={stop.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-amber-400">{index + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{stop.name}</h3>
                      <p className="text-gray-400 text-sm">{stop.activity}</p>
                    </div>
                    <span className="text-amber-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stop.time}
                    </span>
                  </div>
                </div>
                {index < heritageWalk.length - 1 && (
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
          <h2 className="text-3xl font-bold mb-12 text-center">Insider Tips for Muharraq</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Compass className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="font-bold mb-2">Getting Around</h3>
              <p className="text-gray-400 text-sm">
                The heritage area is best explored on foot — hire a guide for deeper insights. 
                Muharraq is 10-15 minutes from Manama by car. The island is also accessible 
                by water taxi for a traditional arrival experience.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="font-bold mb-2">Best Times to Visit</h3>
              <p className="text-gray-400 text-sm">
                Morning (9-11 AM) for comfortable walking and open souks. Late afternoon 
                (4-6 PM) for golden light photography. Fridays are quieter but some 
                heritage sites may have reduced hours.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Camera className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="font-bold mb-2">Cultural Etiquette</h3>
              <p className="text-gray-400 text-sm">
                Dress modestly, especially near mosques. Always ask permission before 
                photographing people. Remove shoes when entering traditional houses. 
                A greeting in Arabic is appreciated and opens doors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gems Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Hidden Gems of Muharraq</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Shell className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Pearling Path</h3>
              <p className="text-gray-400 text-sm">
                UNESCO trail through merchant houses and historic waterfronts.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Landmark className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Siyadi Houses</h3>
              <p className="text-gray-400 text-sm">
                Restored pearl merchant homes with intricate architectural details.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <Building className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Ancient Mosques</h3>
              <p className="text-gray-400 text-sm">
                Some of the oldest mosques in the Gulf, still in active use.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <MapPin className="w-10 h-10 text-pink-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Craftsmen Alleys</h3>
              <p className="text-gray-400 text-sm">
                Traditional boat builders and weavers practicing ancient crafts.
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
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More of Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover events, venues, and experiences across the kingdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-lg transition-colors"
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
              Looking for cultural events in Muharraq?{' '}
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/bahrain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                Check upcoming events on Platinumlist →
              </a>
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Planning an event? <a href="https://eventsbahrain.com" className="text-amber-400 hover:underline">EventsBahrain.com</a></span>
              <span>•</span>
              <span>Need a venue website? <a href="https://cinematicwebworks.com" className="text-amber-400 hover:underline">CinematicWebWorks.com</a></span>
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
            headline: 'Muharraq Bahrain — Heritage, Restaurants & Hidden Gems 2026',
            description: 'Complete guide to Muharraq\'s UNESCO heritage, traditional dining, and authentic Bahraini culture.',
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
