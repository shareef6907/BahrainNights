'use client';

import { motion } from 'framer-motion';
import { Phone, Navigation, Calendar, Menu, Instagram, Globe, MessageCircle } from 'lucide-react';

interface PlaceActionBarProps {
  phone?: string;
  whatsapp?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string | null;
  bookingUrl?: string;
  menuUrl?: string;
  instagram?: string;
  website?: string;
  name: string;
}

export default function PlaceActionBar({
  phone,
  whatsapp,
  latitude,
  longitude,
  googleMapsUrl,
  bookingUrl,
  menuUrl,
  instagram,
  website,
  name,
}: PlaceActionBarProps) {
  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (whatsapp) {
      // Clean the number - remove spaces, dashes, and ensure it starts with country code
      let cleanNumber = whatsapp.replace(/[\s\-\(\)]/g, '');
      // If it starts with 00, replace with +
      if (cleanNumber.startsWith('00')) {
        cleanNumber = '+' + cleanNumber.slice(2);
      }
      // If it doesn't start with +, assume it needs +973 (Bahrain)
      if (!cleanNumber.startsWith('+')) {
        // If it starts with 973, add +
        if (cleanNumber.startsWith('973')) {
          cleanNumber = '+' + cleanNumber;
        } else {
          cleanNumber = '+973' + cleanNumber;
        }
      }
      const message = encodeURIComponent(`Hi! I found ${name} on BahrainNights and would like to inquire about...`);
      window.open(`https://wa.me/${cleanNumber.replace('+', '')}?text=${message}`, '_blank');
    }
  };

  const handleDirections = () => {
    // Use googleMapsUrl if provided, otherwise construct from lat/lng
    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    } else if (latitude && longitude) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const handleBooking = () => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMenu = () => {
    if (menuUrl) {
      window.open(menuUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInstagram = () => {
    if (instagram) {
      window.open(`https://instagram.com/${instagram}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWebsite = () => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
          {/* Call Button */}
          {phone && (
            <motion.button
              onClick={handleCall}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold whitespace-nowrap hover:shadow-lg hover:shadow-green-500/25 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </motion.button>
          )}

          {/* WhatsApp Button */}
          {whatsapp && (
            <motion.button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-xl text-white font-semibold whitespace-nowrap hover:shadow-lg hover:shadow-green-500/25 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </motion.button>
          )}

          {/* Directions Button - show if lat/lng OR googleMapsUrl available */}
          {(googleMapsUrl || (latitude && longitude)) && (
            <motion.button
              onClick={handleDirections}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold whitespace-nowrap hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Navigation className="w-5 h-5" />
              <span>Directions</span>
            </motion.button>
          )}

          {/* Book Table Button */}
          {bookingUrl && (
            <motion.button
              onClick={handleBooking}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold whitespace-nowrap hover:shadow-lg hover:shadow-orange-500/25 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Table</span>
            </motion.button>
          )}

          {/* Menu Button */}
          {menuUrl && (
            <motion.button
              onClick={handleMenu}
              className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold whitespace-nowrap hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Menu className="w-5 h-5" />
              <span>Menu</span>
            </motion.button>
          )}

          {/* Divider */}
          {(instagram || website) && (
            <div className="w-px h-8 bg-white/10 flex-shrink-0" />
          )}

          {/* Social Icons */}
          {instagram && (
            <motion.button
              onClick={handleInstagram}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </motion.button>
          )}

          {website && (
            <motion.button
              onClick={handleWebsite}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
