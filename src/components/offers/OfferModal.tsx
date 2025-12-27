'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  Calendar,
  Phone,
  ExternalLink,
  Instagram,
  Share2,
  Copy,
  Check,
  Sparkles,
  Wine,
  UtensilsCrossed,
  Tag,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { Offer } from './OfferCard';
import { useState } from 'react';

interface OfferModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
}

const offerTypeConfig: Record<string, {
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
  label: string;
  color: string;
}> = {
  'ladies-night': {
    icon: Sparkles,
    gradient: 'from-pink-500 to-purple-500',
    bgGradient: 'from-pink-500/10 to-purple-500/10',
    label: 'Ladies Night',
    color: 'text-pink-400',
  },
  'happy-hour': {
    icon: Wine,
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 to-orange-500/10',
    label: 'Happy Hour',
    color: 'text-yellow-400',
  },
  'brunch': {
    icon: UtensilsCrossed,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/10 to-amber-500/10',
    label: 'Brunch',
    color: 'text-orange-400',
  },
  'special': {
    icon: Tag,
    gradient: 'from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    label: 'Special Deal',
    color: 'text-blue-400',
  },
};

export default function OfferModal({ offer, isOpen, onClose }: OfferModalProps) {
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCopyLink = async () => {
    if (!offer) return;
    const url = `${window.location.origin}/offers?id=${offer.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!offer) return;
    const url = `${window.location.origin}/offers?id=${offer.id}`;

    if (navigator.share) {
      await navigator.share({
        title: offer.title,
        text: `Check out this offer at ${offer.venue.name}!`,
        url,
      });
    } else {
      handleCopyLink();
    }
  };

  if (!offer) return null;

  const config = offerTypeConfig[offer.type] || offerTypeConfig.special;
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header Image */}
            <div className="relative h-48 md:h-56 flex-shrink-0">
              <Image
                src={offer.venue.image}
                alt={offer.venue.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Type Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${config.gradient} rounded-full flex items-center gap-1.5`}>
                <IconComponent className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">{config.label}</span>
              </div>

              {/* Status Badges */}
              <div className="absolute top-4 left-36 flex gap-2">
                {offer.isNew && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                )}
                {offer.isEndingSoon && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    ENDING SOON
                  </span>
                )}
              </div>

              {/* Venue Logo */}
              <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-slate-900">
                <Image
                  src={offer.venue.logo}
                  alt={offer.venue.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-10">
              {/* Venue Name */}
              <Link
                href={`/places/${offer.venue.slug}`}
                className="inline-flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition-colors mb-2"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{offer.venue.name}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {offer.title}
              </h2>

              {/* Price */}
              {offer.price && (
                <div className="flex items-center gap-3 mb-4">
                  {offer.originalPrice && (
                    <span className="text-gray-500 text-lg line-through">
                      {offer.originalPrice}
                    </span>
                  )}
                  <span className={`text-2xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                    {offer.price}
                  </span>
                  {offer.discount && (
                    <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                      {offer.discount}
                    </span>
                  )}
                </div>
              )}

              {/* Schedule */}
              <div className={`p-4 bg-gradient-to-r ${config.bgGradient} rounded-xl border border-white/10 mb-4`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-5 h-5 ${config.color}`} />
                    <div>
                      <p className="text-gray-400 text-xs">Available On</p>
                      <p className="text-white font-medium">{offer.days.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-5 h-5 ${config.color}`} />
                    <div>
                      <p className="text-gray-400 text-xs">Time</p>
                      <p className="text-white font-medium">{offer.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">About This Offer</h3>
                <p className="text-gray-300 leading-relaxed">{offer.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">What&apos;s Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {offer.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
                      <span className="text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              {offer.terms && offer.terms.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    Terms & Conditions
                  </h3>
                  <ul className="space-y-2">
                    {offer.terms.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-yellow-400">•</span>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Valid Until */}
              {offer.validUntil && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  <p className="text-yellow-400 font-medium">
                    Valid until {offer.validUntil}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Link
                  href={`/places/${offer.venue.slug}`}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r ${config.gradient} rounded-xl font-semibold text-white hover:opacity-90 transition-opacity`}
                >
                  <ExternalLink className="w-5 h-5" />
                  View Venue
                </Link>

                <button
                  onClick={handleShare}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                <button
                  onClick={handleCopyLink}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                  title="Copy Link"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
