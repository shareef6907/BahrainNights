-- Performance Indexes Migration
-- Created: 2026-01-04
-- Purpose: Add indexes to frequently queried columns for faster query performance
-- SAFE: This migration only ADDS indexes, does NOT delete any data

-- Events table indexes
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_is_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_status_start_date ON events(status, start_date);

-- Venues table indexes
CREATE INDEX IF NOT EXISTS idx_venues_status ON venues(status);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category);
CREATE INDEX IF NOT EXISTS idx_venues_is_verified ON venues(is_verified);

-- Movies table indexes
CREATE INDEX IF NOT EXISTS idx_movies_is_now_showing ON movies(is_now_showing);
CREATE INDEX IF NOT EXISTS idx_movies_tmdb_rating ON movies(tmdb_rating);

-- Showtimes table indexes
CREATE INDEX IF NOT EXISTS idx_showtimes_movie_id ON showtimes(movie_id);
CREATE INDEX IF NOT EXISTS idx_showtimes_show_date ON showtimes(show_date);
CREATE INDEX IF NOT EXISTS idx_showtimes_cinema ON showtimes(cinema);

-- Ads table indexes
CREATE INDEX IF NOT EXISTS idx_ads_status ON ads(status);
CREATE INDEX IF NOT EXISTS idx_ads_target_page ON ads(target_page);
CREATE INDEX IF NOT EXISTS idx_ads_start_end_date ON ads(start_date, end_date);

-- Offers table indexes (if exists)
CREATE INDEX IF NOT EXISTS idx_offers_venue_id ON offers(venue_id);
CREATE INDEX IF NOT EXISTS idx_offers_type ON offers(type);
CREATE INDEX IF NOT EXISTS idx_offers_is_active ON offers(is_active);
