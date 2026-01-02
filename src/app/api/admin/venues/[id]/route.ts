import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getVenueById, approveVenue, rejectVenue, deleteVenue, updateVenue } from '@/lib/db/venues';
import { sendVenueApprovalEmail, sendVenueRejectionEmail } from '@/lib/email';
import { cookies } from 'next/headers';

// Get single venue
export async function GET(
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

    const venue = await getVenueById(id);

    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    return NextResponse.json({ venue });
  } catch (error) {
    console.error('Error fetching venue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch venue' },
      { status: 500 }
    );
  }
}

// Update venue (approve/reject/update)
export async function PATCH(
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

    const body = await request.json();
    const { action, reason, ...updates } = body;

    let venue;
    let emailSent = false;
    let emailError: string | undefined;

    if (action === 'approve') {
      venue = await approveVenue(id);

      // Send approval email notification
      if (venue && venue.email) {
        const emailResult = await sendVenueApprovalEmail(
          venue.email,
          venue.name,
          venue.slug
        );
        emailSent = emailResult.success;
        emailError = emailResult.error;
      }
    } else if (action === 'reject') {
      if (!reason) {
        return NextResponse.json(
          { error: 'Rejection reason is required' },
          { status: 400 }
        );
      }
      venue = await rejectVenue(id, reason);

      // Send rejection email notification
      if (venue && venue.email) {
        const emailResult = await sendVenueRejectionEmail(
          venue.email,
          venue.name,
          reason
        );
        emailSent = emailResult.success;
        emailError = emailResult.error;
      }
    } else if (Object.keys(updates).length > 0) {
      venue = await updateVenue(id, updates);
    } else {
      return NextResponse.json(
        { error: 'No valid action or updates provided' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      venue,
      message: `Venue ${action || 'updated'} successfully`,
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error('Error updating venue:', error);
    return NextResponse.json(
      { error: 'Failed to update venue' },
      { status: 500 }
    );
  }
}

// Delete venue
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

    await deleteVenue(id);

    return NextResponse.json({ message: 'Venue deleted successfully' });
  } catch (error) {
    console.error('Error deleting venue:', error);
    return NextResponse.json(
      { error: 'Failed to delete venue' },
      { status: 500 }
    );
  }
}
