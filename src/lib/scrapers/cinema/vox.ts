import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeVox(): Promise<ScrapedMovie[]> {
  const urls = [
    'https://bhr.voxcinemas.com/',
    'https://bhr.voxcinemas.com/movies',
    'https://bhr.voxcinemas.com/movies/now-showing',
  ];

  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  for (const url of urls) {
    try {
      console.log(`[VOX] Trying URL: ${url}`);

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

      console.log(`[VOX] Response status: ${response.status}`);

      if (!response.ok) {
        console.log(`[VOX] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        continue;
      }

      const html = await response.text();
      console.log(`[VOX] HTML length: ${html.length} characters`);
      console.log(`[VOX] HTML preview: ${html.substring(0, 500)}`);

      const $ = cheerio.load(html);

      // Try many different selectors
      const selectors = [
        '.movie-card__title',
        '.movie-title',
        '.movie-name',
        '.film-title',
        '[class*="MovieCard"] h2',
        '[class*="MovieCard"] h3',
        '[class*="movie-card"] .title',
        '[class*="movie-card"] h2',
        '[class*="movie-card"] h3',
        '.movies-grid .title',
        '.movie-list-item h3',
        '.movie-poster-title',
        'article[class*="movie"] h2',
        'article[class*="movie"] h3',
        '.carousel-item .movie-title',
        'a[href*="/movies/"] h2',
        'a[href*="/movies/"] h3',
        'a[href*="/movie/"] .title',
        // Generic patterns
        '.card-title',
        '.poster-title',
        'h2.title',
        'h3.title',
      ];

      for (const selector of selectors) {
        $(selector).each((_, el) => {
          const title = $(el).text().trim();
          if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
            seenTitles.add(title.toLowerCase());
            movies.push({ title, source: 'vox' });
            console.log(`[VOX] Found movie: ${title} (selector: ${selector})`);
          }
        });
      }

      // Check for React/Next.js hydration data
      $('script').each((_, el) => {
        const content = $(el).html() || '';

        // Look for movie title patterns in script content
        const patterns = [
          /"title"\s*:\s*"([^"]+)"/g,
          /"movieTitle"\s*:\s*"([^"]+)"/g,
          /"name"\s*:\s*"([^"]+)"/g,
        ];

        for (const pattern of patterns) {
          let match;
          while ((match = pattern.exec(content)) !== null) {
            const title = match[1].trim();
            // Filter out common non-movie titles
            if (
              title.length > 2 &&
              title.length < 80 &&
              !title.includes('http') &&
              !title.includes('www') &&
              !seenTitles.has(title.toLowerCase())
            ) {
              seenTitles.add(title.toLowerCase());
              movies.push({ title, source: 'vox' });
              console.log(`[VOX] Found movie from script: ${title}`);
            }
          }
        }
      });

      // JSON-LD
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
                movies.push({ title, source: 'vox' });
                console.log(`[VOX] Found movie from JSON-LD: ${title}`);
              }
            }
            Object.values(o).forEach(extractFromJson);
          };
          extractFromJson(json);
        } catch {
          // Ignore JSON parse errors
        }
      });

      if (movies.length > 0) {
        break;
      }
    } catch (error) {
      console.error(`[VOX] Error fetching ${url}:`, error);
    }
  }

  console.log(`[VOX] Total movies found: ${movies.length}`);
  return movies;
}
