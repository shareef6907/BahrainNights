import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  Calendar, Clock, MapPin, Music, Wine, Utensils, 
  PartyPopper, Mic2, Star, Sparkles, ArrowRight,
  Users, Ticket
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

// Force dynamic - content changes daily
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Get today's date for SEO
function getTodayFormatted(): string {
  const today = new Date();
  return today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'Asia/Bahrain'
  });
}

function getTodayDayName(): string {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    timeZone: 'Asia/Bahrain'
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const today = getTodayFormatted();
  const dayName = getTodayDayName();
  
  return {
    title: `What's On in Bahrain Tonight — ${dayName} ${today.split(',')[1]?.trim() || ''} | Events & Nightlife`,
    description: `Find out what's happening in Bahrain tonight! Live events, ladies nights, happy hours, concerts, parties, and things to do in Bahrain ${today}. Updated daily.`,
    keywords: `what's on in bahrain tonight, bahrain tonight, events in bahrain today, things to do in bahrain tonight, bahrain nightlife tonight, ${dayName.toLowerCase()} bahrain, ladies night bahrain, happy hour bahrain`,
    openGraph: {
      title: `What's On in Bahrain Tonight — ${dayName}`,
      description: `Your guide to tonight in Bahrain. Events, parties, ladies nights, happy hours & more.`,
      type: 'website',
      locale: 'en_US',
      url: 'https://www.bahrainnights.com/tonight',
    },
    alternates: {
      canonical: 'https://www.bahrainnights.com/tonight',
    },
  };
}

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface TonightEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string | null;
  category: string | null;
  time: string | null;
  price: string | null;
  image_url: string | null;
}

async function getTonightEvents(): Promise<TonightEvent[]> {
  if (!supabaseUrl || !supabaseKey) return [];
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('events')
    .select('id, title, slug, venue_name, category, time, price, image_url')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('date', today)
    .order('time', { ascending: true })
    .limit(20);
    
  if (error) {
    console.error('Error fetching tonight events:', error);
    return [];
  }
  
  return data || [];
}

// Weekly recurring events
const weeklyEvents: Record<string, Array<{
  name: string;
  venue: string;
  time: string;
  type: string;
  description: string;
  link?: string;
}>> = {
  'Sunday': [
    { name: 'Sunday Funday Brunch', venue: 'Various Hotels', time: '12:00 PM', type: 'brunch', description: 'Relaxed Sunday brunches across the island' },
    { name: 'Quiz Night', venue: 'JJ\'s Irish Pub', time: '8:00 PM', type: 'entertainment', description: 'Weekly pub quiz with prizes' },
  ],
  'Monday': [
    { name: 'Industry Night', venue: 'Various Bars', time: '9:00 PM', type: 'nightlife', description: 'Hospitality workers specials' },
    { name: 'Open Mic Night', venue: 'The Wembley', time: '8:00 PM', type: 'entertainment', description: 'Live music and comedy' },
  ],
  'Tuesday': [
    { name: 'Taco Tuesday', venue: 'Multiple Venues', time: '6:00 PM', type: 'dining', description: 'Taco specials across Bahrain' },
    { name: 'Ladies Night', venue: 'Calexico', time: '8:00 PM', type: 'ladies-night', description: 'Free drinks for ladies' },
  ],
  'Wednesday': [
    { name: 'Wine Wednesday', venue: 'Various Restaurants', time: '6:00 PM', type: 'dining', description: 'Wine promotions and pairings' },
    { name: 'Ladies Night', venue: 'Sass Cafe', time: '8:00 PM', type: 'ladies-night', description: 'Complimentary drinks for ladies' },
  ],
  'Thursday': [
    { name: 'Comedy Night', venue: 'The Gulf Hotel - Comedy Club', time: '9:00 PM', type: 'entertainment', description: 'Weekly stand-up comedy', link: '/guides/comedy-shows' },
    { name: 'Ladies Night (Biggest of the Week)', venue: 'Most Hotel Bars', time: '8:00 PM', type: 'ladies-night', description: 'Thursday is THE ladies night in Bahrain', link: '/guides/ladies-night' },
    { name: 'Pre-Weekend Party', venue: 'Block 338 & Adliya', time: '10:00 PM', type: 'nightlife', description: 'The weekend starts early' },
  ],
  'Friday': [
    { name: 'Friday Brunch', venue: 'All Major Hotels', time: '12:30 PM', type: 'brunch', description: 'The legendary Friday brunch tradition', link: '/guides/brunch' },
    { name: 'Pool Parties', venue: 'Beach Clubs', time: '12:00 PM', type: 'pool-party', description: 'Daytime pool parties' },
    { name: 'Live Music', venue: 'Various Venues', time: '9:00 PM', type: 'entertainment', description: 'Live bands and DJs' },
  ],
  'Saturday': [
    { name: 'Saturday Brunch', venue: 'Select Hotels', time: '1:00 PM', type: 'brunch', description: 'Relaxed Saturday brunches' },
    { name: 'Club Night', venue: 'Coral Bay & Block 338', time: '11:00 PM', type: 'nightlife', description: 'Peak club night' },
    { name: 'Live Entertainment', venue: 'Hotel Lounges', time: '8:00 PM', type: 'entertainment', description: 'Live music and performances' },
  ],
};

// Happy hour venues (always on)
const happyHourVenues = [
  { name: 'The Wembley', area: 'Adliya', hours: '4-8 PM', deal: '50% off drinks' },
  { name: 'JJ\'s Irish Pub', area: 'Adliya', hours: '4-7 PM', deal: 'Buy 1 Get 1' },
  { name: 'Coda Jazz Lounge', area: 'Adliya', hours: '5-8 PM', deal: 'Cocktail specials' },
  { name: 'Trader Vic\'s', area: 'Various', hours: '5-7 PM', deal: 'Mai Tai specials' },
];

export default async function TonightPage() {
  const events = await getTonightEvents();
  const dayName = getTodayDayName();
  const todayFormatted = getTodayFormatted();
  const todaysRecurring = weeklyEvents[dayName] || [];
  
  // Determine time of day for personalized greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'This Morning' : hour < 17 ? 'This Afternoon' : 'Tonight';
  
  const categoryIcons: Record<string, typeof Music> = {
    'music': Music,
    'concert': Music,
    'concerts': Music,
    'nightlife': PartyPopper,
    'comedy': Mic2,
    'dining': Utensils,
    'brunch': Utensils,
    'ladies-night': Users,
    'entertainment': Star,
    'pool-party': Sparkles,
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Tonight', url: 'https://www.bahrainnights.com/tonight' },
        ]}
      />
      
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-purple-300 text-sm font-medium mb-4 border border-purple-500/30">
              🌙 Updated Live • {todayFormatted}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                What's On {greeting}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your guide to everything happening in Bahrain {dayName.toLowerCase()}. 
              Events, parties, happy hours, ladies nights, live music, and more.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
              <span className="text-2xl font-bold text-purple-400">{events.length}</span>
              <span className="text-gray-400 ml-2">Special Events</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
              <span className="text-2xl font-bold text-pink-400">{todaysRecurring.length}</span>
              <span className="text-gray-400 ml-2">{dayName} Regulars</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
              <span className="text-2xl font-bold text-orange-400">{happyHourVenues.length}+</span>
              <span className="text-gray-400 ml-2">Happy Hours</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Special Events Tonight */}
      {events.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Ticket className="w-6 h-6 text-purple-400" />
              Special Events Tonight
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => {
                const Icon = categoryIcons[event.category?.toLowerCase() || ''] || Star;
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                          {event.title}
                        </h3>
                        {event.venue_name && (
                          <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.venue_name}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          {event.time && (
                            <span className="text-purple-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          )}
                          {event.price && (
                            <span className="text-green-400">{event.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* What's Happening on {DayName} */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-pink-400" />
            Every {dayName} in Bahrain
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            These events and deals happen every {dayName}. No tickets needed for most — just show up!
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {todaysRecurring.map((event, idx) => {
              const Icon = categoryIcons[event.type] || Star;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{event.name}</h3>
                      <p className="text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </p>
                      <p className="text-pink-400 flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </p>
                      <p className="text-gray-300 text-sm mt-2">{event.description}</p>
                      {event.link && (
                        <Link href={event.link} className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-flex items-center gap-1">
                          Learn more <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {todaysRecurring.length === 0 && (
            <p className="text-gray-500 text-center py-8">Check back later for {dayName} events.</p>
          )}
        </div>
      </section>
      
      {/* Happy Hours */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Wine className="w-6 h-6 text-orange-400" />
            Happy Hours Tonight
          </h2>
          <p className="text-gray-400 mb-8">
            Best happy hour deals happening right now in Bahrain.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {happyHourVenues.map((venue, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-5"
              >
                <h3 className="font-bold text-white">{venue.name}</h3>
                <p className="text-gray-400 text-sm">{venue.area}</p>
                <p className="text-orange-400 font-semibold mt-2">{venue.hours}</p>
                <p className="text-gray-300 text-sm mt-1">{venue.deal}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/guides/happy-hour-bahrain"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-xl hover:bg-orange-500/30 transition-colors"
            >
              View All Happy Hours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Quick Links */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">More to Explore Tonight</h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Ladies Night Deals', href: '/guides/ladies-night', emoji: '👠', color: 'from-pink-500 to-rose-500' },
              { title: 'Live Music', href: '/guides/live-music-bahrain', emoji: '🎸', color: 'from-purple-500 to-indigo-500' },
              { title: 'Nightlife Guide', href: '/bahrain-nightlife-guide', emoji: '🌙', color: 'from-indigo-500 to-purple-500' },
              { title: 'Best Restaurants', href: '/best-restaurants-bahrain', emoji: '🍽️', color: 'from-orange-500 to-red-500' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`bg-gradient-to-br ${link.color} bg-opacity-20 rounded-xl p-6 text-center hover:scale-105 transition-transform`}
                style={{ background: `linear-gradient(135deg, ${link.color.includes('pink') ? 'rgba(236,72,153,0.2)' : link.color.includes('purple') ? 'rgba(139,92,246,0.2)' : link.color.includes('indigo') ? 'rgba(99,102,241,0.2)' : 'rgba(249,115,22,0.2)'}, transparent)` }}
              >
                <span className="text-4xl mb-3 block">{link.emoji}</span>
                <h3 className="font-bold text-white">{link.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* SEO Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2>What's On in Bahrain Tonight?</h2>
          <p>
            Looking for things to do in Bahrain tonight? You're in the right place. BahrainNights.com 
            is your daily guide to what's happening across the Kingdom — from special events and concerts 
            to the best happy hours, ladies nights, and nightlife spots.
          </p>
          
          <h3>Tonight's Highlights</h3>
          <p>
            Every night in Bahrain offers something different. {dayName}s are known for{' '}
            {dayName === 'Thursday' 
              ? 'being THE night for ladies nights and pre-weekend parties. Most hotel bars offer free drinks for ladies, and the clubs start filling up early.'
              : dayName === 'Friday'
              ? 'legendary Friday brunches during the day and live music in the evening. It\'s the weekend, and Bahrain knows how to celebrate.'
              : dayName === 'Saturday'
              ? 'peak nightlife action. The clubs are packed, live entertainment is everywhere, and the party goes late.'
              : dayName === 'Wednesday'
              ? 'wine promotions and mid-week ladies nights. A great night to get out without the weekend crowds.'
              : 'a more relaxed vibe, perfect for catching up with friends over happy hour drinks or trying a new restaurant.'
            }
          </p>
          
          <h3>Best Areas for Nightlife in Bahrain</h3>
          <ul>
            <li><strong>Adliya (Block 338)</strong> — The heart of Bahrain's nightlife with bars, clubs, and lounges</li>
            <li><strong>Juffair</strong> — Popular with expats, great bar scene</li>
            <li><strong>Seef</strong> — Hotel bars and upscale lounges</li>
            <li><strong>Amwaj Islands</strong> — Beach clubs and waterfront dining</li>
          </ul>
          
          <p>
            Bookmark this page and check back every day to see what's on in Bahrain tonight. 
            We update our listings continuously to make sure you never miss out.
          </p>
        </div>
      </section>
      
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `What's On in Bahrain Tonight — ${dayName}`,
            description: `Find out what's happening in Bahrain tonight. Events, parties, happy hours, and nightlife for ${todayFormatted}.`,
            url: 'https://www.bahrainnights.com/tonight',
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            dateModified: new Date().toISOString(),
          }),
        }}
      />
    </div>
  );
}
