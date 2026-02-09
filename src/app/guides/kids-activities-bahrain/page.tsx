import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Baby, Gamepad2, MapPin, Clock, Star,
  Waves, TreePine, Ticket, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Kids Activities in Bahrain 2026 | Family Fun Guide',
  description: 'Best kids activities and family attractions in Bahrain — waterparks, indoor play areas, educational spots, and outdoor adventures. Complete family entertainment guide.',
  keywords: 'kids activities Bahrain, family fun Bahrain, things to do with kids Bahrain, waterpark Bahrain, indoor play Bahrain, family attractions Bahrain, children activities Manama',
  openGraph: {
    title: 'Kids Activities in Bahrain 2026 | Family Fun Guide',
    description: 'Your complete guide to family activities and kids entertainment in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/kids-activities-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/kids-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Activities in Bahrain 2026 | Family Fun',
    description: 'Best family attractions and kids activities in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/kids-activities-bahrain',
  },
};

const waterAttractions = [
  { name: 'Lost Paradise of Dilmun', location: 'Sakhir', description: 'Bahrain\'s largest waterpark with massive slides, wave pool, lazy river, and kids zones. Perfect full-day family outing.', ageRange: 'All ages', hours: '10am-6pm', price: 'BD 18-28' },
  { name: 'Wahooo! Waterpark', location: 'City Centre Bahrain', description: 'Indoor waterpark with 15+ rides, slides, and attractions. Great for escaping summer heat.', ageRange: 'All ages', hours: '10am-10pm', price: 'BD 15-25' },
  { name: 'Bahrain Aquarium', location: 'Muharraq', description: 'Marvel at marine life from the Arabian Gulf and beyond. Touch pools and feeding shows.', ageRange: '2+', hours: '9am-8pm', price: 'BD 4-6' },
];

const indoorPlay = [
  { name: 'Magic Planet', location: 'City Centre Bahrain', description: 'Large indoor entertainment center with rides, games, VR experiences, and soft play areas', ageRange: '1-14', highlights: 'Arcade games, bumper cars, soft play' },
  { name: 'Funland', location: 'Bahrain Mall', description: 'Classic family entertainment center with rides, games, and prize redemption', ageRange: '2-12', highlights: 'Carousel, ball pits, arcade' },
  { name: 'Billy Beez', location: 'Seef Mall', description: 'Massive indoor playground with climbing structures, slides, and trampolines', ageRange: '3-12', highlights: 'Climbing walls, ball cannons' },
  { name: 'Trampo Extreme', location: 'Salmabad', description: 'Trampoline park with foam pits, dodgeball, ninja courses, and free jumping', ageRange: '4+', highlights: 'Ninja course, slam dunk, foam pit' },
  { name: 'Little Gym', location: 'Multiple locations', description: 'Structured play and developmental gymnastics programs for kids', ageRange: '4 months - 12 years', highlights: 'Classes, gymnastics, dance' },
  { name: 'Jungle Bungle', location: 'Riffa', description: 'Adventure play area with themed zones and party facilities', ageRange: '2-12', highlights: 'Themed zones, birthday parties' },
];

const educational = [
  { name: 'Bahrain Science Centre', location: 'Educational Area', description: 'Interactive science exhibits, planetarium shows, and hands-on experiments. Learn while having fun.', highlights: 'Planetarium, experiments, STEM activities', ageRange: '4+', price: 'BD 2-4' },
  { name: 'Bahrain National Museum', location: 'Manama', description: 'Explore 6,000 years of Bahraini history with kid-friendly exhibits and archaeological finds.', highlights: 'Ancient artifacts, burial mounds, pearl diving', ageRange: '5+', price: 'BD 1-2' },
  { name: 'Bahrain Fort (Qal\'at al-Bahrain)', location: 'Karbabad', description: 'UNESCO World Heritage site with an on-site museum. Explore ancient ruins and learn about Dilmun civilization.', highlights: 'Ancient history, museum, outdoor exploration', ageRange: '5+', price: 'Free' },
  { name: 'Beit Al Quran', location: 'Hoora', description: 'Islamic arts museum with beautiful architecture and educational exhibits about Islamic culture.', highlights: 'Islamic art, calligraphy, manuscripts', ageRange: '7+', price: 'Free' },
];

const outdoorFun = [
  { name: 'Al Areen Wildlife Park', description: 'See Arabian oryx, gazelles, and exotic animals. Safari drives through the reserve.', activity: 'Wildlife safari', bestTime: 'Morning' },
  { name: 'Gravity Bahrain', description: 'Indoor skydiving experience safe for kids. Flying without jumping from a plane!', activity: 'Indoor skydiving', bestTime: 'Any time' },
  { name: 'Royal Camel Farm', description: 'Meet camels, learn about their importance to Bahrain, and take photos.', activity: 'Animal encounter', bestTime: 'Morning' },
  { name: 'Bahrain International Circuit', description: 'Go-karting on the F1 track. Junior karts for ages 7+ and family sessions.', activity: 'Go-karting', bestTime: 'Evening' },
  { name: 'Tree of Life', description: 'Visit the mysterious 400-year-old tree in the desert. Quick trip with photo opportunity.', activity: 'Nature excursion', bestTime: 'Sunset' },
  { name: 'Prince Khalifa Park', description: 'Large park with playgrounds, lake, mini golf, and picnic areas.', activity: 'Park & playground', bestTime: 'Afternoon' },
];

const ageActivities = [
  { age: 'Toddlers (0-3)', activities: 'Soft play areas, Billy Beez, Bahrain Aquarium touch pools, splash pads', recommended: 'Billy Beez, Magic Planet baby zone, Amwaj lagoon' },
  { age: 'Young Kids (4-7)', activities: 'Waterparks, indoor playgrounds, science centre, petting zoos', recommended: 'Lost Paradise, Wahooo!, Bahrain Science Centre' },
  { age: 'Older Kids (8-12)', activities: 'Trampoline parks, go-karting, indoor skydiving, escape rooms', recommended: 'Trampo Extreme, BIC karting, Gravity skydiving' },
  { age: 'Teens (13+)', activities: 'Escape rooms, laser tag, extreme sports, cinema, mall hangouts', recommended: 'Escape room venues, VR experiences, Seef cinemas' },
];

const tipsForFamilies = [
  { tip: 'Beat the Heat', detail: 'Plan outdoor activities for mornings or late afternoons. Summer midday (June-August) can hit 45°C. Indoor activities are essential.' },
  { tip: 'Friday Brunches', detail: 'Many hotels offer family brunches with kids entertainment included. Great value for a family day out with food and activities.' },
  { tip: 'Mall Entertainment', detail: 'Every major mall has a play area. City Centre (Magic Planet, Wahooo!) and Seef Mall (Billy Beez) are the best for kids.' },
  { tip: 'Book in Advance', detail: 'Waterparks and attractions get busy on weekends. Book online for discounts and to skip queues.' },
  { tip: 'Pack Snacks', detail: 'Food at attractions can be pricey. Pack snacks and water bottles, especially for outdoor adventures.' },
  { tip: 'Check Events', detail: 'Visit EventsBahrain.com for family festivals, kids shows, and seasonal events happening during your visit.' },
];

const faqs = [
  { q: 'What are the best kids activities in Bahrain?', a: 'Top kids activities in Bahrain include Lost Paradise of Dilmun waterpark, Wahooo! indoor waterpark, Magic Planet entertainment center, Bahrain Science Centre, trampolining at Trampo Extreme, and Al Areen Wildlife Park safari.' },
  { q: 'Where can I take toddlers in Bahrain?', a: 'Great toddler-friendly spots include Billy Beez indoor playground, soft play areas at Magic Planet, Bahrain Aquarium touch pools, splash pads at beach clubs, and Little Gym for structured activities.' },
  { q: 'Are there waterparks in Bahrain?', a: 'Yes, Bahrain has excellent waterparks. Lost Paradise of Dilmun in Sakhir is the largest outdoor waterpark, while Wahooo! in City Centre Bahrain offers indoor water fun year-round.' },
  { q: 'What can teenagers do in Bahrain?', a: 'Teens can enjoy escape rooms, indoor skydiving at Gravity, go-karting at Bahrain International Circuit, trampoline parks, VR gaming, cinema, and exploring malls like City Centre and The Avenues.' },
  { q: 'What are the best family-friendly beaches in Bahrain?', a: 'Family-friendly beach options include Amwaj Islands beaches, Marassi Beach with kids facilities, and hotel beach clubs at Ritz-Carlton, Sofitel, and Four Seasons which offer day passes with kids activities.' },
];

export default function KidsActivitiesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Kids Activities', url: 'https://www.bahrainnights.com/guides/kids-activities-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">👨‍👩‍👧‍👦 Family Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Kids Activities in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Waterparks, play areas, educational adventures, and outdoor fun — your complete guide to keeping kids entertained in Bahrain. Family memories start here!
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">3</p>
              <p className="text-xs text-gray-400">Water Attractions</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Gamepad2 className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-400">10+</p>
              <p className="text-xs text-gray-400">Indoor Play Areas</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <TreePine className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">8+</p>
              <p className="text-xs text-gray-400">Outdoor Adventures</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Baby className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">All</p>
              <p className="text-xs text-gray-400">Age Groups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain is a fantastic family destination with activities for children of all ages. From world-class waterparks and massive indoor playgrounds to interactive science centers and wildlife encounters, the Kingdom offers endless entertainment options. Whether you&apos;re battling the summer heat with indoor fun or enjoying the cooler months outdoors, there&apos;s always something to keep the little ones happy.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The family-friendly culture means kids are welcome almost everywhere, and many restaurants, malls, and hotels go out of their way to cater to families. This guide covers the best activities organized by type and age group to help you plan perfect family days out.
          </p>
        </div>
      </section>

      {/* Water Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Waves className="w-8 h-8 text-blue-400" /> Waterparks & Aquariums
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Beat the heat with splashing good fun — Bahrain&apos;s top water attractions.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {waterAttractions.map((attraction) => (
              <div key={attraction.name} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-1">{attraction.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{attraction.location}</p>
                <p className="text-gray-300 mb-4">{attraction.description}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400"><Users className="w-4 h-4 inline mr-1" />Ages: {attraction.ageRange}</p>
                  <p className="text-gray-400"><Clock className="w-4 h-4 inline mr-1" />{attraction.hours}</p>
                  <p className="text-emerald-400 font-medium">{attraction.price}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-400">
            Book waterpark tickets on <a href="https://bahrain.platinumlist.net?affiliate=yjg3yzi" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Platinumlist</a> for discounts.
          </p>
        </div>
      </section>

      {/* Indoor Play */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Gamepad2 className="w-8 h-8 text-pink-400" /> Indoor Play & Entertainment
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Air-conditioned fun perfect for hot days — arcades, trampolines, and play zones.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indoorPlay.map((place) => (
              <div key={place.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-1">{place.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{place.location}</p>
                <p className="text-sm text-gray-300 mb-3">{place.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Ages: {place.ageRange}</span>
                  <span className="text-purple-400">{place.highlights}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Spots */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎓 Educational Attractions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {educational.map((spot) => (
              <div key={spot.name} className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-1">{spot.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{spot.location}</p>
                <p className="text-gray-300 mb-4">{spot.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-pink-400"><Star className="w-4 h-4 inline mr-1" />{spot.highlights}</span>
                  <span className="text-gray-400">Ages: {spot.ageRange}</span>
                  <span className="text-emerald-400">{spot.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor Fun */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <TreePine className="w-8 h-8 text-green-400" /> Outdoor Adventures
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {outdoorFun.map((activity) => (
              <div key={activity.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{activity.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{activity.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400">{activity.activity}</span>
                  <span className="text-gray-400"><Clock className="w-3 h-3 inline mr-1" />{activity.bestTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Age Group */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">👶 Activities by Age Group</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ageActivities.map((group) => (
              <div key={group.age} className="bg-gradient-to-br from-pink-500/10 to-purple-500/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-2">{group.age}</h3>
                <p className="text-gray-300 mb-3">{group.activities}</p>
                <p className="text-sm"><span className="text-purple-400">Top Picks:</span> {group.recommended}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Families */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💡 Tips for Families</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tipsForFamilies.map((item) => (
              <div key={item.tip} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{item.tip}</h3>
                <p className="text-sm text-gray-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Family Day</h2>
          <p className="text-gray-300 mb-6">Explore more family-friendly guides</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/pool-day-passes-bahrain" className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors">Pool Day Passes</Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Family Restaurants</Link>
          </div>
          <p className="text-sm text-gray-400 mt-8">
            Find family events on <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">EventsBahrain.com</a>
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Pool Day Passes', href: '/guides/pool-day-passes-bahrain', emoji: '🏊' },
              { title: 'Outdoor Activities', href: '/guides/outdoor-activities-bahrain', emoji: '🏜️' },
              { title: 'Shopping', href: '/guides/shopping-bahrain', emoji: '🛍️' },
              { title: 'Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for family events? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">EventsBahrain.com</a> for kids shows, festivals, and seasonal activities. 
            Need family event coverage? <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">CinematicWebWorks.com</a> captures precious memories.
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
        headline: 'Kids Activities in Bahrain 2026 — Family Fun Guide',
        description: 'Complete guide to kids activities and family entertainment in Bahrain including waterparks, play areas, educational attractions, and outdoor adventures.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
        mainEntityOfPage: 'https://www.bahrainnights.com/guides/kids-activities-bahrain'
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
