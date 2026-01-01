import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = getAdminClient();

    // Create homepage_ads table
    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS homepage_ads (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          advertiser_name VARCHAR(255) NOT NULL,
          company_name VARCHAR(255),
          contact_email VARCHAR(255) NOT NULL,
          contact_phone VARCHAR(50),
          title VARCHAR(255),
          subtitle VARCHAR(255),
          cta_text VARCHAR(100),
          image_url TEXT NOT NULL,
          target_url TEXT NOT NULL,
          slot_position INTEGER CHECK (slot_position >= 1 AND slot_position <= 5),
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          price_bd DECIMAL(10, 2) DEFAULT 0,
          payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue')),
          payment_date DATE,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'expired')),
          impressions INTEGER DEFAULT 0,
          clicks INTEGER DEFAULT 0,
          invoice_number VARCHAR(50),
          notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Create ad_clicks table for tracking
        CREATE TABLE IF NOT EXISTS ad_clicks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          ad_id UUID REFERENCES homepage_ads(id) ON DELETE CASCADE,
          ip_hash VARCHAR(64),
          user_agent TEXT,
          clicked_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_homepage_ads_status ON homepage_ads(status);
        CREATE INDEX IF NOT EXISTS idx_homepage_ads_dates ON homepage_ads(start_date, end_date);
        CREATE INDEX IF NOT EXISTS idx_homepage_ads_slot ON homepage_ads(slot_position);
        CREATE INDEX IF NOT EXISTS idx_ad_clicks_ad_id ON ad_clicks(ad_id);

        -- Enable RLS
        ALTER TABLE homepage_ads ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ad_clicks ENABLE ROW LEVEL SECURITY;

        -- Create policies for homepage_ads
        DROP POLICY IF EXISTS "Allow public read active ads" ON homepage_ads;
        CREATE POLICY "Allow public read active ads" ON homepage_ads
          FOR SELECT USING (status = 'active');

        DROP POLICY IF EXISTS "Allow service role full access ads" ON homepage_ads;
        CREATE POLICY "Allow service role full access ads" ON homepage_ads
          FOR ALL USING (true);

        -- Create policies for ad_clicks
        DROP POLICY IF EXISTS "Allow insert clicks" ON ad_clicks;
        CREATE POLICY "Allow insert clicks" ON ad_clicks
          FOR INSERT WITH CHECK (true);

        DROP POLICY IF EXISTS "Allow service role full access clicks" ON ad_clicks;
        CREATE POLICY "Allow service role full access clicks" ON ad_clicks
          FOR ALL USING (true);
      `
    });

    if (tableError) {
      // Try direct SQL if rpc doesn't exist
      console.log('RPC failed, trying direct approach...');

      // Create table using raw query
      const createResult = await supabase.from('homepage_ads').select('id').limit(1);

      if (createResult.error?.code === '42P01') {
        // Table doesn't exist - we need to create it via Supabase dashboard
        return NextResponse.json({
          success: false,
          message: 'Table does not exist. Please create it via Supabase SQL Editor.',
          sql: `
-- Run this in Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS homepage_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  title VARCHAR(255),
  subtitle VARCHAR(255),
  cta_text VARCHAR(100),
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  slot_position INTEGER CHECK (slot_position >= 1 AND slot_position <= 5),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_bd DECIMAL(10, 2) DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue')),
  payment_date DATE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'expired')),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  invoice_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id UUID REFERENCES homepage_ads(id) ON DELETE CASCADE,
  ip_hash VARCHAR(64),
  user_agent TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_homepage_ads_status ON homepage_ads(status);
CREATE INDEX IF NOT EXISTS idx_homepage_ads_dates ON homepage_ads(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_homepage_ads_slot ON homepage_ads(slot_position);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_ad_id ON ad_clicks(ad_id);

ALTER TABLE homepage_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access ads" ON homepage_ads FOR ALL USING (true);
CREATE POLICY "Allow service role full access clicks" ON ad_clicks FOR ALL USING (true);
          `
        }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        message: 'Table already exists'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Homepage ads tables created successfully'
    });
  } catch (error) {
    console.error('Error setting up ads table:', error);
    return NextResponse.json(
      { error: 'Failed to setup ads table', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to create the homepage_ads table',
    note: 'Alternatively, run the SQL directly in Supabase SQL Editor'
  });
}
