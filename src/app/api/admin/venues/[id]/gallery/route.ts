import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getVenueById, updateVenue } from '@/lib/db/venues';
import { cookies } from 'next/headers';

// Delete a photo from venue gallery
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Get photo URL from request body
    const body = await request.json();
    const { photoUrl } = body;

    if (!photoUrl) {
      return NextResponse.json(
        { error: 'Photo URL is required' },
        { status: 400 }
      );
    }

    // Get current venue
    const venue = await getVenueById(id);

    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    // Get current gallery array
    const currentGallery = venue.gallery || [];

    // Check if photo exists in gallery
    if (!currentGallery.includes(photoUrl)) {
      return NextResponse.json(
        { error: 'Photo not found in gallery' },
        { status: 404 }
      );
    }

    // Remove photo from gallery array
    const newGallery = currentGallery.filter((url: string) => url !== photoUrl);

    // Update venue with new gallery
    const updatedVenue = await updateVenue(id, { gallery: newGallery });

    return NextResponse.json({
      message: 'Photo deleted successfully',
      venue: updatedVenue,
      deletedPhotoUrl: photoUrl,
      remainingPhotos: newGallery.length
    });
  } catch (error) {
    console.error('Error deleting gallery photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
