/**
 * Cleanup guard for the cinema sync.
 *
 * The sync demotes a film ("Removed from showing") when its title is absent
 * from the freshly scraped lists. That comparison is only valid when BOTH
 * scrapers returned a fresh list. If one scraper fails silently and returns
 * 0 movies, every film it owns looks "absent" — so the cleanup hides films
 * that are still listed on the cinema's own site.
 *
 * On 2026-11-19 the Cineco scraper returned 0 movies in the second sync run
 * of the day. The combined total still passed the old threshold (VOX
 * supplied 24), so the cleanup ran and demoted 15 films. The live /cinema
 * page fell from 34 cards to 24 in that single run.
 *
 * A finer, per-source rule was considered — demote a film only if the source
 * that owns it produced a fresh list. It was rejected: rows written before
 * the source-tracking fix carry `scraped_from = ['vox']` even when the film
 * is a Cineco film, so the per-source rule cannot tell a genuinely dropped
 * VOX film from a Cineco film that only looked absent because the Cineco
 * scraper failed. With bad attribution, the safe rule is the blunt one:
 * if ANY source failed, do not clean anything up.
 *
 * This module holds the decision as a pure function so it can be tested
 * without a database or a network.
 */

/** The scrapers the cinema sync depends on. */
export const KNOWN_SOURCES = ['vox', 'cineco'] as const;

export interface CleanupDecision {
  /** Whether the cleanup step may run at all. */
  run: boolean;
  /** Sources that returned 0 movies this run. */
  failedSources: string[];
  /** A human-readable explanation for the log. */
  reason: string;
}

/**
 * Decides whether the "remove movies no longer showing" step may run.
 *
 * @param totals How many movies each source returned (now showing + coming soon).
 */
export function decideCleanup(
  totals: Record<string, number>,
  knownSources: readonly string[] = KNOWN_SOURCES,
): CleanupDecision {
  const failedSources = knownSources.filter((source) => (totals[source] ?? 0) === 0);

  if (failedSources.length === 0) {
    return {
      run: true,
      failedSources: [],
      reason: 'every source returned a fresh list',
    };
  }

  return {
    run: false,
    failedSources,
    reason:
      `source(s) ${failedSources.join(', ')} returned 0 movies — their scrapers are ` +
      'failing silently, so the fresh lists are incomplete and every film they ' +
      'own would look absent',
  };
}
