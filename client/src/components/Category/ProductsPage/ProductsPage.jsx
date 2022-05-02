import React, { useEffect } from 'react';
import Spinner from '../../Spinner/Spinner';
import Products from '../Products/Products';

import useStyles from './styles';

const ProductsPage = ({ products, fetchProducts, productsLoading }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
  }, []);

  return productsLoading ? <Spinner /> : <Products products={products} />;
};

export default ProductsPage;
