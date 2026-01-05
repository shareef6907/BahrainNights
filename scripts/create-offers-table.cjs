const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const createOffersTable = `
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  created_by UUID REFERENCES public.users(id),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  offer_type VARCHAR(50) NOT NULL CHECK (offer_type IN ('ladies-night', 'brunch', 'happy-hour', 'special-deal', 'buy1get1', 'buffet')),
  days_available TEXT[] NOT NULL DEFAULT '{}',
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  valid_from DATE,
  valid_until DATE,
  is_ongoing BOOLEAN DEFAULT TRUE,
  whats_included TEXT[],
  terms_conditions TEXT,
  reservation_required BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'expired', 'paused')),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_offers_venue_id ON public.offers(venue_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON public.offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_offer_type ON public.offers(offer_type);

-- Enable RLS
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to active offers
CREATE POLICY IF NOT EXISTS "Public can view active offers" ON public.offers
  FOR SELECT USING (status = 'active');

-- Create policy for venue owners to manage their offers
CREATE POLICY IF NOT EXISTS "Venue owners can manage their offers" ON public.offers
  FOR ALL USING (
    venue_id IN (
      SELECT id FROM public.venues WHERE owner_id = auth.uid()
    )
  );
`;

async function createTable() {
  console.log('Creating offers table...');
  
  const { error } = await supabase.rpc('exec_sql', { sql: createOffersTable });
  
  if (error) {
    console.log('Note: RPC not available, trying direct query approach...');
    // Try direct approach
    console.log('Please run the following SQL in Supabase SQL editor:');
    console.log(createOffersTable);
  } else {
    console.log('Offers table created successfully!');
  }
}

createTable().catch(console.error);
