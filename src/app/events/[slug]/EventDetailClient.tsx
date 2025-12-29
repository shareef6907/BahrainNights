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

interface EventData {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  category: string;
  categoryColor: string;
  venue: string;
  venueSlug: string;
  location: string;
  date: string;
  dayOfWeek: string;
  time: string;
  duration: string;
  price: string;
  isFree: boolean;
  priceTiers: { tier: string; price: string }[];
  ageRestriction: string;
  dressCode: string;
  tags: string[];
  bookingUrl: string | null;
  sourceUrl: string | null;
  venueDetails: {
    name: string;
    slug: string;
    image: string;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
  };
  startDate: string;
  endDate: string;
}

interface EventDetailClientProps {
  event: EventData;
  similarEvents: Event[];
}

export default function EventDetailClient({ event, similarEvents }: EventDetailClientProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
            offers: event.priceTiers.length > 0 ? event.priceTiers.map(tier => ({
              '@type': 'Offer',
              name: tier.tier,
              price: tier.price.replace('BD ', '').replace(/[^0-9.]/g, '') || '0',
              priceCurrency: 'BHD',
              availability: 'https://schema.org/InStock',
              url: event.bookingUrl
            })) : undefined,
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
                {/* Show Book Now if booking_url exists, View Event if source_url exists, hide if neither */}
                {event.bookingUrl ? (
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
                ) : event.sourceUrl ? (
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all"
                  >
                    <Ticket className="w-5 h-5" />
                    <span>View Event</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}

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
              {event.images.length > 0 && (
                <EventGallery images={event.images} title={event.title} />
              )}
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
          {similarEvents.length > 0 && (
            <div className="mt-16 space-y-8">
              {/* Similar Events */}
              <SimilarEvents
                title="Similar Events You May Like"
                events={similarEvents}
              />
            </div>
          )}
        </div>

        {/* Mobile Sticky Bottom Bar - only show if there's a URL */}
        {(event.bookingUrl || event.sourceUrl) && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
            <div className="flex items-center justify-center gap-3">
              {event.bookingUrl ? (
                <a
                  href={event.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold w-full justify-center"
                >
                  <Ticket className="w-5 h-5" />
                  Book Now
                </a>
              ) : (
                <a
                  href={event.sourceUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold w-full justify-center"
                >
                  <Ticket className="w-5 h-5" />
                  View Event
                </a>
              )}
            </div>
          </div>
        )}

        {/* Share Modal */}
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={event.title}
          url={eventUrl}
        />

        {/* Bottom padding for mobile sticky bar */}
        {(event.bookingUrl || event.sourceUrl) && (
          <div className="h-24 lg:hidden" />
        )}
      </div>
    </>
  );
}
