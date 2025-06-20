'use client';
import React from 'react';
import { useServicesSection } from './data';
import ServiceCard from './ServiceCard';
// import ShapeDivider from './BottomShapeDivider';
import { useTranslations } from 'next-intl';

const ServicesSection = () => {
  const t = useTranslations('landing');

  const { services } = useServicesSection();

  return (
    <section className="relative bg-gray-50">
      <div className="container mx-auto px-4 py-20 md:py-24 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 pb-16">
          <div className="col-span-1">
            <h2 className="text-4xl md:text-5xl text-center font-semibold mb-8">
              {t('SERVICES.TITLE')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
      {/* <ShapeDivider /> */}
    </section>
  );
};

export default ServicesSection;
