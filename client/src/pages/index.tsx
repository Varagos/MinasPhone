import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

import { MainContainer, SectionTitle } from '@/components/Landing/styles';
import CategoryItem from '@/components/Landing/CategoryItem/CategoryItem';
import ProductCard from '@/components/Category/Products/ProductCard/ProductCard';
import PhoneFix from '../../public/undraw_phone_fix.svg';
import TabletCategory from '../../public/tablet-category.jpg';
import SmartWatchCategory from '../../public/smartwatch-category.jpg';
import PhonesCategory from '../../public/iphone-12-service.png';
import AccessoriesCategory from '../../public/Hnet-com-image.png';
import SimpleSlider from '../components/Landing/Slider/Slider';
import { api } from '@/api/index';
import { GetServerSideProps } from 'next';
import {
  CategoryPaginatedResponse,
  Product,
  ProductPaginatedResponse,
} from '@/api/types/types';

interface LandingProps {
  categories: CategoryPaginatedResponse;
  products: ProductPaginatedResponse;
}

export const getServerSideProps: GetServerSideProps<
  LandingProps
> = async () => {
  const categories = await api.categories.findMany({ limit: 10, page: 0 });
  console.log({ categories });
  const products = await api.products.findMany({ limit: 10, page: 0 });
  return { props: { categories, products } };
};

const LandingPageCategories: Array<{
  src: StaticImageData;
  heading: string;
  dest: string;
  alt: string;
}> = [
  {
    src: PhonesCategory,
    heading: 'SMARTPHONES',
    dest: '/category/smartphones',
    alt: 'smartphones',
  },
  {
    src: TabletCategory,
    heading: 'TABLETS',
    dest: '/category/tablets',
    alt: 'tablets',
  },
  {
    src: AccessoriesCategory,
    heading: 'ACCESSORIES',
    dest: '/category/accessories',
    alt: 'accessories',
  },
  {
    src: SmartWatchCategory,
    heading: 'SMARTWATCHES',
    dest: '/category/smartwatches',
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
        <SimpleSlider />

        <section>
          <Container>
            <Box my={8}>
              <Typography variant="h4" align="center" gutterBottom>
                <SectionTitle>ΔΗΜΟΦΙΛΕΙΣ ΚΑΤΗΓΟΡΙΕΣ</SectionTitle>
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
            <Box my={8}>
              <Typography variant="h4" align="center" gutterBottom>
                <SectionTitle>ΠΡΟΤΕΙΝΟΥΜΕ</SectionTitle>
              </Typography>
            </Box>

            <Grid
              container
              justifyContent="center"
              spacing={2}
              alignItems="stretch"
            >
              {shuffledProducts.slice(0, 4).map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>

        <section>
          <Box py={16}>
            <Typography variant="h4" align="center" gutterBottom>
              <SectionTitle>ΕΠΙΣΚΕΥΕΣ ΤΗΛΕΦΩΝΩΝ</SectionTitle>
            </Typography>
            <Grid container justifyContent="center" spacing={3}>
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
                  <Typography>
                    Σε μια εποχή όπου κυριαρχούν τα πανάκριβα smartphones με τις
                    αμέτρητες λειτουργίες, το παραδοσιακό κλασικό κινητό
                    τηλέφωνο καταφέρνει να διατηρεί την αξία του, κι αυτό δεν
                    είναι καθόλου τυχαίο.
                  </Typography>
                  <Typography variant="h6" align="left" gutterBottom>
                    Υψηλής ποιότητας ανταλλακτικά
                  </Typography>
                  <Typography>
                    Χρησιμοποιούμε για την επισκευή κινητών πάντα τα καλύτερα
                    ανταλλακτικά που υπάρχουν στην αγορά. Κριτήρια για την
                    επιλογή τους, είναι η απόδοση και η αντοχή. Ο λόγος είναι
                    πως επιθυμούμε σε κάθε μας επισκευή το καλύτερο δυνατό
                    αποτέλεσμα και με διάρκεια στο χρόνο.
                  </Typography>

                  <Typography variant="h6" align="left" gutterBottom>
                    Οικονομικές τιμές
                  </Typography>
                  <Typography>
                    Τις ποιοτικές μας υπηρεσίες έχουμε φροντίσει και τις
                    προσφέρουμε στις καλύτερες δυνατές τιμές της αγοράς. Στο
                    κατάστημα μας πραγματοποιούμε τις πιο συμφέρουσες επισκευές
                    κινητών τηλεφώνων.
                  </Typography>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </section>
      </MainContainer>
    </>
  );
}
