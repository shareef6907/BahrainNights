import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max for Pro plan

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

  // If action=cleanup, delete all blog articles and tracker entries
  if (action === 'cleanup') {
    try {
      const supabase = getAdminClient();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: trackerError } = await (supabase as any)
        .from('blog_event_tracker')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (trackerError) {
        console.error('Error deleting tracker entries:', trackerError);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: articlesError, count } = await (supabase as any)
        .from('blog_articles')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
        .select('*', { count: 'exact', head: true });

      if (articlesError) {
        return NextResponse.json({
          success: false,
          error: 'Failed to delete articles: ' + articlesError.message,
        }, { status: 500 });
      }

      revalidatePath('/blog');
      revalidatePath('/blog/places-to-go/bahrain');
      revalidatePath('/blog/places-to-go/saudi-arabia');
      revalidatePath('/blog/places-to-go/uae');
      revalidatePath('/blog/places-to-go/qatar');
      revalidatePath('/blog/places-to-go/uk');

      return NextResponse.json({
        success: true,
        message: 'All blog articles and tracker entries have been deleted',
        deleted_count: count || 'unknown',
      });
    } catch (error) {
      console.error('Cleanup error:', error);
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 });
    }
  }

  // Default: show status page with batch UI
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  let stats = {
    total_articles: 0,
    blogged_events: 0,
    eligible_events: 0,
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

    const { count: eligibleEvents } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .not('affiliate_url', 'is', null)
      .gte('start_date', today);

    stats = {
      total_articles: totalArticles || 0,
      blogged_events: bloggedEvents || 0,
      eligible_events: eligibleEvents || 0,
      remaining_events: (eligibleEvents || 0) - (bloggedEvents || 0),
    };
  } catch (e) {
    console.error('Error fetching stats:', e);
  }

  let recentArticles: Array<{ title: string; slug: string; country: string; created_at: string }> = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('blog_articles')
      .select('title, slug, country, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
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
          background: linear-gradient(135deg, #0f0f14 0%, #1a1a2e 100%);
          color: white;
          padding: 40px 20px;
          max-width: 900px;
          margin: 0 auto;
          min-height: 100vh;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        h1 {
          background: linear-gradient(to right, #f59e0b, #ec4899, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          font-size: 36px;
        }
        .subtitle {
          color: #888;
          font-size: 16px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 40px;
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .stat {
          background: rgba(255,255,255,0.03);
          padding: 24px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          text-align: center;
          transition: transform 0.2s, border-color 0.2s;
        }
        .stat:hover {
          transform: translateY(-2px);
          border-color: rgba(245,158,11,0.3);
        }
        .stat-value {
          font-size: 42px;
          font-weight: bold;
          background: linear-gradient(to right, #f59e0b, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label { color: #888; font-size: 13px; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .api-status {
          padding: 14px 20px;
          border-radius: 12px;
          margin-bottom: 30px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .api-ok { background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); }
        .api-error { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); }
        .batch-section {
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 30px;
        }
        .batch-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #f59e0b;
        }
        .batch-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (max-width: 500px) {
          .batch-buttons { grid-template-columns: repeat(2, 1fr); }
        }
        .batch-btn {
          background: rgba(255,255,255,0.05);
          color: white;
          font-weight: 600;
          padding: 18px 20px;
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
        }
        .batch-btn:hover {
          background: rgba(245,158,11,0.15);
          border-color: #f59e0b;
          transform: translateY(-2px);
        }
        .batch-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        .batch-btn.active {
          background: linear-gradient(135deg, #f59e0b, #ec4899);
          border-color: transparent;
          color: black;
        }
        .batch-label { font-size: 12px; color: #888; margin-top: 4px; }
        .progress-section {
          display: none;
          margin-top: 25px;
        }
        .progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 15px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, #f59e0b, #ec4899);
          border-radius: 4px;
          transition: width 0.3s ease;
          width: 0%;
        }
        .progress-text {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #888;
        }
        .progress-status {
          color: #f59e0b;
          font-weight: 500;
        }
        #result {
          margin-top: 25px;
          padding: 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          display: none;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .success { border-left: 4px solid #10b981; }
        .error { border-left: 4px solid #ef4444; }
        .recent-articles {
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .recent-articles h3 {
          color: #888;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .article-item {
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .article-item:last-child { border-bottom: none; }
        .article-info { flex: 1; }
        .article-item a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .article-item a:hover { color: #f59e0b; }
        .article-meta {
          display: flex;
          gap: 12px;
          margin-top: 6px;
        }
        .article-date, .article-country {
          color: #666;
          font-size: 12px;
        }
        .article-country {
          background: rgba(245,158,11,0.15);
          color: #f59e0b;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .loading {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          border-top-color: #f59e0b;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
          vertical-align: middle;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .warning-text {
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          color: #f59e0b;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>AI Blog Generator</h1>
        <p class="subtitle">Generate SEO-optimized blog posts from Platinumlist events</p>
      </div>

      <div class="api-status ${apiConfigured ? 'api-ok' : 'api-error'}">
        <span>${apiConfigured ? '✅' : '❌'}</span>
        <span>${apiConfigured ? 'Anthropic API configured and ready' : 'Anthropic API key not configured'}</span>
      </div>

      <div class="stats-grid">
        <div class="stat">
          <div class="stat-value">${stats.total_articles}</div>
          <div class="stat-label">Total Articles</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.remaining_events}</div>
          <div class="stat-label">Events Remaining</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.eligible_events}</div>
          <div class="stat-label">Future Events</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.blogged_events}</div>
          <div class="stat-label">Events Blogged</div>
        </div>
      </div>

      <div class="batch-section">
        <div class="batch-title">Generate Blog Posts</div>

        <div class="warning-text">
          Each article takes ~10-15 seconds to generate. Large batches may take several minutes.
        </div>

        <div class="batch-buttons">
          <button class="batch-btn" onclick="generate(10)" ${!apiConfigured ? 'disabled' : ''}>
            10
            <div class="batch-label">Quick</div>
          </button>
          <button class="batch-btn" onclick="generate(25)" ${!apiConfigured ? 'disabled' : ''}>
            25
            <div class="batch-label">Standard</div>
          </button>
          <button class="batch-btn" onclick="generate(50)" ${!apiConfigured ? 'disabled' : ''}>
            50
            <div class="batch-label">Large</div>
          </button>
          <button class="batch-btn" onclick="generate(100)" ${!apiConfigured ? 'disabled' : ''}>
            100
            <div class="batch-label">Maximum</div>
          </button>
        </div>

        <div class="progress-section" id="progressSection">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
          </div>
          <div class="progress-text">
            <span class="progress-status" id="progressStatus">Initializing...</span>
            <span id="progressCount">0 / 0</span>
          </div>
        </div>

        <div id="result"></div>
      </div>

      ${recentArticles.length > 0 ? `
      <div class="recent-articles">
        <h3>Recent Articles (${recentArticles.length})</h3>
        ${recentArticles.map(article => `
          <div class="article-item">
            <div class="article-info">
              <a href="/regional/${article.slug}" target="_blank">${article.title}</a>
              <div class="article-meta">
                <span class="article-date">${new Date(article.created_at).toLocaleDateString()}</span>
                <span class="article-country">${article.country || 'unknown'}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <script>
        let isGenerating = false;

        async function generate(limit) {
          if (isGenerating) return;
          isGenerating = true;

          const buttons = document.querySelectorAll('.batch-btn');
          const progressSection = document.getElementById('progressSection');
          const progressFill = document.getElementById('progressFill');
          const progressStatus = document.getElementById('progressStatus');
          const progressCount = document.getElementById('progressCount');
          const result = document.getElementById('result');

          // Disable all buttons and highlight selected
          buttons.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('active');
          });
          event.target.closest('.batch-btn').classList.add('active');

          // Show progress
          progressSection.style.display = 'block';
          progressFill.style.width = '5%';
          progressStatus.textContent = 'Starting generation...';
          progressCount.textContent = '0 / ' + limit;
          result.style.display = 'none';

          try {
            // Simulate progress updates
            let progress = 5;
            const progressInterval = setInterval(() => {
              if (progress < 90) {
                progress += Math.random() * 3;
                progressFill.style.width = Math.min(progress, 90) + '%';
              }
            }, 1000);

            progressStatus.innerHTML = '<span class="loading"></span>Generating ' + limit + ' articles...';

            const response = await fetch('/api/blog/generate?secret=${secret}&limit=' + limit, {
              method: 'POST'
            });
            const data = await response.json();

            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressStatus.textContent = 'Complete!';

            result.style.display = 'block';
            if (data.success) {
              progressCount.textContent = data.processed + ' / ' + limit;
              result.className = 'success';

              let html = '<strong>✅ ' + data.message + '</strong>';
              html += '<br><br><strong>Remaining events:</strong> ' + (data.remaining || 0);

              if (data.articles && data.articles.length > 0) {
                html += '<br><br><strong>Generated articles:</strong><ul style="margin-top:10px">';
                data.articles.forEach(a => {
                  html += '<li style="margin:8px 0"><a href="/regional/' + a.slug + '" target="_blank" style="color:#f59e0b">' + a.article_title + '</a></li>';
                });
                html += '</ul>';
              }

              if (data.errors && data.errors.length > 0) {
                html += '<br><strong style="color:#ef4444">Errors (' + data.errors.length + '):</strong><ul style="color:#888;margin-top:10px">';
                data.errors.forEach(e => {
                  html += '<li style="margin:5px 0">' + e.event_title + ': ' + e.error + '</li>';
                });
                html += '</ul>';
              }

              result.innerHTML = html;

              // Reload after a delay to update stats
              if (data.processed > 0) {
                setTimeout(() => window.location.reload(), 5000);
              }
            } else {
              result.className = 'error';
              result.innerHTML = '<strong>❌ Error:</strong> ' + (data.error || 'Unknown error');
            }
          } catch (err) {
            progressFill.style.width = '100%';
            progressStatus.textContent = 'Failed';
            result.style.display = 'block';
            result.className = 'error';
            result.innerHTML = '<strong>❌ Error:</strong> ' + err.message;
          }

          // Re-enable buttons
          buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('active');
          });
          isGenerating = false;
        }
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
