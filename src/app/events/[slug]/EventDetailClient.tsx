'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Ticket, Heart, ExternalLink, MapPin, Phone, Mail, Globe, Building2 } from 'lucide-react';
import EventHero from '@/components/events/EventHero';
import EventDetails from '@/components/events/EventDetails';
import EventGallery from '@/components/events/EventGallery';
import ShareModal from '@/components/events/ShareModal';
import AddToCalendar from '@/components/events/AddToCalendar';
import SimilarEvents from '@/components/events/SimilarEvents';
import { Event } from '@/components/events/EventCard';

interface HostedByVenue {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  bookingUrl: string | null;
}

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
  hostedByVenue: HostedByVenue | null;
  venueDetails: {
    name: string;
    slug: string;
    image: string;
    address: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    website?: string;
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
              {/* Hosted By Venue Section */}
              {event.hostedByVenue && (
                <motion.div
                  className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-yellow-400" />
                    Hosted By
                  </h3>
                  <Link
                    href={`/places/${event.hostedByVenue.slug}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                      {event.hostedByVenue.logo ? (
                        <Image
                          src={event.hostedByVenue.logo}
                          alt={event.hostedByVenue.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {event.hostedByVenue.name}
                      </p>
                      <p className="text-sm text-yellow-400/80">View venue profile →</p>
                    </div>
                  </Link>

                  {/* Contact Info */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    {event.hostedByVenue.phone && (
                      <a
                        href={`tel:${event.hostedByVenue.phone}`}
                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{event.hostedByVenue.phone}</span>
                      </a>
                    )}
                    {event.hostedByVenue.email && (
                      <a
                        href={`mailto:${event.hostedByVenue.email}`}
                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{event.hostedByVenue.email}</span>
                      </a>
                    )}
                    {event.hostedByVenue.website && (
                      <a
                        href={event.hostedByVenue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Globe className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Book via Venue Button */}
                  {event.hostedByVenue.bookingUrl && (
                    <a
                      href={event.hostedByVenue.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                    >
                      <Ticket className="w-4 h-4" />
                      Book via Venue
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              )}

              {/* Location Section */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Location</h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venueDetails.name + ', Bahrain')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors group"
                >
                  <div className="p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                      {event.venueDetails.name}
                    </p>
                    {event.venueDetails.address && event.venueDetails.address !== event.venueDetails.name && (
                      <p className="text-sm text-gray-400">{event.venueDetails.address}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Click to open in Google Maps</p>
                  </div>
                </a>

                {/* Contact info for non-venue events */}
                {!event.hostedByVenue && (event.venueDetails.phone || event.venueDetails.email) && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    {event.venueDetails.phone && (
                      <a
                        href={`tel:${event.venueDetails.phone}`}
                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{event.venueDetails.phone}</span>
                      </a>
                    )}
                    {event.venueDetails.email && (
                      <a
                        href={`mailto:${event.venueDetails.email}`}
                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{event.venueDetails.email}</span>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
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
