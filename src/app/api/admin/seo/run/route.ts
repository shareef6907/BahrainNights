import { NextRequest, NextResponse } from 'next/server';
import { runSEOAgent } from '@/lib/agents/seoAgent';
import { verifyAdmin } from '@/lib/auth/verifyAdmin';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * POST /api/admin/seo/run
 * Manually trigger SEO agent from admin dashboard
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log(`[Admin SEO] Manual run triggered by admin: ${adminCheck.adminId}`);

    const result = await runSEOAgent();

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? `SEO optimization completed in ${result.durationSeconds}s`
        : `SEO optimization completed with ${result.errors.length} errors`,
      data: {
        pagesOptimized: result.pagesOptimized,
        keywordsChecked: result.keywordsChecked,
        sitemapUpdated: result.sitemapUpdated,
        durationSeconds: result.durationSeconds,
        details: result.details,
        errors: result.errors
      }
    });
  } catch (error) {
    console.error('[Admin SEO] Run failed:', error);
    return NextResponse.json(
      { error: 'Failed to run SEO agent', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
