import { NextRequest, NextResponse } from 'next/server';
import { getSponsors, getActiveSponsors } from '@/lib/db/sponsors';

export const dynamic = 'force-dynamic';

// GET /api/sponsors - Get sponsors (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sponsors;
    if (status === 'active') {
      sponsors = await getActiveSponsors();
    } else {
      sponsors = await getSponsors({ status: status || 'active' });
    }

    return NextResponse.json({
      sponsors,
      count: sponsors.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsors' },
      { status: 500 }
    );
  }
}
