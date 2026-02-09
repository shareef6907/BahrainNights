import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sun, Mountain, Waves, MapPin, Clock, Star,
  Camera, Compass, Wind, TreePine
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Outdoor Activities in Bahrain 2026 | Adventures & Nature Guide',
  description: 'Discover the best outdoor activities in Bahrain — desert adventures, water sports, nature reserves, and beach activities. Complete guide to Bahrain outdoor experiences.',
  keywords: 'outdoor activities Bahrain, Bahrain adventure, desert safari Bahrain, water sports Bahrain, Bahrain nature, things to do outside Bahrain, Bahrain beach activities',
  openGraph: {
    title: 'Outdoor Activities in Bahrain 2026 | Adventures & Nature Guide',
    description: 'Your complete guide to outdoor adventures and nature experiences in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/outdoor-activities-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/outdoor-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outdoor Activities in Bahrain 2026',
    description: 'Desert adventures, water sports, and nature experiences in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/outdoor-activities-bahrain',
  },
};

const desertActivities = [
  { name: 'Desert Safari', description: 'Experience dune bashing, camel riding, and traditional Bedouin camps', duration: '4-6 hours', best: 'Oct-Apr', price: 'BD 25-60' },
  { name: 'Quad Biking', description: 'Race through the desert dunes on ATVs with guided tours', duration: '1-2 hours', best: 'Year-round', price: 'BD 15-35' },
  { name: 'Sandboarding', description: 'Surf the sand dunes like snowboarding in the desert', duration: '2-3 hours', best: 'Oct-Mar', price: 'BD 20-40' },
  { name: 'Camping', description: 'Overnight desert camping under the stars with BBQ', duration: 'Overnight', best: 'Nov-Feb', price: 'BD 40-80' },
];

const waterSports = [
  { name: 'Jet Skiing', description: 'High-speed fun on the Arabian Gulf waters', location: 'Amwaj Islands, Zallaq', price: 'BD 15-25/30min' },
  { name: 'Kayaking', description: 'Explore mangroves and coastal areas peacefully', location: 'Al Areen, Tubli Bay', price: 'BD 10-20' },
  { name: 'Scuba Diving', description: 'Discover underwater shipwrecks and coral reefs', location: 'Various sites', price: 'BD 40-80' },
  { name: 'Parasailing', description: 'Soar above the coastline with stunning views', location: 'Amwaj, Durrat Al Bahrain', price: 'BD 25-40' },
  { name: 'Paddleboarding', description: 'Stand-up paddleboarding in calm waters', location: 'Beach clubs, Amwaj', price: 'BD 10-15/hour' },
  { name: 'Fishing Trips', description: 'Traditional and sport fishing in the Gulf', location: 'Manama Corniche', price: 'BD 50-150' },
];

const natureSpots = [
  { name: 'Al Areen Wildlife Park', description: 'Arabia\'s first wildlife reserve with native and exotic species. See Arabian oryx, gazelles, and over 500 animal species.', highlights: 'Safari drives, bird watching', time: '2-3 hours' },
  { name: 'Hawar Islands', description: 'UNESCO-protected islands with pristine beaches and wildlife. Home to the world\'s largest dugong population.', highlights: 'Boat trips, dolphin watching', time: 'Full day' },
  { name: 'Tree of Life', description: 'The mysterious 400-year-old tree standing alone in the desert. A natural wonder with no visible water source.', highlights: 'Photography, sunset views', time: '1 hour' },
  { name: 'Tubli Bay', description: 'Important wetland area with mangroves and rich birdlife. Great for kayaking and nature walks.', highlights: 'Bird watching, kayaking', time: '2-3 hours' },
];

const beaches = [
  { name: 'Marassi Beach', description: 'Premium beach club with water sports and lounging', area: 'Diyar Al Muharraq', vibe: 'Upscale' },
  { name: 'Amwaj Beach', description: 'Clean public beaches with family-friendly facilities', area: 'Amwaj Islands', vibe: 'Family' },
  { name: 'Jaw Beach', description: 'Quiet local beach perfect for swimming and relaxing', area: 'Jaw', vibe: 'Relaxed' },
  { name: 'Al Jazair Beach', description: 'Popular beach with food stalls and activities', area: 'Zallaq', vibe: 'Lively' },
];

const sportsFacilities = [
  { name: 'Royal Golf Club', activity: 'Golf', description: '18-hole championship course with stunning views', price: 'BD 60-100' },
  { name: 'Bahrain International Circuit', activity: 'Karting', description: 'Race on the F1 circuit outdoor karting track', price: 'BD 15-30' },
  { name: 'Lost Paradise of Dilmun', activity: 'Waterpark', description: 'Bahrain\'s largest waterpark with slides and pools', price: 'BD 18-28' },
  { name: 'Gravity Indoor Skydiving', activity: 'Skydiving', description: 'Indoor skydiving experience for all ages', price: 'BD 25-45' },
];

const seasonalTips = [
  { season: 'Winter (Nov-Feb)', temp: '18-24°C', activities: 'All outdoor activities, camping, hiking', verdict: 'Perfect for everything' },
  { season: 'Spring (Mar-Apr)', temp: '22-32°C', activities: 'Water sports, early morning activities', verdict: 'Good with morning starts' },
  { season: 'Summer (May-Sep)', temp: '35-45°C', activities: 'Water activities only, indoor facilities', verdict: 'Too hot for desert' },
  { season: 'Autumn (Oct)', temp: '28-35°C', activities: 'Transitional - water sports best', verdict: 'Heat subsiding' },
];

const faqs = [
  { q: 'What are the best outdoor activities in Bahrain?', a: 'The best outdoor activities in Bahrain include desert safaris with dune bashing, water sports like jet skiing and scuba diving, visiting Al Areen Wildlife Park, exploring Hawar Islands, and beach activities at Amwaj Islands.' },
  { q: 'When is the best time for outdoor activities in Bahrain?', a: 'The best time for outdoor activities in Bahrain is from November to February when temperatures are pleasant (18-24°C). Avoid May to September when temperatures can exceed 45°C.' },
  { q: 'Where can I go camping in Bahrain?', a: 'Desert camping is popular in the southern areas near Sakhir and the Tree of Life. Many tour operators offer overnight camping experiences with traditional Bedouin camps from October to March.' },
  { q: 'Is Bahrain good for water sports?', a: 'Yes, Bahrain is excellent for water sports. Popular activities include jet skiing, kayaking, paddleboarding, parasailing, scuba diving, and fishing. Best locations are Amwaj Islands, Zallaq, and Durrat Al Bahrain.' },
  { q: 'Are there hiking trails in Bahrain?', a: 'While Bahrain is relatively flat, you can enjoy nature walks at Al Areen Wildlife Park, Tubli Bay mangroves, and the Hawar Islands. The Tree of Life area also offers desert walking experiences.' },
];

export default function OutdoorActivitiesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Outdoor Activities', url: 'https://www.bahrainnights.com/guides/outdoor-activities-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">🏜️ Adventure Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Outdoor Activities in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              From desert safaris and dune bashing to water sports and wildlife encounters — discover the adventurous side of Bahrain with our complete outdoor activities guide.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Mountain className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-400">15+</p>
              <p className="text-xs text-gray-400">Desert Adventures</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">20+</p>
              <p className="text-xs text-gray-400">Water Sports</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <TreePine className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">5</p>
              <p className="text-xs text-gray-400">Nature Reserves</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Sun className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">8</p>
              <p className="text-xs text-gray-400">Beach Destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain may be a small island nation, but it offers a surprising variety of outdoor adventures. The Kingdom&apos;s unique position in the Arabian Gulf provides opportunities for both desert and water-based activities. Whether you&apos;re an adrenaline junkie seeking thrills or a nature lover looking for peaceful escapes, Bahrain&apos;s outdoor scene has something special waiting for you.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The best time to explore Bahrain&apos;s outdoors is during the cooler months from November to March, when temperatures are pleasant and you can comfortably spend entire days outside. Summer months are best reserved for water activities or early morning adventures before the heat sets in.
          </p>
        </div>
      </section>

      {/* Desert Activities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Mountain className="w-8 h-8 text-amber-400" /> Desert Adventures
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the raw beauty of Bahrain&apos;s desert landscape with thrilling adventures that take you off the beaten path.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {desertActivities.map((activity) => (
              <div key={activity.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-amber-400 mb-2">{activity.name}</h3>
                <p className="text-gray-300 mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" /> {activity.duration}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Sun className="w-4 h-4" /> Best: {activity.best}
                  </span>
                  <span className="text-emerald-400 font-medium">{activity.price}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-400">
            Looking for adventure events? Check <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">EventsBahrain.com</a> for upcoming outdoor experiences and guided tours.
          </p>
        </div>
      </section>

      {/* Water Sports */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Waves className="w-8 h-8 text-blue-400" /> Water Sports & Activities
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            With the Arabian Gulf at your doorstep, Bahrain offers incredible water sports from jet skiing to diving.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {waterSports.map((sport) => (
              <div key={sport.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{sport.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{sport.description}</p>
                <p className="text-xs text-gray-400 mb-1"><MapPin className="w-3 h-3 inline mr-1" />{sport.location}</p>
                <p className="text-sm font-medium text-emerald-400">{sport.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/guides/amwaj" className="inline-flex items-center gap-2 text-blue-400 hover:underline">
              Explore Amwaj Islands Guide <Compass className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Nature & Wildlife */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <TreePine className="w-8 h-8 text-green-400" /> Nature & Wildlife
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover Bahrain&apos;s natural treasures, from wildlife reserves to UNESCO-protected islands.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {natureSpots.map((spot) => (
              <div key={spot.name} className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-2">{spot.name}</h3>
                <p className="text-gray-300 mb-4">{spot.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-emerald-400"><Star className="w-4 h-4 inline mr-1" />{spot.highlights}</span>
                  <span className="text-gray-400"><Clock className="w-4 h-4 inline mr-1" />{spot.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beaches */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🏖️ Best Beaches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {beaches.map((beach) => (
              <div key={beach.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{beach.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{beach.description}</p>
                <p className="text-xs text-gray-400"><MapPin className="w-3 h-3 inline mr-1" />{beach.area}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">{beach.vibe}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/guides/pool-day-passes-bahrain" className="text-blue-400 hover:underline">
              See Beach & Pool Day Passes →
            </Link>
          </div>
        </div>
      </section>

      {/* Sports & Recreation */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🏌️ Sports & Recreation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sportsFacilities.map((facility) => (
              <div key={facility.name} className="bg-white/5 rounded-xl p-5">
                <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded mb-2">{facility.activity}</span>
                <h3 className="font-bold text-white mb-2">{facility.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{facility.description}</p>
                <p className="text-sm font-medium text-emerald-400">{facility.price}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-400">
            Book tickets for outdoor attractions on <a href="https://bahrain.platinumlist.net?affiliate=yjg3yzi" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Platinumlist</a>
          </p>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">📅 When to Go — Seasonal Guide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalTips.map((s) => (
              <div key={s.season} className={`rounded-xl p-5 ${s.season.includes('Winter') ? 'bg-emerald-500/20 ring-2 ring-emerald-500' : 'bg-white/5'}`}>
                <h3 className="font-bold text-blue-400">{s.season}</h3>
                <p className="text-lg font-bold">{s.temp}</p>
                <p className="text-sm text-gray-300 mb-2">{s.activities}</p>
                <p className="text-xs text-gray-400">{s.verdict}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💡 Essential Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="font-bold text-emerald-400 mb-2">What to Bring</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Sunscreen (SPF 50+) and sunglasses</li>
                <li>• Plenty of water (2-3 liters minimum)</li>
                <li>• Light, breathable clothing</li>
                <li>• Comfortable closed-toe shoes for desert</li>
                <li>• Camera for stunning desert shots</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="font-bold text-emerald-400 mb-2">Safety First</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Check weather before desert trips</li>
                <li>• Book with licensed tour operators</li>
                <li>• Inform someone of your plans</li>
                <li>• Avoid midday sun (12-3pm) in summer</li>
                <li>• Carry a charged phone</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Bahrain Adventure</h2>
          <p className="text-gray-300 mb-6">Explore more guides to make the most of your outdoor experience</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/things-to-do" className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors">Things to Do</Link>
            <Link href="/guides/first-time" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">First Time Visitor Guide</Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Pool Day Passes', href: '/guides/pool-day-passes-bahrain', emoji: '🏊' },
              { title: 'Kids Activities', href: '/guides/kids-activities-bahrain', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Weekend Getaways', href: '/guides/weekend-getaways', emoji: '🏖️' },
              { title: 'Amwaj Islands', href: '/guides/amwaj', emoji: '🌴' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-emerald-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for outdoor events and festivals? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">EventsBahrain.com</a> for the latest listings. 
            Need stunning video content of Bahrain&apos;s landscapes? Check out <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">CinematicWebWorks.com</a>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Outdoor Activities in Bahrain 2026 — Adventures & Nature Guide',
        description: 'Complete guide to outdoor activities in Bahrain including desert safaris, water sports, nature reserves, and beach activities.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
        mainEntityOfPage: 'https://www.bahrainnights.com/guides/outdoor-activities-bahrain'
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })}} />
    </div>
  );
}
