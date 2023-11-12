import { createUrl } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

/**
 * Encoding: You're using JSON.stringify to encode objects as query parameters.
 * Ensure that this is decoded properly on the receiving end and that the stringified
 *  object doesn't include characters that may need URL encoding.
 */

// A helper function to parse query parameters
const parseQuery = (queryParam: string | null): ObjectLike | null => {
  if (!queryParam) return null;
  try {
    return JSON.parse(queryParam);
  } catch (e) {
    return null;
  }
};

type ObjectLike = Record<string, unknown>;
type Sort = [string, 'asc' | 'desc'];
type Range = [number, number];
type Filter = ObjectLike;

// A custom hook that abstracts the URL query parameter manipulation
const useUrl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update the query parameters
  const updateUrl = useCallback(
    (newQueryParams: ObjectLike) => {
      // const searchParams = new URLSearchParams(window.location.search);

      const newParams = new URLSearchParams(searchParams.toString());

      // Update each parameter
      for (const key of Object.keys(newQueryParams)) {
        const value = newQueryParams[key];
        if (value !== undefined) {
          newParams.set(key, JSON.stringify(value));
        } else {
          newParams.delete(key);
        }
      }

      // Create the new URL
      router.push(createUrl('/products', newParams));
    },
    [router, searchParams]
  );

  // Parse the existing query parameters
  const sort = useMemo(
    () => parseQuery(searchParams.get('sort')),
    [searchParams]
  );
  const range = useMemo(
    () => parseQuery(searchParams.get('range')),
    [searchParams]
  );
  const filter = useMemo(
    () => parseQuery(searchParams.get('filter')),
    [searchParams]
  );

  // Function to set the sort parameter
  const setSort = useCallback(
    (newSort: Sort) => {
      updateUrl({ sort: JSON.stringify(newSort) });
    },
    [updateUrl]
  );

  // Function to set the range parameter
  const setRange = useCallback(
    (newRange: Range) => {
      updateUrl({ range: JSON.stringify(newRange) });
    },
    [updateUrl]
  );

  // Function to set the filter parameter
  const setFilter = useCallback(
    (newFilter: Filter) => {
      updateUrl({ filter: JSON.stringify(newFilter) });
    },
    [updateUrl]
  );

  // Function to add a filter parameter
  const addFilter = useCallback(
    (newFilter: Filter) => {
      const currentFilters = parseQuery(searchParams.get('filter')) || {};
      const updatedFilters = { ...currentFilters, ...newFilter };
      updateUrl({ filter: JSON.stringify(updatedFilters) });
    },
    [updateUrl, searchParams]
  );

  // Function to remove a filter parameter
  const removeFilter = useCallback(
    (filterKey: string) => {
      const currentFilters = parseQuery(searchParams.get('filter')) || {};
      const updatedFilters = { ...currentFilters };
      delete updatedFilters[filterKey];
      updateUrl({ filter: JSON.stringify(updatedFilters) });
    },
    [updateUrl, searchParams]
  );

  // Function to clear all filter parameters
  const clearFilters = useCallback(() => {
    updateUrl({ filter: JSON.stringify({}) });
  }, [updateUrl]);

  return {
    sort,
    range,
    filter,
    setSort,
    setRange,
    setFilter,
    addFilter,
    removeFilter,
    clearFilters,
  };
};

export default useUrl;
