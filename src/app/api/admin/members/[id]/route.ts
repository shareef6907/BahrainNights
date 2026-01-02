import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// GET - Get a specific member's details including their liked venues
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient() as any;

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('public_users')
      .select('*')
      .eq('id', id)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    // Get user's liked venues
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
      member: user,
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
    const { id } = await params;
    const supabase = getAdminClient() as any;

    // First delete user's likes
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
