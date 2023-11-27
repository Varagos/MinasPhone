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
import PhoneFix from '../../public/undraw_phone_fix.svg';
import TabletCategory from '../../public/categories_tablet.jpg';
import SmartWatchCategory from '../../public/categories_smartwatch.jpg';
import PhonesCategory from '../../public/categories_smartphones.png';
import AccessoriesCategory from '../../public/categories_accessories.png';
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
import ServicesSection from '@/components/Landing/Services';
import ContactUsSection from '@/components/Landing/ContactUs';

import dynamic from 'next/dynamic';

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
  console.log({ categories });
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

export default function Landing({ categories, products }: LandingProps) {
  // console.log('Landing categories:', categories, 'products:', products);

  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const clonedProducts = structuredClone(products.data);
    setShuffledProducts(clonedProducts.sort(() => 0.5 - Math.random()));
  }, []);

  return (
    <>
      <Head>
        <title>Minas Phone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <Hero />

        {/* <SimpleSlider /> */}

        <ServicesSection />

        <section style={{ paddingBottom: 20 }}>
          <Container maxWidth={'lg'}>
            <Box my={8}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight={900}
              >
                <ThickBottomBorder>ΔΗΜΟΦΙΛΕΙΣ ΚΑΤΗΓΟΡΙΕΣ</ThickBottomBorder>
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

        <section>
          <Container>
            <Box my={8} alignItems={'center'}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight={900}
              >
                <ThickBottomBorder>ΠΡΟΤΕΙΝΟΥΜΕ</ThickBottomBorder>
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

        <section>
          <Container>
            <Box my={16}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight={900}
              >
                <ThickBottomBorder>ΕΠΙΣΚΕΥΕΣ ΤΗΛΕΦΩΝΩΝ</ThickBottomBorder>
              </Typography>
              <Grid container justifyContent="center" spacing={3} mt={2}>
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  alignContent="center"
                  justifyContent="center"
                >
                  <Image
                    src={PhoneFix}
                    alt="phone repairs"
                    sizes="100vw"
                    style={{ width: '90%', height: 'auto' }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  alignContent="center"
                  justifyContent="center"
                >
                  <Container>
                    <Typography variant="h6" align="left" gutterBottom>
                      ΕΠΙΣΚΕΥΕΣ ΤΗΛΕΦΩΝΩΝ
                    </Typography>
                    <Typography gutterBottom>
                      Σε μια εποχή όπου κυριαρχούν τα πανάκριβα smartphones με
                      τις αμέτρητες λειτουργίες, το παραδοσιακό κλασικό κινητό
                      τηλέφωνο καταφέρνει να διατηρεί την αξία του, κι αυτό δεν
                      είναι καθόλου τυχαίο.
                    </Typography>
                    <Typography variant="h6" align="left" gutterBottom>
                      Υψηλής ποιότητας ανταλλακτικά
                    </Typography>
                    <Typography gutterBottom>
                      Χρησιμοποιούμε για την επισκευή κινητών πάντα τα καλύτερα
                      ανταλλακτικά που υπάρχουν στην αγορά. Κριτήρια για την
                      επιλογή τους, είναι η απόδοση και η αντοχή. Ο λόγος είναι
                      πως επιθυμούμε σε κάθε μας επισκευή το καλύτερο δυνατό
                      αποτέλεσμα και με διάρκεια στο χρόνο.
                    </Typography>

                    <Typography variant="h6" align="left" gutterBottom>
                      Οικονομικές τιμές
                    </Typography>
                    <Typography gutterBottom>
                      Τις ποιοτικές μας υπηρεσίες έχουμε φροντίσει και τις
                      προσφέρουμε στις καλύτερες δυνατές τιμές της αγοράς. Στο
                      κατάστημα μας πραγματοποιούμε τις πιο συμφέρουσες
                      επισκευές κινητών τηλεφώνων.
                    </Typography>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>
        {/* <StoreLocation /> */}
        <DynamicStoreLocation />
        <ContactUsSection />
      </MainContainer>
    </>
  );
}
