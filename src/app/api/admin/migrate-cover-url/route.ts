import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// POST - Run migration to add cover_url column
export async function POST(request: NextRequest) {
  try {
    const supabase = getAdminClient();

    // Try to add the column using a workaround - update with cover_url to see if it exists
    // First, let's try to select with cover_url to check if column exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: testData, error: testError } = await (supabase as any)
      .from('experiences')
      .select('id, cover_url')
      .limit(1);

    if (testError && testError.message.includes('cover_url')) {
      // Column doesn't exist - we need to add it via SQL
      // Unfortunately, Supabase JS client doesn't support raw SQL
      // The user needs to run this in Supabase Dashboard
      return NextResponse.json({
        success: false,
        message: 'cover_url column does not exist. Please run the following SQL in Supabase Dashboard:',
        sql: 'ALTER TABLE experiences ADD COLUMN IF NOT EXISTS cover_url TEXT;'
      });
    }

    if (testError) {
      return NextResponse.json({
        success: false,
        error: testError.message
      }, { status: 500 });
    }

    // Column exists
    return NextResponse.json({
      success: true,
      message: 'cover_url column already exists',
      sampleData: testData
    });

  } catch (error) {
    console.error('Migration check error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET - Check if cover_url column exists
export async function GET() {
  try {
    const supabase = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('experiences')
      .select('id, cover_url')
      .limit(1);

    if (error && error.message.includes('cover_url')) {
      return NextResponse.json({
        exists: false,
        message: 'cover_url column does not exist',
        sql: 'ALTER TABLE experiences ADD COLUMN IF NOT EXISTS cover_url TEXT;'
      });
    }

    if (error) {
      return NextResponse.json({
        exists: false,
        error: error.message
      });
    }

    return NextResponse.json({
      exists: true,
      message: 'cover_url column exists',
      sampleData: data
    });

  } catch (error) {
    console.error('Check error:', error);
    return NextResponse.json({
      exists: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
