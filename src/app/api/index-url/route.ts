/**
 * Manual URL indexing endpoint — DISABLED
 * Google Indexing API permanently banned per standing mission Part 2 Rule 3.
 * Use sitemap-based crawling for indexing.
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Indexing API permanently disabled.',
  });
}
