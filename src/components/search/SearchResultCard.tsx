'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Star, Tag, Film, Ticket } from 'lucide-react';
import { SearchItem } from '@/lib/searchData';

interface SearchResultCardProps {
  item: SearchItem;
  query?: string;
  index?: number;
}

const typeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  event: {
    icon: <Calendar className="w-3.5 h-3.5" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  place: {
    icon: <MapPin className="w-3.5 h-3.5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  cinema: {
    icon: <Film className="w-3.5 h-3.5" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
  offer: {
    icon: <Ticket className="w-3.5 h-3.5" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
};

function highlightMatch(text: string, query?: string): React.ReactNode {
  if (!query || !text) return text;

  const normalizedQuery = query.toLowerCase();
  const index = text.toLowerCase().indexOf(normalizedQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="bg-orange-500/30 text-orange-200 px-0.5 rounded">
        {match}
      </span>
      {after}
    </>
  );
}

export default function SearchResultCard({
  item,
  query,
  index = 0,
}: SearchResultCardProps) {
  const config = typeConfig[item.type] || typeConfig.event;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={item.url} className="block group">
        <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300">
          <div className="flex gap-4 p-4">
            {/* Image */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Type badge */}
              <div
                className={`absolute top-2 left-2 ${config.bgColor} ${config.color} px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1`}
              >
                {config.icon}
                <span className="capitalize">{item.type}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-lg group-hover:text-yellow-500 transition-colors line-clamp-1">
                {highlightMatch(item.title, query)}
              </h3>

              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {highlightMatch(item.description, query)}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                {/* Area */}
                {item.area && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.area}</span>
                  </div>
                )}

                {/* Date/Time for events */}
                {item.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                )}

                {/* Venue */}
                {item.venue && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <span>at {item.venue}</span>
                  </div>
                )}

                {/* Rating for places */}
                {item.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                  </div>
                )}

                {/* Price */}
                {item.priceRange && (
                  <div className="text-green-400 font-medium">
                    {item.priceRange}
                  </div>
                )}

                {/* Category */}
                {item.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Compact version for grid display
export function SearchResultCardCompact({
  item,
  query,
  index = 0,
}: SearchResultCardProps) {
  const config = typeConfig[item.type] || typeConfig.event;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={item.url} className="block group">
        <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 h-full">
          {/* Image */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Type badge */}
            <div
              className={`absolute top-3 left-3 ${config.bgColor} ${config.color} px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
            >
              {config.icon}
              <span className="capitalize">{item.type}</span>
            </div>

            {/* Rating badge */}
            {item.rating && (
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-white text-xs font-medium">
                  {item.rating}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-white font-semibold group-hover:text-yellow-500 transition-colors line-clamp-1">
              {highlightMatch(item.title, query)}
            </h3>

            {/* Meta info */}
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              {item.area && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{item.area}</span>
                </div>
              )}
              {item.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className="truncate">{item.date}</span>
                </div>
              )}
            </div>

            {/* Price or venue */}
            <div className="mt-2 text-sm">
              {item.priceRange && (
                <span className="text-green-400 font-medium">
                  {item.priceRange}
                </span>
              )}
              {item.venue && !item.priceRange && (
                <span className="text-gray-400">{item.venue}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
