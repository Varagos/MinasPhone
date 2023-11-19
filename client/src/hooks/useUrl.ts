import JSURL from 'jsurl';

import { createUrl } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

enum URL_PARAM {
  SORT = 'sort',
  RANGE = 'range',
  FILTER = 'filter',
}

type ObjectLike = Record<string, unknown>;
type Sort = [string, 'asc' | 'desc'];
type Range = [number, number];
type Filter = ObjectLike;

type UpdateUrlParams = Record<string, string | number | boolean | null | any>;

/**
 * URLS are constructed as follows:
 *
 * http://domain.com/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
 */
const useUrl = (baseUrl: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update the query parameters
  const updateUrl = useCallback(
    (newQueryParams: UpdateUrlParams) => {
      console.log(
        `Start of updateURL: [searchParams]`,
        searchParams.toString()
      );
      const newParams = new URLSearchParams(searchParams.toString());

      // Update each parameter
      for (const [key, value] of Object.entries(newQueryParams)) {
        if (value !== null && value !== undefined) {
          const jsurlValue = JSURL.stringify(value);
          console.log(`Setting ${key} to ${jsurlValue}`);
          newParams.set(key, jsurlValue);
        } else {
          console.log(`Deleting ${key}`);
          newParams.delete(key);
        }
      }

      console.info('newParams', newParams.toString());
      console.info('Received newQueryParams', newQueryParams);
      // Create the new URL
      const objectParams = Object.fromEntries(newParams);
      const newUrl = createUrl(baseUrl, objectParams);
      console.log(`newUrl`, newUrl);
      router.push(newUrl);
    },
    [baseUrl, searchParams, router]
  );

  // Function to parse JSURL query parameters
  const parseJsurlQueryParam = <T>(paramValue: string | null): T | null => {
    if (!paramValue) return null;
    return JSURL.tryParse(paramValue) as T;
  };

  /**
   * RANGE
   */

  // Memoize the range parameter
  const range: Range | null = useMemo(() => {
    const rangeParam = searchParams.get(URL_PARAM.RANGE);
    if (!rangeParam) return null;
    const parsedRange = parseJsurlQueryParam<Range>(rangeParam);
    return parsedRange;
  }, [searchParams]);

  // Function to set the range parameter
  const setRange = useCallback(
    (newRange: Range) => {
      updateUrl({ [URL_PARAM.RANGE]: newRange });
    },
    [updateUrl]
  );

  /**
   * SORT
   */

  // Memoize the sort parameter
  const sort = useMemo(() => {
    return (
      parseJsurlQueryParam(searchParams.get(URL_PARAM.SORT)) ||
      ([] as any as Sort)
    );
  }, [searchParams]);

  // Function to set the sort parameter
  const setSort = useCallback(
    (newSort: Sort) => {
      updateUrl({ [URL_PARAM.SORT]: newSort });
    },
    [updateUrl]
  );

  // Memoize the filter parameter
  const filter = useMemo(() => {
    return (
      parseJsurlQueryParam<Filter>(searchParams.get(URL_PARAM.FILTER)) || {}
    );
  }, [searchParams]);

  // Function to set the filter parameter
  const setFilter = useCallback(
    (newFilter: Filter) => {
      console.log('[SET FILTER]');
      updateUrl({ [URL_PARAM.FILTER]: newFilter });
    },
    [updateUrl]
  );

  // Function to add a filter parameter
  const addFilter = useCallback(
    (newFilter: Filter) => {
      console.log('[ADD FILTER]');
      const currentFilters =
        parseJsurlQueryParam(searchParams.get(URL_PARAM.FILTER)) || {};

      console.log(`currentFilters`, currentFilters);
      const updatedFilters = { ...currentFilters, ...newFilter };
      console.log(`updatedFilters`, updatedFilters);
      updateUrl({ [URL_PARAM.FILTER]: updatedFilters });
    },
    [updateUrl]
  );

  // Function to remove a filter parameter
  const removeFilter = useCallback(
    (filterKey: string) => {
      console.log('[REMOVE FILTER]');
      const currentFilters: Filter =
        parseJsurlQueryParam<Filter>(searchParams.get(URL_PARAM.FILTER)) || {};
      const updatedFilters = { ...currentFilters };
      delete updatedFilters[filterKey];
      updateUrl({ [URL_PARAM.FILTER]: updatedFilters });
    },
    [updateUrl]
  );

  // Function to clear all filter parameters
  const clearFilters = useCallback(() => {
    console.log('[CLEAR FILTERS]');
    updateUrl({ filter: {} });
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
