-- Add image_settings column to homepage_ads table for image repositioning
ALTER TABLE homepage_ads
ADD COLUMN IF NOT EXISTS image_settings JSONB DEFAULT NULL;

COMMENT ON COLUMN homepage_ads.image_settings IS 'Image positioning settings: {position: {x: number, y: number}, scale: number}';
