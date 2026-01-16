import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';
import { isValidInstagramReelUrl, normalizeInstagramReelUrl } from '@/lib/utils/instagram';

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

async function getVenueFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('venue_session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, VENUE_SESSION_SECRET);
    if (payload.type !== 'venue' || !payload.venueId) {
      return null;
    }
    return payload.venueId as string;
  } catch {
    return null;
  }
}

// GET - Fetch all reels for the venue
export async function GET() {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const supabase = getAdminClient();

    // Get reels for this venue, ordered by display_order
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: reels, error } = await (supabase
      .from('venue_reels') as any)
      .select('*')
      .eq('venue_id', venueId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Get reels error:', error);
      return NextResponse.json(
        { error: 'Failed to get reels' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reels: reels || [] });
  } catch (error) {
    console.error('Get reels error:', error);
    return NextResponse.json(
      { error: 'Failed to get reels' },
      { status: 500 }
    );
  }
}

// POST - Create a new reel
export async function POST(request: NextRequest) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { instagram_url } = body;

    // Validation
    if (!instagram_url || !instagram_url.trim()) {
      return NextResponse.json(
        { error: 'Instagram reel URL is required' },
        { status: 400 }
      );
    }

    if (!isValidInstagramReelUrl(instagram_url)) {
      return NextResponse.json(
        { error: 'Please enter a valid Instagram Reel URL' },
        { status: 400 }
      );
    }

    // Normalize the URL
    const normalizedUrl = normalizeInstagramReelUrl(instagram_url);
    if (!normalizedUrl) {
      return NextResponse.json(
        { error: 'Could not process the Instagram Reel URL' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Check for duplicate URL for this venue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingReel } = await (supabase
      .from('venue_reels') as any)
      .select('id')
      .eq('venue_id', venueId)
      .eq('instagram_url', normalizedUrl)
      .eq('is_active', true)
      .single();

    if (existingReel) {
      return NextResponse.json(
        { error: 'This reel has already been added' },
        { status: 400 }
      );
    }

    // Get the highest display_order for this venue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: maxOrderResult } = await (supabase
      .from('venue_reels') as any)
      .select('display_order')
      .eq('venue_id', venueId)
      .eq('is_active', true)
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = maxOrderResult ? maxOrderResult.display_order + 1 : 0;

    // Create the reel - video_url and thumbnail_url are optional
    const { video_url, thumbnail_url } = body;

    const reelData = {
      venue_id: venueId,
      instagram_url: normalizedUrl,
      video_url: video_url || null,
      thumbnail_url: thumbnail_url || null,
      display_order: nextOrder,
      is_active: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: reel, error } = await (supabase
      .from('venue_reels') as any)
      .insert(reelData)
      .select()
      .single();

    if (error) {
      console.error('Create reel error:', error.message, error.details, error.hint);
      return NextResponse.json(
        { error: 'Failed to create reel: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reel,
    });
  } catch (error) {
    console.error('Create reel error:', error);
    return NextResponse.json(
      { error: 'Failed to create reel' },
      { status: 500 }
    );
  }
}
