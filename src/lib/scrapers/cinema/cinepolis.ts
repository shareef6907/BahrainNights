import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeCinepolis(): Promise<ScrapedMovie[]> {
  const urls = [
    'https://bahrain.cinepolisgulf.com/',
    'https://bahrain.cinepolisgulf.com/movies',
    'https://bahrain.cinepolisgulf.com/now-showing',
  ];

  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  for (const url of urls) {
    try {
      console.log(`[Cinepolis] Trying URL: ${url}`);

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

      console.log(`[Cinepolis] Response status: ${response.status}`);

      if (!response.ok) {
        console.log(`[Cinepolis] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        continue;
      }

      const html = await response.text();
      console.log(`[Cinepolis] HTML length: ${html.length} characters`);
      console.log(`[Cinepolis] HTML preview: ${html.substring(0, 500)}`);

      const $ = cheerio.load(html);

      // Try many different selectors
      const selectors = [
        '.movie-title',
        '.movie-name',
        '.film-title',
        '.movie-card-title',
        '[class*="movie"] h2',
        '[class*="movie"] h3',
        '[class*="movie"] .title',
        '[class*="Movie"] h2',
        '[class*="Movie"] h3',
        '.movies-section .title',
        '.now-showing .movie-title',
        '.movie-grid .title',
        '.movie-list h3',
        '.movie-poster-info h2',
        'article.movie h2',
        '.swiper-slide .movie-title',
        '.movie-box .name',
        '.movie-item-title',
        '.poster-title',
        'a[href*="/movie"] h2',
        'a[href*="/movie"] h3',
        'a[href*="/movies"] .title',
        // Generic patterns
        '.card-title',
        'h2.title',
        'h3.title',
      ];

      for (const selector of selectors) {
        $(selector).each((_, el) => {
          const title = $(el).text().trim();
          if (title && title.length > 1 && title.length < 100 && !seenTitles.has(title.toLowerCase())) {
            seenTitles.add(title.toLowerCase());
            movies.push({ title, source: 'cinepolis' });
            console.log(`[Cinepolis] Found movie: ${title} (selector: ${selector})`);
          }
        });
      }

      // Check for inline script data
      $('script').each((_, el) => {
        const content = $(el).html() || '';
        const patterns = [
          /"movieName"\s*:\s*"([^"]+)"/g,
          /"title"\s*:\s*"([^"]+)"/g,
          /"name"\s*:\s*"([^"]+)"/g,
        ];

        for (const pattern of patterns) {
          let match;
          while ((match = pattern.exec(content)) !== null) {
            const title = match[1].trim();
            if (
              title.length > 2 &&
              title.length < 80 &&
              !title.includes('http') &&
              !title.includes('www') &&
              !seenTitles.has(title.toLowerCase())
            ) {
              seenTitles.add(title.toLowerCase());
              movies.push({ title, source: 'cinepolis' });
              console.log(`[Cinepolis] Found movie from script: ${title}`);
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
                movies.push({ title, source: 'cinepolis' });
                console.log(`[Cinepolis] Found movie from JSON-LD: ${title}`);
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
      console.error(`[Cinepolis] Error fetching ${url}:`, error);
    }
  }

  console.log(`[Cinepolis] Total movies found: ${movies.length}`);
  return movies;
}
