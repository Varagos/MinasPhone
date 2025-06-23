import React from 'react';
import Image from 'next/image';
import PhoneFix from '@/../public/undraw_phone_fix.svg';
import { useTranslations } from 'next-intl';

const RepairsSection = () => {
  const t = useTranslations('landing');
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-center mb-10">
          <h3 className="text-center text-3xl font-black mb-6 pb-2 border-b-4 border-primary">
            {t('REPAIRS.TITLE')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex items-center justify-center">
            <Image
              src={PhoneFix}
              alt="phone repairs"
              sizes="100vw"
              className="w-[90%] h-auto"
              priority
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h4 className="text-xl font-semibold">
                {t('REPAIRS.SUBTITLE_1')}
              </h4>
              <p className="text-muted-foreground mb-4">
                {t('REPAIRS.DESCRIPTION_1')}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold">
                {t('REPAIRS.SUBTITLE_2')}
              </h4>
              <p className="text-muted-foreground mb-4">
                {t('REPAIRS.DESCRIPTION_2')}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold">
                {t('REPAIRS.SUBTITLE_3')}
              </h4>
              <p className="text-muted-foreground mb-4">
                {t('REPAIRS.DESCRIPTION_3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairsSection;
