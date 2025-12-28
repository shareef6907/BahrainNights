import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// DELETE /api/cinema/showtimes/[id] - Delete a showtime
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('showtimes')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete showtime error:', error);
    return NextResponse.json(
      { error: 'Failed to delete showtime' },
      { status: 500 }
    );
  }
}

// PATCH /api/cinema/showtimes/[id] - Update a showtime
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    const allowedFields = [
      'showtime',
      'format',
      'language',
      'screen_number',
      'booking_url',
      'price_standard',
      'price_vip',
      'is_active',
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const { data: showtime, error } = await supabase
      .from('showtimes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, showtime });
  } catch (error) {
    console.error('Update showtime error:', error);
    return NextResponse.json(
      { error: 'Failed to update showtime' },
      { status: 500 }
    );
  }
}
