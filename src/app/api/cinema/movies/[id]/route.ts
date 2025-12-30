import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

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

// GET /api/cinema/movies/[id] - Get a single movie
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();

    // Try to get by UUID first, then by slug
    let query = supabase.from('movies').select('*');

    // Check if id is a UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data: movie, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Movie not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ movie });
  } catch (error) {
    console.error('Get movie error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}

// PATCH /api/cinema/movies/[id] - Update a movie
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    // Only allow certain fields to be updated
    const allowedFields = [
      'is_now_showing',
      'is_coming_soon',
      'display_order',
      'rating',
      'synopsis',
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

    updates.updated_at = new Date().toISOString();

    const { data: movie, error } = await supabase
      .from('movies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Movie not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    // Revalidate the public cinema page to show changes immediately
    revalidatePath('/cinema');

    return NextResponse.json({ success: true, movie });
  } catch (error) {
    console.error('Update movie error:', error);
    return NextResponse.json(
      { error: 'Failed to update movie' },
      { status: 500 }
    );
  }
}

// DELETE /api/cinema/movies/[id] - Delete a movie
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('movies')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    // Revalidate the public cinema page
    revalidatePath('/cinema');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete movie error:', error);
    return NextResponse.json(
      { error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
}
