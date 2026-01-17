import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const CREATE_TABLE_SQL = `
-- Create cinema_featured_trailers table for Cinema page hero section
CREATE TABLE IF NOT EXISTS cinema_featured_trailers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cinema_featured_trailers_order ON cinema_featured_trailers(display_order);
CREATE INDEX IF NOT EXISTS idx_cinema_featured_trailers_active ON cinema_featured_trailers(is_active);
CREATE INDEX IF NOT EXISTS idx_cinema_featured_trailers_movie ON cinema_featured_trailers(movie_id);
`.trim();

export async function POST() {
  try {
    const supabase = getAdminClient();

    // Try to create the table using raw SQL via exec_sql function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).rpc('exec_sql', {
      sql: CREATE_TABLE_SQL
    });

    if (error) {
      // If exec_sql doesn't exist, return the SQL for manual execution
      console.log('exec_sql failed, returning SQL for manual creation:', error.message);

      return NextResponse.json({
        success: false,
        error: 'Please create the table manually in Supabase SQL Editor',
        sql: CREATE_TABLE_SQL
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Init cinema featured trailers exception:', err);
    return NextResponse.json({
      success: false,
      error: String(err),
      sql: CREATE_TABLE_SQL
    });
  }
}
