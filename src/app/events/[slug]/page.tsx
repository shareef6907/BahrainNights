'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Heart, ExternalLink } from 'lucide-react';
import EventHero from '@/components/events/EventHero';
import EventDetails from '@/components/events/EventDetails';
import VenueCard from '@/components/events/VenueCard';
import EventGallery from '@/components/events/EventGallery';
import ShareModal from '@/components/events/ShareModal';
import AddToCalendar from '@/components/events/AddToCalendar';
import SimilarEvents from '@/components/events/SimilarEvents';
import { Event } from '@/components/events/EventCard';

// Mock Data - Featured Event
const featuredEvent = {
  id: '1',
  title: 'Ragheb Alama Live in Concert',
  slug: 'ragheb-alama-live-concert-2025',
  description: `Lebanese superstar Ragheb Alama returns to Bahrain for an unforgettable night of Arabic pop classics and his latest hits. Known for his energetic performances and timeless music, this concert promises to be a highlight of the season.

Join us at the magnificent Al Dana Amphitheatre for an evening filled with:

• Greatest hits spanning three decades
• New songs from his latest album
• Special guest performers
• State-of-the-art sound and lighting
• Premium hospitality options

Ragheb Alama, often called the "King of Romance," has been entertaining audiences across the Arab world for over 30 years. His unique blend of traditional Arabic music with modern pop sensibilities has earned him countless awards and a devoted fan base.

This exclusive Bahrain concert is part of his 2025 World Tour and promises to be one of the most memorable nights of the year.

Don't miss this rare opportunity to experience a true legend of Arabic music live in concert!`,
  image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=800&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop'
  ],
  category: 'Concerts',
  categoryColor: 'bg-purple-500',
  venue: 'Al Dana Amphitheatre',
  venueSlug: 'al-dana-amphitheatre',
  location: 'Bahrain Bay, Manama',
  date: 'January 10, 2025',
  dayOfWeek: 'Friday',
  time: '8:00 PM',
  duration: '3 hours',
  price: 'From BD 25',
  isFree: false,
  priceTiers: [
    { tier: 'Silver', price: 'BD 25' },
    { tier: 'Gold', price: 'BD 45' },
    { tier: 'Platinum', price: 'BD 65' },
    { tier: 'VIP', price: 'BD 85' }
  ],
  ageRestriction: 'All Ages Welcome',
  dressCode: 'Smart Casual',
  tags: ['Arabic Music', 'Live Concert', 'Al Dana', 'Weekend', 'Entertainment'],
  bookingUrl: 'https://example.com/tickets',
  venueDetails: {
    name: 'Al Dana Amphitheatre',
    slug: 'al-dana-amphitheatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=300&fit=crop',
    address: 'Bahrain Bay, Manama, Kingdom of Bahrain',
    phone: '+973 1234 5678',
    latitude: 26.2285,
    longitude: 50.5860
  },
  // ISO dates for calendar
  startDate: '2025-01-10T20:00:00',
  endDate: '2025-01-10T23:00:00'
};

// Similar Events (Same Category)
const similarEvents: Event[] = [
  {
    id: '2',
    title: 'Amr Diab World Tour',
    slug: 'amr-diab-world-tour-2025',
    description: 'The King of Mediterranean Music live in Bahrain',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    category: 'Concerts',
    categoryColor: 'bg-purple-500',
    venue: 'Al Dana Amphitheatre',
    location: 'Bahrain Bay',
    date: 'Jan 24',
    time: '8:30 PM',
    price: 'From BD 35',
    isFree: false
  },
  {
    id: '3',
    title: 'Elissa Live',
    slug: 'elissa-live-2025',
    description: 'Lebanese diva performs her greatest hits',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
    category: 'Concerts',
    categoryColor: 'bg-purple-500',
    venue: 'The Ritz-Carlton',
    location: 'Seef District',
    date: 'Feb 7',
    time: '9:00 PM',
    price: 'From BD 40',
    isFree: false
  },
  {
    id: '4',
    title: 'Jazz Under The Stars',
    slug: 'jazz-under-stars-2025',
    description: 'Open-air jazz festival featuring international artists',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&h=400&fit=crop',
    category: 'Concerts',
    categoryColor: 'bg-purple-500',
    venue: 'Bahrain Fort',
    location: 'Qalat al-Bahrain',
    date: 'Feb 14',
    time: '7:00 PM',
    price: 'From BD 20',
    isFree: false
  },
  {
    id: '5',
    title: 'Bahrain Jazz Fest',
    slug: 'bahrain-jazz-fest-2025',
    description: 'Annual jazz festival with local and international acts',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop',
    category: 'Concerts',
    categoryColor: 'bg-purple-500',
    venue: 'Cultural Hall',
    location: 'Manama',
    date: 'Feb 21',
    time: '6:00 PM',
    price: 'From BD 15',
    isFree: false
  }
];

// More Events This Weekend
const weekendEvents: Event[] = [
  {
    id: '6',
    title: 'Ladies Night at Trader Vics',
    slug: 'ladies-night-trader-vics',
    description: 'Complimentary drinks and live DJ',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&h=400&fit=crop',
    category: 'Nightlife',
    categoryColor: 'bg-indigo-500',
    venue: 'The Ritz-Carlton',
    location: 'Seef District',
    date: 'Jan 10',
    time: '8:00 PM',
    price: 'Free Entry',
    isFree: true
  },
  {
    id: '7',
    title: 'Friday Brunch at Gulf Hotel',
    slug: 'friday-brunch-gulf-hotel',
    description: 'Award-winning international buffet',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    category: 'Dining',
    categoryColor: 'bg-orange-500',
    venue: 'Gulf Hotel',
    location: 'Adliya',
    date: 'Jan 10',
    time: '12:30 PM',
    price: 'From BD 28',
    isFree: false
  },
  {
    id: '8',
    title: 'Art Exhibition Opening',
    slug: 'art-exhibition-opening',
    description: 'Contemporary Bahraini artists showcase',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop',
    category: 'Cultural',
    categoryColor: 'bg-pink-500',
    venue: 'Block 338',
    location: 'Adliya',
    date: 'Jan 11',
    time: '6:00 PM',
    price: 'Free Entry',
    isFree: true
  },
  {
    id: '9',
    title: 'Beach Day Festival',
    slug: 'beach-day-festival',
    description: 'Family fun with water sports and games',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
    category: 'Family',
    categoryColor: 'bg-green-500',
    venue: 'Coral Bay Beach Club',
    location: 'Amwaj Islands',
    date: 'Jan 11',
    time: '10:00 AM',
    price: 'From BD 5',
    isFree: false
  }
];

// Venue Events (More at this venue)
const venueEvents: Event[] = [
  {
    id: '10',
    title: 'Cirque du Soleil',
    slug: 'cirque-du-soleil-bahrain',
    description: 'World-famous acrobatic show comes to Bahrain',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    category: 'Entertainment',
    categoryColor: 'bg-red-500',
    venue: 'Al Dana Amphitheatre',
    location: 'Bahrain Bay',
    date: 'Feb 1',
    time: '7:30 PM',
    price: 'From BD 35',
    isFree: false
  },
  {
    id: '11',
    title: 'Comedy Night Live',
    slug: 'comedy-night-live',
    description: 'Stand-up comedy with international comedians',
    image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=600&h=400&fit=crop',
    category: 'Entertainment',
    categoryColor: 'bg-yellow-500',
    venue: 'Al Dana Amphitheatre',
    location: 'Bahrain Bay',
    date: 'Feb 8',
    time: '8:00 PM',
    price: 'From BD 20',
    isFree: false
  },
  {
    id: '12',
    title: 'Symphony Orchestra',
    slug: 'symphony-orchestra-bahrain',
    description: 'Bahrain Philharmonic performs classical masterpieces',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&h=400&fit=crop',
    category: 'Cultural',
    categoryColor: 'bg-pink-500',
    venue: 'Al Dana Amphitheatre',
    location: 'Bahrain Bay',
    date: 'Feb 15',
    time: '7:00 PM',
    price: 'From BD 15',
    isFree: false
  }
];

export default function EventDetailPage() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const event = featuredEvent;
  const eventUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/events/${event.slug}`
    : `https://bahrainnights.com/events/${event.slug}`;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title,
            description: event.description.slice(0, 200),
            image: event.image,
            startDate: event.startDate,
            endDate: event.endDate,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: event.venueDetails.name,
              address: {
                '@type': 'PostalAddress',
                streetAddress: event.venueDetails.address,
                addressLocality: 'Manama',
                addressCountry: 'BH'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: event.venueDetails.latitude,
                longitude: event.venueDetails.longitude
              }
            },
            offers: event.priceTiers.map(tier => ({
              '@type': 'Offer',
              name: tier.tier,
              price: tier.price.replace('BD ', ''),
              priceCurrency: 'BHD',
              availability: 'https://schema.org/InStock',
              url: event.bookingUrl
            })),
            performer: {
              '@type': 'Person',
              name: 'Ragheb Alama'
            },
            organizer: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com'
            }
          })
        }}
      />

      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        {/* Hero Section */}
        <EventHero
          title={event.title}
          image={event.image}
          category={event.category}
          categoryColor={event.categoryColor}
          venue={event.venue}
          venueSlug={event.venueSlug}
          date={event.date}
          time={event.time}
          price={event.price}
          onShareClick={() => setShareModalOpen(true)}
        />

        {/* Action Bar */}
        <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={event.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all"
                >
                  <Ticket className="w-5 h-5" />
                  <span>Book Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <AddToCalendar
                  title={event.title}
                  description={event.description.slice(0, 200)}
                  location={`${event.venue}, ${event.location}`}
                  startDate={event.startDate}
                  endDate={event.endDate}
                />
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-xl border transition-all ${
                    isSaved
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-yellow-400/50'
                  }`}
                  aria-label={isSaved ? 'Remove from saved' : 'Save event'}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="hidden sm:flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-yellow-400/50 transition-all"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - 65% */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Details */}
              <EventDetails
                description={event.description}
                date={event.date}
                dayOfWeek={event.dayOfWeek}
                time={event.time}
                duration={event.duration}
                priceTiers={event.priceTiers}
                ageRestriction={event.ageRestriction}
                dressCode={event.dressCode}
                tags={event.tags}
              />

              {/* Image Gallery */}
              <EventGallery images={event.images} title={event.title} />

              {/* More Events at This Venue */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  More Events at {event.venue}
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {venueEvents.map((venueEvent, index) => (
                    <div key={venueEvent.id} className="flex-shrink-0 w-[250px]">
                      <motion.a
                        href={`/events/${venueEvent.slug}`}
                        className="block group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                          <img
                            src={venueEvent.image}
                            alt={venueEvent.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                            {venueEvent.date}
                          </div>
                        </div>
                        <h3 className="font-medium text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {venueEvent.title}
                        </h3>
                        <p className="text-sm text-gray-400">{venueEvent.time}</p>
                      </motion.a>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - 35% */}
            <div className="space-y-6">
              {/* Venue Card */}
              <VenueCard
                name={event.venueDetails.name}
                slug={event.venueDetails.slug}
                image={event.venueDetails.image}
                address={event.venueDetails.address}
                phone={event.venueDetails.phone}
                latitude={event.venueDetails.latitude}
                longitude={event.venueDetails.longitude}
              />
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="mt-16 space-y-8">
            {/* Similar Events */}
            <SimilarEvents
              title="Similar Events You May Like"
              events={similarEvents}
            />

            {/* More This Weekend */}
            <SimilarEvents
              title="More Events This Weekend"
              events={weekendEvents}
            />
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm text-gray-400">Starting from</p>
              <p className="text-xl font-bold text-yellow-400">{event.price}</p>
            </div>
            <a
              href={event.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold"
            >
              <Ticket className="w-5 h-5" />
              Book Now
            </a>
          </div>
        </div>

        {/* Share Modal */}
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={event.title}
          url={eventUrl}
        />

        {/* Bottom padding for mobile sticky bar */}
        <div className="h-24 lg:hidden" />
      </div>
    </>
  );
}
