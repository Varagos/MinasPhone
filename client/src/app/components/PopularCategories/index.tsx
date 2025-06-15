'use client';
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CategoryItem from '@/app/components/CategoryItem/CategoryItem';

import { StaticImageData } from 'next/image';

import TabletCategory from '/public/categories_tablet.webp';
import SmartWatchCategory from '/public/categories_smartwatch.webp';
import PhonesCategory from '/public/categories_smartphones.webp';
import AccessoriesCategory from '/public/categories_accessories.webp';
import { useTranslations } from 'next-intl';
import { styled } from '@mui/material/styles';
import { ThickBottomBorder } from '../styles';

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
    <section style={{ paddingBottom: 20 }}>
      <Container maxWidth={'lg'}>
        <Box my={8}>
          <Typography
            component="h3" // Semantic HTML
            variant="h4" // Visual style
            align="center"
            gutterBottom
            fontWeight={900}
          >
            <ThickBottomBorder>
              {t('POPULAR_CATEGORIES.TITLE')}
            </ThickBottomBorder>
          </Typography>
        </Box>
        <Grid container justifyContent="center" spacing={3}>
          {LandingPageCategories.map((category) => (
            <CategoryItem
              key={category.heading}
              src={category.src}
              heading={category.heading}
              dest={category.dest}
              alt={category.alt}
            />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default PopularCategories;
