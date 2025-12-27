import { NextRequest, NextResponse } from 'next/server';
import { getSponsorById, getSponsors, updateSponsor } from '@/lib/db/sponsors';

export const dynamic = 'force-dynamic';

// POST /api/admin/sponsors/[id]/reorder - Reorder sponsor
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { direction } = body;

    if (!direction || !['up', 'down'].includes(direction)) {
      return NextResponse.json(
        { error: 'Invalid direction. Must be up or down' },
        { status: 400 }
      );
    }

    // Get the sponsor to reorder
    const sponsor = await getSponsorById(id);
    if (!sponsor) {
      return NextResponse.json(
        { error: 'Sponsor not found' },
        { status: 404 }
      );
    }

    // Get all sponsors of the same tier, sorted by display_order
    const tierSponsors = await getSponsors({ tier: sponsor.tier });
    const sortedSponsors = tierSponsors.sort(
      (a, b) => (a.display_order || 0) - (b.display_order || 0)
    );

    // Find current index
    const currentIndex = sortedSponsors.findIndex((s) => s.id === id);
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: 'Sponsor not found in tier' },
        { status: 404 }
      );
    }

    // Calculate new index
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // Check bounds
    if (newIndex < 0 || newIndex >= sortedSponsors.length) {
      return NextResponse.json(
        { error: 'Cannot move sponsor further in this direction' },
        { status: 400 }
      );
    }

    // Swap display_order values
    const targetSponsor = sortedSponsors[newIndex];
    const currentOrder = sponsor.display_order || currentIndex;
    const targetOrder = targetSponsor.display_order || newIndex;

    await Promise.all([
      updateSponsor(sponsor.id, { display_order: targetOrder }),
      updateSponsor(targetSponsor.id, { display_order: currentOrder }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Sponsor moved ${direction}`,
    });
  } catch (error) {
    console.error('Error reordering sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to reorder sponsor' },
      { status: 500 }
    );
  }
}
