'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Ensure URL has protocol prefix for external links
function ensureAbsoluteUrl(url: string): string {
  if (!url) return '#';
  // If already has protocol, return as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  // Add https:// prefix for external URLs
  return `https://${url}`;
}

interface ImageSettings {
  position: { x: number; y: number };
  scale: number;
}

// Helper function to convert image settings to CSS object-position
function getImageStyle(settings?: ImageSettings | string | null): React.CSSProperties {
  if (!settings) {
    return { objectPosition: '50% 50%' }; // Default center
  }
  // Parse if it's a JSON string (some databases return it as string)
  const parsed = typeof settings === 'string' ? JSON.parse(settings) : settings;
  if (!parsed.position) {
    return { objectPosition: '50% 50%' };
  }
  // The ImagePositioner stores x/y as direct percentage values (0-100)
  // that map directly to object-position
  return {
    objectPosition: `${parsed.position.x}% ${parsed.position.y}%`,
  };
}

interface Ad {
  id: string;
  title: string | null;
  subtitle: string | null;
  cta_text: string | null;
  image_url: string;
  target_url: string;
  advertiser_name: string;
  image_settings?: ImageSettings | string | null;
}

interface AdBannerProps {
  targetPage: string;
  placement: 'slider' | 'banner' | 'sidebar' | 'inline';
  className?: string;
  limit?: number;
}

export default function AdBanner({
  targetPage,
  placement,
  className = '',
  limit = 1,
}: AdBannerProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = sliding left (next), -1 = sliding right (prev)
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Slide animation variants - faster for instant feel
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 1,
    }),
  };

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  }, [ads.length]);

  // Preload all images for instant switching
  useEffect(() => {
    if (ads.length > 0) {
      let loadedCount = 0;
      ads.forEach((ad) => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === ads.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === ads.length) {
            setImagesLoaded(true);
          }
        };
        img.src = ad.image_url;
      });
    }
  }, [ads]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `/api/public/ads?targetPage=${targetPage}&placement=${placement}&limit=${limit}`
        );
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads || []);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [targetPage, placement, limit]);

  // Auto-rotate for slider and banner ads
  useEffect(() => {
    if ((placement === 'slider' || placement === 'banner') && ads.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000); // Rotate every 4 seconds
      return () => clearInterval(interval);
    }
  }, [ads.length, placement, nextSlide]);

  // Track impression when ad is shown
  const trackImpression = async (adId: string) => {
    try {
      await fetch(`/api/public/ads/${adId}/impression`, { method: 'POST' });
    } catch (error) {
      // Silently fail - don't affect user experience
    }
  };

  // Track click when ad is clicked
  const trackClick = async (adId: string) => {
    try {
      await fetch(`/api/public/ads/${adId}/click`, { method: 'POST' });
    } catch (error) {
      // Silently fail
    }
  };

  useEffect(() => {
    if (ads.length > 0) {
      trackImpression(ads[currentIndex]?.id);
    }
  }, [ads, currentIndex]);

  if (loading || ads.length === 0) {
    return null;
  }

  const currentAd = ads[currentIndex];

  // Banner style (horizontal, full-width)
  if (placement === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl ${className}`}
      >
        {/* Preload all images in hidden container for instant switching */}
        <div className="hidden">
          {ads.map((ad, index) => (
            <Image
              key={`preload-${ad.id}`}
              src={ad.image_url}
              alt=""
              width={1920}
              height={480}
              priority={index < 2}
              loading="eager"
            />
          ))}
        </div>

        <div className="relative aspect-[3/1] md:aspect-[4/1] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
              style={{ position: 'absolute' }}
            >
              <Link
                href={ensureAbsoluteUrl(currentAd.target_url)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackClick(currentAd.id)}
                className="block relative w-full h-full group"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={currentAd.image_url}
                    alt={currentAd.title || currentAd.advertiser_name}
                    fill
                    priority
                    loading="eager"
                    sizes="100vw"
                    className="object-cover"
                    style={getImageStyle(currentAd.image_settings)}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 md:px-10">
                    {currentAd.title && (
                      <h3 className="text-white text-lg md:text-2xl font-bold mb-1">
                        {currentAd.title}
                      </h3>
                    )}
                    {currentAd.subtitle && (
                      <p className="text-white/80 text-sm md:text-base mb-3">
                        {currentAd.subtitle}
                      </p>
                    )}
                    {currentAd.cta_text && (
                      <span className="inline-block px-4 py-2 bg-amber-400 text-black text-sm font-semibold rounded-lg group-hover:bg-amber-300 transition-colors">
                        {currentAd.cta_text}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sponsored label */}
                <span className="absolute top-3 right-3 px-2 py-1 text-xs bg-black/50 text-white/70 rounded">
                  Sponsored
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator for multiple ads */}
        {ads.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1 z-10">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-amber-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Sidebar style (vertical, compact)
  if (placement === 'sidebar') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden ${className}`}
      >
        <Link
          href={ensureAbsoluteUrl(currentAd.target_url)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackClick(currentAd.id)}
          className="block group"
        >
          <div className="relative aspect-square">
            <Image
              src={currentAd.image_url}
              alt={currentAd.title || currentAd.advertiser_name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={getImageStyle(currentAd.image_settings)}
            />
          </div>
          <div className="p-4">
            {currentAd.title && (
              <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {currentAd.title}
              </h4>
            )}
            {currentAd.subtitle && (
              <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                {currentAd.subtitle}
              </p>
            )}
            {currentAd.cta_text && (
              <span className="text-amber-400 text-xs font-medium group-hover:text-amber-300 transition-colors">
                {currentAd.cta_text} →
              </span>
            )}
          </div>
          <div className="px-4 pb-2">
            <span className="text-xs text-gray-500">Sponsored</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Inline style (within content)
  if (placement === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gradient-to-r from-amber-500/10 to-pink-500/10 border border-white/10 rounded-xl p-4 ${className}`}
      >
        <Link
          href={ensureAbsoluteUrl(currentAd.target_url)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackClick(currentAd.id)}
          className="flex items-center gap-4 group"
        >
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={currentAd.image_url}
              alt={currentAd.title || currentAd.advertiser_name}
              fill
              className="object-cover"
              style={getImageStyle(currentAd.image_settings)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                Sponsored
              </span>
            </div>
            {currentAd.title && (
              <h4 className="text-white font-medium text-sm mb-0.5 truncate group-hover:text-amber-400 transition-colors">
                {currentAd.title}
              </h4>
            )}
            {currentAd.subtitle && (
              <p className="text-gray-400 text-xs truncate">{currentAd.subtitle}</p>
            )}
          </div>
          {currentAd.cta_text && (
            <span className="flex-shrink-0 px-3 py-1.5 bg-amber-400/20 text-amber-400 text-xs font-medium rounded-lg group-hover:bg-amber-400 group-hover:text-black transition-colors">
              {currentAd.cta_text}
            </span>
          )}
        </Link>
      </motion.div>
    );
  }

  // Default/slider style
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Preload all images in hidden container for instant switching */}
      <div className="hidden">
        {ads.map((ad, index) => (
          <Image
            key={`preload-${ad.id}`}
            src={ad.image_url}
            alt=""
            width={1920}
            height={820}
            priority={index < 2}
            loading="eager"
          />
        ))}
      </div>

      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
            style={{ position: 'absolute' }}
          >
            <Link
              href={ensureAbsoluteUrl(currentAd.target_url)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackClick(currentAd.id)}
              className="block relative w-full h-full group"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={currentAd.image_url}
                  alt={currentAd.title || currentAd.advertiser_name}
                  fill
                  priority
                  loading="eager"
                  sizes="100vw"
                  className="object-cover"
                  style={getImageStyle(currentAd.image_settings)}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {currentAd.title && (
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {currentAd.title}
                  </h3>
                )}
                {currentAd.subtitle && (
                  <p className="text-white/80 text-base mb-4 max-w-2xl">
                    {currentAd.subtitle}
                  </p>
                )}
                {currentAd.cta_text && (
                  <span className="inline-block px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg group-hover:bg-amber-300 transition-colors">
                    {currentAd.cta_text}
                  </span>
                )}
              </div>

              {/* Sponsored label */}
              <span className="absolute top-4 right-4 px-2 py-1 text-xs bg-black/50 text-white/70 rounded">
                Sponsored
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator for multiple ads */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1 z-10">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-amber-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
