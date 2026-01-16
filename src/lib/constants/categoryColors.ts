/**
 * Shared category colors for venues/places
 * Used across PlaceCard, SimilarPlaces, TrendingPlaces, etc.
 */

export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  restaurant: { bg: 'bg-orange-500', text: 'text-orange-500' },
  cafe: { bg: 'bg-amber-600', text: 'text-amber-600' },
  lounge: { bg: 'bg-purple-500', text: 'text-purple-500' },
  bar: { bg: 'bg-blue-500', text: 'text-blue-500' },
  nightclub: { bg: 'bg-pink-500', text: 'text-pink-500' },
  'beach-club': { bg: 'bg-cyan-500', text: 'text-cyan-500' },
};

export const CATEGORY_LABELS: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  lounge: 'Lounge',
  bar: 'Bar',
  nightclub: 'Nightclub',
  'beach-club': 'Beach Club',
};

/**
 * Get category background color class
 */
export function getCategoryBgColor(category: string): string {
  return CATEGORY_COLORS[category]?.bg || 'bg-gray-500';
}

/**
 * Get category text color class
 */
export function getCategoryTextColor(category: string): string {
  return CATEGORY_COLORS[category]?.text || 'text-gray-500';
}

/**
 * Get category display label
 */
export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category.replace('-', ' ');
}
