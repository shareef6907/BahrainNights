import { NextRequest, NextResponse } from 'next/server';
import { getSponsors, createSponsor } from '@/lib/db/sponsors';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/sponsors - Get all sponsors (admin)
export async function GET(request: NextRequest) {
  // Require admin authentication
  const auth = await requireAdmin(request);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const tier = searchParams.get('tier') || 'all';
    const search = searchParams.get('search') || undefined;

    const sponsors = await getSponsors({
      status: status as 'all' | 'active' | 'pending' | 'expired',
      tier: tier as 'all' | 'golden' | 'silver',
      search,
    });

    return NextResponse.json({
      sponsors,
      count: sponsors.length,
    });
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsors' },
      { status: 500 }
    );
  }
}

// POST /api/admin/sponsors - Create new sponsor
export async function POST(request: NextRequest) {
  // Require admin authentication
  const auth = await requireAdmin(request);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const {
      name,
      tier,
      logo_url,
      website_url,
      venue_id,
      start_date,
      end_date,
      price_bd,
      payment_status,
      status,
    } = body;

    // Validate required fields
    if (!name || !tier || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Name, tier, start date, and end date are required' },
        { status: 400 }
      );
    }

    // Validate tier
    if (!['golden', 'silver'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be golden or silver' },
        { status: 400 }
      );
    }

    // Get next display order
    const existingSponsors = await getSponsors({ tier });
    const maxOrder = existingSponsors.reduce(
      (max, s) => Math.max(max, s.display_order || 0),
      0
    );

    const sponsor = await createSponsor({
      name,
      tier,
      logo_url: logo_url || null,
      website_url: website_url || null,
      venue_id: venue_id || null,
      start_date,
      end_date,
      price_bd: price_bd || (tier === 'golden' ? 450 : 300),
      payment_status: payment_status || 'pending',
      status: status || 'pending',
      display_order: maxOrder + 1,
    });

    return NextResponse.json({
      success: true,
      sponsor,
    });
  } catch (error) {
    console.error('Error creating sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to create sponsor' },
      { status: 500 }
    );
  }
}
