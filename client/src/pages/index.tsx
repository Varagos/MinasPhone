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
import { Product, ProductPaginatedResponse } from '@/api/types/types';
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
  products: ProductPaginatedResponse;
}

export const getServerSideProps: GetServerSideProps<LandingProps> = async (
  context
) => {
  // console.log({ categories });
  const products = await api.products.findMany({ range: [0, 9] });

  const { locale } = context;
  if (!locale) {
    throw new Error('locale is undefined');
  }

  return {
    props: {
      products,
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale, ['common', 'footer', 'navbar'])),
    },
  };
};

export default function Landing({ products }: LandingProps) {
  // console.log('Landing categories:', categories, 'products:', products);

  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const clonedProducts = structuredClone(products.data);
    setShuffledProducts(clonedProducts.sort(() => 0.5 - Math.random()));
  }, []);

  // Schema.org structured data for WebPage and BreadcrumbList
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.minasphone.gr/#webpage',
        url: 'https://www.minasphone.gr/',
        name: 'MinasPhone - Buy Affordable Phones & Accessories',
        description:
          'MinasPhone offers quality new & used phones, phone accessories, and reliable money transfer services (MoneyGram & Ria). Best deals in town!',
        isPartOf: {
          '@id': 'https://www.minasphone.gr/#website',
        },
        inLanguage: 'el-GR',
        primaryImageOfPage: {
          '@id': 'https://www.minasphone.gr/#primaryimage',
        },
        datePublished: '2022-01-01T08:00:00+00:00',
        dateModified: new Date().toISOString(),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.minasphone.gr/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.minasphone.gr/',
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://www.minasphone.gr/#primaryimage',
        inLanguage: 'el-GR',
        url: 'https://www.minasphone.gr/og-image.png',
        contentUrl: 'https://www.minasphone.gr/og-image.png',
        width: 1200,
        height: 630,
        caption: 'MinasPhone Storefront',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.minasphone.gr/#website',
        url: 'https://www.minasphone.gr/',
        name: 'MinasPhone',
        description: 'Quality Phones & Money Transfers',
        publisher: {
          '@id': 'https://www.minasphone.gr/#organization',
        },
        inLanguage: 'el-GR',
      },
    ],
  };

  return (
    <>
      <Head>
        {/* This website is an electronics ecommerce website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />

        <title>MinasPhone - Buy Affordable Phones & Accessories</title>
        <meta
          name="description"
          content="MinasPhone offers quality new & used phones, phone accessories, and reliable money transfer services (MoneyGram & Ria). Best deals in town!"
        />
        <meta
          name="keywords"
          content="affordable phones, used phones, phone accessories, MoneyGram, Ria money transfer, smartphones, mobile phones, cheap phones, phone repairs, phone cases, screen protectors"
        />
        <meta name="author" content="MinasPhone Team" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.minasphone.gr" />
        <meta
          property="og:title"
          content="MinasPhone - Quality Phones & Money Transfers"
        />
        <meta
          property="og:description"
          content="Your one-stop shop for phones, accessories, and money transfer services"
        />
        <meta property="og:site_name" content="MinasPhone" />
        <meta
          property="og:image"
          content="https://www.minasphone.com/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MinasPhone Storefront" />
        <link rel="canonical" href="https://www.minasphone.gr" />
        <meta name="theme-color" content="#3F72AF" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                  <ProductCard product={product} fromCategory={null} />
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
