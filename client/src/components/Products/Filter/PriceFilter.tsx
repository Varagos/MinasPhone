'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import useUrl from '@/hooks/useUrl';
import { PriceFiltersFilterKeys, PriceOption } from './definitions';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

type PriceFilterProps = {
  priceFilters: PriceOption[];
  activate: () => void;
  minMaxPrice: [number, number];
};

export function PriceFilter({
  priceFilters,
  activate,
  minMaxPrice,
}: PriceFilterProps) {
  const [sliderMinPrice, sliderMaxPrice] = minMaxPrice;
  const t = useTranslations('common');

  const pathName = usePathname();
  const { filter, addFilter, removeFilter } = useUrl(pathName);
  console.log('Price filter from URL:', filter);

  // Extract price range from URL filters
  const minPrice =
    (filter[PriceFiltersFilterKeys.GREATER_EQUAL_THAN] as number) ?? undefined;
  const maxPrice =
    (filter[PriceFiltersFilterKeys.LESS_EQUAL_THAN] as number) ?? undefined;

  const findSelectedOption = () => {
    const selectedPriceOption = priceFilters.find(
      (priceFilter) =>
        priceFilter.lower === minPrice && priceFilter.upper === maxPrice
    );
    return selectedPriceOption?.value || null;
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(
    findSelectedOption()
  );

  useEffect(() => {
    setSelectedOption(findSelectedOption());
  }, [minPrice, maxPrice]);

  // Handler functions
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as number[];
    addFilter({
      [PriceFiltersFilterKeys.GREATER_EQUAL_THAN]: newMin,
      [PriceFiltersFilterKeys.LESS_EQUAL_THAN]: newMax,
    });
    activate();
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(event.target.value);
    activate();
    addFilter({ [PriceFiltersFilterKeys.GREATER_EQUAL_THAN]: newMin });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(event.target.value);
    activate();
    addFilter({ [PriceFiltersFilterKeys.LESS_EQUAL_THAN]: newMax });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    activate();

    const priceOption = priceFilters.find(
      (priceFilter) => priceFilter.value === event.target.value
    );
    if (!priceOption) {
      removeFilter(PriceFiltersFilterKeys.GREATER_EQUAL_THAN);
      removeFilter(PriceFiltersFilterKeys.LESS_EQUAL_THAN);
      return;
    }
    addFilter({
      [PriceFiltersFilterKeys.GREATER_EQUAL_THAN]: priceOption.lower,
      [PriceFiltersFilterKeys.LESS_EQUAL_THAN]: priceOption.upper,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-black">{t('PRICE')}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="min-price">Min</Label>
          <Input
            id="min-price"
            type="number"
            value={minPrice || ''}
            onChange={handleMinPriceChange}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-price">Max</Label>
          <Input
            id="max-price"
            type="number"
            value={maxPrice || ''}
            onChange={handleMaxPriceChange}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div className="py-4">
        <Slider
          value={[minPrice || sliderMinPrice, maxPrice || sliderMaxPrice]}
          onValueChange={(value) =>
            handleSliderChange({} as Event, value as any)
          }
          min={sliderMinPrice}
          max={sliderMaxPrice}
          step={1}
        />
      </div>

      <RadioGroup
        value={selectedOption || ''}
        onValueChange={(value) =>
          handleRadioChange({ target: { value } } as any)
        }
        className="space-y-2"
      >
        {priceFilters.map((priceFilter) => (
          <div key={priceFilter.value} className="flex items-center space-x-2">
            <RadioGroupItem value={priceFilter.value} id={priceFilter.value} />
            <Label htmlFor={priceFilter.value} className="cursor-pointer">
              {priceFilter.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default PriceFilter;
