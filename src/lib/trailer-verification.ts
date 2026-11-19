/**
 * Trailer verification helpers.
 *
 * WHY THIS EXISTS
 * ---------------
 * The original trailer job searched YouTube for "<title> official trailer <year>"
 * and stored the FIRST hit, with no check that the hit was actually the film's
 * trailer. A video titled "Top Crypto To Buy In October 2026" outranked the
 * real trailer in the search results and was written onto the film "Crypto".
 *
 * A YouTube search result tells you nothing about WHICH film a video belongs to.
 * It is only a ranking. So the rule this module encodes is:
 *
 *   NEVER write a trailer key that has not been positively matched to the film.
 *
 * A key is positively matched when EITHER
 *   (a) the film has a tmdb_id and the key appears in TMDB's own video list for
 *       that film (TMDB is the authority on what belongs to which film), or
 *   (b) the video's own oEmbed title names the film (the cinema's own trailer
 *       link, or a search hit whose title refers to the film).
 *
 * When neither can be established, the trailer is left EMPTY. An empty trailer
 * is a cosmetic gap on one card. A wrong trailer is a credibility failure on
 * the whole site.
 */

/** Words that carry no identifying information in a video title. */
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'of', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'is',
  'it', 'with', 'by', 'from', 'as', 'la', 'le', 'el', 'de', 'los', 'las',
  'il', 'o', 'au', 'du', 'und', 'der', 'die', 'das', 'en', 'van', 'von',
  'no', 'nos', 'na', 'movie', 'film', 'official', 'trailer', 'teaser', 'hd',
  '4k', 'theatrical', 'final', 'full',
]);

/**
 * Generic trailer-boilerplate titles. A video whose oEmbed title is exactly
 * one of these tells us nothing about which film it belongs to, so it can
 * never be used as evidence of a match.
 */
const GENERIC_TITLES =
  /^(official\s+)?(movie\s+|full\s+)?(trailer|teaser|sneak peek|first look|preview|clip|official video|main trailer|second trailer|trailer 1|trailer 2|trailer 3|international trailer|official uk trailer|official us trailer|final trailer|world premiere|now playing|hd|\[subtitled\]|theatrical trailer|tickets on sale|tickets now on sale)(\s*\[.*\])?$/i;

/**
 * Tokens that are too common to identify a film on their own. "Malayalam",
 * "Hindi" and "Tamil" describe the LANGUAGE of a release, not the film, and a
 * video title containing only those plus one shared word is a weak signal.
 */
const WEAK_TOKENS = new Set([
  'malayalam', 'hindi', 'english', 'arabic', 'drama', 'chapter', 'project',
  'movie', 'film', 'love', 'life', 'story', 'world', 'night', 'day', 'king',
  'queen', 'city', 'sea', 'blood', 'bone', 'beast', 'passenger', 'runner',
  'hunter', 'sacrifice', 'titans', 'biker', 'hungry', 'toxic', 'magic',
  'wish', 'wishes', 'below', 'above', 'kannada', 'telugu', 'tamil', 'bengali',
  'marathi', 'punjabi', 'japanese', 'korean', 'chinese', 'turkish', 'greek',
  'russian', 'spanish', 'french', 'italian', 'dubai', 'now', 'show',
]);

/** Mathematical-alphanumeric characters, which YouTube titles sometimes use. */
const MATH_SYMBOLS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  for (let i = 0; i < 26; i++) {
    map[String.fromCodePoint(0x1d400 + i)] = upper[i];
    map[String.fromCodePoint(0x1d41a + i)] = lower[i];
  }
  for (let i = 0; i < 10; i++) {
    map[String.fromCodePoint(0x1d7ce + i)] = digits[i];
  }
  return map;
})();

/** Replace mathematical-alphanumeric characters with their plain equivalents. */
export function deMath(input: string): string {
  return input.replace(/[\u{1D400}-\u{1D7FF}]/gu, (char) => MATH_SYMBOLS[char] ?? '');
}

/**
 * Normalise a title for comparison: strip accents and math styling, lowercase,
 * and keep letters and digits from every script the catalogue uses.
 */
export function normalizeTitle(input: string | null | undefined): string {
  if (!input) return '';
  return deMath(String(input))
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\u2010-\u2015]/g, '-')
    // Keep letters, digits AND combining marks from EVERY script. An explicit
    // list of script ranges silently dropped Malayalam, Tamil and Telugu
    // titles, which made them unmatchable against their own TMDB entries.
    // Combining marks matter as much as letters here: Malayalam vowel signs
    // are marks, not letters, and dropping them turns "കൂടോത്രം" into
    // "ക ട ത ര".
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    // Re-compose. NFKD split the Latin accents (which we want stripped) but
    // it also split Malayalam vowel signs into separate marks, leaving a
    // string that renders the same but is not equal to the original.
    .normalize('NFC');
}

/** Split a title into meaningful tokens. */
export function tokenize(input: string | null | undefined): string[] {
  return normalizeTitle(input)
    .split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

/** Tokens long enough to identify a film (3+ characters). */
function keyTokens(input: string | null | undefined): string[] {
  return tokenize(input).filter((token) => token.length >= 3);
}

/** Fold a title to its bare alphanumeric form, for identity comparisons. */
export function foldTitle(input: string | null | undefined): string {
  return normalizeTitle(input).replace(/[^\p{L}\p{N}\p{M}]+/gu, '');
}

/**
 * Does the video's token sequence contain the film's token sequence, as a
 * contiguous run of whole words?
 *
 * A plain substring test is too weak. "Crypto" is a substring of
 * "Top Crypto To Buy In October 2026", so a substring match would have claimed
 * the crypto pitch was the trailer for the film "Crypto" — which is exactly
 * the bug this module exists to prevent. Whole-word containment is the
 * difference between naming a film and merely mentioning one of its words.
 */
function containsTokenSequence(filmTokens: string[], videoTokens: string[]): boolean {
  if (!filmTokens.length || filmTokens.length > videoTokens.length) return false;
  for (let start = 0; start + filmTokens.length <= videoTokens.length; start++) {
    let hit = true;
    for (let offset = 0; offset < filmTokens.length; offset++) {
      if (videoTokens[start + offset] !== filmTokens[offset]) {
        hit = false;
        break;
      }
    }
    if (hit) return true;
  }
  return false;
}

/**
 * Does the video's title treat the film's title as only the FIRST PART of a
 * longer, DIFFERENT title?
 *
 * Two shapes, both of which are a different work:
 *
 *   "Fathers & Daughters ..."   the film's own word is continued ("Father" +
 *                               "s"), so the word is not the film's title at
 *                               all;
 *   "Fate/strange Fake ..."     the film's word is the first half of a
 *                               compound title.
 *
 * This has to be judged on the RAW titles. Normalisation throws away the
 * slash and the spacing, and both carry the signal.
 *
 * It deliberately does NOT fire on a descriptive title such as
 * "Sinners | Black American Sign Language Official Trailer | Max" or
 * "Patriot Malayalam Trailer | Mammootty" — there the film's title is
 * complete and the words after it describe the video, not another film.
 */
function isCompoundTitleMismatch(filmTitle: string, videoTitle: string): boolean {
  const rawFilm = (filmTitle || '').trim().toLowerCase();
  const rawVideo = (videoTitle || '').trim().toLowerCase();
  // Only a ONE-WORD film title can be confused this way, and a title that
  // already contains a separator is not a bare word.
  if (!rawFilm || /\s/.test(rawFilm) || rawFilm.includes('/')) return false;

  const escaped = rawFilm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}`, 'u').exec(rawVideo);
  if (!match) return false;

  const after = rawVideo[match.index + match[0].length];
  if (!after) return false;
  // The film's own word continues — a longer word, not the film's title.
  if (/[\p{L}\p{N}]/u.test(after)) return true;
  // A slash makes a compound title: "Fate/strange Fake".
  if (after === '/') return true;
  return false;
}

/**
 * Does a CATALOGUE title refer to a TMDB entry's title?
 *
 * The catalogue often holds a shortened, lower-cased or otherwise trimmed
 * form of the title — "khalifa" for "Khalifa: The Ruler", "runner" for
 * "RUNNER", "batulo jun" for "Batulo Jun". So the catalogue title is allowed
 * to be a PREFIX of the TMDB title.
 *
 * It must NOT be allowed to match anywhere inside it. "english" is a word
 * inside "Johnny English", and mapping the catalogue row "english" onto
 * Johnny English is precisely the wrong-film bug this guards against: the row
 * would carry a popular film's poster, synopsis and cast while being titled
 * something else entirely.
 *
 * Pure-digit tokens (a release year) are ignored on both sides, because the
 * cinema site puts the year in the title and TMDB does not.
 */
export function catalogueTitleMatches(catalogueTitle: string, tmdbTitle: string): boolean {
  const strip = (value: string) => tokenize(value).filter((token) => !/^\d+$/.test(token));
  const catalogue = strip(catalogueTitle);
  const candidate = strip(tmdbTitle);
  if (!catalogue.length || !candidate.length) return false;
  if (catalogue.length > candidate.length) return false;
  for (let i = 0; i < catalogue.length; i++) {
    if (catalogue[i] !== candidate[i]) return false;
  }
  return true;
}

/**
 * The share of a film's tokens that also appear in a video title.
 */
function tokenOverlap(filmTitle: string, videoTitle: string): number {
  const filmTokens = new Set(tokenize(filmTitle));
  if (!filmTokens.size) return 0;
  let hits = 0;
  for (const token of filmTokens) {
    if (tokenize(videoTitle).includes(token)) hits++;
  }
  return hits / filmTokens.size;
}

/**
 * Does a video title refer to this film?
 *
 * The result carries the reason, because a caller that is about to write a
 * trailer key to the database should be able to log WHY it believed the match.
 */
export interface TitleMatch {
  matched: boolean;
  score: number;
  how: string;
}

/**
 * Options for {@link titleRefersToFilm}.
 */
export interface TitleMatchOptions {
  /**
   * Reject a match where the video's title CONTINUES the film's own title
   * word — "Father" against "Fathers & Daughters", or "Fate" against
   * "Fate/strange Fake".
   *
   * Default (true). Turn it off only to compare a catalogue title with a
   * TMDB entry, where the catalogue may hold a shortened form of the title.
   */
  rejectCompoundMatch?: boolean;
}

/**
 * Test whether `videoTitle` refers to any of `filmTitles`.
 *
 * `filmTitles` should hold every spelling of the film we know: the catalogue
 * title, TMDB's title, TMDB's original (home-market) title, and any known
 * aliases. Non-Latin titles are handled by the caller passing the original
 * title in; this matcher compares on whatever script it is given.
 */
export function titleRefersToFilm(
  filmTitles: (string | null | undefined)[],
  videoTitle: string | null | undefined,
  options: TitleMatchOptions = {}
): TitleMatch {
  if (!videoTitle) return { matched: false, score: 0, how: 'no-video-title' };

  const rejectCompoundMatch = options.rejectCompoundMatch !== false;

  const videoNormalized = normalizeTitle(videoTitle);
  if (!videoNormalized) return { matched: false, score: 0, how: 'no-video-title' };

  let best = 0;
  let how = '';

  const videoTokenList = tokenize(videoTitle);
  const videoTokenSet = new Set(videoTokenList);

  for (const filmTitle of filmTitles) {
    if (!filmTitle) continue;
    const filmNormalized = normalizeTitle(filmTitle);
    if (!filmNormalized) continue;

    const keys = keyTokens(filmTitle);

    // A ONE-WORD film title is the dangerous case, because a single common
    // word in a video title proves much less than a phrase does.
    //
    // "Fate" (tmdb 1286659) must not claim "Fate/strange Fake | Official
    // Trailer | Crunchyroll" — a completely different work whose title
    // happens to START with the same word. "Father" must not claim "Fathers &
    // Daughters". Both are whole-word matches on the first token, so token
    // containment alone cannot separate them.
    //
    // The separator is the title portion: the video's title before its
    // trailer marker. If that portion names the film's single token AND
    // contains nothing else that could be part of a work's title, the video
    // is about this film. If it carries extra words, the video names a
    // DIFFERENT work and the single-word match was a coincidence.
    const filmTokenList = tokenize(filmTitle);
    if (
      rejectCompoundMatch &&
      filmTokenList.length === 1 &&
      isCompoundTitleMismatch(filmTitle, videoTitle)
    ) {
      // The video's title continues the film's own word, so it names a
      // DIFFERENT work: "Father" cannot claim "Fathers & Daughters", and
      // "Fate" cannot claim "Fate/strange Fake".
      continue;
    }

    // Strongest signal: the video title contains the film's whole title, as a
    // run of whole words.
    //
    // A film whose title is ONE identifying word ("Crypto", "Fate", "Alpha")
    // gets a lower score than a multi-word title, because a single common
    // word appearing in a video title is weak evidence on its own.
    if (containsTokenSequence(tokenize(filmTitle), videoTokenList)) {
      const score = keys.length >= 2 ? 0.95 : 0.8;
      if (best < score) {
        best = score;
        how = `contains:${filmTitle}`;
      }
      continue;
    }

    // Every identifying token of the film appears in the video title. This
    // needs at least two identifying tokens: one token alone is the same weak
    // signal as above.
    if (keys.length >= 2 && keys.length <= 3 && keys.every((token) => videoTokenSet.has(token))) {
      if (best < 0.92) {
        best = 0.92;
        how = `all-key-tokens:${filmTitle}`;
      }
      continue;
    }

    const overlap = tokenOverlap(filmTitle, videoTitle);
    if (overlap > best) {
      best = overlap;
      how = `overlap:${filmTitle}`;
    }
  }

  return { matched: best >= 0.5, score: best, how };
}

/**
 * Is this video title generic boilerplate that identifies no particular film?
 */
export function isGenericVideoTitle(videoTitle: string | null | undefined): boolean {
  if (!videoTitle) return true;
  return GENERIC_TITLES.test(videoTitle.trim());
}

/**
 * A video title is only usable evidence of a match when it is not pure
 * boilerplate AND it says something about the film.
 */
export function isInformativeVideoTitle(videoTitle: string | null | undefined): boolean {
  if (!videoTitle) return false;
  if (isGenericVideoTitle(videoTitle)) return false;
  return keyTokens(videoTitle).length > 0;
}

/**
 * A single candidate trailer, ready to be written to the database.
 */
export interface VerifiedTrailer {
  key: string;
  title: string;
  author: string;
  source: 'tmdb' | 'cinema';
  confidence: number;
  reason: string;
}

/**
 * The outcome of trying to find a trailer for one film.
 */
export interface TrailerLookup {
  trailer: VerifiedTrailer | null;
  /** Why no trailer was found, for the run log. */
  reason: string;
}

/**
 * Pick the best video out of a TMDB video list for one film.
 *
 * TMDB's list is authoritative about WHICH videos belong to a film, but the
 * list also contains teasers, featurettes, bloopers and interviews. We want
 * the trailer, and we want a title that actually names the film.
 */
export function pickBestTmdbVideo(
  videos: { key: string; name?: string; type?: string; site?: string; official?: boolean; iso?: string }[],
  filmTitles: (string | null | undefined)[],
  oembedTitleFor: (key: string) => string | null | undefined
): { key: string; title: string; type: string; confidence: number; reason: string } | null {
  const candidates = videos
    .filter((video) => video.site === 'YouTube' && video.key)
    .map((video) => {
      const oembedTitle = oembedTitleFor(video.key) ?? '';
      const match = titleRefersToFilm(filmTitles, oembedTitle);
      const nameMatch = titleRefersToFilm(filmTitles, video.name);
      const generic = isGenericVideoTitle(oembedTitle) && isGenericVideoTitle(video.name);

      let confidence = 0;
      if (match.matched) confidence += 0.6;
      else if (nameMatch.matched) confidence += 0.55;
      if (generic && !match.matched && !nameMatch.matched) confidence -= 0.3;
      if (video.type === 'Trailer') confidence += 0.18;
      if (video.type === 'Teaser') confidence += 0.05;
      if (video.type === 'Clip') confidence -= 0.12;
      if (video.type === 'Behind the Scenes' || video.type === 'Bloopers' || video.type === 'Featurette') {
        confidence -= 0.25;
      }
      if (video.official === true) confidence += 0.08;
      if (video.iso === 'en') confidence += 0.05;

      return { video, oembedTitle, match, nameMatch, generic, confidence };
    })
    .sort((a, b) => b.confidence - a.confidence);

  const best = candidates[0];
  if (!best) return null;

  // A trailer must have been positively matched. An unmatched candidate is
  // never written, however high it scored on type bonuses.
  if (!best.match.matched && !best.nameMatch.matched) return null;

  return {
    key: best.video.key,
    title: best.oembedTitle || best.video.name || '',
    type: best.video.type || 'Trailer',
    confidence: Math.round(best.confidence * 100) / 100,
    reason: best.match.matched
      ? `TMDB ${best.video.type} key ${best.video.key}; oEmbed title matches film (${best.match.how})`
      : `TMDB ${best.video.type} key ${best.video.key}; TMDB video name matches film (${best.nameMatch.how})`,
  };
}

/**
 * The response shape of the YouTube oEmbed endpoint.
 */
export interface OEmbedResult {
  status: number;
  title: string;
  author: string;
}

/**
 * Resolve a YouTube key to its real title.
 *
 * oEmbed is free, unauthenticated and tells us the video's ACTUAL title and
 * channel, and whether it is embeddable at all. This is the only reliable way
 * to check that a key points at a usable trailer.
 */
export async function fetchOEmbed(
  videoKey: string,
  fetchImpl: typeof fetch = fetch
): Promise<OEmbedResult> {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${videoKey}`
  )}&format=json`;

  try {
    const response = await fetchImpl(url, { cache: 'no-store' });
    if (!response.ok) {
      return { status: response.status, title: '', author: '' };
    }
    const data = (await response.json()) as { title?: string; author_name?: string };
    return {
      status: 200,
      title: data.title ?? '',
      author: data.author_name ?? '',
    };
  } catch {
    return { status: 0, title: '', author: '' };
  }
}

/**
 * Does a video title read as a trailer for a specific film, rather than a
 * news clip, a review, a crypto pitch or a music video?
 *
 * This is the guard that would have stopped "Top Crypto To Buy In October 2026"
 * from ever being written to the film "Crypto".
 *
 * Note what is NOT in this list: the bare word "crypto". The film "Tales from
 * the Crypto" legitimately has "crypto" in its trailer title, so rejecting on
 * the word alone would reject the correct trailer too. The signals below are
 * the ones that reliably mark a video as being ABOUT something rather than
 * FOR a film.
 */
const NON_TRAILER_SIGNALS =
  /\b(to buy|price predictions?|invest(?:ment|ing)? in|investing|buy now|presale|airdrop|ico launch|millionaire|forex|etf|portfolio|stock tip|news|breaking|reaction|review|explained|summary|recap|full movie|full film|full episode|compilation|leak|rumou?r|interview|behind the scenes|bloopers|award|oscar|box office|netflix|amazon prime|hulu|disney plus|tamil dubbed|web series|episode \d+|season \d+)\b/i;

/**
 * Words that show a video IS a trailer (or teaser/clip) for a film, rather
 * than an unrelated upload that happens to name the film.
 */
const TRAILER_CONTEXT =
  /\b(trailer|teaser|clip|sneak\s*peek|first\s*look|official|now\s*playing|in\s*theatres?|in\s*theaters?|coming\s+soon|hd|4k)\b/i;

/**
 * The strongest available title-based check: the video title names the film
 * AND does not look like something that merely mentions it.
 */
export function isTrailerTitleForFilm(
  filmTitles: (string | null | undefined)[],
  videoTitle: string | null | undefined
): { ok: boolean; reason: string } {
  if (!isInformativeVideoTitle(videoTitle)) {
    return { ok: false, reason: 'video title is generic boilerplate' };
  }
  const match = titleRefersToFilm(filmTitles, videoTitle);
  if (!match.matched) {
    return { ok: false, reason: `video title does not name the film (${match.how})` };
  }
  if (NON_TRAILER_SIGNALS.test(videoTitle!)) {
    return { ok: false, reason: 'video title reads as a news clip / review / pitch, not a trailer' };
  }

  // A video that names the film but shows no sign of BEING a trailer is not
  // evidence. This is what stops "Crypto News Weekly" from being taken as the
  // trailer for "Crypto".
  const strongestFilmTokens = Math.max(
    0,
    ...filmTitles
      .filter((title): title is string => Boolean(title))
      .map((title) => keyTokens(title).length)
  );
  if (!TRAILER_CONTEXT.test(videoTitle!) && strongestFilmTokens < 2) {
    return { ok: false, reason: 'video title names the film but shows no trailer context' };
  }

  return { ok: true, reason: `video title names the film (${match.how})` };
}

/**
 * Pick the best trailer from a list of YouTube search results.
 *
 * Unlike the old code, this does NOT take the first hit. It scores every
 * candidate and only accepts one whose own title positively identifies the
 * film.
 */
export function pickBestSearchResult(
  candidates: { videoId: string; title: string; channelTitle: string }[],
  filmTitles: (string | null | undefined)[]
): { key: string; title: string; confidence: number; reason: string } | null {
  const scored = candidates
    .map((candidate) => {
      const check = isTrailerTitleForFilm(filmTitles, candidate.title);
      if (!check.ok) return null;
      let confidence = 0.6;
      if (/official/i.test(candidate.title)) confidence += 0.1;
      if (/trailer/i.test(candidate.title)) confidence += 0.08;
      if (/teaser/i.test(candidate.title)) confidence += 0.03;
      if (candidate.channelTitle && /official|studio|productions|films|pictures|entertainment/i.test(candidate.channelTitle)) {
        confidence += 0.05;
      }
      return { ...candidate, confidence: Math.round(confidence * 100) / 100, reason: check.reason };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null);

  const best = scored[0];
  if (!best) return null;
  return { key: best.videoId, title: best.title, confidence: best.confidence, reason: best.reason };
}
