import { Metadata } from 'next';
import Link from 'next/link';
import { 
  PartyPopper, Clock, MapPin, Star,
  Calendar, Gift, Users, Utensils,
  Sparkles, Heart, ShoppingBag, Camera
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Eid Celebrations in Bahrain — Events & Dining | Complete 2026 Guide',
  description: 'Discover how to celebrate Eid Al-Fitr and Eid Al-Adha in Bahrain. Best brunches, family activities, events, fireworks, and dining options for the festive holidays.',
  keywords: 'Eid Bahrain, Eid Al Fitr Bahrain, Eid Al Adha Bahrain, Eid celebrations Bahrain, Eid brunch Bahrain, Eid events, Bahrain Eid 2026, Eid dining Bahrain',
  openGraph: {
    title: 'Eid Celebrations in Bahrain — Events & Dining',
    description: 'Your complete guide to celebrating Eid Al-Fitr and Eid Al-Adha in Bahrain with events, brunches, and family activities.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/eid-celebrations-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/eid-bahrain-og.jpg', width: 1200, height: 630, alt: 'Eid Celebrations in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eid Celebrations in Bahrain — Events & Dining',
    description: 'Your complete guide to Eid celebrations in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/eid-celebrations-bahrain',
  },
};

const eidInfo = [
  {
    name: 'Eid Al-Fitr',
    meaning: 'Festival of Breaking the Fast',
    when: 'End of Ramadan (Late March/Early April 2026)',
    duration: '3-4 days public holiday',
    description: 'Eid Al-Fitr marks the joyous end of Ramadan. After a month of fasting, families gather for prayers, feasting, and celebrations. It\'s a time of gratitude, charity (Zakat Al-Fitr), and spreading happiness. The atmosphere is electric with relief and joy.',
    traditions: ['Morning Eid prayers', 'Zakat Al-Fitr charity', 'Family gatherings', 'Eidiya (cash gifts)', 'New clothes', 'Sweet treats'],
    vibe: 'Joyful, celebratory, family-focused',
  },
  {
    name: 'Eid Al-Adha',
    meaning: 'Festival of Sacrifice',
    when: 'After Hajj pilgrimage (Early June 2026)',
    duration: '4-5 days public holiday',
    description: 'Eid Al-Adha commemorates Prophet Ibrahim\'s willingness to sacrifice his son as an act of obedience to God. Families who can afford it sacrifice an animal and distribute the meat to relatives, neighbors, and the poor. It coincides with Hajj pilgrimage.',
    traditions: ['Eid prayers', 'Animal sacrifice', 'Meat distribution', 'Helping the needy', 'Family visits', 'Feasting'],
    vibe: 'Spiritual, generous, community-focused',
  },
];

const eidBrunches = [
  {
    name: 'Four Seasons Eid Brunch',
    location: 'Bahrain Bay',
    price: 'BD 55-75',
    description: 'The Four Seasons hosts one of Bahrain\'s most prestigious Eid brunches. Expect an extraordinary spread of international and Arabic cuisine, live entertainment, kids\' activities, and stunning bay views. Their pastry selection is legendary.',
    highlights: ['Premium buffet', 'Live entertainment', 'Kids zone', 'Bay views', 'Sparkling options'],
    link: '/venues/four-seasons-bahrain',
  },
  {
    name: 'Ritz-Carlton Eid Celebration',
    location: 'Seef',
    price: 'BD 50-70',
    description: 'Celebrate Eid in style at the Ritz-Carlton with their elaborate brunch spread. Multiple live cooking stations, traditional Arabic dishes, international favorites, and a festive atmosphere perfect for family gatherings.',
    highlights: ['Multiple cuisines', 'Live cooking', 'Family-friendly', 'Premium drinks packages'],
    link: '/venues/ritz-carlton-bahrain',
  },
  {
    name: 'Gulf Hotel Eid Brunch',
    location: 'Adliya',
    price: 'BD 35-50',
    description: 'A long-standing Eid tradition in Bahrain, Gulf Hotel\'s brunch offers excellent value with their renowned Arabic cuisine from Zahle restaurant plus international options. Central location makes it accessible for extended family gatherings.',
    highlights: ['Excellent value', 'Zahle quality', 'Central location', 'Large capacity'],
    link: '/venues/gulf-hotel',
  },
  {
    name: 'ART Rotana Eid Brunch',
    location: 'Amwaj Islands',
    price: 'BD 40-55',
    description: 'Escape to Amwaj Islands for Eid brunch with a view. ART Rotana offers a relaxed beach atmosphere with quality dining, pool access for kids, and a less hectic alternative to city-center venues.',
    highlights: ['Beach setting', 'Pool access', 'Relaxed vibe', 'Good for families'],
    link: '/areas/amwaj',
  },
  {
    name: 'Intercontinental Regency',
    location: 'Manama',
    price: 'BD 38-52',
    description: 'Downtown Manama\'s favorite Eid destination offers reliable quality with their extensive brunch spread. Their strategic location makes it perfect for combining with Eid shopping at nearby malls.',
    highlights: ['Downtown location', 'Extensive spread', 'Shopping nearby', 'Corporate-friendly'],
    link: '/areas/manama',
  },
];

const familyActivities = [
  {
    name: 'Wahooo! Waterpark',
    location: 'City Centre Bahrain',
    type: 'Water Park',
    description: 'The region\'s largest indoor waterpark offers special Eid packages with extended hours. Perfect for families looking to beat the heat while celebrating. Expect it to be very popular — book ahead.',
    price: 'BD 15-25',
    tip: 'Book online in advance; on-site queues are long during Eid',
  },
  {
    name: 'Lost Paradise of Dilmun',
    location: 'Sakhir',
    type: 'Water Park',
    description: 'Bahrain\'s largest outdoor waterpark offers Eid specials with extended operating hours. Multiple pools, slides for all ages, and cabana rentals for family gatherings make this a top Eid destination.',
    price: 'BD 18-28',
    tip: 'Rent a cabana for shade and a home base',
  },
  {
    name: 'Bahrain Bay Eid Festival',
    location: 'Bahrain Bay',
    type: 'Public Event',
    description: 'Bahrain Bay comes alive during Eid with food stalls, carnival rides, entertainment stages, and fireworks. Free entry makes this a go-to destination for evening family outings.',
    price: 'Free entry',
    tip: 'Arrive early for parking; fireworks usually at 9 PM',
  },
  {
    name: 'Mall Eid Events',
    location: 'City Centre, Seef Mall, Avenues',
    type: 'Shopping & Entertainment',
    description: 'Major malls host Eid celebrations with performances, character meet-and-greets, face painting, and competitions. Plus, Eid sales across stores make it a shopping destination too.',
    price: 'Free entry',
    tip: 'Check mall social media for event schedules',
  },
  {
    name: 'Al Dar Islands',
    location: 'Off Sitra coast',
    type: 'Beach & Nature',
    description: 'Escape to these beautiful islands for a traditional Eid beach day. Crystal-clear waters, beach facilities, and day-trip boats make this a memorable family outing.',
    price: 'BD 8-15 per person',
    tip: 'Book boat transfers in advance during Eid',
  },
  {
    name: 'Adhari Park',
    location: 'Near Adhari Spring',
    type: 'Theme Park',
    description: 'This renovated amusement park offers rides and attractions for all ages. Special Eid packages and extended hours make it a popular choice for families with kids.',
    price: 'BD 5-15',
    tip: 'Go in the evening when it\'s cooler',
  },
];

const diningOptions = [
  { type: 'Hotel Eid Brunches', price: 'BD 35-75', description: 'Elaborate buffets at major hotels with entertainment', venues: 'Four Seasons, Ritz-Carlton, Gulf Hotel' },
  { type: 'Arabic Restaurants', price: 'BD 15-40', description: 'Traditional feasting at dedicated Arabic venues', venues: 'Zahle, Abd El Wahab, Zaytinya' },
  { type: 'Family Restaurants', price: 'BD 10-25', description: 'Casual dining perfect for large groups', venues: 'Fuddruckers, Nando\'s, Chili\'s' },
  { type: 'Sweet Shops', price: 'BD 5-25', description: 'Traditional Arabic sweets essential for Eid', venues: 'Al Hallab, Patchi, Bateel' },
  { type: 'Home Catering', price: 'BD 15-30 per person', description: 'Catered Eid meals delivered to your home', venues: 'Various caterers' },
];

const eidTips = [
  { title: 'Book Everything Early', content: 'Eid brunches, restaurants, and activities book up 1-2 weeks in advance. Don\'t wait until the last minute — the best venues sell out quickly, especially for large family groups.', icon: Calendar },
  { title: 'Prepare for Traffic', content: 'Roads are extremely busy as everyone visits family. Allow extra travel time, especially on the first two days of Eid. Consider using taxis or ride-sharing to avoid parking hassles.', icon: MapPin },
  { title: 'Eid Greetings', content: 'Say "Eid Mubarak" (Blessed Eid) to everyone you meet. Locals genuinely appreciate when visitors participate in the celebration spirit. A smile and warm wishes go a long way.', icon: Heart },
  { title: 'Eidiya Tradition', content: 'Eidiya (cash gifts) are given to children by elders and relatives. If you\'re invited to an Eid gathering with kids, having small cash gifts or toys is a nice gesture.', icon: Gift },
  { title: 'Dress Festively', content: 'Eid is a time for new clothes and looking your best. While visitors aren\'t expected to follow this strictly, dressing nicely shows respect for the celebration.', icon: Users },
  { title: 'Mall Shopping', content: 'Major sales happen during Eid. If you\'re shopping, expect crowds but good deals. Stores stay open late. Pre-Eid is even busier as people buy new clothes and gifts.', icon: ShoppingBag },
];

const eidEvents2026 = [
  { name: 'Bahrain Bay Eid Festival', type: 'Family', dates: 'Throughout Eid holidays', description: 'Major public celebration with food, entertainment, and fireworks' },
  { name: 'Mall Celebrations', type: 'Family', dates: 'Throughout Eid holidays', description: 'Performances, games, and sales at major shopping centers' },
  { name: 'Hotel Eid Parties', type: 'Social', dates: 'Eid evenings', description: 'Special events at hotel venues (after Ramadan restrictions lift)' },
  { name: 'Beach Club Events', type: 'Adults', dates: 'Eid weekends', description: 'Pool parties and special Eid packages at beach clubs' },
];

export default function EidCelebrationsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  const faqs = [
    { q: 'When is Eid 2026 in Bahrain?', a: 'Eid Al-Fitr 2026 is expected around late March/early April (end of Ramadan). Eid Al-Adha 2026 is expected around early June (after Hajj). Exact dates depend on moon sighting and are confirmed by religious authorities 1-2 days before.' },
    { q: 'How many days is the Eid holiday in Bahrain?', a: 'Eid Al-Fitr is typically a 3-4 day public holiday, while Eid Al-Adha is usually 4-5 days. Private sector may vary, but government offices and schools are closed for the full period.' },
    { q: 'What is Eidiya and how much should I give?', a: 'Eidiya is cash given to children during Eid, similar to Chinese New Year red envelopes. Amounts vary by relationship and family tradition — typically BD 1-20 depending on closeness. It\'s not expected from non-Muslim visitors but appreciated if given.' },
    { q: 'Are restaurants and attractions open during Eid in Bahrain?', a: 'Yes, most tourist-oriented restaurants and attractions are open during Eid — often with extended hours. Some local businesses may close for the first 1-2 days. Hotels, malls, and major venues operate throughout.' },
    { q: 'Do I need to book Eid brunch in advance?', a: 'Absolutely yes. Eid brunches at popular hotels often sell out 1-2 weeks in advance. For large groups, book even earlier. Walk-ins are risky as venues operate at full capacity with reservations only.' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Eid Celebrations Bahrain', url: 'https://www.bahrainnights.com/guides/eid-celebrations-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">🎉 Festival Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Eid Celebrations in Bahrain</span>
              <span className="block text-2xl md:text-3xl mt-2 text-white">Events & Dining Guide 2026</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the joy of Eid Al-Fitr and Eid Al-Adha in Bahrain — from festive brunches and family activities to public celebrations, fireworks, and the warmth of Bahraini hospitality during the most anticipated holidays of the year.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Eids Per Year', value: '2', icon: Calendar },
              { label: 'Holiday Days', value: '3-5', icon: PartyPopper },
              { label: 'Key Tradition', value: 'Eidiya', icon: Gift },
              { label: 'Best For', value: 'Families', icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
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
            Eid in Bahrain is a time of pure celebration. After the spiritual reflection of Ramadan comes Eid Al-Fitr, a burst of joy that takes over the entire kingdom. Streets fill with families in their finest clothes, children clutching their Eidiya cash gifts, and the aroma of festive foods drifting from every home and restaurant. Eid Al-Adha, the second major celebration, brings similar festivities with its own spiritual significance tied to the Hajj pilgrimage.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            Whether you're celebrating with local friends, looking for the perfect Eid brunch venue, or simply want to experience Gulf hospitality at its finest, this guide covers everything you need to make the most of Eid in Bahrain. From hotel brunches that rival the best in the region to family-friendly activities and late-night celebrations, the kingdom comes alive during these special days.
          </p>
        </div>
      </section>

      {/* Two Eids Explained */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Understanding the Two Eids</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">While both are joyous celebrations, each Eid has its own meaning and traditions.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {eidInfo.map((eid) => (
              <div key={eid.name} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-green-400 mb-2">{eid.name}</h3>
                <p className="text-sm text-gray-400 italic mb-4">{eid.meaning}</p>
                <p className="text-gray-300 mb-4">{eid.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><strong className="text-green-300">When:</strong> <span className="text-gray-300">{eid.when}</span></p>
                  <p className="text-sm"><strong className="text-green-300">Duration:</strong> <span className="text-gray-300">{eid.duration}</span></p>
                  <p className="text-sm"><strong className="text-green-300">Atmosphere:</strong> <span className="text-gray-300">{eid.vibe}</span></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {eid.traditions.map((t) => (
                    <span key={t} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Eid Brunches */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Eid Brunches in Bahrain 2026</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Eid brunch is a Bahrain institution. These hotels and restaurants pull out all stops for the festive season.</p>
          
          <div className="space-y-6">
            {eidBrunches.map((brunch) => (
              <div key={brunch.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Link href={brunch.link} className="hover:text-green-400 transition-colors">
                      <h3 className="text-xl font-bold">{brunch.name}</h3>
                    </Link>
                    <p className="text-green-400 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />{brunch.location}
                    </p>
                    <p className="text-gray-300 mb-4">{brunch.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {brunch.highlights.map((h) => (<span key={h} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                  </div>
                  <div className="lg:w-1/4 lg:text-right">
                    <span className="text-xl font-bold text-white">{brunch.price}</span>
                    <p className="text-sm text-gray-400">per person</p>
                    <a 
                      href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/eid-brunch-bahrain')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 bg-green-500 hover:bg-green-400 text-black text-sm font-bold rounded-lg transition-colors"
                    >
                      Book on Platinumlist
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            For more dining inspiration, check our <Link href="/guides/brunches" className="text-green-400 hover:underline">Best Brunches in Bahrain</Link> and <Link href="/guides/buffets" className="text-green-400 hover:underline">Buffet Guide</Link>.
          </p>
        </div>
      </section>

      {/* Family Activities */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Family Activities During Eid</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Keep the whole family entertained with these top Eid activities and outings in Bahrain.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyActivities.map((activity) => (
              <div key={activity.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full mb-3">{activity.type}</span>
                <h3 className="text-lg font-bold mb-1">{activity.name}</h3>
                <p className="text-green-400 text-sm mb-3">{activity.location}</p>
                <p className="text-gray-300 text-sm mb-3">{activity.description}</p>
                <p className="text-lg font-bold mb-2">{activity.price}</p>
                <p className="text-xs text-gray-400">💡 {activity.tip}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            More ideas: <Link href="/guides/family-activities" className="text-green-400 hover:underline">Family Activities Guide</Link> • <Link href="/guides/water-parks" className="text-green-400 hover:underline">Water Parks</Link> • <Link href="/guides/things-to-do-with-kids" className="text-green-400 hover:underline">Kids Activities</Link>
          </p>
        </div>
      </section>

      {/* Dining Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Eid Dining Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diningOptions.map((d) => (
              <div key={d.type} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400">{d.type}</h3>
                <p className="text-xl font-bold mb-2">{d.price}</p>
                <p className="text-sm text-gray-300 mb-2">{d.description}</p>
                <p className="text-xs text-gray-400">Popular: {d.venues}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Essential Eid Tips</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Make the most of the Eid holiday with these practical tips for celebrating in Bahrain.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eidTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <tip.icon className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eid Events 2026 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Eid Events 2026</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {eidEvents2026.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6">
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full mb-3">{event.type}</span>
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-sm text-green-400 mb-2">{event.dates}</p>
                <p className="text-gray-300">{event.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Find more Eid events:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://eventsbahrain.com/eid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors"
              >
                EventsBahrain.com
              </a>
              <a 
                href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/eid-bahrain')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors"
              >
                Platinumlist Eid Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Eid Celebration</h2>
          <p className="text-gray-300 mb-8">Book brunches, find events, and make this Eid unforgettable in Bahrain.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://platinumlist.net/aff/?ref=yjg3yzi&link=${encodeURIComponent('https://platinumlist.net/event-tickets/eid-bahrain-2026')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse Eid Events
            </a>
            <Link href="/guides/ramadan-guide-bahrain" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">
              Ramadan Guide
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Capture your Eid memories with <a href="https://cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">CinematicWebWorks.com</a> — professional event photography and videography.
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Ramadan Guide', href: '/guides/ramadan-guide-bahrain', emoji: '🌙' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Water Parks', href: '/guides/water-parks', emoji: '🌊' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">{g.title}</span>
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
        headline: 'Eid Celebrations in Bahrain — Events & Dining',
        description: 'Your complete guide to celebrating Eid Al-Fitr and Eid Al-Adha in Bahrain with events, brunches, and family activities.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', logo: { '@type': 'ImageObject', url: 'https://www.bahrainnights.com/logo.png' } },
        datePublished: '2026-01-01',
        dateModified: lastUpdated,
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.bahrainnights.com/guides/eid-celebrations-bahrain' },
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
