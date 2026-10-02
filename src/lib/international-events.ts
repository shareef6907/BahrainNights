/**
 * Shared international event data layer.
 *
 * ONE dataset — all counts (country chips, city chips, category chips, dropdown)
 * are derived from the same filtered+post-processed list.
 *
 * Beat the 1,000-row ceiling: fetch in batches of 1,000 using .range()
 * and concatenate until a batch returns fewer than 1,000 rows.
 */

import { supabaseAdmin } from '@/lib/supabase';

// ─── Shared COUNTRY_CONFIG ────────────────────────────────────────────────────
const COUNTRY_CONFIG: Record<string, { flag: string; code: string }> = {
  'UAE': { flag: '🇦🇪', code: 'uae' },
  'United Arab Emirates': { flag: '🇦🇪', code: 'uae' },
  'Saudi Arabia': { flag: '🇸🇦', code: 'saudi-arabia' },
  'Qatar': { flag: '🇶🇦', code: 'qatar' },
  'Kuwait': { flag: '🇰🇼', code: 'kuwait' },
  'Oman': { flag: '🇴🇲', code: 'oman' },
  'Jordan': { flag: '🇯🇴', code: 'jordan' },
  'Lebanon': { flag: '🇱🇧', code: 'lebanon' },
  'Türkiye': { flag: '🇹🇷', code: 'turkiye' },
  'Turkey': { flag: '🇹🇷', code: 'turkiye' },
  'Cyprus': { flag: '🇨🇾', code: 'cyprus' },
  'Egypt': { flag: '🇪🇬', code: 'egypt' },
  'Morocco': { flag: '🇲🇦', code: 'morocco' },
  'South Africa': { flag: '🇿🇦', code: 'south-africa' },
  'Nigeria': { flag: '🇳🇬', code: 'nigeria' },
  'UK': { flag: '🇬🇧', code: 'uk' },
  'United Kingdom': { flag: '🇬🇧', code: 'uk' },
  'Germany': { flag: '🇩🇪', code: 'germany' },
  'France': { flag: '🇫🇷', code: 'france' },
  'Spain': { flag: '🇪🇸', code: 'spain' },
  'Italy': { flag: '🇮🇹', code: 'italy' },
  'Greece': { flag: '🇬🇷', code: 'greece' },
  'India': { flag: '🇮🇳', code: 'india' },
  'Pakistan': { flag: '🇵🇰', code: 'pakistan' },
  'Singapore': { flag: '🇸🇬', code: 'singapore' },
  'Malaysia': { flag: '🇲🇾', code: 'malaysia' },
  'Thailand': { flag: '🇹🇭', code: 'thailand' },
  'Indonesia': { flag: '🇮🇩', code: 'indonesia' },
  'Philippines': { flag: '🇵🇭', code: 'philippines' },
  'USA': { flag: '🇺🇸', code: 'usa' },
  'United States': { flag: '🇺🇸', code: 'usa' },
};

// ─── Shared event type ────────────────────────────────────────────────────────
export interface InternationalEvent {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  venue_name: string | null;
  date: string;
  time: string | null;
  start_date: string | null;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  featured_image: string | null;
  cover_url: string | null;
  affiliate_url: string | null;
  country: string;
  city: string | null;
}

// ─── Shared country-summary type (lightweight, for dropdown) ─────────────────
export interface InternationalCountrySummary {
  code: string;   // URL slug, e.g. 'uae'
  name: string;   // display name, e.g. 'UAE'
  flag: string;
  count: number;
}

// ─── Lightweight row type for dropdown select ──────────────────────────────────
// Only the columns needed for filtering + counting — no full event rows.
type LightEventRow = {
  country: string;
  start_date: string | null;
  end_date: string | null;
  date: string | null; // 'date' is used as fallback when start_date is null
};

// ─── Shared filter constants ───────────────────────────────────────────────────
const SELECT_FULL = `
  id,
  title,
  slug,
  description,
  category,
  venue_name,
  date,
  time,
  start_date,
  start_time,
  end_date,
  end_time,
  featured_image,
  cover_url,
  affiliate_url,
  country,
  city
` as const;

// ─── Shared smart display-date sort ──────────────────────────────────────────
function sortByDisplayDate(events: InternationalEvent[], today: string): InternationalEvent[] {
  return [...events].sort((a, b) => {
    const getDisplayDate = (e: InternationalEvent) => {
      const start = e.start_date || e.date;
      const end = e.end_date;
      if (start >= today) return start;
      if (end && end >= today) return end;
      return start;
    };
    return getDisplayDate(a).localeCompare(getDisplayDate(b));
  });
}

// ─── Shared post-filter: 6-month window ─────────────────────────────────────
function applyPostFilter(events: InternationalEvent[], sixMonthsAgoStr: string): InternationalEvent[] {
  return events.filter(event => {
    const startDate = event.start_date || event.date;
    return startDate >= sixMonthsAgoStr;
  });
}

// ─── Core batch-fetch function ────────────────────────────────────────────────
async function fetchInternationalEventsCore(
  today: string,
  countryFilter?: { eq: string },
  // no limit — caller decides what to do with the full list
): Promise<InternationalEvent[]> {
  const BATCH_SIZE = 1000;
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

  let allRows: InternationalEvent[] = [];
  let from = 0;

  while (true) {
    let query = supabaseAdmin
      .from('events')
      .select(SELECT_FULL)
      .eq('status', 'published')
      .eq('is_active', true)
      .or(`start_date.gte.${today},date.gte.${today}`)
      .range(from, from + BATCH_SIZE - 1)
      .order('start_date', { ascending: true, nullsFirst: false });

    if (countryFilter) {
      query = query.eq('country', countryFilter.eq);
    } else {
      query = query.neq('country', 'Bahrain');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching international events:', error);
      break;
    }

    if (!data || data.length === 0) break;

    // Apply 6-month post-filter and smart sort per batch
    const filtered = applyPostFilter(data as InternationalEvent[], sixMonthsAgoStr);
    allRows = allRows.concat(filtered);

    if (data.length < BATCH_SIZE) break;
    from += BATCH_SIZE;
  }

  // Final smart sort across all batches
  return sortByDisplayDate(allRows, today);
}

// ─── Public API: full events, optional country filter ────────────────────────
export async function getInternationalEvents(opts: {
  country?: string; // database country name, e.g. 'UAE'
} = {}): Promise<InternationalEvent[]> {
  const today = new Date().toISOString().split('T')[0];

  try {
    if (opts.country) {
      return await fetchInternationalEventsCore(today, { eq: opts.country });
    }
    return await fetchInternationalEventsCore(today);
  } catch (e) {
    console.error('Error in getInternationalEvents (may be build time):', e);
    return [];
  }
}

// ─── Public API: lightweight country summaries for dropdown ──────────────────
// Select only the columns the filter needs — keep homepage light.
const SELECT_LIGHT = 'country,start_date,end_date,date,status,is_active' as const;

export async function getInternationalCountrySummaries(): Promise<InternationalCountrySummary[]> {
  const today = new Date().toISOString().split('T')[0];

  const BATCH_SIZE = 1000;
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

  let allRows: LightEventRow[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select(SELECT_LIGHT)
      .neq('country', 'Bahrain')
      .eq('status', 'published')
      .eq('is_active', true)
      .or(`start_date.gte.${today},date.gte.${today}`)
      .range(from, from + BATCH_SIZE - 1);

    if (error) {
      console.error('Error fetching international country summaries:', error);
      break;
    }

    if (!data || data.length === 0) break;

    // Apply 6-month post-filter in JS
    const filtered = (data as LightEventRow[]).filter(event => {
      const startDate = (event.start_date || event.date) ?? '';
      return startDate >= sixMonthsAgoStr;
    });

    allRows = allRows.concat(filtered);

    if (data.length < BATCH_SIZE) break;
    from += BATCH_SIZE;
  }

  // Count per country
  const counts: Record<string, number> = {};
  for (const row of allRows) {
    if (row.country) {
      counts[row.country] = (counts[row.country] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([countryName, count]) => {
      const config = COUNTRY_CONFIG[countryName] || {
        flag: '🌍',
        code: countryName.toLowerCase().replace(/\s+/g, '-'),
      };
      return {
        code: config.code,
        name: countryName,
        flag: config.flag,
        count,
      };
    })
    .sort((a, b) => b.count - a.count); // descending by count
}
