// Public column allowlists for the unauthenticated read APIs.
//
// Each list below is the set of columns a public route actually renders. The
// point is not that these columns are secret — it is that `select('*')` on a
// service-role client publishes whatever the table happens to contain, today
// and after the next migration. A column added to the table later (a
// `password_hash`, a `registration_ip`, an internal `reviewed_by`) becomes
// public with no code change and no review.
//
// Every column listed here was verified to exist against the production
// database schema.

// `events` — the submitter's contact details (contact_name, contact_email,
// contact_phone) are deliberately absent: they are captured from the "submit
// an event" form and are not part of the event listing.
export const PUBLIC_EVENT_FIELDS = [
  'id',
  'title',
  'slug',
  'description',
  'description_ar',
  'category',
  'venue_name',
  'venue_address',
  'venue_lat',
  'venue_lng',
  'date',
  'time',
  'start_date',
  'start_time',
  'end_date',
  'end_time',
  'price',
  'price_min',
  'price_max',
  'price_currency',
  'booking_method',
  'cover_url',
  'image_url',
  'thumbnail',
  'banner_url',
  'featured_image',
  'gallery',
  'gallery_urls',
  'is_featured',
  'is_hidden',
  'is_sold_out',
  'views',
  'view_count',
  'booking_url',
  'booking_link',
  'affiliate_url',
  'source_url',
  'source_name',
  'tags',
  'age_restriction',
  'dress_code',
  'special_instructions',
  'is_recurring',
  'recurrence_pattern',
  'recurrence_days',
  'country',
  'city',
  'created_at',
  'updated_at',
  'published_at',
] as const;

// `attractions`
export const PUBLIC_ATTRACTION_FIELDS = [
  'id',
  'name',
  'name_arabic',
  'slug',
  'description',
  'description_arabic',
  'short_description',
  'category',
  'subcategory',
  'tags',
  'address',
  'area',
  'latitude',
  'longitude',
  'google_maps_url',
  'image_url',
  'images',
  'video_url',
  'duration',
  'best_time',
  'price_range',
  'price_from',
  'price_to',
  'currency',
  'suitable_for',
  'age_restriction',
  'accessibility',
  'phone',
  'email',
  'website',
  'booking_url',
  'rating',
  'review_count',
  'tripadvisor_rating',
  'tripadvisor_reviews',
  'tripadvisor_url',
  'source',
  'source_id',
  'is_featured',
  'is_active',
  'display_order',
  'seo_title',
  'seo_description',
  'created_at',
  'updated_at',
  'image_position_x',
  'image_position_y',
  'image_scale',
] as const;

// `local_guides` — `email`, `phone` and `whatsapp` are deliberately absent:
// they are the guide's private contact details. A guide who applies is not
// consenting to have their phone number published to the internet.
export const PUBLIC_GUIDE_FIELDS = [
  'id',
  'name',
  'slug',
  'bio',
  'tagline',
  'profile_image',
  'cover_image',
  'languages',
  'specialties',
  'areas',
  'years_experience',
  'available_days',
  'tour_types',
  'hourly_rate',
  'half_day_rate',
  'full_day_rate',
  'currency',
  'is_verified',
  'id_verified',
  'rating',
  'review_count',
  'is_active',
  'is_featured',
  'registered_at',
  'last_active',
  'created_at',
  'updated_at',
] as const;

// `cinemas`
export const PUBLIC_CINEMA_FIELDS = [
  'id',
  'name',
  'slug',
  'location',
  'area',
  'logo_url',
  'website',
  'phone',
  'booking_url',
  'has_imax',
  'has_vip',
  'has_4dx',
  'has_dolby',
  'is_active',
  'created_at',
  'updated_at',
] as const;

// `movies`
export const PUBLIC_MOVIE_FIELDS = [
  'id',
  'tmdb_id',
  'title',
  'slug',
  'poster_url',
  'backdrop_url',
  'duration_minutes',
  'genre',
  'genres',
  'rating',
  'tmdb_rating',
  'synopsis',
  'overview',
  'release_date',
  'trailer_url',
  'trailer_key',
  'language',
  'director',
  'movie_cast',
  'is_now_showing',
  'is_coming_soon',
  'display_order',
  'created_at',
  'updated_at',
  'last_scraped',
  'scraped_from',
  'backdrop_path',
  'poster_path',
  'runtime',
  'popularity',
  'cinema_source',
  'cinema_source_id',
  'last_synced_at',
  'mukta_status',
  'is_scraped',
] as const;

// `blog_articles`
export const PUBLIC_BLOG_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'content',
  'meta_title',
  'meta_description',
  'keywords',
  'country',
  'city',
  'category',
  'tags',
  'event_id',
  'venue_id',
  'featured_image',
  'images',
  'article_type',
  'status',
  'is_featured',
  'view_count',
  'read_time_minutes',
  'created_at',
  'updated_at',
  'published_at',
  'event_date',
  'event_end_date',
  'event_venue',
  'affiliate_url',
] as const;

// `agent_logs` — `errors` and `metadata` are deliberately absent. They carry
// internal error text and pipeline metadata that the public status endpoint
// has no reason to publish.
export const PUBLIC_AGENT_LOG_FIELDS = [
  'id',
  'agent_name',
  'started_at',
  'completed_at',
  'items_found',
  'items_processed',
  'items_added',
  'items_updated',
  'status',
] as const;

// `artists` — `real_name` (the performer's legal name), `submitted_email`,
// `submitted_phone` (the applicant's contact details), `rate_notes` and
// `admin_notes` are deliberately absent. The public artist pages render the
// stage name and the profile; the applicant's own contact details and the
// internal review notes are not theirs to publish.
export const PUBLIC_ARTIST_FIELDS = [
  'id',
  'status',
  'tier',
  'stage_name',
  'slug',
  'category',
  'subcategory',
  'bio',
  'short_description',
  'profile_image',
  'gallery_images',
  'video_url',
  'instagram_handle',
  'instagram_verified',
  'is_featured',
  'display_order',
  'created_at',
  'updated_at',
] as const;

export const PUBLIC_EVENT_SELECT = PUBLIC_EVENT_FIELDS.join(',');

/**
 * THE EVENTS LISTING PAGE'S SELECT.
 *
 * `PUBLIC_EVENT_SELECT` is the full public event - 52 columns - and it is
 * right for the detail page, which renders the description, the gallery and
 * the accessibility fields.
 *
 * The LISTING page renders a card: the title, the image, the category, the
 * venue, the dates, the time, the price, the sold-out flag, the featured
 * flag and the booking link. It does NOT render the gallery, the gallery
 * URLs, the special instructions, the age restriction, the dress code, the
 * tags, the Arabic description, the thumbnail, the banner, the price
 * range, the view counters or the timestamps.
 *
 * All of those were being fetched and serialised for every event on the
 * page, for nothing.
 *
 * `description` IS kept: the page searches on it, and the ItemList JSON-LD
 * uses it.
 */
export const PUBLIC_EVENT_LISTING_FIELDS = [
  'id',
  'title',
  'slug',
  'description',
  'category',
  'venue_name',
  'venue_address',
  'date',
  'time',
  'start_date',
  'end_date',
  /*
   * The real INSTANTS. The listing filter is `end_at > now()`, and the
   * period chips compare against these, so they must travel with the
   * event. `is_overnight` tells the card not to print a two-day range for
   * a one-night event.
   */
  'starts_at',
  'end_at',
  'is_overnight',
  'price',
  'price_currency',
  'booking_method',
  'cover_url',
  'image_url',
  'featured_image',
  'is_featured',
  'is_sold_out',
  'booking_url',
  'affiliate_url',
  'source_url',
] as const;

export const PUBLIC_EVENT_LISTING_SELECT = PUBLIC_EVENT_LISTING_FIELDS.join(',');

/**
 * The event DETAIL page needs three columns that the listing pages do not:
 *
 *   - `venue_id`      — to resolve the linked venue row
 *   - `contact_phone` — public fallback for the venue phone when the event has
 *   - `contact_email` — no linked venue row
 *
 * These are the contact details the person who submitted the event gave for
 * the organiser to be reachable about that event, and the detail page renders
 * them as the event's public contact. They are deliberately NOT in
 * `PUBLIC_EVENT_FIELDS`, because the listing pages and the public events API
 * do not render them and must not publish every submitters' contact details
 * in bulk.
 *
 * This list is used ONLY by `src/app/events/[slug]/page.tsx`.
 */
export const PUBLIC_EVENT_DETAIL_FIELDS = [
  ...PUBLIC_EVENT_FIELDS,
  'venue_id',
  'contact_phone',
  'contact_email',
] as const;

export const PUBLIC_EVENT_DETAIL_SELECT = PUBLIC_EVENT_DETAIL_FIELDS.join(',');
export const PUBLIC_ATTRACTION_SELECT = PUBLIC_ATTRACTION_FIELDS.join(',');

/**
 * THE EVENTS LISTING PAGE'S ATTRACTION SELECT.
 *
 * The listing page used `select('*')` on the `attractions` table, which
 * pulls every column including the long description blobs and the
 * description_arabic column - for a card that shows a name, a picture, an
 * area, a price and a rating.
 */
export const PUBLIC_ATTRACTION_LISTING_FIELDS = [
  'id',
  'name',
  'slug',
  'description',
  'image_url',
  'area',
  'price_from',
  'price_range',
  'tripadvisor_rating',
  'rating',
  'duration',
  'suitable_for',
  'tags',
  'is_featured',
] as const;

export const PUBLIC_ATTRACTION_LISTING_SELECT = PUBLIC_ATTRACTION_LISTING_FIELDS.join(',');
export const PUBLIC_GUIDE_SELECT = PUBLIC_GUIDE_FIELDS.join(',');
export const PUBLIC_CINEMA_SELECT = PUBLIC_CINEMA_FIELDS.join(',');
export const PUBLIC_MOVIE_SELECT = PUBLIC_MOVIE_FIELDS.join(',');
export const PUBLIC_BLOG_SELECT = PUBLIC_BLOG_FIELDS.join(',');
export const PUBLIC_AGENT_LOG_SELECT = PUBLIC_AGENT_LOG_FIELDS.join(',');
export const PUBLIC_ARTIST_SELECT = PUBLIC_ARTIST_FIELDS.join(',');

// `venues` — the venue row contains the OWNER's account credentials and the
// registrant's identity. `password_hash` is the bcrypt digest of the venue
// owner's password; `cr_number` is the venue's Bahrain Commercial
// Registration number; `registration_ip` / `registration_user_agent` are the
// registrant's IP address and browser string; `owner_id` links to the
// authenticated owner; `terms_accepted` / `reviewed_by` / `membership_notes`
// are internal bookkeeping.
//
// The `public/venues` API was fixed in #72, but the RSC path
// (`getApprovedVenues` / `getVenueBySlug`) was NOT — so the same columns
// were still published in the HTML of every public venue detail page.
//
// The list itself lives in `public-venue-fields.ts` (merged in #72) so that
// the API routes and the RSC path share ONE definition. It is re-exported
// here rather than duplicated: two copies of an allowlist drift apart, and a
// drifted allowlist is a silent re-open of the leak it was meant to close.
export { PUBLIC_VENUE_FIELDS, PUBLIC_VENUE_SELECT } from '@/lib/public-venue-fields';
