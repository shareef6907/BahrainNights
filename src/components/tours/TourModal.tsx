'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Users, Star, DollarSign, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ExploreItem } from '@/components/explore/ExploreGrid';

interface TourModalProps {
  tour: ExploreItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TourModal({ tour, isOpen, onClose }: TourModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!tour) return null;

  const tourUrl = `/attractions/${tour.slug}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[95] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 pt-10 pb-20">
              <motion.div
                className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
                data-testid="tour-modal"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Cover Image */}
                <div className="relative h-[200px] md:h-[250px]">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Featured Badge */}
                  {tour.isFeatured && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-yellow-500 text-black rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute bottom-4 left-4 px-4 py-2 bg-teal-500/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    {tour.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {tour.name}
                  </h2>

                  {/* Meta Info Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
                      <MapPin className="w-4 h-4 text-teal-400" />
                      <span className="text-white text-sm">{tour.area}</span>
                    </div>

                    {/* Duration */}
                    {tour.duration && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
                        <Clock className="w-4 h-4 text-teal-400" />
                        <span className="text-white text-sm">{tour.duration}</span>
                      </div>
                    )}

                    {/* Age Range */}
                    {tour.ageRange && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
                        <Users className="w-4 h-4 text-teal-400" />
                        <span className="text-white text-sm">{tour.ageRange}</span>
                      </div>
                    )}

                    {/* Rating */}
                    {tour.rating && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">{tour.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {tour.description && (
                    <div className="mb-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">About</h3>
                      <p className="text-gray-300 leading-relaxed">{tour.description}</p>
                    </div>
                  )}

                  {/* Features/Highlights */}
                  {(tour.features || tour.highlights) && (
                    <div className="mb-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {(tour.features || tour.highlights)?.map((feature, i) => (
                          <span
                            key={i}
                            className="text-sm px-3 py-1.5 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Section */}
                  {tour.price && (
                    <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-teal-400" />
                        <span className="text-2xl font-bold text-teal-400">{tour.price}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={tourUrl}
                      className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                      <span>View Full Details</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={onClose}
                      className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
