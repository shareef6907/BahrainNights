import { NextRequest, NextResponse } from 'next/server';
import { logActivity } from '@/lib/db/analytics';
import crypto from 'crypto';

// Hash IP for privacy
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + (process.env.JWT_SECRET || 'default-secret')).digest('hex').substring(0, 16);
}

// Get client IP
function getClientIP(request: NextRequest): string {
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) return vercelIP.split(',')[0].trim();
  
  const cfConnecting = request.headers.get('cf-connecting-ip');
  if (cfConnecting) return cfConnecting;
  
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;
  
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;

    if (!event) {
      return NextResponse.json({ error: 'event required' }, { status: 400 });
    }

    const ip = getClientIP(request);
    const ipHash = hashIP(ip);
    const userAgent = request.headers.get('user-agent') || undefined;

    // Log the event to activity_log
    await logActivity({
      action: event,
      entityType: 'pwa',
      details: {
        ...data,
        userAgent,
        ipHash,
        timestamp: new Date().toISOString(),
      },
      ipAddress: ipHash,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track event error:', error);
    return NextResponse.json({ success: true }); // Don't fail
  }
}
