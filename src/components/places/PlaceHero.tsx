'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Share2, Heart, ChevronLeft, Star, X } from 'lucide-react';
import { useLikeVenue } from '@/hooks/useLikeVenue';

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
  venueId?: string | null; // Database UUID for like functionality
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
  venueId = null,
}: PlaceHeroProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isLiked, likeCount, isLoading, toggleLike, requiresAuth } = useLikeVenue(venueId);

  const handleLikeClick = async () => {
    await toggleLike();
    // Show login prompt if auth is required
    if (requiresAuth) {
      setShowLoginPrompt(true);
    }
  };

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

            {/* Like Button */}
            <motion.button
              onClick={handleLikeClick}
              disabled={isLoading}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                isLiked
                  ? 'bg-red-500/20 backdrop-blur-md text-red-400'
                  : 'bg-black/50 backdrop-blur-md text-white hover:bg-black/70'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              aria-label={isLiked ? 'Unlike venue' : 'Like venue'}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {likeCount > 0 && (
                <span className="text-sm font-medium">{likeCount}</span>
              )}
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

      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sign in to like</h3>
              <p className="text-gray-400 text-sm mb-6">
                Create an account or sign in to save your favorite venues and get personalized recommendations.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 px-4 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
