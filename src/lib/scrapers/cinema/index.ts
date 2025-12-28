import { scrapeCineco } from './cineco';
import { scrapeVox } from './vox';
import { scrapeCinepolis } from './cinepolis';
import { scrapeMukta } from './mukta';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export interface ScrapeResult {
  cinema: string;
  moviesFound: number;
  movies: ScrapedMovie[];
  error?: string;
}

export interface MatchedMovie {
  id: string;
  title: string;
  matchedWith: string;
  source: string;
  similarity: number;
}

export interface ScrapeAndMatchResult {
  scrapeResults: ScrapeResult[];
  totalScraped: number;
  uniqueTitles: string[];
  matchedMovies: MatchedMovie[];
  unmatchedTitles: string[];
  timestamp: string;
}

// Normalize title for matching
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    // Remove special characters and punctuation
    .replace(/[^a-z0-9\s]/g, '')
    // Remove common words that might differ
    .replace(/\b(the|a|an|of|in|on|at|to|for|and|or)\b/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate similarity between two strings (Levenshtein distance based)
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeTitle(str1);
  const s2 = normalizeTitle(str2);

  // Exact match
  if (s1 === s2) return 1;

  // One contains the other
  if (s1.includes(s2) || s2.includes(s1)) {
    const shorter = s1.length < s2.length ? s1 : s2;
    const longer = s1.length < s2.length ? s2 : s1;
    return shorter.length / longer.length;
  }

  // Levenshtein distance
  const matrix: number[][] = [];
  const len1 = s1.length;
  const len2 = s2.length;

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  if (maxLen === 0) return 1;
  return 1 - matrix[len1][len2] / maxLen;
}

// Match scraped titles with database movies
export function matchMovies(
  scrapedTitles: ScrapedMovie[],
  dbMovies: { id: string; title: string }[],
  threshold: number = 0.7
): { matched: MatchedMovie[]; unmatched: string[] } {
  const matched: MatchedMovie[] = [];
  const matchedDbIds = new Set<string>();
  const unmatchedTitles: string[] = [];

  for (const scraped of scrapedTitles) {
    let bestMatch: { movie: typeof dbMovies[0]; similarity: number } | null = null;

    for (const movie of dbMovies) {
      // Skip already matched movies
      if (matchedDbIds.has(movie.id)) continue;

      const similarity = calculateSimilarity(scraped.title, movie.title);

      if (similarity >= threshold) {
        if (!bestMatch || similarity > bestMatch.similarity) {
          bestMatch = { movie, similarity };
        }
      }
    }

    if (bestMatch) {
      matched.push({
        id: bestMatch.movie.id,
        title: bestMatch.movie.title,
        matchedWith: scraped.title,
        source: scraped.source,
        similarity: bestMatch.similarity,
      });
      matchedDbIds.add(bestMatch.movie.id);
    } else {
      unmatchedTitles.push(`${scraped.title} (${scraped.source})`);
    }
  }

  return { matched, unmatched: unmatchedTitles };
}

// Scrape all cinemas
export async function scrapeAllCinemas(): Promise<ScrapeResult[]> {
  const results: ScrapeResult[] = [];

  // Scrape each cinema in parallel
  const [cinecoMovies, voxMovies, cinepolisMovies, muktaMovies] = await Promise.all([
    scrapeCineco().catch(error => {
      console.error('Cineco error:', error);
      return [] as ScrapedMovie[];
    }),
    scrapeVox().catch(error => {
      console.error('VOX error:', error);
      return [] as ScrapedMovie[];
    }),
    scrapeCinepolis().catch(error => {
      console.error('Cinepolis error:', error);
      return [] as ScrapedMovie[];
    }),
    scrapeMukta().catch(error => {
      console.error('Mukta error:', error);
      return [] as ScrapedMovie[];
    }),
  ]);

  results.push({
    cinema: 'Cineco',
    moviesFound: cinecoMovies.length,
    movies: cinecoMovies,
  });

  results.push({
    cinema: 'VOX',
    moviesFound: voxMovies.length,
    movies: voxMovies,
  });

  results.push({
    cinema: 'Cinepolis',
    moviesFound: cinepolisMovies.length,
    movies: cinepolisMovies,
  });

  results.push({
    cinema: 'Mukta A2',
    moviesFound: muktaMovies.length,
    movies: muktaMovies,
  });

  return results;
}

// Get unique scraped titles from all results
export function getUniqueTitles(results: ScrapeResult[]): ScrapedMovie[] {
  const seenTitles = new Set<string>();
  const uniqueMovies: ScrapedMovie[] = [];

  for (const result of results) {
    for (const movie of result.movies) {
      const normalized = normalizeTitle(movie.title);
      if (!seenTitles.has(normalized)) {
        seenTitles.add(normalized);
        uniqueMovies.push(movie);
      }
    }
  }

  return uniqueMovies;
}
