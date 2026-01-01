'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { usePublicAuth } from '@/context/PublicAuthContext';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  venueId: string;
  initialLikeCount?: number;
  initialIsLiked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
  onLikeChange?: (liked: boolean, count: number) => void;
}

export function LikeButton({
  venueId,
  initialLikeCount = 0,
  initialIsLiked,
  size = 'md',
  showCount = true,
  className,
  onLikeChange,
}: LikeButtonProps) {
  const { isAuthenticated, isVenueLiked, toggleLike, loginWithGoogle } = usePublicAuth();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked ?? false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync with context when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsLiked(isVenueLiked(venueId));
    }
  }, [isAuthenticated, isVenueLiked, venueId]);

  // Update from initial props
  useEffect(() => {
    if (initialIsLiked !== undefined) {
      setIsLiked(initialIsLiked);
    }
  }, [initialIsLiked]);

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      loginWithGoogle();
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setIsAnimating(true);

    // Optimistic update
    const newIsLiked = !isLiked;
    const newCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1);
    setIsLiked(newIsLiked);
    setLikeCount(newCount);

    try {
      const result = await toggleLike(venueId);

      if (result.success) {
        setIsLiked(result.liked);
        setLikeCount(result.likeCount);
        onLikeChange?.(result.liked, result.likeCount);
      } else {
        // Revert optimistic update
        setIsLiked(!newIsLiked);
        setLikeCount(initialLikeCount);
      }
    } catch (error) {
      // Revert optimistic update
      setIsLiked(!newIsLiked);
      setLikeCount(initialLikeCount);
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-1.5 rounded-full transition-all duration-200',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-pink-500/50',
        sizeClasses[size],
        isLiked
          ? 'bg-pink-500/20 text-pink-500'
          : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20',
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={isLiked ? 'Unlike venue' : 'Like venue'}
    >
      <Heart
        size={iconSizes[size]}
        className={cn(
          'transition-all duration-300',
          isLiked && 'fill-current',
          isAnimating && 'animate-pulse scale-125'
        )}
      />
      {showCount && (
        <span className={cn(textSizes[size], 'font-medium min-w-[1.5em] text-center')}>
          {likeCount > 0 ? formatCount(likeCount) : ''}
        </span>
      )}
    </button>
  );
}

// Format large numbers (e.g., 1.2K, 3.4M)
function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}
