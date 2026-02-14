'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Navigation, MessageCircle } from 'lucide-react';
import PlaceHero from './PlaceHero';
import PlaceActionBar from './PlaceActionBar';
import PlaceInfo from './PlaceInfo';
import PlaceGallery from './PlaceGallery';
import PlaceFeatures from './PlaceFeatures';
import PlaceOffers from './PlaceOffers';
import PlaceHours from './PlaceHours';
import PlaceEvents from './PlaceEvents';
import SimilarPlaces from './SimilarPlaces';
import PlaceShareModal from './PlaceShareModal';
import PlaceYouTubeVideo from './PlaceYouTubeVideo';
import PlaceReels, { VenueReel } from './PlaceReels';
import CrossPromoServices from '@/components/CrossPromoServices';
import type { Venue } from '@/types/database';
import type { Place, OpeningHours } from './PlaceCard';

interface VenueEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  image: string;
  category: string;
}

interface VenueOffer {
  id: string;
  title: string;
  day: string;
  description: string;
  validUntil?: string;
  type?: 'ladies-night' | 'happy-hour' | 'brunch' | 'special';
}

interface PlaceDetailPageContentProps {
  venue: Venue;
  similarVenues: Venue[];
  events?: VenueEvent[];
  offers?: VenueOffer[];
  reels?: VenueReel[];
}

const categoryColors: Record<string, string> = {
  restaurant: 'bg-orange-500',
  cafe: 'bg-amber-600',
  lounge: 'bg-purple-500',
  bar: 'bg-blue-500',
  nightclub: 'bg-pink-500',
  'beach-club': 'bg-cyan-500',
  hotel: 'bg-indigo-500',
  spa: 'bg-teal-500',
  fitness: 'bg-green-500',
  entertainment: 'bg-red-500',
};

const categoryLabels: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  lounge: 'Lounge',
  bar: 'Bar',
  nightclub: 'Nightclub',
  'beach-club': 'Beach Club',
  hotel: 'Hotel',
  spa: 'Spa',
  fitness: 'Fitness',
  entertainment: 'Entertainment',
};

// Convert database venue to Place type for SimilarPlaces component
function venueToPlace(venue: Venue): Place {
  // Extract hideHours from opening_hours if it exists
  const openingHours = (venue.opening_hours as OpeningHours & { hideHours?: boolean }) || {};
  const hideHours = openingHours.hideHours === true;

  return {
    id: venue.id,
    name: venue.name,
    slug: venue.slug,
    category: venue.category,
    subcategory: venue.subcategories || [],
    description: venue.description || '',
    address: venue.address,
    area: venue.area,
    latitude: venue.latitude || 0,
    longitude: venue.longitude || 0,
    phone: venue.phone || undefined,
    email: venue.email || undefined,
    website: venue.website || undefined,
    instagram: venue.instagram || undefined,
    openingHours: openingHours,
    hideHours: hideHours,
    features: venue.features || [],
    images: venue.cover_image_url
      ? [venue.cover_image_url, ...(venue.gallery || [])]
      : (venue.gallery || []),
    logo: venue.logo_url || '',
    upcomingEventsCount: 0,
  };
}

export default function PlaceDetailPageContent({ venue, similarVenues, events = [], offers = [], reels = [] }: PlaceDetailPageContentProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Parse opening hours from JSON
  const { openingHours, hideHours } = useMemo(() => {
    let hours: OpeningHours = {};
    if (!venue.opening_hours) return { openingHours: hours, hideHours: false };
    if (typeof venue.opening_hours === 'string') {
      try {
        hours = JSON.parse(venue.opening_hours);
      } catch {
        return { openingHours: {}, hideHours: false };
      }
    } else {
      hours = venue.opening_hours as OpeningHours;
    }
    // Extract hideHours flag from the opening_hours object
    const hideHoursFlag = (hours as Record<string, unknown>).hideHours === true;
    return { openingHours: hours, hideHours: hideHoursFlag };
  }, [venue.opening_hours]);

  // Calculate if open now and today's hours
  const { isOpen, todayHours } = useMemo(() => {
    // If hours are hidden, don't show open/closed status
    if (hideHours) {
      return { isOpen: null, todayHours: null };
    }

    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[now.getDay()];
    const hours = openingHours[today];

    if (!hours || hours === 'closed') {
      return { isOpen: false, todayHours: 'Closed today' };
    }

    if (typeof hours !== 'object' || !hours.open || !hours.close) {
      return { isOpen: false, todayHours: 'Hours not available' };
    }

    const currentTime = now.getHours() * 100 + now.getMinutes();
    const openTime = parseInt(hours.open.replace(':', ''));
    const closeTime = parseInt(hours.close.replace(':', ''));

    const formatTime = (time: string) => {
      if (!time || !time.includes(':')) return 'N/A';
      const [h, m] = time.split(':').map(Number);
      if (isNaN(h) || isNaN(m)) return 'N/A';
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHours = h % 12 || 12;
      return `${displayHours}:${m.toString().padStart(2, '0')} ${period}`;
    };

    let isCurrentlyOpen = false;
    if (closeTime < openTime) {
      isCurrentlyOpen = currentTime >= openTime || currentTime <= closeTime;
    } else {
      isCurrentlyOpen = currentTime >= openTime && currentTime <= closeTime;
    }

    return {
      isOpen: isCurrentlyOpen,
      todayHours: `${formatTime(hours.open)} - ${formatTime(hours.close)}`,
    };
  }, [openingHours, hideHours]);

  const placeUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://www.bahrainnights.com/places/${venue.slug}`;

  // Get images for gallery
  const images = venue.gallery && venue.gallery.length > 0
    ? venue.gallery
    : venue.cover_image_url
      ? [venue.cover_image_url]
      : [];

  // Convert similar venues to Place format
  const similarPlaces = similarVenues.map(venueToPlace);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: venue.name,
            description: venue.description?.slice(0, 200) || '',
            image: venue.cover_image_url || images[0],
            url: placeUrl,
            telephone: venue.phone,
            email: venue.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: venue.address,
              addressLocality: venue.area,
              addressCountry: 'BH',
            },
            geo: venue.latitude && venue.longitude ? {
              '@type': 'GeoCoordinates',
              latitude: venue.latitude,
              longitude: venue.longitude,
            } : undefined,
          }),
        }}
      />

      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        {/* Hero Section */}
        <PlaceHero
          name={venue.name}
          category={categoryLabels[venue.category] || venue.category}
          categoryColor={categoryColors[venue.category] || 'bg-gray-500'}
          subcategory={venue.subcategories || []}
          area={venue.area}
          coverImage={venue.cover_image_url || images[0] || '/placeholder-venue.svg'}
          logo={venue.logo_url || '/placeholder-logo.svg'}
          isOpen={isOpen}
          todayHours={todayHours}
          onShareClick={() => setShareModalOpen(true)}
          venueId={venue.id}
        />

        {/* Action Bar */}
        <PlaceActionBar
          phone={venue.phone || undefined}
          whatsapp={venue.whatsapp || undefined}
          latitude={venue.latitude || undefined}
          longitude={venue.longitude || undefined}
          googleMapsUrl={venue.google_maps_url}
          bookingUrl={venue.booking_url || undefined}
          menuUrl={venue.menu_url || undefined}
          instagram={venue.instagram || undefined}
          website={venue.website || undefined}
          name={venue.name}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* 1. Description */}
              <PlaceInfo description={venue.description || 'No description available.'} />

              {/* 2. YouTube Video */}
              {venue.youtube_url && (
                <PlaceYouTubeVideo youtubeUrl={venue.youtube_url} venueName={venue.name} />
              )}

              {/* 3. Photos Gallery */}
              {images.length > 0 && (
                <PlaceGallery images={images} name={venue.name} />
              )}

              {/* 4. Instagram Reels */}
              {reels.length > 0 && (
                <PlaceReels reels={reels} venueName={venue.name} />
              )}

              {/* 5. Features */}
              {venue.features && venue.features.length > 0 && (
                <PlaceFeatures features={venue.features} />
              )}

              {/* 6. Upcoming Events */}
              <PlaceEvents
                events={events.map(e => ({
                  ...e,
                  categoryColor: categoryColors[e.category] || 'bg-purple-500',
                }))}
                venueName={venue.name}
                venueSlug={venue.slug}
              />

              {/* 7. Offers */}
              <PlaceOffers offers={offers} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <PlaceHours
                openingHours={openingHours}
                hideHours={hideHours}
                phone={venue.phone || undefined}
                email={venue.email || undefined}
                website={venue.website || undefined}
                instagram={venue.instagram || undefined}
                facebook={venue.facebook || undefined}
                latitude={venue.latitude}
                longitude={venue.longitude}
                address={venue.address}
                area={venue.area}
                venueName={venue.name}
                googleMapsUrl={venue.google_maps_url}
              />

              {/* Like Count Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3">Popularity</h3>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-red-400">{venue.like_count || 0}</p>
                    <p className="text-gray-400 text-sm">Likes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{venue.view_count || 0}</p>
                    <p className="text-gray-400 text-sm">Views</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Sections */}
          {similarPlaces.length > 0 && (
            <div className="mt-16 space-y-12">
              <SimilarPlaces
                title="Similar Places"
                places={similarPlaces}
                viewAllHref={`/places?category=${venue.category}`}
              />
            </div>
          )}

          {/* Event Production Services */}
          <div className="mt-12">
            <CrossPromoServices context="venue" compact />
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-2">
            {venue.phone && (
              <motion.a
                href={`tel:${venue.phone}`}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold text-sm"
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" />
                Call
              </motion.a>
            )}
            {/* WhatsApp button */}
            {venue.whatsapp && (
              <motion.button
                onClick={() => {
                  let cleanNumber = venue.whatsapp!.replace(/[\s\-\(\)]/g, '');
                  if (cleanNumber.startsWith('00')) {
                    cleanNumber = '+' + cleanNumber.slice(2);
                  }
                  if (!cleanNumber.startsWith('+')) {
                    if (cleanNumber.startsWith('973')) {
                      cleanNumber = '+' + cleanNumber;
                    } else {
                      cleanNumber = '+973' + cleanNumber;
                    }
                  }
                  const message = encodeURIComponent(`Hi! I found ${venue.name} on BahrainNights.`);
                  window.open(`https://wa.me/${cleanNumber.replace('+', '')}?text=${message}`, '_blank');
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-xl text-white font-semibold text-sm"
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.button>
            )}
            {/* Directions button - show if lat/lng OR googleMapsUrl available */}
            {(venue.google_maps_url || (venue.latitude && venue.longitude)) && (
              <motion.button
                onClick={() => {
                  if (venue.google_maps_url) {
                    window.open(venue.google_maps_url, '_blank');
                  } else if (venue.latitude && venue.longitude) {
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;
                    window.open(mapsUrl, '_blank');
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold text-sm"
                whileTap={{ scale: 0.98 }}
              >
                <Navigation className="w-4 h-4" />
                Directions
              </motion.button>
            )}
          </div>
        </div>

        {/* Share Modal */}
        <PlaceShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={venue.name}
          url={placeUrl}
        />

        <div className="h-24 lg:hidden" />
      </div>
    </>
  );
}
