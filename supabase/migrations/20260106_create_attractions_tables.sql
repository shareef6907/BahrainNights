-- Attractions, Tours, and Guides Tables for BahrainNights
-- Run this SQL in Supabase SQL Editor

-- Tour Providers Table (needs to be created first as tours references it)
CREATE TABLE IF NOT EXISTS tour_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT DEFAULT 'company', -- 'company', 'individual_guide', 'agency'
  slug TEXT UNIQUE,
  description TEXT,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  address TEXT,
  area TEXT,
  logo_url TEXT,
  cover_image TEXT,
  images TEXT[],
  languages TEXT[],
  specialties TEXT[],
  years_experience INTEGER,
  is_verified BOOLEAN DEFAULT FALSE,
  license_number TEXT,
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Attractions Table
CREATE TABLE IF NOT EXISTS attractions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic Info
  name TEXT NOT NULL,
  name_arabic TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  description_arabic TEXT,
  short_description TEXT,

  -- Categorization
  category TEXT, -- 'Family & Kids', 'Cultural', 'Nature', 'Adventure', 'Historical', 'Beach', 'Shopping', 'Entertainment'
  subcategory TEXT,
  tags TEXT[], -- ['family-friendly', 'outdoor', 'free', 'indoor', 'guided']

  -- Location
  address TEXT,
  area TEXT, -- 'Manama', 'Muharraq', 'Riffa', etc.
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  google_maps_url TEXT,

  -- Media
  image_url TEXT,
  images TEXT[], -- Array of image URLs
  video_url TEXT,

  -- Details
  duration TEXT, -- '1-2 hours', 'Half day', 'Full day'
  best_time TEXT, -- 'Morning', 'Evening', 'Any time'
  price_range TEXT, -- 'Free', 'Budget', 'Mid-range', 'Premium'
  price_from DECIMAL(10, 2),
  price_to DECIMAL(10, 2),
  currency TEXT DEFAULT 'BHD',

  -- Audience
  suitable_for TEXT[], -- ['families', 'kids', 'couples', 'solo', 'groups', 'seniors']
  age_restriction TEXT,
  accessibility TEXT,

  -- Contact (if applicable)
  phone TEXT,
  email TEXT,
  website TEXT,
  booking_url TEXT,

  -- Ratings
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  tripadvisor_rating DECIMAL(2, 1),
  tripadvisor_reviews INTEGER,
  tripadvisor_url TEXT,

  -- Source
  source TEXT DEFAULT 'manual', -- 'tripadvisor', 'manual', 'google'
  source_id TEXT, -- External ID from source

  -- Display
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,

  -- SEO
  seo_title TEXT,
  seo_description TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tours Table
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic Info
  name TEXT NOT NULL,
  name_arabic TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  description_arabic TEXT,
  short_description TEXT,

  -- Tour Type
  tour_type TEXT, -- 'Walking', 'Driving', 'Boat', 'Desert', 'Cultural', 'Food', 'Photography', 'Private', 'Group'
  category TEXT, -- 'Day Tours', 'Multi-day', 'Shore Excursions', 'Private Tours', 'Group Tours'

  -- Details
  duration TEXT,
  duration_hours DECIMAL(4, 1),
  group_size TEXT, -- 'Private', 'Small group (2-8)', 'Large group (8+)'
  max_participants INTEGER,
  languages TEXT[], -- ['English', 'Arabic', 'French', etc.]

  -- Pricing
  price_from DECIMAL(10, 2),
  price_to DECIMAL(10, 2),
  price_per TEXT DEFAULT 'person', -- 'person', 'group', 'vehicle'
  currency TEXT DEFAULT 'BHD',
  includes TEXT[], -- What's included
  excludes TEXT[], -- What's not included

  -- Itinerary
  highlights TEXT[],
  itinerary JSONB, -- [{time: '9:00', activity: 'Hotel pickup'}, ...]
  meeting_point TEXT,
  end_point TEXT,

  -- Media
  image_url TEXT,
  images TEXT[],
  video_url TEXT,

  -- Location
  areas_covered TEXT[], -- ['Manama', 'Muharraq', 'Bahrain Fort']

  -- Audience
  suitable_for TEXT[],
  difficulty_level TEXT, -- 'Easy', 'Moderate', 'Challenging'
  accessibility TEXT,

  -- Ratings
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  tripadvisor_rating DECIMAL(2, 1),
  tripadvisor_reviews INTEGER,
  tripadvisor_url TEXT,

  -- Provider
  provider_id UUID REFERENCES tour_providers(id),
  provider_name TEXT,

  -- Source
  source TEXT DEFAULT 'manual',
  source_id TEXT,

  -- Display
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Local Guides (Individual)
CREATE TABLE IF NOT EXISTS local_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Personal Info
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  bio TEXT,
  tagline TEXT, -- "Passionate about Bahrain's hidden gems"

  -- Contact
  email TEXT,
  phone TEXT,
  whatsapp TEXT,

  -- Profile
  profile_image TEXT,
  cover_image TEXT,

  -- Details
  languages TEXT[],
  specialties TEXT[],
  areas TEXT[], -- Areas they cover
  years_experience INTEGER,

  -- Availability
  available_days TEXT[], -- ['Monday', 'Tuesday', ...]
  tour_types TEXT[], -- ['Walking', 'Driving', 'Food']

  -- Pricing
  hourly_rate DECIMAL(10, 2),
  half_day_rate DECIMAL(10, 2),
  full_day_rate DECIMAL(10, 2),
  currency TEXT DEFAULT 'BHD',

  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  id_verified BOOLEAN DEFAULT FALSE,

  -- Ratings
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,

  -- Display
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Registration
  registered_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Guide Registration Requests
CREATE TABLE IF NOT EXISTS guide_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Personal Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,

  -- Details
  languages TEXT[],
  specialties TEXT[],
  experience TEXT,
  bio TEXT,

  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_at TIMESTAMP,
  reviewed_by TEXT,
  notes TEXT,

  -- Timestamps
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Reviews for attractions/tours/guides
CREATE TABLE IF NOT EXISTS experience_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- What is being reviewed
  review_type TEXT NOT NULL, -- 'attraction', 'tour', 'guide'
  reference_id UUID NOT NULL,

  -- Reviewer
  reviewer_name TEXT,
  reviewer_email TEXT,

  -- Review
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,

  -- Source
  source TEXT DEFAULT 'bahrainnights', -- 'bahrainnights', 'tripadvisor', 'google'
  source_url TEXT,

  -- Status
  is_approved BOOLEAN DEFAULT FALSE,

  -- Timestamps
  visited_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);
CREATE INDEX IF NOT EXISTS idx_attractions_active ON attractions(is_active);
CREATE INDEX IF NOT EXISTS idx_attractions_featured ON attractions(is_featured);
CREATE INDEX IF NOT EXISTS idx_attractions_area ON attractions(area);
CREATE INDEX IF NOT EXISTS idx_attractions_slug ON attractions(slug);

CREATE INDEX IF NOT EXISTS idx_tours_type ON tours(tour_type);
CREATE INDEX IF NOT EXISTS idx_tours_active ON tours(is_active);
CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(is_featured);
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);

CREATE INDEX IF NOT EXISTS idx_guides_active ON local_guides(is_active);
CREATE INDEX IF NOT EXISTS idx_guides_featured ON local_guides(is_featured);
CREATE INDEX IF NOT EXISTS idx_guides_slug ON local_guides(slug);

CREATE INDEX IF NOT EXISTS idx_guide_applications_status ON guide_applications(status);

CREATE INDEX IF NOT EXISTS idx_reviews_type ON experience_reviews(review_type, reference_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON experience_reviews(is_approved);
