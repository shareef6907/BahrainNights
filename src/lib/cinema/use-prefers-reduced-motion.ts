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
 * That guard lives in an effect, and effects run after the render. The
 * viewport observer is a child effect, so on the very first commit the
 * observer can still see `reducedMotion === false` and activate the player
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
 * have.
 *
 * WHY IT IS READ SYNCHRONOUSLY
 * ---------------------------
 * The preference has to be known on the FIRST render, not after an effect.
 * If the hook set the state in an effect, the first render would still pass
 * `activation="viewport"` to the child, and the child's observer — a child
 * effect — runs on that first commit, before the parent's re-render with
 * `activation="click"` ever happens. The iframe would already be created by
 * then.
 *
 * `window.matchMedia` is safe to call during a client render: it does not
 * touch the DOM, and it returns the same answer the server render assumed
 * (no reduced motion) because the server has no `window` at all.
 *
 * `TrailerPlayer`'s own guard is left in place: it still covers the case
 * where the preference CHANGES while the page is open.
 */

/**
 * Read the preference during render.
 *
 * `typeof window === 'undefined'` is the server-render case: there is no
 * preference to read, so the answer is "no reduced motion", which is what
 * the server rendered with anyway.
 */
function readPreference(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function usePrefersReducedMotion(): boolean {
  // The initialiser runs once, on the first client render, and reads the
  // preference SYNCHRONOUSLY. On the server it returns false.
  const [reduced, setReduced] = useState(readPreference);

  // Keep it in step if the visitor changes the setting while the page is open.
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
