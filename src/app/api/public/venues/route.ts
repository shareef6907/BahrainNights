import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// Get approved venues for public display
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const area = searchParams.get('area');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'likes'; // 'likes', 'views', 'newest'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const featured = searchParams.get('featured') === 'true';

    const supabase = getAdminClient();

    // Build query for approved venues only (exclude hidden venues)
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

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting - most liked first by default
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

    const { data: venues, error } = await query;

    if (error) {
      console.error('Error fetching venues:', error);
      return NextResponse.json(
        { error: 'Failed to fetch venues' },
        { status: 500 }
      );
    }

    // Get total count for pagination (exclude hidden venues)
    const { count } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')
      .eq('is_hidden', false);

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
