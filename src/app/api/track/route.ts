import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@/lib/db/analytics';
import crypto from 'crypto';

interface GeoData {
  country: string;
  countryCode: string;
  city: string;
  region?: string;
}

// Get geo data from Vercel headers (most reliable) or fallback to API
async function getGeoData(request: NextRequest, ip: string): Promise<GeoData> {
  // Skip for localhost/private IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return { country: 'Local', countryCode: 'XX', city: 'Local' };
  }

  // Method 1: Use Vercel's built-in geo headers (FREE and RELIABLE)
  // These are automatically provided by Vercel Edge Network
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const vercelCity = request.headers.get('x-vercel-ip-city');
  const vercelRegion = request.headers.get('x-vercel-ip-country-region');

  if (vercelCountry) {
    // Map country codes to full names for common countries
    const countryNames: Record<string, string> = {
      'BH': 'Bahrain',
      'AE': 'United Arab Emirates',
      'SA': 'Saudi Arabia',
      'KW': 'Kuwait',
      'QA': 'Qatar',
      'OM': 'Oman',
      'US': 'United States',
      'GB': 'United Kingdom',
      'IN': 'India',
      'PK': 'Pakistan',
      'PH': 'Philippines',
      'EG': 'Egypt',
      'JO': 'Jordan',
      'LB': 'Lebanon',
      'IQ': 'Iraq',
      'IR': 'Iran',
      'DE': 'Germany',
      'FR': 'France',
      'NL': 'Netherlands',
      'SG': 'Singapore',
      'AU': 'Australia',
      'CA': 'Canada',
    };

    return {
      country: countryNames[vercelCountry] || vercelCountry,
      countryCode: vercelCountry,
      city: vercelCity ? decodeURIComponent(vercelCity) : 'Unknown',
      region: vercelRegion || undefined,
    };
  }

  // Method 2: Fallback to ipapi.co (supports HTTPS on free tier, 1000 req/day)
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'BahrainNights/1.0' },
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });

    if (response.ok) {
      const data = await response.json();
      if (!data.error) {
        return {
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'XX',
          city: data.city || 'Unknown',
          region: data.region || undefined,
        };
      }
    }
  } catch (error) {
    console.debug('ipapi.co lookup failed:', error);
  }

  // Method 3: Fallback to ip-api.com (HTTP only but works)
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city,regionName`, {
      signal: AbortSignal.timeout(3000),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status !== 'fail') {
        return {
          country: data.country || 'Unknown',
          countryCode: data.countryCode || 'XX',
          city: data.city || 'Unknown',
          region: data.regionName || undefined,
        };
      }
    }
  } catch (error) {
    console.debug('ip-api.com lookup failed:', error);
  }

  // If all methods fail, return Unknown
  return { country: 'Unknown', countryCode: 'XX', city: 'Unknown' };
}

// Hash IP for privacy
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + (process.env.JWT_SECRET || 'default-secret')).digest('hex').substring(0, 16);
}

// Get client IP from various headers (Vercel-optimized order)
function getClientIP(request: NextRequest): string {
  // Vercel-specific headers (most reliable on Vercel)
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP.split(',')[0].trim();
  }

  // Cloudflare header
  const cfConnecting = request.headers.get('cf-connecting-ip');
  if (cfConnecting) {
    return cfConnecting;
  }

  // Standard forwarded header
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Real IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return '127.0.0.1';
}

// Parse device type from user agent
function getDeviceType(userAgent: string | null): string {
  if (!userAgent) return 'unknown';

  const ua = userAgent.toLowerCase();

  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    return 'bot';
  }

  return 'desktop';
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

    // Get geo data using Vercel headers or fallback APIs
    const geoData = await getGeoData(request, ip);

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

    const geoData = await getGeoData(request, ip);

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
