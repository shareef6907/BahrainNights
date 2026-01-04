import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Get all venues for featured management
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all approved venues
    const { data: venues, error } = await supabaseAdmin
      .from('venues')
      .select('id, name, slug, category, area, logo_url, cover_image_url, is_featured, like_count, status')
      .eq('status', 'approved')
      .order('is_featured', { ascending: false })
      .order('like_count', { ascending: false });

    if (error) {
      console.error('Error fetching venues:', error);
      return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
    }

    return NextResponse.json({ venues });
  } catch (error) {
    console.error('Error in featured API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Toggle featured status
export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { venueId, is_featured } = body;

    if (!venueId || typeof is_featured !== 'boolean') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Update venue featured status
    const { error } = await supabaseAdmin
      .from('venues')
      .update({ is_featured, updated_at: new Date().toISOString() })
      .eq('id', venueId);

    if (error) {
      console.error('Error updating venue:', error);
      return NextResponse.json({ error: 'Failed to update venue' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in featured PATCH:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
