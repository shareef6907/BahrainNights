'use client';

import { useEffect, useState } from 'react';

/**
 * Does the visitor prefer reduced motion?
 *
 * WHY THIS EXISTS
 * ---------------
 * `TrailerPlayer` has its own `prefers-reduced-motion` guard: under reduced
 * motion the viewport observer must NOT create the player, and the visitor
 * gets the poster and an explicit play button instead.
 *
 * That guard lives in an effect, and effects run in order. The observer
 * effect is declared AFTER the matchMedia effect, so on the very first commit
 * the observer still sees `reducedMotion === false` and activates the player —
 * before the preference has been read. The result is that a visitor who asked
 * for reduced motion still got an autoplaying trailer, with the YouTube
 * iframe created and the video stream requested.
 *
 * The fix belongs HERE, in the caller, not in `TrailerPlayer`:
 *
 *   - the hero reads the preference itself, and
 *   - passes `activation="click"` when the visitor prefers reduced motion,
 *     `activation="viewport"` otherwise.
 *
 * With `click`, the iframe is never created until the visitor presses play,
 * which is exactly the behaviour the reduced-motion path is supposed to
 * have — and it works regardless of effect ordering.
 *
 * `TrailerPlayer`'s own guard is left in place: it still covers the case
 * where the preference CHANGES while the page is open.
 *
 * The initial value is `false` (not reduced motion) so that the server
 * render and the first client render agree. The preference is applied in an
 * effect, before the observer can fire, because the hero's own observer
 * effect is likewise declared after this one.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  return reduced;
}
