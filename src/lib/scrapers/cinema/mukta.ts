import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeMukta(): Promise<ScrapedMovie[]> {
  const url = 'https://www.muktaa2cinemas.com/bahrain';

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
      console.error(`Mukta fetch failed: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const movies: ScrapedMovie[] = [];
    const seenTitles = new Set<string>();

    // Try multiple selectors - will refine after testing
    const selectors = [
      // Mukta specific patterns
      '.movie-title',
      '.movie-name',
      '.film-title',
      '.film-name',
      '[class*="movie"] h2',
      '[class*="movie"] h3',
      '[class*="movie"] .title',
      // Common patterns
      '.movies-list .title',
      '.now-showing .movie-title',
      '.movie-card h2',
      '.movie-card h3',
      '.movie-card .title',
      '.movie-grid .name',
      '.movie-item h3',
      'article.movie h2',
      // Mukta A2 patterns
      '.show-movie-title',
      '.movie-poster-title',
      '.movie-box-title',
      '.carousel .movie-title',
      // Link based patterns
      'a[href*="/movie"] h2',
      'a[href*="/movie"] h3',
      'a[href*="/movies"] .title',
      'a[href*="/bahrain/movie"] h2',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const title = $(el).text().trim();
        if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          movies.push({ title, source: 'mukta' });
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
            movies.push({ title, source: 'mukta' });
          }
        }
        if (Array.isArray(json)) {
          for (const item of json) {
            if (item['@type'] === 'Movie' && item.name) {
              const title = item.name.trim();
              if (!seenTitles.has(title.toLowerCase())) {
                seenTitles.add(title.toLowerCase());
                movies.push({ title, source: 'mukta' });
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
      const movieMatches = content.match(/"title"\s*:\s*"([^"]+)"/g);
      if (movieMatches) {
        for (const match of movieMatches) {
          const titleMatch = match.match(/"title"\s*:\s*"([^"]+)"/);
          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].trim();
            if (title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
              seenTitles.add(title.toLowerCase());
              movies.push({ title, source: 'mukta' });
            }
          }
        }
      }
    });

    console.log(`Mukta: Found ${movies.length} movies`);
    return movies;
  } catch (error) {
    console.error('Mukta scrape failed:', error);
    return [];
  }
}
