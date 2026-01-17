/**
 * Blog Admin API - List and Bulk Operations
 * Manages blog_articles table for AI-generated content
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminClient } from '@/lib/supabase/server';
import type { BlogArticle } from '@/types/database';

// GET - List all blog articles with optional filters
export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const { searchParams } = new URL(request.url);

    // Get filter parameters
    const country = searchParams.get('country');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from('blog_articles')
      .select('*', { count: 'exact' });

    // Apply filters
    if (country && country !== 'all') {
      query = query.eq('country', country);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Order by created_at descending and apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: articles, error, count } = await query as {
      data: BlogArticle[] | null;
      error: Error | null;
      count: number | null;
    };

    if (error) {
      console.error('Error fetching blog articles:', error);
      return NextResponse.json(
        { error: 'Failed to fetch articles' },
        { status: 500 }
      );
    }

    // Get country counts for filtering UI
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: countryStats } = await (supabase as any)
      .from('blog_articles')
      .select('country')
      .then((result: { data: { country: string }[] | null }) => {
        const counts: Record<string, number> = {};
        result.data?.forEach(row => {
          counts[row.country] = (counts[row.country] || 0) + 1;
        });
        return { data: counts };
      });

    return NextResponse.json({
      articles: articles || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      countryStats: countryStats || {},
    });
  } catch (error) {
    console.error('Blog admin GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Bulk delete articles
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const { searchParams } = new URL(request.url);

    // Check for bulk delete by IDs
    const ids = searchParams.get('ids');

    // Check for delete by country
    const country = searchParams.get('country');

    // Check for delete all
    const deleteAll = searchParams.get('all') === 'true';

    let deletedCount = 0;

    if (deleteAll) {
      // Delete all articles - first delete from tracker table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('blog_event_tracker')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('blog_experience_tracker')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error, count } = await (supabase as any)
        .from('blog_articles')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
        .select('id', { count: 'exact' });

      if (error) {
        console.error('Error deleting all articles:', error);
        return NextResponse.json(
          { error: 'Failed to delete all articles' },
          { status: 500 }
        );
      }
      deletedCount = count || 0;
    } else if (country) {
      // Delete all articles for a specific country
      // First get the article IDs to delete from tracker
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: articlesToDelete } = await (supabase as any)
        .from('blog_articles')
        .select('id')
        .eq('country', country) as { data: { id: string }[] | null };

      if (articlesToDelete && articlesToDelete.length > 0) {
        const articleIds = articlesToDelete.map(a => a.id);

        // Delete from tracker tables
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from('blog_event_tracker')
          .delete()
          .in('article_id', articleIds);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from('blog_experience_tracker')
          .delete()
          .in('article_id', articleIds);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error, count } = await (supabase as any)
        .from('blog_articles')
        .delete()
        .eq('country', country)
        .select('id', { count: 'exact' });

      if (error) {
        console.error(`Error deleting articles for ${country}:`, error);
        return NextResponse.json(
          { error: `Failed to delete articles for ${country}` },
          { status: 500 }
        );
      }
      deletedCount = count || 0;
    } else if (ids) {
      // Delete specific articles by ID
      const idArray = ids.split(',');

      // Delete from tracker tables first
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('blog_event_tracker')
        .delete()
        .in('article_id', idArray);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('blog_experience_tracker')
        .delete()
        .in('article_id', idArray);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error, count } = await (supabase as any)
        .from('blog_articles')
        .delete()
        .in('id', idArray)
        .select('id', { count: 'exact' });

      if (error) {
        console.error('Error deleting articles:', error);
        return NextResponse.json(
          { error: 'Failed to delete articles' },
          { status: 500 }
        );
      }
      deletedCount = count || 0;
    } else {
      return NextResponse.json(
        { error: 'No delete criteria specified (ids, country, or all)' },
        { status: 400 }
      );
    }

    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath('/blog/places-to-go/bahrain');
    revalidatePath('/blog/places-to-go/saudi-arabia');
    revalidatePath('/blog/places-to-go/uae');
    revalidatePath('/blog/places-to-go/qatar');
    revalidatePath('/blog/places-to-go/uk');

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} article(s)`,
      deletedCount,
    });
  } catch (error) {
    console.error('Blog admin DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
