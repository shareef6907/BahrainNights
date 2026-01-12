import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { migrationName } = await request.json();

    if (migrationName !== 'experiences') {
      return NextResponse.json({ error: 'Invalid migration name' }, { status: 400 });
    }

    const supabase = getAdminClient();

    // Check if table already exists
    const { data: existingTable } = await supabase
      .from('experiences')
      .select('id')
      .limit(1);

    if (existingTable !== null) {
      return NextResponse.json({
        success: true,
        message: 'Table already exists',
        alreadyExists: true
      });
    }

    // Table doesn't exist, we need to create it via Supabase Dashboard
    return NextResponse.json({
      success: false,
      message: 'Table does not exist. Please run the migration SQL in Supabase Dashboard SQL Editor.',
      sqlFile: 'supabase/migrations/20260113_create_experiences_table.sql'
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed' },
      { status: 500 }
    );
  }
}

// GET to check table status
export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminClient();

    // Check if experiences table exists by trying to query it
    const { data, error } = await supabase
      .from('experiences')
      .select('id')
      .limit(1);

    if (error && error.code === '42P01') {
      // Table doesn't exist
      return NextResponse.json({
        exists: false,
        message: 'experiences table does not exist',
        sqlFile: 'supabase/migrations/20260113_create_experiences_table.sql'
      });
    }

    if (error) {
      return NextResponse.json({
        exists: false,
        error: error.message
      });
    }

    // Get count
    const { count } = await supabase
      .from('experiences')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      exists: true,
      message: 'experiences table exists',
      recordCount: count || 0
    });

  } catch (error) {
    console.error('Check error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Check failed' },
      { status: 500 }
    );
  }
}
