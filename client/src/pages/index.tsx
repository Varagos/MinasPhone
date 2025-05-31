import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { MainContainer, ThickBottomBorder } from '@/components/Landing/styles';
import CategoryItem from '@/components/Landing/CategoryItem/CategoryItem';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import { api } from '@/api/index';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  CategoryPaginatedResponse,
  Product,
  ProductPaginatedResponse,
} from '@/api/types/types';
import Hero from '@/components/Landing/HeroSection';
import StoreLocation from '@/components/Landing/StoreLocation';

import { useTranslation } from 'next-i18next';
import ServicesSection from '@/components/Landing/Services';
import ContactUsSection from '@/components/Landing/ContactUs';

import dynamic from 'next/dynamic';
import RepairsSection from '@/components/Landing/RepairsSection/RepairsSection';
import PopularCategories from '@/components/Landing/PopularCategories';

const DynamicStoreLocation = dynamic(
  () => import('@/components/Landing/StoreLocation'),
  {
    loading: () => <p>Loading...</p>,
  }
);

interface LandingProps {
  categories: CategoryPaginatedResponse;
  products: ProductPaginatedResponse;
}

export const getServerSideProps: GetServerSideProps<LandingProps> = async (
  context
) => {
  const categories = await api.categories.findMany({ range: [0, 9] });
  // console.log({ categories });
  const products = await api.products.findMany({ range: [0, 9] });

  const { locale } = context;
  if (!locale) {
    throw new Error('locale is undefined');
  }

  return {
    props: {
      categories,
      products,
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default function Landing({ categories, products }: LandingProps) {
  // console.log('Landing categories:', categories, 'products:', products);

  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const clonedProducts = structuredClone(products.data);
    setShuffledProducts(clonedProducts.sort(() => 0.5 - Math.random()));
  }, []);

  return (
    <>
      <Head>
        <title>Minas Phone</title>
        {/* This website is an electronics ecommerce website */}
        <meta
          name="description"
          content="Minas Phone - Electronics Ecommerce"
        />
        <meta
          name="keywords"
          content="electronics, ecommerce, smartphones, tablets, smartwatches, accessories"
        />
        <meta name="author" content="Minas Phone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <Hero />

        {/* <SimpleSlider /> */}

        <ServicesSection />

        <PopularCategories />

        <section>
          <Container>
            <Box my={8} alignItems={'center'}>
              <Typography
                component="h3" // Semantic HTML
                variant="h4" // Visual style
                align="center"
                gutterBottom
                fontWeight={900}
              >
                <ThickBottomBorder>
                  {t('SUGGESTED_PRODUCTS.TITLE')}
                </ThickBottomBorder>
              </Typography>
            </Box>

            <Grid
              container
              justifyContent="center"
              spacing={2}
              alignItems="stretch"
            >
              {shuffledProducts.slice(0, 4).map((product) => (
                <Grid item key={product.id} xs={8} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>

        <RepairsSection />
        <DynamicStoreLocation />
        <ContactUsSection />
      </MainContainer>
    </>
  );
}
