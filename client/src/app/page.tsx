import { useTranslations } from 'next-intl';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const products = await api.products.findMany({ range: [0, 9] });
  const shuffledProducts = products.data.sort(() => 0.5 - Math.random());

  return (
    <MainContainer>
      <h1>{t('title')}</h1>
    </MainContainer>
  );
}

import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { MainContainer, ThickBottomBorder } from '@/_components/Landing/styles';
import ProductCard from '@/_components/Products/ProductCard/ProductCard';
import { api } from '@/api/index';

import Hero from '@/_components/Landing/HeroSection';

import ServicesSection from '@/_components/Landing/Services';
import ContactUsSection from '@/_components/Landing/ContactUs';

import dynamic from 'next/dynamic';
import RepairsSection from '@/_components/Landing/RepairsSection/RepairsSection';
import PopularCategories from '@/_components/Landing/PopularCategories';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const DynamicStoreLocation = dynamic(
  () => import('@/_components/Landing/StoreLocation'),
  {
    loading: () => <p>Loading...</p>,
  }
);

// export default async function Landing() {
//   // console.log('Landing categories:', categories, 'products:', products);

//   const products = await api.products.findMany({ range: [0, 9] });
//   const shuffledProducts = products.data.sort(() => 0.5 - Math.random());

//   //   const t = useTranslations('landing');
//   const t = await getTranslations('landing');

//   // Schema.org structured data for WebPage and BreadcrumbList
//   const homePageSchema = {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'WebPage',
//         '@id': 'https://www.minasphone.gr/#webpage',
//         url: 'https://www.minasphone.gr/',
//         name: 'MinasPhone - Buy Affordable Phones & Accessories',
//         description:
//           'MinasPhone offers quality new & used phones, phone accessories, and reliable money transfer services (MoneyGram & Ria). Best deals in town!',
//         isPartOf: {
//           '@id': 'https://www.minasphone.gr/#website',
//         },
//         inLanguage: 'el-GR',
//         primaryImageOfPage: {
//           '@id': 'https://www.minasphone.gr/#primaryimage',
//         },
//         datePublished: '2022-01-01T08:00:00+00:00',
//         dateModified: new Date().toISOString(),
//       },
//       {
//         '@type': 'BreadcrumbList',
//         '@id': 'https://www.minasphone.gr/#breadcrumb',
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: 1,
//             name: 'Home',
//             item: 'https://www.minasphone.gr/',
//           },
//         ],
//       },
//       {
//         '@type': 'ImageObject',
//         '@id': 'https://www.minasphone.gr/#primaryimage',
//         inLanguage: 'el-GR',
//         url: 'https://www.minasphone.gr/og-image.png',
//         contentUrl: 'https://www.minasphone.gr/og-image.png',
//         width: 1200,
//         height: 630,
//         caption: 'MinasPhone Storefront',
//       },
//       {
//         '@type': 'WebSite',
//         '@id': 'https://www.minasphone.gr/#website',
//         url: 'https://www.minasphone.gr/',
//         name: 'MinasPhone',
//         description: 'Quality Phones & Money Transfers',
//         publisher: {
//           '@id': 'https://www.minasphone.gr/#organization',
//         },
//         inLanguage: 'el-GR',
//       },
//     ],
//   };
//   return <div></div>;
//   //   return <Hero />;

//   return (
//     <MainContainer>
//       {/* <Hero /> */}

//       {/* <ServicesSection />

//       <PopularCategories />

//       <section>
//         <Container>
//           <Box my={8} alignItems={'center'}>
//             <Typography
//               component="h3" // Semantic HTML
//               variant="h4" // Visual style
//               align="center"
//               gutterBottom
//               fontWeight={900}
//             >
//               <ThickBottomBorder>
//                 {t('SUGGESTED_PRODUCTS.TITLE')}
//               </ThickBottomBorder>
//             </Typography>
//           </Box>

//           <Grid
//             container
//             justifyContent="center"
//             spacing={2}
//             alignItems="stretch"
//           >
//             {shuffledProducts.length > 3 &&
//               shuffledProducts.slice(0, 4).map((product) => (
//                 <Grid
//                   key={product.id}
//                   size={{
//                     xs: 8,
//                     sm: 6,
//                     md: 4,
//                     lg: 3,
//                   }}
//                 >
//                   <ProductCard product={product} fromCategory={null} />
//                 </Grid>
//               ))}
//           </Grid>
//         </Container>
//       </section>

//       <RepairsSection />
//       <DynamicStoreLocation />
//       <ContactUsSection /> */}
//     </MainContainer>
//   );
// }
