import React from 'react';
import { api } from '@/api';
import type { Order } from '@/api/types/orders';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import * as O from 'fp-ts/Option';
import Image from 'next/image';
import Link from 'next/link';
import { formatPriceWithSymbol } from '@/utils/prices';
import { format } from 'date-fns';

export default async function Order({
  params,
}: {
  params: Promise<{ orderSlug: string }>;
}) {
  const t = await getTranslations('orders');
  // console.log('Product params', params);
  const orderSlug = (await params).orderSlug;

  const orderInfoOrNone = await api.orders.findOrderBySlug(orderSlug);
  // console.log('Order data', orderInfo);

  console.log({ orderSlug });
  if (typeof orderSlug !== 'string') return <div>{t('ORDER_NOT_FOUND')}</div>;

  if (O.isNone(orderInfoOrNone)) return <div>{t('ORDER_NOT_FOUND')}</div>;

  const orderInfo = orderInfoOrNone.value;

  const orderDate = new Date(orderInfo.createdAt);
  const formattedDate = format(orderDate, 'dd/MM/yyyy HH:mm');

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Σας ευχαριστούμε για την παραγγελία,{' '}
          {orderInfo.contactInfo?.firstName} {orderInfo.contactInfo?.lastName}
        </h1>
        <p className="text-gray-600">
          Η παραγγελία σας έχει ληφθεί και βρίσκεται σε επεξεργασία. Θα
          επικοινωνήσουμε σύντομα μαζί σας.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Στοιχεία Παραγγελίας
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Αριθμός Παραγγελίας:</span>{' '}
                {orderInfo.slug}
              </p>
              <p>
                <span className="font-medium">Ημερομηνία:</span> {formattedDate}
              </p>
              <p>
                <span className="font-medium">Κατάσταση:</span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  {orderInfo.status === 'pending'
                    ? 'Σε Εκκρεμότητα'
                    : orderInfo.status}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Στοιχεία Παράδοσης
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-medium">
                {orderInfo.contactInfo?.firstName}{' '}
                {orderInfo.contactInfo?.lastName}
              </p>
              <p>{orderInfo.contactInfo?.email}</p>
              <p>{orderInfo.contactInfo?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Προϊόντα</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {orderInfo.lineItems.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                {item.productImage && (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">
                  {item.productName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Κωδικός: {item.productId}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-base font-medium text-gray-900">
                  {formatPriceWithSymbol(item.itemPrice)}
                </p>
                <p className="text-sm text-gray-500">
                  Ποσότητα: {item.quantity}
                </p>
                <p className="mt-2 text-base font-medium">
                  Σύνολο: {formatPriceWithSymbol(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Υποσύνολο: {formatPriceWithSymbol(orderInfo.total)}
              </p>
              <p className="text-sm text-gray-600">
                Έκπτωση: {formatPriceWithSymbol(0)}
              </p>
              <p className="text-lg font-medium mt-2">
                Συνολικό ποσό: {formatPriceWithSymbol(orderInfo.total)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline" className="px-6 py-2">
          <Link href="/">Πίσω στην αρχική</Link>
        </Button>
      </div>
    </main>
  );
}
