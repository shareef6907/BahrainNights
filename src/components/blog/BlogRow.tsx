'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogCard } from './BlogCard';
import Link from 'next/link';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  read_time_minutes: number;
  view_count: number;
  published_at: string;
  affiliate_url?: string | null;
  event_date?: string | null;
  event_end_date?: string | null;
  event_venue?: string | null;
}

interface BlogRowProps {
  title: string;
  icon?: string;
  articles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
  seeAllLink?: string;
}

export function BlogRow({ title, icon, articles, onSelectArticle, seeAllLink }: BlogRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (articles.length === 0) return null;

  return (
    <div className="relative py-6 group/row">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-12 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h2>
        {seeAllLink && (
          <Link
            href={seeAllLink}
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            See All
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-gradient-to-r from-gray-950 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <div className="bg-black/80 p-2 rounded-full">
              <ChevronLeft size={24} className="text-white" />
            </div>
          </button>
        )}

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {articles.map((article, index) => (
            <div key={article.id} style={{ scrollSnapAlign: 'start' }}>
              <BlogCard
                article={article}
                onSelect={onSelectArticle}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-gradient-to-l from-gray-950 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <div className="bg-black/80 p-2 rounded-full">
              <ChevronRight size={24} className="text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
