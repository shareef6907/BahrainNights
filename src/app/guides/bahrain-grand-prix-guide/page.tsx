import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Flag, Clock, MapPin, Star,
  Calendar, Tv, Users, Utensils,
  Car, Music, Hotel, Trophy,
  PartyPopper, Beer
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain Grand Prix 2025 — Where to Watch, Eat & Party | F1 Guide',
  description: 'Your ultimate guide to the Bahrain Grand Prix. Discover the best bars and hotels to watch F1, official race parties, dining near BIC circuit, and accommodation tips for race weekend.',
  keywords: 'Bahrain Grand Prix, F1 Bahrain, where to watch F1 Bahrain, Bahrain F1 parties, Bahrain International Circuit, F1 bars Bahrain, Grand Prix hotels Bahrain, Formula 1 Bahrain 2025',
  openGraph: {
    title: 'Bahrain Grand Prix — Where to Watch, Eat & Party',
    description: 'Your complete guide to experiencing the F1 Bahrain Grand Prix — best viewing spots, parties, dining, and accommodation.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/bahrain-grand-prix-guide',
    images: [{ url: 'https://www.bahrainnights.com/images/bahrain-grand-prix-og.jpg', width: 1200, height: 630, alt: 'Bahrain Grand Prix F1' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahrain Grand Prix — Where to Watch, Eat & Party',
    description: 'Your complete F1 guide for race weekend in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/bahrain-grand-prix-guide',
  },
};

const watchingVenues = [
  {
    name: 'JJ\'s Irish Bar',
    location: 'Juffair',
    type: 'Sports Bar',
    vibe: 'Lively atmosphere',
    description: 'The ultimate sports bar experience for F1 fans. JJ\'s transforms into race central during Grand Prix weekend with multiple screens showing every angle of the action. Expect a rowdy crowd of expats and locals, ice-cold drinks, and proper pub grub. Arrive early for the best seats — this place packs out for race day.',
    highlights: ['Multiple large screens', 'Live race atmosphere', 'Great pub food', 'Extended hours'],
    link: '/venues/jjs-irish-bar',
  },
  {
    name: 'Sherlock Holmes',
    location: 'Gulf Hotel, Adliya',
    type: 'British Pub',
    vibe: 'Classic pub feel',
    description: 'A Bahrain institution for watching British sports, Sherlock Holmes at the Gulf Hotel delivers an authentic pub experience for F1 viewing. The dimly lit, wood-paneled interior creates an intimate atmosphere, while the screens ensure you won\'t miss a single overtake. Their fish and chips pairs perfectly with qualifying sessions.',
    highlights: ['Authentic British pub', 'Quality screens', 'Full menu available', 'Central location'],
    link: '/venues/gulf-hotel',
  },
  {
    name: 'Trader Vic\'s',
    location: 'Ritz-Carlton, Seef',
    type: 'Upscale Bar',
    vibe: 'Premium experience',
    description: 'For those who want to watch F1 in style, Trader Vic\'s at the Ritz-Carlton offers a more refined race-day experience. Sip signature Mai Tais while watching the action on their screens. The Polynesian-themed venue adds an exotic twist to your Grand Prix viewing, and the food is leagues above typical sports bar fare.',
    highlights: ['Upscale atmosphere', 'Signature cocktails', 'Premium dining', 'Ritz-Carlton service'],
    link: '/venues/ritz-carlton-bahrain',
  },
  {
    name: 'Meisei',
    location: 'Four Seasons',
    type: 'Hotel Lounge',
    vibe: 'Luxury viewing',
    description: 'The Four Seasons often sets up special F1 viewing events in their lounges and restaurants during race weekend. Expect exceptional service, gourmet snacks, and a sophisticated crowd. Contact the hotel for their specific Grand Prix packages — they often include brunch or dinner with the screening.',
    highlights: ['Five-star service', 'Special F1 packages', 'Gourmet offerings', 'Bay views'],
    link: '/venues/four-seasons-bahrain',
  },
  {
    name: 'Reef Resort',
    location: 'Bahrain Bay',
    type: 'Beach Club',
    vibe: 'Casual beachside',
    description: 'Watch the Grand Prix with your toes in the sand at Reef Resort. Their outdoor screens combined with the beach club atmosphere create a uniquely Bahraini F1 experience. Perfect for families and groups who want to make a full day of it with pool access and water views between sessions.',
    highlights: ['Beachside viewing', 'Pool access', 'Family-friendly', 'Full-day packages'],
    link: '/areas/bahrain-bay',
  },
];

const f1Parties = [
  {
    name: 'Official F1 After-Race Concerts',
    type: 'Major Event',
    location: 'Bahrain International Circuit',
    description: 'The crown jewel of Grand Prix weekend. BIC hosts world-class artists immediately after the race, with past performers including The Weeknd, Post Malone, and Swedish House Mafia. Tickets often sell out months in advance — include concert access in your race ticket package for the best value.',
    price: 'Included with race tickets / BD 50-200 separately',
    link: 'https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/event-tickets/bahrain-grand-prix-concert',
  },
  {
    name: 'Block 338 Race Weekend',
    type: 'Nightlife District',
    location: 'Adliya',
    description: 'Block 338 transforms during F1 weekend. Every bar, restaurant, and club in Bahrain\'s premier nightlife district runs special events. Expect themed parties, extended hours, and crowds from all over the world. Bar hopping through the block is a Grand Prix tradition — start at Calexico for tacos, move to Hazel for cocktails, and end wherever the night takes you.',
    price: 'Free entry (varies by venue)',
    link: '/areas/block-338',
  },
  {
    name: 'Yacht Parties',
    type: 'VIP Experience',
    location: 'Various Marinas',
    description: 'For the ultimate Grand Prix splurge, several operators offer yacht parties during race weekend. Watch the race on deck, enjoy premium catering, and party into the night on the Arabian Gulf. Some packages include transfers to BIC for the race itself.',
    price: 'BD 150-500 per person',
    link: 'https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/event-tickets/bahrain-yacht-party',
  },
  {
    name: 'Hotel Rooftop Events',
    type: 'Premium Parties',
    location: 'Various Hotels',
    description: 'Major hotels like the Four Seasons, Ritz-Carlton, and Downtown Rotana host exclusive rooftop parties during Grand Prix weekend. These events feature international DJs, flowing champagne, and Bahrain\'s most fashionable crowd. Dress to impress — these are see-and-be-seen affairs.',
    price: 'BD 40-100 per person',
    link: '/guides/rooftop-bars',
  },
  {
    name: 'Desert Camps & Experiences',
    type: 'Unique Experience',
    location: 'Near BIC Circuit',
    description: 'Experience F1 with a Bahraini twist at desert camp setups near the circuit. Combine race viewing with traditional hospitality — Arabic coffee, shisha, and BBQ under the stars. Several tour operators offer packages that include race tickets and authentic desert experiences.',
    price: 'BD 75-200 per person',
    link: 'https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/event-tickets/bahrain-desert-experience',
  },
];

const diningNearCircuit = [
  {
    name: 'Sakhir Area Restaurants',
    description: 'The area around BIC has developed significantly, with several restaurants catering to race crowds. Options range from fast food chains to proper sit-down dining.',
    options: ['Al Safir Hotel restaurants', 'Local Bahraini eateries', 'Chain restaurants'],
    tip: 'Book well in advance for race day — everywhere fills up.',
  },
  {
    name: 'Riffa Dining',
    description: 'The nearby town of Riffa offers more dining variety, just a short drive from the circuit. Perfect for a proper pre-race meal.',
    options: ['Riffa Views restaurants', 'Local cafes', 'International cuisine'],
    tip: 'Allow extra time for traffic on race day.',
  },
  {
    name: 'BIC Circuit Food',
    description: 'Inside the circuit, numerous food and beverage outlets operate during the event. Quality and variety have improved significantly in recent years.',
    options: ['Food village', 'Hospitality suites', 'Grandstand vendors'],
    tip: 'Hospitality packages offer premium dining with the best views.',
  },
];

const accommodationTips = [
  {
    category: 'Luxury Hotels',
    recommendation: 'Four Seasons, Ritz-Carlton, or Wyndham Grand',
    priceRange: 'BD 200-500/night during GP',
    notes: 'Book 3-6 months ahead. These properties offer F1 packages with transfers to the circuit. The Four Seasons and Ritz-Carlton are particularly popular with teams and VIPs.',
    link: '/venues/four-seasons-bahrain',
  },
  {
    category: 'Mid-Range Options',
    recommendation: 'Gulf Hotel, Intercontinental, Diplomat Radisson',
    priceRange: 'BD 80-180/night during GP',
    notes: 'Great value with reliable service. Gulf Hotel in Adliya puts you walking distance from Block 338 nightlife. Intercontinental is ideal for Seef shopping.',
    link: '/venues/gulf-hotel',
  },
  {
    category: 'Budget-Friendly',
    recommendation: 'Ibis Seef, Premier Inn, Holiday Inn',
    priceRange: 'BD 40-80/night during GP',
    notes: 'Clean and functional. Book early — budget options fill up fast. Consider Juffair area for more nightlife options nearby.',
    link: '/areas/seef',
  },
  {
    category: 'Apartment Rentals',
    recommendation: 'Airbnb in Juffair, Seef, or Amwaj',
    priceRange: 'BD 50-150/night',
    notes: 'Good for groups. Apartments in Amwaj Islands offer a resort-like experience. Juffair puts you close to bars and restaurants.',
    link: '/areas/juffair',
  },
];

const raceInfo = {
  circuit: 'Bahrain International Circuit (BIC)',
  location: 'Sakhir, approximately 30km south of Manama',
  firstRace: '2004',
  lapRecord: '1:31.447 (Pedro de la Rosa, 2005)',
  laps: '57',
  circuitLength: '5.412 km',
  raceDistance: '308.238 km',
  uniqueFeature: 'Night race under floodlights — the first F1 twilight race',
};

const gettingToCircuit = [
  { method: 'Taxi/Ride-share', details: 'BD 15-25 from Manama. Uber and Careem operate in Bahrain. Allow extra time for race-day traffic.', recommended: true },
  { method: 'Rental Car', details: 'Parking available at BIC (BD 5-10). Traffic can be heavy but manageable if you arrive early.', recommended: true },
  { method: 'Hotel Shuttles', details: 'Many hotels offer shuttle services during GP weekend. Check with your hotel — often the most convenient option.', recommended: true },
  { method: 'Public Transport', details: 'Limited options. Some special bus services operate during the GP, but taxis are more reliable.', recommended: false },
];

export default function BahrainGrandPrixGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  const faqs = [
    { q: 'When is the Bahrain Grand Prix 2025?', a: 'The Bahrain Grand Prix typically takes place in early March, often as the season-opening race. The 2025 race is scheduled for the first weekend of March. Practice sessions run Friday, qualifying on Saturday, and the main race on Sunday evening under the famous Bahrain floodlights.' },
    { q: 'How do I get tickets for the Bahrain Grand Prix?', a: 'Tickets are available through the official Bahrain International Circuit website and authorized resellers like Platinumlist. Options range from General Admission (from BD 35) to premium Grandstand seats (BD 100-300) and luxury hospitality packages (BD 500+). Book early — popular grandstands sell out months in advance.' },
    { q: 'What is the best grandstand at Bahrain Grand Prix?', a: 'The Main Grandstand offers the best views of the start/finish straight, pit lane, and podium celebrations. Turn 1 Grandstand captures dramatic first-corner action. The Batelco Grandstand at Turn 11 provides excellent overtaking opportunities. Each has pros and cons — consider what you most want to see.' },
    { q: 'Can I bring food and drinks into the Bahrain Grand Prix?', a: 'Small snacks and sealed water bottles are generally permitted. Large coolers, alcohol, and glass containers are prohibited. BIC has significantly improved its food and beverage options in recent years, and hospitality packages include full catering. Check the official BIC website for current policies.' },
    { q: 'Where should I stay for the Bahrain Grand Prix?', a: 'Book accommodation 3-6 months ahead as prices spike and availability drops. Manama hotels (Four Seasons, Ritz-Carlton, Gulf Hotel) offer the best nightlife access. Seef area has good mid-range options near malls. Juffair is popular for its bar scene. Some visitors stay in Saudi Arabia and drive across for the race.' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Bahrain Grand Prix Guide', url: 'https://www.bahrainnights.com/guides/bahrain-grand-prix-guide' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🏎️ F1 Race Weekend Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Bahrain Grand Prix</span>
              <span className="block text-2xl md:text-3xl mt-2 text-white">Where to Watch, Eat & Party</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your complete guide to experiencing Formula 1 in Bahrain — from the best bars to watch the race, to legendary after-parties, dining near the circuit, and where to stay for the ultimate Grand Prix weekend.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Circuit', value: 'BIC Sakhir', icon: Flag },
              { label: 'Race Start', value: '6 PM Local', icon: Clock },
              { label: 'Laps', value: '57', icon: Car },
              { label: 'First Race', value: '2004', icon: Trophy },
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
            The Bahrain Grand Prix holds a special place in Formula 1 history. In 2004, it became the first Grand Prix held in the Middle East, and in 2014, it pioneered the now-iconic twilight race format, with cars screaming under floodlights as the desert sun sets. The Bahrain International Circuit in Sakhir has since become one of the most anticipated races on the calendar, often serving as the season opener and setting the tone for the championship battle ahead.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            But the Bahrain Grand Prix is about more than just the race itself. The entire kingdom transforms during race weekend, with parties, events, and an electric atmosphere that rivals any sporting event in the world. Whether you're a die-hard F1 fan with paddock passes or someone looking to soak up the atmosphere from a lively sports bar, this guide covers everything you need to make your Grand Prix weekend unforgettable.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            From the roar of engines at Turn 1 to the world-class concerts that follow the checkered flag, the Bahrain Grand Prix offers a unique blend of high-octane racing and Arabian hospitality. Hotels fill up months in advance, restaurants prepare special menus, and the nightlife scene shifts into overdrive. This is your complete guide to navigating it all.
          </p>
        </div>
      </section>

      {/* Race Information */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">About Bahrain International Circuit</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">The stunning desert circuit that kicks off the F1 season.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(raceInfo).map(([key, value]) => (
              <div key={key} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <h3 className="font-semibold text-red-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p className="text-gray-300">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a 
              href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/event-tickets/bahrain-grand-prix-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              Get Race Tickets on Platinumlist
            </a>
          </div>
        </div>
      </section>

      {/* Best Places to Watch */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Bars & Hotels to Watch the F1</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Not everyone has race tickets — but that doesn't mean you can't experience the Grand Prix atmosphere. These venues deliver the best race-watching experiences in Bahrain.</p>
          
          <div className="space-y-6">
            {watchingVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Link href={venue.link} className="hover:text-red-400 transition-colors">
                      <h3 className="text-xl font-bold">{venue.name}</h3>
                    </Link>
                    <p className="text-red-400 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />{venue.location} • {venue.type}
                    </p>
                    <p className="text-gray-300 mb-4">{venue.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {venue.highlights.map((h) => (<span key={h} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                  </div>
                  <div className="lg:w-1/4 lg:text-right">
                    <span className="inline-block px-3 py-1 bg-white/10 text-gray-300 rounded text-sm">{venue.vibe}</span>
                    <Link 
                      href={venue.link}
                      className="block mt-3 px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-bold rounded-lg transition-colors text-center"
                    >
                      View Venue
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            Looking for more options? Check our <Link href="/guides/sports-bars" className="text-red-400 hover:underline">Sports Bars Guide</Link> and <Link href="/guides/rooftop-bars" className="text-red-400 hover:underline">Rooftop Bars</Link>.
          </p>
        </div>
      </section>

      {/* F1 Parties */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Grand Prix Parties & Events</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">The racing stops, but the party's just getting started. From official BIC concerts to yacht parties and club nights, here's where the F1 crowd celebrates.</p>
          
          <div className="space-y-6">
            {f1Parties.map((party) => (
              <div key={party.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full mb-3">{party.type}</span>
                    <h3 className="text-xl font-bold mb-1">{party.name}</h3>
                    <p className="text-red-400 text-sm flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />{party.location}
                    </p>
                    <p className="text-gray-300">{party.description}</p>
                  </div>
                  <div className="md:w-1/4 md:text-right">
                    <p className="text-lg font-bold text-white">{party.price}</p>
                    {party.link.startsWith('http') ? (
                      <a 
                        href={party.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        Book Tickets
                      </a>
                    ) : (
                      <Link 
                        href={party.link}
                        className="inline-block mt-3 px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        Explore Area
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Find more Grand Prix events on our partner sites:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://eventsbahrain.com/f1-grand-prix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
              >
                EventsBahrain.com
              </a>
              <a 
                href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/event-tickets/bahrain-f1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
              >
                Platinumlist Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Near Circuit */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Dining Near the Circuit</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Fuel up before the race or grab a bite between sessions. Here are your dining options in and around Bahrain International Circuit.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {diningNearCircuit.map((dining) => (
              <div key={dining.name} className="bg-white/5 rounded-xl p-6">
                <Utensils className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="text-xl font-bold text-red-400 mb-3">{dining.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{dining.description}</p>
                <div className="mb-3">
                  <span className="text-sm text-gray-400">Options: </span>
                  <span className="text-sm text-gray-300">{dining.options.join(', ')}</span>
                </div>
                <p className="text-sm text-yellow-400 italic">💡 {dining.tip}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            For more dining options, explore our <Link href="/guides/best-restaurants" className="text-red-400 hover:underline">Best Restaurants Guide</Link> and <Link href="/guides/buffets" className="text-red-400 hover:underline">Buffets in Bahrain</Link>.
          </p>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Where to Stay for Grand Prix Weekend</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Accommodation fills up fast and prices spike during race weekend. Here's what to expect and where to book for the best experience.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {accommodationTips.map((accom) => (
              <div key={accom.category} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <Hotel className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="text-xl font-bold mb-2">{accom.category}</h3>
                <p className="text-red-400 text-sm mb-2">{accom.recommendation}</p>
                <p className="text-lg font-bold text-white mb-3">{accom.priceRange}</p>
                <p className="text-gray-300 text-sm mb-4">{accom.notes}</p>
                <Link 
                  href={accom.link}
                  className="text-red-400 hover:underline text-sm"
                >
                  View area guide →
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" /> Pro Tip: Book Early
            </h3>
            <p className="text-gray-300">
              Hotel prices can triple during Grand Prix weekend. Book 3-6 months in advance for the best rates and availability. Consider staying through Monday — Sunday night parties run late, and you'll want to sleep in. Some visitors stay in Dammam, Saudi Arabia (90 minutes away) for better rates, though this adds commute time.
            </p>
          </div>
        </div>
      </section>

      {/* Getting to the Circuit */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Getting to Bahrain International Circuit</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {gettingToCircuit.map((transport) => (
              <div key={transport.method} className={`bg-white/5 rounded-xl p-6 ${transport.recommended ? 'border border-red-500/30' : ''}`}>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg mb-2">{transport.method}</h3>
                  {transport.recommended && <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Recommended</span>}
                </div>
                <p className="text-gray-300 text-sm">{transport.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Race Weekend?</h2>
          <p className="text-gray-300 mb-8">Book your tickets, secure your accommodation, and get ready for the most exciting weekend of the year in Bahrain.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://platinumlist.net/event-tickets/bahrain-grand-prix-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              Get F1 Tickets
            </a>
            <Link href="/guides/nightlife" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">
              Nightlife Guide
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Capturing your Grand Prix experience? <a href="https://cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">CinematicWebWorks.com</a> offers professional event videography and photography services.
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Sports Bars', href: '/guides/sports-bars', emoji: '🍺' },
              { title: 'Nightlife', href: '/guides/nightlife', emoji: '🎉' },
              { title: 'Rooftop Bars', href: '/guides/rooftop-bars', emoji: '🌃' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
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
        headline: 'Bahrain Grand Prix — Where to Watch, Eat & Party',
        description: 'Your ultimate guide to the Bahrain Grand Prix. Discover the best bars and hotels to watch F1, official race parties, dining near BIC circuit, and accommodation tips for race weekend.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', logo: { '@type': 'ImageObject', url: 'https://www.bahrainnights.com/logo.png' } },
        datePublished: '2025-01-01',
        dateModified: lastUpdated,
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.bahrainnights.com/guides/bahrain-grand-prix-guide' },
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
