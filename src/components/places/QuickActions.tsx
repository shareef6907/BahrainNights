'use client';

import { Phone, Navigation, Instagram, Globe, Mail } from 'lucide-react';

interface QuickActionsProps {
  phone?: string;
  website?: string;
  email?: string;
  instagram?: string;
  latitude: number;
  longitude: number;
  variant?: 'compact' | 'full';
}

export default function QuickActions({
  phone,
  website,
  email,
  instagram,
  latitude,
  longitude,
  variant = 'compact',
}: QuickActionsProps) {
  const handlePhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  };

  const handleInstagram = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (instagram) {
      window.open(`https://instagram.com/${instagram}`, '_blank');
    }
  };

  const handleWebsite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (website) {
      window.open(website, '_blank');
    }
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        {phone && (
          <button
            onClick={handlePhone}
            className="flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-green-500/20 hover:text-green-400 rounded-lg text-gray-400 transition-colors"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleDirections}
          className="flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-gray-400 transition-colors"
          title="Directions"
        >
          <Navigation className="w-4 h-4" />
        </button>
        {instagram && (
          <button
            onClick={handleInstagram}
            className="flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 rounded-lg text-gray-400 transition-colors"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Full variant with labels
  return (
    <div className="grid grid-cols-2 gap-3">
      {phone && (
        <button
          onClick={handlePhone}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="font-medium">Call</span>
        </button>
      )}
      <button
        onClick={handleDirections}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors"
      >
        <Navigation className="w-5 h-5" />
        <span className="font-medium">Directions</span>
      </button>
      {website && (
        <button
          onClick={handleWebsite}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors"
        >
          <Globe className="w-5 h-5" />
          <span className="font-medium">Website</span>
        </button>
      )}
      {email && (
        <button
          onClick={handleEmail}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span className="font-medium">Email</span>
        </button>
      )}
      {instagram && (
        <button
          onClick={handleInstagram}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 rounded-xl transition-colors"
        >
          <Instagram className="w-5 h-5" />
          <span className="font-medium">Instagram</span>
        </button>
      )}
    </div>
  );
}
