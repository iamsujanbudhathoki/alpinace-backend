import { format, isValid, parseISO } from 'date-fns';

/**
 * Date and Timestamp Formatting Utilities for Alpine Ace
 * Uses date-fns for clean, robust, and production-ready human-readable date & time representations.
 */

/**
 * Safely parses any date input into a valid Date instance or null.
 */
export function toValidDate(input?: string | Date | number | null): Date | null {
  if (!input) return null;
  if (input instanceof Date) {
    return isValid(input) ? input : null;
  }
  if (typeof input === 'number') {
    const d = new Date(input);
    return isValid(d) ? d : null;
  }
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Try parseISO first for ISO standard strings
    const isoParsed = parseISO(trimmed);
    if (isValid(isoParsed)) return isoParsed;

    // Fallback to standard Date parsing
    const directParsed = new Date(trimmed);
    if (isValid(directParsed)) return directParsed;
  }
  return null;
}

/**
 * Formats a single date into a clean, human-readable format.
 * Examples:
 *  - '2026-10-15' -> 'Oct 15, 2026'
 *  - '2026-10-15T08:30:00.000Z' -> 'Oct 15, 2026'
 *  - 'Flexible' -> 'Flexible' (gracefully preserves custom text strings)
 */
export function formatHumanDate(
  date?: string | Date | number | null,
  fallback = 'Flexible',
): string {
  if (!date) return fallback;

  if (typeof date === 'string') {
    const trimmed = date.trim();
    if (!trimmed) return fallback;
    if (
      trimmed.toLowerCase() === 'flexible' ||
      trimmed.includes(' - ') ||
      trimmed.includes(' – ')
    ) {
      return trimmed;
    }
  }

  const d = toValidDate(date);
  if (!d) {
    return typeof date === 'string' ? date : fallback;
  }

  return format(d, 'MMM d, yyyy');
}

/**
 * Formats departure and return date ranges into a clean, human-readable string.
 * Examples:
 *  - ('2026-11-02', '2026-11-18') -> 'Nov 2, 2026 – Nov 18, 2026'
 *  - ('2026-11-02', undefined) -> 'Nov 2, 2026 onwards'
 */
export function formatHumanDateRange(
  startDate?: string | Date | number | null,
  endDate?: string | Date | number | null,
  fallback = 'Flexible',
): string {
  const startClean = startDate ? formatHumanDate(startDate, '') : '';
  const endClean = endDate ? formatHumanDate(endDate, '') : '';

  if (startClean && endClean) {
    if (startClean === endClean) return startClean;
    return `${startClean} – ${endClean}`;
  }
  if (startClean) return `${startClean} onwards`;
  if (endClean) return `Until ${endClean}`;
  return fallback;
}

/**
 * Formats a timestamp into a clean, human-readable date & time.
 * Examples:
 *  - new Date() -> 'Sep 17, 2026 · 12:54 PM'
 *  - '2026-09-17T07:09:57.000Z' -> 'Sep 17, 2026 · 7:09 AM'
 */
export function formatHumanDateTime(
  date?: string | Date | number | null,
  fallback = 'Just now',
): string {
  if (!date) {
    return format(new Date(), 'MMM d, yyyy · h:mm a');
  }

  if (typeof date === 'string') {
    const trimmed = date.trim();
    if (!trimmed) return fallback;

    // Handle compound strings like "Wed, 17 Sep 2026... / ... (NPT)"
    if (trimmed.includes(' / ') && trimmed.includes('(NPT)')) {
      const firstPart = trimmed.split(' / ')[0];
      const parsedFirst = toValidDate(firstPart);
      if (parsedFirst) {
        return format(parsedFirst, 'MMM d, yyyy · h:mm a');
      }
    }
  }

  const d = toValidDate(date);
  if (!d) {
    return typeof date === 'string' ? date : fallback;
  }

  return format(d, 'MMM d, yyyy · h:mm a');
}
