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

/**
 * Every column in the `venues` table EXCEPT `password_hash`.
 *
 * Used by the admin-scoped readers (`getVenues`, `getVenueById`,
 * `getVenueByOwnerId`) and by the venue-portal profile route.
 *
 * `password_hash` is deliberately excluded even from the ADMIN read paths.
 * The bcrypt digest is needed by exactly two code paths — registration
 * writes it, and the portal login reads it with its own explicit column
 * list — and by no UI. No component in the codebase reads
 * `venue.password_hash` (verified by grep across `src/components` and
 * `src/app/admin`). Returning it in an admin or venue-portal JSON response
 * therefore has no upside and two downsides: it puts a credential digest
 * into browser memory, browser devtools, and any response logging in
 * between; and it means that if an admin route is ever mounted publicly by
 * mistake, the leak is a credential rather than a name and a phone number.
 *
 * Column list verified against the production table (62 columns; this list
 * is the 61 that are not `password_hash`).
 */
export const ADMIN_VENUE_FIELDS = [
  ...PUBLIC_VENUE_FIELDS,
  'business_email',
  'contact_name',
  'contact_position',
  'mobile',
  'cr_number',
  'owner_id',
  'registration_ip',
  'registration_user_agent',
  'rejection_reason',
  'reviewed_at',
  'reviewed_by',
  'terms_accepted',
  'terms_accepted_at',
  'content_guidelines_accepted',
  'membership_amount',
  'membership_start',
  'membership_end',
  'membership_notes',
] as const;

export const ADMIN_VENUE_SELECT = ADMIN_VENUE_FIELDS.join(',');
