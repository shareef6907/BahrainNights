/**
 * THE TRAILER PREDICATE.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Shareef clicked the yellow play button on the hero and got a modal headed
 * "Avengers: Doomsday - Trailer" containing a black box and the words
 * "Trailer not available". That string must never reach a visitor.
 *
 * The cause was two DIFFERENT implementations of "what is a playable
 * trailer":
 *
 *   - NetflixHero.getYouTubeId()  accepted a BARE 11-character YouTube key
 *                                  ("HWdM0HUTFAE").
 *   - TrailerModal.getYouTubeId() did NOT. It only matched a full URL.
 *
 * The database stores the trailer as a bare key, so the hero thought it had a
 * video and the modal did not — and the modal's "no video" state is what the
 * visitor saw.
 *
 * There is now ONE predicate, used by every launcher and by the modal itself,
 * so a button can only appear when the thing it opens can actually play.
 */

/**
 * Extract the YouTube video id from anything we might hold.
 *
 * Accepts:
 *   - a bare key            "HWdM0HUTFAE"
 *   - a watch URL           "https://www.youtube.com/watch?v=HWdM0HUTFAE"
 *   - an embed URL          "https://www.youtube.com/embed/HWdM0HUTFAE"
 *   - a short URL           "https://youtu.be/HWdM0HUTFAE"
 *
 * Returns null when there is no playable video.
 */
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const value = url.trim();
  if (!value) return null;

  // A bare key: exactly 11 URL-safe characters.
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;

  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube-nocookie\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Does this film have a trailer we can actually play?
 *
 * THIS is the predicate every launcher and the modal itself must use. A
 * control is rendered only when this is true, so the "Trailer not
 * available" state in TrailerModal is unreachable.
 */
export function hasPlayableTrailer(url: string | null | undefined): boolean {
  return getYouTubeVideoId(url) !== null;
}
