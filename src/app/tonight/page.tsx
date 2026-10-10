import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import {
  Moon, Calendar, MapPin, Clock, Star, Film,
  Music, Utensils, PartyPopper, ArrowRight, Wine,
  Tv2, Users, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { parseDate, toISODateString, BAHRAIN_TIMEZONE } from '@/lib/utils/date';

export const metadata: Metadata = {
  title: 'Tonight in Bahrain — What to Do Tonight in Bahrain 2026',
  description: 'Discover what\'s happening tonight in Bahrain! From evening events and dinner spots to clubs, bars, and movies. Your complete guide to tonight in Bahrain.',
  keywords: [
    'tonight in Bahrain', 'what to do tonight in Bahrain', 'Bahrain tonight',
    'Bahrain nightlife tonight', 'events tonight Bahrain', 'things to do tonight Manama',
    'Bahrain evening activities', ' Bahrain night out', 'where to go tonight Bahrain',
    'Bahrain dinner tonight', 'Bahrain club tonight'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/tonight',
  },
  openGraph: {
    title: 'Tonight in Bahrain — What to Do Tonight',
    description: 'Discover evening events, dinner spots, clubs, bars, and movies happening tonight in Bahrain.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/tonight',
    siteName: 'Bahrain Nights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-tonight.jpg',
        width: 1200,
        height: 630,
        alt: 'Tonight in Bahrain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tonight in Bahrain 2026',
    description: 'The complete guide to what\'s happening in Bahrain tonight.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Get today's date in Bahrain timezone
function getTonightDate() {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long', timeZone: BAHRAIN_TIMEZONE });
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', timeZone: BAHRAIN_TIMEZONE
  });
  return {
    iso: toISODateString(today),
    display: dateStr,
    dayName,
  };
}

// Fetch tonight's events
async function getTonightEvents() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const today = getTonightDate();

    const { data } = await supabase
      .from('events')
      .select('id, title, slug, date, time, venue_name, category, cover_url, price')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('date', today.iso)
      .order('time', { ascending: true });

    return data || [];
  } catch {
    return [];
  }
}

// Fetch now showing movies
async function getTonightMovies() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data } = await supabase
      .from('movies')
      .select('id, title, slug, poster_url, genre, rating, duration_minutes')
      .eq('status', 'now_showing')
      .eq('is_now_showing', true)
      .order('display_order', { ascending: true })
      .limit(6);

    return data || [];
  } catch {
    return [];
  }
}

// Fetch featured nightlife venues
async function getNightlifeVenues() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data } = await supabase
      .from('venues')
      .select('id, name, slug, category, area, image_url, rating')
      .in('category', ['nightclub', 'lounge', 'bar', 'pub', 'beach-club'])
      .eq('status', 'approved')
      .order('rating', { ascending: false })
      .limit(8);

    return data || [];
  } catch {
    return [];
  }
}

// Evening dining categories
const diningCategories = [
  {
    label: 'Upscale Dining',
    href: '/places?category=fine-dining',
    emoji: '🍽️',
    desc: 'Fine dining restaurants for a special evening',
  },
  {
    label: 'Casual Eats',
    href: '/places?category=casual-dining',
    emoji: '🍴',
    desc: 'Relaxed spots for a great meal',
  },
  {
    label: 'Hotel Restaurants',
    href: '/places?category=hotel-restaurant',
    emoji: '🏨',
    desc: 'World-class dining in Bahrain\'s top hotels',
  },
  {
    label: 'Seafood',
    href: '/places?category=seafood',
    emoji: '🐟',
    desc: 'Fresh catch from the Arabian Gulf',
  },
];

// Evening activity categories
const eveningActivities = [
  {
    label: 'Nightlife Guide',
    href: '/bahrain-nightlife-guide',
    emoji: '🌙',
    desc: 'Bars, clubs, and party spots in Bahrain',
  },
  {
    label: 'Ladies Nights',
    href: '/ladies-night-bahrain',
    emoji: '👠',
    desc: 'Free drinks and great deals for ladies',
  },
  {
    label: 'Cinema',
    href: '/cinema',
    emoji: '🎬',
    desc: 'Now showing at VOX Cinemas',
  },
  {
    label: 'Beach Clubs',
    href: '/beach-pool-clubs',
    emoji: '🏖️',
    desc: 'Sunset sessions and evening beach vibes',
  },
];

// Category color map
const categoryColors: Record<string, string> = {
  party: 'bg-pink-500/20 text-pink-400',
  concert: 'bg-purple-500/20 text-purple-400',
  brunch: 'bg-orange-500/20 text-orange-400',
  sports: 'bg-green-500/20 text-green-400',
  cultural: 'bg-blue-500/20 text-blue-400',
  family: 'bg-yellow-500/20 text-yellow-400',
  nightlife: 'bg-indigo-500/20 text-indigo-400',
  music: 'bg-cyan-500/20 text-cyan-400',
  food: 'bg-amber-500/20 text-amber-400',
  networking: 'bg-teal-500/20 text-teal-400',
};

function formatTime(time?: string): string {
  if (!time) return '';
  try {
    const [h, m] = time.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  } catch {
    return time;
  }
}

export default async function TonightPage() {
  const [events, movies, venues, tonight] = await Promise.all([
    getTonightEvents(),
    getTonightMovies(),
    getNightlifeVenues(),
    Promise.resolve(getTonightDate()),
  ]);

  const isFriday = tonight.dayName === 'Friday';
  const isSaturday = tonight.dayName === 'Saturday';
  const isThursday = tonight.dayName === 'Thursday';
  const isWeekend = isFriday || isSaturday;

  // Filter to evening events (after 5pm) or all if none
  const eveningEvents = events.filter(e => {
    if (!e.time) return true;
    const hour = parseInt(e.time.split(':')[0], 10);
    return hour >= 17;
  });

  const displayEvents = eveningEvents.length > 0 ? eveningEvents : events;
  const hasEvents = displayEvents.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Tonight in Bahrain', url: 'https://www.bahrainnights.com/tonight' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-4">
              <Moon className="w-4 h-4" />
              {tonight.dayName} Night
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Tonight in{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {tonight.display} — From dinner and drinks to parties and movies,
              here&apos;s what&apos;s happening in Bahrain tonight.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Events Tonight', value: hasEvents ? displayEvents.length : '—', icon: PartyPopper, color: 'text-pink-400' },
              { label: 'Movies Playing', value: movies.length > 0 ? movies.length : '—', icon: Film, color: 'text-yellow-400' },
              { label: 'Venues Open', value: venues.length > 0 ? venues.length : '—', icon: Star, color: 'text-purple-400' },
              { label: isWeekend ? 'Weekend Night!' : 'Weekday Vibe', value: isFriday ? 'Friday' : isSaturday ? 'Saturday' : isThursday ? 'Thursday' : 'Any', icon: Moon, color: 'text-indigo-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5">
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Tonight */}
      {hasEvents ? (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <PartyPopper className="w-6 h-6 text-pink-400" />
                Tonight&apos;s Events
                {eveningEvents.length > 0 && (
                  <span className="text-sm font-normal text-gray-400">(Evening only)</span>
                )}
              </h2>
              <Link
                href="/events"
                className="text-pink-400 hover:text-pink-300 flex items-center gap-1 text-sm font-medium"
              >
                All events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayEvents.slice(0, 9).map((event) => {
                const colorClass = categoryColors[event.category?.toLowerCase() || ''] || 'bg-gray-500/20 text-gray-400';
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden transition-all group border border-white/5 hover:border-white/10"
                  >
                    {event.cover_url && (
                      <div className="aspect-video bg-gray-800 relative overflow-hidden">
                        <Image
                          src={event.cover_url}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold group-hover:text-pink-400 transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        {event.category && (
                          <span className={`text-xs px-2 py-1 rounded shrink-0 ${colorClass}`}>
                            {event.category}
                          </span>
                        )}
                      </div>
                      {event.venue_name && (
                        <p className="text-sm text-gray-400 flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          {event.venue_name}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {event.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(event.time)}
                          </span>
                        )}
                        {event.price && (
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {event.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {displayEvents.length > 9 && (
              <div className="text-center mt-6">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-full font-medium transition-colors"
                >
                  View all {displayEvents.length} events tonight <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* No Events Tonight */
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🌙</div>
            <h2 className="text-2xl font-bold mb-3">No Listed Events Tonight</h2>
            <p className="text-gray-400 mb-6">
              Nothing officially listed for tonight yet — but that doesn&apos;t mean Bahrain is quiet.
              Check out what&apos;s always happening below.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 rounded-full font-medium transition-colors"
            >
              Browse all events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Cinema Section */}
      {movies.length > 0 && (
        <section className="py-12 px-4 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Film className="w-6 h-6 text-yellow-400" />
                Now Showing
                <span className="text-sm font-normal text-gray-400">— VOX Cinemas</span>
              </h2>
              <Link
                href="/cinema"
                className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 text-sm font-medium"
              >
                Full cinema listings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/cinema/${movie.slug}`}
                  className="group"
                >
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden relative mb-2">
                    {movie.poster_url ? (
                      <Image
                        src={movie.poster_url.startsWith('http') ? movie.poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_url}`}
                        alt={movie.title}
                        fill
                        sizes="16vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                      {movie.rating || 'PG'}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {movie.duration_minutes ? `${movie.duration_minutes} min` : ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nightlife Venues */}
      {venues.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Wine className="w-6 h-6 text-purple-400" />
                Venues Open Tonight
              </h2>
              <Link
                href="/lounges-bars"
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium"
              >
                Browse all venues <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {venues.slice(0, 8).map((venue) => (
                <Link
                  key={venue.id}
                  href={`/places/${venue.slug}`}
                  className="group bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden transition-all border border-white/5 hover:border-white/10"
                >
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    {venue.image_url ? (
                      <Image
                        src={venue.image_url}
                        alt={venue.name}
                        fill
                        sizes="25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <Moon className="w-6 h-6 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-purple-400 transition-colors">
                      {venue.name}
                    </h3>
                    {venue.area && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {venue.area}
                      </p>
                    )}
                    {venue.rating && (
                      <p className="text-xs text-yellow-400 mt-1 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {venue.rating}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Evening Dining */}
      <section className="py-12 px-4 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-amber-400" />
            Dinner Tonight
          </h2>
          <p className="text-gray-400 mb-6">Find the perfect spot for an evening meal</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {diningCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-5 transition-all border border-white/5 hover:border-white/10 group"
              >
                <span className="text-3xl mb-3 block">{cat.emoji}</span>
                <h3 className="font-semibold group-hover:text-amber-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Evening Activities */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Moon className="w-6 h-6 text-indigo-400" />
            Ways to Spend Your Evening
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eveningActivities.map((act) => (
              <Link
                key={act.href}
                href={act.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-5 transition-all border border-white/5 hover:border-white/10 group"
              >
                <span className="text-3xl mb-3 block">{act.emoji}</span>
                <h3 className="font-semibold group-hover:text-indigo-400 transition-colors">
                  {act.label}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{act.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bahrain Nightlife Strip */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🌙</div>
          <h2 className="text-3xl font-bold mb-4">The Bahrain Nightlife Experience</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {isWeekend
              ? `Tonight is ${isFriday ? 'Friday' : 'Saturday'} — Bahrain's busiest party night. Juffair and Adliya are buzzing, hotel lounges are packed, and the clubs are getting started.`
              : isThursday
              ? `Thursday nights are the unofficial start of the weekend in Bahrain. The city comes alive as locals and expats head out for dinner, drinks, and dancing.`
              : `Bahrain's nightlife runs every night of the week. Whether you're after a quiet cocktail at a rooftop bar or a late-night dance floor, there's always something on.`
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/bahrain-nightlife-guide"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:opacity-90 transition"
            >
              Full Nightlife Guide
            </Link>
            <Link
              href="/lounges-bars"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition"
            >
              Browse Bars & Lounges
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Tonight in Bahrain',
            description: 'What to do tonight in Bahrain - evening events, dining, nightlife, and movies.',
            url: 'https://www.bahrainnights.com/tonight',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: displayEvents.length,
              itemListElement: displayEvents.slice(0, 10).map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Event',
                  name: event.title,
                  startDate: `${event.date}T${event.time || '18:00'}:00`,
                  location: {
                    '@type': 'Place',
                    name: event.venue_name || 'Bahrain',
                    address: {
                      '@type': 'PostalAddress',
                      addressCountry: 'BH',
                    },
                  },
                  url: `https://www.bahrainnights.com/events/${event.slug}`,
                },
              })),
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
                { '@type': 'ListItem', position: 2, name: 'Tonight in Bahrain', item: 'https://www.bahrainnights.com/tonight' },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
