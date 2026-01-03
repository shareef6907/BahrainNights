import { NextRequest, NextResponse } from 'next/server';
import { trackAdImpression, getAdById } from '@/lib/db/ads';

// Track ad impression (public API)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify ad exists
    const ad = await getAdById(id);
    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    // Track impression
    await trackAdImpression(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking ad impression:', error);
    return NextResponse.json({ success: false });
  }
}
