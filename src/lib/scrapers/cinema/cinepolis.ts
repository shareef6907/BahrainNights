import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeCinepolis(): Promise<ScrapedMovie[]> {
  const url = 'https://bahrain.cinepolisgulf.com/';

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
      console.error(`Cinepolis fetch failed: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const movies: ScrapedMovie[] = [];
    const seenTitles = new Set<string>();

    // Try multiple selectors - will refine after testing
    const selectors = [
      // Cinepolis specific patterns
      '.movie-title',
      '.movie-name',
      '.film-title',
      '.movie-card-title',
      '[class*="movie"] h2',
      '[class*="movie"] h3',
      '[class*="movie"] .title',
      '[class*="Movie"] h2',
      '[class*="Movie"] h3',
      // Common patterns
      '.movies-section .title',
      '.now-showing .movie-title',
      '.movie-grid .title',
      '.movie-list h3',
      '.movie-poster-info h2',
      'article.movie h2',
      '.swiper-slide .movie-title',
      // Cinepolis Gulf patterns
      '.movie-box .name',
      '.movie-item-title',
      '.poster-title',
      // Link based patterns
      'a[href*="/movie"] h2',
      'a[href*="/movie"] h3',
      'a[href*="/movies"] .title',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const title = $(el).text().trim();
        if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          movies.push({ title, source: 'cinepolis' });
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
            movies.push({ title, source: 'cinepolis' });
          }
        }
        if (Array.isArray(json)) {
          for (const item of json) {
            if (item['@type'] === 'Movie' && item.name) {
              const title = item.name.trim();
              if (!seenTitles.has(title.toLowerCase())) {
                seenTitles.add(title.toLowerCase());
                movies.push({ title, source: 'cinepolis' });
              }
            }
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
    });

    // Try to find movie data in inline scripts
    $('script').each((_, el) => {
      const content = $(el).html() || '';
      const movieMatches = content.match(/"movieName"\s*:\s*"([^"]+)"/g) ||
                          content.match(/"name"\s*:\s*"([^"]+)"/g);
      if (movieMatches) {
        for (const match of movieMatches) {
          const titleMatch = match.match(/:\s*"([^"]+)"/);
          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].trim();
            if (title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
              seenTitles.add(title.toLowerCase());
              movies.push({ title, source: 'cinepolis' });
            }
          }
        }
      }
    });

    console.log(`Cinepolis: Found ${movies.length} movies`);
    return movies;
  } catch (error) {
    console.error('Cinepolis scrape failed:', error);
    return [];
  }
}
