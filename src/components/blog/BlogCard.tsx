'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play, Plus, Clock } from 'lucide-react';

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

interface BlogCardProps {
  article: BlogArticle;
  onSelect: (article: BlogArticle) => void;
  index?: number;
}

export function BlogCard({ article, onSelect, index = 0 }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const countryFlags: Record<string, string> = {
    'bahrain': '🇧🇭',
    'uae': '🇦🇪',
    'saudi-arabia': '🇸🇦',
    'qatar': '🇶🇦',
    'uk': '🇬🇧',
  };

  // Handle click - opens modal immediately on touch devices
  const handleClick = useCallback(() => {
    onSelect(article);
  }, [onSelect, article]);

  // Handle touch end - prevent double-tap issue by opening immediately
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // Prevent mouse events from firing
    onSelect(article);
  }, [onSelect, article]);

  return (
    <div
      className="relative flex-shrink-0 w-[250px] md:w-[280px] cursor-pointer group"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onClick={!isTouchDevice ? handleClick : undefined}
      onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
    >
      {/* Card Container with Netflix Hover Effect */}
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ease-out ${
          isHovered
            ? 'scale-125 z-50 shadow-2xl shadow-black/80'
            : 'scale-100 z-0'
        }`}
        style={{
          transformOrigin: index === 0 ? 'left center' : 'center center',
        }}
      >
        {/* Image */}
        <div className="relative aspect-video">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 50vw, 280px"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-3xl opacity-50">📰</span>
            </div>
          )}

          {/* Country Flag Badge */}
          <div className="absolute top-2 right-2 text-lg drop-shadow-lg">
            {countryFlags[article.country] || '📍'}
          </div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Expanded Content on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gray-900 p-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-2">
            <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Play size={16} fill="black" />
            </button>
            <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors border border-gray-500">
              <Plus size={16} />
            </button>
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-sm line-clamp-2 mb-1">
            {article.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-green-500 font-medium">New</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {article.read_time_minutes} min
            </span>
            {article.city && <span>{article.city}</span>}
          </div>

          {/* Category */}
          {article.category && (
            <span className="inline-block mt-2 text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded">
              {article.category}
            </span>
          )}
        </div>
      </div>

      {/* Title Below (when not hovered) */}
      <div className={`mt-2 transition-opacity ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-white text-sm font-medium line-clamp-1">{article.title}</h3>
        <p className="text-gray-500 text-xs">{article.city || article.country}</p>
      </div>
    </div>
  );
}
