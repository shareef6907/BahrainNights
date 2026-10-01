/**
 * Admin indexing endpoint — DISABLED
 * Google Indexing API permanently banned per standing mission Part 2 Rule 3.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    { error: 'Indexing API permanently disabled.' },
    { status: 503 }
  );
}
