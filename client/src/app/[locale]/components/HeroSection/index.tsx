'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
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
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: '#000',
            marginBottom: '20px',
            fontWeight: 800,
            fontSize: '3.5rem',
            [theme.breakpoints.down('md')]: {
              width: '100%', // Full width on medium devices and down
              fontSize: '2rem', // Smaller font size on medium devices
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.5rem', // Even smaller font size on small devices
            },
            [theme.breakpoints.down('xs')]: {
              fontSize: '1rem', // Smallest font size on extra small devices
            },
          })}
        >
          {t('LANDING.CTA_TITLE1')} <DesktopLineBreak />{' '}
          {t('LANDING.CTA_TITLE2')}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            color: '#000',
            marginBottom: '40px', // Adjust as needed
            fontWeight: 300,
            fontSize: '2rem', // Adjust the font size as needed
            [theme.breakpoints.down('md')]: {
              fontSize: '1.75rem',
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.0rem',
            },
            [theme.breakpoints.down('xs')]: {
              fontSize: '0.75rem',
            },
          })}
        >
          {t('LANDING.CTA_DESCRIPTION')}
        </Typography>
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
