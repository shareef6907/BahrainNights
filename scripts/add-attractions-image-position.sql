-- Add image position columns to attractions table
-- Run this in Supabase SQL Editor

ALTER TABLE attractions
ADD COLUMN IF NOT EXISTS image_position_x INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS image_position_y INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS image_scale DECIMAL(3,2) DEFAULT 1.0;

-- Verify columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'attractions'
AND column_name IN ('image_position_x', 'image_position_y', 'image_scale');
