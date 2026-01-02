'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Don't track if pathname is null
    if (!pathname) return;

    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;

    // Don't double-track the same page
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Determine page type and reference ID from pathname
    let pageType = 'page';
    let referenceId: string | undefined;

    if (pathname === '/') {
      pageType = 'home';
    } else if (pathname.startsWith('/venues/')) {
      pageType = 'venue';
      referenceId = pathname.split('/venues/')[1]?.split('/')[0];
    } else if (pathname.startsWith('/events/')) {
      pageType = 'event';
      referenceId = pathname.split('/events/')[1]?.split('/')[0];
    } else if (pathname.startsWith('/cinema')) {
      pageType = 'cinema';
      if (pathname.includes('/movie/')) {
        referenceId = pathname.split('/movie/')[1]?.split('/')[0];
      }
    } else if (pathname === '/calendar') {
      pageType = 'calendar';
    } else if (pathname.startsWith('/category/')) {
      pageType = 'category';
      referenceId = pathname.split('/category/')[1]?.split('/')[0];
    }

    // Track the page view
    const trackPageView = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pagePath: pathname,
            pageType,
            referenceId,
            referrer: document.referrer || undefined,
          }),
        });
      } catch (error) {
        // Silently fail - tracking shouldn't affect user experience
        console.debug('Tracking failed:', error);
      }
    };

    // Small delay to ensure page has loaded
    const timer = setTimeout(trackPageView, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
