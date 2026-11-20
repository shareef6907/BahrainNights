/**
 * Validate a candidate per-film booking URL.
 *
 * WHY VALIDATION IS REQUIRED
 * --------------------------
 * A "Book" button that resolves to a 404 is worse than no button: the user
 * commits to a purchase and lands on an error page. The rule in this codebase
 * is that a Book button is only rendered when the URL is known to resolve.
 *
 * The check is a single GET with redirects followed, expecting HTTP 200.
 *
 * THE TRAP
 * --------
 * VOX's search endpoint `/search?q=` returns **200 even when it matches
 * nothing**, so a 200 on a search URL is NOT proof the film exists. Only a
 * per-film URL (`/movies/<slug>`) is meaningful here, and that is what gets
 * validated. `https://bhr.voxcinemas.com/movies?search=<title>` — the URL the
 * hero used to link to — is a 404 on VOX outright.
 *
 * Results are cached per URL for the lifetime of the process, because the
 * sync can see the same film from several code paths.
 */

/** How long to wait for a cinema site to answer. */
const VALIDATION_TIMEOUT_MS = 15_000;

const validationCache = new Map<string, boolean>();

/**
 * Is this a well-formed absolute https URL?
 *
 * Blocks `javascript:`, `data:` and relative paths — a malformed URL must
 * never become an href.
 */
export function isSafeHttpUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (!/^https:\/\//i.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

/**
 * Check that a booking URL actually resolves.
 *
 * Returns true when the URL is safe AND the server answers 200.
 * Network failures return false — an unreachable URL must not become a Book
 * button, because we cannot prove it works.
 */
export async function validateBookingUrl(url: unknown): Promise<boolean> {
  if (!isSafeHttpUrl(url)) return false;

  const cached = validationCache.get(url);
  if (cached !== undefined) return cached;

  let ok = false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), VALIDATION_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          // Some cinema CDNs 403 a default Node fetch UA.
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
      ok = res.status === 200;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    ok = false;
  }

  validationCache.set(url, ok);
  return ok;
}

/**
 * Validate a map of per-film URLs, keeping only the ones that resolve.
 *
 * The result is a NEW object — the input is never mutated.
 */
export async function validateBookingUrls(
  urls: Record<string, string | undefined> | null | undefined
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  if (!urls || typeof urls !== 'object') return out;

  const entries = Object.entries(urls).filter(([, v]) => typeof v === 'string' && v);
  const results = await Promise.all(entries.map(([, v]) => validateBookingUrl(v)));

  entries.forEach(([key, value], i) => {
    if (results[i]) out[key] = (value as string).trim();
  });

  return out;
}
