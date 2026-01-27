import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sun, Thermometer, Clock, MapPin,
  Waves, Snowflake, DollarSign, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Summer Activities in Bahrain 2026 | Beat the Heat Guide',
  description: 'How to survive and enjoy summer in Bahrain! Best indoor activities, water parks, mall entertainment, hotel deals, and cool ways to beat the 40°C+ heat.',
  keywords: 'summer Bahrain, things to do summer Bahrain, beat the heat Bahrain, indoor activities Bahrain, water parks Bahrain, summer deals Bahrain',
  openGraph: {
    title: 'Summer Activities in Bahrain 2026 | Beat the Heat Guide',
    description: 'Your guide to surviving summer in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/summer',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/summer',
  },
};

const activities = [
  {
    name: 'Wahooo! Waterpark',
    type: 'Indoor Water Fun',
    location: 'City Centre Bahrain',
    description: 'Temperature-controlled indoor waterpark. Perfect escape from summer heat with slides, wave pool, and lazy river.',
    price: 'BD 12-18',
    tip: 'Air-conditioned! Open year-round regardless of weather.',
    rating: 5,
  },
  {
    name: 'Mall Hopping',
    type: 'Shopping & Entertainment',
    location: 'Various malls',
    description: 'Spend the day in air-conditioned comfort. City Centre, Seef Mall, and The Avenues offer cinema, dining, entertainment.',
    price: 'Free entry',
    tip: 'Magic Planet and other entertainment centers great for families.',
    rating: 4,
  },
  {
    name: 'Cinema',
    type: 'Entertainment',
    location: 'Various locations',
    description: 'Escape into air-conditioned movie theaters. VOX, Cineco have latest releases plus luxury options.',
    price: 'BD 3-15',
    tip: 'IMAX and VIP screens worth the upgrade.',
    rating: 4,
  },
  {
    name: 'Hotel Pool Day Passes',
    type: 'Pool & Beach',
    location: 'Various hotels',
    description: 'Enjoy hotel pools without the room cost. Many offer summer deals on day passes.',
    price: 'BD 15-50',
    tip: 'Best before 10am or after 5pm. Summer rates often discounted.',
    rating: 4,
  },
  {
    name: 'Spa Days',
    type: 'Wellness',
    location: 'Hotels & Spas',
    description: 'Cool spa interiors, relaxing treatments. Summer often brings spa package deals.',
    price: 'BD 40-150',
    tip: 'Great time for spa deals - hotels want to attract guests.',
    rating: 4,
  },
  {
    name: 'Indoor Sports',
    type: 'Activities',
    location: 'Various',
    description: 'Bowling (Bahrain Mall), ice skating (Bahrain Mall), indoor gyms, climbing walls (Gravity).',
    price: 'BD 3-15',
    tip: 'Ice skating rink is literally the coolest activity!',
    rating: 4,
  },
  {
    name: 'Museums & Galleries',
    type: 'Culture',
    location: 'Manama',
    description: 'Air-conditioned culture at National Museum, Beit Al Quran. Usually quiet in summer.',
    price: 'Free-BD 2',
    tip: 'Beat the crowds - locals travel during summer holidays.',
    rating: 4,
  },
  {
    name: 'Early Morning Beach',
    type: 'Outdoor (Careful!)',
    location: 'Beaches',
    description: 'If you must go outside, beaches at sunrise (5-7am) before heat builds up.',
    price: 'Free-BD 25',
    tip: 'ONLY before 8am. Water is warm, air is tolerable early.',
    rating: 3,
  },
  {
    name: 'Sunset Dinner Cruises',
    type: 'Evening Activity',
    location: 'Marina',
    description: 'Evening dhow cruises when temperatures drop. Dinner on the water.',
    price: 'BD 20-50',
    tip: 'Book for 7pm onwards when sun is setting.',
    rating: 4,
  },
  {
    name: 'Night Activities',
    type: 'Evening Entertainment',
    location: 'Various',
    description: 'Do outdoor activities after 8pm when temperatures drop to 35°C.',
    price: 'Varies',
    tip: 'This is when locals come out! Night markets, walks, dining.',
    rating: 4,
  },
];

const summerTips = [
  { title: 'Peak Heat Hours', content: 'Avoid outdoors 10am-5pm. Temperatures 40-50°C. Real feel even higher.' },
  { title: 'Hydration', content: 'Drink 3-4 liters water daily minimum. Dehydration happens fast.' },
  { title: 'Sun Protection', content: 'SPF 50+, reapply often. UV index extreme. Sunburn in minutes.' },
  { title: 'Dress Light', content: 'Light, loose clothing. Cotton or moisture-wicking fabrics.' },
  { title: 'AC is Essential', content: 'Don\'t underestimate the heat. Plan around air conditioning.' },
  { title: 'Summer Deals', content: 'Hotels, spas, restaurants offer summer promotions. Great for staycations.' },
];

const monthlyGuide = [
  { month: 'May', temp: '35-40°C', notes: 'Heat building. Outdoor mornings still possible.' },
  { month: 'June', temp: '38-45°C', notes: 'Hot. Limit outdoor to early AM/late PM.' },
  { month: 'July', temp: '40-48°C', notes: 'Peak heat. Stay indoors 10am-6pm.' },
  { month: 'August', temp: '40-48°C', notes: 'Peak heat. Humidity highest.' },
  { month: 'September', temp: '38-42°C', notes: 'Still very hot. Slight relief late month.' },
];

export default function SummerPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Summer', url: 'https://www.bahrainnights.com/guides/summer' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">☀️ Seasonal Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Summer in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Survive and thrive in Bahrain's intense summer heat! Indoor activities, water fun, hotel deals, and smart ways to beat 45°C+.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated} • May-September</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Peak Temp', value: '48°C', icon: Thermometer },
              { label: 'Season', value: 'May-Sep', icon: Sun },
              { label: 'Best Time', value: 'Night', icon: Clock },
              { label: 'Survival', value: 'AC!', icon: Snowflake },
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

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Monthly Temperature Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {monthlyGuide.map((m) => (
              <div key={m.month} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-bold text-orange-400">{m.month}</h3>
                <p className="text-lg font-bold">{m.temp}</p>
                <p className="text-xs text-gray-400">{m.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Summer Activities</h2>
          <p className="text-gray-400 text-center mb-12">Best things to do when it's 45°C outside.</p>
          
          <div className="space-y-6">
            {activities.map((a) => (
              <div key={a.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{a.name}</h3>
                        <p className="text-orange-400 text-sm">{a.type} • {a.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex">{[...Array(a.rating)].map((_, i) => (<Sun key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />))}</div>
                        <span className="text-sm font-bold text-white">{a.price}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{a.description}</p>
                    <p className="text-sm text-orange-300">💡 {a.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Summer Survival Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summerTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Beat the Heat</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/water-parks" className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors">Water Parks</Link>
            <Link href="/guides/malls" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Mall Guide</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Water Parks', href: '/guides/water-parks', emoji: '🌊' },
              { title: 'Best Malls', href: '/guides/malls', emoji: '🛍️' },
              { title: 'Spas', href: '/guides/spas', emoji: '💆' },
              { title: 'Staycations', href: '/guides/staycations', emoji: '🏨' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-orange-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {[
              { q: 'How hot does Bahrain get in summer?', a: 'Peak temperatures reach 45-48°C (113-118°F) in July-August. "Real feel" with humidity can be 50°C+.' },
              { q: 'Can you do outdoor activities in summer?', a: 'Only before 8am or after 7pm. Midday outdoor activity is genuinely dangerous.' },
              { q: 'Is summer a good time to visit Bahrain?', a: 'Not ideal for outdoor sightseeing, but excellent hotel deals, fewer tourists, and plenty of indoor activities.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Summer Activities in Bahrain 2026',
        description: 'Complete guide to surviving and enjoying summer in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How hot does Bahrain get in summer?', acceptedAnswer: { '@type': 'Answer', text: 'Peak temperatures reach 45-48°C (113-118°F) in July-August. "Real feel" with humidity can be 50°C+.' } },
          { '@type': 'Question', name: 'Can you do outdoor activities in summer?', acceptedAnswer: { '@type': 'Answer', text: 'Only before 8am or after 7pm. Midday outdoor activity is genuinely dangerous.' } },
          { '@type': 'Question', name: 'Is summer a good time to visit Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'Not ideal for outdoor sightseeing, but excellent hotel deals, fewer tourists, and plenty of indoor activities.' } },
        ]
      })}} />
    </div>
  );
}
