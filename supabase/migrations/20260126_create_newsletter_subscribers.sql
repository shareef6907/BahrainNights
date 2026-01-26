-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
  source VARCHAR(100) DEFAULT 'website',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  resubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);

-- Create index on subscribed_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- Add RLS policies
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access to newsletter_subscribers"
  ON newsletter_subscribers
  FOR ALL
  USING (true)
  WITH CHECK (true);
