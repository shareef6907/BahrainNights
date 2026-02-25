# BahrainNights Database Schema

**Generated:** 2026-02-26  
**Project:** nrnrrogxrheeoaxgdyut  
**Database:** Supabase PostgreSQL

---

## Tables Overview

| Table | Description |
|-------|-------------|
| `ad_clicks` | Ad click tracking |
| `agent_logs` | Agent/scraper run logs |
| `artist_booking_requests` | Entertainment booking requests |
| `artists` | Entertainment artists for booking |
| `attractions` | Tourist attractions/activities |
| `blog_articles` | Blog/news articles |
| `blog_event_tracker` | Blog-event relationships |
| `blog_venue_tracker` | Blog-venue relationships |
| `cinema_featured_trailers` | Featured movie trailers |
| `cinema_scraper_logs` | Cinema scraper run logs |
| `cinemas` | Cinema locations |
| `content_posts` | Social media content posts |
| `content_settings` | Content generation settings |
| `events` | Events listing |
| `experience_reviews` | Reviews for experiences/tours |
| `experiences` | Platinumlist experiences |
| `featured_trailers` | Featured movie trailers (legacy) |
| `guide_applications` | Tour guide applications |
| `homepage_ads` | Homepage advertising slots |
| `instagram_accounts` | Connected Instagram accounts |
| `like_rate_limits` | Like action rate limiting |
| `local_guides` | Local tour guides |
| `movies` | Movie listings |
| `newsletter_subscribers` | Newsletter subscriptions |
| `offers` | Venue offers/deals |
| `page_views` | Analytics page views |
| `profiles` | Admin user profiles |
| `prospect_manual_entries` | Manual prospect entries |
| `prospect_scrape_logs` | Prospect scraper logs |
| `prospect_sightings` | Prospect ad sightings |
| `prospects` | Sales prospects/leads |
| `public_users` | Public user accounts (Google auth) |
| `seo_agent_logs` | SEO agent run logs |
| `seo_keywords` | SEO keyword tracking |
| `seo_page_meta` | SEO page metadata |
| `showtimes` | Movie showtimes |
| `slider_ads` | Slider advertisements |
| `sponsor_inquiries` | Sponsorship inquiries |
| `terms_acceptance_log` | Terms acceptance audit log |
| `tour_providers` | Tour companies |
| `tours` | Tour listings |
| `users` | Admin users |
| `venue_change_requests` | Venue edit requests |
| `venue_events` | Venue-submitted events |
| `venue_images` | Venue gallery images |
| `venue_likes` | Venue likes |
| `venue_reels` | Venue Instagram reels |
| `venue_submissions` | New venue submissions |
| `venues` | Venue listings |

---

## Core Tables

### venues
Main venue/restaurant listings.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `owner_id` | uuid | YES | - |
| `name` | varchar(500) | NO | - |
| `slug` | varchar(500) | NO | - |
| `description` | text | YES | - |
| `description_ar` | text | YES | - |
| `cr_number` | varchar(50) | YES | - |
| `business_email` | varchar(255) | YES | - |
| `contact_name` | varchar(255) | YES | - |
| `contact_position` | varchar(100) | YES | - |
| `mobile` | varchar(50) | YES | - |
| `password_hash` | text | YES | - |
| `category` | varchar(100) | NO | - |
| `subcategories` | text[] | YES | - |
| `cuisine_types` | text[] | YES | - |
| `area` | varchar(100) | YES | - |
| `address` | text | YES | - |
| `latitude` | numeric | YES | - |
| `longitude` | numeric | YES | - |
| `google_maps_url` | text | YES | - |
| `phone` | varchar(50) | YES | - |
| `email` | varchar(255) | YES | - |
| `website` | text | YES | - |
| `whatsapp` | varchar(50) | YES | - |
| `instagram` | varchar(100) | YES | - |
| `facebook` | text | YES | - |
| `tiktok` | varchar(100) | YES | - |
| `twitter` | varchar(100) | YES | - |
| `logo_url` | text | YES | - |
| `cover_image_url` | text | YES | - |
| `gallery` | text[] | YES | - |
| `opening_hours` | jsonb | YES | - |
| `price_range` | integer | YES | - |
| `avg_cost_per_person` | varchar(50) | YES | - |
| `features` | text[] | YES | - |
| `status` | varchar(20) | YES | 'pending' |
| `rejection_reason` | text | YES | - |
| `is_verified` | boolean | YES | false |
| `is_featured` | boolean | YES | false |
| `is_hidden` | boolean | YES | false |
| `view_count` | integer | YES | 0 |
| `like_count` | integer | YES | 0 |
| `booking_url` | text | YES | - |
| `menu_url` | text | YES | - |
| `youtube_url` | text | YES | - |
| `featured_reel_url` | text | YES | - |
| `cr_verified` | boolean | YES | false |
| `terms_accepted` | boolean | YES | false |
| `terms_accepted_at` | timestamptz | YES | - |
| `content_guidelines_accepted` | boolean | YES | false |
| `registration_ip` | varchar(50) | YES | - |
| `registration_user_agent` | text | YES | - |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |
| `approved_at` | timestamptz | YES | - |
| `reviewed_by` | uuid | YES | - |
| `reviewed_at` | timestamptz | YES | - |

**Foreign Keys:**
- `owner_id` → `users.id`

---

### events
Event listings (scraped + manual).

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `title` | text | NO | - |
| `slug` | text | YES | - |
| `description` | text | YES | - |
| `description_ar` | text | YES | - |
| `category` | text | YES | - |
| `tags` | text[] | YES | - |
| `venue_name` | text | YES | - |
| `venue_address` | text | YES | - |
| `venue_id` | uuid | YES | - |
| `venue_lat` | numeric | YES | - |
| `venue_lng` | numeric | YES | - |
| `venue_place_id` | text | YES | - |
| `google_maps_link` | text | YES | - |
| `date` | date | NO | - |
| `time` | text | YES | - |
| `end_date` | date | YES | - |
| `end_time` | text | YES | - |
| `start_date` | date | YES | - |
| `start_time` | time | YES | - |
| `price` | text | YES | - |
| `price_min` | numeric | YES | - |
| `price_max` | numeric | YES | - |
| `price_currency` | text | YES | 'BHD' |
| `cover_url` | text | YES | - |
| `image_url` | text | YES | - |
| `thumbnail` | text | YES | - |
| `banner_url` | text | YES | - |
| `featured_image` | text | YES | - |
| `gallery_urls` | text[] | YES | - |
| `gallery` | text[] | YES | - |
| `booking_url` | text | YES | - |
| `booking_link` | text | YES | - |
| `booking_method` | text | YES | - |
| `affiliate_url` | text | YES | - |
| `original_url` | text | YES | - |
| `source` | text | YES | - |
| `source_url` | text | YES | - |
| `source_name` | text | YES | - |
| `source_event_id` | text | YES | - |
| `contact_name` | text | YES | - |
| `contact_email` | text | YES | - |
| `contact_phone` | text | YES | - |
| `age_restriction` | text | YES | - |
| `dress_code` | text | YES | - |
| `special_instructions` | text | YES | - |
| `is_recurring` | boolean | YES | false |
| `recurrence_pattern` | text | YES | - |
| `recurrence_days` | text[] | YES | - |
| `status` | text | YES | 'pending' |
| `rejection_reason` | text | YES | - |
| `is_featured` | boolean | YES | false |
| `is_hidden` | boolean | YES | false |
| `is_active` | boolean | YES | true |
| `is_sold_out` | boolean | YES | false |
| `views` | integer | YES | 0 |
| `view_count` | integer | YES | 0 |
| `country` | varchar(100) | YES | 'Bahrain' |
| `city` | varchar(200) | YES | - |
| `promotion_start_date` | date | YES | - |
| `promotion_end_date` | date | YES | - |
| `published_at` | timestamptz | YES | - |
| `last_scraped_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

**Foreign Keys:**
- `venue_id` → `venues.id`

---

### movies
Cinema movie listings.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `tmdb_id` | integer | YES | - |
| `title` | text | NO | - |
| `slug` | text | NO | - |
| `poster_url` | text | YES | - |
| `poster_path` | text | YES | - |
| `backdrop_url` | text | YES | - |
| `backdrop_path` | text | YES | - |
| `duration_minutes` | integer | YES | - |
| `runtime` | integer | YES | - |
| `genre` | text[] | YES | - |
| `genres` | text[] | YES | - |
| `rating` | text | YES | - |
| `tmdb_rating` | numeric | YES | - |
| `popularity` | numeric | YES | - |
| `synopsis` | text | YES | - |
| `overview` | text | YES | - |
| `release_date` | date | YES | - |
| `trailer_url` | text | YES | - |
| `trailer_key` | text | YES | - |
| `language` | text | YES | 'English' |
| `director` | text | YES | - |
| `movie_cast` | text[] | YES | - |
| `is_now_showing` | boolean | YES | false |
| `is_coming_soon` | boolean | YES | false |
| `is_scraped` | boolean | YES | false |
| `display_order` | integer | YES | 0 |
| `cinema_source` | text | YES | - |
| `cinema_source_id` | text | YES | - |
| `mukta_status` | text | YES | - |
| `scraped_from` | text[] | YES | - |
| `last_scraped` | timestamptz | YES | - |
| `last_synced_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

### cinemas
Cinema locations.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `name` | text | NO | - |
| `slug` | text | NO | - |
| `location` | text | YES | - |
| `area` | text | YES | - |
| `logo_url` | text | YES | - |
| `website` | text | YES | - |
| `phone` | text | YES | - |
| `booking_url` | text | YES | - |
| `has_imax` | boolean | YES | false |
| `has_vip` | boolean | YES | false |
| `has_4dx` | boolean | YES | false |
| `has_dolby` | boolean | YES | false |
| `is_active` | boolean | YES | true |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

### showtimes
Movie showtimes.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `movie_id` | uuid | YES | - |
| `cinema_id` | uuid | YES | - |
| `showtime` | timestamptz | YES | - |
| `format` | text | YES | - |
| `language` | text | YES | - |
| `screen_number` | text | YES | - |
| `booking_url` | text | YES | - |
| `price_standard` | numeric | YES | - |
| `price_vip` | numeric | YES | - |
| `is_active` | boolean | YES | - |
| `created_at` | timestamptz | YES | - |

**Foreign Keys:**
- `movie_id` → `movies.id`
- `cinema_id` → `cinemas.id`

---

### artists
Entertainment artists for booking.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `stage_name` | text | NO | - |
| `real_name` | text | YES | - |
| `slug` | text | NO | - |
| `category` | artist_category | NO | - |
| `subcategory` | text | YES | - |
| `tier` | artist_tier | NO | 'bahrainnights_exclusive' |
| `status` | artist_status | NO | 'pending' |
| `bio` | text | YES | - |
| `short_description` | text | YES | - |
| `profile_image` | text | YES | - |
| `gallery_images` | text[] | YES | - |
| `video_url` | text | YES | - |
| `instagram_handle` | text | YES | - |
| `instagram_verified` | boolean | NO | false |
| `rate_per_hour` | numeric | YES | - |
| `rate_per_event` | numeric | YES | - |
| `rate_notes` | text | YES | - |
| `currency` | text | NO | 'BHD' |
| `is_featured` | boolean | NO | false |
| `display_order` | integer | NO | 0 |
| `rejection_reason` | text | YES | - |
| `admin_notes` | text | YES | - |
| `submitted_email` | text | YES | - |
| `submitted_phone` | text | YES | - |
| `created_at` | timestamptz | NO | now() |
| `updated_at` | timestamptz | NO | now() |

**Enums:**
- `artist_category`: dj, vocalist, instrumentalist, band, fire_show, performer, kids_entertainment, magician
- `artist_tier`: vibes, bahrainnights_exclusive
- `artist_status`: pending, approved, rejected, suspended

---

### attractions
Tourist attractions and activities.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | uuid_generate_v4() |
| `name` | text | NO | - |
| `name_arabic` | text | YES | - |
| `slug` | text | YES | - |
| `description` | text | YES | - |
| `description_arabic` | text | YES | - |
| `short_description` | text | YES | - |
| `category` | text | YES | - |
| `subcategory` | text | YES | - |
| `tags` | text[] | YES | - |
| `address` | text | YES | - |
| `area` | text | YES | - |
| `latitude` | numeric | YES | - |
| `longitude` | numeric | YES | - |
| `google_maps_url` | text | YES | - |
| `image_url` | text | YES | - |
| `images` | text[] | YES | - |
| `video_url` | text | YES | - |
| `duration` | text | YES | - |
| `best_time` | text | YES | - |
| `price_range` | text | YES | - |
| `price_from` | numeric | YES | - |
| `price_to` | numeric | YES | - |
| `currency` | text | YES | 'BHD' |
| `suitable_for` | text[] | YES | - |
| `age_restriction` | text | YES | - |
| `accessibility` | text | YES | - |
| `phone` | text | YES | - |
| `email` | text | YES | - |
| `website` | text | YES | - |
| `booking_url` | text | YES | - |
| `rating` | numeric | YES | - |
| `review_count` | integer | YES | 0 |
| `tripadvisor_rating` | numeric | YES | - |
| `tripadvisor_reviews` | integer | YES | - |
| `tripadvisor_url` | text | YES | - |
| `source` | text | YES | 'manual' |
| `source_id` | text | YES | - |
| `is_featured` | boolean | YES | false |
| `is_active` | boolean | YES | true |
| `display_order` | integer | YES | 0 |
| `seo_title` | text | YES | - |
| `seo_description` | text | YES | - |
| `image_position_x` | integer | YES | 50 |
| `image_position_y` | integer | YES | 50 |
| `image_scale` | numeric | YES | 1 |
| `created_at` | timestamp | YES | now() |
| `updated_at` | timestamp | YES | now() |

---

### experiences
Platinumlist experiences (affiliate).

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `title` | text | NO | - |
| `description` | text | YES | - |
| `price` | numeric | YES | - |
| `price_currency` | text | YES | 'BHD' |
| `image_url` | text | YES | - |
| `cover_url` | text | YES | - |
| `venue` | text | YES | - |
| `location` | text | YES | - |
| `category` | text | YES | - |
| `type` | text | NO | - |
| `original_url` | text | NO | - |
| `affiliate_url` | text | NO | - |
| `source` | text | YES | 'platinumlist' |
| `start_date` | timestamptz | YES | - |
| `end_date` | timestamptz | YES | - |
| `is_active` | boolean | YES | true |
| `is_sold_out` | boolean | YES | false |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

### tours
Tour listings.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | uuid_generate_v4() |
| `name` | text | NO | - |
| `name_arabic` | text | YES | - |
| `slug` | text | YES | - |
| `description` | text | YES | - |
| `description_arabic` | text | YES | - |
| `short_description` | text | YES | - |
| `tour_type` | text | YES | - |
| `category` | text | YES | - |
| `duration` | text | YES | - |
| `duration_hours` | numeric | YES | - |
| `group_size` | text | YES | - |
| `max_participants` | integer | YES | - |
| `languages` | text[] | YES | - |
| `price_from` | numeric | YES | - |
| `price_to` | numeric | YES | - |
| `price_per` | text | YES | - |
| `currency` | text | YES | 'BHD' |
| `includes` | text[] | YES | - |
| `excludes` | text[] | YES | - |
| `highlights` | text[] | YES | - |
| `itinerary` | jsonb | YES | - |
| `meeting_point` | text | YES | - |
| `end_point` | text | YES | - |
| `image_url` | text | YES | - |
| `images` | text[] | YES | - |
| `video_url` | text | YES | - |
| `areas_covered` | text[] | YES | - |
| `suitable_for` | text[] | YES | - |
| `difficulty_level` | text | YES | - |
| `accessibility` | text | YES | - |
| `rating` | numeric | YES | - |
| `review_count` | integer | YES | 0 |
| `tripadvisor_rating` | numeric | YES | - |
| `tripadvisor_reviews` | integer | YES | - |
| `tripadvisor_url` | text | YES | - |
| `provider_id` | uuid | YES | - |
| `provider_name` | text | YES | - |
| `source` | text | YES | 'manual' |
| `source_id` | text | YES | - |
| `is_featured` | boolean | YES | false |
| `is_active` | boolean | YES | true |
| `display_order` | integer | YES | 0 |
| `created_at` | timestamp | YES | now() |
| `updated_at` | timestamp | YES | now() |

---

### blog_articles
Blog and news articles.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `title` | text | YES | - |
| `slug` | text | YES | - |
| `excerpt` | text | YES | - |
| `content` | text | YES | - |
| `meta_title` | text | YES | - |
| `meta_description` | text | YES | - |
| `keywords` | text[] | YES | - |
| `country` | text | YES | - |
| `city` | text | YES | - |
| `category` | text | YES | - |
| `tags` | text[] | YES | - |
| `event_id` | uuid | YES | - |
| `venue_id` | uuid | YES | - |
| `featured_image` | text | YES | - |
| `images` | text[] | YES | - |
| `article_type` | text | YES | - |
| `status` | text | YES | - |
| `is_featured` | boolean | YES | - |
| `view_count` | integer | YES | - |
| `read_time_minutes` | integer | YES | - |
| `event_date` | date | YES | - |
| `event_end_date` | date | YES | - |
| `event_venue` | text | YES | - |
| `affiliate_url` | text | YES | - |
| `published_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

---

## Advertising Tables

### homepage_ads
Homepage advertising slots.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `advertiser_name` | varchar(255) | NO | - |
| `company_name` | varchar(255) | YES | - |
| `contact_email` | varchar(255) | NO | - |
| `contact_phone` | varchar(50) | YES | - |
| `title` | varchar(255) | YES | - |
| `subtitle` | varchar(255) | YES | - |
| `cta_text` | varchar(100) | YES | - |
| `image_url` | text | NO | - |
| `image_settings` | jsonb | YES | - |
| `target_url` | text | NO | - |
| `target_page` | varchar(50) | YES | 'homepage' |
| `placement` | varchar(50) | YES | 'slider' |
| `slot_position` | integer | YES | - |
| `start_date` | date | NO | - |
| `end_date` | date | NO | - |
| `price_bd` | numeric | YES | 0 |
| `payment_status` | varchar(20) | YES | 'pending' |
| `payment_date` | date | YES | - |
| `status` | varchar(20) | YES | 'pending' |
| `impressions` | integer | YES | 0 |
| `clicks` | integer | YES | 0 |
| `invoice_number` | varchar(50) | YES | - |
| `notes` | text | YES | - |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

### slider_ads
Slider advertisements.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `page` | varchar(50) | NO | - |
| `position` | integer | NO | - |
| `image_url` | text | NO | - |
| `s3_key` | text | YES | - |
| `link_url` | text | YES | - |
| `alt_text` | varchar(255) | YES | - |
| `advertiser_name` | varchar(255) | NO | - |
| `advertiser_email` | varchar(255) | YES | - |
| `advertiser_phone` | varchar(50) | YES | - |
| `price_paid` | numeric | NO | - |
| `start_date` | date | NO | - |
| `end_date` | date | NO | - |
| `status` | varchar(20) | YES | 'active' |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

## User & Auth Tables

### users
Admin users.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `email` | varchar(255) | NO | - |
| `name` | varchar(255) | YES | - |
| `avatar_url` | text | YES | - |
| `role` | varchar(50) | YES | 'user' |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

### public_users
Public user accounts (Google OAuth).

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `google_id` | varchar(100) | YES | - |
| `email` | varchar(255) | NO | - |
| `name` | varchar(255) | YES | - |
| `avatar_url` | text | YES | - |
| `is_blocked` | boolean | YES | false |
| `last_like_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | now() |
| `updated_at` | timestamptz | YES | now() |

---

### profiles
Admin profiles (Supabase Auth linked).

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `email` | text | YES | - |
| `full_name` | text | YES | - |
| `role` | text | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

---

## Analytics & Logging Tables

### page_views
Page view analytics.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `page_path` | text | YES | - |
| `page_type` | text | YES | - |
| `reference_id` | uuid | YES | - |
| `user_agent` | text | YES | - |
| `ip_hash` | text | YES | - |
| `referrer` | text | YES | - |
| `country` | text | YES | - |
| `country_code` | text | YES | - |
| `city` | text | YES | - |
| `created_at` | timestamptz | YES | - |

---

### agent_logs
Agent/scraper run logs.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `agent_name` | text | YES | - |
| `started_at` | timestamptz | YES | - |
| `completed_at` | timestamptz | YES | - |
| `items_found` | integer | YES | - |
| `items_processed` | integer | YES | - |
| `items_added` | integer | YES | - |
| `items_updated` | integer | YES | - |
| `errors` | jsonb | YES | - |
| `status` | text | YES | - |
| `metadata` | jsonb | YES | - |

---

### cinema_scraper_logs
Cinema scraper logs.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | gen_random_uuid() |
| `cinema_chain` | text | NO | - |
| `status` | text | NO | 'pending' |
| `movies_found` | integer | YES | 0 |
| `movies_updated` | integer | YES | 0 |
| `coming_soon_count` | integer | YES | 0 |
| `now_showing_count` | integer | YES | 0 |
| `error_message` | text | YES | - |
| `details` | jsonb | YES | - |
| `started_at` | timestamptz | YES | now() |
| `completed_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | now() |

---

## Prospects / CRM Tables

### prospects
Sales prospects/leads.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `company_name` | text | YES | - |
| `company_name_arabic` | text | YES | - |
| `industry` | text | YES | - |
| `website` | text | YES | - |
| `logo_url` | text | YES | - |
| `description` | text | YES | - |
| `contact_name` | text | YES | - |
| `contact_title` | text | YES | - |
| `contact_email` | text | YES | - |
| `contact_phone` | text | YES | - |
| `contact_linkedin` | text | YES | - |
| `source` | text | YES | - |
| `source_url` | text | YES | - |
| `source_screenshot` | text | YES | - |
| `ad_content` | text | YES | - |
| `ai_enriched` | boolean | YES | - |
| `ai_enriched_at` | timestamptz | YES | - |
| `ai_summary` | text | YES | - |
| `ai_suggested_approach` | text | YES | - |
| `estimated_budget` | text | YES | - |
| `relevance_score` | integer | YES | - |
| `industry_fit` | text | YES | - |
| `status` | text | YES | - |
| `priority` | text | YES | - |
| `assigned_to` | text | YES | - |
| `notes` | text | YES | - |
| `follow_up_date` | date | YES | - |
| `contacted_at` | timestamptz | YES | - |
| `first_seen_at` | timestamptz | YES | - |
| `last_seen_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

---

## Content Management Tables

### content_posts
Social media content posts.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `content_type` | text | YES | - |
| `instagram_account_id` | uuid | YES | - |
| `title` | text | YES | - |
| `caption` | text | YES | - |
| `body` | text | YES | - |
| `hashtags` | text[] | YES | - |
| `media_urls` | text[] | YES | - |
| `media_type` | text | YES | - |
| `reel_concept` | text | YES | - |
| `reel_hook` | text | YES | - |
| `reel_text_overlays` | text[] | YES | - |
| `reel_music_suggestions` | text[] | YES | - |
| `reel_duration` | text | YES | - |
| `reel_style` | text | YES | - |
| `story_type` | text | YES | - |
| `story_sticker_data` | jsonb | YES | - |
| `source_type` | text | YES | - |
| `source_id` | uuid | YES | - |
| `scheduled_for` | timestamptz | YES | - |
| `posted_at` | timestamptz | YES | - |
| `status` | text | YES | - |
| `seo_title` | text | YES | - |
| `seo_description` | text | YES | - |
| `seo_keywords` | text[] | YES | - |
| `slug` | text | YES | - |
| `instagram_post_id` | text | YES | - |
| `engagement` | jsonb | YES | - |
| `reviewed_at` | timestamptz | YES | - |
| `reviewed_by` | uuid | YES | - |
| `rejection_reason` | text | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

---

## SEO Tables

### seo_keywords
SEO keyword tracking.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `keyword` | text | YES | - |
| `search_volume` | integer | YES | - |
| `difficulty` | integer | YES | - |
| `priority` | text | YES | - |
| `target_pages` | text[] | YES | - |
| `current_ranking` | integer | YES | - |
| `last_checked` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

---

### seo_page_meta
SEO page metadata.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `page_path` | text | YES | - |
| `page_type` | text | YES | - |
| `title` | text | YES | - |
| `description` | text | YES | - |
| `keywords` | text[] | YES | - |
| `og_title` | text | YES | - |
| `og_description` | text | YES | - |
| `og_image` | text | YES | - |
| `canonical_url` | text | YES | - |
| `structured_data` | jsonb | YES | - |
| `last_optimized` | timestamptz | YES | - |
| `optimization_score` | integer | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

---

## Offers & Deals

### offers
Venue offers and deals.

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `venue_id` | uuid | YES | - |
| `created_by` | uuid | YES | - |
| `title` | text | YES | - |
| `slug` | text | YES | - |
| `description` | text | YES | - |
| `offer_type` | text | YES | - |
| `days_available` | text[] | YES | - |
| `start_time` | time | YES | - |
| `end_time` | time | YES | - |
| `valid_from` | date | YES | - |
| `valid_until` | date | YES | - |
| `is_ongoing` | boolean | YES | - |
| `whats_included` | text[] | YES | - |
| `terms_conditions` | text | YES | - |
| `reservation_required` | boolean | YES | - |
| `featured_image` | text | YES | - |
| `status` | text | YES | - |
| `view_count` | integer | YES | - |
| `created_at` | timestamptz | YES | - |
| `updated_at` | timestamptz | YES | - |

**Foreign Keys:**
- `venue_id` → `venues.id`

---

## Newsletter

### newsletter_subscribers

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| `id` | uuid | NO | - |
| `email` | text | YES | - |
| `status` | text | YES | - |
| `source` | text | YES | - |
| `subscribed_at` | timestamptz | YES | - |
| `unsubscribed_at` | timestamptz | YES | - |
| `resubscribed_at` | timestamptz | YES | - |
| `created_at` | timestamptz | YES | - |

---

## Key Relationships

```
venues
  ├── venue_images (1:n)
  ├── venue_reels (1:n)
  ├── venue_events (1:n)
  ├── venue_likes (1:n)
  ├── offers (1:n)
  ├── events (1:n via venue_id)
  └── owner_id → users.id

events
  └── venue_id → venues.id

movies
  ├── showtimes (1:n)
  ├── featured_trailers (1:n)
  └── cinema_featured_trailers (1:n)

showtimes
  ├── movie_id → movies.id
  └── cinema_id → cinemas.id

artists
  └── artist_booking_requests (1:n via assigned_artist_id)

public_users
  ├── venue_likes (1:n)
  └── like_rate_limits (1:n)

blog_articles
  ├── event_id → events.id
  └── venue_id → venues.id
```

---

## Notes

1. **Primary Keys:** All tables use UUID primary keys with `gen_random_uuid()` or `uuid_generate_v4()` defaults
2. **Timestamps:** Most tables have `created_at` and `updated_at` with `now()` defaults
3. **Soft Deletes:** Many tables use `is_active` or `is_hidden` flags instead of hard deletes
4. **Status Fields:** Common statuses: `pending`, `approved`, `rejected`, `active`, `inactive`
5. **Currency:** Default currency is `'BHD'` (Bahraini Dinar)
6. **Arrays:** PostgreSQL text arrays used for tags, features, images, etc.
7. **JSONB:** Used for flexible data like `opening_hours`, `image_settings`, `engagement`
