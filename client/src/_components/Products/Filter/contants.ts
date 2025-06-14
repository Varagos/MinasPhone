import { PriceFilters, PriceOption } from './definitions';

export const priceFilters: PriceFilters = {
  options: [
    {
      value: 'option1',
      label: 'Εως 150 €',
      lower: 0,
      upper: 150,
    },
    {
      value: 'option2',
      label: '150 - 400 €',
      lower: 150,
      upper: 400,
    },
    {
      value: 'option3',
      label: '400 - 850 €',
      lower: 400,
      upper: 850,
    },
    {
      value: 'option4',
      label: 'Από 850 € και άνω',
      lower: 850,
      upper: 2000,
    },
  ],
  minMax: [0, 2000],
};
