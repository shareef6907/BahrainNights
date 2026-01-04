import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAdById, updateAd, deleteAd, pauseAd, activateAd, markAdPaid } from '@/lib/db/ads';
import { cookies } from 'next/headers';

// Get single ad
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

    const ad = await getAdById(id);

    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    return NextResponse.json({ ad });
  } catch (error) {
    console.error('Error fetching ad:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ad' },
      { status: 500 }
    );
  }
}

// Update ad
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
    const { action, ...updates } = body;

    let ad;

    // Handle special actions
    if (action === 'pause') {
      ad = await pauseAd(id);
      return NextResponse.json({ ad, message: 'Ad paused successfully' });
    }

    if (action === 'activate') {
      ad = await activateAd(id);
      return NextResponse.json({ ad, message: 'Ad activated successfully' });
    }

    if (action === 'markPaid') {
      ad = await markAdPaid(id, body.paymentDate);
      return NextResponse.json({ ad, message: 'Ad marked as paid' });
    }

    // Handle regular updates
    const updateData: Record<string, any> = {};

    if (updates.advertiserName) updateData.advertiser_name = updates.advertiserName;
    if (updates.companyName !== undefined) updateData.company_name = updates.companyName;
    if (updates.title) updateData.title = updates.title;
    if (updates.imageUrl) updateData.image_url = updates.imageUrl;
    if (updates.targetUrl !== undefined) updateData.target_url = updates.targetUrl; // Allow empty string
    if (updates.slotPosition !== undefined) updateData.slot_position = updates.slotPosition;
    if (updates.startDate) updateData.start_date = updates.startDate;
    if (updates.endDate) updateData.end_date = updates.endDate;
    if (updates.priceBd !== undefined) updateData.price_bd = updates.priceBd;
    if (updates.paymentStatus) updateData.payment_status = updates.paymentStatus;
    if (updates.status) updateData.status = updates.status;
    if (updates.imageSettings !== undefined) updateData.image_settings = updates.imageSettings;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    ad = await updateAd(id, updateData);

    return NextResponse.json({ ad, message: 'Ad updated successfully' });
  } catch (error) {
    console.error('Error updating ad:', error);
    return NextResponse.json(
      { error: 'Failed to update ad' },
      { status: 500 }
    );
  }
}

// Delete ad
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

    await deleteAd(id);

    return NextResponse.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    return NextResponse.json(
      { error: 'Failed to delete ad' },
      { status: 500 }
    );
  }
}
