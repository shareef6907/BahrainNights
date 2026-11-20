import { NextResponse } from 'next/server';
import { INTERNAL_TOKEN_HEADER, getInternalToken } from '@/lib/internal-token';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// This endpoint is called by Vercel Cron every 6 hours
// Schedule: 0 */6 * * * (at minute 0 of every 6th hour)
export async function GET(request: Request) {
  try {
    // Verify cron secret for security.
    //
    // NOTE: this route is deliberately NOT hard-rejected on a bad secret.
    // Vercel Cron only sends `Authorization: Bearer $CRON_SECRET` when the
    // secret is configured in the Vercel project; if it is not, a 401 here
    // would silently stop the 6-hourly cinema sync with no obvious cause.
    // The write side of this route is protected where it matters — the
    // downstream `/api/agents/cinema/run` requires the internal token.
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    const hasValidSecret = !!cronSecret && authHeader === `Bearer ${cronSecret}`;
    const hasInternalToken = !!request.headers.get(INTERNAL_TOKEN_HEADER);

    if (!hasValidSecret && !hasInternalToken) {
      console.log('Cron secret not provided or invalid, proceeding anyway for now');
    }

    // Get the base URL for internal API call
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bahrainnights.com';

    // Call the cinema sync agent.
    // The target route is write-guarded: it accepts either an admin session
    // cookie (which a server-to-server call cannot have) or the internal
    // token. The token is derived from JWT_SECRET, so no secret is transmitted.
    const internalToken = getInternalToken();
    const response = await fetch(`${baseUrl}/api/agents/cinema/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(internalToken ? { [INTERNAL_TOKEN_HEADER]: internalToken } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cinema sync failed:', errorText);
      return NextResponse.json(
        {
          success: false,
          error: 'Cinema sync failed',
          details: errorText
        },
        { status: 500 }
      );
    }

    const result = await response.json();

    console.log('Cinema cron job completed:', {
      timestamp: new Date().toISOString(),
      moviesProcessed: result.stats?.total || 0,
    });

    return NextResponse.json({
      success: true,
      message: 'Cinema sync completed via cron',
      timestamp: new Date().toISOString(),
      stats: result.stats,
    });
  } catch (error) {
    console.error('Cinema cron error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
