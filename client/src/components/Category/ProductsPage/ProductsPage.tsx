import React, { useEffect } from 'react';
import { useAppSelector } from '../../../redux/store';
import Spinner from '../../Spinner/Spinner';
import Products from '../Products/Products';

import useStyles from './styles';

const ProductsPage = ({ fetchProducts, productsLoading }: any) => {
  const classes = useStyles();

  const products = useAppSelector((state) => state.products.data);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    fetchProducts();
  }, []);

  return productsStatus === 'loading' ? <Spinner /> : <Products products={products} />;
  // return productsLoading ? <Spinner /> : <Products products={products} />;
};

export default ProductsPage;
