import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  Calendar, MapPin, Clock, Ticket, Star,
  ArrowRight, Music, PartyPopper, Film, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Events in Bahrain This Weekend | What\'s On Friday & Saturday',
  description: 'Find events happening in Bahrain this weekend! Discover parties, concerts, brunches, movies, and activities. Your complete guide to what\'s on in Bahrain this Friday & Saturday.',
  keywords: 'events in Bahrain this weekend, what to do in Bahrain this weekend, Bahrain weekend events, Bahrain Friday events, things to do Bahrain weekend, weekend activities Bahrain',
  openGraph: {
    title: 'Events in Bahrain This Weekend | What\'s On Friday & Saturday',
    description: 'Your guide to events happening in Bahrain this weekend - parties, concerts, brunches, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/events/this-weekend',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/events/this-weekend',
  },
};

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Get weekend dates
function getWeekendDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // In Bahrain, weekend is Friday-Saturday
  // Calculate days until Friday (5)
  let daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  if (daysUntilFriday === 0 && today.getHours() >= 18) {
    // If it's Friday evening, show this weekend
    daysUntilFriday = 0;
  } else if (dayOfWeek === 6) {
    // If it's Saturday, still show this weekend
    daysUntilFriday = -1;
  }
  
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysUntilFriday);
  friday.setHours(0, 0, 0, 0);
  
  const saturday = new Date(friday);
  saturday.setDate(friday.getDate() + 1);
  
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  
  return {
    friday: friday.toISOString().split('T')[0],
    saturday: saturday.toISOString().split('T')[0],
    endOfWeekend: sunday.toISOString().split('T')[0],
    displayFriday: friday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    displaySaturday: saturday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

// Fetch weekend events
async function getWeekendEvents() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { friday, endOfWeekend } = getWeekendDates();

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, slug, date, time, venue_name, category, image_url, price')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .gte('date', friday)
    .lt('date', endOfWeekend)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    console.error('Error fetching weekend events:', error);
    return [];
  }

  return events || [];
}

// Event card component
function EventCard({ event }: { event: { id: string; title: string; slug: string; date: string; time?: string; venue_name?: string; category?: string; image_url?: string; price?: string } }) {
  const eventDate = new Date(event.date);
  const dayName = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = eventDate.getDate();
  
  const categoryColors: Record<string, string> = {
    party: 'bg-pink-500/20 text-pink-400',
    concert: 'bg-purple-500/20 text-purple-400',
    brunch: 'bg-orange-500/20 text-orange-400',
    sports: 'bg-green-500/20 text-green-400',
    cultural: 'bg-blue-500/20 text-blue-400',
    family: 'bg-yellow-500/20 text-yellow-400',
    nightlife: 'bg-indigo-500/20 text-indigo-400',
  };
  
  const colorClass = categoryColors[event.category?.toLowerCase() || ''] || 'bg-gray-500/20 text-gray-400';

  return (
    <Link 
      href={`/events/${event.slug}`}
      className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all group"
    >
      <div className="flex">
        <div className="w-20 bg-gradient-to-b from-yellow-500/20 to-orange-500/20 flex flex-col items-center justify-center p-3">
          <span className="text-xs text-gray-400 uppercase">{dayName}</span>
          <span className="text-2xl font-bold">{dayNum}</span>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold group-hover:text-yellow-400 transition-colors line-clamp-1">
                {event.title}
              </h3>
              {event.venue_name && (
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {event.venue_name}
                </p>
              )}
            </div>
            {event.category && (
              <span className={`text-xs px-2 py-1 rounded shrink-0 ${colorClass}`}>
                {event.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            {event.time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.time}
              </span>
            )}
            {event.price && (
              <span className="flex items-center gap-1">
                <Ticket className="w-3 h-3" />
                {event.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Suggestions for when there are no events
const weekendSuggestions = [
  {
    title: 'Friday Brunch',
    description: 'Bahrain\'s legendary Friday brunches at top hotels',
    href: '/guides/brunches',
    icon: '🥂',
  },
  {
    title: 'Beach Day',
    description: 'Hit the beach clubs and pool parties',
    href: '/guides/beach-clubs',
    icon: '🏖️',
  },
  {
    title: 'Nightlife',
    description: 'Explore Bahrain\'s vibrant club scene',
    href: '/guides/nightlife',
    icon: '🌙',
  },
  {
    title: 'Movies',
    description: 'Catch the latest films at VOX Cinemas',
    href: '/cinema',
    icon: '🎬',
  },
  {
    title: 'Family Fun',
    description: 'Kid-friendly activities and attractions',
    href: '/family-kids',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    title: 'Explore Places',
    description: 'Visit attractions and landmarks',
    href: '/guides/places-to-visit',
    icon: '🗺️',
  },
];

export default async function WeekendEventsPage() {
  const events = await getWeekendEvents();
  const dates = getWeekendDates();
  
  // Separate events by day
  const fridayEvents = events.filter(e => e.date === dates.friday);
  const saturdayEvents = events.filter(e => e.date === dates.saturday);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Events', url: 'https://www.bahrainnights.com/events' },
          { name: 'This Weekend', url: 'https://www.bahrainnights.com/events/this-weekend' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              🎉 This Weekend
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Events in{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Bahrain
              </span>
              {' '}This Weekend
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {dates.displayFriday} – {dates.displaySaturday}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total Events', value: events.length.toString(), icon: Calendar },
              { label: 'Friday', value: fridayEvents.length.toString(), icon: PartyPopper },
              { label: 'Saturday', value: saturdayEvents.length.toString(), icon: Music },
              { label: 'Categories', value: new Set(events.map(e => e.category)).size.toString(), icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {events.length > 0 ? (
        <>
          {/* Friday Events */}
          {fridayEvents.length > 0 && (
            <section className="py-12 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  Friday Events
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    {dates.displayFriday}
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {fridayEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Saturday Events */}
          {saturdayEvents.length > 0 && (
            <section className="py-12 px-4 bg-black/30">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  Saturday Events
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    {dates.displaySaturday}
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {saturdayEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* No Events - Show Suggestions */
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold mb-4">No Listed Events This Weekend</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Don&apos;t worry — there&apos;s still plenty to do! Check out our guides for weekend ideas.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {weekendSuggestions.map((suggestion) => (
                <Link
                  key={suggestion.href}
                  href={suggestion.href}
                  className="bg-white/5 hover:bg-white/10 rounded-xl p-6 text-left transition-all group"
                >
                  <span className="text-3xl mb-3 block">{suggestion.icon}</span>
                  <h3 className="font-bold mb-1 group-hover:text-yellow-400 transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-gray-400">{suggestion.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Planning Ahead?</h2>
          <p className="text-gray-300 mb-8">
            Browse all upcoming events or check out our guides for more ideas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
            >
              All Events
            </Link>
            <Link 
              href="/calendar"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Events Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Weekend Ideas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Friday Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Best Parties', href: '/guides/parties', emoji: '🎉' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-yellow-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
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
            name: 'Events in Bahrain This Weekend',
            description: 'Find events happening in Bahrain this weekend - parties, concerts, brunches, and more.',
            url: 'https://bahrainnights.com/events/this-weekend',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: events.length,
              itemListElement: events.slice(0, 10).map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Event',
                  name: event.title,
                  startDate: event.date,
                  location: {
                    '@type': 'Place',
                    name: event.venue_name || 'Bahrain',
                  },
                  url: `https://bahrainnights.com/events/${event.slug}`,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
