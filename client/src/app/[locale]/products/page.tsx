import Head from 'next/head';
import { api } from '@/api';
import { parseRangeFromQuery } from '@/utils/serverParsers';
import ProductsClientPage from './_clientpage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'List of products',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const urlRange = (await searchParams).range;

  // TODO Fix to work with server componet
  const [start, end] = parseRangeFromQuery(urlRange);
  console.log(`Range: ${start} - ${end}`);
  const products = await api.products.findMany({
    range: [start, end],
  });

  // TODO fix pagination which is probably broken
  return <ProductsClientPage products={products} />;
}
