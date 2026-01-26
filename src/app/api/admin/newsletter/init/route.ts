import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// This endpoint creates the newsletter_subscribers table if it doesn't exist
export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    // Use the REST API to execute SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        sql: `
          CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) NOT NULL UNIQUE,
            status VARCHAR(50) DEFAULT 'subscribed',
            source VARCHAR(100) DEFAULT 'website',
            subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            unsubscribed_at TIMESTAMP WITH TIME ZONE,
            resubscribed_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
          CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
        `
      }),
    });

    if (!response.ok) {
      // Try alternative: direct table check/creation via Supabase client
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Test if table exists by trying to select from it
      const { error: selectError } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .limit(1);
      
      if (selectError && selectError.code === '42P01') {
        return NextResponse.json({ 
          success: false, 
          message: 'Table does not exist. Please create it manually in Supabase SQL Editor.',
          sql: `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'subscribed',
  source VARCHAR(100) DEFAULT 'website',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  resubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
        }, { status: 400 });
      }
      
      // Table exists
      return NextResponse.json({ success: true, message: 'Table already exists' });
    }

    return NextResponse.json({ success: true, message: 'Migration completed' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  // Check table status
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error, count } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (error) {
      return NextResponse.json({ 
        exists: false, 
        error: error.message,
        code: error.code 
      });
    }
    
    return NextResponse.json({ 
      exists: true, 
      count: count || 0,
      sample: data 
    });
  } catch (error) {
    return NextResponse.json({ exists: false, error: String(error) });
  }
}
