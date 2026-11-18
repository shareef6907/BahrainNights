'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Mounts its children only when they are close to the viewport.
 *
 * Every `next/dynamic` component rendered in the initial React tree costs
 * one extra HTTP request on page load, even when it sits far below the fold
 * — `ssr: false` means the chunk is fetched as soon as the client bundle
 * runs. On the homepage that was ~20 extra script requests (most of them
 * 1-6 KB) competing for bandwidth with the hero.
 *
 * Wrapping them in Deferred keeps the chunk split (so the main bundle stays
 * small) but moves the request to the moment the user actually scrolls
 * towards that section.
 *
 * The placeholder reserves height so nothing shifts when the real content
 * mounts — CLS must stay at 0.
 */
export default function Deferred({
  children,
  minHeight = 400,
  rootMargin = '800px',
}: {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser) — just render it.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
