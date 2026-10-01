/**
 * Bulk indexing cron — DISABLED
 * Google Indexing API permanently banned per standing mission Part 2 Rule 3.
 * Sitemap-based crawling is sufficient for indexing; this route is no longer needed.
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: false,
    reason: 'Indexing API permanently disabled.',
    message: 'Use sitemap-based crawling instead.',
  });
}
