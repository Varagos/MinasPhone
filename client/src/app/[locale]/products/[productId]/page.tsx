import { cache } from 'react';
import React from 'react';
import EmptyLogo from '@/../public/undraw_empty_xct9.svg';
import Head from 'next/head';

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
import { Store } from 'lucide-react'; // Store icon replacement for StoreMallDirectoryTwoToneIcon

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
      <div className="min-h-[70vh]">
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold mb-2">
            {t('PRODUCT_NOT_FOUND')}
          </h2>
          <Image
            src={EmptyLogo.src}
            alt="Product not found"
            width={300}
            height={300}
          />
          <p className="text-muted-foreground">
            {t('TRY_ANOTHER_PRODUCT')}{' '}
            <Link
              href="/"
              className="text-blue-600 underline"
            >
              {t('BACK_TO_HOME')}
            </Link>
          </p>
        </div>
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
      <div className="container mx-auto pt-10 pb-20 px-4">
        <div className="mb-4">
          <BreadcrumbNav items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="pt-13 flex justify-center">
            {/* Medium: Product pages
Every product needs good product page-quality images. These images (usually 640 x 640 or 800 x 800) */}
            <img
              className="object-cover w-[60%] h-auto py-5 bg-white pointer-events-none select-none"
              alt={product.name}
              src={product.imageUrl}
            />
          </div>
          <div className="">
            <div className="flex flex-row justify-between">
              <div className="mr-4">
                <h2 className="text-xl font-semibold mb-2">
                  {product.name}
                </h2>
              </div>

              <div className="ml-4">
                <h3 className="text-lg font-medium mr-auto text-[#69b67c] truncate">
                  {formatPriceWithSymbol(product.price)}
                </h3>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center my-8">
              <div className="flex items-center">
                <Store className="h-5 w-5 mr-1" />
                <span className="text-sm text-muted-foreground">{t('STORE_PICKUP')}</span>
              </div>
              <AddToCartButton
                productId={product.id}
                content={t('ADD_TO_CART')}
              />
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium mb-2">{t('DESCRIPTION')}</h3>
              <p 
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="text-sm text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
