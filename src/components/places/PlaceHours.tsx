'use client';

import { motion } from 'framer-motion';
import { Clock, Phone, Mail, Globe, Instagram, Facebook, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { OpeningHours } from './PlaceCard';
import {
  DAY_ORDER,
  DAY_LABELS,
  getTodayName,
  isOpenNow,
  formatTime,
  formatHours,
} from '@/lib/utils/openingHours';

interface PlaceHoursProps {
  openingHours: OpeningHours;
  hideHours?: boolean;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  latitude?: number | null;
  longitude?: number | null;
  address?: string;
  area?: string;
  venueName?: string;
  googleMapsUrl?: string | null;
}

export default function PlaceHours({
  openingHours,
  hideHours = false,
  phone,
  email,
  website,
  instagram,
  facebook,
  latitude,
  longitude,
  address,
  area,
  venueName,
  googleMapsUrl,
}: PlaceHoursProps) {
  const today = getTodayName();
  const open = isOpenNow(openingHours);
  const todayHours = openingHours[today];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      {/* Opening Hours - only show if not hidden */}
      {!hideHours && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Opening Hours</h3>
          </div>

          {/* Current Status */}
          <div className={`flex items-center gap-2 mb-4 pb-4 border-b border-white/10 ${open ? 'text-green-400' : 'text-red-400'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="font-semibold">{open ? 'Open Now' : 'Closed'}</span>
            {todayHours && todayHours !== 'closed' && todayHours.open && todayHours.close && (
              <span className="text-gray-400">• {open ? `Closes at ${formatTime(todayHours.close)}` : `Opens at ${formatTime(todayHours.open)}`}</span>
            )}
          </div>

          {/* Weekly Schedule */}
          <div className="space-y-2">
            {DAY_ORDER.map((day) => {
              const isToday = day === today;
              const hours = openingHours[day];
              const isClosed = !hours || hours === 'closed';

              return (
                <div
                  key={day}
                  className={`flex items-center justify-between py-1.5 ${
                    isToday ? 'text-yellow-400 font-medium' : 'text-gray-400'
                  }`}
                >
                  <span className={isToday ? 'relative' : ''}>
                    {isToday && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    )}
                    {DAY_LABELS[day]}
                  </span>
                  <span className={isClosed ? 'text-red-400/70' : ''}>
                    {formatHours(hours)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-white mb-4">Contact</h3>

        <div className="space-y-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
            >
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-500/10 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span>{phone}</span>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
            >
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="truncate">{email}</span>
            </a>
          )}

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
            >
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <span className="truncate">{website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>
      </div>

      {/* Social Media */}
      {(instagram || facebook) && (
        <div className="border-t border-white/10 pt-6 mt-6">
          <h3 className="text-lg font-bold text-white mb-4">Social Media</h3>

          <div className="flex items-center gap-3">
            {instagram && (
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl text-gray-300 hover:text-pink-400 hover:border-pink-500/40 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm">@{instagram}</span>
              </a>
            )}

            {facebook && (
              <a
                href={`https://facebook.com/${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-gray-300 hover:text-blue-400 hover:border-blue-500/40 transition-all"
              >
                <Facebook className="w-4 h-4" />
                <span className="text-sm">Facebook</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Location Map - show if lat/lng OR googleMapsUrl available */}
      {((latitude && longitude) || googleMapsUrl || address) && (
        <div className="border-t border-white/10 pt-6 mt-6">
          <h3 className="text-lg font-bold text-white mb-4">Location</h3>

          {/* Map Embed - use lat/lng if available, otherwise use address */}
          {(latitude && longitude) ? (
            <div className="relative h-40 bg-slate-800 rounded-xl overflow-hidden mb-4">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005},${latitude - 0.005},${longitude + 0.005},${latitude + 0.005}&layer=mapnik&marker=${latitude},${longitude}`}
                className="w-full h-full border-0"
                style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                title={`Map showing ${venueName || 'venue location'}`}
              />

              {/* Map Overlay for click */}
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank')}
                className="absolute inset-0 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
                aria-label="Open in Google Maps"
              >
                <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-white text-sm font-medium flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </div>
              </button>
            </div>
          ) : address && (
            <div className="relative h-40 bg-slate-800 rounded-xl overflow-hidden mb-4">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address + (area ? ', ' + area + ', Bahrain' : ', Bahrain'))}&output=embed`}
                className="w-full h-full border-0"
                style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                title={`Map showing ${venueName || 'venue location'}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Overlay for click */}
              <button
                onClick={() => {
                  if (googleMapsUrl) {
                    window.open(googleMapsUrl, '_blank');
                  } else {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + (area ? ', ' + area + ', Bahrain' : ', Bahrain'))}`, '_blank');
                  }
                }}
                className="absolute inset-0 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
                aria-label="Open in Google Maps"
              >
                <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-white text-sm font-medium flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </div>
              </button>
            </div>
          )}

          {/* Address */}
          {address && (
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <MapPin className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">{address}</p>
                {area && <p className="text-gray-500 text-xs mt-0.5">{area}, Bahrain</p>}
              </div>
            </div>
          )}

          {/* Get Directions Button - show if lat/lng OR googleMapsUrl available */}
          {(googleMapsUrl || (latitude && longitude)) && (
            <button
              onClick={() => {
                // Use googleMapsUrl if provided, otherwise construct from lat/lng
                if (googleMapsUrl) {
                  window.open(googleMapsUrl, '_blank');
                } else if (latitude && longitude) {
                  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
                  window.open(mapsUrl, '_blank');
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Navigation className="w-5 h-5" />
              <span>Get Directions</span>
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
