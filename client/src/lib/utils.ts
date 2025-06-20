import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Constructs a URL from a base URL and an object containing query parameters.
 * The query parameters are expected to be already encoded in a URL-safe format.
 *
 * @param {string} baseUrl - The base URL to which the query parameters will be appended.
 * @param {Record<string, string>} queryParams - An object containing query parameters.
 * @return {string} - The complete URL with query parameters appended.
 */
function createUrl(
  baseUrl: string,
  queryParams: Record<string, string>
): string {
  // Construct the query string from the encoded query parameters
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Check if the base URL already has query parameters
  const url = new URL(baseUrl, window.location.origin);
  url.search = queryString; // Directly set the encoded query string
  return url.toString();
}

export { createUrl };
