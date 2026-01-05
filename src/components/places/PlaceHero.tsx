'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Share2, Heart, ChevronLeft, Star, X } from 'lucide-react';
import { useLikeVenue } from '@/hooks/useLikeVenue';
import { usePublicAuth } from '@/context/PublicAuthContext';

interface PlaceHeroProps {
  name: string;
  category: string;
  categoryColor: string;
  subcategory: string[];
  area: string;
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
  coverImage,
  logo,
  isOpen,
  todayHours,
  onShareClick,
  venueId = null,
}: PlaceHeroProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isLiked, likeCount, isLoading, toggleLike, requiresAuth } = useLikeVenue(venueId);
  const { loginWithGoogle } = usePublicAuth();

  const handleLikeClick = async () => {
    await toggleLike();
    // Show login prompt if auth is required
    if (requiresAuth) {
      setShowLoginPrompt(true);
    }
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
              className="object-cover"
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
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    loginWithGoogle();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
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
