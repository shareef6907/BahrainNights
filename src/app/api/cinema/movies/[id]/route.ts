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

// PATCH /api/cinema/movies/[id] - Update a movie (ALL fields editable)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    // All editable fields - admin can edit everything
    const allowedFields = [
      'title',
      'slug',
      'poster_url',
      'backdrop_url',
      'trailer_url',
      'trailer_key',
      'synopsis',
      'genre',
      'duration_minutes',
      'rating',
      'tmdb_rating',
      'release_date',
      'director',
      'movie_cast',
      'language',
      'is_now_showing',
      'is_coming_soon',
      'display_order',
      'scraped_from',
    ];

    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        // Handle field name mappings
        if (field === 'duration' && body.duration !== undefined) {
          updates['duration_minutes'] = body.duration;
        } else if (field === 'imdb_rating' && body.imdb_rating !== undefined) {
          updates['tmdb_rating'] = body.imdb_rating;
        } else if (field === 'cast' && body.cast !== undefined) {
          updates['movie_cast'] = body.cast;
        } else if (field === 'description' && body.description !== undefined) {
          updates['synopsis'] = body.description;
        } else {
          updates[field] = body[field];
        }
      }
    }

    // Also handle alternative field names from frontend
    if (body.duration !== undefined && !updates['duration_minutes']) {
      updates['duration_minutes'] = body.duration;
    }
    if (body.imdb_rating !== undefined && !updates['tmdb_rating']) {
      updates['tmdb_rating'] = body.imdb_rating;
    }
    if (body.cast !== undefined && !updates['movie_cast']) {
      updates['movie_cast'] = body.cast;
    }
    if (body.description !== undefined && !updates['synopsis']) {
      updates['synopsis'] = body.description;
    }

    // If title changed, update slug
    if (body.title && !body.slug) {
      const newSlug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 100);

      // Check if slug is taken by another movie
      const { data: existing } = await supabase
        .from('movies')
        .select('id, slug')
        .eq('slug', newSlug)
        .neq('id', id)
        .single();

      updates['slug'] = existing ? `${newSlug}-${Date.now()}` : newSlug;
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
      console.error('Update movie error:', error);
      throw error;
    }

    // Revalidate cinema pages
    revalidatePath('/cinema');
    revalidatePath('/admin/cinema');
    if (movie?.slug) {
      revalidatePath(`/cinema/${movie.slug}`);
    }

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

    // Revalidate cinema pages
    revalidatePath('/cinema');
    revalidatePath('/admin/cinema');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete movie error:', error);
    return NextResponse.json(
      { error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
}
