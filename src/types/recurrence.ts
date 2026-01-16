/**
 * Recurrence Types for Events and Offers
 * Used for events/offers that repeat on specific days
 */

export type RecurrenceType = 'one-time' | 'weekly' | 'monthly';

export type WeekDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export const WEEKDAYS: WeekDay[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export interface RecurrenceConfig {
  recurrence_type: RecurrenceType;
  recurrence_days: WeekDay[];
  promotion_start_date?: string | null;
  promotion_end_date?: string | null;
}

export interface RecurringEvent {
  is_recurring: boolean;
  recurrence_pattern: RecurrenceType | null;
  recurrence_days: WeekDay[] | null;
  promotion_start_date?: string | null;
  promotion_end_date?: string | null;
}

export interface RecurringOffer {
  is_ongoing: boolean;
  days_available: WeekDay[];
  valid_from: string | null;
  valid_until: string | null;
}

// Helper type for form state
export interface RecurrenceFormState {
  isRecurring: boolean;
  recurrenceType: RecurrenceType;
  selectedDays: WeekDay[];
  hasDateRange: boolean;
  startDate: string;
  endDate: string;
}

// Default form state
export const DEFAULT_RECURRENCE_STATE: RecurrenceFormState = {
  isRecurring: false,
  recurrenceType: 'one-time',
  selectedDays: [],
  hasDateRange: false,
  startDate: '',
  endDate: '',
};
