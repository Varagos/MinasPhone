import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { ThickBottomBorder } from '@/components/Landing/styles';
import CategoryItem from '@/components/Landing/CategoryItem/CategoryItem';
import { useTranslation } from 'next-i18next';

import { StaticImageData } from 'next/image';

import TabletCategory from '/public/categories_tablet.webp';
import SmartWatchCategory from '/public/categories_smartwatch.webp';
import PhonesCategory from '/public/categories_smartphones.webp';
import AccessoriesCategory from '/public/categories_accessories.webp';

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
  const { t } = useTranslation();
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
