import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategorySlug } from '../../redux/slices/products';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Spinner from '../Spinner/Spinner';
import Products from './Products/Products';

const Category = () => {
  const params = useParams<any>();
  const { category_id: categorySlug } = params;
  console.log(categorySlug);

  const products = useAppSelector((state) => state.products.data);
  const productsStatus = useAppSelector((state) => state.products.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('categorySlug changed', categorySlug);
    if (categorySlug) {
      dispatch(fetchProductsByCategorySlug(categorySlug));
    }
  }, [categorySlug]);

  return productsStatus === 'loading' ? <Spinner /> : <Products products={products} />;
  // return productsLoading ? <Spinner /> : <Products products={products} />;
};

export default Category;
