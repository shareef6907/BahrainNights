-- Fix duplicate blog articles for same event
-- Add unique constraint on event_id (partial - only for non-null values)

-- First, remove any existing duplicates (keep the oldest one)
WITH duplicates AS (
  SELECT id, event_id, created_at,
         ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY created_at ASC) as rn
  FROM blog_articles
  WHERE event_id IS NOT NULL
)
DELETE FROM blog_articles
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Add unique partial index on event_id (only for non-null values)
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_articles_event_id_unique 
ON blog_articles(event_id) 
WHERE event_id IS NOT NULL;

-- Also ensure blog_event_tracker is synced with actual articles
DELETE FROM blog_event_tracker bet
WHERE NOT EXISTS (
  SELECT 1 FROM blog_articles ba 
  WHERE ba.event_id = bet.event_id
);

-- Insert missing tracker entries
INSERT INTO blog_event_tracker (event_id, article_id)
SELECT ba.event_id, ba.id
FROM blog_articles ba
WHERE ba.event_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM blog_event_tracker bet 
    WHERE bet.event_id = ba.event_id
  );
