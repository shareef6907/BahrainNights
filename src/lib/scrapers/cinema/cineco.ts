import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeCineco(): Promise<ScrapedMovie[]> {
  const url = 'https://bahrain.cineco.net/';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error(`Cineco fetch failed: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const movies: ScrapedMovie[] = [];
    const seenTitles = new Set<string>();

    // Try multiple selectors - will refine after testing
    const selectors = [
      // Common movie card selectors
      '.movie-title',
      '.movie-name',
      '.film-title',
      '.film-name',
      '.movie-card h2',
      '.movie-card h3',
      '.movie-card .title',
      '[class*="movie"] h2',
      '[class*="movie"] h3',
      '[class*="movie"] .title',
      '[class*="film"] h2',
      '[class*="film"] h3',
      // Specific patterns for Cineco
      '.movies-list .title',
      '.now-showing .movie-title',
      '.movie-poster + .movie-info h3',
      '.movie-item .name',
      '.movie-box .title',
      'article.movie h2',
      '.slider-item .movie-title',
      // Generic patterns
      'a[href*="/movie"] h2',
      'a[href*="/movie"] h3',
      'a[href*="/film"] h2',
      'a[href*="/film"] h3',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const title = $(el).text().trim();
        if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          movies.push({ title, source: 'cineco' });
        }
      });
    }

    // Also try to find movies in JSON-LD structured data
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html() || '');
        if (json['@type'] === 'Movie' && json.name) {
          const title = json.name.trim();
          if (!seenTitles.has(title.toLowerCase())) {
            seenTitles.add(title.toLowerCase());
            movies.push({ title, source: 'cineco' });
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
    });

    console.log(`Cineco: Found ${movies.length} movies`);
    return movies;
  } catch (error) {
    console.error('Cineco scrape failed:', error);
    return [];
  }
}
