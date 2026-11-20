/**
 * ADMIN OVERRIDES for the cinema sync.
 *
 * WHY THIS EXISTS
 * ---------------
 * The cinema lists a film under a SHORT NAME that is not the film's real
 * title. VOX Bahrain lists TMDB id 1719068 as "Crypto"; the film is
 * "Tales from the Crypto" (2026).
 *
 * The scraped title must not win. "Crypto" on its own is meaningless to a
 * visitor, and it is also a bad search term — searching "Crypto" finds
 * nothing, while "Tales from the Crypto" finds the film. So the admin
 * override sets the DISPLAY TITLE to the real one, and the sync applies it
 * on every run so the override survives a re-sync.
 *
 * THIS MAP IS THE ADMIN SURFACE
 * ------------------------------
 * It is a small, explicit, auditable list — one entry per film that needs a
 * human decision. Adding an entry here is a deliberate act with a
 * reviewable diff, which is exactly what an override should be. The table
 * it is applied to (`movies`) is what the admin cinema screen edits; this
 * map is the "this title is wrong, and here is the right one" list that the
 * sync must not undo.
 *
 * KEYED BY TMDB ID
 * ----------------
 * Keyed by the TMDB id, NOT by the title. A title-keyed override breaks the
 * moment the cinema changes how it prints the title (it would silently stop
 * applying), and it cannot distinguish two different films that share a
 * short name.
 */

export interface MovieOverride {
  /**
   * The title to store and display.
   *
   * This REPLACES the scraped title on the row.
   */
  title?: string;
  /**
   * An optional note explaining the override, for the audit trail.
   */
  note?: string;
}

/**
 * The overrides, keyed by TMDB movie id.
 *
 * Verified against TMDB on 2026-11-20:
 *   https://www.themoviedb.org/movie/1719068 -> "Tales from the Crypto" (2026)
 */
export const MOVIE_OVERRIDES: Record<string, MovieOverride> = {
  '1719068': {
    title: 'Tales from the Crypto',
    note: 'VOX lists this film as "Crypto"; the real title is "Tales from the Crypto" (2026).',
  },
};

/**
 * The override for a TMDB id, if there is one.
 */
export function getMovieOverride(tmdbId: number | string | null | undefined): MovieOverride | null {
  if (tmdbId === null || tmdbId === undefined || tmdbId === '') return null;
  const key = String(tmdbId).trim();
  if (!key) return null;
  const override = MOVIE_OVERRIDES[key];
  return override ?? null;
}

/**
 * Apply the override to a scraped title.
 *
 * Returns the title unchanged when there is no override, or when the
 * override does not set a title.
 */
export function applyTitleOverride(
  scrapedTitle: string,
  tmdbId: number | string | null | undefined
): string {
  const override = getMovieOverride(tmdbId);
  if (override?.title) return override.title;
  return scrapedTitle;
}
