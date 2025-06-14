import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { PriceInputField } from './styles';
import useUrl from '@/hooks/useUrl';
import { PriceFiltersFilterKeys, PriceOption } from './definitions';

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
  const { asPath } = useRouter();
  const { filter, addFilter, removeFilter } = useUrl(asPath);
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
    <div>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="h6" gutterBottom color="black" component="h3">
            <strong>Τιμή</strong>
          </Typography>
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <PriceInputField
            label="Min"
            variant="outlined"
            type="number"
            value={minPrice || ''}
            onChange={handleMinPriceChange}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <PriceInputField
            label="Max"
            variant="outlined"
            type="number"
            value={maxPrice || ''}
            onChange={handleMaxPriceChange}
          />
        </Grid>
      </Grid>
      <Slider
        value={[minPrice || sliderMinPrice, maxPrice || sliderMaxPrice]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={sliderMinPrice}
        max={sliderMaxPrice}
      />
      <RadioGroup value={selectedOption || ''} onChange={handleRadioChange} row>
        {priceFilters.map((priceFilter) => (
          <FormControlLabel
            key={priceFilter.value}
            value={priceFilter.value}
            control={<Radio />}
            label={priceFilter.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default PriceFilter;
