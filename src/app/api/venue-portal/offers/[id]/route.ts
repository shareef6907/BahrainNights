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

// GET - Fetch a single offer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = getAdminClient();

    // Get the offer and verify it belongs to this venue
    const { data: offer, error } = await supabase
      .from('offers')
      .select('*')
      .eq('id', id)
      .eq('venue_id', venueId)
      .single();

    if (error || !offer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ offer });
  } catch (error) {
    console.error('Get offer error:', error);
    return NextResponse.json(
      { error: 'Failed to get offer' },
      { status: 500 }
    );
  }
}

// PUT - Update an offer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = getAdminClient();

    // Verify the offer belongs to this venue
    const { data: existingOffer, error: fetchError } = await supabase
      .from('offers')
      .select('id, venue_id')
      .eq('id', id)
      .eq('venue_id', venueId)
      .single();

    if (fetchError || !existingOffer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Validation
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Offer title is required' },
        { status: 400 }
      );
    }

    if (!body.offer_type) {
      return NextResponse.json(
        { error: 'Offer type is required' },
        { status: 400 }
      );
    }

    if (!body.days_available || body.days_available.length === 0) {
      return NextResponse.json(
        { error: 'At least one day must be selected' },
        { status: 400 }
      );
    }

    if (!body.start_time || !body.end_time) {
      return NextResponse.json(
        { error: 'Start and end times are required' },
        { status: 400 }
      );
    }

    // Update offer
    const updateData = {
      title: body.title.trim(),
      description: body.description?.trim() || '',
      offer_type: body.offer_type,
      days_available: body.days_available,
      start_time: body.start_time,
      end_time: body.end_time,
      valid_from: body.valid_from || null,
      valid_until: body.valid_until || null,
      is_ongoing: body.is_ongoing ?? true,
      whats_included: body.whats_included || null,
      terms_conditions: body.terms_conditions || null,
      reservation_required: body.reservation_required ?? false,
      featured_image: body.featured_image || null,
      status: body.status || 'active',
      updated_at: new Date().toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: offer, error } = await (supabase
      .from('offers') as any)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update offer error:', error.message, error.details, error.hint);
      return NextResponse.json(
        { error: 'Failed to update offer: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      offer,
    });
  } catch (error) {
    console.error('Update offer error:', error);
    return NextResponse.json(
      { error: 'Failed to update offer' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an offer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = getAdminClient();

    // Verify the offer belongs to this venue and delete
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase
      .from('offers') as any)
      .delete()
      .eq('id', id)
      .eq('venue_id', venueId);

    if (error) {
      console.error('Delete offer error:', error);
      return NextResponse.json(
        { error: 'Failed to delete offer' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete offer error:', error);
    return NextResponse.json(
      { error: 'Failed to delete offer' },
      { status: 500 }
    );
  }
}
