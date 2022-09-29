import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import Spinner from '../Spinner/Spinner';
import Products from './Products/Products';

type CategoryProps = {
  fetchProducts: any;
  // productsLoading: boolean;
};
const Category = ({ fetchProducts }: CategoryProps) => {
  const params = useParams<any>();
  console.log('params', params);
  const { category_id: categoryId } = params;
  console.log(categoryId);

  const products = useAppSelector((state) => state.products.data);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  return productsStatus === 'loading' ? <Spinner /> : <Products products={products} />;
  // return productsLoading ? <Spinner /> : <Products products={products} />;
};

export default Category;
