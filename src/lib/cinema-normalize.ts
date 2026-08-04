/**
 * Shared cinema title normalization utility.
 * Used by both the scraper sync pipeline (scripts/sync-cinema.ts)
 * and the display layer (src/app/cinema/page.tsx).
 *
 * IMPORTANT: Keep this file in sync with any normalization changes.
 * The dedup key used in display must match the dedup key used in sync.
 */

const FORMAT_TOKENS = [
  '3d', '2d', 'imax', '4dx', 'mal', 'tam', 'hin', 'tel', 'arabic', 'english',
];

/**
 * Strip trailing format/language markers from the END of a title.
 * Tokens are matched case-insensitively at the end of the string,
 * inside () or [] brackets.
 *
 * Examples:
 *   "SPIDER-MAN: BRAND NEW DAY(3D)" → "SPIDER-MAN: BRAND NEW DAY"
 *   "Spider-Man (MAL)" → "Spider-Man"
 *   "Moana [2D]" → "Moana"
 *   "Moana (Live Action)" → "Moana (Live Action)"  ← not a format token
 */
export function stripFormatVariants(title: string): string {
  return title.replace(
    /\s*[\[\(]\s*(${FORMAT_TOKENS.join('|')})\s*[\]\)]\s*$/gi,
    '',
  );
}

/**
 * Normalize a title for deduplication matching.
 * Steps:
 *  1. Strip format variants (3D, MAL, etc.)
 *  2. Strip leading "the"
 *  3. Remove all non-alphanumeric characters
 *  4. Lowercase + trim
 *
 * This produces a key that two variants of the same film will share,
 * while different films almost never collide.
 */
export function normalizeTitle(title: string): string {
  return stripFormatVariants(title)
    .toLowerCase()
    .replace(/^the\s+/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}
