import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/auth';

// GET - List all public users (Google members)
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    const supabase = getAdminClient() as any;
    const { searchParams } = new URL(request.url);

    // Validate and sanitize pagination parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20') || 20));
    const search = searchParams.get('search') || '';

    // Validate sort parameters with whitelist
    const allowedSortFields = ['created_at', 'email', 'name', 'last_login'];
    const sortByParam = searchParams.get('sortBy') || 'created_at';
    const sortBy = allowedSortFields.includes(sortByParam) ? sortByParam : 'created_at';
    const sortOrderParam = searchParams.get('sortOrder') || 'desc';
    const sortOrder = ['asc', 'desc'].includes(sortOrderParam) ? sortOrderParam : 'desc';

    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('public_users')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (search) {
      query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Error fetching public users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch members' },
        { status: 500 }
      );
    }

    // Get like counts for each user
    const usersWithStats = await Promise.all(
      (users || []).map(async (user: any) => {
        const { count: likesCount } = await supabase
          .from('venue_likes')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        return {
          ...user,
          likes_count: likesCount || 0,
        };
      })
    );

    // Get total stats
    const { count: totalUsers } = await supabase
      .from('public_users')
      .select('*', { count: 'exact', head: true });

    const { count: totalLikes } = await supabase
      .from('venue_likes')
      .select('*', { count: 'exact', head: true });

    // Get users registered today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: todayUsers } = await supabase
      .from('public_users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    // Get active users (logged in last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { count: activeUsers } = await supabase
      .from('public_users')
      .select('*', { count: 'exact', head: true })
      .gte('last_login', weekAgo.toISOString());

    return NextResponse.json({
      members: usersWithStats,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
      stats: {
        totalUsers: totalUsers || 0,
        totalLikes: totalLikes || 0,
        newToday: todayUsers || 0,
        activeThisWeek: activeUsers || 0,
      },
    });
  } catch (error) {
    console.error('Error in members API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a public user
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const supabase = getAdminClient() as any;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // First delete user's likes
    await supabase
      .from('venue_likes')
      .delete()
      .eq('user_id', userId);

    // Delete rate limit records
    await supabase
      .from('like_rate_limits')
      .delete()
      .eq('user_id', userId);

    // Delete the user
    const { error } = await supabase
      .from('public_users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
