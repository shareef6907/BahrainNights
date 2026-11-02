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

  // No Latin characters in the title — it is written in Cyrillic (or another
  // non-Latin script). Transliterate it rather than giving up, so the URL
  // still describes the event instead of being a bare id.
  const translit = slugify(transliterate(title));

  if (translit) return `${translit}-${id}`;

  // Still nothing usable. Build a readable slug from the hint
  // (country/city) so the URL still tells a human and a crawler something.
  const hintSlug = slugify(hint || '');

  if (hintSlug) return `${hintSlug}-${id}`;

  // Last resort: the id on its own.
  return `${id}`;
}

/**
 * Is this slug too broken to keep?
 *
 * Two shapes count as broken:
 *   "--108813" — hyphens with no words in them. This is what the old slug
 *                code produced for a title written entirely in a script it
 *                could not transliterate.
 *   "108813"   — a bare id, which describes nothing.
 *
 * Either way the URL is worthless to a reader and to a crawler, so it is
 * worth regenerating.
 */
export function isUnusableSlug(slug: string | null | undefined): boolean {
  const s = (slug || '').trim();
  if (!s) return true;
  if (/^-+/.test(s)) return true;
  if (/^\d+$/.test(s)) return true;
  return false;
}

/**
 * Which slug should an upsert write?
 *
 * The slug is part of the row's identity in the URL space. If Google has
 * indexed /events/<slug> and the upstream title changes — a rename, a
 * language switch, a re-worded listing — regenerating the slug breaks that
 * indexed URL and turns it into a 404 that keeps earning impressions.
 *
 * So: keep the existing slug, unless it is unusable, in which case take the
 * freshly generated one.
 */
export function resolveSlugForUpsert(
  existingSlug: string | null | undefined,
  generatedSlug: string,
): string {
  return isUnusableSlug(existingSlug) ? generatedSlug : (existingSlug as string);
}

/**
 * Cyrillic -> Latin transliteration.
 *
 * Platinumlist carries a large number of Russian-language listings (a whole
 * season of theatre shows in Dubai, for example). Their titles have no Latin
 * characters, so before this existed they were published at URLs like
 * `/events/--108813` — no words, useless to a reader, worthless to Google.
 *
 * This is a plain letter-for-letter transliteration (BGN/PCGN-ish), not a
 * translation. It only has to be stable and pronounceable: the point is that
 * the URL says something, and that the same title always produces the same
 * slug.
 */
const CYRILLIC_MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
  з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu',
  я: 'ya',
  // Ukrainian and Belarusian letters that show up in imported feeds.
  і: 'i', ї: 'yi', є: 'ye', ґ: 'g', ў: 'u',
};

export function transliterate(text: string): string {
  let out = '';
  for (const ch of text || '') {
    const lower = ch.toLowerCase();
    const mapped = CYRILLIC_MAP[lower];
    out += mapped === undefined ? ch : mapped;
  }
  return out;
}

/** Lowercase, strip accents and punctuation, join words with hyphens. */
export function slugify(text: string): string {
  const slug = (text || '')
    .toLowerCase()
    .normalize('NFKD')
    // Strip the combining marks left behind by NFKD, so "café" -> "cafe".
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // A slug made only of hyphens carries no information. It happens for a
  // fully non-Latin title: the Cyrillic words are stripped, the spaces
  // between them collapse to a single hyphen, and `.trim()` leaves "-".
  // Because "-" is truthy, the caller used to accept it as a usable base and
  // publish the URL as "/events/--108813". Return an empty string instead so
  // the caller falls through to its fallback.
  return /[a-z0-9]/.test(slug) ? slug : '';
}
