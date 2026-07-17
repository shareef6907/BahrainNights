'use client';

import Link from 'next/link';

const cinematicGroupLinks = [
  { href: 'https://cinematicwebworks.com', label: '🌐 Web Development', external: true },
  { href: 'https://filmproductionbahrain.com', label: '🎬 Film Production', external: true },
  { href: 'https://eventsbahrain.com', label: '🎪 Events & Equipment', external: true },
  { href: 'https://studentphotos.com', label: '📸 School Photography', external: true },
  { href: 'https://bahrainnights.com', label: '🌙 What\'s On in Bahrain', external: false },
];

interface CinematicGroupBarProps {
  /** Show contextual cross-promo messages */
  context?: 'venue' | 'event' | 'general';
}

/**
 * Cinematic Group footer bar - appears above main footer on all pages.
 * Links to all Cinematic Group properties for cross-promotion.
 */
export default function CinematicGroupBar({ context }: CinematicGroupBarProps) {
  return (
    <div className="bg-[#111] border-t border-b border-amber-500/20 py-5 text-center">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Cinematic Group Label */}
        <div className="font-sans text-xs tracking-[4px] text-amber-500 mb-4 uppercase">
          Part of the Cinematic Group
        </div>

        {/* Contextual Cross-Promo Messages */}
        {context === 'venue' && (
          <p className="text-sm text-gray-400 mb-4">
            Need a website for your venue? →{' '}
            <a 
              href="https://cinematicwebworks.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline"
            >
              CinematicWebWorks.com
            </a>
            {' '}|{' '}
            Want a promo video? →{' '}
            <a 
              href="https://filmproductionbahrain.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline"
            >
              FilmProductionBahrain.com
            </a>
          </p>
        )}

        {context === 'event' && (
          <p className="text-sm text-gray-400 mb-4">
            Need event equipment? →{' '}
            <a 
              href="https://eventsbahrain.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline"
            >
              EventsBahrain.com
            </a>
            {' '}|{' '}
            Want professional video coverage? →{' '}
            <a 
              href="https://filmproductionbahrain.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline"
            >
              FilmProductionBahrain.com
            </a>
          </p>
        )}

        {/* Links Grid */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm md:flex-row flex-col items-center">
          {cinematicGroupLinks.map((link) => (
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-amber-500 transition-colors duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href="/"
                className="text-gray-500 hover:text-amber-500 transition-colors duration-300"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
