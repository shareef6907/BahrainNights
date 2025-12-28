#!/usr/bin/env node
/**
 * Script to create the sponsor_inquiries table in Supabase
 *
 * Usage:
 *   DATABASE_URL=postgresql://... node scripts/create-sponsor-inquiries-table.js
 *
 * Or if you have the .env.local file with DATABASE_URL:
 *   node scripts/create-sponsor-inquiries-table.js
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load .env.local if it exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...values] = line.split('=');
    if (key && !process.env[key]) {
      process.env[key] = values.join('=');
    }
  });
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                   SPONSOR INQUIRIES TABLE SETUP                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  DATABASE_URL not found. Please run the following SQL in your   ║
║  Supabase Dashboard > SQL Editor:                                ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

-- Copy and paste this SQL into your Supabase SQL Editor:

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
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_email ON public.sponsor_inquiries(email);

-- Enable RLS
ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access"
  ON public.sponsor_inquiries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_sponsor_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_sponsor_inquiries_updated_at ON public.sponsor_inquiries;
CREATE TRIGGER trigger_update_sponsor_inquiries_updated_at
  BEFORE UPDATE ON public.sponsor_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_sponsor_inquiries_updated_at();

-- Grant permissions
GRANT ALL ON public.sponsor_inquiries TO service_role;
GRANT ALL ON public.sponsor_inquiries TO postgres;
`);
  process.exit(0);
}

const sql = `
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

CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_status ON public.sponsor_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_created_at ON public.sponsor_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_email ON public.sponsor_inquiries(email);

ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'sponsor_inquiries'
    AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON public.sponsor_inquiries
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION update_sponsor_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_sponsor_inquiries_updated_at ON public.sponsor_inquiries;
CREATE TRIGGER trigger_update_sponsor_inquiries_updated_at
  BEFORE UPDATE ON public.sponsor_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_sponsor_inquiries_updated_at();

GRANT ALL ON public.sponsor_inquiries TO service_role;
GRANT ALL ON public.sponsor_inquiries TO postgres;
`;

async function createTable() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    console.log('Connecting to database...');
    const client = await pool.connect();

    console.log('Creating sponsor_inquiries table...');
    await client.query(sql);

    console.log('✅ Table sponsor_inquiries created successfully!');

    client.release();
  } catch (error) {
    console.error('❌ Error creating table:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createTable();
