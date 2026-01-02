'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Navigation, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Place } from './PlaceCard';

interface PlaceMapViewProps {
  places: Place[];
}

const categoryColors: Record<string, string> = {
  restaurant: 'bg-orange-500',
  cafe: 'bg-amber-600',
  lounge: 'bg-purple-500',
  bar: 'bg-blue-500',
  nightclub: 'bg-pink-500',
  'beach-club': 'bg-cyan-500',
};

const categoryLabels: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  lounge: 'Lounge',
  bar: 'Bar',
  nightclub: 'Nightclub',
  'beach-club': 'Beach Club',
};

export default function PlaceMapView({ places }: PlaceMapViewProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isListExpanded, setIsListExpanded] = useState(true);

  return (
    <div className="relative h-[600px] md:h-[700px] bg-slate-800 rounded-2xl overflow-hidden">
      {/* Map Area (Placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
        {/* Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Map Pins */}
        <div className="absolute inset-0">
          {places.map((place, index) => {
            // Calculate position based on index (mock positioning)
            const row = Math.floor(index / 5);
            const col = index % 5;
            const top = 15 + row * 25 + Math.random() * 10;
            const left = 10 + col * 18 + Math.random() * 5;

            return (
              <motion.button
                key={place.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  selectedPlace?.id === place.id ? 'z-20' : 'z-10'
                }`}
                style={{ top: `${top}%`, left: `${left}%` }}
                onClick={() => setSelectedPlace(place)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-8 h-8 rounded-full ${categoryColors[place.category]} flex items-center justify-center shadow-lg ${
                    selectedPlace?.id === place.id
                      ? 'ring-4 ring-white ring-opacity-50'
                      : ''
                  }`}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                {selectedPlace?.id === place.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-white text-black text-sm font-medium rounded-lg shadow-xl"
                  >
                    {place.name}
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded text-xs text-gray-400">
          Interactive Map Coming Soon
        </div>
      </div>

      {/* Selected Place Card (Desktop) */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="hidden md:block absolute top-4 left-4 w-80 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden shadow-2xl z-30"
          >
            <div className="relative aspect-video">
              <Image
                src={selectedPlace.images[0]}
                alt={selectedPlace.name}
                fill
                className="object-cover"
                sizes="320px"
              />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-2 left-2 px-2 py-1 ${categoryColors[selectedPlace.category]} rounded-full`}
              >
                <span className="text-xs font-bold text-white">
                  {categoryLabels[selectedPlace.category]}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{selectedPlace.name}</h3>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedPlace.area}</span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {selectedPlace.description}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/places/${selectedPlace.slug}`}
                  className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-black font-semibold text-center text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.latitude},${selectedPlace.longitude}`,
                      '_blank'
                    )
                  }
                  className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                </button>
                <button
                  onClick={() => (window.location.href = `tel:${selectedPlace.phone}`)}
                  className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Places List (Desktop - Right Side) */}
      <div className="hidden md:block absolute top-4 right-4 bottom-4 w-72 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden z-20">
        <div className="p-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white">
            {places.length} Places Found
          </h3>
        </div>
        <div className="overflow-y-auto h-[calc(100%-48px)] scrollbar-thin scrollbar-thumb-slate-700">
          {places.map((place) => (
            <button
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className={`w-full p-3 flex gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${
                selectedPlace?.id === place.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={place.images[0]}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-sm font-semibold text-white line-clamp-1">
                  {place.name}
                </h4>
                <p className="text-xs text-gray-400 mb-1">{place.area}</p>
                <span
                  className={`px-1.5 py-0.5 ${categoryColors[place.category]} rounded text-[10px] font-bold text-white`}
                >
                  {categoryLabels[place.category]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-30">
        <motion.div
          className="bg-slate-900/95 backdrop-blur-sm rounded-t-2xl border-t border-white/10"
          animate={{ height: isListExpanded ? '50%' : 80 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Handle */}
          <button
            onClick={() => setIsListExpanded(!isListExpanded)}
            className="w-full p-3 flex flex-col items-center"
          >
            <div className="w-10 h-1 bg-gray-500 rounded-full mb-2" />
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>{places.length} Places</span>
              {isListExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </div>
          </button>

          {/* List */}
          <AnimatePresence>
            {isListExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-y-auto h-[calc(100%-60px)] px-4 pb-4"
              >
                <div className="space-y-3">
                  {places.map((place) => (
                    <Link
                      key={place.id}
                      href={`/places/${place.slug}`}
                      className="flex gap-3 p-3 bg-white/5 rounded-xl"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={place.images[0]}
                          alt={place.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white line-clamp-1">
                          {place.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-1">{place.area}</p>
                        <span
                          className={`px-2 py-0.5 ${categoryColors[place.category]} rounded text-xs font-bold text-white`}
                        >
                          {categoryLabels[place.category]}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
