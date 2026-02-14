'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artist, ArtistCategory } from '@/types/database';

interface Props {
  artist: Artist;
  onBook?: () => void;
  delay?: number;
}

const CATEGORY_LABELS: Record<ArtistCategory, string> = {
  dj: 'DJ',
  vocalist: 'Vocalist',
  instrumentalist: 'Instrumentalist',
  band: 'Live Band',
  fire_show: 'Fire Show',
  performer: 'Performer',
  kids_entertainment: 'Kids Entertainment',
  magician: 'Magician',
};

const CATEGORY_COLORS: Record<ArtistCategory, string> = {
  dj: 'bg-purple-500',
  vocalist: 'bg-pink-500',
  instrumentalist: 'bg-blue-500',
  band: 'bg-indigo-500',
  fire_show: 'bg-orange-500',
  performer: 'bg-teal-500',
  kids_entertainment: 'bg-green-500',
  magician: 'bg-violet-500',
};

export default function ArtistCard({ artist, onBook, delay = 0 }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get display category (subcategory takes precedence for instrumentalists)
  const displayCategory = artist.subcategory 
    ? artist.subcategory.charAt(0).toUpperCase() + artist.subcategory.slice(1).replace('_', ' ')
    : CATEGORY_LABELS[artist.category];

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] transition-transform duration-300 md:hover:scale-[1.02] md:hover:shadow-2xl md:hover:shadow-amber-500/10 touch-manipulation"
      style={{ 
        opacity: 0,
        animation: `fade-in 0.5s ease-out ${delay}ms forwards`
      }}
    >
      {/* Image Container */}
      <Link href={`/artists/${artist.slug}`} className="block aspect-[3/4] relative overflow-hidden touch-manipulation">
        {/* Placeholder/Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        {/* Artist Image */}
        {artist.profile_image ? (
          <Image
            src={artist.profile_image}
            alt={artist.stage_name}
            fill
            className={`object-cover transition-transform duration-500 md:group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <span className="text-6xl opacity-50">🎭</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        
        {/* Featured Badge */}
        {artist.is_featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 ${CATEGORY_COLORS[artist.category]} text-white text-xs font-medium rounded-full shadow-lg`}>
          {displayCategory}
        </div>
      </Link>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Link href={`/artists/${artist.slug}`}>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
            {artist.stage_name}
          </h3>
        </Link>
        
        {artist.short_description && (
          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
            {artist.short_description}
          </p>
        )}

        {/* Action Button - Always visible on mobile, hover on desktop */}
        <div className="transition-all duration-200 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBook?.();
            }}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors touch-manipulation"
          >
            Request Booking
          </button>
        </div>
      </div>

      {/* Hover Glow Effect - Desktop only */}
      <div className="absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none opacity-0 md:group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl border border-amber-500/30" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}
