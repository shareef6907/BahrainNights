import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth/verifyAdmin';

// POST /api/admin/seo/migrate - Run SEO tables migration
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const { isAdmin, error: authError } = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: authError || 'Unauthorized' }, { status: 401 });
    }

    const supabase = getAdminClient();
    const results: string[] = [];
    const errors: string[] = [];

    // Try to create seo_keywords table by inserting and catching error
    console.log('Checking/creating SEO tables...');

    // Check if tables exist by trying to query them
    const { error: keywordsError } = await supabase
      .from('seo_keywords')
      .select('id')
      .limit(1);

    if (keywordsError) {
      if (keywordsError.code === '42P01') {
        errors.push('seo_keywords table does not exist - create it via Supabase Dashboard SQL Editor');
      } else {
        errors.push(`seo_keywords check error: ${keywordsError.message}`);
      }
    } else {
      results.push('seo_keywords table exists');

      // Insert keywords if table exists
      const keywords = [
        { keyword: 'events in bahrain', search_volume: 2400, difficulty: 'medium', priority: 10 },
        { keyword: 'nightlife in bahrain', search_volume: 1900, difficulty: 'medium', priority: 9 },
        { keyword: 'attractions in bahrain', search_volume: 1600, difficulty: 'medium', priority: 9 },
        { keyword: 'things to do in bahrain', search_volume: 3200, difficulty: 'high', priority: 10 },
        { keyword: 'bahrain restaurants', search_volume: 2100, difficulty: 'medium', priority: 8 },
        { keyword: 'bahrain clubs', search_volume: 1400, difficulty: 'low', priority: 8 },
        { keyword: 'bahrain bars', search_volume: 1200, difficulty: 'low', priority: 7 },
        { keyword: 'bahrain cinema', search_volume: 1800, difficulty: 'medium', priority: 7 },
        { keyword: 'family activities bahrain', search_volume: 900, difficulty: 'low', priority: 8 },
        { keyword: 'weekend in bahrain', search_volume: 1100, difficulty: 'medium', priority: 8 },
        { keyword: 'bahrain events today', search_volume: 800, difficulty: 'low', priority: 9 },
        { keyword: 'bahrain nightclubs', search_volume: 1300, difficulty: 'low', priority: 7 },
        { keyword: 'best restaurants bahrain', search_volume: 1500, difficulty: 'medium', priority: 8 },
        { keyword: 'bahrain entertainment', search_volume: 700, difficulty: 'low', priority: 7 },
        { keyword: 'bahrain tourism', search_volume: 2000, difficulty: 'high', priority: 6 }
      ];

      const { data: insertedKeywords, error: insertError } = await (supabase
        .from('seo_keywords') as any)
        .upsert(keywords, { onConflict: 'keyword' })
        .select();

      if (insertError) {
        errors.push(`Keywords insert error: ${insertError.message}`);
      } else {
        results.push(`Inserted/updated ${insertedKeywords?.length || 0} keywords`);
      }
    }

    const { error: metaError } = await supabase
      .from('seo_page_meta')
      .select('id')
      .limit(1);

    if (metaError) {
      if (metaError.code === '42P01') {
        errors.push('seo_page_meta table does not exist - create it via Supabase Dashboard SQL Editor');
      } else {
        errors.push(`seo_page_meta check error: ${metaError.message}`);
      }
    } else {
      results.push('seo_page_meta table exists');
    }

    const { error: logsError } = await supabase
      .from('seo_agent_logs')
      .select('id')
      .limit(1);

    if (logsError) {
      if (logsError.code === '42P01') {
        errors.push('seo_agent_logs table does not exist - create it via Supabase Dashboard SQL Editor');
      } else {
        errors.push(`seo_agent_logs check error: ${logsError.message}`);
      }
    } else {
      results.push('seo_agent_logs table exists');
    }

    // Return SQL for manual creation if tables don't exist
    const createTableSQL = `
-- SEO Tables for BahrainNights.com
-- Copy and paste this into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS seo_keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword VARCHAR(255) NOT NULL UNIQUE,
  search_volume INTEGER DEFAULT 0,
  difficulty VARCHAR(50) DEFAULT 'medium',
  priority INTEGER DEFAULT 5,
  target_pages TEXT[],
  current_ranking INTEGER,
  last_checked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_page_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(500) NOT NULL UNIQUE,
  page_type VARCHAR(100) NOT NULL,
  title VARCHAR(70),
  description VARCHAR(160),
  keywords TEXT[],
  og_title VARCHAR(95),
  og_description VARCHAR(200),
  og_image TEXT,
  canonical_url TEXT,
  structured_data JSONB,
  last_optimized TIMESTAMP WITH TIME ZONE,
  optimization_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pages_optimized INTEGER DEFAULT 0,
  keywords_checked INTEGER DEFAULT 0,
  sitemap_updated BOOLEAN DEFAULT FALSE,
  errors TEXT[],
  duration_seconds INTEGER,
  status VARCHAR(50) DEFAULT 'completed',
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

    return NextResponse.json({
      success: errors.length === 0,
      results,
      errors,
      sql: errors.length > 0 ? createTableSQL : null,
      message: errors.length > 0
        ? 'Some tables need to be created. Copy the SQL above and run it in Supabase SQL Editor.'
        : 'All SEO tables are ready!'
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed' },
      { status: 500 }
    );
  }
}
