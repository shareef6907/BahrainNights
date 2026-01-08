import { NextRequest } from 'next/server';

// DISABLED: Mukta Cinema scraper no longer in use
// Mukta A2 Cinema has been removed from the platform

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('🚫 Mukta Cinema scraper is disabled');

  return Response.json({
    success: false,
    message: 'Mukta Cinema scraper has been disabled',
    disabled: true,
    reason: 'Mukta A2 Cinema has been removed from the platform',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
