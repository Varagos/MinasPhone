// utils/serverParsers.js

import JSURL from 'jsurl';

// Inclusive range
export type Range = [number, number];
/**
 * Parses the 'range' parameter from the URL query string and validates it.
 * Falls back to the default range if necessary.
 *
 * @param {string | string[]} rangeQuery - The range query parameter as a string.
 * @param {number[]} defaultRange - The default range to use if the query parameter is missing or invalid.
 * @returns {number[]}
 */
export function parseRangeFromQuery(
  rangeQuery: string | string[] | undefined,
  defaultRange: Range = [0, 24]
): Range {
  if (typeof rangeQuery === 'string') {
    try {
      const parsedRange = JSURL.tryParse(rangeQuery);
      if (Array.isArray(parsedRange) && parsedRange.length === 2) {
        const [start, end] = parsedRange.map(Number);
        if (!isNaN(start) && !isNaN(end) && start < end) {
          return [start, end];
        }
      }
    } catch (error) {
      // Log the error and fall back to the default range
      console.error('Error parsing range parameter:', error);
    }
  }
  return defaultRange;
}
