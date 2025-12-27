'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

export interface FeaturedItem {
  id: string;
  name: string;
  slug: string;
  category: 'hotels' | 'spas' | 'shopping' | 'tours' | 'kids' | 'community';
  categoryLabel: string;
  image: string;
  area: string;
  price?: string;
  rating?: number;
}

interface FeaturedExperiencesProps {
  title: string;
  items: FeaturedItem[];
}

const categoryColors: Record<string, string> = {
  hotels: '#3B82F6',
  spas: '#A855F7',
  shopping: '#D97706',
  tours: '#14B8A6',
  kids: '#22C55E',
  community: '#F97316',
};

const categoryEmojis: Record<string, string> = {
  hotels: '🏨',
  spas: '💆‍♀️',
  shopping: '🛍️',
  tours: '🚤',
  kids: '👶',
  community: '🤝',
};

export default function FeaturedExperiences({
  title,
  items,
}: FeaturedExperiencesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition-colors ${
              canScrollLeft
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition-colors ${
              canScrollRight
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => {
          const color = categoryColors[item.category];
          const emoji = categoryEmojis[item.category];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 snap-start"
            >
              <Link
                href={`/explore/${item.category}/${item.slug}`}
                className="block group"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Featured Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-black" />
                    Featured
                  </div>

                  {/* Category Badge */}
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm flex items-center gap-1"
                    style={{ backgroundColor: `${color}CC` }}
                  >
                    <span>{emoji}</span>
                    <span>{item.categoryLabel}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gray-300 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{item.area}</span>
                      </div>

                      {item.price && (
                        <span
                          className="font-semibold text-sm"
                          style={{ color }}
                        >
                          {item.price}
                        </span>
                      )}

                      {item.rating && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          <span className="text-sm font-medium">
                            {item.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex justify-center gap-1 mt-4 md:hidden">
        {items.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/30"
          />
        ))}
      </div>
    </section>
  );
}
