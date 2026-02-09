import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Flag, Calendar, MapPin, Star,
  Sparkles, Music, Users, Camera,
  PartyPopper, Heart, Building, Car, Clock
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain National Day — Events, Fireworks & Celebrations | December 16-17 Guide',
  description: 'Complete guide to Bahrain National Day celebrations on December 16-17. Discover the best fireworks viewing spots, events, parades, concerts, and activities across the kingdom.',
  keywords: 'Bahrain National Day, December 16 Bahrain, Bahrain independence day, national day fireworks Bahrain, Bahrain celebrations, national day events, Bahrain holiday December',
  openGraph: {
    title: 'Bahrain National Day — Events, Fireworks & Celebrations',
    description: 'Your guide to celebrating December 16-17 in Bahrain with fireworks, events, and festivities.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/national-day-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/national-day-bahrain-og.jpg', width: 1200, height: 630, alt: 'Bahrain National Day Celebrations' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahrain National Day — Events, Fireworks & Celebrations',
    description: 'Complete guide to December 16-17 celebrations in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/national-day-bahrain',
  },
};

const nationalDayHistory = [
  {
    date: 'December 16',
    name: 'Independence Day',
    year: '1971',
    description: 'Commemorates the day Bahrain declared independence from British protectorate status, becoming a fully sovereign nation. This marked the end of special treaty relations with Britain that had existed since 1820.',
    significance: 'Birth of modern Bahrain as an independent state',
  },
  {
    date: 'December 17',
    name: 'Accession Day',
    year: '1961',
    description: 'Marks the anniversary of the late Amir Sheikh Isa bin Salman Al Khalifa\'s accession to the throne. He ruled Bahrain from 1961 to 1999 and oversaw the country\'s independence and modernization.',
    significance: 'Honors the beloved late Amir\'s legacy',
  },
];

const fireworksLocations = [
  {
    name: 'Bahrain Bay',
    type: 'Main Display',
    description: 'The kingdom\'s primary National Day fireworks display launches from Bahrain Bay, creating a spectacular show reflected in the waterfront. This is where the biggest crowds gather, with food stalls, entertainment, and family activities throughout the evening.',
    viewingTips: 'Arrive by 6 PM for parking. Best views from the walkway or Water Garden City towers.',
    timing: 'Usually 9:00 PM, sometimes multiple shows',
    crowds: 'Very heavy — expect packed crowds',
  },
  {
    name: 'Arad Fort Area',
    type: 'Secondary Display',
    description: 'Muharraq hosts its own celebration near Arad Fort with traditional activities, fireworks, and a heritage-focused atmosphere. Less crowded than Bahrain Bay with better parking.',
    viewingTips: 'Good for families wanting a less chaotic experience with cultural elements.',
    timing: 'Usually 9:00 PM',
    crowds: 'Moderate — more manageable',
  },
  {
    name: 'Hotel Rooftops',
    type: 'Premium Views',
    description: 'Hotels around Bahrain Bay, Seef, and Juffair offer rooftop parties and special National Day dinners with prime firework views. Book well in advance as these sell out quickly.',
    viewingTips: 'Four Seasons, Ritz-Carlton, and ART Rotana have excellent vantage points.',
    timing: 'Varies by event',
    crowds: 'Controlled — ticketed events',
  },
  {
    name: 'Beach Clubs',
    type: 'Relaxed Viewing',
    description: 'Beach clubs along the coast offer National Day parties with dinner, drinks, and distant but scenic firework views. A more relaxed alternative to the crowded public areas.',
    viewingTips: 'Coral Bay, Beach Rotana pool area, and Ritz beach offer good views.',
    timing: 'Evening events with fireworks viewing',
    crowds: 'Light to moderate',
  },
];

const majorEvents = [
  {
    name: 'Bahrain Bay National Day Festival',
    location: 'Bahrain Bay',
    type: 'Major Public Event',
    description: 'The centerpiece of National Day celebrations features live concerts with major Arab artists, food festivals with local and international cuisine, carnival rides, traditional performances, and the main fireworks display. Free entry attracts huge crowds.',
    highlights: ['Major concerts', 'Fireworks display', 'Food festival', 'Kids zone', 'Traditional shows'],
    timing: '4 PM onwards, fireworks at 9 PM',
    price: 'Free entry',
  },
  {
    name: 'National Day Parade',
    location: 'Riffa / Awal Avenue',
    type: 'Military & Cultural',
    description: 'The official National Day parade features military displays, marching bands, traditional dances, classic car processions, and floats. A patriotic spectacle that showcases Bahraini pride and heritage.',
    highlights: ['Military parade', 'Air force flyovers', 'Traditional dances', 'Classic cars'],
    timing: 'Morning of December 16',
    price: 'Free (public areas)',
  },
  {
    name: 'Muharraq Heritage Celebrations',
    location: 'Muharraq',
    type: 'Cultural',
    description: 'Bahrain\'s traditional capital hosts heritage-focused celebrations featuring pearl diving demonstrations, traditional music, local crafts, historical tours, and authentic Bahraini food in atmospheric souq settings.',
    highlights: ['Heritage performances', 'Traditional food', 'Souq atmosphere', 'Cultural tours'],
    timing: 'Throughout both days',
    price: 'Free entry',
  },
  {
    name: 'Mall National Day Events',
    location: 'City Centre, Seef Mall, Avenues',
    type: 'Family Entertainment',
    description: 'Major shopping malls host National Day celebrations with traditional performances, competitions, face painting, meet-and-greets with mascots, and special sales. Air-conditioned alternative to outdoor events.',
    highlights: ['Performances', 'Kids activities', 'National Day sales', 'Air-conditioned'],
    timing: 'Extended hours both days',
    price: 'Free entry',
  },
  {
    name: 'Hotel Rooftop Parties',
    location: 'Various Hotels',
    type: 'Premium Events',
    description: 'Luxury hotels host special National Day dinners, brunches, and rooftop parties with prime firework views. Package deals often include food, drinks, and entertainment.',
    highlights: ['Premium views', 'Food & drinks', 'Less crowded', 'Entertainment'],
    timing: 'Evening events',
    price: 'BD 50-150 per person',
  },
];

const thingsToDo = [
  { activity: 'Watch the Fireworks', location: 'Bahrain Bay, hotel rooftops, beaches', description: 'The highlight of National Day — spectacular pyrotechnic displays over the water', icon: Sparkles },
  { activity: 'Attend the Parade', location: 'Riffa / main avenues', description: 'Military displays, traditional dances, and patriotic processions', icon: Flag },
  { activity: 'Join Car Parades', location: 'Main roads across Bahrain', description: 'Decorated cars, flag-waving, and horn-honking celebrations through the streets', icon: Car },
  { activity: 'Explore Heritage Sites', location: 'Muharraq, Bahrain Fort', description: 'Special programs and tours at historical sites during the holiday', icon: Building },
  { activity: 'Attend Concerts', location: 'Bahrain Bay, various venues', description: 'Major Arab artists perform free concerts during the celebrations', icon: Music },
  { activity: 'Family Beach Day', location: 'Beach clubs, Al Dar Islands', description: 'Extended hours and special events at beach venues', icon: Users },
];

const practicalTips = [
  { title: 'Traffic Warning', content: 'Roads are extremely congested, especially on the evening of December 16. Main areas around Bahrain Bay can be gridlocked. Use taxis, Careem, or arrive very early. Consider staying in the area overnight.', icon: Car },
  { title: 'Dress in Red & White', content: 'Join the celebration by wearing Bahrain\'s national colors. Red and white clothing, accessories, and face paint are widely available before the holiday and show solidarity with the celebrations.', icon: Heart },
  { title: 'Book Restaurants Early', content: 'Popular restaurants and hotel events book up 1-2 weeks in advance. For firework-view venues, book even earlier. Walk-ins may face long waits or be turned away.', icon: Calendar },
  { title: 'Arrive Early for Fireworks', content: 'If heading to Bahrain Bay, arrive by 5-6 PM to secure parking and good viewing spots. Main pathways get packed, and latecomers may miss the display entirely.', icon: Clock },
  { title: 'Respect the Holiday', content: 'National Day is taken seriously. Be respectful during the national anthem, flag ceremonies, and patriotic moments. Avoid inappropriate clothing or behavior.', icon: Flag },
  { title: 'Photography', content: 'Great opportunities for photos, but avoid photographing military/police personnel and government buildings. The fireworks make for stunning shots from the right locations.', icon: Camera },
];

const carParadeInfo = {
  description: 'One of the most distinctive National Day traditions is the spontaneous car parade that takes over Bahrain\'s streets. Vehicles decked out in flags, streamers, and LED lights cruise slowly through main roads while occupants wave flags and honk horns. It\'s chaotic, noisy, and wonderfully festive.',
  hotspots: ['Seef area', 'Manama Corniche', 'Budaiya Highway', 'Riffa main streets'],
  tips: 'If driving, expect delays. If celebrating, make sure decorations don\'t obstruct view or lights.',
};

export default function NationalDayBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  const faqs = [
    { q: 'When is Bahrain National Day?', a: 'Bahrain National Day is celebrated on December 16-17 every year. December 16 marks Independence Day (1971) and December 17 commemorates the accession of the late Amir Sheikh Isa bin Salman Al Khalifa (1961). Both are official public holidays.' },
    { q: 'Where are the best fireworks in Bahrain for National Day?', a: 'The main fireworks display is at Bahrain Bay, offering spectacular views over the water. Hotel rooftops (Four Seasons, Ritz-Carlton) provide premium viewing. Arad Fort has a secondary display with smaller crowds. Beach clubs offer relaxed viewing of distant displays.' },
    { q: 'Is Bahrain National Day a public holiday?', a: 'Yes, both December 16 and 17 are official public holidays in Bahrain. Government offices, schools, and most businesses close. Tourist attractions, malls, and restaurants remain open with extended hours for celebrations.' },
    { q: 'What should I wear for National Day celebrations in Bahrain?', a: 'Wearing red and white (Bahrain\'s national colors) is traditional and shows solidarity. You\'ll see locals in patriotic clothing, face paint, and accessories. Comfortable shoes are essential as you\'ll likely be walking and standing for extended periods.' },
    { q: 'How do I avoid traffic during Bahrain National Day?', a: 'Traffic is extremely heavy, especially on December 16 evening near Bahrain Bay. Arrive at venues by 5 PM, use taxis/Careem, or stay at a nearby hotel. Some residents avoid driving entirely and use public areas accessible on foot. Plan your exit route in advance.' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'National Day Bahrain', url: 'https://www.bahrainnights.com/guides/national-day-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-white/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🇧🇭 National Celebration</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">Bahrain National Day</span>
              <span className="block text-2xl md:text-3xl mt-2 text-white">Events, Fireworks & Celebrations</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience Bahrain's biggest annual celebration on December 16-17. From spectacular fireworks over Bahrain Bay to parades, concerts, car processions, and kingdom-wide festivities, this is patriotism and joy on full display.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated} • December 16-17 annually</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Dates', value: 'Dec 16-17', icon: Calendar },
              { label: 'Since', value: '1971', icon: Flag },
              { label: 'Firework Sites', value: '5+', icon: Sparkles },
              { label: 'National Color', value: 'Red', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-400" />
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
            Bahrain National Day is more than just a public holiday — it's the kingdom's biggest celebration of identity and pride. For two days in December, the entire country transforms into a sea of red and white. Buildings are draped in flags, cars become mobile decorations, streets fill with celebrators, and the night sky lights up with some of the Gulf's most spectacular fireworks.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            Whether you're a resident who's never experienced the festivities or a visitor timing your trip to coincide with the celebrations, National Day offers a unique window into Bahraini culture and national spirit. From the official parades and concerts to the spontaneous street celebrations and family gatherings, it's an experience that stays with you.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">The Significance of December 16-17</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {nationalDayHistory.map((day) => (
              <div key={day.date} className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-black text-red-400">{day.date.split(' ')[1]}</span>
                  <div>
                    <h3 className="text-xl font-bold">{day.name}</h3>
                    <p className="text-sm text-gray-400">Since {day.year}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{day.description}</p>
                <p className="text-sm text-red-300 font-medium">{day.significance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fireworks Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Fireworks Viewing Spots</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">National Day fireworks are the highlight of the celebrations. Here's where to watch them.</p>
          
          <div className="space-y-6">
            {fireworksLocations.map((location) => (
              <div key={location.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full mb-3">{location.type}</span>
                    <h3 className="text-xl font-bold">{location.name}</h3>
                    <p className="text-gray-300 my-3">{location.description}</p>
                    <p className="text-sm text-gray-400 mb-2"><strong className="text-red-300">Timing:</strong> {location.timing}</p>
                    <p className="text-sm text-gray-400"><strong className="text-red-300">Crowds:</strong> {location.crowds}</p>
                  </div>
                  <div className="lg:w-1/3 bg-black/20 rounded-xl p-4">
                    <h4 className="font-semibold text-red-400 mb-2">💡 Viewing Tips</h4>
                    <p className="text-sm text-gray-300">{location.viewingTips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Events */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Major National Day Events</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From official ceremonies to public celebrations, here are the main events happening across Bahrain.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {majorEvents.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full mb-3">{event.type}</span>
                <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                <p className="text-red-400 text-sm mb-3 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />{event.location}
                </p>
                <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.highlights.map((h) => (
                    <span key={h} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{event.timing}</span>
                  <span className="font-bold text-white">{event.price}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/bahrain-national-day')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors"
            >
              Find National Day Events on Platinumlist
            </a>
          </div>
        </div>
      </section>

      {/* Things to Do */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Things to Do on National Day</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thingsToDo.map((item) => (
              <div key={item.activity} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <item.icon className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">{item.activity}</h3>
                <p className="text-red-400 text-sm mb-2">{item.location}</p>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Parade Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">The Legendary Car Parades</h2>
          <div className="bg-white/5 rounded-2xl p-6">
            <Car className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-300 text-center mb-6">{carParadeInfo.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Popular Routes</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {carParadeInfo.hotspots.map((spot) => (
                    <li key={spot}>• {spot}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Tips</h4>
                <p className="text-sm text-gray-300">{carParadeInfo.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Practical Tips for National Day</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Make the most of the celebrations with these essential tips.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicalTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <tip.icon className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your National Day Experience</h2>
          <p className="text-gray-300 mb-8">Book events, find venues, and celebrate Bahrain's biggest holiday.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/national-day-bahrain')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse National Day Events
            </a>
            <Link href="/guides/bahrain-grand-prix-guide" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">
              F1 Grand Prix Guide
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Need professional event coverage? <a href="https://cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">CinematicWebWorks.com</a> captures your celebrations.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            More events at <a href="https://eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">EventsBahrain.com</a>
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'F1 Grand Prix', href: '/guides/bahrain-grand-prix-guide', emoji: '🏎️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Historical Sites', href: '/guides/historical-sites', emoji: '🏰' },
              { title: 'New Year\'s Eve', href: '/guides/new-year-bahrain', emoji: '🎆' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-red-400 transition-colors">{g.title}</span>
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
        headline: 'Bahrain National Day — Events, Fireworks & Celebrations',
        description: 'Complete guide to Bahrain National Day celebrations on December 16-17 with fireworks, events, and festivities.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', logo: { '@type': 'ImageObject', url: 'https://www.bahrainnights.com/logo.png' } },
        datePublished: '2026-01-01',
        dateModified: lastUpdated,
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.bahrainnights.com/guides/national-day-bahrain' },
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
