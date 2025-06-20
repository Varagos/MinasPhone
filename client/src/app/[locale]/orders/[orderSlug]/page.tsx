import React from 'react';
import { api } from '@/api';
import type { Order } from '@/api/types/orders';
import LinkButton from '@/components/common/LinkButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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
    <main>
      <div>
        <Typography variant="h5">
          Σας ευχαριστούμε για την παραγγελία, {data.contactInfo?.firstName}{' '}
          {data.contactInfo?.lastName}
        </Typography>
        <Divider sx={{ margin: '20px 0' }} />
        <Typography variant="subtitle2">
          Κωδικός παραγγελίας: {data.slug}
        </Typography>
      </div>
      <br />
      <LinkButton href="/" variant="outlined" type="button">
        Πίσω στην αρχική
      </LinkButton>
    </main>
  );
}
