import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

interface VenueData {
  id: string;
  name: string;
}

interface ExistingRequest {
  id: string;
}

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

// Submit profile changes for admin approval
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

    // Validate that we have changes to submit
    if (!body.changes || typeof body.changes !== 'object' || Object.keys(body.changes).length === 0) {
      return NextResponse.json(
        { error: 'No changes provided' },
        { status: 400 }
      );
    }

    // Only allow certain fields to be changed
    // Note: must match actual database column names exactly (from database.ts)
    const allowedFields = [
      'description',
      'description_ar',
      'phone',
      'address',
      'area',
      'opening_hours',
      'instagram',
      'website',
      'whatsapp',
      'facebook',
      'tiktok',
      'twitter',
      'cuisine_types', // plural - matches database column
      'subcategories',
      'features',
      'logo_url',
      'cover_image_url',
      'gallery',
      'latitude',
      'longitude',
      'google_maps_url',
      'price_range',
      'avg_cost_per_person',
      'menu_url',
      'booking_url',
    ];

    const filteredChanges: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body.changes[field] !== undefined) {
        filteredChanges[field] = body.changes[field];
      }
    }

    if (Object.keys(filteredChanges).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Get current venue data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: venue, error: venueError } = await (supabase
      .from('venues') as any)
      .select('id, name')
      .eq('id', venueId)
      .single();

    const venueData = venue as VenueData | null;

    if (venueError || !venueData) {
      return NextResponse.json(
        { error: 'Venue not found' },
        { status: 404 }
      );
    }

    // Check if there's already a pending change request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingRequest } = await (supabase
      .from('venue_change_requests') as any)
      .select('id')
      .eq('venue_id', venueId)
      .eq('status', 'pending')
      .single();

    const existing = existingRequest as ExistingRequest | null;

    if (existing) {
      // Update the existing pending request
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: updatedRequest, error: updateError } = await (supabase
        .from('venue_change_requests') as any)
        .update({
          changes: filteredChanges,
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) {
        console.error('Update change request error:', updateError);
        return NextResponse.json(
          { error: 'Failed to update change request' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your profile change request has been updated and is pending admin approval.',
        request: updatedRequest,
      });
    }

    // Create new change request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: newRequest, error: createError } = await (supabase
      .from('venue_change_requests') as any)
      .insert({
        venue_id: venueId,
        changes: filteredChanges,
        status: 'pending',
      })
      .select()
      .single();

    if (createError) {
      console.error('Create change request error:', createError);
      return NextResponse.json(
        { error: 'Failed to create change request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your profile changes have been submitted for admin approval.',
      request: newRequest,
    });
  } catch (error) {
    console.error('Request change error:', error);
    return NextResponse.json(
      { error: 'Failed to submit change request' },
      { status: 500 }
    );
  }
}

// Get the current pending change request for this venue
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: pendingRequest, error } = await (supabase
      .from('venue_change_requests') as any)
      .select('*')
      .eq('venue_id', venueId)
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is fine
      console.error('Get pending request error:', error);
      return NextResponse.json(
        { error: 'Failed to get pending request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pendingRequest: pendingRequest || null,
    });
  } catch (error) {
    console.error('Get pending request error:', error);
    return NextResponse.json(
      { error: 'Failed to get pending request' },
      { status: 500 }
    );
  }
}
