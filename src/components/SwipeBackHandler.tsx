'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SwipeBackHandlerProps {
  threshold?: number; // Minimum distance for swipe to trigger (in pixels)
  edgeWidth?: number; // Width of the edge zone where swipe can start (in pixels)
}

export default function SwipeBackHandler({
  threshold = 100,
  edgeWidth = 30,
}: SwipeBackHandlerProps) {
  const router = useRouter();
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  useEffect(() => {
    // Only enable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      // Only start tracking if touch begins near the left edge
      if (touch.clientX <= edgeWidth) {
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
        isSwiping.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = Math.abs(touch.clientY - touchStartY.current);

      // Cancel if vertical movement is greater than horizontal (user is scrolling)
      if (deltaY > Math.abs(deltaX)) {
        isSwiping.current = false;
        return;
      }

      // If swiping right from left edge, prevent default to avoid interference
      if (deltaX > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = Math.abs(touch.clientY - touchStartY.current);

      // Only trigger back if:
      // 1. Swipe is horizontal (deltaX > deltaY)
      // 2. Swipe is from left to right (deltaX > 0)
      // 3. Swipe distance exceeds threshold
      if (deltaX > threshold && deltaX > deltaY) {
        router.back();
      }

      isSwiping.current = false;
      touchStartX.current = 0;
      touchStartY.current = 0;
    };

    // Add event listeners with passive: false to allow preventDefault
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [router, threshold, edgeWidth]);

  // This component doesn't render anything
  return null;
}
