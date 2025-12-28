import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// This endpoint creates the sponsor_inquiries table if it doesn't exist
// It should only be called once during setup
export async function POST(request: NextRequest) {
  try {
    // Verify admin access via a simple secret key
    const authHeader = request.headers.get('authorization');
    const expectedKey = process.env.SETUP_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20);

    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a direct Supabase client with service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        db: {
          schema: 'public',
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if table already exists by trying to select from it
    const { error: checkError } = await supabase
      .from('sponsor_inquiries')
      .select('id')
      .limit(1);

    if (!checkError) {
      return NextResponse.json({
        success: true,
        message: 'Table sponsor_inquiries already exists',
      });
    }

    // If error is not "table doesn't exist", it's a different problem
    if (checkError.code !== 'PGRST205' && checkError.code !== '42P01') {
      console.error('Unexpected error checking table:', checkError);
      return NextResponse.json({
        error: 'Failed to check table existence',
        details: checkError.message,
      }, { status: 500 });
    }

    // Table doesn't exist - we need to create it
    // Since Supabase JS client doesn't support DDL, we'll use the REST API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        body: JSON.stringify({
          query: `
            CREATE TABLE IF NOT EXISTS public.sponsor_inquiries (
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              business_name TEXT NOT NULL,
              contact_name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT,
              preferred_tier TEXT NOT NULL DEFAULT 'golden' CHECK (preferred_tier IN ('golden', 'silver')),
              message TEXT,
              status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'rejected')),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );

            -- Create an index on status for faster filtering
            CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_status ON public.sponsor_inquiries(status);

            -- Create an index on created_at for sorting
            CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_created_at ON public.sponsor_inquiries(created_at DESC);

            -- Enable RLS
            ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;

            -- Create policy for service role to have full access
            CREATE POLICY IF NOT EXISTS "Service role has full access to sponsor_inquiries"
              ON public.sponsor_inquiries
              FOR ALL
              USING (true)
              WITH CHECK (true);
          `,
        }),
      }
    );

    if (!response.ok) {
      // RPC function might not exist, return SQL for manual execution
      return NextResponse.json({
        success: false,
        message: 'Could not auto-create table. Please run the following SQL in Supabase dashboard:',
        sql: `
CREATE TABLE IF NOT EXISTS public.sponsor_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_tier TEXT NOT NULL DEFAULT 'golden' CHECK (preferred_tier IN ('golden', 'silver')),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_status ON public.sponsor_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_created_at ON public.sponsor_inquiries(created_at DESC);

-- Enable RLS
ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON public.sponsor_inquiries FOR ALL USING (true) WITH CHECK (true);
        `.trim(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Table sponsor_inquiries created successfully',
    });
  } catch (error) {
    console.error('Error setting up sponsor_inquiries table:', error);
    return NextResponse.json({
      error: 'Failed to setup table',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// GET endpoint to check table status
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

    const { data, error } = await supabase
      .from('sponsor_inquiries')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return NextResponse.json({
          exists: false,
          message: 'Table does not exist',
          sql: `
CREATE TABLE IF NOT EXISTS public.sponsor_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_tier TEXT NOT NULL DEFAULT 'golden' CHECK (preferred_tier IN ('golden', 'silver')),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
          `.trim(),
        });
      }
      throw error;
    }

    return NextResponse.json({
      exists: true,
      message: 'Table exists and is ready',
    });
  } catch (error) {
    console.error('Error checking table status:', error);
    return NextResponse.json({
      error: 'Failed to check table status',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
