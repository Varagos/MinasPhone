'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Import the MapComponent with no SSR
const StoreMap = dynamic(
  () => import('./Map'),
  { ssr: false } // Prevents server-side rendering
);

const StoreLocation = () => {
  const t = useTranslations('landing');

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('LOCATION.TITLE')}
            </h2>
            <p className="text-gray-700">{t('LOCATION.CONTENT')}</p>
          </div>
          <div className="w-full md:w-1/2">
            <StoreMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
