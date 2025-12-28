import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// This endpoint is called by Vercel Cron every 6 hours
// Schedule: 0 */6 * * * (at minute 0 of every 6th hour)
export async function GET(request: Request) {
  try {
    // Optional: Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // In production, you might want to enforce this
      console.log('Cron secret not provided or invalid, proceeding anyway for now');
    }

    // Get the base URL for internal API call
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bahrainnights.com';

    // Call the cinema sync agent
    const response = await fetch(`${baseUrl}/api/agents/cinema/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
