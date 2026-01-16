/**
 * Shared opening hours utilities
 * Used across PlaceCard, PlaceHours, and other components
 */

export type OpeningHoursEntry = { open: string; close: string } | 'closed';
export type OpeningHours = Record<string, OpeningHoursEntry>;

export const DAY_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export const DAY_LABELS: Record<string, string> = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
};

/**
 * Get today's day name
 */
export function getTodayName(): string {
  return DAY_ORDER[new Date().getDay()];
}

/**
 * Check if a venue is currently open based on opening hours
 */
export function isOpenNow(openingHours: OpeningHours): boolean {
  const now = new Date();
  const today = DAY_ORDER[now.getDay()];
  const hours = openingHours[today];

  if (!hours || hours === 'closed') return false;
  if (!hours.open || !hours.close) return false;

  const currentTime = now.getHours() * 100 + now.getMinutes();
  const openTime = parseInt(hours.open.replace(':', ''));
  const closeTime = parseInt(hours.close.replace(':', ''));

  if (isNaN(openTime) || isNaN(closeTime)) return false;

  // Handle venues that close after midnight
  if (closeTime < openTime) {
    return currentTime >= openTime || currentTime <= closeTime;
  }

  return currentTime >= openTime && currentTime <= closeTime;
}

/**
 * Format time string to 12-hour format (e.g., "14:30" -> "2:30 PM")
 */
export function formatTime(time: string): string {
  if (!time || !time.includes(':')) return 'N/A';
  const [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return 'N/A';
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format opening hours entry to display string
 */
export function formatHours(hours: OpeningHoursEntry | undefined): string {
  if (!hours || hours === 'closed') return 'Closed';
  if (!hours.open || !hours.close) return 'Hours not set';
  return `${formatTime(hours.open)} - ${formatTime(hours.close)}`;
}

/**
 * Get today's opening hours
 */
export function getTodayHours(openingHours: OpeningHours): OpeningHoursEntry | undefined {
  const today = getTodayName();
  return openingHours[today];
}
