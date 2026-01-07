import { generateRobotsTxt } from '@/lib/seo/sitemapGenerator';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const robotsTxt = generateRobotsTxt();

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
