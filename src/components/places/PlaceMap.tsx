'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface PlaceMapProps {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  area: string;
}

export default function PlaceMap({ name, address, latitude, longitude, area }: PlaceMapProps) {
  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank');
  };

  const handleOpenInMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
  };

  // Static map URL using Google Maps Static API or OpenStreetMap
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=AIzaSyAPlaceholder`;

  // Alternative: OpenStreetMap embed
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005},${latitude - 0.005},${longitude + 0.005},${latitude + 0.005}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    >
      {/* Map */}
      <div className="relative h-48 bg-slate-800">
        <iframe
          src={osmEmbedUrl}
          className="w-full h-full border-0"
          style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
          title={`Map showing ${name}`}
        />

        {/* Map Overlay for click */}
        <button
          onClick={handleOpenInMaps}
          className="absolute inset-0 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
          aria-label="Open in Google Maps"
        >
          <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-white text-sm font-medium flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </div>
        </button>
      </div>

      {/* Address & Directions */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <MapPin className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">{address}</h3>
            <p className="text-gray-500 text-sm">{area}, Bahrain</p>
          </div>
        </div>

        <motion.button
          onClick={handleGetDirections}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Navigation className="w-5 h-5" />
          <span>Get Directions</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
