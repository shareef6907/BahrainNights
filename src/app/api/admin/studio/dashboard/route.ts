import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

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

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Get counts by status
    const [pendingResult, approvedResult, scheduledResult, publishedResult, pendingContentResult] = await Promise.all([
      supabase
        .from('content_posts')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending_review'),
      supabase
        .from('content_posts')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'approved'),
      supabase
        .from('content_posts')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'scheduled'),
      supabase
        .from('content_posts')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'posted')
        .gte('posted_at', new Date().toISOString().split('T')[0]),
      supabase
        .from('content_posts')
        .select('id, content_type, title, created_at, source_type')
        .eq('status', 'pending_review')
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    const stats = {
      pending: pendingResult.count || 0,
      approved: approvedResult.count || 0,
      scheduled: scheduledResult.count || 0,
      published: publishedResult.count || 0,
    };

    const pending = (pendingContentResult.data || []).map(item => ({
      id: item.id,
      type: item.content_type,
      title: item.title || 'Untitled',
      createdAt: item.created_at,
      source: item.source_type,
    }));

    return NextResponse.json({ stats, pending });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);

    // Return default data if tables don't exist yet
    return NextResponse.json({
      stats: {
        pending: 0,
        approved: 0,
        scheduled: 0,
        published: 0,
      },
      pending: [],
    });
  }
}
