import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/auth';

// GET - Get a specific member's details including their liked venues
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const adminUser = await verifyToken(token);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;
    const supabase = getAdminClient() as any;

    // Get user details
    const { data: member, error: userError } = await supabase
      .from('public_users')
      .select('*')
      .eq('id', id)
      .single();

    if (userError || !member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    // Get member's liked venues
    const { data: likes, error: likesError } = await supabase
      .from('venue_likes')
      .select(`
        id,
        created_at,
        venue_id,
        venues (
          id,
          name,
          slug,
          category,
          area,
          logo_url
        )
      `)
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    if (likesError) {
      console.error('Error fetching likes:', likesError);
    }

    return NextResponse.json({
      member: member,
      likes: likes || [],
      likesCount: (likes || []).length,
    });
  } catch (error) {
    console.error('Error fetching member details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const adminUser = await verifyToken(token);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;
    const supabase = getAdminClient() as any;

    // First delete member's likes
    await supabase
      .from('venue_likes')
      .delete()
      .eq('user_id', id);

    // Delete rate limit records
    await supabase
      .from('like_rate_limits')
      .delete()
      .eq('user_id', id);

    // Delete the user
    const { error } = await supabase
      .from('public_users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { error: 'Failed to delete member' },
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
