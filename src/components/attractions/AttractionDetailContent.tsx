'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Phone,
  Globe,
  Mail,
  ExternalLink,
  Share2,
  Heart,
  ChevronLeft,
  Calendar,
  Tag,
  Navigation,
  Ticket,
  Info,
  Home,
  Search,
} from 'lucide-react';
import type { Attraction } from '@/lib/db/attractions';

interface AttractionDetailContentProps {
  attraction: Attraction;
  similarAttractions: Attraction[];
}

export default function AttractionDetailContent({
  attraction,
  similarAttractions,
}: AttractionDetailContentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Generate Google Maps embed URL using attraction name and area (no API key required)
  const getGoogleMapsEmbedUrl = () => {
    const query = encodeURIComponent(`${attraction.name}, ${attraction.area || ''}, Bahrain`);
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // Generate Google Maps directions URL
  const getGoogleMapsDirectionsUrl = () => {
    if (attraction.latitude && attraction.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}`;
    }
    const query = encodeURIComponent(`${attraction.name}, ${attraction.area || ''}, Bahrain`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: attraction.name,
          text: attraction.short_description || attraction.description?.slice(0, 100) || '',
          url: window.location.href,
        });
      } catch {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                BahrainNights
              </span>
            </Link>
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/explore" className="text-gray-300 hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/cinema" className="text-gray-300 hover:text-white transition-colors">
                Cinema
              </Link>
            </div>
            {/* Mobile Nav */}
            <div className="flex md:hidden items-center gap-4">
              <Link href="/" className="p-2 text-gray-300 hover:text-white">
                <Home className="w-5 h-5" />
              </Link>
              <Link href="/explore" className="p-2 text-gray-300 hover:text-white">
                <Search className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          {attraction.image_url ? (
            <Image
              src={attraction.image_url}
              alt={attraction.name}
              fill
              className="object-cover"
              style={{
                objectPosition: `${attraction.image_position_x || 50}% ${attraction.image_position_y || 50}%`,
              }}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-600/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link
            href="/explore?category=family"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Attractions</span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-24 right-4 md:right-8 z-10 flex gap-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-gray-900/80 text-white hover:bg-gray-800'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-800 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Title Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-amber-500 text-black text-sm font-semibold rounded-full">
                {attraction.category || 'Attraction'}
              </span>
              {attraction.is_featured && (
                <span className="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {attraction.name}
            </h1>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              {attraction.area && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span>{attraction.area}, Bahrain</span>
                </div>
              )}
              {attraction.tripadvisor_rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span>{attraction.tripadvisor_rating.toFixed(1)} Rating</span>
                </div>
              )}
              {attraction.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span>{attraction.duration}</span>
                </div>
              )}
              {attraction.price_range && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                  <span>{attraction.price_range}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-amber-500" />
                About This Attraction
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {attraction.description || 'No description available.'}
              </p>
            </motion.section>

            {/* Details Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attraction.suitable_for && attraction.suitable_for.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Users className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Suitable For</h3>
                      <p className="text-gray-400 capitalize">
                        {attraction.suitable_for.join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {attraction.duration && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Duration</h3>
                      <p className="text-gray-400">{attraction.duration}</p>
                    </div>
                  </div>
                )}

                {attraction.best_time && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Calendar className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Best Time to Visit</h3>
                      <p className="text-gray-400">{attraction.best_time}</p>
                    </div>
                  </div>
                )}

                {attraction.price_range && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Ticket className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Price</h3>
                      <p className="text-gray-400">
                        {attraction.price_range}
                        {attraction.price_from && ` (from ${attraction.price_from} ${attraction.currency || 'BHD'})`}
                      </p>
                    </div>
                  </div>
                )}

                {attraction.address && (
                  <div className="flex items-start gap-4 md:col-span-2">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <MapPin className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Address</h3>
                      <p className="text-gray-400">{attraction.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Tags */}
            {attraction.tags && attraction.tags.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Tag className="w-6 h-6 text-amber-500" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {attraction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Google Maps */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Navigation className="w-6 h-6 text-amber-500" />
                Location
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <iframe
                  src={getGoogleMapsEmbedUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${attraction.name}`}
                />
              </div>
              <a
                href={getGoogleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
            </motion.section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact & Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 sticky top-24"
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

              {/* Primary CTA */}
              {attraction.booking_url ? (
                <a
                  href={attraction.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors mb-4"
                >
                  <Ticket className="w-5 h-5" />
                  Book Now
                </a>
              ) : (
                <a
                  href={getGoogleMapsDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors mb-4"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
              )}

              {/* Contact Info */}
              <div className="space-y-3">
                {attraction.phone && (
                  <a
                    href={`tel:${attraction.phone}`}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-amber-500" />
                    <span>{attraction.phone}</span>
                  </a>
                )}

                {attraction.website && (
                  <a
                    href={attraction.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-amber-500" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}

                {attraction.email && (
                  <a
                    href={`mailto:${attraction.email}`}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-amber-500" />
                    <span>{attraction.email}</span>
                  </a>
                )}

                {attraction.tripadvisor_url && (
                  <a
                    href={attraction.tripadvisor_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <Star className="w-5 h-5 text-green-500" />
                    <span>View on TripAdvisor</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
              </div>

              {/* Rating Display */}
              {attraction.tripadvisor_rating && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">TripAdvisor Rating</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <span className="text-white font-bold text-lg">
                        {attraction.tripadvisor_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {attraction.tripadvisor_reviews && (
                    <p className="text-sm text-gray-500 mt-1">
                      Based on {attraction.tripadvisor_reviews} reviews
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Similar Attractions */}
        {similarAttractions.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Similar Attractions You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarAttractions.map((item) => (
                <Link
                  key={item.id}
                  href={`/attractions/${item.slug}`}
                  className="group bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-600/20" />
                    )}
                    {item.tripadvisor_rating && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="text-white text-sm font-medium">
                          {item.tripadvisor_rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-amber-500 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{item.area}</span>
                    </div>
                    {item.duration && (
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                BahrainNights
              </span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <Link href="/explore" className="hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/events" className="hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/cinema" className="hover:text-white transition-colors">
                Cinema
              </Link>
              <Link href="/places" className="hover:text-white transition-colors">
                Places
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} BahrainNights. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-800"
          >
            <h3 className="text-xl font-bold text-white mb-4">Share This Attraction</h3>
            <div className="flex gap-3 mb-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${attraction.name} on BahrainNights: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 bg-green-600 text-white rounded-xl text-center font-semibold hover:bg-green-500 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${attraction.name} on BahrainNights`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 bg-blue-500 text-white rounded-xl text-center font-semibold hover:bg-blue-400 transition-colors"
              >
                Twitter
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              className="w-full p-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors mb-3"
            >
              Copy Link
            </button>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full p-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
