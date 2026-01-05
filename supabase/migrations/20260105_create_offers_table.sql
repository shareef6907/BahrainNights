-- Create offers table
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  created_by UUID,
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
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON public.offers(created_at);
