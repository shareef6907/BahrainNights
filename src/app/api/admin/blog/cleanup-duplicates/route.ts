/**
 * Blog Cleanup API - Remove Duplicate Articles
 * Finds articles with the same event_id and keeps only the oldest one
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Verify secret key for security
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (!secret || secret !== process.env.BLOG_GENERATION_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing secret key' },
        { status: 401 }
      );
    }

    const supabase = getAdminClient();

    // Step 1: Find all duplicate event_ids
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: allArticles, error: fetchError } = await (supabase as any)
      .from('blog_articles')
      .select('id, event_id, title, created_at')
      .not('event_id', 'is', null)
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('Error fetching articles:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch articles', details: fetchError.message },
        { status: 500 }
      );
    }

    if (!allArticles || allArticles.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No articles with event_id found',
        duplicatesRemoved: 0,
      });
    }

    // Step 2: Group by event_id and find duplicates
    const eventIdMap = new Map<string, Array<{ id: string; title: string; created_at: string }>>();

    for (const article of allArticles) {
      if (!article.event_id) continue;

      if (!eventIdMap.has(article.event_id)) {
        eventIdMap.set(article.event_id, []);
      }
      eventIdMap.get(article.event_id)!.push({
        id: article.id,
        title: article.title,
        created_at: article.created_at,
      });
    }

    // Step 3: Identify duplicates to delete (keep oldest, delete rest)
    const duplicatesToDelete: Array<{ id: string; title: string; event_id: string }> = [];
    const duplicateGroups: Array<{ event_id: string; kept: string; deleted: string[] }> = [];

    for (const [eventId, articles] of eventIdMap.entries()) {
      if (articles.length > 1) {
        // Sort by created_at ascending (oldest first)
        articles.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        // Keep the first (oldest), delete the rest
        const kept = articles[0];
        const toDelete = articles.slice(1);

        duplicateGroups.push({
          event_id: eventId,
          kept: kept.title,
          deleted: toDelete.map(a => a.title),
        });

        for (const article of toDelete) {
          duplicatesToDelete.push({
            id: article.id,
            title: article.title,
            event_id: eventId,
          });
        }
      }
    }

    if (duplicatesToDelete.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No duplicates found',
        duplicatesRemoved: 0,
        totalArticlesChecked: allArticles.length,
      });
    }

    // Step 4: Delete duplicates
    const deleteIds = duplicatesToDelete.map(d => d.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: deleteError } = await (supabase as any)
      .from('blog_articles')
      .delete()
      .in('id', deleteIds);

    if (deleteError) {
      console.error('Error deleting duplicates:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete duplicates', details: deleteError.message },
        { status: 500 }
      );
    }

    // Step 5: Also clean up blog_event_tracker for deleted articles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('blog_event_tracker')
      .delete()
      .in('article_id', deleteIds);

    console.log(`Cleaned up ${duplicatesToDelete.length} duplicate articles`);

    return NextResponse.json({
      success: true,
      message: `Removed ${duplicatesToDelete.length} duplicate articles`,
      duplicatesRemoved: duplicatesToDelete.length,
      totalArticlesChecked: allArticles.length,
      duplicateGroups: duplicateGroups,
    });

  } catch (error) {
    console.error('[Blog Cleanup] Critical error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check for duplicates without deleting
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (!secret || secret !== process.env.BLOG_GENERATION_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const supabase = getAdminClient();

  // Find duplicates
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: allArticles, error } = await (supabase as any)
    .from('blog_articles')
    .select('id, event_id, title, created_at')
    .not('event_id', 'is', null)
    .order('event_id')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }

  // Group by event_id
  const eventIdMap = new Map<string, Array<{ id: string; title: string; created_at: string }>>();

  for (const article of allArticles || []) {
    if (!article.event_id) continue;

    if (!eventIdMap.has(article.event_id)) {
      eventIdMap.set(article.event_id, []);
    }
    eventIdMap.get(article.event_id)!.push({
      id: article.id,
      title: article.title,
      created_at: article.created_at,
    });
  }

  // Find groups with more than one article
  const duplicates: Array<{ event_id: string; count: number; articles: Array<{ id: string; title: string; created_at: string }> }> = [];

  for (const [eventId, articles] of eventIdMap.entries()) {
    if (articles.length > 1) {
      duplicates.push({
        event_id: eventId,
        count: articles.length,
        articles: articles,
      });
    }
  }

  return NextResponse.json({
    totalArticles: allArticles?.length || 0,
    uniqueEventIds: eventIdMap.size,
    duplicateGroups: duplicates.length,
    totalDuplicates: duplicates.reduce((sum, d) => sum + d.count - 1, 0),
    duplicates: duplicates,
  });
}
