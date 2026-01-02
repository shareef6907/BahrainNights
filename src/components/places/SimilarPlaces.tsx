'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ChevronRight } from 'lucide-react';
import { Place } from './PlaceCard';

interface SimilarPlacesProps {
  title: string;
  places: Place[];
  showViewAll?: boolean;
  viewAllHref?: string;
}

const categoryColors: Record<string, string> = {
  restaurant: 'bg-orange-500',
  cafe: 'bg-amber-600',
  lounge: 'bg-purple-500',
  bar: 'bg-blue-500',
  nightclub: 'bg-pink-500',
  'beach-club': 'bg-cyan-500',
};

export default function SimilarPlaces({ title, places, showViewAll = true, viewAllHref }: SimilarPlacesProps) {
  if (places.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showViewAll && viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Mobile: Horizontal Scroll / Desktop: Grid */}
      <div className="flex gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
        {places.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-[280px] lg:w-auto"
          >
            <Link
              href={`/places/${place.slug}`}
              className="block group"
            >
              <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={place.images[0]}
                    alt={place.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 280px, 25vw"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 ${categoryColors[place.category] || 'bg-gray-500'} rounded-full`}>
                    <span className="text-xs font-bold text-white capitalize">
                      {place.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Logo */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={place.logo}
                      alt={`${place.name} logo`}
                      fill
                      className="object-contain p-1"
                      sizes="40px"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-bold group-hover:text-yellow-400 transition-colors line-clamp-1 mb-1">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{place.area}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {place.subcategory.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
