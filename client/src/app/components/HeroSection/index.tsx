'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import bg from '../../../../public/hero-section-apple-standing.webp';
import { useTranslation } from 'next-i18next';
import ShapeDividerBottom from './CurvedDivider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const HeroSection = styled('section')(({ theme }) => ({
  width: '100%',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'row',
  padding: '7%',
  textAlign: 'left',
  position: 'relative', // Needed for absolute positioning of pseudo-elements
  overflow: 'hidden', // Prevents content from spilling out
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2), // Smaller padding on smaller screens
    minHeight: '60vh',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1), // Even smaller padding on small devices
    minHeight: '40vh',
  },
}));

const HeroOverlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity as needed
  zIndex: 1, // Ensure it's above the background image but below the content
}));

const HeroContent = styled(Box)(({ theme }) => ({
  zIndex: 2,
  width: '50%', // Half width on desktop screens
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%', // Full width on medium devices and down
    padding: theme.spacing(4), // Smaller padding on smaller screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2), // Even smaller padding on small devices
  },
}));

const HeroText = styled(Typography)(({ theme }) => ({
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
}));

const HeroSubText = styled(Typography)(({ theme }) => ({
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
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: '10px 25px',
  backgroundColor: '#333',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#000',
  },
  // Add media for mobile, to make it full width
  '@media (max-width: 600px)': {
    width: '100%', // Full width
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 20px', // Smaller padding on small devices
    fontSize: '0.875rem', // Smaller font size on small devices
  },
}));

// On tablet and down, remove it
const DesktopLineBreak = styled('br')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export default function Hero() {
  const t = useTranslations('landing');

  return (
    <HeroSection>
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

      <HeroContent>
        <HeroText variant="h1">
          {t('LANDING.CTA_TITLE1')} <DesktopLineBreak />{' '}
          {t('LANDING.CTA_TITLE2')}
        </HeroText>

        <HeroSubText variant="subtitle1">
          {t('LANDING.CTA_DESCRIPTION')}
        </HeroSubText>
        <HeroButton variant="contained" href="/products">
          {t('LANDING.CTA_BUTTON')}
        </HeroButton>
      </HeroContent>
      <ShapeDividerBottom />
    </HeroSection>
  );
}
