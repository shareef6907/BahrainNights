import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    // Check if password_hash column exists by trying to select it
    const { error: checkError } = await supabase
      .from('users')
      .select('password_hash')
      .limit(1);

    if (!checkError) {
      return NextResponse.json({
        success: true,
        message: 'password_hash column already exists in users table'
      });
    }

    // Check if user wants to run the migration
    const body = await request.json().catch(() => ({}));

    if (body.run === true) {
      // Run the migration using Supabase's raw SQL execution
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

      // Use the SQL API endpoint
      const sqlEndpoint = `${supabaseUrl}/rest/v1/rpc/`;

      // Try to add the column using a workaround - update a user with the new column
      // This won't work directly, so we provide SQL for manual execution

      return NextResponse.json({
        success: false,
        message: 'Automatic migration not supported. Please run the SQL below in Supabase SQL Editor (Dashboard > SQL Editor > New query):',
        sql: `-- Run this SQL in Supabase SQL Editor:

-- 1. Add password_hash column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- 2. Add index for faster email lookups during login
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- After running this, the venue registration will work.`,
        instructions: [
          '1. Go to Supabase Dashboard',
          '2. Click on SQL Editor in the left sidebar',
          '3. Click "New query"',
          '4. Paste the SQL above',
          '5. Click "Run"',
          '6. Refresh schema cache: Settings > API > Reload schema cache'
        ]
      }, { status: 400 });
    }

    // If we get here, the column doesn't exist - provide SQL to add it
    return NextResponse.json({
      success: false,
      message: 'password_hash column does not exist. Please run the SQL in Supabase SQL Editor.',
      sql: `-- Run this SQL in Supabase SQL Editor:

-- 1. Add password_hash column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- 2. Add index for faster email lookups during login
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`,
      instructions: [
        '1. Go to Supabase Dashboard',
        '2. Click on SQL Editor in the left sidebar',
        '3. Click "New query"',
        '4. Paste the SQL above',
        '5. Click "Run"',
        '6. Refresh schema cache: Settings > API > Reload schema cache'
      ],
      error: checkError.message
    }, { status: 400 });

  } catch (error) {
    console.error('Error checking users table:', error);
    return NextResponse.json(
      { error: 'Failed to check users table', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to check/add password_hash column to users table',
    note: 'If the column does not exist, SQL will be provided to run in Supabase SQL Editor'
  });
}
