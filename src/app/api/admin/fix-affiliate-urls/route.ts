import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const AFFILIATE_REF = 'yjg3yzi';

function generateAffiliateUrl(originalUrl: string): string {
  // If already has correct affiliate format, return as-is
  if (originalUrl.includes(`/aff/?ref=${AFFILIATE_REF}`)) {
    return originalUrl;
  }
  
  // Get the base URL (remove any existing affiliate params)
  let cleanUrl = originalUrl;
  if (originalUrl.includes('?affiliate=')) {
    cleanUrl = originalUrl.split('?affiliate=')[0];
  }
  
  const encodedUrl = encodeURIComponent(cleanUrl);
  return `https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=${encodedUrl}`;
}

export async function POST(request: NextRequest) {
  try {
    // Simple API key auth
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.ADMIN_API_KEY;
    
    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const stats = { eventsFixed: 0, eventsCorrect: 0, attractionsFixed: 0, attractionsCorrect: 0, errors: 0 };

    // Fix Events
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('id, title, affiliate_url, booking_url, source_url')
      .or('source_name.eq.platinumlist,affiliate_url.ilike.%platinumlist%,booking_url.ilike.%platinumlist%');

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
    } else {
      for (const event of events || []) {
        const sourceUrl = event.booking_url || event.source_url;
        if (!sourceUrl || !sourceUrl.includes('platinumlist')) continue;
        
        const correctAffiliateUrl = generateAffiliateUrl(sourceUrl);
        
        if (event.affiliate_url === correctAffiliateUrl) {
          stats.eventsCorrect++;
          continue;
        }
        
        const { error: updateError } = await supabase
          .from('events')
          .update({ affiliate_url: correctAffiliateUrl })
          .eq('id', event.id);
        
        if (updateError) {
          stats.errors++;
        } else {
          stats.eventsFixed++;
        }
      }
    }

    // Fix Attractions
    const { data: attractions, error: attractionsError } = await supabase
      .from('attractions')
      .select('id, name, affiliate_url, booking_url')
      .or('source.eq.platinumlist,affiliate_url.ilike.%platinumlist%,booking_url.ilike.%platinumlist%');

    if (attractionsError) {
      console.error('Error fetching attractions:', attractionsError);
    } else {
      for (const attraction of attractions || []) {
        const sourceUrl = attraction.booking_url;
        if (!sourceUrl || !sourceUrl.includes('platinumlist')) continue;
        
        const correctAffiliateUrl = generateAffiliateUrl(sourceUrl);
        
        if (attraction.affiliate_url === correctAffiliateUrl) {
          stats.attractionsCorrect++;
          continue;
        }
        
        const { error: updateError } = await supabase
          .from('attractions')
          .update({ affiliate_url: correctAffiliateUrl })
          .eq('id', attraction.id);
        
        if (updateError) {
          stats.errors++;
        } else {
          stats.attractionsFixed++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      stats,
      affiliateCode: AFFILIATE_REF,
      message: `Fixed ${stats.eventsFixed} events, ${stats.attractionsFixed} attractions. Already correct: ${stats.eventsCorrect} events, ${stats.attractionsCorrect} attractions.`,
    });
  } catch (error) {
    console.error('Fix affiliate error:', error);
    return NextResponse.json({ error: 'Failed to fix affiliate URLs', details: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Fix Platinumlist Affiliate URLs API',
    usage: 'POST with x-api-key header to fix all affiliate URLs',
    affiliateCode: AFFILIATE_REF,
    correctFormat: `https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=[URL]`,
  });
}
