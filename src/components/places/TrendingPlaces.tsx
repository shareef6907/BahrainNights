'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Place } from './PlaceCard';
import { getCategoryBgColor } from '@/lib/constants/categoryColors';

interface TrendingOffer {
  id: string;
  title: string;
  venue: string;
  venueSlug: string;
  type: string;
  time: string;
  discount?: string;
}

interface TrendingPlacesProps {
  trending: Place[];
  newOpenings: Place[];
  tonightOffers: TrendingOffer[];
}

export default function TrendingPlaces({
  trending,
  newOpenings,
  tonightOffers,
}: TrendingPlacesProps) {
  return (
    <div className="space-y-6">
      {/* Trending This Week */}
      <div className="bg-slate-800/50 rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <h3 className="font-bold text-white">Trending This Week</h3>
        </div>
        <div className="p-4 space-y-3">
          {trending.map((place, index) => (
            <Link
              key={place.id}
              href={`/places/${place.slug}`}
              className="flex gap-3 group"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={place.images[0]}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="56px"
                />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-yellow-400 rounded-md flex items-center justify-center">
                  <span className="text-xs font-bold text-black">{index + 1}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {place.name}
                </h4>
                <p className="text-xs text-gray-400">{place.area}</p>
                <span
                  className={`inline-block mt-1 px-1.5 py-0.5 ${getCategoryBgColor(place.category)} rounded text-[10px] font-bold text-white`}
                >
                  {place.category.replace('-', ' ')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* New Openings */}
      <div className="bg-slate-800/50 rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white">New Openings</h3>
        </div>
        <div className="p-4 space-y-3">
          {newOpenings.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.slug}`}
              className="flex gap-3 group"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={place.images[0]}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="56px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="px-1.5 py-0.5 bg-cyan-400 text-black text-[10px] font-bold rounded">
                    NEW
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {place.name}
                </h4>
                <p className="text-xs text-gray-400">{place.subcategory.join(', ')}</p>
                <p className="text-xs text-gray-500">{place.area}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tonight's Offers */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-white">Tonight&apos;s Offers</h3>
        </div>
        <div className="p-4 space-y-3">
          {tonightOffers.map((offer) => (
            <Link
              key={offer.id}
              href={`/places/${offer.venueSlug}`}
              className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {offer.title}
                </h4>
                {offer.discount && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                    {offer.discount}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-1">{offer.venue}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-1.5 py-0.5 bg-white/10 rounded">{offer.type}</span>
                <span>{offer.time}</span>
              </div>
            </Link>
          ))}
          <motion.button
            className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            whileHover={{ x: 3 }}
          >
            See All Offers
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="bg-slate-800/30 rounded-2xl border border-dashed border-white/10 p-4 flex items-center justify-center min-h-[250px]">
        <div className="text-center">
          <div className="text-3xl mb-2">📢</div>
          <p className="text-sm text-gray-500">Advertisement Space</p>
          <p className="text-xs text-gray-600">300 x 250</p>
        </div>
      </div>
    </div>
  );
}
