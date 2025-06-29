'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import bg from '@/../public/hero-section-apple-standing.webp';
import ShapeDividerBottom from './CurvedDivider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const HeroOverlay = (): React.JSX.Element => (
  <div className="absolute inset-0 bg-white/70 z-1" />
);

// On tablet and down, remove it
const DesktopLineBreak = () => <br className="hidden md:block" />;

export default function Hero() {
  const t = useTranslations('landing');

  return (
    <section
      className="w-full bg-[#f5f5f5] flex flex-row p-[7%] text-left relative overflow-hidden
        max-md:p-8 max-md:min-h-[60vh]
        max-sm:p-4 max-sm:min-h-[40vh]"
    >
      {/* Overlay */}
      <HeroOverlay />
      {/* We need to use Image, not background css */}
      <Image
        alt="Affordable smartphones and accessories at MinasPhone"
        src={bg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        priority
      />

      <div
        className="z-2 w-1/2 h-full
          max-md:w-full max-md:p-4
          max-sm:p-2"
      >
        <h1
          className="text-black mb-5 font-extrabold text-5xl leading-tight
          max-md:w-full max-md:text-4xl
          max-sm:text-2xl
          max-xs:text-base"
        >
          {t('LANDING.CTA_TITLE1')} <DesktopLineBreak />
          {t('LANDING.CTA_TITLE2')}
        </h1>

        <p
          className="text-black mb-10 font-light text-4xl leading-snug
          max-md:text-3xl
          max-sm:text-base
          max-xs:text-sm"
        >
          {t('LANDING.CTA_DESCRIPTION')}
        </p>
        <Button
          asChild
          className="w-full max-w-xs h-12 bg-gray-800 hover:bg-black text-white text-base font-bold rounded-md px-6 py-2.5
            max-sm:px-5 max-sm:py-2 max-sm:text-sm"
        >
          <a href="/products">{t('LANDING.CTA_BUTTON')}</a>
        </Button>
      </div>
      <ShapeDividerBottom />
    </section>
  );
}
