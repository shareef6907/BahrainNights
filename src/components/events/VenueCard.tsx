'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface VenueCardProps {
  name: string;
  slug: string;
  image: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export default function VenueCard({
  name,
  slug,
  image,
  address,
  phone,
  latitude,
  longitude
}: VenueCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+f59e0b(${longitude},${latitude})/${longitude},${latitude},14,0/400x200@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Venue Image */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>

      {/* Venue Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-3">{name}</h3>

        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 text-gray-300">
            <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{address}</span>
          </div>

          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
          >
            <Phone className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">{phone}</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 border border-white/10 rounded-xl text-white font-medium hover:bg-white/20 hover:border-yellow-400/50 transition-all"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </a>

          <Link
            href={`/venues/${slug}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 rounded-xl text-black font-bold hover:bg-yellow-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Venue
          </Link>
        </div>
      </div>

      {/* Map Section */}
      <div className="border-t border-white/10">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative h-40 overflow-hidden group"
        >
          {/* Static Map Placeholder - In production, use actual Mapbox/Google Maps */}
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">View on Map</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm">
              Open in Maps
            </span>
          </div>
        </a>
      </div>
    </motion.div>
  );
}
