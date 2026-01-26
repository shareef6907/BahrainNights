'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Clock, ChevronRight, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ExploreItem } from '@/components/explore/ExploreGrid';

interface ShoppingModalProps {
  item: ExploreItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingModal({ item, isOpen, onClose }: ShoppingModalProps) {
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

  if (!item) return null;

  const itemUrl = `/explore/shopping/${item.slug}`;

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
                data-testid="shopping-modal"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Cover Image */}
                <div className="relative h-[200px] md:h-[250px]">
                  <Image
                    src={item.image}
                    alt={item.name}
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
                  {item.isFeatured && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-yellow-500 text-black rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute bottom-4 left-4 px-4 py-2 bg-amber-500/90 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    {item.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {item.name}
                  </h2>

                  {/* Meta Info Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="text-white text-sm">{item.area}</span>
                    </div>

                    {/* Opening Hours */}
                    {item.openingHours && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-white text-sm">{item.openingHours}</span>
                      </div>
                    )}

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">{item.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <div className="mb-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">About</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  )}

                  {/* Features/Highlights */}
                  {(item.features || item.highlights) && (
                    <div className="mb-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">What&apos;s Here</h3>
                      <div className="flex flex-wrap gap-2">
                        {(item.features || item.highlights)?.map((feature, i) => (
                          <span
                            key={i}
                            className="text-sm px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={itemUrl}
                      className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                      <span>View Full Page</span>
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
