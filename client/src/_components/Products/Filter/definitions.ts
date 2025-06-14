export enum PriceFiltersFilterKeys {
  GREATER_EQUAL_THAN = 'price_gte',
  LESS_EQUAL_THAN = 'price_lte',
  EQUAL_TO = 'price',
}

export type PriceOption = {
  value: string;
  label: string;
  lower: number;
  upper: number;
};
export type PriceFilters = {
  options: PriceOption[];
  minMax: [number, number];
};

export type Filters = {
  priceFilters: PriceFilters;
};
