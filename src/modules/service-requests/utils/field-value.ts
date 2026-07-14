/**
 * Formats a captured service-request field value for read-only UI display.
 *
 * @param value - Raw field value from a service request data object.
 * @returns A readable string, or "Not provided" when the field has no displayable value.
 *
 * @example
 * formatServiceRequestFieldValue(['SEO', 'Google Ads']);
 * // "SEO, Google Ads"
 */
export function formatServiceRequestFieldValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'Not provided';
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : 'Not provided';
  }

  if (typeof value === 'string') {
    return value.trim() || 'Not provided';
  }

  if (value === null || value === undefined) {
    return 'Not provided';
  }

  return JSON.stringify(value);
}
