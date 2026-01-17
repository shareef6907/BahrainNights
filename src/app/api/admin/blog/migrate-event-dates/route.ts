/**
 * Blog Articles Migration - Add Event Date Fields
 * Run once to add event_date, event_end_date, event_venue, affiliate_url columns
 * Also backfills existing articles with data from events table
 */

import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = getAdminClient();

    // Step 1: Add columns if they don't exist
    // Using raw SQL through RPC or direct query
    const alterTableSQL = `
      ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS event_date TIMESTAMP WITH TIME ZONE;
      ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS event_end_date TIMESTAMP WITH TIME ZONE;
      ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS event_venue TEXT;
      ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS affiliate_url TEXT;
      CREATE INDEX IF NOT EXISTS idx_blog_articles_event_date ON blog_articles(event_date);
    `;

    // Try to execute via RPC
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: alterError } = await (supabase as any).rpc('exec_sql', {
      sql: alterTableSQL
    });

    if (alterError) {
      console.log('RPC not available, columns may need to be added manually:', alterError.message);
      // Continue anyway - columns might already exist
    }

    // Step 2: Backfill existing articles with event data
    // Get all articles that have event_id but no event_date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: articlesToUpdate, error: fetchError } = await (supabase as any)
      .from('blog_articles')
      .select('id, event_id')
      .not('event_id', 'is', null)
      .is('event_date', null);

    if (fetchError) {
      console.error('Error fetching articles:', fetchError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch articles for backfill',
        details: fetchError.message,
        sql: alterTableSQL.trim()
      });
    }

    let updatedCount = 0;
    const errors: string[] = [];

    if (articlesToUpdate && articlesToUpdate.length > 0) {
      // Get event data for each article
      for (const article of articlesToUpdate) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: eventData } = await (supabase as any)
            .from('events')
            .select('start_date, end_date, venue_name, affiliate_url')
            .eq('id', article.event_id)
            .single() as { data: { start_date: string; end_date: string | null; venue_name: string | null; affiliate_url: string | null } | null };

          if (eventData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: updateError } = await (supabase as any)
              .from('blog_articles')
              .update({
                event_date: eventData.start_date,
                event_end_date: eventData.end_date,
                event_venue: eventData.venue_name,
                affiliate_url: eventData.affiliate_url,
              })
              .eq('id', article.id);

            if (updateError) {
              errors.push(`Article ${article.id}: ${updateError.message}`);
            } else {
              updatedCount++;
            }
          }
        } catch (err) {
          errors.push(`Article ${article.id}: ${err}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migration completed',
      articlesFound: articlesToUpdate?.length || 0,
      articlesUpdated: updatedCount,
      errors: errors.length > 0 ? errors : undefined,
      sql: alterTableSQL.trim()
    });
  } catch (err) {
    console.error('Migration error:', err);
    return NextResponse.json({
      success: false,
      error: String(err),
      sql: `
-- Run this SQL in your Supabase SQL Editor if automatic migration fails:

ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS event_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS event_end_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS event_venue TEXT;
ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS affiliate_url TEXT;
CREATE INDEX IF NOT EXISTS idx_blog_articles_event_date ON blog_articles(event_date);

-- Backfill existing articles:
UPDATE blog_articles ba
SET
  event_date = e.start_date,
  event_end_date = e.end_date,
  event_venue = e.venue_name,
  affiliate_url = e.affiliate_url
FROM events e
WHERE ba.event_id = e.id
AND ba.event_date IS NULL;
      `.trim()
    });
  }
}

// GET endpoint to check status
export async function GET() {
  try {
    const supabase = getAdminClient();

    // Check if columns exist by querying
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .select('id, event_date, event_end_date, event_venue, affiliate_url')
      .limit(1);

    if (error) {
      return NextResponse.json({
        migrated: false,
        error: error.message,
        hint: 'Columns may not exist yet. Run POST to migrate.'
      });
    }

    // Count articles with and without event_date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: withEventDate } = await (supabase as any)
      .from('blog_articles')
      .select('*', { count: 'exact', head: true })
      .not('event_date', 'is', null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: withoutEventDate } = await (supabase as any)
      .from('blog_articles')
      .select('*', { count: 'exact', head: true })
      .is('event_date', null)
      .not('event_id', 'is', null);

    return NextResponse.json({
      migrated: true,
      columnsExist: true,
      stats: {
        articlesWithEventDate: withEventDate || 0,
        articlesNeedingBackfill: withoutEventDate || 0,
      }
    });
  } catch (err) {
    return NextResponse.json({
      migrated: false,
      error: String(err)
    });
  }
}
