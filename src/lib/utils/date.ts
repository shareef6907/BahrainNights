/**
 * Date utilities for BahrainNights
 * All dates should be handled in Bahrain timezone (Asia/Bahrain, GMT+3)
 */

// Bahrain timezone
export const BAHRAIN_TIMEZONE = 'Asia/Bahrain';

/**
 * Parse a date string safely, treating date-only strings as local Bahrain time (not UTC).
 * This prevents the "day shift" issue where "2025-02-15" becomes Feb 14 in some timezones.
 */
export function parseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  
  try {
    // If it's just a date (YYYY-MM-DD), parse it as local date to avoid UTC conversion issues
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split('-').map(Number);
      // Create date in local time (not UTC)
      return new Date(year, month - 1, day);
    }
    
    // If it's an ISO string with time/timezone, parse normally
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
}

/**
 * Parse time string (HH:MM or HH:MM:SS) and return hours and minutes
 */
export function parseTime(timeStr: string | null | undefined): { hours: number; minutes: number } | null {
  if (!timeStr) return null;
  
  try {
    const parts = timeStr.split(':');
    if (parts.length < 2) return null;
    
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    
    if (isNaN(hours) || isNaN(minutes)) return null;
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    
    return { hours, minutes };
  } catch {
    return null;
  }
}

/**
 * Format a date for display in Bahrain locale
 */
export function formatDate(
  dateStr: string | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string | null {
  const date = parseDate(dateStr);
  if (!date) return null;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: BAHRAIN_TIMEZONE,
  };
  
  return date.toLocaleDateString('en-BH', options || defaultOptions);
}

/**
 * Format a date in short format (e.g., "Feb 15, 2025")
 */
export function formatDateShort(dateStr: string | null | undefined): string | null {
  return formatDate(dateStr, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: BAHRAIN_TIMEZONE,
  });
}

/**
 * Format a date in compact format (e.g., "15 Feb")
 */
export function formatDateCompact(dateStr: string | null | undefined): string | null {
  return formatDate(dateStr, {
    month: 'short',
    day: 'numeric',
    timeZone: BAHRAIN_TIMEZONE,
  });
}

/**
 * Format time for display (e.g., "7:30 PM")
 */
export function formatTime(timeStr: string | null | undefined): string | null {
  const time = parseTime(timeStr);
  if (!time) return null;
  
  const { hours, minutes } = time;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${displayHour}:${displayMinutes} ${ampm}`;
}

/**
 * Check if an event date is in the past (event has already occurred)
 */
export function isEventPast(
  dateStr: string | null | undefined,
  timeStr?: string | null
): boolean {
  const date = parseDate(dateStr);
  if (!date) return false;
  
  const now = new Date();
  
  // If we have a time, set it on the date
  if (timeStr) {
    const time = parseTime(timeStr);
    if (time) {
      date.setHours(time.hours, time.minutes, 0, 0);
    }
  } else {
    // If no time, consider end of day (23:59:59)
    date.setHours(23, 59, 59, 999);
  }
  
  return date < now;
}

/**
 * Check if an event is happening today
 */
export function isEventToday(dateStr: string | null | undefined): boolean {
  const date = parseDate(dateStr);
  if (!date) return false;
  
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * Check if an event is happening this week
 */
export function isEventThisWeek(dateStr: string | null | undefined): boolean {
  const date = parseDate(dateStr);
  if (!date) return false;
  
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return date >= startOfWeek && date <= endOfWeek;
}

/**
 * Get a relative date label (Today, Tomorrow, This Week, etc.)
 */
export function getRelativeDateLabel(dateStr: string | null | undefined): string | null {
  const date = parseDate(dateStr);
  if (!date) return null;
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (eventDate.getTime() === today.getTime()) {
    return 'Today';
  }
  
  if (eventDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }
  
  // Within next 7 days
  const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil > 0 && daysUntil <= 7) {
    return date.toLocaleDateString('en-BH', { weekday: 'long', timeZone: BAHRAIN_TIMEZONE });
  }
  
  return null;
}

/**
 * Format a date range (e.g., "Feb 15 - Feb 20, 2025")
 */
export function formatDateRange(
  startDateStr: string | null | undefined,
  endDateStr: string | null | undefined
): string | null {
  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);
  
  if (!startDate) return null;
  
  // If no end date or same as start date
  if (!endDate || startDate.getTime() === endDate.getTime()) {
    return formatDate(startDateStr);
  }
  
  // Same year
  if (startDate.getFullYear() === endDate.getFullYear()) {
    // Same month
    if (startDate.getMonth() === endDate.getMonth()) {
      const start = startDate.toLocaleDateString('en-BH', {
        month: 'short',
        day: 'numeric',
        timeZone: BAHRAIN_TIMEZONE,
      });
      const end = endDate.toLocaleDateString('en-BH', {
        day: 'numeric',
        year: 'numeric',
        timeZone: BAHRAIN_TIMEZONE,
      });
      return `${start} - ${end}`;
    }
    
    // Different month, same year
    const start = startDate.toLocaleDateString('en-BH', {
      month: 'short',
      day: 'numeric',
      timeZone: BAHRAIN_TIMEZONE,
    });
    const end = endDate.toLocaleDateString('en-BH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: BAHRAIN_TIMEZONE,
    });
    return `${start} - ${end}`;
  }
  
  // Different years
  const start = formatDateShort(startDateStr);
  const end = formatDateShort(endDateStr);
  return `${start} - ${end}`;
}

/**
 * Convert a date to ISO date string (YYYY-MM-DD) for form inputs
 */
export function toISODateString(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? parseDate(date) : date;
  if (!d) return '';
  
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Convert a time to HH:MM string for form inputs
 */
export function toTimeString(hours: number, minutes: number): string {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
