import { Price } from '@/types/price';

const formatPriceWithSymbol = (price: number) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return formattedPrice;
};
export { formatPriceWithSymbol };

export const priceNumberToFormattedPrice = (price: number): Price => ({
  raw: price,
  formatted: `$${price}`,
  formatted_with_symbol: `$${price}`,
  formatted_with_code: `$${price}`,
});
