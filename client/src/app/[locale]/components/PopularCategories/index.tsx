import React from 'react';
import CategoryItem from '@/app/[locale]/components/CategoryItem/CategoryItem';
import { StaticImageData } from 'next/image';

import TabletCategory from '@/../public/categories_tablet.webp';
import SmartWatchCategory from '@/../public/categories_smartwatch.webp';
import PhonesCategory from '@/../public/categories_smartphones.webp';
import AccessoriesCategory from '@/../public/categories_accessories.webp';
import { useTranslations } from 'next-intl';

const LandingPageCategories: Array<{
  src: StaticImageData;
  heading: string;
  dest: string;
  alt: string;
}> = [
  {
    src: AccessoriesCategory,
    heading: 'ACCESSORIES',
    dest: '/categories/accessories',
    alt: 'accessories',
  },
  {
    src: PhonesCategory,
    heading: 'SMARTPHONES',
    dest: '/categories/smartphones',
    alt: 'smartphones',
  },
  {
    src: TabletCategory,
    heading: 'TABLETS',
    dest: '/categories/tablets',
    alt: 'tablets',
  },
  {
    src: SmartWatchCategory,
    heading: 'SMARTWATCHES',
    dest: '/categories/smartwatches',
    alt: 'smartwatches',
  },
];

const PopularCategories = () => {
  const t = useTranslations('landing');
  return (
    <section className="pb-5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-center my-16">
          <h3 className="text-center text-3xl font-black mb-6 pb-2 border-b-4 border-primary">
            {t('POPULAR_CATEGORIES.TITLE')}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {LandingPageCategories.map((category) => (
            <CategoryItem
              key={category.heading}
              src={category.src}
              heading={category.heading}
              dest={category.dest}
              alt={category.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
