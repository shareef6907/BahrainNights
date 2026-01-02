'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseLikeVenueResult {
  isLiked: boolean;
  likeCount: number;
  isLoading: boolean;
  error: string | null;
  toggleLike: () => Promise<void>;
  requiresAuth: boolean;
}

export function useLikeVenue(venueId: string | null): UseLikeVenueResult {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresAuth, setRequiresAuth] = useState(false);

  // Fetch initial like status
  useEffect(() => {
    if (!venueId) return;

    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`/api/public/likes?venueId=${venueId}`);
        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.isLiked || false);
          setLikeCount(data.likeCount || 0);
        }
      } catch (err) {
        console.error('Error fetching like status:', err);
      }
    };

    fetchLikeStatus();
  }, [venueId]);

  const toggleLike = useCallback(async () => {
    if (!venueId || isLoading) return;

    setIsLoading(true);
    setError(null);
    setRequiresAuth(false);

    // Optimistic update
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      const response = await fetch('/api/public/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ venueId }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Revert optimistic update
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);

        if (data.requireAuth || response.status === 401) {
          setRequiresAuth(true);
          setError('Please sign in to like venues');
        } else {
          setError(data.error || 'Failed to update like');
        }
        return;
      }

      // Update with server values
      setIsLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (err) {
      // Revert optimistic update
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      setError('Failed to update like');
      console.error('Error toggling like:', err);
    } finally {
      setIsLoading(false);
    }
  }, [venueId, isLiked, likeCount, isLoading]);

  return {
    isLiked,
    likeCount,
    isLoading,
    error,
    toggleLike,
    requiresAuth,
  };
}
