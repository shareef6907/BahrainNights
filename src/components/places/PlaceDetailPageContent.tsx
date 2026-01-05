'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Navigation } from 'lucide-react';
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
    openingHours: (venue.opening_hours as OpeningHours) || {},
    features: venue.features || [],
    images: venue.gallery || (venue.cover_image_url ? [venue.cover_image_url] : []),
    logo: venue.logo_url || '',
    upcomingEventsCount: 0,
  };
}

export default function PlaceDetailPageContent({ venue, similarVenues, events = [], offers = [] }: PlaceDetailPageContentProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Parse opening hours from JSON
  const openingHours = useMemo(() => {
    if (!venue.opening_hours) return {};
    if (typeof venue.opening_hours === 'string') {
      try {
        return JSON.parse(venue.opening_hours);
      } catch {
        return {};
      }
    }
    return venue.opening_hours as OpeningHours;
  }, [venue.opening_hours]);

  // Calculate if open now and today's hours
  const { isOpen, todayHours } = useMemo(() => {
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
      const [h, m] = time.split(':').map(Number);
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
  }, [openingHours]);

  const placeUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://bahrainnights.com/places/${venue.slug}`;

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
          latitude={venue.latitude || undefined}
          longitude={venue.longitude || undefined}
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
              <PlaceInfo description={venue.description || 'No description available.'} />
              {images.length > 0 && (
                <PlaceGallery images={images} name={venue.name} />
              )}
              {venue.features && venue.features.length > 0 && (
                <PlaceFeatures features={venue.features} />
              )}
              {/* Current Offers - shown before events */}
              <PlaceOffers offers={offers} />
              {/* Upcoming Events at this venue */}
              <PlaceEvents
                events={events.map(e => ({
                  ...e,
                  categoryColor: categoryColors[e.category] || 'bg-purple-500',
                }))}
                venueName={venue.name}
                venueSlug={venue.slug}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <PlaceHours
                openingHours={openingHours}
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
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            {venue.phone && (
              <motion.a
                href={`tel:${venue.phone}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Call
              </motion.a>
            )}
            {venue.latitude && venue.longitude && (
              <motion.button
                onClick={() => {
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                  const mapsUrl = isIOS
                    ? `maps://maps.apple.com/?daddr=${venue.latitude},${venue.longitude}`
                    : `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;
                  window.open(mapsUrl, '_blank');
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                <Navigation className="w-5 h-5" />
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
