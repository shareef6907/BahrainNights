'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Sponsor } from '@/types/database';

interface SponsorLogoProps {
  sponsor: Sponsor;
  tier: 'golden' | 'silver';
  index?: number;
}

export default function SponsorLogo({ sponsor, tier, index = 0 }: SponsorLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isGolden = tier === 'golden';
  const logoSize = isGolden ? { width: 180, height: 100 } : { width: 140, height: 80 };

  // Determine the link - either external website or internal venue page
  const href = sponsor.website_url || (sponsor.venue_id ? `/places/${sponsor.venue_id}` : '#');
  const isExternal = sponsor.website_url?.startsWith('http');

  const tierColors = {
    golden: {
      border: 'border-amber-500/30',
      hoverBorder: 'border-amber-400',
      glow: 'shadow-amber-500/20',
      hoverGlow: 'shadow-amber-400/40',
      bg: 'bg-amber-500/5',
    },
    silver: {
      border: 'border-gray-400/30',
      hoverBorder: 'border-gray-300',
      glow: 'shadow-gray-400/20',
      hoverGlow: 'shadow-gray-300/40',
      bg: 'bg-gray-400/5',
    },
  };

  const colors = tierColors[tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className={`
            relative rounded-xl border-2 transition-all duration-300 overflow-hidden
            ${colors.bg}
            ${isHovered ? colors.hoverBorder : colors.border}
            ${isHovered ? `shadow-lg ${colors.hoverGlow}` : `shadow-md ${colors.glow}`}
          `}
          style={{ width: logoSize.width, height: logoSize.height }}
          animate={{
            y: isHovered ? -4 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {!imageError && sponsor.logo_url ? (
              <Image
                src={sponsor.logo_url}
                alt={sponsor.name}
                fill
                className={`
                  object-contain transition-all duration-300 p-3
                  ${isHovered ? 'grayscale-0' : 'grayscale'}
                `}
                onError={() => setImageError(true)}
              />
            ) : (
              // Placeholder for missing logo
              <div
                className={`
                  w-full h-full flex items-center justify-center rounded-lg
                  ${isGolden ? 'bg-gradient-to-br from-amber-600 to-amber-800' : 'bg-gradient-to-br from-gray-500 to-gray-700'}
                  transition-all duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-70'}
                `}
              >
                <span className="text-white font-bold text-center text-sm px-2">
                  {sponsor.name}
                </span>
              </div>
            )}
          </div>

          {/* Hover overlay glow */}
          <motion.div
            className={`
              absolute inset-0 pointer-events-none
              ${isGolden ? 'bg-gradient-to-t from-amber-500/10 to-transparent' : 'bg-gradient-to-t from-gray-400/10 to-transparent'}
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Sponsor name tooltip on hover */}
        <motion.div
          className="text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs text-gray-400">{sponsor.name}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
