import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from '@/lib/auth';
import { generateEventSlug } from '@/lib/slug';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes for sync

// Platinumlist API Configuration
const PLATINUMLIST_API_BASE = 'https://api.platinumlist.net/v/7';
const PLATINUMLIST_API_KEY = 'd4787139-72b0-468c-a691-42deea0e8400';
const AFFILIATE_REF = 'yjg3yzi';

interface PlatinumlistEvent {
  id: number;
  name: string;
  description: string;
  start: number;
  end: number;
  timezone: string;
  image_big?: { src: string };
  image_full?: { src: string };
  url: string;
  status: string;
  is_attraction: boolean;
  price?: { data?: { price: number; currency: string } };
}

/**
 * Convert Unix timestamp to ISO date string in event's timezone
 */
function unixToDate(timestamp: number, timezone: string = 'Asia/Bahrain'): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-CA', { timeZone: timezone });
}

/**
 * Convert Unix timestamp to time string (HH:MM) in event's timezone
 */
function unixToTime(timestamp: number, timezone: string = 'Asia/Bahrain'): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-GB', { 
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });
}

// Delegates to the shared helper so a non-Latin title (e.g. Cyrillic) still
// produces a readable slug instead of an empty one like `--108813`.
function generateSlug(title: string, id: number | string): string {
  return generateEventSlug(title, id, 'bahrain');
}

function generateAffiliateUrl(originalUrl: string): string {
  const encodedUrl = encodeURIComponent(originalUrl);
  return `https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=${encodedUrl}`;
}

function cleanDescription(desc: string | null | undefined): string | null {
  if (!desc) return null;
  let cleaned = desc.replace(/<[^>]*>/g, '');
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned || null;
}

function detectCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  if (text.includes('concert') || text.includes('music') || text.includes('live band')) return 'concerts';
  if (text.includes('comedy') || text.includes('stand-up')) return 'comedy';
  if (text.includes('club') || text.includes('party') || text.includes('dj')) return 'nightlife';
  if (text.includes('sport') || text.includes('football') || text.includes('racing')) return 'sports';
  if (text.includes('theatre') || text.includes('theater')) return 'cultural';
  if (text.includes('family') || text.includes('kids')) return 'family';
  return 'events';
}

function isBahrainEvent(event: PlatinumlistEvent): boolean {
  const url = event.url?.toLowerCase() || '';
  return url.includes('manama.platinumlist.net') || url.includes('bahrain.platinumlist.net');
}

function extractVenueFromName(name: string): string | null {
  const nameMatch = name.match(/at\s+(.+)$/i);
  return nameMatch ? nameMatch[1].trim() : null;
}

interface PlatinumlistResponse {
  data: PlatinumlistEvent[];
  meta?: {
    pagination?: {
      total?: number;
      count?: number;
      per_page?: number;
      current_page?: number;
      total_pages?: number;
    };
  };
}

async function fetchFromPlatinumlist(endpoint: string): Promise<PlatinumlistResponse | null> {
  const url = `${PLATINUMLIST_API_BASE}${endpoint}&scope=affiliate.show.events&include=price`;
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': PLATINUMLIST_API_KEY,
        'price_scope': 'price',
      },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    // Also check for API key in header for programmatic access
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.ADMIN_API_KEY;
    
    if (!token && (!apiKey || apiKey !== validApiKey)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (token) {
      const user = await verifyToken(token);
      if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const stats = { fetched: 0, inserted: 0, updated: 0, errors: 0 };
    const allEvents: PlatinumlistEvent[] = [];
    let pagesFetched = 0;
    let totalEventsInFeed = 0;
    let newestEventStart = 0;

    // Fetch all pages of events.
    //
    // The Platinumlist API returns events OLDEST-FIRST by default, so the newest
    // (and therefore all future) events sit at the END of the feed. The previous
    // cap of 30 pages at 50 per page stopped at event 1500 of 1631 and never
    // requested the tail - which is why future events were missing from the
    // listings while the API itself was serving them fine.
    //
    // Two changes fix it:
    //  1. `sort=-start` makes the API return the NEWEST events first, so the
    //     pages we do fetch are the ones that matter. Verified against the live
    //     API: page 1 at per_page=100 is 100% future events.
    //  2. Paging runs until the API reports the last page (via its own
    //     pagination metadata) rather than to a fixed cap, so the sync cannot
    //     silently fall behind if the feed grows again.
    let page = 1;
    const perPage = 100;
    const MAX_PAGES = 200; // safety net against a runaway loop
    let hasMore = true;
    let totalPages: number | null = null;

    while (hasMore && page <= MAX_PAGES) {
      const response = await fetchFromPlatinumlist(
        `/events?page=${page}&per_page=${perPage}&sort=-start`
      );
      if (!response?.data?.length) {
        hasMore = false;
        break;
      }

      // Filter for Bahrain events only
      const bahrainEvents = response.data.filter(e => 
        isBahrainEvent(e) && !e.is_attraction && e.status !== 'sold out'
      );
      
      allEvents.push(...bahrainEvents);
      totalEventsInFeed += response.data.length;

      // Track the newest event seen in the feed so a future truncation is
      // visible in the logs instead of silently dropping upcoming events.
      for (const e of response.data) {
        if (typeof e.start === 'number' && e.start > newestEventStart) {
          newestEventStart = e.start;
        }
      }

      const pagination = response.meta?.pagination;
      if (typeof pagination?.total_pages === 'number') {
        totalPages = pagination.total_pages;
      }
      pagesFetched = page;

      // Stop when we have read the last page. Fall back to the short-page
      // heuristic if the API omits its pagination metadata.
      hasMore = totalPages !== null ? page < totalPages : response.data.length === perPage;
      page++;

      // Rate limiting
      await new Promise(r => setTimeout(r, 300));
    }

    if (hasMore) {
      console.warn(
        `Platinumlist sync hit the MAX_PAGES safety cap (${MAX_PAGES} pages). ` +
        `The feed may be larger than expected - increase MAX_PAGES if this is legitimate.`
      );
    }

    stats.fetched = allEvents.length;
    console.log(
      `Platinumlist sync: fetched ${pagesFetched} page(s) of ${totalPages ?? 'unknown'} in the feed, ` +
      `${totalEventsInFeed} events in feed, ` +
      `${allEvents.length} Bahrain events matched. Newest event in feed: ${
        newestEventStart ? new Date(newestEventStart * 1000).toISOString() : 'unknown'
      }`
    );

    // Upsert events
    for (const event of allEvents) {
      try {
        const timezone = event.timezone || 'Asia/Bahrain';
        const startDate = unixToDate(event.start, timezone);
        const startTime = unixToTime(event.start, timezone);
        const price = event.price?.data?.price;
        const currency = event.price?.data?.currency || 'BHD';

        const dbEvent = {
          title: event.name,
          slug: generateSlug(event.name, event.id),
          description: cleanDescription(event.description),
          category: detectCategory(event.name, event.description || ''),
          venue_name: extractVenueFromName(event.name),
          date: startDate,
          time: startTime,
          start_date: startDate,
          end_date: unixToDate(event.end, timezone),
          start_time: startTime,
          end_time: unixToTime(event.end, timezone),
          price: price && price > 0 ? `${price}` : null,
          price_currency: currency,
          featured_image: event.image_full?.src || event.image_big?.src || null,
          cover_url: event.image_full?.src || event.image_big?.src || null,
          booking_url: event.url,
          affiliate_url: generateAffiliateUrl(event.url),
          source_name: 'platinumlist',
          source_url: event.url,
          source_event_id: String(event.id),
          status: 'published',
          is_featured: false,
          is_active: true,
          is_hidden: false,
          country: 'Bahrain',
          updated_at: new Date().toISOString(),
        };

        // Check if exists
        const { data: existing } = await supabase
          .from('events')
          .select('id')
          .eq('source_name', 'platinumlist')
          .eq('source_event_id', String(event.id))
          .single();

        if (existing) {
          const { error } = await supabase
            .from('events')
            .update(dbEvent)
            .eq('id', existing.id);
          if (error) stats.errors++;
          else stats.updated++;
        } else {
          const { error } = await supabase
            .from('events')
            .insert({ ...dbEvent, created_at: new Date().toISOString() });
          if (error) stats.errors++;
          else stats.inserted++;
        }
      } catch {
        stats.errors++;
      }
    }

    return NextResponse.json({
      success: true,
      stats,
      message: `Synced ${stats.fetched} events: ${stats.inserted} inserted, ${stats.updated} updated, ${stats.errors} errors`,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Platinumlist Sync API',
    usage: 'POST to trigger sync (requires admin auth)',
  });
}
