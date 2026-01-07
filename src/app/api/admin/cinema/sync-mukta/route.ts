import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import scrapeMuktaCinema from '@/lib/agents/muktaScraper';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max for scraping

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    console.log('🎬 Manual Mukta Cinema sync triggered by admin');

    const result = await scrapeMuktaCinema();

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? `Synced ${result.moviesUpdated} movies from Mukta A2 Cinemas`
        : 'Sync completed with errors',
      data: {
        moviesFound: result.moviesFound,
        moviesUpdated: result.moviesUpdated,
        comingSoonCount: result.comingSoonCount,
        comingSoonTitles: result.comingSoonTitles,
        nowShowingCount: result.nowShowingCount,
        nowShowingTitles: result.nowShowingTitles,
      },
      errors: result.errors,
    });

  } catch (error) {
    console.error('Manual Mukta sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
