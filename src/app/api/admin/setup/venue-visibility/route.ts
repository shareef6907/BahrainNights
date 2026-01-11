import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// POST: Run the migration to add is_hidden and youtube_url columns
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if columns already exist by trying to select them
    const { data: testData, error: checkError } = await supabase
      .from('venues')
      .select('is_hidden, youtube_url')
      .limit(1);

    if (!checkError) {
      return NextResponse.json({
        success: true,
        message: 'Columns is_hidden and youtube_url already exist in venues table',
        status: 'already_migrated'
      });
    }

    // Columns don't exist, provide SQL for manual execution
    const sql = `-- Migration: Add is_hidden and youtube_url columns to venues table
-- Run this SQL in Supabase SQL Editor

-- Add is_hidden column with default false (visible by default)
ALTER TABLE venues ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;

-- Add index for efficient filtering of hidden venues
CREATE INDEX IF NOT EXISTS idx_venues_is_hidden ON venues(is_hidden);

-- Add youtube_url column (nullable, stores full YouTube URL)
ALTER TABLE venues ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add comments for documentation
COMMENT ON COLUMN venues.is_hidden IS 'If true, venue is hidden from public pages but visible in admin panel';
COMMENT ON COLUMN venues.youtube_url IS 'YouTube video URL for venue';`;

    return NextResponse.json({
      success: false,
      message: 'Columns do not exist. Please run the SQL in Supabase SQL Editor.',
      sql,
      instructions: [
        '1. Go to Supabase Dashboard',
        '2. Click on SQL Editor in the left sidebar',
        '3. Click "New query"',
        '4. Paste the SQL provided',
        '5. Click "Run"',
        '6. Refresh schema cache: Settings > API > Reload schema cache',
        '7. Call this endpoint again to verify migration succeeded'
      ],
      error: checkError.message
    }, { status: 400 });

  } catch (error) {
    console.error('Error checking venues table:', error);
    return NextResponse.json(
      { error: 'Failed to check venues table', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// GET: Check migration status
export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if columns exist
    const { error: checkError } = await supabase
      .from('venues')
      .select('is_hidden, youtube_url')
      .limit(1);

    if (!checkError) {
      return NextResponse.json({
        success: true,
        migrated: true,
        message: 'Columns is_hidden and youtube_url exist in venues table'
      });
    }

    return NextResponse.json({
      success: true,
      migrated: false,
      message: 'Columns do not exist yet. POST to this endpoint for migration instructions.',
      error: checkError.message
    });

  } catch (error) {
    console.error('Error checking venues table:', error);
    return NextResponse.json(
      { error: 'Failed to check venues table', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
