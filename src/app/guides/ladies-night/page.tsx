import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wine, Clock, MapPin, Calendar, Star, Sparkles,
  ArrowRight, Heart, Music, Users, Gift, CheckCircle
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Ladies Night Bahrain 2026 — Best Deals, Free Drinks & Where to Go',
  description: 'Complete guide to ladies night in Bahrain. Find the best deals with free drinks, discounts & specials every night of the week. Thursday is the biggest night!',
  keywords: 'ladies night bahrain, ladies night deals bahrain, free drinks bahrain, ladies night thursday bahrain, best ladies night manama, ladies night juffair, ladies night adliya',
  openGraph: {
    title: 'Ladies Night Bahrain 2026 — Best Deals & Free Drinks Guide',
    description: 'Find the best ladies night deals in Bahrain with free drinks, discounts, and specials every night.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ladies-night',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ladies-night',
  },
};

// Ladies night venues organized by day
const ladiesNightsByDay = {
  'Sunday': [
    { name: 'Zahle Restaurant & Lounge', area: 'Adliya', hours: '7 PM - 11 PM', deal: '3 free drinks', notes: 'Lebanese cuisine with live entertainment' },
  ],
  'Monday': [
    { name: 'CUT by Wolfgang Puck', area: 'Four Seasons', hours: '7 PM - 11 PM', deal: '3 complimentary beverages', notes: 'Upscale steakhouse' },
    { name: 'The Domain Hotel', area: 'Diplomatic Area', hours: '8 PM - 12 AM', deal: '50% off drinks', notes: 'Multiple bars to choose from' },
  ],
  'Tuesday': [
    { name: 'Calexico', area: 'Adliya', hours: '8 PM - 12 AM', deal: '3 free drinks', notes: 'Mexican vibes, great margaritas', featured: true },
    { name: 'Hazel Rooftop Lounge', area: 'Juffair', hours: '7 PM - 11 PM', deal: '3 complimentary drinks', notes: 'Rooftop views' },
    { name: 'Le Meridien', area: 'Diplomatic Area', hours: '8 PM - 12 AM', deal: '2 free drinks', notes: 'Elegant setting' },
  ],
  'Wednesday': [
    { name: 'Sass Cafe', area: 'Seef', hours: '8 PM - 12 AM', deal: '3 complimentary drinks', notes: 'Chic atmosphere', featured: true },
    { name: 'La Vinoteca', area: 'Adliya', hours: '6 PM - 11 PM', deal: '50% off wine', notes: 'Wine bar special' },
    { name: 'Gulf Hotel - Typhoon', area: 'Adliya', hours: '9 PM - 1 AM', deal: '3 free drinks', notes: 'Club vibes' },
  ],
  'Thursday': [
    { name: 'Most Hotel Bars', area: 'Island-wide', hours: '8 PM - 1 AM', deal: 'Free drinks (varies)', notes: 'THE night for ladies night!', featured: true },
    { name: 'Block 338 Bars', area: 'Adliya', hours: '9 PM - 2 AM', deal: '2-4 free drinks', notes: 'Multiple venues, bar hop', featured: true },
    { name: 'Coral Bay', area: 'Manama', hours: '10 PM - 2 AM', deal: '3 free drinks', notes: 'Club entry + drinks' },
    { name: 'Wyndham Grand', area: 'Manama', hours: '8 PM - 12 AM', deal: '4 free drinks', notes: 'Multiple bars' },
    { name: 'Ritz-Carlton', area: 'Seef', hours: '8 PM - 11 PM', deal: '3 complimentary drinks', notes: 'Upscale crowd' },
    { name: 'The Westin', area: 'City Centre', hours: '7 PM - 11 PM', deal: '3 free drinks', notes: 'Several bars' },
    { name: 'Intercontinental', area: 'Juffair', hours: '8 PM - 12 AM', deal: '3 free drinks', notes: 'Breeze lounge' },
  ],
  'Friday': [
    { name: 'Beach Clubs (Daytime)', area: 'Various', hours: '12 PM - 6 PM', deal: 'Discounted entry for ladies', notes: 'Pool party vibes' },
    { name: 'Trader Vic\'s', area: 'Ritz-Carlton', hours: '7 PM - 11 PM', deal: '2 free cocktails', notes: 'Tiki vibes' },
  ],
  'Saturday': [
    { name: 'Bushido', area: 'Seef', hours: '8 PM - 12 AM', deal: '3 complimentary drinks', notes: 'Asian fusion restaurant & lounge' },
    { name: 'Mövenpick', area: 'Muharraq', hours: '8 PM - 11 PM', deal: '3 free drinks', notes: 'Saturday special' },
  ],
};

const tips = [
  { title: 'Thursday is King', text: 'Thursday is the biggest ladies night in Bahrain. Almost every hotel bar participates. Start at 8 PM.' },
  { title: 'Dress Code', text: 'Most venues require smart casual. No flip-flops, shorts, or sportswear. Heels encouraged at upscale spots.' },
  { title: 'Arrive Early', text: 'Ladies night deals usually have a cutoff time. Arrive by 9-10 PM to maximize your free drinks.' },
  { title: 'Book Brunches Early', text: 'Friday brunches often include ladies night pricing. Book by Thursday for the best Friday spots.' },
  { title: 'Bring ID', text: 'Some venues check ID at the door. Always carry your CPR or passport.' },
  { title: 'Bar Hop in Adliya', text: 'Block 338 has multiple bars within walking distance. Great for hopping between venues.' },
];

const areas = [
  { name: 'Adliya (Block 338)', description: 'Highest concentration of bars. Walk between venues easily.', venues: 10 },
  { name: 'Juffair', description: 'Expat-friendly area with hotel bars and lounges.', venues: 8 },
  { name: 'Seef', description: 'Upscale hotel bars with premium crowds.', venues: 5 },
  { name: 'Hotel District', description: 'Major hotels like Ritz, Four Seasons, Gulf Hotel.', venues: 6 },
];

export default function LadiesNightPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Bahrain' });
  const todayVenues = ladiesNightsByDay[today as keyof typeof ladiesNightsByDay] || [];
  
  // Count total venues
  const totalVenues = Object.values(ladiesNightsByDay).flat().length;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Ladies Night', url: 'https://www.bahrainnights.com/guides/ladies-night' },
        ]}
      />
      
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4 border border-pink-500/30">
              👠 Ultimate Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ladies Night Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your complete guide to ladies night deals in Bahrain. Free drinks, special offers, 
              and the best venues every night of the week.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Venues', value: `${totalVenues}+`, icon: MapPin },
              { label: 'Nights/Week', value: '7', icon: Calendar },
              { label: 'Best Night', value: 'Thursday', icon: Star },
              { label: 'Free Drinks', value: '2-4', icon: Wine },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-500/20">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tonight's Ladies Night */}
      {todayVenues.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-400" />
              Ladies Night Tonight ({today})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayVenues.map((venue, idx) => (
                <div
                  key={idx}
                  className={`${'featured' in venue && venue.featured ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/40' : 'bg-white/5 border-white/10'} border rounded-xl p-5`}
                >
                  {'featured' in venue && venue.featured && (
                    <span className="inline-block px-2 py-0.5 bg-pink-500 text-white text-xs font-medium rounded mb-2">
                      ⭐ Popular
                    </span>
                  )}
                  <h3 className="font-bold text-white text-lg">{venue.name}</h3>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {venue.area}
                  </p>
                  <p className="text-pink-400 flex items-center gap-1 mt-2">
                    <Clock className="w-4 h-4" />
                    {venue.hours}
                  </p>
                  <p className="text-green-400 font-semibold mt-2 flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    {venue.deal}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">{venue.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Ladies Night by Day */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Ladies Night Every Day of the Week</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            There's a ladies night happening somewhere in Bahrain every single night. 
            Here's your complete weekly schedule.
          </p>
          
          <div className="space-y-8">
            {Object.entries(ladiesNightsByDay).map(([day, venues]) => (
              <div key={day} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${day === 'Thursday' ? 'bg-pink-500' : 'bg-pink-500/20'}`}>
                    <Calendar className={`w-6 h-6 ${day === 'Thursday' ? 'text-white' : 'text-pink-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{day}</h3>
                    {day === 'Thursday' && (
                      <span className="text-pink-400 text-sm">👑 Best Night!</span>
                    )}
                  </div>
                  <span className="ml-auto text-gray-400">{venues.length} venues</span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {venues.map((venue, idx) => (
                    <div key={idx} className="bg-black/20 rounded-lg p-4">
                      <h4 className="font-semibold text-white">{venue.name}</h4>
                      <p className="text-gray-500 text-sm">{venue.area}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-pink-400 text-sm">{venue.hours}</span>
                        <span className="text-green-400 text-sm font-medium">{venue.deal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Areas */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Best Areas for Ladies Night</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {areas.map((area) => (
              <div key={area.name} className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h3 className="font-bold text-white text-lg mb-2">{area.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{area.description}</p>
                <p className="text-pink-400 font-semibold">{area.venues}+ venues</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Ladies Night Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-5 border border-pink-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Tonight?</h2>
          <p className="text-gray-300 mb-8">
            Check what's happening tonight and plan your perfect night out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tonight"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-xl transition-colors"
            >
              What's On Tonight
            </Link>
            <Link
              href="/bahrain-nightlife-guide"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
            >
              Full Nightlife Guide
            </Link>
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2>Ladies Night in Bahrain — Everything You Need to Know</h2>
          <p>
            Ladies night in Bahrain is a weekly tradition that brings out the best deals from bars, 
            lounges, and clubs across the Kingdom. Whether you're looking for free drinks, discounted 
            entry, or simply a fun night out with friends, there's always somewhere to go.
          </p>
          
          <h3>When is Ladies Night in Bahrain?</h3>
          <p>
            While <strong>Thursday is the biggest ladies night in Bahrain</strong>, you can find deals every 
            night of the week. Tuesday and Wednesday have great mid-week options, and even weekends 
            offer special promotions at select venues.
          </p>
          
          <h3>What Can You Expect?</h3>
          <p>
            Most ladies night deals in Bahrain include:
          </p>
          <ul>
            <li><strong>2-4 complimentary drinks</strong> — Usually house wines, selected cocktails, or beer</li>
            <li><strong>Discounted entry</strong> — Some clubs waive cover charge for ladies</li>
            <li><strong>Special offers</strong> — 50% off drinks, 2-for-1 deals, or package pricing</li>
          </ul>
          
          <h3>Best Ladies Night Areas</h3>
          <p>
            <strong>Adliya (Block 338)</strong> is the top destination for ladies night hopping. With over 10 
            bars within walking distance, you can easily move between venues to maximize deals. Hotel bars 
            in the Seef and Diplomatic areas offer more upscale experiences with dress codes.
          </p>
          
          <h3>Dress Code</h3>
          <p>
            Most venues require smart casual attire. Avoid sportswear, flip-flops, and shorts. 
            Upscale hotel bars expect heels and cocktail attire. When in doubt, dress up — you can always 
            get in, but you might be turned away if underdressed.
          </p>
          
          <p>
            <em>This guide is updated regularly. Last update: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</em>
          </p>
        </div>
      </section>
      
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ladies Night Bahrain 2026 — Best Deals, Free Drinks & Where to Go',
            description: 'Complete guide to ladies night in Bahrain with free drinks, special offers, and best venues every night.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ladies-night',
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
                name: 'What is the best night for ladies night in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thursday is the best and biggest night for ladies night in Bahrain. Almost every hotel bar and club participates with free drinks and special offers for ladies.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many free drinks do you get on ladies night in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most venues offer 2-4 complimentary drinks during ladies night, usually house wines, selected cocktails, or beer. Some venues offer unlimited drinks within a time window.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where are the best ladies nights in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Adliya (Block 338) has the highest concentration of bars and is great for bar hopping. Hotel bars at Ritz-Carlton, Four Seasons, and Gulf Hotel offer upscale ladies nights.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
