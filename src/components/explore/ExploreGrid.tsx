'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Clock, Users, ChevronRight } from 'lucide-react';

export interface ExploreItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  category: 'hotels' | 'spas' | 'shopping' | 'tours' | 'kids' | 'community';
  image: string;
  area: string;
  description?: string;
  price?: string;
  rating?: number;
  stars?: number;
  duration?: string;
  ageRange?: string;
  features?: string[];
  highlights?: string[];
  openingHours?: string;
  date?: string;
  organization?: string;
  isFeatured?: boolean;
}

interface ExploreGridProps {
  items: ExploreItem[];
  category: string;
  emptyMessage?: string;
}

const categoryColors: Record<string, string> = {
  hotels: '#3B82F6',
  spas: '#A855F7',
  shopping: '#D97706',
  tours: '#14B8A6',
  kids: '#22C55E',
  community: '#F97316',
};

export default function ExploreGrid({
  items,
  category,
  emptyMessage = 'No items found',
}: ExploreGridProps) {
  const color = categoryColors[category] || '#6B7280';

  // Determine the correct URL path based on category
  const getItemUrl = (item: ExploreItem) => {
    // Kids/Family attractions use the /attractions/ route
    if (category === 'kids') {
      return `/attractions/${item.slug}`;
    }
    // Other categories use /explore/{category}/ route
    return `/explore/${category}/${item.slug}`;
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            href={getItemUrl(item)}
            className="block group"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:bg-white/10">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Featured Badge */}
                {item.isFeatured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                    Featured
                  </div>
                )}

                {/* Category Badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                  style={{ backgroundColor: `${color}CC` }}
                >
                  {item.type}
                </div>

                {/* Stars for hotels */}
                {item.stars && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors mb-2">
                  {item.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{item.area}</span>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.duration && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  )}
                  {item.ageRange && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                      <Users className="w-3 h-3" />
                      {item.ageRange}
                    </div>
                  )}
                  {item.rating && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {item.rating.toFixed(1)}
                    </div>
                  )}
                </div>

                {/* Features/Highlights */}
                {(item.features || item.highlights) && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(item.features || item.highlights)?.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-white/5 text-gray-300 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Date for community events */}
                {item.date && (
                  <div className="text-sm text-gray-400 mb-3">
                    {item.date}
                  </div>
                )}

                {/* Organization for community */}
                {item.organization && (
                  <div className="text-sm text-gray-400 mb-3">
                    by {item.organization}
                  </div>
                )}

                {/* Opening Hours */}
                {item.openingHours && (
                  <div className="text-sm text-gray-400 mb-3">
                    {item.openingHours}
                  </div>
                )}

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  {item.price ? (
                    <span
                      className="font-semibold"
                      style={{ color }}
                    >
                      {item.price}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">View details</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
