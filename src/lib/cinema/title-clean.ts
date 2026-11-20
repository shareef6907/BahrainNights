/**
 * THE ONE cleanTitle.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Four separate implementations of `cleanTitle` used to live in this repo:
 *
 *   scripts/scrape-vox.ts:27           <- BROKEN, and this is the one sync-cinema ran
 *   scripts/scrape-cineco.ts:44        <- entities only, no rating stripping
 *   src/lib/scrapers/vox-bahrain.ts:52 <- had a CORRECT regex, but nothing imported it
 *   src/lib/scrapers/cineco-bahrain.ts:36
 *
 * `sync-cinema.ts` imported from `./scrape-vox`, so the broken copy sat in the
 * production path while a correct one sat unused. That drift — not the regex
 * itself — was the root cause. One implementation, imported by every call
 * site, removes the possibility of the drift recurring.
 *
 * THE BUG
 * -------
 * The broken regex was:
 *
 *   pattern : ^(PG\s*\d*|18TC|15\+|TC\s*\d+|R|Rated\s+\w+|Rated)\s*
 *   flags   : i
 *
 * It was broken in two independent directions:
 *
 *   (a) Bare `R` followed by `\s*` — ZERO width — so the R was stripped from
 *       any title beginning with R:
 *           Ramayana   -> amayana
 *           Rocky      -> ocky
 *           Ran        -> an
 *       The `\s*` was intended as "optional trailing space" but it made the
 *       rating token itself optional, so it matched the bare letter R.
 *
 *   (b) JavaScript alternation is LEFTMOST-WINS, not longest-match. Bare `R`
 *       appears BEFORE `Rated\s+\w+` in the alternation, so "Rated PG Sinners"
 *       matched the `R` branch and became "ated PG Sinners". Every `Rated`
 *       branch was unreachable dead code — the pattern failed at the exact job
 *       it was written for.
 *
 * THE FIX
 * -------
 *   - Require TRAILING WHITESPACE (`\s+`, never `\s*`) so a rating token must
 *     be followed by a space. A bare `R` with no space after it is part of the
 *     title ("Ramayana", "Ran") and is left alone.
 *   - Order the alternation LONGEST-FIRST so the `Rated PG` form is tried
 *     before the bare `R`.
 *   - Match the rating against a VOCABULARY of real certification tokens
 *     rather than `\w+`. `\w+` would consume the first word of the TITLE:
 *     "Rated Movie" would become "Movie", and a title beginning "R" followed
 *     by a space ("R Ramayana") needs the bare-R branch, so the vocabulary
 *     has to be explicit about what counts as a rating.
 */

/**
 * Certification tokens a cinema may print.
 *
 * NOTE: bare single letters (R, U, A, G, M) are included because they are
 * real certifications, but they are only matched as a WHOLE word — never as a
 * suffix of a longer word. "Ramayana" must never lose its final "a", and
 * "12 Years a Slave" must never lose its "12".
 */
const RATING_VOCAB = String.raw`(?:PG-?\d*|MA-?\d*\+?|18-?\+?(?:TC)?|15-?\+?|12A|TC-?\d*|R|U|A|G|M)`;

/**
 * The same vocabulary without the single-letter certifications, for use where
 * a bare letter would be ambiguous with an ordinary word.
 */
const RATING_VOCAB_MULTI = String.raw`(?:PG-?\d*|MA-?\d*\+?|18-?\+?(?:TC)?|15-?\+?|12A|TC-?\d*)`;

/**
 * Leading rating / certification token.
 *
 * Branch order is significant — JavaScript alternation is leftmost-wins:
 *
 *  1. "Rated <rating>"  — must come first, or the bare-R branch eats it and
 *                          "Rated PG Sinners" becomes "ated PG Sinners".
 *  2. "<rating>"        — including the bare R, which REQUIRES a trailing
 *                          space so "Ramayana" is never damaged.
 *
 * Exactly ONE token is stripped: the regex is not global, so a second
 * rating ("PG 18 Movie") leaves "18 Movie" rather than "Movie".
 */
const LEADING_RATING = new RegExp(
  String.raw`^(?:Rated\s+${RATING_VOCAB}|${RATING_VOCAB})\s+`,
  'i'
);

/** A trailing tag in parentheses, e.g. "(PG)", "(IMAX)", "(2026)". */
const TRAILING_PAREN_TAG = new RegExp(
  String.raw`\s*\(\s*(?:${RATING_VOCAB}|IMAX|3D|4DX|DOLBY|ATMOS|MAX|GOLD|KIDS|VIP|THEATRE|ARABIC|ENGLISH|HINDI|DUB(?:BED)?|TBC)\s*\)\s*$`,
  'i'
);

/**
 * A trailing tag NOT in parentheses. Requires preceding whitespace and a
 * multi-character token, so "Ramayana" cannot lose a trailing letter.
 */
const TRAILING_BARE_TAG = new RegExp(
  String.raw`\s+(?:${RATING_VOCAB_MULTI}|IMAX|3D|4DX|DOLBY|ATMOS|GOLD|KIDS|VIP|THEATRE|ARABIC|ENGLISH|HINDI|DUB(?:BED)?|TBC)\s*$`,
  'i'
);

/** A trailing year in parentheses, e.g. "Rocky (1976)". */
const TRAILING_YEAR = /\s*\(\d{4}\)\s*$/;

/** A trailing duration, e.g. "Alien (97 mins)" or "Alien 2 hours 17 mins". */
const TRAILING_DURATION = new RegExp(
  String.raw`(?:\s*\(|\s+)\s*\d+\s*(?:mins?|hours?|hrs?|hr)(?:\s*\d+\s*(?:mins?|hours?|hrs?|hr))*\s*\)?\s*$`,
  'i'
);

/**
 * A trailing SCREENING FORMAT, e.g. "Dune: Part Three -Preview Screening".
 *
 * A cinema prints the format it is screening a film in as a suffix. It is
 * NOT part of the title, so "Dune: Part Three" and "Dune: Part Three
 * -Preview Screening" are the SAME film and must not become two rows.
 *
 * The observed real suffixes are:
 *   -Preview Screening, -Preview, -Special Screening, -Special,
 *   -Advanced Screening
 *
 * The separator may be `-`, `–`, `—`, `:` or whitespace, with any spacing.
 *
 * WHY IT NEEDS ITS OWN RULE, AND WHY IT IS ORDERED FIRST
 * ------------------------------------------------------
 * "Preview", "Special" and "Advanced" are ordinary English words. The
 * generic TRAILING_BARE_TAG only strips a KNOWN vocabulary (IMAX, 3D, GOLD…),
 * so it would never touch them — but a screening suffix must be stripped
 * BEFORE the parenthesised-tag and duration rules run, because a suffix like
 * "(Preview Screening)" or "Preview Screening (2D)" puts the format token in
 * a position the later rules would otherwise consume first.
 *
 * The token must be preceded by a separator and followed by the END of the
 * string, so an ordinary title that merely ENDS in one of these words is
 * untouched:
 *
 *   "Avengers: Doomsday (Infinity Vision)"  -> unchanged  (a real VOX title)
 *   "The Preview"                           -> unchanged
 *   "Something Special"                     -> unchanged
 *   "Crypto"                                -> unchanged
 *
 * A SINGLE-WORD "Preview"/"Special" is only stripped when it is introduced
 * by an EXPLICIT separator (-, –, —, :), because a title that merely ends in
 * the word "Special" is a title, not a screening format. The multi-word
 * forms ("Preview Screening", "Special Screening", "Advanced Screening") are
 * unambiguous and are stripped after plain whitespace too.
 */
const TRAILING_SCREENING_FORMAT = new RegExp(
  String.raw`(?:[-–—:]\s*(?:Preview\s+Screening|Special\s+Screening|Advanced\s+Screening|Preview|Special)|(?:\s+)(?:Preview\s+Screening|Special\s+Screening|Advanced\s+Screening))\s*$`,
  'i'
);

/** HTML entities both cinemas' markup uses. */
const ENTITIES: Array<[RegExp, string]> = [
  [/&amp;/g, '&'],
  [/&#39;/g, "'"],
  [/&apos;/g, "'"],
  [/&quot;/g, '"'],
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/&nbsp;/g, ' '],
];

export interface CleanTitleOptions {
  /**
   * Strip a leading rating/certification token ("PG13 ", "18TC ", "Rated PG ").
   * Only a token followed by whitespace is stripped, so "Ramayana" and "Ran"
   * are never damaged. Default true.
   */
  stripLeadingRating?: boolean;
  /**
   * Strip trailing tags: rating, year, duration, IMAX/3D/4DX, language.
   * Default true.
   */
  stripTrailingTags?: boolean;
  /**
   * Convert an ALL-CAPS display title ("THE CAT IN THE HAT") to Title Case.
   * Words that look like styled acronyms (containing an internal period, e.g.
   * "M.I.A.") are left alone. Default false — this changes the title text, so
   * only enable it where that is wanted.
   */
  toTitleCase?: boolean;
}

/**
 * Normalise a movie title as printed by a cinema.
 *
 * @param title   raw title, possibly with HTML entities, a rating prefix and
 *                trailing tags
 * @param options see {@link CleanTitleOptions}
 */
export function cleanTitle(title: string, options: CleanTitleOptions = {}): string {
  if (!title) return '';

  const {
    stripLeadingRating = true,
    stripTrailingTags = true,
    toTitleCase: wantTitleCase = false,
  } = options;

  let cleaned = title;

  for (const [pattern, replacement] of ENTITIES) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  if (stripTrailingTags) {
    // Order matters. The screening format comes FIRST: it is the most
    // specific suffix, and it must be removed before the generic trailing
    // rules can consume part of it (e.g. "Preview Screening (2D)"). Then
    // duration, then the parenthesised tag, then the year, then any bare
    // trailing tag.
    cleaned = cleaned.replace(TRAILING_SCREENING_FORMAT, '');
    cleaned = cleaned.replace(TRAILING_DURATION, '');
    cleaned = cleaned.replace(TRAILING_PAREN_TAG, '');
    cleaned = cleaned.replace(TRAILING_YEAR, '');
    cleaned = cleaned.replace(TRAILING_BARE_TAG, '');
  }

  if (stripLeadingRating) {
    // ONE token only — the regex is not global.
    cleaned = cleaned.replace(LEADING_RATING, '');
  }

  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  if (wantTitleCase) {
    cleaned = toTitleCase(cleaned);
  }

  return cleaned;
}

/**
 * Convert an ALL-CAPS display title to a readable one.
 *
 * Words that are already styled (containing an internal period, e.g. "M.I.A.")
 * are left alone.
 */
export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map((word) => {
      if (!word) return word;
      if (word.includes('.') && word.length <= 6) return word;
      const match = word.match(/^([("'[]*)(.*?)([)"'\].,!?:]*)$/);
      if (!match) return word;
      const [, open, core, close] = match;
      if (!core) return word;
      return `${open}${core.charAt(0).toUpperCase()}${core.slice(1).toLowerCase()}${close}`;
    })
    .join(' ');
}
