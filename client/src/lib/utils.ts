import { ReadonlyURLSearchParams } from 'next/navigation';

// export const createUrl = (
//   pathname: string,
//   params: URLSearchParams | ReadonlyURLSearchParams
// ) => {
//   const paramsString = params.toString();
//   const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

//   return `${pathname}${queryString}`;
// };
/**
 * This function constructs a URL from a base URL and a URLSearchParams object.
 * It appends the search parameters to the base URL to form a complete URL string.
 *
 * @param {string} baseUrl - The base URL to which the query parameters will be appended.
 * @param {URLSearchParams} params - A URLSearchParams object containing query parameters.
 * @return {string} - The complete URL with query parameters appended.
 */
function createUrl(
  baseUrl: string,
  params: URLSearchParams | ReadonlyURLSearchParams
): string {
  // Check if the base URL already has query parameters
  const url = new URL(baseUrl, window.location.origin); // Provide a second argument for the URL constructor for cases where `baseUrl` is a relative URL.
  url.search = params.toString(); // Set the search property to the string representation of the updated parameters.
  return url.toString(); // Return the full URL string.
}

export { createUrl };
