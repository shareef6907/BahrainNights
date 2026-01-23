import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minute timeout for scraping

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// POST /api/admin/cinema/refresh - Trigger manual scraper refresh
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const supabase = getSupabaseAdmin();

    // Log the manual refresh request
    await supabase.from('agent_logs').insert({
      agent_name: 'cinema_manual_refresh',
      agent_type: 'cinema_manual_refresh',
      status: 'running',
      details: {
        triggered_by: payload.userId,
        trigger_type: 'manual_api'
      },
      started_at: new Date().toISOString()
    });

    // Trigger GitHub Actions workflow via webhook (if configured)
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'shareef-alis-projects/bahrain-nights-website';

    if (githubToken) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${githubRepo}/actions/workflows/cinema-sync.yml/dispatches`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ref: 'main'
            })
          }
        );

        if (response.ok) {
          // Update log to show success
          await supabase
            .from('agent_logs')
            .update({
              status: 'completed',
              details: {
                triggered_by: payload.userId,
                trigger_type: 'manual_api',
                github_workflow_triggered: true
              },
              completed_at: new Date().toISOString()
            })
            .eq('agent_name', 'cinema_manual_refresh')
            .order('created_at', { ascending: false })
            .limit(1);

          return NextResponse.json({
            success: true,
            message: 'Cinema scraper refresh triggered. The GitHub workflow has been started.',
            details: {
              workflow: 'cinema-sync.yml',
              triggered_at: new Date().toISOString()
            }
          });
        } else {
          const errorText = await response.text();
          console.error('GitHub API error:', errorText);

          return NextResponse.json({
            success: false,
            message: 'Failed to trigger GitHub workflow',
            error: errorText
          }, { status: 500 });
        }
      } catch (githubError) {
        console.error('GitHub webhook error:', githubError);

        return NextResponse.json({
          success: false,
          message: 'Error triggering GitHub workflow',
          error: githubError instanceof Error ? githubError.message : 'Unknown error'
        }, { status: 500 });
      }
    } else {
      // No GitHub token - return instructions
      return NextResponse.json({
        success: false,
        message: 'GITHUB_TOKEN not configured. Please trigger the workflow manually.',
        instructions: {
          manual: 'Go to GitHub Actions and manually run the "Cinema Sync - VOX Bahrain" workflow',
          url: `https://github.com/${githubRepo}/actions/workflows/cinema-sync.yml`
        }
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Cinema refresh error:', error);
    return NextResponse.json(
      { error: 'Failed to trigger cinema refresh' },
      { status: 500 }
    );
  }
}

// GET /api/admin/cinema/refresh - Get last scraper run status
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const supabase = getSupabaseAdmin();

    // Get last scraper runs
    const { data: logs, error } = await supabase
      .from('agent_logs')
      .select('*')
      .in('agent_type', ['cinema_scraper_github', 'cinema_manual_refresh', 'cinema_cleanup'])
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching logs:', error);
      return NextResponse.json({ error: 'Failed to fetch scraper status' }, { status: 500 });
    }

    // Get movie counts
    const { count: nowShowingCount } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_now_showing', true)
      .or('scraped_from.is.null,scraped_from.cs.{vox}');

    const { count: comingSoonCount } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_coming_soon', true)
      .or('scraped_from.is.null,scraped_from.cs.{vox}');

    return NextResponse.json({
      lastRuns: logs || [],
      movieCounts: {
        nowShowing: nowShowingCount || 0,
        comingSoon: comingSoonCount || 0
      },
      schedule: {
        frequency: 'Daily at 6 AM Bahrain time',
        nextRun: getNextScheduledRun()
      }
    });
  } catch (error) {
    console.error('Cinema status error:', error);
    return NextResponse.json(
      { error: 'Failed to get cinema status' },
      { status: 500 }
    );
  }
}

// Calculate next scheduled run (6 AM Bahrain = 3 AM UTC)
function getNextScheduledRun(): string {
  const now = new Date();
  const nextRun = new Date(now);

  // Set to 3 AM UTC (6 AM Bahrain)
  nextRun.setUTCHours(3, 0, 0, 0);

  // If already past 3 AM UTC today, set to tomorrow
  if (now.getTime() > nextRun.getTime()) {
    nextRun.setDate(nextRun.getDate() + 1);
  }

  return nextRun.toISOString();
}
