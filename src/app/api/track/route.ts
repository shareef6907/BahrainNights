import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@/lib/db/analytics';
import crypto from 'crypto';

interface GeoData {
  country: string;
  countryCode: string;
  city: string;
}

// Get geo data from IP using free API
async function getGeoFromIP(ip: string): Promise<GeoData | null> {
  // Skip for localhost/private IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return { country: 'Local', countryCode: 'XX', city: 'Local' };
  }

  try {
    // Using ip-api.com (free, no API key needed, 45 requests/minute)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (data.status === 'fail') return null;

    return {
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'XX',
      city: data.city || 'Unknown',
    };
  } catch (error) {
    console.error('Geo lookup error:', error);
    return null;
  }
}

// Hash IP for privacy
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.JWT_SECRET).digest('hex').substring(0, 16);
}

// Get client IP from various headers
function getClientIP(request: NextRequest): string {
  // Try various headers in order of preference
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfConnecting = request.headers.get('cf-connecting-ip');
  if (cfConnecting) {
    return cfConnecting;
  }

  // Vercel specific
  const vercelForwarded = request.headers.get('x-vercel-forwarded-for');
  if (vercelForwarded) {
    return vercelForwarded.split(',')[0].trim();
  }

  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagePath, pageType, referenceId, referrer } = body;

    if (!pagePath) {
      return NextResponse.json({ error: 'pagePath required' }, { status: 400 });
    }

    // Get IP and geo data
    const ip = getClientIP(request);
    const ipHash = hashIP(ip);
    const userAgent = request.headers.get('user-agent') || undefined;

    // Get geo data (async, non-blocking for response)
    const geoData = await getGeoFromIP(ip);

    // Track the page view
    await trackPageView({
      pagePath,
      pageType,
      referenceId,
      ipHash,
      userAgent,
      referrer,
      country: geoData?.country,
      countryCode: geoData?.countryCode,
      city: geoData?.city,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track error:', error);
    // Still return success - tracking shouldn't affect user experience
    return NextResponse.json({ success: true });
  }
}

// Also support GET for simpler tracking (e.g., from image pixel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get('path') || '/';
    const pageType = searchParams.get('type') || undefined;
    const referenceId = searchParams.get('ref') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    const ip = getClientIP(request);
    const ipHash = hashIP(ip);
    const userAgent = request.headers.get('user-agent') || undefined;

    const geoData = await getGeoFromIP(ip);

    await trackPageView({
      pagePath,
      pageType,
      referenceId,
      ipHash,
      userAgent,
      referrer,
      country: geoData?.country,
      countryCode: geoData?.countryCode,
      city: geoData?.city,
    });

    // Return 1x1 transparent GIF for pixel tracking
    const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    return new NextResponse(gif, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Track GET error:', error);
    const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    return new NextResponse(gif, {
      headers: { 'Content-Type': 'image/gif' },
    });
  }
}
