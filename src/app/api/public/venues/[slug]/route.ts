import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import type { Venue } from '@/types/database';

// Get a single venue by slug (approved venues only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Fetch venue by slug - only approved venues for public access
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'approved')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No venue found
        return NextResponse.json(
          { error: 'Venue not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching venue:', error);
      return NextResponse.json(
        { error: 'Failed to fetch venue' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Venue not found' },
        { status: 404 }
      );
    }

    const venue = data as Venue;

    // Increment view count in the background (don't wait)
    const venueId = venue.id;
    const newViewCount = (venue.view_count || 0) + 1;

    void (async () => {
      try {
        await (supabase as any)
          .from('venues')
          .update({ view_count: newViewCount })
          .eq('id', venueId);
      } catch (err) {
        console.error('Failed to increment view count:', err);
      }
    })();

    return NextResponse.json({ venue });
  } catch (error) {
    console.error('Error in venue API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
