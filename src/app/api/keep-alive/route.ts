import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Keep-alive endpoint to prevent Supabase project from pausing due to inactivity.
 * This endpoint is called daily by a Vercel cron job.
 */
export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    const supabase = getAdminClient();

    // Simple query to keep the database active
    const { count, error } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error(`[${timestamp}] Keep-alive ping failed:`, error.message);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database query failed',
          error: error.message,
          timestamp,
        },
        { status: 500 }
      );
    }

    // Log successful ping
    console.log(`[${timestamp}] Keep-alive ping successful - ${count ?? 0} venues in database`);

    return NextResponse.json({
      status: 'ok',
      message: 'Keep-alive ping successful',
      database: 'connected',
      venueCount: count ?? 0,
      timestamp,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[${timestamp}] Keep-alive ping error:`, errorMessage);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Keep-alive ping failed',
        error: errorMessage,
        timestamp,
      },
      { status: 500 }
    );
  }
}
