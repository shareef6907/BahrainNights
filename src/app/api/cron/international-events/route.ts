import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max

// Platinumlist API Configuration
const PLATINUMLIST_API_BASE = 'https://api.platinumlist.net/v/7';
const PLATINUMLIST_API_KEY = 'd4787139-72b0-468c-a691-42deea0e8400';
const AFFILIATE_REF = 'yjg3yzi';

// Country detection - comprehensive list
const COUNTRY_CONFIGS = [
  { name: 'UAE', code: 'AE', currency: 'AED', timezone: 'Asia/Dubai', patterns: ['dubai.platinumlist', 'abudhabi.platinumlist', 'uae.platinumlist'] },
  { name: 'Saudi Arabia', code: 'SA', currency: 'SAR', timezone: 'Asia/Riyadh', patterns: ['riyadh.platinumlist', 'jeddah.platinumlist', 'saudi.platinumlist', 'ksa.platinumlist'] },
  { name: 'Qatar', code: 'QA', currency: 'QAR', timezone: 'Asia/Qatar', patterns: ['doha.platinumlist', 'qatar.platinumlist'] },
  { name: 'Kuwait', code: 'KW', currency: 'KWD', timezone: 'Asia/Kuwait', patterns: ['kuwait.platinumlist'] },
  { name: 'Oman', code: 'OM', currency: 'OMR', timezone: 'Asia/Muscat', patterns: ['muscat.platinumlist', 'oman.platinumlist'] },
  { name: 'Jordan', code: 'JO', currency: 'JOD', timezone: 'Asia/Amman', patterns: ['amman.platinumlist', 'jordan.platinumlist'] },
  { name: 'Lebanon', code: 'LB', currency: 'LBP', timezone: 'Asia/Beirut', patterns: ['beirut.platinumlist', 'lebanon.platinumlist'] },
  { name: 'Egypt', code: 'EG', currency: 'EGP', timezone: 'Africa/Cairo', patterns: ['cairo.platinumlist', 'egypt.platinumlist'] },
  { name: 'Morocco', code: 'MA', currency: 'MAD', timezone: 'Africa/Casablanca', patterns: ['morocco.platinumlist', 'casablanca.platinumlist', 'marrakech.platinumlist'] },
  { name: 'Türkiye', code: 'TR', currency: 'TRY', timezone: 'Europe/Istanbul', patterns: ['istanbul.platinumlist', 'turkey.platinumlist', 'turkiye.platinumlist'] },
  { name: 'UK', code: 'GB', currency: 'GBP', timezone: 'Europe/London', patterns: ['london.platinumlist', 'uk.platinumlist'] },
  { name: 'India', code: 'IN', currency: 'INR', timezone: 'Asia/Kolkata', patterns: ['india.platinumlist', 'mumbai.platinumlist', 'delhi.platinumlist'] },
  { name: 'Pakistan', code: 'PK', currency: 'PKR', timezone: 'Asia/Karachi', patterns: ['pakistan.platinumlist', 'karachi.platinumlist'] },
  { name: 'Singapore', code: 'SG', currency: 'SGD', timezone: 'Asia/Singapore', patterns: ['singapore.platinumlist'] },
  { name: 'Malaysia', code: 'MY', currency: 'MYR', timezone: 'Asia/Kuala_Lumpur', patterns: ['malaysia.platinumlist'] },
  { name: 'Thailand', code: 'TH', currency: 'THB', timezone: 'Asia/Bangkok', patterns: ['thailand.platinumlist', 'bangkok.platinumlist'] },
  { name: 'Indonesia', code: 'ID', currency: 'IDR', timezone: 'Asia/Jakarta', patterns: ['indonesia.platinumlist', 'jakarta.platinumlist', 'bali.platinumlist'] },
  { name: 'Philippines', code: 'PH', currency: 'PHP', timezone: 'Asia/Manila', patterns: ['philippines.platinumlist', 'manila.platinumlist'] },
  { name: 'South Africa', code: 'ZA', currency: 'ZAR', timezone: 'Africa/Johannesburg', patterns: ['southafrica.platinumlist', 'johannesburg.platinumlist'] },
  { name: 'Nigeria', code: 'NG', currency: 'NGN', timezone: 'Africa/Lagos', patterns: ['nigeria.platinumlist', 'lagos.platinumlist'] },
  { name: 'Germany', code: 'DE', currency: 'EUR', timezone: 'Europe/Berlin', patterns: ['germany.platinumlist', 'berlin.platinumlist'] },
  { name: 'France', code: 'FR', currency: 'EUR', timezone: 'Europe/Paris', patterns: ['france.platinumlist', 'paris.platinumlist'] },
  { name: 'Spain', code: 'ES', currency: 'EUR', timezone: 'Europe/Madrid', patterns: ['spain.platinumlist', 'madrid.platinumlist', 'barcelona.platinumlist'] },
  { name: 'Italy', code: 'IT', currency: 'EUR', timezone: 'Europe/Rome', patterns: ['italy.platinumlist', 'rome.platinumlist', 'milan.platinumlist'] },
  { name: 'Greece', code: 'GR', currency: 'EUR', timezone: 'Europe/Athens', patterns: ['greece.platinumlist', 'athens.platinumlist', 'mykonos.platinumlist'] },
  { name: 'Cyprus', code: 'CY', currency: 'EUR', timezone: 'Asia/Nicosia', patterns: ['cyprus.platinumlist', 'nicosia.platinumlist'] },
  { name: 'USA', code: 'US', currency: 'USD', timezone: 'America/New_York', patterns: ['usa.platinumlist', 'newyork.platinumlist', 'miami.platinumlist', 'lasvegas.platinumlist'] },
];

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

function detectCountry(event: PlatinumlistEvent): { name: string; timezone: string } | null {
  const url = event.url?.toLowerCase() || '';
  const currency = event.price?.data?.currency || '';
  const eventTimezone = event.timezone || '';

  for (const config of COUNTRY_CONFIGS) {
    for (const pattern of config.patterns) {
      if (url.includes(pattern)) {
        return { name: config.name, timezone: config.timezone };
      }
    }
    if (eventTimezone === config.timezone) {
      return { name: config.name, timezone: config.timezone };
    }
    if (currency === config.currency) {
      return { name: config.name, timezone: config.timezone };
    }
  }
  return null;
}

function isBahrainEvent(event: PlatinumlistEvent): boolean {
  const url = event.url?.toLowerCase() || '';
  return url.includes('manama.platinumlist') || url.includes('bahrain.platinumlist');
}

function unixToDate(timestamp: number, timezone: string = 'Asia/Dubai'): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-CA', { timeZone: timezone });
}

function unixToTime(timestamp: number, timezone: string = 'Asia/Dubai'): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false });
}

function generateSlug(title: string, id: number): string {
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  return `${baseSlug}-${id}`;
}

function generateAffiliateUrl(originalUrl: string): string {
  return `https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=${encodeURIComponent(originalUrl)}`;
}

function cleanDescription(desc: string | null): string | null {
  if (!desc) return null;
  let cleaned = desc.replace(/<[^>]*>/g, '');
  cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return cleaned.replace(/\s+/g, ' ').trim() || null;
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

async function fetchFromPlatinumlist(endpoint: string): Promise<{ data: PlatinumlistEvent[] } | null> {
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

export async function GET(request: NextRequest) {
  // Verify cron authorization
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isAuthorized = cronSecret && authHeader === `Bearer ${cronSecret}`;

  if (!isVercelCron && !isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('[International Events Cron] Starting sync...');
  const stats = { fetched: 0, inserted: 0, updated: 0, errors: 0, countries: new Set<string>() };
  const allEvents: PlatinumlistEvent[] = [];

  // Fetch all pages of events
  let page = 1;
  const perPage = 50;
  let hasMore = true;

  while (hasMore && page <= 50) {
    const response = await fetchFromPlatinumlist(`/events?page=${page}&per_page=${perPage}`);
    if (!response?.data?.length) {
      hasMore = false;
      break;
    }

    // Filter for international events (NOT Bahrain, NOT attractions, NOT sold out)
    const internationalEvents = response.data.filter(e => 
      !isBahrainEvent(e) && 
      !e.is_attraction && 
      e.status !== 'sold out' &&
      detectCountry(e) !== null
    );
    
    allEvents.push(...internationalEvents);
    hasMore = response.data.length === perPage;
    page++;
    
    await new Promise(r => setTimeout(r, 300)); // Rate limiting
  }

  stats.fetched = allEvents.length;
  console.log(`[International Events Cron] Fetched ${stats.fetched} international events`);

  // Upsert events
  for (const event of allEvents) {
    try {
      const country = detectCountry(event);
      if (!country) continue;

      stats.countries.add(country.name);
      const timezone = event.timezone || country.timezone;
      const startDate = unixToDate(event.start, timezone);
      const startTime = unixToTime(event.start, timezone);
      const price = event.price?.data?.price;
      const currency = event.price?.data?.currency || 'USD';

      const dbEvent = {
        title: event.name,
        slug: generateSlug(event.name, event.id),
        description: cleanDescription(event.description),
        category: detectCategory(event.name, event.description || ''),
        venue_name: event.name.match(/at\s+(.+)$/i)?.[1]?.trim() || null,
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
        country: country.name,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('events')
        .select('id')
        .eq('source_name', 'platinumlist')
        .eq('source_event_id', String(event.id))
        .single();

      if (existing) {
        const { error } = await supabase.from('events').update(dbEvent).eq('id', existing.id);
        if (error) stats.errors++;
        else stats.updated++;
      } else {
        const { error } = await supabase.from('events').insert({ ...dbEvent, created_at: new Date().toISOString() });
        if (error) stats.errors++;
        else stats.inserted++;
      }
    } catch {
      stats.errors++;
    }
  }

  // Cleanup past international events
  const today = new Date().toISOString().split('T')[0];
  const { data: cleaned } = await supabase
    .from('events')
    .delete()
    .eq('source_name', 'platinumlist')
    .neq('country', 'Bahrain')
    .lt('end_date', today)
    .select('id');

  const countriesArray = Array.from(stats.countries);
  console.log(`[International Events Cron] Completed: ${stats.inserted} inserted, ${stats.updated} updated, ${stats.errors} errors`);
  console.log(`[International Events Cron] Countries: ${countriesArray.join(', ')}`);
  console.log(`[International Events Cron] Cleaned ${cleaned?.length || 0} past events`);

  return NextResponse.json({
    success: true,
    stats: {
      fetched: stats.fetched,
      inserted: stats.inserted,
      updated: stats.updated,
      errors: stats.errors,
      countries: countriesArray,
      cleaned: cleaned?.length || 0,
    },
    message: `Synced ${stats.fetched} international events from ${countriesArray.length} countries`,
  });
}
