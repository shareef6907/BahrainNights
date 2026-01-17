import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getAdminClient();

    // Test 1: Simple query (known to work)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: simpleArticles, error: simpleError } = await (supabase as any)
      .from('blog_articles')
      .select('id, title, status, country')
      .eq('status', 'published')
      .limit(3);

    // Test 2: Full query matching page.tsx exactly (without affiliate_url which doesn't exist)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: fullArticles, error: fullError } = await (supabase as any)
      .from('blog_articles')
      .select('id, title, slug, excerpt, content, featured_image, country, city, category, read_time_minutes, view_count, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Test 3: Check what columns exist
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: singleArticle, error: singleError } = await (supabase as any)
      .from('blog_articles')
      .select('*')
      .limit(1)
      .single();

    return NextResponse.json({
      success: true,
      tests: {
        simple: {
          count: simpleArticles?.length || 0,
          error: simpleError?.message || null,
          sample: simpleArticles?.[0] || null,
        },
        full: {
          count: fullArticles?.length || 0,
          error: fullError?.message || null,
          sample: fullArticles?.[0] ? {
            id: fullArticles[0].id,
            title: fullArticles[0].title,
            slug: fullArticles[0].slug,
            hasExcerpt: !!fullArticles[0].excerpt,
            hasContent: !!fullArticles[0].content,
            hasFeaturedImage: !!fullArticles[0].featured_image,
            country: fullArticles[0].country,
          } : null,
        },
        columns: {
          error: singleError?.message || null,
          availableColumns: singleArticle ? Object.keys(singleArticle) : [],
        },
      },
      env: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
  }
}
