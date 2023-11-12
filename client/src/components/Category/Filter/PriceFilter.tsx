import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { PriceInputField } from './styles';
import { createUrl } from '@/lib/utils';

enum PriceFilters {
  GREATER_EQUAL_THAN = 'price_gte',
  LESS_EQUAL_THAN = 'price_lte',
  EQUAL_TO = 'price',
}

const PriceFilter: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const selected = searchParams.get('selected');
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const min = val.min as HTMLInputElement;

    const newParams = new URLSearchParams(searchParams.toString());

    if (min.value) {
      newParams.set('min', min.value);
    } else {
      newParams.delete('min');
    }

    router.push(createUrl('/products', newParams));
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as number[];
    setMinPrice(newMin);
    setMaxPrice(newMax);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    switch (event.target.value) {
      case 'option1':
        setMinPrice(0);
        setMaxPrice(150);
        break;
      case 'option2':
        setMinPrice(150);
        setMaxPrice(400);
        break;
      case 'option3':
        setMinPrice(400);
        setMaxPrice(850);
        break;
      case 'option4':
        setMinPrice(850);
        setMaxPrice(null);
        break;
      default:
        setMinPrice(null);
        setMaxPrice(null);
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="black">
            <strong>Τιμή</strong>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <PriceInputField
            label="Min"
            variant="outlined"
            type="number"
            value={minPrice || ''}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={6}>
          <PriceInputField
            label="Max"
            variant="outlined"
            type="number"
            value={maxPrice || ''}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </Grid>
      </Grid>
      <Slider
        value={[minPrice || 0, maxPrice || 1000]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
      <RadioGroup value={selectedOption || ''} onChange={handleRadioChange} row>
        <FormControlLabel
          value="option1"
          control={<Radio />}
          label="'Εως 150 €"
        />
        <FormControlLabel
          value="option2"
          control={<Radio />}
          label="150 - 400 €"
        />
        <FormControlLabel
          value="option3"
          control={<Radio />}
          label="400 - 850 €"
        />
        <FormControlLabel
          value="option4"
          control={<Radio />}
          label="Από 850 € και άνω"
        />
      </RadioGroup>
    </div>
  );
};

export default PriceFilter;
