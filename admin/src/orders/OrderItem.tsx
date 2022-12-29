import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useTranslate, useGetMany, useRecordContext } from 'react-admin';

import { Order, OrderItem as OrderItemType } from '../types';
import { TableCellRight } from './TableCellRight';

const OrderItem = () => {
  const record = useRecordContext<Order>();
  const translate = useTranslate();

  //   const productIds = record ? record.basket.map((item) => item.product_id) : [];

  //   const { isLoading, data: products } = useGetMany<Product>('products', { ids: productIds }, { enabled: !!record });
  const products = record ? record.items : [];
  const productsById = products
    ? products.reduce((acc, product) => {
        acc[product.productId] = product;
        return acc;
      }, {} as any)
    : {};

  //   if (isLoading || !record || !products) return null;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{translate('resources.orders.fields.basket.reference')}</TableCell>
          <TableCellRight>{translate('resources.orders.fields.basket.unit_price')}</TableCellRight>
          <TableCellRight>{translate('resources.orders.fields.basket.quantity')}</TableCellRight>
          <TableCellRight>{translate('resources.orders.fields.basket.total')}</TableCellRight>
        </TableRow>
      </TableHead>
      <TableBody>
        {record.items.map((item: OrderItemType) => (
          <TableRow key={item.productId}>
            <TableCell>
              <Link to={`/products/${item.productId}`}>{productsById[item.productId].productName}</Link>
            </TableCell>
            <TableCellRight>
              {productsById[item.productId].unitPrice.toLocaleString(undefined, {
                style: 'currency',
                currency: 'EUR',
              })}
            </TableCellRight>
            <TableCellRight>{item.quantity}</TableCellRight>
            <TableCellRight>
              {(productsById[item.productId].unitPrice * item.quantity).toLocaleString(undefined, {
                style: 'currency',
                currency: 'EUR',
              })}
            </TableCellRight>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItem;
