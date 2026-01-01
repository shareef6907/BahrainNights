import { NextRequest, NextResponse } from 'next/server';
import { trackAdClick, getAdById } from '@/lib/db/ads';
import crypto from 'crypto';

// Track ad click
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

    // Get user info for tracking
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Hash IP for privacy
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);

    // Track the click
    await trackAdClick(id, ipHash, userAgent);

    return NextResponse.json({
      success: true,
      targetUrl: ad.target_url,
    });
  } catch (error) {
    console.error('Error tracking ad click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}
