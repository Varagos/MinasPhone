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
