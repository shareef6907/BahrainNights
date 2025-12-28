import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeVox(): Promise<ScrapedMovie[]> {
  const url = 'https://bhr.voxcinemas.com/';

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
      console.error(`VOX fetch failed: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const movies: ScrapedMovie[] = [];
    const seenTitles = new Set<string>();

    // Try multiple selectors - will refine after testing
    const selectors = [
      // VOX specific patterns
      '.movie-card__title',
      '.movie-title',
      '.film-title',
      '.movie-name',
      '[class*="MovieCard"] h2',
      '[class*="MovieCard"] h3',
      '[class*="movie-card"] .title',
      '[class*="movie-card"] h2',
      '[class*="movie-card"] h3',
      // React/Next.js patterns
      '[data-testid="movie-title"]',
      '[data-movie-title]',
      // Generic patterns
      '.movies-grid .title',
      '.now-showing .movie-title',
      '.movie-list-item h3',
      '.movie-poster-title',
      'article[class*="movie"] h2',
      'article[class*="movie"] h3',
      '.carousel-item .movie-title',
      // Link based patterns
      'a[href*="/movies/"] h2',
      'a[href*="/movies/"] h3',
      'a[href*="/movie/"] .title',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const title = $(el).text().trim();
        if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          movies.push({ title, source: 'vox' });
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
            movies.push({ title, source: 'vox' });
          }
        }
        // Handle arrays
        if (Array.isArray(json)) {
          for (const item of json) {
            if (item['@type'] === 'Movie' && item.name) {
              const title = item.name.trim();
              if (!seenTitles.has(title.toLowerCase())) {
                seenTitles.add(title.toLowerCase());
                movies.push({ title, source: 'vox' });
              }
            }
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
    });

    // Try to find movie data in inline scripts (React hydration data)
    $('script').each((_, el) => {
      const content = $(el).html() || '';
      // Look for movie title patterns in script content
      const movieMatches = content.match(/"title"\s*:\s*"([^"]+)"/g);
      if (movieMatches) {
        for (const match of movieMatches) {
          const titleMatch = match.match(/"title"\s*:\s*"([^"]+)"/);
          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].trim();
            if (title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
              seenTitles.add(title.toLowerCase());
              movies.push({ title, source: 'vox' });
            }
          }
        }
      }
    });

    console.log(`VOX: Found ${movies.length} movies`);
    return movies;
  } catch (error) {
    console.error('VOX scrape failed:', error);
    return [];
  }
}
