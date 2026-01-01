import { NextRequest, NextResponse } from 'next/server';
import { getCurrentPublicUser } from '@/lib/public-auth';
import { toggleVenueLike, getUserLikedVenueIds, getVenueLikeCount } from '@/lib/db/venue-likes';

// Get user's liked venues or check if specific venue is liked
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentPublicUser();
    const venueId = request.nextUrl.searchParams.get('venueId');

    // If checking a specific venue, return like count even for unauthenticated users
    if (venueId) {
      const likeCount = await getVenueLikeCount(venueId);
      const isLiked = user ? (await getUserLikedVenueIds(user.id)).includes(venueId) : false;

      return NextResponse.json({
        likeCount,
        isLiked,
      });
    }

    // If no venue ID, return user's liked venue IDs
    if (!user) {
      return NextResponse.json({ likedVenueIds: [] });
    }

    const likedVenueIds = await getUserLikedVenueIds(user.id);
    return NextResponse.json({ likedVenueIds });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}

// Toggle like on a venue
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentPublicUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', requireAuth: true },
        { status: 401 }
      );
    }

    const { venueId } = await request.json();

    if (!venueId) {
      return NextResponse.json(
        { error: 'Venue ID is required' },
        { status: 400 }
      );
    }

    const result = await toggleVenueLike(user.id, venueId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      liked: result.liked,
      likeCount: result.likeCount,
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
