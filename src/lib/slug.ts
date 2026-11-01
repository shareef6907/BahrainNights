/**
 * Slug generation for events.
 *
 * Why this is shared
 * ------------------
 * Three separate implementations existed (the Bahrain sync route, the
 * international cron route and the international fetch script), and all three
 * stripped every non-[a-z0-9] character. A Platinumlist title written in
 * Cyrillic therefore produced an EMPTY base slug, and the page was published
 * at `/events/--108813` — a URL with no words in it, which is both useless to
 * a reader and worthless to Google.
 *
 * The fix is to fall back to a readable, deterministic slug when the title has
 * no usable Latin characters: the event's country and city, if we know them,
 * otherwise the event id. Either way the URL always says something.
 */

/**
 * Turn a title into a URL-safe slug.
 *
 * @param title  the event title
 * @param id     the event id, used as a stable fallback
 * @param hint   optional country/city words to use when the title has no
 *                Latin characters (e.g. "dubai", "russian theatre dubai")
 */
export function generateEventSlug(
  title: string,
  id: number | string,
  hint?: string | null,
): string {
  const base = slugify(title);

  if (base) return `${base}-${id}`;

  // No Latin characters in the title. Build a readable slug from the hint
  // (country/city) so the URL still tells a human and a crawler something.
  const hintSlug = slugify(hint || '');

  if (hintSlug) return `${hintSlug}-${id}`;

  // Last resort: the id on its own.
  return `${id}`;
}

/** Lowercase, strip accents and punctuation, join words with hyphens. */
export function slugify(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFKD')
    // Strip the combining marks left behind by NFKD, so "café" -> "cafe".
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
