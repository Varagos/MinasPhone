import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Products from './Products/Products';

type CategoryProps = {
  products: any[];
  fetchProducts: any;
  productsLoading: boolean;
  onAddToCart: any;
};
const Category = ({ products, fetchProducts, productsLoading, onAddToCart }: CategoryProps) => {
  const params = useParams<any>();
  console.log('params', params);
  const { category_id: categoryId } = params;
  console.log(categoryId);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  return productsLoading ? <Spinner /> : <Products products={products} onAddToCart={onAddToCart} />;
};

export default Category;
