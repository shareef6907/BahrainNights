// Public venue fields.
//
// The public venues API selects from the `venues` table with the service-role
// client, so `select('*')` returns every column in the table — including
// `password_hash` (the bcrypt digest of the venue owner's password),
// `owner_id`, `registration_ip`, `registration_user_agent` and the internal
// `terms_accepted` / `reviewed_by` bookkeeping columns.
//
// None of those belong in an unauthenticated JSON response. Listing the
// columns explicitly keeps the response limited to the fields the frontend
// actually renders, and means a column added to the table later is not
// published by default.
//
// Every column below was verified to exist against the production database.
// `cover_url`, `tripadvisor_rating`, `highlights`, `badges` and `price` are
// referenced by frontend components but DO NOT exist in the production table,
// so they are deliberately absent here.
export const PUBLIC_VENUE_FIELDS = [
  'id',
  'name',
  'slug',
  'description',
  'description_ar',
  'category',
  'subcategories',
  'cuisine_types',
  'area',
  'address',
  'latitude',
  'longitude',
  'google_maps_url',
  'phone',
  'email',
  'website',
  'whatsapp',
  'instagram',
  'facebook',
  'tiktok',
  'twitter',
  'logo_url',
  'cover_image_url',
  'gallery',
  'opening_hours',
  'price_range',
  'avg_cost_per_person',
  'features',
  'status',
  'is_verified',
  'is_featured',
  'view_count',
  'like_count',
  'created_at',
  'updated_at',
  'approved_at',
  'booking_url',
  'cr_verified',
  'menu_url',
  'is_hidden',
  'youtube_url',
  'featured_reel_url',
  'membership_tier',
] as const;

export const PUBLIC_VENUE_SELECT = PUBLIC_VENUE_FIELDS.join(',');
