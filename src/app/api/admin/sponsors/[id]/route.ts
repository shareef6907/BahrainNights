import { NextRequest, NextResponse } from 'next/server';
import { getSponsorById, updateSponsor, deleteSponsor } from '@/lib/db/sponsors';

export const dynamic = 'force-dynamic';

// GET /api/admin/sponsors/[id] - Get single sponsor
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sponsor = await getSponsorById(id);

    if (!sponsor) {
      return NextResponse.json(
        { error: 'Sponsor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ sponsor });
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsor' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/sponsors/[id] - Update sponsor
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if sponsor exists
    const existing = await getSponsorById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Sponsor not found' },
        { status: 404 }
      );
    }

    // Validate tier if provided
    if (body.tier && !['golden', 'silver'].includes(body.tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be golden or silver' },
        { status: 400 }
      );
    }

    // Build update object (only include provided fields)
    const updates: Record<string, unknown> = {};
    const allowedFields = [
      'name',
      'tier',
      'logo_url',
      'website_url',
      'venue_id',
      'start_date',
      'end_date',
      'price_bd',
      'payment_status',
      'status',
      'display_order',
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    const sponsor = await updateSponsor(id, updates);

    return NextResponse.json({
      success: true,
      sponsor,
    });
  } catch (error) {
    console.error('Error updating sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to update sponsor' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/sponsors/[id] - Delete sponsor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if sponsor exists
    const existing = await getSponsorById(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Sponsor not found' },
        { status: 404 }
      );
    }

    await deleteSponsor(id);

    return NextResponse.json({
      success: true,
      message: 'Sponsor deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to delete sponsor' },
      { status: 500 }
    );
  }
}
