/**
 * Blog Admin API - Single Article Operations
 * GET, PUT, DELETE for individual blog articles
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminClient } from '@/lib/supabase/server';
import type { BlogArticle, BlogArticleUpdate } from '@/types/database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get single article by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: article, error } = await (supabase as any)
      .from('blog_articles')
      .select('*')
      .eq('id', id)
      .single() as { data: BlogArticle | null; error: Error | null };

    if (error || !article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Get linked event if exists
    let linkedEvent = null;
    if (article.event_id) {
      const { data: event } = await supabase
        .from('events')
        .select('id, title, slug, start_date, venue_name')
        .eq('id', article.event_id)
        .single();
      linkedEvent = event;
    }

    // Get linked venue if exists
    let linkedVenue = null;
    if (article.venue_id) {
      const { data: venue } = await supabase
        .from('venues')
        .select('id, name, slug')
        .eq('id', article.venue_id)
        .single();
      linkedVenue = venue;
    }

    return NextResponse.json({
      article,
      linkedEvent,
      linkedVenue,
    });
  } catch (error) {
    console.error('Blog admin GET single error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update article
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug is unique (excluding current article)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingArticle } = await (supabase as any)
      .from('blog_articles')
      .select('id')
      .eq('slug', body.slug)
      .neq('id', id)
      .single() as { data: { id: string } | null };

    if (existingArticle) {
      return NextResponse.json(
        { error: 'An article with this slug already exists' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: BlogArticleUpdate = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      content: body.content,
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      keywords: body.keywords || null,
      country: body.country || 'unknown',
      city: body.city || null,
      category: body.category || null,
      tags: body.tags || null,
      featured_image: body.featured_image || null,
      status: body.status || 'published',
      is_featured: body.is_featured || false,
      updated_at: new Date().toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: article, error } = await (supabase as any)
      .from('blog_articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single() as { data: BlogArticle | null; error: Error | null };

    if (error) {
      console.error('Error updating article:', error);
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      );
    }

    // Revalidate the article page and blog listing
    revalidatePath(`/blog/${body.slug}`);
    revalidatePath('/blog');
    revalidatePath(`/blog/places-to-go/${body.country}`);

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error('Blog admin PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete single article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // Get article first to get country for revalidation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: article } = await (supabase as any)
      .from('blog_articles')
      .select('country, slug')
      .eq('id', id)
      .single() as { data: { country: string; slug: string } | null };

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete from tracker tables first
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('blog_event_tracker')
      .delete()
      .eq('article_id', id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('blog_experience_tracker')
      .delete()
      .eq('article_id', id);

    // Delete the article
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('blog_articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      return NextResponse.json(
        { error: 'Failed to delete article' },
        { status: 500 }
      );
    }

    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath(`/blog/${article.slug}`);
    revalidatePath(`/blog/places-to-go/${article.country}`);

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Blog admin DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
