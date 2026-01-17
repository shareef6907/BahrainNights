import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = getAdminClient();

    // Create the featured_trailers table using raw SQL
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).rpc('exec_sql', {
      sql: `
        -- Create featured_trailers table if not exists
        CREATE TABLE IF NOT EXISTS featured_trailers (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
          display_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create indexes if not exist
        CREATE INDEX IF NOT EXISTS idx_featured_trailers_order ON featured_trailers(display_order);
        CREATE INDEX IF NOT EXISTS idx_featured_trailers_active ON featured_trailers(is_active);

        -- Add is_featured column to blog_articles if not exists
        ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
        CREATE INDEX IF NOT EXISTS idx_blog_articles_featured ON blog_articles(is_featured);
      `
    });

    if (error) {
      // If exec_sql doesn't exist, try direct table creation approach
      // This fallback uses the Supabase admin API
      console.log('exec_sql failed, attempting direct creation:', error.message);

      // Try to create the table directly by inserting (will fail if table doesn't exist)
      // This is a workaround - in production, run the SQL directly in Supabase dashboard
      return NextResponse.json({
        success: false,
        error: 'Please create the table manually in Supabase SQL Editor',
        sql: `
-- Run this SQL in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS featured_trailers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_featured_trailers_order ON featured_trailers(display_order);
CREATE INDEX IF NOT EXISTS idx_featured_trailers_active ON featured_trailers(is_active);

ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_blog_articles_featured ON blog_articles(is_featured);
        `.trim()
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Init featured trailers exception:', err);
    return NextResponse.json({
      success: false,
      error: String(err),
      sql: `
-- Run this SQL in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS featured_trailers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_featured_trailers_order ON featured_trailers(display_order);
CREATE INDEX IF NOT EXISTS idx_featured_trailers_active ON featured_trailers(is_active);

ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_blog_articles_featured ON blog_articles(is_featured);
      `.trim()
    });
  }
}
