/**
 * THE CINEMA TITLE NORMALISER.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * A cinema lists the SAME film more than once, and the listing page then
 * shows the visitor two cards for one film:
 *
 *   "Dune: Part Three"                      and "Dune: Part Three -Preview Screening"
 *   "Aakasamlo Oka Tara"                    and "Aakasamlo Oka Tara (Malayalam)"
 *   "Three Wishes for Cinderella"            and "Three Wishes for Cindrella"
 *   "OM - Chapter 1: Udhiram - The Blood"   and "Om CH.1 Udhiram:the Blood Wood"
 *
 * The first pair is the same film in two screening formats. The second and
 * third are the same film listed by two different cinemas, each printing it
 * their own way. The fourth is a mangled title that only a human can pair
 * with its twin.
 *
 * The database cleanup that would fix this has not been run. Rather than wait
 * for it — and rather than hide the duplicates behind a CSS trick — the page
 * collapses them at RENDER time, so the site is correct today and stays
 * correct whether or not the SQL is ever executed.
 *
 * THE RULES, IN ORDER
 * --------------------
 *   1. A SCREENING FORMAT is not part of the title. "Preview Screening",
 *      "Special Screening", "Early Access", "Fan Event" and their variants
 *      are stripped, and the remaining title is the film's identity.
 *
 *   2. A LANGUAGE or FORMAT tag in parentheses is not part of the title
 *      either — but only when the SAME film also appears without it. A film
 *      that is ONLY listed as "Ramayana: Rise Legend(malayal)" keeps its tag,
 *      because there is nothing to merge it with.
 *
 *   3. A MANGLED title is paired with its twin through an explicit alias
 *      list. Fuzzy distance matching is NOT used: it was tried and it cost
 *      real films. An alias is a deliberate, reviewable statement.
 *
 * WHY NOT NORMALISE AT THE DATABASE LEVEL?
 * ----------------------------------------
 * Because the database is shared with the API, the sitemap, the JSON-LD and
 * the admin screens. Changing what a row is CALLED in the database to fix
 * what a PAGE shows is a much bigger blast radius than the page itself, and
 * the SQL cleanup that would do it properly has not been run. The page is
 * where the duplicate is visible, so the page is where it is fixed.
 */

import { cleanTitle } from './title-clean';

/**
 * Titles that are the SAME film but are printed too differently for any
 * rule to pair them.
 *
 * Each entry is the pair of spellings, and the value is the canonical title
 * the page should show. This is the same mechanism as the admin override
 * for "Crypto" -> "Tales from the Crypto": a human says these are one film,
 * and the code does what the human said.
 *
 * KEYED BY THE NORMALISED FORM OF THE MANGLED TITLE.
 */
export const TITLE_ALIASES: Record<string, string> = {
  /*
   * The keys are the FOLDED form of the title: lower-case, no punctuation,
   * no accents, no spaces. Each key is the fold of ONE of the two spellings,
   * and the value is the canonical title the page shows.
   *
   * Both spellings of each pair are listed, so whichever one a row happens
   * to carry, the group forms.
   */

  // VOX prints "OM - Chapter 1: Udhiram - The Blood"; Cineco prints
  // "Om CH.1 Udhiram:the Blood Wood". Same film, two listings, one poster.
  'omchapter1udhiramtheblood': 'OM - Chapter 1: Udhiram - The Blood',
  'omch1udhiramthebloodwood': 'OM - Chapter 1: Udhiram - The Blood',

  // Cineco's card truncates the title at a fixed character width, which cut
  // the last letter off "Cinderella".
  'threewishesforcindrella': 'Three Wishes for Cinderella',
  'threewishesforcinderella': 'Three Wishes for Cinderella',

  // The Cineco listing appends the language in parentheses to some titles,
  // and one of them has the final letter cut off as well.
  'aakasamlookataramalayalam': 'Aakasamlo Oka Tara',
  'ramayanariseleg': 'Ramayana: Rise Legend',
  'ramayanariselegendmalayal': 'Ramayana: Rise Legend',
  'ramayanariselegendhindi': 'Ramayana: Rise Legend',
};

/**
 * A screening format a cinema prints as a suffix. It is not part of the
 * title.
 *
 * The separator may be "-", "–", "—", ":" or whitespace. The multi-word
 * forms are unambiguous; the single-word forms ("Preview", "Special") are
 * only stripped when an explicit separator introduces them, so a film that
 * merely ENDS in one of those words keeps its title.
 */
const SCREENING_FORMAT_SUFFIX = new RegExp(
  String.raw`\s*[-–—:]?\s*` +
    String.raw`(?:Preview\s+Screening|Special\s+Screening|Advanced\s+Screening|` +
    String.raw`Early\s+Access|Early\s+Access\s+Screening|Fan\s+Event|` +
    String.raw`Advanced\s+Preview|Special\s+Preview|Preview|Special)` +
    String.raw`\s*$`,
  'i'
);

/**
 * A trailing language or format tag in parentheses, e.g. "(Malayalam)",
 * "(Hindi)", "(Telugu)", "(Tamil)", "(2D)".
 */
const TRAILING_LANGUAGE_TAG = /\s*\((?:Malayalam|Hindi|Telugu|Tamil|Kannada|Marathi|Bengali|Punjabi|Gujarati|English|Arabic|Urdu|Nepali|Sinhala|2D|3D|4DX|IMAX|DOLBY|ATMOS)\)\s*$/i;

/**
 * Normalise a title for IDENTITY purposes: the same film, whatever spelling.
 *
 * This is the key a duplicate group is built on. It folds the screening
 * format, the language tag, punctuation, case and accents together, so
 * "Dune: Part Three -Preview Screening" and "Dune: Part Three" produce the
 * same key.
 */
export function filmIdentityKey(title: string | null | undefined): string {
  if (!title) return '';

  // 1. The screening format and the language tag are not the title.
  let t = title;
  // The screening format is stripped first: it must come off before the
  // parenthesised-tag rule, or "(Malayalam)" would be consumed first.
  t = t.replace(SCREENING_FORMAT_SUFFIX, '');
  t = t.replace(TRAILING_LANGUAGE_TAG, '');

  // 2. The shared cleanTitle: entities, a leading rating, trailing tags.
  t = cleanTitle(t);

  // 3. The screening format again — cleanTitle may have exposed one.
  t = t.replace(SCREENING_FORMAT_SUFFIX, '');
  t = t.replace(TRAILING_LANGUAGE_TAG, '');

  // 4. An explicit alias wins over everything.
  const aliasKey = foldForAlias(t);
  if (TITLE_ALIASES[aliasKey]) {
    t = TITLE_ALIASES[aliasKey];
    // The canonical title may itself have an alias entry, so fold again.
    const canonical = TITLE_ALIASES[foldForAlias(t)];
    if (canonical) t = canonical;
  }

  // 5. Fold to a comparable form: lowercase, no punctuation, no accents,
  //    collapsed whitespace.
  return t
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The alias lookup key: the same fold, but WITHOUT the alias applied, so a
 * title can find its own alias entry.
 */
function foldForAlias(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .trim();
}

/**
 * The title the page should DISPLAY for a film.
 *
 * The alias wins, because the alias names the film's real title. Otherwise
 * the title is returned unchanged — the display title is what the cinema
 * published, and rewriting it is not this function's job.
 */
export function displayTitleFor(title: string): string {
  const alias = TITLE_ALIASES[foldForAlias(cleanTitle(title))];
  return alias || title;
}

/**
 * A film group: every row that is the same film.
 */
export interface FilmGroup<T> {
  /** The row that should be shown. */
  winner: T;
  /** Every row in the group. */
  members: T[];
  /** The shared identity key. */
  key: string;
}

/**
 * Collapse rows that are the same film into one group.
 *
 * The winner is chosen with the SAME rule the page already used — the film
 * whose release date is closest to now, because that is the film the cinema
 * is actually screening — with the poster and the rating as tiebreaks.
 */
export function groupSameFilm<T extends {
  title: string;
  poster_url?: string | null;
  backdrop_url?: string | null;
  tmdb_rating?: number | null;
  release_date?: string | null;
  id?: string;
}>(rows: T[], isNowShowing: boolean, now: number): FilmGroup<T>[] {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const key = filmIdentityKey(row.title);
    if (!key) continue;
    const existing = groups.get(key);
    if (existing) {
      existing.push(row);
    } else {
      groups.set(key, [row]);
    }
  }

  return Array.from(groups.entries()).map(([key, members]) => ({
    key,
    members,
    winner: pickWinner(members, isNowShowing, now),
  }));
}

/**
 * Choose the row to show for a group of rows that are the same film.
 */
function pickWinner<T extends {
  title: string;
  poster_url?: string | null;
  backdrop_url?: string | null;
  tmdb_rating?: number | null;
  release_date?: string | null;
  id?: string;
}>(rows: T[], isNowShowing: boolean, now: number): T {
  if (rows.length === 1) return rows[0];

  const releaseDistance = (row: T): number => {
    if (!row.release_date) return Number.POSITIVE_INFINITY;
    const t = new Date(row.release_date).getTime();
    if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
    return Math.abs(t - now);
  };

  return [...rows].sort((a, b) => {
    // The film whose release date is closest to now is the one screening.
    const distance = releaseDistance(a) - releaseDistance(b);
    if (distance !== 0) return distance;

    // Then: the one we can actually show.
    const posterA = hasArtwork(a) ? 0 : 1;
    const posterB = hasArtwork(b) ? 0 : 1;
    if (posterA !== posterB) return posterA - posterB;

    // Then: the better rated one.
    const ratingA = a.tmdb_rating ?? -1;
    const ratingB = b.tmdb_rating ?? -1;
    if (ratingA !== ratingB) return ratingB - ratingA;

    // Then: a stable tiebreak, so the page does not shuffle between renders.
    return String(a.id ?? '').localeCompare(String(b.id ?? ''));
  })[0];
}

/**
 * Does this row carry artwork?
 */
export function hasArtwork(row: {
  poster_url?: string | null;
  backdrop_url?: string | null;
}): boolean {
  return isUsableImage(row.poster_url) || isUsableImage(row.backdrop_url);
}

/**
 * Is this a URL we can actually render?
 *
 * The old check was a SUBSTRING test for "null", which silently dropped any
 * legitimate URL containing those letters. This compares against the literal
 * strings.
 */
export function isUsableImage(url: string | null | undefined): boolean {
  if (!url) return false;
  const p = url.trim();
  if (!p) return false;
  if (p === 'null' || p === 'undefined') return false;
  if (p.includes('placeholder')) return false;
  return true;
}
