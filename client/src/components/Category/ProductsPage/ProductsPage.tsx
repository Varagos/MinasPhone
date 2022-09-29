import React, { useEffect } from 'react';
import { fetchProducts } from '../../../redux/slices/products';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import Spinner from '../../Spinner/Spinner';
import Products from '../Products/Products';

import useStyles from './styles';

const ProductsPage = () => {
  const classes = useStyles();

  const products = useAppSelector((state) => state.products.data);
  const productsStatus = useAppSelector((state) => state.products.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return productsStatus === 'loading' ? <Spinner /> : <Products products={products} />;
  // return productsLoading ? <Spinner /> : <Products products={products} />;
};

export default ProductsPage;
