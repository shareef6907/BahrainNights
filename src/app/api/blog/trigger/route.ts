import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import type { Event } from '@/types/database';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const action = searchParams.get('action');

  // Verify secret
  if (!secret || secret !== process.env.BLOG_GENERATION_SECRET) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Unauthorized - BahrainNights</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f0f14;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .error { color: #ef4444; font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="error">401 - Unauthorized. Invalid or missing secret key.</div>
      </body>
      </html>`,
      { status: 401, headers: { 'Content-Type': 'text/html' } }
    );
  }

  // If action=generate, trigger the generation
  if (action === 'generate') {
    try {
      const supabase = getAdminClient();

      // Check if Anthropic API key is configured
      if (!process.env.ANTHROPIC_API_KEY) {
        return NextResponse.json({
          success: false,
          error: 'Anthropic API key not configured',
        }, { status: 500 });
      }

      // Import and call the generation logic directly
      const {
        generateEventBlogPost,
        determineCountry,
        determineCity,
      } = await import('@/lib/services/blog-writer');

      // Get IDs of events that have already been blogged
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: bloggedEvents } = await (supabase as any)
        .from('blog_event_tracker')
        .select('event_id') as { data: { event_id: string }[] | null };

      const bloggedEventIds = bloggedEvents?.map((e) => e.event_id) || [];

      // Get events that haven't been blogged yet (limit to 2 to avoid timeout)
      let eventsQuery = supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(2);

      // Exclude already blogged events if any exist
      if (bloggedEventIds.length > 0) {
        eventsQuery = eventsQuery.not('id', 'in', `(${bloggedEventIds.join(',')})`);
      }

      const { data, error: fetchError } = await eventsQuery;
      const unbloggedEvents = data as Event[] | null;

      if (fetchError) {
        return NextResponse.json({
          success: false,
          error: 'Failed to fetch events from database',
        }, { status: 500 });
      }

      if (!unbloggedEvents || unbloggedEvents.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No new events to blog',
          processed: 0,
          articles: [],
        });
      }

      const results: Array<{
        event_id: string;
        event_title: string;
        article_id: string;
        article_title: string;
        slug: string;
      }> = [];

      const errors: Array<{
        event_id: string;
        event_title: string;
        error: string;
      }> = [];

      for (const event of unbloggedEvents) {
        try {
          // Determine location info
          const location = event.venue_address || event.venue_name || 'Bahrain';
          const country = determineCountry(location);
          const city = determineCity(location);

          const eventData = {
            id: event.id,
            title: event.title,
            description: event.description,
            venue_name: event.venue_name,
            venue_address: event.venue_address,
            location,
            city: city || 'Manama',
            country,
            start_date: event.start_date,
            end_date: event.end_date,
            start_time: event.start_time,
            category: event.category,
            image_url: event.image_url,
            cover_url: event.cover_url,
            price: event.price,
            affiliate_url: event.affiliate_url,
            booking_url: event.booking_url,
          };

          // Generate blog post using AI
          console.log(`Generating blog post for: ${event.title}`);
          const article = await generateEventBlogPost(eventData);

          // Get featured image
          const featuredImage = event.cover_url || event.image_url || event.featured_image;

          // Save to database
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: savedArticle, error: saveError } = await (supabase as any)
            .from('blog_articles')
            .insert({
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt,
              content: article.content,
              meta_title: article.meta_title,
              meta_description: article.meta_description,
              keywords: article.keywords,
              tags: article.tags,
              read_time_minutes: article.read_time_minutes,
              country,
              city: city || null,
              category: event.category,
              event_id: event.id,
              featured_image: featuredImage,
              article_type: 'event',
              status: 'published',
            })
            .select()
            .single();

          if (saveError || !savedArticle) {
            console.error(`Error saving article for event ${event.id}:`, saveError);
            errors.push({
              event_id: event.id,
              event_title: event.title,
              error: saveError?.message || 'Failed to save article',
            });
            continue;
          }

          // Track that this event has been blogged
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from('blog_event_tracker')
            .insert({
              event_id: event.id,
              article_id: savedArticle.id,
            });

          results.push({
            event_id: event.id,
            event_title: event.title,
            article_id: savedArticle.id,
            article_title: article.title,
            slug: article.slug,
          });

          console.log(`Successfully created blog post: ${article.title}`);
        } catch (err) {
          console.error(`Error processing event ${event.id}:`, err);
          errors.push({
            event_id: event.id,
            event_title: event.title,
            error: err instanceof Error ? err.message : 'Unknown error',
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: `Generated ${results.length} blog posts`,
        processed: results.length,
        failed: errors.length,
        articles: results,
        errors: errors.length > 0 ? errors : undefined,
      });
    } catch (error) {
      console.error('Blog generation error:', error);
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 });
    }
  }

  // Default: show status page with UI
  const supabase = getAdminClient();

  // Get current stats
  let stats = {
    total_articles: 0,
    blogged_events: 0,
    total_active_events: 0,
    remaining_events: 0,
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: totalArticles } = await (supabase as any)
      .from('blog_articles')
      .select('*', { count: 'exact', head: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: bloggedEvents } = await (supabase as any)
      .from('blog_event_tracker')
      .select('*', { count: 'exact', head: true });

    const { count: totalEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    stats = {
      total_articles: totalArticles || 0,
      blogged_events: bloggedEvents || 0,
      total_active_events: totalEvents || 0,
      remaining_events: (totalEvents || 0) - (bloggedEvents || 0),
    };
  } catch (e) {
    console.error('Error fetching stats:', e);
  }

  // Get recent articles
  let recentArticles: Array<{ title: string; slug: string; created_at: string }> = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('blog_articles')
      .select('title, slug, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    recentArticles = data || [];
  } catch (e) {
    console.error('Error fetching recent articles:', e);
  }

  const apiConfigured = !!process.env.ANTHROPIC_API_KEY;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Blog Generator - BahrainNights</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(to bottom, #0f0f14, #1a1a24);
          color: white;
          padding: 40px 20px;
          max-width: 700px;
          margin: 0 auto;
          min-height: 100vh;
        }
        h1 {
          color: #f59e0b;
          margin-bottom: 10px;
          font-size: 28px;
        }
        .subtitle {
          color: #888;
          margin-bottom: 30px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }
        .stat {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .stat-value {
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(to right, #f59e0b, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label { color: #888; font-size: 14px; margin-top: 5px; }
        .api-status {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .api-ok { background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; }
        .api-error { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; }
        button {
          background: linear-gradient(to right, #f59e0b, #ec4899);
          color: black;
          font-weight: bold;
          padding: 16px 32px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          transition: opacity 0.2s, transform 0.2s;
        }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        #result {
          margin-top: 20px;
          padding: 20px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          display: none;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .success { border-left: 4px solid #10b981; }
        .error { border-left: 4px solid #ef4444; }
        .recent-articles {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .recent-articles h3 {
          color: #888;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }
        .article-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .article-item:last-child { border-bottom: none; }
        .article-item a {
          color: white;
          text-decoration: none;
        }
        .article-item a:hover { color: #f59e0b; }
        .article-date {
          color: #666;
          font-size: 12px;
          margin-top: 4px;
        }
        pre {
          background: rgba(0,0,0,0.3);
          padding: 15px;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 12px;
          max-height: 300px;
          overflow-y: auto;
        }
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(0,0,0,0.3);
          border-radius: 50%;
          border-top-color: black;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
          vertical-align: middle;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <h1>Blog Generator</h1>
      <p class="subtitle">AI-powered blog content generation for BahrainNights</p>

      <div class="api-status ${apiConfigured ? 'api-ok' : 'api-error'}">
        ${apiConfigured ? '✅ Anthropic API configured' : '❌ Anthropic API key not configured'}
      </div>

      <div class="stats-grid">
        <div class="stat">
          <div class="stat-value">${stats.total_articles}</div>
          <div class="stat-label">Articles Generated</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.remaining_events}</div>
          <div class="stat-label">Events Remaining</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.total_active_events}</div>
          <div class="stat-label">Total Active Events</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.blogged_events}</div>
          <div class="stat-label">Events Blogged</div>
        </div>
      </div>

      <button id="generateBtn" onclick="generate()" ${!apiConfigured ? 'disabled' : ''}>
        Generate 2 Blog Posts
      </button>

      <div id="result"></div>

      ${recentArticles.length > 0 ? `
      <div class="recent-articles">
        <h3>Recent Articles</h3>
        ${recentArticles.map(article => `
          <div class="article-item">
            <a href="/blog/${article.slug}" target="_blank">${article.title}</a>
            <div class="article-date">${new Date(article.created_at).toLocaleDateString()}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <script>
        async function generate() {
          const btn = document.getElementById('generateBtn');
          const result = document.getElementById('result');

          btn.disabled = true;
          btn.innerHTML = '<span class="loading"></span>Generating... (this may take a few minutes)';
          result.style.display = 'none';

          try {
            const response = await fetch(window.location.href + '&action=generate');
            const data = await response.json();

            result.style.display = 'block';
            if (data.success) {
              result.className = 'success';
              const articlesHtml = data.articles && data.articles.length > 0
                ? '<br><br><strong>Generated:</strong><ul>' + data.articles.map(a =>
                    '<li><a href="/blog/' + a.slug + '" target="_blank" style="color:#f59e0b">' + a.article_title + '</a></li>'
                  ).join('') + '</ul>'
                : '';
              result.innerHTML = '<strong>✅ ' + data.message + '</strong>' + articlesHtml;

              // Reload after 3 seconds to update stats
              if (data.processed > 0) {
                setTimeout(() => window.location.reload(), 3000);
              }
            } else {
              result.className = 'error';
              result.innerHTML = '<strong>❌ Error:</strong> ' + (data.error || 'Unknown error');
            }
          } catch (err) {
            result.style.display = 'block';
            result.className = 'error';
            result.innerHTML = '<strong>❌ Error:</strong> ' + err.message;
          }

          btn.disabled = false;
          btn.textContent = 'Generate 2 Blog Posts';
        }
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
