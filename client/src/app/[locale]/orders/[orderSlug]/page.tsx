import React from 'react';
import { api } from '@/api';
import type { Order } from '@/api/types/orders';
import LinkButton from '@/components/common/LinkButton';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

export default async function Order({
  params,
}: {
  params: Promise<{ orderSlug: string }>;
}) {
  const t = await getTranslations('orders');
  // console.log('Product params', params);
  const orderSlug = (await params).orderSlug;

  const data = await api.orders.findOrderBySlug(orderSlug);
  console.log('Order data', data);

  console.log({ orderSlug });
  if (typeof orderSlug !== 'string') return <div>{t('ORDER_NOT_FOUND')}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">
          Σας ευχαριστούμε για την παραγγελία, {data.contactInfo?.firstName}{' '}
          {data.contactInfo?.lastName}
        </h1>
        <div className="h-px bg-gray-200 my-5"></div>
        <p className="text-sm text-gray-600">
          Κωδικός παραγγελίας: <span className="font-medium">{data.slug}</span>
        </p>
      </div>
      <Button className="inline-block px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        <a>Πίσω στην αρχική</a>
      </Button>
    </main>
  );
}
