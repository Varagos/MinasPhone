'use client';

import React from 'react';
import { CheckoutInfo } from '@/types/checkout-token';
import { Separator } from '@/components/ui/separator';
// Import useTranslations for i18n support
import { useTranslations } from 'use-intl';

type ReviewProps = {
  checkoutInfo: CheckoutInfo;
};

const Review = ({ checkoutInfo: checkoutToken }: ReviewProps) => {
  const t = useTranslations('orders');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('ORDER_SUMMARY')}</h2>
      <ul className="space-y-2">
        {checkoutToken.line_items.map((product) => (
          <li
            key={product.name}
            className="flex justify-between items-center py-2"
          >
            <div className="space-y-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {t('QUANTITY', { count: product.quantity })}
              </p>
            </div>
            <p className="text-sm">{product.subtotal.formatted_with_symbol}</p>
          </li>
        ))}
        <Separator className="my-4" />
        <li className="flex justify-between items-center py-4">
          <p className="font-medium">{t('TOTAL')}</p>
          <p className="font-bold">
            {checkoutToken.total.formatted_with_symbol}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Review;
