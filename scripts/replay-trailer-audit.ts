/**
 * REPLAY HARNESS — replays the 2026-11-18 trailer audit against this matcher.
 *
 * WHY THIS EXISTS
 * ---------------
 * The unit tests are hand-written, so they can only prove what their author
 * already thought of. The 2026-11-18 audit produced 858 labelled rows with a
 * verdict for each one, decided by a review of TMDB's video list plus the
 * video's own oEmbed title. That is ground truth, and the only honest way to
 * know whether the matcher agrees with a reviewed decision rather than with
 * our own reasoning.
 *
 * For every labelled row, replay the decision the cron would now make and
 * compare it with the audited verdict:
 *
 *   CONFIRMED_CORRECT  -> the stored key must still be ACCEPTED
 *   WRONG_VIDEO        -> the stored key must be REJECTED
 *   DEAD_OR_UNEMBEDDABLE -> the stored key must be REJECTED
 *   NO_TRAILER_ON_TMDB -> no key may be written for that film
 *   UNVERIFIABLE_NO_TMDB_ID -> left alone (no tmdb_id, cannot check)
 *
 * The harness reads TMDB data from the cached audit payload
 * (bn-task/tmdb-api.json), so it needs no network and no API key.
 *
 * Run with:  npx tsx scripts/replay-trailer-audit.ts
 */
import { readFileSync, existsSync } from 'node:fs';
import { titleRefersToFilm } from '../src/lib/trailer-verification';

const AUDIT_DIR = process.env.AUDIT_DIR ?? '/Users/shareefali/bn-task';
const AUDIT_FILE = `${AUDIT_DIR}/analysis.json`;
const TMDB_CACHE = `${AUDIT_DIR}/tmdb-api.json`;

interface AuditRow {
  id: string;
  title: string;
  release_date: string;
  tmdb_id: number | null;
  stored_key: string;
  oe_status: number;
  oe_title: string;
  oe_author: string;
  tmdb_key_found: string;
  tmdb_official_title: string;
  verdict: string;
  conf: number;
  action: string;
  tmdb_total_videos: number;
  repair_key: string;
  repair_title: string;
  repair_type: string;
  notes: string;
}

interface TmdbVideo {
  key: string;
  site: string;
  name: string;
  type: string;
  official: boolean;
  published?: string;
  size?: number;
  iso?: string;
}

interface TmdbEntry {
  tmdb_id: number;
  api_status: number;
  videos: TmdbVideo[];
  meta: {
    title: string;
    original_title: string;
    release_date: string;
    year: string;
    original_language: string;
  };
}

if (!existsSync(AUDIT_FILE) || !existsSync(TMDB_CACHE)) {
  console.error(`Missing audit files. Looked for:\n  ${AUDIT_FILE}\n  ${TMDB_CACHE}`);
  process.exit(2);
}

const rows: AuditRow[] = JSON.parse(readFileSync(AUDIT_FILE, 'utf8'));
const tmdbCache: Record<string, TmdbEntry> = JSON.parse(readFileSync(TMDB_CACHE, 'utf8'));

/** The titles a film is known by, used for matching. */
function filmTitles(row: AuditRow): string[] {
  const titles = [row.title];
  const entry = row.tmdb_id ? tmdbCache[String(row.tmdb_id)] : undefined;
  if (entry?.meta?.title) titles.push(entry.meta.title);
  if (entry?.meta?.original_title) titles.push(entry.meta.original_title);
  return titles;
}

const stats = {
  total: 0,
  agree: 0,
  disagree: 0,
  skipped: 0,
  falseReject: 0,
  falseAccept: 0,
};

const disagreements: any[] = [];

const LENIENT = process.env.REPLAY_LENIENT === '1';

/**
 * Replay the decision for one row.
 *
 * 'accept' when the matcher says the stored key is the right trailer for the
 * film, 'reject' when it says it is not, 'skip' when there is nothing to
 * check.
 */
function refers(titles: string[], videoTitle: string): boolean {
  return titleRefersToFilm(titles, videoTitle, { rejectCompoundMatch: !LENIENT }).matched;
}
function replay(row: AuditRow): 'accept' | 'reject' | 'skip' {
  if (!row.stored_key) return 'skip';
  if (row.oe_status !== 200) return 'reject'; // dead link, nothing to match

  const titles = filmTitles(row);

  // A video whose own title names the film is a match.
  if (refers(titles, row.oe_title)) return 'accept';

  // Failing that, is the key in TMDB's own video list for this film?
  const entry = row.tmdb_id ? tmdbCache[String(row.tmdb_id)] : undefined;
  if (entry?.videos?.some((v) => v.key === row.stored_key)) {
    // TMDB scopes the list to the film, but a video can still be for another
    // film entirely — the "Kara" case, where a PS5 game trailer was filed
    // under a film of the same name. Only accept when the video's own name
    // agrees with the film.
    const name = entry.videos.find((v) => v.key === row.stored_key)!.name;
    if (refers(titles, name)) return 'accept';
    return 'reject';
  }

  return 'reject';
}

for (const row of rows) {
  if (row.verdict === 'UNVERIFIABLE_NO_TMDB_ID') {
    stats.skipped++;
    continue;
  }

  stats.total++;
  const decision = replay(row);
  const shouldAccept = row.verdict === 'CONFIRMED_CORRECT';

  if ((decision === 'accept') === shouldAccept) {
    stats.agree++;
  } else {
    stats.disagree++;
    if (shouldAccept) stats.falseReject++;
    else stats.falseAccept++;
    disagreements.push({
      title: row.title,
      verdict: row.verdict,
      decision,
      oe_title: row.oe_title,
      film_titles: filmTitles(row),
      tmdb_id: row.tmdb_id,
    });
  }
}

console.log('\n=== REPLAY: 2026-11-18 trailer audit vs new matcher ===\n');
console.log(`  rows replayed : ${stats.total}`);
console.log(`  skipped       : ${stats.skipped}  (no tmdb_id — cannot be checked)`);
console.log(`  agree         : ${stats.agree}`);
console.log(`  disagree      : ${stats.disagree}`);
console.log(`    of which rejected a key the audit had ACCEPTED : ${stats.falseReject}`);
console.log(`    of which accepted a key the audit had REJECTED : ${stats.falseAccept}`);

if (disagreements.length) {
  console.log('\n--- disagreements ---');
  for (const d of disagreements.slice(0, process.env.DUMP_ALL ? 5000 : 40)) {
    console.log(
      `  "${d.title}" [tmdb ${d.tmdb_id}] audit=${d.verdict} matcher=${d.decision}\n` +
        `     video title : ${d.oe_title}\n` +
        `     film titles : ${d.film_titles.join(' | ')}`
    );
  }
  if (disagreements.length > 40) console.log(`  ... and ${disagreements.length - 40} more`);
}

console.log('');
process.exit(stats.disagree === 0 ? 0 : 1);
