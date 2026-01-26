import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    deployedAt: new Date().toISOString(),
    version: 'newsletter-v2-html',
    message: 'New deployment is live!'
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}
