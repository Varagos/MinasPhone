import { cache } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import EmptyLogo from '/public/undraw_empty_xct9.svg';
import Head from 'next/head';

import StoreMallDirectoryTwoToneIcon from '@mui/icons-material/StoreMallDirectoryTwoTone';
import { api } from '@/api';
import { formatPriceWithSymbol } from '@/utils/prices';
import Link from 'next/link';
import Image from 'next/image';
import BreadcrumbNav, {
  BreadcrumbItem,
} from '@/components/common/BreadcrumbNav';
import AddToCartButton from '@/components/common/AddToCartButton';
import { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Memoize API call
const getProduct = cache(async (productId: string) => {
  const product = await api.products.findOneById(productId);
  return product;
});

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const productId = (await params).productId;

  // fetch post information
  const product = await getProduct(productId);
  if (!product) {
    return {
      title: 'Product not found',
      description: 'Product not found',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const productId = (await params).productId;
  const t = await getTranslations('common');

  const product = await getProduct(productId);
  // TODO fix
  // const { setCart } = useCart();
  // const { from } = router.query;
  const from = (await searchParams).from;

  if (!product) {
    return (
      <div style={{ minHeight: '70vh' }}>
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h5" gutterBottom>
            {t('PRODUCT_NOT_FOUND')}
          </Typography>
          <Image
            src={EmptyLogo.src}
            alt="Product not found"
            width={300}
            height={300}
          />
          <Typography variant="body1" color="textSecondary">
            {t('TRY_ANOTHER_PRODUCT')}
            <Link
              href="/"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
              {t('BACK_TO_HOME')}
            </Link>
          </Typography>
        </Box>
      </div>
    );
  }

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.imageUrl,
    description: product.description.replace(/<[^>]*>/g, ''),
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'MinasPhone',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.minasphone.gr/products/${product.id}`,
      priceCurrency: 'EUR',
      price: product.price,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'MinasPhone',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'HUR',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'HUR',
          },
        },
        hasShippingService: {
          '@type': 'ShippingService',
          name: 'Store Pickup',
          description: 'Παραλαβή από το κατάστημα',
        },
      },
    },
  };

  const breadcrumbItems: BreadcrumbItem[] = [];

  if (from && typeof from === 'string') {
    const categoryName = from
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbItems.push(
      { label: 'Κατηγορίες', href: '/categories' },
      { label: categoryName, href: `/categories/${from}` }
    );
  } else {
    breadcrumbItems.push({ label: 'Προϊόντα', href: '/products' });
  }

  breadcrumbItems.push({ label: product.name });

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <Container maxWidth="lg" sx={{ pt: 10, pb: 20 }}>
        <Box sx={{ mb: 4 }}>
          <BreadcrumbNav items={breadcrumbItems} />
        </Box>

        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ pt: 13 }}
            justifyContent="center"
          >
            {/* Medium: Product pages
Every product needs good product page-quality images. These images (usually 640 x 640 or 800 x 800) */}
            <Box
              component="img"
              sx={{
                objectFit: 'cover',
                width: '60%',
                height: 'auto',
                py: 5,
                backgroundColor: 'white',
                pointerEvents: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                },
                textTransform: 'none',

                // height: 233,
                // width: 350,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt={product.name}
              src={product.imageUrl}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box mr={4}>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
              </Box>

              <Box ml={4}>
                <Typography
                  style={{ marginRight: 'auto', color: '#69b67c' }}
                  variant="h6"
                  noWrap
                >
                  {formatPriceWithSymbol(product.price)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 8,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StoreMallDirectoryTwoToneIcon />
                <Typography variant="caption">{t('STORE_PICKUP')}</Typography>
              </Box>
              <AddToCartButton
                productId={product.id}
                content={t('ADD_TO_CART')}
              />
            </Box>

            <Box sx={{ mt: 10 }}>
              <Typography variant="h6">{t('DESCRIPTION')}</Typography>
              <Typography
                dangerouslySetInnerHTML={{ __html: product.description }}
                variant="body2"
                color="textSecondary"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
