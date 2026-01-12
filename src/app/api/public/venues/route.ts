import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// Get approved venues for public display
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const area = searchParams.get('area');
    const search = searchParams.get('search');
    const tags = searchParams.get('tags'); // Comma-separated list of tags
    const sortBy = searchParams.get('sortBy') || 'likes'; // 'likes', 'views', 'newest'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const featured = searchParams.get('featured') === 'true';

    const supabase = getAdminClient();

    // Try the full query with all columns first
    // If migrations haven't been run, fall back to simpler query
    let venues;
    let queryError;
    let useSimpleQuery = false;

    // First attempt: Full query with is_hidden and tags
    try {
      let query = supabase
        .from('venues')
        .select('*')
        .eq('status', 'approved')
        .eq('is_hidden', false);

      // Apply filters
      if (category) {
        query = query.eq('category', category);
      }

      if (area) {
        query = query.eq('area', area);
      }

      if (featured) {
        query = query.eq('is_featured', true);
      }

      // Filter by tags - venues that have ANY of the specified tags
      if (tags) {
        const tagList = tags.split(',').map(t => t.trim().toLowerCase());
        query = query.overlaps('tags', tagList);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'likes':
          query = query.order('like_count', { ascending: false });
          break;
        case 'views':
          query = query.order('view_count', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('like_count', { ascending: false });
      }

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const result = await query;

      if (result.error) {
        // Check if error is due to missing column
        if (result.error.code === '42703' || result.error.message?.includes('does not exist')) {
          console.warn('Some columns may not exist, falling back to simple query:', result.error.message);
          useSimpleQuery = true;
        } else {
          queryError = result.error;
        }
      } else {
        venues = result.data;
      }
    } catch (err) {
      console.warn('Error in full query, trying simple query:', err);
      useSimpleQuery = true;
    }

    // Fallback: Simple query without is_hidden and tags columns
    if (useSimpleQuery) {
      let query = supabase
        .from('venues')
        .select('*')
        .eq('status', 'approved');

      // Apply basic filters (no is_hidden, no tags)
      if (category) {
        query = query.eq('category', category);
      }

      if (area) {
        query = query.eq('area', area);
      }

      if (featured) {
        query = query.eq('is_featured', true);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'likes':
          query = query.order('like_count', { ascending: false });
          break;
        case 'views':
          query = query.order('view_count', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('like_count', { ascending: false });
      }

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const result = await query;

      if (result.error) {
        queryError = result.error;
      } else {
        venues = result.data;
      }
    }

    if (queryError) {
      console.error('Error fetching venues:', queryError);
      return NextResponse.json(
        { error: 'Failed to fetch venues' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    return NextResponse.json({
      venues: venues || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in venues API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
