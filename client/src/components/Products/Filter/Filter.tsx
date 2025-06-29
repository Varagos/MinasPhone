'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PriceFilter from './PriceFilter';
import useUrl from '@/hooks/useUrl';
import { priceFilters } from './contants';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const Filter = () => {
  const pathName = usePathname();
  const t = useTranslations('common');
  const { clearFilters, filter } = useUrl(pathName);
  const [activeFilters, setActiveFilters] = useState<{
    price?: boolean;
  }>({});

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      setActiveFilters({ price: true });
    }
  }, [filter]);

  const handleClear = () => {
    // setActiveFilters({});
    clearFilters();
  };

  const activatePriceFilter = () => {
    setActiveFilters({ ...activeFilters, price: true });
  };

  /**
   * TODO reset pagination when filters change/ are applied
   * ~This is standard behavior, adopted by Amazon, eBay, etc.
   * Since the page (e.g.3 ) might not exist after applying filters
   * 
   *  Best Practices:
  - Scroll to Top – After resetting to page 1, auto-scroll the user to the top of the product list for a seamless experience.I
  - Preserve Filters in URL – Update the URL (e.g., ?category=hats&page=1) so the state is shareable and bookmarkable.
  - Loading State – Show a spinner/skeleton loader while the new results fetch.

  Example
  function handleFilterChange(newFilters) {
  // Reset to page 1 when filters change
  setFilters(newFilters);
  setCurrentPage(1); 
  fetchResults(newFilters, 1); // Reload data
  window.scrollTo(0, 0); // Scroll to top
}
   */
  return (
    <div className="border border-border rounded-md p-6 my-4">
      <h3 className="text-xl font-bold text-foreground mb-4">{t('FILTERS')}</h3>

      {activeFilters?.price && (
        <Button
          variant="default"
          size="sm"
          className="w-full mb-6 bg-foreground text-background hover:bg-foreground/90"
          onClick={handleClear}
        >
          {t('CLEAR_FILTERS')}
        </Button>
      )}

      <div className="border-t border-border my-4"></div>

      <PriceFilter
        priceFilters={priceFilters.options}
        activate={activatePriceFilter}
        minMaxPrice={priceFilters.minMax}
      />

      {/* Example of additional filter section - commented out for now */}
      {false && (
        <>
          <h4 className="text-lg font-semibold mt-6 mb-3">Κατασκευαστής</h4>
          <div className="border-t border-border mb-4"></div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="manufacturer1"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="manufacturer1" className="text-sm font-medium">
                Inbox
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
