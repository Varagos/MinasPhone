// utils/serverParsers.js

import JSURL from 'jsurl';
import { DEFAULT_ITEMS_PER_PAGE } from './pagination';

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
  defaultRange: Range = [0, DEFAULT_ITEMS_PER_PAGE - 1]
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

export function parseFilterFromQuery(
  filterQuery: string | string[] | undefined
): Record<string, string> {
  if (typeof filterQuery === 'string') {
    try {
      const parsedFilter = JSURL.tryParse(filterQuery);
      return parsedFilter as Record<string, string>;
    } catch (error) {
      // Log the error and fall back to the default range
      console.error('Error parsing filter parameter:', error);
    }
    return {};
  }
  return {};
}
