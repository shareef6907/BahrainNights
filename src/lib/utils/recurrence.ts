/**
 * Recurrence Utility Functions
 * Handles recurring event/offer logic
 */

import { WeekDay, WEEKDAYS, RecurrenceType } from '@/types/recurrence';

/**
 * Get the next occurrence date for a recurring event/offer
 * @param recurrenceDays - Array of days the event occurs (e.g., ['Wednesday', 'Friday'])
 * @param fromDate - Starting date to search from (defaults to today)
 * @returns Date object of next occurrence, or null if no valid days
 */
export function getNextOccurrence(
  recurrenceDays: WeekDay[],
  fromDate: Date = new Date()
): Date | null {
  if (!recurrenceDays || recurrenceDays.length === 0) {
    return null;
  }

  // Get the day indices (0 = Sunday, 1 = Monday, etc.)
  const targetDayIndices = recurrenceDays.map((day) => WEEKDAYS.indexOf(day));

  const today = new Date(fromDate);
  today.setHours(0, 0, 0, 0);

  // Check today and the next 7 days to find the next occurrence
  for (let i = 0; i <= 7; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    const dayOfWeek = checkDate.getDay();

    if (targetDayIndices.includes(dayOfWeek)) {
      return checkDate;
    }
  }

  return null;
}

/**
 * Format recurrence pattern for display
 * @param recurrenceType - Type of recurrence (one-time, weekly, monthly)
 * @param recurrenceDays - Array of days
 * @param options - Formatting options
 * @returns Human-readable string like "Every Wednesday" or "Every Mon, Wed, Fri"
 */
export function formatRecurrence(
  recurrenceType: RecurrenceType | string | null,
  recurrenceDays: WeekDay[] | string[] | null,
  options?: { short?: boolean; includePrefix?: boolean }
): string {
  const { short = false, includePrefix = true } = options || {};

  if (!recurrenceType || recurrenceType === 'one-time') {
    return '';
  }

  if (!recurrenceDays || recurrenceDays.length === 0) {
    return includePrefix ? 'Recurring' : '';
  }

  const prefix = includePrefix ? 'Every ' : '';

  // Sort days by their index in the week
  const sortedDays = [...recurrenceDays].sort(
    (a, b) => WEEKDAYS.indexOf(a as WeekDay) - WEEKDAYS.indexOf(b as WeekDay)
  );

  if (sortedDays.length === 7) {
    return includePrefix ? 'Every day' : 'Daily';
  }

  if (sortedDays.length === 1) {
    return `${prefix}${short ? sortedDays[0].slice(0, 3) : sortedDays[0]}`;
  }

  // Check for weekdays (Mon-Fri)
  const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if (
    sortedDays.length === 5 &&
    weekdayNames.every((day) => sortedDays.includes(day))
  ) {
    return includePrefix ? 'Weekdays' : 'Mon-Fri';
  }

  // Check for weekends (Sat-Sun)
  const weekendNames = ['Saturday', 'Sunday'];
  if (
    sortedDays.length === 2 &&
    weekendNames.every((day) => sortedDays.includes(day))
  ) {
    return includePrefix ? 'Weekends' : 'Sat-Sun';
  }

  // Multiple specific days
  const dayNames = sortedDays.map((day) =>
    short ? (day as string).slice(0, 3) : day
  );

  if (dayNames.length === 2) {
    return `${prefix}${dayNames[0]} & ${dayNames[1]}`;
  }

  // More than 2 days: "Mon, Wed, Fri"
  return `${prefix}${dayNames.join(', ')}`;
}

/**
 * Check if a recurring event/offer is active today
 * @param recurrenceDays - Array of days the event/offer is available
 * @param validFrom - Start date of the promotion period (optional)
 * @param validUntil - End date of the promotion period (optional)
 * @returns Boolean indicating if active today
 */
export function isActiveToday(
  recurrenceDays: WeekDay[] | string[] | null,
  validFrom?: string | null,
  validUntil?: string | null
): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check date range validity
  if (validFrom) {
    const startDate = new Date(validFrom);
    startDate.setHours(0, 0, 0, 0);
    if (today < startDate) {
      return false;
    }
  }

  if (validUntil) {
    const endDate = new Date(validUntil);
    endDate.setHours(23, 59, 59, 999);
    if (today > endDate) {
      return false;
    }
  }

  // If no specific days, assume always active (within date range)
  if (!recurrenceDays || recurrenceDays.length === 0) {
    return true;
  }

  // Check if today's day is in the recurrence days
  const todayDayName = WEEKDAYS[today.getDay()];
  return recurrenceDays.includes(todayDayName);
}

/**
 * Get today's day name
 * @returns Current day name (e.g., 'Wednesday')
 */
export function getTodayDayName(): WeekDay {
  return WEEKDAYS[new Date().getDay()];
}

/**
 * Check if an event/offer is happening on a specific day
 * @param recurrenceDays - Array of days
 * @param dayName - Day to check
 * @returns Boolean
 */
export function isActiveOnDay(
  recurrenceDays: WeekDay[] | string[] | null,
  dayName: WeekDay
): boolean {
  if (!recurrenceDays || recurrenceDays.length === 0) {
    return false;
  }
  return recurrenceDays.includes(dayName);
}

/**
 * Format date range for display
 * @param validFrom - Start date
 * @param validUntil - End date
 * @returns Formatted string like "Jan 1 - Mar 31, 2025"
 */
export function formatDateRange(
  validFrom?: string | null,
  validUntil?: string | null
): string {
  if (!validFrom && !validUntil) {
    return 'Ongoing';
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (validFrom && validUntil) {
    return `${formatDate(validFrom)} - ${formatDate(validUntil)}`;
  }

  if (validFrom) {
    return `From ${formatDate(validFrom)}`;
  }

  if (validUntil) {
    return `Until ${formatDate(validUntil)}`;
  }

  return 'Ongoing';
}

/**
 * Generate badge text for recurrence display
 * @param isRecurring - Whether the event/offer is recurring
 * @param recurrenceType - Type of recurrence
 * @param recurrenceDays - Days of recurrence
 * @param isOngoing - Whether it's ongoing (no end date)
 * @returns Object with badge text and type for styling
 */
export function getRecurrenceBadge(
  isRecurring: boolean,
  recurrenceType: RecurrenceType | string | null,
  recurrenceDays: WeekDay[] | string[] | null,
  isOngoing?: boolean
): { text: string; type: 'recurring' | 'ongoing' | 'limited' | 'none' } {
  if (!isRecurring && !isOngoing) {
    return { text: '', type: 'none' };
  }

  const formattedText = formatRecurrence(recurrenceType, recurrenceDays, {
    short: true,
  });

  if (isOngoing) {
    return {
      text: formattedText || 'Ongoing',
      type: 'ongoing',
    };
  }

  return {
    text: formattedText || 'Recurring',
    type: 'recurring',
  };
}

/**
 * Parse recurrence days from database format
 * Database might store as string array or JSON string
 */
export function parseRecurrenceDays(
  days: string[] | string | null
): WeekDay[] {
  if (!days) {
    return [];
  }

  if (typeof days === 'string') {
    try {
      return JSON.parse(days) as WeekDay[];
    } catch {
      return [];
    }
  }

  return days as WeekDay[];
}
