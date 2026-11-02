/**
 * ONE source of truth for which event hubs exist and which of them are
 * indexable.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The sitemap, the category pages and the country pages each had their own
 * idea of which hubs exist. They disagreed, and the sitemap was the loser:
 *
 *   - NO /events/category/* hub was in the sitemap, even though three of them
 *     are populated and served `index, follow`.
 *   - Only 2 of 27 /international/* country hubs were in the sitemap (uae and
 *     qatar), so Saudi Arabia (96 published events), Oman, UK, Jordan,
 *     Germany, USA and Türkiye were absent.
 *
 * Google reported those URLs as "URL is unknown to Google" even though they
 * returned 200, carried a canonical and were `index, follow`. The sitemap is
 * the primary discovery mechanism, so a page missing from it is invisible
 * until something happens to link to it.
 *
 * The rule: a hub is in the sitemap if and only if it is indexable. Both are
 * decided by the same question -- does it have listings? -- so they are
 * decided here, once, against the same database query the page itself runs.
 *
 * A hub is NEVER removed from the sitemap when it empties. It is removed from
 * the *indexable* set, and the sitemap entry goes with it, but the route and
 * the page stay, because the URL may have inbound links and the hub may gain
 * listings again tomorrow.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * The category slugs that have a route on the site.
 *
 * This MUST match `validCategories` in src/app/events/category/[category]/page.tsx.
 * A category in the database that is not in this list has no page -- asking
 * for it returns 404 -- so putting it in the sitemap would advertise a dead
 * URL. (The database currently holds "comedy" and "events" as categories;
 * neither has a route.)
 */
export const VALID_CATEGORY_SLUGS = [
  'music',
  'sports',
  'arts',
  'dining',
  'community',
  'shopping',
  'nightlife',
  'special',
  'family',
  'wellness',
  'business',
  'cultural',
  'concerts',
] as const;

/**
 * The country slugs that have a route, with their display names and the
 * country name stored in the database for each.
 *
 * This MUST match the `COUNTRIES` map that used to live in
 * src/app/international/[country]/page.tsx -- it has been MOVED here so the
 * page and the sitemap are generated from one list. The two used to drift,
 * and the sitemap ended up listing 2 of 27 country hubs.
 */
export const COUNTRIES: Record<
  string,
  { name: string; fullName: string; flag: string; dbName: string }
> = {
  // Middle East & GCC
  uae: { name: 'UAE', fullName: 'United Arab Emirates', flag: '🇦🇪', dbName: 'UAE' },
  'saudi-arabia': { name: 'Saudi Arabia', fullName: 'Saudi Arabia', flag: '🇸🇦', dbName: 'Saudi Arabia' },
  qatar: { name: 'Qatar', fullName: 'Qatar', flag: '🇶🇦', dbName: 'Qatar' },
  kuwait: { name: 'Kuwait', fullName: 'Kuwait', flag: '🇰🇼', dbName: 'Kuwait' },
  oman: { name: 'Oman', fullName: 'Oman', flag: '🇴🇲', dbName: 'Oman' },
  jordan: { name: 'Jordan', fullName: 'Jordan', flag: '🇯🇴', dbName: 'Jordan' },
  lebanon: { name: 'Lebanon', fullName: 'Lebanon', flag: '🇱🇧', dbName: 'Lebanon' },
  turkiye: { name: 'Türkiye', fullName: 'Türkiye', flag: '🇹🇷', dbName: 'Türkiye' },
  cyprus: { name: 'Cyprus', fullName: 'Cyprus', flag: '🇨🇾', dbName: 'Cyprus' },
  // Africa
  egypt: { name: 'Egypt', fullName: 'Egypt', flag: '🇪🇬', dbName: 'Egypt' },
  morocco: { name: 'Morocco', fullName: 'Morocco', flag: '🇲🇦', dbName: 'Morocco' },
  'south-africa': { name: 'South Africa', fullName: 'South Africa', flag: '🇿🇦', dbName: 'South Africa' },
  nigeria: { name: 'Nigeria', fullName: 'Nigeria', flag: '🇳🇬', dbName: 'Nigeria' },
  // Europe
  uk: { name: 'UK', fullName: 'United Kingdom', flag: '🇬🇧', dbName: 'UK' },
  germany: { name: 'Germany', fullName: 'Germany', flag: '🇩🇪', dbName: 'Germany' },
  france: { name: 'France', fullName: 'France', flag: '🇫🇷', dbName: 'France' },
  spain: { name: 'Spain', fullName: 'Spain', flag: '🇪🇸', dbName: 'Spain' },
  italy: { name: 'Italy', fullName: 'Italy', flag: '🇮🇹', dbName: 'Italy' },
  greece: { name: 'Greece', fullName: 'Greece', flag: '🇬🇷', dbName: 'Greece' },
  // Asia
  india: { name: 'India', fullName: 'India', flag: '🇮🇳', dbName: 'India' },
  pakistan: { name: 'Pakistan', fullName: 'Pakistan', flag: '🇵🇰', dbName: 'Pakistan' },
  singapore: { name: 'Singapore', fullName: 'Singapore', flag: '🇸🇬', dbName: 'Singapore' },
  malaysia: { name: 'Malaysia', fullName: 'Malaysia', flag: '🇲🇾', dbName: 'Malaysia' },
  thailand: { name: 'Thailand', fullName: 'Thailand', flag: '🇹🇭', dbName: 'Thailand' },
  indonesia: { name: 'Indonesia', fullName: 'Indonesia', flag: '🇮🇩', dbName: 'Indonesia' },
  philippines: { name: 'Philippines', fullName: 'Philippines', flag: '🇵🇭', dbName: 'Philippines' },
  // Americas
  usa: { name: 'USA', fullName: 'United States', flag: '🇺🇸', dbName: 'USA' },
};

/** Country route slug -> the country name stored in the database. */
export const COUNTRY_SLUG_TO_DB_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRIES).map(([slug, c]) => [slug, c.dbName]),
);

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  _supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _supabase;
}

export interface IndexableHubs {
  /** Category slugs with at least one upcoming Bahrain listing. */
  categories: string[];
  /** Country slugs with at least one upcoming listing. */
  countries: string[];
}

/**
 * Decides which hubs have listings.
 *
 * The filters are copied from the pages themselves, so the answer is exactly
 * what the page's own `robots` meta tag says:
 *
 *   /events/category/<cat>
 *     status=published, is_hidden=false, country=Bahrain, category=<cat>,
 *     date >= today
 *
 *   /international/<code>
 *     status=published, is_active=true, country=<db name>,
 *     (start_date >= today OR date >= today)
 *
 * Emptiness is tested against the DATABASE, not scraped HTML: the database is
 * what the page itself queries, and an HTML scrape misreads hashes and build
 * ids as content.
 */
export async function getIndexableHubs(): Promise<IndexableHubs> {
  const supabase = getSupabase();
  if (!supabase) return { categories: [], countries: [] };

  const today = new Date().toISOString().split('T')[0];

  try {
    const { data: cats } = await supabase
      .from('events')
      .select('category')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .limit(5000);

    const populated = new Set((cats || []).map((r) => r.category).filter(Boolean));
    const categories = VALID_CATEGORY_SLUGS.filter((slug) => populated.has(slug));

    const { data: countries } = await supabase
      .from('events')
      .select('country')
      .eq('status', 'published')
      .eq('is_active', true)
      .or(`start_date.gte.${today},date.gte.${today}`)
      .neq('country', 'Bahrain')
      .limit(5000);

    const populatedCountries = new Set(
      (countries || []).map((r) => r.country).filter(Boolean),
    );
    const countriesWithRoutes = Object.keys(COUNTRY_SLUG_TO_DB_NAME);
    const countrySlugs = countriesWithRoutes.filter((slug) =>
      populatedCountries.has(COUNTRY_SLUG_TO_DB_NAME[slug]),
    );

    return { categories, countries: countrySlugs };
  } catch (error) {
    console.error('Error resolving indexable hubs:', error);
    return { categories: [], countries: [] };
  }
}
