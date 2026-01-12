import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';

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

interface ReorderItem {
  id: string;
  display_order: number;
}

// PATCH - Reorder reels
export async function PATCH(request: NextRequest) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { reels } = body as { reels: ReorderItem[] };

    if (!reels || !Array.isArray(reels)) {
      return NextResponse.json(
        { error: 'Invalid reels data' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Update each reel's display_order
    // We need to verify each reel belongs to this venue
    for (const item of reels) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase
        .from('venue_reels') as any)
        .update({
          display_order: item.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id)
        .eq('venue_id', venueId);

      if (error) {
        console.error('Reorder reel error for id', item.id, ':', error);
        // Continue with other updates even if one fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder reels error:', error);
    return NextResponse.json(
      { error: 'Failed to reorder reels' },
      { status: 500 }
    );
  }
}
