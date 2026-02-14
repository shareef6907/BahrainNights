import { NextResponse } from 'next/server';
import { getArtists, countArtistsByStatus, countArtistsByCategory, getThisMonthBookingRequests } from '@/lib/db/artists';
import { ArtistCategory, ArtistStatus } from '@/types/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as ArtistStatus | 'all' | null;
    const category = searchParams.get('category') as ArtistCategory | 'all' | null;
    const search = searchParams.get('search');

    // Fetch artists with filters
    const artists = await getArtists({
      status: status || 'all',
      category: category || 'all',
      search: search || undefined,
    });

    // Fetch stats
    const statusCounts = await countArtistsByStatus();
    const categoryCounts = await countArtistsByCategory();
    const monthlyRequests = await getThisMonthBookingRequests();

    return NextResponse.json({
      artists,
      stats: {
        ...statusCounts,
        byCategory: categoryCounts,
        monthlyRequests,
      },
    });
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}
