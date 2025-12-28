import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeCineco(): Promise<ScrapedMovie[]> {
  const urls = [
    'https://bahrain.cineco.net/',
    'https://bahrain.cineco.net/movies',
    'https://bahrain.cineco.net/now-showing',
  ];

  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  for (const url of urls) {
    try {
      console.log(`[Cineco] Trying URL: ${url}`);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache',
        },
      });

      console.log(`[Cineco] Response status: ${response.status}`);

      if (!response.ok) {
        console.log(`[Cineco] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        continue;
      }

      const html = await response.text();
      console.log(`[Cineco] HTML length: ${html.length} characters`);
      console.log(`[Cineco] HTML preview: ${html.substring(0, 500)}`);

      const $ = cheerio.load(html);

      // Try many different selectors
      const selectors = [
        // Common movie selectors
        '.movie-title',
        '.movie-name',
        '.film-title',
        '.film-name',
        '.movie h2',
        '.movie h3',
        '.movie-card h2',
        '.movie-card h3',
        '.movie-card .title',
        '.movie-item h2',
        '.movie-item h3',
        '.movie-item .title',
        // Data attribute selectors
        '[data-movie-title]',
        '[data-title]',
        // Generic title patterns
        'h2.title',
        'h3.title',
        '.title h2',
        '.title h3',
        // Link patterns
        'a[href*="movie"] h2',
        'a[href*="movie"] h3',
        'a[href*="film"] h2',
        'a[href*="film"] h3',
        // Card patterns
        '.card-title',
        '.poster-title',
        // Alt text from images
        'img[alt*="movie"]',
        'img[alt*="film"]',
      ];

      for (const selector of selectors) {
        $(selector).each((_, el) => {
          let title = '';
          const $el = $(el);

          // Check if it's an img element by looking for alt attribute
          const alt = $el.attr('alt');
          if (alt) {
            title = alt;
          } else {
            title = $el.text().trim();
          }

          if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
            seenTitles.add(title.toLowerCase());
            movies.push({ title, source: 'cineco' });
            console.log(`[Cineco] Found movie: ${title} (selector: ${selector})`);
          }
        });
      }

      // Also try JSON-LD
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const json = JSON.parse($(el).html() || '');
          const extractFromJson = (obj: unknown): void => {
            if (!obj || typeof obj !== 'object') return;
            if (Array.isArray(obj)) {
              obj.forEach(extractFromJson);
              return;
            }
            const o = obj as Record<string, unknown>;
            if (o['@type'] === 'Movie' && typeof o.name === 'string') {
              const title = o.name.trim();
              if (!seenTitles.has(title.toLowerCase())) {
                seenTitles.add(title.toLowerCase());
                movies.push({ title, source: 'cineco' });
                console.log(`[Cineco] Found movie from JSON-LD: ${title}`);
              }
            }
            Object.values(o).forEach(extractFromJson);
          };
          extractFromJson(json);
        } catch {
          // Ignore JSON parse errors
        }
      });

      // If we found movies, stop trying other URLs
      if (movies.length > 0) {
        break;
      }
    } catch (error) {
      console.error(`[Cineco] Error fetching ${url}:`, error);
    }
  }

  console.log(`[Cineco] Total movies found: ${movies.length}`);
  return movies;
}
