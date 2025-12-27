'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PlaceCategory = 'all' | 'restaurant' | 'cafe' | 'lounge' | 'bar' | 'nightclub' | 'beach-club';

interface CategoryCount {
  category: PlaceCategory;
  label: string;
  count: number;
  icon: string;
}

interface PlaceCategoryTabsProps {
  categories: CategoryCount[];
  selectedCategory: PlaceCategory;
  onCategoryChange: (category: PlaceCategory) => void;
}

export default function PlaceCategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: PlaceCategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/90 backdrop-blur-sm rounded-full text-white hover:bg-slate-800 transition-colors shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/90 backdrop-blur-sm rounded-full text-white hover:bg-slate-800 transition-colors shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-1 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.category}
            onClick={() => onCategoryChange(cat.category)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.category
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">{cat.icon}</span>
            <span>{cat.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedCategory === cat.category
                  ? 'bg-black/20 text-black'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {cat.count}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
