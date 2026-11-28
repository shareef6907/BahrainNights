import { ReactNode } from 'react';

/**
 * Preconnect for the YouTube hosts the hero player actually hits.
 *
 * The hero trailer is created EAGERLY on /cinema - it is above the fold,
 * so it loads first - and every millisecond of handshake is a millisecond
 * of black screen.
 *
 * The four hosts:
 *   www.youtube.com  - the IFrame API script and the embed itself
 *   i.ytimg.com     - the poster images the player fetches
 *   www.google.com   - the player's own resource host
 *   googlevideo.com - the actual video segments (dns-prefetch only: the
 *                     host is dynamic, so a preconnect would point at the
 *                     wrong host)
 *
 * /regional already had these; /cinema did not.
 */
export default function CinemaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="https://i.ytimg.com" />
      <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      {children}
    </>
  );
}
