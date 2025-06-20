import React from 'react';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import { useTranslations } from 'next-intl';
import { Product } from '@/api/types/products';

const SuggestedProducts = ({
  shuffledProducts,
}: {
  shuffledProducts: Product[];
}) => {
  const t = useTranslations('landing');
  return (
    <section className="pb-5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-center my-16">
          <h3 className="text-center text-3xl font-black mb-6 pb-2 border-b-4 border-primary">
            {t('SUGGESTED_PRODUCTS.TITLE')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {shuffledProducts.length > 3 &&
            shuffledProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} fromCategory={null} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedProducts;
