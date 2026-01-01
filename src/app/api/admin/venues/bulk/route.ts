import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { approveVenue, rejectVenue, deleteVenue } from '@/lib/db/venues';
import { cookies } from 'next/headers';

// Bulk actions for venues
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { action, venueIds, reason } = body;

    if (!action || !venueIds || !Array.isArray(venueIds) || venueIds.length === 0) {
      return NextResponse.json(
        { error: 'Action and venue IDs are required' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const id of venueIds) {
      try {
        switch (action) {
          case 'approve':
            await approveVenue(id);
            results.success++;
            break;
          case 'reject':
            if (!reason) {
              results.failed++;
              results.errors.push(`Venue ${id}: Rejection reason required`);
              continue;
            }
            await rejectVenue(id, reason);
            results.success++;
            break;
          case 'delete':
            await deleteVenue(id);
            results.success++;
            break;
          default:
            results.failed++;
            results.errors.push(`Invalid action: ${action}`);
        }
      } catch (error) {
        results.failed++;
        results.errors.push(`Venue ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      message: `Bulk ${action} completed`,
      results,
    });
  } catch (error) {
    console.error('Error performing bulk action:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk action' },
      { status: 500 }
    );
  }
}
