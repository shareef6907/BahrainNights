'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Share2, Heart, ChevronLeft, Star } from 'lucide-react';

interface PlaceHeroProps {
  name: string;
  category: string;
  categoryColor: string;
  subcategory: string[];
  area: string;
  priceRange: 1 | 2 | 3;
  coverImage: string;
  logo: string;
  isOpen: boolean;
  todayHours: string;
  onShareClick: () => void;
  onSaveClick: () => void;
  isSaved: boolean;
}

export default function PlaceHero({
  name,
  category,
  categoryColor,
  subcategory,
  area,
  priceRange,
  coverImage,
  logo,
  isOpen,
  todayHours,
  onShareClick,
  onSaveClick,
  isSaved,
}: PlaceHeroProps) {
  const renderPriceRange = () => {
    return (
      <span className="font-bold text-sm">
        <span className="text-yellow-400">{'BD '.repeat(priceRange).trim()}</span>
        <span className="text-gray-500">{' BD'.repeat(3 - priceRange)}</span>
      </span>
    );
  };

  return (
    <section className="relative">
      {/* Cover Image */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
        <Image
          src={coverImage}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-10">
          {/* Back Button */}
          <Link
            href="/places"
            className="flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">All Places</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Price Range */}
            <div className="px-3 py-2 bg-black/50 backdrop-blur-md rounded-xl">
              {renderPriceRange()}
            </div>

            {/* Save Button */}
            <motion.button
              onClick={onSaveClick}
              className={`p-2.5 rounded-xl transition-all ${
                isSaved
                  ? 'bg-red-500/20 backdrop-blur-md text-red-400'
                  : 'bg-black/50 backdrop-blur-md text-white hover:bg-black/70'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label={isSaved ? 'Remove from saved' : 'Save place'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Share Button */}
            <motion.button
              onClick={onShareClick}
              className="p-2.5 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 mt-14">
          <span className={`px-3 py-1.5 ${categoryColor} rounded-full text-xs font-bold text-white shadow-lg`}>
            {category}
          </span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 -mt-32 md:-mt-40 z-10">
        <div className="flex items-end gap-4 md:gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white rounded-2xl shadow-2xl overflow-hidden flex-shrink-0 border-4 border-slate-950"
          >
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 80px, 128px"
            />
          </motion.div>

          {/* Info */}
          <div className="flex-1 pb-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 line-clamp-2"
            >
              {name}
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-2 mb-3"
            >
              {subcategory.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Location & Status Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 md:gap-4 text-sm"
            >
              {/* Location */}
              <div className="flex items-center gap-1.5 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{area}</span>
              </div>

              {/* Open/Closed Status */}
              <div className={`flex items-center gap-1.5 ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
                <Clock className="w-4 h-4" />
                <span className="font-medium">{isOpen ? 'Open Now' : 'Closed'}</span>
                {todayHours && (
                  <span className="text-gray-400">• {todayHours}</span>
                )}
              </div>

              {/* Rating (Placeholder) */}
              <div className="flex items-center gap-1 text-gray-400">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-medium">4.5</span>
                <span className="text-gray-500">(Coming Soon)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
