-- Add image position columns to attractions table
ALTER TABLE attractions
ADD COLUMN IF NOT EXISTS image_position_x INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS image_position_y INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS image_scale DECIMAL(3,2) DEFAULT 1.0;
