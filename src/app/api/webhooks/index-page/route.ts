/**
 * Index page webhook — DISABLED
 * Google Indexing API permanently banned per standing mission Part 2 Rule 3.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    reason: 'Indexing API permanently disabled.',
  });
}
