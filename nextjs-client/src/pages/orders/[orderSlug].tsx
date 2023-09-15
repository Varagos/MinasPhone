import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Products from '@/components/Category/Products/Products';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner/Spinner';
import { ProductPaginatedResponse } from '@/api/types/products';
import { api } from '@/api';
import { GetServerSideProps } from 'next';
import { Order } from '@/api/types/orders';
import LinkButton from '@/components/custom-components/LinkButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useStyles from './_styles';

interface OrderProps {
  data: Order;
}

export const getServerSideProps: GetServerSideProps<OrderProps> = async (
  context
) => {
  const orderSlug = context.params?.orderSlug as string;
  const order = await api.orders.findOrderBySlug(orderSlug);
  return { props: { data: order } };
};

const Order = ({ data }: OrderProps) => {
  const classes = useStyles();
  // console.log('Product params', params);
  const router = useRouter();
  console.log('Order data', data);
  const { orderSlug } = router.query;
  console.log({ orderSlug });
  if (typeof orderSlug !== 'string') return <div>Order not found</div>;

  return (
    <main>
      <div>
        <Typography variant="h5">
          Σας ευχαριστούμε για την παραγγελία, {data.contactInfo?.firstName}{' '}
          {data.contactInfo?.lastName}
        </Typography>
        <Divider className={classes.divider} />
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
  // );
};

export default Order;
