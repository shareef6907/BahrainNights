-- Create sponsor_inquiries table for storing sponsorship inquiry form submissions
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

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_status ON public.sponsor_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_created_at ON public.sponsor_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sponsor_inquiries_email ON public.sponsor_inquiries(email);

-- Enable RLS
ALTER TABLE public.sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy allowing service role to do everything
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'sponsor_inquiries'
    AND policyname = 'Service role full access to sponsor_inquiries'
  ) THEN
    CREATE POLICY "Service role full access to sponsor_inquiries"
      ON public.sponsor_inquiries
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

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

-- Grant access to service role
GRANT ALL ON public.sponsor_inquiries TO service_role;
GRANT ALL ON public.sponsor_inquiries TO postgres;
