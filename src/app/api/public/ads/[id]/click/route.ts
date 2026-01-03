import { NextRequest, NextResponse } from 'next/server';
import { trackAdClick, getAdById } from '@/lib/db/ads';
import crypto from 'crypto';

// Track ad click (public API)
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

    // Get IP and user agent for fraud detection (hashed for privacy)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Hash IP for privacy
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);

    // Track click
    await trackAdClick(id, ipHash, userAgent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking ad click:', error);
    return NextResponse.json({ success: false });
  }
}
