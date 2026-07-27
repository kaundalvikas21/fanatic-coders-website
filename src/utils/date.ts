import { format, isValid, parse, startOfToday as dateFnsStartOfToday } from 'date-fns';

/**
 * Formats a Date or ISO date string for compact UI display.
 *
 * @param value - Date object or ISO date string to format.
 * @returns A formatted date string, or "Unknown" when value is missing.
 *
 * @example
 * formatDate('2026-07-13T10:30:00.000Z');
 * // "Jul 13, 2026"
 */
export function formatDate(value?: Date | string): string {
  if (!value) {
    return 'Unknown';
  }

  return format(new Date(value), 'PP');
}

export function parseDateInputValue(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const date = parse(value, 'yyyy-MM-dd', new Date());

  return isValid(date) ? date : undefined;
}

export function formatDateInputValue(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function startOfToday(): Date {
  return dateFnsStartOfToday();
}
