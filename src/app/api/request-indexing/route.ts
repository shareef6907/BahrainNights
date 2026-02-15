import { NextResponse } from 'next/server';

const SITEMAP_URL = 'https://www.bahrainnights.com/sitemap.xml';

interface PingResult {
  engine: string;
  url: string;
  status: 'success' | 'error';
  statusCode?: number;
  error?: string;
}

async function pingSearchEngine(engine: string, pingUrl: string): Promise<PingResult> {
  try {
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'BahrainNights-Sitemap-Pinger/1.0',
      },
    });

    return {
      engine,
      url: pingUrl,
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
    };
  } catch (error) {
    return {
      engine,
      url: pingUrl,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function GET(request: Request) {
  // Optional: Add API key protection for cron jobs
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');
  const expectedKey = process.env.INDEXING_API_KEY;
  
  if (expectedKey && apiKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: PingResult[] = [];
  const timestamp = new Date().toISOString();

  // Ping Google
  const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  results.push(await pingSearchEngine('Google', googlePingUrl));

  // Ping Bing (also covers Yahoo)
  const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  results.push(await pingSearchEngine('Bing', bingPingUrl));

  // Log results
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  console.log(`[${timestamp}] Sitemap ping results:`, {
    successCount,
    errorCount,
    results,
  });

  return NextResponse.json({
    timestamp,
    sitemapUrl: SITEMAP_URL,
    results,
    summary: {
      total: results.length,
      success: successCount,
      errors: errorCount,
    },
  });
}

export async function POST(request: Request) {
  // POST endpoint for manual triggers or webhooks
  return GET(request);
}
