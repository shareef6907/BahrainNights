'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites, FavoriteType } from '@/contexts/FavoritesContext';

interface FavoriteButtonProps {
  id: string;
  type: FavoriteType;
  title: string;
  slug: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function FavoriteButton({
  id,
  type,
  title,
  slug,
  image,
  size = 'md',
  className = '',
  showLabel = false,
}: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const isSaved = isFavorite(id, type);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    
    if (isSaved) {
      removeFavorite(id, type);
    } else {
      addFavorite({ id, type, title, slug, image });
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 1500);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [id, type, title, slug, image, isSaved, addFavorite, removeFavorite]);

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={`
          relative flex items-center justify-center rounded-full
          transition-all duration-200
          ${sizeClasses[size]}
          ${isSaved
            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
            : 'bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60'
          }
          ${className}
        `}
        whileTap={{ scale: 0.85 }}
        aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
        title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`
              ${iconSizes[size]}
              transition-all duration-200
              ${isSaved ? 'fill-current' : ''}
            `}
          />
        </motion.div>

        {/* Particle burst effect on favorite */}
        <AnimatePresence>
          {isAnimating && !isSaved && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i / 6) * Math.PI * 2) * 20,
                    y: Math.sin((i / 6) * Math.PI * 2) * 20,
                    opacity: [1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* "Saved!" bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            Saved! ❤️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional label */}
      {showLabel && (
        <span className="ml-2 text-sm text-gray-400">
          {isSaved ? 'Saved' : 'Save'}
        </span>
      )}
    </div>
  );
}
