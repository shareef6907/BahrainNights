import * as cheerio from 'cheerio';

export interface ScrapedMovie {
  title: string;
  source: string;
}

export async function scrapeMukta(): Promise<ScrapedMovie[]> {
  const urls = [
    'https://www.muktaa2cinemas.com/bahrain',
    'https://www.muktaa2cinemas.com/bahrain/movies',
    'https://www.muktaa2cinemas.com/bahrain/now-showing',
  ];

  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  for (const url of urls) {
    try {
      console.log(`[Mukta] Trying URL: ${url}`);

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

      console.log(`[Mukta] Response status: ${response.status}`);

      if (!response.ok) {
        console.log(`[Mukta] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        continue;
      }

      const html = await response.text();
      console.log(`[Mukta] HTML length: ${html.length} characters`);
      console.log(`[Mukta] HTML preview: ${html.substring(0, 500)}`);

      const $ = cheerio.load(html);

      // Try many different selectors
      const selectors = [
        '.movie-title',
        '.movie-name',
        '.film-title',
        '.film-name',
        '[class*="movie"] h2',
        '[class*="movie"] h3',
        '[class*="movie"] .title',
        '.movies-list .title',
        '.now-showing .movie-title',
        '.movie-card h2',
        '.movie-card h3',
        '.movie-card .title',
        '.movie-grid .name',
        '.movie-item h3',
        'article.movie h2',
        '.show-movie-title',
        '.movie-poster-title',
        '.movie-box-title',
        '.carousel .movie-title',
        'a[href*="/movie"] h2',
        'a[href*="/movie"] h3',
        'a[href*="/movies"] .title',
        'a[href*="/bahrain/movie"] h2',
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
            movies.push({ title, source: 'mukta' });
            console.log(`[Mukta] Found movie: ${title} (selector: ${selector})`);
          }
        });
      }

      // Check for inline script data
      $('script').each((_, el) => {
        const content = $(el).html() || '';
        const patterns = [
          /"title"\s*:\s*"([^"]+)"/g,
          /"movieTitle"\s*:\s*"([^"]+)"/g,
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
              movies.push({ title, source: 'mukta' });
              console.log(`[Mukta] Found movie from script: ${title}`);
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
                movies.push({ title, source: 'mukta' });
                console.log(`[Mukta] Found movie from JSON-LD: ${title}`);
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
      console.error(`[Mukta] Error fetching ${url}:`, error);
    }
  }

  console.log(`[Mukta] Total movies found: ${movies.length}`);
  return movies;
}
