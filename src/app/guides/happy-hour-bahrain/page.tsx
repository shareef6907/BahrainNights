import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Wine, Beer, DollarSign, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Happy Hours in Bahrain 2026 | Drinks Deals & After-Work Spots',
  description: 'Find the best happy hour deals in Bahrain. From 2-for-1 drinks to discounted cocktails at Adliya, Juffair, and Seef bars. Complete guide to after-work drinks in Bahrain.',
  keywords: 'happy hour Bahrain, drinks deals Bahrain, after work drinks Bahrain, cheap drinks Bahrain, bar deals Bahrain, Adliya happy hour, Juffair happy hour',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/happy-hour-bahrain' },
  openGraph: {
    title: 'Best Happy Hours in Bahrain 2026',
    description: 'Your guide to the best drinks deals and after-work spots in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What time is happy hour in Bahrain?', a: 'Most happy hours run from 4pm to 8pm, though some venues extend later. Sunday through Thursday typically has better deals than weekends. Some spots offer all-night deals on slower days.' },
  { q: 'Where are the best happy hour deals in Bahrain?', a: 'Adliya bars like Calexico and JJ\'s offer great happy hours. Hotel bars like Trader Vic\'s, Sherlock Holmes, and CUT have premium happy hours. Juffair has numerous options for budget-friendly drinks.' },
  { q: 'Can you get 2-for-1 drinks in Bahrain?', a: 'Yes! Many bars offer 2-for-1 deals during happy hour. JJ\'s Irish Pub, Sherlock Holmes, and various hotel bars regularly run 2-for-1 promotions on select drinks.' },
  { q: 'Are there happy hours on weekends in Bahrain?', a: 'Weekend happy hours are less common but exist. Friday brunches often include free-flowing drinks. Some bars run Saturday specials. Check venue social media for current promotions.' },
  { q: 'What is the average drink price during happy hour?', a: 'Happy hour prices range from BD 2-4 for beer, BD 3-5 for house wine, and BD 4-7 for cocktails — typically 30-50% off regular prices.' },
];

const venues = [
  { 
    name: 'Trader Vic\'s', 
    location: 'The Ritz-Carlton, Seef',
    timing: '5pm - 8pm daily',
    deals: '50% off selected cocktails, discounted bar bites',
    vibe: 'Tiki bar with exotic cocktails',
    priceRange: 'BD 4-8 (happy hour)',
    rating: 4.6,
  },
  { 
    name: 'JJ\'s Irish Pub', 
    location: 'Adliya',
    timing: '4pm - 8pm Sun-Thu',
    deals: '2-for-1 on draught beer, discounted spirits',
    vibe: 'Classic Irish pub, sports on TV',
    priceRange: 'BD 3-5 (happy hour)',
    rating: 4.4,
  },
  { 
    name: 'Calexico', 
    location: 'Adliya',
    timing: '5pm - 8pm daily',
    deals: 'Discounted margaritas and tequila',
    vibe: 'Mexican cantina, late-night crowd',
    priceRange: 'BD 4-6 (happy hour)',
    rating: 4.5,
  },
  { 
    name: 'Sherlock Holmes Pub', 
    location: 'Gulf Hotel, Adliya',
    timing: '5pm - 8pm Sun-Thu',
    deals: '2-for-1 select drinks, bar snacks specials',
    vibe: 'British pub atmosphere',
    priceRange: 'BD 3-6 (happy hour)',
    rating: 4.3,
  },
  { 
    name: 'CUT by Wolfgang Puck', 
    location: 'Four Seasons, Bahrain Bay',
    timing: '5pm - 7pm daily',
    deals: 'Discounted wines and signature cocktails',
    vibe: 'Upscale lounge, business crowd',
    priceRange: 'BD 6-10 (happy hour)',
    rating: 4.7,
  },
  { 
    name: 'Zuma', 
    location: 'Four Seasons, Bahrain Bay',
    timing: '6pm - 9pm Sun-Wed',
    deals: 'Selected sake and cocktails specials',
    vibe: 'Trendy izakaya, chic crowd',
    priceRange: 'BD 5-9 (happy hour)',
    rating: 4.6,
  },
  { 
    name: 'The Meat Company', 
    location: 'The Avenues',
    timing: '4pm - 7pm Sun-Thu',
    deals: 'Happy hour wine and beer specials',
    vibe: 'Casual steakhouse bar',
    priceRange: 'BD 4-7 (happy hour)',
    rating: 4.2,
  },
  { 
    name: 'Bahri Bar', 
    location: 'Four Seasons, Bahrain Bay',
    timing: '4pm - 7pm daily',
    deals: 'Sunset happy hour, outdoor terrace specials',
    vibe: 'Waterfront relaxation',
    priceRange: 'BD 5-8 (happy hour)',
    rating: 4.5,
  },
];

export default function HappyHourBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Happy Hour', url: 'https://www.bahrainnights.com/guides/happy-hour-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">🍸 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Happy Hours</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From discounted cocktails at sunset bars to 2-for-1 deals at classic pubs — 
              discover where to find the best drinks deals after work in Bahrain.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Happy hour is a beloved tradition in Bahrain&apos;s vibrant bar scene. Whether you&apos;re 
            unwinding after work, catching up with friends, or starting a night out, happy hour 
            offers the perfect opportunity to enjoy quality drinks without breaking the bank.
          </p>
          <p>
            Bahrain&apos;s happy hours typically run from late afternoon to early evening, with the 
            best deals found Sunday through Thursday. From tiki bars with exotic cocktails to 
            traditional Irish pubs with draught beer deals, there&apos;s a happy hour for every taste 
            and budget across Adliya, Juffair, Seef, and Bahrain Bay.
          </p>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Happy Hour Spots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue, index) => (
              <div 
                key={venue.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-purple-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {venue.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                    <span className="text-purple-400 font-medium">{venue.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{venue.timing}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{venue.deals}</p>
                <p className="text-gray-400 text-sm mb-3">Vibe: {venue.vibe}</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <DollarSign className="w-4 h-4" /> {venue.priceRange}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Happy Hour by Area</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">🎨 Adliya</h3>
              <p className="text-gray-300 mb-2">
                Bahrain&apos;s creative hub offers a diverse happy hour scene. Block 338 is home to 
                Calexico, JJ&apos;s, and numerous wine bars. The Gulf Hotel complex has Sherlock Holmes 
                and other options. Relaxed vibes, walkable from bar to bar.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">🏙️ Bahrain Bay & Seef</h3>
              <p className="text-gray-300 mb-2">
                Upscale happy hours at five-star hotels. Four Seasons offers Zuma, CUT, and Bahri Bar 
                with stunning views. Ritz-Carlton has Trader Vic&apos;s. More expensive but premium 
                experiences with business and expat crowds.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">🎉 Juffair</h3>
              <p className="text-gray-300 mb-2">
                The party district has numerous bars with competitive happy hour deals. More casual, 
                younger crowd. Many bars extend happy hours on quieter nights. Great for bar-hopping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Happy Hour Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-2">📅 Best Days</h3>
              <p className="text-gray-300 text-sm">
                Sunday through Wednesday typically has the best deals as bars try to attract 
                mid-week crowds. Thursday is busy but still has happy hours before nightlife kicks in.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-2">⏰ Timing</h3>
              <p className="text-gray-300 text-sm">
                Arrive early for the best seats, especially at waterfront venues. Happy hours 
                end promptly — order your last discounted drink before cut-off time.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-2">📱 Follow Social Media</h3>
              <p className="text-gray-300 text-sm">
                Bars frequently update their deals on Instagram. Some offer flash happy hours 
                or extended deals announced via social media. Follow your favorites.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-2">🍿 Bar Bites</h3>
              <p className="text-gray-300 text-sm">
                Many happy hours include discounted food. Bar snacks, sliders, and appetizers 
                are often half-price. Makes for a cheap early dinner with drinks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Nightlife</h2>
          <p className="text-gray-400 mb-8">Discover more things to do in Bahrain</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/live-music-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Live Music →
            </Link>
            <Link href="/guides/nightlife" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Nightlife Guide →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Browse All Bars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
