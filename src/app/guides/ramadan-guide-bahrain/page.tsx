import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star,
  Calendar, Heart, Users, Utensils,
  Coffee, Music, Sparkles, Building
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Ramadan in Bahrain 2026 — Iftars, Ghabgas & Events | Complete Guide',
  description: 'Your ultimate guide to Ramadan in Bahrain 2026. Discover the best iftar buffets, ghabga celebrations, suhoor spots, Ramadan tents, and special events during the holy month.',
  keywords: 'Ramadan Bahrain 2026, iftar Bahrain, ghabga Bahrain, Ramadan tents Bahrain, suhoor Bahrain, Ramadan events, best iftar buffet Bahrain, Ramadan guide',
  openGraph: {
    title: 'Ramadan in Bahrain 2026 — Iftars, Ghabgas & Events',
    description: 'Discover the best iftar buffets, ghabga celebrations, and Ramadan events in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan-guide-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/ramadan-bahrain-og.jpg', width: 1200, height: 630, alt: 'Ramadan in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramadan in Bahrain 2026 — Iftars, Ghabgas & Events',
    description: 'Your complete guide to experiencing Ramadan in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan-guide-bahrain',
  },
};

const iftarVenues = [
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    type: 'Luxury Iftar',
    price: 'BD 45-65',
    description: 'The Four Seasons offers one of Bahrain\'s most prestigious iftar experiences. Their sprawling buffet features live cooking stations, premium Arabic delicacies, international cuisine, and stunning views over Bahrain Bay. The elegant setting includes traditional oud music and impeccable service.',
    highlights: ['Panoramic bay views', 'Live cooking stations', 'Oud entertainment', 'Premium dessert selection'],
    link: '/venues/four-seasons-bahrain',
  },
  {
    name: 'Ritz-Carlton Ramadan Tent',
    location: 'Seef',
    type: 'Traditional Tent',
    price: 'BD 38-55',
    description: 'Experience authentic Ramadan ambiance in the Ritz-Carlton\'s beautifully decorated tent. The elaborate spread features traditional Arabic dishes from across the Gulf region, live entertainment, and shisha service after iftar. Perfect for large family gatherings.',
    highlights: ['Authentic tent atmosphere', 'Live Arabic entertainment', 'Shisha lounge', 'Family-friendly'],
    link: '/venues/ritz-carlton-bahrain',
  },
  {
    name: 'Gulf Hotel Iftar',
    location: 'Adliya',
    type: 'Hotel Buffet',
    price: 'BD 28-40',
    description: 'Gulf Hotel has been a trusted iftar destination for decades. Their Zahle restaurant expertise ensures exceptional Lebanese and Arabic cuisine. The central Adliya location makes it accessible from all parts of Bahrain.',
    highlights: ['Zahle restaurant quality', 'Excellent value', 'Central location', 'Extensive mezze selection'],
    link: '/venues/gulf-hotel',
  },
  {
    name: 'Reef Resort Iftar',
    location: 'Bahrain Bay',
    type: 'Waterfront Dining',
    price: 'BD 25-35',
    description: 'Break your fast with a view at Reef Resort. Their waterfront setting provides a refreshing breeze as you enjoy a carefully curated iftar spread featuring fresh seafood, Arabic favorites, and family-style dining.',
    highlights: ['Waterfront setting', 'Fresh seafood options', 'Family atmosphere', 'Outdoor seating'],
    link: '/areas/bahrain-bay',
  },
  {
    name: 'Diplomat Radisson Blu',
    location: 'Diplomatic Area',
    type: 'Corporate Iftar',
    price: 'BD 22-32',
    description: 'A favorite among business professionals, Diplomat Radisson offers excellent iftar packages with private dining options. Great for corporate gatherings and business entertaining during Ramadan.',
    highlights: ['Private dining available', 'Corporate packages', 'Central business location', 'Reliable quality'],
    link: '/areas/diplomatic-area',
  },
];

const ghabgaVenues = [
  {
    name: 'Traditional Ghabga Tents',
    description: 'After Taraweeh prayers (around 9-10 PM), families gather for ghabga — the late-night Ramadan feast unique to the Gulf. Look for traditional tent setups offering machboos, harees, thareed, and luqaimat.',
    venues: ['Al Waha Tent', 'Various hotel tents', 'Community centers'],
    price: 'BD 12-25 per person',
  },
  {
    name: 'Hotel Ghabga Events',
    description: 'Major hotels host elaborate ghabga evenings with live entertainment, traditional music, and extensive buffets. These are perfect for larger celebrations and corporate events.',
    venues: ['Ritz-Carlton', 'Four Seasons', 'ART Rotana'],
    price: 'BD 25-45 per person',
  },
  {
    name: 'Casual Ghabga Spots',
    description: 'Local restaurants and cafes come alive after 10 PM with casual ghabga offerings. Perfect for friends catching up over Arabic coffee, sambousas, and sweets.',
    venues: ['Block 338 cafes', 'Juffair restaurants', 'Seef area'],
    price: 'BD 8-15 per person',
  },
];

const suhoorSpots = [
  { name: 'Cafe Lilou', location: 'Adliya', hours: 'Until 3 AM', specialty: 'French pastries, Arabic breakfast fusion' },
  { name: 'Coco\'s', location: 'Amwaj Islands', hours: 'Until 4 AM', specialty: 'Shisha, mezze, sea breeze' },
  { name: 'Karachi Kitchen', location: 'Juffair', hours: 'Until Fajr', specialty: 'Pakistani/Indian suhoor favorites' },
  { name: 'Al Abraaj', location: 'Muharraq', hours: 'Until Fajr', specialty: 'Traditional Bahraini breakfast' },
  { name: 'Hotel suhoor buffets', location: 'Various', hours: 'Until 4 AM', specialty: 'Elaborate late-night spreads' },
];

const ramadanEvents = [
  {
    name: 'Ramadan Nights at Bahrain Bay',
    type: 'Family Entertainment',
    description: 'Bahrain Bay transforms into a family-friendly Ramadan destination with food stalls, entertainment, and activities. Free entry makes this a popular evening outing.',
    timing: 'Nightly after iftar',
  },
  {
    name: 'Gergaoun Celebrations',
    type: 'Cultural Tradition',
    description: 'Mid-Ramadan (around day 14-15), children dress in traditional clothes and go door-to-door singing for sweets. Shopping malls and hotels host organized gergaoun events.',
    timing: 'Mid-Ramadan evenings',
  },
  {
    name: 'Charity Iftars',
    type: 'Community',
    description: 'Many mosques, community centers, and organizations host free iftar for workers and those in need. Volunteering opportunities are available throughout the month.',
    timing: 'Daily at sunset',
  },
  {
    name: 'Quran Recitation Events',
    type: 'Religious',
    description: 'Special Quran recitation events and competitions take place at Al Fateh Grand Mosque and other venues. Open to visitors who wish to observe respectfully.',
    timing: 'Various throughout Ramadan',
  },
];

const traditions = [
  { name: 'Sawm (Fasting)', description: 'Muslims fast from dawn to sunset — abstaining from food, drink, and smoking during daylight hours. The fast teaches patience and gratitude.' },
  { name: 'Iftar', description: 'The sunset meal breaking the fast, traditionally started with dates and water following the Prophet\'s example, then followed by a full meal.' },
  { name: 'Maghrib Prayer', description: 'Sunset prayer performed immediately after breaking fast with dates. Many eat a light iftar, pray, then enjoy the main meal.' },
  { name: 'Suhoor', description: 'The pre-dawn meal consumed before fasting begins. Essential for energy throughout the day. Many restaurants serve until 3-4 AM.' },
  { name: 'Taraweeh', description: 'Special evening prayers unique to Ramadan, held at mosques after Isha prayer. Often last 1-2 hours with beautiful Quran recitation.' },
  { name: 'Ghabga', description: 'Gulf tradition of late-night gathering after Taraweeh prayers. Families and friends share another meal, conversation, and entertainment.' },
  { name: 'Laylat al-Qadr', description: 'The Night of Power in the last 10 days of Ramadan. Considered holier than a thousand months, many Muslims spend it in prayer.' },
  { name: 'Zakat', description: 'Obligatory charity given during Ramadan. Many Bahrainis increase charitable giving throughout the holy month.' },
];

const visitorTips = [
  {
    title: 'Eating & Drinking in Public',
    content: 'Eating, drinking, and smoking in public during daylight is prohibited and can result in fines. Hotels serve discreetly in designated areas for non-fasting guests.',
    icon: Utensils,
  },
  {
    title: 'Dress Code',
    content: 'Dress more conservatively than usual during Ramadan. Cover shoulders and knees. Avoid tight or revealing clothing, especially when visiting malls and public areas.',
    icon: Users,
  },
  {
    title: 'Working Hours',
    content: 'Offices typically work 9 AM - 2 PM. Government hours are reduced. Shops open late (after iftar around 6-7 PM) and stay open until midnight or later.',
    icon: Clock,
  },
  {
    title: 'Traffic Patterns',
    content: 'Roads are quiet during the day but extremely busy around iftar time (30 mins before sunset). Plan accordingly — avoid driving at sunset.',
    icon: MapPin,
  },
  {
    title: 'Music & Entertainment',
    content: 'Loud music in public is inappropriate. Nightclubs and bars close for the month. Hotels may have quiet lounges. Entertainment resumes after Eid.',
    icon: Music,
  },
  {
    title: 'Experience Iftar',
    content: 'Don\'t miss the chance to attend an iftar — it\'s one of the most beautiful cultural experiences. Hotels and tents welcome non-Muslim guests.',
    icon: Heart,
  },
];

const platinumlistEvents = [
  { name: 'Ramadan Tent Experience', url: 'https://platinumlist.net/event-tickets/ramadan-bahrain' },
  { name: 'Ghabga Night Events', url: 'https://platinumlist.net/event-tickets/ghabga-bahrain' },
  { name: 'Eid Celebrations', url: 'https://platinumlist.net/event-tickets/eid-bahrain' },
];

export default function RamadanGuideBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  const faqs = [
    { q: 'When is Ramadan 2026 in Bahrain?', a: 'Ramadan 2026 is expected to begin around February 28 or March 1, 2026, depending on the moon sighting. The exact date is confirmed by religious authorities a day before. Ramadan lasts 29-30 days, ending with Eid Al-Fitr celebrations.' },
    { q: 'Can tourists eat during Ramadan in Bahrain?', a: 'Yes, but not in public. Hotels serve meals discreetly in designated areas for non-fasting guests. Eating, drinking, and smoking in public during daylight hours is prohibited and can result in fines. Room service is always available.' },
    { q: 'What is the difference between iftar and ghabga?', a: 'Iftar is the meal that breaks the fast at sunset and is observed across the Muslim world. Ghabga is a Gulf-specific tradition — a second gathering held after Taraweeh prayers (around 9-10 PM) where families and friends share food, conversation, and entertainment late into the night.' },
    { q: 'Are restaurants open during Ramadan in Bahrain?', a: 'Most restaurants are closed during daylight hours but open after iftar (sunset). Many operate until 2-4 AM for suhoor service. Hotel restaurants may serve non-fasting guests discreetly during the day.' },
    { q: 'What should I wear during Ramadan in Bahrain?', a: 'Dress more conservatively than usual. Both men and women should cover shoulders and knees. Avoid tight, revealing, or flashy clothing. This is especially important in malls, souks, and public areas. Modest clothing shows respect for those fasting.' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Ramadan Guide Bahrain', url: 'https://www.bahrainnights.com/guides/ramadan-guide-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">🌙 Holy Month Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Ramadan in Bahrain 2026</span>
              <span className="block text-2xl md:text-3xl mt-2 text-white">Iftars, Ghabgas & Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your complete guide to experiencing the holy month in Bahrain — from lavish hotel iftars and traditional ghabga gatherings to cultural events, visitor tips, and the best suhoor spots that keep the night alive.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated} • Dates vary based on moon sighting</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Duration', value: '29-30 days', icon: Calendar },
              { label: 'Iftar', value: 'At Sunset', icon: Moon },
              { label: 'Iftar Venues', value: '50+', icon: Utensils },
              { label: 'Ghabga Time', value: '10 PM+', icon: Coffee },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <p className="text-lg text-gray-300 leading-relaxed">
            Ramadan in Bahrain is a uniquely beautiful experience that transforms the kingdom for an entire month. The holy month brings families together, slows the pace of daily life, and creates a warm, communal atmosphere that visitors often find deeply moving. Whether you're a resident experiencing your first Ramadan in the Gulf or a visitor curious about local traditions, this comprehensive guide covers everything you need to know.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            From the moment the cannon fires at sunset (a tradition still observed in Bahrain) signaling iftar, to the late-night ghabga gatherings that can stretch until suhoor, Ramadan nights in Bahrain are special. The kingdom's hotels and restaurants pull out all stops with elaborate iftar buffets, traditional tent experiences, and entertainment that respects the holy month's spirit while celebrating its joyful aspects.
          </p>
        </div>
      </section>

      {/* Ramadan Traditions */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Understanding Ramadan Traditions</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">The holy month follows a beautiful rhythm of fasting, prayer, and community. Here are the key traditions you'll experience in Bahrain.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {traditions.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <h3 className="font-semibold text-purple-400 mb-2">{t.name}</h3>
                <p className="text-sm text-gray-400">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Iftar Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Iftar Venues in Bahrain 2026</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From luxury hotel buffets to traditional tent experiences, these are Bahrain's top destinations for breaking your fast.</p>
          
          <div className="space-y-6">
            {iftarVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Link href={venue.link} className="hover:text-purple-400 transition-colors">
                      <h3 className="text-xl font-bold">{venue.name}</h3>
                    </Link>
                    <p className="text-purple-400 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />{venue.location} • {venue.type}
                    </p>
                    <p className="text-gray-300 mb-4">{venue.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {venue.highlights.map((h) => (<span key={h} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                  </div>
                  <div className="lg:w-1/4 lg:text-right">
                    <span className="text-xl font-bold text-white">{venue.price}</span>
                    <p className="text-sm text-gray-400">per person</p>
                    <a 
                      href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/ramadan-iftar-bahrain')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 bg-purple-500 hover:bg-purple-400 text-black text-sm font-bold rounded-lg transition-colors"
                    >
                      Book on Platinumlist
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            Looking for more dining options? Check our <Link href="/guides/arabic-restaurants" className="text-purple-400 hover:underline">Arabic Restaurants Guide</Link> and <Link href="/guides/buffets" className="text-purple-400 hover:underline">Best Buffets in Bahrain</Link>.
          </p>
        </div>
      </section>

      {/* Ghabga Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Ghabga — The Gulf's Late-Night Tradition</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Unique to the Gulf region, ghabga is the beloved post-Taraweeh gathering. After evening prayers, families and friends reconvene for another feast, conversations, and entertainment that can last until suhoor.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {ghabgaVenues.map((g) => (
              <div key={g.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-3">{g.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{g.description}</p>
                <div className="mb-3">
                  <span className="text-sm text-gray-400">Popular venues: </span>
                  <span className="text-sm text-gray-300">{g.venues.join(', ')}</span>
                </div>
                <p className="text-lg font-bold">{g.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suhoor Spots */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Suhoor Spots in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">As the night winds down, these venues stay open to serve the essential pre-dawn meal. From traditional Bahraini breakfast to international options, fuel up for the next day's fast.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suhoorSpots.map((spot) => (
              <div key={spot.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors">
                <h3 className="font-bold text-purple-400">{spot.name}</h3>
                <p className="text-sm text-gray-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{spot.location}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />{spot.hours}
                </p>
                <p className="text-sm text-gray-300 mt-2">{spot.specialty}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            For more late-night options, explore <Link href="/guides/cafes" className="text-purple-400 hover:underline">Bahrain's Best Cafes</Link> and <Link href="/guides/shisha" className="text-purple-400 hover:underline">Shisha Spots</Link>.
          </p>
        </div>
      </section>

      {/* Ramadan Events */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Ramadan Events & Activities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ramadanEvents.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6">
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full mb-3">{event.type}</span>
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-300 mb-3">{event.description}</p>
                <p className="text-sm text-gray-400"><Clock className="w-4 h-4 inline mr-1" />{event.timing}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Find more Ramadan events on our partner sites:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://eventsbahrain.com/ramadan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
              >
                EventsBahrain.com
              </a>
              <a 
                href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/ramadan')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
              >
                Platinumlist Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Essential Tips for Visitors</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Whether you're visiting Bahrain during Ramadan or experiencing your first holy month as a resident, these tips will help you navigate respectfully and enjoy the experience.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitorTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <tip.icon className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Ramadan Experience</h2>
          <p className="text-gray-300 mb-8">Book iftar experiences, find events, and make the most of the holy month in Bahrain.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/ramadan-bahrain-2026')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors"
            >
              Book Ramadan Events
            </a>
            <Link href="/guides/eid-celebrations-bahrain" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">
              Eid Celebrations Guide
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Need video content for your Ramadan event? <a href="https://cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">CinematicWebWorks.com</a> offers professional event coverage.
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Eid Celebrations', href: '/guides/eid-celebrations-bahrain', emoji: '🎉' },
              { title: 'Arabic Restaurants', href: '/guides/arabic-restaurants', emoji: '🥙' },
              { title: 'Buffets', href: '/guides/buffets', emoji: '🍽️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-black/30">
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
        headline: 'Ramadan in Bahrain 2026 — Iftars, Ghabgas & Events',
        description: 'Your ultimate guide to Ramadan in Bahrain 2026. Discover the best iftar buffets, ghabga celebrations, suhoor spots, and special events during the holy month.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', logo: { '@type': 'ImageObject', url: 'https://www.bahrainnights.com/logo.png' } },
        datePublished: '2026-01-01',
        dateModified: lastUpdated,
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.bahrainnights.com/guides/ramadan-guide-bahrain' },
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
