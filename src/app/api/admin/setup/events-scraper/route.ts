import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const results: string[] = [];
    const errors: string[] = [];

    // Check if events table exists
    const { error: checkEvents } = await supabase
      .from('events')
      .select('id')
      .limit(1);

    if (checkEvents?.code === '42P01') {
      return NextResponse.json({
        success: false,
        error: 'Events table does not exist',
      }, { status: 400 });
    }

    // Check existing columns by trying to select them
    const { data: sampleEvent, error: columnCheck } = await supabase
      .from('events')
      .select('source_url, source_name, source_event_id, last_scraped_at, booking_url')
      .limit(1);

    // If we get column not found errors, we need to add them
    if (columnCheck?.message?.includes('source_url') ||
        columnCheck?.message?.includes('source_name') ||
        columnCheck?.message?.includes('source_event_id')) {
      results.push('Source tracking columns need to be added via Supabase Dashboard SQL');
    } else {
      results.push('Source tracking columns already exist');
    }

    // Test if booking_url exists
    const { error: bookingUrlCheck } = await supabase
      .from('events')
      .select('booking_url')
      .limit(1);

    if (!bookingUrlCheck) {
      results.push('booking_url column exists');
    }

    return NextResponse.json({
      success: true,
      results,
      errors,
      message: 'Check complete. If columns are missing, run the SQL in Supabase Dashboard.',
      existingColumns: sampleEvent ? Object.keys(sampleEvent[0] || {}) : [],
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to check schema', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Events Scraper Schema Setup API',
    instructions: 'Run the SQL below in Supabase Dashboard -> SQL Editor to add source tracking columns',
    sql: `
-- Add source tracking columns to events table for scraper integration
-- Run this in Supabase Dashboard -> SQL Editor

-- Add source_url column (where we scraped from)
ALTER TABLE events ADD COLUMN IF NOT EXISTS source_url TEXT;

-- Add source_name column (which scraper: bahrain-calendar, platinumlist, aldana, etc)
ALTER TABLE events ADD COLUMN IF NOT EXISTS source_name TEXT;

-- Add source_event_id column (unique ID from source for deduplication)
ALTER TABLE events ADD COLUMN IF NOT EXISTS source_event_id TEXT;

-- Add last_scraped_at timestamp
ALTER TABLE events ADD COLUMN IF NOT EXISTS last_scraped_at TIMESTAMP WITH TIME ZONE;

-- Add booking_url if it doesn't exist
ALTER TABLE events ADD COLUMN IF NOT EXISTS booking_url TEXT;

-- Create unique index for duplicate prevention
-- This ensures we don't add the same event from the same source twice
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_source_unique
ON events(source_name, source_event_id)
WHERE source_event_id IS NOT NULL;

-- Create index for faster lookups by source
CREATE INDEX IF NOT EXISTS idx_events_source_name ON events(source_name);

-- Verify columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'events'
AND column_name IN ('source_url', 'source_name', 'source_event_id', 'last_scraped_at', 'booking_url');
    `,
  });
}
